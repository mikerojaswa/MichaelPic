"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabris_1 = require("tabris");
var IMAGE_PATH = 'images/';
var people = [
    ['Stewie', 'stewie.jpg'],
    ['Bender', 'bender.jpg'],
    ['Kitty', 'hellokitty.jpg'],
    ['Shrek', 'shrek.jpg'],
    ['Sonic', 'sonic.jpg'],
    ['Cartman', 'cartman.jpg'],
    ['Brian', 'brian.jpg'],
    ['Elmo', 'elmo.jpg']
].map(function (_a) {
    var name = _a[0], image = _a[1];
    return ({ name: name, image: IMAGE_PATH + image });
});
var cellArray = [];
var Send = (function () {
    function Send() {
    }
    Send.prototype.createSendCollectionView = function () {
        var friendsCollectionView = new tabris_1.CollectionView({
            left: 0, top: 0, right: 0, bottom: '10%',
            itemCount: people.length,
            cellHeight: 150,
            createCell: function () {
                var cell = new tabris_1.Composite();
                new tabris_1.ImageView({
                    centerY: 0, left: 20, width: 100, height: 100
                }).appendTo(cell);
                new tabris_1.TextView({
                    left: 'prev() 40', centerY: 0,
                    font: 'medium normal 24px arial'
                }).appendTo(cell);
                new tabris_1.CheckBox({
                    right: 20, centerY: 0,
                    checked: false
                }).appendTo(cell);
                return cell;
            },
            updateCell: function (cell, index) {
                var person = people[index];
                var cellToPush = cell.apply({
                    ImageView: { image: person.image },
                    TextView: { text: person.name }
                });
            },
        }).on('select', function (_a) {
            var index = _a.index;
            return sendButton.opacity = 1;
        });
        var sendButtonComp = new tabris_1.Composite({
            top: friendsCollectionView,
            bottom: 0,
            left: 0,
            right: 0
        });
        var sendButton = new tabris_1.Button({ text: 'Send',
            centerY: 0,
            centerX: 0,
            opacity: 1
        });
        sendButtonComp.append();
        var page = new tabris_1.Page();
        page.append(friendsCollectionView).append(sendButtonComp);
        return page;
    };
    Send.prototype.createSendComposite = function () {
        var _this = this;
        createSearchBar(collectionView, tabris_1.CollectionView);
        {
            var action = new tabris_1.SearchAction({
                title: 'Search',
                image: {
                    src: tabris_1.device.platform === 'iOS' ? 'images/search-black-24dp@3x.png' : 'images/search.png',
                    scale: 1.5
                }
            }).on('select', function (_a) {
                var target = _a.target;
                return target.text = '';
            }).on('input', function (_a) {
                var text = _a.text;
                return _this.updateCollectionView(text, collectionView);
            });
            return action;
        }
        updateCollectionView(textInput, string, collectionView, tabris_1.CollectionView);
        void {};
    };
    return Send;
}());
exports.Send = Send;
//# sourceMappingURL=Send.js.map