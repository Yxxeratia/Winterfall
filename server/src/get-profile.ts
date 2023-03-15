import sql, { ConnectionPool } from 'mssql';

interface User {
    id: string,
    name: string, 
    daysActive: number,
    checkedIn: boolean,
    lastCheckIn: Date,
    timeUntilNextCheckIn: number, //exclusively for web app 
    mobsSlain: number,
    elitesSlain: number,
    bossesSlain: number,
    battlesWon: number,
    battlesLost: number,
    winRate: number,
}


export default {
    name: 'get profile',
    execute: async (user_id: string, connection: ConnectionPool) => {
        let nextDate = new Date();
        nextDate.setDate(nextDate.getDate()+1);
        nextDate.setHours(0, 0, 0);

        const user: User = {id: null, name: null, daysActive: null, checkedIn: null, lastCheckIn: null, timeUntilNextCheckIn: null, 
            mobsSlain: null, elitesSlain: null, bossesSlain: null, battlesWon: null, battlesLost: null, winRate: null};

        const request = new sql.Request(connection);
        const recordset = await request.query(`SELECT * FROM DIMusers WHERE uid = '${user_id}'`);
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
    }
}


