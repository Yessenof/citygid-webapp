const cities = ["Алматы", "Астана", "Шымкент", "Актобе", "Караганда", "Тараз", "Усть-Каменогорск",
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
const dateInput = document.getElementById("date");
const form = document.getElementById("route-form");

Telegram.WebApp.expand();
const chatId = Telegram.WebApp.initDataUnsafe?.user?.id || null;

function autocomplete(input, list) {
  input.addEventListener("input", () => {
    const val = input.value.toLowerCase();
    const datalist = document.getElementById(input.getAttribute("list"));
    datalist.innerHTML = "";

    const filtered = list.filter(city =>
      city.toLowerCase().startsWith(val)
    );

    filtered.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      datalist.appendChild(option);
    });
  });
}

autocomplete(fromInput, cities);
autocomplete(toInput, cities);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fromCity = fromInput.value;
  const toCity = toInput.value;
  const selectedDate = dateInput.value;

  const payload = {
    chat_id: chatId,
    from: fromCity,
    to: toCity,
    date: selectedDate,
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
      }, 500);
    })
    .catch((error) => {
      console.error("Ошибка при отправке запроса:", error);
      alert("Произошла ошибка. Попробуйте ещё раз.");
    });
});
