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
    name: 'get inventory',
    execute: (user_id, connection) => __awaiter(void 0, void 0, void 0, function* () {
        let inventory = { items: [], currencies: [] };
        inventory.items = yield getItems(user_id, connection);
        inventory.currencies = yield getCurrencies(user_id, connection);
        return inventory;
    })
};
//get player's items
function getItems(user_id, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        let items = [];
        let request = new mssql_1.default.Request(connection);
        let recordset = yield request.query(`SELECT * FROM fn_get_items_from_user(${user_id})`);
        recordset.recordsets[0].forEach(row => {
            let item = { id: null, name: null, category: null, amount: null, image: null };
            item.id = row.item_id;
            item.name = row.item_name;
            item.category = row.category;
            item.amount = row.item_amount;
            item.image = row.image;
            items.push(item);
        });
        return items;
    });
}
//get player's currencies
function getCurrencies(user_id, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        //currencies
        let currencies = [];
        let request = new mssql_1.default.Request(connection);
        let recordset = yield request.query(`SELECT * FROM fn_get_currencies_from_user(${user_id})`);
        recordset.recordsets[0].forEach(row => {
            let currency = { id: null, name: null, amount: null, image: null };
            currency.id = row.currency_id;
            currency.name = row.currency_name;
            currency.amount = row.currency_amount;
            currency.image = row.image;
            currencies.push(currency);
        });
        return currencies;
    });
}
