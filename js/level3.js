var time_left;
let timerId;
var score;
let qWhat;
let plate;
let plate_coords;
let plate_width;
let plate_height;
let pancake;
let pancake_coords;
let pancake_width;
let pancake_height;
let steps = 5;
var currentStep;
var currentItem = null;
let sausage_item;
let cheese_item;
let mushroom_item;
var sausage_chosen = false;
var cheese_chosen = false;
var mushroom_chosen = false;
let picItems = [];
let types = [{class: "sausage", name: "колбасы"}, {class: "cheese", name: "сыра"},
    {class: "mushroom", name: "грибов"}];
let items;

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
    if (window.localStorage.getItem("level3_done") === "true") {
        document.getElementById("what").innerHTML = "Начните игру с первого уровня";
        return;
    }
    if (Number.parseInt(window.localStorage.getItem("time_left")) <= 0) {
        document.getElementById("what").innerHTML =
            "Время закончилось, вы проиграли. Начните игру с первого уровня";
        return;
    }
    if (window.localStorage.getItem("level1_done") === "false") {
        document.getElementById("what").innerHTML = "Пройдите первый уровень";
        return;
    }
    if (window.localStorage.getItem("level2_done") === "false") {
        document.getElementById("what").innerHTML = "Пройдите второй уровень";
        return;
    }

    window.localStorage.setItem("level3_started", "true");
    window.localStorage.setItem("level3_done", "false");

    document.getElementById("sausage_item").style.display = "block";
    document.getElementById("cheese_item").style.display = "block";
    document.getElementById("mushroom_item").style.display = "block";
    document.getElementById("plate").style.display = "block";
    document.getElementById("plate2").style.display = "block";
    document.getElementById("ready").style.display = "block";

    plate = document.getElementById("plate");
    plate_coords = getCoords(plate);
    plate_width = plate.offsetWidth;
    plate_height = plate.offsetHeight;
    sausage_item = document.getElementById("sausage_item");
    cheese_item = document.getElementById("cheese_item");
    mushroom_item = document.getElementById("mushroom_item");

    score = Number.parseInt(window.localStorage.getItem("score"));
    time_left = Number.parseInt(window.localStorage.getItem("time_left"));
    qWhat = document.getElementById("what");

    items = new Array(steps);
    for (var k = 0; k < items.length; k++) {
        items[k] = new Array(types.length);
    }

    for (var i = 0; i < steps; i++) {
        for (var j = 0; j < types.length; j++) {
            items[i][j] = getRandomInt(0, 5);
        }
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
        pancake = document.createElement("div");
        pancake.className = "pancake";
        plate.appendChild(pancake);
        pancake_coords = getCoords(pancake);
        pancake_width = pancake.offsetWidth;
        pancake_height = pancake.offsetHeight;

        let counts = items[currentStep];
        let str = "Состав пиццы: тонкое тесто";
        for (var i = 0; i < counts.length; i++) {
            if (counts[i] !== 0) {
                str += ", ";
                str += counts[i] + (counts[i] > 1 ? " кусочка " : " кусочек ") + types[i].name;
            }
        }
        qWhat.innerHTML = str;
    } else {
        stop();
    }
}

function putItem() {
    plate.appendChild(currentItem);
    changeCoords(currentItem);
    picItems.push(currentItem);

    currentItem = null;
    if (sausage_chosen) {
        sausage_chosen = false;
        sausage_item.classList.remove("green");
    } else if (cheese_chosen) {
        cheese_chosen = false;
        cheese_item.classList.remove("green");
    } else if (mushroom_chosen) {
        mushroom_chosen = false;
        mushroom_item.classList.remove("green");
    }
}

function takeSausage() {
    if (sausage_chosen) {
        sausage_chosen = false;
        sausage_item.classList.remove("green");
        currentItem = null;
    } else {
        if (cheese_chosen) {
            cheese_chosen = false;
            cheese_item.classList.remove("green");
        }
        if (mushroom_chosen) {
            mushroom_chosen = false;
            mushroom_item.classList.remove("green");
        }
        sausage_chosen = true;
        sausage_item.classList.add("green");
        currentItem = document.createElement("div");
        currentItem.className = "sausage";
    }
}

function takeCheese() {
    if (cheese_chosen) {
        cheese_chosen = false;
        cheese_item.classList.remove("green");
        currentItem = null;
    } else {
        if (sausage_chosen) {
            sausage_chosen = false;
            sausage_item.classList.remove("green");
        }
        if (mushroom_chosen) {
            mushroom_chosen = false;
            mushroom_item.classList.remove("green");
        }
        cheese_chosen = true;
        cheese_item.classList.add("green");
        currentItem = document.createElement("div");
        currentItem.className = "cheese";
    }
}

function takeMushroom() {
    if (mushroom_chosen) {
        mushroom_chosen = false;
        mushroom_item.classList.remove("green");
        currentItem = null;
    } else {
        if (sausage_chosen) {
            sausage_chosen = false;
            sausage_item.classList.remove("green");
        }
        if (cheese_chosen) {
            cheese_chosen = false;
            cheese_item.classList.remove("green");
        }
        mushroom_chosen = true;
        mushroom_item.classList.add("green");
        currentItem = document.createElement("div");
        currentItem.className = "mushroom";
    }
}

function changeCoords(elem) {
    elem.style.left = (pancake.getBoundingClientRect().left - plate.getBoundingClientRect().left + getRandomInt(0, pancake_width - 70)) + "px";
    elem.style.top = (pancake.getBoundingClientRect().top - plate.getBoundingClientRect().top + getRandomInt(0, pancake_height - 70)) + "px";
}

function one_second() {
    time_left--;

    document.getElementById("timer").innerHTML = getTimeMinSecStr(getTimeMinSec(time_left));

    if (time_left <= 0) fail();
}

function stop() {
    window.localStorage.setItem("level3_done", "true");
    document.getElementById("result").innerHTML = "Ура! Ты успел приготовить все пиццы!";
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
    document.getElementById("result").style.display = "block";
    document.getElementById("result_pic").style.display = "block";
    document.getElementById("ready").style.display = "none";
    document.getElementById("sausage_item").style.display = "none";
    document.getElementById("cheese_item").style.display = "none";
    document.getElementById("mushroom_item").style.display = "none";
    document.getElementById("plate").style.display = "none";
    document.getElementById("plate2").style.display = "none";
    document.getElementById("what").style.display = "none";
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

function ready() {
    let correct = true;
    for (var i = 0; i < types.length; i++) {
        let real = items[currentStep][i];
        let sum = 0;
        for (var j = 0; j < picItems.length; j++) {
            if (picItems[j].classList.contains(types[i].class)) {
                sum++;
            }
        }
        if (real !== sum) {
            correct = false;
            break;
        }
    }
    if (correct) {
        changeAllItems(picItems, elem => moveBottom(elem));
        pancake.classList.add("move");
        pancake.style.transform = "translateY("+ (plate_height + 20 - pancake_height / 2) +"px)";
        score += 2;
        changeAllItems(picItems, elem => resize(elem));
        resize(pancake);
        setTimeout(() => {
            changeAllItems(picItems, elem => putFlex(elem));
            pancake.style.transform = "none";
            pancake.style.position = "relative";
            pancake.style.top = "0px";
            pancake.style.margin = "0 10px";
            document.getElementById("plate2").appendChild(pancake);
            document.getElementById("plate2").style.display = "flex";

            newStep();
        }, 1500);
    } else {
        changeAllItems(picItems, elem => moveTop(elem));
        pancake.classList.add("fly_top");
        pancake.style.transform = "translateY(-"+ (5000 + pancake_height / 2) +"px)";
        score -= 1;

        newStep();
    }
}

function moveTop(elem) {
    elem.classList.add("fly_top");
    elem.style.transform = "translateY(-"+ 5000 +"px)";
}

function moveBottom(elem) {
    elem.classList.add("move");
    let l = elem.getBoundingClientRect().left - pancake.getBoundingClientRect().left;
    let t = elem.getBoundingClientRect().top - pancake.getBoundingClientRect().top;
    elem.style.transform = "translate(" + (- l * 3 / 4) + "px, "
        + (plate_height + 20 - t * 3 / 4) +"px)";
}

function resize(elem) {
    let width = elem.offsetWidth;
    let height = elem.offsetHeight;
    elem.style.width = (width / 4).toString() + "px";
    elem.style.height = (height / 4).toString() + "px";
    elem.style.borderWidth = "0px";
    elem.style.backgroundSize = "100%";
}

function putFlex(elem) {
    let l = elem.getBoundingClientRect().left - pancake.getBoundingClientRect().left;
    let t = elem.getBoundingClientRect().top - pancake.getBoundingClientRect().top;
    pancake.appendChild(elem);
    elem.style.left = l.toString() + "px";
    elem.style.top = t.toString() + "px";
    elem.style.transform = "none";
}