document.addEventListener("DOMContentLoaded", function () {
  const cities = [
    "Алматы", "Астана", "Шымкент", "Актобе", "Караганда", "Тараз", "Усть-Каменогорск",
    "Павлодар", "Костанай", "Кокшетау", "Петропавловск", "Уральск", "Талдыкорган", "Семей",
    "Дубай", "Абу-Даби", "Шарджа", "Рас-эль-Хайма", "Фуджейра",
    "Бишкек", "Ош", "Ташкент", "Самарканд", "Нукус", "Хива", "Душанбе", "Худжанд",
    "Москва", "Санкт-Петербург", "Сочи", "Краснодар", "Екатеринбург", "Новосибирск",
    "Омск", "Томск", "Челябинск", "Казань", "Уфа", "Пермь", "Волгоград", "Ростов-на-Дону",
    "Махачкала", "Астрахань", "Иркутск", "Хабаровск", "Владивосток", "Калининград",
    "Анталья", "Стамбул", "Измир", "Бодрум", "Мармарис", "Вена", "Прага", "Будапешт",
    "Варшава", "Краков", "Париж", "Берлин", "Мюнхен", "Барселона", "Мадрид", "Милан",
    "Рим", "Флоренция", "Амстердам", "Брюссель", "Цюрих", "Женева", "Лиссабон",
    "Копенгаген", "Осло", "Стокгольм", "Хельсинки", "Таллин", "Рига", "Вильнюс",
    "Бангкок", "Пхукет", "Чиангмай", "Куала-Лумпур", "Джакарта", "Бали", "Хошимин",
    "Ханой", "Дананг", "Манила", "Сингапур", "Токио", "Осака", "Сеул", "Пусан", "Бусан",
    "Дели", "Мумбай", "Гоа", "Ченнай", "Коломбо", "Катманду", "Мале",
    "Тель-Авив", "Каир", "Бейрут", "Амман", "Эр-Рияд", "Доха", "Манама", "Кувейт",
    "Тегеран", "Маскат", "Баку", "Тбилиси", "Ереван", "Батуми",
    "Мальдивы", "Занзибар", "Найроби", "Мехико", "Сеута", "Сан-Паулу", "Нью-Йорк", "Лос-Анджелес"
  ];

  function setupAutocomplete(inputId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(inputId + "-list");

    input.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      list.innerHTML = "";
      if (!value) return;

      const matches = cities.filter(city =>
        city.toLowerCase().startsWith(value)
      );

      matches.forEach(city => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.textContent = city;
        item.addEventListener("click", function () {
          input.value = city;
          list.innerHTML = "";
        });
        list.appendChild(item);
      });
    });

    document.addEventListener("click", function (e) {
      if (e.target !== input) {
        list.innerHTML = "";
      }
    });
  }

  setupAutocomplete("from");
  setupAutocomplete("to");

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

    fetch("https://hook.eu2.make.com/1sh8yxl1jhq2apxyfi3t808wkoyo51y2", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
  .then(() => {
    setTimeout(() => {
      Telegram.WebApp.close();
    }, 500); // Ждём 0.5 секунды и закрываем WebApp
  })
  .catch((error) => {
    console.error("Ошибка при отправке запроса:", error);
    alert("Ошибка при отправке запроса.");
  });

