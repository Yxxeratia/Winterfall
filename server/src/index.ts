import dbConnection from './db-connection';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import getTracks from './get-tracks';
import getBanners from './get-banners';
import getRoster from './get-roster';
import getInventory from './get-inventory';
import getProfile from './get-profile';
import checkIn from './check-in';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;


app.get('/tracks', (req, res) => {
    const tracks = getTracks.execute();
    res.send(tracks);
})

app.get('/banners', async (req, res) => {
    const connection = await dbConnection.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }

    const banners = await getBanners.execute(connection);
    res.send(banners);
})

app.get('/profile', async (req, res) => {
    const connection = await dbConnection.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    
    const user_id = req.query.user_id!.toString();
    const profile = await getProfile.execute(user_id, connection);
    res.send(profile);
})

app.get('/roster', async (req, res) => {
    const connection = await dbConnection.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    
    const user_id = req.query.user_id!.toString();
    const roster = await getRoster.execute(user_id, connection);
    res.send(roster);
})

app.get('/inventory', async (req, res) => {
    const connection = await dbConnection.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }

    const user_id = req.query.user_id!.toString();
    const inventory = await getInventory.execute(user_id, connection);
    res.send(inventory);
})

app.post('/checkin', async (req, res) => {
    const connection = await dbConnection.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    const user_id = req.body.user_id!.toString();
    const rewards = await checkIn.execute(user_id, connection);
    res.send(rewards);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

