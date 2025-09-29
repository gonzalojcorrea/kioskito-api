"use strict";
(self["webpackChunkkioskito"] = self["webpackChunkkioskito"] || []).push([["src_app_features_dashboard_layout_dashboard-layout_component_ts"],{

/***/ 5008:
/*!*************************************************************************!*\
  !*** ./src/app/features/dashboard/layout/dashboard-layout.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardLayoutComponent: () => (/* binding */ DashboardLayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 9552);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/auth/auth.service */ 5524);








class DashboardLayoutComponent {
  constructor(auth) {
    this.auth = auth;
  }
  logout() {
    this.auth.logout();
  }
  static {
    this.ɵfac = function DashboardLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DashboardLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: DashboardLayoutComponent,
      selectors: [["app-dashboard-layout"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 11,
      vars: 1,
      consts: [[1, "layout"], ["color", "primary", 1, "topbar"], [1, "logo"], [1, "spacer"], ["mat-button", "", "routerLink", "/dashboard"], ["mat-button", "", 3, "click"], [1, "content"]],
      template: function DashboardLayoutComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-toolbar", 1)(2, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Kioskito");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Home");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DashboardLayoutComponent_Template_button_click_7_listener() {
            return ctx.logout();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "main", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Logout (", ctx.auth.email(), ")");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton],
      styles: [".layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 1rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGFzaGJvYXJkL2xheW91dC9kYXNoYm9hcmQtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUFTLGFBQUE7RUFBYSxzQkFBQTtFQUFzQixpQkFBQTtBQUdoRDs7QUFGSTtFQUFTLGdCQUFBO0VBQWdCLE1BQUE7RUFBTSxXQUFBO0FBUW5DOztBQVBJO0VBQVMsY0FBQTtBQVdiOztBQVZJO0VBQVUsT0FBQTtFQUFPLGFBQUE7QUFlckIiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAubGF5b3V0IHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi1oZWlnaHQ6MTAwdmg7fVxuICAgIC50b3BiYXIge3Bvc2l0aW9uOnN0aWNreTt0b3A6MDt6LWluZGV4OjEwO31cbiAgICAuc3BhY2VyIHtmbGV4OjEgMSBhdXRvO31cbiAgICAuY29udGVudCB7ZmxleDoxO3BhZGRpbmc6MXJlbTt9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_dashboard_layout_dashboard-layout_component_ts.js.map