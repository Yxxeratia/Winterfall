import sql, { ConnectionPool } from 'mssql';

interface Item {
    id: number,
    name: string, 
    category: string, 
    amount: number,
    image: string,
}

interface Currency {
    id: number, 
    name: string, 
    amount: number,
    image: string,
}

interface Inventory {
    items: Item[],
    currencies: Currency[],
}


export default {
    name: 'get inventory',
    execute: async (user_id: string, connection: ConnectionPool) => {
        let inventory: Inventory = {items: [] as Item[], currencies: [] as Currency[]};
        inventory.items = await getItems(user_id, connection);
        inventory.currencies = await getCurrencies(user_id, connection);

        return inventory;
    }
}


//get player's items
async function getItems(user_id: string, connection: ConnectionPool) {
    let items: Item[] = [];

    let request = new sql.Request(connection);
    let recordset = await request.query(`SELECT * FROM fn_get_items_from_user(${user_id})`);
    recordset.recordsets[0].forEach(row => {
        let item: Item = {id: null, name: null, category: null, amount: null, image: null};
        item.id = row.item_id;
        item.name = row.item_name;
        item.category = row.category;
        item.amount = row.item_amount;
        item.image = row.image;
        items.push(item);
    });
    return items;
}

//get player's currencies
async function getCurrencies(user_id: string, connection: ConnectionPool) {
    //currencies
    let currencies: Currency[] = [];
    let request = new sql.Request(connection);
    let recordset = await request.query(`SELECT * FROM fn_get_currencies_from_user(${user_id})`);
    recordset.recordsets[0].forEach(row => {
        let currency: Currency = {id: null, name: null, amount: null, image: null};
        currency.id = row.currency_id;
        currency.name = row.currency_name;
        currency.amount = row.currency_amount;
        currency.image = row.image;

        currencies.push(currency);
    });
    
    return currencies;
}

