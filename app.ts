import  {ui, Button, NavigationView, Page, ScrollView, Composite, Widget, ImageView, Canvas, Slider} from 'tabris';
import {Send} from './Send';
import {ServiceLayer} from './ServiceLayer';



let imageCounter: number = 0;
let font: string = 'bold' + ' ' + 'normal' + ' 24px ' + 'arial';
let picPath: Array<string> = [];
let imageQueue: boolean = false;
let imageArray: Array<Composite> = [];
let globalPicture = 0;

function getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);

    function fail(e) {
        alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                var content = this.result;
                callback(content);
            };
            // The most important point, use the readAsDatURL Method from the file plugin
            reader.readAsDataURL(file);
        });
    }
}


class editPage {

    navView: NavigationView;
    editPage: Page;
    scrollView: ScrollView;

    constructor() {
        this.navView = new NavigationView({
            left: 0, top: 0, right: 0, bottom: 0
        }).appendTo(ui.contentView);
        this.editPage = new Page({
                title: 'MichaelPic'
            }
        ).appendTo(this.navView);
        this.createComponents();

    }

    private createComponents() {
       this.scrollView = new ScrollView({
            left: 0, right: 0, top: 'prev() 0', bottom: 0,
            direction: 'vertical',
            background: '#00bcd4'
        });


        var topButton = new MainButtons(this.scrollView, this.navView);
        console.log(this.scrollView);

        this.editPage.append(topButton.buildButtons());
        this.editPage.append(this.scrollView);

}


}

class Picture{
    scroll: ScrollView;

    constructor(scrollInput: ScrollView){
        this.scroll = scrollInput;
    }

    public createPictureComp(): void{
            if (imageQueue) {
        window.plugins.toast.showShortBottom('Image added');
        let imageComp = new Composite({
            top: 'prev() 25', left: '10%', right: "10%", height: 200
        }).appendTo(this.scroll);
        imageArray.push(imageComp);

        let imageComp2 = new Composite({
            top:2, bottom: 2, left: 2, right: 2
        }).appendTo(imageComp);

         new ImageView({
            top: 0, left: 0, right: 0,
            image: {src: picPath[imageCounter]},
            background: '#aaaaaa',
            scaleMode: 'auto'
        }).on('tap', function () {
             window.plugins.toast.showShortBottom('Image tapped');
             for (let i: number = 0; i < imageArray.length; i++) {
                 imageArray[i].background = '#00bcd4';
                 if(imageComp == imageArray[i]){
                     globalPicture = i;
                     console.log(i);
                 }
             }
             imageComp.background = '#ffff89';
         }).appendTo(imageComp2);
        imageQueue = false;
        imageCounter = imageCounter + 1;

                var path = picPath[0];

// Convert image
                getFileContentAsBase64(path,function(base64Image){
                    //window.open(base64Image);
                    console.log(base64Image);
                    // Then you'll be able to handle the myimage.png file as base64
                });

    }
    else {
        window.plugins.toast.showShortBottom('No image');
    }
    }
}

class customPage{
    pageTitle: string;
    appendLocation: NavigationView;



    constructor(title: string, page: NavigationView){
        this.pageTitle = title;
        this.appendLocation = page;
    }



    newPage(): void {
    let editPage = new Page({
        title: this.pageTitle
    }).appendTo(this.appendLocation);

    let button: Button = new Button({
        top: 10, right: 10,
        text: 'Send'
    }).on('select', function() {
        console.log(red);
       let collectionView =  new Send().createSendCollectionView();
       let sendPage = new Page().append(collectionView);

       editPage.parent().append(sendPage);
        let search = new Send().createSearchBar(collectionView);
        sendPage.parent().append(search);

    }).appendTo(editPage);



    let canvas = new Canvas({
            left: 0, top: 0, right: 0, bottom: 0,
        backgroundImage: {src: picPath[globalPicture]}
    }).appendTo(editPage);


        new Slider({
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

        }).on('selectionChanged', function({value}) {
            if(value<179){
                green = 66 + value;
            }else if(value<357 && value > 178){
                red = 244 - value + 178;
                green = 244;
                blue = 66;

            }else if(value<535 && value>356){
                red = 66;
                green = 244;
                blue = 66 + value - 356
            }else if(value<713 && value>534){
                red = 66;
                green = 244 - value + 534;
                blue = 244
            }else if(value<891 && value>712){
                red = 66 + value - 712;
                green = 66;
                blue = 244
            }else if(value<1069 && value>890){
                red = 244;
                green = 66;
                blue = 244 - value - 890
            }

        }).appendTo(editPage);


    let ctx = canvas.getContext('2d', 600, 600);
    let x: number = 0;
    let y: number = 0;
    let red: number = 244;
    let green: number = 66;
    let blue: number = 66;

    canvas.on("touchStart", function(event) {

        x = event.touches[0].x;
        y = event.touches[0].y;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',1)';
        ctx.lineWidth = 5;

    }).on("touchMove", function(event){
        x = event.touches[0].x;
        y = event.touches[0].y;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',1)';
        ctx.lineWidth = 5;
    });

    }
}

class MainButtons{

    scroll: ScrollView;
    nav: NavigationView;

    constructor(scrollInput: ScrollView, navOn: NavigationView){
        this.scroll = scrollInput;
        this.nav = navOn;
    }


    public buildButtons(): Composite {
        let pic: Picture = new Picture(this.scroll);
        let page: customPage = new customPage('Edit Pic', this.nav);
        let comp = new Composite({
            left: 0, top: 0, bottom: '87.5%', right: 0,
            background: '#008ba3'
        });


        let addButton = new Button({
            left: 'prev() 0', top: 10, right: '17.5%',
            text: '➕'
        });
        addButton.on('select', function(){pic.createPictureComp()});


        comp.append(new Button({
            left: 10, top: 10, right: '35%',
            text: '📸'
        }).on('select', function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 70,
                targetWidth: 3000,
                targetHeight: 3000,
                destinationType: window.Camera.DestinationType.FILE_URI
            });
            function onSuccess(imageUrl: string) {
                // imageView.image = {src: imageUrl};
                picPath.push(imageUrl);
                imageQueue = true;
                console.log(imageUrl);
            }

            function onFail(message: string) {
                console.log('Camera failed because: ' + message);
            }
        })).append(addButton).append(new Button({
            left: 'prev() 0', top: 10, right: 10,
            text: '🖌'
        }).on('select', function(){
            page.newPage();
        }));

        return comp;
    }


}

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
