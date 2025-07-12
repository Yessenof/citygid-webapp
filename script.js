let cities = [];

window.onload = () => {
  fetch("cities.json")
    .then(res => res.json())
    .then(data => {
      cities = data;
      fillCityLists(data);
    });
};

function fillCityLists(list) {
  const fromList = document.getElementById("fromList");
  const toList = document.getElementById("toList");

  list.forEach(city => {
    const option1 = document.createElement("option");
    option1.value = city;
    fromList.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = city;
    toList.appendChild(option2);
  });
}

function sendData() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  if (!from || !to || !date) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  const data = {
    from: from,
    to: to,
    date: date
  };

  const json = JSON.stringify(data);
  Telegram.WebApp.sendData(json);
  Telegram.WebApp.close();
}
