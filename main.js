const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const buttons = $$(".button");
const numberBtns = $$(".button--number");
const operatorBtns = $$(".button_operator");
const resultBtn = $(".button_result");
const primaryDisplay = $(".primary-display");
const secondaryDisplay = $(".secondary-display");

const app = {
    log: ["", ""],
    hasOperator: false,

    onBtnsHover: function () {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("mousemove", (e) => {
                this.addHoverFx(e, buttons[i]);
            });
        }
    },

    onNumPress: function () {
        for (i of numberBtns) {
            i.addEventListener("click", (e) => {
                this.updateView(e.target.value);
            });
        }
    },

    onOperatorPress: function () {
        for (j of operatorBtns) {
            j.addEventListener("click", (e) => {
                if (this.hasOperator) {
                    this.getResult();
                }
                this.addOperator(e.target.value);
            });
        }
    },

    onEqualPress: function () {
        resultBtn.addEventListener("click", () => {
            this.getResult();
            this.hasOperator = false;
        });
    },

    addEvent: function () {
        this.onBtnsHover();
        this.onNumPress();
        this.onEqualPress();
        this.onOperatorPress();
    },

    addOperator(value) {
        switch (value) {
            case "add":
                this.updateView(" + ");
                break;

            case "subtract":
                this.updateView(" - ");
                break;

            case "multiply":
                this.updateView(" * ");
                break;

            case "divide":
                this.updateView(" / ");
                break;
        }
        this.hasOperator = true;
    },

    addHoverFx: function (event, element) {
        let rect = element.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;

        element.style.setProperty("--mouse-x", `${x}px`);
        element.style.setProperty("--mouse-y", `${y}px`);
    },

    getResult: function () {
        let firstNum = this.log[0].split(" ")[0];
        let operator = this.log[0].split(" ")[1];
        let secondNum = this.log[0].split(" ")[2];

        this.log.unshift("");

        let result;
        switch (operator) {
            case "+":
                result = parseInt(firstNum) + parseInt(secondNum);
            case "-":
                result = parseInt(firstNum) - parseInt(secondNum);
            case "*":
                result = parseInt(firstNum) * parseInt(secondNum);
            case "/":
                result = parseInt(firstNum) / parseInt(secondNum);
        }

        this.updateView(`${result}`);
    },

    updateView: function (inputValue) {
        this.log[0] += inputValue;

        primaryDisplay.innerText = this.log[0];
        secondaryDisplay.innerText = this.log[1];
    },

    render: function () {
        this.addEvent();
    },

    start: async function () {
        await this.render();
    },
};

app.start();
