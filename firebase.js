// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCFIrx3xJ71001TUnwNDyzZyETyW5wqAQ",
    authDomain: "co-progress-tracker.firebaseapp.com",
    databaseURL: "https://co-progress-tracker-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "co-progress-tracker",
    storageBucket: "co-progress-tracker.appspot.com",
    messagingSenderId: "181903903043",
    appId: "1:181903903043:web:6b8e01c1f47c586e14c7f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, set, get, update, remove, ref, child }
    from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const db = getDatabase();

// Accessing checkbox elements
var betterThanYesterdayCheckbox = document.getElementById('betterThanYesterday');
var ateWellCheckbox = document.getElementById('ateWell');
var trainedTodayCheckbox = document.getElementById('trainedToday');
var submitButton = document.getElementById('submitBtn');


function submitData() {
    // Storing checkbox values in variables
    var betterThanYesterdayValue = betterThanYesterdayCheckbox.checked;
    var ateWellValue = ateWellCheckbox.checked;
    var trainedTodayValue = trainedTodayCheckbox.checked;

    var checkedCount = 0;


    if (betterThanYesterdayValue) {
        checkedCount++;
    }
    if (ateWellValue) {
        checkedCount++;
    }
    if (trainedTodayValue) {
        checkedCount++;
    }

    // Getting the current date
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    set(ref(db, 'data/' + date), {
        DATE: date,
        BAL_FLAG: checkedCount
    }).then(() => {
        alert("MPIKAN")
    })
        .catch(() => {
            alert("Έγινε μαλακία επικοινωνήστε με τον CEIDA που το φτιαξε")
        });
}

submitButton.addEventListener('click', submitData);

