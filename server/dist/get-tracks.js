"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = {
    name: 'getTracks',
    execute: () => {
        const audioDir = path_1.default.join(__dirname, '../audio');
        const audioFiles = fs_1.default.readdirSync(audioDir);
        let tracks = [];
        for (let i = 0; i < audioFiles.length; i++) {
            let track = { id: i, name: null, by: null, fileName: null };
            track.fileName = audioFiles[i];
            //split into artist(s) and track's path
            const arr = audioFiles[i].split("-");
            track.by = arr[0];
            //split track's path into track and file type
            const subArr = arr[1].split(".");
            track.name = subArr[0];
            tracks.push(track);
        }
        return tracks;
    }
};
