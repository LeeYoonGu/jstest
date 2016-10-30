
function cc(a,b,c){
  var inpt_num = [];
  inpt_num[0] = Number(a);
  inpt_num[1] = b;
  inpt_num[2] = Number(c);

  var result =0;

  switch (inpt_num[1]) {
    case "-":
      result = inpt_num[0] - inpt_num[2];
      break;
    case "*":
      result = inpt_num[0] * inpt_num[2];
      break;
    case "/":
      result = inpt_num[0] / inpt_num[2];
      break;
    default:
      result = inpt_num[0]+inpt_num[2];
  }

  console.log(result);
}
