/**
 * @name VendingUtility
 * @class
 * @description 자판기에서 사용하는 공통적인 스택틱 메소드 선언 클래스
 * @author Jitae, Kim
 * @version 1.0.0
 * @since 2011. 12. 28.
 */
var VendingUtility = $Class({
	
	$static : {
		/**
		 * 
		 * @private
		 * @description 3자리마다 콤마 표시 메소드
		 * @param nStr 돈으로 표시될 숫자값
		 * @returns nStr 3자리마다 콤마로 표시된 금액 리턴
		 */
		_commify : function(nStr) {
			var reg = /(^[+\-]?\d+)(\d{3})/;	  // 정규식
			nStr = nStr + '';		              // 숫자를 문자열로 변환
			
			while (reg.test(nStr)) {
				nStr = nStr.replace(reg, '$1' + ',' + '$2');
			}

			return nStr;
		}
	}
});