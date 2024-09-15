// Chart.js integration and form handling
const ctx = document.getElementById('financeChart').getContext('2d');
const financeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    }
});

// Track income, expenses and balance
let totalIncome = 0;
let totalExpenses = 0;

function updateOverview() {
    document.getElementById('total-income').textContent = `₹${totalIncome}`;
    document.getElementById('total-expenses').textContent = `₹${totalExpenses}`;
    document.getElementById('balance').textContent = `₹${totalIncome - totalExpenses}`;
}

document.getElementById('entry-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    if (type === 'income') {
        totalIncome += amount;
        financeChart.data.datasets[0].data.push(amount);
    } else if (type === 'expense') {
        totalExpenses += amount;
        financeChart.data.datasets[1].data.push(amount);
    }

    financeChart.data.labels.push(description);
    financeChart.update();

    updateOverview();

    // Reset form fields
    document.getElementById('entry-form').reset();
});

updateOverview();
