/**
 * @name DropObject
 * @class
 * @description DragObject 를 받아들일 수 있도록 드롭 객체로 생성
 * @author jitae.kim
 * @version 1.0.0
 * @since 2011. 12. 21.
 */
var DropObject = $Class({
	_elDropObject : null,
	_welDropObject : null,
	
	/**
	 * 
	 * @description 초기화 메소드
	 * @param el DropObject 로 만들고 싶은 객체의 class, ID 등 입력
	 * @param htOption 
	 * 		oDragInstance : 드래그 객체
	 */
	$init : function(el, htOption){
		// 아이디값이 넘어오면 해당 아이디 객체설정, 클래스일 경우에는 클래스 객체 설정
		if($$.getSingle("#"+el)) {
			this._elDropObject = $$("#"+el);
		} else {
			this._elDropObject = $$("."+el);
		}

		// Drop 객체 랩핑
		this._welDropObject = $Element(this._elDropObject[0]);
		
		this.option({
			oDragInstance : null
		});
		
		this.option(htOption || {});

		// Drag 객체 확인
		var oDrag = this.option("oDragInstance");

		// Drag 객체들 각각의 이벤트 발생시 Drop 객체의 이벤트와 대응하도록 메소드 바인딩
		var self = this;
		$A(oDrag).forEach(function(value, index, array){
			value.attach({
				dragStart : function(oCustomEvent) {
					self._onDragStart(oCustomEvent);
				},
				dragging : function(oCustomEvent) {
					self._onDragging(oCustomEvent);
				},
				dragEnd : function(oCustomEvent) {
					self._onDragEnd(oCustomEvent);
				}
			});
		}, this);
		
		this.activate();
	},
	
	/**
	 * @description 드래그 객체의 드래그 시작시 같이 대응 하여 이벤트 발생
	 * @private
	 * @param oCustomEvent
	 */
	_onDragStart : function(oCustomEvent) {
		
		var bIsOver = this._overCheck(oCustomEvent);
		
		//dragStart 이벤트 발생 
		this.fireEvent('dragStart', {
			"self" : this,
			"elDragObject" : oCustomEvent.elDragObject,
			"welDragObject" : oCustomEvent.welDragObject,
			"bIsOver" : bIsOver
		});
	},
	
	/**
	 * @description 드래그 객체의 드래깅 중에 같이 대응 하여 이벤트 발생
	 * @private
	 * @param oCustomEvent
	 */
	_onDragging : function(oCustomEvent) {
		var welDragObject = oCustomEvent.welDragObject;

		var bIsOver = this._overCheck(oCustomEvent);
		
		//dragging 이벤트 발생 
		this.fireEvent('dragging', {
			"self" : this,
			"elDragObject" : oCustomEvent.elDragObject,
			"welDragObject" : oCustomEvent.welDragObject,
			"bIsOver" : bIsOver
		});
	},
	
	/**
	 * @description 드래그 객체의 드래그가 종료될때 같이 대응 하여 이벤트 발생
	 * @private
	 * @param oCustomEvent
	 */
	_onDragEnd : function(oCustomEvent) {

		var bIsOver = this._overCheck(oCustomEvent);
		
		//dragEnd 이벤트 발생 
		this.fireEvent('dragEnd', {
			"self" : this,
			"elDragObject" : oCustomEvent.elDragObject,
			"welDragObject" : oCustomEvent.welDragObject,
			"bIsOver" : bIsOver
		});
	},
	
	/**
	 * @description 드래그 객체와 드롭 객체의 겹쳐있는지 체크 - 마우스 위치를 가지고 체크
	 * @private
	 * @param oCustomEvent
	 * @returns {Boolean}
	 */
	_overCheck : function(oCustomEvent) {
		
		var bIsOver = false;
		
		var nMouseX = oCustomEvent.oMousePos.pageX;
		var nMouseY = oCustomEvent.oMousePos.pageY;
		
		var nDropObjectX = this._welDropObject.offset().left;
		var nDropObjectY = this._welDropObject.offset().top;
		
		var nDropObjectWidth = parseInt(this._welDropObject.css("width"), 10);
		var nDropObjectHeight = parseInt(this._welDropObject.css("height"), 10);
		
		// 마우스 좌표가 Drop 객체 안에 존재하는지 체크
		if(nMouseX >= nDropObjectX && nMouseX <= (nDropObjectX + nDropObjectWidth) && nMouseY >= nDropObjectY && nMouseY <= (nDropObjectY + nDropObjectHeight)) {
			bIsOver = true;
		} else {
			bIsOver = false;
		}
		
		return bIsOver;
	},
	
	/**
	 * 
	 * @private
	 * @description 활성화 메소드
	 */
	_onActivate : function() {
		
	},
	 
	/**
	 * 
	 * @private
	 * @description 비활성화 메소드
	 */
	_onDeactivate : function() {

	}
}).extend(jindo.UIComponent);