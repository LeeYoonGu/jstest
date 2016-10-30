
// 계산할 숫자 담을 배열
var arr =[];
//계산 기호 담을 변수
var sign;

// input 에 keydown시 실행
function nkeydown() {
  //input value 값 가져옴
  var value = document.getElementById('input_number').value;

  // +,- / * 일경우 if문 실행
  if(event.keyCode == 43 || event.keyCode == 42 || event.keyCode ==45 || event.keyCode ==47 || event.keyCode == 13 || event.keyCode == 27){

    if(event.keyCode == 13){          //enter일 경우(결과나옴)
      var split_num = value.split(sign);    //sign 로 구분된 문자열 분리
      arr[1] = Number(split_num[1]);        //분리된 문자 -> 숫자로 변경하여 배열에 저장
      calculator(arr[0], sign,arr[1]);      //계산
      arr=[];                               //계산 후 배열 초기화?
    }else{
      arr[0] = Number(value);               //enter 아닐경우(+,-,/,*) input의 value값 숫자로 변경하여 저장
      sign = String.fromCharCode(event.keyCode);      //유니코드문자 값에서 문자열 반환
      document.getElementById('input_number').value="";   //input 에 쓴 숫자 지움
    }
  }
}


//계산 함수
function calculator(a,b,c){
  var result =0;
  switch (b) {
    case "-":
      result = a - c;
      break;
    case "*":
      result = a * c;
      break;
    case "/":
      result = a / c;
      break;
    default:
      result = a+c;
  }
  //input에 결과값 나옴
  document.getElementById('input_number').value = result;
  //input아래 p태그에 결과값 나옴
  document.getElementById('result').textContent = result;
}

//esc 누를경우 초기화
window.onkeydown = function(){
  if(event.keyCode == 27){
    arr=[];
    document.getElementById('input_number').value="";
  }
}
