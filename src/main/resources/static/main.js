//Add handlers to the DB buttons.
(async ()=> {
    const jrButton = document.getElementById("jobRecordsButton");

    jrButton.addEventListener("click", async (event) => {
        const intRepl = {
            "{{addImage}}": "images/plus-solid.svg",
            "{{searchImage}}": "images/magnifying-glass-solid.svg",
            "{{allImage}}": "images/table-list-solid.svg"
        };

        await dbUILoader("jobRecordsInt.html", intRepl, "jobRecordsTable.html");

        const imgReplc = {
            "{{editImageSource}}": "images/pen-to-square-solid.svg",
            "{{deleteImageSource}}": "images/trash-solid.svg"
        }

        await displayAllRecords("Applications", "jobRecord.html", imgReplc);
    });
})();


/* == FUNCTIONS == */

//Loads the interface and table header of the specified database.
async function dbUILoader(interfaceFile, intReplObj, tableFile) {
    const response = await fetch("/templates/" + interfaceFile);
    let interface = await response.text();

    interface = completeTemplate(interface, intReplObj);
    document.getElementById("dbInterface").innerHTML = interface;

    const tabResponse = await fetch("/templates/" + tableFile);
    const table = await tabResponse.text();
    document.getElementById("dbDisplay").innerHTML = table;
}

//Replace the keys with the values in the template.
function completeTemplate(template, replacementObject) {
    let temp = template;
    for(const [key, value] of Object.entries(replacementObject)) {
        temp = temp.replaceAll(key, value);
    }
    return temp;
}

//Retrieve all records from the specified db table as text.
async function fetchAllRecords(table) {
    const response = await fetch("/" + table);
    const data = await response.text();

    return data;
}

//Displays all records from the specified db to the dbDisplay.
async function displayAllRecords(tableName, recordTemplate, imgSrcs) {
    const response = await fetch("templates/" + recordTemplate);
    let template = await response.text();
    
    const tempWithImages = completeTemplate(template, imgSrcs);
    const tableData = await fetchAllRecords(tableName);
    const jTableData = JSON.parse(tableData);

    const tbody = document.querySelector("tbody");

    for(const recData of jTableData) {
        let copyTemp = tempWithImages.slice();

        const keys = Object.keys(recData);

        for(const key of keys) {
            copyTemp = copyTemp.replaceAll("{{" + key + "}}", recData[key]);
        }

        tbody.innerHTML += copyTemp;
    }
}