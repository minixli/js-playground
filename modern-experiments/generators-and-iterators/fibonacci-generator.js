function* fibonacci() {
  let x = 0, y = 1;
  while(true) {
    yield y;
    [x,y] = [y,x+y];
  }
}

let f = fibonacci();
for(let i = 0; i < 10; i++) {
  let res = f.next();
  console.log(res.value);
}
