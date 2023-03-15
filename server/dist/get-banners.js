"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
exports.default = {
    name: 'get banners',
    execute: (connection) => __awaiter(void 0, void 0, void 0, function* () {
        const banners = yield getOnGoingBanners(connection);
        yield populateBanners(connection, banners);
        return banners;
    })
};
//get all ongoing banners
function getOnGoingBanners(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const banners = [];
        //get all ongoing banners
        let request = new mssql_1.default.Request(connection);
        let recordset = yield request.query("SELECT * FROM dbo.DIMbanners WHERE on_going = 1");
        recordset.recordsets[0].forEach(row => {
            //banner structure
            let banner = { id: null, name: null, characters: [], charactersRate: null, duration: null, endDate: null, image: null };
            banner.id = row.banner_id;
            banner.name = row.banner_name;
            banner.charactersRate = row.characters_rate;
            banner.duration = (row.duration === null) ? "Permanent" : row.duration + " days";
            banner.endDate = (row.end_date === null) ? null : row.end_date;
            banner.image = row.banner_image;
            banners.push(banner);
        });
        return banners;
    });
}
function populateBanners(connection, banners) {
    return __awaiter(this, void 0, void 0, function* () {
        let request = new mssql_1.default.Request(connection);
        let recordset = yield request.query("SELECT * FROM fn_get_characters_from_on_going_banners()");
        //characters + stats - skills
        recordset.recordsets[0].forEach(row => {
            let character = {
                id: null, name: null, baseLvl: null, baseAscLvl: null, hp: null, atk: null, def: null, crit: null,
                activeSkills: [], passiveSkills: []
            };
            character.id = row.char_id;
            character.name = row.char_name;
            character.baseLvl = row.char_base_lvl;
            character.baseAscLvl = row.char_base_ascension_lvl;
            character.hp = row.base_hp;
            character.atk = row.base_atk;
            character.def = row.base_def;
            character.crit = row.base_crit;
            //matching banner
            let matchingBanner = banners.find(banner => banner.id === row.banner_id);
            matchingBanner.characters.push(character);
        });
        //skills
        for (let i = 0; i < banners.length; i++) {
            for (let j = 0; j < banners[i].characters.length; j++) {
                //active skills
                request = new mssql_1.default.Request(connection);
                recordset = yield request.query(`SELECT * FROM fn_get_active_skills_of_character_from_on_going_banner(${banners[i].characters[j].id})`);
                recordset.recordsets[0].forEach(row => {
                    let activeSkill = { id: null, name: null, baseLvl: null, baseMultiplier: null, cooldown: null,
                        damageType: null, skillType: null };
                    activeSkill.id = row.skill_id;
                    activeSkill.name = row.skill_name;
                    activeSkill.baseLvl = row.skill_base_lvl;
                    activeSkill.baseMultiplier = row.base_multiplier;
                    activeSkill.cooldown = row.skill_cooldown;
                    activeSkill.damageType = row.damage_type;
                    activeSkill.skillType = row.skill_type;
                    //push skill
                    banners[i].characters[j].activeSkills.push(activeSkill);
                });
                //passive skills
                request = new mssql_1.default.Request(connection);
                recordset = yield request.query(`SELECT * FROM fn_get_passive_skills_of_character_from_on_going_banner(${banners[i].characters[j].id})`);
                recordset.recordsets[0].forEach(row => {
                    let passiveSkill = { id: null, name: null, baseLvl: null, skillType: null };
                    passiveSkill.id = row.skill_id;
                    passiveSkill.name = row.skill_name;
                    passiveSkill.baseLvl = row.skill_base_lvl;
                    passiveSkill.skillType = row.skill_type;
                    //push skill
                    banners[i].characters[j].passiveSkills.push(passiveSkill);
                });
            }
        }
    });
}
