var input = document.getElementById('guess'); 
var button = document.getElementById('button');
var guess;

// verander css class
var changeClass = function(cng, old, newClass){
  cng.className = cng.className.replace(old, newClass);
}

// game loop
var gameloop = function(){
  // Random Woord
  var rand = WoordenLijst[Math.floor(Math.random() * WoordenLijst.length)].toUpperCase();
  var hasDuplicates = (/([a-zA-Z]).*?\1/).test(rand); // Geen dupes
  
  var pressn = 1;
  
  // haal alle indexen van een bepaalde waarde in een array op
  var getAllIndexes = function(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
  }
  
  // geeft de eerste letter van het woord
  document.getElementById("row1").firstElementChild.innerHTML=rand[0];
  
  // Raden van het woord
  input.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
      document.getElementById('smallMsg').innerHTML = "Rood = correct , Geel = verkeerde plek"; // reset message
      guess = input.value.toUpperCase();
      
      var current = "row" + pressn;
      // houdt bij welke rij je bent
      var childDivs = document.getElementById(current).getElementsByTagName('div');
      var c = 0;
      
      if(guess.length !== 5){
        document.getElementById('smallMsg').innerHTML = "Er moeten 5 letters staan";
        if(pressn===5){
          end("Je hebt verloren!", "Het juiste woord was: " + rand);
        }
        pressn++;
        document.getElementById(current).firstElementChild.innerHTML=rand[0];
        return; // Naar beneden
      }

      // kijkt of het correct is
      for(var i=0; i<childDivs.length; i++) {
        childDivs[i].innerHTML = guess[i];
        
        // kijkt of de letter in de goede plek zit
        if(guess[i] == rand[i]){
          changeClass(childDivs[i], 'default', 'correct');
          c++;
        } 
        // kijkt of de letter in het woord zit maar op de verkeerde plek
        
        input.value = ""; // maakt de input box leeg
        
        if(c===5) { // kijkt of je het worod goed hebt
          end("Je hebt gewonnen!", "Wil je nog een keer spelen?");
        } //if
        else if (pressn === 5){ // if they're out of tries
          end("Je hebt verloren", "Het jusite woord was: " + rand);
        } //else if
      } //for
      
      // check voor verkeerde plek
      for(var i=0; i<childDivs.length; i++) {
        if(rand.indexOf(guess[i])!=-1){
          if(hasDuplicates === false && childDivs[rand.indexOf(guess[i])].className != "square correct"){
            changeClass(childDivs[i], 'default', 'wrongplace');
          }
          // Dubbele letters
          else if(hasDuplicates === true){
            var ind = getAllIndexes(rand, guess[i]);
            if (ind.length > 1){
              for (var j=0; j<ind.length; j++){
                if(childDivs[ind[j]].className != "square correct" && childDivs[i].className != "square wrongplace"){
                  changeClass(childDivs[i], 'default', 'wrongplace');
                } //if
              } //for
            } //if
            else if (childDivs[rand.indexOf(guess[i])].className != "square correct"){
              changeClass(childDivs[i], 'default', 'wrongplace');
            } //else if
          } //else if(hasDuplicates === true)
        } //else if
      }

      pressn++; // Hoe vaak het geprobeerd is
    } //if (key = 'enter')
  } //input 
} //gameloop

// endgame
var end = function(msg, smallmsg){
  document.getElementById('msgBox').innerHTML = msg;
  document.getElementById('smallMsg').innerHTML = smallmsg;
  changeClass(button, "invisible", "visible");
  document.getElementById('guess').readOnly = true;
}

// reset
var playagain = function(){
  document.getElementById('msgBox').innerHTML="Guess the Word!"; // main message
  document.getElementById('smallMsg').innerHTML = "Green = correct letter, Yellow = wrong place"; // small message
  document.getElementById('guess').readOnly = false;
  changeClass(button, "visible", "invisible");
  
  // clean boxes
  for(var i=1;i<6;i++){
    var resets = document.getElementById('row'+i).getElementsByTagName('div');
    for(var j=0;j<5;j++){
      resets[j].innerHTML="";
      if(resets[j].className == "square correct" || resets[j].className == "square wrongplace"){
        changeClass(resets[j], "correct", "default");
        changeClass(resets[j], "wrongplace", "default");
      } //if
    } //for
  } //for
  // restart de loop
  gameloop();
};

//Woorden lijst
var WoordenLijst = ['zaken',
'zwart',
'zadel',
'appel'];

// start loop
gameloop();
