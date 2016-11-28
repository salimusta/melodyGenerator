var Tone = require('tone');

console.log("SAR TROP");


var synth = new Tone.Synth().toMaster();
var time = setInterval(playIt, 500);
let nb = 0;


let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let circleFifth = [];
circleFifth[0] = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
circleFifth[1] = ["A", "E", "B", "F#", "C#", "G#", "D#", "Bb", "F", "C", "G", "D"];

let startKey = randomize(11); // C
startKey = 1;

let mainPattern = generateMainPattern(4);
console.log("Pattern " , mainPattern)

function generateMainPattern(length){
  let patternTab = [];
  patternTab[0] = circleFifth[0][startKey];
  patternTab[1] = circleFifth[0][startKey];

  for(let i = 1 ;i < length ; i++){
    //Find th next note
    do {
      var randCirc = randomize(1);
      var randNote = startKey + 2 - randomize(4);

    } while(patternTab.includes(circleFifth[randCirc][randNote]))



    if(randNote < 0){
      randNote = randNote + 12;
    }

    patternTab.push(circleFifth[randCirc][randNote]);
    patternTab.push(circleFifth[randCirc][randNote]);
  }

  return patternTab;
}

function randomize(number){
  return Math.round(Math.random()*number);
}


function playIt(){
  //var noteIndex = randomize(7) ;
  console.log("PLAY ", mainPattern[nb] )

  synth.triggerAttackRelease(mainPattern[nb] + "4", "8n");

  nb++;
  if(nb > 7){
    nb = 0;
  }
}
