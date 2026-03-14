export default class Alert {

  async renderAlert() {
    const response = await fetch("/json/alerts.json");
    const alerts = await response.json();

    if (!alerts.length) return;

    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    main.prepend(section);
  }

}
  