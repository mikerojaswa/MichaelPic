"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabris_1 = require("tabris");
var Send_1 = require("./Send");
var ServiceLayer_1 = require("./ServiceLayer");
var imageCounter = 0;
var font = 'bold' + ' ' + 'normal' + ' 24px ' + 'arial';
var picPath = [];
var imageQueue = false;
var imageArray = [];
var globalPicture = 0;
var savedImage = [];
var editPage = (function () {
    function editPage() {
        this.navView = new tabris_1.NavigationView({
            left: 0, top: 0, right: 0, bottom: 0
        }).appendTo(tabris_1.ui.contentView);
        this.editPage = new tabris_1.Page({
            title: 'MichaelPic'
        }).appendTo(this.navView);
        this.createComponents();
    }
    editPage.prototype.createComponents = function () {
        this.scrollView = new tabris_1.ScrollView({
            left: 0, right: 0, top: 'prev() 0', bottom: 0,
            direction: 'vertical',
            background: '#00bcd4'
        });
        var topButton = new MainButtons(this.scrollView, this.navView);
        console.log(this.scrollView);
        this.editPage.append(topButton.buildButtons());
        this.editPage.append(this.scrollView);
    };
    return editPage;
}());
var Picture = (function () {
    function Picture(scrollInput) {
        this.scroll = scrollInput;
    }
    Picture.prototype.createPictureComp = function () {
        if (imageQueue) {
            window.plugins.toast.showShortBottom('Image added');
            var imageComp_1 = new tabris_1.Composite({
                top: 'prev() 25', left: '10%', right: "10%", height: 200
            }).appendTo(this.scroll);
            imageArray.push(imageComp_1);
            var imageComp2 = new tabris_1.Composite({
                top: 2, bottom: 2, left: 2, right: 2
            }).appendTo(imageComp_1);
            new tabris_1.ImageView({
                top: 0, left: 0, right: 0,
                image: { src: picPath[imageCounter] },
                background: '#aaaaaa',
                scaleMode: 'auto'
            }).on('tap', function () {
                window.plugins.toast.showShortBottom('Image tapped');
                for (var i = 0; i < imageArray.length; i++) {
                    imageArray[i].background = '#00bcd4';
                    if (imageComp_1 == imageArray[i]) {
                        globalPicture = i;
                        console.log(i);
                    }
                }
                imageComp_1.background = '#ffff89';
            }).appendTo(imageComp2);
            imageQueue = false;
            imageCounter = imageCounter + 1;
        }
        else {
            window.plugins.toast.showShortBottom('No pictor');
        }
    };
    return Picture;
}());
var customPage = (function () {
    function customPage(title, page) {
        this.pageTitle = title;
        this.appendLocation = page;
    }
    customPage.prototype.newPage = function () {
        var editPage = new tabris_1.Page({
            title: this.pageTitle
        }).appendTo(this.appendLocation);
        var button = new tabris_1.Button({
            top: 10, right: 10,
            text: 'Send'
        }).on('select', function () {
            //Send image to node server
            var path = picPath[globalPicture];
            var convertedImage = "";
            var serviceLayer = new ServiceLayer_1.ServiceLayer();
            serviceLayer.getFileContentAsBase64(path, function (base64Image) {
                convertedImage = base64Image;
                serviceLayer.saveImage(convertedImage);
            });
            var collectionView = new Send_1.Send().createSendCollectionView();
            editPage.parent().append(collectionView);
            // let search = new Send().createSearchBar(collectionView);
            // sendPage.parent().append(search);
        }).appendTo(editPage);
        var canvas = new tabris_1.Canvas({
            left: 0, top: 0, right: 0, bottom: 0,
            backgroundImage: { src: picPath[globalPicture] }
        }).appendTo(editPage);
        new tabris_1.Slider({
            top: [button, 40],
            right: 10,
            left: 60,
            minimum: 0,
            selection: 0,
            maximum: 1068,
            transform: {
                rotation: 0.5 * Math.PI,
                scaleX: 1.0,
                scaleY: 1.0,
                translationX: 108,
                translationY: 105
            },
        }).on('selectionChanged', function (_a) {
            var value = _a.value;
            if (value < 179) {
                green = 66 + value;
            }
            else if (value < 357 && value > 178) {
                red = 244 - value + 178;
                green = 244;
                blue = 66;
            }
            else if (value < 535 && value > 356) {
                red = 66;
                green = 244;
                blue = 66 + value - 356;
            }
            else if (value < 713 && value > 534) {
                red = 66;
                green = 244 - value + 534;
                blue = 244;
            }
            else if (value < 891 && value > 712) {
                red = 66 + value - 712;
                green = 66;
                blue = 244;
            }
            else if (value < 1069 && value > 890) {
                red = 244;
                green = 66;
                blue = 244 - value - 890;
            }
        }).appendTo(editPage);
        var ctx = canvas.getContext('2d', 600, 600);
        var x = 0;
        var y = 0;
        var red = 244;
        var green = 66;
        var blue = 66;
        canvas.on("touchStart", function (event) {
            x = event.touches[0].x;
            y = event.touches[0].y;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',1)';
            ctx.lineWidth = 5;
        }).on("touchMove", function (event) {
            x = event.touches[0].x;
            y = event.touches[0].y;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',1)';
            ctx.lineWidth = 5;
        });
    };
    return customPage;
}());
var MainButtons = (function () {
    function MainButtons(scrollInput, navOn) {
        this.scroll = scrollInput;
        this.nav = navOn;
    }
    MainButtons.prototype.buildButtons = function () {
        var pic = new Picture(this.scroll);
        var page = new customPage('Edit Pic', this.nav);
        var comp = new tabris_1.Composite({
            left: 0, top: 0, bottom: '87.5%', right: 0,
            background: '#008ba3'
        });
        var addButton = new tabris_1.Button({
            left: 'prev() 0', top: 10, right: '17.5%',
            text: '➕'
        });
        addButton.on('select', function () { pic.createPictureComp(); });
        comp.append(new tabris_1.Button({
            left: 10, top: 10, right: '35%',
            text: '📸'
        }).on('select', function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 70,
                targetWidth: 3000,
                targetHeight: 3000,
                destinationType: window.Camera.DestinationType.FILE_URI
            });
            function onSuccess(imageUrl) {
                // imageView.image = {src: imageUrl};
                picPath.push(imageUrl);
                imageQueue = true;
                console.log(imageUrl);
            }
            function onFail(message) {
                console.log('Camera failed because: ' + message);
            }
        })).append(addButton).append(new tabris_1.Button({
            left: 'prev() 0', top: 10, right: 10,
            text: '🖌'
        }).on('select', function () {
            page.newPage();
        }));
        return comp;
    };
    return MainButtons;
}());
new editPage();
// var navigationView = new tabris.NavigationView({
//     left: 0, top: 0, right: 0, bottom: 0
// }).appendTo(tabris.ui.contentView);
//
// var editPage = new tabris.Page({
//     title: 'Camera Fun'
// }).appendTo(navigationView);
//
// var cameraComposite = new tabris.Composite({
//     left: 0, top: 0, bottom: '80%', right: 0,
//     background: '#008ba3'
// }).appendTo(editPage);
//
// var scrollViewComposite = new tabris.Composite({
//     left: 0, top: 'prev() 0', bottom: 0, right: 0,
// }).appendTo(editPage);
//
//
// var scrollView = new tabris.ScrollView({
//     left: 0, right: 0, top: 0, bottom: 0,
//     direction: 'vertical',
//     background: '#00bcd4'
// }).appendTo(scrollViewComposite);
//
//
// var button = new tabris.Button({
//     left: 10, top: 10, right: '35%',
//     text: '📸'
// }).appendTo(cameraComposite).on('select', function () {
//     navigator.camera.getPicture(onSuccess, onFail, {
//         quality: 99,
//         targetWidth: 1024,
//         targetHeight: 1024,
//         destinationType: window.Camera.DestinationType.FILE_URI
//     });
//     function onSuccess(imageUrl) {
//         // imageView.image = {src: imageUrl};
//         picPath.push(imageUrl);
//         imageQueue = true;
//         console.log(imageUrl);
//     }
//
//     function onFail(message) {
//         console.log('Camera failed because: ' + message);
//     }
// });
//
//
// let addButton = new Button({
//     left: button, top: 10,
//     text: '➕'
// }).on('select', function ({}) {
//     if (imageQueue) {
//         window.plugins.toast.showShortBottom('Image added');
//         let imageComp = new tabris.Composite({
//             top: 'prev() 20', left: '20%', right: "20%"
//         }).appendTo(scrollView);
//         imageArray.push(imageComp);
//
//         var imageView = new tabris.ImageView({
//             top: 0, centerX: 0, bottom: 10,
//             image: {src: picPath[imageCounter]},
//             background: '#aaaaaa',
//             scaleMode: 'fit'
//         }).on('tap', function () {
//             window.plugins.toast.showShortBottom('Image tapped');
//             for (i = 0; i < imageArray.length; i++) {
//                 imageArray[i].background = '#00bcd4'
//             }
//             imageComp.background = '#ffff89';
//         }).appendTo(imageComp);
//         imageQueue = false;
//         imageCounter = imageCounter + 1;
//     }
//     else {
//         window.plugins.toast.showShortBottom('No image');
//     }
//
//
// }).appendTo(cameraComposite);
//
// let editButton = new tabris.Button({
//     left: addButton, top: 10, right: 10,
//     text: '🖌'
// }).appendTo(cameraComposite);
//# sourceMappingURL=app.js.map