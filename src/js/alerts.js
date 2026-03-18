/*async function loadAlerts() {
    const response = await fetch("/public/json/alerts.json");
    const alerts = await response.json();

    const container = document.getElementById("alert-container");

    alerts.forEach(alert => {
        const alertBox = document.createElement("div");

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

*/
export default class Alerts {
  constructor(url) {
    this.url = url;
  }

  async init() {
    const alerts = await this.getalerts();
    if (!alerts || alerts.length === 0) return;
    const section = document.createElement("section");
    section.classList.add("alert-list");
    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });
    const main = document.querySelector("main");
    main.prepend(section);
  }

  async getalerts() {
    const response = await fetch(this.url);
    const alerts = await response.json();
    return alerts;
  }
}
