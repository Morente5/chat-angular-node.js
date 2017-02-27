webpackJsonp([1,5],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(name, avatar, status, id) {
        if (avatar === void 0) { avatar = ''; }
        if (status === void 0) { status = ''; }
        if (id === void 0) { id = ''; }
        this.name = name;
        this.avatar = avatar;
        this.status = status;
        this.id = id;
    }
    User.prototype.logout = function () { };
    return User;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/user.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_channel__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_message__ = __webpack_require__(288);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SocketService = (function () {
    function SocketService() {
        var _this = this;
        this.subjectChannels = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.subjectTyping = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.subjectUsers = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.subjectCurrentUser = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](''));
        this.subjectLoggedIn = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.subjectReady = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.subjectMessage = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]('');
        this.subjectChannels.subscribe(function (channels) { return _this.channels = channels; });
        this.subjectUsers.subscribe(function (users) { return _this.users = users; });
        this.subjectCurrentUser.subscribe(function (usr) { return _this.loggedUser = usr; });
        this.subjectLoggedIn.subscribe(function (log) { return _this.loggedIn = log; });
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__();
        this.delivery = new Delivery(this.socket);
        this.socket.on('load', function (channels, users) {
            var tempPublicChannels = channels
                .map(function (channel) { return new __WEBPACK_IMPORTED_MODULE_4__model_channel__["a" /* Channel */](channel.priv, channel.description, channel.id, new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](''), 'chat.png'); });
            var tempUsers = users.map(function (user) { return new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](user.name, user.avatar, user.status, user.id); });
            if (_this.loggedIn) {
                var tempPrivateChannels_1 = [];
                users.forEach(function (user) {
                    if (user.name !== _this.loggedUser.name) {
                        tempPrivateChannels_1.push(new __WEBPACK_IMPORTED_MODULE_4__model_channel__["a" /* Channel */](true, user.status, user.name, user, user.avatar));
                    }
                });
                _this.subjectUsers.next(tempUsers);
                _this.subjectChannels.next(tempPublicChannels.concat(tempPrivateChannels_1));
                _this.subjectReady.next(true);
            }
        });
        this.socket.on('logged-in', function (user) {
            var tempUser = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](user.name, user.avatar, user.status, user.id);
            _this.subjectCurrentUser.next(tempUser);
            _this.subjectLoggedIn.next(true);
        });
        this.socket.on('message', function (message) {
            var tempMessage = new __WEBPACK_IMPORTED_MODULE_5__model_message__["a" /* Message */](message.author, message.channel, message.text, message.first);
            _this.subjectMessage.next(tempMessage);
        });
        this.socket.on('typing', function (user, channel) {
            var chnID = channel.priv ? user.id : channel.id;
            _this.channels[_this.channels.findIndex(function (chn) { return chnID === chn.id; })].typing.push(new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](user.name, user.avatar, user.status, user.id));
            console.log(_this.channels[_this.channels.findIndex(function (chn) { return chnID === chn.id; })]);
            _this.subjectTyping.next(_this.channels);
        });
        this.socket.on('stop-typing', function (user, channel) {
            var chnID = channel.priv ? user.id : channel.id;
            var i = _this.channels.findIndex(function (chn) { return chnID === chn.id; });
            var j = _this.channels[i].typing.findIndex(function (usr) { return user.id === usr.id; });
            _this.channels[i].typing.splice(j, 1);
            _this.subjectTyping.next(_this.channels);
            console.log('stoptyping', user, _this.channels.find(function (chn) { return chnID === chn.id; }));
        });
        this.delivery.on('delivery.connect', function (delivery) {
            $('input[type=submit]').click(function (evt) {
                var file = $('input[type=file]')[0].files[0];
                //let extraParams = {foo: 'bar'};
                delivery.send(file /*, extraParams*/);
                evt.preventDefault();
            });
        });
        this.delivery.on('send.success', function (fileUID) {
            console.log('file was successfully sent.');
        });
        this.delivery.on('receive.start', function (fileUID) {
            console.log('receiving a file!');
        });
        this.delivery.on('receive.success', function (file) {
            var params = file.params;
            if (file.isImage()) {
                $('img').attr('src', file.dataURL());
            }
            ;
        });
    }
    SocketService.prototype.login = function (user) {
        this.socket.emit('login', user);
    };
    SocketService.prototype.logout = function () {
        this.socket.emit('logout');
        this.subjectLoggedIn.next(false);
        this.subjectCurrentUser.next(null);
    };
    SocketService.prototype.sendMsg = function (message) {
        this.socket.emit('sendMessage', message);
    };
    SocketService.prototype.typing = function (channel) {
        this.socket.emit('sendTyping', this.loggedUser, channel);
    };
    SocketService.prototype.stopTyping = function (channel) {
        this.socket.emit('sendStopTyping', this.loggedUser, channel);
    };
    SocketService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/socket.service.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Channel; });
var Channel = (function () {
    function Channel(priv, description, id, user, avatar, typing) {
        if (priv === void 0) { priv = true; }
        if (typing === void 0) { typing = []; }
        this.typing = [];
        this.priv = priv;
        this.id = priv ? user.id : id;
        this.user = priv ? user : null;
        this.description = priv ? user.status : description;
        this.avatar = avatar;
        this.typing = typing;
    }
    return Channel;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channel.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message(author, channel, text, first) {
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

/***/ 322:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 322;


/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(443);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/main.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_window_component__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_channels_channels_component__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_chat_chat_input_chat_input_component__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_chat_chat_messages_chat_messages_component__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_chat_chat_status_chat_status_component__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_user_user_component__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_channel_add_channel_add_component__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_channels_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_chat_chat_video_chat_video_component__ = __webpack_require__(440);
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
                __WEBPACK_IMPORTED_MODULE_12__components_channel_add_channel_add_component__["a" /* ChannelAddComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_chat_chat_video_chat_video_component__["a" /* ChatVideoComponent */]
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
            providers: [__WEBPACK_IMPORTED_MODULE_15__services_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_13__services_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_14__services_channels_service__["a" /* ChannelsService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__chat_window_component__["a" /* WindowComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/app.module.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login_service__ = __webpack_require__(80);
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



var WindowComponent = (function () {
    function WindowComponent(socketService, loginService, elRef) {
        var _this = this;
        this.socketService = socketService;
        this.loginService = loginService;
        this.elRef = elRef;
        this.ready = false;
        this.socketService.subjectLoggedIn.subscribe(function (logged) { return _this.loggedIn = logged; });
        this.socketService.subjectReady.subscribe(function (ready) { return _this.ready = ready; });
        this.socketService.subjectMessage.subscribe(function (message) {
            $('chat-messages').animate({ scrollTop: $('chat-messages').prop('scrollHeight') }, 300);
            //const objDiv = document.querySelector('.card-msg');
            //objDiv.scrollTop = objDiv.scrollHeight;
        });
    }
    WindowComponent.prototype.ngOnInit = function () {
        this.loginService.loadLogin();
    };
    WindowComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-window',
            template: __webpack_require__(526),
            styles: [__webpack_require__(511)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_login_service__["a" /* LoginService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _c) || Object])
    ], WindowComponent);
    return WindowComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-window.component.js.map

/***/ }),

/***/ 435:
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
            template: __webpack_require__(527),
            styles: [__webpack_require__(512)]
        }), 
        __metadata('design:paramtypes', [])
    ], ChannelAddComponent);
    return ChannelAddComponent;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channel-add.component.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_channels_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_socket_service__ = __webpack_require__(27);
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
    function ChannelsComponent(loginService, channelsService, socketService) {
        var _this = this;
        this.loginService = loginService;
        this.channelsService = channelsService;
        this.socketService = socketService;
        this.channels = [];
        this.showChannels = [];
        this.socketService.subjectCurrentUser.subscribe(function (user) { return _this.loggedUser = user; });
        this.socketService.subjectChannels.subscribe(function (channels) {
            _this.channels = channels;
            _this.showChannels = _this.channels.map(function (channel) {
                channel['showname'] = channel.priv ? "@" + channel.user.name : "#" + channel.id;
                return channel;
            });
        });
        this.channelsService.subjectSelectedChannel.subscribe(function (channel) {
            _this.selectedChannel = channel;
        });
    }
    ChannelsComponent.prototype.ngOnInit = function () {
        //this.enterChannel(this.channels[0]);
    };
    ChannelsComponent.prototype.enterChannel = function (channel) {
        this.channelsService.enterChannel(channel);
    };
    ChannelsComponent.prototype.isSelected = function (channel) {
        return channel.id === this.selectedChannel.id;
    };
    ChannelsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'channels',
            template: __webpack_require__(528),
            styles: [__webpack_require__(513)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_channels_service__["a" /* ChannelsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_channels_service__["a" /* ChannelsService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["a" /* SocketService */]) === 'function' && _c) || Object])
    ], ChannelsComponent);
    return ChannelsComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channels.component.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_channels_service__ = __webpack_require__(79);
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
    function ChatInputComponent(channelsService) {
        var _this = this;
        this.channelsService = channelsService;
        this.typeInterval = 0;
        this.channelsService.subjectSelectedChannel.subscribe(function (channel) {
            _this.selectedChannel = channel;
            if (_this.typeInterval) {
                window.clearTimeout(_this.typeInterval);
                _this.typeInterval = 0;
                _this.channelsService.stopTyping();
            }
        });
    }
    ChatInputComponent.prototype.ngOnInit = function () {
    };
    ChatInputComponent.prototype.sendMsg = function () {
        if (this.messageText) {
            var tempMessage = this.messageText.trim();
            if (tempMessage) {
                this.channelsService.sendMsg(tempMessage);
            }
            this.messageText = '';
        }
    };
    ChatInputComponent.prototype.uploadFile = function () {
    };
    ChatInputComponent.prototype.typing = function (event) {
        var _this = this;
        // console.log(event.key);
        if (!this.typeInterval && event.key !== 'Enter' && event.key !== 'Backspace') {
            this.channelsService.typing();
        }
        else {
            window.clearTimeout(this.typeInterval);
            this.typeInterval = 0;
        }
        if (event.key !== 'Enter' && event.key !== 'Backspace') {
            this.typeInterval = window.setTimeout(function () {
                _this.channelsService.stopTyping();
                _this.typeInterval = 0;
            }, 6000);
        }
        else {
            this.channelsService.stopTyping();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], ChatInputComponent.prototype, "fileInput", void 0);
    ChatInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-input',
            template: __webpack_require__(529),
            styles: [__webpack_require__(514)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_channels_service__["a" /* ChannelsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_channels_service__["a" /* ChannelsService */]) === 'function' && _b) || Object])
    ], ChatInputComponent);
    return ChatInputComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-input.component.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_channels_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socket_service__ = __webpack_require__(27);
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
    function ChatMessagesComponent(channelsService, socketService) {
        var _this = this;
        this.channelsService = channelsService;
        this.socketService = socketService;
        this.channelsService.subjectMessages.subscribe(function (messages) { return _this.messages = messages; });
        this.channelsService.subjectSelectedChannel.subscribe(function (channel) { return _this.selectedChannel = channel; });
        this.socketService.subjectCurrentUser.subscribe(function (user) { return _this.loggedUser = user; });
    }
    ChatMessagesComponent.prototype.ngOnInit = function () {
    };
    ChatMessagesComponent.prototype.isMine = function (message) {
        return this.loggedUser.name === message.author.name;
    };
    ChatMessagesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-messages',
            template: __webpack_require__(530),
            styles: [__webpack_require__(515)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_channels_service__["a" /* ChannelsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_channels_service__["a" /* ChannelsService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_socket_service__["a" /* SocketService */]) === 'function' && _b) || Object])
    ], ChatMessagesComponent);
    return ChatMessagesComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-messages.component.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_channels_service__ = __webpack_require__(79);
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
    function ChatStatusComponent(channelsService, socketService) {
        var _this = this;
        this.channelsService = channelsService;
        this.socketService = socketService;
        this.channels = [];
        this.typing = [];
        this.channelShowName = '';
        this.statusMsg = '';
        this.typingMsgs = {};
        this.socketService.subjectChannels.subscribe(function (channels) {
            _this.channels = channels;
        });
        this.socketService.subjectTyping.subscribe(function (channels) {
            _this.typing = channels;
            if (channels.length !== 0) {
                channels.forEach(function (channel) {
                    _this.typingMsgs[channel.id] = channel.typing;
                });
            }
        });
        this.channelsService.subjectSelectedChannel.subscribe(function (channel) {
            if (channel) {
                _this.channelShowName = channel.priv ? "@" + channel.user.name : "#" + channel.id;
                _this.selectedChannel = channel;
            }
        });
    }
    ChatStatusComponent.prototype.ngOnInit = function () {
    };
    ChatStatusComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-status',
            template: __webpack_require__(531),
            styles: [__webpack_require__(516)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_channels_service__["a" /* ChannelsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_channels_service__["a" /* ChannelsService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */]) === 'function' && _b) || Object])
    ], ChatStatusComponent);
    return ChatStatusComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-status.component.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatVideoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChatVideoComponent = (function () {
    function ChatVideoComponent(elementRef) {
        this.elementRef = elementRef;
    }
    ChatVideoComponent.prototype.ngOnInit = function () {
        navigator.getUserMedia({ audio: true, video: true }, this.successCallback, this.errorCallback);
    };
    ChatVideoComponent.prototype.successCallback = function (stream) {
        this.videosrc = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
    };
    ChatVideoComponent.prototype.errorCallback = function (err) {
        console.log('Ocurrió el siguiente error: ' + err.name);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('view'), 
        __metadata('design:type', Object)
    ], ChatVideoComponent.prototype, "canvas", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('video'), 
        __metadata('design:type', Object)
    ], ChatVideoComponent.prototype, "video", void 0);
    ChatVideoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-video',
            template: __webpack_require__(532),
            styles: [__webpack_require__(517)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object])
    ], ChatVideoComponent);
    return ChatVideoComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/chat-video.component.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(123);
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
    function LoginComponent(loginService, socketService) {
        var _this = this;
        this.loginService = loginService;
        this.socketService = socketService;
        this.avatarImages = ['man.png',
            'boy.png',
            'girl.png',
            'man-2.png',
            'man-3.png'];
        this.socketService.subjectUsers.subscribe(function (users) { return _this.users = users; });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.loginBtn = function () {
        if (this.inputUsername && this.inputUsername.trim()) {
            this.loginService.login(new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](this.inputUsername.trim().replace(/[\W_]+/g, '-'), this.selectedAvatar || 'man-3.png', this.inputStatus));
        }
    };
    LoginComponent.prototype.available = function () {
        var _this = this;
        if (this.inputUsername) {
            return !this.users.find(function (user) { return user.name === _this.inputUsername.trim().replace(/[\W_]+/g, '-'); });
        }
        return false;
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',
            template: __webpack_require__(533),
            styles: [__webpack_require__(518)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_login_service__["a" /* LoginService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_socket_service__["a" /* SocketService */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/login.component.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(123);
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
    function UserComponent(socketService, loginService) {
        var _this = this;
        this.socketService = socketService;
        this.loginService = loginService;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */]('');
        this.socketService.subjectCurrentUser.subscribe(function (user) {
            _this.user = user;
        });
        this.socketService.subjectLoggedIn.subscribe(function (log) {
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
            template: __webpack_require__(534),
            styles: [__webpack_require__(519)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_login_service__["a" /* LoginService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_login_service__["a" /* LoginService */]) === 'function' && _b) || Object])
    ], UserComponent);
    return UserComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/user.component.js.map

/***/ }),

/***/ 443:
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

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".list-group {\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow-y: auto;\r\n  overflow-x: hidden;\r\n  background-color: #f9fef6;\r\n}\r\n\r\n.list-group-flush .list-group-item {\r\n  -ms-flex-negative: 0;\r\n      flex-shrink: 0;\r\n  border-radius: 0;\r\n  border-bottom: 1px solid #B3E095;\r\n}\r\n.list-group-item {\r\n  background-color: #fdfefc;\r\n  border: 1px solid #B3E095;\r\n  border-left: 0;\r\n  border-right: 0;\r\n}\r\n\r\n.list-group-item.active {\r\n    color: whitesmoke;\r\n    background-color: #B3E095;\r\n    border-color: #B3E095;\r\n}\r\n\r\n.list-group-item .username, .list-group-item .userstatus {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n\r\n.list-group-item .userdata {\r\n  max-width: calc(100% - 85px);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".fa-upload {\r\n    font-size: 1.5em;\r\n    padding: 3px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".card-group {\r\n  height:100%;\r\n}\r\n\r\n.card {\r\n  border-radius: 0;\r\n  min-height: 100%;\r\n  padding:0;\r\n}\r\n\r\n\r\n.chat {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.card-msg {\r\n  padding: 0;\r\n}\r\n\r\n.card-block {\r\n  overflow-y: scroll;\r\n  -ms-overflow-style: -ms-autohiding-scrollbar;\r\n}\r\n\r\n\r\n.messages {\r\n  position: relative;\r\n  list-style: none;\r\n  padding: 20px;\r\n  margin: 0;\r\n  height: 100%;\r\n}\r\n\r\n.messages .message {\r\n  clear: both;\r\n  overflow: hidden;\r\n  margin-bottom: 10px;\r\n  -webkit-transition:all 0.5s linear;\r\n  transition: all 0.5s linear;\r\n}\r\n.messages .message.left .avatar {\r\n  background-color: #7FD7F7;\r\n  float: left;\r\n}\r\n.messages .message.left .text_wrapper {\r\n  background-color: #BFEBFB;\r\n  margin-left: 20px;\r\n}\r\n.messages .message.left .text_wrapper::after, .messages .message.left .text_wrapper::before {\r\n  right: 100%;\r\n  border-right-color: #BFEBFB;\r\n}\r\n.messages .message.left .text {\r\n  color: #333;\r\n}\r\n.messages .message.right .avatar {\r\n  background-color: #8FD57F;\r\n  float: right;\r\n}\r\n.messages .message.right .text_wrapper {\r\n  background-color: #C7EABF;\r\n  margin-right: 20px;\r\n  float: right;\r\n  text-align: right;\r\n  line-height: 1.2;\r\n}\r\n.messages .message.right .text_wrapper::after, .messages .message.right .text_wrapper::before {\r\n  left: 100%;\r\n  border-left-color: #C7EABF;\r\n}\r\n.messages .message.right .text {\r\n  color: #333;\r\n}\r\n\r\n.messages .message .avatar {\r\n  width: 45px;\r\n  height: 45px;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  margin: 0!important;\r\n}\r\n.messages .message:not(.first) {\r\n  margin-top: -5px;\r\n}\r\n.messages .message:not(.first) .avatar {\r\n  opacity: 0;\r\n}\r\n.messages .message:not(.first) .text_wrapper::after, .messages .message:not(.first) .text_wrapper::before {\r\n  border-left-color: transparent;\r\n  border-right-color: transparent;\r\n}\r\n.messages .message .text_wrapper {\r\n  display: inline-block;\r\n  padding: 10px 20px;\r\n  border-radius: 6px;\r\n  max-width: calc(100% - 85px);\r\n  min-width: 100px;\r\n  position: relative;\r\n}\r\n.messages .message .text_wrapper::after, .messages .message .text_wrapper:before {\r\n  top: 10px;\r\n  border: solid transparent;\r\n  content: \" \";\r\n  height: 0;\r\n  width: 0;\r\n  position: absolute;\r\n  pointer-events: none;\r\n}\r\n.messages .message .text_wrapper::after {\r\n  border-width: 13px;\r\n  margin-top: 0px;\r\n}\r\n.messages .message .text_wrapper::before {\r\n  border-width: 0px;\r\n}\r\n.messages .message .text_wrapper .text {\r\n  font-size: 18px;\r\n  font-weight: 300;\r\n}\r\n.messages .message .text_wrapper .user {\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n}\r\n\r\nul.messages, .expand {\r\n  width:100%\r\n}\r\n\r\ntime {\r\n  color: dimgrey;\r\n  font-size: small;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".center {\r\n  margin: auto;\r\n  position: absolute;\r\n  top: 40vh; left: 0; bottom: 0; right: 0;\r\n}\r\n\r\n.input_hidden {\r\n    position: absolute;\r\n    left: -9999px;\r\n}\r\n\r\n.selected {\r\n    background-color: #ccc;\r\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n}\r\n\r\n.avatar label {\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n#loginForm .avatar {\r\n  border-radius: 50%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "#currentUser .userdata{\r\n  max-width: calc(100% - 120px);\r\n  display: inline-block;\r\n}\r\n\r\n#currentUser .username, #currentUser .userstatus{\r\n\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    \r\n    overflow: hidden;\r\n}\r\n\r\n#currentUser .avatar {\r\n  vertical-align: initial;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 526:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" *ngIf=\"loggedIn\">\n\t<div class=\"card-group\">\n\t\t<div class=\"card col-md-4 flex-col\">\n\t\t\t<user class=\"card-header\"></user>\n\t\t\t<channels class=\"flex-grow\"></channels>\n\t\t\t<channel-add class=\"card-footer\"></channel-add>\n\t\t</div>\n\n\t\t<div class=\"card col-md-8 flex-col\">\n\t\t\t<chat-status></chat-status>\n\t\t\t<chat-video></chat-video>\n\t\t\t<chat-messages id=\"scroll\" class=\"card-block card-msg flex-grow\"></chat-messages>\n\t\t\t<chat-input class=\"card-footer\"></chat-input>\n\t\t</div>\n\n\t</div>\n</div>\n\n<div class=\"container\" *ngIf=\"!loggedIn && ready\">\n\t<login></login>\n</div>"

/***/ }),

/***/ 527:
/***/ (function(module, exports) {

module.exports = "<div>\n  <i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i> Add channel\n</div>"

/***/ }),

/***/ 528:
/***/ (function(module, exports) {

module.exports = "<ul *ngIf=\"channels\" class=\"list-group list-group-flush\">\n  <li \n    *ngFor=\"let chn of showChannels\"\n    class=\"list-group-item\"\n    [ngClass]=\"isSelected(chn) ? 'active' : ''\"\n    (click)=\"enterChannel(chn)\"\n  >\n      <img [src]=\"'assets/avatars/'+ chn.avatar || chn.user.avatar\" class=\"img-fluid avatar\"/>\n      <div class=\"flex-column userdata\">\n        <div class=\"username\">{{chn.showname}}</div>\n        <div class=\"userstatus\"><small>{{chn.description || chn.user.status}}</small></div>\n      </div>\n\n  </li>\n</ul>\n"

/***/ }),

/***/ 529:
/***/ (function(module, exports) {

module.exports = "<div class=\"input-group\">\n  <input id=\"btn-input\"\n    type=\"text\"\n    contenteditable=true\n    class=\"form-control input-sm\"\n    (keyup.enter)=\"sendMsg()\"\n    [placeholder]=\"!selectedChannel.id ? 'First select a channel...' : 'Type your message here...'\"\n    autocomplete=\"off\"\n    [(ngModel)]=\"messageText\"\n    (keyup)=\"typing($event)\"\n    [disabled]=\"!selectedChannel.id\"\n  >\n  <span class=\"input-group-btn\">\n    <input class=\"btn btn-warning btn-sm\" type=\"submit\" id=\"btn-chat\" (click)='sendMsg()' (ngSubmit)=\"sendFile()\"  [disabled]=\"!selectedChannel.id\"\n      value=\"Send\"\n    />\n    </span>\n    <span class=\"input-group-btn\">\n    <label class=\"btn btn-info btn-file btn-sm\" id=\"btn-chat-upload\" [ngClass]=\"{disabled: !selectedChannel.id}\"><!--(click)='uploadFile()'-->\n      <i class=\"fa fa-upload\" aria-hidden=\"true\"></i><input type=\"file\" style=\"display: none;\" #fileInput [disabled]=\"!selectedChannel.id\" (change)=\"upload(file.files)\">\n    </label>\n    <span *ngIf=\"Property\" ></span>\n  </span>\n</div>"

/***/ }),

/***/ 530:
/***/ (function(module, exports) {

module.exports = "<ul class=\"messages flex-grow\">\n  <span *ngIf=\"selectedChannel.id && messages[selectedChannel.id]\" class=\"expand\">\n    <li *ngFor=\"let message of messages[selectedChannel.id]\"\n        class=\"message\"\n        [ngClass]=\"[\n          isMine(message) ? 'right' : 'left',\n          message.first? 'first' : ''\n          ]\"\n    >\n      <div class=\"avatar\"></div>\n      <div class=\"text_wrapper\">\n        <span class=\"user\" *ngIf=\"message.first\">{{message.author.name}}</span>\n        <div class=\"text\">\n          {{message.text}}\n        </div>\n        <time>{{message.sentAt.toLocaleString()}}</time>\n      </div>\n    </li>\n  </span>\n</ul>\n"

/***/ }),

/***/ 531:
/***/ (function(module, exports) {

module.exports = "<div class=\"card-header\">\n  <span *ngIf=\"selectedChannel.id\" >{{channelShowName}}</span>&nbsp;\n  <span *ngIf=\"typingMsgs && typingMsgs[selectedChannel.id] && typingMsgs[selectedChannel.id].length !== 0\">\n  <em class=\"pull-right\" *ngIf=\"typingMsgs[selectedChannel.id].length === 1\" >\n    <strong>{{typingMsgs[selectedChannel.id][0].name}}</strong> is typing...\n  </em>\n  <em class=\"pull-right\" *ngIf=\"typingMsgs[selectedChannel.id].length > 1\" >\n    <span *ngFor=\"let item of typingMsgs[selectedChannel.id].slice(0, -2)\" ><strong>{{item.name}}</strong>, </span>\n    <span *ngFor=\"let item of typingMsgs[selectedChannel.id].slice(-2, typingMsgs[selectedChannel.id].length-1)\" ><strong>{{item.name}}</strong> </span>and\n    <span *ngFor=\"let item of typingMsgs[selectedChannel.id].slice(-1, typingMsgs[selectedChannel.id].length)\" ><strong>{{item.name}}</strong> </span>are typing...\n  </em>\n  </span>\n</div>"

/***/ }),

/***/ 532:
/***/ (function(module, exports) {

module.exports = "<div>\n  <video #video id=\"video\" width=\"20%\" height=\"20%\" src=\"{{videosrc}}\" controls>\n\n\n  </video>\n  <canvas #canvas id=\"view\"></canvas>\n</div>"

/***/ }),

/***/ 533:
/***/ (function(module, exports) {

module.exports = "<div class=\"center row justify-content-center\">\n\t<div class=\"col-sm-12 col-md-8\">\n\t\t<form action=\"\" id=\"loginForm\">\n\t\t\t<div class=\"form-group input-group\">\n\t\t\t\t<span class=\"input-group-addon\"><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></span>\n\t\t\t\t<input [(ngModel)]=\"inputUsername\" [ngClass]=\"{'has-danger': !available()}\" (keyup.enter)=\"loginBtn()\" class=\"form-control\"\n\t\t\t\t\ttype=\"text\" name='username' placeholder=\"username\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group input-group\">\n\t\t\t\t<input [(ngModel)]=\"inputStatus\" (keyup.enter)=\"loginBtn()\" class=\"form-control\" type=\"text\" name='username' placeholder=\"status\"\n\t\t\t\t/>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group input-group avatarSelect\">\n\t\t\t\t<div class=\"col\" *ngFor=\"let img of avatarImages\">\n\t\t\t\t\t<input type=\"radio\" name=\"avatar\" [(ngModel)]=\"selectedAvatar\" [id]=\"img\" [value]=\"img\" class=\"input_hidden\" />\n\t\t\t\t\t<label for=\"img\"><img [src]=\"'assets/avatars/'+img\" class=\"img-fluid avatar\" [ngClass]=\"{'selected' : selectedAvatar == img}\"  (click)=\"selectedAvatar = img\"/></label>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-def btn-block\" (click)=\"loginBtn()\" [disabled]=\"!available()\">Login</button>\n\t\t\t</div>\n\t\t\t<div class=\"form-group text-center\">\n\t\t\t\t<a href=\"https://github.com/Morente5/chat-node.js/\"><i class=\"fa fa-github\" aria-hidden=\"true\"></i> View this project on GitHub</a>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>"

/***/ }),

/***/ 534:
/***/ (function(module, exports) {

module.exports = "<div id=\"currentUser\">\n  <img [src]=\"'assets/avatars/'+ user.avatar\" class=\"img-fluid avatar\"/>\n  <div class=\"flex-column userdata\">\n        <div class=\"username\">{{user.name}}</div>\n        <div class=\"userstatus\"><small>{{user.status}}</small></div>\n  </div>\n  <i class=\"fa pull-right fa-sign-out\" aria-hidden=\"true\" (click)=\"logout()\"></i>\n</div>"

/***/ }),

/***/ 556:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(323);


/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_channel__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_message__ = __webpack_require__(288);
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
    function ChannelsService(socketService) {
        var _this = this;
        this.socketService = socketService;
        this.messages = {};
        this.subjectMessages = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this.messages);
        this.subjectSelectedChannel = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](new __WEBPACK_IMPORTED_MODULE_3__model_channel__["a" /* Channel */](null, '', null, null));
        this.subjectMessages.subscribe(function (messages) { return _this.messages = messages; });
        this.socketService.subjectMessage.subscribe(function (message) {
            if (message) {
                var chnID = message.author.name !== _this.loggedUser.name && message.channel.priv ? message.author.id : message.channel.id;
                if (!_this.messages.hasOwnProperty(chnID)) {
                    _this.messages[chnID] = [];
                }
                message.first = !_this.messages.hasOwnProperty(chnID) ||
                    _this.messages[chnID].length === 0 ||
                    message.author.name !== _this.messages[chnID].slice(-1).pop().author.name;
                _this.messages[chnID].push(message);
                _this.subjectMessages.next(_this.messages);
            }
            //console.log('mensajes', this.messages);
        });
        this.socketService.subjectCurrentUser.subscribe(function (usr) { return _this.loggedUser = usr; });
        this.socketService.subjectChannels.subscribe(function (channels) { return _this.channels = channels; });
        this.subjectSelectedChannel.subscribe(function (chn) { return _this.selectedChannel = chn; });
    }
    ChannelsService.prototype.enterChannel = function (channel) {
        this.subjectSelectedChannel.next(new __WEBPACK_IMPORTED_MODULE_3__model_channel__["a" /* Channel */](channel.priv, channel.description, channel.id, channel.user, channel.avatar));
    };
    ChannelsService.prototype.sendMsg = function (messageText) {
        var chnID = this.selectedChannel.id;
        var userName = this.loggedUser.name;
        var newMessage = new __WEBPACK_IMPORTED_MODULE_4__model_message__["a" /* Message */](this.loggedUser, this.selectedChannel, messageText);
        this.socketService.sendMsg(newMessage);
    };
    ChannelsService.prototype.typing = function () {
        this.socketService.typing(this.selectedChannel);
    };
    ChannelsService.prototype.stopTyping = function () {
        this.socketService.stopTyping(this.selectedChannel);
    };
    ChannelsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === 'function' && _a) || Object])
    ], ChannelsService);
    return ChannelsService;
    var _a;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/channels.service.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_2_local_storage__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_2_local_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_2_local_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__(123);
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
    function LoginService(ls, socketService) {
        var _this = this;
        this.ls = ls;
        this.socketService = socketService;
        this.socketService.subjectCurrentUser.subscribe(function (usr) { return _this.loggedUser = usr; });
        this.socketService.subjectLoggedIn.subscribe(function (log) { return _this.loggedIn = log; });
        this.socketService.subjectUsers.subscribe(function (users) { return _this.users = users; });
    }
    LoginService.prototype.loadLogin = function () {
        if (this.loggedUserLS() && !this.chosen(this.loggedUserLS(), this.users)) {
            this.login(this.loggedUserLS());
        }
    };
    ;
    LoginService.prototype.login = function (user) {
        this.ls.set('user', user);
        this.socketService.login(user);
    };
    LoginService.prototype.logout = function () {
        this.ls.clearAll();
        this.socketService.logout();
    };
    // Local Storage
    LoginService.prototype.loggedUserLS = function () {
        if (this.ls.get('user') &&
            this.ls.get('user').hasOwnProperty('name') &&
            this.ls.get('user')['name'] !== '') {
            var userName = this.ls.get('user')['name'], userAvatar = this.ls.get('user')['avatar'], userStatus = this.ls.get('user')['status'];
            return new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* User */](userName, userAvatar, userStatus);
        }
    };
    // Name chosen
    LoginService.prototype.chosen = function (testUser, users) {
        return users.find(function (user) { return user.name === testUser.name; });
    };
    LoginService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular_2_local_storage__["LocalStorageService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_angular_2_local_storage__["LocalStorageService"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === 'function' && _b) || Object])
    ], LoginService);
    return LoginService;
    var _a, _b;
}());
//# sourceMappingURL=D:/Users/Alejandro/OneDrive/Documentos/DAW/DWEC/Node Server/chat/public/src/login.service.js.map

/***/ })

},[557]);
//# sourceMappingURL=main.bundle.js.map