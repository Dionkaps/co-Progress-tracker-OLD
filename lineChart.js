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
var weightData = [];

async function FindWeightData() {
    const dbref = ref(db);

    try {
        const snapshot = await get(child(dbref, "weight/"));
        if (snapshot.exists()) {
            console.log(snapshot.val());
            weightData = snapshot.val();

            // Call the function to create the chart after fetching the data
            createChart();
        } else {
            alert("No data found");
        }
    } catch (error) {
        throw error;
    }
}

function createChart() {
    const weeks = {};

    // Iterate over weightData and group weights by week
    for (const date in weightData) {
        const weightEntry = weightData[date];
        const weekNumber = getWeekNumber(new Date(date)); // Function to get week number

        if (!weeks[weekNumber]) {
            weeks[weekNumber] = [];
        }

        weeks[weekNumber].push(weightEntry.weight);
    }

    // Calculate the average weight for each week
    const averagedWeights = Object.keys(weeks).map(weekNumber => {
        const weights = weeks[weekNumber];
        let averageWeight = weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
        averageWeight = averageWeight.toFixed(2);
        return averageWeight;
    });

    const numberOfEntries = averagedWeights.length;
    console.log("Number of entries:", numberOfEntries);

    const labels = Array.from({ length: numberOfEntries }, (_, i) => {
        return `Week ${i + 1}`;
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Weight Journey',
            data: averagedWeights,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2,
        }]
    };

    var options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    };

    new Chart("myChart", {
        type: "line",
        data: data,
        options: options
    });
}

// Function to get week number
function getWeekNumber(date) {
    const currentDate = new Date(date);
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + 1) / 7);
    return weekNumber;
}


// Call the function to fetch data from Firebase
FindWeightData();