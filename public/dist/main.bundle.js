webpackJsonp([1,4],{

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(name, avatar, status) {
        if (avatar === void 0) { avatar = ''; }
        if (status === void 0) { status = ''; }
        this.name = name;
        this.avatar = avatar;
        this.status = status;
    }
    User.prototype.logout = function () { };
    return User;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/user.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChannelsService = (function () {
    function ChannelsService() {
    }
    ChannelsService.prototype.enterChannel = function (channel) {
    };
    ChannelsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ChannelsService);
    return ChannelsService;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channels.service.js.map

/***/ }),

/***/ 316:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 316;


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(436);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/main.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_window_component__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_channels_channels_component__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_chat_chat_input_chat_input_component__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_chat_chat_messages_chat_messages_component__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_chat_chat_status_chat_status_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_user_user_component__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_channel_add_channel_add_component__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_login_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_channels_service__ = __webpack_require__(285);
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
                __WEBPACK_IMPORTED_MODULE_5__chat_window_component__["a" /* WindowComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_channels_channels_component__["a" /* ChannelsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_chat_chat_input_chat_input_component__["a" /* ChatInputComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_chat_chat_messages_chat_messages_component__["a" /* ChatMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_chat_chat_status_chat_status_component__["a" /* ChatStatusComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_channel_add_channel_add_component__["a" /* ChannelAddComponent */]
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
            providers: [__WEBPACK_IMPORTED_MODULE_6__components_channels_channels_component__["a" /* ChannelsComponent */], __WEBPACK_IMPORTED_MODULE_13__services_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_14__services_channels_service__["a" /* ChannelsService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__chat_window_component__["a" /* WindowComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/app.module.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
import * as io from 'socket.io-client';
import { LocalStorageService } from 'angular-2-local-storage';
*/
var WindowComponent = (function () {
    function WindowComponent(loginService) {
        var _this = this;
        this.loginService = loginService;
        this.loginService.loggedInObs().subscribe(function (logged) { return _this.loggedIn = logged; });
        this.loginService.loadLogin();
    }
    WindowComponent.prototype.ngOnInit = function () {
        this.loginService.loadLogin();
    };
    WindowComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-window',
            template: __webpack_require__(516),
            styles: [__webpack_require__(504)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */]) === 'function' && _a) || Object])
    ], WindowComponent);
    return WindowComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-window.component.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelAddComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChannelAddComponent = (function () {
    function ChannelAddComponent() {
    }
    ChannelAddComponent.prototype.ngOnInit = function () {
    };
    ChannelAddComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'channel-add',
            template: __webpack_require__(517),
            styles: [__webpack_require__(505)]
        }), 
        __metadata('design:paramtypes', [])
    ], ChannelAddComponent);
    return ChannelAddComponent;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channel-add.component.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChannelsComponent = (function () {
    function ChannelsComponent(loginService) {
        var _this = this;
        this.loginService = loginService;
        this.channels = [];
        this.showchannels = [];
        this.loginService.availableChannelsObs().subscribe(function (channels) {
            _this.channels = channels;
            _this.showchannels = _this.channels.map(function (channel) {
                channel['showname'] = channel.id.replace("@" + _this.loginService.currentUser.name, '');
                return channel;
            });
        });
    }
    ChannelsComponent.prototype.ngOnInit = function () {
    };
    ChannelsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'channels',
            template: __webpack_require__(518),
            styles: [__webpack_require__(506)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */]) === 'function' && _a) || Object])
    ], ChannelsComponent);
    return ChannelsComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channels.component.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChatInputComponent = (function () {
    function ChatInputComponent() {
    }
    ChatInputComponent.prototype.ngOnInit = function () {
    };
    ChatInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-input',
            template: __webpack_require__(519),
            styles: [__webpack_require__(507)]
        }), 
        __metadata('design:paramtypes', [])
    ], ChatInputComponent);
    return ChatInputComponent;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-input.component.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessagesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChatMessagesComponent = (function () {
    function ChatMessagesComponent() {
        this.messages = [];
    }
    ChatMessagesComponent.prototype.ngOnInit = function () {
    };
    ChatMessagesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-messages',
            template: __webpack_require__(520),
            styles: [__webpack_require__(508)]
        }), 
        __metadata('design:paramtypes', [])
    ], ChatMessagesComponent);
    return ChatMessagesComponent;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-messages.component.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatStatusComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChatStatusComponent = (function () {
    function ChatStatusComponent() {
    }
    ChatStatusComponent.prototype.ngOnInit = function () {
    };
    ChatStatusComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-status',
            template: __webpack_require__(521),
            styles: [__webpack_require__(509)]
        }), 
        __metadata('design:paramtypes', [])
    ], ChatStatusComponent);
    return ChatStatusComponent;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-status.component.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_user__ = __webpack_require__(181);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(loginService) {
        var _this = this;
        this.loginService = loginService;
        this.loginService.getErrorObs().subscribe(function (nameError) { return _this.nameError = nameError; });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.loginBtn = function () {
        if (this.inputUsername.trim()) {
            var tempUser = new __WEBPACK_IMPORTED_MODULE_2__model_user__["a" /* User */](this.inputUsername.trim());
            if (!this.loginService.chosen(tempUser)) {
                this.loginService.login(tempUser);
            }
        }
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',
            template: __webpack_require__(522),
            styles: [__webpack_require__(510)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */]) === 'function' && _a) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/login.component.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_user__ = __webpack_require__(181);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserComponent = (function () {
    function UserComponent(loginService, zone) {
        var _this = this;
        this.loginService = loginService;
        this.zone = zone;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__model_user__["a" /* User */]('hola');
        this.nombre = 'hola';
        this.loginService.currentUserObs().subscribe(function (user) {
            console.log(user.name);
            _this.user = user;
            //this.nombre = user.name;
            _this.zone.run(function () { return _this.nombre = user.name; });
        });
        this.loginService.loggedInObs().subscribe(function (log) {
            _this.logged = log;
        });
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    UserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user',
            template: __webpack_require__(523),
            styles: [__webpack_require__(511)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _b) || Object])
    ], UserComponent);
    return UserComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/user.component.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message__ = __webpack_require__(435);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Channel; });

var Channel = (function () {
    function Channel(users, priv, id) {
        if (priv === void 0) { priv = true; }
        this.users = users;
        this.sortUsers();
        this.priv = priv;
        this.id = this.priv ? this.users.map(function (user) { return ("@" + user.name); }).join('') : id;
        this.avatar = '';
        this.messages = [];
    }
    Channel.prototype.addUser = function (user) {
        if (!this.priv) {
            this.users.push(user);
            this.sortUsers();
        }
    };
    Channel.prototype.sortUsers = function () {
        this.users.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
    };
    Channel.prototype.addMessage = function (author, text) {
        var msg;
        // if message is first
        if (!this.messages.slice(-1)[0] || !this.messages.slice(-1)[0].isFrom(author)) {
            msg = this.messages.push(new __WEBPACK_IMPORTED_MODULE_0__message__["a" /* Message */](author, text, this, true));
        }
        else {
            msg = this.messages.push(new __WEBPACK_IMPORTED_MODULE_0__message__["a" /* Message */](author, text, this));
        }
        this.messages.push(msg);
    };
    return Channel;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channel.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message(author, text, channel, first) {
        if (first === void 0) { first = false; }
        this.author = author;
        this.channel = channel;
        this.isRead = false;
        this.sentAt = new Date();
        this.text = text;
        this.first = first;
    }
    Message.prototype.isFrom = function (user) {
        return user.name === this.author.name;
    };
    return Message;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/message.js.map

/***/ }),

/***/ 436:
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

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, ".list-group {\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow-y: auto;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, ".messages {\r\n  position: relative;\r\n  list-style: none;\r\n  padding: 20px;\r\n  margin: 0;\r\n  height: 100%;\r\n}\r\n\r\n.messages .message {\r\n  clear: both;\r\n  overflow: hidden;\r\n  margin-bottom: 10px;\r\n  -webkit-transition: all 0.5s linear;\r\n  transition: all 0.5s linear;\r\n}\r\n.messages .message.left .avatar {\r\n  background-color: #7FD7F7;\r\n  float: left;\r\n}\r\n.messages .message.left .text_wrapper {\r\n  background-color: #BFEBFB;\r\n  margin-left: 20px;\r\n}\r\n.messages .message.left .text_wrapper::after, .messages .message.left .text_wrapper::before {\r\n  right: 100%;\r\n  border-right-color: #BFEBFB;\r\n}\r\n.messages .message.left .text {\r\n  color: #333;\r\n}\r\n.messages .message.right .avatar {\r\n  background-color: #8FD57F;\r\n  float: right;\r\n}\r\n.messages .message.right .text_wrapper {\r\n  background-color: #C7EABF;\r\n  margin-right: 20px;\r\n  float: right;\r\n}\r\n.messages .message.right .text_wrapper::after, .messages .message.right .text_wrapper::before {\r\n  left: 100%;\r\n  border-left-color: #C7EABF;\r\n}\r\n.messages .message.right .text {\r\n  color: #333;\r\n}\r\n\r\n.messages .message .avatar {\r\n  width: 60px;\r\n  height: 60px;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n}\r\n.messages .message:not(.first) {\r\n  margin-top: -5px;\r\n}\r\n.messages .message:not(.first) .avatar {\r\n  opacity: 0;\r\n}\r\n.messages .message .text_wrapper {\r\n  display: inline-block;\r\n  padding: 10px 20px;\r\n  border-radius: 6px;\r\n  max-width: calc(100% - 85px);\r\n  min-width: 100px;\r\n  position: relative;\r\n}\r\n.messages .message .text_wrapper::after, .messages .message .text_wrapper:before {\r\n  top: 18px;\r\n  border: solid transparent;\r\n  content: \" \";\r\n  height: 0;\r\n  width: 0;\r\n  position: absolute;\r\n  pointer-events: none;\r\n}\r\n.messages .message .text_wrapper::after {\r\n  border-width: 13px;\r\n  margin-top: 0px;\r\n}\r\n.messages .message .text_wrapper::before {\r\n  border-width: 15px;\r\n  margin-top: -2px;\r\n}\r\n.messages .message .text_wrapper .text {\r\n  font-size: 18px;\r\n  font-weight: 300;\r\n}\r\n.messages .message .text_wrapper .user {\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n}\r\n\r\nul.messages {\r\n  width:100%\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" *ngIf=\"loggedIn\">\n\t<div class=\"card-group\">\n\t\t<div class=\"card col-md-4 flex-col\">\n\t\t\t<user class=\"card-header\"></user>\n\t\t\t<channels class=\"flex-grow\"></channels>\n\t\t\t<channel-add class=\"card-footer\"></channel-add>\n\t\t</div>\n\n\t\t<div class=\"card col-md-8 flex-col\">\n\t\t\t<chat-status></chat-status>\n\t\t\t<chat-messages class=\"flex-grow\"></chat-messages>\n\t\t\t<chat-input class=\"card-footer\"></chat-input>\n\t\t</div>\n\n\t</div>\n</div>\n\n<div class=\"container\" *ngIf=\"!loggedIn\">\n\t<login></login>\n</div>"

/***/ }),

/***/ 517:
/***/ (function(module, exports) {

module.exports = "<div>\n  <i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i> Add channel\n</div>"

/***/ }),

/***/ 518:
/***/ (function(module, exports) {

module.exports = "<ul *ngIf=\"channels\" class=\"list-group list-group-flush\">\n  <li *ngFor=\"let chn of showchannels\" class=\"list-group-item\" [ngClass]=\"chn.active ? 'active' : ''\">{{chn.showname}}</li>\n</ul>\n"

/***/ }),

/***/ 519:
/***/ (function(module, exports) {

module.exports = "<div class=\"input-group\">\n  <input id=\"btn-input\"\n    type=\"text\"\n    contenteditable=true\n    class=\"form-control input-sm\"\n    (keyup.enter)=\"sendMsg()\"\n    placeholder=\"Type your message here...\"\n    autocomplete=\"off\"\n    [(ngModel)]=\"messageText\"\n  >\n  <span class=\"input-group-btn\">\n    <button class=\"btn btn-warning btn-sm\" id=\"btn-chat\" (click)='sendMsg()'>\n      Send\n    </button>\n  </span>\n</div>"

/***/ }),

/***/ 520:
/***/ (function(module, exports) {

module.exports = "<ul class=\"messages flex-grow\">\n  <div *ngIf=\"messages\">\n    <li *ngFor=\"let message of messages\"\n        class=\"message\"\n        [ngClass]=\"[\n          isMine(message) ? 'right' : 'left',\n          message.first? 'first' : ''\n          ]\"\n    >\n      <div class=\"avatar\"></div>\n      <div class=\"text_wrapper\">\n        <span class=\"user\" *ngIf=\"message.first\">{{message.user.name}}</span>\n        <div class=\"text\">\n          {{message.text}}\n        </div>\n      </div>\n    </li>\n  </div>\n</ul>"

/***/ }),

/***/ 521:
/***/ (function(module, exports) {

module.exports = "<div class=\"card-header\">\n  Chat\n</div>"

/***/ }),

/***/ 522:
/***/ (function(module, exports) {

module.exports = "<label for=\"lgFormGroupInput\" class=\"col-sm-8 col-form-label col-form-label-lg\">Select your username:</label>\n\t<div class=\"col-sm-8\">\n\t\t<input type=\"text\" [(ngModel)]=\"inputUsername\" (keyup.enter)=\"loginBtn()\" class=\"form-control form-control-lg\" id=\"lgFormGroupInput\">\n\t\t<div *ngIf=\"nameError\">Try another name</div>\n    <button (click)=\"loginBtn()\" class=\"btn btn-primary\">Confirm</button>\n\t</div>"

/***/ }),

/***/ 523:
/***/ (function(module, exports) {

module.exports = "<div>\n  <span>{{nombre}}</span>\n  <i class=\"fa pull-right fa-sign-out\" aria-hidden=\"true\" (click)=\"logout()\"></i>\n</div>"

/***/ }),

/***/ 546:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(317);


/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_user__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_channel__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__channels_service__ = __webpack_require__(285);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginService = (function () {
    function LoginService(ls, channelsService) {
        this.ls = ls;
        this.channelsService = channelsService;
        this.subjectCurrentUser = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.subjectChannels = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.subjectUsers = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.users = [];
        this.subjectError = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.subjectLoggedIn = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    LoginService.prototype.loadLogin = function () {
        var _this = this;
        this.availableChannelsObs().subscribe(function (chnls) { return _this.channels = chnls; });
        this.loggedUsersObs().subscribe(function (usrs) { return _this.users = usrs; });
        this.currentUserObs().subscribe(function (usr) { return _this.currentUser = usr; });
        this.loggedInObs().subscribe(function (log) { return _this.loggedIn = log; });
        this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__(); // establish connection
        this.socket.on('load', function (channels, users) {
            _this.subjectChannels.next(channels);
            _this.subjectUsers.next(users);
            // Login
            if (_this.loggedUserLS() && !_this.chosen()) {
                _this.subjectError.next(false);
                _this.login(_this.loggedUserLS());
                _this.load(channels, users);
            }
            else {
                //this.subjectError.next(true);
                _this.logout();
            }
        });
    };
    LoginService.prototype.login = function (user) {
        var _this = this;
        this.socket.on('update', function (channels, users) {
            _this.load(channels, users);
        });
        this.setUserLS(user);
        this.subjectCurrentUser.next(user);
        this.subjectLoggedIn.next(true);
        this.socket.emit('loggedin', this.currentUser);
        // this.channelsService.enterChannel(this.channels[0]);
    };
    LoginService.prototype.logout = function () {
        this.logoutLS();
        this.subjectLoggedIn.next(false);
        this.subjectCurrentUser.next(new __WEBPACK_IMPORTED_MODULE_2__model_user__["a" /* User */](''));
        this.socket.emit('loggedoff');
    };
    LoginService.prototype.load = function (channels, users) {
        var _this = this;
        this.subjectChannels.next(channels);
        this.subjectUsers.next(users);
        var tempChannels = [];
        this.users.forEach(function (user) {
            if (user.name !== _this.currentUser.name) {
                tempChannels.push(new __WEBPACK_IMPORTED_MODULE_3__model_channel__["a" /* Channel */]([_this.currentUser, user]));
            }
        });
        this.subjectChannels.next(channels.concat(tempChannels));
        console.log(this.channels);
    };
    // Observables
    LoginService.prototype.currentUserObs = function () {
        return this.subjectCurrentUser.asObservable();
    };
    LoginService.prototype.getErrorObs = function () {
        return this.subjectError.asObservable();
    };
    LoginService.prototype.availableChannelsObs = function () {
        return this.subjectChannels.asObservable();
    };
    LoginService.prototype.loggedUsersObs = function () {
        return this.subjectUsers.asObservable();
    };
    LoginService.prototype.loggedInObs = function () {
        return this.subjectLoggedIn.asObservable();
    };
    // Local Storage
    LoginService.prototype.loggedUserLS = function () {
        if (this.ls.get('user') && this.ls.get('user')['name'] !== undefined && this.ls.get('user')['name'] !== '') {
            return new __WEBPACK_IMPORTED_MODULE_2__model_user__["a" /* User */](this.ls.get('user')['name'], this.ls.get('user')['avatar'], this.ls.get('user')['status']);
        }
    };
    LoginService.prototype.setUserLS = function (user) {
        this.ls.set('user', user);
        //console.log(user.name, 'added to LS');
    };
    LoginService.prototype.logoutLS = function () {
        this.ls.clearAll();
    };
    // Name chosen
    LoginService.prototype.chosen = function (testUser) {
        if (testUser === void 0) { testUser = this.loggedUserLS(); }
        this.users.forEach(function (user) {
            if (user.name === testUser.name) {
                return true;
            }
        });
        return false;
    };
    LoginService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__["LocalStorageService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_angular_2_local_storage__["LocalStorageService"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__channels_service__["a" /* ChannelsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__channels_service__["a" /* ChannelsService */]) === 'function' && _b) || Object])
    ], LoginService);
    return LoginService;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/login.service.js.map

/***/ })

},[547]);
//# sourceMappingURL=main.bundle.js.map