import { Modification } from "./_modification.js";

import { with_honors } from "./json_canvas/_with_honors.js";
import { Open_file } from "./_open_file.js";
import { class_picture } from "./json_canvas/_canvas_class_picture.js";
export class Menu_tools extends Modification {
  keyboard_shortcut() {
    document.addEventListener("keydown", (event) => {
      // if (event.key === "d") {
      //   event.preventDefault();
      // }
    });
    fabric.util.addListener(document.body, "keydown", (options) => {
      if (options.repeat) {
        return;
      }
      var key = options.which || options.keyCode; // key detection

      // if (key === 83 && options.ctrlKey) {
      // save()
      // }
      if (key === 68 && options.ctrlKey) {
        this.download_key();
      }
      //   if (key === 79 && options.ctrlKey) {
      // getFile()
      // }
    });
  }

  download_as_image() {
    const download_image = document.querySelector("#download-image");
    download_image.onclick = () => {
      var scaleFactor = 1;
      this.canvas.setWidth(this.width * scaleFactor);
      this.canvas.setHeight(this.height * scaleFactor);
      this.canvas.setZoom(scaleFactor);

      this.canvas.renderAll();

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = this.canvas.toDataURL({
        format: "png",
        // quality:  1
      });

      // Loop through the objects and perform operations
      let image_name = this.canvas.getObjects().filter((object) => {
        // Access individual object properties or perform actions
        return object.name == "textbox-name";
      });

      a.download = `${image_name[0].text}.png`;
      a.click();
      document.body.removeChild(a);

      this.canvas.setHeight(this.canvas.current_height);
      this.canvas.setWidth(this.canvas.current_width);
      this.canvas.setZoom(this.canvas.current_canvasScale);
    };
  }
  download_key() {
    var scaleFactor = 1;
    this.canvas.setWidth(this.width * scaleFactor);
    this.canvas.setHeight(this.height * scaleFactor);
    this.canvas.setZoom(scaleFactor);

    this.canvas.renderAll();

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = this.canvas.toDataURL({
      format: "png",
      // quality:  1
    });

    // Loop through the objects and perform operations
    let image_name = this.canvas.getObjects().filter((object) => {
      // Access individual object properties or perform actions
      return object.type == "textbox";
    });

    a.download = `${image_name[0].text}.png`;
    a.click();
    document.body.removeChild(a);

    this.canvas.setHeight(this.canvas.current_height);
    this.canvas.setWidth(this.canvas.current_width);
    this.canvas.setZoom(this.canvas.current_canvasScale);
  }
  honor_canvas() {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("honor-canvas")) {
        document.querySelector(".fontFamilySelect").innerHTML = "";
        this.canvas.dispose();
        this.canvas.off();
        document.querySelector("#canvas").remove();
        let file = new Open_file();

        file.get_file_json(with_honors);
      }
      if (e.target.classList.contains("class-picture")) {
        document.querySelector(".fontFamilySelect").innerHTML = "";
        this.canvas.dispose();
        this.canvas.off();

        document.querySelector("#canvas").remove();
        let file = new Open_file();

        file.get_file_json(class_picture);
      }
    });
  }
  upload_image() {
    var imageUploadInput = document.getElementById("upload-image");
    imageUploadInput.addEventListener("change", (e) => {
      let image_name = this.canvas.getObjects().filter((object) => {
        return object.name == "image-user";
      });
      this.canvas.remove(image_name[0]);

      var file = e.target.files[0];
      var reader = new FileReader();

      let obj = this.canvas.getObjects();
      let a = obj.filter((e) => {
        return e.name == "textbox-name";
      });

      reader.onload = (event) => {
        var imageBlob = new Blob([event.target.result], { type: file.type });

        var blobURL = URL.createObjectURL(imageBlob);
        fabric.Image.fromURL(blobURL, (fabricImg) => {
          fabricImg.scaleToWidth(500);
          fabricImg.name = "image-user";
          this.canvas.add(fabricImg);
          this.canvas.sendToBack(fabricImg);
          a[0].set({ text: file.name.replace(/\.[^.]+$/, "") });
          this.canvas.renderAll();
          imageUploadInput.value = "";

          URL.revokeObjectURL(blobURL); // Release the object URL after the image is loaded
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
