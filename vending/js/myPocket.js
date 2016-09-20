/**
 * @name MyPocket
 * @class
 * @description 사용자의 주머니를 객체화한 클래스
 * @author Jitae, Kim
 * @version 1.0.0
 * @since 2011. 12. 27.
 */
var MyPocket = $Class({
	_nCurrentMoney : 0,
	_elDisplayMoney : null,
	_welDisplayMoney : null,
	
	/**
	 * 
	 * @constructor
	 * @description 사용자 지갑 생성자
	 * @param nMoney 초기 금액을 넘겨받아 주머니 생성
	 */
	$init : function(nMoney) {
		// 사용 가능한 돈 셋팅
		var c50 = new Coin("_c50", {"bClone":true}, 50);
		var c100 = new Coin("_c100", {"bClone":true}, 100);
		var c500 = new Coin("_c500", {"bClone":true}, 500);
		var c1000 = new Bill("_c1000", {"bClone":true}, 1000);
		
		this.aMoneyList = [c50, c100, c500, c1000];
		
		this._elDisplayMoney = jindo.$("_my_pocket");
		this._welDisplayMoney = $Element(this._elDisplayMoney);
		
		this._nCurrentMoney = nMoney;
	},
	
	/**
	 * 
	 * @public
	 * @description 사용자가 사용 가능한 화폐 리스트를 반환
	 * @returns {Array} 화폐 리스트
	 */
	getMoneyList : function() {
		return this.aMoneyList;
	},
	
	/**
	 * 
	 * @public
	 * @description 사용자에게 돈이 들어갈때 호출하는 메소드 
	 * @param nMoney 더하고자 하는 금액을 입력 		
	 */
	addMoney : function(nMoney) {
		this._nCurrentMoney = this._nCurrentMoney + nMoney;
		this.displayMoney();
	},
	
	/**
	 * @public
	 * @description 사용자가 사용한 돈
	 * @param oMoney 빼고자 하는 돈 객체를 넘겨받아 금액 계산
	 * @return 사용한 금액을 반환
	 */
	useMoney : function(oMoney) {
		if(this.chkMoney(oMoney)) {
			this._nCurrentMoney = this._nCurrentMoney - oMoney.getValue();
			this.displayMoney();
		}
	},
	
	/**
	 * 
	 * @public
	 * @description 사용자 가용금액 체크 메소드
	 * @param oMoney Money 객체
	 * @returns {Boolean} 가용 가능한 금액일 경우 return 
	 */
	chkMoney : function(oMoney) {
		var nCalc = this._nCurrentMoney - oMoney.getValue();
		if(nCalc >= 0) {
			return true;
		} else {
			return false;
		}
	},
	
	/**
	 * 
	 * @public
	 * @description 사용자가 돈을 사용하거나 생겼을때 자동 호출하여 현재 가진 금액 표시
	 */
	displayMoney : function() {
		// 3자리마다 콤마 표시
		var str = VendingUtility._commify(this._nCurrentMoney);
		this._welDisplayMoney.html(str);
		
		// 사용 가능한 화폐 설정
		var waMoneyList = $A(this.aMoneyList);
		
		var self = this;
		
		// 화폐를 돌아가면서 체크하여 가용 금액보다 화폐가치가 클 경우 감추기
		waMoneyList.forEach(function(value, index, array){
			if(value.getValue() > self._nCurrentMoney) {
				$Element(value._elOriObject).css("visibility","hidden");
			} else {
				$Element(value._elOriObject).css("visibility","visible");
			}
		});
	}
});