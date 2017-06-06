"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPADDRESS = '192.168.100.185';
var ServiceLayer = (function () {
    function ServiceLayer() {
    }
    ServiceLayer.prototype.saveImage = function (image) {
        var body = JSON.stringify({ test: image });
        console.log('Here');
        fetch('http://' + IPADDRESS + ':3000/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: body
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
        }).catch(function (ex) {
            console.error(ex);
        });
    };
    ServiceLayer.prototype.getFileContentAsBase64 = function (path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    };
    ServiceLayer.prototype.getImageDataArray = function (imageArray) {
        fetch('http://' + IPADDRESS + ':3000/', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            for (var i = 0; i < json.length; i++) {
                imageArray.push(json[i]);
            }
        }).catch(function (ex) {
            console.error(ex);
        });
    };
    return ServiceLayer;
}());
exports.ServiceLayer = ServiceLayer;
//# sourceMappingURL=ServiceLayer.js.map