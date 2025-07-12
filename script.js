const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const dateInput = document.getElementById("date");
const suggestionsFrom = document.getElementById("suggestions-from");
const suggestionsTo = document.getElementById("suggestions-to");
const form = document.getElementById("route-form");

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

function createSuggestions(inputElement, suggestionsElement) {
  inputElement.addEventListener("input", function () {
    const inputValue = inputElement.value.toLowerCase();
    suggestionsElement.innerHTML = "";
    if (inputValue.length === 0) return;

    const filtered = cities.filter(city =>
      city.toLowerCase().startsWith(inputValue)
    );

    filtered.forEach(city => {
      const div = document.createElement("div");
      div.textContent = city;
      div.classList.add("suggestion");
      div.addEventListener("click", () => {
        inputElement.value = city;
        suggestionsElement.innerHTML = "";
      });
      suggestionsElement.appendChild(div);
    });
  });
}

createSuggestions(fromInput, suggestionsFrom);
createSuggestions(toInput, suggestionsTo);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fromCity = fromInput.value.trim();
  const toCity = toInput.value.trim();
  const selectedDate = dateInput.value;

  if (!fromCity || !toCity || !selectedDate) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  const payload = {
    chat_id: Telegram.WebApp.initDataUnsafe.user?.id || null,
    from: fromCity,
    to: toCity,
    date: selectedDate
  };

  fetch("https://hook.eu2.make.com/1sh8yxl1jhq2apxyfi3t808wkoyo51y2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(() => {
      alert("🚀 Запрос отправлен!");
      setTimeout(() => {
        Telegram.WebApp.close();
      }, 500);
    })
    .catch(() => {
      alert("Ошибка при отправке");
    });
});
