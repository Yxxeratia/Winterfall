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
    name: 'get profile',
    execute: (user_id, connection) => __awaiter(void 0, void 0, void 0, function* () {
        let nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0);
        const user = { id: null, name: null, daysActive: null, checkedIn: null, lastCheckIn: null, timeUntilNextCheckIn: null,
            mobsSlain: null, elitesSlain: null, bossesSlain: null, battlesWon: null, battlesLost: null, winRate: null };
        const request = new mssql_1.default.Request(connection);
        const recordset = yield request.query(`SELECT * FROM DIMusers WHERE uid = '${user_id}'`);
        recordset.recordsets[0].forEach(row => {
            user.id = row.uid;
            user.name = row.username;
            user.daysActive = row.days_active;
            user.checkedIn = row.checked_in;
            user.lastCheckIn = row.last_checkin;
            user.timeUntilNextCheckIn = nextDate.getTime() - Date.now();
            user.mobsSlain = row.mobs_slain;
            user.elitesSlain = row.elites_slain;
            user.bossesSlain = row.bosses_slain;
            user.battlesWon = row.battles_won;
            user.battlesLost = row.battles_lost;
            user.winRate = user.battlesWon / (user.battlesLost + user.battlesWon) * 100;
        });
        return user;
    })
};
