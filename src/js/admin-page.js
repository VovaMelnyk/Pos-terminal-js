class Admin {
    constructor() {}

    renderMarkup() {
        return `<header></header><aside></aside><main></main>`;
    }
    addToScreen(container, position, element) {
        container.insertAdjacentHTML(position, element);
    }
    addStyleToMarkup() {
        const root = document.querySelector("#root")
        const main = document.querySelector("main");
        const header = document.querySelector("header");
        const aside = document.querySelector("aside")
        const body = document.querySelector("body")

        body.style.margin = 0;
        root.style.display = "grid";
        root.style.height = "100vh";
        root.style.gridTemplateColumns = "10% 1fr"
        root.style.gridTemplateRows = "5% 1fr"
        root.style.position = "relative"
        main.style.height = "100%";
        main.style.gridColumnStart = 2;
        main.style.gridColumnEnd = 3;
        header.style.height = "100%";
        header.style.gridColumnStart = 2;
        header.style.gridColumnEnd = 3;
        aside.style.height = "100%";
        aside.style.width = "10%";
        aside.style.position = "fixed";
        aside.style.top = 0;
        aside.style.left = 0;
    }
    start(container) {
        this.addToScreen(container, "beforeend", this.renderMarkup());
        this.addStyleToMarkup()
    }
}

export default Admin;