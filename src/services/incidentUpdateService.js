import axios from "axios";

export default {
    async sendUpdateRequest(parameters){
        
        let token = `${parameters.authentication.username}:${parameters.authentication.password}`;
        let encodedToken = Buffer.from(token).toString('base64');

        let resp = null
        let config = {
            method: 'patch',
            url: `https://hungary-test.topdesk.net/tas/api/incidents/number/${parameters.incident}`,
            headers: { 
                'Authorization': `Basic ${encodedToken}`, 
                'Content-Type': 'application/json'
            },
            data : parameters.body
        };

        await axios(config)
        .then(function (response) {
            resp = response
        })
        .catch(function (error) {
            resp = error.response
        });

        return resp
        
    }
}