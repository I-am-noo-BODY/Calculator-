// Calculator Logic
let display = document.getElementById("display");

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
        // Secret game trigger (change 1337 to any number)
        if (display.value === "1337") {
            document.body.innerHTML = `
                <h1>SECRET GAME UNLOCKED!</h1>
                <p>You found the hidden code!</p>
            `;
        }
    } catch (error) {
        display.value = "Error";
    }
}
