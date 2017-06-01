"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabris_1 = require("tabris");
var Search = (function () {
    function Search() {
    }
    Search.prototype.createSearchBar = function (page) {
        var action = new tabris_1.SearchAction({
            title: 'Search',
            image: {
                src: tabris_1.device.platform === 'iOS' ? 'images/search-black-24dp@3x.png' : 'images/search.png',
                scale: 3
            }
        }).on('select', function (_a) {
            var target = _a.target;
            return target.text = '';
        }).on('input', function (_a) {
            var text = _a.text;
            return page.dispose();
        });
        return action;
    };
    return Search;
}());
exports.Search = Search;
//# sourceMappingURL=Search.js.map