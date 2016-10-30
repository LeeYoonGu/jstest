window.onload = function(){
  var indicator_chlidren = document.getElementsByClassName('slide_indicator')[0].getElementsByTagName('UL')[0].children;
  var viewbox = document.getElementsByClassName('slide_viewbox')[0].getElementsByTagName('UL')[0];
  var viewbox_chlidren = document.getElementsByClassName('slide_viewbox')[0].getElementsByTagName('UL')[0].children;
  var prev_btn = document.getElementsByClassName("btn_prev")[0];
  var next_btn = document.getElementsByClassName("btn_next")[0];
//  var arr_str = viewbox_chlidren[0];
  var pr_arr = null;
//  viewbox.style.marginLeft = 0;
  prev_btn.addEventListener("click", clickPrev, false);
  next_btn.addEventListener("click", clickNext, false);

  for (var i = 0; i < indicator_chlidren.length; i++) {
    indicator_chlidren[i].dataset.index=i;
    indicator_chlidren[i].addEventListener("click", function(){clickIndicator(this,viewbox_chlidren)}, false);
    //console.log(indicator_chlidren[i]);
  }

  //indicator click event
  function clickIndicator(obj,view_arr){
    var index = obj.dataset.index;
    var mrgl = -500*index;
    var crnt_arr = document.getElementsByClassName('active')[0];
    crnt_arr.classList.remove("active");

    obj.classList.add("active");

    // if (pr_arr != null) {
    //   pr_arr.classList.remove("active");
    //   pr_arr = obj;
    // }else pr_arr = obj;


    viewbox.style.marginLeft = mrgl+"px";

    //단순 indicator 클릭시 viewbox display none/block
    /*
        if (arr_str != null) {
          arr_str.style.display = "none";
        }
        arr_str = view_arr[index];
        view_arr[index].style.display = "block";
    */

  }

//prev button click event
 function clickPrev(){
   var marginL = viewbox_chlidren[0].clientWidth;
   var view_margin = Number(viewbox.style.marginLeft.split("px")[0]);
   var crnt_arr = document.getElementsByClassName('active')[0];

   if (view_margin == 0 ) {
     viewbox.style.marginLeft = -(marginL * (viewbox_chlidren.length-1))+"px";
     var move_arr = Number(crnt_arr.dataset.index) + (viewbox_chlidren.length-1);

     crnt_arr.classList.remove("active");
     indicator_chlidren[move_arr].classList.add("active");
   }else{
     viewbox.style.marginLeft = marginL+view_margin+"px";
     var move_arr = Number(crnt_arr.dataset.index)-1;

     crnt_arr.classList.remove("active");
     indicator_chlidren[move_arr].classList.add("active");
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
}
