// 이전걸 보셨다면 이번에는 엘리먼트에 사용자 정의 속성 (data-뭐시깽이) 을 삽입하지 앟고 js 에서
// 정의해버리는 방법입니다.
// 실제 이방법을 사용하라는 권고가 있으며 엘리먼트에 접근할수 없는 상황에서도 사용가능합니다.

var ul = document.getElementById('slider'); // 배열로 가져올 시 style.width가 먹지 않아 id 지정 
var li = ul.children;
var liWidth = ul.children[0].offsetWidth;
var i = 0; // 함수 안으로 위치하면 2번까지만 이동 됨.
var current_margin = ul.style.marginLeft; 


function moveNext() {
  if(i < li.length -1){ //li 갯수만큼만 slider
    i++;
    ul.style.marginLeft = current_margin - liWidth * i + "px"; // ul에 li 사이즈 만큼 margin-left 적용 됨. 
    // current_margin = ul.style.marginLeft - liWidth * i + "px";
    // ul.style.marginLeft = current_margin;
    console.log(current_margin); // "" 값을 출력 하고 있음..
  }  
  // for (var i = 0; i < li.length; i++) {      for문을 사용할 경우 왜 바로 4로 이동하는지 확인 필요 
  //   ul.style.marginLeft = -liWidth * i + "px";
  // }
}

function movePrev() { 
  var i = 0;
  if(i < li.length -1){
    i++;
    ul.style.marginRight = current_margin +  liWidth * i + "px";
  }  
}

document.getElementById("btn_next").addEventListener("click", moveNext);
document.getElementById("btn_prev").addEventListener("click", movePrev);
