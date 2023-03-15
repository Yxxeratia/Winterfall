import axios from 'axios'
const url = `http://localhost:3000/profile/`


export default {
    execute: async (uid: string) => {
        try {
            let res = await axios.get(url, {
                params: {
                    user_id: uid
                },
            });
            return res.data;
        }
        catch(error) {
            console.log(error);
        }
    }
}