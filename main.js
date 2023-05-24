// import {Modal} from "./js_file/gwill.js";
// import {Canvas} from "./js_file/canvas.js";
import { Open_file } from "./js_file/_open_file.js";
import { class_picture } from "./js_file/json_canvas/_canvas_class_picture.js";

//==================window height size=======================//
let header_size = document.querySelector("header").offsetHeight;
let sub_header_size = document.querySelector(".sub_header").offsetHeight;

document.querySelector("main").style.height =
  window.innerHeight - header_size - sub_header_size + "px";

//window_height resize
window.addEventListener("resize", () => {
  let header_size = document.querySelector("header").offsetHeight;
  let sub_header_size = document.querySelector(".sub_header").offsetHeight;

  document.querySelector("main").style.height =
    window.innerHeight - header_size - sub_header_size + "px";
});

//==========================================================//

//====================== canvas tools ========================//

window.addEventListener("keydown", function (event) {
  if (event.ctrlKey && "spwo".indexOf(event.key) !== -1) {
    event.preventDefault();
  }
});

//================= open json file and create canvas ===========================//

let file = new Open_file();

file.get_file_json(class_picture);

//================================== end ==============================//
