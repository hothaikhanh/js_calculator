const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const buttons = $$(".button");
const numberBtns = $$(".button--number");
const resultDisplay = $("result-display");
const inputDisplay = $("input-display");

const app = {
    result: 0,
    firstNumber: "",
    secondNumber: "",
    operator: {
        isOn: false,
        type: "",
    },

    buttonsHover: function () {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("mousemove", (e) => {
                let rect = buttons[i].getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                buttons[i].style.setProperty("--mouse-x", `${x}px`);
                buttons[i].style.setProperty("--mouse-y", `${y}px`);
            });
        }
    },

    registerNumber: function (number) {
        this.operator.isOn == false ? (this.firstNumber += number) : (this.secondNumber += number);
        console.log(this.firstNumber);
        this.updateInput;
    },

    numberInput: function () {
        for (i of numberBtns) {
            i.addEventListener("click", (e) => {
                this.registerNumber(e.target.value);
            });
        }
    },

    addEvent: function () {
        this.buttonsHover();
        this.numberInput();
    },

    clear: function () {},
    undo: function () {},

    add: function () {},
    subtract: function () {},
    multiply: function () {},
    divide: function () {},

    updateResult: function () {},
    updateInput: function () {},

    render: function () {
        this.addEvent();
    },

    start: async function () {
        await this.render();
    },
};

app.start();
