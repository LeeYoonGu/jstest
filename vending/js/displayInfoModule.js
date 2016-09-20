/**
 * @name DisplayInfoModule
 * @class
 * @description 자판기에 들어가는 콘솔 출력창
 * @author Ji tae, Kim
 * @version 1.0.0
 * @since 2011. 12. 26.
 */
var DisplayInfoModule = $Class({
	_elDisplayInfo : null,
	_welDisplayInfo : null,
	
	/**
	 * 
	 * @constructor
	 * @param sTargetName 클래스 또는 아이디 명
	 * @param htOption 
	 * 		_bIsMultiLine : 멀티 라인을 허용할 것인지 여부(default : true)
	 */
	$init : function(sTargetName, htOption) {		
		this.option({
			_bIsMultiLine : true
		});
		
		this.option(htOption || {});

		// 아이디값이 넘어오면 해당 아이디 객체설정, 클래스일 경우에는 클래스 객체 설정
		if($$.getSingle("#"+sTargetName)) {
			this._elDisplayInfo = $$("#"+sTargetName);
		} else {
			this._elDisplayInfo = $$("."+sTargetName);
		}
		
		if(this._elDisplayInfo[0]) {
			this._welDisplayInfo = $Element(this._elDisplayInfo[0]);
		}
	},
	
	/**
	 * @public
	 * @description 해당 하는 객체에 문구 출력
	 * @param sMsg 출력하고자 하는 문구
	 */
	printMessage : function(sMsg) {
		if(this.option("_bIsMultiLine")) {
			this._welDisplayInfo.appendHTML(sMsg + "<br />");
		} else {
			this._welDisplayInfo.html(sMsg);
		}
		
		//스크롤 최하단으로 이동
		this._welDisplayInfo.$value().scrollTop = this._welDisplayInfo.$value().scrollHeight;
	}
}).extend(jindo.UIComponent);