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
const db_connection_1 = __importDefault(require("./db-connection"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const get_tracks_1 = __importDefault(require("./get-tracks"));
const get_banners_1 = __importDefault(require("./get-banners"));
const get_roster_1 = __importDefault(require("./get-roster"));
const get_inventory_1 = __importDefault(require("./get-inventory"));
const get_profile_1 = __importDefault(require("./get-profile"));
const check_in_1 = __importDefault(require("./check-in"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT;
app.get('/tracks', (req, res) => {
    const tracks = get_tracks_1.default.execute();
    res.send(tracks);
});
app.get('/banners', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_connection_1.default.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    const banners = yield get_banners_1.default.execute(connection);
    res.send(banners);
}));
app.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_connection_1.default.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    const user_id = req.query.user_id.toString();
    const profile = yield get_profile_1.default.execute(user_id, connection);
    res.send(profile);
}));
app.get('/roster', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_connection_1.default.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    const user_id = req.query.user_id.toString();
    const roster = yield get_roster_1.default.execute(user_id, connection);
    res.send(roster);
}));
app.get('/inventory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_connection_1.default.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    const user_id = req.query.user_id.toString();
    const inventory = yield get_inventory_1.default.execute(user_id, connection);
    res.send(inventory);
}));
app.post('/checkin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_connection_1.default.execute();
    if (!connection) {
        console.log("Cannot connect to database");
        return;
    }
    const user_id = req.body.user_id.toString();
    const rewards = yield check_in_1.default.execute(user_id, connection);
    res.send(rewards);
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
