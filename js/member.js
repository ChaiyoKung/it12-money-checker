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
        appendUpdate(JSON.stringify(error, null, 2));
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
        getAllMember();
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

function appendUpdate(text) {
    let updateDiv = document.getElementById("updateDate");
    updateDiv.innerHTML = text;
}

function appendTable(id, name, nickname, fb, line, tel) {
    text = `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${nickname}</td>
        <td>${fb}</td>
        <td>${line}</td>
        <td>${tel}</td>
    </tr>`;

    tbody.innerHTML += text;
}







let tbody = document.querySelector("#member tbody");

function getAllMember() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: "<it_member_spreadsheet_id>",
        range: "แผ่น1!A1:G87",
    }).then(function (response) {
        let range = response.result
        if (range.values.length > 0) {
            appendUpdate(range.values[0][6]);
            for (i = 1; i < range.values.length; i++) {
                let row = range.values[i];

                if (row[3] == "" || row[3] == null || row[3] == undefined) {
                    row[3] = "";
                }
                if (row[4] == "" || row[4] == null || row[4] == undefined) {
                    row[4] = "";
                }
                if (row[5] == "" || row[5] == null || row[5] == undefined) {
                    row[5] = "";
                }

                appendTable(row[0], row[1], row[2], row[3], row[4], row[5]);
            }
        }
        document.getElementById("loading").classList.add("off");
    }, function (response) {
        appendUpdate("Error function getAllMember: " + response.result.error.message);
    });
}