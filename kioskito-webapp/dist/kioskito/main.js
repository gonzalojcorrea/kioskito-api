"use strict";
(self["webpackChunkkioskito"] = self["webpackChunkkioskito"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);


class AppComponent {
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 1,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 2181:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_ROUTES: () => (/* binding */ APP_ROUTES)
/* harmony export */ });
/* harmony import */ var _core_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/auth/auth.guard */ 8486);

const APP_ROUTES = [{
  path: 'login',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_login_login_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/auth/login/login.component */ 461)).then(m => m.LoginComponent)
}, {
  path: 'dashboard',
  canActivate: [_core_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard],
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_dashboard_dashboard_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/dashboard/dashboard.routes */ 4103)).then(m => m.DASHBOARD_ROUTES)
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
}, {
  path: '**',
  redirectTo: 'login'
}];

/***/ }),

/***/ 8486:
/*!*****************************************!*\
  !*** ./src/app/core/auth/auth.guard.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authGuard: () => (/* binding */ authGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 5524);



const authGuard = () => {
  const auth = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router);
  if (auth.isAuthenticated()) {
    return true;
  }
  return router.parseUrl('/login');
};

/***/ }),

/***/ 5524:
/*!*******************************************!*\
  !*** ./src/app/core/auth/auth.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);


class AuthService {
  constructor() {
    this.state = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)({
      token: null,
      email: null
    });
    this.isAuthenticated = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)(() => !!this.state().token);
    this.email = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)(() => this.state().email);
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state.set(parsed);
      } catch {}
    }
  }
  login(email, password) {
    // For now accept any non-empty credentials; simulate token
    if (email && password) {
      const token = 'fake-token-' + Math.random().toString(36).slice(2);
      this.state.set({
        token,
        email
      });
      localStorage.setItem('auth', JSON.stringify(this.state()));
      return true;
    }
    return false;
  }
  logout() {
    this.state.set({
      token: null,
      email: null
    });
    localStorage.removeItem('auth');
  }
  static {
    this.ɵfac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 2985:
/*!********************************************!*\
  !*** ./src/app/shared/material.imports.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MATERIAL_IMPORTS: () => (/* binding */ MATERIAL_IMPORTS),
/* harmony export */   provideMaterial: () => (/* binding */ provideMaterial)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/toolbar */ 9552);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ 7049);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ 943);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 3777);









const MATERIAL_IMPORTS = [_angular_material_button__WEBPACK_IMPORTED_MODULE_0__.MatButtonModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbarModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_4__.MatListModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInputModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule];
const provideMaterial = () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.importProvidersFrom)(...MATERIAL_IMPORTS);

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js */ 4124);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _app_app_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.routes */ 2181);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _app_shared_material_imports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/shared/material.imports */ 2985);








(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_5__.provideRouter)(_app_app_routes__WEBPACK_IMPORTED_MODULE_2__.APP_ROUTES), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.provideHttpClient)(), (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__.provideAnimations)(), (0,_app_shared_material_imports__WEBPACK_IMPORTED_MODULE_3__.provideMaterial)()]
}).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map