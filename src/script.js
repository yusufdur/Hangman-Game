//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
//Options values for buttons

// function readTextFile(file, array) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.open("GET", file, false);
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4) {
//       if (rawFile.status === 200 || rawFile.status == 0) {
//         var allText = rawFile.responseText;
//         array = allText.split("\r\n")
//         console.log(array);
//       }
//     }
//   }
//   rawFile.send(null);
//   return array
// }

let options = {
  fruits: ["Apple","Apricot","Avocado","Banana","Bilberry","Blackberry","Blackcurrant","Blueberry","Boysenberry","Currant","Cherry","Cherimoya","Chico fruit","Cloudberry","Coconut","Cranberry","Cucumber","Custard apple","Damson","Date","Dragonfruit","Durian","Elderberry","Feijoa","Fig","Goji berry","Gooseberry","Grape","Raisin","Grapefruit","Guava","Honeyberry","Huckleberry","Jabuticaba","Jackfruit","Jambul","Jujube","Juniper berry","Kiwano","Kiwifruit","Kumquat","Lemon","Lime","Loquat","Longan","Lychee","Mango","Mangosteen","Marionberry","Melon","Cantaloupe","Honeydew","Watermelon","Miracle fruit","Mulberry","Nectarine","Nance","Olive","Orange","Blood orange","Clementine","Mandarine","Tangerine","Papaya","Passionfruit","Peach","Pear","Persimmon","Physalis","Plantain","Plum","Prune","Pineapple","Plumcot","Pomegranate","Pomelo","Purple mangosteen","Quince","Raspberry","Salmonberry","Rambutan","Redcurrant","Salal berry","Salak","Satsuma","Soursop","Star fruit","Solanum quitoense","Strawberry","Tamarillo","Tamarind","Ugli fruit","Yuzu"],
  animals: ["alligator", "armadillo", "bear", "beaver", "butterfly", "camel", "chicken", "chipmunk", "cougar", "coyote", "crocodile", "crab", "crayfish", "crow", "dinosaur", "dolphin", "donkey", "dragonfly", "deer", "duck", "eagle", "worm", "elephant", "fish", "frog", "giraffe", "goat", "goose", "gopher", "hamster", "hawk", "hedgehog", "hippopotamus", "horse", "jellyfish", "kangaroo", "kitten", "koala", "leopard", "lion", "lizard", "monkey", "moose", "mosquito", "mouse", "octopus", "oyster", "parrot", "panda", "panther", "pelican", "penguin", "piglet", "pigeon", "rabbit", "reindeer", "rhinoceros", "shark", "sheep", "skunk", "snail", "snake", "spider", "squirrel", "tiger", "tortoise", "turkey", "turtle", "whale", "wolf", "woodpecker", "worm", "zebra"],
  countries: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Botswana", "Brazil", "Brunei", "Bulgaria", "BurkinaFaso", "Burundi", "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia", "Comoros", "Croatia", "Cuba", "Cyprus", "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", "Senegal", "Serbia", "Seychelles", "Singapore", "Slovakia", "Slovenia", "Somalia", "Spain", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Togo", "Tonga", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
}

// options.fruits = readTextFile("./assets/words/fruits.txt", options.fruits);
// options.animals = readTextFile("./assets/words/animals.txt", options.animals);
// options.countries = readTextFile("./assets/words/countries.txt", options.countries);

console.log(options)

//count
let winCount = 0;
let count = 0;
let chosenWord = "";
//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};
//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};
//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  let optionArray = options[optionValue];
  console.log("option array : ", optionArray);

  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  console.log("CHOOSEN WORD => \" ", chosenWord, " \" ");
  //replace every letter with span containing dash
  let displayItem = ""
  if (!chosenWord.includes(" ")) {
    displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  } else {
    let array = Array.from(chosenWord);
    for (let i = 0; i < array.length; i++) {
      if (array[i] != ' ') {
        displayItem += '<span class="dashes">_</span>'
      } else {
        displayItem += "&nbsp&nbsp"
      }
    }
    // displayItem = chosenWord.replace(/\s(?=\S)/g, "&nbsp");
    // displayItem = chosenWord.replace(/[^ ]/g, '<span class="dashes">_</span>')
  }
  //Display each element as span
  userInputSection.innerHTML = displayItem;
};
//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");

      // set array if has space 
      charArray = charArray.filter(el => el !== " ");

      let dashes = document.getElementsByClassName("dashes");
      //if array contains clicked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 9) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};
//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  const bottomLine = () => {
    drawLine(10, 130, 130, 130);
  }
  const leftLine = () => {
    drawLine(10, 10, 10, 131);
  }
  const topLine = () => {
    drawLine(10, 10, 70, 10);
  }
  const smallTopLine = () => {
    drawLine(70, 10, 70, 20);
  }
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // bottom line
    drawLine(10, 130, 130, 130);
    // //left line
    // drawLine(10, 10, 10, 131);
    // //top line
    // drawLine(10, 10, 70, 10);
    // //small top line
    // drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, bottomLine, leftLine, topLine, smallTopLine, head, body, leftArm, rightArm, leftLeg, rightLeg };
};
//draw the man
const drawMan = (count) => {
  let { bottomLine, leftLine, topLine, smallTopLine, head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      leftLine();
      break;
    case 2:
      topLine();
      break;
    case 3:
      smallTopLine();
      break;
    case 4:
      head();
      break;
    case 5:
      body();
      break;
    case 6:
      leftArm();
      break;
    case 7:
      rightArm();
      break;
    case 8:
      leftLeg();
      break;
    case 9:
      rightLeg();
      break;
    default:
      break;
  }
};
//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;