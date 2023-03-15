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
    name: 'update item',
    execute: (user_id, connection, itemId, gain) => __awaiter(void 0, void 0, void 0, function* () {
        let request = new mssql_1.default.Request(connection);
        if (!(yield isInInventory(user_id, connection, itemId))) {
            yield request.query(`INSERT INTO FACTusers_items VALUES('${user_id}', ${itemId}, ${gain})`);
        }
        else {
            request.input('uid', mssql_1.default.VarChar, user_id);
            request.input('item_id', mssql_1.default.Int, itemId);
            request.input('gain', mssql_1.default.Int, gain);
            yield request.execute("sp_update_player_item");
        }
    })
};
//check if item exists in player's inventory
function isInInventory(user_id, connection, itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        let request = new mssql_1.default.Request(connection);
        let recordset = yield request.query(`SELECT * FROM FACTusers_items WHERE user_id = '${user_id}' AND item_id = ${itemId}`);
        if (recordset.recordset.length === 0) {
            return false;
        }
        return true;
    });
}
