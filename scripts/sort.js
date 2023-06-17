// Global variables
var barsContainer = document.getElementById("bars-container");
var bars = [];
var size = 50;
var speed = 50;
var sortType;

const sort = document.getElementById("sort");
const sizeField = document.getElementById("size");
const speedField = document.getElementById("speed");
const reset = document.getElementById("reset");

// Generate random data for bars
function generateRandomData(size) {
  bars = [];
  barsContainer.innerHTML = "";

  for (var i = 0; i < size; i++) {
    var barHeight = Math.floor(Math.random() * 300) + 10;
    var bar = document.createElement("div");
    bar.style.height = barHeight + "px";
    bar.className = "bar";
    barsContainer.appendChild(bar);
    bars.push(bar);
  }
}

window.onload = () => {
  generateRandomData(size);
};

sort.addEventListener("click", function () {
  if (speedField.value) {
    speed = parseInt(speedField.value);
  }

  if (sizeField.value) {
    size = parseInt(sizeField.value);
    generateRandomData(size);
    setTimeout(sortSelector, 500);
  }

  else{
    sortSelector();
  }

});

function sortSelector(){
  if (sortType == "bubble") {
    bubbleSort(speed);
  } else if (sortType == "insertion") {
    insertionSort(speed);
  } else if (sortType == "selection") {
    selectionSort(speed);
  }
}

reset.addEventListener("click", function () {
  generateRandomData(size);
});

/*
SORTING ALGORITHMS
*/

async function bubbleSort(speed) {
  var end = bars.length;
  for (var _ = 0; _ < bars.length - 1; _++) {
    for (var j = 1; j < end; j++) {
      // Color the bars being compared
      bars[j - 1].style.backgroundColor = "#ff0000";
      bars[j].style.backgroundColor = "#ff0000";

      // Wait for a short duration to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (bars[j - 1].clientHeight > bars[j].clientHeight) {
        // Swap the bars height
        var temp = bars[j - 1].style.height;
        bars[j - 1].style.height = bars[j].style.height;
        bars[j].style.height = temp;
      }

      // Revert the color of compared bars back to default
      bars[j - 1].style.backgroundColor = "#3498db";
      bars[j].style.backgroundColor = "#3498db";
    }

    // Mark the last sorted bar with a different color
    bars[end - 1].style.backgroundColor = "#2ecc71";
    end -= 1;
  }
  bars[0].style.backgroundColor = "#2ecc71";
}

async function insertionSort(speed) {
  for (var i = bars.length - 1; i >= 0; i--) {
    bars[i].style.backgroundColor = "#3498db";
  }

  for (var i = 1; i < bars.length; i++) {
    for (var j = i; j > 0; j--) {
      // Color the bars being compared
      bars[j - 1].style.backgroundColor = "#ff0000";
      bars[j].style.backgroundColor = "#ff0000";

      // Wait for a short duration to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (bars[j - 1].clientHeight > bars[j].clientHeight) {
        // Swap the bars height
        var temp = bars[j - 1].style.height;
        bars[j - 1].style.height = bars[j].style.height;
        bars[j].style.height = temp;
      }

      // Revert the color of compared bars back to default
      bars[j - 1].style.backgroundColor = "#3498db";

      if (j === i) {
        bars[j].style.backgroundColor = "#2ecc71";
      } else {
        bars[j].style.backgroundColor = "#3498db";
      }
    }
  }

  for (var i = bars.length - 2; i >= 0; i--) {
    await new Promise((resolve) => setTimeout(resolve, speed));
    bars[i].style.backgroundColor = "#2ecc71";
  }
}

async function selectionSort(speed) {
  for (var i = 0; i < bars.length - 1; i++) {
    var minIdx = i; // index of the smallest number
    for (var j = i + 1; j < bars.length; j++) {
      // Color the bars being compared
      bars[minIdx].style.backgroundColor = "#ff0000";
      bars[j].style.backgroundColor = "#ff0000";

      // Wait for a short duration to visualize the comparison
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (bars[j].clientHeight < bars[minIdx].clientHeight) {
        bars[minIdx].style.backgroundColor = "#3498db";
        minIdx = j;
      } else {
        bars[j].style.backgroundColor = "#3498db";
      }
    }
    if (minIdx !== i) {
      // Swap the bars height
      var temp = bars[minIdx].style.height;
      bars[minIdx].style.height = bars[i].style.height;
      bars[i].style.height = temp;

      bars[minIdx].style.backgroundColor = "#3498db";
    }
    bars[i].style.backgroundColor = "#ff0000";
    await new Promise((resolve) => setTimeout(resolve, speed));
    bars[i].style.backgroundColor = "#2ecc71";
  }
  bars[bars.length - 1].style.backgroundColor = "#2ecc71";
}
