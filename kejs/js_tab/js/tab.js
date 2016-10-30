  function onClicktab(obj){
    var tab = document.getElementById('menu').children,
        contents = document.getElementById('contents').children;
    var p = obj.parentNode;
    console.log(p);
    for (var i = 0; i < tab.length; i++) {
      if (tab[i] == p) {
        contents[i].style.display = "block";
         console.log("selected tab index : "+ i);
         console.log("selected tab contents : "+ contents[i].textContent);
      }else{
        contents[i].style.display = "none";
      }
    }

  }
