import sql, { ConnectionPool } from 'mssql';

interface Effect {
    id: number, 
    name: string, 
    multiplier: number, 
    duration: number,  
    procChance: number, 
    type: string, 
}


interface Skill {
    id: number,
    name: string,
    lvl: number,
    skillType: string,
    effects: Effect[],
};

interface ActiveSkill extends Skill {
    multiplier: number,
    cooldown: number,
    duration: number,
    damageType: string,

};
interface Character {
    id: number,
    illu: string,
    name: string,
    lvl: number,
    ascLvl: number,
    hp: number,
    atk: number,
    def: number,
    crit: number,
    exp: number,
    expCap: number,
    inParty: boolean,
    activeSkills: ActiveSkill[],
    passiveSkills: Skill[],
};

export default {
    name: 'get roster',
    execute: async (user_id: string, connection: ConnectionPool) => {
        let party = await getCharactersInParty(user_id, connection);
        let nonParty = await getCharactersNotInParty(user_id, connection);
        return party.concat(nonParty);
    }
}

async function getCharactersInParty(user_id: string, connection: ConnectionPool) {
    //party
    let party = [];

    let request = new sql.Request(connection);
    let recordset = await request.query(`SELECT * FROM fn_get_characters_from_party(${user_id})`);
    recordset.recordsets[0].forEach(row => {
        //init character
        let character: Character = {id: null, illu: null, name: null, lvl: null, ascLvl: null, hp: null, atk: null, 
            def: null, crit: null, exp: null, expCap: null, inParty: true, activeSkills: [] as ActiveSkill[], 
            passiveSkills: [] as Skill[], 
        };

        character.id = row.character_id;
        character.illu = row.char_illustration;
        character.name = row.char_name;
        character.lvl = row.character_lvl;
        character.ascLvl= row.character_ascension_lvl;
        character.hp = row.hp;
        character.atk = row.atk;
        character.def = row.def;
        character.crit = row.crit;
        character.exp = row.exp;
        character.expCap = row.exp_cap

        //push 
        party.push(character);
    })  

    //if party is empty => return
    if (party.length === 0) return party;

    //skills
    for (let i = 0; i < party.length; i++) {
        //active skills
        request = new sql.Request(connection);
        recordset = await request.query(`SELECT * FROM fn_get_active_skills_of_party_member(${user_id}, ${party[i].id})`);
        recordset.recordsets[0].forEach(row => {
            let activeSkill: ActiveSkill = {id: null, name: null, lvl: null, multiplier: null, cooldown: null, duration: null, damageType: null, 
                skillType: null, effects: [] as Effect[] };

            activeSkill.id = row.skill_id;
            activeSkill.name = row.skill_name;
            activeSkill.lvl = row.skill_lvl;
            activeSkill.multiplier = row.skill_multiplier;
            activeSkill.cooldown = row.skill_cooldown;
            activeSkill.duration = row.skill_duration;
            activeSkill.damageType = row.damage_type;
            activeSkill.skillType = row.skill_type;
                
            //push skill
            party[i].activeSkills.push(activeSkill);
        })

        //passive skills
        request = new sql.Request(connection);
        recordset = await request.query(`SELECT * FROM fn_get_passive_skills_of_party_member(${user_id}, ${party[i].id})`)
        recordset.recordsets[0].forEach(row => {
            let passiveSkill: Skill = {id: null, name: null, lvl: null, skillType: null, effects: [] as Effect[]};
            passiveSkill.id = row.skill_id;
            passiveSkill.name = row.skill_name;
            passiveSkill.lvl = row.skill_lvl; 
            passiveSkill.skillType = row.skill_type;

            //push skill
            party[i].passiveSkills.push(passiveSkill);
        })
    }
   

    //assign effects to active skills
    request = new sql.Request(connection);
    recordset = await request.query(`SELECT * FROM fn_get_effects_of_active_skills_of_party_members(${user_id})`)
    recordset.recordsets[0].forEach(row => {
        let effect: Effect = {id: null, name: null, multiplier: null, duration: null, procChance: null, type: null};
        effect.id = row.effect_id;
        effect.name = row.effect_name;
        effect.multiplier = row.effect_multiplier;
        effect.duration = row.effect_duration;
        effect.procChance = row.proc_chance;
        effect.type = row.effect_type;

        let matchingCharacter = party.find(character => character.id === row.character_id);
        let matchingActiveSkill = matchingCharacter.activeSkills.find(skill => skill.id === row.skill_id);
        
        matchingActiveSkill.effects.push(effect);
    })

    //assign effects to passive skills
    request = new sql.Request(connection);
    recordset = await request.query(`SELECT * FROM fn_get_effects_of_passive_skills_of_party_members(${user_id})`)
    recordset.recordsets[0].forEach(row => {
        let effect: Effect = {id: null, name: null, multiplier: null, duration: null, procChance: null, type: null};
        effect.id = row.effect_id;
        effect.name = row.effect_name;
        effect.multiplier = row.effect_multiplier;
        effect.duration = row.effect_duration;
        effect.procChance = row.proc_chance;
        effect.type = row.effect_type;

        let matchingCharacter = party.find(character => character.id === row.character_id);
        let matchingPassiveSkill = matchingCharacter.passiveSkills.find(skill => skill.id === row.skill_id);

        matchingPassiveSkill.effects.push(effect);
    })

    //sort
    party = sortCharactersByLvl(party);
    return party;
}

async function getCharactersNotInParty(user_id: string, connection: ConnectionPool) {
    //non party
    let nonParty = [];

    let request = new sql.Request(connection);
    let recordset = await request.query(`SELECT * FROM fn_get_characters_from_non_party(${user_id})`);
    recordset.recordsets[0].forEach(row => {
        //init character
        let character: Character = {id: null, illu: null, name: null, lvl: null, ascLvl: null, hp: null, atk: null, 
            def: null, crit: null,  exp: null, expCap: null, inParty: false, activeSkills: [] as ActiveSkill[], 
            passiveSkills: [] as Skill[], 
        };

        character.id = row.character_id;
        character.illu = row.char_illustration;
        character.name = row.char_name;
        character.lvl = row.character_lvl;
        character.ascLvl= row.character_ascension_lvl;
        character.hp = row.hp;
        character.atk = row.atk;
        character.def = row.def;
        character.crit = row.crit;
        character.exp = row.exp;
        character.expCap = row.exp_cap

        //push 
        nonParty.push(character);
    })  

    //if non party is empty => return
    if (nonParty.length === 0) return nonParty;

    //skills
    for (let i = 0; i < nonParty.length; i++) {
        //active skills
        request = new sql.Request(connection);
        recordset = await request.query(`SELECT * FROM fn_get_active_skills_of_non_party_member(${user_id}, ${nonParty[i].id})`);
        recordset.recordsets[0].forEach(row => {
            let activeSkill: ActiveSkill = {id: null, name: null, lvl: null, multiplier: null, cooldown: null, duration: null, damageType: null, 
                skillType: null, effects: [] as Effect[]};

            activeSkill.id = row.skill_id;
            activeSkill.name = row.skill_name;
            activeSkill.lvl = row.skill_lvl;
            activeSkill.multiplier = row.skill_multiplier;
            activeSkill.cooldown = row.skill_cooldown;
            activeSkill.duration = row.skill_duration;
            activeSkill.damageType = row.damage_type;
            activeSkill.skillType = row.skill_type;
                
            //push skill
            nonParty[i].activeSkills.push(activeSkill);
        })

        //passive skills
        request = new sql.Request(connection);
        recordset = await request.query(`SELECT * FROM fn_get_passive_skills_of_non_party_member(${user_id}, ${nonParty[i].id})`)
        recordset.recordsets[0].forEach(row => {
            let passiveSkill: Skill = {id: null, name: null, lvl: null, skillType: null, effects: [] as Effect[]};
            passiveSkill.id = row.skill_id;
            passiveSkill.name = row.skill_name;
            passiveSkill.lvl = row.skill_lvl; 
            passiveSkill.skillType = row.skill_type;

            //push skill
            nonParty[i].passiveSkills.push(passiveSkill);
        })
    }
   
    //assign effects to active skills
    request = new sql.Request(connection);
    recordset = await request.query(`SELECT * FROM fn_get_effects_of_active_skills_of_non_party_members(${user_id})`)
    recordset.recordsets[0].forEach(row => {
        let effect: Effect = {id: null, name: null, multiplier: null, duration: null, procChance: null, type: null};
        effect.id = row.effect_id;
        effect.name = row.effect_name;
        effect.multiplier = row.effect_multiplier;
        effect.duration = row.effect_duration;
        effect.procChance = row.proc_chance;
        effect.type = row.effect_type;

        let matchingCharacter = nonParty.find(character => character.id === row.character_id);
        let matchingActiveSkill = matchingCharacter.activeSkills.find(skill => skill.id === row.skill_id);
        
        matchingActiveSkill.effects.push(effect);
    })

    //assign effects to passive skills
    request = new sql.Request(connection);
    recordset = await request.query(`SELECT * FROM fn_get_effects_of_passive_skills_of_non_party_members(${user_id})`)
    recordset.recordsets[0].forEach(row => {
        let effect: Effect = {id: null, name: null, multiplier: null, duration: null, procChance: null, type: null};
        effect.id = row.effect_id;
        effect.name = row.effect_name;
        effect.multiplier = row.effect_multiplier;
        effect.duration = row.effect_duration;
        effect.procChance = row.proc_chance;
        effect.type = row.effect_type;

        let matchingCharacter = nonParty.find(character => character.id === row.character_id);
        let matchingPassiveSkill = matchingCharacter.passiveSkills.find(skill => skill.id === row.skill_id);

        matchingPassiveSkill.effects.push(effect);
    })

    //sort 
    nonParty = sortCharactersByLvl(nonParty);
    return nonParty;
}

//sort by lvl
function sortCharactersByLvl(characters: Character[]) {
    characters.sort((char1, char2) => char1.lvl > char2.lvl ? -1 : 1);
    return characters;
}