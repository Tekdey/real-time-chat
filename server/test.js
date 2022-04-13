const array1 = [
  "136184c6e828bb02f336740b453712d2",
  "92258bfa5702db12f35abe746d475be9",
  "cfa95ab9dcf7d09ef85762a9570c5bfc",
];
let helperVar = false;
array1.find((element) => {
  if (element === "cfa95ab9dcf7d09ef85762a9570c5bfc") {
    return (helperVar = true);
  }
});

console.log(helperVar);
