import fs from 'fs';
import path from 'path';


interface Track {
    id: number,
    name: string,
    by: string,
    fileName: string,
}

export default {
    name: 'getTracks',
    execute: () => {
        const audioDir = path.join(__dirname, '../audio');
        const audioFiles = fs.readdirSync(audioDir);
        
        let tracks: Track[] = [];
        for (let i = 0; i < audioFiles.length; i++) {
            let track: Track = {id: i, name: null, by: null, fileName: null};
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
}