//Constant macro;
var ConstantMacro = function(){
    this.canvasHeight = 1600;
    this.canvasWidth = 964;
    this.
}

function ConstantMacro(){}

ConstantMacro.prototype = {
    getCanvasHeight:function(){return this.canvasHeight;},
    
    getCanvasWidth:function(){return this.canvasWidth;}
}

var Macroinstance = new ConstantMacro();

/////
function genrateDateTag(document,mDate,color){//color is string
    var height = 60;
    var width = 155;
    const textSizeNotToday = 32;
    const textFontNotToday = textSizeNotToday+"px PingFang SC";
    const textSizeToday = 26;
    const textFontToday = textSizeToday+"px PingFang SC";
    var radius = 16;
    //
    const strokeLineWidth = 3;
    var mCanvas = document.createElement("CANVAS");
    mCanvas.width = width;
    mCanvas.height = height;
    var mContext = mCanvas.getContext("2d");
    //
    const today = new Date();
    const date = mDate.getDate();//30
    const day = mDate.toString().substring(0,3);//Fri
    const isToday = mDate.toDateString() == today.toDateString();
    //
    height = height-strokeLineWidth;
    width = width-strokeLineWidth;
    radius = radius-strokeLineWidth;
    //
    mContext.save();
    mContext.translate(strokeLineWidth/2,strokeLineWidth/2);
    mContext.lineWidth = strokeLineWidth;
    mContext.beginPath();
    mContext.moveTo(radius,0);
    mContext.lineTo(width-radius,0);
    mContext.arc(width-radius,radius,radius,-Math.PI/2,0,false);
    mContext.lineTo(width,height-radius);
    mContext.arc(width-radius,height-radius,radius,0,Math.PI/2,false);
    mContext.lineTo(radius,height);
    mContext.arc(radius,height-radius,radius,Math.PI/2,Math.PI,false);
    mContext.lineTo(0,radius);
    mContext.arc(radius,radius,radius,Math.PI,3*Math.PI/2,false);
    mContext.closePath();
    mContext.strokeStyle = color;
    mContext.stroke();
    //
    mContext.restore();
    width = width+strokeLineWidth;
    height = height+strokeLineWidth;
    //draw the round rect
    if(isToday){
        mContext.beginPath();
        mContext.moveTo(0,height/2);
        mContext.lineTo(width,height/2);
        mContext.lineTo(width,height-radius);
        mContext.arc(width-radius,height-radius,radius,0,Math.PI/2,false);
        mContext.lineTo(radius,height);
        mContext.arc(radius,height-radius,radius,Math.PI/2,Math.PI,false);
        mContext.lineTo(0,height/2);
        mContext.closePath();
        mContext.fillStyle = color;
        mContext.fill();
        //add the botom half of the time tag;
        //test
        mContext.font = textFontToday;
        mContext.fillStyle = color;
        mContext.textAlign = "center";
        mContext.fillText(day+". "+date,width/2,(1-0.1)*height/4+textSizeToday/2);
        mContext.fillStyle = "#FFF";
        mContext.fillText("Today",width/2,(3-0.35)*height/4+textSizeToday/2);//compensate;
    }else{
        mContext.font = textFontNotToday;
        mContext.fillStyle = color;
        mContext.textAlign = "center";
        mContext.fillText(day+". "+date,width/2,textSizeNotToday/2+(1-0.15)*height/2);//compensate
    }
    return mCanvas;    
}
//The json data for the event cell is jsonData = {"event":"Welcome coder!","responsor":"Severide","subEvent":[jsonData]};
//Date info is not needed in this part;
function createEventCell(document,eventJson,color){
    var width = 220;
    var height = 75;
    var radius = 16;
    const strokeWidth = 3;
    const eventDetailSize = 30;
    const eventDetailFont = eventDetailSize+"px PingFang SC";
    const eventResponsorSize = 20;
    const eventResponsorFont = eventResponsorSize+"px PingFang SC";
    const responsorTextColor = "#4A90E2";
    const eventDetail = eventJson.event;
    const responsor = eventJson.responsor;
    const subEventJson = eventJson.subEvent;
    //
    var mCanvas = document.createElement("CANVAS");
    mCanvas.width = width;
    mCanvas.height = height;
    var mContext = mCanvas.getContext("2d");
    //
    height = height-strokeWidth;
    width = width-strokeWidth;
    radius = radius-strokeWidth;
    //
    mContext.save();
    mContext.translate(strokeWidth/2,strokeWidth/2);
    mContext.lineWidth = strokeWidth;
    mContext.beginPath();
    mContext.moveTo(radius,0);
    mContext.lineTo(width-radius,0);
    mContext.arc(width-radius,radius,radius,-Math.PI/2,0,false);
    mContext.lineTo(width,height-radius);
    mContext.arc(width-radius,height-radius,radius,0,Math.PI/2,false);
    mContext.lineTo(radius,height);
    mContext.arc(radius,height-radius,radius,Math.PI/2,Math.PI,false);
    mContext.lineTo(0,radius);
    mContext.arc(radius,radius,radius,Math.PI,3*Math.PI/2,false);
    mContext.closePath();
    mContext.strokeStyle = color;
    mContext.stroke();
    //
    mContext.restore();
    width = width+strokeWidth;
    height = height+strokeWidth;
    //
    mContext.fillStyle = color;
    mContext.beginPath();
    mContext.moveTo(radius,0);
    mContext.lineTo(width-radius,0);
    mContext.arc(width-radius,radius,radius,-Math.PI/2,0,false);
    mContext.lineTo(width,height/2);
    mContext.lineTo(0,height/2);
    mContext.arc(radius,radius,radius,Math.PI,3*Math.PI/2,false);
    mContext.closePath();
    mContext.fill();
    //
    mContext.font = eventDetailFont;
    mContext.fillStyle = "#FFF";
    if(width<24+Math.round(mContext.measureText(eventDetail))){
        const lengthPerChar = Math.round(mContext.measureText(eventDetail))/eventDetail.length;
        const charNum = Math.ceil((width+24)/lengthPerChar);
        eventDetail = eventDetail.substring(0,charNum);
    }
    mContext.textAlign = "center";
    mContext.fillText(eventDetail,width/2,(1-0.1)*height/4+eventDetailSize/2);
    mContext.fillStyle = responsorTextColor;
    mContext.font = eventResponsorFont;
    mContext.textDecoration = "underline";
    mContext.fillText(responsor,width/2,(3-0.35)*height/4+eventResponsorSize/2);
    return mCanvas;
}
function drawScrollOval(document,color){
    const outterRadius = 30;
    const innerRadius = 22.5;
    var mCanvas = document.createElement("CANVAS");
    mCanvas.height = 2*outterRadius;
    mCanvas.width = 2*innerRadius;
    var mContext = mCanvas.getContext("2d");
    mContext.fillStyle = color;
    mContext.beginPath();
    mContext.moveTo(outterRadius/2,0);
    mContext.arc(outterRadius,outterRadius,outterRadius,-Math.Pi/2,3*Math.PI/2,false);
    mContext.closePath();
    mContext.fill();
    mContext.moveTo(outterRadius/2,outterRadius-innerRadius);
    mContext.arc(outterRadius,outterRadius,innerRadius,-Math.PI/2,3*Math.PI/2,false);
    mContext.closePath();
    mContext.fillStyle = "#FFF";
    mContext.fill();
    return mCanvas;
}
//eventJsonArray = [{"event":"Welcome coder!","responsor":"Severide","subEvent":[jsonData]},{...},{...}];
function focusPageNoBlurNoPop(document,eventJsonArray,colorArray){
    const canvasHeight = Macroinstance.getCanvasHeight;
    const canvasWidth = Macroinstance.getCanvasWidth;
    //calculate the height needed for this page;
     v
    //
    var mCanvas = document.createElement("CANVAS");
    mCanvas.width = canvasWidth;
    mCanvas.height = canvasHeight;
    var mContext = mCanvas.getContext("2d");
    
    
}
function popWindow(){
    
}
function combineOnClik(eventIndex){
    
}














