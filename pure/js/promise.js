/**
 * Created by yg on 2018. 4. 17..
 */
window.onload = function () {
    /**
    Promise 선언 (1)
     */
    // var _promise = function (param) {
    //     return new Promise(function (resolve, reject) {
    //         // 비동기를 표현하기 위해 setTimeout 함수를 사용
    //         window.setTimeout(function () {
    //             // 파라메터가 참이면,
    //             if (param) {
    //                 // 해결됨
    //                 resolve("해결 완료");
    //             }
    //
    //             // 파라메터가 거짓이면,
    //             else {
    //                 // 실패
    //                 reject(Error("실패!!"));
    //             }
    //         }, 3000);
    //     });
    // };
    //
    // //Promise 실행
    // _promise(true)
    //     .then(function (text) {
    //         // 성공시
    //         console.log(text);
    //     }, function (error) {
    //         // 실패시
    //         console.error(error);
    //     });

    /**
    Promise 선언 (2)
     */
    var promise1 = function () {

        return new Promise(function (resolve, reject) {

            // 비동기를 표현하기 위해 setTimeout 함수를 사용
            window.setTimeout(function () {

                // 해결됨
                console.log("첫번째 Promise 완료");
                resolve("11111");

            }, Math.random() * 20000 + 1000);
        });
    };

    var promise2 = function () {

        return new Promise(function (resolve, reject) {

            // 비동기를 표현하기 위해 setTimeout 함수를 사용
            window.setTimeout(function () {

                // 해결됨
                console.log("두번째 Promise 완료");
                resolve("2222");

            }, Math.random() * 10000 + 1000);
        });
    };
};