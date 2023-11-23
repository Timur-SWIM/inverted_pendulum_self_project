function solveEquation(k, g, l, a, w, t) {
  const dt = 0.01;
  const numSteps = 1000;

  let f = 0.01;
  let dfdt = 0;

  const angles = []; // список углов отклонения

  for (let i = 1; i < numSteps; i++) {
    const d2fdt2 = -2 * k * dfdt - (g / l - a * w * w * Math.cos(w * i * dt) / l) * Math.sin(f);
    dfdt += d2fdt2 * dt;
    f += dfdt * dt;

    angles.push(f);
  }

  return angles.reverse();
}

function getDataAndPassToScript() {
  var k = document.getElementById("k").value; // коэффициент трения
  var g = 9.8; // ускорение свободного падения
  var l = document.getElementById("l").value; // длина маятника
  var a = document.getElementById("A").value; // частота осцилляций
  var w = document.getElementById("w").value; // частота
  var t = document.getElementById("t").value; // время

  k = parseFloat(k)
  l = parseFloat(l)
  a = parseFloat(a)
  w = parseFloat(w)
  t = parseFloat(t)

  var anglesOfDeflection = solveEquation(k, g, l, a, w, t);
  console.log(anglesOfDeflection);

  buildGraph(anglesOfDeflection)
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