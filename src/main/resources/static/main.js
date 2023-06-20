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
    });
})();

getAllRecords("tableTest");

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

//Retrieve all records from the specified db table.
async function getAllRecords(tableName) {
    const response = await fetch("/findAll/v1/" + tableName);
    const data = await response.text();

    console.log("Response: " + data);
}