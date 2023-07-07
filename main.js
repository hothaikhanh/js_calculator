const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const buttons = $$(".button");
const numberBtns = $$(".button--number");
const operatorBtns = $$(".button_operator");
const resultBtn = $(".button_result");
const primaryDisplay = $(".primary-display");
const secondaryDisplay = $(".secondary-display");
const clearBtn = $(".button_clear");
const signBtn = $(".button_sign");

const app = {
    log: ["", ""],
    hasOperator: false,
    showResult: false,
    firstNum: "",
    secondNum: "",
    operator: "",

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
                if (this.showResult) this.log.unshift("");
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

    onClearPress: function () {
        clearBtn.addEventListener("click", () => {
            this.clearAll();
        });
    },

    onSignPress: function () {
        signBtn.addEventListener("click", (e) => {
            this.addSign();
        });
    },

    addEvent: function () {
        this.onBtnsHover();
        this.onNumPress();
        this.onEqualPress();
        this.onOperatorPress();
        this.onClearPress();
        this.onSignPress();
    },

    addOperator(value) {
        this.hasOperator = true;
        this.showResult = false;
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
    },

    addHoverFx: function (event, element) {
        let rect = element.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;

        element.style.setProperty("--mouse-x", `${x}px`);
        element.style.setProperty("--mouse-y", `${y}px`);
    },

    addSign: function () {
        this.updateInput();

        switch (true) {
            case this.firstNum && !this.secondNum && !this.operator: //add the sign to the first number if only the first number is inputed
                console.log("case 1");
                this.log[0] = `-${this.firstNum}`;
                break;

            case !!this.secondNum:
                console.log("case 2");
                this.log[0] = `${this.firstNum} ${this.operator} -${this.secondNum}`;
                break;

            default:
                console.log("default");
                console.log(this.secondNum);
                this.log[0] += "-";
                break;
        }
        this.updateView();
    },

    updateInput: function () {
        this.firstNum = this.log[0].split(" ")[0];
        this.operator = this.log[0].split(" ")[1];
        this.secondNum = this.log[0].split(" ")[2];
        console.log(
            `Currently the first input is: ${this.firstNum}, the second input is: ${this.secondNum}, the operator is: ${this.operator}`
        );
    },

    getResult: function () {
        this.updateInput();

        this.log.unshift("");
        this.showResult = true;
        console.log(this.firstNum, this.secondNum, this.operator);
        let result;
        if (this.secondNum) {
            switch (this.operator) {
                case "+":
                    result = parseInt(this.firstNum) + parseInt(this.secondNum);
                    break;
                case "-":
                    result = parseInt(this.firstNum) - parseInt(this.secondNum);
                    break;
                case "*":
                    result = parseInt(this.firstNum) * parseInt(this.secondNum);
                    break;
                case "/":
                    result = parseInt(this.firstNum) / parseInt(this.secondNum);
                    break;
            }
            this.updateView(`${result}`);
            return;
        }

        this.updateView(this.firstNum);
    },

    clearAll: function () {
        this.log = ["", ""];
        this.hasOperator = false;
        this.showResult = false;
        this.updateView("");
    },

    updateView: function (newValue) {
        if (newValue) this.log[0] += newValue;
        primaryDisplay.innerText = this.log[0];
        secondaryDisplay.innerText = this.log[1];
        console.log(this.log);
    },

    render: function () {
        this.addEvent();
    },

    start: async function () {
        await this.render();
    },
};

app.start();
