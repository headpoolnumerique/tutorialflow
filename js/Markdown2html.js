var md = window.markdownit()
        .use(markdownitFootnote)
        .use(markdownitContainer),
    warning;

$.get("Tutorial1.md", function (data) {
    $('#content-markdown').html(md.render(data));


});

// wait for the page to load
var loaded = new Promise(function (resolve, reject) {
    window.onload = function () {
        resolve();
    }
});

// Config pagedjs to wait till the text has been added
window.PagedConfig = {
    before: () => {
        return loaded.then(() => {
            document.body.innerHTML = html;
        })
    }
}


async function resize() {

    let resizer = () => {
        let pages = document.querySelector(".pagedjs_pages");

        if (pages) {
            let scale = ((window.innerWidth * .9) / pages.offsetWidth);
            if (scale < 1) {
                pages.style.transform = `scale(${scale}) translate(${(window.innerWidth / 2) - ((pages.offsetWidth * scale / 2))}px, 0)`;
            } else {
                pages.style.transform = "none";
            }
        }
    };
    resizer();

    window.addEventListener("resize", resizer, false);
    const paged = new Paged.Previewer();
    paged.on("rendering", () => {
        resizer();
    });

};
