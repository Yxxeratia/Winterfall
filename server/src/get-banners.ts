import sql, { ConnectionPool } from 'mssql';

interface Skill {
    id: number, 
    name: string, 
    baseLvl: number, 
    skillType: string
}

interface ActiveSkill extends Skill{
    baseMultiplier: number,
    cooldown: number,
    damageType: string,
}

interface Character {
    id: number, 
    name: string, 
    baseLvl: number, 
    baseAscLvl: number, 
    hp: number, 
    atk: number, 
    def: number, 
    crit: number, 
    activeSkills: ActiveSkill[],
    passiveSkills: Skill[], 
}

interface Banner {
    id: number, 
    name: string, 
    characters: Character[], 
    charactersRate: number, 
    duration: number, 
    endDate: string, 
    image: string
}

export default {
    name: 'get banners',
    execute: async (connection: ConnectionPool) => {
        const banners = await getOnGoingBanners(connection);
        await populateBanners(connection, banners);
        return banners;
    }
}

//get all ongoing banners
async function getOnGoingBanners(connection: ConnectionPool) {
    const banners: Banner[] = [];
    //get all ongoing banners
    let request = new sql.Request(connection);
    let recordset = await request.query("SELECT * FROM dbo.DIMbanners WHERE on_going = 1");
    recordset.recordsets[0].forEach(row => {
        //banner structure
        let banner = {id: null, name: null, characters: [] as Character[], charactersRate: null, duration: null, endDate: null, image: null}
        banner.id = row.banner_id;
        banner.name = row.banner_name;
        banner.charactersRate = row.characters_rate;
        banner.duration = (row.duration === null) ? "Permanent" : row.duration + " days";
        banner.endDate = (row.end_date === null) ? null : row.end_date;
        banner.image = row.banner_image;
        banners.push(banner);
    })

    return banners;
}

async function populateBanners(connection: ConnectionPool, banners: Banner[]) {
    let request = new sql.Request(connection);
    let recordset = await request.query("SELECT * FROM fn_get_characters_from_on_going_banners()")

    //characters + stats - skills
    recordset.recordsets[0].forEach(row => {
        let character: Character = {
            id: null, name: null, baseLvl: null, baseAscLvl: null, hp: null, atk: null, def: null, crit: null, 
            activeSkills: [] as ActiveSkill[], passiveSkills: [] as Skill[]
        };
        character.id = row.char_id;
        character.name = row.char_name;
        character.baseLvl = row.char_base_lvl;
        character.baseAscLvl= row.char_base_ascension_lvl;
        character.hp = row.base_hp;
        character.atk = row.base_atk;
        character.def = row.base_def;
        character.crit = row.base_crit;


        //matching banner
        let matchingBanner = banners.find(banner => banner.id === row.banner_id);
        matchingBanner.characters.push(character);
    })

    //skills
    for (let i = 0; i < banners.length; i++) {
        for (let j = 0; j < banners[i].characters.length; j++) {
            //active skills
            request = new sql.Request(connection);
            recordset = await request.query(`SELECT * FROM fn_get_active_skills_of_character_from_on_going_banner(${banners[i].characters[j].id})`);

            recordset.recordsets[0].forEach(row => {
                let activeSkill: ActiveSkill = {id: null, name: null, baseLvl: null, baseMultiplier: null, cooldown: null, 
                    damageType: null, skillType: null};

                activeSkill.id = row.skill_id;
                activeSkill.name = row.skill_name;
                activeSkill.baseLvl = row.skill_base_lvl;
                activeSkill.baseMultiplier = row.base_multiplier;
                activeSkill.cooldown = row.skill_cooldown;
                activeSkill.damageType = row.damage_type;
                activeSkill.skillType = row.skill_type;

                //push skill
                banners[i].characters[j].activeSkills.push(activeSkill);
            })

            //passive skills
            request = new sql.Request(connection);
            recordset = await request.query(`SELECT * FROM fn_get_passive_skills_of_character_from_on_going_banner(${banners[i].characters[j].id})`);

            recordset.recordsets[0].forEach(row => {
                let passiveSkill: Skill = {id: null, name: null, baseLvl: null, skillType: null};

                passiveSkill.id = row.skill_id;
                passiveSkill.name = row.skill_name;
                passiveSkill.baseLvl = row.skill_base_lvl;
                passiveSkill.skillType = row.skill_type;

                //push skill
                banners[i].characters[j].passiveSkills.push(passiveSkill);
            })
        } 
    }
}