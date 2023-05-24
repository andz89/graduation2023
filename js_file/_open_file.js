import { Canvas } from "./canvas.js";

export class Open_file {
  get_file_json(class_picture) {
    let canvasScale = 1;
    let SCALE_FACTOR = 1.1;
    let width = class_picture.size.w;
    let height = class_picture.size.h;

    const canvas = (width, height) => {
      let c = document.createElement("canvas");
      c.id = "canvas";
      document.querySelector("#canvas-background").appendChild(c);
      return new fabric.Canvas("canvas", {
        width: width,
        height: height,
        backgroundColor: "#fff",
        preserveObjectStacking: true,

        splitByGrapheme: false,
        selection: false,
      });
    };
    let canvas_created = canvas(width, height);

    canvas_created.loadFromJSON(class_picture.json);
    let obj = canvas_created.getObjects();
    obj.forEach((each) => {
      if (each.type === "textbox") {
        return false;
      }
      each.perPixelTargetFind = true;
      canvas_created.renderAll();
    });
    let canvasInit = new Canvas({
      canvas: canvas_created,
      width: fabric.util.parseUnit(width),
      height: fabric.util.parseUnit(height),
      canvasScale: canvasScale,
      SCALE_FACTOR: SCALE_FACTOR,
    });
    canvasInit.create_main_canvas();

    function fitCanvasToScreen() {
      if (width >= 3000) {
        SCALE_FACTOR = 5.2;
      } else if (width <= 2999 && width >= 2000) {
        SCALE_FACTOR = 2.8;
      } else if (width <= 1999 && width >= 1000) {
        SCALE_FACTOR = 1.9;
      } else {
        SCALE_FACTOR = 1.4;
      }
      canvasScale = canvasScale / SCALE_FACTOR;
      canvas_created.setHeight(height * (1 / SCALE_FACTOR));
      canvas_created.setWidth(width * (1 / SCALE_FACTOR));
      canvas_created.setZoom(canvasScale);

      canvas_created.current_canvasScale = canvasScale;
      canvas_created.current_width = canvas_created.getWidth();
      canvas_created.current_height = canvas_created.getHeight();
      canvas_created.renderAll();
    }

    fitCanvasToScreen();

    function zoomIn(selector) {
      SCALE_FACTOR = 1.1;

      let zoomIn = document.querySelector(selector);
      zoomIn.addEventListener("click", () => {
        canvasScale = canvasScale * SCALE_FACTOR;
        canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
        canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
        canvas_created.setZoom(canvasScale);

        canvas_created.current_canvasScale = canvasScale;
        canvas_created.current_width = canvas_created.getWidth();
        canvas_created.current_height = canvas_created.getHeight();
        canvas_created.renderAll();
      });
    }
    zoomIn("#zoomIn");

    function zoomOut(selector) {
      let zoomOut = document.querySelector(selector);
      SCALE_FACTOR = 1.1;

      zoomOut.addEventListener("click", (e) => {
        canvasScale = canvasScale / SCALE_FACTOR;
        canvas_created.setHeight(
          canvas_created.getHeight() * (1 / SCALE_FACTOR)
        );
        canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
        canvas_created.setZoom(canvasScale);

        canvas_created.current_canvasScale = canvasScale;
        canvas_created.current_width = canvas_created.getWidth();
        canvas_created.current_height = canvas_created.getHeight();
        canvas_created.renderAll();
      });
    }

    zoomOut("#zoomOut");

    function lock_image(object, bollean) {
      object.lockMovementX = bollean;
      object.lockMovementY = bollean;
      object.lockScalingX = bollean;
      object.lockScalingY = bollean;
    }
  }
}
