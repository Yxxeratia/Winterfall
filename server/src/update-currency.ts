import sql, { ConnectionPool } from 'mssql';

export default {
    name: 'update currency',
    execute: async (user_id: string, connection: ConnectionPool, currencyId: number, gain: number) => {
        let request = new sql.Request(connection);
        if (!await isInInventory(user_id, connection, currencyId)) {
            await request.query(`INSERT INTO FACTusers_currencies VALUES('${user_id}', ${currencyId}, ${gain})`);
        }

        else {
            request.input('uid', sql.VarChar, user_id);
            request.input('currency_id', sql.Int, currencyId);
            request.input('gain', sql.Int, gain);
            await request.execute("sp_update_player_currency");
        }
    }
}

//check if item exists in player's inventory
async function isInInventory(user_id: string, connection: ConnectionPool, currencyId: number) {
    let request = new sql.Request(connection);
    let recordset = await request.query(`SELECT * FROM FACTusers_currencies WHERE user_id = '${user_id}' AND currency_id = ${currencyId}`);
    if (recordset.recordset.length === 0) {
        return false;
    }
    return true;
}