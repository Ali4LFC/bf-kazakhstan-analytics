(function () {
  "use strict";

  var shipments = [
    {
      date: "29-Aug-2020",
      importerName: "ADIB ENTERPRISE",
      supplierName: "JP Zwagemaker",
      exportCountry: "Netherlands",
      originCountry: "Netherlands",
      productDescription: "PSITTACIFORMES LIVE MAJOR MITCHELLS COCKATOO",
      quantity: 6,
      unit: "NMB",
      totalValueUsd: 141.39,
      currency: "EUR",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "19-Aug-2020",
      importerName: "KARIM TRADERS",
      supplierName: "ZINGELA FORWARDERS",
      exportCountry: "South Africa",
      originCountry: "South Africa",
      productDescription: "PSITTACIFORMES COCKATOO PARROT",
      quantity: 10,
      unit: "NMB",
      totalValueUsd: 160,
      currency: "USD",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "19-Aug-2020",
      importerName: "KHANDAKER TRADE INTERNATIONAL",
      supplierName: "INSHA LTD",
      exportCountry: "Taiwan",
      originCountry: "Taiwan",
      productDescription: "OTHER BIRDS LIVE BUDGERIGAR",
      quantity: 100,
      unit: "NMB",
      totalValueUsd: 250,
      currency: "USD",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "19-Aug-2020",
      importerName: "KARIM TRADERS",
      supplierName: "ZINGELA FORWARDERS",
      exportCountry: "South Africa",
      originCountry: "South Africa",
      productDescription: "OTHER BIRDS LOVE BIRD",
      quantity: 200,
      unit: "NMB",
      totalValueUsd: 1060,
      currency: "USD",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "19-Aug-2020",
      importerName: "AZMERI TRADING",
      supplierName: "SAREFA",
      exportCountry: "Netherlands",
      originCountry: "Netherlands",
      productDescription: "OTHER BIRDS SILVER PHEASANT",
      quantity: 50,
      unit: "NMB",
      totalValueUsd: 1178.31,
      currency: "EUR",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "23-Aug-2020",
      importerName: "INCEPTA VACCINE LIMITED",
      supplierName: "THAI SPF CO LTD",
      exportCountry: "Thailand",
      originCountry: "Thailand",
      productDescription: "Birds Fertilised eggs for incubation SPF EGGS",
      quantity: 125,
      unit: "DZN",
      totalValueUsd: 3720,
      currency: "USD",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "16-Aug-2020",
      importerName: "ZISHAN CORPORATION LIMITED",
      supplierName: "XIAMEN FRIENDSHIP BRIDGE4 CO.LTD",
      exportCountry: "China",
      originCountry: "China",
      productDescription: "Trees,Shrubs,Bushes FRUIT SEEDLINGS",
      quantity: 13,
      unit: "NMB",
      totalValueUsd: 2663,
      currency: "USD",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "16-Aug-2020",
      importerName: "SUPREM EXPORT",
      supplierName: "MAA TARA EXPORT",
      exportCountry: "India",
      originCountry: "India",
      productDescription: "Trees,Shrubs,Bushes JACKFRUITE",
      quantity: 1360,
      unit: "NMB",
      totalValueUsd: 680,
      currency: "USD",
      modeOfTransport: "Road",
      portOfUnloading: "Jessore",
    },
    {
      date: "20-Aug-2020",
      importerName: "KRISHI BEED UPAKARAN NURSERY",
      supplierName: "PRAN INTERNATIONAL",
      exportCountry: "India",
      originCountry: "India",
      productDescription: "Trees,Shrubs,Bushes APPLE SEEDLINGS",
      quantity: 500,
      unit: "NMB",
      totalValueUsd: 200,
      currency: "USD",
      modeOfTransport: "Road",
      portOfUnloading: "Jessore",
    },
    {
      date: "16-Aug-2020",
      importerName: "SUPREM EXPORT",
      supplierName: "MAA TARA EXPORT",
      exportCountry: "India",
      originCountry: "India",
      productDescription: "Roses, Grafted Or Not CHAINA ROSE",
      quantity: 900,
      unit: "NMB",
      totalValueUsd: 450,
      currency: "USD",
      modeOfTransport: "Road",
      portOfUnloading: "Jessore",
    },
    {
      date: "19-Aug-2020",
      importerName: "MANJU INTERNATIONAL",
      supplierName: "PT. GLOBAL VISION IMPEX",
      exportCountry: "Indonesia",
      originCountry: "Indonesia",
      productDescription: "Betelnuts, Semi-processed BETELNUTS (SPLIT)",
      quantity: 18,
      unit: "NMB",
      totalValueUsd: 28800,
      currency: "USD",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "25-Aug-2020",
      importerName: "IBCO FOOD INDUSTRIES LIMITED",
      supplierName: "LAM SOON EDIBLE OILS SDN. BHD",
      exportCountry: "Malaysia",
      originCountry: "Malaysia",
      productDescription: "Margarine MARGARINE (PASTRIFET SK) NPHO",
      quantity: 59760,
      unit: "KGM",
      totalValueUsd: 59760,
      currency: "USD",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "16-Aug-2020",
      importerName: "SAIFUL STORE",
      supplierName: "MOI INTERNATIONAL (SINGAPORE) PTE. LTD.",
      exportCountry: "Malaysia",
      originCountry: "Malaysia",
      productDescription: "Margarine CAKE MARGARINE",
      quantity: 22440,
      unit: "KGM",
      totalValueUsd: 21318,
      currency: "USD",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "05-Aug-2020",
      importerName: "VITALAC DAIRY AND FOOD INDUSTRIES LIMITED",
      supplierName: "FASSKA PAR.",
      exportCountry: "Belgium",
      originCountry: "Netherlands",
      productDescription: "Infant preparations BIOMIL 3 GROWING-UP MILK FORMULA",
      quantity: 72750,
      unit: "KGM",
      totalValueUsd: 353876.72,
      currency: "EUR",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "24-Aug-2020",
      importerName: "FOODEX INTERNATIONAL",
      supplierName: "SA DES EAUX MINERALES D EVIAN",
      exportCountry: "France",
      originCountry: "France",
      productDescription: "Mineral Waters NATURAL SPRING WATER",
      quantity: 23094,
      unit: "LTR",
      totalValueUsd: 8284.38,
      currency: "SGD",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "31-Aug-2020",
      importerName: "UNIVERSAL TRADING HOUSE",
      supplierName: "TRIGON FOOD BV",
      exportCountry: "Netherlands",
      originCountry: "France",
      productDescription: "Mineral Waters MINERAL WATER",
      quantity: 11880,
      unit: "LTR",
      totalValueUsd: 3776.14,
      currency: "EUR",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "17-Aug-2020",
      importerName: "FOODEX INTERNATIONAL",
      supplierName: "RANREA GENERAL TRADING LLC",
      exportCountry: "United Arab Emirates",
      originCountry: "United Arab Emirates",
      productDescription: "OTHER WATER ROSE WATER",
      quantity: 162,
      unit: "LTR",
      totalValueUsd: 81,
      currency: "USD",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "09-Aug-2020",
      importerName: "SABIR TRADERS LIMITED COMMISSARIAT",
      supplierName: "HEINEKEN ASIA PACIFIC BEVERAGES PTE. LTD",
      exportCountry: "Singapore",
      originCountry: "Singapore",
      productDescription: "Beer Made From Malt HEINEKEN BEER",
      quantity: 17820,
      unit: "LTR",
      totalValueUsd: 11250,
      currency: "USD",
      modeOfTransport: "Sea",
      portOfUnloading: "Chittagong",
    },
    {
      date: "20-Aug-2020",
      importerName: "BEXIMCO PHARMACEUTICALS LIMITED",
      supplierName: "EASTWAYS PARK",
      exportCountry: "United Kingdom",
      originCountry: "United Kingdom",
      productDescription: "Undenatured Ethyl Alcohol PH RAW ABSOLUTE ETHANOL",
      quantity: 6000,
      unit: "LTR",
      totalValueUsd: 31297.06,
      currency: "GBP",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
    {
      date: "20-Aug-2020",
      importerName: "THE BIG SOCIETI UK",
      supplierName: "THE BIG SOCIETI UK LTD.",
      exportCountry: "United Kingdom",
      originCountry: "United Kingdom",
      productDescription: "Vinegar APPLE CIDER VINEGAR",
      quantity: 624,
      unit: "LTR",
      totalValueUsd: 843.75,
      currency: "USD",
      modeOfTransport: "Air",
      portOfUnloading: "Dhaka",
    },
  ];

  var BFK_DATA = {
    shipments: shipments,
    kpis: {
      totalShipments: 20,
      totalTradeValueUsd: 529789.75,
      exportCountries: 13,
      totalTaxesBdt: 20449684.79,
    },
    summaryStats: [
      { label: "Average shipment value", value: "$26,489.49" },
      { label: "Minimum shipment value", value: "$81.00" },
      { label: "Maximum shipment value", value: "$353,876.72" },
      { label: "Total value in BDT", value: "47,151,316.11" },
      { label: "Average value in BDT", value: "2,357,565.81" },
      { label: "Average tax per shipment", value: "1,022,484.24 BDT" },
      { label: "Total quantity", value: "217,812" },
      { label: "Gross weight", value: "249,035.58 kg" },
      { label: "Net weight", value: "237,810.70 kg" },
      { label: "Origin countries", value: "12" },
    ],
    exportCountryCounts: [
      ["Netherlands", 3],
      ["India", 3],
      ["South Africa", 2],
      ["Malaysia", 2],
      ["United Kingdom", 2],
      ["Taiwan", 1],
      ["Thailand", 1],
      ["China", 1],
      ["Indonesia", 1],
      ["Belgium", 1],
      ["France", 1],
      ["United Arab Emirates", 1],
      ["Singapore", 1],
    ],
    originCountryCounts: [
      ["Netherlands", 3],
      ["India", 3],
      ["South Africa", 2],
      ["Malaysia", 2],
      ["France", 2],
      ["United Kingdom", 2],
      ["Taiwan", 1],
      ["Thailand", 1],
      ["China", 1],
      ["Indonesia", 1],
      ["United Arab Emirates", 1],
      ["Singapore", 1],
    ],
    transportDistribution: [
      ["Air", 9],
      ["Sea", 8],
      ["Road", 3],
    ],
    portDistribution: [
      ["Dhaka", 9],
      ["Chittagong", 8],
      ["Jessore", 3],
    ],
    valueByExportCountry: [
      ["Belgium", 353876.72],
      ["Malaysia", 81078],
      ["United Kingdom", 32140.81],
      ["Indonesia", 28800],
      ["Singapore", 11250],
      ["France", 8284.38],
      ["Netherlands", 5095.84],
      ["Thailand", 3720],
      ["China", 2663],
      ["India", 1330],
      ["South Africa", 1220],
      ["Taiwan", 250],
      ["United Arab Emirates", 81],
    ],
    currencyDistribution: [
      ["USD", 131235.75],
      ["EUR", 358972.56],
      ["SGD", 8284.38],
      ["GBP", 31297.06],
    ],
    hsChapters: [
      ["22 Beverages", 6],
      ["1 Live Animals", 5],
      ["6 Trees and Plants", 4],
      ["15 Fats and Oils", 2],
      ["4 Dairy and Eggs", 1],
      ["8 Fruit and Nuts", 1],
      ["19 Preparations", 1],
    ],
    topShipments: [
      ["VITALAC DAIRY AND FOOD INDUSTRIES LIMITED", "BIOMIL 3 GROWING-UP MILK FORMULA", 353876.72],
      ["IBCO FOOD INDUSTRIES LIMITED", "MARGARINE (PASTRIFET SK) NPHO", 59760],
      ["BEXIMCO PHARMACEUTICALS LIMITED", "PH RAW ABSOLUTE ETHANOL", 31297.06],
      ["MANJU INTERNATIONAL", "BETELNUTS (SPLIT)", 28800],
      ["SAIFUL STORE", "CAKE MARGARINE", 21318],
    ],
    topImporters: [
      ["KARIM TRADERS", 2],
      ["SUPREM EXPORT", 2],
      ["FOODEX INTERNATIONAL", 2],
    ],
    topSuppliers: [
      ["ZINGELA FORWARDERS", 2],
      ["MAA TARA EXPORT", 2],
    ],
    incoterms: [
      ["CFR", 16],
      ["CPT", 2],
      ["CIF", 2],
    ],
    units: [
      ["NMB", 10],
      ["LTR", 6],
      ["KGM", 3],
      ["DZN", 1],
    ],
    exchangeRates: [
      ["84.95", 14],
      ["97.8637", 3],
      ["93.2573", 1],
      ["61.3389", 1],
      ["108.4582", 1],
    ],
  };

  window.BFK_DATA = BFK_DATA;

  function parseDate(value) {
    var parts = value.split("-");
    var months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(Number(parts[2]), months[parts[1]], Number(parts[0])).getTime();
  }

  function escapeCsv(value) {
    var text = String(value);
    if (text.indexOf('"') > -1) text = text.replace(/"/g, '""');
    if (/[",\n]/.test(text)) return '"' + text + '"';
    return text;
  }

  function initExplorer() {
    if (!document.body || document.body.dataset.page !== "data") return;

    var searchInput = document.getElementById("shipmentSearch");
    var countryFilter = document.getElementById("countryFilter");
    var transportFilter = document.getElementById("transportFilter");
    var currencyFilter = document.getElementById("currencyFilter");
    var clearButton = document.getElementById("clearFilters");
    var exportButton = document.getElementById("exportCsv");
    var resultsCount = document.getElementById("resultsCount");
    var tableBody = document.getElementById("shipmentRows");
    var pager = document.getElementById("pager");
    var emptyState = document.getElementById("emptyState");
    var sortableHeaders = Array.prototype.slice.call(document.querySelectorAll("th.sortable"));

    if (!searchInput || !tableBody) return;

    var state = {
      search: "",
      country: "all",
      transport: "all",
      currency: "all",
      sortKey: "date",
      sortDir: "desc",
      page: 1,
      perPage: 8,
    };

    function fillSelect(select, values) {
      values.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
    }

    fillSelect(
      countryFilter,
      BFK_DATA.exportCountryCounts.map(function (item) {
        return item[0];
      }),
    );
    fillSelect(
      transportFilter,
      BFK_DATA.transportDistribution.map(function (item) {
        return item[0];
      }),
    );
    fillSelect(
      currencyFilter,
      BFK_DATA.currencyDistribution.map(function (item) {
        return item[0];
      }),
    );

    function modeTag(mode) {
      if (mode === "Air") return "tag tag-air";
      if (mode === "Sea") return "tag tag-sea";
      return "tag tag-road";
    }

    function compare(a, b) {
      var key = state.sortKey;
      var factor = state.sortDir === "asc" ? 1 : -1;
      var left = a[key];
      var right = b[key];

      if (key === "date") {
        left = parseDate(left);
        right = parseDate(right);
      }

      if (typeof left === "number" && typeof right === "number") {
        return (left - right) * factor;
      }

      return String(left).localeCompare(String(right)) * factor;
    }

    function filteredRows() {
      var query = state.search.trim().toLowerCase();

      return shipments
        .filter(function (item) {
          var matchesSearch =
            !query ||
            [
              item.date,
              item.importerName,
              item.supplierName,
              item.exportCountry,
              item.originCountry,
              item.productDescription,
              item.currency,
              item.modeOfTransport,
              item.portOfUnloading,
            ]
              .join(" ")
              .toLowerCase()
              .indexOf(query) > -1;

          return (
            matchesSearch &&
            (state.country === "all" || item.exportCountry === state.country) &&
            (state.transport === "all" || item.modeOfTransport === state.transport) &&
            (state.currency === "all" || item.currency === state.currency)
          );
        })
        .sort(compare);
    }

    function setSortState() {
      sortableHeaders.forEach(function (header) {
        var isActive = header.dataset.sort === state.sortKey;
        header.setAttribute(
          "aria-sort",
          isActive ? (state.sortDir === "asc" ? "ascending" : "descending") : "none",
        );
      });
    }

    function renderPager(totalPages) {
      pager.innerHTML = "";
      if (totalPages <= 1) return;

      function addButton(label, page, disabled, current) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.disabled = !!disabled;
        if (current) button.setAttribute("aria-current", "true");
        button.addEventListener("click", function () {
          state.page = page;
          render();
        });
        pager.appendChild(button);
      }

      addButton("Prev", Math.max(1, state.page - 1), state.page === 1, false);
      for (var page = 1; page <= totalPages; page += 1) {
        addButton(String(page), page, false, page === state.page);
      }
      addButton("Next", Math.min(totalPages, state.page + 1), state.page === totalPages, false);
    }

    function render() {
      var rows = filteredRows();
      var totalPages = Math.max(1, Math.ceil(rows.length / state.perPage));
      if (state.page > totalPages) state.page = totalPages;

      var start = (state.page - 1) * state.perPage;
      var pageRows = rows.slice(start, start + state.perPage);

      tableBody.innerHTML = pageRows
        .map(function (item) {
          return (
            "<tr>" +
            "<td>" +
            item.date +
            "</td>" +
            '<td class="cell-strong">' +
            item.importerName +
            "</td>" +
            "<td>" +
            item.supplierName +
            "</td>" +
            "<td>" +
            item.exportCountry +
            "</td>" +
            "<td>" +
            item.originCountry +
            "</td>" +
            "<td>" +
            item.productDescription +
            "</td>" +
            '<td class="num">' +
            new Intl.NumberFormat("en-US").format(item.quantity) +
            "</td>" +
            "<td>" +
            item.unit +
            "</td>" +
            '<td class="num">' +
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(item.totalValueUsd) +
            "</td>" +
            "<td><span class='tag'>" +
            item.currency +
            "</span></td>" +
            "<td><span class='" +
            modeTag(item.modeOfTransport) +
            "'>" +
            item.modeOfTransport +
            "</span></td>" +
            "<td>" +
            item.portOfUnloading +
            "</td>" +
            "</tr>"
          );
        })
        .join("");

      emptyState.classList.toggle("show", rows.length === 0);
      resultsCount.innerHTML = "<b>" + rows.length + "</b> matching shipment records";
      renderPager(totalPages);
      setSortState();
    }

    searchInput.addEventListener("input", function () {
      state.search = searchInput.value;
      state.page = 1;
      render();
    });

    countryFilter.addEventListener("change", function () {
      state.country = countryFilter.value;
      state.page = 1;
      render();
    });

    transportFilter.addEventListener("change", function () {
      state.transport = transportFilter.value;
      state.page = 1;
      render();
    });

    currencyFilter.addEventListener("change", function () {
      state.currency = currencyFilter.value;
      state.page = 1;
      render();
    });

    clearButton.addEventListener("click", function () {
      state.search = "";
      state.country = "all";
      state.transport = "all";
      state.currency = "all";
      state.page = 1;
      searchInput.value = "";
      countryFilter.value = "all";
      transportFilter.value = "all";
      currencyFilter.value = "all";
      render();
    });

    exportButton.addEventListener("click", function () {
      var headers = [
        "DATE",
        "IMPORTER NAME",
        "SUPPLIER NAME",
        "EXPORT COUNTRY",
        "ORIGIN COUNTRY",
        "PRODUCT DESCRIPTION",
        "QUANTITY",
        "UNIT",
        "TOTAL VALUE USD",
        "CURRENCY",
        "MODE OF TRANSPORT",
        "PORT OF UNLOADING",
      ];

      var csv =
        headers.join(",") +
        "\n" +
        filteredRows()
          .map(function (item) {
            return [
              item.date,
              item.importerName,
              item.supplierName,
              item.exportCountry,
              item.originCountry,
              item.productDescription,
              item.quantity,
              item.unit,
              item.totalValueUsd,
              item.currency,
              item.modeOfTransport,
              item.portOfUnloading,
            ]
              .map(escapeCsv)
              .join(",");
          })
          .join("\n");

      var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "bfk-shipments-filtered.csv";
      link.click();
      URL.revokeObjectURL(url);
    });

    sortableHeaders.forEach(function (header) {
      header.addEventListener("click", function () {
        var key = header.dataset.sort;
        if (state.sortKey === key) {
          state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
        } else {
          state.sortKey = key;
          state.sortDir = key === "date" || key === "totalValueUsd" || key === "quantity" ? "desc" : "asc";
        }
        render();
      });
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initExplorer);
  } else {
    initExplorer();
  }
})();
