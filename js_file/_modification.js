

export class Modification{

    constructor(property) {
      
        this.canvas = property.canvas
        this.canvasScale = property.canvasScale;
        this.SCALE_FACTOR = property.SCALE_FACTOR;
        this.fileHandle = property.fileHandle;
        this.width = property.width;
        this.height = property.height;
        
    }

  





  adding_object_style(object){
 

    if(object.type === 'textbox'){
    object.perPixelTargetFind = false;
    this.canvas.setActiveObject(object);
    this.canvas.add(object);
    object.scaleToWidth(500)
    this.canvas.viewportCenterObject(object)
   

    this.canvas.renderAll()
    this.updateModifications(true)
  
    }else{
    object.perPixelTargetFind = false,
    this.canvas.setActiveObject(object);
    this.canvas.add(object);

    //set the size of an object in the canvas
    if(object.getScaledHeight()>object.getScaledWidth() ){

      // object.scaleToHeight(this.canvas.current_height-10)
   console.log('heigth')
    }
    if(object.getScaledWidth() > object.getScaledHeight()){
      // object.scaleToWidth(this.canvas.current_width-10)
  
    }
    if(object.getScaledWidth() == object.getScaledHeight()){
      // object.scaleToHeight(this.canvas.current_height-10)

    }
    //scale the corner size
    if(object.getScaledWidth() < 600){
      object.set("cornerSize",6);
     }else{
      object.set("cornerSize",12);

     }
    this.canvas.viewportCenterObject(object)

    this.canvas.renderAll()
    this.updateModifications(true)
    }

   
}


        loaderShow(){

        document.querySelector(".modal-loader").classList.add("spinner-1");
        document.querySelector(".modal-loader").style.display = "block";

        }
        loaderHide(){
        document.querySelector(".modal-loader").classList.remove("spinner-1");
        document.querySelector(".modal-loader").style.display = "none";
        }


   

      uniqueId(){
    let d = new Date();
    let dateString =  d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getSeconds().toString() + d.getMilliseconds().toString()
    let random = Math.floor(Math.random() * 1000000).toString()
    return dateString + random
    }




    alert(text){
    let alert_container =  document.querySelector('#alert-header')
    alert_container.innerHTML = ''
    alert_container.style.display = 'flex'
    let span =  document.createElement('span');
    span.innerHTML = `${text}`;
    alert_container.appendChild(span);
    


    setTimeout(() => {
    alert_container.removeChild(span)
    alert_container.style.display = 'none'
    },5000)


    }




lock_image(object, bollean){
  object.lockMovementX = bollean;
  object.lockMovementY = bollean;
  object.lockScalingX = bollean;
  object.lockScalingY = bollean;
  if(object.lockScalingY === true){
    object.selectable = false
  }else{
    object.selectable = true
  }

  }

returnToOriginalSize(){
    this.canvas.setHeight(this.canvas.current_height);
    this.canvas.setWidth(this.canvas.current_width);
    this.canvas.setZoom(this.canvas.current_canvasScale);
  }






}

