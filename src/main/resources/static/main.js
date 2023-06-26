//Add handler to the job records button.
const jrButton = document.getElementById("jobRecordsButton");

jrButton.addEventListener("click", async (event) => {
    const curInt = document.getElementById("dbInterface").firstElementChild;

    if(!curInt || curInt.id != "jobRecordsInt") {
        //Load interface for applications db
        const intRepl = {
            "{{addImage}}": "images/plus-solid.svg",
            "{{searchImage}}": "images/magnifying-glass-solid.svg",
            "{{allImage}}": "images/table-list-solid.svg"
        };
        await dbUILoader("jobRecordsInt.html", intRepl, "jobRecordsTable.html");

        //Add addApplication section.
        const addAppResp = await fetch("addApplication.html");
        const addAppSection = await addAppResp.text();
        document.getElementById("overlays").innerHTML = addAppSection;

        //Add handle submit to application addition.
        const form = document.getElementById("addForm");
        form.addEventListener("submit", async(event) => {
            event.preventDefault();
            
            const formData = new FormData(form);

            let jsonData = {}
            for(const [key, value] of formData.entries()) {
                jsonData[key] = value;
            }

            jsonData = JSON.stringify(jsonData);

            try {
                await fetch("/Applications", {
                    method: "POST",
                    body: jsonData,
                    headers: {"Content-Type": "application/json"}
                });

                //Display all records in Job Record DB.
                const imgReplc = {
                    "{{editImageSource}}": "images/pen-to-square-solid.svg",
                    "{{deleteImageSource}}": "images/trash-solid.svg"
                }
                await displayAllRecords("Applications", "jobRecord.html", imgReplc);
            } catch (error) {
                console.error(error);
            }
        });


        //Add display toggability to the add application card.
        const addBtn = document.getElementById("addApplication");
        addBtn.addEventListener("click", (event) => {
            toggleAddApplication(event);
        });

        //Add accept and close functionality to application buttons.
        const addAccept = document.getElementById("appAccept");
        
        addAccept.addEventListener("click", () => {
            toggleAddApplication();
        });

        const closeAccept = document.getElementById("appClose");
        closeAccept.addEventListener("click", () => {
            toggleAddApplication();
        });

        //Display all records in Job Record DB.
        const imgReplc = {
            "{{editImageSource}}": "images/pen-to-square-solid.svg",
            "{{deleteImageSource}}": "images/trash-solid.svg"
        }
        await displayAllRecords("Applications", "jobRecord.html", imgReplc);
    }
});

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
    tbody.replaceChildren();

    for(const recData of jTableData) {
        let copyTemp = tempWithImages.slice();

        const keys = Object.keys(recData);

        for(const key of keys) {
            copyTemp = copyTemp.replaceAll("{{" + key + "}}", recData[key]);
        }

        tbody.innerHTML += copyTemp;
    }
}

//Toggles the display of the element.
function toggleAddApplication(event) {
    const app = document.getElementById("addApplicationContainer");
    
    app.classList.toggle("notDisplayed");
}