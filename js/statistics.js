let fastest_speed = document.querySelector(".fastest_speed");
let slowest_speed = document.querySelector(".slowest_speed");
let average_speed = document.querySelector(".average_speed");
let best_accuracy = document.querySelector(".best_accuracy");
let less_accuracy = document.querySelector(".least_accuracy");
let avg_accuracy = document.querySelector(".average_accuracy");
let tests_taken = document.querySelector(".tests_taken");
let speed_comment = document.querySelector(".speed_comment");
let overall_comment = document.querySelector(".overall_comment");
let arr = JSON.parse(localStorage.getItem("myArray"));

let fast_word_arr = [];
let best_accuracy_arr = [];
for (i = 0; i < arr.length; i++) {
    fast_word_arr.push(arr[i].correct_words);
    best_accuracy_arr.push(arr[i].accuracy);
}

function roundTo(num, digits) {
    const factor = 10 ** digits;
    return Math.round(num * factor) / factor;
}

function avg(a) {
    let sum = a.reduce((acc, val) => acc + val, 0);
    return sum;
}
let avg_speed = roundTo(avg(fast_word_arr) / fast_word_arr.length, 0);
fastest_speed.innerText = Math.max(...fast_word_arr) + "WPM";
slowest_speed.innerText = Math.min(...fast_word_arr) + "WPM";
average_speed.innerText = avg_speed + "WPM";

best_accuracy.innerText = Math.max(...best_accuracy_arr);
less_accuracy.innerText = Math.min(...best_accuracy_arr);
avg_accuracy.innerText = roundTo(avg(best_accuracy_arr) / best_accuracy_arr.length, 0);
tests_taken.innerHTML = arr.length;

if (avg_speed >= 0 & avg_speed <= 30) {
    speed_comment.innerHTML = "Slow Typing";
    overall_comment.innerHTML = "Practice More";
} else if (avg_speed >= 31 & avg_speed <= 70) {
    speed_comment.innerHTML = "Average Typing";
    overall_comment.innerHTML = "Little More Practice";
} else if (avg_speed >= 71 & avg_speed <= 200) {
    speed_comment.innerHTML = "Great Speed";
    overall_comment.innerHTML = "Professional Typing";
}

let wrngArr = JSON.parse(localStorage.getItem("CrctAndTyp"));
let uniqueArray = wrngArr.filter((value, index, self) => {
    const jsonString = JSON.stringify(value);
    return index === self.findIndex(obj => JSON.stringify(obj) === jsonString);
});

let weaknesses = [];

uniqueArray.forEach(({ "Correct Word: ": correctWord, "Typed Word: ": typedWord }) => {
    const minLength = Math.min(correctWord.length, typedWord.length);
    let weakness = null;

    for (let i = 0; i < minLength; i++) {
        if (correctWord[i] !== typedWord[i]) {
            weakness = correctWord[i];
            break;
        }
    }

    if (weakness !== null) {
        weaknesses.push(`${weakness}`);
    }
});

const letterCounts = {};

weaknesses.forEach(letter => {
  if (letterCounts.hasOwnProperty(letter)) {
    letterCounts[letter]++;
  } else {
    letterCounts[letter] = 1;
  }
});

const repeatedLetters = Object.entries(letterCounts)
  .map(([letter, count]) => ({ [letter]: count }));

let data = repeatedLetters;

// Extract the values from the data objects
const values = data.map(item => Object.values(item)[0]);

// Sort the values array in descending order
const sortedValues = values.sort((a, b) => b - a);

// Define the color range from red to blue
const colorRange = [
    "#ff0000", // Red
    "#ff3300",
    "#ff6600",
    "#ff9900",
    "#ffcc00",
    "#ffff00", // Yellow
    "#ccff00",
    "#99ff00",
    "#66ff00",
    "#33ff00",
    "#00ffff", // Cyan
    "#00ccff",
    "#00ccff",
    "#0099ff" //Blue
  ];
  

// // Calculate the color value based on the data values
// const getColor = (value, minValue, maxValue) => {
//   console.log(value + " " + minValue + " " + maxValue);  
//   const percentage = (value - minValue) / (maxValue - minValue);
//   const index = Math.round(percentage * (colorRange.length - 1));
//   console.log(percentage + " " + index);
//   return colorRange[index];
// };

// // Map the data array to assign color values
// const coloredData = data.map((item, index) => {
//   const key = Object.keys(item)[0];
//   const value = Object.values(item)[0];
//   const color = getColor(value, sortedValues[sortedValues.length - 1], sortedValues[0]);
//   const letterCode = key.charCodeAt(0);
//   let additionalKeyValues = {};

//   if (letterCode >= 97 && letterCode <= 122) {
//     additionalKeyValues = { Pos: letterCode - 96 };
//   }

//   return { [key]: value, color, ...additionalKeyValues };
// });
const getColor = (value, minValue, maxValue) => {
    const threshold = maxValue - ((maxValue - minValue) / 2);
  
    if (value >= threshold) {
      const percentage = (value - threshold) / (maxValue - threshold);
      const index = Math.round(percentage * (colorRange.length - 1));
      return colorRange[index];
    } else {
      const percentage = value / threshold;
      const index = Math.round(percentage * (colorRange.length - 1));
      return colorRange.reverse()[index];
    }
  };
  
  const coloredData = data.map((item) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    const color = getColor(value, sortedValues[sortedValues.length - 1], sortedValues[0]);
    const letterCode = key.charCodeAt(0);
    let additionalKeyValues = {};
  
    if (letterCode >= 97 && letterCode <= 122) {
      additionalKeyValues = { Pos: letterCode - 96 };
    }
  
    return { [key]: value, color, ...additionalKeyValues };
  });
  
  console.log(coloredData);
  

weaknesses = [...new Set(weaknesses)]
console.log(uniqueArray);
console.log(weaknesses);

let concBox = document.querySelector(".lettersToConcBox");
for (i = 0; i < weaknesses.length; i++) {
    concBox.innerHTML += `<p class="icon-text lettersToConc">${weaknesses[i]}</p>`;
}

for (let i = 0; i < coloredData.length; i++) {
    const item = coloredData[i];
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    const color = item.color;
    const pos = item.Pos;
  
    // Select the element with class name matching the Pos value
    const element = document.querySelector(`.pos-${pos}`);
    // Set the color to the selected element
    if (element) {
    element.style.color = "rgb(63,63,63)";
      element.style.background = color;
    }
  }

