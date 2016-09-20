/**
 * @name VendingMachine
 * @class
 * @description 자판기 클래스
 * @author Ji tae, Kim
 * @version 1.0.0
 * @since 2011. 12. 26.
 */

var VendingMachine = $Class({
	
	// 자판기에 투입된 금액
	_nCurrentMoney : 0,
	
	// 상품 관련 변수
	_nProductContainerCount : 8,
	_waProductContainer : null,
	_elProductArea : null,
	_welProductArea : null,

	// 자판기 스펙 관련 변수
	_oInsertCoinModule : null,
	_oInsertBillModule : null,
	_welRejectButton : null,
	_welReturnMoney : null,
	_oMoneyDisplay : null,
	_oDisplayInfoModule : null,
	_bIsOn : false,
	_oPocket : null,
	_nBillCnt : 0,
	
	/**
	 * 
	 * @constructor
	 * @description 자판기 생성자
	 */
	$init : function() {
		
		// 기본 셋팅
		this._waProductContainer = new $A();
								
		// 금액 출력 객체 생성
		this._oMoneyDisplay = new DisplayInfoModule("_money_stat", {"_bIsMultiLine":false});
		
		// 로그 출력 객체 생성
		this._oDisplayInfoModule = new DisplayInfoModule("_console_area");

		// 자판기 상품 설정
		this._elProductArea = $$(".product_area > ul");
		this._welProductArea = $Element($$(".product_area > ul")[0]);
		this._welProductArea.empty();
		
		this.generatorProduct();

		// 반환구 셋팅
		this._welReturnMoney = $Element($$("._return_money")[0]);
		
		// 반환버튼 셋팅
		this._welRejectButton = $Element(jindo.$("_btn_reject"));
		this._wfOfRejectMoney = $Fn(this.rejectMoney, this);
	},
	
	/**
	 * 
	 * @private
	 * @description 사용자 주머니에 있는 동전을 넣을 수 있음
	 * @param oMyPocket 사용자 주머니 객체 전달
	 */
	_insertMoneyModuleSetting : function(oMyPocket) {
		
		var MoneyKind = oMyPocket.getMoneyList();

		var self = this;
		
		// 동전 투입구 모듈 객체 생성
		this._oInsertCoinModule = new InsertMoneyModule("_insert_coin", {"oDragInstance":MoneyKind}).attach({
			dragStart : function(oCustomEvent) {
				// 주머니에서 돈꺼내기
				var bIsMoneyChk = self._oPocket.chkMoney(oCustomEvent.elDragObject);
				if(!bIsMoneyChk) {
					oCustomEvent.welDragObject.leave();
				}
			},
			dragging : function(oCustomEvent) {
				var bIsOver = oCustomEvent.bIsOver;
				var welDragObject = oCustomEvent.welDragObject;
				
				//self._oDisplayInfoModule.printMessage("dragX : " + welDragObject.offset().left + ", dragY : " + welDragObject.offset().top + "<br />"+"dropX : "+this._welDropObject.offset().left+", dropY : "+ this._welDropObject.offset().top);
			},
			dragEnd : function(oCustomEvent) {				
				var nMoneyType = oCustomEvent.elDragObject.nMoneyType;
				var bIsOver = oCustomEvent.bIsOver;
				var oMoney = oCustomEvent.elDragObject;
				var nValue = VendingUtility._commify(oMoney.getValue());
				
				var bIsMoneyChk = self._oPocket.chkMoney(oCustomEvent.elDragObject);
				if(!bIsMoneyChk) return;
				
				// 동전인지 체크
				if(nMoneyType == 1 && bIsOver) {
					// 동전 투입구에 넣었는지 여부 체크
					if(bIsOver) {
						if(self.addCoin(oMoney)) {
							// 주머니에서 돈꺼내기
							var nGetMoney = self._oPocket.useMoney(oCustomEvent.elDragObject);
							
							self._oMoneyDisplay.printMessage(VendingUtility._commify(self._nCurrentMoney)+"원");
							self._oDisplayInfoModule.printMessage(nValue + "원을 넣었습니다.");	
						}
					} 
				} else if(nMoneyType != 1 && bIsOver) {
					self._oDisplayInfoModule.printMessage("동전만 넣을 수 있습니다.");					
				} else if(nMoneyType == 1 && !bIsOver) {
					self._oDisplayInfoModule.printMessage("돈을 떨어뜨렸습니다.");
					self._oPocket.useMoney(oCustomEvent.elDragObject);
				}
				
				// 항상 돈은  없어지게 처리
				oCustomEvent.welDragObject.leave();
			}
		});
		
		// 지폐 투입구 모듈 객체 생성
		this._oInsertBillModule = new InsertMoneyModule("_insert_papermoney", {"oDragInstance":MoneyKind}).attach({
			dragStart : function(oCustomEvent) {
				// 주머니에서 돈꺼내기
				var bIsMoneyChk = self._oPocket.chkMoney(oCustomEvent.elDragObject);
				if(!bIsMoneyChk) {
					oCustomEvent.welDragObject.leave();
					self._oDisplayInfoModule.printMessage("사용가능한 금액이 없습니다.");
				}
			},
			dragging : function(oCustomEvent) {
				var bIsOver = oCustomEvent.bIsOver;
				var welDragObject = oCustomEvent.welDragObject;
				
				//self._oDisplayInfoModule.printMessage("top : "+this._welDropObject.offset().top);
				//self._oDisplayInfoModule.printMessage("IsOver : " + bIsOver + "<br />" +"welDragObject X : " + welDragObject.offset().left + "<br />welDragObject Y : " + welDragObject.offset().top);
			},
			dragEnd : function(oCustomEvent) {				
				var nMoneyType = oCustomEvent.elDragObject.nMoneyType;
				var bIsOver = oCustomEvent.bIsOver;
				var oMoney = oCustomEvent.elDragObject;
				var nValue = VendingUtility._commify(oMoney.getValue());

				var bIsMoneyChk = self._oPocket.chkMoney(oCustomEvent.elDragObject);
				if(!bIsMoneyChk) return;
				
				// 지폐인지 체크
				if(nMoneyType == 2 && bIsOver) {
					// 지폐 투입구에 넣었는지 여부 체크
					if(bIsOver) {
						if(self.addBill(oMoney)) {
							// 주머니에서 돈꺼내기
							var nGetMoney = self._oPocket.useMoney(oMoney);

							self._oMoneyDisplay.printMessage(VendingUtility._commify(self._nCurrentMoney)+"원");
							self._oDisplayInfoModule.printMessage(nValue + "원을 넣었습니다.");	
						}
					} 
				} else if(nMoneyType != 2 && bIsOver) {
					self._oDisplayInfoModule.printMessage("지폐만 넣을 수 있습니다.");
				} else if(nMoneyType == 2 && !bIsOver) {
					self._oDisplayInfoModule.printMessage("돈을 떨어뜨렸습니다.");		
					self._oPocket.useMoney(oCustomEvent.elDragObject);
				}
				
				// 항상 돈은  없어지게 처리
				oCustomEvent.welDragObject.leave();
			}
		});
	},
	
	/**
	 * 
	 * @public
	 * @description 현재 자판기를 사용하는 사용자의 주머니 변경
	 * @param oPocket 사용자의 주머니 객체를 넘겨주면 해당 사용자의 주머니를 화면에 표시해준다.
	 * 		
	 */
	pocketChange : function(oPocket) {
		this._oPocket = oPocket;
		this._insertMoneyModuleSetting(this._oPocket);
		
		oPocket.displayMoney();
		this.activate();
	},
	
	/**
	 * 
	 * @public
	 * @description 자판기에 동전을 넣는 메소드
	 * @param oMoney 동전 객체
	 * @returns 돈을 넣은 결과를 리턴
	 * 		
	 */
	addCoin : function(oMoney) {
		if(!this._bIsOn) {
			this._oDisplayInfoModule.printMessage("자판기가 꺼져있는데 동전을 넣으면 먹습니다.");
			return false;
		} else {
			return this.insertMoney(oMoney);			
		}
	},
	
	/**
	 * 
	 * @public
	 * @description 자판기에 지폐를 넣는 메소드
	 * @param oMoney 지폐 객체
	 * @returns 돈을 넣은 결과를 리턴
	 */
	addBill : function(oMoney) {
		if(!this._bIsOn) {
			this._oDisplayInfoModule.printMessage("자판기 꺼져있어 지폐를 넣을 수 없습니다.");
			return false;
		} else if (this._nBillCnt == 2) {
			this._oDisplayInfoModule.printMessage("더이상 지폐를 넣을 수 없습니다.");
			return false;
		} else {
			this._nBillCnt = this._nBillCnt + 1;
			return this.insertMoney(oMoney);
		}
	},
	
	/**
	 * 
	 * @public
	 * @description 실제 돈을 증가시키는 메소드로 자판기의 스펙제한
	 * 		최대금액 3000원
	 * @param oMoney 돈 객체를 넘겨받음
	 * @returns {Boolean} 자판기에 돈을 넣은 결과를 리턴
	 */
	insertMoney : function(oMoney) {
		var nValue = oMoney.getValue();
		if(this._nCurrentMoney + nValue <= 3000) {
			this._nCurrentMoney = this._nCurrentMoney + nValue;
			return true;
		} else {
			this._oDisplayInfoModule.printMessage("최대 넣을 수 있는 돈은 3,000원 입니다.");
			return false;
		}
	},
	
	/**
	 * 
	 * @public
	 * @description 자판기에 투입된 금액을 사용자의 주머니로 반환
	 */
	rejectMoney : function() {
		if(this._nCurrentMoney > 0) {
			this._oPocket.addMoney(this._nCurrentMoney);
			this._oDisplayInfoModule.printMessage(this._nCurrentMoney + "원이 반환되었습니다.");
			
			this._nCurrentMoney = 0;
			this._nBillCnt = 0;
		} else {
			this._oDisplayInfoModule.printMessage("반환할 금액이 없습니다.");
		}
		
		this._oMoneyDisplay.printMessage("0원");		
	},
	
	/**
	 * 
	 * @public
	 * @description 자판기에 상품을 생성하는 메소드로 추후 관리자가 직접 넣을 경우 파라미터로 해당 상품 리스트를 넘겨받으면 됨
	 */
	generatorProduct : function() {
		
		var aProductList  = [
		                     {"sClass":"item1", "sName":"펩시"},
		                     {"sClass":"item2", "sName":"V10"},
		                     {"sClass":"item3", "sName":"칸타타"},
		                     {"sClass":"item4", "sName":"2%"},
		                     {"sClass":"item5", "sName":"환타"},
		                     {"sClass":"item6", "sName":"식혜"},
		                     {"sClass":"item7", "sName":"비타500"},
		                     {"sClass":"item8", "sName":"박카스"}
		                     ];
		var aProductPrice  = ["100", "200", "300", "400", "500", "600", "700", "800"];
		
		var waProductList = $A(aProductList).shuffle();
		var waProductPrice = $A(aProductPrice).shuffle();
				
		for(j = 0; j < this._nProductContainerCount; j++) {

			// 물건 종류 생성
			var oProduct = new Product(waProductList.pop(), waProductPrice.pop());
			
			// 물건을 담을 컨테이너 생성
			var oProductContainer = new ProductContainer(oProduct, this);
			
			// 랜덤으로 1 에서 3까지 물건 추가
			oProductContainer._randomProduct();
			
			// 자판기에 물건 넣기
			this.addProductContainer(oProductContainer);
			
			// 상품 출력
			this._welProductArea.append(oProductContainer.elProduct);
		}
	},
	
	/**
	 * 
	 * @public
	 * @description 자판기에 상품 묶음을 넣는 메소드
	 * @param oProductContainer 상품 묶음 객체로 상품들이 안에 포함되어 있음
	 */
	addProductContainer : function(oProductContainer) {
		this._waProductContainer.push(oProductContainer);
	},
	
	/**
	 * 
	 * @public
	 * @description 실제 상품을 구매하는 메소드로 상품 묶음 객체의 pullProduct 메소드와 연동 
	 * @param oProduct productContainer.pullProduct 메소드에서 구매한 상품을 넘겨받아 처리
	 */
	buyProduct : function(oProduct) {
		if(typeof oProduct != "string") {
			var sProductName = oProduct.getName();
			var nProductPrice = oProduct.getPrice();
			
			// 잔액 계산
			this._nCurrentMoney = this._nCurrentMoney - nProductPrice;
			
			// 3자리수 콤마처리
			var sMoney = VendingUtility._commify(this._nCurrentMoney);
			this._oMoneyDisplay.printMessage(sMoney+"원");
			
			// 콘솔 출력
			this._oDisplayInfoModule.printMessage(sProductName + "을 " + nProductPrice + "원에 구매하였습니다.");
			
		} else {
			this._oDisplayInfoModule.printMessage(oProduct);
		}
	},
	
	/**
	 * 
	 * @private
	 * @description 활성화 메소드
	 */
	_onActivate : function() {
		this._bIsOn = true;
		this._wfOfRejectMoney.attach(this._welRejectButton, "click");
	},
	 
	/**
	 * 
	 * @private
	 * @description 비활성화 메소드
	 */
	_onDeactivate : function() {
		this._bIsOn = false;
	}
}).extend(jindo.UIComponent);