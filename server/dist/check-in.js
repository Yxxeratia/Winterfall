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
const update_currency_1 = __importDefault(require("./update-currency"));
const update_item_1 = __importDefault(require("./update-item"));
exports.default = {
    name: 'check in',
    execute: (user_id, connection) => __awaiter(void 0, void 0, void 0, function* () {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const rewards = confirmCheckIn(user_id, connection, day, currentDate);
        return rewards;
    })
};
//check in successful
function confirmCheckIn(user_id, connection, day, checkinTime) {
    return __awaiter(this, void 0, void 0, function* () {
        let request = new mssql_1.default.Request(connection);
        request = new mssql_1.default.Request(connection);
        request.input('uid', mssql_1.default.VarChar, user_id);
        request.input('day', mssql_1.default.Int, day);
        request.input('checkin_time', mssql_1.default.SmallDateTime, checkinTime);
        yield request.execute("sp_player_checked_in");
        //rewards
        let rewards = yield getDailyRewards(connection, day);
        yield obtainDailyRewards(user_id, connection, rewards);
        return rewards;
    });
}
//get daily rewards
function getDailyRewards(connection, day) {
    return __awaiter(this, void 0, void 0, function* () {
        //rewards
        let rewards = [];
        let request = new mssql_1.default.Request(connection);
        //currencies
        let recordset = yield request.query(`SELECT * FROM fn_get_rewards_currencies(${day})`);
        recordset.recordsets[0].forEach(row => {
            let reward = { id: null, name: null, amount: null, type: null };
            reward.id = row.currency_id;
            reward.name = row.currency_name;
            reward.amount = row.currency_amount;
            reward.type = 'currency';
            rewards.push(reward);
        });
        //items
        request = new mssql_1.default.Request(connection);
        recordset = yield request.query(`SELECT * FROM fn_get_rewards_items(${day})`);
        recordset.recordsets[0].forEach(row => {
            let reward = { id: null, name: null, amount: null, type: null };
            reward.id = row.item_id;
            reward.name = row.item_name;
            reward.amount = row.item_amount;
            reward.type = 'item';
            rewards.push(reward);
        });
        return rewards;
    });
}
//insert rewards into database
function obtainDailyRewards(user_id, connection, rewards) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < rewards.length; i++) {
            //currency
            if (rewards[i].type === 'currency') {
                yield update_currency_1.default.execute(user_id, connection, rewards[i].id, rewards[i].amount);
            }
            //item
            else if (rewards[i].type === 'item') {
                yield update_item_1.default.execute(user_id, connection, rewards[i].id, rewards[i].amount);
            }
        }
    });
}
