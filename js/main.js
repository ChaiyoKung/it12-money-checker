// Client ID and API key from the Developer Console
let CLIENT_ID = "<client_id>";
let API_KEY = "<api_key>";

// Array of API discovery doc URLs for APIs used by the quickstart
let DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
let SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let loginButton = document.getElementById("login_button");
let signoutButton = document.getElementById("signout_button");
let searchbutton = document.getElementById("search_button");
let searchtextfield = document.getElementById("search_textfield");
let pre = document.getElementById("content");
let selectPage = document.getElementById("selectList");
let textSum = document.getElementById("summary");

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        loginButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        loginButton.style.display = "none";
        // signoutButton.style.display = "inline";
        signoutButton.style.display = "none";
    } else {
        loginButton.style.display = "none";
        // loginButton.style.display = "inline";
        signoutButton.style.display = "none";
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    let textContent = document.createTextNode(message + "\n");
    pre.appendChild(textContent);
}

/**
 * Click search button
 */
searchbutton.addEventListener("click", function () {
    for (let i = 0; i < 1; i++) {
        CheckMoney();
    }

});

searchtextfield.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        CheckMoney();
    }
});

let Sum = 0;
let totalBranch1 = 0;
let totalBranch2 = 0;
let totalComSportDay = 0;
let totalTshirtCS = 0;
let totalGradNightRice = 0;
let totalGradNightGoods = 0;
let totalComSeeIt = 0;
let totalCSMoney = 0;
let totalYear1Money = 0;
let totalITGragNight2 = 0;
let countNotFoundAll = 0;
let InIT = 1;

selectPage.addEventListener("change", function () {
    Sum = 0;
    totalBranch1 = 0;
    totalBranch2 = 0;
    totalComSportDay = 0;
    totalTshirtCS = 0;
    totalGradNightRice = 0;
    totalGradNightGoods = 0;
    totalComSeeIt = 0;
    totalCSMoney = 0;
    totalYear1Money = 0;
    totalITGragNight2 = 0;
    countNotFoundAll = 0;
});

/**
 * Function check page selected
 */
function CheckMoney() {
    Sum = 0;
    totalBranch1 = 0;
    totalBranch2 = 0;
    totalComSportDay = 0;
    totalTshirtCS = 0;
    totalGradNightRice = 0;
    totalGradNightGoods = 0;
    totalComSeeIt = 0;
    totalCSMoney = 0;
    totalYear1Money = 0;
    totalITGragNight2 = 0;
    countNotFoundAll = 0;
    countNotFoundAll = 0;
    pre.innerHTML = "";
    textSum.innerHTML = "";
    textSum.style.display = "none";
    if (searchtextfield.value == "") {
        // appendPre("กรุณาใส่รหัสนักศึกษา หรือ ชื่อเล่น");
        alert("กรุณาใส่รหัสนักศึกษา หรือ ชื่อเล่น");
    } else {
        let loadingField = document.getElementById("loading");
        loadingField.className = "";
        InIT = 1;
        SearchName();
        setTimeout(function () {
            console.log(InIT);
            if (InIT == 1) {
                if (selectPage.value == "All") {
                    setTimeout(function () {
                        CheckBranch();
                    }, 1000);
                    setTimeout(function () {
                        CheckComSportDay();
                    }, 2000);
                    setTimeout(function () {
                        CheckTshirtCS();
                    }, 2500);
                    setTimeout(function () {
                        CheckGradNight();
                    }, 3000);
                    setTimeout(function () {
                        CheckComSeeIt();
                    }, 3500);
                    setTimeout(function () {
                        // CheckCSMoney(); // ขอปิดไว้ก่อน คิดว่ามันยังไม่จำเป็นต้องเช็ค
                        CheckYear1Money();
                    }, 4000);
                    setTimeout(function () {
                        CheckITGradNight2();
                    }, 4500);
                    setTimeout(function () {
                        if (countNotFoundAll != 6) {
                            Sum = totalBranch1 + totalBranch2 + totalComSportDay + totalTshirtCS + totalGradNightRice +
                                totalGradNightGoods + totalComSeeIt + totalCSMoney + totalYear1Money + totalITGragNight2;
                            textSum.innerHTML = ("*** รวมที่ค้างทั้งหมด: " + Sum + " บาท ***\n");
                            textSum.style.display = "block";
                            loadingField.className = "off";
                        }
                    }, 5500);
                } else if (selectPage.value == "Branch") {
                    CheckBranch();
                    loadingField.className = "off";
                } else if (selectPage.value == "ComSportDay") {
                    CheckComSportDay();
                    loadingField.className = "off";
                } else if (selectPage.value == "TshirtCS") {
                    CheckTshirtCS();
                    loadingField.className = "off";
                } else if (selectPage.value == "GradNight") {
                    CheckGradNight();
                    loadingField.className = "off";
                } else if (selectPage.value == "ComSeeIt") {
                    CheckComSeeIt();
                    loadingField.className = "off";
                } else if (selectPage.value == "CSMoney") {
                    CheckCSMoney();
                    loadingField.className = "off";
                } else if (selectPage.value == "Year1Money") {
                    CheckYear1Money();
                    loadingField.className = "off";
                } else if (selectPage.value == "ITGradNight2") {
                    CheckITGradNight2();
                    loadingField.className = "off";
                }
            }
        }, 1000);
    }
}

function SearchName() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: "<it_member_spreadsheet_id>",
        range: "แผ่น1!A2:C87", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    appendPre(row[0] + " | " + row[1] + " | " + row[2] + "\n");
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                InIT = 0;
                console.log("Not: " + InIT);
                appendPre("ใบรายชื่อ: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
            }
        } else {
            appendPre("SearchName No data found.");
        }
    }, function (response) {
        appendPre("Error SearchName: " + response.result.error.message);
    });
}

/**
 * Function check brach money
 */

let SheetID = "<it_money_spreadsheet_id>";

function CheckBranch() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่ารายเดือนสาขา!A2:T102", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalBranch1 = 0;
        totalBranch2 = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    for (k = 3; k <= 19; k++) {
                        if (row[k] == null || row[k] == "") {
                            row[k] = "ยังไม่จ่าย";
                            if (k < 11) {
                                totalBranch1 += 50;
                            } else if (k > 11) {
                                totalBranch2 += 20;
                            }
                        }
                    }
                    if ((totalBranch1 + totalBranch2) != 0) {
                        appendPre("ค่ารายเดือนสาขา (ปี1): " + row[3] + ", " + row[4] + ", " + row[5] + ", " + row[6] +
                            ", " + row[7] + ", " + row[8] + ", " + row[9] + ", " + row[10] + "\nค่ารายเดือนสาขา (ปี2): " +
                            row[12] + ", " + row[13] + ", " + row[14] + ", " + row[15] + ", " + row[16] + ", " + row[17] +
                            ", " + row[18] + ", " + row[19]);
                        appendPre("ค่ารายเดือนสาขาที่ค้าง: " + (totalBranch1 + totalBranch2) + " บาท\n");
                        // *** CHENGE end ***   
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่ารายเดือนสาขา: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckBranch: " + response.result.error.message);
    });
}

/**
 * Function check com sport day money
 */
function CheckComSportDay() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่าข้าวคอมสปอร์ตเดย์!A2:D99", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalComSportDay = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    if (row[3] == null || row[3] == "") {
                        row[3] = "ยังไม่จ่าย";
                        totalComSportDay = 30;
                    }
                    if (totalComSportDay != 0) {
                        appendPre("ค่าข้าวคอมสปอร์ตเดย์: " + row[3]);
                        appendPre("ค่าข้าวคอมสปอร์ตเดย์ที่ค้าง: " + totalComSportDay + " บาท\n");
                        // *** CHENGE end ***
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่าข้าวคอมสปอร์ตเดย์: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckComSportDay: " + response.result.error.message);
    });
}

/**
 * Function check T-Shirt CS
 */
function CheckTshirtCS() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่าเสื้อภาควิชาฯ!A2:F104", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalTshirtCS = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    if (row[5] == null || row[5] == "") {
                        row[5] = "ยังไม่จ่าย";
                        totalTshirtCS = 260;
                    }
                    if (totalTshirtCS != 0) {
                        appendPre("ค่าเสื้อภาควิชาฯ: " + row[5]);
                        appendPre("ค่าเสื้อภาควิชาฯที่ค้าง: " + totalTshirtCS + " บาท\n");
                        // *** CHENGE end ***
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่าเสื้อภาควิชาฯ: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckTshirtCS: " + response.result.error.message);
    });
}

/**
 * Function check graduate night
 */
function CheckGradNight() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่างานราตรีบัณฑิต!A2:E98", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalGradNightRice = 0;
        totalGradNightGoods = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    if (row[3] == null || row[3] == "") {
                        row[3] = "ยังไม่จ่าย";
                        totalGradNightRice = 20;
                    }
                    if (row[4] == null || row[4] == "") {
                        row[4] = "ยังไม่จ่าย";
                        totalGradNightGoods = 38;
                    }
                    if ((totalGradNightRice + totalGradNightGoods) != 0) {
                        appendPre("ค่างานราตรีบัณฑิต (ข้าว): " + row[3]);
                        appendPre("ค่างานราตรีบัณฑิต (ของที่ระลึก): " + row[4]);
                        appendPre("ค่างานราตรีบัณฑิตที่ค้าง: " + (totalGradNightRice +
                            totalGradNightGoods) + " บาท\n");
                        // *** CHENGE end ***
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่างานราตรีบัณฑิต: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckGradNight: " + response.result.error.message);
    });
}

/**
 * Function check com see it
 */
function CheckComSeeIt() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่างานคอมสีอิฐ!A2:D94", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalComSeeIt = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    if (row[3] == null || row[3] == "") {
                        row[3] = "ยังไม่จ่าย";
                        totalComSeeIt = 20;
                    }
                    if (totalComSeeIt != 0) {
                        appendPre("ค่างานคอมสีอิฐ: " + row[3]);
                        appendPre("ค่างานคอมสีอิฐที่ค้าง: " + totalComSeeIt + " บาท\n");
                        // *** CHENGE end ***   
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่างานคอมสีอิฐ: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckComSeeIt: " + response.result.error.message);
    });
}

/**
 * Function check CS money
 */
function CheckCSMoney() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่ารายเดือนภาควิชาฯ!A2:L93", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalCSMoney = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    for (k = 3; k <= 11; k++) {
                        if (row[k] == null || row[k] == "") {
                            row[k] = "ยังไม่จ่าย";
                            totalCSMoney += 20;
                        }
                    }
                    if (totalCSMoney != 0) {
                        appendPre("ค่ารายเดือนภาควิชาฯ: " + row[3] + ", " + row[4] + ", " + row[5] + ", " +
                            row[6] + ", " + row[7] + ", " + row[8] + ", " + row[9] + ", " + row[10] +
                            ", " + row[11]);
                        appendPre("ค่ารายเดือนภาควิชาฯที่ค้าง: " + totalCSMoney + " บาท\n");
                        // *** CHENGE end ***
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่ารายเดือนภาควิชาฯ: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckCSMoney: " + response.result.error.message);
    });
}

/**
 * Function check year 1 money
 */
function CheckYear1Money() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่าชั้นปี!A2:D93", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalYear1Money = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    if (row[3] == null || row[3] == "") {
                        row[3] = "ยังไม่จ่าย";
                        totalYear1Money = 150;
                    }
                    if (totalYear1Money != 0) {
                        appendPre("ค่าชั้นปี: " + row[3]);
                        appendPre("ค่าชั้นปีที่ค้าง: " + totalYear1Money + " บาท\n");
                        // *** CHENGE end ***
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่าชั้นปี: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckYear1Money: " + response.result.error.message);
    });
}

/**
 * Function check graduate night year 2
 */
function CheckITGradNight2() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SheetID,
        range: "ค่างานราตรีบัณฑิตสาขาปี2!A2:D87", // *** CHENGE ***
    }).then(function (response) {
        let countNotFound = 0;
        totalITGragNight2 = 0;
        let range = response.result
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                if (searchtextfield.value == row[0] || searchtextfield.value == row[2]) {
                    // *** CHENGE start ***
                    if (row[3] == null || row[3] == "") {
                        row[3] = "ยังไม่จ่าย";
                        totalITGragNight2 = 100;
                    }
                    if (totalITGragNight2 != 0) {
                        appendPre("ค่างานราตรีบัณฑิตสาขาปี2: " + row[3]);
                        appendPre("ค่างานราตรีบัณฑิตสาขาปี2ที่ค้าง: " + totalITGragNight2 + " บาท\n");
                        // *** CHENGE end ***
                    }
                } else {
                    countNotFound++;
                }
            }
            if (range.values.length == countNotFound) {
                appendPre("ค่างานราตรีบัณฑิตสาขาปี2: ไม่พบข้อมูลที่ค้นหา กรุณาใส่อีกครั้ง\n")
                countNotFoundAll++;
            }
        } else {
            appendPre("No data found.");
        }
    }, function (response) {
        appendPre("Error CheckYear1Money: " + response.result.error.message);
    });
}