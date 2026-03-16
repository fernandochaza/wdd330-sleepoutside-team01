async function loadAlerts() {
    const response = await fetch('alerts.json');
    const alerts = await response.json();

    const container = document.getElementById('alert-container');

    alerts.forEach(alert => {
        const alertBox = document.createElement('div');

        alertBox.textContent = alert.message;
        alertBox.style.backgroundColor = alert.background;
        alertBox.style.padding = "10px";
        alertBox.style.color = "white";
        alertBox.style.textAlign = "center";
        alertBox.style.marginBottom = "5px";

        container.appendChild(alertBox);
    });
}

loadAlerts();