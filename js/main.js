// import { Previewer, Handler } from 'https://unpkg.com/pagedjs@0.1.38/dist/paged.esm.js';
import {Previewer, Handler} from '../js/paged.esm.js';
let tipo = true;

// https://www.pagedjs.org/documentation/11-hooks/


window.addEventListener('load', () => {



  $(document).ready(function () {

    setTimeout(function () {
      var list = $('#main');
      $(".content-article h2").each(function () {
        $(this).prepend('<a id="' + $(this).text() + '"></a>');
        $(list).append('<li><a href="#' + $(this).text() + '">' + $(this).text() + '</a></li>');

        const firstA = document.querySelector("ul > li > a");
        firstA.classList.add("active");
      });

    }, 500);


  });
  let content = document.body.innerHTML;
  document.body.innerHTML = "";

  document.body.innerHTML = '\
  <header id="header-pagedjs">\
    <div id="header-container">\
        <input type="radio" id="input-screen" name="toggle-input" value="screen" hidden checked/>\
        <input type="radio" id="input-print" name="toggle-input" value="print" hidden/>\
        <button id="button-screen" data-text="Web">\🖥️\
        </button>\
        <button id="button-print-preview" data-text="Preview">\📖\
        </button>\
        <button id="button-print" data-text="Print">\🖨️\
        </button>\
    </div>\
    </header>\
    <div id="renderbook"></div>\
    <div id="content">\
    ' + content + '</div>';


  // 3. Add onclick event -------------------------
  document.querySelector('#button-print-preview').addEventListener('click', printPreview);
  document.querySelector('#button-screen').addEventListener('click', screenReload);
  document.querySelector('#button-print').addEventListener('click', printPdf);

});


/* PREVIEW ----------------------------------------------------------- */

function printPreview() {
  let inputPrint = document.getElementById("input-print");
  document.getElementById("button-print").disabled = true;

  if (inputPrint.checked) {
    document.getElementById("button-print").disabled = false;
  } else {
    document.getElementById("style-screen").remove();
    let bookcontent = document.querySelector("#content");
    let content = bookcontent.innerHTML;
    bookcontent.innerHTML = "";

    // 1. Create Previewer
    let previewer = new Previewer();

    // 2. Register Handlers
    previewer.registerHandlers(
        class PreviewHandler extends Handler {
          afterPreview() {
            document.getElementById("button-print").disabled = false;
          }

        }
    );

    // 3. Render
    previewer.preview(
        content,
        ["css/style-print.css"],
        document.querySelector("#renderbook")
    );

    this.disabled = "disabled";
    document.getElementById("input-print").checked = "true";
  }
};


/* SCREEN ----------------------------------------------------------- */

function screenReload() {
  window.location.reload(false);
};


/* PRINT ----------------------------------------------------------- */

function printPdf() {
  let inputPrint = document.getElementById("input-print");
  if (inputPrint.checked) {
    window.print();
  } else {
    document.getElementById("style-screen").remove();
    let bookcontent = document.querySelector("#content");
    let content = bookcontent.innerHTML;
    bookcontent.innerHTML = "";

    // 1. Create Previewer
    let previewer = new Previewer();

    // 2. Register Handlers
    previewer.registerHandlers(
        class PrintHandler extends Handler {
          afterPreview() {
            window.print();
          }
        }
    );

    // 3. Render
    previewer.preview(
        content,
        ["css/style-print.css"],
        document.querySelector("#renderbook")
    );
    document.getElementById("input-print").checked = "true";
  }
};


