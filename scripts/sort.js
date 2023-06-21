// Global variables
var barsContainer = document.getElementById("bars-container");
var bars = [];
var speed = 50;
var sortType;

const sort = document.getElementById("sort");
const sizeField = document.getElementById("size");
const speedField = document.getElementById("speed");
const reset = document.getElementById("reset");

var barHeight;
var size;

function updateVariables() {
  if (
    window.matchMedia("(max-width: 530px) and (orientation: portrait)").matches
  ) {
    barHeight = 700;
    size = 25;
  } else if (
    window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches
  ) {
    barHeight = 600;
    size = 30;
  } else if (
    window.matchMedia("(max-width: 1024px) and (orientation: portrait)").matches
  ) {
    barHeight = 500;
    size = 35;
  } else {
    barHeight = 300;
    size = 50;
  }
}

updateVariables();

window.addEventListener("resize", function(){
  updateVariables();
  generateRandomData(size);
});


// Generate random data for bars
function generateRandomData(size) {
  bars = [];
  barsContainer.innerHTML = "";

  for (var i = 0; i < size; i++) {
    var _barHeight = Math.floor(Math.random() * barHeight) + 10;
    var bar = document.createElement("div");
    bar.style.height = _barHeight + "px";
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
  else{
    speed = 50;
  }

  if (sizeField.value) {
    size = parseInt(sizeField.value);
    generateRandomData(size);
    setTimeout(sortSelector, 500);
  } else {
    size = 50;
    sortSelector();
  }
});

function sortSelector() {
  if (sortType == "bubble") {
    bubbleSort(speed);
  } else if (sortType == "insertion") {
    insertionSort(speed);
  } else if (sortType == "selection") {
    selectionSort(speed);
  } else if (sortType == "shell") {
    shellSort(speed);
  } else if (sortType == "cycle") {
    cycleSort(speed);
  } else{
    combSort(speed);
  }
}

reset.addEventListener("click", function () {
  generateRandomData(size);
});

/*
SORTING ALGORITHMS
*/

/*
***********
BUBBLE SORT
***********
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

/*
**************
INSERTION SORT
**************
*/

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

/*
**************
SELECTION SORT
**************
*/

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

/*
**********
SHELL SORT
**********
*/

async function shellSort(speed) {
  var n = bars.length;
  var gap = Math.floor(n / 2);
  while (gap > 0) {
    for (var i = gap; i < n; i++) {
      var temp = bars[i].style.height;
      var j = i;
      while (j >= gap && bars[j - gap].clientHeight > parseInt(temp)) {
        bars[j].style.backgroundColor = "#ff0000";
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[j - gap].style.backgroundColor = "#ff0000";
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[j].style.height = bars[j - gap].style.height;
        bars[j].style.backgroundColor = "#3498db";
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[j - gap].style.backgroundColor = "#3498db";
        
        j -= gap;
      }
      bars[j].style.height = temp;
    }
    gap = Math.floor(gap / 2);
  }
  for (var i = bars.length - 1; i >= 0; i--) {
    await new Promise((resolve) => setTimeout(resolve, speed));
    bars[i].style.backgroundColor = "#2ecc71";
  }
}


/*
**********
CYCLE SORT
**********
*/

async function cycleSort(speed) {
  var n = bars.length;

  for (var cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    var itemHeight = bars[cycleStart].style.height;
    var pos = cycleStart;
    var isFinalPosition = false;

    // Highlight the current element being considered
    bars[cycleStart].style.backgroundColor = '#ff0000';
    await new Promise((resolve) => setTimeout(resolve, speed));

    for (var i = cycleStart + 1; i < n; i++) {
      if (parseInt(bars[i].style.height) < parseInt(itemHeight)) {
        pos++;
      }
    }

    if (pos === cycleStart) {
      // Reset the color of the current element
      bars[cycleStart].style.backgroundColor = '#2ecc71';
      isFinalPosition = true;
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    while (parseInt(itemHeight) === parseInt(bars[pos].style.height)) {
      pos++;
    }

    if (!isFinalPosition) {
      // Swap the heights of the elements
      var tempHeight = bars[pos].style.height;
      bars[pos].style.height = itemHeight;
      itemHeight = tempHeight;

      // Swap the colors of the elements
      bars[cycleStart].style.backgroundColor = '#3498db';
      bars[pos].style.backgroundColor = '#ff0000';
      await new Promise((resolve) => setTimeout(resolve, speed));

      while (pos !== cycleStart) {
        pos = cycleStart;

        for (var i = cycleStart + 1; i < n; i++) {
          if (parseInt(bars[i].style.height) < parseInt(itemHeight)) {
            pos++;
          }
        }

        while (parseInt(itemHeight) === parseInt(bars[pos].style.height)) {
          pos++;
        }

        // Swap the heights of the elements
        var tempHeight = bars[pos].style.height;
        bars[pos].style.height = itemHeight;
        itemHeight = tempHeight;

        // Swap the colors of the elements
        bars[cycleStart].style.backgroundColor = '#ff0000';
        bars[pos].style.backgroundColor = '#3498db';
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
    // Highlight the elements in their final position with green color
    bars[cycleStart].style.backgroundColor = '#2ecc71';
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
  bars[n-1].style.backgroundColor = '#2ecc71';
}


/*
*********
COMB SORT
*********
*/

async function combSort(speed) {
  var n = bars.length;
  var gap = n;
  var swapped = true;

  while (gap > 1 || swapped) {
    gap = getNextGap(gap);
    swapped = false;

    for (var i = 0; i < n - gap; i++) {
      var j = i + gap;

      if (parseInt(bars[i].style.height) > parseInt(bars[j].style.height)) {
        // Highlight the swapped elements
        bars[i].style.backgroundColor = '#ff0000';
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[j].style.backgroundColor = '#ff0000';
        await new Promise((resolve) => setTimeout(resolve, speed));

        // Swap the heights of the elements
        var tempHeight = bars[i].style.height;
        bars[i].style.height = bars[j].style.height;
        bars[j].style.height = tempHeight;

        swapped = true;

        // Reset the color of the swapped elements
        bars[i].style.backgroundColor = '#3498db';
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[j].style.backgroundColor = '#3498db';
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
  }

  // Color the elements in the sorted position with #2ecc71
  for (var i = 0; i < n; i++) {
    await new Promise((resolve) => setTimeout(resolve, speed));
    bars[i].style.backgroundColor = '#2ecc71';
  }
}

function getNextGap(gap) {
  gap = Math.floor((gap * 10) / 13);
  return Math.max(gap, 1);
}


