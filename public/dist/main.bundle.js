webpackJsonp([1,4],{

/***/ 313:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 313;


/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(424);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/main.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(ls) {
        this.ls = ls;
        this.messageText = '';
        this.messages = [];
        this.connectedUsers = [];
        this.user = {};
        this.generalChannels = [
            { 'name': '#general', 'active': true }
        ];
        this.channels = [];
        console.log(this.channels);
        this.logIn();
    }
    AppComponent.prototype.logInBtn = function () {
        if (this.tempUsername) {
            this.user = {
                'name': this.tempUsername.trim(),
                'image': '',
                'status': ''
            };
            this.setUser();
            this.logIn();
        }
    };
    AppComponent.prototype.logIn = function () {
        var _this = this;
        console.log(this.loggedUser(), this.isEmptyJSON(this.loggedUser()));
        if (!this.isEmptyJSON(this.loggedUser())) {
            this.user = this.loggedUser();
            if (this.connectedUsers.indexOf(this.user['name']) === -1) {
                this.connectedUsers.push(this.user['name']); // TODO
                this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__["connect"]().emit('userconn', this.user);
                console.log(this.socket);
                this.setUser();
                this.socket.on('connected', function (users) {
                    console.log(_this.channels);
                    _this.channels = _this.generalChannels.concat(users
                        .map(function (user) { return { 'name': user.name, 'active': false }; })
                        .filter(function (user) { return user.name !== _this.user['name']; }));
                });
                this.socket.on('message', function (msg) {
                    console.log(_this.messages);
                    _this.messages.push(msg);
                    console.log(_this.messages);
                });
            }
        }
    };
    AppComponent.prototype.setUser = function () {
        console.log(this.user);
        this.ls.set('user', this.user);
    };
    AppComponent.prototype.isEmptyJSON = function (obj) {
        for (var i in obj) {
            if (!!obj[i]) {
                return false;
            }
        }
        return true;
    };
    AppComponent.prototype.loggedUser = function () {
        return this.ls.get('user');
    };
    // onKeySendName(event) {
    //   if (event.target.value === 'enter') {
    //     this.logIn();
    //   }
    // }
    AppComponent.prototype.logOut = function () {
        this.ls.clearAll();
        this.socket.emit('disconn', JSON.parse(JSON.stringify(this.user)));
    };
    AppComponent.prototype.sendMsg = function () {
        if (this.loggedUser()) {
            console.log(this.messageText);
            var tempMessage = this.messageText.trim();
            if (tempMessage) {
                this.socket.emit('message', {
                    'user': JSON.parse(JSON.stringify(this.user)),
                    'text': this.messageText,
                    'first': this.messages.length === 0 || JSON.stringify(this.user) !== JSON.stringify(this.messages.slice(-1).pop().user)
                });
            }
            this.messageText = '';
        }
    };
    AppComponent.prototype.isMine = function (message) {
        return JSON.stringify(message.user) === JSON.stringify(this.user);
    };
    AppComponent.prototype.isFirst = function (message) {
        return JSON.stringify(message.user) !== JSON.stringify(this.user);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(497),
            styles: [__webpack_require__(492)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__["LocalStorageService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular_2_local_storage__["LocalStorageService"]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/app.component.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(422);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__["LocalStorageModule"].withConfig({
                    prefix: 'chat',
                    storageType: 'localStorage'
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/app.module.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/environment.js.map

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(195)();
// imports


// module
exports.push([module.i, "html,body {\r\n\theight:100%;\r\n}\r\n\r\n.container-fluid, .row {\r\n\theight:100%;\r\n  padding: 0;\r\n}\r\n\r\n.flex-row, .flex-row > div[class*='col-'] {  \r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-flex:0;\r\n        -ms-flex:0 auto;\r\n            flex:0 auto;\r\n    height:100%;\r\n}\r\n\r\n.flex-col {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    display: -webkit-flex;\r\n    -webkit-box-flex: 1;\r\n        -ms-flex: 1;\r\n            flex: 1;\r\n\t-webkit-box-orient: vertical;\r\n\t-webkit-box-direction: normal;\r\n\t    -ms-flex-flow: column nowrap;\r\n\t        flex-flow: column nowrap;\r\n}\r\n\r\n.flex-grow {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n    -webkit-box-flex: 2;\r\n        -ms-flex: 2;\r\n            flex: 2;\r\n}\r\n.card-group {\r\n  \r\n  height:100%;\r\n}\r\n\r\n.card {\r\n  border-radius: 0;\r\n  min-height: 100%;\r\n  padding:0;\r\n}\r\n\r\nul.messages {\r\n  width:100%\r\n}\r\n\r\n.chat {\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.card-msg {\r\n  padding: 0;\r\n}\r\n.messages {\r\n  position: relative;\r\n  list-style: none;\r\n  padding: 20px;\r\n  margin: 0;\r\n  height: 100%;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.list-group {\r\n  height: 100%;\r\n  overflow-y: scroll;\r\n}\r\n\r\n\r\n.messages .message {\r\n  clear: both;\r\n  overflow: hidden;\r\n  margin-bottom: 10px;\r\n  -webkit-transition:all 0.5s linear;\r\n  transition: all 0.5s linear;\r\n}\r\n.messages .message.left .avatar {\r\n  background-color: #7FD7F7;\r\n  float: left;\r\n}\r\n.messages .message.left .text_wrapper {\r\n  background-color: #BFEBFB;\r\n  margin-left: 20px;\r\n}\r\n.messages .message.left .text_wrapper::after, .messages .message.left .text_wrapper::before {\r\n  right: 100%;\r\n  border-right-color: #BFEBFB;\r\n}\r\n.messages .message.left .text {\r\n  color: #333;\r\n}\r\n.messages .message.right .avatar {\r\n  background-color: #8FD57F;\r\n  float: right;\r\n}\r\n.messages .message.right .text_wrapper {\r\n  background-color: #C7EABF;\r\n  margin-right: 20px;\r\n  float: right;\r\n}\r\n.messages .message.right .text_wrapper::after, .messages .message.right .text_wrapper::before {\r\n  left: 100%;\r\n  border-left-color: #C7EABF;\r\n}\r\n.messages .message.right .text {\r\n  color: #333;\r\n}\r\n\r\n.messages .message .avatar {\r\n  width: 60px;\r\n  height: 60px;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n}\r\n.messages .message:not(.first) {\r\n  margin-top: -5px;\r\n}\r\n.messages .message:not(.first) .avatar {\r\n  opacity: 0;\r\n}\r\n.messages .message .text_wrapper {\r\n  display: inline-block;\r\n  padding: 20px;\r\n  border-radius: 6px;\r\n  max-width: calc(100% - 85px);\r\n  min-width: 100px;\r\n  position: relative;\r\n}\r\n.messages .message .text_wrapper::after, .messages .message .text_wrapper:before {\r\n  top: 18px;\r\n  border: solid transparent;\r\n  content: \" \";\r\n  height: 0;\r\n  width: 0;\r\n  position: absolute;\r\n  pointer-events: none;\r\n}\r\n.messages .message .text_wrapper::after {\r\n  border-width: 13px;\r\n  margin-top: 0px;\r\n}\r\n.messages .message .text_wrapper::before {\r\n  border-width: 15px;\r\n  margin-top: -2px;\r\n}\r\n.messages .message .text_wrapper .text {\r\n  font-size: 18px;\r\n  font-weight: 300;\r\n}\r\n.messages .message .text_wrapper .user {\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n}\r\n\r\n[placeholder]:empty:before {\r\n    content: attr(placeholder);\r\n    color: #555; \r\n}\r\n\r\n[placeholder]:empty:focus:before {\r\n    content: \"\";\r\n}\r\n.fa-sign-out {\r\n  font-size: 1.5em;\r\n}\r\n.fa-plus-square-o {\r\n  font-size: 1.5em;\r\n  vertical-align: bottom;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 497:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" *ngIf=\"loggedUser()\">\n\t<div class=\"card-group\">\n\t\t<div class=\"card col-md-4 flex-col\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t{{user.name}} <i class=\"fa pull-right fa-sign-out\" aria-hidden=\"true\" (click)=\"logOut()\"></i>\n\t\t\t</div>\n\t\t\t<ul class=\"list-group list-group-flush flex-grow\" *ngIf=\"channels\">\n\t\t\t\t<li *ngFor=\"let chn of channels\" class=\"list-group-item\" [ngClass]=\"chn.active ? 'active' : ''\">{{chn.name}}</li>\n\t\t\t</ul>\n\t\t\t<div class=\"card-footer\">\n\t\t\t\t<i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i> Add channel\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"card col-md-8 flex-col\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\tChat\n\t\t\t</div>\n\t\t\t<div class=\"card-block card-msg flex-grow\">\n\t\t\t\t<ul class=\"messages\" *ngIf=\"messages\">\n\t\t\t\t\t<li *ngFor=\"let message of messages\" class=\"message\" [ngClass]=\"[\n\t\t\t\t\t\t\t\tisMine(message) ? 'right' : 'left',\n\t\t\t\t\t\t\t\tmessage.first? 'first' : ''\n\t\t\t\t\t\t\t\t]\">\n\t\t\t\t\t\t<div class=\"avatar\"></div>\n\t\t\t\t\t\t<div class=\"text_wrapper\">\n\t\t\t\t\t\t\t<span class=\"user\" *ngIf=\"message.first\">{{message.user.name}}</span>\n\t\t\t\t\t\t\t<div class=\"text\">\n\t\t\t\t\t\t\t\t{{message.text}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"card-footer\">\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input id=\"btn-input\" type=\"text\" contenteditable=true class=\"form-control input-sm\" (keyup.enter)=\"sendMsg()\" placeholder=\"Type your message here...\"\n\t\t\t\t\t\tautocomplete=\"off\" [(ngModel)]=\"messageText\">\n\t\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t\t<button class=\"btn btn-warning btn-sm\" id=\"btn-chat\" (click)='sendMsg()'>\n\t\t\t\t\t\t\t\tSend</button>\n\t\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n</div>\n\n<div class=\"container\" *ngIf=\"!loggedUser()\">\n\t<label for=\"lgFormGroupInput\" class=\"col-sm-8 col-form-label col-form-label-lg\">Select your username:</label>\n\t<div class=\"col-sm-8\">\n\t\t<input type=\"text\" [(ngModel)]=\"tempUsername\" (keyup.enter)=\"logInBtn()\" class=\"form-control form-control-lg\" id=\"lgFormGroupInput\">\n\t\t<button (click)=\"logInBtn()\" class=\"btn btn-primary\">Confirm</button>\n\t</div>\n</div>"

/***/ }),

/***/ 520:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(314);


/***/ })

},[521]);
//# sourceMappingURL=main.bundle.js.map