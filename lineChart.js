const labels = Array.from({ length: 12 }, (_, i) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i * 7); // Adjusted for weeks
    return `Week ${i + 1}`;
});

const data = {
    labels: labels,
    datasets: [{
        label: 'Weight Journey',
        data: [65, 0, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2
    }]
};
new Chart("myChart", {
    type: "line",
    data: data,
});