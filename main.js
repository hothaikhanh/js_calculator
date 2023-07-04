const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let buttons = $$(".button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousemove", (e) => {
        let rect = buttons[i].getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        buttons[i].style.setProperty("--mouse-x", `${x}px`);
        buttons[i].style.setProperty("--mouse-y", `${y}px`);
    });
}
