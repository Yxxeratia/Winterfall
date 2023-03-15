import axios from 'axios'
const url = `http://localhost:3000/checkin/`



export default {
    execute: async (uid: string) => {
        try {
            let res = await axios.post(url, {
                user_id: uid,
            });
            return res.data;
        }
        catch(error) {
            console.log(error);
        }
    }
}