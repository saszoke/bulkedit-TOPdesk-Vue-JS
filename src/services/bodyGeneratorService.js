import axios from "axios";

export default {
    generateBody(from){
        let body = {}
        from.forEach(element => {
            switch(element.name){
                case "caller":
                    body["callerLookup"] = {"id": element.id}
                    break
                case "branch":
                    body["caller"] = {"branch": {"id": element.id}}
                    break
                case "short description":
                    body["briefDescription"] = element.value
                    break
                case "category":
                    body["category"] = {"name": element.value}
                    break
                case "subcategory":
                    body["subcategory"] = {"name": element.value}
                    break
                case "object":
                    body["object"] = {"name": element.value}
                    break
                case "operator":
                    body["operator"] = {"id": element.id}
                    break
                case "operator group":
                    body["operatorGroup"] = {"id": element.id}
                    break
                case "supplier":
                    body["supplier"] = {"id": element.id}
                    break
                case "processing status":
                    body["processingStatus"] = {"name": element.value}
                    break
                default:
                    break
            }
        });
        return body
    },

    async prepare(TOPdeskurl, username, password, idRequiredChanges){
        let idPairs = {}
        const token = `${username}:${password}`;
        const encodedToken = Buffer.from(token).toString('base64');

        idRequiredChanges.forEach(change => {
            switch(change.name){
                case "caller":
                    axios.get(TOPdeskurl + '/tas/api/persons?query=dynamicName==' + '"' + change.value + '"', {
                        headers: {
                        'Authorization': 'Basic ' + encodedToken
                        }
                    })
                    .then(response =>{
                        idPairs[change.name] = response.data[0].id
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    break
                case "branch":
                    axios.get(TOPdeskurl + '/tas/api/branches?query=name==' + '"' + change.value + '"', {
                        headers: {
                        'Authorization': 'Basic ' + encodedToken
                        }
                    })
                    .then(response =>{
                        idPairs[change.name] = response.data[0].id
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    break
                case "operator":
                    axios.get(TOPdeskurl + '/tas/api/operators?query=dynamicName==' + '"' + change.value + '"', {
                        headers: {
                        'Authorization': 'Basic ' + encodedToken
                        }
                    })
                    .then(response =>{
                        idPairs[change.name] = response.data[0].id
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    break
                case "operator group":
                    axios.get(TOPdeskurl + '/tas/api/operatorgroups?query=groupName==' + '"' + change.value + '"', {
                        headers: {
                        'Authorization': 'Basic ' + encodedToken
                        }
                    })
                    .then(response =>{
                        idPairs[change.name] = response.data[0].id
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    break
                case "supplier":
                    axios.get(TOPdeskurl + '/tas/api/suppliers?query=name==' + '"' + change.value + '"', {
                        headers: {
                        'Authorization': 'Basic ' + encodedToken
                        }
                    })
                    .then(response =>{
                        idPairs[change.name] = response.data[0].id
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    break
                default:
                    break
            }
        });
        return idPairs
    }
}