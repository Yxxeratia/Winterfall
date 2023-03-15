import sql, { ConnectionPool } from 'mssql';
import updateCurrency from './update-currency';
import updateItem from './update-item';


interface Reward {
    id: number, 
    name: string, 
    amount: number, 
    type: string
}


export default {
    name: 'check in',
    execute: async (user_id: string, connection: ConnectionPool) => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const rewards = confirmCheckIn(user_id, connection, day, currentDate);
        return rewards;
    }
}


//check in successful
async function confirmCheckIn(user_id: string, connection: ConnectionPool, day: number, checkinTime: Date) {
    let request = new sql.Request(connection);

    request = new sql.Request(connection);
    request.input('uid', sql.VarChar, user_id);
    request.input('day', sql.Int, day);
    request.input('checkin_time', sql.SmallDateTime, checkinTime);
    await request.execute("sp_player_checked_in");

    //rewards
    let rewards = await getDailyRewards(connection, day);
    await obtainDailyRewards(user_id, connection, rewards);

    return rewards;
}

//get daily rewards
async function getDailyRewards(connection: ConnectionPool, day: number) {
    //rewards
    let rewards: Reward[] = [];
    let request = new sql.Request(connection);
    //currencies
    let recordset = await request.query(`SELECT * FROM fn_get_rewards_currencies(${day})`)
    recordset.recordsets[0].forEach(row => {
        let reward: Reward = {id: null, name: null, amount: null, type: null};
        reward.id = row.currency_id;
        reward.name = row.currency_name; 
        reward.amount = row.currency_amount;
        reward.type = 'currency';
        rewards.push(reward);
    })

    //items
    request = new sql.Request(connection);
    recordset = await request.query(`SELECT * FROM fn_get_rewards_items(${day})`)
    recordset.recordsets[0].forEach(row => {
        let reward: Reward = {id: null, name: null, amount: null, type: null};
        reward.id = row.item_id;
        reward.name = row.item_name; 
        reward.amount = row.item_amount;
        reward.type = 'item';
        rewards.push(reward);
    })

    return rewards;
}

//insert rewards into database
async function obtainDailyRewards(user_id: string, connection: ConnectionPool, rewards: Reward[]) {
    for (let i = 0; i < rewards.length; i++) {
        //currency
        if (rewards[i].type === 'currency') {
            await updateCurrency.execute(user_id, connection, rewards[i].id, rewards[i].amount);
         }
        //item
        else if (rewards[i].type === 'item') {
            await updateItem.execute(user_id, connection, rewards[i].id, rewards[i].amount)
        }
    }
}