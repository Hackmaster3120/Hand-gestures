predict1="";
camera=document.getElementById("cam");
Webcam.attach(camera)
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });
function Click(){
    Webcam.snap(function (data_uri){
        document.getElementById("pic").innerHTML="<img id='imgOutput' src='"+data_uri+"'>"});
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/MF3aiKdC8/model.json',modelLoaded);
function modelLoaded() {
    console.log("blablabla model is loaded as you probably know");
}
function predict() {
    img=document.getElementById("imgOutput");
    classifier.classify(img,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results)
        document.getElementById("emoji-name1").innerHTML=results[0].label;
        predict1=results[0].label;
        if (results[0].label=='OK sign') {
            document.getElementById("emoji1").innerHTML='&#128076';
        }
        if (results[0].label=='Victory sign') {
            document.getElementById("emoji1").innerHTML='&#9996';
        }
        if (results[0].label=='Thumbs up') {
            document.getElementById("emoji1").innerHTML='&#128077';
        }    
        speak();}
        
    
}
function speak() {
    synth=window.speechSynthesis
    speechData="The prediction is"+predict1+", and by the way my name is Bob";
    synthData=new SpeechSynthesisUtterance(speechData);
    synth.speak(synthData);
}