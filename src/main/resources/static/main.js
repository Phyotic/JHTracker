//Add handler to the job records button.
const jrButton = document.getElementById("jobRecordsButton");

jrButton.addEventListener("click", async () => {
    const curInt = document.getElementById("dbInterface").firstElementChild;

    //If no interface or a different interface displayed...
    if(!curInt || curInt.id != "jobRecordsInt") {
        //Load interface for applications db
        const intRepl = {
            "{{addImage}}": "images/plus-solid.svg",
            "{{searchImage}}": "images/magnifying-glass-solid.svg",
            "{{allImage}}": "images/table-list-solid.svg"
        };
        await dbUILoader("jobRecordsInt.html", intRepl, "jobRecordsTable.html");

        //Add viewApplication section.
        const viewAppResp = await fetch("templates/" + "applicationView.html");
        const viewAppSection = await viewAppResp.text();
        document.getElementById("overlays").innerHTML = viewAppSection;

        //Add reset functionality to reset button.
        const resetButton = document.getElementById("appReset");
        resetButton.addEventListener("click", () => {
            const form = document.getElementById("viewForm");
            form.reset();
        })

        //Add display toggability and submit handler to the add application card in interface.
        const addBtn = document.getElementById("addApplication");
        addBtn.addEventListener("click", (event) => {
            const header = document.getElementById("viewApplicationHeader");
            header.textContent = "Add New Application";

            addHandlerAppAdd();
            toggleViewApplication(event);
        });

        //Add accept functionality to accept image.
        let addAccept = document.getElementById("appAccept");
        // addAccept.replaceWith(addAccept.cloneNode(true));

        // addAccept = document.getElementById("appAccept");

        addAccept.addEventListener("click", () => {
            toggleViewApplication();
        });

        //Add close functionality to close image.
        const closeAccept = document.getElementById("appClose");
        closeAccept.addEventListener("click", () => {
            toggleViewApplication();
        });

        displayApplicationRecords();
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
function toggleViewApplication(event) {
    const app = document.getElementById("applicationViewContainer");
    
    app.classList.toggle("notDisplayed");
}

//Deletes a record.
async function deleteRecord(event) {
    if(event.target.classList.contains("deleteImage")) {
        const tr = event.target.parentElement.parentElement;

        let id;
        for(const td of tr.children) {
            if(td.classList.contains("recId")) {
                id = td.getAttribute("value");
                break;
            }
        }

        //Send delete request.
        await fetch("/Applications/" + id, {
            method: "DELETE"
        })

        displayApplicationRecords();
    }
}

//Displays all applications from the applications db.
async function displayApplicationRecords() {
    const imgReplc = {
        "{{editImageSource}}": "images/pen-to-square-solid.svg",
        "{{deleteImageSource}}": "images/trash-solid.svg"
    }
    await displayAllRecords("Applications", "jobRecord.html", imgReplc);
    addHandlersAppEditUpdate();
}

//Displays the application view with update functionality.
async function editAppRecord(event) {
    if(event.target.classList.contains("editImage")) {
        //Update viewApplication with the data of the row to be edited. Then show viewApp.
        document.getElementById("viewApplicationHeader").textContent = "Update Application";
        
        const tr = event.target.parentElement.parentElement.children;

        //Retrieve data of row to form.
        let id;
        for(const td of tr) {
            const eName = td.getAttribute("name");

            switch(eName) {
                case "id":
                    id = td.getAttribute("value");
                    break;
                case "role":
                    document.getElementById("inRole").value = td.getAttribute("value");
                    break;
                case "link":
                    document.getElementById("inLink").value = td.getAttribute("value");
                    break;
                case "status":
                    document.getElementById("inStatus").value = td.getAttribute("value");
                    break;
                case "apply_date":
                    document.getElementById("inDate").value = td.getAttribute("value");
                    break;
                case "apply_time":
                    document.getElementById("inTime").value = td.getAttribute("value");
                    break;
                case "city":
                    document.getElementById("inCity").value = td.getAttribute("value");
                    break;
                case "state":
                    document.getElementById("inState").value = td.getAttribute("value");
                    break;
                case "commute":
                    document.getElementById("inCommute").value = td.getAttribute("value");
                    break;
                case "company":
                    document.getElementById("inCompany").value = td.getAttribute("value");
                    break;
                case "salary":
                    document.getElementById("inSalary").value = td.getAttribute("value");
                    break;
                case "notes":
                    document.getElementById("inNotes").value = td.getAttribute("value");
                    break;
                case "techList":
                    document.getElementById("inTech").value = td.getAttribute("value");
                    break;
                default:
            } 
        }

        toggleViewApplication();

        //Add handler to submit of record update. Remove all event listeners from form.
        let form = document.getElementById("viewForm");
        form.replaceWith(form.cloneNode(true));
        form = document.getElementById("viewForm");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const form = document.getElementById("viewForm");
            const formData = new FormData(form);

            let jsonData = {}
            for(const [key, value] of formData.entries()) {
                jsonData[key] = value;
            }

            jsonData = JSON.stringify(jsonData);

            await fetch("/Applications/" + id, {
                method: "PUT",
                body: jsonData,
                headers: {"Content-Type": "application/json"}
            });

            form.reset();
            displayApplicationRecords();
        });
    }
}

//Add update and edit handlers to the application row.
function addHandlersAppEditUpdate() {
    // Add handlers for deletion and update.
    const rows = document.querySelector("tbody").children;

    for(const row of rows) {
        row.addEventListener("click", async (event)=> {
            deleteRecord(event);
        });

        row.addEventListener("click", async (event) => {
            editAppRecord(event);
        });
    }
}

//Add a handler to add a new application.
function addHandlerAppAdd() {
    let form = document.getElementById("viewForm");
    form.replaceWith(form.cloneNode(true));
    form = document.getElementById("viewForm");

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
            displayApplicationRecords();
        } catch (error) {
            console.error(error);
        }
    });
}