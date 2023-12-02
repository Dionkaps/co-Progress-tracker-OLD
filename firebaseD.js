// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, set, get, ref, child } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

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
const db = getDatabase();

// Accessing checkbox elements
var betterThanYesterdayCheckbox = document.getElementById('betterThanYesterday');
var ateWellCheckbox = document.getElementById('ateWell');
var trainedTodayCheckbox = document.getElementById('trainedToday');
var studiedTodayCheckbox = document.getElementById('studiedToday');
var submitButton = document.getElementById('submitBtn');

var firebaseData = [];

async function FindData() {
    const dbref = ref(db);

    try {
        const snapshot = await get(child(dbref, "Dionisis/data/"));
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const dateListInput = snapshot.val();
            firebaseData = Object.entries(dateListInput).map(([dateString, data]) => ({
                date: new Date(dateString),
                BAL_FLAG: data.BAL_FLAG
            }));
        } else {
            alert("No data found");
        }
    } catch (error) {
        throw error;
    }
}

function generateDataFromList(dateList) {
    return dateList.map(({ date, BAL_FLAG }) => {
        const DATEID = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
        const DB_DATE = date.toISOString().split('T')[0];
        const DAY = date.getDate();
        const DAY_NAME_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
        const WEEKDAYNO = date.getDay();
        const WEEKNO = getWeekNumber(date);
        const WEEK_OF_MONTH = Math.floor((date.getDate() - 1) / 7);
        const MONTHID = date.getFullYear() * 100 + (date.getMonth() + 1);
        const M_NAME = date.toLocaleString('default', { month: 'short' }) + '-' + date.getFullYear().toString().slice(2);
        const YEARID = date.getFullYear();
        const ORDER_ID = "1"; // Replace with the actual value
        const TOTAL_AMOUNT = "504"; // Replace with the actual value
        const RECIEVED_AMOUNT = "500"; // Replace with the actual value
        const DISCOUNT = "4"; // Replace with the actual value
        const ORDER_DATE = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;

        return {
            "DATEID": DATEID.toString(),
            "DB_DATE": DB_DATE,
            "DAY": DAY.toString(),
            "DAY_NAME_SHORT": DAY_NAME_SHORT,
            "WEEKDAYNO": WEEKDAYNO.toString(),
            "WEEKNO": WEEKNO.toString(),
            "WEEK_OF_MONTH": WEEK_OF_MONTH.toString(),
            "MONTHID": MONTHID.toString(),
            "M_NAME": M_NAME,
            "YEARID": YEARID.toString(),
            "ORDER_ID": ORDER_ID,
            "TOTAL_AMOUNT": TOTAL_AMOUNT,
            "RECIEVED_AMOUNT": RECIEVED_AMOUNT,
            "DISCOUNT": DISCOUNT,
            "ORDER_DATE": ORDER_DATE,
            "BAL_FLAG": BAL_FLAG
        };
    });
}

function getWeekNumber(date) {
    const startOfWeek = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfWeek) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfWeek.getDay() + 1) / 7)
}

async function getData() {
    try {
        await FindData();
        const generatedData = generateDataFromList(firebaseData);
        console.log(generatedData);
        drawHeatMap(generatedData);
    } catch (error) {
        console.error(error);
    }
}

getData();

submitButton.addEventListener('click', submitData);

function submitData() {
    // Storing checkbox values in variables
    var betterThanYesterdayValue = betterThanYesterdayCheckbox.checked;
    var ateWellValue = ateWellCheckbox.checked;
    var trainedTodayValue = trainedTodayCheckbox.checked;
    var studiedTodayValue = studiedTodayCheckbox.checked;

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
    if (studiedTodayValue) {
        checkedCount++;
    }

    // Getting the current date
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    set(ref(db, 'Dionisis/data/' + date), {
        DATE: date,
        BAL_FLAG: checkedCount
    }).then(() => {
        alert("MPIKAN")
    })
        .catch(() => {
            alert("Έγινε μαλακία επικοινωνήστε με τον CEIDα που το φτιαξε")
        });
    window.location.reload();
}
