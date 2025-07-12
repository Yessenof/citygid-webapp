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

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const fromList = document.getElementById("cityListFrom");
const toList = document.getElementById("cityListTo");

function updateDatalist(input, listElement) {
  const value = input.value.toLowerCase();
  listElement.innerHTML = "";
  cities.filter(city => city.toLowerCase().includes(value)).forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    listElement.appendChild(option);
  });
}

fromInput.addEventListener("input", () => updateDatalist(fromInput, fromList));
toInput.addEventListener("input", () => updateDatalist(toInput, toList));

const form = document.getElementById("route-form");
form.onsubmit = (e) => {
  e.preventDefault();
  const from = fromInput.value;
  const to = toInput.value;
  const date = document.getElementById("date").value;

  const payload = {
    chat_id: Telegram.WebApp.initDataUnsafe.user?.id || null,
    from,
    to,
    date
  };

  fetch("https://hook.eu2.make.com/1sh8yxl1jhq2apxyfi3t808wkoyo51y2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  alert("🚀 Запрос отправлен! Ждите маршрут...");
  setTimeout(() => Telegram.WebApp.close(), 700);
};
