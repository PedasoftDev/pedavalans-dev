/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isPropValid)
/* harmony export */ });
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);




/***/ }),

/***/ "./node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memoize)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}




/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/client/css/global.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/client/css/global.scss ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_antd_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./antd.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/antd.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/normalize.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_overrides_prime_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./overrides/prime/index.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/index.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_overrides_antd_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./overrides/antd.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/antd.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_overrides_exalidraw_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./overrides/exalidraw.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/exalidraw.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_animations_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./animations.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/animations.css");
// Imports








var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_antd_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_overrides_prime_index_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_overrides_antd_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_overrides_exalidraw_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_animations_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --main-theme-color:#292F4C;\n}\n\n:root {\n  --color-highlight_blue: #cce5ff;\n  --color-basic_blue: #0073ea;\n  --color-dark_blue: #0060b9;\n  --color-bazooka: #f65f7c;\n  --color-snow_white: #ffffff;\n  --color-riverstone_gray: #f6f7fb;\n  --color-ui_grey: #dcdfec;\n  --color-wolf_gray: #c3c6d4;\n  --color-asphalt: #676879;\n  --color-mud_black: #323338;\n  --color-black: #000000;\n  --color-success: #258750;\n  --color-success-hover: #007038;\n  --color-success-highlight: #bbdbc9;\n  --color-error: #d83a52;\n  --color-error-hover: #b63546;\n  --color-error-highlight: #f4c3cb;\n  --color-link_color: #1f76c2;\n  --color-surface: #292f4c;\n  --primary-color: #0073ea;\n  --primary-hover-color: #0060b9;\n  --primary-selected-color: #cce5ff;\n  --primary-selected-hover-color: #aed4fc;\n  --primary-text-color: #292d34;\n  --text-color-on-primary: #ffffff;\n  --text-color-on-inverted: #ffffff;\n  --secondary-text-color: #676879;\n  --placeholder-color: #676879;\n  --icon-color: #676879;\n  --link-color: #1f76c2;\n  --primary-background-color: #ffffff;\n  --primary-background-hover-color: #dcdfec;\n  --secondary-background-color: #ffffff;\n  --grey-background-color: #f6f7fb;\n  --allgrey-background-color: #f6f7fb;\n  --inverted-color-background: #323338;\n  --disabled-background-color: #ecedf5;\n  --disabled-text-color: rgba(50, 51, 56, var(--disabled-component-opacity));\n  --positive-color: #258750;\n  --positive-color-hover: #007038;\n  --positive-color-selected: #bbdbc9;\n  --positive-color-selected-hover: #b5cec0;\n  --negative-color: #d83a52;\n  --negative-color-hover: #b63546;\n  --negative-color-selected: #f4c3cb;\n  --negative-color-selected-hover: #ecb7bf;\n  --private-color: #f65f7c;\n  --shareable-color: #a25ddc;\n  --ui-border-color: #c3c6d4;\n  --layout-border-color: #d0d4e4;\n  --box-shadow-xs: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);\n  --box-shadow-small: 0px 4px 8px rgba(0, 0, 0, 0.2);\n  --box-shadow-medium: 0px 6px 20px rgba(0, 0, 0, 0.2);\n  --box-shadow-large: 0px 15px 50px rgba(0, 0, 0, 0.3);\n  --color-grass_green: #037f4c;\n  --color-grass_green-hover: #116846;\n  --color-grass_green-selected: #81bfa5;\n  --color-done-green: #00c875;\n  --color-done-green-hover: #0f9b63;\n  --color-done-green-selected: #80e3ba;\n  --color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);\n  --color-bright-green: #9cd326;\n  --color-bright-green-hover: #7ca32b;\n  --color-bright-green-selected: #cde992;\n  --color-saladish: #cab641;\n  --color-saladish-hover: #9d8f3e;\n  --color-saladish-selected: #e4daa0;\n  --color-egg_yolk: #ffcb00;\n  --color-egg_yolk-hover: #c29e11;\n  --color-egg_yolk-selected: #ffe580;\n  --color-egg_yolk-rgb: 255,213,51;\n  --color-working_orange: #fdab3d;\n  --color-working_orange-hover: #c0873c;\n  --color-working_orange-selected: #fed59e;\n  --color-dark-orange: #ff642e;\n  --color-dark-orange-hover: #c25531;\n  --color-dark-orange-selected: #ffb196;\n  --color-peach: #ffadad;\n  --color-peach-hover: #c2888a;\n  --color-peach-selected: #ffd6d6;\n  --color-sunset: #ff7575;\n  --color-sunset-hover: #c26163;\n  --color-sunset-selected: #ffbaba;\n  --color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);\n  --color-stuck-red: #e2445c;\n  --color-stuck-red-hover: #ad3f51;\n  --color-stuck-red-selected: #f0a1ad;\n  --color-dark-red: #bb3354;\n  --color-dark-red-hover: #92334c;\n  --color-dark-red-selected: #dd99a9;\n  --color-sofia_pink: #ff158a;\n  --color-sofia_pink-hover: #c21e71;\n  --color-sofia_pink-selected: #ff8ac4;\n  --color-lipstick: #ff5ac4;\n  --color-lipstick-hover: #c24e9a;\n  --color-lipstick-selected: #fface1;\n  --color-bubble: #faa1f1;\n  --color-bubble-hover: #be80ba;\n  --color-bubble-selected: #fcd0f8;\n  --color-purple: #a25ddc;\n  --color-purple-hover: #8050ab;\n  --color-purple-selected: #d0aeed;\n  --color-dark_purple: #784bd1;\n  --color-dark_purple-hover: #6344a3;\n  --color-dark_purple-selected: #bba5e8;\n  --color-berry: #7e3b8a;\n  --color-berry-hover: #673971;\n  --color-berry-selected: #be9dc4;\n  --color-dark_indigo: #401694;\n  --color-dark_indigo-hover: #3c1f78;\n  --color-dark_indigo-selected: #a08bc9;\n  --color-indigo: #5559df;\n  --color-indigo-hover: #4b4ead;\n  --color-indigo-selected: #aaacef;\n  --color-navy: #225091;\n  --color-navy-hover: #274776;\n  --color-navy-selected: #90a7c8;\n  --color-bright-blue: #579bfc;\n  --color-bright-blue-hover: #4c7cc1;\n  --color-bright-blue-selected: #abcdfd;\n  --color-dark-blue: #0086c0;\n  --color-dark-blue-hover: #0f6d97;\n  --color-dark-blue-selected: #80c2df;\n  --color-aquamarine: #4eccc6;\n  --color-aquamarine-hover: #469e9b;\n  --color-aquamarine-selected: #a6e5e2;\n  --color-chili-blue: #66ccff;\n  --color-chili-blue-hover: #569ec3;\n  --color-chili-blue-selected: #b2e5ff;\n  --color-river: #68a1bd;\n  --color-river-hover: #588095;\n  --color-river-selected: #b3d0de;\n  --color-winter: #9aadbd;\n  --color-winter-hover: #7b8895;\n  --color-winter-selected: #ccd6de;\n  --color-explosive: #c4c4c4;\n  --color-explosive-hover: #98999a;\n  --color-explosive-selected: #e1e1e1;\n  --color-american_gray: #808080;\n  --color-american_gray-hover: #69696a;\n  --color-american_gray-selected: #bfbfbf;\n  --color-blackish: #333333;\n  --color-blackish-hover: #222222;\n  --color-blackish-selected: #999999;\n  --color-brown: #7f5347;\n  --color-brown-hover: #684943;\n  --color-brown-selected: #bfa9a3;\n  --color-orchid: #D974B0;\n  --color-orchid-hover: #AE5D8D;\n  --color-orchid-selected: #ECBAD7;\n  --color-tan: #AD967A;\n  --color-tan-hover: #8A7862;\n  --color-tan-selected: #D6CABC;\n  --color-sky: #A1E3F6;\n  --color-sky-hover: #81B6C5;\n  --color-sky-selected: #D0F1FA;\n  --color-coffee: #BD816E;\n  --color-coffee-hover: #976758;\n  --color-coffee-selected: #DEC0B7;\n  --color-royal: #2B76E5;\n  --color-royal-hover: #225EB7;\n  --color-royal-selected: #95BBF2;\n  --color-teal: #175A63;\n  --color-teal-hover: #12484F;\n  --color-teal-selected: #8BACB1;\n  --color-lavender: #BDA8F9;\n  --color-lavender-hover: #9786C7;\n  --color-lavender-selected: #DED4FC;\n  --color-steel: #A9BEE8;\n  --color-steel-hover: #8798BA;\n  --color-steel-selected: #D4DFF4;\n  --color-lilac: #9D99B9;\n  --color-lilac-hover: #7E7A94;\n  --color-lilac-selected: #CECCDC;\n  --color-pecan: #563E3E;\n  --color-pecan-hover: #453232;\n  --color-pecan-selected: #AB9F9F;\n  --color-dark_marble: #f1f1f1;\n  --color-marble: #f7f7f7;\n  --color-gainsboro: #e1e1e1;\n  --color-extra_light_gray: #edeef0;\n  --color-glitter: #d9f0ff;\n  --color-ultra_light_gray: #ebebeb;\n  --color-very_light_gray: #a1a1a1;\n  --color-jaco_gray: #9699a6;\n  --color-storm_gray: #6b6d77;\n  --color-trolley-grey: #808080;\n  --color-basic_light_blue: #c7e6fa;\n  --color-light_blue: #61caf7;\n  --color-turquoise: #66ccff;\n  --color-aqua: #00d1d1;\n  --color-live_blue: #009aff;\n  --color-jeans: #597bfc;\n  --color-burned_eggplant: #181d37;\n  --color-light-pink: #ff5ac4;\n  --color-dark-pink: #ff158a;\n  --color-dark_red: #bb3354;\n  --color-yellow: #ffcb00;\n  --color-mustered: #cab641;\n  --color-orange: #fdab3d;\n  --color-lime-green: #9cd326;\n  --color-jade: #03c875;\n  --color-green-haze: #00a359;\n  --color-grass-green: #037f4c;\n  --color-amethyst: #a25ddc;\n  --color-dark-purple: #784bd1;\n  --color-blue_links: #0086c0;\n  --color-blue-links: #0086c0;\n  --color-private: #f65f7c;\n  --color-public: #009aff;\n  --color-board_views_grey: #6e6f8f;\n  --color-board_views_grey_hover: #b2b3d0;\n  --color-board_views_blue: #1c1f3b;\n  --color-board_views_blue_secondary: #363a52;\n  --color-border_light_gray: #f5f6f8;\n  --color-brand-blue: #00a9ff;\n  --color-brand-charcoal: #2b2c5c;\n  --color-brand-gold: #ffcc00;\n  --color-brand-green: #11dd80;\n  --color-brand-iris: #595ad4;\n  --color-brand-light-blue: #00cff4;\n  --color-brand-malachite: #00cd6f;\n  --color-brand-purple: #a358d0;\n  --color-brand-red: #f74875;\n  --color-deadline_upcoming_indication: #5d6387;\n  --color-default_group_color: #579bfc;\n  --color-form_btn_hover: #0083d9;\n  --color-form_purple: #575c96;\n  --color-highlight: #dff0ff;\n  --color-green_shadow: #00c875;\n  --color-green-shadow: #00c875;\n  --color-red_shadow: #e2445c;\n  --color-red-shadow: #e2445c;\n  --color-pulse_bg: #f0f0f0;\n  --color-pulse_text_color: #333333;\n  --color-placholder_gray: #d8d8d8;\n  --color-placeholder_light_gray: #efefef;\n  --color-excel-green: #207245;\n  --color-media-blue: #2ea2e9;\n  --color-pdf-red: #bb0706;\n  --color-ppt-orange: #d64e2a;\n  --color-word-blue: #2a5699;\n  --color-zip-orange: #e4901c;\n  --color-like_red: #fb275d;\n  --color-scrollbar_gray: #b2b2b2;\n  --color-timeline_grid_blue: #454662;\n  --color-timeline_blue: #1c1f3b;\n  --color-highlight_blue-rgb: 204,229,255;\n  --color-snow_white-with-opacity: rgba(255, 255, 255, 0.4);\n  --color-wolf_gray-with-opacity: rgba(195, 198, 212, 0.1);\n  --color-asphalt-with-opacity: rgba(103, 104, 121, 0.1);\n  --primary-on-secondary-color: #0073ea;\n  --primary-hover-on-secondary-color: #0060b9;\n  --primary-selected-color-rgb: 204,229,255;\n  --primary-selected-on-secondary-color: #cce5ff;\n  --primary-text-on-secondary-color: #323338;\n  --text-color-on-primary-with-opacity: rgba(255, 255, 255, 0.4);\n  --secondary-text-on-secondary-color: #676879;\n  --placeholder-color-with-opacity: rgba(103, 104, 121, 0.1);\n  --placeholder-on-secondary-color: #676879;\n  --icon-on-secondary-color: #676879;\n  --link-on-secondary-color: #1f76c2;\n  --label-background-color: #cce5ff;\n  --label-background-on-secondary-color: #cce5ff;\n  --primary-background-color-rgb: 255,255,255;\n  --primary-background-hover-on-secondary-color: #dcdfec;\n  --modal-background-color: #ffffff;\n  --secondary-background-color-rgb: 255,255,255;\n  --disabled-background-on-secondary-color: #ecedf5;\n  --disabled-text-on-secondary-color: rgba(50, 51, 56, var(--disabled-component-opacity));\n  --ui-border-on-secondary-color: #c3c6d4;\n  --layout-border-on-secondary-color: #d0d4e4;\n  --dark-background-color: #f6f7fb;\n  --dark-background-on-secondary-color: #f6f7fb;\n  --dialog-background-color: #ffffff;\n  --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2);\n}\n\n:root {\n  --motion-productive-short: 70ms;\n  --motion-productive-medium: 100ms;\n  --motion-productive-long: 150ms;\n  --motion-expressive-short: 250ms;\n  --motion-expressive-long: 400ms;\n  --motion-timing-enter: cubic-bezier(0, 0, 0.35, 1);\n  --motion-timing-exit: cubic-bezier(0.4, 0, 1, 1);\n  --motion-timing-transition: cubic-bezier(0.4, 0, 0.2, 1);\n  --motion-timing-emphasize: cubic-bezier(0, 0, 0.2, 1.4);\n  --expand-animation-timing: var(--motion-timing-enter);\n  --spacing-xs: 4px;\n  --spacing-small: 8px;\n  --spacing-medium: 16px;\n  --spacing-large: 24px;\n  --spacing-xl: 32px;\n  --spacing-xxl: 48px;\n  --spacing-xxxl: 64px;\n  --border-width: 1px;\n  --border-style: solid;\n  --border-radius-small: 4px;\n  --border-radius-medium: 8px;\n  --border-radius-big: 16px;\n  --disabled-component-opacity: 0.38;\n  --font-family: Figtree,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif;\n  /* Figtree,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif; */\n  --title-font-family: Poppins,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif;\n  --h1-font-family: var(--title-font-family);\n  --font-smoothing-webkit: antialiased;\n  --font-smoothing-moz: grayscale;\n  --font-weight-very-light: 200;\n  --font-weight-light: 300;\n  --font-weight-normal: 400;\n  --font-weight-bold: 500;\n  --font-size: 1rem;\n  --font-size-10: 14px;\n  --font-size-20: 14px;\n  --font-size-30: 16px;\n  --font-size-40: 18px;\n  --font-size-50: 24px;\n  --font-size-60: 30px;\n  --font-line-height-10: 18px;\n  --font-line-height-20: 24px;\n  --font-line-height-30: 24px;\n  --font-line-height-40: 24px;\n  --font-line-height-50: 32px;\n  --font-line-height-60: 42px;\n  --font-size-h1: var(--font-size-60);\n  --font-size-h2: var(--font-size-50);\n  --font-size-h3: var(--font-size-50);\n  --font-size-h4: var(--font-size-40);\n  --font-size-h5: var(--font-size-30);\n  --font-size-general-label: var(--font-size-20);\n  --font-size-paragraph: var(--font-size-30);\n  --font-size-subtext: var(--font-size-10);\n  --font-line-height-h1: var(--font-line-height-60);\n  --font-line-height-h2: var(--font-line-height-50);\n  --font-line-height-h3: var(--font-line-height-50);\n  --font-line-height-h4: var(--font-line-height-40);\n  --font-line-height-h5: var(--font-line-height-30);\n  --font-line-height-general-label: var(--font-line-height-20);\n  --font-line-height-paragraph: var(--font-line-height-30);\n  --font-line-height-subtext: var(--font-line-height-10);\n  --font-h1: var(--font-weight-bold) var(--font-size-h1)/var(--font-line-height-h1) var(--title-font-family);\n  --font-h2: var(--font-weight-bold) var(--font-size-h2)/var(--font-line-height-h2) var(--title-font-family);\n  --font-h3: var(--font-weight-light) var(--font-size-h3)/var(--font-line-height-h3) var(--title-font-family);\n  --font-h4: var(--font-weight-bold) var(--font-size-h4)/var(--font-line-height-h4) var(--title-font-family);\n  --font-h5: var(--font-weight-bold) var(--font-size-h5)/var(--font-line-height-h5) var(--font-family);\n  --font-general-label: var(--font-weight-normal) var(--font-size-general-label)/var(--font-line-height-general-label) var(--font-family);\n  --font-paragraph: var(--font-weight-normal) var(--font-size-paragraph)/var(--font-line-height-paragraph) var(--font-family);\n  --font-subtext: var(--font-weight-normal) var(--font-size-subtext)/var(--font-line-height-subtext) var(--font-family);\n}\n\n:root {\n  --react-modal-background: rgba(41, 47, 76, 0.7);\n  --application-background-color: var(--color-snow_white);\n  --application-border-color: #e6e9ef;\n  --text-color-on-card: #323338;\n  --main-nav-background-color: #292f4c;\n  --pulse-background-color: #f5f6f8;\n  --pulse-background-color-rgb: 245, 246, 248;\n  --pulse-background-color-opacity: #f5f6f880;\n  --pulse-text-color: #666;\n  --pulse-hover-background-color: #e6e9ef;\n  --pulse-selected-background-color: #e5f4ff;\n  --pulse-floating-background-color: 253, 253, 250;\n  --pulse-highlight-background-color: #cce9ff;\n  --surfce-color: rgb(51, 51, 51)/* #292f4c */;\n  --surface-border-color: #4b4e69;\n  --card-background-color: var(--primary-background-color);\n  --card-hover-background-color: white;\n  --card-selected-background-color: #d9f0ff;\n  --card-selected-text-color: #0073ea;\n  --automations-hover-background-color: #f5f6f8;\n  --automations-label-background-color: #f5f6f8;\n  --automations-border-color: #e6e9ef;\n  --automations-account-usage-background-color: white;\n  --automations-account-usage-dropdown-border-color: #d9d9d9;\n  --automations-account-usage-progressbar-background-color: #e6e9ef;\n  --apps-svg-icon-invert: invert(0);\n  --apps-code-color: #5559df;\n  --apps-feature-preview-color: #e5f4ff;\n  --apps-tabs-border-color: #1c1f3b;\n  --card-border-color: #e6e9ef;\n  --avatar-border-color: var(--color-snow_white);\n  --modal-bottom-color: #f7f7f7;\n  --modal-free-indication-color: var(--primary-selected-color);\n  --notification-unread-highlight-color: #d2eaff;\n  --apps-marketplace-highlight-color: #f5f6f8;\n  --redactor-context-background-color: #323338;\n  --redactor-context-link-color: #fff;\n  --ajax-spinner-gif-path: url(https://cdn.monday.com/images/ajax_spinner.gif);\n  --scrollbar-color: var(--color-wolf_gray);\n  --monday-loader-gif-path: url(https://cdn.monday.com/images/loader/loader.gif);\n  --hint-background-color: #ccf4e3;\n  --transparent-overlay: rgba(41, 47, 76, 0.5) !important;\n  --timeline-row-hover: rgba(210, 210, 210, 0.3);\n  --timeline-value-remains: #333333;\n  --topbar-bg-color: #eceff8 ;\n}\n\n:root {\n  --_cu-grey1100: 26, 28, 32;\n  --_cu-grey1000: 42, 46, 52;\n  --_cu-grey900: 48, 53, 60;\n  --_cu-grey800: 60, 65, 74;\n  --_cu-grey700: 79, 87, 98;\n  --_cu-grey600: 101, 111, 125;\n  --_cu-grey500: 135, 144, 158;\n  --_cu-grey400: 173, 179, 189;\n  --_cu-grey300: 214, 217, 222;\n  --_cu-grey200: 232, 234, 237;\n  --_cu-grey100: 240, 241, 243;\n  --_cu-grey50: 247, 248, 249;\n  --_cu-white: 255, 255, 255;\n  --_cu-purple1100: 50, 52, 82;\n  --_cu-purple1000: 59, 58, 112;\n  --_cu-purple900: 67, 65, 141;\n  --_cu-purple800: 76, 71, 171;\n  --_cu-purple700: 84, 77, 201;\n  --_cu-purple600: 95, 85, 238;\n  --_cu-purple500: 127, 119, 241;\n  --_cu-purple400: 153, 146, 244;\n  --_cu-purple300: 178, 173, 247;\n  --_cu-purple200: 204, 201, 250;\n  --_cu-purple100: 229, 228, 252;\n  --_cu-purple50: 242, 241, 254;\n  --_cu-neonBlue1100: 46, 55, 84;\n  --_cu-neonBlue1000: 50, 64, 117;\n  --_cu-neonBlue900: 54, 73, 149;\n  --_cu-neonBlue800: 59, 82, 182;\n  --_cu-neonBlue700: 63, 91, 214;\n  --_cu-neonBlue600: 68, 102, 255;\n  --_cu-neonBlue500: 105, 133, 255;\n  --_cu-neonBlue400: 135, 157, 255;\n  --_cu-neonBlue300: 165, 182, 255;\n  --_cu-neonBlue200: 195, 206, 255;\n  --_cu-neonBlue100: 225, 231, 255;\n  --_cu-neonBlue50: 240, 243, 255;\n  --_cu-azureBlue1100: 38, 62, 80;\n  --_cu-azureBlue1000: 34, 77, 107;\n  --_cu-azureBlue900: 30, 93, 135;\n  --_cu-azureBlue800: 25, 109, 162;\n  --_cu-azureBlue700: 21, 124, 190;\n  --_cu-azureBlue600: 16, 144, 224;\n  --_cu-azureBlue500: 64, 166, 230;\n  --_cu-azureBlue400: 102, 184, 235;\n  --_cu-azureBlue300: 140, 202, 240;\n  --_cu-azureBlue200: 179, 220, 245;\n  --_cu-azureBlue100: 217, 237, 250;\n  --_cu-azureBlue50: 236, 246, 253;\n  --_cu-teal1100: 38, 64, 69;\n  --_cu-teal1000: 33, 82, 86;\n  --_cu-teal900: 29, 99, 103;\n  --_cu-teal800: 25, 117, 120;\n  --_cu-teal700: 20, 135, 138;\n  --_cu-teal600: 15, 157, 159;\n  --_cu-teal500: 63, 177, 178;\n  --_cu-teal400: 101, 192, 194;\n  --_cu-teal300: 140, 208, 209;\n  --_cu-teal200: 178, 224, 224;\n  --_cu-teal100: 217, 239, 240;\n  --_cu-teal50: 231, 245, 245;\n  --_cu-mint1100: 45, 68, 66;\n  --_cu-mint1000: 48, 90, 80;\n  --_cu-mint900: 51, 112, 94;\n  --_cu-mint800: 54, 134, 108;\n  --_cu-mint700: 57, 156, 122;\n  --_cu-mint600: 61, 184, 139;\n  --_cu-mint500: 100, 198, 162;\n  --_cu-mint400: 131, 209, 181;\n  --_cu-mint300: 162, 221, 199;\n  --_cu-mint200: 193, 232, 218;\n  --_cu-mint100: 224, 244, 236;\n  --_cu-mint50: 240, 249, 246;\n  --_cu-green1100: 35, 60, 55;\n  --_cu-green1000: 29, 75, 57;\n  --_cu-green900: 22, 89, 60;\n  --_cu-green800: 15, 104, 62;\n  --_cu-green700: 8, 118, 65;\n  --_cu-green600: 0, 136, 68;\n  --_cu-green500: 51, 160, 105;\n  --_cu-green400: 92, 179, 135;\n  --_cu-green300: 133, 198, 165;\n  --_cu-green200: 173, 217, 195;\n  --_cu-green100: 214, 236, 225;\n  --_cu-green50: 235, 245, 240;\n  --_cu-yellow1100: 75, 66, 44;\n  --_cu-yellow1000: 108, 87, 35;\n  --_cu-yellow900: 141, 107, 27;\n  --_cu-yellow800: 174, 128, 19;\n  --_cu-yellow700: 207, 148, 10;\n  --_cu-yellow600: 248, 174, 0;\n  --_cu-yellow500: 249, 190, 51;\n  --_cu-yellow400: 251, 203, 92;\n  --_cu-yellow300: 252, 216, 133;\n  --_cu-yellow200: 253, 229, 173;\n  --_cu-yellow100: 254, 242, 214;\n  --_cu-yellow50: 254, 249, 235;\n  --_cu-orange1100: 71, 56, 47;\n  --_cu-orange1000: 101, 66, 42;\n  --_cu-orange900: 130, 75, 38;\n  --_cu-orange800: 159, 85, 33;\n  --_cu-orange700: 188, 95, 28;\n  --_cu-orange600: 225, 107, 22;\n  --_cu-orange500: 231, 137, 69;\n  --_cu-orange400: 236, 160, 106;\n  --_cu-orange300: 241, 184, 143;\n  --_cu-orange200: 245, 208, 180;\n  --_cu-orange100: 250, 231, 218;\n  --_cu-orange50: 253, 243, 236;\n  --_cu-red1100: 69, 48, 55;\n  --_cu-red1000: 96, 51, 57;\n  --_cu-red900: 123, 53, 60;\n  --_cu-red800: 150, 55, 62;\n  --_cu-red700: 177, 58, 65;\n  --_cu-red600: 211, 61, 68;\n  --_cu-red500: 220, 100, 106;\n  --_cu-red400: 227, 131, 136;\n  --_cu-red300: 234, 162, 165;\n  --_cu-red200: 241, 193, 195;\n  --_cu-red100: 248, 224, 225;\n  --_cu-red50: 252, 239, 240;\n  --_cu-pink1100: 73, 54, 68;\n  --_cu-pink1000: 105, 61, 84;\n  --_cu-pink900: 136, 69, 100;\n  --_cu-pink800: 167, 77, 117;\n  --_cu-pink700: 199, 84, 133;\n  --_cu-pink600: 238, 94, 153;\n  --_cu-pink500: 241, 126, 173;\n  --_cu-pink400: 244, 152, 190;\n  --_cu-pink300: 247, 178, 206;\n  --_cu-pink200: 250, 204, 222;\n  --_cu-pink100: 252, 229, 239;\n  --_cu-pink50: 254, 242, 247;\n  --_cu-violet1100: 64, 54, 80;\n  --_cu-violet1000: 87, 62, 107;\n  --_cu-violet900: 109, 70, 135;\n  --_cu-violet800: 132, 78, 162;\n  --_cu-violet700: 154, 86, 190;\n  --_cu-violet600: 182, 96, 224;\n  --_cu-violet500: 197, 128, 230;\n  --_cu-violet400: 208, 153, 235;\n  --_cu-violet300: 220, 179, 240;\n  --_cu-violet200: 232, 204, 245;\n  --_cu-violet100: 243, 230, 250;\n  --_cu-violet50: 249, 242, 253;\n  --_cu-brown1100: 62, 61, 64;\n  --_cu-brown1000: 83, 76, 76;\n  --_cu-brown900: 103, 92, 88;\n  --_cu-brown800: 124, 107, 101;\n  --_cu-brown700: 144, 121, 113;\n  --_cu-brown600: 170, 141, 128;\n  --_cu-brown500: 187, 163, 153;\n  --_cu-brown400: 201, 182, 174;\n  --_cu-brown300: 214, 200, 194;\n  --_cu-brown200: 228, 219, 214;\n  --_cu-brown100: 241, 237, 235;\n  --_cu-brown50: 248, 246, 245;\n  --_cu-black1100: 0, 0, 0;\n  --_cu-black1000: 10, 11, 13;\n  --_cu-black900: 19, 21, 26;\n  --_cu-black800: 29, 32, 38;\n  --_cu-black700: 38, 42, 51;\n  --_cu-black600: 48, 53, 64;\n  --_cu-black500: 89, 93, 102;\n  --_cu-black400: 123, 126, 133;\n  --_cu-black300: 156, 158, 163;\n  --_cu-black200: 189, 190, 194;\n  --_cu-black100: 222, 223, 224;\n  --_cu-black50: 238, 239, 240;\n  --cu-grey1100: rgb(var(--_cu-grey1100));\n  --cu-grey1000: rgb(var(--_cu-grey1000));\n  --cu-grey1000-50: rgb(var(--_cu-grey1000), .5);\n  --cu-grey1000-20: rgb(var(--_cu-grey1000), .2);\n  --cu-grey1000-16: rgb(var(--_cu-grey1000), .16);\n  --cu-grey1000-10: rgb(var(--_cu-grey1000), .1);\n  --cu-grey900: rgb(var(--_cu-grey900));\n  --cu-grey800: rgb(var(--_cu-grey800));\n  --cu-grey700: rgb(var(--_cu-grey700));\n  --cu-grey600: rgb(var(--_cu-grey600));\n  --cu-grey500: rgb(var(--_cu-grey500));\n  --cu-grey400: rgb(var(--_cu-grey400));\n  --cu-grey300: rgb(var(--_cu-grey300));\n  --cu-grey200: rgb(var(--_cu-grey200));\n  --cu-grey100: rgb(var(--_cu-grey100));\n  --cu-grey100-50: rgb(var(--_cu-grey100), .5);\n  --cu-grey100-20: rgb(var(--_cu-grey100), .2);\n  --cu-grey100-16: rgb(var(--_cu-grey100), .16);\n  --cu-grey100-10: rgb(var(--_cu-grey100), .1);\n  --cu-grey50: rgb(var(--_cu-grey50));\n  --cu-white: rgb(var(--_cu-white));\n  --cu-white-80: rgb(var(--_cu-white), .8);\n  --cu-white-50: rgb(var(--_cu-white), .5);\n  --cu-white-20: rgb(var(--_cu-white), .2);\n  --cu-white-16: rgb(var(--_cu-white), .16);\n  --cu-white-10: rgb(var(--_cu-white), .1);\n  --cu-green1100: rgb(var(--_cu-green1100));\n  --cu-green1000: rgb(var(--_cu-green1000));\n  --cu-green900: rgb(var(--_cu-green900));\n  --cu-green800: rgb(var(--_cu-green800));\n  --cu-green700: rgb(var(--_cu-green700));\n  --cu-green600: rgb(var(--_cu-green600));\n  --cu-green500: rgb(var(--_cu-green500));\n  --cu-green400: rgb(var(--_cu-green400));\n  --cu-green300: rgb(var(--_cu-green300));\n  --cu-green200: rgb(var(--_cu-green200));\n  --cu-green100: rgb(var(--_cu-green100));\n  --cu-green50: rgb(var(--_cu-green50));\n  --cu-yellow1100: rgb(var(--_cu-yellow1100));\n  --cu-yellow1000: rgb(var(--_cu-yellow1000));\n  --cu-yellow900: rgb(var(--_cu-yellow900));\n  --cu-yellow800: rgb(var(--_cu-yellow800));\n  --cu-yellow700: rgb(var(--_cu-yellow700));\n  --cu-yellow600: rgb(var(--_cu-yellow600));\n  --cu-yellow500: rgb(var(--_cu-yellow500));\n  --cu-yellow400: rgb(var(--_cu-yellow400));\n  --cu-yellow300: rgb(var(--_cu-yellow300));\n  --cu-yellow200: rgb(var(--_cu-yellow200));\n  --cu-yellow100: rgb(var(--_cu-yellow100));\n  --cu-yellow50: rgb(var(--_cu-yellow50));\n  --cu-red1100: rgb(var(--_cu-red1100));\n  --cu-red1000: rgb(var(--_cu-red1000));\n  --cu-red900: rgb(var(--_cu-red900));\n  --cu-red800: rgb(var(--_cu-red800));\n  --cu-red700: rgb(var(--_cu-red700));\n  --cu-red600: rgb(var(--_cu-red600));\n  --cu-red600-16: rgb(var(--_cu-red600), .16);\n  --cu-red500: rgb(var(--_cu-red500));\n  --cu-red500-16: rgb(var(--_cu-red500), .16);\n  --cu-red400: rgb(var(--_cu-red400));\n  --cu-red300: rgb(var(--_cu-red300));\n  --cu-red200: rgb(var(--_cu-red200));\n  --cu-red100: rgb(var(--_cu-red100));\n  --cu-red50: rgb(var(--_cu-red50));\n  --cu-purple1100: rgb(var(--_cu-purple1100));\n  --cu-purple1000: rgb(var(--_cu-purple1000));\n  --cu-purple900: rgb(var(--_cu-purple900));\n  --cu-purple800: rgb(var(--_cu-purple800));\n  --cu-purple700: rgb(var(--_cu-purple700));\n  --cu-purple600: rgb(var(--_cu-purple600));\n  --cu-purple600-16: rgb(var(--_cu-purple600), .16);\n  --cu-purple500: rgb(var(--_cu-purple500));\n  --cu-purple500-16: rgb(var(--_cu-purple500), .16);\n  --cu-purple400: rgb(var(--_cu-purple400));\n  --cu-purple300: rgb(var(--_cu-purple300));\n  --cu-purple200: rgb(var(--_cu-purple200));\n  --cu-purple100: rgb(var(--_cu-purple100));\n  --cu-purple50: rgb(var(--_cu-purple50));\n  --cu-neonBlue1100: rgb(var(--_cu-neonBlue1100));\n  --cu-neonBlue1000: rgb(var(--_cu-neonBlue1000));\n  --cu-neonBlue900: rgb(var(--_cu-neonBlue900));\n  --cu-neonBlue800: rgb(var(--_cu-neonBlue800));\n  --cu-neonBlue700: rgb(var(--_cu-neonBlue700));\n  --cu-neonBlue600: rgb(var(--_cu-neonBlue600));\n  --cu-neonBlue600-16: rgb(var(--_cu-neonBlue600), .16);\n  --cu-neonBlue500: rgb(var(--_cu-neonBlue500));\n  --cu-neonBlue500-16: rgb(var(--_cu-neonBlue500), .16);\n  --cu-neonBlue400: rgb(var(--_cu-neonBlue400));\n  --cu-neonBlue300: rgb(var(--_cu-neonBlue300));\n  --cu-neonBlue200: rgb(var(--_cu-neonBlue200));\n  --cu-neonBlue100: rgb(var(--_cu-neonBlue100));\n  --cu-neonBlue50: rgb(var(--_cu-neonBlue50));\n  --cu-azureBlue1100: rgb(var(--_cu-azureBlue1100));\n  --cu-azureBlue1000: rgb(var(--_cu-azureBlue1000));\n  --cu-azureBlue900: rgb(var(--_cu-azureBlue900));\n  --cu-azureBlue800: rgb(var(--_cu-azureBlue800));\n  --cu-azureBlue700: rgb(var(--_cu-azureBlue700));\n  --cu-azureBlue600: rgb(var(--_cu-azureBlue600));\n  --cu-azureBlue600-16: rgb(var(--_cu-azureBlue600), .16);\n  --cu-azureBlue500: rgb(var(--_cu-azureBlue500));\n  --cu-azureBlue500-16: rgb(var(--_cu-azureBlue500), .16);\n  --cu-azureBlue400: rgb(var(--_cu-azureBlue400));\n  --cu-azureBlue300: rgb(var(--_cu-azureBlue300));\n  --cu-azureBlue200: rgb(var(--_cu-azureBlue200));\n  --cu-azureBlue100: rgb(var(--_cu-azureBlue100));\n  --cu-azureBlue50: rgb(var(--_cu-azureBlue50));\n  --cu-teal1100: rgb(var(--_cu-teal1100));\n  --cu-teal1000: rgb(var(--_cu-teal1000));\n  --cu-teal900: rgb(var(--_cu-teal900));\n  --cu-teal800: rgb(var(--_cu-teal800));\n  --cu-teal700: rgb(var(--_cu-teal700));\n  --cu-teal600: rgb(var(--_cu-teal600));\n  --cu-teal600-16: rgb(var(--_cu-teal600), .16);\n  --cu-teal500: rgb(var(--_cu-teal500));\n  --cu-teal500-16: rgb(var(--_cu-teal500), .16);\n  --cu-teal400: rgb(var(--_cu-teal400));\n  --cu-teal300: rgb(var(--_cu-teal300));\n  --cu-teal200: rgb(var(--_cu-teal200));\n  --cu-teal100: rgb(var(--_cu-teal100));\n  --cu-teal50: rgb(var(--_cu-teal50));\n  --cu-mint1100: rgb(var(--_cu-mint1100));\n  --cu-mint1000: rgb(var(--_cu-mint1000));\n  --cu-mint900: rgb(var(--_cu-mint900));\n  --cu-mint800: rgb(var(--_cu-mint800));\n  --cu-mint700: rgb(var(--_cu-mint700));\n  --cu-mint600: rgb(var(--_cu-mint600));\n  --cu-mint600-16: rgb(var(--_cu-mint600), .16);\n  --cu-mint500: rgb(var(--_cu-mint500));\n  --cu-mint500-16: rgb(var(--_cu-mint500), .16);\n  --cu-mint400: rgb(var(--_cu-mint400));\n  --cu-mint300: rgb(var(--_cu-mint300));\n  --cu-mint200: rgb(var(--_cu-mint200));\n  --cu-mint100: rgb(var(--_cu-mint100));\n  --cu-mint50: rgb(var(--_cu-mint50));\n  --cu-orange1100: rgb(var(--_cu-orange1100));\n  --cu-orange1000: rgb(var(--_cu-orange1000));\n  --cu-orange900: rgb(var(--_cu-orange900));\n  --cu-orange800: rgb(var(--_cu-orange800));\n  --cu-orange700: rgb(var(--_cu-orange700));\n  --cu-orange600: rgb(var(--_cu-orange600));\n  --cu-orange600-16: rgb(var(--_cu-orange600), .16);\n  --cu-orange500: rgb(var(--_cu-orange500));\n  --cu-orange500-16: rgb(var(--_cu-orange500), .16);\n  --cu-orange400: rgb(var(--_cu-orange400));\n  --cu-orange300: rgb(var(--_cu-orange300));\n  --cu-orange200: rgb(var(--_cu-orange200));\n  --cu-orange100: rgb(var(--_cu-orange100));\n  --cu-orange50: rgb(var(--_cu-orange50));\n  --cu-pink1100: rgb(var(--_cu-pink1100));\n  --cu-pink1000: rgb(var(--_cu-pink1000));\n  --cu-pink900: rgb(var(--_cu-pink900));\n  --cu-pink800: rgb(var(--_cu-pink800));\n  --cu-pink700: rgb(var(--_cu-pink700));\n  --cu-pink600: rgb(var(--_cu-pink600));\n  --cu-pink600-16: rgb(var(--_cu-pink600), .16);\n  --cu-pink500: rgb(var(--_cu-pink500));\n  --cu-pink500-16: rgb(var(--_cu-pink500), .16);\n  --cu-pink400: rgb(var(--_cu-pink400));\n  --cu-pink300: rgb(var(--_cu-pink300));\n  --cu-pink200: rgb(var(--_cu-pink200));\n  --cu-pink100: rgb(var(--_cu-pink100));\n  --cu-pink50: rgb(var(--_cu-pink50));\n  --cu-violet1100: rgb(var(--_cu-violet1100));\n  --cu-violet1000: rgb(var(--_cu-violet1000));\n  --cu-violet900: rgb(var(--_cu-violet900));\n  --cu-violet800: rgb(var(--_cu-violet800));\n  --cu-violet700: rgb(var(--_cu-violet700));\n  --cu-violet600: rgb(var(--_cu-violet600));\n  --cu-violet600-16: rgb(var(--_cu-violet600), .16);\n  --cu-violet500: rgb(var(--_cu-violet500));\n  --cu-violet500-16: rgb(var(--_cu-violet500), .16);\n  --cu-violet400: rgb(var(--_cu-violet400));\n  --cu-violet300: rgb(var(--_cu-violet300));\n  --cu-violet200: rgb(var(--_cu-violet200));\n  --cu-violet100: rgb(var(--_cu-violet100));\n  --cu-violet50: rgb(var(--_cu-violet50));\n  --cu-brown1100: rgb(var(--_cu-brown1100));\n  --cu-brown1000: rgb(var(--_cu-brown1000));\n  --cu-brown900: rgb(var(--_cu-brown900));\n  --cu-brown800: rgb(var(--_cu-brown800));\n  --cu-brown700: rgb(var(--_cu-brown700));\n  --cu-brown600: rgb(var(--_cu-brown600));\n  --cu-brown600-16: rgb(var(--_cu-brown600), .16);\n  --cu-brown500: rgb(var(--_cu-brown500));\n  --cu-brown500-16: rgb(var(--_cu-brown500), .16);\n  --cu-brown400: rgb(var(--_cu-brown400));\n  --cu-brown300: rgb(var(--_cu-brown300));\n  --cu-brown200: rgb(var(--_cu-brown200));\n  --cu-brown100: rgb(var(--_cu-brown100));\n  --cu-brown50: rgb(var(--_cu-brown50));\n  --cu-black1100: rgb(var(--_cu-black1100));\n  --cu-black1000: rgb(var(--_cu-black1000));\n  --cu-black900: rgb(var(--_cu-black900));\n  --cu-black800: rgb(var(--_cu-black800));\n  --cu-black700: rgb(var(--_cu-black700));\n  --cu-black600: rgb(var(--_cu-black600));\n  --cu-black600-16: rgb(var(--_cu-black600), .16);\n  --cu-black500: rgb(var(--_cu-black500));\n  --cu-black500-16: rgb(var(--_cu-black500), .16);\n  --cu-black400: rgb(var(--_cu-black400));\n  --cu-black300: rgb(var(--_cu-black300));\n  --cu-black200: rgb(var(--_cu-black200));\n  --cu-black100: rgb(var(--_cu-black100));\n  --cu-black50: rgb(var(--_cu-black50)) ;\n}\n\nbody {\n  --rem-divisor: 16;\n  --rem-return-unit: 1rem ;\n}\n\nbody {\n  --cu-size-1: calc(4 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-2: calc(8 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-3: calc(12 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-4: calc(16 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-5: calc(20 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-6: calc(24 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-7: calc(28 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-8: calc(32 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-9: calc(36 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-10: calc(40 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-11: calc(44 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-size-12: calc(48 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-1: calc(2 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-2: calc(4 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-3: calc(6 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-4: calc(8 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-5: calc(10 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-6: calc(12 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-7: calc(16 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-8: calc(20 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-9: calc(24 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-radii-round: calc(666 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-border-size-1: 1px;\n  --cu-border-size-2: 2px ;\n}\n\nbody {\n  --cu-font-family: -apple-system, \"BlinkMacSystemFont\", \"Segoe UI\", \"Helvetica\", \"Apple Color Emoji\", \"Arial\", sans-serif, \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  --cu-font-weight-regular: 400;\n  --cu-font-weight-medium: 500;\n  --cu-font-weight-semibold: 600;\n  --cu-font-weight-bold: 700;\n  --cu-font-size-1: calc(6 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-2: calc(8 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-3: calc(10 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-4: calc(11 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-5: calc(12 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-6: calc(14 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-7: calc(16 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-8: calc(18 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-9: calc(20 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-10: calc(22 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-11: calc(24 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-12: calc(28 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-13: calc(32 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-14: calc(36 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-font-size-15: calc(40 / var(--rem-divisor) * var(--rem-return-unit));\n  --cu-label-weight: var(--cu-font-weight-regular);\n  --cu-label-weight-strong: var(--cu-font-weight-medium);\n  --cu-label-large-font-size: var(--cu-font-size-8);\n  --cu-label-large-line-height: 1.33;\n  --cu-label-medium-font-size: var(--cu-font-size-7);\n  --cu-label-medium-line-height: 1.25;\n  --cu-label-small-font-size: var(--cu-font-size-6);\n  --cu-label-small-line-height: 1.14;\n  --cu-label-xsmall-font-size: var(--cu-font-size-5);\n  --cu-label-xsmall-line-height: 1.33;\n  --cu-paragraph-weight: var(--cu-font-weight-regular);\n  --cu-paragraph-weight-strong: var(--cu-font-weight-medium);\n  --cu-paragraph-line-height: 1.5;\n  --cu-paragraph-large-font-size: var(--cu-font-size-7);\n  --cu-paragraph-large-line-height: var(--cu-paragraph-line-height);\n  --cu-paragraph-medium-font-size: var(--cu-font-size-6);\n  --cu-paragraph-medium-line-height: var(--cu-paragraph-line-height);\n  --cu-paragraph-small-font-size: var(--cu-font-size-5);\n  --cu-paragraph-small-line-height: var(--cu-paragraph-line-height);\n  --cu-heading-weight: var(--cu-font-weight-semibold);\n  --cu-heading-line-height: 1.5;\n  --cu-heading-h1-font-size: var(--cu-font-size-15);\n  --cu-heading-h2-font-size: var(--cu-font-size-13);\n  --cu-heading-h3-font-size: var(--cu-font-size-11);\n  --cu-heading-h4-font-size: var(--cu-font-size-9);\n  --cu-heading-h5-font-size: var(--cu-font-size-8);\n  --cu-heading-h6-font-size: var(--cu-font-size-7);\n  --cu-heading-xxsmall-font-size: var(--cu-font-size-6);\n  --cu-heading-xxsmall-line-height: var(--cu-heading-line-height);\n  --cu-heading-caption-font-size: var(--cu-font-size-4);\n  --cu-heading-caption-line-height: var(--cu-heading-line-height) ;\n}\n\nbody:not(.cu-purple, .cu-neonBlue, .cu-azureBlue, .cu-teal, .cu-mint, .cu-orange, .cu-pink, .cu-violet, .cu-brown, .cu-black, .cu-custom) {\n  --cu-background-primary: var(--theme-main-color, #7b68ee);\n  --cu-background-primary-hover: var(--theme-main-color-dark, #5f48ea);\n  --cu-background-primary-pressed: var(--theme-main-color-dark, #5f48ea);\n  --cu-background-primary-disabled: var(--theme-main-color-light, #d3cdf9);\n  --cu-background-primary-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .12 );\n  --cu-background-primary-on-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .18 );\n  --cu-content-primary: var(--theme-main-color, #7b68ee);\n  --cu-border-primary: var(--theme-main-color, #7b68ee);\n  --cu-border-primary-focus: var(--theme-main-color, #7b68ee);\n  --cu-effect-primary: rgb(var(--theme-main-color-rgb, 123, 104, 238), .2);\n  --cu-link-primary: var(--theme-main-color, #7b68ee);\n  --cu-link-primary-hover: var(--theme-main-color-dark, #5f48ea) ;\n}\n\nbody.dark-theme:not(.cu-purple, .cu-neonBlue, .cu-azureBlue, .cu-teal, .cu-mint, .cu-orange, .cu-pink, .cu-violet, .cu-brown, .cu-black, .cu-custom), .dark-sidebar {\n  --cu-background-primary: var(--theme-main-color, #7b68ee);\n  --cu-background-primary-hover: var(--theme-main-color-dark, #5f48ea);\n  --cu-background-primary-pressed: var(--theme-main-color, #7b68ee);\n  --cu-background-primary-disabled: rgb( var(--theme-main-color-rgb, 123, 104, 238), .5 );\n  --cu-background-primary-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .22 );\n  --cu-background-primary-on-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .3 );\n  --cu-content-primary: var(--theme-main-color, #7b68ee);\n  --cu-border-primary: var(--theme-main-color, #7b68ee);\n  --cu-border-primary-focus: var(--theme-main-color, #7b68ee);\n  --cu-effect-primary: rgb(var(--theme-main-color-rgb, 123, 104, 238), .2);\n  --cu-link-primary: var(--theme-main-color, #7b68ee);\n  --cu-link-primary-hover: var(--theme-main-color-dark, #5f48ea) ;\n}\n\nbody.dark-theme, .dark-sidebar {\n  --cu-background-main: var(--cu-grey1000);\n  --cu-background-main-hover: var(--cu-grey900);\n  --cu-background-main-hover-strong: var(--cu-grey800);\n  --cu-background-main-pressed: var(--cu-grey700);\n  --cu-background-main-offset: var(--cu-grey900);\n  --cu-background-main-inverse: var(--cu-white);\n  --cu-background-main-inverse-offset: var(--cu-grey700);\n  --cu-background-subtle: var(--cu-grey900);\n  --cu-background-subtle-hover: var(--cu-grey800);\n  --cu-background-subtle-hover-strong: var(--cu-grey700);\n  --cu-background-subtle-pressed: var(--cu-grey600);\n  --cu-background-subtle-offset: var(--cu-grey1000);\n  --cu-background-on-main: var(--cu-grey800);\n  --cu-background-on-main-hover: var(--cu-grey700);\n  --cu-background-on-main-pressed: var(--cu-grey600);\n  --cu-background-on-subtle: var(--cu-grey700);\n  --cu-background-on-subtle-hover: var(--cu-grey600);\n  --cu-background-on-subtle-pressed: var(--cu-grey700);\n  --cu-background-success: var(--cu-green500);\n  --cu-background-success-subtle: var(--cu-green1100);\n  --cu-background-warning: var(--cu-yellow500);\n  --cu-background-warning-subtle: var(--cu-yellow1100);\n  --cu-background-danger: var(--cu-red500);\n  --cu-background-danger-hover: var(--cu-red400);\n  --cu-background-danger-pressed: var(--cu-red500);\n  --cu-background-danger-disabled: var(--cu-red900);\n  --cu-background-danger-subtle: var(--cu-red1100);\n  --cu-background-danger-subtle-hover: var(--cu-red1000);\n  --cu-background-danger-subtle-pressed: var(--cu-red1100);\n  --cu-background-tooltip: var(--cu-grey700);\n  --cu-background-modal: var(--cu-grey700);\n  --cu-background-on-dark-hover: var(--cu-white-10);\n  --cu-background-on-dark-pressed: var(--cu-white-20);\n  --cu-background-on-light-hover: var(--cu-grey1000-10);\n  --cu-background-on-light-pressed: var(--cu-grey1000-20);\n  --cu-background-notification: var(--cu-pink500);\n  --cu-content-default: var(--cu-grey100);\n  --cu-content-secondary: var(--cu-grey400);\n  --cu-content-tertiary: var(--cu-grey500);\n  --cu-content-placeholder: var(--cu-grey600);\n  --cu-content-disabled: var(--cu-grey700);\n  --cu-content-success: var(--cu-green400);\n  --cu-content-warning: var(--cu-yellow400);\n  --cu-content-danger: var(--cu-red400);\n  --cu-content-danger-disabled: var(--cu-red900);\n  --cu-content-on-dark: var(--cu-white);\n  --cu-content-on-dark-disabled: var(--cu-white-50);\n  --cu-content-on-dark-secondary: var(--cu-white-80);\n  --cu-content-on-light: var(--cu-grey1000);\n  --cu-content-on-light-disabled: var(--cu-grey1000-50);\n  --cu-border-default: var(--cu-grey800);\n  --cu-border-low-contrast: var(--cu-grey900);\n  --cu-border-high-contrast: var(--cu-grey700);\n  --cu-border-hover: var(--cu-grey600);\n  --cu-border-input: var(--cu-grey600);\n  --cu-border-input-hover: var(--cu-grey500);\n  --cu-border-success: var(--cu-green500);\n  --cu-border-danger: var(--cu-red500);\n  --cu-border-danger-focus: var(--cu-red500);\n  --cu-border-warning: var(--cu-yellow500);\n  --cu-border-on-dark: var(--cu-white-50);\n  --cu-border-on-dark-focus: var(--cu-white);\n  --cu-border-on-light: var(--cu-grey1000-50);\n  --cu-border-on-light-focus: var(--cu-grey1000);\n  --cu-effect-danger: var(--cu-red500-16);\n  --cu-effect-on-dark: var(--cu-white-16);\n  --cu-effect-on-light: var(--cu-grey1000-16);\n  --cu-link-hyperlink: var(--cu-neonBlue400);\n  --cu-link-hyperlink-hover: var(--cu-neonBlue300);\n  --cu-fab-icon-pink: var(--cu-pink500);\n  --cu-fab-icon-yellow: var(--cu-yellow500);\n  --cu-fab-icon-mint: var(--cu-mint500);\n  --cu-fab-icon-azure-blue: var(--cu-azureBlue500);\n  --cu-alert-banner-background: var(--cu-grey700);\n  --cu-alert-banner-background-subtle: var(--cu-grey900);\n  --cu-alert-banner-content: var(--cu-grey100);\n  --cu-alert-banner-content-dark: var(--cu-grey1000);\n  --cu-avatar-user-bg-purple: var(--cu-purple500);\n  --cu-avatar-user-bg-neon-blue: var(--cu-neonBlue500);\n  --cu-avatar-user-bg-azure-blue: var(--cu-azureBlue500);\n  --cu-avatar-user-bg-teal: var(--cu-teal500);\n  --cu-avatar-user-bg-mint: var(--cu-mint500);\n  --cu-avatar-user-bg-yellow: var(--cu-yellow500);\n  --cu-avatar-user-bg-orange: var(--cu-orange500);\n  --cu-avatar-user-bg-red: var(--cu-red500);\n  --cu-avatar-user-bg-pink: var(--cu-pink500);\n  --cu-avatar-user-bg-violet: var(--cu-violet500);\n  --cu-avatar-user-bg-brown: var(--cu-brown500);\n  --cu-avatar-user-bg-black: var(--cu-black500);\n  --cu-avatar-user-online: var(--cu-green400);\n  --cu-avatar-user-guest: var(--cu-grey400);\n  --cu-avatar-user-remove: var(--cu-grey700);\n  --cu-automations-usage-bg-neon-blue: var(--cu-neonBlue1100);\n  --cu-automations-usage-content-neon-blue: var(--cu-neonBlue400);\n  --cu-automations-usage-bg-teal: var(--cu-teal1100);\n  --cu-automations-usage-content-teal: var(--cu-teal400);\n  --cu-avatar-space-bg-purple: var(--cu-purple900);\n  --cu-avatar-space-bg-neon-blue: var(--cu-neonBlue900);\n  --cu-avatar-space-bg-azure-blue: var(--cu-azureBlue900);\n  --cu-avatar-space-bg-teal: var(--cu-teal900);\n  --cu-avatar-space-bg-mint: var(--cu-mint900);\n  --cu-avatar-space-bg-yellow: var(--cu-yellow900);\n  --cu-avatar-space-bg-orange: var(--cu-orange900);\n  --cu-avatar-space-bg-red: var(--cu-red900);\n  --cu-avatar-space-bg-pink: var(--cu-pink900);\n  --cu-avatar-space-bg-violet: var(--cu-violet900);\n  --cu-avatar-space-bg-brown: var(--cu-brown900);\n  --cu-avatar-space-bg-black: var(--cu-black900);\n  --cu-avatar-space-content-purple: var(--cu-purple100);\n  --cu-avatar-space-content-neon-blue: var(--cu-neonBlue100);\n  --cu-avatar-space-content-azure-blue: var(--cu-azureBlue100);\n  --cu-avatar-space-content-teal: var(--cu-teal100);\n  --cu-avatar-space-content-mint: var(--cu-mint100);\n  --cu-avatar-space-content-yellow: var(--cu-yellow100);\n  --cu-avatar-space-content-orange: var(--cu-orange100);\n  --cu-avatar-space-content-red: var(--cu-red100);\n  --cu-avatar-space-content-pink: var(--cu-pink100);\n  --cu-avatar-space-content-violet: var(--cu-violet100);\n  --cu-avatar-space-content-brown: var(--cu-brown100);\n  --cu-avatar-space-content-black: var(--cu-black100);\n  --cu-quill-banner-red: var(--cu-red1100);\n  --cu-quill-banner-orange: var(--cu-orange1100);\n  --cu-quill-banner-yellow: var(--cu-yellow1100);\n  --cu-quill-banner-azure-blue: var(--cu-azureBlue1100);\n  --cu-quill-banner-purple: var(--cu-purple1100);\n  --cu-quill-banner-pink: var(--cu-pink1100);\n  --cu-quill-banner-green: var(--cu-green1100);\n  --cu-quill-banner-black: var(--cu-black1100);\n  --cu-quill-banner-border-red: var(--cu-red500);\n  --cu-quill-banner-border-orange: var(--cu-orange500);\n  --cu-quill-banner-border-yellow: var(--cu-yellow500);\n  --cu-quill-banner-border-azure-blue: var(--cu-azureBlue500);\n  --cu-quill-banner-border-purple: var(--cu-purple500);\n  --cu-quill-banner-border-pink: var(--cu-pink500);\n  --cu-quill-banner-border-green: var(--cu-green500);\n  --cu-quill-banner-border-black: var(--cu-black500);\n  --cu-background-overlay: rgba(var(--_cu-grey1100), .64);\n  --cu-background-overlay-light: rgba(var(--_cu-grey1100), .32);\n  --cu-elevation-1: 0 calc(1 / var(--rem-divisor) * var(--rem-return-unit)) calc(4 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16);\n  --cu-elevation-2: 0 calc(2 / var(--rem-divisor) * var(--rem-return-unit)) calc(8 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16);\n  --cu-elevation-3: 0 calc(4 / var(--rem-divisor) * var(--rem-return-unit)) calc(16 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16);\n  --cu-elevation-4: 0 calc(6 / var(--rem-divisor) * var(--rem-return-unit)) calc(24 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16) ;\n}\n\nbody.dark-theme.cu-purple, body.cu-purple .dark-sidebar {\n  --cu-background-primary: var(--cu-purple500);\n  --cu-background-primary-hover: var(--cu-purple400);\n  --cu-background-primary-pressed: var(--cu-purple500);\n  --cu-background-primary-disabled: var(--cu-purple900);\n  --cu-background-primary-subtle: var(--cu-purple1100);\n  --cu-background-primary-on-subtle: var(--cu-purple1000);\n  --cu-content-primary: var(--cu-purple400);\n  --cu-border-primary: var(--cu-purple500);\n  --cu-border-primary-focus: var(--cu-purple500);\n  --cu-effect-primary: var(--cu-purple500-16);\n  --cu-link-primary: var(--cu-purple400);\n  --cu-link-primary-hover: var(--cu-purple300) ;\n}\n\nbody.dark-theme.cu-neonBlue, body.cu-neonBlue .dark-sidebar {\n  --cu-background-primary: var(--cu-neonBlue500);\n  --cu-background-primary-hover: var(--cu-neonBlue400);\n  --cu-background-primary-pressed: var(--cu-neonBlue500);\n  --cu-background-primary-disabled: var(--cu-neonBlue900);\n  --cu-background-primary-subtle: var(--cu-neonBlue1100);\n  --cu-background-primary-on-subtle: var(--cu-neonBlue1000);\n  --cu-content-primary: var(--cu-neonBlue400);\n  --cu-border-primary: var(--cu-neonBlue500);\n  --cu-border-primary-focus: var(--cu-neonBlue500);\n  --cu-effect-primary: var(--cu-neonBlue500-16);\n  --cu-link-primary: var(--cu-neonBlue400);\n  --cu-link-primary-hover: var(--cu-neonBlue300) ;\n}\n\nbody.dark-theme.cu-azureBlue, body.cu-azureBlue .dark-sidebar {\n  --cu-background-primary: var(--cu-azureBlue500);\n  --cu-background-primary-hover: var(--cu-azureBlue400);\n  --cu-background-primary-pressed: var(--cu-azureBlue500);\n  --cu-background-primary-disabled: var(--cu-azureBlue900);\n  --cu-background-primary-subtle: var(--cu-azureBlue1100);\n  --cu-background-primary-on-subtle: var(--cu-azureBlue1000);\n  --cu-content-primary: var(--cu-azureBlue400);\n  --cu-border-primary: var(--cu-azureBlue500);\n  --cu-border-primary-focus: var(--cu-azureBlue500);\n  --cu-effect-primary: var(--cu-azureBlue500-16);\n  --cu-link-primary: var(--cu-azureBlue400);\n  --cu-link-primary-hover: var(--cu-azureBlue300) ;\n}\n\nbody.dark-theme.cu-teal, body.cu-teal .dark-sidebar {\n  --cu-background-primary: var(--cu-teal500);\n  --cu-background-primary-hover: var(--cu-teal400);\n  --cu-background-primary-pressed: var(--cu-teal500);\n  --cu-background-primary-disabled: var(--cu-teal900);\n  --cu-background-primary-subtle: var(--cu-teal1100);\n  --cu-background-primary-on-subtle: var(--cu-teal1000);\n  --cu-content-primary: var(--cu-teal400);\n  --cu-border-primary: var(--cu-teal500);\n  --cu-border-primary-focus: var(--cu-teal500);\n  --cu-effect-primary: var(--cu-teal500-16);\n  --cu-link-primary: var(--cu-teal400);\n  --cu-link-primary-hover: var(--cu-teal300) ;\n}\n\nbody.dark-theme.cu-mint, body.cu-mint .dark-sidebar {\n  --cu-background-primary: var(--cu-mint500);\n  --cu-background-primary-hover: var(--cu-mint400);\n  --cu-background-primary-pressed: var(--cu-mint500);\n  --cu-background-primary-disabled: var(--cu-mint900);\n  --cu-background-primary-subtle: var(--cu-mint1100);\n  --cu-background-primary-on-subtle: var(--cu-mint1000);\n  --cu-content-primary: var(--cu-mint400);\n  --cu-border-primary: var(--cu-mint500);\n  --cu-border-primary-focus: var(--cu-mint500);\n  --cu-effect-primary: var(--cu-mint500-16);\n  --cu-link-primary: var(--cu-mint400);\n  --cu-link-primary-hover: var(--cu-mint300) ;\n}\n\nbody.dark-theme.cu-orange, body.cu-orange .dark-sidebar {\n  --cu-background-primary: var(--cu-orange500);\n  --cu-background-primary-hover: var(--cu-orange400);\n  --cu-background-primary-pressed: var(--cu-orange500);\n  --cu-background-primary-disabled: var(--cu-orange900);\n  --cu-background-primary-subtle: var(--cu-orange1100);\n  --cu-background-primary-on-subtle: var(--cu-orange1000);\n  --cu-content-primary: var(--cu-orange400);\n  --cu-border-primary: var(--cu-orange500);\n  --cu-border-primary-focus: var(--cu-orange500);\n  --cu-effect-primary: var(--cu-orange500-16);\n  --cu-link-primary: var(--cu-orange400);\n  --cu-link-primary-hover: var(--cu-orange300) ;\n}\n\nbody.dark-theme.cu-pink, body.cu-pink .dark-sidebar {\n  --cu-background-primary: var(--cu-pink500);\n  --cu-background-primary-hover: var(--cu-pink400);\n  --cu-background-primary-pressed: var(--cu-pink500);\n  --cu-background-primary-disabled: var(--cu-pink900);\n  --cu-background-primary-subtle: var(--cu-pink1100);\n  --cu-background-primary-on-subtle: var(--cu-pink1000);\n  --cu-content-primary: var(--cu-pink400);\n  --cu-border-primary: var(--cu-pink500);\n  --cu-border-primary-focus: var(--cu-pink500);\n  --cu-effect-primary: var(--cu-pink500-16);\n  --cu-link-primary: var(--cu-pink400);\n  --cu-link-primary-hover: var(--cu-pink300) ;\n}\n\nbody.dark-theme.cu-violet, body.cu-violet .dark-sidebar {\n  --cu-background-primary: var(--cu-violet500);\n  --cu-background-primary-hover: var(--cu-violet400);\n  --cu-background-primary-pressed: var(--cu-violet500);\n  --cu-background-primary-disabled: var(--cu-violet900);\n  --cu-background-primary-subtle: var(--cu-violet1100);\n  --cu-background-primary-on-subtle: var(--cu-violet1000);\n  --cu-content-primary: var(--cu-violet400);\n  --cu-border-primary: var(--cu-violet500);\n  --cu-border-primary-focus: var(--cu-violet500);\n  --cu-effect-primary: var(--cu-violet500-16);\n  --cu-link-primary: var(--cu-violet400);\n  --cu-link-primary-hover: var(--cu-violet300) ;\n}\n\nbody.dark-theme.cu-brown, body.cu-brown .dark-sidebar {\n  --cu-background-primary: var(--cu-brown500);\n  --cu-background-primary-hover: var(--cu-brown400);\n  --cu-background-primary-pressed: var(--cu-brown500);\n  --cu-background-primary-disabled: var(--cu-brown900);\n  --cu-background-primary-subtle: var(--cu-brown1100);\n  --cu-background-primary-on-subtle: var(--cu-brown1000);\n  --cu-content-primary: var(--cu-brown400);\n  --cu-border-primary: var(--cu-brown500);\n  --cu-border-primary-focus: var(--cu-brown500);\n  --cu-effect-primary: var(--cu-brown500-16);\n  --cu-link-primary: var(--cu-brown400);\n  --cu-link-primary-hover: var(--cu-brown300) ;\n}\n\nbody.dark-theme.cu-black, body.cu-black .dark-sidebar {\n  --cu-background-primary: var(--cu-black500);\n  --cu-background-primary-hover: var(--cu-black400);\n  --cu-background-primary-pressed: var(--cu-black500);\n  --cu-background-primary-disabled: var(--cu-black900);\n  --cu-background-primary-subtle: var(--cu-black1100);\n  --cu-background-primary-on-subtle: var(--cu-black1000);\n  --cu-content-primary: var(--cu-black400);\n  --cu-border-primary: var(--cu-black500);\n  --cu-border-primary-focus: var(--cu-black500);\n  --cu-effect-primary: var(--cu-black500-16);\n  --cu-link-primary: var(--cu-black400);\n  --cu-link-primary-hover: var(--cu-black300) ;\n}\n\nbody.dark-theme.cu-custom, body.cu-custom .dark-sidebar {\n  --cu-custom1100: hsl(var(--cu-custom-hue, 83), 19%, 26%);\n  --cu-custom1000: hsl(var(--cu-custom-hue, 83), 27%, 33%);\n  --cu-custom900: hsl(var(--cu-custom-hue, 83), 32%, 40%);\n  --cu-custom800: hsl(var(--cu-custom-hue, 83), 35%, 47%);\n  --cu-custom700: hsl(var(--cu-custom-hue, 83), 44%, 54%);\n  --cu-custom600: hsl(var(--cu-custom-hue, 83), 67%, 63%);\n  --cu-custom600-16: hsl(var(--cu-custom-hue, 83), 67%, 63%, 16%);\n  --cu-custom500: hsl(var(--cu-custom-hue, 83), 67%, 70%);\n  --cu-custom500-16: hsl(var(--cu-custom-hue, 83), 67%, 70%, 16%);\n  --cu-custom400: hsl(var(--cu-custom-hue, 83), 67%, 76%);\n  --cu-custom300: hsl(var(--cu-custom-hue, 83), 67%, 82%);\n  --cu-custom200: hsl(var(--cu-custom-hue, 83), 67%, 88%);\n  --cu-custom100: hsl(var(--cu-custom-hue, 83), 67%, 94%);\n  --cu-custom50: hsl(var(--cu-custom-hue, 83), 73%, 97%);\n  --cu-background-primary: var(--cu-custom500);\n  --cu-background-primary-hover: var(--cu-custom400);\n  --cu-background-primary-pressed: var(--cu-custom500);\n  --cu-background-primary-disabled: var(--cu-custom900);\n  --cu-background-primary-subtle: var(--cu-custom1100);\n  --cu-background-primary-on-subtle: var(--cu-custom1000);\n  --cu-content-primary: var(--cu-custom400);\n  --cu-border-primary: var(--cu-custom500);\n  --cu-border-primary-focus: var(--cu-custom500);\n  --cu-effect-primary: var(--cu-custom500-16);\n  --cu-link-primary: var(--cu-custom400);\n  --cu-link-primary-hover: var(--cu-custom300) ;\n}\n\nbody {\n  --cu-background-main: var(--cu-white);\n  --cu-background-main-hover: var(--cu-grey50);\n  --cu-background-main-hover-strong: var(--cu-grey100);\n  --cu-background-main-pressed: var(--cu-grey200);\n  --cu-background-main-offset: var(--cu-white);\n  --cu-background-main-inverse: var(--cu-grey1000);\n  --cu-background-main-inverse-offset: var(--cu-grey1000);\n  --cu-background-subtle: var(--cu-grey50);\n  --cu-background-subtle-hover: var(--cu-grey100);\n  --cu-background-subtle-hover-strong: var(--cu-grey200);\n  --cu-background-subtle-pressed: var(--cu-grey300);\n  --cu-background-subtle-offset: var(--cu-grey50);\n  --cu-background-on-main: var(--cu-grey100);\n  --cu-background-on-main-hover: var(--cu-grey200);\n  --cu-background-on-main-pressed: var(--cu-grey300);\n  --cu-background-on-subtle: var(--cu-grey200);\n  --cu-background-on-subtle-hover: var(--cu-grey300);\n  --cu-background-on-subtle-pressed: var(--cu-grey200);\n  --cu-background-success: var(--cu-green600);\n  --cu-background-success-subtle: var(--cu-green50);\n  --cu-background-warning: var(--cu-yellow600);\n  --cu-background-warning-subtle: var(--cu-yellow50);\n  --cu-background-danger: var(--cu-red600);\n  --cu-background-danger-hover: var(--cu-red700);\n  --cu-background-danger-pressed: var(--cu-red800);\n  --cu-background-danger-disabled: var(--cu-red200);\n  --cu-background-danger-subtle: var(--cu-red50);\n  --cu-background-danger-subtle-hover: var(--cu-red100);\n  --cu-background-danger-subtle-pressed: var(--cu-red200);\n  --cu-background-tooltip: var(--cu-grey1000);\n  --cu-background-modal: var(--cu-grey1000);\n  --cu-background-on-dark-hover: var(--cu-white-10);\n  --cu-background-on-dark-pressed: var(--cu-white-20);\n  --cu-background-on-light-hover: var(--cu-grey1000-10);\n  --cu-background-on-light-pressed: var(--cu-grey1000-20);\n  --cu-background-notification: var(--cu-pink600);\n  --cu-content-default: var(--cu-grey1000);\n  --cu-content-secondary: var(--cu-grey700);\n  --cu-content-tertiary: var(--cu-grey600);\n  --cu-content-placeholder: var(--cu-grey500);\n  --cu-content-disabled: var(--cu-grey400);\n  --cu-content-success: var(--cu-green700);\n  --cu-content-warning: var(--cu-yellow700);\n  --cu-content-danger: var(--cu-red700);\n  --cu-content-danger-disabled: var(--cu-red300);\n  --cu-content-on-dark: var(--cu-white);\n  --cu-content-on-dark-disabled: var(--cu-white-50);\n  --cu-content-on-dark-secondary: var(--cu-white-80);\n  --cu-content-on-light: var(--cu-grey1000);\n  --cu-content-on-light-disabled: var(--cu-grey1000-50);\n  --cu-border-default: var(--cu-grey200);\n  --cu-border-low-contrast: rgb(var(--_cu-grey100));\n  --cu-border-high-contrast: rgb(var(--_cu-grey300));\n  --cu-border-hover: var(--cu-grey400);\n  --cu-border-input: var(--cu-grey500);\n  --cu-border-input-hover: var(--cu-grey600);\n  --cu-border-success: var(--cu-green600);\n  --cu-border-danger: var(--cu-red600);\n  --cu-border-danger-focus: var(--cu-red600);\n  --cu-border-warning: var(--cu-yellow600);\n  --cu-border-on-dark: var(--cu-white-50);\n  --cu-border-on-dark-focus: var(--cu-white);\n  --cu-border-on-light: var(--cu-grey1000-50);\n  --cu-border-on-light-focus: var(--cu-grey1000);\n  --cu-effect-danger: var(--cu-red600-16);\n  --cu-effect-on-dark: var(--cu-white-16);\n  --cu-effect-on-light: var(--cu-grey1000-16);\n  --cu-link-hyperlink: var(--cu-neonBlue600);\n  --cu-link-hyperlink-hover: var(--cu-neonBlue700);\n  --cu-fab-icon-pink: var(--cu-pink600);\n  --cu-fab-icon-yellow: var(--cu-yellow600);\n  --cu-fab-icon-mint: var(--cu-mint600);\n  --cu-fab-icon-azure-blue: var(--cu-azureBlue600);\n  --cu-alert-banner-background: var(--cu-grey1000);\n  --cu-alert-banner-background-subtle: var(--cu-grey100);\n  --cu-alert-banner-content: var(--cu-white);\n  --cu-alert-banner-content-dark: var(--cu-grey1000);\n  --cu-avatar-user-bg-purple: var(--cu-purple500);\n  --cu-avatar-user-bg-neon-blue: var(--cu-neonBlue500);\n  --cu-avatar-user-bg-azure-blue: var(--cu-azureBlue500);\n  --cu-avatar-user-bg-teal: var(--cu-teal500);\n  --cu-avatar-user-bg-mint: var(--cu-mint500);\n  --cu-avatar-user-bg-yellow: var(--cu-yellow500);\n  --cu-avatar-user-bg-orange: var(--cu-orange500);\n  --cu-avatar-user-bg-red: var(--cu-red500);\n  --cu-avatar-user-bg-pink: var(--cu-pink500);\n  --cu-avatar-user-bg-violet: var(--cu-violet500);\n  --cu-avatar-user-bg-brown: var(--cu-brown500);\n  --cu-avatar-user-bg-black: var(--cu-black500);\n  --cu-avatar-user-online: var(--cu-green500);\n  --cu-avatar-user-guest: var(--cu-grey400);\n  --cu-avatar-user-remove: var(--cu-grey1000);\n  --cu-automations-usage-bg-neon-blue: var(--cu-neonBlue50);\n  --cu-automations-usage-content-neon-blue: var(--cu-neonBlue700);\n  --cu-automations-usage-bg-teal: var(--cu-teal50);\n  --cu-automations-usage-content-teal: var(--cu-teal700);\n  --cu-avatar-space-bg-purple: var(--cu-purple200);\n  --cu-avatar-space-bg-neon-blue: var(--cu-neonBlue200);\n  --cu-avatar-space-bg-azure-blue: var(--cu-azureBlue200);\n  --cu-avatar-space-bg-teal: var(--cu-teal200);\n  --cu-avatar-space-bg-mint: var(--cu-mint200);\n  --cu-avatar-space-bg-yellow: var(--cu-yellow200);\n  --cu-avatar-space-bg-orange: var(--cu-orange200);\n  --cu-avatar-space-bg-red: var(--cu-red200);\n  --cu-avatar-space-bg-pink: var(--cu-pink200);\n  --cu-avatar-space-bg-violet: var(--cu-violet200);\n  --cu-avatar-space-bg-brown: var(--cu-brown200);\n  --cu-avatar-space-bg-black: var(--cu-black200);\n  --cu-avatar-space-content-purple: var(--cu-purple1000);\n  --cu-avatar-space-content-neon-blue: var(--cu-neonBlue1000);\n  --cu-avatar-space-content-azure-blue: var(--cu-azureBlue1000);\n  --cu-avatar-space-content-teal: var(--cu-teal1000);\n  --cu-avatar-space-content-mint: var(--cu-mint1000);\n  --cu-avatar-space-content-yellow: var(--cu-yellow1000);\n  --cu-avatar-space-content-orange: var(--cu-orange1000);\n  --cu-avatar-space-content-red: var(--cu-red1000);\n  --cu-avatar-space-content-pink: var(--cu-pink1000);\n  --cu-avatar-space-content-violet: var(--cu-violet1000);\n  --cu-avatar-space-content-brown: var(--cu-brown1000);\n  --cu-avatar-space-content-black: var(--cu-black1000);\n  --cu-quill-banner-red: var(--cu-red50);\n  --cu-quill-banner-orange: var(--cu-orange50);\n  --cu-quill-banner-yellow: var(--cu-yellow50);\n  --cu-quill-banner-azure-blue: var(--cu-azureBlue50);\n  --cu-quill-banner-purple: var(--cu-purple50);\n  --cu-quill-banner-pink: var(--cu-pink50);\n  --cu-quill-banner-green: var(--cu-green50);\n  --cu-quill-banner-black: var(--cu-black50);\n  --cu-quill-banner-border-red: var(--cu-red600);\n  --cu-quill-banner-border-orange: var(--cu-orange600);\n  --cu-quill-banner-border-yellow: var(--cu-yellow600);\n  --cu-quill-banner-border-azure-blue: var(--cu-azureBlue600);\n  --cu-quill-banner-border-purple: var(--cu-purple600);\n  --cu-quill-banner-border-pink: var(--cu-pink600);\n  --cu-quill-banner-border-green: var(--cu-green600);\n  --cu-quill-banner-border-black: var(--cu-black600);\n  --cu-background-overlay: rgba(var(--_cu-grey1000), .56);\n  --cu-background-overlay-light: rgba(var(--_cu-grey1000), .32);\n  --cu-elevation-1: 0 calc(1 / var(--rem-divisor) * var(--rem-return-unit)) calc(4 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08);\n  --cu-elevation-2: 0 calc(2 / var(--rem-divisor) * var(--rem-return-unit)) calc(8 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08);\n  --cu-elevation-3: 0 calc(4 / var(--rem-divisor) * var(--rem-return-unit)) calc(16 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08);\n  --cu-elevation-4: 0 calc(6 / var(--rem-divisor) * var(--rem-return-unit)) calc(24 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08) ;\n}\n\nbody.cu-purple {\n  --cu-background-primary: var(--cu-purple600);\n  --cu-background-primary-hover: var(--cu-purple700);\n  --cu-background-primary-pressed: var(--cu-purple800);\n  --cu-background-primary-disabled: var(--cu-purple200);\n  --cu-background-primary-subtle: var(--cu-purple50);\n  --cu-background-primary-on-subtle: var(--cu-purple100);\n  --cu-content-primary: var(--cu-purple700);\n  --cu-border-primary: var(--cu-purple600);\n  --cu-border-primary-focus: var(--cu-purple600);\n  --cu-effect-primary: var(--cu-purple600-16);\n  --cu-link-primary: var(--cu-purple600);\n  --cu-link-primary-hover: var(--cu-purple700) ;\n}\n\nbody.cu-neonBlue {\n  --cu-background-primary: var(--cu-neonBlue600);\n  --cu-background-primary-hover: var(--cu-neonBlue700);\n  --cu-background-primary-pressed: var(--cu-neonBlue800);\n  --cu-background-primary-disabled: var(--cu-neonBlue200);\n  --cu-background-primary-subtle: var(--cu-neonBlue50);\n  --cu-background-primary-on-subtle: var(--cu-neonBlue100);\n  --cu-content-primary: var(--cu-neonBlue700);\n  --cu-border-primary: var(--cu-neonBlue600);\n  --cu-border-primary-focus: var(--cu-neonBlue600);\n  --cu-effect-primary: var(--cu-neonBlue600-16);\n  --cu-link-primary: var(--cu-neonBlue600);\n  --cu-link-primary-hover: var(--cu-neonBlue700) ;\n}\n\nbody.cu-azureBlue {\n  --cu-background-primary: var(--cu-azureBlue600);\n  --cu-background-primary-hover: var(--cu-azureBlue700);\n  --cu-background-primary-pressed: var(--cu-azureBlue800);\n  --cu-background-primary-disabled: var(--cu-azureBlue200);\n  --cu-background-primary-subtle: var(--cu-azureBlue50);\n  --cu-background-primary-on-subtle: var(--cu-azureBlue100);\n  --cu-content-primary: var(--cu-azureBlue700);\n  --cu-border-primary: var(--cu-azureBlue600);\n  --cu-border-primary-focus: var(--cu-azureBlue600);\n  --cu-effect-primary: var(--cu-azureBlue600-16);\n  --cu-link-primary: var(--cu-azureBlue600);\n  --cu-link-primary-hover: var(--cu-azureBlue700) ;\n}\n\nbody.cu-teal {\n  --cu-background-primary: var(--cu-teal600);\n  --cu-background-primary-hover: var(--cu-teal700);\n  --cu-background-primary-pressed: var(--cu-teal800);\n  --cu-background-primary-disabled: var(--cu-teal200);\n  --cu-background-primary-subtle: var(--cu-teal50);\n  --cu-background-primary-on-subtle: var(--cu-teal100);\n  --cu-content-primary: var(--cu-teal700);\n  --cu-border-primary: var(--cu-teal600);\n  --cu-border-primary-focus: var(--cu-teal600);\n  --cu-effect-primary: var(--cu-teal600-16);\n  --cu-link-primary: var(--cu-teal600);\n  --cu-link-primary-hover: var(--cu-teal700) ;\n}\n\nbody.cu-mint {\n  --cu-background-primary: var(--cu-mint600);\n  --cu-background-primary-hover: var(--cu-mint700);\n  --cu-background-primary-pressed: var(--cu-mint800);\n  --cu-background-primary-disabled: var(--cu-mint200);\n  --cu-background-primary-subtle: var(--cu-mint50);\n  --cu-background-primary-on-subtle: var(--cu-mint100);\n  --cu-content-primary: var(--cu-mint700);\n  --cu-border-primary: var(--cu-mint600);\n  --cu-border-primary-focus: var(--cu-mint600);\n  --cu-effect-primary: var(--cu-mint600-16);\n  --cu-link-primary: var(--cu-mint600);\n  --cu-link-primary-hover: var(--cu-mint700) ;\n}\n\nbody.cu-orange {\n  --cu-background-primary: var(--cu-orange600);\n  --cu-background-primary-hover: var(--cu-orange700);\n  --cu-background-primary-pressed: var(--cu-orange800);\n  --cu-background-primary-disabled: var(--cu-orange200);\n  --cu-background-primary-subtle: var(--cu-orange50);\n  --cu-background-primary-on-subtle: var(--cu-orange100);\n  --cu-content-primary: var(--cu-orange700);\n  --cu-border-primary: var(--cu-orange600);\n  --cu-border-primary-focus: var(--cu-orange600);\n  --cu-effect-primary: var(--cu-orange600-16);\n  --cu-link-primary: var(--cu-orange600);\n  --cu-link-primary-hover: var(--cu-orange700) ;\n}\n\nbody.cu-pink {\n  --cu-background-primary: var(--cu-pink600);\n  --cu-background-primary-hover: var(--cu-pink700);\n  --cu-background-primary-pressed: var(--cu-pink800);\n  --cu-background-primary-disabled: var(--cu-pink200);\n  --cu-background-primary-subtle: var(--cu-pink50);\n  --cu-background-primary-on-subtle: var(--cu-pink100);\n  --cu-content-primary: var(--cu-pink700);\n  --cu-border-primary: var(--cu-pink600);\n  --cu-border-primary-focus: var(--cu-pink600);\n  --cu-effect-primary: var(--cu-pink600-16);\n  --cu-link-primary: var(--cu-pink600);\n  --cu-link-primary-hover: var(--cu-pink700) ;\n}\n\nbody.cu-violet {\n  --cu-background-primary: var(--cu-violet600);\n  --cu-background-primary-hover: var(--cu-violet700);\n  --cu-background-primary-pressed: var(--cu-violet800);\n  --cu-background-primary-disabled: var(--cu-violet200);\n  --cu-background-primary-subtle: var(--cu-violet50);\n  --cu-background-primary-on-subtle: var(--cu-violet100);\n  --cu-content-primary: var(--cu-violet700);\n  --cu-border-primary: var(--cu-violet600);\n  --cu-border-primary-focus: var(--cu-violet600);\n  --cu-effect-primary: var(--cu-violet600-16);\n  --cu-link-primary: var(--cu-violet600);\n  --cu-link-primary-hover: var(--cu-violet700) ;\n}\n\nbody.cu-brown {\n  --cu-background-primary: var(--cu-brown600);\n  --cu-background-primary-hover: var(--cu-brown700);\n  --cu-background-primary-pressed: var(--cu-brown800);\n  --cu-background-primary-disabled: var(--cu-brown200);\n  --cu-background-primary-subtle: var(--cu-brown50);\n  --cu-background-primary-on-subtle: var(--cu-brown100);\n  --cu-content-primary: var(--cu-brown700);\n  --cu-border-primary: var(--cu-brown600);\n  --cu-border-primary-focus: var(--cu-brown600);\n  --cu-effect-primary: var(--cu-brown600-16);\n  --cu-link-primary: var(--cu-brown600);\n  --cu-link-primary-hover: var(--cu-brown700) ;\n}\n\nbody.cu-black {\n  --cu-background-primary: var(--cu-black600);\n  --cu-background-primary-hover: var(--cu-black700);\n  --cu-background-primary-pressed: var(--cu-black800);\n  --cu-background-primary-disabled: var(--cu-black200);\n  --cu-background-primary-subtle: var(--cu-black50);\n  --cu-background-primary-on-subtle: var(--cu-black100);\n  --cu-content-primary: var(--cu-black700);\n  --cu-border-primary: var(--cu-black600);\n  --cu-border-primary-focus: var(--cu-black600);\n  --cu-effect-primary: var(--cu-black600-16);\n  --cu-link-primary: var(--cu-black600);\n  --cu-link-primary-hover: var(--cu-black700) ;\n}\n\nbody.cu-custom {\n  --cu-custom1100: hsl(var(--cu-custom-hue, 83), 24%, 25%);\n  --cu-custom1000: hsl(var(--cu-custom-hue, 83), 31%, 33%);\n  --cu-custom900: hsl(var(--cu-custom-hue, 83), 36%, 40%);\n  --cu-custom800: hsl(var(--cu-custom-hue, 83), 41%, 47%);\n  --cu-custom700: hsl(var(--cu-custom-hue, 83), 53%, 54%);\n  --cu-custom600: hsl(var(--cu-custom-hue, 83), 81%, 63%);\n  --cu-custom600-16: hsl(var(--cu-custom-hue, 83), 81%, 63%, 16%);\n  --cu-custom500: hsl(var(--cu-custom-hue, 83), 81%, 70%);\n  --cu-custom500-16: hsl(var(--cu-custom-hue, 83), 81%, 70%, 16%);\n  --cu-custom400: hsl(var(--cu-custom-hue, 83), 81%, 76%);\n  --cu-custom300: hsl(var(--cu-custom-hue, 83), 82%, 82%);\n  --cu-custom200: hsl(var(--cu-custom-hue, 83), 83%, 88%);\n  --cu-custom100: hsl(var(--cu-custom-hue, 83), 80%, 94%);\n  --cu-custom50: hsl(var(--cu-custom-hue, 83), 86%, 97%);\n  --cu-background-primary: var(--cu-custom600);\n  --cu-background-primary-hover: var(--cu-custom700);\n  --cu-background-primary-pressed: var(--cu-custom800);\n  --cu-background-primary-disabled: var(--cu-custom200);\n  --cu-background-primary-subtle: var(--cu-custom50);\n  --cu-background-primary-on-subtle: var(--cu-custom100);\n  --cu-content-primary: var(--cu-custom700);\n  --cu-border-primary: var(--cu-custom600);\n  --cu-border-primary-focus: var(--cu-custom600);\n  --cu-effect-primary: var(--cu-custom600-16);\n  --cu-link-primary: var(--cu-custom600);\n  --cu-link-primary-hover: var(--cu-custom700) ;\n}\n\n.monday-style-menu--large {\n  width: unset;\n}\n\n.monday-style-dialog-content-wrapper {\n  z-index: 10001;\n}\n\n.p-dialog {\n  border-radius: 15px;\n  /*  border-radius: 12px; */\n  border: 1px solid rgba(255, 255, 255, 50%) !important;\n  /*  outline: rgba(120, 120, 120, 10%) solid 1px; */\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n  overflow: hidden;\n  background: white;\n  max-height: 100%;\n}\n\ndiv.p-component-overlay.p-component-overlay-enter.p-dialog-mask {\n  z-index: 100 !important;\n}\n\n.p-confirm-dialog .p-dialog-content {\n  padding: 20px !important;\n}\n\n.p-dialog-right .p-dialog {\n  outline: rgba(120, 120, 120, 10%) solid 1px;\n  border-radius: 0px !important;\n  margin-top: 100px !important;\n  padding-bottom: 45px;\n}\n\n.p-dialog:before {\n  content: \"\";\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  box-shadow: 0 0 130px 5px rgba(0, 0, 0, 0.3294117647);\n}\n\n.p-dialog-top .p-dialog, .p-dialog-bottom .p-dialog, .p-dialog-left .p-dialog, .p-dialog-right .p-dialog, .p-dialog-top-left .p-dialog, .p-dialog-top-right .p-dialog, .p-dialog-bottom-left .p-dialog, .p-dialog-bottom-right .p-dialog {\n  margin: 0;\n}\n\n.p-dialog .p-dialog-header {\n  border-bottom: 1px solid #D6E4ED;\n  color: #212529;\n  padding: 1rem;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  background: #F8FAFF;\n}\n\n.p-dialog .p-dialog-header .p-dialog-title {\n  font-size: 20px;\n  font-family: source sans pro semibold;\n  font-weight: normal;\n  line-height: 24px;\n  letter-spacing: normal;\n  color: #333D47;\n  flex-grow: 1;\n  word-break: break-word;\n}\n\n.p-dialog .p-dialog-content {\n  padding: 0px;\n}\n\n.p-dialog .p-dialog-footer {\n  border: none;\n}\n\n.p-overlaypanel:before {\n  border-width: 10px !important;\n}\n\n.p-overlaypanel:after {\n  border-width: 8px !important;\n}\n\n.p-overlaypanel:before {\n  border: solid transparent !important;\n  border-color: rgba(255, 255, 255, 0) !important;\n  border-bottom-color: #f2f2f2 !important;\n}\n\n.p-overlaypanel:after {\n  border: solid transparent !important;\n  border-color: rgba(255, 255, 255, 0) !important;\n  border-bottom-color: #ffffff !important;\n}\n\n.p-overlaypanel {\n  background: #ffffff !important;\n  color: rgba(0, 0, 0, 0.87) !important;\n  border: 0 none !important;\n  border-radius: 4px !important;\n  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;\n}\n\n.p-component-overlay {\n  background-color: rgba(46, 67, 84, 0.38) !important;\n}\n\n.p-fileupload .p-fileupload-content {\n  padding: 0px !important;\n  border: none !important;\n}\n\n.switch-group {\n  position: absolute;\n  width: 200%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  transition: left 0.35s;\n  -webkit-transition: left 0.35s;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n\n.switch-handle {\n  position: relative;\n  margin: 0 auto;\n  padding-top: 0px;\n  padding-bottom: 0px;\n  height: 100%;\n  width: 0px;\n  border-width: 0 1px;\n  background-color: #fff !important;\n}\n\n.switch.btn {\n  min-width: auto !important;\n  min-height: auto !important;\n}\n\n.switch.btn.btn-light,\n.switch.btn.btn-outline-light {\n  border: solid 1px rgba(0, 0, 0, 0.15);\n}\n\n.switch-on {\n  line-height: 20px;\n  font-size: 13px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 50%;\n  margin: 0;\n  border: 0;\n  border-radius: 0;\n}\n\n.switch-on.btn {\n  padding-right: 1.5rem;\n}\n\n.switch-off {\n  line-height: 20px;\n  font-size: 13px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  right: 0;\n  margin: 0;\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n}\n\n.switch-off.btn {\n  padding-left: 1.5rem;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #d34416;\n  border: solid 1px #d34416;\n}\n\n.btn-primary:hover {\n  color: #fff;\n  background-color: #d34416;\n  border: solid 1px #d34416;\n}\n\n.btn-light {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\ntd {\n  /* text-align: center; */\n  vertical-align: middle;\n}\n\n.tabs--wrapper {\n  padding: 0px !important;\n}\n\na.tab-inner.tabs-list_tab-inner {\n  padding: 0px !important;\n}\n\nli.tab--wrapper.tabs-list_tab--wrapper {\n  height: calc(100% - 2px) !important;\n  border-bottom: 0px !important;\n}\n\nli.tab--wrapper.tabs-list_tab--wrapper.tab-focus-visible-inset {\n  box-shadow: none;\n}\n\n/*HStack alignment bottom leading yap*/\nul.tabs-list {\n  height: 100% !important;\n}\n\n/* kanban */\nth.e-header-cells.e-template.e-toggle-header div.e-header-wrap {\n  height: 100%;\n  align-items: center;\n}\n\n.p-fileupload .p-fileupload-content {\n  background: transparent;\n}\n\n.monday-style-menu-title {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-size: 11px;\n  font-weight: 600;\n  flex-grow: 1;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #656f7d;\n  white-space: nowrap;\n}\n\n.monday-style-toast {\n  max-width: 500px;\n  z-index: 1000;\n}\n\ndiv.e-spinner-inner {\n  display: none !important;\n}\n\ndiv.e-spin-show.e-spinner-pane {\n  display: none !important;\n}\n\n@keyframes pop {\n  0% {\n    transform: scale(1);\n    box-shadow: var(--box-shadow);\n  }\n  100% {\n    transform: scale(var(--scale));\n    box-shadow: var(--box-shadow-picked-up);\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.size-xxs {\n  font-size: 14px;\n}\n\n:root {\n  --editor-max-width: 100%;\n  --editor-font-size: 16px;\n  --editor-line-height: 1.5;\n  --editor-paragraph-spacing: 0rem;\n  --editor-font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\n}\n\n.codex-editor__loader {\n  display: none !important;\n}\n\n/* .ce-block__content,\n.ce-toolbar__content {\n    max-width: var(--editor-max-width);\n}\n */\n.ce-block {\n  font-size: var(--editor-font-size);\n  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n}\n\n.ce-paragraph {\n  font-size: var(--editor-font-size);\n  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n}\n\n.codex-editor {\n  height: fit-content;\n  z-index: 100 !important;\n  color: #212526;\n  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n}\n\nh1.ce-header {\n  color: #212526;\n  font-weight: 500;\n  font-size: 28px;\n  line-height: 1.25;\n}\n\nh2.ce-header {\n  color: #212526;\n  font-weight: 500;\n  font-size: 22px;\n  line-height: 1.25;\n}\n\n.ce-toolbar__actions {\n  right: 100% !important;\n}\n\n.ce-toolbar__settings-btn {\n  color: gray !important;\n}\n\n.ce-toolbar__plus {\n  color: gray !important;\n}\n\n@media (min-width: 651px) {\n  .codex-editor--narrow .ce-toolbox .ce-popover {\n    right: auto !important;\n  }\n}\n.ce-block__content, .ce-toolbar__content {\n  max-width: 100% !important;\n}\n\n.codex-editor__redactor {\n  padding-bottom: 50px !important;\n}\n\n.editable-heading--wrapper {\n  width: auto !important;\n}\n\n/* .editable-heading-input{\n    height: 50px !important;\n} */\n/* .heading-component{\n    line-height: 48px !important;\n} */\n/* h4[data-testid='heading'] {\n    background-color: yellow;\n  } */\n/*   div[data-testid='dialog-content-container'] {\n    padding: 0px !important;\n  } \n   */\ndiv.bottom.react-flow__attribution.react-flow__panel.right[data-message=\"Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev\"][style=\"pointer-events: all;\"] {\n  display: none !important;\n}\n\n@media screen and (min-width: 1400px) {\n  html {\n    font-size: 14px;\n  }\n}\n@media screen and (min-width: 1600px) {\n  html {\n    font-size: 14px;\n  }\n}\n@media screen and (min-width: 1900px) {\n  html {\n    font-size: 14px;\n  }\n}\nhtml,\nbody {\n  margin: 0px;\n  padding: 0;\n  border: 0;\n  color: #505A64;\n  height: 100%;\n  -webkit-user-select: none;\n  position: relative;\n  overflow: hidden;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-font-smoothing: subpixel-antialiased !important;\n  /*  -webkit-font-smoothing: antialiased;\n  */\n  text-size-adjust: 100%;\n  text-rendering: optimizeLegibility;\n}\n\nbody {\n  cursor: var(--system-cursor-default), auto;\n  font-family: var(--font-family);\n  font-size: 1rem;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n}\n\na {\n  color: inherit;\n}\n\na,\nu {\n  text-decoration: none;\n}\n\n* {\n  /*-webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: grayscale;*/\n  box-sizing: border-box;\n}", "",{"version":3,"sources":["webpack://./src/client/css/theme.css","webpack://./src/client/css/global.scss","webpack://./src/client/css/overrides.css","webpack://./src/client/css/sizes.css","webpack://./src/client/css/editor.css","webpack://./src/client/css/EditableHeading.css"],"names":[],"mappings":"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;EACA,gCAAA;EACA,gCAAA;EACA,gCAAA;EACA,gCAAA;EACA,iCAAA;EACA,iCAAA;EACA,iCAAA;EACA,iCAAA;EACA,gCAAA;EACA,0BAAA;EACA,0BAAA;EACA,0BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,2BAAA;EACA,0BAAA;EACA,0BAAA;EACA,0BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,0BAAA;EACA,2BAAA;EACA,0BAAA;EACA,0BAAA;EACA,4BAAA;EACA,4BAAA;EACA,6BAAA;EACA,6BAAA;EACA,6BAAA;EACA,4BAAA;EACA,4BAAA;EACA,6BAAA;EACA,6BAAA;EACA,6BAAA;EACA,6BAAA;EACA,4BAAA;EACA,6BAAA;EACA,6BAAA;EACA,8BAAA;EACA,8BAAA;EACA,8BAAA;EACA,6BAAA;EACA,4BAAA;EACA,6BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,6BAAA;EACA,6BAAA;EACA,8BAAA;EACA,8BAAA;EACA,8BAAA;EACA,8BAAA;EACA,6BAAA;EACA,yBAAA;EACA,yBAAA;EACA,yBAAA;EACA,yBAAA;EACA,yBAAA;EACA,yBAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,0BAAA;EACA,0BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,4BAAA;EACA,2BAAA;EACA,4BAAA;EACA,6BAAA;EACA,6BAAA;EACA,6BAAA;EACA,6BAAA;EACA,6BAAA;EACA,8BAAA;EACA,8BAAA;EACA,8BAAA;EACA,8BAAA;EACA,8BAAA;EACA,6BAAA;EACA,2BAAA;EACA,2BAAA;EACA,2BAAA;EACA,6BAAA;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","sourcesContent":[":root {\r\n    --main-theme-color:#292F4C;\r\n}\r\n\r\n:root {\r\n    --color-highlight_blue: #cce5ff;\r\n    --color-basic_blue: #0073ea;\r\n    --color-dark_blue: #0060b9;\r\n    --color-bazooka: #f65f7c;\r\n    --color-snow_white: #ffffff;\r\n    --color-riverstone_gray: #f6f7fb;\r\n    --color-ui_grey: #dcdfec;\r\n    --color-wolf_gray: #c3c6d4;\r\n    --color-asphalt: #676879;\r\n    --color-mud_black: #323338;\r\n    --color-black: #000000;\r\n    --color-success: #258750;\r\n    --color-success-hover: #007038;\r\n    --color-success-highlight: #bbdbc9;\r\n    --color-error: #d83a52;\r\n    --color-error-hover: #b63546;\r\n    --color-error-highlight: #f4c3cb;\r\n    --color-link_color: #1f76c2;\r\n    --color-surface: #292f4c;\r\n    --primary-color: #0073ea;\r\n    --primary-hover-color: #0060b9;\r\n    --primary-selected-color: #cce5ff;\r\n    --primary-selected-hover-color: #aed4fc;\r\n    --primary-text-color: #292d34;\r\n    --text-color-on-primary: #ffffff;\r\n    --text-color-on-inverted: #ffffff;\r\n    --secondary-text-color: #676879;\r\n    --placeholder-color: #676879;\r\n    --icon-color: #676879;\r\n    --link-color: #1f76c2;\r\n    --primary-background-color: #ffffff;\r\n    --primary-background-hover-color: #dcdfec;\r\n    --secondary-background-color: #ffffff;\r\n    --grey-background-color: #f6f7fb;\r\n    --allgrey-background-color: #f6f7fb;\r\n    --inverted-color-background: #323338;\r\n    --disabled-background-color: #ecedf5;\r\n    --disabled-text-color: rgba(50, 51, 56, var(--disabled-component-opacity));\r\n    --positive-color: #258750;\r\n    --positive-color-hover: #007038;\r\n    --positive-color-selected: #bbdbc9;\r\n    --positive-color-selected-hover: #b5cec0;\r\n    --negative-color: #d83a52;\r\n    --negative-color-hover: #b63546;\r\n    --negative-color-selected: #f4c3cb;\r\n    --negative-color-selected-hover: #ecb7bf;\r\n    --private-color: #f65f7c;\r\n    --shareable-color: #a25ddc;\r\n    --ui-border-color: #c3c6d4;\r\n    --layout-border-color: #d0d4e4;\r\n    --box-shadow-xs: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);\r\n    --box-shadow-small: 0px 4px 8px rgba(0, 0, 0, 0.2);\r\n    --box-shadow-medium: 0px 6px 20px rgba(0, 0, 0, 0.2);\r\n    --box-shadow-large: 0px 15px 50px rgba(0, 0, 0, 0.3);\r\n    --color-grass_green: #037f4c;\r\n    --color-grass_green-hover: #116846;\r\n    --color-grass_green-selected: #81bfa5;\r\n    --color-done-green: #00c875;\r\n    --color-done-green-hover: #0f9b63;\r\n    --color-done-green-selected: #80e3ba;\r\n    --color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);\r\n    --color-bright-green: #9cd326;\r\n    --color-bright-green-hover: #7ca32b;\r\n    --color-bright-green-selected: #cde992;\r\n    --color-saladish: #cab641;\r\n    --color-saladish-hover: #9d8f3e;\r\n    --color-saladish-selected: #e4daa0;\r\n    --color-egg_yolk: #ffcb00;\r\n    --color-egg_yolk-hover: #c29e11;\r\n    --color-egg_yolk-selected: #ffe580;\r\n    --color-egg_yolk-rgb: 255,213,51;\r\n    --color-working_orange: #fdab3d;\r\n    --color-working_orange-hover: #c0873c;\r\n    --color-working_orange-selected: #fed59e;\r\n    --color-dark-orange: #ff642e;\r\n    --color-dark-orange-hover: #c25531;\r\n    --color-dark-orange-selected: #ffb196;\r\n    --color-peach: #ffadad;\r\n    --color-peach-hover: #c2888a;\r\n    --color-peach-selected: #ffd6d6;\r\n    --color-sunset: #ff7575;\r\n    --color-sunset-hover: #c26163;\r\n    --color-sunset-selected: #ffbaba;\r\n    --color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);\r\n    --color-stuck-red: #e2445c;\r\n    --color-stuck-red-hover: #ad3f51;\r\n    --color-stuck-red-selected: #f0a1ad;\r\n    --color-dark-red: #bb3354;\r\n    --color-dark-red-hover: #92334c;\r\n    --color-dark-red-selected: #dd99a9;\r\n    --color-sofia_pink: #ff158a;\r\n    --color-sofia_pink-hover: #c21e71;\r\n    --color-sofia_pink-selected: #ff8ac4;\r\n    --color-lipstick: #ff5ac4;\r\n    --color-lipstick-hover: #c24e9a;\r\n    --color-lipstick-selected: #fface1;\r\n    --color-bubble: #faa1f1;\r\n    --color-bubble-hover: #be80ba;\r\n    --color-bubble-selected: #fcd0f8;\r\n    --color-purple: #a25ddc;\r\n    --color-purple-hover: #8050ab;\r\n    --color-purple-selected: #d0aeed;\r\n    --color-dark_purple: #784bd1;\r\n    --color-dark_purple-hover: #6344a3;\r\n    --color-dark_purple-selected: #bba5e8;\r\n    --color-berry: #7e3b8a;\r\n    --color-berry-hover: #673971;\r\n    --color-berry-selected: #be9dc4;\r\n    --color-dark_indigo: #401694;\r\n    --color-dark_indigo-hover: #3c1f78;\r\n    --color-dark_indigo-selected: #a08bc9;\r\n    --color-indigo: #5559df;\r\n    --color-indigo-hover: #4b4ead;\r\n    --color-indigo-selected: #aaacef;\r\n    --color-navy: #225091;\r\n    --color-navy-hover: #274776;\r\n    --color-navy-selected: #90a7c8;\r\n    --color-bright-blue: #579bfc;\r\n    --color-bright-blue-hover: #4c7cc1;\r\n    --color-bright-blue-selected: #abcdfd;\r\n    --color-dark-blue: #0086c0;\r\n    --color-dark-blue-hover: #0f6d97;\r\n    --color-dark-blue-selected: #80c2df;\r\n    --color-aquamarine: #4eccc6;\r\n    --color-aquamarine-hover: #469e9b;\r\n    --color-aquamarine-selected: #a6e5e2;\r\n    --color-chili-blue: #66ccff;\r\n    --color-chili-blue-hover: #569ec3;\r\n    --color-chili-blue-selected: #b2e5ff;\r\n    --color-river: #68a1bd;\r\n    --color-river-hover: #588095;\r\n    --color-river-selected: #b3d0de;\r\n    --color-winter: #9aadbd;\r\n    --color-winter-hover: #7b8895;\r\n    --color-winter-selected: #ccd6de;\r\n    --color-explosive: #c4c4c4;\r\n    --color-explosive-hover: #98999a;\r\n    --color-explosive-selected: #e1e1e1;\r\n    --color-american_gray: #808080;\r\n    --color-american_gray-hover: #69696a;\r\n    --color-american_gray-selected: #bfbfbf;\r\n    --color-blackish: #333333;\r\n    --color-blackish-hover: #222222;\r\n    --color-blackish-selected: #999999;\r\n    --color-brown: #7f5347;\r\n    --color-brown-hover: #684943;\r\n    --color-brown-selected: #bfa9a3;\r\n    --color-orchid: #D974B0;\r\n    --color-orchid-hover: #AE5D8D;\r\n    --color-orchid-selected: #ECBAD7;\r\n    --color-tan: #AD967A;\r\n    --color-tan-hover: #8A7862;\r\n    --color-tan-selected: #D6CABC;\r\n    --color-sky: #A1E3F6;\r\n    --color-sky-hover: #81B6C5;\r\n    --color-sky-selected: #D0F1FA;\r\n    --color-coffee: #BD816E;\r\n    --color-coffee-hover: #976758;\r\n    --color-coffee-selected: #DEC0B7;\r\n    --color-royal: #2B76E5;\r\n    --color-royal-hover: #225EB7;\r\n    --color-royal-selected: #95BBF2;\r\n    --color-teal: #175A63;\r\n    --color-teal-hover: #12484F;\r\n    --color-teal-selected: #8BACB1;\r\n    --color-lavender: #BDA8F9;\r\n    --color-lavender-hover: #9786C7;\r\n    --color-lavender-selected: #DED4FC;\r\n    --color-steel: #A9BEE8;\r\n    --color-steel-hover: #8798BA;\r\n    --color-steel-selected: #D4DFF4;\r\n    --color-lilac: #9D99B9;\r\n    --color-lilac-hover: #7E7A94;\r\n    --color-lilac-selected: #CECCDC;\r\n    --color-pecan: #563E3E;\r\n    --color-pecan-hover: #453232;\r\n    --color-pecan-selected: #AB9F9F;\r\n    --color-dark_marble: #f1f1f1;\r\n    --color-marble: #f7f7f7;\r\n    --color-gainsboro: #e1e1e1;\r\n    --color-extra_light_gray: #edeef0;\r\n    --color-glitter: #d9f0ff;\r\n    --color-ultra_light_gray: #ebebeb;\r\n    --color-very_light_gray: #a1a1a1;\r\n    --color-jaco_gray: #9699a6;\r\n    --color-storm_gray: #6b6d77;\r\n    --color-trolley-grey: #808080;\r\n    --color-basic_light_blue: #c7e6fa;\r\n    --color-light_blue: #61caf7;\r\n    --color-turquoise: #66ccff;\r\n    --color-aqua: #00d1d1;\r\n    --color-live_blue: #009aff;\r\n    --color-jeans: #597bfc;\r\n    --color-burned_eggplant: #181d37;\r\n    --color-light-pink: #ff5ac4;\r\n    --color-dark-pink: #ff158a;\r\n    --color-dark_red: #bb3354;\r\n    --color-yellow: #ffcb00;\r\n    --color-mustered: #cab641;\r\n    --color-orange: #fdab3d;\r\n    --color-lime-green: #9cd326;\r\n    --color-jade: #03c875;\r\n    --color-green-haze: #00a359;\r\n    --color-grass-green: #037f4c;\r\n    --color-amethyst: #a25ddc;\r\n    --color-dark-purple: #784bd1;\r\n    --color-blue_links: #0086c0;\r\n    --color-blue-links: #0086c0;\r\n    --color-private: #f65f7c;\r\n    --color-public: #009aff;\r\n    --color-board_views_grey: #6e6f8f;\r\n    --color-board_views_grey_hover: #b2b3d0;\r\n    --color-board_views_blue: #1c1f3b;\r\n    --color-board_views_blue_secondary: #363a52;\r\n    --color-border_light_gray: #f5f6f8;\r\n    --color-brand-blue: #00a9ff;\r\n    --color-brand-charcoal: #2b2c5c;\r\n    --color-brand-gold: #ffcc00;\r\n    --color-brand-green: #11dd80;\r\n    --color-brand-iris: #595ad4;\r\n    --color-brand-light-blue: #00cff4;\r\n    --color-brand-malachite: #00cd6f;\r\n    --color-brand-purple: #a358d0;\r\n    --color-brand-red: #f74875;\r\n    --color-deadline_upcoming_indication: #5d6387;\r\n    --color-default_group_color: #579bfc;\r\n    --color-form_btn_hover: #0083d9;\r\n    --color-form_purple: #575c96;\r\n    --color-highlight: #dff0ff;\r\n    --color-green_shadow: #00c875;\r\n    --color-green-shadow: #00c875;\r\n    --color-red_shadow: #e2445c;\r\n    --color-red-shadow: #e2445c;\r\n    --color-pulse_bg: #f0f0f0;\r\n    --color-pulse_text_color: #333333;\r\n    --color-placholder_gray: #d8d8d8;\r\n    --color-placeholder_light_gray: #efefef;\r\n    --color-excel-green: #207245;\r\n    --color-media-blue: #2ea2e9;\r\n    --color-pdf-red: #bb0706;\r\n    --color-ppt-orange: #d64e2a;\r\n    --color-word-blue: #2a5699;\r\n    --color-zip-orange: #e4901c;\r\n    --color-like_red: #fb275d;\r\n    --color-scrollbar_gray: #b2b2b2;\r\n    --color-timeline_grid_blue: #454662;\r\n    --color-timeline_blue: #1c1f3b;\r\n    --color-highlight_blue-rgb: 204,229,255;\r\n    --color-snow_white-with-opacity: rgba(255, 255, 255, 0.4);\r\n    --color-wolf_gray-with-opacity: rgba(195, 198, 212, 0.1);\r\n    --color-asphalt-with-opacity: rgba(103, 104, 121, 0.1);\r\n    --primary-on-secondary-color: #0073ea;\r\n    --primary-hover-on-secondary-color: #0060b9;\r\n    --primary-selected-color-rgb: 204,229,255;\r\n    --primary-selected-on-secondary-color: #cce5ff;\r\n    --primary-text-on-secondary-color: #323338;\r\n    --text-color-on-primary-with-opacity: rgba(255, 255, 255, 0.4);\r\n    --secondary-text-on-secondary-color: #676879;\r\n    --placeholder-color-with-opacity: rgba(103, 104, 121, 0.1);\r\n    --placeholder-on-secondary-color: #676879;\r\n    --icon-on-secondary-color: #676879;\r\n    --link-on-secondary-color: #1f76c2;\r\n    --label-background-color: #cce5ff;\r\n    --label-background-on-secondary-color: #cce5ff;\r\n    --primary-background-color-rgb: 255,255,255;\r\n    --primary-background-hover-on-secondary-color: #dcdfec;\r\n    --modal-background-color: #ffffff;\r\n    --secondary-background-color-rgb: 255,255,255;\r\n    --disabled-background-on-secondary-color: #ecedf5;\r\n    --disabled-text-on-secondary-color: rgba(50, 51, 56, var(--disabled-component-opacity));\r\n    --ui-border-on-secondary-color: #c3c6d4;\r\n    --layout-border-on-secondary-color: #d0d4e4;\r\n    --dark-background-color: #f6f7fb;\r\n    --dark-background-on-secondary-color: #f6f7fb;\r\n    --dialog-background-color: #ffffff;\r\n    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n:root {\r\n    --motion-productive-short: 70ms;\r\n    --motion-productive-medium: 100ms;\r\n    --motion-productive-long: 150ms;\r\n    --motion-expressive-short: 250ms;\r\n    --motion-expressive-long: 400ms;\r\n    --motion-timing-enter: cubic-bezier(0, 0, 0.35, 1);\r\n    --motion-timing-exit: cubic-bezier(0.4, 0, 1, 1);\r\n    --motion-timing-transition: cubic-bezier(0.4, 0, 0.2, 1);\r\n    --motion-timing-emphasize: cubic-bezier(0, 0, 0.2, 1.4);\r\n    --expand-animation-timing: var(--motion-timing-enter);\r\n    --spacing-xs: 4px;\r\n    --spacing-small: 8px;\r\n    --spacing-medium: 16px;\r\n    --spacing-large: 24px;\r\n    --spacing-xl: 32px;\r\n    --spacing-xxl: 48px;\r\n    --spacing-xxxl: 64px;\r\n    --border-width: 1px;\r\n    --border-style: solid;\r\n    --border-radius-small: 4px;\r\n    --border-radius-medium: 8px;\r\n    --border-radius-big: 16px;\r\n    --disabled-component-opacity: 0.38;\r\n    --font-family: Figtree,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif;;\r\n/* Figtree,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif; */\r\n    \r\n\r\n    --title-font-family: Poppins,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif;\r\n    --h1-font-family: var(--title-font-family);\r\n    --font-smoothing-webkit: antialiased;\r\n    --font-smoothing-moz: grayscale;\r\n    --font-weight-very-light: 200;\r\n    --font-weight-light: 300;\r\n    --font-weight-normal: 400;\r\n    --font-weight-bold: 500;\r\n    --font-size: 1rem;\r\n    --font-size-10: 14px;\r\n    --font-size-20: 14px;\r\n    --font-size-30: 16px;\r\n    --font-size-40: 18px;\r\n    --font-size-50: 24px;\r\n    --font-size-60: 30px;\r\n    --font-line-height-10: 18px;\r\n    --font-line-height-20: 24px;\r\n    --font-line-height-30: 24px;\r\n    --font-line-height-40: 24px;\r\n    --font-line-height-50: 32px;\r\n    --font-line-height-60: 42px;\r\n    --font-size-h1: var(--font-size-60);\r\n    --font-size-h2: var(--font-size-50);\r\n    --font-size-h3: var(--font-size-50);\r\n    --font-size-h4: var(--font-size-40);\r\n    --font-size-h5: var(--font-size-30);\r\n    --font-size-general-label: var(--font-size-20);\r\n    --font-size-paragraph: var(--font-size-30);\r\n    --font-size-subtext: var(--font-size-10);\r\n    --font-line-height-h1: var(--font-line-height-60);\r\n    --font-line-height-h2: var(--font-line-height-50);\r\n    --font-line-height-h3: var(--font-line-height-50);\r\n    --font-line-height-h4: var(--font-line-height-40);\r\n    --font-line-height-h5: var(--font-line-height-30);\r\n    --font-line-height-general-label: var(--font-line-height-20);\r\n    --font-line-height-paragraph: var(--font-line-height-30);\r\n    --font-line-height-subtext: var(--font-line-height-10);\r\n    --font-h1: var(--font-weight-bold) var(--font-size-h1)/var(--font-line-height-h1) var(--title-font-family);\r\n    --font-h2: var(--font-weight-bold) var(--font-size-h2)/var(--font-line-height-h2) var(--title-font-family);\r\n    --font-h3: var(--font-weight-light) var(--font-size-h3)/var(--font-line-height-h3) var(--title-font-family);\r\n    --font-h4: var(--font-weight-bold) var(--font-size-h4)/var(--font-line-height-h4) var(--title-font-family);\r\n    --font-h5: var(--font-weight-bold) var(--font-size-h5)/var(--font-line-height-h5) var(--font-family);\r\n    --font-general-label: var(--font-weight-normal) var(--font-size-general-label)/var(--font-line-height-general-label) var(--font-family);\r\n    --font-paragraph: var(--font-weight-normal) var(--font-size-paragraph)/var(--font-line-height-paragraph) var(--font-family);\r\n    --font-subtext: var(--font-weight-normal) var(--font-size-subtext)/var(--font-line-height-subtext) var(--font-family);\r\n}\r\n\r\n\r\n:root  {\r\n    --react-modal-background: rgba(41, 47, 76, 0.7);\r\n    --application-background-color: var(--color-snow_white);\r\n    --application-border-color: #e6e9ef;\r\n    --text-color-on-card: #323338;\r\n    --main-nav-background-color: #292f4c;\r\n    --pulse-background-color: #f5f6f8;\r\n    --pulse-background-color-rgb: 245, 246, 248;\r\n    --pulse-background-color-opacity: #f5f6f880;\r\n    --pulse-text-color: #666;\r\n    --pulse-hover-background-color: #e6e9ef;\r\n    --pulse-selected-background-color: #e5f4ff;\r\n    --pulse-floating-background-color: 253, 253, 250;\r\n    --pulse-highlight-background-color: #cce9ff;\r\n    --surfce-color: rgb(51, 51, 51)/* #292f4c */;\r\n    --surface-border-color: #4b4e69;\r\n    --card-background-color: var(--primary-background-color);\r\n    --card-hover-background-color: white;\r\n    --card-selected-background-color: #d9f0ff;\r\n    --card-selected-text-color: #0073ea;\r\n    --automations-hover-background-color: #f5f6f8;\r\n    --automations-label-background-color: #f5f6f8;\r\n    --automations-border-color: #e6e9ef;\r\n    --automations-account-usage-background-color: white;\r\n    --automations-account-usage-dropdown-border-color: #d9d9d9;\r\n    --automations-account-usage-progressbar-background-color: #e6e9ef;\r\n    --apps-svg-icon-invert: invert(0);\r\n    --apps-code-color: #5559df;\r\n    --apps-feature-preview-color: #e5f4ff;\r\n    --apps-tabs-border-color: #1c1f3b;\r\n    --card-border-color: #e6e9ef;\r\n    --avatar-border-color: var(--color-snow_white);\r\n    --modal-bottom-color: #f7f7f7;\r\n    --modal-free-indication-color: var(--primary-selected-color);\r\n    --notification-unread-highlight-color: #d2eaff;\r\n    --apps-marketplace-highlight-color: #f5f6f8;\r\n    --redactor-context-background-color: #323338;\r\n    --redactor-context-link-color: #fff;\r\n    --ajax-spinner-gif-path: url(https://cdn.monday.com/images/ajax_spinner.gif);\r\n    --scrollbar-color: var(--color-wolf_gray);\r\n    --monday-loader-gif-path: url(https://cdn.monday.com/images/loader/loader.gif);\r\n    --hint-background-color: #ccf4e3;\r\n    --transparent-overlay: rgba(41, 47, 76, 0.5) !important;\r\n    --timeline-row-hover: rgba(210, 210, 210, 0.3);\r\n    --timeline-value-remains: #333333;\r\n    --topbar-bg-color: #eceff8\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n:root {\r\n    --_cu-grey1100: 26, 28, 32;\r\n    --_cu-grey1000: 42, 46, 52;\r\n    --_cu-grey900: 48, 53, 60;\r\n    --_cu-grey800: 60, 65, 74;\r\n    --_cu-grey700: 79, 87, 98;\r\n    --_cu-grey600: 101, 111, 125;\r\n    --_cu-grey500: 135, 144, 158;\r\n    --_cu-grey400: 173, 179, 189;\r\n    --_cu-grey300: 214, 217, 222;\r\n    --_cu-grey200: 232, 234, 237;\r\n    --_cu-grey100: 240, 241, 243;\r\n    --_cu-grey50: 247, 248, 249;\r\n    --_cu-white: 255, 255, 255;\r\n    --_cu-purple1100: 50, 52, 82;\r\n    --_cu-purple1000: 59, 58, 112;\r\n    --_cu-purple900: 67, 65, 141;\r\n    --_cu-purple800: 76, 71, 171;\r\n    --_cu-purple700: 84, 77, 201;\r\n    --_cu-purple600: 95, 85, 238;\r\n    --_cu-purple500: 127, 119, 241;\r\n    --_cu-purple400: 153, 146, 244;\r\n    --_cu-purple300: 178, 173, 247;\r\n    --_cu-purple200: 204, 201, 250;\r\n    --_cu-purple100: 229, 228, 252;\r\n    --_cu-purple50: 242, 241, 254;\r\n    --_cu-neonBlue1100: 46, 55, 84;\r\n    --_cu-neonBlue1000: 50, 64, 117;\r\n    --_cu-neonBlue900: 54, 73, 149;\r\n    --_cu-neonBlue800: 59, 82, 182;\r\n    --_cu-neonBlue700: 63, 91, 214;\r\n    --_cu-neonBlue600: 68, 102, 255;\r\n    --_cu-neonBlue500: 105, 133, 255;\r\n    --_cu-neonBlue400: 135, 157, 255;\r\n    --_cu-neonBlue300: 165, 182, 255;\r\n    --_cu-neonBlue200: 195, 206, 255;\r\n    --_cu-neonBlue100: 225, 231, 255;\r\n    --_cu-neonBlue50: 240, 243, 255;\r\n    --_cu-azureBlue1100: 38, 62, 80;\r\n    --_cu-azureBlue1000: 34, 77, 107;\r\n    --_cu-azureBlue900: 30, 93, 135;\r\n    --_cu-azureBlue800: 25, 109, 162;\r\n    --_cu-azureBlue700: 21, 124, 190;\r\n    --_cu-azureBlue600: 16, 144, 224;\r\n    --_cu-azureBlue500: 64, 166, 230;\r\n    --_cu-azureBlue400: 102, 184, 235;\r\n    --_cu-azureBlue300: 140, 202, 240;\r\n    --_cu-azureBlue200: 179, 220, 245;\r\n    --_cu-azureBlue100: 217, 237, 250;\r\n    --_cu-azureBlue50: 236, 246, 253;\r\n    --_cu-teal1100: 38, 64, 69;\r\n    --_cu-teal1000: 33, 82, 86;\r\n    --_cu-teal900: 29, 99, 103;\r\n    --_cu-teal800: 25, 117, 120;\r\n    --_cu-teal700: 20, 135, 138;\r\n    --_cu-teal600: 15, 157, 159;\r\n    --_cu-teal500: 63, 177, 178;\r\n    --_cu-teal400: 101, 192, 194;\r\n    --_cu-teal300: 140, 208, 209;\r\n    --_cu-teal200: 178, 224, 224;\r\n    --_cu-teal100: 217, 239, 240;\r\n    --_cu-teal50: 231, 245, 245;\r\n    --_cu-mint1100: 45, 68, 66;\r\n    --_cu-mint1000: 48, 90, 80;\r\n    --_cu-mint900: 51, 112, 94;\r\n    --_cu-mint800: 54, 134, 108;\r\n    --_cu-mint700: 57, 156, 122;\r\n    --_cu-mint600: 61, 184, 139;\r\n    --_cu-mint500: 100, 198, 162;\r\n    --_cu-mint400: 131, 209, 181;\r\n    --_cu-mint300: 162, 221, 199;\r\n    --_cu-mint200: 193, 232, 218;\r\n    --_cu-mint100: 224, 244, 236;\r\n    --_cu-mint50: 240, 249, 246;\r\n    --_cu-green1100: 35, 60, 55;\r\n    --_cu-green1000: 29, 75, 57;\r\n    --_cu-green900: 22, 89, 60;\r\n    --_cu-green800: 15, 104, 62;\r\n    --_cu-green700: 8, 118, 65;\r\n    --_cu-green600: 0, 136, 68;\r\n    --_cu-green500: 51, 160, 105;\r\n    --_cu-green400: 92, 179, 135;\r\n    --_cu-green300: 133, 198, 165;\r\n    --_cu-green200: 173, 217, 195;\r\n    --_cu-green100: 214, 236, 225;\r\n    --_cu-green50: 235, 245, 240;\r\n    --_cu-yellow1100: 75, 66, 44;\r\n    --_cu-yellow1000: 108, 87, 35;\r\n    --_cu-yellow900: 141, 107, 27;\r\n    --_cu-yellow800: 174, 128, 19;\r\n    --_cu-yellow700: 207, 148, 10;\r\n    --_cu-yellow600: 248, 174, 0;\r\n    --_cu-yellow500: 249, 190, 51;\r\n    --_cu-yellow400: 251, 203, 92;\r\n    --_cu-yellow300: 252, 216, 133;\r\n    --_cu-yellow200: 253, 229, 173;\r\n    --_cu-yellow100: 254, 242, 214;\r\n    --_cu-yellow50: 254, 249, 235;\r\n    --_cu-orange1100: 71, 56, 47;\r\n    --_cu-orange1000: 101, 66, 42;\r\n    --_cu-orange900: 130, 75, 38;\r\n    --_cu-orange800: 159, 85, 33;\r\n    --_cu-orange700: 188, 95, 28;\r\n    --_cu-orange600: 225, 107, 22;\r\n    --_cu-orange500: 231, 137, 69;\r\n    --_cu-orange400: 236, 160, 106;\r\n    --_cu-orange300: 241, 184, 143;\r\n    --_cu-orange200: 245, 208, 180;\r\n    --_cu-orange100: 250, 231, 218;\r\n    --_cu-orange50: 253, 243, 236;\r\n    --_cu-red1100: 69, 48, 55;\r\n    --_cu-red1000: 96, 51, 57;\r\n    --_cu-red900: 123, 53, 60;\r\n    --_cu-red800: 150, 55, 62;\r\n    --_cu-red700: 177, 58, 65;\r\n    --_cu-red600: 211, 61, 68;\r\n    --_cu-red500: 220, 100, 106;\r\n    --_cu-red400: 227, 131, 136;\r\n    --_cu-red300: 234, 162, 165;\r\n    --_cu-red200: 241, 193, 195;\r\n    --_cu-red100: 248, 224, 225;\r\n    --_cu-red50: 252, 239, 240;\r\n    --_cu-pink1100: 73, 54, 68;\r\n    --_cu-pink1000: 105, 61, 84;\r\n    --_cu-pink900: 136, 69, 100;\r\n    --_cu-pink800: 167, 77, 117;\r\n    --_cu-pink700: 199, 84, 133;\r\n    --_cu-pink600: 238, 94, 153;\r\n    --_cu-pink500: 241, 126, 173;\r\n    --_cu-pink400: 244, 152, 190;\r\n    --_cu-pink300: 247, 178, 206;\r\n    --_cu-pink200: 250, 204, 222;\r\n    --_cu-pink100: 252, 229, 239;\r\n    --_cu-pink50: 254, 242, 247;\r\n    --_cu-violet1100: 64, 54, 80;\r\n    --_cu-violet1000: 87, 62, 107;\r\n    --_cu-violet900: 109, 70, 135;\r\n    --_cu-violet800: 132, 78, 162;\r\n    --_cu-violet700: 154, 86, 190;\r\n    --_cu-violet600: 182, 96, 224;\r\n    --_cu-violet500: 197, 128, 230;\r\n    --_cu-violet400: 208, 153, 235;\r\n    --_cu-violet300: 220, 179, 240;\r\n    --_cu-violet200: 232, 204, 245;\r\n    --_cu-violet100: 243, 230, 250;\r\n    --_cu-violet50: 249, 242, 253;\r\n    --_cu-brown1100: 62, 61, 64;\r\n    --_cu-brown1000: 83, 76, 76;\r\n    --_cu-brown900: 103, 92, 88;\r\n    --_cu-brown800: 124, 107, 101;\r\n    --_cu-brown700: 144, 121, 113;\r\n    --_cu-brown600: 170, 141, 128;\r\n    --_cu-brown500: 187, 163, 153;\r\n    --_cu-brown400: 201, 182, 174;\r\n    --_cu-brown300: 214, 200, 194;\r\n    --_cu-brown200: 228, 219, 214;\r\n    --_cu-brown100: 241, 237, 235;\r\n    --_cu-brown50: 248, 246, 245;\r\n    --_cu-black1100: 0, 0, 0;\r\n    --_cu-black1000: 10, 11, 13;\r\n    --_cu-black900: 19, 21, 26;\r\n    --_cu-black800: 29, 32, 38;\r\n    --_cu-black700: 38, 42, 51;\r\n    --_cu-black600: 48, 53, 64;\r\n    --_cu-black500: 89, 93, 102;\r\n    --_cu-black400: 123, 126, 133;\r\n    --_cu-black300: 156, 158, 163;\r\n    --_cu-black200: 189, 190, 194;\r\n    --_cu-black100: 222, 223, 224;\r\n    --_cu-black50: 238, 239, 240;\r\n    --cu-grey1100: rgb(var(--_cu-grey1100));\r\n    --cu-grey1000: rgb(var(--_cu-grey1000));\r\n    --cu-grey1000-50: rgb(var(--_cu-grey1000), .5);\r\n    --cu-grey1000-20: rgb(var(--_cu-grey1000), .2);\r\n    --cu-grey1000-16: rgb(var(--_cu-grey1000), .16);\r\n    --cu-grey1000-10: rgb(var(--_cu-grey1000), .1);\r\n    --cu-grey900: rgb(var(--_cu-grey900));\r\n    --cu-grey800: rgb(var(--_cu-grey800));\r\n    --cu-grey700: rgb(var(--_cu-grey700));\r\n    --cu-grey600: rgb(var(--_cu-grey600));\r\n    --cu-grey500: rgb(var(--_cu-grey500));\r\n    --cu-grey400: rgb(var(--_cu-grey400));\r\n    --cu-grey300: rgb(var(--_cu-grey300));\r\n    --cu-grey200: rgb(var(--_cu-grey200));\r\n    --cu-grey100: rgb(var(--_cu-grey100));\r\n    --cu-grey100-50: rgb(var(--_cu-grey100), .5);\r\n    --cu-grey100-20: rgb(var(--_cu-grey100), .2);\r\n    --cu-grey100-16: rgb(var(--_cu-grey100), .16);\r\n    --cu-grey100-10: rgb(var(--_cu-grey100), .1);\r\n    --cu-grey50: rgb(var(--_cu-grey50));\r\n    --cu-white: rgb(var(--_cu-white));\r\n    --cu-white-80: rgb(var(--_cu-white), .8);\r\n    --cu-white-50: rgb(var(--_cu-white), .5);\r\n    --cu-white-20: rgb(var(--_cu-white), .2);\r\n    --cu-white-16: rgb(var(--_cu-white), .16);\r\n    --cu-white-10: rgb(var(--_cu-white), .1);\r\n    --cu-green1100: rgb(var(--_cu-green1100));\r\n    --cu-green1000: rgb(var(--_cu-green1000));\r\n    --cu-green900: rgb(var(--_cu-green900));\r\n    --cu-green800: rgb(var(--_cu-green800));\r\n    --cu-green700: rgb(var(--_cu-green700));\r\n    --cu-green600: rgb(var(--_cu-green600));\r\n    --cu-green500: rgb(var(--_cu-green500));\r\n    --cu-green400: rgb(var(--_cu-green400));\r\n    --cu-green300: rgb(var(--_cu-green300));\r\n    --cu-green200: rgb(var(--_cu-green200));\r\n    --cu-green100: rgb(var(--_cu-green100));\r\n    --cu-green50: rgb(var(--_cu-green50));\r\n    --cu-yellow1100: rgb(var(--_cu-yellow1100));\r\n    --cu-yellow1000: rgb(var(--_cu-yellow1000));\r\n    --cu-yellow900: rgb(var(--_cu-yellow900));\r\n    --cu-yellow800: rgb(var(--_cu-yellow800));\r\n    --cu-yellow700: rgb(var(--_cu-yellow700));\r\n    --cu-yellow600: rgb(var(--_cu-yellow600));\r\n    --cu-yellow500: rgb(var(--_cu-yellow500));\r\n    --cu-yellow400: rgb(var(--_cu-yellow400));\r\n    --cu-yellow300: rgb(var(--_cu-yellow300));\r\n    --cu-yellow200: rgb(var(--_cu-yellow200));\r\n    --cu-yellow100: rgb(var(--_cu-yellow100));\r\n    --cu-yellow50: rgb(var(--_cu-yellow50));\r\n    --cu-red1100: rgb(var(--_cu-red1100));\r\n    --cu-red1000: rgb(var(--_cu-red1000));\r\n    --cu-red900: rgb(var(--_cu-red900));\r\n    --cu-red800: rgb(var(--_cu-red800));\r\n    --cu-red700: rgb(var(--_cu-red700));\r\n    --cu-red600: rgb(var(--_cu-red600));\r\n    --cu-red600-16: rgb(var(--_cu-red600), .16);\r\n    --cu-red500: rgb(var(--_cu-red500));\r\n    --cu-red500-16: rgb(var(--_cu-red500), .16);\r\n    --cu-red400: rgb(var(--_cu-red400));\r\n    --cu-red300: rgb(var(--_cu-red300));\r\n    --cu-red200: rgb(var(--_cu-red200));\r\n    --cu-red100: rgb(var(--_cu-red100));\r\n    --cu-red50: rgb(var(--_cu-red50));\r\n    --cu-purple1100: rgb(var(--_cu-purple1100));\r\n    --cu-purple1000: rgb(var(--_cu-purple1000));\r\n    --cu-purple900: rgb(var(--_cu-purple900));\r\n    --cu-purple800: rgb(var(--_cu-purple800));\r\n    --cu-purple700: rgb(var(--_cu-purple700));\r\n    --cu-purple600: rgb(var(--_cu-purple600));\r\n    --cu-purple600-16: rgb(var(--_cu-purple600), .16);\r\n    --cu-purple500: rgb(var(--_cu-purple500));\r\n    --cu-purple500-16: rgb(var(--_cu-purple500), .16);\r\n    --cu-purple400: rgb(var(--_cu-purple400));\r\n    --cu-purple300: rgb(var(--_cu-purple300));\r\n    --cu-purple200: rgb(var(--_cu-purple200));\r\n    --cu-purple100: rgb(var(--_cu-purple100));\r\n    --cu-purple50: rgb(var(--_cu-purple50));\r\n    --cu-neonBlue1100: rgb(var(--_cu-neonBlue1100));\r\n    --cu-neonBlue1000: rgb(var(--_cu-neonBlue1000));\r\n    --cu-neonBlue900: rgb(var(--_cu-neonBlue900));\r\n    --cu-neonBlue800: rgb(var(--_cu-neonBlue800));\r\n    --cu-neonBlue700: rgb(var(--_cu-neonBlue700));\r\n    --cu-neonBlue600: rgb(var(--_cu-neonBlue600));\r\n    --cu-neonBlue600-16: rgb(var(--_cu-neonBlue600), .16);\r\n    --cu-neonBlue500: rgb(var(--_cu-neonBlue500));\r\n    --cu-neonBlue500-16: rgb(var(--_cu-neonBlue500), .16);\r\n    --cu-neonBlue400: rgb(var(--_cu-neonBlue400));\r\n    --cu-neonBlue300: rgb(var(--_cu-neonBlue300));\r\n    --cu-neonBlue200: rgb(var(--_cu-neonBlue200));\r\n    --cu-neonBlue100: rgb(var(--_cu-neonBlue100));\r\n    --cu-neonBlue50: rgb(var(--_cu-neonBlue50));\r\n    --cu-azureBlue1100: rgb(var(--_cu-azureBlue1100));\r\n    --cu-azureBlue1000: rgb(var(--_cu-azureBlue1000));\r\n    --cu-azureBlue900: rgb(var(--_cu-azureBlue900));\r\n    --cu-azureBlue800: rgb(var(--_cu-azureBlue800));\r\n    --cu-azureBlue700: rgb(var(--_cu-azureBlue700));\r\n    --cu-azureBlue600: rgb(var(--_cu-azureBlue600));\r\n    --cu-azureBlue600-16: rgb(var(--_cu-azureBlue600), .16);\r\n    --cu-azureBlue500: rgb(var(--_cu-azureBlue500));\r\n    --cu-azureBlue500-16: rgb(var(--_cu-azureBlue500), .16);\r\n    --cu-azureBlue400: rgb(var(--_cu-azureBlue400));\r\n    --cu-azureBlue300: rgb(var(--_cu-azureBlue300));\r\n    --cu-azureBlue200: rgb(var(--_cu-azureBlue200));\r\n    --cu-azureBlue100: rgb(var(--_cu-azureBlue100));\r\n    --cu-azureBlue50: rgb(var(--_cu-azureBlue50));\r\n    --cu-teal1100: rgb(var(--_cu-teal1100));\r\n    --cu-teal1000: rgb(var(--_cu-teal1000));\r\n    --cu-teal900: rgb(var(--_cu-teal900));\r\n    --cu-teal800: rgb(var(--_cu-teal800));\r\n    --cu-teal700: rgb(var(--_cu-teal700));\r\n    --cu-teal600: rgb(var(--_cu-teal600));\r\n    --cu-teal600-16: rgb(var(--_cu-teal600), .16);\r\n    --cu-teal500: rgb(var(--_cu-teal500));\r\n    --cu-teal500-16: rgb(var(--_cu-teal500), .16);\r\n    --cu-teal400: rgb(var(--_cu-teal400));\r\n    --cu-teal300: rgb(var(--_cu-teal300));\r\n    --cu-teal200: rgb(var(--_cu-teal200));\r\n    --cu-teal100: rgb(var(--_cu-teal100));\r\n    --cu-teal50: rgb(var(--_cu-teal50));\r\n    --cu-mint1100: rgb(var(--_cu-mint1100));\r\n    --cu-mint1000: rgb(var(--_cu-mint1000));\r\n    --cu-mint900: rgb(var(--_cu-mint900));\r\n    --cu-mint800: rgb(var(--_cu-mint800));\r\n    --cu-mint700: rgb(var(--_cu-mint700));\r\n    --cu-mint600: rgb(var(--_cu-mint600));\r\n    --cu-mint600-16: rgb(var(--_cu-mint600), .16);\r\n    --cu-mint500: rgb(var(--_cu-mint500));\r\n    --cu-mint500-16: rgb(var(--_cu-mint500), .16);\r\n    --cu-mint400: rgb(var(--_cu-mint400));\r\n    --cu-mint300: rgb(var(--_cu-mint300));\r\n    --cu-mint200: rgb(var(--_cu-mint200));\r\n    --cu-mint100: rgb(var(--_cu-mint100));\r\n    --cu-mint50: rgb(var(--_cu-mint50));\r\n    --cu-orange1100: rgb(var(--_cu-orange1100));\r\n    --cu-orange1000: rgb(var(--_cu-orange1000));\r\n    --cu-orange900: rgb(var(--_cu-orange900));\r\n    --cu-orange800: rgb(var(--_cu-orange800));\r\n    --cu-orange700: rgb(var(--_cu-orange700));\r\n    --cu-orange600: rgb(var(--_cu-orange600));\r\n    --cu-orange600-16: rgb(var(--_cu-orange600), .16);\r\n    --cu-orange500: rgb(var(--_cu-orange500));\r\n    --cu-orange500-16: rgb(var(--_cu-orange500), .16);\r\n    --cu-orange400: rgb(var(--_cu-orange400));\r\n    --cu-orange300: rgb(var(--_cu-orange300));\r\n    --cu-orange200: rgb(var(--_cu-orange200));\r\n    --cu-orange100: rgb(var(--_cu-orange100));\r\n    --cu-orange50: rgb(var(--_cu-orange50));\r\n    --cu-pink1100: rgb(var(--_cu-pink1100));\r\n    --cu-pink1000: rgb(var(--_cu-pink1000));\r\n    --cu-pink900: rgb(var(--_cu-pink900));\r\n    --cu-pink800: rgb(var(--_cu-pink800));\r\n    --cu-pink700: rgb(var(--_cu-pink700));\r\n    --cu-pink600: rgb(var(--_cu-pink600));\r\n    --cu-pink600-16: rgb(var(--_cu-pink600), .16);\r\n    --cu-pink500: rgb(var(--_cu-pink500));\r\n    --cu-pink500-16: rgb(var(--_cu-pink500), .16);\r\n    --cu-pink400: rgb(var(--_cu-pink400));\r\n    --cu-pink300: rgb(var(--_cu-pink300));\r\n    --cu-pink200: rgb(var(--_cu-pink200));\r\n    --cu-pink100: rgb(var(--_cu-pink100));\r\n    --cu-pink50: rgb(var(--_cu-pink50));\r\n    --cu-violet1100: rgb(var(--_cu-violet1100));\r\n    --cu-violet1000: rgb(var(--_cu-violet1000));\r\n    --cu-violet900: rgb(var(--_cu-violet900));\r\n    --cu-violet800: rgb(var(--_cu-violet800));\r\n    --cu-violet700: rgb(var(--_cu-violet700));\r\n    --cu-violet600: rgb(var(--_cu-violet600));\r\n    --cu-violet600-16: rgb(var(--_cu-violet600), .16);\r\n    --cu-violet500: rgb(var(--_cu-violet500));\r\n    --cu-violet500-16: rgb(var(--_cu-violet500), .16);\r\n    --cu-violet400: rgb(var(--_cu-violet400));\r\n    --cu-violet300: rgb(var(--_cu-violet300));\r\n    --cu-violet200: rgb(var(--_cu-violet200));\r\n    --cu-violet100: rgb(var(--_cu-violet100));\r\n    --cu-violet50: rgb(var(--_cu-violet50));\r\n    --cu-brown1100: rgb(var(--_cu-brown1100));\r\n    --cu-brown1000: rgb(var(--_cu-brown1000));\r\n    --cu-brown900: rgb(var(--_cu-brown900));\r\n    --cu-brown800: rgb(var(--_cu-brown800));\r\n    --cu-brown700: rgb(var(--_cu-brown700));\r\n    --cu-brown600: rgb(var(--_cu-brown600));\r\n    --cu-brown600-16: rgb(var(--_cu-brown600), .16);\r\n    --cu-brown500: rgb(var(--_cu-brown500));\r\n    --cu-brown500-16: rgb(var(--_cu-brown500), .16);\r\n    --cu-brown400: rgb(var(--_cu-brown400));\r\n    --cu-brown300: rgb(var(--_cu-brown300));\r\n    --cu-brown200: rgb(var(--_cu-brown200));\r\n    --cu-brown100: rgb(var(--_cu-brown100));\r\n    --cu-brown50: rgb(var(--_cu-brown50));\r\n    --cu-black1100: rgb(var(--_cu-black1100));\r\n    --cu-black1000: rgb(var(--_cu-black1000));\r\n    --cu-black900: rgb(var(--_cu-black900));\r\n    --cu-black800: rgb(var(--_cu-black800));\r\n    --cu-black700: rgb(var(--_cu-black700));\r\n    --cu-black600: rgb(var(--_cu-black600));\r\n    --cu-black600-16: rgb(var(--_cu-black600), .16);\r\n    --cu-black500: rgb(var(--_cu-black500));\r\n    --cu-black500-16: rgb(var(--_cu-black500), .16);\r\n    --cu-black400: rgb(var(--_cu-black400));\r\n    --cu-black300: rgb(var(--_cu-black300));\r\n    --cu-black200: rgb(var(--_cu-black200));\r\n    --cu-black100: rgb(var(--_cu-black100));\r\n    --cu-black50: rgb(var(--_cu-black50))\r\n}\r\n\r\nbody {\r\n    --rem-divisor: 16;\r\n    --rem-return-unit: 1rem\r\n}\r\n\r\nbody {\r\n    --cu-size-1: calc(4 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-2: calc(8 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-3: calc(12 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-4: calc(16 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-5: calc(20 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-6: calc(24 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-7: calc(28 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-8: calc(32 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-9: calc(36 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-10: calc(40 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-11: calc(44 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-size-12: calc(48 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-1: calc(2 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-2: calc(4 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-3: calc(6 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-4: calc(8 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-5: calc(10 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-6: calc(12 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-7: calc(16 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-8: calc(20 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-9: calc(24 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-radii-round: calc(666 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-border-size-1: 1px;\r\n    --cu-border-size-2: 2px\r\n}\r\n\r\nbody {\r\n    --cu-font-family: -apple-system, \"BlinkMacSystemFont\", \"Segoe UI\", \"Helvetica\", \"Apple Color Emoji\", \"Arial\", sans-serif, \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --cu-font-weight-regular: 400;\r\n    --cu-font-weight-medium: 500;\r\n    --cu-font-weight-semibold: 600;\r\n    --cu-font-weight-bold: 700;\r\n    --cu-font-size-1: calc(6 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-2: calc(8 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-3: calc(10 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-4: calc(11 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-5: calc(12 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-6: calc(14 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-7: calc(16 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-8: calc(18 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-9: calc(20 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-10: calc(22 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-11: calc(24 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-12: calc(28 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-13: calc(32 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-14: calc(36 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-font-size-15: calc(40 / var(--rem-divisor) * var(--rem-return-unit));\r\n    --cu-label-weight: var(--cu-font-weight-regular);\r\n    --cu-label-weight-strong: var(--cu-font-weight-medium);\r\n    --cu-label-large-font-size: var(--cu-font-size-8);\r\n    --cu-label-large-line-height: 1.33;\r\n    --cu-label-medium-font-size: var(--cu-font-size-7);\r\n    --cu-label-medium-line-height: 1.25;\r\n    --cu-label-small-font-size: var(--cu-font-size-6);\r\n    --cu-label-small-line-height: 1.14;\r\n    --cu-label-xsmall-font-size: var(--cu-font-size-5);\r\n    --cu-label-xsmall-line-height: 1.33;\r\n    --cu-paragraph-weight: var(--cu-font-weight-regular);\r\n    --cu-paragraph-weight-strong: var(--cu-font-weight-medium);\r\n    --cu-paragraph-line-height: 1.5;\r\n    --cu-paragraph-large-font-size: var(--cu-font-size-7);\r\n    --cu-paragraph-large-line-height: var(--cu-paragraph-line-height);\r\n    --cu-paragraph-medium-font-size: var(--cu-font-size-6);\r\n    --cu-paragraph-medium-line-height: var(--cu-paragraph-line-height);\r\n    --cu-paragraph-small-font-size: var(--cu-font-size-5);\r\n    --cu-paragraph-small-line-height: var(--cu-paragraph-line-height);\r\n    --cu-heading-weight: var(--cu-font-weight-semibold);\r\n    --cu-heading-line-height: 1.5;\r\n    --cu-heading-h1-font-size: var(--cu-font-size-15);\r\n    --cu-heading-h2-font-size: var(--cu-font-size-13);\r\n    --cu-heading-h3-font-size: var(--cu-font-size-11);\r\n    --cu-heading-h4-font-size: var(--cu-font-size-9);\r\n    --cu-heading-h5-font-size: var(--cu-font-size-8);\r\n    --cu-heading-h6-font-size: var(--cu-font-size-7);\r\n    --cu-heading-xxsmall-font-size: var(--cu-font-size-6);\r\n    --cu-heading-xxsmall-line-height: var(--cu-heading-line-height);\r\n    --cu-heading-caption-font-size: var(--cu-font-size-4);\r\n    --cu-heading-caption-line-height: var(--cu-heading-line-height)\r\n}\r\n\r\nbody:not(.cu-purple,.cu-neonBlue,.cu-azureBlue,.cu-teal,.cu-mint,.cu-orange,.cu-pink,.cu-violet,.cu-brown,.cu-black,.cu-custom) {\r\n    --cu-background-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-background-primary-hover: var(--theme-main-color-dark, #5f48ea);\r\n    --cu-background-primary-pressed: var(--theme-main-color-dark, #5f48ea);\r\n    --cu-background-primary-disabled: var(--theme-main-color-light, #d3cdf9);\r\n    --cu-background-primary-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .12 );\r\n    --cu-background-primary-on-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .18 );\r\n    --cu-content-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-border-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-border-primary-focus: var(--theme-main-color, #7b68ee);\r\n    --cu-effect-primary: rgb(var(--theme-main-color-rgb, 123, 104, 238), .2);\r\n    --cu-link-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-link-primary-hover: var(--theme-main-color-dark, #5f48ea)\r\n}\r\n\r\nbody.dark-theme:not(.cu-purple,.cu-neonBlue,.cu-azureBlue,.cu-teal,.cu-mint,.cu-orange,.cu-pink,.cu-violet,.cu-brown,.cu-black,.cu-custom),.dark-sidebar {\r\n    --cu-background-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-background-primary-hover: var(--theme-main-color-dark, #5f48ea);\r\n    --cu-background-primary-pressed: var(--theme-main-color, #7b68ee);\r\n    --cu-background-primary-disabled: rgb( var(--theme-main-color-rgb, 123, 104, 238), .5 );\r\n    --cu-background-primary-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .22 );\r\n    --cu-background-primary-on-subtle: rgb( var(--theme-main-color-rgb, 123, 104, 238), .3 );\r\n    --cu-content-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-border-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-border-primary-focus: var(--theme-main-color, #7b68ee);\r\n    --cu-effect-primary: rgb(var(--theme-main-color-rgb, 123, 104, 238), .2);\r\n    --cu-link-primary: var(--theme-main-color, #7b68ee);\r\n    --cu-link-primary-hover: var(--theme-main-color-dark, #5f48ea)\r\n}\r\n\r\nbody.dark-theme,.dark-sidebar {\r\n    --cu-background-main: var(--cu-grey1000);\r\n    --cu-background-main-hover: var(--cu-grey900);\r\n    --cu-background-main-hover-strong: var(--cu-grey800);\r\n    --cu-background-main-pressed: var(--cu-grey700);\r\n    --cu-background-main-offset: var(--cu-grey900);\r\n    --cu-background-main-inverse: var(--cu-white);\r\n    --cu-background-main-inverse-offset: var(--cu-grey700);\r\n    --cu-background-subtle: var(--cu-grey900);\r\n    --cu-background-subtle-hover: var(--cu-grey800);\r\n    --cu-background-subtle-hover-strong: var(--cu-grey700);\r\n    --cu-background-subtle-pressed: var(--cu-grey600);\r\n    --cu-background-subtle-offset: var(--cu-grey1000);\r\n    --cu-background-on-main: var(--cu-grey800);\r\n    --cu-background-on-main-hover: var(--cu-grey700);\r\n    --cu-background-on-main-pressed: var(--cu-grey600);\r\n    --cu-background-on-subtle: var(--cu-grey700);\r\n    --cu-background-on-subtle-hover: var(--cu-grey600);\r\n    --cu-background-on-subtle-pressed: var(--cu-grey700);\r\n    --cu-background-success: var(--cu-green500);\r\n    --cu-background-success-subtle: var(--cu-green1100);\r\n    --cu-background-warning: var(--cu-yellow500);\r\n    --cu-background-warning-subtle: var(--cu-yellow1100);\r\n    --cu-background-danger: var(--cu-red500);\r\n    --cu-background-danger-hover: var(--cu-red400);\r\n    --cu-background-danger-pressed: var(--cu-red500);\r\n    --cu-background-danger-disabled: var(--cu-red900);\r\n    --cu-background-danger-subtle: var(--cu-red1100);\r\n    --cu-background-danger-subtle-hover: var(--cu-red1000);\r\n    --cu-background-danger-subtle-pressed: var(--cu-red1100);\r\n    --cu-background-tooltip: var(--cu-grey700);\r\n    --cu-background-modal: var(--cu-grey700);\r\n    --cu-background-on-dark-hover: var(--cu-white-10);\r\n    --cu-background-on-dark-pressed: var(--cu-white-20);\r\n    --cu-background-on-light-hover: var(--cu-grey1000-10);\r\n    --cu-background-on-light-pressed: var(--cu-grey1000-20);\r\n    --cu-background-notification: var(--cu-pink500);\r\n    --cu-content-default: var(--cu-grey100);\r\n    --cu-content-secondary: var(--cu-grey400);\r\n    --cu-content-tertiary: var(--cu-grey500);\r\n    --cu-content-placeholder: var(--cu-grey600);\r\n    --cu-content-disabled: var(--cu-grey700);\r\n    --cu-content-success: var(--cu-green400);\r\n    --cu-content-warning: var(--cu-yellow400);\r\n    --cu-content-danger: var(--cu-red400);\r\n    --cu-content-danger-disabled: var(--cu-red900);\r\n    --cu-content-on-dark: var(--cu-white);\r\n    --cu-content-on-dark-disabled: var(--cu-white-50);\r\n    --cu-content-on-dark-secondary: var(--cu-white-80);\r\n    --cu-content-on-light: var(--cu-grey1000);\r\n    --cu-content-on-light-disabled: var(--cu-grey1000-50);\r\n    --cu-border-default: var(--cu-grey800);\r\n    --cu-border-low-contrast: var(--cu-grey900);\r\n    --cu-border-high-contrast: var(--cu-grey700);\r\n    --cu-border-hover: var(--cu-grey600);\r\n    --cu-border-input: var(--cu-grey600);\r\n    --cu-border-input-hover: var(--cu-grey500);\r\n    --cu-border-success: var(--cu-green500);\r\n    --cu-border-danger: var(--cu-red500);\r\n    --cu-border-danger-focus: var(--cu-red500);\r\n    --cu-border-warning: var(--cu-yellow500);\r\n    --cu-border-on-dark: var(--cu-white-50);\r\n    --cu-border-on-dark-focus: var(--cu-white);\r\n    --cu-border-on-light: var(--cu-grey1000-50);\r\n    --cu-border-on-light-focus: var(--cu-grey1000);\r\n    --cu-effect-danger: var(--cu-red500-16);\r\n    --cu-effect-on-dark: var(--cu-white-16);\r\n    --cu-effect-on-light: var(--cu-grey1000-16);\r\n    --cu-link-hyperlink: var(--cu-neonBlue400);\r\n    --cu-link-hyperlink-hover: var(--cu-neonBlue300);\r\n    --cu-fab-icon-pink: var(--cu-pink500);\r\n    --cu-fab-icon-yellow: var(--cu-yellow500);\r\n    --cu-fab-icon-mint: var(--cu-mint500);\r\n    --cu-fab-icon-azure-blue: var(--cu-azureBlue500);\r\n    --cu-alert-banner-background: var(--cu-grey700);\r\n    --cu-alert-banner-background-subtle: var(--cu-grey900);\r\n    --cu-alert-banner-content: var(--cu-grey100);\r\n    --cu-alert-banner-content-dark: var(--cu-grey1000);\r\n    --cu-avatar-user-bg-purple: var(--cu-purple500);\r\n    --cu-avatar-user-bg-neon-blue: var(--cu-neonBlue500);\r\n    --cu-avatar-user-bg-azure-blue: var(--cu-azureBlue500);\r\n    --cu-avatar-user-bg-teal: var(--cu-teal500);\r\n    --cu-avatar-user-bg-mint: var(--cu-mint500);\r\n    --cu-avatar-user-bg-yellow: var(--cu-yellow500);\r\n    --cu-avatar-user-bg-orange: var(--cu-orange500);\r\n    --cu-avatar-user-bg-red: var(--cu-red500);\r\n    --cu-avatar-user-bg-pink: var(--cu-pink500);\r\n    --cu-avatar-user-bg-violet: var(--cu-violet500);\r\n    --cu-avatar-user-bg-brown: var(--cu-brown500);\r\n    --cu-avatar-user-bg-black: var(--cu-black500);\r\n    --cu-avatar-user-online: var(--cu-green400);\r\n    --cu-avatar-user-guest: var(--cu-grey400);\r\n    --cu-avatar-user-remove: var(--cu-grey700);\r\n    --cu-automations-usage-bg-neon-blue: var(--cu-neonBlue1100);\r\n    --cu-automations-usage-content-neon-blue: var(--cu-neonBlue400);\r\n    --cu-automations-usage-bg-teal: var(--cu-teal1100);\r\n    --cu-automations-usage-content-teal: var(--cu-teal400);\r\n    --cu-avatar-space-bg-purple: var(--cu-purple900);\r\n    --cu-avatar-space-bg-neon-blue: var(--cu-neonBlue900);\r\n    --cu-avatar-space-bg-azure-blue: var(--cu-azureBlue900);\r\n    --cu-avatar-space-bg-teal: var(--cu-teal900);\r\n    --cu-avatar-space-bg-mint: var(--cu-mint900);\r\n    --cu-avatar-space-bg-yellow: var(--cu-yellow900);\r\n    --cu-avatar-space-bg-orange: var(--cu-orange900);\r\n    --cu-avatar-space-bg-red: var(--cu-red900);\r\n    --cu-avatar-space-bg-pink: var(--cu-pink900);\r\n    --cu-avatar-space-bg-violet: var(--cu-violet900);\r\n    --cu-avatar-space-bg-brown: var(--cu-brown900);\r\n    --cu-avatar-space-bg-black: var(--cu-black900);\r\n    --cu-avatar-space-content-purple: var(--cu-purple100);\r\n    --cu-avatar-space-content-neon-blue: var(--cu-neonBlue100);\r\n    --cu-avatar-space-content-azure-blue: var(--cu-azureBlue100);\r\n    --cu-avatar-space-content-teal: var(--cu-teal100);\r\n    --cu-avatar-space-content-mint: var(--cu-mint100);\r\n    --cu-avatar-space-content-yellow: var(--cu-yellow100);\r\n    --cu-avatar-space-content-orange: var(--cu-orange100);\r\n    --cu-avatar-space-content-red: var(--cu-red100);\r\n    --cu-avatar-space-content-pink: var(--cu-pink100);\r\n    --cu-avatar-space-content-violet: var(--cu-violet100);\r\n    --cu-avatar-space-content-brown: var(--cu-brown100);\r\n    --cu-avatar-space-content-black: var(--cu-black100);\r\n    --cu-quill-banner-red: var(--cu-red1100);\r\n    --cu-quill-banner-orange: var(--cu-orange1100);\r\n    --cu-quill-banner-yellow: var(--cu-yellow1100);\r\n    --cu-quill-banner-azure-blue: var(--cu-azureBlue1100);\r\n    --cu-quill-banner-purple: var(--cu-purple1100);\r\n    --cu-quill-banner-pink: var(--cu-pink1100);\r\n    --cu-quill-banner-green: var(--cu-green1100);\r\n    --cu-quill-banner-black: var(--cu-black1100);\r\n    --cu-quill-banner-border-red: var(--cu-red500);\r\n    --cu-quill-banner-border-orange: var(--cu-orange500);\r\n    --cu-quill-banner-border-yellow: var(--cu-yellow500);\r\n    --cu-quill-banner-border-azure-blue: var(--cu-azureBlue500);\r\n    --cu-quill-banner-border-purple: var(--cu-purple500);\r\n    --cu-quill-banner-border-pink: var(--cu-pink500);\r\n    --cu-quill-banner-border-green: var(--cu-green500);\r\n    --cu-quill-banner-border-black: var(--cu-black500);\r\n    --cu-background-overlay: rgba(var(--_cu-grey1100), .64);\r\n    --cu-background-overlay-light: rgba(var(--_cu-grey1100), .32);\r\n    --cu-elevation-1: 0 calc(1 / var(--rem-divisor) * var(--rem-return-unit)) calc(4 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16);\r\n    --cu-elevation-2: 0 calc(2 / var(--rem-divisor) * var(--rem-return-unit)) calc(8 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16);\r\n    --cu-elevation-3: 0 calc(4 / var(--rem-divisor) * var(--rem-return-unit)) calc(16 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16);\r\n    --cu-elevation-4: 0 calc(6 / var(--rem-divisor) * var(--rem-return-unit)) calc(24 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .16)\r\n}\r\n\r\nbody.dark-theme.cu-purple,body.cu-purple .dark-sidebar {\r\n    --cu-background-primary: var(--cu-purple500);\r\n    --cu-background-primary-hover: var(--cu-purple400);\r\n    --cu-background-primary-pressed: var(--cu-purple500);\r\n    --cu-background-primary-disabled: var(--cu-purple900);\r\n    --cu-background-primary-subtle: var(--cu-purple1100);\r\n    --cu-background-primary-on-subtle: var(--cu-purple1000);\r\n    --cu-content-primary: var(--cu-purple400);\r\n    --cu-border-primary: var(--cu-purple500);\r\n    --cu-border-primary-focus: var(--cu-purple500);\r\n    --cu-effect-primary: var(--cu-purple500-16);\r\n    --cu-link-primary: var(--cu-purple400);\r\n    --cu-link-primary-hover: var(--cu-purple300)\r\n}\r\n\r\nbody.dark-theme.cu-neonBlue,body.cu-neonBlue .dark-sidebar {\r\n    --cu-background-primary: var(--cu-neonBlue500);\r\n    --cu-background-primary-hover: var(--cu-neonBlue400);\r\n    --cu-background-primary-pressed: var(--cu-neonBlue500);\r\n    --cu-background-primary-disabled: var(--cu-neonBlue900);\r\n    --cu-background-primary-subtle: var(--cu-neonBlue1100);\r\n    --cu-background-primary-on-subtle: var(--cu-neonBlue1000);\r\n    --cu-content-primary: var(--cu-neonBlue400);\r\n    --cu-border-primary: var(--cu-neonBlue500);\r\n    --cu-border-primary-focus: var(--cu-neonBlue500);\r\n    --cu-effect-primary: var(--cu-neonBlue500-16);\r\n    --cu-link-primary: var(--cu-neonBlue400);\r\n    --cu-link-primary-hover: var(--cu-neonBlue300)\r\n}\r\n\r\nbody.dark-theme.cu-azureBlue,body.cu-azureBlue .dark-sidebar {\r\n    --cu-background-primary: var(--cu-azureBlue500);\r\n    --cu-background-primary-hover: var(--cu-azureBlue400);\r\n    --cu-background-primary-pressed: var(--cu-azureBlue500);\r\n    --cu-background-primary-disabled: var(--cu-azureBlue900);\r\n    --cu-background-primary-subtle: var(--cu-azureBlue1100);\r\n    --cu-background-primary-on-subtle: var(--cu-azureBlue1000);\r\n    --cu-content-primary: var(--cu-azureBlue400);\r\n    --cu-border-primary: var(--cu-azureBlue500);\r\n    --cu-border-primary-focus: var(--cu-azureBlue500);\r\n    --cu-effect-primary: var(--cu-azureBlue500-16);\r\n    --cu-link-primary: var(--cu-azureBlue400);\r\n    --cu-link-primary-hover: var(--cu-azureBlue300)\r\n}\r\n\r\nbody.dark-theme.cu-teal,body.cu-teal .dark-sidebar {\r\n    --cu-background-primary: var(--cu-teal500);\r\n    --cu-background-primary-hover: var(--cu-teal400);\r\n    --cu-background-primary-pressed: var(--cu-teal500);\r\n    --cu-background-primary-disabled: var(--cu-teal900);\r\n    --cu-background-primary-subtle: var(--cu-teal1100);\r\n    --cu-background-primary-on-subtle: var(--cu-teal1000);\r\n    --cu-content-primary: var(--cu-teal400);\r\n    --cu-border-primary: var(--cu-teal500);\r\n    --cu-border-primary-focus: var(--cu-teal500);\r\n    --cu-effect-primary: var(--cu-teal500-16);\r\n    --cu-link-primary: var(--cu-teal400);\r\n    --cu-link-primary-hover: var(--cu-teal300)\r\n}\r\n\r\nbody.dark-theme.cu-mint,body.cu-mint .dark-sidebar {\r\n    --cu-background-primary: var(--cu-mint500);\r\n    --cu-background-primary-hover: var(--cu-mint400);\r\n    --cu-background-primary-pressed: var(--cu-mint500);\r\n    --cu-background-primary-disabled: var(--cu-mint900);\r\n    --cu-background-primary-subtle: var(--cu-mint1100);\r\n    --cu-background-primary-on-subtle: var(--cu-mint1000);\r\n    --cu-content-primary: var(--cu-mint400);\r\n    --cu-border-primary: var(--cu-mint500);\r\n    --cu-border-primary-focus: var(--cu-mint500);\r\n    --cu-effect-primary: var(--cu-mint500-16);\r\n    --cu-link-primary: var(--cu-mint400);\r\n    --cu-link-primary-hover: var(--cu-mint300)\r\n}\r\n\r\nbody.dark-theme.cu-orange,body.cu-orange .dark-sidebar {\r\n    --cu-background-primary: var(--cu-orange500);\r\n    --cu-background-primary-hover: var(--cu-orange400);\r\n    --cu-background-primary-pressed: var(--cu-orange500);\r\n    --cu-background-primary-disabled: var(--cu-orange900);\r\n    --cu-background-primary-subtle: var(--cu-orange1100);\r\n    --cu-background-primary-on-subtle: var(--cu-orange1000);\r\n    --cu-content-primary: var(--cu-orange400);\r\n    --cu-border-primary: var(--cu-orange500);\r\n    --cu-border-primary-focus: var(--cu-orange500);\r\n    --cu-effect-primary: var(--cu-orange500-16);\r\n    --cu-link-primary: var(--cu-orange400);\r\n    --cu-link-primary-hover: var(--cu-orange300)\r\n}\r\n\r\nbody.dark-theme.cu-pink,body.cu-pink .dark-sidebar {\r\n    --cu-background-primary: var(--cu-pink500);\r\n    --cu-background-primary-hover: var(--cu-pink400);\r\n    --cu-background-primary-pressed: var(--cu-pink500);\r\n    --cu-background-primary-disabled: var(--cu-pink900);\r\n    --cu-background-primary-subtle: var(--cu-pink1100);\r\n    --cu-background-primary-on-subtle: var(--cu-pink1000);\r\n    --cu-content-primary: var(--cu-pink400);\r\n    --cu-border-primary: var(--cu-pink500);\r\n    --cu-border-primary-focus: var(--cu-pink500);\r\n    --cu-effect-primary: var(--cu-pink500-16);\r\n    --cu-link-primary: var(--cu-pink400);\r\n    --cu-link-primary-hover: var(--cu-pink300)\r\n}\r\n\r\nbody.dark-theme.cu-violet,body.cu-violet .dark-sidebar {\r\n    --cu-background-primary: var(--cu-violet500);\r\n    --cu-background-primary-hover: var(--cu-violet400);\r\n    --cu-background-primary-pressed: var(--cu-violet500);\r\n    --cu-background-primary-disabled: var(--cu-violet900);\r\n    --cu-background-primary-subtle: var(--cu-violet1100);\r\n    --cu-background-primary-on-subtle: var(--cu-violet1000);\r\n    --cu-content-primary: var(--cu-violet400);\r\n    --cu-border-primary: var(--cu-violet500);\r\n    --cu-border-primary-focus: var(--cu-violet500);\r\n    --cu-effect-primary: var(--cu-violet500-16);\r\n    --cu-link-primary: var(--cu-violet400);\r\n    --cu-link-primary-hover: var(--cu-violet300)\r\n}\r\n\r\nbody.dark-theme.cu-brown,body.cu-brown .dark-sidebar {\r\n    --cu-background-primary: var(--cu-brown500);\r\n    --cu-background-primary-hover: var(--cu-brown400);\r\n    --cu-background-primary-pressed: var(--cu-brown500);\r\n    --cu-background-primary-disabled: var(--cu-brown900);\r\n    --cu-background-primary-subtle: var(--cu-brown1100);\r\n    --cu-background-primary-on-subtle: var(--cu-brown1000);\r\n    --cu-content-primary: var(--cu-brown400);\r\n    --cu-border-primary: var(--cu-brown500);\r\n    --cu-border-primary-focus: var(--cu-brown500);\r\n    --cu-effect-primary: var(--cu-brown500-16);\r\n    --cu-link-primary: var(--cu-brown400);\r\n    --cu-link-primary-hover: var(--cu-brown300)\r\n}\r\n\r\nbody.dark-theme.cu-black,body.cu-black .dark-sidebar {\r\n    --cu-background-primary: var(--cu-black500);\r\n    --cu-background-primary-hover: var(--cu-black400);\r\n    --cu-background-primary-pressed: var(--cu-black500);\r\n    --cu-background-primary-disabled: var(--cu-black900);\r\n    --cu-background-primary-subtle: var(--cu-black1100);\r\n    --cu-background-primary-on-subtle: var(--cu-black1000);\r\n    --cu-content-primary: var(--cu-black400);\r\n    --cu-border-primary: var(--cu-black500);\r\n    --cu-border-primary-focus: var(--cu-black500);\r\n    --cu-effect-primary: var(--cu-black500-16);\r\n    --cu-link-primary: var(--cu-black400);\r\n    --cu-link-primary-hover: var(--cu-black300)\r\n}\r\n\r\nbody.dark-theme.cu-custom,body.cu-custom .dark-sidebar {\r\n    --cu-custom1100: hsl(var(--cu-custom-hue, 83), 19%, 26%);\r\n    --cu-custom1000: hsl(var(--cu-custom-hue, 83), 27%, 33%);\r\n    --cu-custom900: hsl(var(--cu-custom-hue, 83), 32%, 40%);\r\n    --cu-custom800: hsl(var(--cu-custom-hue, 83), 35%, 47%);\r\n    --cu-custom700: hsl(var(--cu-custom-hue, 83), 44%, 54%);\r\n    --cu-custom600: hsl(var(--cu-custom-hue, 83), 67%, 63%);\r\n    --cu-custom600-16: hsl(var(--cu-custom-hue, 83), 67%, 63%, 16%);\r\n    --cu-custom500: hsl(var(--cu-custom-hue, 83), 67%, 70%);\r\n    --cu-custom500-16: hsl(var(--cu-custom-hue, 83), 67%, 70%, 16%);\r\n    --cu-custom400: hsl(var(--cu-custom-hue, 83), 67%, 76%);\r\n    --cu-custom300: hsl(var(--cu-custom-hue, 83), 67%, 82%);\r\n    --cu-custom200: hsl(var(--cu-custom-hue, 83), 67%, 88%);\r\n    --cu-custom100: hsl(var(--cu-custom-hue, 83), 67%, 94%);\r\n    --cu-custom50: hsl(var(--cu-custom-hue, 83), 73%, 97%);\r\n    --cu-background-primary: var(--cu-custom500);\r\n    --cu-background-primary-hover: var(--cu-custom400);\r\n    --cu-background-primary-pressed: var(--cu-custom500);\r\n    --cu-background-primary-disabled: var(--cu-custom900);\r\n    --cu-background-primary-subtle: var(--cu-custom1100);\r\n    --cu-background-primary-on-subtle: var(--cu-custom1000);\r\n    --cu-content-primary: var(--cu-custom400);\r\n    --cu-border-primary: var(--cu-custom500);\r\n    --cu-border-primary-focus: var(--cu-custom500);\r\n    --cu-effect-primary: var(--cu-custom500-16);\r\n    --cu-link-primary: var(--cu-custom400);\r\n    --cu-link-primary-hover: var(--cu-custom300)\r\n}\r\n\r\nbody {\r\n    --cu-background-main: var(--cu-white);\r\n    --cu-background-main-hover: var(--cu-grey50);\r\n    --cu-background-main-hover-strong: var(--cu-grey100);\r\n    --cu-background-main-pressed: var(--cu-grey200);\r\n    --cu-background-main-offset: var(--cu-white);\r\n    --cu-background-main-inverse: var(--cu-grey1000);\r\n    --cu-background-main-inverse-offset: var(--cu-grey1000);\r\n    --cu-background-subtle: var(--cu-grey50);\r\n    --cu-background-subtle-hover: var(--cu-grey100);\r\n    --cu-background-subtle-hover-strong: var(--cu-grey200);\r\n    --cu-background-subtle-pressed: var(--cu-grey300);\r\n    --cu-background-subtle-offset: var(--cu-grey50);\r\n    --cu-background-on-main: var(--cu-grey100);\r\n    --cu-background-on-main-hover: var(--cu-grey200);\r\n    --cu-background-on-main-pressed: var(--cu-grey300);\r\n    --cu-background-on-subtle: var(--cu-grey200);\r\n    --cu-background-on-subtle-hover: var(--cu-grey300);\r\n    --cu-background-on-subtle-pressed: var(--cu-grey200);\r\n    --cu-background-success: var(--cu-green600);\r\n    --cu-background-success-subtle: var(--cu-green50);\r\n    --cu-background-warning: var(--cu-yellow600);\r\n    --cu-background-warning-subtle: var(--cu-yellow50);\r\n    --cu-background-danger: var(--cu-red600);\r\n    --cu-background-danger-hover: var(--cu-red700);\r\n    --cu-background-danger-pressed: var(--cu-red800);\r\n    --cu-background-danger-disabled: var(--cu-red200);\r\n    --cu-background-danger-subtle: var(--cu-red50);\r\n    --cu-background-danger-subtle-hover: var(--cu-red100);\r\n    --cu-background-danger-subtle-pressed: var(--cu-red200);\r\n    --cu-background-tooltip: var(--cu-grey1000);\r\n    --cu-background-modal: var(--cu-grey1000);\r\n    --cu-background-on-dark-hover: var(--cu-white-10);\r\n    --cu-background-on-dark-pressed: var(--cu-white-20);\r\n    --cu-background-on-light-hover: var(--cu-grey1000-10);\r\n    --cu-background-on-light-pressed: var(--cu-grey1000-20);\r\n    --cu-background-notification: var(--cu-pink600);\r\n    --cu-content-default: var(--cu-grey1000);\r\n    --cu-content-secondary: var(--cu-grey700);\r\n    --cu-content-tertiary: var(--cu-grey600);\r\n    --cu-content-placeholder: var(--cu-grey500);\r\n    --cu-content-disabled: var(--cu-grey400);\r\n    --cu-content-success: var(--cu-green700);\r\n    --cu-content-warning: var(--cu-yellow700);\r\n    --cu-content-danger: var(--cu-red700);\r\n    --cu-content-danger-disabled: var(--cu-red300);\r\n    --cu-content-on-dark: var(--cu-white);\r\n    --cu-content-on-dark-disabled: var(--cu-white-50);\r\n    --cu-content-on-dark-secondary: var(--cu-white-80);\r\n    --cu-content-on-light: var(--cu-grey1000);\r\n    --cu-content-on-light-disabled: var(--cu-grey1000-50);\r\n    --cu-border-default: var(--cu-grey200);\r\n    --cu-border-low-contrast: rgb(var(--_cu-grey100));\r\n    --cu-border-high-contrast: rgb(var(--_cu-grey300));\r\n    --cu-border-hover: var(--cu-grey400);\r\n    --cu-border-input: var(--cu-grey500);\r\n    --cu-border-input-hover: var(--cu-grey600);\r\n    --cu-border-success: var(--cu-green600);\r\n    --cu-border-danger: var(--cu-red600);\r\n    --cu-border-danger-focus: var(--cu-red600);\r\n    --cu-border-warning: var(--cu-yellow600);\r\n    --cu-border-on-dark: var(--cu-white-50);\r\n    --cu-border-on-dark-focus: var(--cu-white);\r\n    --cu-border-on-light: var(--cu-grey1000-50);\r\n    --cu-border-on-light-focus: var(--cu-grey1000);\r\n    --cu-effect-danger: var(--cu-red600-16);\r\n    --cu-effect-on-dark: var(--cu-white-16);\r\n    --cu-effect-on-light: var(--cu-grey1000-16);\r\n    --cu-link-hyperlink: var(--cu-neonBlue600);\r\n    --cu-link-hyperlink-hover: var(--cu-neonBlue700);\r\n    --cu-fab-icon-pink: var(--cu-pink600);\r\n    --cu-fab-icon-yellow: var(--cu-yellow600);\r\n    --cu-fab-icon-mint: var(--cu-mint600);\r\n    --cu-fab-icon-azure-blue: var(--cu-azureBlue600);\r\n    --cu-alert-banner-background: var(--cu-grey1000);\r\n    --cu-alert-banner-background-subtle: var(--cu-grey100);\r\n    --cu-alert-banner-content: var(--cu-white);\r\n    --cu-alert-banner-content-dark: var(--cu-grey1000);\r\n    --cu-avatar-user-bg-purple: var(--cu-purple500);\r\n    --cu-avatar-user-bg-neon-blue: var(--cu-neonBlue500);\r\n    --cu-avatar-user-bg-azure-blue: var(--cu-azureBlue500);\r\n    --cu-avatar-user-bg-teal: var(--cu-teal500);\r\n    --cu-avatar-user-bg-mint: var(--cu-mint500);\r\n    --cu-avatar-user-bg-yellow: var(--cu-yellow500);\r\n    --cu-avatar-user-bg-orange: var(--cu-orange500);\r\n    --cu-avatar-user-bg-red: var(--cu-red500);\r\n    --cu-avatar-user-bg-pink: var(--cu-pink500);\r\n    --cu-avatar-user-bg-violet: var(--cu-violet500);\r\n    --cu-avatar-user-bg-brown: var(--cu-brown500);\r\n    --cu-avatar-user-bg-black: var(--cu-black500);\r\n    --cu-avatar-user-online: var(--cu-green500);\r\n    --cu-avatar-user-guest: var(--cu-grey400);\r\n    --cu-avatar-user-remove: var(--cu-grey1000);\r\n    --cu-automations-usage-bg-neon-blue: var(--cu-neonBlue50);\r\n    --cu-automations-usage-content-neon-blue: var(--cu-neonBlue700);\r\n    --cu-automations-usage-bg-teal: var(--cu-teal50);\r\n    --cu-automations-usage-content-teal: var(--cu-teal700);\r\n    --cu-avatar-space-bg-purple: var(--cu-purple200);\r\n    --cu-avatar-space-bg-neon-blue: var(--cu-neonBlue200);\r\n    --cu-avatar-space-bg-azure-blue: var(--cu-azureBlue200);\r\n    --cu-avatar-space-bg-teal: var(--cu-teal200);\r\n    --cu-avatar-space-bg-mint: var(--cu-mint200);\r\n    --cu-avatar-space-bg-yellow: var(--cu-yellow200);\r\n    --cu-avatar-space-bg-orange: var(--cu-orange200);\r\n    --cu-avatar-space-bg-red: var(--cu-red200);\r\n    --cu-avatar-space-bg-pink: var(--cu-pink200);\r\n    --cu-avatar-space-bg-violet: var(--cu-violet200);\r\n    --cu-avatar-space-bg-brown: var(--cu-brown200);\r\n    --cu-avatar-space-bg-black: var(--cu-black200);\r\n    --cu-avatar-space-content-purple: var(--cu-purple1000);\r\n    --cu-avatar-space-content-neon-blue: var(--cu-neonBlue1000);\r\n    --cu-avatar-space-content-azure-blue: var(--cu-azureBlue1000);\r\n    --cu-avatar-space-content-teal: var(--cu-teal1000);\r\n    --cu-avatar-space-content-mint: var(--cu-mint1000);\r\n    --cu-avatar-space-content-yellow: var(--cu-yellow1000);\r\n    --cu-avatar-space-content-orange: var(--cu-orange1000);\r\n    --cu-avatar-space-content-red: var(--cu-red1000);\r\n    --cu-avatar-space-content-pink: var(--cu-pink1000);\r\n    --cu-avatar-space-content-violet: var(--cu-violet1000);\r\n    --cu-avatar-space-content-brown: var(--cu-brown1000);\r\n    --cu-avatar-space-content-black: var(--cu-black1000);\r\n    --cu-quill-banner-red: var(--cu-red50);\r\n    --cu-quill-banner-orange: var(--cu-orange50);\r\n    --cu-quill-banner-yellow: var(--cu-yellow50);\r\n    --cu-quill-banner-azure-blue: var(--cu-azureBlue50);\r\n    --cu-quill-banner-purple: var(--cu-purple50);\r\n    --cu-quill-banner-pink: var(--cu-pink50);\r\n    --cu-quill-banner-green: var(--cu-green50);\r\n    --cu-quill-banner-black: var(--cu-black50);\r\n    --cu-quill-banner-border-red: var(--cu-red600);\r\n    --cu-quill-banner-border-orange: var(--cu-orange600);\r\n    --cu-quill-banner-border-yellow: var(--cu-yellow600);\r\n    --cu-quill-banner-border-azure-blue: var(--cu-azureBlue600);\r\n    --cu-quill-banner-border-purple: var(--cu-purple600);\r\n    --cu-quill-banner-border-pink: var(--cu-pink600);\r\n    --cu-quill-banner-border-green: var(--cu-green600);\r\n    --cu-quill-banner-border-black: var(--cu-black600);\r\n    --cu-background-overlay: rgba(var(--_cu-grey1000), .56);\r\n    --cu-background-overlay-light: rgba(var(--_cu-grey1000), .32);\r\n    --cu-elevation-1: 0 calc(1 / var(--rem-divisor) * var(--rem-return-unit)) calc(4 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08);\r\n    --cu-elevation-2: 0 calc(2 / var(--rem-divisor) * var(--rem-return-unit)) calc(8 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08);\r\n    --cu-elevation-3: 0 calc(4 / var(--rem-divisor) * var(--rem-return-unit)) calc(16 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08);\r\n    --cu-elevation-4: 0 calc(6 / var(--rem-divisor) * var(--rem-return-unit)) calc(24 / var(--rem-divisor) * var(--rem-return-unit)) rgba(0, 0, 0, .08)\r\n}\r\n\r\nbody.cu-purple {\r\n    --cu-background-primary: var(--cu-purple600);\r\n    --cu-background-primary-hover: var(--cu-purple700);\r\n    --cu-background-primary-pressed: var(--cu-purple800);\r\n    --cu-background-primary-disabled: var(--cu-purple200);\r\n    --cu-background-primary-subtle: var(--cu-purple50);\r\n    --cu-background-primary-on-subtle: var(--cu-purple100);\r\n    --cu-content-primary: var(--cu-purple700);\r\n    --cu-border-primary: var(--cu-purple600);\r\n    --cu-border-primary-focus: var(--cu-purple600);\r\n    --cu-effect-primary: var(--cu-purple600-16);\r\n    --cu-link-primary: var(--cu-purple600);\r\n    --cu-link-primary-hover: var(--cu-purple700)\r\n}\r\n\r\nbody.cu-neonBlue {\r\n    --cu-background-primary: var(--cu-neonBlue600);\r\n    --cu-background-primary-hover: var(--cu-neonBlue700);\r\n    --cu-background-primary-pressed: var(--cu-neonBlue800);\r\n    --cu-background-primary-disabled: var(--cu-neonBlue200);\r\n    --cu-background-primary-subtle: var(--cu-neonBlue50);\r\n    --cu-background-primary-on-subtle: var(--cu-neonBlue100);\r\n    --cu-content-primary: var(--cu-neonBlue700);\r\n    --cu-border-primary: var(--cu-neonBlue600);\r\n    --cu-border-primary-focus: var(--cu-neonBlue600);\r\n    --cu-effect-primary: var(--cu-neonBlue600-16);\r\n    --cu-link-primary: var(--cu-neonBlue600);\r\n    --cu-link-primary-hover: var(--cu-neonBlue700)\r\n}\r\n\r\nbody.cu-azureBlue {\r\n    --cu-background-primary: var(--cu-azureBlue600);\r\n    --cu-background-primary-hover: var(--cu-azureBlue700);\r\n    --cu-background-primary-pressed: var(--cu-azureBlue800);\r\n    --cu-background-primary-disabled: var(--cu-azureBlue200);\r\n    --cu-background-primary-subtle: var(--cu-azureBlue50);\r\n    --cu-background-primary-on-subtle: var(--cu-azureBlue100);\r\n    --cu-content-primary: var(--cu-azureBlue700);\r\n    --cu-border-primary: var(--cu-azureBlue600);\r\n    --cu-border-primary-focus: var(--cu-azureBlue600);\r\n    --cu-effect-primary: var(--cu-azureBlue600-16);\r\n    --cu-link-primary: var(--cu-azureBlue600);\r\n    --cu-link-primary-hover: var(--cu-azureBlue700)\r\n}\r\n\r\nbody.cu-teal {\r\n    --cu-background-primary: var(--cu-teal600);\r\n    --cu-background-primary-hover: var(--cu-teal700);\r\n    --cu-background-primary-pressed: var(--cu-teal800);\r\n    --cu-background-primary-disabled: var(--cu-teal200);\r\n    --cu-background-primary-subtle: var(--cu-teal50);\r\n    --cu-background-primary-on-subtle: var(--cu-teal100);\r\n    --cu-content-primary: var(--cu-teal700);\r\n    --cu-border-primary: var(--cu-teal600);\r\n    --cu-border-primary-focus: var(--cu-teal600);\r\n    --cu-effect-primary: var(--cu-teal600-16);\r\n    --cu-link-primary: var(--cu-teal600);\r\n    --cu-link-primary-hover: var(--cu-teal700)\r\n}\r\n\r\nbody.cu-mint {\r\n    --cu-background-primary: var(--cu-mint600);\r\n    --cu-background-primary-hover: var(--cu-mint700);\r\n    --cu-background-primary-pressed: var(--cu-mint800);\r\n    --cu-background-primary-disabled: var(--cu-mint200);\r\n    --cu-background-primary-subtle: var(--cu-mint50);\r\n    --cu-background-primary-on-subtle: var(--cu-mint100);\r\n    --cu-content-primary: var(--cu-mint700);\r\n    --cu-border-primary: var(--cu-mint600);\r\n    --cu-border-primary-focus: var(--cu-mint600);\r\n    --cu-effect-primary: var(--cu-mint600-16);\r\n    --cu-link-primary: var(--cu-mint600);\r\n    --cu-link-primary-hover: var(--cu-mint700)\r\n}\r\n\r\nbody.cu-orange {\r\n    --cu-background-primary: var(--cu-orange600);\r\n    --cu-background-primary-hover: var(--cu-orange700);\r\n    --cu-background-primary-pressed: var(--cu-orange800);\r\n    --cu-background-primary-disabled: var(--cu-orange200);\r\n    --cu-background-primary-subtle: var(--cu-orange50);\r\n    --cu-background-primary-on-subtle: var(--cu-orange100);\r\n    --cu-content-primary: var(--cu-orange700);\r\n    --cu-border-primary: var(--cu-orange600);\r\n    --cu-border-primary-focus: var(--cu-orange600);\r\n    --cu-effect-primary: var(--cu-orange600-16);\r\n    --cu-link-primary: var(--cu-orange600);\r\n    --cu-link-primary-hover: var(--cu-orange700)\r\n}\r\n\r\nbody.cu-pink {\r\n    --cu-background-primary: var(--cu-pink600);\r\n    --cu-background-primary-hover: var(--cu-pink700);\r\n    --cu-background-primary-pressed: var(--cu-pink800);\r\n    --cu-background-primary-disabled: var(--cu-pink200);\r\n    --cu-background-primary-subtle: var(--cu-pink50);\r\n    --cu-background-primary-on-subtle: var(--cu-pink100);\r\n    --cu-content-primary: var(--cu-pink700);\r\n    --cu-border-primary: var(--cu-pink600);\r\n    --cu-border-primary-focus: var(--cu-pink600);\r\n    --cu-effect-primary: var(--cu-pink600-16);\r\n    --cu-link-primary: var(--cu-pink600);\r\n    --cu-link-primary-hover: var(--cu-pink700)\r\n}\r\n\r\nbody.cu-violet {\r\n    --cu-background-primary: var(--cu-violet600);\r\n    --cu-background-primary-hover: var(--cu-violet700);\r\n    --cu-background-primary-pressed: var(--cu-violet800);\r\n    --cu-background-primary-disabled: var(--cu-violet200);\r\n    --cu-background-primary-subtle: var(--cu-violet50);\r\n    --cu-background-primary-on-subtle: var(--cu-violet100);\r\n    --cu-content-primary: var(--cu-violet700);\r\n    --cu-border-primary: var(--cu-violet600);\r\n    --cu-border-primary-focus: var(--cu-violet600);\r\n    --cu-effect-primary: var(--cu-violet600-16);\r\n    --cu-link-primary: var(--cu-violet600);\r\n    --cu-link-primary-hover: var(--cu-violet700)\r\n}\r\n\r\nbody.cu-brown {\r\n    --cu-background-primary: var(--cu-brown600);\r\n    --cu-background-primary-hover: var(--cu-brown700);\r\n    --cu-background-primary-pressed: var(--cu-brown800);\r\n    --cu-background-primary-disabled: var(--cu-brown200);\r\n    --cu-background-primary-subtle: var(--cu-brown50);\r\n    --cu-background-primary-on-subtle: var(--cu-brown100);\r\n    --cu-content-primary: var(--cu-brown700);\r\n    --cu-border-primary: var(--cu-brown600);\r\n    --cu-border-primary-focus: var(--cu-brown600);\r\n    --cu-effect-primary: var(--cu-brown600-16);\r\n    --cu-link-primary: var(--cu-brown600);\r\n    --cu-link-primary-hover: var(--cu-brown700)\r\n}\r\n\r\nbody.cu-black {\r\n    --cu-background-primary: var(--cu-black600);\r\n    --cu-background-primary-hover: var(--cu-black700);\r\n    --cu-background-primary-pressed: var(--cu-black800);\r\n    --cu-background-primary-disabled: var(--cu-black200);\r\n    --cu-background-primary-subtle: var(--cu-black50);\r\n    --cu-background-primary-on-subtle: var(--cu-black100);\r\n    --cu-content-primary: var(--cu-black700);\r\n    --cu-border-primary: var(--cu-black600);\r\n    --cu-border-primary-focus: var(--cu-black600);\r\n    --cu-effect-primary: var(--cu-black600-16);\r\n    --cu-link-primary: var(--cu-black600);\r\n    --cu-link-primary-hover: var(--cu-black700)\r\n}\r\n\r\nbody.cu-custom {\r\n    --cu-custom1100: hsl(var(--cu-custom-hue, 83), 24%, 25%);\r\n    --cu-custom1000: hsl(var(--cu-custom-hue, 83), 31%, 33%);\r\n    --cu-custom900: hsl(var(--cu-custom-hue, 83), 36%, 40%);\r\n    --cu-custom800: hsl(var(--cu-custom-hue, 83), 41%, 47%);\r\n    --cu-custom700: hsl(var(--cu-custom-hue, 83), 53%, 54%);\r\n    --cu-custom600: hsl(var(--cu-custom-hue, 83), 81%, 63%);\r\n    --cu-custom600-16: hsl(var(--cu-custom-hue, 83), 81%, 63%, 16%);\r\n    --cu-custom500: hsl(var(--cu-custom-hue, 83), 81%, 70%);\r\n    --cu-custom500-16: hsl(var(--cu-custom-hue, 83), 81%, 70%, 16%);\r\n    --cu-custom400: hsl(var(--cu-custom-hue, 83), 81%, 76%);\r\n    --cu-custom300: hsl(var(--cu-custom-hue, 83), 82%, 82%);\r\n    --cu-custom200: hsl(var(--cu-custom-hue, 83), 83%, 88%);\r\n    --cu-custom100: hsl(var(--cu-custom-hue, 83), 80%, 94%);\r\n    --cu-custom50: hsl(var(--cu-custom-hue, 83), 86%, 97%);\r\n    --cu-background-primary: var(--cu-custom600);\r\n    --cu-background-primary-hover: var(--cu-custom700);\r\n    --cu-background-primary-pressed: var(--cu-custom800);\r\n    --cu-background-primary-disabled: var(--cu-custom200);\r\n    --cu-background-primary-subtle: var(--cu-custom50);\r\n    --cu-background-primary-on-subtle: var(--cu-custom100);\r\n    --cu-content-primary: var(--cu-custom700);\r\n    --cu-border-primary: var(--cu-custom600);\r\n    --cu-border-primary-focus: var(--cu-custom600);\r\n    --cu-effect-primary: var(--cu-custom600-16);\r\n    --cu-link-primary: var(--cu-custom600);\r\n    --cu-link-primary-hover: var(--cu-custom700)\r\n}\r\n","@import './theme';\r\n@import './overrides';\r\n@import './sizes';\r\n@import './editor';\r\n@import './EditableHeading';\r\n@import './antd.css';\r\n\r\n@import './normalize.css';\r\n\r\n@import './overrides/prime/index.css';\r\n\r\n@import './overrides/antd.css';\r\n\r\n@import './overrides/exalidraw.css';\r\n@import './animations.css';\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media screen and (min-width: 1400px) {\r\n  html {\r\n    font-size: 14px;\r\n\r\n  }\r\n}\r\n\r\n@media screen and (min-width: 1600px) {\r\n  html {\r\n    font-size: 14px;\r\n  }\r\n}\r\n\r\n@media screen and (min-width: 1900px) {\r\n  html {\r\n    font-size: 14px;\r\n  }\r\n}\r\n\r\n\r\nhtml,\r\nbody {\r\n\r\n  margin: 0px;\r\n\r\n  padding: 0;\r\n  border: 0;\r\n\r\n  color: #505A64;\r\n  height: 100%;\r\n  -webkit-user-select: none;\r\n  position: relative;\r\n  overflow: hidden;\r\n  background-position: center center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n\r\n  -webkit-text-size-adjust: 100%;\r\n  -ms-text-size-adjust: 100%;\r\n  -webkit-font-smoothing: subpixel-antialiased !important;\r\n  /*  -webkit-font-smoothing: antialiased;\r\n*/\r\n  text-size-adjust: 100%;\r\n  text-rendering: optimizeLegibility;\r\n\r\n}\r\n\r\nbody {\r\n  cursor: var(--system-cursor-default), auto;\r\n\r\n  font-family: var(--font-family);\r\n  font-size: 1rem;\r\n\r\n  //-webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n  margin: 0;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n}\r\n\r\na,\r\nu {\r\n  text-decoration: none;\r\n}\r\n\r\n* {\r\n  /*-webkit-font-smoothing: subpixel-antialiased;\r\n  -moz-osx-font-smoothing: grayscale;*/\r\n  box-sizing: border-box;\r\n}",".monday-style-menu--large {\r\n    width: unset;\r\n}\r\n\r\n.monday-style-dialog-content-wrapper {\r\n    z-index: 10001;\r\n}\r\n\r\n.p-dialog {\r\n    border-radius: 15px;\r\n   /*  border-radius: 12px; */\r\n    border: 1px solid rgba(255, 255, 255, 50%) !important;\r\n   /*  outline: rgba(120, 120, 120, 10%) solid 1px; */\r\n    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\r\n    overflow: hidden;\r\n    background: white;\r\n    max-height: 100%\r\n}\r\n\r\n\r\ndiv.p-component-overlay.p-component-overlay-enter.p-dialog-mask {\r\n    z-index: 100 !important;\r\n}\r\n.p-confirm-dialog .p-dialog-content  {\r\n    padding: 20px !important;\r\n}\r\n\r\n.p-dialog-right .p-dialog  {\r\n    outline: rgba(120, 120, 120, 10%) solid 1px;\r\n    border-radius: 0px !important;\r\n     margin-top: 100px !important;\r\n     padding-bottom: 45px;\r\n }\r\n\r\n\r\n.p-dialog:before {\r\n    content: \"\";\r\n    position: absolute;\r\n    right: 0;\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    box-shadow: 0 0 130px 5px #00000054;\r\n}\r\n.p-dialog-top .p-dialog, .p-dialog-bottom .p-dialog, .p-dialog-left .p-dialog, .p-dialog-right .p-dialog, .p-dialog-top-left .p-dialog, .p-dialog-top-right .p-dialog, .p-dialog-bottom-left .p-dialog, .p-dialog-bottom-right .p-dialog {\r\n    margin: 0;\r\n}\r\n\r\n.p-dialog .p-dialog-header {\r\n    border-bottom: 1px solid #D6E4ED;\r\n    color: #212529;\r\n    padding: 1rem;\r\n    border-top-right-radius: 4px;\r\n    border-top-left-radius: 4px;\r\n    background: #F8FAFF;\r\n}\r\n.p-dialog .p-dialog-header .p-dialog-title {\r\n    font-size: 20px;\r\n    font-family: source sans pro semibold;\r\n    font-weight: normal;\r\n    line-height: 24px;\r\n    letter-spacing: normal;\r\n    color: #333D47;\r\n    flex-grow: 1;\r\n    word-break: break-word;\r\n}\r\n\r\n.p-dialog .p-dialog-content {\r\n    padding: 0px;\r\n}\r\n\r\n.p-dialog .p-dialog-footer {\r\n    border: none;\r\n}\r\n\r\n.p-overlaypanel:before {\r\n    border-width: 10px !important;\r\n}\r\n\r\n.p-overlaypanel:after {\r\n    border-width: 8px !important;\r\n}\r\n\r\n\r\n.p-overlaypanel:before {\r\n    border: solid transparent !important;\r\n    border-color: rgba(255, 255, 255, 0) !important;\r\n    border-bottom-color: #f2f2f2 !important;\r\n}\r\n\r\n.p-overlaypanel:after {\r\n    border: solid transparent !important;\r\n    border-color: rgba(255, 255, 255, 0) !important;\r\n    border-bottom-color: #ffffff !important;\r\n}\r\n\r\n.p-overlaypanel {\r\n    background: #ffffff !important;\r\n    color: rgba(0, 0, 0, 0.87) !important;\r\n    border: 0 none !important;\r\n    border-radius: 4px !important;\r\n    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;\r\n}\r\n\r\n.p-component-overlay {\r\n    background-color: rgba(46,67,84,.38) !important;\r\n}\r\n\r\n\r\n.p-fileupload .p-fileupload-content {\r\n    padding: 0px !important;\r\n    border: none !important;\r\n}\r\n\r\n\r\n.switch-group {\r\n    position: absolute;\r\n    width: 200%;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    transition: left 0.35s;\r\n    -webkit-transition: left 0.35s;\r\n    -moz-user-select: none;\r\n    -webkit-user-select: none;\r\n}\r\n\r\n.switch-handle {\r\n    position: relative;\r\n    margin: 0 auto;\r\n    padding-top: 0px;\r\n    padding-bottom: 0px;\r\n    height: 100%;\r\n    width: 0px;\r\n    border-width: 0 1px;\r\n    background-color: #fff !important;\r\n}\r\n\r\n.switch.btn {\r\n    min-width: auto !important;\r\n    min-height: auto !important;\r\n}\r\n\r\n.switch.btn.btn-light,\r\n.switch.btn.btn-outline-light {\r\n    border: solid 1px rgba(0, 0, 0, .15);\r\n}\r\n\r\n.switch-on {\r\n    line-height: 20px;\r\n    font-size: 13px;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 50%;\r\n    margin: 0;\r\n    border: 0;\r\n    border-radius: 0;\r\n}\r\n\r\n.switch-on.btn {\r\n    padding-right: 1.5rem;\r\n}\r\n\r\n.switch-off {\r\n    line-height: 20px;\r\n    font-size: 13px;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 50%;\r\n    right: 0;\r\n    margin: 0;\r\n    border: 0;\r\n    border-radius: 0;\r\n    box-shadow: none;\r\n}\r\n\r\n.switch-off.btn {\r\n    padding-left: 1.5rem;\r\n}\r\n\r\n.btn-primary {\r\n    color: #fff;\r\n    background-color: #d34416;\r\n    border: solid 1px #d34416;\r\n}\r\n\r\n.btn-primary:hover {\r\n    color: #fff;\r\n    background-color: #d34416;\r\n    border: solid 1px #d34416;\r\n}\r\n\r\n.btn-light {\r\n    color: #212529;\r\n    background-color: #f8f9fa;\r\n    border-color: #f8f9fa;\r\n}\r\n\r\n.btn {\r\n    display: inline-block;\r\n    font-weight: 400;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    padding: 0.375rem 0.75rem;\r\n    border-radius: 0.25rem;\r\n    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;\r\n}\r\n\r\n\r\n\r\ntd {\r\n    /* text-align: center; */\r\n    vertical-align: middle;\r\n}\r\n\r\n.tabs--wrapper {\r\n    padding: 0px !important;\r\n\r\n}\r\n\r\na.tab-inner.tabs-list_tab-inner {\r\n    padding: 0px !important;\r\n}\r\n\r\nli.tab--wrapper.tabs-list_tab--wrapper {\r\n    height: calc(100% - 2px) !important;\r\n    border-bottom: 0px !important;\r\n}\r\n\r\nli.tab--wrapper.tabs-list_tab--wrapper.tab-focus-visible-inset {\r\n    box-shadow: none;\r\n}\r\n\r\n/*HStack alignment bottom leading yap*/\r\nul.tabs-list {\r\n    height: 100% !important;\r\n}\r\n\r\n/* kanban */\r\n\r\nth.e-header-cells.e-template.e-toggle-header div.e-header-wrap {\r\n    height: 100%;\r\n    align-items: center;\r\n}\r\n\r\n.p-fileupload .p-fileupload-content {\r\n    background: transparent;\r\n}\r\n\r\n.monday-style-menu-title {\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    flex-grow: 1;\r\n    text-transform: uppercase;\r\n    letter-spacing: .05em;\r\n    color: #656f7d;\r\n    white-space: nowrap;\r\n}\r\n\r\n.monday-style-toast {\r\n    max-width: 500px;\r\n    z-index: 1000;\r\n}\r\n\r\n\r\ndiv.e-spinner-inner {\r\n    display: none !important;\r\n}\r\n\r\ndiv.e-spin-show.e-spinner-pane {\r\n    display: none !important;\r\n}\r\n\r\n\r\n@keyframes pop {\r\n    0% {\r\n      transform: scale(1);\r\n      box-shadow: var(--box-shadow);\r\n    }\r\n    100% {\r\n      transform: scale(var(--scale));\r\n      box-shadow: var(--box-shadow-picked-up);\r\n    }\r\n  }\r\n  \r\n  @keyframes fadeIn {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n    100% {\r\n      opacity: 1;\r\n    }\r\n  }\r\n  ",".size-xxs {\r\n    font-size: 14px;\r\n}",":root {\r\n    --editor-max-width: 100%;\r\n    --editor-font-size: 16px;\r\n    --editor-line-height: 1.5;\r\n    --editor-paragraph-spacing: 0rem;\r\n    --editor-font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\r\n}\r\n\r\n.codex-editor__loader {\r\n    display: none !important;\r\n  }\r\n\r\n/* .ce-block__content,\r\n.ce-toolbar__content {\r\n    max-width: var(--editor-max-width);\r\n}\r\n */\r\n .ce-block {\r\n    font-size: var(--editor-font-size);\r\n    font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\r\n\r\n }\r\n.ce-paragraph {\r\n    font-size: var(--editor-font-size);\r\n    font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\r\n\r\n}\r\n\r\n.codex-editor {\r\n    height: fit-content;\r\n    z-index: 100 !important;\r\n    color: #212526;\r\n    font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\r\n}\r\n\r\nh1.ce-header {\r\n    color: #212526;\r\n     font-weight: 500;\r\n     font-size: 28px;\r\n     line-height:  1.25;\r\n    \r\n }\r\n\r\nh2.ce-header {\r\n   color: #212526;\r\n    font-weight: 500;\r\n    font-size: 22px;\r\n    line-height:  1.25;\r\n   \r\n}\r\n\r\n.ce-toolbar__actions {\r\n    right: 100% !important;\r\n}\r\n.ce-toolbar__settings-btn {\r\n    color: gray !important;\r\n}\r\n.ce-toolbar__plus {\r\n    color: gray !important;\r\n}\r\n\r\n@media (min-width: 651px) {\r\n.codex-editor--narrow .ce-toolbox .ce-popover {\r\n    right: auto !important;\r\n}\r\n\r\n}\r\n\r\n.ce-block__content, .ce-toolbar__content {\r\n    max-width: 100% !important;\r\n}\r\n\r\n .codex-editor__redactor {\r\n    padding-bottom: 50px !important;\r\n} ",".editable-heading--wrapper{\r\n    width: auto !important;\r\n}\r\n\r\n/* .editable-heading-input{\r\n    height: 50px !important;\r\n} */\r\n/* .heading-component{\r\n    line-height: 48px !important;\r\n} */\r\n\r\n/* h4[data-testid='heading'] {\r\n    background-color: yellow;\r\n  } */\r\n\r\n/*   div[data-testid='dialog-content-container'] {\r\n    padding: 0px !important;\r\n  } \r\n   */\r\n\r\n   div.bottom.react-flow__attribution.react-flow__panel.right[data-message='Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev'][style='pointer-events: all;'] {\r\n    display: none !important;\r\n    }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/animations.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/animations.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n@keyframes rubberBand {\r\n    0%{\r\n        transform: scaleX(1);\r\n    }\r\n    40%{\r\n        transform: scaleX(1.12) scaleY(0.75);\r\n    }\r\n    55%{\r\n        transform: scaleX(0.85) scaleY(1);\r\n    }\r\n    65%{\r\n        transform: scaleX(1.09) scaleY(0.85);\r\n    }\r\n    75%{\r\n        transform: scaleX(0.9)  scaleY(1);\r\n    }\r\n    90%{\r\n        transform: scaleX(1.05) scaleY(0.95);\r\n    }\r\n    100%{\r\n        transform: scaleX(1) scaleY(1);\r\n    }\r\n}", "",{"version":3,"sources":["webpack://./src/client/css/animations.css"],"names":[],"mappings":";AACA;IACI;QACI,oBAAoB;IACxB;IACA;QACI,oCAAoC;IACxC;IACA;QACI,iCAAiC;IACrC;IACA;QACI,oCAAoC;IACxC;IACA;QACI,iCAAiC;IACrC;IACA;QACI,oCAAoC;IACxC;IACA;QACI,8BAA8B;IAClC;AACJ","sourcesContent":["\r\n@keyframes rubberBand {\r\n    0%{\r\n        transform: scaleX(1);\r\n    }\r\n    40%{\r\n        transform: scaleX(1.12) scaleY(0.75);\r\n    }\r\n    55%{\r\n        transform: scaleX(0.85) scaleY(1);\r\n    }\r\n    65%{\r\n        transform: scaleX(1.09) scaleY(0.85);\r\n    }\r\n    75%{\r\n        transform: scaleX(0.9)  scaleY(1);\r\n    }\r\n    90%{\r\n        transform: scaleX(1.05) scaleY(0.95);\r\n    }\r\n    100%{\r\n        transform: scaleX(1) scaleY(1);\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/antd.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/antd.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ant-picker-dropdown {\r\n    z-index: 1200 !important;\r\n}", "",{"version":3,"sources":["webpack://./src/client/css/antd.css"],"names":[],"mappings":"AAAA;IACI,wBAAwB;AAC5B","sourcesContent":[".ant-picker-dropdown {\r\n    z-index: 1200 !important;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/normalize.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/normalize.css ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n   /*  line-height: 1.15; */\r\n    /* 1 */\r\n    -webkit-text-size-adjust: 100%;\r\n    /* 2 */\r\n}\r\n\r\n/* Sections\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the margin in all browsers.\r\n   */\r\n\r\nbody {\r\n    margin: 0;\r\n}\r\n\r\n/**\r\n   * Render the `main` element consistently in IE.\r\n   */\r\n\r\nmain {\r\n    display: block;\r\n}\r\n\r\n/**\r\n   * Correct the font size and margin on `h1` elements within `section` and\r\n   * `article` contexts in Chrome, Firefox, and Safari.\r\n   */\r\n\r\nh1 {\r\n    font-size: 2em;\r\n    margin: 0.67em 0;\r\n}\r\n\r\n/* Grouping content\r\n     ========================================================================== */\r\n\r\n/**\r\n   * 1. Add the correct box sizing in Firefox.\r\n   * 2. Show the overflow in Edge and IE.\r\n   */\r\n\r\nhr {\r\n    box-sizing: content-box;\r\n    /* 1 */\r\n    height: 0;\r\n    /* 1 */\r\n    overflow: visible;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * 1. Correct the inheritance and scaling of font size in all browsers.\r\n   * 2. Correct the odd `em` font sizing in all browsers.\r\n   */\r\n\r\npre {\r\n    font-family: monospace, monospace;\r\n    /* 1 */\r\n    font-size: 1em;\r\n    /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the gray background on active links in IE 10.\r\n   */\r\n\r\na {\r\n    background-color: transparent;\r\n}\r\n\r\n/**\r\n   * 1. Remove the bottom border in Chrome 57-\r\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n   */\r\n\r\nabbr[title] {\r\n    border-bottom: none;\r\n    /* 1 */\r\n    text-decoration: underline;\r\n    /* 2 */\r\n    text-decoration: underline dotted;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Add the correct font weight in Chrome, Edge, and Safari.\r\n   */\r\n\r\nb,\r\nstrong {\r\n    font-weight: bolder;\r\n}\r\n\r\n/**\r\n   * 1. Correct the inheritance and scaling of font size in all browsers.\r\n   * 2. Correct the odd `em` font sizing in all browsers.\r\n   */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n    font-family: monospace, monospace;\r\n    /* 1 */\r\n    font-size: 1em;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Add the correct font size in all browsers.\r\n   */\r\n\r\nsmall {\r\n    font-size: 80%;\r\n}\r\n\r\n/**\r\n   * Prevent `sub` and `sup` elements from affecting the line height in\r\n   * all browsers.\r\n   */\r\n\r\nsub,\r\nsup {\r\n    font-size: 75%;\r\n    line-height: 0;\r\n    position: relative;\r\n    vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n    bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n    top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the border on images inside links in IE 10.\r\n   */\r\n\r\nimg {\r\n    border-style: none;\r\n}\r\n\r\n/* Forms\r\n     ========================================================================== */\r\n\r\n/**\r\n   * 1. Change the font styles in all browsers.\r\n   * 2. Remove the margin in Firefox and Safari.\r\n   */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n    font-family: inherit;\r\n    /* 1 */\r\n    font-size: 100%;\r\n    /* 1 */\r\n    line-height: 1.15;\r\n    /* 1 */\r\n    margin: 0;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Show the overflow in IE.\r\n   * 1. Show the overflow in Edge.\r\n   */\r\n\r\nbutton,\r\ninput {\r\n    /* 1 */\r\n    overflow: visible;\r\n}\r\n\r\n/**\r\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n   * 1. Remove the inheritance of text transform in Firefox.\r\n   */\r\n\r\nbutton,\r\nselect {\r\n    /* 1 */\r\n    text-transform: none;\r\n}\r\n\r\n/**\r\n   * Correct the inability to style clickable types in iOS and Safari.\r\n   */\r\n\r\nbutton,\r\n[type=\"button\"],\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n    -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n   * Remove the inner border and padding in Firefox.\r\n   */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n    border-style: none;\r\n    padding: 0;\r\n}\r\n\r\n/**\r\n   * Restore the focus styles unset by the previous rule.\r\n   */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n    outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n   * Correct the padding in Firefox.\r\n   */\r\n\r\nfieldset {\r\n    padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n   * 1. Correct the text wrapping in Edge and IE.\r\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n   * 3. Remove the padding so developers are not caught out when they zero out\r\n   *    `fieldset` elements in all browsers.\r\n   */\r\n\r\nlegend {\r\n    box-sizing: border-box;\r\n    /* 1 */\r\n    color: inherit;\r\n    /* 2 */\r\n    display: table;\r\n    /* 1 */\r\n    max-width: 100%;\r\n    /* 1 */\r\n    padding: 0;\r\n    /* 3 */\r\n    white-space: normal;\r\n    /* 1 */\r\n}\r\n\r\n/**\r\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n   */\r\n\r\nprogress {\r\n    vertical-align: baseline;\r\n}\r\n\r\n/**\r\n   * Remove the default vertical scrollbar in IE 10+.\r\n   */\r\n\r\ntextarea {\r\n    overflow: auto;\r\n}\r\n\r\n/**\r\n   * 1. Add the correct box sizing in IE 10.\r\n   * 2. Remove the padding in IE 10.\r\n   */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n    box-sizing: border-box;\r\n    /* 1 */\r\n    padding: 0;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Correct the cursor style of increment and decrement buttons in Chrome.\r\n   */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n    height: auto;\r\n}\r\n\r\n/**\r\n   * 1. Correct the odd appearance in Chrome and Safari.\r\n   * 2. Correct the outline style in Safari.\r\n   */\r\n\r\n[type=\"search\"] {\r\n    -webkit-appearance: textfield;\r\n    /* 1 */\r\n    outline-offset: -2px;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Remove the inner padding in Chrome and Safari on macOS.\r\n   */\r\n\r\n[type=\"search\"]::-webkit-search-decoration {\r\n    -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n   * 1. Correct the inability to style clickable types in iOS and Safari.\r\n   * 2. Change font properties to `inherit` in Safari.\r\n   */\r\n\r\n::-webkit-file-upload-button {\r\n    -webkit-appearance: button;\r\n    /* 1 */\r\n    font: inherit;\r\n    /* 2 */\r\n}\r\n\r\n/* Interactive\r\n     ========================================================================== */\r\n\r\n/*\r\n   * Add the correct display in Edge, IE 10+, and Firefox.\r\n   */\r\n\r\ndetails {\r\n    display: block;\r\n}\r\n\r\n/*\r\n   * Add the correct display in all browsers.\r\n   */\r\n\r\nsummary {\r\n    display: list-item;\r\n}\r\n\r\n/* Misc\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Add the correct display in IE 10+.\r\n   */\r\n\r\ntemplate {\r\n    display: none;\r\n}\r\n\r\n/**\r\n   * Add the correct display in IE 10.\r\n   */\r\n\r\n[hidden] {\r\n    display: none;\r\n}\r\n\r\nul {\r\n\r\n    margin-block-start: 0px;\r\n    margin-block-end: 0px;\r\n    padding-inline-start: 0px;\r\n}\r\n\r\n\r\n\r\n table,\r\n thead,\r\n tbody,\r\n tfoot,\r\n tr,\r\n th,\r\n td {\r\n   \r\n    margin: 0;\r\n    padding: 0;\r\n    border: none;\r\n    border-collapse: inherit;\r\n    border-spacing: 0;\r\n    border-color: inherit;\r\n    vertical-align: inherit;\r\n    text-align: left;\r\n    font-weight: inherit;\r\n    font-size: inherit;\r\n    -webkit-border-horizontal-spacing: 0;\r\n    -webkit-border-vertical-spacing: 0;\r\n}\r\n\r\n", "",{"version":3,"sources":["webpack://./src/client/css/normalize.css"],"names":[],"mappings":"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","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n   /*  line-height: 1.15; */\r\n    /* 1 */\r\n    -webkit-text-size-adjust: 100%;\r\n    /* 2 */\r\n}\r\n\r\n/* Sections\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the margin in all browsers.\r\n   */\r\n\r\nbody {\r\n    margin: 0;\r\n}\r\n\r\n/**\r\n   * Render the `main` element consistently in IE.\r\n   */\r\n\r\nmain {\r\n    display: block;\r\n}\r\n\r\n/**\r\n   * Correct the font size and margin on `h1` elements within `section` and\r\n   * `article` contexts in Chrome, Firefox, and Safari.\r\n   */\r\n\r\nh1 {\r\n    font-size: 2em;\r\n    margin: 0.67em 0;\r\n}\r\n\r\n/* Grouping content\r\n     ========================================================================== */\r\n\r\n/**\r\n   * 1. Add the correct box sizing in Firefox.\r\n   * 2. Show the overflow in Edge and IE.\r\n   */\r\n\r\nhr {\r\n    box-sizing: content-box;\r\n    /* 1 */\r\n    height: 0;\r\n    /* 1 */\r\n    overflow: visible;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * 1. Correct the inheritance and scaling of font size in all browsers.\r\n   * 2. Correct the odd `em` font sizing in all browsers.\r\n   */\r\n\r\npre {\r\n    font-family: monospace, monospace;\r\n    /* 1 */\r\n    font-size: 1em;\r\n    /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the gray background on active links in IE 10.\r\n   */\r\n\r\na {\r\n    background-color: transparent;\r\n}\r\n\r\n/**\r\n   * 1. Remove the bottom border in Chrome 57-\r\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n   */\r\n\r\nabbr[title] {\r\n    border-bottom: none;\r\n    /* 1 */\r\n    text-decoration: underline;\r\n    /* 2 */\r\n    text-decoration: underline dotted;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Add the correct font weight in Chrome, Edge, and Safari.\r\n   */\r\n\r\nb,\r\nstrong {\r\n    font-weight: bolder;\r\n}\r\n\r\n/**\r\n   * 1. Correct the inheritance and scaling of font size in all browsers.\r\n   * 2. Correct the odd `em` font sizing in all browsers.\r\n   */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n    font-family: monospace, monospace;\r\n    /* 1 */\r\n    font-size: 1em;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Add the correct font size in all browsers.\r\n   */\r\n\r\nsmall {\r\n    font-size: 80%;\r\n}\r\n\r\n/**\r\n   * Prevent `sub` and `sup` elements from affecting the line height in\r\n   * all browsers.\r\n   */\r\n\r\nsub,\r\nsup {\r\n    font-size: 75%;\r\n    line-height: 0;\r\n    position: relative;\r\n    vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n    bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n    top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Remove the border on images inside links in IE 10.\r\n   */\r\n\r\nimg {\r\n    border-style: none;\r\n}\r\n\r\n/* Forms\r\n     ========================================================================== */\r\n\r\n/**\r\n   * 1. Change the font styles in all browsers.\r\n   * 2. Remove the margin in Firefox and Safari.\r\n   */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n    font-family: inherit;\r\n    /* 1 */\r\n    font-size: 100%;\r\n    /* 1 */\r\n    line-height: 1.15;\r\n    /* 1 */\r\n    margin: 0;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Show the overflow in IE.\r\n   * 1. Show the overflow in Edge.\r\n   */\r\n\r\nbutton,\r\ninput {\r\n    /* 1 */\r\n    overflow: visible;\r\n}\r\n\r\n/**\r\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n   * 1. Remove the inheritance of text transform in Firefox.\r\n   */\r\n\r\nbutton,\r\nselect {\r\n    /* 1 */\r\n    text-transform: none;\r\n}\r\n\r\n/**\r\n   * Correct the inability to style clickable types in iOS and Safari.\r\n   */\r\n\r\nbutton,\r\n[type=\"button\"],\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n    -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n   * Remove the inner border and padding in Firefox.\r\n   */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n    border-style: none;\r\n    padding: 0;\r\n}\r\n\r\n/**\r\n   * Restore the focus styles unset by the previous rule.\r\n   */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n    outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n   * Correct the padding in Firefox.\r\n   */\r\n\r\nfieldset {\r\n    padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n   * 1. Correct the text wrapping in Edge and IE.\r\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n   * 3. Remove the padding so developers are not caught out when they zero out\r\n   *    `fieldset` elements in all browsers.\r\n   */\r\n\r\nlegend {\r\n    box-sizing: border-box;\r\n    /* 1 */\r\n    color: inherit;\r\n    /* 2 */\r\n    display: table;\r\n    /* 1 */\r\n    max-width: 100%;\r\n    /* 1 */\r\n    padding: 0;\r\n    /* 3 */\r\n    white-space: normal;\r\n    /* 1 */\r\n}\r\n\r\n/**\r\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n   */\r\n\r\nprogress {\r\n    vertical-align: baseline;\r\n}\r\n\r\n/**\r\n   * Remove the default vertical scrollbar in IE 10+.\r\n   */\r\n\r\ntextarea {\r\n    overflow: auto;\r\n}\r\n\r\n/**\r\n   * 1. Add the correct box sizing in IE 10.\r\n   * 2. Remove the padding in IE 10.\r\n   */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n    box-sizing: border-box;\r\n    /* 1 */\r\n    padding: 0;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Correct the cursor style of increment and decrement buttons in Chrome.\r\n   */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n    height: auto;\r\n}\r\n\r\n/**\r\n   * 1. Correct the odd appearance in Chrome and Safari.\r\n   * 2. Correct the outline style in Safari.\r\n   */\r\n\r\n[type=\"search\"] {\r\n    -webkit-appearance: textfield;\r\n    /* 1 */\r\n    outline-offset: -2px;\r\n    /* 2 */\r\n}\r\n\r\n/**\r\n   * Remove the inner padding in Chrome and Safari on macOS.\r\n   */\r\n\r\n[type=\"search\"]::-webkit-search-decoration {\r\n    -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n   * 1. Correct the inability to style clickable types in iOS and Safari.\r\n   * 2. Change font properties to `inherit` in Safari.\r\n   */\r\n\r\n::-webkit-file-upload-button {\r\n    -webkit-appearance: button;\r\n    /* 1 */\r\n    font: inherit;\r\n    /* 2 */\r\n}\r\n\r\n/* Interactive\r\n     ========================================================================== */\r\n\r\n/*\r\n   * Add the correct display in Edge, IE 10+, and Firefox.\r\n   */\r\n\r\ndetails {\r\n    display: block;\r\n}\r\n\r\n/*\r\n   * Add the correct display in all browsers.\r\n   */\r\n\r\nsummary {\r\n    display: list-item;\r\n}\r\n\r\n/* Misc\r\n     ========================================================================== */\r\n\r\n/**\r\n   * Add the correct display in IE 10+.\r\n   */\r\n\r\ntemplate {\r\n    display: none;\r\n}\r\n\r\n/**\r\n   * Add the correct display in IE 10.\r\n   */\r\n\r\n[hidden] {\r\n    display: none;\r\n}\r\n\r\nul {\r\n\r\n    margin-block-start: 0px;\r\n    margin-block-end: 0px;\r\n    padding-inline-start: 0px;\r\n}\r\n\r\n\r\n\r\n table,\r\n thead,\r\n tbody,\r\n tfoot,\r\n tr,\r\n th,\r\n td {\r\n   \r\n    margin: 0;\r\n    padding: 0;\r\n    border: none;\r\n    border-collapse: inherit;\r\n    border-spacing: 0;\r\n    border-color: inherit;\r\n    vertical-align: inherit;\r\n    text-align: left;\r\n    font-weight: inherit;\r\n    font-size: inherit;\r\n    -webkit-border-horizontal-spacing: 0;\r\n    -webkit-border-vertical-spacing: 0;\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/antd.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/antd.css ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ant-tree-switcher {\r\n    display: list-item ;\r\n}\r\n\r\n.ant-tree-title {\r\n    white-space: nowrap;\r\n}\r\n\r\n.ant-tree-iconEle {\r\n    vertical-align: sub !important;\r\n}", "",{"version":3,"sources":["webpack://./src/client/css/overrides/antd.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;AACvB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,8BAA8B;AAClC","sourcesContent":[".ant-tree-switcher {\r\n    display: list-item ;\r\n}\r\n\r\n.ant-tree-title {\r\n    white-space: nowrap;\r\n}\r\n\r\n.ant-tree-iconEle {\r\n    vertical-align: sub !important;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/exalidraw.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/exalidraw.css ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\ndiv.App-menu__left.Island{\r\n    left: calc(100% - 220px);\r\n}\r\n\r\n.excalidraw.excalidraw-container {\r\n    overflow: visible;\r\n\r\n}\r\n\r\n.excalidraw .library-menu-browse-button {\r\n    display: none !important;\r\n}\r\n\r\n.excalidraw .library-menu-items-container__header--excal{\r\n    display: none !important;\r\n}\r\n\r\n\r\n\r\ndiv.dropdown-menu-group {\r\n    display: none !important;\r\n} \r\n\r\n", "",{"version":3,"sources":["webpack://./src/client/css/overrides/exalidraw.css"],"names":[],"mappings":";AACA;IACI,wBAAwB;AAC5B;;AAEA;IACI,iBAAiB;;AAErB;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B;;;;AAIA;IACI,wBAAwB;AAC5B","sourcesContent":["\r\ndiv.App-menu__left.Island{\r\n    left: calc(100% - 220px);\r\n}\r\n\r\n.excalidraw.excalidraw-container {\r\n    overflow: visible;\r\n\r\n}\r\n\r\n.excalidraw .library-menu-browse-button {\r\n    display: none !important;\r\n}\r\n\r\n.excalidraw .library-menu-items-container__header--excal{\r\n    display: none !important;\r\n}\r\n\r\n\r\n\r\ndiv.dropdown-menu-group {\r\n    display: none !important;\r\n} \r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/DataTable/index.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/DataTable/index.css ***!
  \**************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".p-datatable {\r\n    width: 100%;\r\n    border: none;\r\n}\r\n\r\n.p-column-title {\r\n  width: 100%;\r\n}\r\n .p-datatable .p-datatable-thead > tr > th {\r\n    /* font-size: 16px;\r\n    font-family: source sans pro semibold;\r\n    text-align: left;\r\n    padding: 1rem 1rem; */\r\n  /*   border: none;\r\n    border-width: 0 0 1px 0; */\r\n    font-weight: 500;\r\n    color: #343a40;\r\n    background: #F9FAFB;\r\n    transition: box-shadow 0.2s;\r\n    padding: 0px;\r\n} \r\n\r\n.p-datatable .p-datatable-tbody> tr > td {\r\n  padding-left: 8px !important;\r\n  padding-right: 8px !important;\r\n  height: 38px;\r\n  padding: 0px;\r\n} ", "",{"version":3,"sources":["webpack://./src/client/css/overrides/prime/DataTable/index.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;EACE,WAAW;AACb;CACC;IACG;;;yBAGqB;EACvB;8BAC4B;IAC1B,gBAAgB;IAChB,cAAc;IACd,mBAAmB;IACnB,2BAA2B;IAC3B,YAAY;AAChB;;AAEA;EACE,4BAA4B;EAC5B,6BAA6B;EAC7B,YAAY;EACZ,YAAY;AACd","sourcesContent":[".p-datatable {\r\n    width: 100%;\r\n    border: none;\r\n}\r\n\r\n.p-column-title {\r\n  width: 100%;\r\n}\r\n .p-datatable .p-datatable-thead > tr > th {\r\n    /* font-size: 16px;\r\n    font-family: source sans pro semibold;\r\n    text-align: left;\r\n    padding: 1rem 1rem; */\r\n  /*   border: none;\r\n    border-width: 0 0 1px 0; */\r\n    font-weight: 500;\r\n    color: #343a40;\r\n    background: #F9FAFB;\r\n    transition: box-shadow 0.2s;\r\n    padding: 0px;\r\n} \r\n\r\n.p-datatable .p-datatable-tbody> tr > td {\r\n  padding-left: 8px !important;\r\n  padding-right: 8px !important;\r\n  height: 38px;\r\n  padding: 0px;\r\n} "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/component.css":
/*!********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/component.css ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n.p-component  {\r\n    font-family: Figtree,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif\r\n}\r\n\r\n.p-component {\r\n     font-size: 1rem;\r\n}\r\n\r\n\r\n\r\n.p-dialog-content {\r\n    overflow: hidden;\r\n}", "",{"version":3,"sources":["webpack://./src/client/css/overrides/prime/component.css"],"names":[],"mappings":";AACA;IACI;AACJ;;AAEA;KACK,eAAe;AACpB;;;;AAIA;IACI,gBAAgB;AACpB","sourcesContent":["\r\n.p-component  {\r\n    font-family: Figtree,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif\r\n}\r\n\r\n.p-component {\r\n     font-size: 1rem;\r\n}\r\n\r\n\r\n\r\n.p-dialog-content {\r\n    overflow: hidden;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/dropdown/index.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/dropdown/index.css ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* .p-dropdown-label.p-inputtext {\r\n    padding: 0px;\r\n}\r\n\r\n.p-dropdown-label-empty {\r\n    visibility: visible !important;\r\n}\r\n\r\n.p-dropdown:not(.p-disabled).p-focus {\r\n    outline: 0 none;\r\n    outline-offset: 0;\r\n    box-shadow: none !important;\r\n    border-color: none !important;\r\n  } */", "",{"version":3,"sources":["webpack://./src/client/css/overrides/prime/dropdown/index.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;KAaK","sourcesContent":["/* .p-dropdown-label.p-inputtext {\r\n    padding: 0px;\r\n}\r\n\r\n.p-dropdown-label-empty {\r\n    visibility: visible !important;\r\n}\r\n\r\n.p-dropdown:not(.p-disabled).p-focus {\r\n    outline: 0 none;\r\n    outline-offset: 0;\r\n    box-shadow: none !important;\r\n    border-color: none !important;\r\n  } */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/index.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/index.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../../../node_modules/css-loader/dist/cjs.js!./component.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/component.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_DataTable_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../../../../node_modules/css-loader/dist/cjs.js!./DataTable/index.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/DataTable/index.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_dropdown_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../../../../node_modules/css-loader/dist/cjs.js!./dropdown/index.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/dropdown/index.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_selectbutton_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../../../../node_modules/css-loader/dist/cjs.js!./selectbutton.css */ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/selectbutton.css");
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_DataTable_index_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_dropdown_index_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_selectbutton_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/selectbutton.css":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/client/css/overrides/prime/selectbutton.css ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n\r\n.p-selectbutton .p-button {\r\n    background: rgb(255, 255, 255);\r\n    border: 1px solid rgb(206, 212, 218);\r\n    color: rgb(73, 80, 87);\r\n    transition: background-color 0.2s ease 0s, color 0.2s ease 0s, border-color 0.2s ease 0s, box-shadow 0.2s ease 0s;\r\n}\r\n\r\n.p-selectbutton .p-button.p-highlight {\r\n    background: rgb(59, 130, 246);\r\n    border-color: rgb(59, 130, 246);\r\n    color: rgb(255, 255, 255);\r\n}\r\n\r\n.p-selectbutton .p-button:not(.p-disabled):not(.p-highlight):hover {\r\n    background: rgb(233, 236, 239);\r\n    border-color: rgb(206, 212, 218);\r\n    color: rgb(73, 80, 87);\r\n}\r\n\r\n.p-button:enabled:hover, .p-button:not(button):not(a):not(.p-disabled):hover {\r\n    background: rgb(59, 130, 246);\r\n    color: rgb(255, 255, 255);\r\n    border-color: rgb(59, 130, 246);\r\n}\r\n\r\n.p-selectbutton .p-button.p-highlight:hover {\r\n    background: rgb(59, 130, 246);\r\n    border-color: rgb(59, 130, 246);\r\n    color: rgb(255, 255, 255);\r\n}", "",{"version":3,"sources":["webpack://./src/client/css/overrides/prime/selectbutton.css"],"names":[],"mappings":";;AAEA;IACI,8BAA8B;IAC9B,oCAAoC;IACpC,sBAAsB;IACtB,iHAAiH;AACrH;;AAEA;IACI,6BAA6B;IAC7B,+BAA+B;IAC/B,yBAAyB;AAC7B;;AAEA;IACI,8BAA8B;IAC9B,gCAAgC;IAChC,sBAAsB;AAC1B;;AAEA;IACI,6BAA6B;IAC7B,yBAAyB;IACzB,+BAA+B;AACnC;;AAEA;IACI,6BAA6B;IAC7B,+BAA+B;IAC/B,yBAAyB;AAC7B","sourcesContent":["\r\n\r\n.p-selectbutton .p-button {\r\n    background: rgb(255, 255, 255);\r\n    border: 1px solid rgb(206, 212, 218);\r\n    color: rgb(73, 80, 87);\r\n    transition: background-color 0.2s ease 0s, color 0.2s ease 0s, border-color 0.2s ease 0s, box-shadow 0.2s ease 0s;\r\n}\r\n\r\n.p-selectbutton .p-button.p-highlight {\r\n    background: rgb(59, 130, 246);\r\n    border-color: rgb(59, 130, 246);\r\n    color: rgb(255, 255, 255);\r\n}\r\n\r\n.p-selectbutton .p-button:not(.p-disabled):not(.p-highlight):hover {\r\n    background: rgb(233, 236, 239);\r\n    border-color: rgb(206, 212, 218);\r\n    color: rgb(73, 80, 87);\r\n}\r\n\r\n.p-button:enabled:hover, .p-button:not(button):not(a):not(.p-disabled):hover {\r\n    background: rgb(59, 130, 246);\r\n    color: rgb(255, 255, 255);\r\n    border-color: rgb(59, 130, 246);\r\n}\r\n\r\n.p-selectbutton .p-button.p-highlight:hover {\r\n    background: rgb(59, 130, 246);\r\n    border-color: rgb(59, 130, 246);\r\n    color: rgb(255, 255, 255);\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/*!********************************************!*\
  !*** ./node_modules/shallowequal/index.js ***!
  \********************************************/
/***/ ((module) => {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ "./src/client/css/global.scss":
/*!************************************!*\
  !*** ./src/client/css/global.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_global_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./global.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/client/css/global.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_global_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_global_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_global_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_global_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/styled-components/dist/styled-components.browser.esm.js":
/*!******************************************************************************!*\
  !*** ./node_modules/styled-components/dist/styled-components.browser.esm.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerStyleSheet": () => (/* binding */ mt),
/* harmony export */   "StyleSheetConsumer": () => (/* binding */ $e),
/* harmony export */   "StyleSheetContext": () => (/* binding */ Me),
/* harmony export */   "StyleSheetManager": () => (/* binding */ Le),
/* harmony export */   "ThemeConsumer": () => (/* binding */ Qe),
/* harmony export */   "ThemeContext": () => (/* binding */ Ke),
/* harmony export */   "ThemeProvider": () => (/* binding */ tt),
/* harmony export */   "__PRIVATE__": () => (/* binding */ yt),
/* harmony export */   "createGlobalStyle": () => (/* binding */ dt),
/* harmony export */   "css": () => (/* binding */ at),
/* harmony export */   "default": () => (/* binding */ ut),
/* harmony export */   "isStyledComponent": () => (/* binding */ se),
/* harmony export */   "keyframes": () => (/* binding */ ht),
/* harmony export */   "styled": () => (/* binding */ ut),
/* harmony export */   "useTheme": () => (/* binding */ et),
/* harmony export */   "version": () => (/* binding */ v),
/* harmony export */   "withTheme": () => (/* binding */ ft)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/styled-components/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shallowequal */ "./node_modules/shallowequal/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shallowequal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
var f="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",m="active",y="data-styled-version",v="6.1.6",g="/*!sc*/\n",S="undefined"!=typeof window&&"HTMLElement"in window,w=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!=="development"),b={},E=/invalid hook call/i,N=new Set,P=function(t,n){if(true){var o=n?' with the id of "'.concat(n,'"'):"",s="The component ".concat(t).concat(o," has been created dynamically.\n")+"You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",i=console.error;try{var a=!0;console.error=function(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];E.test(t)?(a=!1,N.delete(s)):i.apply(void 0,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([t],n,!1))},(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(),a&&!N.has(s)&&(console.warn(s),N.add(s))}catch(e){E.test(e.message)&&N.delete(s)}finally{console.error=i}}},_=Object.freeze([]),C=Object.freeze({});function I(e,t,n){return void 0===n&&(n=C),e.theme!==n.theme&&e.theme||t||n.theme}var A=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),O=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,D=/(^-|-$)/g;function R(e){return e.replace(O,"-").replace(D,"")}var T=/(a)(d)/gi,k=52,j=function(e){return String.fromCharCode(e+(e>25?39:97))};function x(e){var t,n="";for(t=Math.abs(e);t>k;t=t/k|0)n=j(t%k)+n;return(j(t%k)+n).replace(T,"$1-$2")}var V,F=5381,M=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},$=function(e){return M(F,e)};function z(e){return x($(e)>>>0)}function B(e){return true&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function L(e){return"string"==typeof e&&( false||e.charAt(0)===e.charAt(0).toLowerCase())}var G="function"==typeof Symbol&&Symbol.for,Y=G?Symbol.for("react.memo"):60115,W=G?Symbol.for("react.forward_ref"):60112,q={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},H={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},U={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},J=((V={})[W]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},V[Y]=U,V);function X(e){return("type"in(t=e)&&t.type.$$typeof)===Y?U:"$$typeof"in e?J[e.$$typeof]:q;var t}var Z=Object.defineProperty,K=Object.getOwnPropertyNames,Q=Object.getOwnPropertySymbols,ee=Object.getOwnPropertyDescriptor,te=Object.getPrototypeOf,ne=Object.prototype;function oe(e,t,n){if("string"!=typeof t){if(ne){var o=te(t);o&&o!==ne&&oe(e,o,n)}var r=K(t);Q&&(r=r.concat(Q(t)));for(var s=X(e),i=X(t),a=0;a<r.length;++a){var c=r[a];if(!(c in H||n&&n[c]||i&&c in i||s&&c in s)){var l=ee(t,c);try{Z(e,c,l)}catch(e){}}}}return e}function re(e){return"function"==typeof e}function se(e){return"object"==typeof e&&"styledComponentId"in e}function ie(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ae(e,t){if(0===e.length)return"";for(var n=e[0],o=1;o<e.length;o++)n+=t?t+e[o]:e[o];return n}function ce(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function le(e,t,n){if(void 0===n&&(n=!1),!n&&!ce(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=le(e[o],t[o]);else if(ce(t))for(var o in t)e[o]=le(e[o],t[o]);return e}function ue(e,t){Object.defineProperty(e,"toString",{value:t})}var pe= true?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",18:"ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`"}:0;function de(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n=e[0],o=[],r=1,s=e.length;r<s;r+=1)o.push(e[r]);return o.forEach(function(e){n=n.replace(/%[a-z]/,e)}),n}function he(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return false?0:new Error(de.apply(void 0,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([pe[t]],n,!1)).trim())}var fe=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,r=o;e>=r;)if((r<<=1)<0)throw he(16,"".concat(e));this.groupSizes=new Uint32Array(r),this.groupSizes.set(n),this.length=r;for(var s=o;s<r;s++)this.groupSizes[s]=0}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),o=n+t;this.groupSizes[e]=0;for(var r=n;r<o;r++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],o=this.indexOfGroup(e),r=o+n,s=o;s<r;s++)t+="".concat(this.tag.getRule(s)).concat(g);return t},e}(),me=new Map,ye=new Map,ve=1,ge=function(e){if(me.has(e))return me.get(e);for(;ye.has(ve);)ve++;var t=ve++;if( true&&((0|t)<0||t>1073741824))throw he(16,"".concat(t));return me.set(e,t),ye.set(t,e),t},Se=function(e,t){ve=t+1,me.set(e,t),ye.set(t,e)},we="style[".concat(f,"][").concat(y,'="').concat(v,'"]'),be=new RegExp("^".concat(f,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ee=function(e,t,n){for(var o,r=n.split(","),s=0,i=r.length;s<i;s++)(o=r[s])&&e.registerName(t,o)},Ne=function(e,t){for(var n,o=(null!==(n=t.textContent)&&void 0!==n?n:"").split(g),r=[],s=0,i=o.length;s<i;s++){var a=o[s].trim();if(a){var c=a.match(be);if(c){var l=0|parseInt(c[1],10),u=c[2];0!==l&&(Se(u,l),Ee(e,u,c[3]),e.getTag().insertRules(l,r)),r.length=0}else r.push(a)}}};function Pe(){return true?__webpack_require__.nc:0}var _e=function(e){var t=document.head,n=e||t,o=document.createElement("style"),r=function(e){var t=Array.from(e.querySelectorAll("style[".concat(f,"]")));return t[t.length-1]}(n),s=void 0!==r?r.nextSibling:null;o.setAttribute(f,m),o.setAttribute(y,v);var i=Pe();return i&&o.setAttribute("nonce",i),n.insertBefore(o,s),o},Ce=function(){function e(e){this.element=_e(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,o=t.length;n<o;n++){var r=t[n];if(r.ownerNode===e)return r}throw he(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Ie=function(){function e(e){this.element=_e(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ae=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Oe=S,De={isServer:!S,useCSSOMInjection:!w},Re=function(){function e(e,n,o){void 0===e&&(e=C),void 0===n&&(n={});var r=this;this.options=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},De),e),this.gs=n,this.names=new Map(o),this.server=!!e.isServer,!this.server&&S&&Oe&&(Oe=!1,function(e){for(var t=document.querySelectorAll(we),n=0,o=t.length;n<o;n++){var r=t[n];r&&r.getAttribute(f)!==m&&(Ne(e,r),r.parentNode&&r.parentNode.removeChild(r))}}(this)),ue(this,function(){return function(e){for(var t=e.getTag(),n=t.length,o="",r=function(n){var r=function(e){return ye.get(e)}(n);if(void 0===r)return"continue";var s=e.names.get(r),i=t.getGroup(n);if(void 0===s||0===i.length)return"continue";var a="".concat(f,".g").concat(n,'[id="').concat(r,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","))}),o+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat(g)},s=0;s<n;s++)r(s);return o}(r)})}return e.registerId=function(e){return ge(e)},e.prototype.reconstructWithOptions=function(n,o){return void 0===o&&(o=!0),new e((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},this.options),n),this.gs,o&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Ae(n):t?new Ce(n):new Ie(n)}(this.options),new fe(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(ge(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(ge(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(ge(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Te=/&/g,ke=/^\s*\/\/.*$/gm;function je(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=je(e.children,t)),e})}function xe(e){var t,n,o,r=void 0===e?C:e,s=r.options,i=void 0===s?C:s,a=r.plugins,c=void 0===a?_:a,l=function(e,o,r){return r.startsWith(n)&&r.endsWith(n)&&r.replaceAll(n,"").length>0?".".concat(t):e},u=c.slice();u.push(function(e){e.type===stylis__WEBPACK_IMPORTED_MODULE_5__.RULESET&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Te,n).replace(o,l))}),i.prefix&&u.push(stylis__WEBPACK_IMPORTED_MODULE_6__.prefixer),u.push(stylis__WEBPACK_IMPORTED_MODULE_7__.stringify);var p=function(e,r,s,a){void 0===r&&(r=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=r,o=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(ke,""),l=stylis__WEBPACK_IMPORTED_MODULE_8__.compile(s||r?"".concat(s," ").concat(r," { ").concat(c," }"):c);i.namespace&&(l=je(l,i.namespace));var p=[];return stylis__WEBPACK_IMPORTED_MODULE_7__.serialize(l,stylis__WEBPACK_IMPORTED_MODULE_6__.middleware(u.concat(stylis__WEBPACK_IMPORTED_MODULE_6__.rulesheet(function(e){return p.push(e)})))),p};return p.hash=c.length?c.reduce(function(e,t){return t.name||he(15),M(e,t.name)},F).toString():"",p}var Ve=new Re,Fe=xe(),Me=react__WEBPACK_IMPORTED_MODULE_1___default().createContext({shouldForwardProp:void 0,styleSheet:Ve,stylis:Fe}),$e=Me.Consumer,ze=react__WEBPACK_IMPORTED_MODULE_1___default().createContext(void 0);function Be(){return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Me)}function Le(e){var t=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(e.stylisPlugins),n=t[0],r=t[1],c=Be().styleSheet,l=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,c]),u=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){return xe({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})},[e.enableVendorPrefixes,e.namespace,n]);(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function(){shallowequal__WEBPACK_IMPORTED_MODULE_2___default()(n,e.stylisPlugins)||r(e.stylisPlugins)},[e.stylisPlugins]);var d=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:l,stylis:u}},[e.shouldForwardProp,l,u]);return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Me.Provider,{value:d},react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ze.Provider,{value:u},e.children))}var Ge=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Fe);var o=n.name+t.hash;e.hasNameForId(n.id,o)||e.insertRules(n.id,o,t(n.rules,o,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,ue(this,function(){throw he(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=Fe),this.name+e.hash},e}(),Ye=function(e){return e>="A"&&e<="Z"};function We(e){for(var t="",n=0;n<e.length;n++){var o=e[n];if(1===n&&"-"===o&&"-"===e[0])return e;Ye(o)?t+="-"+o.toLowerCase():t+=o}return t.startsWith("ms-")?"-"+t:t}var qe=function(e){return null==e||!1===e||""===e},He=function(t){var n,o,r=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!qe(i)&&(Array.isArray(i)&&i.isCss||re(i)?r.push("".concat(We(s),":"),i,";"):ce(i)?r.push.apply(r,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)(["".concat(s," {")],He(i),!1),["}"],!1)):r.push("".concat(We(s),": ").concat((n=s,null==(o=i)||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||n in _emotion_unitless__WEBPACK_IMPORTED_MODULE_3__["default"]||n.startsWith("--")?String(o).trim():"".concat(o,"px")),";")))}return r};function Ue(e,t,n,o){if(qe(e))return[];if(se(e))return[".".concat(e.styledComponentId)];if(re(e)){if(!re(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var r=e(t);return false||"object"!=typeof r||Array.isArray(r)||r instanceof Ge||ce(r)||null===r||console.error("".concat(B(e)," is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")),Ue(r,t,n,o)}var s;return e instanceof Ge?n?(e.inject(n,o),[e.getName(o)]):[e]:ce(e)?He(e):Array.isArray(e)?Array.prototype.concat.apply(_,e.map(function(e){return Ue(e,t,n,o)})):[e.toString()]}function Je(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(re(n)&&!se(n))return!1}return!0}var Xe=$(v),Ze=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic= false&&0,this.componentId=t,this.baseHash=M(Xe,t),this.baseStyle=n,Re.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))o=ie(o,this.staticRulesId);else{var r=ae(Ue(this.rules,e,t,n)),s=x(M(this.baseHash,r)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(r,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i)}o=ie(o,s),this.staticRulesId=s}else{for(var a=M(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u, true&&(a=M(a,u));else if(u){var p=ae(Ue(u,e,t,n));a=M(a,p+l),c+=p}}if(c){var d=x(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),o=ie(o,d)}}return o},e}(),Ke=react__WEBPACK_IMPORTED_MODULE_1___default().createContext(void 0),Qe=Ke.Consumer;function et(){var e=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Ke);if(!e)throw he(18);return e}function tt(e){var n=react__WEBPACK_IMPORTED_MODULE_1___default().useContext(Ke),r=(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){return function(e,n){if(!e)throw he(14);if(re(e)){var o=e(n);if( true&&(null===o||Array.isArray(o)||"object"!=typeof o))throw he(7);return o}if(Array.isArray(e)||"object"!=typeof e)throw he(8);return n?(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},n),e):e}(e.theme,n)},[e.theme,n]);return e.children?react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Ke.Provider,{value:r},e.children):null}var nt={},ot=new Set;function rt(e,r,s){var i=se(e),a=e,c=!L(e),p=r.attrs,d=void 0===p?_:p,h=r.componentId,f=void 0===h?function(e,t){var n="string"!=typeof e?"sc":R(e);nt[n]=(nt[n]||0)+1;var o="".concat(n,"-").concat(z(v+n+nt[n]));return t?"".concat(t,"-").concat(o):o}(r.displayName,r.parentComponentId):h,m=r.displayName,y=void 0===m?function(e){return L(e)?"styled.".concat(e):"Styled(".concat(B(e),")")}(e):m,g=r.displayName&&r.componentId?"".concat(R(r.displayName),"-").concat(r.componentId):r.componentId||f,S=i&&a.attrs?a.attrs.concat(d).filter(Boolean):d,w=r.shouldForwardProp;if(i&&a.shouldForwardProp){var b=a.shouldForwardProp;if(r.shouldForwardProp){var E=r.shouldForwardProp;w=function(e,t){return b(e,t)&&E(e,t)}}else w=b}var N=new Ze(s,g,i?a.componentStyle:void 0);function O(e,r){return function(e,r,s){var i=e.attrs,a=e.componentStyle,c=e.defaultProps,p=e.foldedComponentIds,d=e.styledComponentId,h=e.target,f=react__WEBPACK_IMPORTED_MODULE_1___default().useContext(Ke),m=Be(),y=e.shouldForwardProp||m.shouldForwardProp; true&&(0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(d);var v=I(r,f,c)||C,g=function(e,n,o){for(var r,s=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},n),{className:void 0,theme:o}),i=0;i<e.length;i+=1){var a=re(r=e[i])?r(s):r;for(var c in a)s[c]="className"===c?ie(s[c],a[c]):"style"===c?(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},s[c]),a[c]):a[c]}return n.className&&(s.className=ie(s.className,n.className)),s}(i,r,v),S=g.as||h,w={};for(var b in g)void 0===g[b]||"$"===b[0]||"as"===b||"theme"===b&&g.theme===v||("forwardedAs"===b?w.as=g.forwardedAs:y&&!y(b,S)||(w[b]=g[b],y||"development"!=="development"||(0,_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_0__["default"])(b)||ot.has(b)||!A.has(S)||(ot.add(b),console.warn('styled-components: it looks like an unknown prop "'.concat(b,'" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));var E=function(e,t){var n=Be(),o=e.generateAndInjectStyles(t,n.styleSheet,n.stylis);return true&&(0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(o),o}(a,g); true&&e.warnTooManyClasses&&e.warnTooManyClasses(E);var N=ie(p,d);return E&&(N+=" "+E),g.className&&(N+=" "+g.className),w[L(S)&&!A.has(S)?"class":"className"]=N,w.ref=s,(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(S,w)}(D,e,r)}O.displayName=y;var D=react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(O);return D.attrs=S,D.componentStyle=N,D.displayName=y,D.shouldForwardProp=w,D.foldedComponentIds=i?ie(a.foldedComponentIds,a.styledComponentId):"",D.styledComponentId=g,D.target=i?a.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var o=0,r=t;o<r.length;o++)le(e,r[o],!0);return e}({},a.defaultProps,e):e}}), true&&(P(y,g),D.warnTooManyClasses=function(e,t){var n={},o=!1;return function(r){if(!o&&(n[r]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'.concat(t,'"'):"";console.warn("Over ".concat(200," classes were generated for component ").concat(e).concat(s,".\n")+"Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),o=!0,n={}}}}(y,g)),ue(D,function(){return".".concat(D.styledComponentId)}),c&&oe(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function st(e,t){for(var n=[e[0]],o=0,r=t.length;o<r;o+=1)n.push(t[o],e[o+1]);return n}var it=function(e){return Object.assign(e,{isCss:!0})};function at(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];if(re(t)||ce(t))return it(Ue(st(_,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([t],n,!0))));var r=t;return 0===n.length&&1===r.length&&"string"==typeof r[0]?Ue(r):it(Ue(st(r,n)))}function ct(n,o,r){if(void 0===r&&(r=C),!o)throw he(1,o);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(o,r,at.apply(void 0,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([t],s,!1)))};return s.attrs=function(e){return ct(n,o,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},r),{attrs:Array.prototype.concat(r.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return ct(n,o,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},r),e))},s}var lt=function(e){return ct(rt,e)},ut=lt;A.forEach(function(e){ut[e]=lt(e)});var pt=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Je(e),Re.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,o){var r=o(ae(Ue(this.rules,t,n,o)),""),s=this.componentId+e;n.insertRules(s,s,r)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,o){e>2&&Re.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,o)},e}();function dt(n){for(var r=[],s=1;s<arguments.length;s++)r[s-1]=arguments[s];var i=at.apply(void 0,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([n],r,!1)),a="sc-global-".concat(z(JSON.stringify(i))),c=new pt(i,a); true&&P(a);var l=function(e){var t=Be(),n=react__WEBPACK_IMPORTED_MODULE_1___default().useContext(Ke),r=react__WEBPACK_IMPORTED_MODULE_1___default().useRef(t.styleSheet.allocateGSInstance(a)).current;return true&&react__WEBPACK_IMPORTED_MODULE_1___default().Children.count(e.children)&&console.warn("The global style component ".concat(a," was given child JSX. createGlobalStyle does not render children.")), true&&i.some(function(e){return"string"==typeof e&&-1!==e.indexOf("@import")})&&console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."),t.styleSheet.server&&u(r,e,t.styleSheet,n,t.stylis),react__WEBPACK_IMPORTED_MODULE_1___default().useLayoutEffect(function(){if(!t.styleSheet.server)return u(r,e,t.styleSheet,n,t.stylis),function(){return c.removeStyles(r,t.styleSheet)}},[r,e,t.styleSheet,n,t.stylis]),null};function u(e,n,o,r,s){if(c.isStatic)c.renderStyles(e,b,o,s);else{var i=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},n),{theme:I(n,r,l.defaultProps)});c.renderStyles(e,i,o,s)}}return react__WEBPACK_IMPORTED_MODULE_1___default().memo(l)}function ht(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o]; true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");var r=ae(at.apply(void 0,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([t],n,!1))),s=z(r);return new Ge(s,r)}function ft(e){var n=react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(function(n,r){var s=I(n,react__WEBPACK_IMPORTED_MODULE_1___default().useContext(Ke),e.defaultProps);return true&&void 0===s&&console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'.concat(B(e),'"')),react__WEBPACK_IMPORTED_MODULE_1___default().createElement(e,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},n,{theme:s,ref:r}))});return n.displayName="WithTheme(".concat(B(e),")"),oe(n,e)}var mt=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString(),n=Pe(),o=ae([n&&'nonce="'.concat(n,'"'),"".concat(f,'="true"'),"".concat(y,'="').concat(v,'"')].filter(Boolean)," ");return"<style ".concat(o,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw he(2);return e._emitSheetCSS()},this.getStyleElement=function(){var n;if(e.sealed)throw he(2);var r=((n={})[f]="",n[y]=v,n.dangerouslySetInnerHTML={__html:e.instance.toString()},n),s=Pe();return s&&(r.nonce=s),[react__WEBPACK_IMPORTED_MODULE_1___default().createElement("style",(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({},r,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Re({isServer:!0}),this.sealed=!1}return e.prototype.collectStyles=function(e){if(this.sealed)throw he(2);return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Le,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw he(3)},e}(),yt={StyleSheet:Re,mainSheet:Ve}; true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");var vt="__sc-".concat(f,"__"); true&&"undefined"!=typeof window&&(window[vt]||(window[vt]=0),1===window[vt]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window[vt]+=1);
//# sourceMappingURL=styled-components.browser.esm.js.map


/***/ }),

/***/ "./node_modules/styled-components/node_modules/tslib/tslib.es6.js":
/*!************************************************************************!*\
  !*** ./node_modules/styled-components/node_modules/tslib/tslib.es6.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__esDecorate": () => (/* binding */ __esDecorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__propKey": () => (/* binding */ __propKey),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__runInitializers": () => (/* binding */ __runInitializers),
/* harmony export */   "__setFunctionName": () => (/* binding */ __setFunctionName),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ }),

/***/ "./src/client/Routes.ts":
/*!******************************!*\
  !*** ./src/client/Routes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Routes": () => (/* binding */ Routes)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_LayoutController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/LayoutController */ "./src/client/controllers/LayoutController.ts");
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/LoginController */ "./src/client/controllers/LoginController.tsx");
/* harmony import */ var _controllers_SignupController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/SignupController */ "./src/client/controllers/SignupController.ts");
/* harmony import */ var _pages_NotFound_Controllers_NotFoundController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/NotFound/Controllers/NotFoundController */ "./src/client/pages/NotFound/Controllers/NotFoundController.tsx");
/* harmony import */ var _pages_Setup_Controllers_SetupController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/Setup/Controllers/SetupController */ "./src/client/pages/Setup/Controllers/SetupController.tsx");
/* harmony import */ var _pages_Home_Controllers_HomeController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/Home/Controllers/HomeController */ "./src/client/pages/Home/Controllers/HomeController.ts");







var Routes = function () {
    return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoutes)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('/', _controllers_LayoutController__WEBPACK_IMPORTED_MODULE_1__.LayoutController).children(
    // setup
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('setup', _pages_Setup_Controllers_SetupController__WEBPACK_IMPORTED_MODULE_5__.SetupController), 
    // home
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('home', _pages_Home_Controllers_HomeController__WEBPACK_IMPORTED_MODULE_6__.HomeController), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('', _controllers_LoginController__WEBPACK_IMPORTED_MODULE_2__.LoginController), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('login', _controllers_LoginController__WEBPACK_IMPORTED_MODULE_2__.LoginController), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('signup', _controllers_SignupController__WEBPACK_IMPORTED_MODULE_3__.SignupController), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('logout', _controllers_LoginController__WEBPACK_IMPORTED_MODULE_2__.LoginController), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('*', _pages_NotFound_Controllers_NotFoundController__WEBPACK_IMPORTED_MODULE_4__.NotFoundController)), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRoute)('*', _pages_NotFound_Controllers_NotFoundController__WEBPACK_IMPORTED_MODULE_4__.NotFoundController)));
};


/***/ }),

/***/ "./src/client/assets/BackgroundImage.ts":
/*!**********************************************!*\
  !*** ./src/client/assets/BackgroundImage.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var svgBackground = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'><rect fill='#ffffff' width='2000' height='1500'/><defs><rect  stroke='#ffffff' stroke-width='0.3' width='1' height='1' id='s'/><pattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><use  fill='#fcfcfc' href='#s' y='2'/><use  fill='#fcfcfc' href='#s' x='1' y='2'/><use  fill='#fafafa' href='#s' x='2' y='2'/><use  fill='#fafafa' href='#s'/><use  fill='#f7f7f7' href='#s' x='2'/><use  fill='#f7f7f7' href='#s' x='1' y='1'/></pattern><pattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s'/><use href='#s' y='5' /><use href='#s' x='1' y='10'/><use href='#s' x='2' y='1'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='8'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='5' y='2'/><use href='#s' x='5' y='6'/><use href='#s' x='6' y='9'/></g></pattern><pattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s' y='5'/><use href='#s' y='8'/><use href='#s' x='1' y='1'/><use href='#s' x='1' y='9'/><use href='#s' x='1' y='12'/><use href='#s' x='2'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='2'/><use href='#s' x='3' y='6'/><use href='#s' x='3' y='11'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='4' y='10'/></g></pattern><pattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f2f2f2'><use href='#s' y='11'/><use href='#s' x='2' y='9'/><use href='#s' x='5' y='12'/><use href='#s' x='9' y='4'/><use href='#s' x='12' y='1'/><use href='#s' x='16' y='6'/></g></pattern><pattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#ffffff'><use href='#s' y='9'/><use href='#s' x='16' y='5'/><use href='#s' x='14' y='2'/><use href='#s' x='11' y='11'/><use href='#s' x='6' y='14'/></g><g  fill='#efefef'><use href='#s' x='3' y='13'/><use href='#s' x='9' y='7'/><use href='#s' x='13' y='10'/><use href='#s' x='15' y='4'/><use href='#s' x='18' y='1'/></g></pattern><pattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='2' y='5'/><use href='#s' x='16' y='38'/><use href='#s' x='46' y='42'/><use href='#s' x='29' y='20'/></g></pattern><pattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='33' y='13'/><use href='#s' x='27' y='54'/><use href='#s' x='55' y='55'/></g></pattern><pattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='11' y='8'/><use href='#s' x='51' y='13'/><use href='#s' x='17' y='73'/><use href='#s' x='99' y='57'/></g></pattern></defs><rect fill='url(#a)' width='100%' height='100%'/><rect fill='url(#b)' width='100%' height='100%'/><rect fill='url(#h)' width='100%' height='100%'/><rect fill='url(#c)' width='100%' height='100%'/><rect fill='url(#d)' width='100%' height='100%'/><rect fill='url(#e)' width='100%' height='100%'/><rect fill='url(#f)' width='100%' height='100%'/><rect fill='url(#g)' width='100%' height='100%'/></svg>");
var bgImage = "url(\"data:image/svg+xml,".concat(svgBackground, "\")");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bgImage);


/***/ }),

/***/ "./src/client/controllers/LayoutController.ts":
/*!****************************************************!*\
  !*** ./src/client/controllers/LayoutController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutController": () => (/* binding */ LayoutController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var LayoutController = /** @class */ (function (_super) {
    __extends(LayoutController, _super);
    function LayoutController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutController.prototype.LoadView = function () {
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIRouteOutlet)().width('100%').height('100%')));
    };
    return LayoutController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/client/controllers/LoginController.tsx":
/*!****************************************************!*\
  !*** ./src/client/controllers/LoginController.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginController": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @realmocean/sdk */ "@realmocean/sdk");
/* harmony import */ var _realmocean_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoginStyles/Styles */ "./src/client/controllers/LoginStyles/Styles.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var LoginController = /** @class */ (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginController.prototype.LoadView = function () {
        var navigate = (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.useNavigate)();
        var _a = (0,_realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__.useGetMe)('console'), me = _a.me, isLoading = _a.isLoading, isAccountGetError = _a.isError;
        var _b = (0,_realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__.useCreateEmailSession)('console'), createEmailSession = _b.createEmailSession, isSuccess = _b.isSuccess, isError = _b.isError, error = _b.error;
        var _c = (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.useState)({
            email: '',
            password: ''
        }), form = _c[0], setForm = _c[1];
        var handleFormChange = function (e) {
            var _a;
            setForm(__assign(__assign({}, form), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        };
        var HeaderInfo = function () {
            return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.Header, null,
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement("img", { src: _LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.customLogo, style: { width: "50px", height: "50px" } }),
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginLabel, null, "Pedavalans")));
        };
        var onSubmit = function (e) {
            e.preventDefault();
            createEmailSession({
                email: form.email,
                password: form.password
            }, function () {
                navigate('/home');
            });
        };
        return (isLoading ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Fragment)() :
            me != null ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UINavigate)('/main') :
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTop })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ReactView)(react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.Container, null,
                    react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginContainer, null,
                        react__WEBPACK_IMPORTED_MODULE_2___default().createElement(HeaderInfo, null),
                        react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginForm, { onSubmit: onSubmit },
                            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginInput, { onChange: handleFormChange, placeholder: "E-posta", name: "email", type: "email", value: form.email, required: true }),
                            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginInput, { onChange: handleFormChange, placeholder: "\u015Eifre", type: "password", name: "password", value: form.password, required: true }),
                            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginButton, null, "Giri\u015F Yap"),
                            isError && react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginError, null, error === null || error === void 0 ? void 0 : error.message)),
                        react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_3__.LoginToSignUp, { onClick: function () { return navigate('/signup'); } }, "Kay\u0131t Ol"))))).height());
    };
    return LoginController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/client/controllers/LoginStyles/Styles.ts":
/*!******************************************************!*\
  !*** ./src/client/controllers/LoginStyles/Styles.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container),
/* harmony export */   "Header": () => (/* binding */ Header),
/* harmony export */   "LoginButton": () => (/* binding */ LoginButton),
/* harmony export */   "LoginContainer": () => (/* binding */ LoginContainer),
/* harmony export */   "LoginError": () => (/* binding */ LoginError),
/* harmony export */   "LoginForm": () => (/* binding */ LoginForm),
/* harmony export */   "LoginInput": () => (/* binding */ LoginInput),
/* harmony export */   "LoginLabel": () => (/* binding */ LoginLabel),
/* harmony export */   "LoginToSignUp": () => (/* binding */ LoginToSignUp),
/* harmony export */   "bgImage": () => (/* binding */ bgImage),
/* harmony export */   "customLogo": () => (/* binding */ customLogo)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var svgBackground = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'><rect fill='#ffffff' width='2000' height='1500'/><defs><rect  stroke='#ffffff' stroke-width='0.3' width='1' height='1' id='s'/><pattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><use  fill='#fcfcfc' href='#s' y='2'/><use  fill='#fcfcfc' href='#s' x='1' y='2'/><use  fill='#fafafa' href='#s' x='2' y='2'/><use  fill='#fafafa' href='#s'/><use  fill='#f7f7f7' href='#s' x='2'/><use  fill='#f7f7f7' href='#s' x='1' y='1'/></pattern><pattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s'/><use href='#s' y='5' /><use href='#s' x='1' y='10'/><use href='#s' x='2' y='1'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='8'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='5' y='2'/><use href='#s' x='5' y='6'/><use href='#s' x='6' y='9'/></g></pattern><pattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s' y='5'/><use href='#s' y='8'/><use href='#s' x='1' y='1'/><use href='#s' x='1' y='9'/><use href='#s' x='1' y='12'/><use href='#s' x='2'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='2'/><use href='#s' x='3' y='6'/><use href='#s' x='3' y='11'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='4' y='10'/></g></pattern><pattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f2f2f2'><use href='#s' y='11'/><use href='#s' x='2' y='9'/><use href='#s' x='5' y='12'/><use href='#s' x='9' y='4'/><use href='#s' x='12' y='1'/><use href='#s' x='16' y='6'/></g></pattern><pattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#ffffff'><use href='#s' y='9'/><use href='#s' x='16' y='5'/><use href='#s' x='14' y='2'/><use href='#s' x='11' y='11'/><use href='#s' x='6' y='14'/></g><g  fill='#efefef'><use href='#s' x='3' y='13'/><use href='#s' x='9' y='7'/><use href='#s' x='13' y='10'/><use href='#s' x='15' y='4'/><use href='#s' x='18' y='1'/></g></pattern><pattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='2' y='5'/><use href='#s' x='16' y='38'/><use href='#s' x='46' y='42'/><use href='#s' x='29' y='20'/></g></pattern><pattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='33' y='13'/><use href='#s' x='27' y='54'/><use href='#s' x='55' y='55'/></g></pattern><pattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='11' y='8'/><use href='#s' x='51' y='13'/><use href='#s' x='17' y='73'/><use href='#s' x='99' y='57'/></g></pattern></defs><rect fill='url(#a)' width='100%' height='100%'/><rect fill='url(#b)' width='100%' height='100%'/><rect fill='url(#h)' width='100%' height='100%'/><rect fill='url(#c)' width='100%' height='100%'/><rect fill='url(#d)' width='100%' height='100%'/><rect fill='url(#e)' width='100%' height='100%'/><rect fill='url(#f)' width='100%' height='100%'/><rect fill='url(#g)' width='100%' height='100%'/></svg>");
var bgImage = "url(\"data:image/svg+xml,".concat(svgBackground, "\")");
var customLogo = "data:image/svg+xml;base64,PHN2ZyBpZD0iZWNjZmJjZWQtMTBjYS00ODdhLWE0MjUtYmYzNGY5ZTE1MTM5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImI5MTU3MzBjLWRjNjktNGNkNC04Y2YzLTYxOTg4MmI4ZThhYiIgY3g9IjU1LjcxIiBjeT0iNzEuOTIiIHI9IjkiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQzLjYxIC01OC45Mikgc2NhbGUoMC45NCAwLjk0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMC42NyIgc3RvcC1jb2xvcj0iIzZiYjlmMiIgLz48c3RvcCBvZmZzZXQ9IjAuNzQiIHN0b3AtY29sb3I9IiM2MWI0ZjEiIC8+PHN0b3Agb2Zmc2V0PSIwLjg1IiBzdG9wLWNvbG9yPSIjNDdhOGVmIiAvPjxzdG9wIG9mZnNldD0iMC45OSIgc3RvcC1jb2xvcj0iIzFkOTRlYiIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxYjkzZWIiIC8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHRpdGxlPkljb24tbWFjaGluZWxlYXJuaW5nLTE2NTwvdGl0bGU+PHBhdGggaWQ9ImY2YTI5ZTFiLTE5NGItNGQ4ZC04NTI5LTQ5ZWRlYTdiYmJhMCIgZD0iTTksLjVBOC41LDguNSwwLDEsMCwxNy41LDksOC41LDguNSwwLDAsMCw5LC41WiIgZmlsbD0idXJsKCNiOTE1NzMwYy1kYzY5LTRjZDQtOGNmMy02MTk4ODJiOGU4YWIpIiAvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSI3LjAzIiBmaWxsPSIjZmZmIiAvPjxjaXJjbGUgY3g9IjcuNDUiIGN5PSI5IiByPSIwLjc3IiBmaWxsPSIjMzJiZWRkIiAvPjxwYXRoIGQ9Ik01LjI2LDYuOEg0Ljg4YS4yOS4yOSwwLDAsMC0uMjkuMjl2NS43MmEuNTkuNTksMCwwLDAsLjU5LjU5aDUuNTdhLjI5LjI5LDAsMCwwLC4yOS0uM3YtLjM4YS4yOS4yOSwwLDAsMC0uMjktLjI5aC01YS4xNC4xNCwwLDAsMS0uMTQtLjE1VjcuMDlBLjI5LjI5LDAsMCwwLDUuMjYsNi44WiIgZmlsbD0iIzMyYmVkZCIgLz48Y2lyY2xlIGN4PSIxMC41NSIgY3k9IjkiIHI9IjAuNzciIGZpbGw9IiMzMmJlZGQiIC8+PHBhdGggZD0iTTEyLjQyLDQuNkg3LjIzYS4yOS4yOSwwLDAsMC0uMjkuM3YuMzhhLjI5LjI5LDAsMCwwLC4yOS4yOWg1YS4xNS4xNSwwLDAsMSwuMTUuMTV2NS4xOWEuMjkuMjksMCwwLDAsLjI5LjI5aC4zOGEuMjkuMjksMCwwLDAsLjI5LS4yOVY1LjE5YS41OS41OSwwLDAsMC0uNTgtLjU5WiIgZmlsbD0iIzMyYmVkZCIgLz48L3N2Zz4=";
var Container = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 100vw;\n    height: 100vh;\n    background-image: ", ";\n    background-size: cover;\n    background-position: center;    \n"], ["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 100vw;\n    height: 100vh;\n    background-image: ", ";\n    background-size: cover;\n    background-position: center;    \n"])), bgImage);
var LoginContainer = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 20px;\n    width: 400px;\n    min-width: 100px;\n    min-height: 200px;\n    background: rgba(255, 255, 255, 0.7);\n    border-radius: 10px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);\n    padding: 20px;\n"], ["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 20px;\n    width: 400px;\n    min-width: 100px;\n    min-height: 200px;\n    background: rgba(255, 255, 255, 0.7);\n    border-radius: 10px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);\n    padding: 20px;\n"])));
var Header = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    width: 100%;\n"], ["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    width: 100%;\n"])));
var LoginLabel = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    font-size: 30px;\n    font-weight: 400;\n    color: #3BA2EE;\n    letter-spacing: 1px;\n"], ["\n    font-size: 30px;\n    font-weight: 400;\n    color: #3BA2EE;\n    letter-spacing: 1px;\n"])));
var LoginForm = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].form(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    height: 100%;\n"], ["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 10px;\n    width: 100%;\n    height: 100%;\n"])));
var LoginInput = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].input(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    width: 100%;\n    height: 40px;\n    border-radius: 5px;\n    border: 1px solid #ccc;\n    padding: 0 10px;\n    font-size: 16px;\n    outline: none;\n    &:focus {\n        border-color: #3BA2EE;\n    }\n"], ["\n    width: 100%;\n    height: 40px;\n    border-radius: 5px;\n    border: 1px solid #ccc;\n    padding: 0 10px;\n    font-size: 16px;\n    outline: none;\n    &:focus {\n        border-color: #3BA2EE;\n    }\n"])));
var LoginButton = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    width: 100%;\n    height: 40px;\n    border-radius: 5px;\n    padding: 0 10px;\n    font-size: 16px;\n    outline: none;\n    border: none;\n    background-color: #3BA2EE;\n    cursor: pointer;\n    color: white;\n    transition: 0.3s;\n    &:hover {\n        background-color: rgba(95,168,223);\n    }\n"], ["\n    width: 100%;\n    height: 40px;\n    border-radius: 5px;\n    padding: 0 10px;\n    font-size: 16px;\n    outline: none;\n    border: none;\n    background-color: #3BA2EE;\n    cursor: pointer;\n    color: white;\n    transition: 0.3s;\n    &:hover {\n        background-color: rgba(95,168,223);\n    }\n"])));
var LoginError = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    color: red;\n    font-size: 12px;\n"], ["\n    color: red;\n    font-size: 12px;\n"])));
var LoginToSignUp = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    color: #3BA2EE;\n    cursor: pointer;\n    transition: 0.3s;\n    &:hover {\n        color: rgba(95,168,223);\n    }\n"], ["\n    color: #3BA2EE;\n    cursor: pointer;\n    transition: 0.3s;\n    &:hover {\n        color: rgba(95,168,223);\n    }\n"])));

var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;


/***/ }),

/***/ "./src/client/controllers/MainController.tsx":
/*!***************************************************!*\
  !*** ./src/client/controllers/MainController.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainController": () => (/* binding */ MainController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Routes */ "./src/client/Routes.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MainController = /** @class */ (function (_super) {
    __extends(MainController, _super);
    function MainController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainController.prototype.LoadBiosView = function () {
        return ((0,_Routes__WEBPACK_IMPORTED_MODULE_1__.Routes)());
    };
    return MainController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.BiosController));



/***/ }),

/***/ "./src/client/controllers/SignupController.ts":
/*!****************************************************!*\
  !*** ./src/client/controllers/SignupController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignupController": () => (/* binding */ SignupController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @realmocean/sdk */ "@realmocean/sdk");
/* harmony import */ var _realmocean_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginStyles/Styles */ "./src/client/controllers/LoginStyles/Styles.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var SignupController = /** @class */ (function (_super) {
    __extends(SignupController, _super);
    function SignupController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignupController.prototype.LoadView = function () {
        var navigate = (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.useNavigate)();
        var _a = (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.useState)({
            userName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }), form = _a[0], setForm = _a[1];
        var _b = (0,_realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__.useCreateAccount)('console'), createAccount = _b.createAccount, isCreateAccountSuccess = _b.isSuccess, isCreateAccountError = _b.isError, createAccountError = _b.error;
        var _c = (0,_realmocean_sdk__WEBPACK_IMPORTED_MODULE_1__.useCreateEmailSession)('console'), createEmailSession = _c.createEmailSession, isSuccess = _c.isSuccess, isError = _c.isError, error = _c.error;
        var onSubmit = function () {
            if (form.password !== form.passwordConfirm || form.password === '' || form.passwordConfirm === '') {
                alert('Şifreler eşleşmiyor!');
                return;
            }
            createAccount({
                name: form.userName,
                email: form.email,
                password: form.password
            }, function () {
                createEmailSession({
                    email: form.email,
                    password: form.password
                }, function () { return navigate('/main'); });
            });
        };
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
        // Sign up Container
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(
        // Sign up Header
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.HStack)({ spacing: 10 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIImage)(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_2__.customLogo).width("50px").height("50px"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Pedavalans").fontSize("30px").fontWeight("400").foregroundColor("#3BA2EE").kerning("1px")).marginBottom("20px"), 
        // Sign up Form
        (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 10 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 3, alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Kullanıcı Adı"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TextField)().onChange(function (e) { return setForm(__assign(__assign({}, form), { userName: e })); })).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 3, alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("E-posta"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.TextField)().onChange(function (e) { return setForm(__assign(__assign({}, form), { email: e })); })).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 3, alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Şifre"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.SecureField)().onChange(function (e) { return setForm(__assign(__assign({}, form), { password: e })); })).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 3, alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cLeading })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Şifreyi Onayla"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.SecureField)().onChange(function (e) { return setForm(__assign(__assign({}, form), { passwordConfirm: e })); })).height(), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Button)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Kayıt Ol")).width("100%").onClick(onSubmit), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ spacing: 2 })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Zaten bir hesabın var mı?"), (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Giriş Yap").foregroundColor("#3BA2EE").cursor("pointer").transition("0.3s").onClick(function () { return navigate('/login'); })))).width("400px").height().minWidth("100px").minHeight("200px").padding("20px").background("rgba(255, 255, 255, 0.7)").cornerRadius("10px").shadow("0 0 10px rgba(0, 0, 0, 0.35)")).background(_LoginStyles_Styles__WEBPACK_IMPORTED_MODULE_2__.bgImage).backgroundSize('cover'));
    };
    return SignupController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/client/pages/Home/Controllers/HomeController.ts":
/*!*************************************************************!*\
  !*** ./src/client/pages/Home/Controllers/HomeController.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeController": () => (/* binding */ HomeController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server_hooks_main_Main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../server/hooks/main/Main */ "./src/server/hooks/main/Main.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var HomeController = /** @class */ (function (_super) {
    __extends(HomeController, _super);
    function HomeController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeController.prototype.LoadView = function () {
        var _a = _server_hooks_main_Main__WEBPACK_IMPORTED_MODULE_1__["default"].SetupRequired(), required = _a.required, isLoading = _a.isLoading;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(isLoading ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Spinner)()) :
            required ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UINavigate)("/setup") :
                (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Hello World")));
    };
    return HomeController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/client/pages/NotFound/Controllers/NotFoundController.tsx":
/*!**********************************************************************!*\
  !*** ./src/client/pages/NotFound/Controllers/NotFoundController.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotFoundController": () => (/* binding */ NotFoundController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Views_PageStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Views/PageStyles */ "./src/client/pages/NotFound/Views/PageStyles.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var NotFoundController = /** @class */ (function (_super) {
    __extends(NotFoundController, _super);
    function NotFoundController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFoundController.prototype.LoadView = function () {
        var navigate = (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.useNavigate)();
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)({ alignment: _tuval_forms__WEBPACK_IMPORTED_MODULE_0__.cTop })((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.ReactView)(react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Views_PageStyles__WEBPACK_IMPORTED_MODULE_2__.WrapError, null,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Views_PageStyles__WEBPACK_IMPORTED_MODULE_2__.CenteredContent, null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Views_PageStyles__WEBPACK_IMPORTED_MODULE_2__.ContentContainer, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h1", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "4"),
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "0"),
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "4")),
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h5", null, "Bir sorun olu\u015Ftu! Sayfa bulunamad\u0131"),
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, "Arad\u0131\u011F\u0131n\u0131z sayfa bulunamad\u0131. L\u00FCtfen adresi kontrol edin veya ana sayfaya d\u00F6n\u00FCn."),
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Views_PageStyles__WEBPACK_IMPORTED_MODULE_2__.ErrorButton, { title: "Ana Sayfa", onClick: function () { return navigate("/"); } }, "Ana Sayfa")))))).height());
    };
    return NotFoundController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/client/pages/NotFound/Views/PageStyles.ts":
/*!*******************************************************!*\
  !*** ./src/client/pages/NotFound/Views/PageStyles.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CenteredContent": () => (/* binding */ CenteredContent),
/* harmony export */   "ContentContainer": () => (/* binding */ ContentContainer),
/* harmony export */   "ErrorButton": () => (/* binding */ ErrorButton),
/* harmony export */   "WrapError": () => (/* binding */ WrapError)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var WrapError = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #667bf2;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E\");\n  background-attachment: fixed;\n  background-size: cover;\n  height: 100vh;\nwidth: 100vw;\n"], ["\n  background-color: #667bf2;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E\");\n  background-attachment: fixed;\n  background-size: cover;\n  height: 100vh;\nwidth: 100vw;\n"])));
var CenteredContent = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  height: 100%;\n"], ["\n  display: flex;\n  align-items: center;\n  height: 100%;\n"])));
var ContentContainer = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  text-align: center;\n  color: white;\n"], ["\n  width: 100%;\n  text-align: center;\n  color: white;\n"])));
var ErrorButton = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: #343a40; /* btn-dark color */\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  &:hover {\n    background-color: #23272b; /* darkened version of btn-dark color */\n  }\n"], ["\n  background-color: #343a40; /* btn-dark color */\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  &:hover {\n    background-color: #23272b; /* darkened version of btn-dark color */\n  }\n"])));

var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ }),

/***/ "./src/client/pages/Setup/Controllers/SetupController.tsx":
/*!****************************************************************!*\
  !*** ./src/client/pages/Setup/Controllers/SetupController.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetupController": () => (/* binding */ SetupController)
/* harmony export */ });
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_BackgroundImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/BackgroundImage */ "./src/client/assets/BackgroundImage.ts");
/* harmony import */ var _server_hooks_main_Main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../server/hooks/main/Main */ "./src/server/hooks/main/Main.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SetupController = /** @class */ (function (_super) {
    __extends(SetupController, _super);
    function SetupController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetupController.prototype.LoadView = function () {
        var _a = _server_hooks_main_Main__WEBPACK_IMPORTED_MODULE_2__["default"].GetDatabase(), database = _a.database, isLoading = _a.isLoading;
        return ((0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)(isLoading ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Loading") :
            database != null ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Database is ready") : (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.Text)("Database is not ready"), database != null ? (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UINavigate)('/home') :
            (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.VStack)().background("rgba(255,255,255,.7)")).background(_assets_BackgroundImage__WEBPACK_IMPORTED_MODULE_1__["default"]));
    };
    return SetupController;
}(_tuval_forms__WEBPACK_IMPORTED_MODULE_0__.UIController));



/***/ }),

/***/ "./src/server/hooks/main/Main.ts":
/*!***************************************!*\
  !*** ./src/server/hooks/main/Main.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _realmocean_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @realmocean/sdk */ "@realmocean/sdk");
/* harmony import */ var _realmocean_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_realmocean_sdk__WEBPACK_IMPORTED_MODULE_0__);

var Main;
(function (Main) {
    Main.GetDatabase = function () {
        var _a = (0,_realmocean_sdk__WEBPACK_IMPORTED_MODULE_0__.useGetDatabase)("pedavalans", "pedavalans"), database = _a.database, isLoading = _a.isLoading;
        return { database: database, isLoading: isLoading };
    };
    Main.SetupRequired = function () {
        var _a = (0,_realmocean_sdk__WEBPACK_IMPORTED_MODULE_0__.useGetDatabase)("pedavalans", "pedavalans"), database = _a.database, isLoading = _a.isLoading, isError = _a.isError, error = _a.error;
        if (!isLoading && isError) {
            return {
                required: error.code == 404,
                isLoading: false,
            };
        }
        return {
            required: false,
            isLoading: isLoading,
        };
    };
})(Main || (Main = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);


/***/ }),

/***/ "@realmocean/sdk":
/*!*********************************!*\
  !*** external "realmocean$sdk" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = realmocean$sdk;

/***/ }),

/***/ "@tuval/core":
/*!*****************************!*\
  !*** external "tuval$core" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = tuval$core;

/***/ }),

/***/ "@tuval/forms":
/*!******************************!*\
  !*** external "tuval$forms" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = tuval$forms;

/***/ }),

/***/ "react":
/*!******************************!*\
  !*** external "tuval$react" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = tuval$react;

/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET),
/* harmony export */   "COMMENT": () => (/* binding */ COMMENT),
/* harmony export */   "COUNTER_STYLE": () => (/* binding */ COUNTER_STYLE),
/* harmony export */   "DECLARATION": () => (/* binding */ DECLARATION),
/* harmony export */   "DOCUMENT": () => (/* binding */ DOCUMENT),
/* harmony export */   "FONT_FACE": () => (/* binding */ FONT_FACE),
/* harmony export */   "FONT_FEATURE_VALUES": () => (/* binding */ FONT_FEATURE_VALUES),
/* harmony export */   "IMPORT": () => (/* binding */ IMPORT),
/* harmony export */   "KEYFRAMES": () => (/* binding */ KEYFRAMES),
/* harmony export */   "LAYER": () => (/* binding */ LAYER),
/* harmony export */   "MEDIA": () => (/* binding */ MEDIA),
/* harmony export */   "MOZ": () => (/* binding */ MOZ),
/* harmony export */   "MS": () => (/* binding */ MS),
/* harmony export */   "NAMESPACE": () => (/* binding */ NAMESPACE),
/* harmony export */   "PAGE": () => (/* binding */ PAGE),
/* harmony export */   "RULESET": () => (/* binding */ RULESET),
/* harmony export */   "SUPPORTS": () => (/* binding */ SUPPORTS),
/* harmony export */   "VIEWPORT": () => (/* binding */ VIEWPORT),
/* harmony export */   "WEBKIT": () => (/* binding */ WEBKIT)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'
var LAYER = '@layer'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "prefixer": () => (/* binding */ prefixer),
/* harmony export */   "rulesheet": () => (/* binding */ rulesheet)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length, children)
					return
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(children = element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, callback = /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.lift)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}))
									;(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.lift)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [value]}))
									;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(element, {props: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.filter)(children, callback)})
									break
								// :placeholder
								case '::placeholder':
									;(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.lift)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}))
									;(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.lift)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}))
									;(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.lift)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]}))
									;(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.lift)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [value]}))
									;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(element, {props: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.filter)(children, callback)})
									break
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "compile": () => (/* binding */ compile),
/* harmony export */   "declaration": () => (/* binding */ declaration),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "ruleset": () => (/* binding */ ruleset)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f', (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(index ? points[index - 1] : 0)) != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent, declarations), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset: if (ampersand == -1) characters = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, /\f/g, '')
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1, declarations) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2, declarations), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule === 99 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length, siblings)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @param {object[]} siblings
 * @return {object}
 */
function comment (value, root, parent, siblings) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0, siblings)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function declaration (value, root, parent, length, siblings) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length, siblings)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// tab-size
		case 4789:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') + (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/) ? _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// justify-self
		case 4200:
			if (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/)) return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-column-align' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-end/) })) {
				return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value + (children = children[length].value), 'span', 0) ? value : (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-span:' + (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(children, 'span', 0) ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) : +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) - +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /\d+/)) + ';')
			}
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-start/) })) ? value : _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch', 0) ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + ':' + b + f) + (c ? (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 6) === 121)
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''

	for (var i = 0; i < children.length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.LAYER: if (element.children.length) break
		case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.RULESET: if (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(element.value = element.props.join(','))) return ''
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "char": () => (/* binding */ char),
/* harmony export */   "character": () => (/* binding */ character),
/* harmony export */   "characters": () => (/* binding */ characters),
/* harmony export */   "column": () => (/* binding */ column),
/* harmony export */   "commenter": () => (/* binding */ commenter),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "dealloc": () => (/* binding */ dealloc),
/* harmony export */   "delimit": () => (/* binding */ delimit),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "escaping": () => (/* binding */ escaping),
/* harmony export */   "identifier": () => (/* binding */ identifier),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "lift": () => (/* binding */ lift),
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "peek": () => (/* binding */ peek),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer),
/* harmony export */   "whitespace": () => (/* binding */ whitespace)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {object[]} siblings
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length, siblings) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: '', siblings: siblings}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0, root.siblings), root, {length: -root.length}, props)
}

/**
 * @param {object} root
 */
function lift (root) {
	while (root.root)
		root = copy(root.root, {children: [root]})

	;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(root, root.siblings)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "charat": () => (/* binding */ charat),
/* harmony export */   "combine": () => (/* binding */ combine),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "indexof": () => (/* binding */ indexof),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "sizeof": () => (/* binding */ sizeof),
/* harmony export */   "strlen": () => (/* binding */ strlen),
/* harmony export */   "substr": () => (/* binding */ substr),
/* harmony export */   "trim": () => (/* binding */ trim)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @param {number} position
 * @return {number}
 */
function indexof (value, search, position) {
	return value.indexOf(search, position)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

/**
 * @param {string[]} array
 * @param {RegExp} pattern
 * @return {string[]}
 */
function filter (array, pattern) {
	return array.filter(function (value) { return !match(value, pattern) })
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tuval/core */ "@tuval/core");
/* harmony import */ var _tuval_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tuval_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tuval/forms */ "@tuval/forms");
/* harmony import */ var _tuval_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tuval_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_controllers_MainController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client/controllers/MainController */ "./src/client/controllers/MainController.tsx");
/* harmony import */ var _client_css_global_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client/css/global.scss */ "./src/client/css/global.scss");




(function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
        var result = pushState.apply(history, arguments);
        if (typeof history.onpushstate == "function") {
            history.onpushstate({ state: state });
        }
        return result;
    };
})(window.history);
window.onpopstate = history.onpushstate = function (e) {
    _tuval_core__WEBPACK_IMPORTED_MODULE_0__.EventBus.Default.fire('history.changed', { url: window.location.href });
};
window.addEventListener("load", function (event) {
    (0,_tuval_forms__WEBPACK_IMPORTED_MODULE_1__.StartBios)(_client_controllers_MainController__WEBPACK_IMPORTED_MODULE_2__.MainController);
});

})();

/******/ })()
;
//# sourceMappingURL=index.js.map