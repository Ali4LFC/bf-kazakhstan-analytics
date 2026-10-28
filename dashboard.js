(function () {
  "use strict";

  if (!document.body || document.body.dataset.page !== "dashboard") return;
  if (typeof Chart === "undefined" || !window.BFK_DATA) return;

  var charts = [];
  var data = window.BFK_DATA;
  var usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function palette() {
    return [
      css("--series-1"),
      css("--series-2"),
      css("--series-3"),
      css("--series-4"),
      css("--series-5"),
      css("--series-6"),
      css("--series-7"),
      css("--series-8"),
      css("--series-9"),
      css("--series-10"),
      css("--series-11"),
      css("--series-12"),
      css("--series-13"),
    ];
  }

  function destroyCharts() {
    charts.forEach(function (chart) {
      chart.destroy();
    });
    charts = [];
  }

  function baseOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 950,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          labels: {
            color: css("--text-2"),
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            boxWidth: 10,
          },
        },
        tooltip: {
          backgroundColor: css("--surface-3"),
          titleColor: css("--text"),
          bodyColor: css("--text-2"),
          borderColor: css("--line-strong"),
          borderWidth: 1,
          padding: 12,
          displayColors: true,
        },
      },
    };
  }

  function axisOptions() {
    return {
      x: {
        grid: {
          color: css("--chart-grid"),
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          color: css("--chart-tick"),
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: css("--chart-grid"),
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          color: css("--chart-tick"),
        },
      },
    };
  }

  function makeChart(id, config) {
    var canvas = document.getElementById(id);
    if (!canvas) return;
    charts.push(new Chart(canvas, config));
  }

  function createCharts() {
    var series = palette();
    Chart.defaults.color = css("--text-2");
    Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
    Chart.defaults.borderColor = css("--chart-grid");

    makeChart("exportChart", {
      type: "bar",
      data: {
        labels: data.exportCountryCounts.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            label: "Shipments",
            data: data.exportCountryCounts.map(function (item) {
              return item[1];
            }),
            backgroundColor: series,
            borderRadius: 10,
            borderSkipped: false,
            maxBarThickness: 34,
          },
        ],
      },
      options: Object.assign(baseOptions(), {
        plugins: Object.assign(baseOptions().plugins, {
          legend: { display: false },
        }),
        scales: axisOptions(),
      }),
    });

    makeChart("originChart", {
      type: "bar",
      data: {
        labels: data.originCountryCounts.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            label: "Shipments",
            data: data.originCountryCounts.map(function (item) {
              return item[1];
            }),
            backgroundColor: series,
            borderRadius: 10,
            borderSkipped: false,
            maxBarThickness: 34,
          },
        ],
      },
      options: Object.assign(baseOptions(), {
        plugins: Object.assign(baseOptions().plugins, {
          legend: { display: false },
        }),
        scales: axisOptions(),
      }),
    });

    makeChart("transportChart", {
      type: "doughnut",
      data: {
        labels: data.transportDistribution.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            data: data.transportDistribution.map(function (item) {
              return item[1];
            }),
            backgroundColor: [series[1], series[3], series[2]],
            borderColor: css("--chart-border"),
            borderWidth: 4,
            hoverOffset: 8,
          },
        ],
      },
      options: Object.assign(baseOptions(), {
        cutout: "62%",
      }),
    });

    makeChart("portChart", {
      type: "pie",
      data: {
        labels: data.portDistribution.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            data: data.portDistribution.map(function (item) {
              return item[1];
            }),
            backgroundColor: [series[0], series[2], series[4]],
            borderColor: css("--chart-border"),
            borderWidth: 4,
          },
        ],
      },
      options: baseOptions(),
    });

    makeChart("valueChart", {
      type: "bar",
      data: {
        labels: data.valueByExportCountry.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            label: "Trade value",
            data: data.valueByExportCountry.map(function (item) {
              return item[1];
            }),
            backgroundColor: series[0],
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: Object.assign(baseOptions(), {
        indexAxis: "y",
        plugins: Object.assign(baseOptions().plugins, {
          legend: { display: false },
          tooltip: Object.assign(baseOptions().plugins.tooltip, {
            callbacks: {
              label: function (context) {
                return " " + usd.format(context.parsed.x);
              },
            },
          }),
        }),
        scales: {
          x: Object.assign(axisOptions().x, {
            ticks: {
              color: css("--chart-tick"),
              callback: function (value) {
                return usd.format(value);
              },
            },
          }),
          y: Object.assign(axisOptions().y, {
            ticks: {
              color: css("--chart-tick"),
            },
          }),
        },
      }),
    });

    makeChart("currencyChart", {
      type: "doughnut",
      data: {
        labels: data.currencyDistribution.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            data: data.currencyDistribution.map(function (item) {
              return item[1];
            }),
            backgroundColor: [series[0], series[3], series[2], series[5]],
            borderColor: css("--chart-border"),
            borderWidth: 4,
            hoverOffset: 8,
          },
        ],
      },
      options: Object.assign(baseOptions(), {
        cutout: "58%",
        plugins: Object.assign(baseOptions().plugins, {
          tooltip: Object.assign(baseOptions().plugins.tooltip, {
            callbacks: {
              label: function (context) {
                var total = context.dataset.data.reduce(function (sum, item) {
                  return sum + item;
                }, 0);
                var percent = ((context.parsed / total) * 100).toFixed(1);
                return " " + context.label + ": " + usd.format(context.parsed) + " (" + percent + "%)";
              },
            },
          }),
        }),
      }),
    });

    makeChart("hsChart", {
      type: "bar",
      data: {
        labels: data.hsChapters.map(function (item) {
          return item[0];
        }),
        datasets: [
          {
            label: "Shipments",
            data: data.hsChapters.map(function (item) {
              return item[1];
            }),
            backgroundColor: series,
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: Object.assign(baseOptions(), {
        plugins: Object.assign(baseOptions().plugins, {
          legend: { display: false },
        }),
        scales: axisOptions(),
      }),
    });
  }

  function initSlider() {
    var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("sliderDots");
    if (!slides.length || !dotsWrap) return;

    var current = 0;

    function show(index) {
      slides[current].classList.remove("active");
      dotsWrap.children[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dotsWrap.children[current].classList.add("active");
    }

    slides.forEach(function (_, index) {
      var dot = document.createElement("button");
      dot.className = "dot" + (index === 0 ? " active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to insight slide " + (index + 1));
      dot.addEventListener("click", function () {
        show(index);
      });
      dotsWrap.appendChild(dot);
    });

    document.querySelectorAll("[data-slide]").forEach(function (button) {
      button.addEventListener("click", function () {
        show(current + Number(button.dataset.slide));
      });
    });

    setInterval(function () {
      show(current + 1);
    }, 5000);
  }

  function initExports() {
    document.querySelectorAll("[data-export-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var canvas = document.getElementById(button.dataset.exportTarget);
        if (!canvas) return;
        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = button.dataset.exportTarget + ".png";
        link.click();
      });
    });
  }

  function init() {
    createCharts();
    initSlider();
    initExports();
  }

  window.addEventListener("bfk:themechange", function () {
    destroyCharts();
    createCharts();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
