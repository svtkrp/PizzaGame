function setName() {
    let daynight = window.localStorage.getItem("daynight");
    window.localStorage.clear();

    window.localStorage.setItem("daynight", daynight);
    window.localStorage.setItem("level0_done", "false");
    window.localStorage.setItem("level1_started", "false");
    window.localStorage.setItem("level1_done", "false");
    window.localStorage.setItem("level2_started", "false");
    window.localStorage.setItem("level2_done", "false");
    window.localStorage.setItem("level3_started", "false");
    window.localStorage.setItem("level3_done", "false");

    let name = document.getElementById("name").value;
    let change = document.getElementById("answer");
    change.style.display = "block";
    if (name === "")
    {
        change.innerHTML = "Введите, пожалуйста, имя";
        document.getElementById("score").disabled = true;
        return;
    }
    change.innerHTML = "Привет, " + name + "!";

    window.localStorage.setItem("name", name);
    window.localStorage.setItem("score", "0");
    window.localStorage.setItem("time_left", "180");

    window.localStorage.setItem("level0_done", "true");
    document.getElementById("letsgo").style.display = "block";
    document.getElementById("score").disabled = false;
}