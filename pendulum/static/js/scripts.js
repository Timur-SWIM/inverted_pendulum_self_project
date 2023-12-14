function solveEquation(k, g, l, a, w, t) {
  const dt = 0.01;
  const numSteps = 100 * t;

  let f = 0.01;
  let dfdt = 0;

  const angles = []; // список углов отклонения

  for (let i = 1; i < numSteps; i++) {
    const d2fdt2 = -2 * k * dfdt - (g / l - a * w * w * Math.cos(w * i * dt) / l) * Math.sin(f);
    dfdt += d2fdt2 * dt;
    f += dfdt * dt;

    angles.push(f);
  }

  return angles;
}

function getDataAndPassToScript() {
  const k = document.getElementById("k").value; // коэффициент трения
  const g = document.getElementById("g").value; // ускорение свободного падения
  const l = document.getElementById("l").value; // длина маятника
  const a = document.getElementById("a").value; // частота осцилляций
  const w = document.getElementById("w").value; // частота
  const t = document.getElementById("t").value; // время

  // обновление значений
  addToTable(k, g, l, a, w, t);

  var anglesOfDeflection = solveEquation(k, g, l, a, w, t);
  console.log(anglesOfDeflection);

  buildGraph(anglesOfDeflection); 

  const canvas = document.getElementById("pendulumCanvas");
  const ctx = canvas.getContext("2d");

  const pendulum = {
    originX: canvas.width / 2,
    originY: canvas.height / 2,
    rodLength: 200,
    counter: 1,

  update: function(k, g, l, a, w, t) {
      const dt = 0.01;
      const numSteps = 1000;

      console.log(k, g, l, a, w, t)

      let f = 0.01;
      let dfdt = 0;

      var i = this.counter

      if (i > ((100 * t) - 2)) {
          this.counter = 1;
      }
  
      this.angle = anglesOfDeflection[i] * 100;

      // Добавьте вертикальное перемещение к точке поворота
      const verticalAmplitude = a * 20; // Отрегулируйте амплитуду вертикального движения
      const verticalFrequency = w; // Отрегулируйте частоту вертикального перемещения
      this.originY = canvas.height / 2 + verticalAmplitude * Math.sin(verticalFrequency * i * dt);

      this.counter += 1;
  },
  
  draw: function() {
      // Очистка холста
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the color to red
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";

      // Вычисление положения маятника
      const bobX = this.originX + this.rodLength * Math.sin(this.angle);
      const bobY = (this.originY + this.rodLength * (-Math.cos(this.angle)));
      console.log(`Value counter ${this.counter}`);
      console.log(`Value angle ${this.angle}`);
      console.log(`Value bobX: ${bobX}`);
      console.log(`Value bobY: ${bobY}`);

      // Рисование стержня маятника
      ctx.beginPath();
      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Рисование груза маятника
      ctx.beginPath();
      ctx.arc(bobX, bobY, 10, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  function animate() {
    pendulum.update(k, g, l, a, w, t);
    pendulum.draw();
   requestAnimationFrame(animate);
  }
  animate();
}

var myChart

function buildGraph(data) {

  if (myChart) {
    myChart.destroy();
  }
  var ctx = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(ctx, {
    type: 'line', // Указываем тип графика - линейный
    data: {
      labels: data.map((_, index) => index + 1), // Создаем массив с метками для оси X
      datasets: [
        {
          label: 'Angle of deflection',
          data: data,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        x: {
            title: {
                display: true,
                text: 'Time'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Angle of deflection'
            }
        }
    }
    }
  });
}

function downloadGraph() {
  // Проверка наличия графика
  if (!myChart) {
      alert('Пожалуйста, постройте график перед загрузкой.');
      return;
  }
  // Получение элемента canvas
  var canvas = document.getElementById('myChart');

  // Преобразование содержимого canvas в Blob
  canvas.toBlob(function (blob) {
      // Создание ссылки для скачивания
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'chart.png'; // Вы можете изменить имя файла и расширение при необходимости

      // Добавление ссылки в документ
      document.body.appendChild(link);

      // Имитация клика по ссылке для начала загрузки
      link.click();

      // Удаление ссылки из документа
      document.body.removeChild(link);
  });
}

function addToTable(k, g, l, a, w, t) {
  // Получаем тело таблицы
  var tableBody = document.getElementById("tableBody");
  var tableBodyMain = document.getElementById("tableBodyMain");
  
  // Очистите существующие строки в теле таблицы
  tableBody.innerHTML = "";
  tableBodyMain.innerHTML = "";

  // Добавьте новые строки в тело таблицы с введенными пользователем значениями
  addRow(tableBody, "k", k);
  addRow(tableBody, "g", g);
  addRow(tableBody, "L", l);
  addRow(tableBody, "a", a);
  addRow(tableBody, "ω", w);
  addRow(tableBody, "t", t);

  addRow(tableBodyMain, "k", k);
  addRow(tableBodyMain, "g", g);
  addRow(tableBodyMain, "L", l);
  addRow(tableBodyMain, "a", a);
  addRow(tableBodyMain, "ω", w);
  addRow(tableBodyMain, "t", t);
}
// Функция для добавления строки в таблицу
function addRow(tableBody, parameter, value) {
  var newRow = tableBody.insertRow(tableBody.rows.length);
  
  var cellParameter = newRow.insertCell(0);
  cellParameter.textContent = parameter;

  var cellValue = newRow.insertCell(1);
  cellValue.textContent = value;
}
