document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fromCity = document.getElementById("from").value;
    const toCity = document.getElementById("to").value;
    const date = document.getElementById("date").value;

    const payload = {
      from: fromCity,
      to: toCity,
      date: date,
      timestamp: new Date().toISOString()
    };

    fetch("https://hook.eu2.make.com/j6ijm9sab65jlnv1tiwjwnv9mmhndv5p", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    alert("🚀 Запрос отправлен! Ждите маршрут...");
  });
});
