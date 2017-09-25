const updateChart = (seriesData) => {
    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [{
            label: 'Humidity',
            data: seriesData,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
};