var time_left;
let timerId;
var score;
let types = [{class: "sausage", name: "колбасы"}, {class: "cheese", name: "сыра"},
    {class: "mushroom", name: "грибов"}];
let items = [];
let steps = 10;
var currentStep;
let qWhat;
let box;
let box_coords;
let box_width;
let box_height;
let picItems = [];

updateScoreCount();

function start_level() {
    document.getElementById("about").style.display = "none";
    document.getElementById("start_button").style.display = "none";
    document.getElementById("start_pic").style.display = "none";
    document.getElementById("what").style.display = "block";

    if (window.localStorage.getItem("level0_done") === "false") {
        document.getElementById("what").innerHTML = "Начните игру с нулевого уровня";
        return;
    }
    if (window.localStorage.getItem("level1_done") === "false"
        || window.localStorage.getItem("level2_done") === "true") {
        document.getElementById("what").innerHTML = "Начните игру с первого уровня";
        return;
    }
    if (Number.parseInt(window.localStorage.getItem("time_left")) <= 0) {
        document.getElementById("what").innerHTML =
            "Время закончилось, вы проиграли. Начните игру с первого уровня";
        return;
    }

    window.localStorage.setItem("level2_started", "true");
    window.localStorage.setItem("level2_done", "false");
    window.localStorage.setItem("level3_started", "false");
    window.localStorage.setItem("level3_done", "false");

    document.getElementById("yes_button").style.display = "block";
    document.getElementById("no_button").style.display = "block";

    box = document.getElementById("box");
    box.style.display = "block";
    box_width = box.offsetWidth / 3;
    box_height = box.offsetHeight;
    box_coords = getCoords(box);
    box_coords.left += box_width;
    score = Number.parseInt(window.localStorage.getItem("score"));
    time_left = Number.parseInt(window.localStorage.getItem("time_left"));
    qWhat = document.getElementById("what");

    for (var i = 0; i < steps; i++) {
        let pc = getRandomInt(3, 10);
        let qc = getRandomInt(0, 2) === 0 ? pc : getRandomInt(3, 10);
        items.push({type: types[getRandomInt(0, types.length)],
            picCount: pc, qCount: qc});
    }
    currentStep = -1;
    newStep();

    one_second();
    document.getElementById("timer").style.display = "block";
    timerId = setInterval(() => one_second(), 1000);
}

function newStep() {
    currentStep++;
    if (currentStep < steps) {
        picItems = [];
        let type = items[currentStep].type;
        let picCount = items[currentStep].picCount;
        let qCount = items[currentStep].qCount;
        qWhat.innerHTML = "Здесь должно быть ровно " + qCount + (qCount < 5 ? " кусочка " : " кусочков ") + type.name;
        createItems(type.class, picCount);
    } else {
        stop();
    }
}

function one_second() {
    time_left--;

    document.getElementById("timer").innerHTML = getTimeMinSecStr(getTimeMinSec(time_left));

    if (time_left <= 0) fail();
}

function stop() {
    window.localStorage.setItem("level2_done", "true");
    document.getElementById("result").innerHTML = "Разобрали-посчитали!";
    document.getElementById("new_level").style.display = "block";
    stopFail();
}

function fail() {
    document.getElementById("result").innerHTML = "Время вышло :(";
    document.getElementById("result_pic").src = "img/fail.png";
    stopFail();
}

function stopFail() {
    clearInterval(timerId);
    document.getElementById("yes_button").style.display = "none";
    document.getElementById("no_button").style.display = "none";
    document.getElementById("what").style.display = "none";
    document.getElementById("box").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("result_pic").style.display = "block";
    qWhat.innerHTML = "";
    window.localStorage.setItem("time_left", time_left);
    window.localStorage.setItem("score", score);
    updateScoreCount();
}

function changeAllItems(array, f) {
    for (var i = 0; i < array.length; i++) {
        f(array[i]);
    }
}

function createItems(what, how_many) {
    for (var i = 0; i < how_many; i++) {
        let s = document.createElement("div");
        s.className = what;
        box.appendChild(s);
        changeCoords(s);
        picItems.push(s);
    }
}

function changeCoords(elem) {
    elem.style.left = (box_coords.left + getRandomInt(10, box_width - 70)) + "px";
    elem.style.top = (box_coords.top + getRandomInt(40, box_height - 70)) + "px";
}

function yes() {
    if (items[currentStep].picCount === items[currentStep].qCount) {
        changeAllItems(picItems, elem => moveRight(elem));
        score += 2;
    } else {
        changeAllItems(picItems, elem => moveTop(elem));
        score -= 1;
    }
    newStep();
}

function no() {
    if (items[currentStep].picCount !== items[currentStep].qCount) {
        changeAllItems(picItems, elem => moveLeft(elem));
        score += 2;
    } else {
        changeAllItems(picItems, elem => moveTop(elem));
        score -= 1;
    }
    newStep();
}

function moveTop(elem) {
    elem.classList.add("fly_top");
    elem.style.transform = "translateY(-"+ 5000 +"px)";
}

function moveRight(elem) {
    elem.classList.add("move");
    elem.style.transform = "translateX("+ box_width +"px)";
}

function moveLeft(elem) {
    elem.classList.add("move");
    elem.style.transform = "translateX(-"+ box_width +"px)";
}