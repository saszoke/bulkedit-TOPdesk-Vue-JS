export default {
    generateBody(from){
        let body = {}
        let personid = "MY PERSON ID"
        let branchid = "MY BRANCH ID"
        let operatorid = "MY OPERATOR ID"
        let operatorgroupid = "MY OPERATORGROUP ID"
        let supplierid = "MY SUPPLIER ID"
        from.forEach(element => {
            switch(element.name){
                case "caller":
                    console.log(element.value)
                    body["callerLookup"] = {"id": personid}
                    break
                case "branch":
                    console.log(element.value)
                    body["caller"] = {"branch": {"id": branchid}}
                    break
                case "short description":
                    console.log(element.value)
                    body["briefDescription"] = element.value
                    break
                case "category":
                    console.log(element.value)
                    body["category"] = {"name": element.value}
                    break
                case "subcategory":
                    console.log(element.value)
                    body["subcategory"] = {"name": element.value}
                    break
                case "object":
                    console.log(element.value)
                    body["object"] = {"name": element.value}
                    break
                case "operator":
                    console.log(element.value)
                    body["operator"] = {"id": operatorid}
                    break
                case "operator group":
                    console.log(element.value)
                    body["operatorGroup"] = {"id": operatorgroupid}
                    break
                case "supplier":
                    console.log(element.value)
                    body["supplier"] = {"id": supplierid}
                    break
                case "processing status":
                    console.log(element.value)
                    body["processingStatus"] = {"name": element.value}
                    break
                default:
                    console.log("semmi")
            }
        });
        return body
    }
}