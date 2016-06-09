var ul = document.getElementById('slider'); // 배열로 가져올 시 style.width가 먹지 않아 id 지정 
var li = ul.children; // li 들을 children을 통해 배열로 저장한다. 
var liWidth = ul.children[0].offsetWidth; // li 의 width값을 가져옴 
var i = 0;

document.getElementById("btn_next").addEventListener("click", moveNext);
document.getElementById("btn_prev").addEventListener("click", movePrev);

function moveNext() {
  if (i < li.length - 1) { //li 갯수만큼만 slider 실행
      i++;
      ul.style.marginLeft = -liWidth * i + "px";            
  }
}

function movePrev() {
  if (i > 0){ // li 갯수가 작으면 실행 안함 
    i--;
    ul.style.marginLeft = -liWidth * i + "px";    
  } 
}                

var dot=document.getElementById("dot");
var dot_a=dot.getElementsByTagName("a");

for(var k=0; k<dot_a.length -1; k++){ 
  dot_a[k].addEventListener("click", movePoint); // 모든 dot에 이벤트 걸기
  function movePoint() { 
    ul.style.marginLeft = -liWidth * k + "px";     
  }
}
