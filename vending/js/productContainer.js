/**
 * @name ProductContainer
 * @class
 * @description 상품별로 묶을 수 있는 클래스
 * @author Jitae, Kim
 * @version 1.0.0
 * @since 2011. 12. 27.
 */
var ProductContainer = $Class({
	_oVendingMachine : null,
	_oProduct : null,
	_aProduct : null,
	_nProductCnt : 0,
	elProduct : null,
	
	/**
	 * @constructor
	 * @description 상품 그룹 생성자
	 * @param oProduct 넘겨받은 상품으로 구성된 상품그룹을 생성
	 * @param oVendingMachine 자판기 객체를 넘겨받아 추후 자판기와 연동작업
	 */
	$init : function(oProduct, oVendingMachine) {
		
		this._oVendingMachine = oVendingMachine;
		
		this._oProduct = oProduct;
		this._aProduct = new $A();
		
		this._wfOfPullProduct = $Fn(this.pullProduct, this);
		
		// 상품 출력부분 생성
		this.elProduct = jindo.$("<li class='"+ this._oProduct.getClassName() +"'></li>");
		$Element(this.elProduct).append(jindo.$("<button><span class='blind'>" + this._oProduct.getName() + "</span></button>"));
		$Element(this.elProduct).append(jindo.$("<span>" + this._oProduct.getPrice() + "원</span>"));
		
		this._wfOfPullProduct.attach(this.elProduct, "click");
	},
	
	/*
	 * 
	 * @private
	 * @description 랜덤으로 1~3개의 상품을 자동으로 생성하여 할당
	 */
	_randomProduct : function() {
		
		// 1에서 3까지의 랜덤 갯수 생성
		var nRandomCnt = parseInt(Math.random() * 3 + 1, 10);
		
		for(i=0;i<nRandomCnt;i++) {
			this.addProduct(this._oProduct);
		}
	},
	
	/**
	 * @public
	 * @description 상품 그룹에 상품 추가
	 * @param oProduct
	 */
	addProduct : function(oProduct) {
		this._nProductCnt = this._aProduct.push(oProduct);
	},
	
	/**
	 * @public
	 * @description 상품을 구매하는 메소드로서 자판기의 구매 메소드와 연동
	 * @return oProduct 구매한 상품이 있을 경우 해당 상품 객체 반환
	 */
	pullProduct : function(we) {
		//잔액이 있을 경우만 구매 가능
		if(this._oVendingMachine._nCurrentMoney < this._oProduct.getPrice()) {
			this._oVendingMachine.buyProduct("잔액이 부족합니다.");
			return 0;
		} else if(this._nProductCnt > 0) { // 상품이 있을 경우만 구매 가능			
			var oProduct = this._aProduct.pop();
	
			this._nProductCnt = this._aProduct.length();
			
			//품절 처리
			if(this._nProductCnt === 0) {
				$Element(this.elProduct).addClass("soldout");
				$Element(this.elProduct).append("<span class='soldout_msg'>품절</span>");
			}
			
			this._oVendingMachine.buyProduct(this._oProduct);
			
			return oProduct;
		} else {
			this._oVendingMachine.buyProduct("재고가 부족합니다.");
			return -1;
		}
	}
});