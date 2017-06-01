"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceLayer = (function () {
    function ServiceLayer() {
    }
    ServiceLayer.prototype.saveImage = function (image) {
        fetch('http://192.168.100.185:3000/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                img: image
            })
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
        }).catch(function (ex) {
            console.error(ex);
        });
    };
    ServiceLayer.prototype.base64Encode = function (url) {
        fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (blob) { return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () { return resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }); }).then(function (dataUrl) {
            console.log('RESULT:', dataUrl);
        });
    };
    return ServiceLayer;
}());
exports.ServiceLayer = ServiceLayer;
//# sourceMappingURL=ServiceLayer.js.map