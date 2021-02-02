var time_left;
let timerId;
var score;
let need;
let needs = [{class: "sausage", name: "всю колбасу"}, {class: "cheese", name: "весь сыр"},
    {class: "mushroom", name: "все грибы"}];
let field;
let box_coords;
let box_width;
let box_height;
var pos_score;
let how_many_need;

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

    window.localStorage.setItem("level1_started", "true");
    window.localStorage.setItem("level1_done", "false");
    window.localStorage.setItem("level2_started", "false");
    window.localStorage.setItem("level2_done", "false");
    window.localStorage.setItem("level3_started", "false");
    window.localStorage.setItem("level3_done", "false");

    window.localStorage.setItem("score", "0");
    window.localStorage.setItem("time_left", "180");
    score = 0;
    pos_score = 0;
    time_left = 180;
    let need_index = getRandomInt(0, needs.length);
    let temp_need = needs[need_index];
    need = temp_need.class;
    document.getElementById("what").innerHTML = "Собери " + temp_need.name;
    how_many_need = 10;
    field = document.getElementById("field");
    field.style.display = "block";
    box_coords = getCoords(field);
    box_width = field.offsetWidth;
    box_height = field.offsetHeight;
    for (var i = 0; i < needs.length; i++) {
        createItems(needs[i].class, (need_index === i) ? how_many_need : 10);
    }

    one_second();
    document.getElementById("timer").style.display = "block";
    timerId = setInterval(() => one_second(), 1000);
}

function one_second() {
    time_left--;

    if (time_left % 2 === 0) changeReallyAll(item => changeCoords(item));

    document.getElementById("timer").innerHTML = getTimeMinSecStr(getTimeMinSec(time_left));

    if (time_left <= 0) fail();
}

function stop() {
    document.getElementById("result").innerHTML = "Собрано!";
    document.getElementById("new_level").style.display = "block";
    window.localStorage.setItem("level1_done", "true");
    stopFail();
}

function fail() {
    document.getElementById("result").innerHTML = "Время вышло :(";
    document.getElementById("result_pic").src = "img/fail.png";
    stopFail();
}

function stopFail() {
    clearInterval(timerId);
    window.localStorage.setItem("time_left", time_left.toString());
    window.localStorage.setItem("score", score.toString());
    changeReallyAll(item => item.style.display = "none");
    document.getElementById("result").style.display = "block";
    document.getElementById("result_pic").style.display = "block";
    field.style.display = "none";
    updateScoreCount();
}

function changeReallyAll(f) {
    for (var i = 0; i < needs.length; i++) {
        changeAll(needs[i].class, f);
    }
}

function changeAll(whatClass, f) {
    let all = document.getElementsByClassName(whatClass);
    for (var i = 0; i < all.length; i++) {
        f(all[i]);
    }
}

function createItems(what, how_many) {
    for (var i = 0; i < how_many; i++) {
        let s = document.createElement("div");
        s.className = what;
        s.onclick = () => onClick(s);
        field.appendChild(s);
        newCoords(s);
    }
}

function changeCoords(elem) {
    switch (getRandomInt(0, 4)) {
        case 0:
            elem.style.transform = "translate("+ getRandomTranslate() +"px, " + getRandomTranslate() +"px)";
            break;
        case 1:
            elem.style.transform = "translate(-"+ getRandomTranslate() +"px, " + getRandomTranslate() +"px)";
            break;
        case 2:
            elem.style.transform = "translate("+ getRandomTranslate() +"px, -" + getRandomTranslate() +"px)";
            break;
        case 3:
            elem.style.transform = "translate(-"+ getRandomTranslate() +"px, -" + getRandomTranslate() +"px)";
            break;
    }
}

function getRandomTranslate() {
    return getRandomInt(15, 50);
}

function newCoords(elem) {
    elem.style.left = (box_coords.left + getRandomInt(50, box_width - 100)) + "px";
    elem.style.top = (box_coords.top + getRandomInt(100, box_height - 100)) + "px";
}

function onClick(s) {
    if (s.classList.contains(need)) {
        s.classList.add("green");
        s.onclick = () => null;
        setTimeout(() => s.style.display = "none", 2000);
        score += 2;
        pos_score++;
        if (pos_score >= how_many_need) {
            stop();
        }
    } else {
        s.classList.add("red");
        setTimeout(() => s.classList.remove("red"), 2000);
        score -= 1;
    }
}