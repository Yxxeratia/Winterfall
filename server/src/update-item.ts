import sql, {ConnectionPool} from 'mssql'

export default {
    name: 'update item',
    execute: async (user_id: string, connection: ConnectionPool, itemId: number, gain: number) => {
        let request = new sql.Request(connection);
        if (!await isInInventory(user_id, connection, itemId)) {
            await request.query(`INSERT INTO FACTusers_items VALUES('${user_id}', ${itemId}, ${gain})`);
        }

        else {
            request.input('uid', sql.VarChar, user_id);
            request.input('item_id', sql.Int, itemId);
            request.input('gain', sql.Int, gain);
            await request.execute("sp_update_player_item");
        }

    }
}

//check if item exists in player's inventory
async function isInInventory(user_id: string, connection: ConnectionPool, itemId: number) {
    let request = new sql.Request(connection);
    let recordset = await request.query(`SELECT * FROM FACTusers_items WHERE user_id = '${user_id}' AND item_id = ${itemId}`);
    if (recordset.recordset.length === 0) {
        return false;
    }
    return true;
}