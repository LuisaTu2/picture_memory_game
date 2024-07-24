var flipClickCounter = 0;
var firstImageUrl = "";
var firstImageElt = "";
var secondImageUrl = "";
var secondImageElt = "";
var countMatches = 0;
var flipBackInProgress = false; //Acts as a flag for the event listener
var start = null;
var end = null;
var listPictures = assignPicture();


function assignPicture() {
  var picChoices = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  var pictures = [];
  var picOrder = []; var k = 0;
  for (k=1; k <= 16; k++) {
      var rand = Math.floor(Math.random() * picChoices.length);
      var picN =  picChoices.splice(rand,1);
      pictures.push('url("Pics/'+ picN +'.jpg")');
    }
  return pictures;
}


function getDictionary() {
  var k = 0; var d = {}; var s ='';
  for (i=1; i<=4; i++) {
    for (j=1; j<=4; j++) {
      elt = "te" + i + j;
      d[elt] = listPictures[k];
      k++;
      }
    }
    return d;
}


var d = getDictionary();
function getUrl(eltID) {
  return d[eltID];
}


for (i=1; i<=4; i++) {
  for (j=1; j<=4; j++) {
    eltID = "te" + i + j;
    //before the for loop there are 16 elts;
    //After the for loop there each element has a handler;
    document.getElementById(eltID).addEventListener('click', clickHandler);
  }
}


function clickHandler() {
  if (start === null) {
    start = new Date();
  }

  if(clickedOnAnimal(this) || flipBackInProgress) { // THIS is the WHOLE element, not just one attribute
    return;
  } // Do nothing if I clicked on an animal picture
  else {
        flipToAnimal(this);
        flipClickCounter++;
        if(flipClickCounter === 1){
          firstImageUrl = getUrl(this.id);
          firstImageElt = this;
        }
        else {
          flipClickCounter=0;
          secondImageUrl = getUrl(this.id);
          secondImageElt = this;
          if(areSameAnimal(firstImageUrl, secondImageUrl)) {
            countMatches++;
            if(countMatches === 8) {
              setTimeout(function(){alert('Congratulations, you won! You completed the puzzle in ' + (end.getTime() - start.getTime())/1000 + ' seconds.')}, 100);              
              end = new Date();
            }
          }
          else {
            flipBackInProgress = true; //cannot click on third cell
            setTimeout(function(){
              flipBothBack(firstImageElt, secondImageElt);
              flipBackInProgress = false;
            }, 700);
          }
         }
  }
}


// Returns TRUE if element clicked on is a picture of an animal
function clickedOnAnimal(elt) {
  //if() checks if "Pics/cover.jpg" is a substring of the elt backgroundImage full url
  if( window.getComputedStyle(elt).backgroundImage.indexOf("Pics/cover.jpg") > -1) {
    return false;
  } else {
    return true;
  }
}


function flipToAnimal(elt){
  elt.style.backgroundImage = getUrl(elt.id); // sets to CSS directly
}


// Returns TRUE if pic_click_1 === pic_click_2
function areSameAnimal(img1, img2) {
  if (img1===img2) {
    return true;
  }
  else {
    return false;
  }
}


function flipBothBack(elt1, elt2) {
  elt1.style.backgroundImage = 'url("Pics/cover.jpg")';
  elt2.style.backgroundImage ='url("Pics/cover.jpg")';
}
