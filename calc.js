(function () {
  "use strict";

  var buttons = document.getElementsByTagName("button");

  var viewer = document.getElementById("viewer");
  var prev = viewer.innerHTML;
  var curr = null;
  var ops = null;
  // Represents if currently selecting operation but haven't entered current number.
  var opsSelected = false;

  // Handle button events.
  var eventHandler = function (event) {
    var calcEvent = event.target.innerText;
    switch (calcEvent) {
      case "C":
        clear();
        break;

      case "+\n=":
      case "-":
      case "*":
      case "/":
        opsHandler(calcEvent);
        break;

      default:
        numHandler(calcEvent);
        break;
    }
  };

  // Initialize all buttons with event listeners.
  var init = function () {
    for (var button of buttons) {
      button.addEventListener("click", eventHandler);
    }
  };

  // Clear all numbers and operations.
  var clear = function () {
    viewer.innerHTML = "0";
    prev = "0";
    curr = null;
    ops = null;
    opsSelected = false;
  };

  // Handle operation events.
  var opsHandler = function (event) {
    // If operation hasn't been defined, set operation to input operation.
    if (ops === null) {
      prev = viewer.innerHTML;
      ops = event;
      opsSelected = true;
    }
    // If new number hasn't been defined but operation has, set operation to input operation.
    else if (opsSelected) {
      ops = event;
    }
    // Display the result from the inputted operation of the previous and current number.
    else {
      curr = viewer.innerHTML;
      var result = calculate(event);
      viewer.innerHTML = result;
      prev = result;
      curr = null;
      // If pressed plus equals button, then indicate that no new operation is selected.
      if (event === "+\n=") {
        ops = null;
        opsSelected = false;
      }
      ops = event;
      opsSelected = true;
    }
  };

  // Returns the string of the result of the calculation of the operation of the inputted numbers.
  // Returns Not a number message when dividing by 0.
  var calculate = function () {
    var prevNum = parseFloat(prev);
    var currNum = parseFloat(curr);
    var result;
    switch (ops) {
      case "+\n=":
        var result = prevNum + currNum;
        break;
      case "-":
        var result = prevNum - currNum;
        break;
      case "*":
        var result = prevNum * currNum;
        break;
      case "/":
        if (currNum === 0) {
          return "Not a number";
        } else {
          var result = prevNum / currNum;
          break;
        }
    }
    if (result > Math.pow(10, 16)) {
      result = result.toExponential(10);
    }
    return result.toString();
  };

  // Handle number and decimal events.
  var numHandler = function (event) {
    // If previously selecting operation, now indicate no longer selecting.

    if (event === ".") {
      // Only add decimal if current num doesn't have decimal.
      if (!(viewer.innerHTML.indexOf(".") !== -1)) {
        viewer.innerHTML = viewer.innerHTML + event;
      }
    } else {
      // Only add digits if current digit length is less than 10 as most calculators only suppport
      // up to 16 digits.
      if (viewer.innerHTML.length < 15 || opsSelected) {
        // If the current num is 0 don't add digits to the 0.
        // If starting a new number (operation selected) then create new number.
        if (viewer.innerHTML === "0" || (opsSelected)) {
          viewer.innerHTML = event;
        } else {
          viewer.innerHTML = viewer.innerHTML + event;
        }
      }
    }
    if (opsSelected) {
      opsSelected = false;
    }
  };

  window.addEventListener("load", init, false);
})();
