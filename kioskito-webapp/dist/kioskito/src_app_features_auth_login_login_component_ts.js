"use strict";
(self["webpackChunkkioskito"] = self["webpackChunkkioskito"] || []).push([["src_app_features_auth_login_login_component_ts"],{

/***/ 461:
/*!********************************************************!*\
  !*** ./src/app/features/auth/login/login.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _core_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/auth/auth.service */ 5524);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);




















function LoginComponent_mat_error_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "El email es obligatorio");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LoginComponent_mat_error_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Formato inv\u00E1lido");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LoginComponent_mat_error_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "La contrase\u00F1a es obligatoria");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LoginComponent_mat_error_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "M\u00EDnimo 3 caracteres");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LoginComponent_mat_progress_spinner_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-progress-spinner", 24);
  }
}
function LoginComponent_mat_hint_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-hint", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Us\u00E1 tus credenciales corporativas.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LoginComponent_p_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.error());
  }
}
class LoginComponent {
  constructor(fb, auth, router) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.form = this.fb.group({
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email]],
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(3)]]
    });
    this.loading = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    this.error = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    this.showPassword = false;
    this.year = new Date().getFullYear();
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    const {
      email,
      password
    } = this.form.value;
    const success = this.auth.login(email, password);
    if (success) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.error.set('Invalid credentials');
    }
    this.loading.set(false);
  }
  static {
    this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: LoginComponent,
      selectors: [["app-login"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 59,
      vars: 13,
      consts: [[1, "auth-shell"], [1, "brand-panel"], [1, "brand-content"], [1, "logo-circle"], [1, "subtitle"], [1, "feature-list"], [1, "form-panel"], ["appearance", "outlined", 1, "login-card"], [1, "title"], [1, "helper"], ["autocomplete", "off", 1, "login-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matPrefix", ""], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "usuario@empresa.com"], [4, "ngIf"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], [3, "fontIcon"], [1, "actions"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "submit-btn", 3, "disabled"], ["mode", "indeterminate", "diameter", "18", 4, "ngIf"], ["class", "hint", 4, "ngIf"], ["class", "error", 4, "ngIf"], [1, "footer-note"], ["mode", "indeterminate", "diameter", "18"], [1, "hint"], [1, "error"]],
      template: function LoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "inventory_2");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Inventory Control");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Gesti\u00F3n centralizada de stock, movimientos y trazabilidad en tiempo real.");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "ul", 5)(11, "li")(12, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "check_circle");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " Control de lotes");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "li")(16, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "check_circle");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " Alertas de reposici\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "li")(20, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "check_circle");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, " Auditor\u00EDa completa");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 6)(24, "mat-card", 7)(25, "h2", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Iniciar sesi\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "p", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Acced\u00E9 al panel para administrar inventarios.");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "form", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_29_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-form-field", 11)(31, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "mat-icon", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "mail");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](35, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, LoginComponent_mat_error_36_Template, 2, 0, "mat-error", 14)(37, LoginComponent_mat_error_37_Template, 2, 0, "mat-error", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "mat-form-field", 11)(39, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Contrase\u00F1a");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "mat-icon", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "lock");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](43, "input", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "button", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_44_listener() {
            return ctx.togglePassword();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](45, "mat-icon", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](46, LoginComponent_mat_error_46_Template, 2, 0, "mat-error", 14)(47, LoginComponent_mat_error_47_Template, 2, 0, "mat-error", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "div", 18)(49, "button", 19)(50, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "login");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Ingresar");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](54, LoginComponent_mat_progress_spinner_54_Template, 1, 0, "mat-progress-spinner", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](55, LoginComponent_mat_hint_55_Template, 2, 0, "mat-hint", 21)(56, LoginComponent_p_56_Template, 2, 1, "p", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          let tmp_1_0;
          let tmp_2_0;
          let tmp_6_0;
          let tmp_7_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](29);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.hasError("email"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.showPassword ? "Ocultar" : "Mostrar");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("fontIcon", ctx.showPassword ? "visibility_off" : "visibility");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (tmp_6_0 = ctx.form.get("password")) == null ? null : tmp_6_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (tmp_7_0 = ctx.form.get("password")) == null ? null : tmp_7_0.hasError("minlength"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.form.invalid || ctx.loading());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.error());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A9 ", ctx.year, " Kioskito \u00B7 Gesti\u00F3n de Inventarios");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCard, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__.MatProgressSpinner],
      styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.auth-shell[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  font-family: Roboto, Arial, sans-serif;\n}\n\n.brand-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  position: relative;\n  background: radial-gradient(circle at 30% 30%, #255b99, #0d1f33 70%);\n  color: #fff;\n  overflow: hidden;\n}\n\n.brand-panel[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.05) 75%, transparent 75%, transparent);\n  background-size: 40px 40px;\n  mix-blend-mode: overlay;\n  opacity: 0.4;\n}\n\n.brand-content[_ngcontent-%COMP%] {\n  max-width: 420px;\n  position: relative;\n  z-index: 1;\n}\n\n.logo-circle[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #4fc3f7, #1976d2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 6px 18px -4px rgba(0, 0, 0, 0.4);\n}\n\n.logo-circle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: #fff;\n}\n\n.brand-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 2.2rem;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem;\n  line-height: 1.4;\n  font-size: 1rem;\n  opacity: 0.9;\n}\n\n.feature-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 0.5rem;\n}\n\n.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n  opacity: 0.95;\n}\n\n.feature-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #4fc3f7;\n}\n\n.form-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  background: linear-gradient(135deg, #f5f7fa, #e4e9f0);\n}\n\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  padding: 2.25rem 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.25);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  background: #fff;\n  border-radius: 20px;\n}\n\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #0d1f33;\n  letter-spacing: 0.3px;\n}\n\n.helper[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.9rem;\n  color: #455a64;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-top: 0.25rem;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.actions[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n}\n\n.submit-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 44px;\n  padding: 0 1.25rem;\n  font-weight: 500;\n  letter-spacing: 0.3px;\n}\n\n.submit-btn[_ngcontent-%COMP%]   mat-progress-spinner[_ngcontent-%COMP%] {\n  margin-left: 0.25rem;\n}\n\n.hint[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: block;\n  font-size: 0.75rem;\n  color: #607d8b;\n}\n\n.error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  margin-top: 0.5rem;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n\n.footer-note[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  text-align: center;\n  font-size: 0.65rem;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  color: #90a4ae;\n}\n\n  .mat-mdc-form-field .mat-icon {\n  opacity: 0.9;\n}\n\n@media (max-width: 1080px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .brand-panel[_ngcontent-%COMP%] {\n    padding: 2.5rem 2rem;\n  }\n  .form-panel[_ngcontent-%COMP%] {\n    padding: 2rem 1.25rem;\n  }\n  .brand-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n}\n@media (max-width: 640px) {\n  .brand-panel[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .form-panel[_ngcontent-%COMP%] {\n    flex: 1;\n    background: linear-gradient(135deg, #f0f3f8, #e4e9f0);\n  }\n  .login-card[_ngcontent-%COMP%] {\n    box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.2);\n    padding: 2rem 1.5rem;\n    border-radius: 18px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFPLGNBQUE7QUFFUDs7QUFEQTtFQUFhLGFBQUE7RUFBYSxpQkFBQTtFQUFpQixzQ0FBQTtBQU8zQzs7QUFOQTtFQUFjLE9BQUE7RUFBTyxhQUFBO0VBQWEsbUJBQUE7RUFBbUIsdUJBQUE7RUFBdUIsYUFBQTtFQUFhLGtCQUFBO0VBQWtCLG9FQUFBO0VBQW9FLFdBQUE7RUFBVyxnQkFBQTtBQWtCMUw7O0FBakJBO0VBQXFCLFdBQUE7RUFBVyxrQkFBQTtFQUFrQixRQUFBO0VBQVEscU1BQUE7RUFBcUwsMEJBQUE7RUFBMEIsdUJBQUE7RUFBdUIsWUFBQTtBQTJCaFM7O0FBMUJBO0VBQWdCLGdCQUFBO0VBQWdCLGtCQUFBO0VBQWtCLFVBQUE7QUFnQ2xEOztBQS9CQTtFQUFjLFdBQUE7RUFBVyxZQUFBO0VBQVksa0JBQUE7RUFBa0IscURBQUE7RUFBbUQsYUFBQTtFQUFhLG1CQUFBO0VBQW1CLHVCQUFBO0VBQXVCLHFCQUFBO0VBQXFCLDhDQUFBO0FBMkN0TDs7QUExQ0E7RUFBdUIsZUFBQTtFQUFlLFdBQUE7QUErQ3RDOztBQTlDQTtFQUFtQixtQkFBQTtFQUFrQixpQkFBQTtFQUFpQixnQkFBQTtFQUFnQixxQkFBQTtBQXFEdEU7O0FBcERBO0VBQVcsa0JBQUE7RUFBa0IsZ0JBQUE7RUFBZ0IsZUFBQTtFQUFlLFlBQUE7QUEyRDVEOztBQTFEQTtFQUFlLGdCQUFBO0VBQWdCLFVBQUE7RUFBVSxTQUFBO0VBQVMsYUFBQTtFQUFhLFdBQUE7QUFrRS9EOztBQWpFQTtFQUFrQixhQUFBO0VBQWEsbUJBQUE7RUFBbUIsV0FBQTtFQUFVLGlCQUFBO0VBQWdCLGFBQUE7QUF5RTVFOztBQXhFQTtFQUF3QixlQUFBO0VBQWUsY0FBQTtBQTZFdkM7O0FBNUVBO0VBQWEsT0FBQTtFQUFPLGFBQUE7RUFBYSxtQkFBQTtFQUFtQix1QkFBQTtFQUF1QixhQUFBO0VBQWEscURBQUE7QUFxRnhGOztBQXBGQTtFQUFhLFdBQUE7RUFBVyxnQkFBQTtFQUFnQixxQkFBQTtFQUFxQixhQUFBO0VBQWEsc0JBQUE7RUFBc0IsWUFBQTtFQUFZLGdEQUFBO0VBQTRDLHFDQUFBO0VBQWlDLGdCQUFBO0VBQWdCLG1CQUFBO0FBaUd6TTs7QUFoR0E7RUFBUSxTQUFBO0VBQVMsa0JBQUE7RUFBa0IsZ0JBQUE7RUFBZ0IsY0FBQTtFQUFjLHFCQUFBO0FBd0dqRTs7QUF2R0E7RUFBUyxtQkFBQTtFQUFrQixpQkFBQTtFQUFnQixjQUFBO0FBNkczQzs7QUE1R0E7RUFBYSxhQUFBO0VBQWEsc0JBQUE7RUFBc0IsU0FBQTtFQUFTLG1CQUFBO0FBbUh6RDs7QUFsSEE7RUFBYSxXQUFBO0FBc0hiOztBQXJIQTtFQUFVLGtCQUFBO0VBQWlCLGFBQUE7RUFBYSxtQkFBQTtBQTJIeEM7O0FBMUhBO0VBQWEsb0JBQUE7RUFBb0IsbUJBQUE7RUFBbUIsV0FBQTtFQUFVLGdCQUFBO0VBQWdCLGtCQUFBO0VBQWtCLGdCQUFBO0VBQWdCLHFCQUFBO0FBb0loSDs7QUFuSUE7RUFBa0Msb0JBQUE7QUF1SWxDOztBQXRJQTtFQUFPLGtCQUFBO0VBQWlCLGNBQUE7RUFBYyxrQkFBQTtFQUFpQixjQUFBO0FBNkl2RDs7QUE1SUE7RUFBUSxjQUFBO0VBQWMsa0JBQUE7RUFBaUIsa0JBQUE7RUFBaUIsZ0JBQUE7QUFtSnhEOztBQWxKQTtFQUFjLGtCQUFBO0VBQWlCLGtCQUFBO0VBQWtCLGtCQUFBO0VBQWlCLHFCQUFBO0VBQW9CLHlCQUFBO0VBQXlCLGNBQUE7QUEySi9HOztBQTFKQTtFQUF5QyxZQUFBO0FBOEp6Qzs7QUE3SkE7RUFDRTtJQUFhLHNCQUFBO0VBaUtiO0VBaEtBO0lBQWMsb0JBQUE7RUFtS2Q7RUFsS0E7SUFBYSxxQkFBQTtFQXFLYjtFQXBLQTtJQUFtQixlQUFBO0VBdUtuQjtBQUNGO0FBdEtBO0VBQ0U7SUFBYyxhQUFBO0VBeUtkO0VBeEtBO0lBQWEsT0FBQTtJQUFPLHFEQUFBO0VBNEtwQjtFQTNLQTtJQUFhLDhDQUFBO0lBQTBDLG9CQUFBO0lBQW9CLG1CQUFBO0VBZ0wzRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge2Rpc3BsYXk6YmxvY2s7fVxyXG4uYXV0aC1zaGVsbCB7ZGlzcGxheTpmbGV4O21pbi1oZWlnaHQ6MTAwdmg7Zm9udC1mYW1pbHk6Um9ib3RvLCBBcmlhbCwgc2Fucy1zZXJpZjt9XHJcbi5icmFuZC1wYW5lbCB7ZmxleDoxO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjNyZW07cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZDpyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDMwJSAzMCUsICMyNTViOTksICMwZDFmMzMgNzAlKTtjb2xvcjojZmZmO292ZXJmbG93OmhpZGRlbjt9XHJcbi5icmFuZC1wYW5lbDo6YWZ0ZXIge2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7aW5zZXQ6MDtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZyxyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIDI1JSx0cmFuc3BhcmVudCAyNSUsdHJhbnNwYXJlbnQgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMC4wNSkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMC4wNSkgNzUlLHRyYW5zcGFyZW50IDc1JSx0cmFuc3BhcmVudCk7YmFja2dyb3VuZC1zaXplOjQwcHggNDBweDttaXgtYmxlbmQtbW9kZTpvdmVybGF5O29wYWNpdHk6LjQ7fVxyXG4uYnJhbmQtY29udGVudCB7bWF4LXdpZHRoOjQyMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MTt9XHJcbi5sb2dvLWNpcmNsZSB7d2lkdGg6NzJweDtoZWlnaHQ6NzJweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzRmYzNmNywjMTk3NmQyKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLWJvdHRvbToxLjVyZW07Ym94LXNoYWRvdzowIDZweCAxOHB4IC00cHggcmdiYSgwLDAsMCwuNCk7fVxyXG4ubG9nby1jaXJjbGUgbWF0LWljb24ge2ZvbnQtc2l6ZTo0MHB4O2NvbG9yOiNmZmY7fVxyXG4uYnJhbmQtY29udGVudCBoMSB7bWFyZ2luOjAgMCAuNzVyZW07Zm9udC1zaXplOjIuMnJlbTtmb250LXdlaWdodDo2MDA7bGV0dGVyLXNwYWNpbmc6LjVweDt9XHJcbi5zdWJ0aXRsZSB7bWFyZ2luOjAgMCAxLjVyZW07bGluZS1oZWlnaHQ6MS40O2ZvbnQtc2l6ZToxcmVtO29wYWNpdHk6Ljk7fVxyXG4uZmVhdHVyZS1saXN0IHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzowO21hcmdpbjowO2Rpc3BsYXk6Z3JpZDtnYXA6LjVyZW07fVxyXG4uZmVhdHVyZS1saXN0IGxpIHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDouNXJlbTtmb250LXNpemU6LjlyZW07b3BhY2l0eTouOTU7fVxyXG4uZmVhdHVyZS1saXN0IG1hdC1pY29uIHtmb250LXNpemU6MThweDtjb2xvcjojNGZjM2Y3O31cclxuLmZvcm0tcGFuZWwge2ZsZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzoycmVtO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDEzNWRlZywjZjVmN2ZhLCNlNGU5ZjApO30gIFxyXG4ubG9naW4tY2FyZCB7d2lkdGg6MTAwJTttYXgtd2lkdGg6NDIwcHg7cGFkZGluZzoyLjI1cmVtIDJyZW07ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MS4yNXJlbTtib3gtc2hhZG93OjAgMTBweCAyOHB4IC04cHggcmdiYSgwLDAsMCwuMjUpO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMDgpO2JhY2tncm91bmQ6I2ZmZjtib3JkZXItcmFkaXVzOjIwcHg7fVxyXG4udGl0bGUge21hcmdpbjowO2ZvbnQtc2l6ZToxLjc1cmVtO2ZvbnQtd2VpZ2h0OjYwMDtjb2xvcjojMGQxZjMzO2xldHRlci1zcGFjaW5nOi4zcHg7fVxyXG4uaGVscGVyIHttYXJnaW46MCAwIC43NXJlbTtmb250LXNpemU6LjlyZW07Y29sb3I6IzQ1NWE2NDt9XHJcbi5sb2dpbi1mb3JtIHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxcmVtO21hcmdpbi10b3A6LjI1cmVtO31cclxuLmZ1bGwtd2lkdGgge3dpZHRoOjEwMCU7fVxyXG4uYWN0aW9ucyB7bWFyZ2luLXRvcDouNXJlbTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO31cclxuLnN1Ym1pdC1idG4ge2Rpc3BsYXk6aW5saW5lLWZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDouNXJlbTttaW4taGVpZ2h0OjQ0cHg7cGFkZGluZzowIDEuMjVyZW07Zm9udC13ZWlnaHQ6NTAwO2xldHRlci1zcGFjaW5nOi4zcHg7fVxyXG4uc3VibWl0LWJ0biBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciB7bWFyZ2luLWxlZnQ6LjI1cmVtO31cclxuLmhpbnQge21hcmdpbi10b3A6LjVyZW07ZGlzcGxheTpibG9jaztmb250LXNpemU6Ljc1cmVtO2NvbG9yOiM2MDdkOGI7fVxyXG4uZXJyb3Ige2NvbG9yOiNkMzJmMmY7bWFyZ2luLXRvcDouNXJlbTtmb250LXNpemU6Ljg1cmVtO2ZvbnQtd2VpZ2h0OjUwMDt9XHJcbi5mb290ZXItbm90ZSB7bWFyZ2luLXRvcDouNXJlbTt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6LjY1cmVtO2xldHRlci1zcGFjaW5nOi41cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2NvbG9yOiM5MGE0YWU7fVxyXG46Om5nLWRlZXAgLm1hdC1tZGMtZm9ybS1maWVsZCAubWF0LWljb24ge29wYWNpdHk6Ljk7fVxyXG5AbWVkaWEgKG1heC13aWR0aDogMTA4MHB4KSB7XHJcbiAgLmF1dGgtc2hlbGwge2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjt9XHJcbiAgLmJyYW5kLXBhbmVsIHtwYWRkaW5nOjIuNXJlbSAycmVtO31cclxuICAuZm9ybS1wYW5lbCB7cGFkZGluZzoycmVtIDEuMjVyZW07fVxyXG4gIC5icmFuZC1jb250ZW50IGgxIHtmb250LXNpemU6MnJlbTt9XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XHJcbiAgLmJyYW5kLXBhbmVsIHtkaXNwbGF5Om5vbmU7fVxyXG4gIC5mb3JtLXBhbmVsIHtmbGV4OjE7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCNmMGYzZjgsI2U0ZTlmMCk7fSBcclxuICAubG9naW4tY2FyZCB7Ym94LXNoYWRvdzowIDZweCAyMHB4IC02cHggcmdiYSgwLDAsMCwuMik7cGFkZGluZzoycmVtIDEuNXJlbTtib3JkZXItcmFkaXVzOjE4cHg7fVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 1134:
/*!**********************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/progress-spinner.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS: () => (/* binding */ MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS),
/* harmony export */   MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY: () => (/* binding */ MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY),
/* harmony export */   MatProgressSpinner: () => (/* binding */ MatProgressSpinner),
/* harmony export */   MatProgressSpinnerModule: () => (/* binding */ MatProgressSpinnerModule),
/* harmony export */   MatSpinner: () => (/* binding */ MatSpinner)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 4646);





/** Injection token to be used to override the default options for `mat-progress-spinner`. */
const _c0 = ["determinateSpinner"];
function MatProgressSpinner_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "circle", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("viewBox", ctx_r0._viewBox());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("stroke-dasharray", ctx_r0._strokeCircumference(), "px")("stroke-dashoffset", ctx_r0._strokeCircumference() / 2, "px")("stroke-width", ctx_r0._circleStrokeWidth(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("r", ctx_r0._circleRadius());
  }
}
const MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-progress-spinner-default-options', {
  providedIn: 'root',
  factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
  return {
    diameter: BASE_SIZE
  };
}
/**
 * Base reference size of the spinner.
 */
const BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 */
const BASE_STROKE_WIDTH = 10;
class MatProgressSpinner {
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress spinner. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  constructor(_elementRef, animationMode, defaults) {
    this._elementRef = _elementRef;
    this._defaultColor = 'primary';
    this._value = 0;
    this._diameter = BASE_SIZE;
    this._noopAnimations = animationMode === 'NoopAnimations' && !!defaults && !defaults._forceAnimations;
    this.mode = _elementRef.nativeElement.nodeName.toLowerCase() === 'mat-spinner' ? 'indeterminate' : 'determinate';
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }
      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }
  }
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this.mode === 'determinate' ? this._value : 0;
  }
  set value(v) {
    this._value = Math.max(0, Math.min(100, v || 0));
  }
  /** The diameter of the progress spinner (will set width and height of svg). */
  get diameter() {
    return this._diameter;
  }
  set diameter(size) {
    this._diameter = size || 0;
  }
  /** Stroke width of the progress spinner. */
  get strokeWidth() {
    return this._strokeWidth ?? this.diameter / 10;
  }
  set strokeWidth(value) {
    this._strokeWidth = value || 0;
  }
  /** The radius of the spinner, adjusted for stroke width. */
  _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }
  /** The view box of the spinner's svg element. */
  _viewBox() {
    const viewBox = this._circleRadius() * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }
  /** The stroke circumference of the svg circle. */
  _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius();
  }
  /** The dash offset of the svg circle. */
  _strokeDashOffset() {
    if (this.mode === 'determinate') {
      return this._strokeCircumference() * (100 - this._value) / 100;
    }
    return null;
  }
  /** Stroke width of the circle in percent. */
  _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }
  static {
    this.ɵfac = function MatProgressSpinner_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MatProgressSpinner)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MatProgressSpinner,
      selectors: [["mat-progress-spinner"], ["mat-spinner"]],
      viewQuery: function MatProgressSpinner_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._determinateCircle = _t.first);
        }
      },
      hostAttrs: ["role", "progressbar", "tabindex", "-1", 1, "mat-mdc-progress-spinner", "mdc-circular-progress"],
      hostVars: 18,
      hostBindings: function MatProgressSpinner_HostBindings(rf, ctx) {
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-valuemin", 0)("aria-valuemax", 100)("aria-valuenow", ctx.mode === "determinate" ? ctx.value : null)("mode", ctx.mode);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("mat-" + ctx.color);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.diameter, "px")("height", ctx.diameter, "px")("--mdc-circular-progress-size", ctx.diameter + "px")("--mdc-circular-progress-active-indicator-width", ctx.diameter + "px");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("_mat-animation-noopable", ctx._noopAnimations)("mdc-circular-progress--indeterminate", ctx.mode === "indeterminate");
        }
      },
      inputs: {
        color: "color",
        mode: "mode",
        value: [2, "value", "value", _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute],
        diameter: [2, "diameter", "diameter", _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute],
        strokeWidth: [2, "strokeWidth", "strokeWidth", _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute]
      },
      exportAs: ["matProgressSpinner"],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputTransformsFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 14,
      vars: 11,
      consts: [["circle", ""], ["determinateSpinner", ""], ["aria-hidden", "true", 1, "mdc-circular-progress__determinate-container"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__determinate-circle-graphic"], ["cx", "50%", "cy", "50%", 1, "mdc-circular-progress__determinate-circle"], ["aria-hidden", "true", 1, "mdc-circular-progress__indeterminate-container"], [1, "mdc-circular-progress__spinner-layer"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-left"], [3, "ngTemplateOutlet"], [1, "mdc-circular-progress__gap-patch"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-right"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__indeterminate-circle-graphic"], ["cx", "50%", "cy", "50%"]],
      template: function MatProgressSpinner_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatProgressSpinner_ng_template_0_Template, 2, 8, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "circle", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5)(7, "div", 6)(8, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](9, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](11, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](13, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          const circle_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("viewBox", ctx._viewBox());
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("stroke-dasharray", ctx._strokeCircumference(), "px")("stroke-dashoffset", ctx._strokeDashOffset(), "px")("stroke-width", ctx._circleStrokeWidth(), "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("r", ctx._circleRadius());
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", circle_r2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", circle_r2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", circle_r2);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet],
      styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-app-primary))}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatProgressSpinner, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-progress-spinner, mat-spinner',
      exportAs: 'matProgressSpinner',
      host: {
        'role': 'progressbar',
        'class': 'mat-mdc-progress-spinner mdc-circular-progress',
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        'tabindex': '-1',
        '[class]': '"mat-" + color',
        '[class._mat-animation-noopable]': `_noopAnimations`,
        '[class.mdc-circular-progress--indeterminate]': 'mode === "indeterminate"',
        '[style.width.px]': 'diameter',
        '[style.height.px]': 'diameter',
        '[style.--mdc-circular-progress-size]': 'diameter + "px"',
        '[style.--mdc-circular-progress-active-indicator-width]': 'diameter + "px"',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuemax]': '100',
        '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
        '[attr.mode]': 'mode'
      },
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      standalone: true,
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet],
      template: "<ng-template #circle>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__indeterminate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeCircumference() / 2\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class=\"mdc-circular-progress__determinate-container\" aria-hidden=\"true\" #determinateSpinner>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__determinate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeDashOffset()\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            class=\"mdc-circular-progress__determinate-circle\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class=\"mdc-circular-progress__indeterminate-container\" aria-hidden=\"true\">\n  <div class=\"mdc-circular-progress__spinner-layer\">\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__gap-patch\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n  </div>\n</div>\n",
      styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-app-primary))}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"]
    }]
  }], () => [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS]
    }]
  }], {
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _determinateCircle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['determinateSpinner']
    }],
    mode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute
      }]
    }],
    diameter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute
      }]
    }],
    strokeWidth: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute
      }]
    }]
  });
})();
/**
 * @deprecated Import Progress Spinner instead. Note that the
 *    `mat-spinner` selector isn't deprecated.
 * @breaking-change 16.0.0
 */
// tslint:disable-next-line:variable-name
const MatSpinner = MatProgressSpinner;
class MatProgressSpinnerModule {
  static {
    this.ɵfac = function MatProgressSpinnerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MatProgressSpinnerModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: MatProgressSpinnerModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatProgressSpinnerModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, MatProgressSpinner, MatSpinner],
      exports: [MatProgressSpinner, MatSpinner, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_features_auth_login_login_component_ts.js.map