$(document).ready(function(){

	$(window).resize(function() {
		var innerWidth; // 화면 width 값

		innerWidth = $(window).innerWidth();
		// 모바일 메뉴 노출 상태에서 화면이 커졌을 경우 헤더 메뉴 정상 노출을 위해 적용
		if(innerWidth > 768) {
			$("body").css("overflow",'');
			$("header").removeClass("open").css("height","");
			$(".nav_lst").removeClass("open").css("height","");
			$(".plugin_area").css("display","");
		}
	});

	$(".btn_toggle").click(function() {

		var menuHeight; // 메뉴 height 값
		var navFlag;    // 열림, 닫힘 체크 값		

		menuHeight = $(".nav_lst").css("height");
		navFlag = $(".nav_lst").hasClass("open");

		if(navFlag) {
			$(".nav_lst").animate({
						height: "0px"
					}
					, 250, function() {
						$(".nav_lst").removeClass("open").css("height","");
						$("header").removeClass("open");
						$(".plugin_area").css("display","block");
					});
			$("body").css("overflow",'');
			$("header").animate({
				height: "56px"
			}, 250);
		} else {
			$(".nav_lst").css("height","0px").addClass("open");
			$("header").addClass("open");
			$("body").css("overflow",'hidden').css("height",'100%');
			$(".plugin_area").css("display","none");
			$(".nav_lst").animate({
				height: menuHeight
			}, 250);
			$("header").animate({
				height: "100%"
			}, 250);
		}
	});

	$(document).on('click', function(event) { // 메뉴 스크롤 시 하위 메뉴 닫히는 부분으로 touchstart 임시 제거 했습니다.
		var $target = $(event.target);

		$mDepth = $target.parent('.depth');
		if ($mDepth.length !== 0) {
			event.preventDefault();
			var $ul = $($target).next('.depth_lst');
			if ($ul.is(':visible')) {
				// 하위 depth 에 열려있는건 닫음
				$ul.find('.depth_lst').slideUp('fast');
				$ul.find('.depth').removeClass('open');

				$ul.slideUp('fast');
				$mDepth.removeClass('open');

			} else {
				var $parent =$mDepth.parent();
				// 동일 depth 에 열려있는건 닫음
				$parent.find('.depth.open>.depth_lst').slideUp('fast');
				$parent.find('.depth.open').removeClass('open');

				$ul.slideDown('fast');
				$mDepth.addClass('open');
			}
		} else {
			$('.depth').removeClass('open')
			$('.depth_lst').slideUp('fast');
		}
	});


	$(function(){
		var state = true;
		var currentScrollTop, temporalScroll = 0;
		// 텍스트 애니메이션 flag
		// fixed 메뉴 적용 시 클래스 생성 및 제거를 한번만 적용하기 위한 flag
		var checkflag = true;
		var i = 0;
		$(window).scroll(function(event){
			currentScrollTop = $(this).scrollTop();

			// 상단 메뉴 컨트롤 기능
			if(currentScrollTop >0) {
				// fixed 메뉴 적용
				if(checkflag) {

					checkflag = false;
				}

				/* 애니메이션 동작 중 체크 : true, false */
				var isAnimation = $(".desktop header").is(":animated");

				if (currentScrollTop > temporalScroll) {
					if( !isAnimation ){
						$( ".desktop header" ).animate({
							top: -68,
						}, 200 );
					}
				} else {
					if( !isAnimation ){
						$( ".desktop header" ).addClass("navbar-fixed-top");
						$( ".navbar-fixed-top" ).animate({
							top: 0,
						}, 200 );
					}
				}
			} else {
				// 기본 메뉴 적용
				if(!checkflag) {
					$( ".desktop header" ).removeClass("navbar-fixed-top");
					$( ".desktop header" ).css("top","-68px");
					checkflag = true;
				}
			}
			temporalScroll = currentScrollTop;
		});
	});

})
