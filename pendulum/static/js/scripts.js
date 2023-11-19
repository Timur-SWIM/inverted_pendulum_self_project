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
  
  const k = 0.5; // коэффициент трения
  const g = 9.8; // ускорение свободного падения
  const l = 2; // длина маятника
  const a = 0.2; // частота осцилляций
  const w = 2; // частота
  const t = 10; // время
  
  const anglesOfDeflection = solveEquation(k, g, l, a, w, t);
  console.log(anglesOfDeflection);
  
  //строим график
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');
  
  // Создаем новый график с использованием Chart.js
  const myChart = new Chart(ctx, {
    type: 'line', // Указываем тип графика - линейный
    data: {
      labels: anglesOfDeflection.map((_, index) => index + 1), // Создаем массив с метками для оси X
      datasets: [
        {
          label: 'Angle of deflection',
          data: anglesOfDeflection,
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
  
  // // Function to save the chart as an image
  // function saveChartAsImage(chart) {
  //   const image = chart.toBase64Image(); // Convert the chart to a base64-encoded image
  
  //   // Create a temporary link element
  //   const link = document.createElement('a');
  //   link.href = image;
  //   link.download = 'chart.png'; // Set the desired file name
  
  //   // Programmatically click the link to trigger the download
  //   link.click();
  // }
  
  // // Example usage
  // saveChartAsImage(myChart);