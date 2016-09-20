/**
 * @name Money
 * @class
 * @description 드래그 가능한 돈을 생성하는 클래스
 * @author Ji tae, Kim
 * @version 1.0.0
 * @since 2011. 12. 26.
 */
var Money = $Class({
	_nValue : null,
	_aMoneyKind : [1, 10, 50, 100, 500, 1000, 5000, 10000, 50000],
	
	/**
	 * @description 돈 생성 초기화 메소드
	 * @param sTargetName 돈으로 사용할 클래스 or 아이디 문자를 전달
	 * @param htOption dragObject 와 같이 옵션값 전달 없을 경우 {} 전달
	 * @param value 돈의 가치를 셋팅
	 * @example
	 * 		var money = new Money("_coin100", {"bClone":true}, 100);
	 */
	$init : function(sTargetName, htOption, value) {
		//입력된 값이 돈의 가치와 맞는게 없을 경우 돈으로 사용 못하므로 삭제
		if(this._moneyCheck(value)) {
			this.setValue(value);
		} else {
			this._welDragObject.hide();
		}

		// 이벤트 맵핑
		this._wfOnMouseDown = $Fn(this._onMouseDown, this);
				
		this.activate();
	},
	
	_onDragStart : function(we) {
		this._welDragObject.addClass("w_draggable");
	},
		
	/**
	 * 
	 * @public
	 * @description 돈 셋팅
	 * @param nValue
	 */
	setValue : function(nValue) {
		this._nValue = nValue;
	},
	
	/**
	 * 
	 * @public
	 * @description 돈의 가치 리턴
	 * @returns
	 */
	getValue : function() {
		return this._nValue;
	},
	
	/**
	 * 
	 * @private
	 * @description 입력받은 돈이 사용가능한지 여부 판단
	 * @param nValue 금액 입력
	 * @returns 해당 금액이 배열에 존재할 경우 true 리턴
	 */
	_moneyCheck : function(nValue) {
		var waMoneyKind = $A(this._aMoneyKind);
		var bIsMoney = waMoneyKind.has(nValue);
		
		return bIsMoney;
	}
	
}).extend(DragObject);