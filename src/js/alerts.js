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
