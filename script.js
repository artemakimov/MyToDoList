
var colorArray = [ "#582b7a", "#08d2fb", "#7c49ff" ,"#6afffe" ,"#87a96b" ,"#06c397" ,"linear-gradient(90deg, rgba(0,212,255,1) 35%, rgba(2,0,36,0.45451684091605393) 90%)", 'white']; // массив с цветами
var i = 0; // итератор

function changeColor(){
    document.body.style.background = colorArray[i]; 
    i++;
    if( i > colorArray.length - 1){
        i = 0;
    }
}
