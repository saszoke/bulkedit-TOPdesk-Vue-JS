import XLSX from "xlsx"


var xlsxScript = document.createElement('script');  
xlsxScript.setAttribute('src','https://oss.sheetjs.com/sheetjs/xlsx.full.min.js');
document.head.appendChild(xlsxScript);
export default {
    readXLS: fileUpload=>{
        let final = 'kezdetleges'
        let data=[{
            "name":"jayanth",
            "data":"scd",
            "abc":"sdef"
        }]

        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(fileUpload);
        fileReader.onload = async (event)=>{
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            final = await XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
        }
        return final
    }
}
