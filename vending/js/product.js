/**
 * @name Product
 * @class
 * @description 상품 하나의 객체 생성용 클래스
 * @author Jitae, Kim
 * @version 1.0.0
 * @since 2011. 12. 27.
 */
var Product = $Class({
	_nPrice : 0,
	_sName : "",
	_sClassName : "",
	
	/**
	 * 
	 * @constructor
	 * @description 상품 객체를 생성하기 위한 생성자
	 * @param oJson JSON 형태로 넘어옴
	 * 		ex) {"sClass":"item1", "sName":"펩시"}
	 * @param nPrice 상품의 가격을 할당	 * 		
	 */
	$init : function(oJson, nPrice) {
		this._sClassName = oJson.sClass;
		this._sName = oJson.sName;
		this._nPrice = nPrice;
	},
	
	/**
	 * 
	 * @public
	 * @description 상품 가격을 반환하는 메소드
	 * @returns {Number}
	 */
	getPrice : function() {
		return this._nPrice;
	},
	
	/**
	 * 
	 * @public 
	 * @description 상품의 클래스명을 반환하는 메소드
	 * @returns {String}
	 */
	getClassName : function() {
		return this._sClassName;
	},
	
	/**
	 * 
	 * @public
	 * @description 상품명을 반환하는 메소드
	 * @returns {String}
	 */
	getName : function() {
		return this._sName;
	}
});