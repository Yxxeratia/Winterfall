import axios from 'axios'
const url = `http://localhost:3000/tracks/`


export default {
    execute: async () => {
        try {
            let res = await axios.get(url);
            return res.data;
        }
        catch(error) {
            console.log(error);
        }
    }
}