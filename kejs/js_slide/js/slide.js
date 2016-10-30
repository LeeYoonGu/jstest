
//하다보니 onload 에 다 집어넣는데... 괜찮나?????
window.onload = function(){
  /*
  indicator_chlidren : indicator li들 가져욤
  viewbox : 슬라이드 ul 가져옴
  viewbox_chlidren : 슬라이드 li들 가져욤
  prev_btn : prev_btn
  next_btn : next_btn
  current_arr : 현재 active 클래스 가지고 있는 li 가져옴
  btn_stop : btn_stop
  btn_play : btn_play
  timeset : 자동 플레이 id
  */
  var indicator_chlidren = document.getElementsByClassName('slide_indicator')[0].getElementsByTagName('UL')[0].children,
      viewbox = document.getElementsByClassName('slide_viewbox')[0].getElementsByTagName('UL')[0],
      viewbox_chlidren = document.getElementsByClassName('slide_viewbox')[0].getElementsByTagName('UL')[0].children,
      prev_btn = document.getElementsByClassName("btn_prev")[0],
      next_btn = document.getElementsByClassName("btn_next")[0],
      current_arr = document.getElementsByClassName('active')[0],
      btn_stop = document.getElementsByClassName('btn_stop')[0],
      btn_play = document.getElementsByClassName('btn_play')[0],
      timeset = setTimeout(moveLeft, 3000);

  // addEventListener
  prev_btn.addEventListener("click", function(){clearInterval(timeset); moveRight();}, false);         // prev_btn 버튼 클리시 자동재생-> 정지 시키고 moveLeft 함수 실행
  next_btn.addEventListener("click", function(){clearInterval(timeset); moveLeft();}, false);        // next_btn 버튼 클리시 자동재생-> 정지 시키고 moveRight 함수 실행
  btn_stop.addEventListener("click", function(){clearInterval(timeset);},false );                     // 자동재생-> 정지
  btn_play.addEventListener("click", function(){timeset = setInterval(moveLeft, 2000)},false );      // 자동재생

  //indicator li마다 data- 생성 및 클릭시 실행될 이벤트 생성
  for (var i = 0; i < indicator_chlidren.length; i++) {
    indicator_chlidren[i].dataset.index=i;              //li 마다 data-index 생성
    indicator_chlidren[i].addEventListener("click", function(){clickIndicator(this)}, false);
  }



  //indicator click event
  function clickIndicator(obj){
    console.log(obj);
    var viw_width = viewbox_chlidren[0].clientWidth;              //일단... 슬라이드 li 의 현재 넓이 가져옴(유동형이라서.. 넓이값 고정 아님)
    var index = obj.dataset.index;                                //클릭한 li의 date-index 값 가져옴 (obj = this)
    var marginL = -viw_width*index;                               //li 의 넓이값에 index 값 곱해줌 + - 넣은 이유는 ul 이 왼쪽으로 이동해야되니까! ex) 500*0 = 0, 500*1=500, 500*2=1000
    viewbox.style.marginLeft = marginL+"px";                      //슬라이드 ul 이 움직이도록 margin-left 값 설정

    changeActive(index);                                          //그리고 indicator li의 active 클래스 넣어주는 함수 호출
  }

//indicator li의 active 클래스 설정
  function changeActive(index_num){
    current_arr.classList.remove("active");                       //현재 active 클래스 가지고 있음 제거

    if (index_num == -1) {                                        //인자로 가지고온 인덱스(선택된 index) 가 -1이면(-1 == 슬라이드가 right로 움직이는 상황에서 첫번째 슬라이드의 다음 슬라이드 보여질때???라고해야되나)
      indicator_chlidren[indicator_chlidren.length-1].classList.add("active");      //마지막 indicator 에 active 추가
      current_arr = indicator_chlidren[indicator_chlidren.length-1];                //현재 active 클래스 가지고 잇는 li 변경
    }else if(index_num == indicator_chlidren.length){              //인자로 가지고온 인덱스(선택된 index) 가 indicator_chlidren.length이면(= 슬라이드가 left로 움직이는 상황에서 마지막 슬라이드의 다음 슬라이드 보여질때???라고해야되나)
      indicator_chlidren[0].classList.add("active");
      current_arr = indicator_chlidren[0];
    }else {
      indicator_chlidren[index_num].classList.add("active");        //그외 그냥 인자로 들어온 index로 진행
      current_arr = indicator_chlidren[index_num];
    }
  }

//prev button click event
  function moveRight(){
    var marginL = viewbox_chlidren[0].clientWidth;                                                   // 슬라이드 li 의 현재 넓이 가져옴(유동형이라서.. 넓이값 고정 아님)
    var view_margin = Number(viewbox.style.marginLeft.split("px")[0]);                               //지금 슬라이드 ul에 margin-left값 가져옴
    var index =Number(document.getElementsByClassName('active')[0].dataset.index)-1;                 //active 클래스 가지고 있는 li 의 date-index값 가져와서 -1 함  -> indicator  active 클래스 설정해주는 함수의 인자로 넣어줌

    if (view_margin == 0 ) {                                                                         //슬라이드 ul의 margin-left 값이 0 일때(첫번째 슬라이드일때)
      viewbox.style.marginLeft = -(marginL * (viewbox_chlidren.length-1))+"px";                      //마지막 슬라이드 보여줄수 있도록 이동
    }else{
      viewbox.style.marginLeft = marginL+view_margin+"px";                                           //안그럼 그냥 슬라이드 넓이만큼 이동
    }

    changeActive(index);
 }

 //next button click event
 function moveLeft(){
   var marginL = viewbox_chlidren[0].clientWidth;
   var view_margin = Number(viewbox.style.marginLeft.split("px")[0]);
   var index =Number(document.getElementsByClassName('active')[0].dataset.index)+1;

   if (index >= viewbox_chlidren.length) {
     viewbox.style.marginLeft = 0+"px";
   }else{
     viewbox.style.marginLeft = -marginL+view_margin+"px";
   }

   changeActive(index);
 }

  //이건 .. 화면 resize 될때
  window.onresize = function(){
    var viw_width = viewbox_chlidren[0].clientWidth;
    var carr = document.getElementsByClassName('active')[0];
    var move_arr = Number(carr.dataset.index);
    viewbox.style.marginLeft = -(viw_width*move_arr)+"px";
    console.log(move_arr);

  }



}
