function calc() {
  var entry = document.getElementById("input").value;
  var nmb = "";
  var stack = [];
  for (var x = 0; x < entry.length; x++) {
    if (!isNaN(entry[x])) {
      nmb += entry[x];
    }
    if (
      entry[x] === "+" ||
      entry[x] === "-" ||
      entry[x] === "/" ||
      entry[x] === "*"
    ) {
      nmb += " ";
      if (priority(stack[stack.length - 1]) == 2) {
        nmb += stack.pop() + " ";
      }
      if (stack.length == 1 && priority(entry[x]) == 1) {
        nmb += stack.pop() + " ";
        stack.push(entry[x]);
      }
      if (priority(entry[x]) == 2) {
        stack.push(entry[x]);
      }
      if (stack.length == 0 && priority(entry[x]) == 1) {
        stack.push(entry[x]);
      }
    }
  }
  while (stack.length != 1) {
    nmb += stack.pop() + " ";
  }
  return (nmb += " " + stack.pop());
}
function priority(str) {
  switch (str) {
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
    default:
      return 0;
  }
}
function PostFix(nmb) {
  var finalStack = [];
  nmb = nmb.split(" ");
  for (var i = 0; i < nmb.length; i++) {
    if (!isNaN(nmb[i])) {
      finalStack.push(nmb[i]);
    } else {
      var a = finalStack.pop();
      var b = finalStack.pop();
      if (nmb[i] === "+") {
        finalStack.push(parseInt(a) + parseInt(b));
      } else if (nmb[i] === "-") {
        finalStack.push(parseInt(b) - parseInt(a));
      } else if (nmb[i] === "*") {
        finalStack.push(parseInt(a) * parseInt(b));
      } else if (nmb[i] === "/") {
        finalStack.push(parseInt(b) / parseInt(a));
      }
    }
  }
  if (finalStack.length > 1) {
    return "error";
  } else {
    return finalStack.pop();
  }
}
var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    var result = PostFix(calc());
    document.getElementById("output").innerHTML = result;
  }
});
