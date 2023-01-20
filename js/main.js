/*****************************************************************************************************************************************/
let clicked = false;
const click_audio = document.createElement("audio");
click_audio.preload = "auto";
click_audio.src = "../sound/click.mp3";
document.body.appendChild(click_audio);
Array.from(document.querySelectorAll("button")).forEach((element) => {
    element.addEventListener(
        "click",
        async (e) => {
            if (clicked) {
                console.log("clicked");
                clicked = false;
            } else {
                e.preventDefault();
                e.stopPropagation();
                clicked = true;
                click_audio.play();
                await sleep(300);
                e.target.click();
            }
        },
        true,
    );
});
/*****************************************************************************************************************************************/
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/*****************************************************************************************************************************************/
const tabs = document.querySelectorAll("menu[role=tablist]");

for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];

    const tabButtons = tab.querySelectorAll("menu[role=tablist] > button");

    tabButtons.forEach((btn) =>
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            tabButtons.forEach((button) => {
                if (button.getAttribute("aria-controls") === e.target.getAttribute("aria-controls")) {
                    button.setAttribute("aria-selected", true);
                    openTab(e, tab);
                } else {
                    button.setAttribute("aria-selected", false);
                }
            });
        }),
    );
}
/*****************************************************************************************************************************************/
function openTab(event, tab) {
    const articles = tab.parentNode.querySelectorAll('[role="tabpanel"]');
    articles.forEach((p) => {
        p.setAttribute("hidden", true);
    });
    const article = tab.parentNode.querySelector(`[role="tabpanel"]#${event.target.getAttribute("aria-controls")}`);
    article.removeAttribute("hidden");
}
/*****************************************************************************************************************************************/
Array.from(document.getElementsByClassName("homepage")).forEach((element) => {
    element.addEventListener("click", (e) => {
        if (window.location.pathname == "/") {
            alert("This button takes you to the home page.");
            return;
        }
        window.location.pathname = "/";
    });
});
/*****************************************************************************************************************************************/
