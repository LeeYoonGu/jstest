/**
 * @name DragObject
 * @class
 * @description 지정한 객체를 Drag 가 가능하도록 설정
 * @author jitae.kim
 * @version 1.0.0
 * @since 2011. 12. 21.
 */
var DragObject = $Class({
	_elOriObject : null,
	_elParentObject : null,
	_elDragObject : null,
	_oMouseOffset : null,
	_welDragObject : null,
	_bIsDragStart : false,
	_defaultPosition : null,
	
	/**
	 * 
	 * @description 초기화 메소드
	 * @param el 드래그 하고자 하는 객체의 class, ID 등 입력 가능
	 * @param htOption 옵션값 
	 * 		bClone : 해당 객체를 드래그 할때 복사해서 할건지 혹은 원본을 드래그 할지 결정 (default : false);
	 * @example
	 * 		var dragObj = new DragObject("#_draggable");
	 *		var dragObj2 = new DragObject("#_draggable2");
	 */
	$init : function(el, htOption){
		
		this.option({
			bClone : false
		});
		
		this.option(htOption || {});

		// 아이디값이 넘어오면 해당 아이디 객체설정, 클래스일 경우에는 클래스 객체 설정
		if($$.getSingle("#"+el)) {
			this._elDragObject = $$("#"+el);
		} else {
			this._elDragObject = $$("."+el);
		}
		
		//기본값
		if(this._elDragObject[0]) {
			this._elParentObject = this._elDragObject[0].parentNode;
		}
		if(this._elDragObject[0]) {
			this._welDragObject = $Element(this._elDragObject[0]);
		}
		
		//오리지날 객체 저장
		this._elOriObject = this._elDragObject[0];

		//메소드 랩핑
		this._wfOnMouseMove = $Fn(this._onMouseMove, this);
		this._wfOnMouseUp = $Fn(this._onMouseUp, this);		
		this._wfOnMouseDown = $Fn(this._onMouseDown, this);

		this.activate();
	},

	/**
	 * 
	 * @private
	 * @description mousedown 시 발생되는 메소드
	 * @param we 이벤트 랩핑 객체
	 * @returns {Boolean} 
	 */
	_onMouseDown : function(we) {

		// 버블링 차단
		we.stop($Event.CANCEL_BUBBLE);
		
		// 비활성화 되어있을 경우 중단
		if(!this.isActivating()) {
			return;
		}
		
		// 마우스 왼쪽버튼아니고 오른쪽버튼이 아닐 경우 드래그 중지
		if (!we.mouse().left || we.mouse().right) {
			return;
		}
		
		// 드래그 시작, 문자열 선택 금지
		this._bIsDragStart = true;
		this._disableSelection();
		
		// 복사 옵션이 설정되어 있을 경우 객체 복사하여 드래그 시작
		if(this.option("bClone")) {			
			this._elDragObject = this._elOriObject.cloneNode(true);
			
			this._elDragObject.bIsClone = true;				/* 복사된 객체 표시 */
			
			this._welDragObject = $Element(this._elDragObject);
			
			//복사한 객체에 대해서 이벤트 재할당 IE는 없어도 작동하나 다른 브라우져 작동 안함
		    this._wfOnMouseUp.attach(this._welDragObject, "mouseup");
			
			this._welDragObject.appendTo(this._elParentObject);
		}
		
		this._onDragStart(we);
		
		// releaseCapture 지원할 경우 캡쳐
		if(this._elDragObject.setCapture) {
			this._elDragObject.setCapture();
		}
		
		var oMousePos = we.pos();
				
		this._oMouseOffset = this._getMouseOffset(we);
		
		// mousedown시 기본 위치 저장
		var nObjectX = $Element(this._elOriObject).offset().left;
		var nObjectY = $Element(this._elOriObject).offset().top;
		
		this._setObjectPosition(nObjectX, nObjectY);
		
		this._defaultPosition = new Point(nObjectX, nObjectY);
		
		//dragStart 이벤트 발생 
		this.fireEvent('dragStart', {
			"elDragObject" : this,
			"oMousePos" : oMousePos,
			"welDragObject" : this._welDragObject
		}); 
		
		return false;
	},
	
	/**
	 * 
	 * @private
	 * @description 마우스가 움직일때 실행되는 메소드
	 * @param we 이벤트 랩핑 객체
	 */
	_onMouseMove : function(we) {

		// 버블링 차단
		we.stop($Event.CANCEL_BUBBLE);
		
		// 비활성화 되어있을 경우 중단
		if(!this.isActivating()) {
			return;
		}
		
		// 드래그 시작하지 않았거나 드래그 할 객체가 없으면 중지 
		if(!this._welDragObject || !this._bIsDragStart) {
			return;
		}
		
		//마우스 위치 정보 추출
		var oMousePos = we.pos();

		//드래그 할 객체가 있고 드래그 시작했으면 위치 이동
		if(this._welDragObject && this._bIsDragStart) {

			var nObjectX = oMousePos.pageX - this._oMouseOffset.x;
			var nObjectY = oMousePos.pageY - this._oMouseOffset.y;			
			
			this._setObjectPosition(nObjectX, nObjectY);

			//dragging 이벤트 발생 
			this.fireEvent('dragging', {
				"elDragObject" : this,
				"oMousePos" : oMousePos,
				"welDragObject" : this._welDragObject
			});
		}
	},
	
	/**
	 * 
	 * @private
	 * @description 현재 인스턴스의 위치 이동 메소드
	 * @param x
	 * @param y
	 */
	_setObjectPosition : function(x, y) {

		//화면 밖으로 못넘어가게 처리
		if(x <= 0 ) {
			x = 0; 
		}
		
		if(y <= 0) {
			y = 0;
		}		
		
		this._welDragObject.offset(y, x);
	},
	
	/**
	 * 
	 * @private
	 * @description mouseup 시 발생되는 메소드
	 */
	_onMouseUp : function(we) {
		
		// 버블링 차단
		we.stop($Event.CANCEL_BUBBLE);
		
		// 비활성화 되어있을 경우 중단
		if(!this.isActivating() || !this._bIsDragStart) {
			return;
		}
		
		// releaseCapture 지원할 경우 캡쳐 해제
		if(this._elDragObject.releaseCapture) {
			this._elDragObject.releaseCapture();
		}
		
		var oMousePos = we.pos();
		
		// 드래그 중지, 문자열 선택 가능
		this._bIsDragStart = false;
		this._enableSelection();
				
		// dragEnd 이벤트 발생 
		this.fireEvent('dragEnd', {
			"elDragObject" : this,
			"oMousePos" : oMousePos,
			"welDragObject" : this._welDragObject
		});
	},
	
	/**
	 * 
	 * @private
	 * @description 현재 인스턴스에서 마우스의 위치값을 받아오는 메소드
	 * @param we
	 * @returns {Point}
	 */
	_getMouseOffset : function(we) {
		var oMousePos = we.pos();
		
		var nX = oMousePos.pageX - $Element(this._elOriObject).offset().left;
		var nY = oMousePos.pageY - $Element(this._elOriObject).offset().top;
		
		return new Point(nX, nY);
	},

	/**
	 * 
	 * @private
	 * @description 활성화 메소드
	 */
	_onActivate : function() {
	    this._wfOnMouseDown.attach(this._welDragObject, "mousedown");
	    this._wfOnMouseMove.attach(document, "mousemove");
	    this._wfOnMouseUp.attach(this._welDragObject, "mouseup");
	},
	 
	/**
	 * 
	 * @private
	 * @description 비활성화 메소드
	 */
	_onDeactivate : function() {
	    this._wfOnMouseDown.detach(this._welDragObject, "mousedown");
	    this._wfOnMouseMove.detach(document, "mousemove");
	    this._wfOnMouseUp.detach(this._welDragObject, "mouseup");
	},
	
	/**
	 * 
	 * @private
	 * @description 드래그 종료되면 다른 객체(텍스트, 이미지)의 드래그가 가능하도록 처리
	 */
	_enableSelection : function() {
		var oNavigator = $Agent().navigator();

	    if (oNavigator.ie) {
	    	document.onselectstart = function(){ return true; };
	    } else if(oNavigator.mozilla) {
	    	document.style.MozUserSelect = 'text';
	    }
	},
	
	/**
	 * 
	 * @private
	 * @description 드래그 시작할 경우 다른 객체(텍스트, 이미지)의 드래그가 안되도록 처리
	 */
	_disableSelection : function () {
		var oNavigator = $Agent().navigator();

	    if (oNavigator.ie) {
	    	document.onselectstart = function(){ return false;};
	    } else if(oNavigator.mozilla) {
	    	document.style.MozUserSelect = 'none';
	    } 
	}

}).extend(jindo.UIComponent);
