import axios from "axios";

export default {
    async validateApi(tdurl, username, password){

        const token = `${username}:${password}`;
        const encodedToken = Buffer.from(token).toString('base64');

        let incidentRequest = await axios.get(tdurl + '/tas/api/incidents', {
                headers: {
                'Authorization': 'Basic ' + encodedToken
                }
            })
        .then(response =>{
            if (response.status < 300){
                return true
            } else {
                return false
            }
        })
        .catch(err=>{
            console.log(err)
            return false
        })
        
        if (incidentRequest == true) return true
    }
}