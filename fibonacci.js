var result = fibonacci(100);
process.send({type: 'result', fibonacci: result });


function fibonacci(num){
  var a = 1, b = 0, temp;
  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
    if(num % 10 === 0) {
        process.send({type: 'partial', fibonacci: b });
      }
  }
  return b;
}