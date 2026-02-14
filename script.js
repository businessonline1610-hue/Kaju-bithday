const btn = document.getElementById("surpriseBtn");
const cakeSection = document.getElementById("cakeSection");
const finalMessage = document.getElementById("finalMessage");
const music = document.getElementById("music");

btn.addEventListener("click", () => {
    cakeSection.classList.remove("hidden");
    music.play();
    startMic();
});

function startMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      let volume = dataArray.reduce((a,b)=>a+b)/dataArray.length;

      if(volume > 70) {
        document.getElementById("f1").style.display="none";
        document.getElementById("f2").style.display="none";
        document.getElementById("f3").style.display="none";
        finalMessage.classList.remove("hidden");
        confetti();
      }
      requestAnimationFrame(detectBlow);
    }
    detectBlow();
  });
}

function confetti(){
  for(let i=0;i<30;i++){
    let conf = document.createElement("div");
    conf.innerHTML="🎉";
    conf.style.position="absolute";
    conf.style.left=Math.random()*100+"%";
    conf.style.top="-10px";
    conf.style.fontSize="20px";
    conf.style.animation="fall 3s linear";
    document.body.appendChild(conf);
  }
}
