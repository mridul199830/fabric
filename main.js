var canvas = new fabric.Canvas('canvas',{
    widht:200,
    height:200,
    selection:false
});
fabric.Image.fromURL('https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',
  (img)=>{
canvas.setBackgroundImage(img);
canvas.renderAll();
  }
);
let mousePressed = false
let color = '#000000'
let currentMode;
const modes = {
    pan : 'pan',
    drawing : 'drawing'
}

const toggleMode = (mode)=>{
    if(mode===modes.pan){
        if(currentMode === modes.pan){
            currentMode= ''
            canvas.isDrawingMode=false;
            canvas.renderAll()
        }else{
            currentMode = modes.pan
        }
    } else if(mode===modes.drawing){
        if(currentMode === modes.drawing){
            currentMode= ''
            canvas.isDrawingMode=false;
            canvas.renderAll()
        }else{
            
            currentMode = modes.drawing
            canvas.freeDrawingBrush.color = color
            canvas.isDrawingMode=true;
            canvas.renderAll()

        }
    }
          
    }
    

const setPanEvents = (canvas)=>{
    canvas.on('mouse:move', (event)=>{
        //console.log(event)
        if(mousePressed && currentMode === modes.pan){
            canvas.setCursor('grab')
            canvas.renderAll()
            const mEvent = event.e;
            const dlta = new fabric.Point(mEvent.movementX, mEvent.movementY)
            canvas.relativePan(dlta)
        } else if(mousePressed && currentMode === modes.drawing){
            canvas.isDrawingMode=true;
            canvas.renderAll()
        }
        
    })
    canvas.on('mouse:down', (event)=>{
        mousePressed = true
        if(currentMode === modes.pan){
            canvas.setCursor('grab')
            canvas.renderAll()
        }
    })
    canvas.on('mouse:up', (event)=>{
        mousePressed = false
        canvas.setCursor('default')
        canvas.renderAll()
    })
}

const setColorListener = ()=> {
    const picker = document.getElementById('colorPicker')
    picker.addEventListener('change',(event)=>{
        console.log(event.target.value)
        color = '#' + event.target.value
        canvas.freeDrawingBrush.color = color
        canvas.renderAll()
    })
}
const clearCanvas=(canvas)=>{
    canvas.getObjects().forEach((o) => {
        if(o!==canvas.setBackgroundImage){
            canvas.remove(o)
        }
    })
}

const createRect = (canvas) =>{
    console.log("rect")
    const canvCenter = canvas.getCenter()
    const rect = new fabric.Rect({
        widht:100,
        height:100,
        fill:'green',
        left:canvCenter.left,
        top:-50,
        originX:'center',
        originY:'center'

    })
    canvas.add(rect)
    canvas.renderAll()
    rect.animate('top', canvCenter.top, {
        onChange: canvas.renderAll.bind(canvas)
      });
}
const createCer = (canvas) => {
    console.log("cer")
    const canvCenter = canvas.getCenter()
    const cer = new fabric.Circle({
        radius:50,
        widht:100,
        height:100,
        fill:'red',
        left:canvCenter.left,
        top:-50,
        originX:'center',
        originY:'center'
    })
    canvas.add(cer)
    canvas.renderAll()
    cer.animate('top', canvas.height -50, {
        onChange: canvas.renderAll.bind(canvas),
        onCmoplete:()=>{
            cer.animate('top', canvCenter.top, {
                onChange: canvas.renderAll.bind(canvas),
            })
        }
      });
}


setPanEvents(canvas)
setColorListener()
