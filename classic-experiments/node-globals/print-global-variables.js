function printGlobalVars() {
  console.log("constructor functions:");
  console.log(global.Array);
  console.log(global.Date);
  console.log(global.Object);
  console.log(global.RegExp);
  console.log(global.String);

  console.log("global functions:");
  console.log(global.eval);
  console.log(global.isNaN);
  console.log(global.parseInt);

  console.log("global objects:");
  console.log(global.JSON);
  console.log(global.Math);

  console.log("global properties:");
  console.log(global.Infinity);
  console.log(global.NaN);
  console.log(global.undefined);
}

printGlobalVars();
