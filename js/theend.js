if (window.localStorage.getItem("level0_done") === "false") {
    changeWhat("Начните игру с нулевого уровня");
    changeAbout("Мы ничего о тебе не знаем :(");
    showButton("index.html", "Перейти ко вступлению");
} else if (window.localStorage.getItem("level3_done") === "true") {
    changeWhat("Ура! Ты смог!");
    changeAbout("Мы вовремя отгрузили всю пиццу оленям, а они доставили ее в каждый дом! " +
        "Гринч не смог испортить Новый год!");
    showPicWin(true);
    showInfo();
} else if (Number.parseInt(window.localStorage.getItem("time_left")) <= 0) {
    changeWhat("Время закончилось, вы проиграли. Начните игру с первого уровня");
    changeAbout("Злобный Гринч победил, Новый год испорчен :(((((");
    showPicWin(false);
    showButton("level1.html", "Перейти к первому уровню");
    showInfo();
} else if (window.localStorage.getItem("level2_done") === "true") {
    changeWhat("Пройдите третий уровень");
    changeAbout("Ингредиенты собраны, разобраны и подсчитаны, но самое главное - пиццы еще не готовы!");
    showButton("level3.html", "Перейти к третьему уровню");
    showInfo();
} else if (window.localStorage.getItem("level1_done") === "true") {
    changeWhat("Пройдите второй уровень");
    changeAbout("Ингредиенты собраны, но их еще нужно подсчитать и приготовить пиццы!");
    showButton("level2.html", "Перейти ко второму уровню");
    showInfo();
} else {
    changeWhat("Начните игру с первого уровня");
    changeAbout("Нужно собрать ингредиенты, подсчитать их и приготовить пиццы!");
    showButton("level1.html", "Перейти к первому уровню");
}

//showInfo();

updateScoreCount();

function changeWhat(text) {
    document.getElementById("what").innerHTML = text;
}

function changeAbout(text) {
    document.getElementById("about").innerHTML = text;
}

function showButton(href, name) {
    let button = document.getElementById("letsgo");
    button.href = href;
    button.innerHTML = name;
    button.style.display = "block";
}

function showPicWin(winBool) {
    document.getElementById("result_pic").style.display = "block";
    if (winBool) {
        document.getElementById("result_pic").src = "img/win.png";
    } else {
        document.getElementById("result_pic").src = "img/fail.png";
    }
}

function showInfo() {
    document.getElementById("result").innerHTML = "Информация о твоем прохождении игры:";
    document.getElementById("result1").innerHTML = getNameInfo();
    document.getElementById("result2").innerHTML = getScoreInfo();
    document.getElementById("result3").innerHTML = getTimeInfo();
    document.getElementById("download_button").style.display = "block";
}

function getFilename() {
    let name = getName();
    return "PizzaGame" + (name ? ("_" + name) : "") + "_" + getCurrentDate() + ".txt";
}

function getCurrentDate() {
    let today = new Date();

    let ss = String(today.getSeconds()).padStart(2, '0');
    let mi = String(today.getMinutes()).padStart(2, '0');
    let hh = String(today.getHours()).padStart(2, '0');

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    let yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd + "-" + hh + "-" + mi + "-" + ss;
}

function getDownloadInfo() {
    return "Информация о прохождении игры PizzaGame: \n"
        + getNameInfo() + ". \n"
        + getScoreInfo() + ". \n"
        + getTimeInfo() + ".";
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}