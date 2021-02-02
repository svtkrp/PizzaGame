let daynight = window.localStorage.getItem("daynight");
if (daynight) {
    if (daynight === "night") {
        makeNight();
    }
} else {
    window.localStorage.setItem("daynight", "day");
}

function getTimeMinSec(seconds) {
    let minutes = Math.floor(seconds / 60);
    let new_seconds = seconds - minutes * 60;
    return {minutes: minutes, seconds: new_seconds};
}

function getTimeMinSecStr(minSec) {
    /*return minSec.minutes.toString() + ":"
    + minSec.seconds.toString().padStart(2, "0");*/
    return minSec.minutes.toString() + "m "
        + minSec.seconds.toString() + "s";
}

function getName() {
    return window.localStorage.getItem("name");
}

function getNameInfo() {
    let name = getName();
    return "Твое имя: " + (name ? name : "Нет информации");
}

function getScore() {
    return window.localStorage.getItem("score");
}

function getScoreInfo() {
    let score = getScore();
    return "Количество баллов: " + (score ? score : "Нет информации");
}

function getTimeInfo() {
    let time = Number.parseInt(window.localStorage.getItem("time_left"));
    return "Времени осталось: " + (time || time === 0 ? getTimeMinSecStr(getTimeMinSec(time)) : "Нет информации");
}

function getInfo() {
    return "Суперважная инфа: \n"
        + getNameInfo() + ". \n"
        + getScoreInfo() + ". \n"
        + getTimeInfo() + ".";
}

function showInfoAlert() {
    alert(getInfo());
}

function updateScoreCount() {
    let score = getScore();
    document.getElementById("score_count").innerHTML =
        "Баллы: " + (score ? score : "?").toString();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function dayNight() {
    if (window.localStorage.getItem("daynight") === "day") {
        window.localStorage.setItem("daynight", "night");
        makeNight();
    } else {
        window.localStorage.setItem("daynight", "day");
        makeDay();
    }
}

function makeNight() {
    document.getElementById("daynight").src = "img/night.png";

    document.body.style.backgroundColor = "#000000";
    document.querySelector("hr").style.backgroundColor = "#000000";
    doForAll(document.querySelectorAll(".bg_white"), e => e.style.backgroundColor = "#222222");

    document.body.style.color = "#FFFFFF";
    doForAll(document.querySelectorAll(".extra > a"), e => e.style.color = "#FFFFFF");

    doForAll(document.querySelectorAll(".nav > li > a"), e => e.style.color = "#BBBBBB");
    document.querySelector(".nav > li > button").style.color = "#BBBBBB";
    if (document.querySelector(".nav > li > button:disabled"))
        document.querySelector(".nav > li > button:disabled").style.color = "#777777";
    document.querySelector(".nav > li > span").style.color = "#BBBBBB";
    document.querySelector(".level").style.color = "#FFFFFF";
}

function makeDay() {
    document.getElementById("daynight").src = "img/day.png";

    document.body.style.backgroundColor = "#F9F0D9";
    document.querySelector("hr").style.backgroundColor = "#F9F0D9";
    doForAll(document.querySelectorAll(".bg_white"), e => e.style.backgroundColor = "#FFFFFF");

    document.body.style.color = "#333333";
    doForAll(document.querySelectorAll(".extra > a"), e => e.style.color = "#333333");

    doForAll(document.querySelectorAll(".nav > li > a"), e => e.style.color = "#333333");
    document.querySelector(".nav > li > button").style.color = "#333333";
    if (document.querySelector(".nav > li > button:disabled"))
        document.querySelector(".nav > li > button:disabled").style.color = "#AAAAAA";
    document.querySelector(".nav > li > span").style.color = "#333333";
    document.querySelector(".level").style.color = "#333333";
}

function doForAll(nodeList, f) {
    nodeList.forEach(function(e) {f(e);});
}