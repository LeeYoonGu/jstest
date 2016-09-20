module('자판기는 ', {
	setup : function () {
		this.myPocket = new MyPocket("10000");
		this.vendingMachine = new VendingMachine();
		this.vendingMachine.pocketChange(this.myPocket);
		ok(this.vendingMachine, "자판기 객체 생성");
	},
	
	teardown : function () {
		this.myPocket = null;
		this.vendingMachine = null;
		ok(!this.vendingMachine, "자판기 객체 제거");
	}
});

//Test code start //
test("페이지가 로드 될때 8개의 상품이 진열됩니다.", function () {
	// given
	var nProductCnt = this.vendingMachine._waProductContainer.length();
	
	// when

	// then
	equal(nProductCnt, "8", "자판기에 상품이 8개 진열되어 있습니다.");
});

test("상품은 중복하여 진열 할 수 없습니다.", function () {
	// given
	var waNameArray = $A();
	var waPriceArray = $A();
	var waProductContainer = this.vendingMachine._waProductContainer;
	
	waProductContainer.forEach(function(value, index, array){
		var oProduct = value._oProduct;
		waNameArray.push(oProduct.getName());
		waPriceArray.push(oProduct.getPrice());
	});
	
	// when
	waNameArray = waNameArray.unique();
	waPriceArray = waPriceArray.unique();
	
	// then
	equal(waNameArray.length(), "8", "상품이름으로 중복 제거 후에도 8개가 있어야 중복 진열이 아닌것으로 테스트");
	equal(waPriceArray.length(), "8", "각 상품가격의 배열에서 중복을 제거한 뒤의 갯수는 8개가 있어야 모두 다름");
});

test("상품의 사진 또는 가격을 클릭하면 구매하는 것으로 합니다.", function () {
	// given
	this.vendingMachine._nCurrentMoney = 10000;
	var waProductContainer = this.vendingMachine._waProductContainer;
	var oProduct = null;
	
	var oMockEventOk = {
		mouse : function() {
			return {
				left : true,
				right : false
			};
		}
	};
	
	// when
	waProductContainer.forEach(function(value, index, array){
		oProduct = value.pullProduct(oMockEventOk);
	});
	
	// Then
	ok(oProduct instanceof Product, "상품이 리턴되었을 경우 정상적으로 구매 완료");
	
	// given
	this.vendingMachine._nCurrentMoney = 0;
	var waProductContainer = this.vendingMachine._waProductContainer;
	
	var oMockEventOk = {
		mouse : function() {
			return {
				left : true,
				right : false
			};
		}
	};
	
	// when
	waProductContainer.forEach(function(value, index, array){
		oProduct = value.pullProduct(oMockEventOk);
	});
	
	// Then
	equal(oProduct, 0, "돈이 없을 경우 0 리턴");
	
	// given
	this.vendingMachine._nCurrentMoney = 10000;
	var waProductContainer = this.vendingMachine._waProductContainer;
	
	var oMockEventOk = {
		mouse : function() {
			return {
				left : true,
				right : false
			};
		}
	};
	
	// when
	waProductContainer.forEach(function(value, index, array){
		value._nProductCnt = 0;
		oProduct = value.pullProduct(oMockEventOk);
	});
	
	// Then
	equal(oProduct, -1, "재고가 없을 경우 -1 리턴");
});


test("동전/지폐투입구가 있습니다.", function () {
	// given
	var oInsertCoinModule = this.vendingMachine._oInsertCoinModule;
	var oInsertBillModule = this.vendingMachine._oInsertBillModule;
	
	// when
	
	// then
	ok(oInsertCoinModule, "동전 투입구가 있습니다.");
	ok(oInsertBillModule, "지폐 투입구가 있습니다.");
});

test("동전과 지폐를 넣을 수 있습니다.", function () {
	// given
	var oInsertCoinModule = this.vendingMachine._oInsertCoinModule;
	var oInsertBillModule = this.vendingMachine._oInsertBillModule;
	
	// when
	
	// then
	ok(oInsertCoinModule.option("oDragInstance"), "동전 투입구에 넣을 화폐가 있습니다.");
	ok(oInsertBillModule.option("oDragInstance"), "지폐 투입구에 넣을 화폐가 있습니다.");
});

module('자판기 사용자는 ', {
	setup : function () {
		this.welVendingMachine = $Element(jindo.$("wrap"));
		this.myPocket = new MyPocket("10000");
		this.vendingMachine = new VendingMachine();
		this.vendingMachine.pocketChange(this.myPocket);
		ok(this.vendingMachine, "자판기 객체 생성");
	},
	
	teardown : function () {
		this.welVendingMachine.leave();
		this.myPocket = null;
		this.vendingMachine = null;
		ok(!this.vendingMachine, "자판기 객체 제거");
	}
});

test("다음과 같이 행동합니다.", function () {
	// given
	this.vendingMachine._nCurrentMoney = 0;
	this.vendingMachine._oMoneyDisplay.printMessage("0원");
	var oPocket = this.vendingMachine._oPocket;
	
	var oCoinPos = this.vendingMachine._oInsertCoinModule._welDropObject.offset();
	var oBillPos = this.vendingMachine._oInsertBillModule._welDropObject.offset();
		
	// when
	
	// then
	equal(oPocket._nCurrentMoney, "10000", "초기에 10000원을 가지고 있습니다.");
	
	// given
	var c50 = oPocket.aMoneyList[0];
	var c100 = oPocket.aMoneyList[1];
	var c500 = oPocket.aMoneyList[2];
	var c1000 = oPocket.aMoneyList[3];
	
	var self = this;
	var oMockEventOk = {
		element : null,
		mouse : function() {
			return {
				left : true,
				right : false
			};
		},
		pos : function () {
			return {
				pageX : 70,
				pageY : 80
			};
		},
		stop : function() {
			
		}
	};
	
	var oCoinEventPos = {
		element : null,
		mouse : function() {
			return {
				left : true,
				right : false
			};
		},
		pos : function () {
			return {
				pageX : oCoinPos.left,
				pageY : oCoinPos.top
			};
		},
		stop : function() {
			
		}
	};
	
	var oBillEventPos = {
		element : null,
		mouse : function() {
			return {
				left : true,
				right : false
			};
		},
		pos : function () {
			return {
				pageX : oBillPos.left,
				pageY : oBillPos.top
			};
		},
		stop : function() {
			
		}
	};
	
	var oFailEventPos = {
			element : null,
			mouse : function() {
				return {
					left : true,
					right : false
				};
			},
			pos : function () {
				return {
					pageX : 0,
					pageY : 0
				};
			},
			stop : function() {
				
			}
		};
	
	// when
	c50._onMouseDown(oMockEventOk);
	
	// then
	ok(c50._bIsDragStart, "50원짜리를 드래그 시작합니다.");
	
	// when
	c50._onMouseMove(oCoinEventPos);
	c50._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 50, "50원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 9950, "남은 금액은 9950원 입니다.");
	
	// when
	c50._onMouseDown(oMockEventOk);
	
	// then
	ok(c50._bIsDragStart, "50원짜리를 드래그 시작합니다.");
	
	// when
	c50._onMouseMove(oFailEventPos);
	c50._onMouseUp(oFailEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 50, "50원을 떨어뜨렸습니다.");
	equal(oPocket._nCurrentMoney, 9900, "남은 금액은 9900원 입니다.");
	
	// when
	c50._onMouseDown(oMockEventOk);
	
	// then
	ok(c50._bIsDragStart, "50원짜리를 드래그 시작합니다.");
	
	// when
	c50._onMouseMove(oBillEventPos);
	c50._onMouseUp(oBillEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 50, "50원은 지폐투입구에 넣을 수 없습니다.");
	equal(oPocket._nCurrentMoney, 9850, "남은 금액은 9850원 입니다.");
	
	// when
	c100._onMouseDown(oMockEventOk);
	
	// then
	ok(c100._bIsDragStart, "100원짜리를 드래그 시작합니다.");
	
	// when
	c100._onMouseMove(oCoinEventPos);
	c100._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 150, "100원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 9750, "남은 금액은 9750원 입니다.");
	
	// when
	c100._onMouseDown(oMockEventOk);
	
	// then
	ok(c100._bIsDragStart, "100원짜리를 드래그 시작합니다.");
	
	// when
	c100._onMouseMove(oFailEventPos);
	c100._onMouseUp(oFailEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 150, "100원을 떨어뜨렸습니다.");
	equal(oPocket._nCurrentMoney, 9650, "남은 금액은 9650원 입니다.");
	
	// when
	c100._onMouseDown(oMockEventOk);
	
	// then
	ok(c100._bIsDragStart, "100원짜리를 드래그 시작합니다.");
	
	// when
	c100._onMouseMove(oBillEventPos);
	c100._onMouseUp(oBillEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 150, "100원은 지폐투입구에 넣을 수 없습니다.");
	equal(oPocket._nCurrentMoney, 9550, "남은 금액은 9550원 입니다.");
	


	// when
	c500._onMouseDown(oMockEventOk);
	
	// then
	ok(c500._bIsDragStart, "500원짜리를 드래그 시작합니다.");
	
	// when
	c500._onMouseMove(oCoinEventPos);
	c500._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 650, "500원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 9050, "남은 금액은 9050원 입니다.");
	
	// when
	c500._onMouseDown(oMockEventOk);
	
	// then
	ok(c500._bIsDragStart, "500원짜리를 드래그 시작합니다.");
	
	// when
	c500._onMouseMove(oFailEventPos);
	c500._onMouseUp(oFailEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 650, "500원을 떨어뜨렸습니다.");
	equal(oPocket._nCurrentMoney, 8550, "남은 금액은 8550원 입니다.");
	
	// when
	c500._onMouseDown(oMockEventOk);
	
	// then
	ok(c500._bIsDragStart, "500원짜리를 드래그 시작합니다.");
	
	// when
	c500._onMouseMove(oBillEventPos);
	c500._onMouseUp(oBillEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 650, "500원은 지폐투입구에 넣을 수 없습니다.");
	equal(oPocket._nCurrentMoney, 8050, "남은 금액은 8050원 입니다.");
	
	
	// when
	c1000._onMouseDown(oMockEventOk);
	
	// then
	ok(c1000._bIsDragStart, "1000원짜리를 드래그 시작합니다.");
	
	// when
	c1000._onMouseMove(oCoinEventPos);
	c1000._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 650, "1000은 동전투입구에 넣을 수 없습니다.");
	equal(oPocket._nCurrentMoney, 7050, "남은 금액은 7050원 입니다.");
	
	// when
	c1000._onMouseDown(oMockEventOk);
	
	// then
	ok(c1000._bIsDragStart, "1000원짜리를 드래그 시작합니다.");
	
	// when
	c1000._onMouseMove(oFailEventPos);
	c1000._onMouseUp(oFailEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 650, "1000원을 떨어뜨렸습니다.");
	equal(oPocket._nCurrentMoney, 6050, "남은 금액은 6050원 입니다.");
	
	// when
	c1000._onMouseDown(oMockEventOk);
	
	// then
	ok(c1000._bIsDragStart, "1000원짜리를 드래그 시작합니다.");
	
	// when
	c1000._onMouseMove(oBillEventPos);
	c1000._onMouseUp(oBillEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 1650, "1000원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 5050, "남은 금액은 5050원 입니다.");
	
	// when
	c1000._onMouseDown(oMockEventOk);
	
	// then
	ok(c1000._bIsDragStart, "1000원짜리를 드래그 시작합니다.");
	
	// when
	c1000._onMouseMove(oBillEventPos);
	c1000._onMouseUp(oBillEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 2650, "1000원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 4050, "남은 금액은 4050원 입니다.");
	
	// when
	c1000._onMouseDown(oMockEventOk);
	
	// then
	ok(c1000._bIsDragStart, "1000원짜리를 드래그 시작합니다.");
	
	// when
	c1000._onMouseMove(oBillEventPos);
	c1000._onMouseUp(oBillEventPos);
	
	// then	
	equal(this.vendingMachine._nBillCnt, 2, "자판기에 지폐가 두장 들어가 있습니다.");
	equal(this.vendingMachine._nCurrentMoney, 2650, "1000원짜리는 두장 이상 넣을 수 없습니다.");
	equal(oPocket._nCurrentMoney, 4050, "남은 금액은 4050원 입니다.");
	
	// when
	c500._onMouseDown(oMockEventOk);
	
	// then
	ok(c500._bIsDragStart, "500원짜리를 드래그 시작합니다.");
	
	// when
	c500._onMouseMove(oCoinEventPos);
	c500._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 2650, "최대 넣을 수 있는 금액은 3000원입니다.");
	equal(oPocket._nCurrentMoney, 4050, "남은 금액은 4050 입니다.");
	
	// when
	c100._onMouseDown(oMockEventOk);
	
	// then
	ok(c100._bIsDragStart, "100원짜리를 드래그 시작합니다.");
	
	// when
	c100._onMouseMove(oCoinEventPos);
	c100._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 2750, "100원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 3950, "남은 금액은 3950원 입니다.");
	
	// when
	c100._onMouseDown(oMockEventOk);
	
	// then
	ok(c100._bIsDragStart, "100원짜리를 드래그 시작합니다.");
	
	// when
	c100._onMouseMove(oCoinEventPos);
	c100._onMouseUp(oCoinEventPos);
	
	// then	
	equal(this.vendingMachine._nCurrentMoney, 2850, "100원을 넣었습니다.");
	equal(oPocket._nCurrentMoney, 3850, "남은 금액은 3850원 입니다.");
	
	// when
	this.vendingMachine.rejectMoney();
	
	// then
	equal(this.vendingMachine._nCurrentMoney, 0, "현재 있는 돈을 반환하였습니다.");
	equal(oPocket._nCurrentMoney, 6700, "남은 금액은 6700원 입니다.");
});

