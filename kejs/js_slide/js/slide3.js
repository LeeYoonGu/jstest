

window.onload = function(){
  var indicator_chlidren = document.getElementsByClassName('slide_indicator')[0].getElementsByTagName('UL')[0].children;
  var viewbox = document.getElementsByClassName('slide_viewbox')[0].getElementsByTagName('UL')[0];
  var viewbox_chlidren = document.getElementsByClassName('slide_viewbox')[0].getElementsByTagName('UL')[0].children;
  var prev_btn = document.getElementsByClassName("btn_prev")[0];
  var next_btn = document.getElementsByClassName("btn_next")[0];
  var viw_width = viewbox_chlidren[0].clientWidth;
  var current_arr = document.getElementsByClassName('active')[0];


  // addEventListener
  prev_btn.addEventListener("click", clickPrev, false);
  next_btn.addEventListener("click", clickNext, false);

  for (var i = 0; i < indicator_chlidren.length; i++) {
    indicator_chlidren[i].dataset.index=i;
    indicator_chlidren[i].addEventListener("click", function(){clickIndicator(this)}, false);
  }


  //indicator click event
  function clickIndicator(obj){
    var index = obj.dataset.index;
    var marginL = -viw_width*index;
    viewbox.style.marginLeft = marginL+"px";

    changeActive(index);
  }

  function changeActive(index_num){
    current_arr.classList.remove("active");

    if (index_num == -1) {
      indicator_chlidren[indicator_chlidren.length-1].classList.add("active");
      current_arr = indicator_chlidren[indicator_chlidren.length-1];
    }else {
      indicator_chlidren[index_num].classList.add("active");
      current_arr = indicator_chlidren[index_num];
    }
  }

//prev button click event
 function clickPrev(){
   var marginL = viewbox_chlidren[0].clientWidth;
   var view_margin = Number(viewbox.style.marginLeft.split("px")[0]);
   //var crnt_arr = document.getElementsByClassName('active')[0];
   //var move_index = Number(crnt_arr.dataset.index)-1;
  var index =Number(document.getElementsByClassName('active')[0].dataset.index)-1;

   changeActive(index);

   if (view_margin == 0 ) {
     viewbox.style.marginLeft = -(marginL * (viewbox_chlidren.length-1))+"px";
     //var move_index = Number(current_arr.dataset.index) + (viewbox_chlidren.length-1);

     //crnt_arr.classList.remove("active");
     //indicator_chlidren[move_arr].classList.add("active");
   }else{
     viewbox.style.marginLeft = marginL+view_margin+"px";
     //var move_index = Number(crnt_arr.dataset.index)-1;

    // crnt_arr.classList.remove("active");
    // indicator_chlidren[move_arr].classList.add("active");
   }

 }

 //next button click event
 function clickNext(){
   var marginL = viewbox_chlidren[0].clientWidth;
   var crnt_arr = document.getElementsByClassName('active')[0];
   var view_margin = Number(viewbox.style.marginLeft.split("px")[0]);

   if (view_margin == -(marginL * (viewbox_chlidren.length-1)) ) {
     viewbox.style.marginLeft = 0+"px";
     var move_arr = 0;

     crnt_arr.classList.remove("active");
     indicator_chlidren[move_arr].classList.add("active");
   }else{
     viewbox.style.marginLeft = -marginL+view_margin+"px";
     var move_arr = Number(crnt_arr.dataset.index)+1;

     crnt_arr.classList.remove("active");
     indicator_chlidren[move_arr].classList.add("active");
   }
 }


window.onresize = function(){
  var viw_width = viewbox_chlidren[0].clientWidth;
  var carr = document.getElementsByClassName('active')[0];
  var move_arr = Number(carr.dataset.index);
  viewbox.style.marginLeft = -(viw_width*move_arr)+"px";
  console.log(move_arr);

}


}
