webpackJsonp([3],{

/***/ 0:
/*!*************************************************!*\
  !*** ./saleor/static/dashboard/js/dashboard.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dropzone = __webpack_require__(/*! dropzone */ 318);
	
	var _dropzone2 = _interopRequireDefault(_dropzone);
	
	var _jquery = __webpack_require__(/*! jquery */ 15);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(/*! materialize-css/dist/js/materialize */ 369);
	
	__webpack_require__(/*! select2 */ 430);
	
	var _sortablejs = __webpack_require__(/*! sortablejs */ 431);
	
	var _sortablejs2 = _interopRequireDefault(_sortablejs);
	
	var _svgInjector = __webpack_require__(/*! svg-injector-2 */ 144);
	
	var _svgInjector2 = _interopRequireDefault(_svgInjector);
	
	__webpack_require__(/*! ../scss/dashboard.scss */ 319);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      supportsPassive = true;
	    }
	  });
	  window.addEventListener('test', null, opts);
	} catch (e) {}
	
	function onScroll(func) {
	  window.addEventListener('scroll', func, supportsPassive ? { passive: true } : false);
	}
	
	new _svgInjector2.default().inject(document.querySelectorAll('svg[data-src]'));
	
	function openModal() {
	  (0, _jquery2.default)('.modal-trigger-custom').on('click', function (e) {
	    var that = this;
	    _jquery2.default.ajax({
	      url: (0, _jquery2.default)(this).data('href'),
	      method: 'get',
	      success: function success(response) {
	        var $modal = (0, _jquery2.default)((0, _jquery2.default)(that).attr('href'));
	        $modal.html(response);
	        initSelects();
	        $modal.modal();
	      }
	    });
	
	    e.preventDefault();
	  });
	}
	
	(0, _jquery2.default)(document).ready(function () {
	
	  var styleGuideMenu = (0, _jquery2.default)('.styleguide__menu');
	
	  (0, _jquery2.default)(window).scroll(function () {
	    if ((0, _jquery2.default)(this).scrollTop() > 100) {
	      styleGuideMenu.addClass("fixed");
	    } else {
	      styleGuideMenu.removeClass("fixed");
	    }
	  });
	
	  var mainNavTop = (0, _jquery2.default)('.side-nav');
	  var $toggleMenu = (0, _jquery2.default)('#toggle-menu');
	  function toggleMenu(e) {
	    (0, _jquery2.default)(document.body).toggleClass('nav-toggled');
	    e.preventDefault();
	  }
	  $toggleMenu.click(toggleMenu);
	  if (mainNavTop.length > 0) {
	    mainNavTop = mainNavTop.offset().top;
	    onScroll(function () {
	      (0, _jquery2.default)(document.body).toggleClass('sticky-nav', Math.floor((0, _jquery2.default)(window).scrollTop()) > Math.ceil(mainNavTop));
	    });
	  }
	  initSelects();
	  (0, _jquery2.default)('.modal').modal();
	
	  var $tabs = (0, _jquery2.default)('ul.tabs');
	  if ($tabs.length) {
	    $tabs.find('.tab').on('click', function (e) {
	      var tabSelector = (0, _jquery2.default)(this).find('a').attr('href');
	      (0, _jquery2.default)('.btn-fab').addClass('btn-fab-hidden');
	      (0, _jquery2.default)(tabSelector + '-btn').removeClass('btn-fab-hidden');
	    });
	
	    $tabs.find('a.active').parent().click();
	  }
	  openModal();
	  var $messages = (0, _jquery2.default)('.message');
	  var timeout = 0;
	  var offset = 100;
	  var firstMessageOffset = 250;
	  setTimeout(function () {
	    $messages.each(function () {
	      var that = this;
	      setTimeout(function () {
	        (0, _jquery2.default)(that).removeClass('toast--hidden');
	      }, timeout + offset);
	      timeout += 3000;
	      setTimeout(function () {
	        (0, _jquery2.default)(that).addClass('toast--hidden');
	      }, timeout - offset);
	    });
	  }, firstMessageOffset);
	
	  (0, _jquery2.default)(document).on('submit', '.form-async', function (e) {
	    var that = this;
	    _jquery2.default.ajax({
	      url: (0, _jquery2.default)(that).attr('action'),
	      method: 'post',
	      data: (0, _jquery2.default)(that).serialize(),
	      complete: function complete(response) {
	        if (response.status === 400) {
	          (0, _jquery2.default)(that).parent().html(response.responseText);
	          initSelects();
	        } else {
	          (0, _jquery2.default)('.modal-close').click();
	        }
	      },
	      success: function success(response) {
	        if (response.redirectUrl) {
	          window.location.href = response.redirectUrl;
	        } else {
	          location.reload();
	        }
	      }
	    });
	    e.preventDefault();
	  }).on('click', '.modal-close', function () {
	    (0, _jquery2.default)('.modal').modal('close');
	  });
	
	  function isTablet() {
	    return !(0, _jquery2.default)('.hide-on-med-only').is(':visible');
	  }
	});
	_dropzone2.default.options.productImageForm = {
	  paramName: 'image',
	  maxFilesize: 20,
	  previewsContainer: '.product-gallery',
	  thumbnailWidth: 400,
	  thumbnailHeight: 400,
	  previewTemplate: (0, _jquery2.default)('#template').html(),
	  clickable: false,
	  init: function init() {
	    var $dropzoneMessage = (0, _jquery2.default)('.dropzone-message');
	    var $gallery = (0, _jquery2.default)('.product-gallery');
	
	    this.on('success', function (e, response) {
	      (0, _jquery2.default)(e.previewElement).find('.product-gallery-item-desc').html(response.image);
	      (0, _jquery2.default)(e.previewElement).attr('data-id', response.id);
	      var editLinkHref = (0, _jquery2.default)(e.previewElement).find('.card-action-edit').attr('href');
	      editLinkHref = editLinkHref.split('/');
	      editLinkHref[editLinkHref.length - 2] = response.id;
	      (0, _jquery2.default)(e.previewElement).find('.card-action-edit').attr('href', editLinkHref.join('/'));
	      (0, _jquery2.default)(e.previewElement).find('.card-action-edit').show();
	      var deleteLinkHref = (0, _jquery2.default)(e.previewElement).find('.card-action-delete').attr('data-href');
	      deleteLinkHref = deleteLinkHref.split('/');
	      deleteLinkHref[deleteLinkHref.length - 3] = response.id;
	      (0, _jquery2.default)(e.previewElement).find('.card-action-delete').attr('data-href', deleteLinkHref.join('/'));
	      (0, _jquery2.default)(e.previewElement).find('.card-action-delete').show();
	      (0, _jquery2.default)('.no-images').addClass('hide');
	      openModal();
	    });
	  }
	};
	var el = document.getElementById('product-gallery');
	if (el) {
	  _sortablejs2.default.create(el, {
	    handle: '.sortable__drag-area',
	    onUpdate: function onUpdate() {
	      _jquery2.default.ajax({
	        dataType: 'json',
	        contentType: 'application/json',
	        data: JSON.stringify({
	          'order': function () {
	            var postData = [];
	            (0, _jquery2.default)(el).find('.product-gallery-item[data-id]').each(function () {
	              postData.push((0, _jquery2.default)(this).data('id'));
	            });
	            return postData;
	          }()
	        }),
	        headers: {
	          'X-CSRFToken': (0, _jquery2.default)('[name=csrfmiddlewaretoken]').val()
	        },
	        method: 'post',
	        url: (0, _jquery2.default)(el).data('post-url')
	      });
	    }
	  });
	}
	(0, _jquery2.default)('.select-all').on('change', function () {
	  var $items = (0, _jquery2.default)(this).parents('form').find('.switch-actions');
	  if (this.checked) {
	    $items.prop('checked', true);
	  } else {
	    $items.prop('checked', false);
	  }
	});
	(0, _jquery2.default)('.switch-actions').on('change', function () {
	  var $btnChecked = (0, _jquery2.default)(this).parents('form').find('.btn-show-when-checked');
	  var $btnUnchecked = (0, _jquery2.default)(this).parents('form').find('.btn-show-when-unchecked');
	  if ((0, _jquery2.default)(this).parents('form').find('.switch-actions:checked').length) {
	    $btnChecked.show();
	    $btnUnchecked.hide();
	  } else {
	    $btnUnchecked.show();
	    $btnChecked.hide();
	  }
	});
	(0, _jquery2.default)('.datepicker').pickadate({
	  // The title label to use for the month nav buttons
	  labelMonthNext: pgettext('Datepicker option', 'Next month'),
	  labelMonthPrev: pgettext('Datepicker option', 'Previous month'),
	
	  // The title label to use for the dropdown selectors
	  labelMonthSelect: pgettext('Datepicker option', 'Select a month'),
	  labelYearSelect: pgettext('Datepicker option', 'Select a year'),
	
	  // Months and weekdays
	  monthsFull: [pgettext('Datepicker month', 'January'), pgettext('Datepicker month', 'February'), pgettext('Datepicker month', 'March'), pgettext('Datepicker month', 'April'), pgettext('Datepicker month', 'May'), pgettext('Datepicker month', 'June'), pgettext('Datepicker month', 'July'), pgettext('Datepicker month', 'August'), pgettext('Datepicker month', 'September'), pgettext('Datepicker month', 'October'), pgettext('Datepicker month', 'November'), pgettext('Datepicker month', 'December')],
	  monthsShort: [pgettext('Datepicker month shortcut', 'Jan'), pgettext('Datepicker month shortcut', 'Feb'), pgettext('Datepicker month shortcut', 'Mar'), pgettext('Datepicker month shortcut', 'Apr'), pgettext('Datepicker month shortcut', 'May'), pgettext('Datepicker month shortcut', 'Jun'), pgettext('Datepicker month shortcut', 'Jul'), pgettext('Datepicker month shortcut', 'Aug'), pgettext('Datepicker month shortcut', 'Sep'), pgettext('Datepicker month shortcut', 'Oct'), pgettext('Datepicker month shortcut', 'Nov'), pgettext('Datepicker month shortcut', 'Dec')],
	  weekdaysFull: [pgettext('Datepicker weekday', 'Sunday'), pgettext('Datepicker weekday', 'Monday'), pgettext('Datepicker weekday', 'Tuesday'), pgettext('Datepicker weekday', 'Wednesday'), pgettext('Datepicker weekday', 'Thursday'), pgettext('Datepicker weekday', 'Friday'), pgettext('Datepicker weekday', 'Saturday')],
	  weekdaysShort: [pgettext('Datepicker weekday shortcut', 'Sun'), pgettext('Datepicker weekday shortcut', 'Mon'), pgettext('Datepicker weekday shortcut', 'Tue'), pgettext('Datepicker weekday shortcut', 'Wed'), pgettext('Datepicker weekday shortcut', 'Thu'), pgettext('Datepicker weekday shortcut', 'Fri'), pgettext('Datepicker weekday shortcut', 'Sat')],
	
	  // Materialize modified
	  weekdaysLetter: [pgettext('Sunday shortcut', 'S'), pgettext('Monday shortcut', 'M'), pgettext('Tuesday shortcut', 'T'), pgettext('Wednesday shortcut', 'W'), pgettext('Thursday shortcut', 'T'), pgettext('Friday shortcut', 'F'), pgettext('Saturday shortcut', 'S')],
	  today: pgettext('Datepicker option', 'Today'),
	  clear: pgettext('Datepicker option', 'Clear'),
	  close: pgettext('Datepicker option', 'Close'),
	
	  format: 'd mmmm yyyy',
	  formatSubmit: 'yyyy-mm-dd',
	  selectMonths: true,
	  hiddenName: true,
	  onClose: function onClose() {
	    (0, _jquery2.default)(document.activeElement).blur();
	  }
	});
	
	function initSelects() {
	  (0, _jquery2.default)('select:not(.browser-default):not([multiple])').material_select();
	  (0, _jquery2.default)('select[multiple]:not(.browser-default)').select2({ width: '100%' });
	}
	// Clickable rows in dashboard tables
	(0, _jquery2.default)(document).on('click', 'tr[data-action-go]>td:not(.ignore-link)', function () {
	  var target = (0, _jquery2.default)(this).parent();
	  window.location.href = target.data('action-go');
	});
	
	// Coupon dynamic forms
	(0, _jquery2.default)(document).ready(function () {
	  var $voucherTypeInput = (0, _jquery2.default)('.body-vouchers [name="type"]');
	  if ($voucherTypeInput.length) {
	    var $discountValueType = (0, _jquery2.default)('[name="discount_value_type"]');
	    var $voucherForms = (0, _jquery2.default)('.voucher-form');
	    var $applyToProduct = (0, _jquery2.default)('[name="product-apply_to"]').parents('.input');
	    var $applyToCategory = (0, _jquery2.default)('[name="category-apply_to"]').parents('.input');
	    var onChange = function onChange() {
	      var discountValueType = $discountValueType.val();
	      var type = $voucherTypeInput.val();
	      var hide = discountValueType === 'percentage';
	      $applyToProduct.toggleClass('hide', hide);
	      $applyToCategory.toggleClass('hide', hide);
	
	      $voucherForms.each(function (index, form) {
	        var $form = (0, _jquery2.default)(form);
	        var hideForm = $form.data('type') !== type;
	        $form.toggleClass('hide', hideForm);
	      });
	    };
	
	    $discountValueType.on('change', onChange);
	    $voucherTypeInput.on('change', onChange);
	    $voucherTypeInput.trigger('change');
	  }
	});
	
	//Print button
	(0, _jquery2.default)('.btn-print').click(function (e) {
	  window.print();
	});

/***/ }),

/***/ 144:
/*!***************************************************!*\
  !*** ./~/svg-injector-2/dist/svg-injector.min.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * SVGInjector v2.1.1 - Fast, caching, dynamic inline SVG DOM injection library
	 * https://github.com/flobacher/SVGInjector2
	 * forked from:
	 * https://github.com/iconic/SVGInjector
	 *
	 * Copyright (c) 2015 flobacher <flo@digital-fuse.net>
	 * @license MIT
	 *
	 * original Copyright (c) 2014 Waybury <hello@waybury.com>
	 * @license MIT
	 */
	!function(e,t){"use strict";var n=function(){function n(e){n.instanceCounter++,this.init(e)}var r,s,i,l,a,o,c,u,f,p,d,g,m,v,h,b,y,S,A,C,x,k,N,w,j,E,I,F,T,G,V="http://www.w3.org/2000/svg",O="http://www.w3.org/1999/xlink",L="sprite",q=L+"--",M=[L],R="icon";return i=[],n.instanceCounter=0,n.prototype.init=function(n){n=n||{},r={},o={},o.isLocal="file:"===e.location.protocol,o.hasSvgSupport=t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),s={count:0,elements:[]},l={},a={},a.evalScripts=n.evalScripts||"always",a.pngFallback=n.pngFallback||!1,a.svgFallbackDir=n.svgFallbackDir||!1,a.onlyInjectVisiblePart=n.onlyInjectVisiblePart||!0,a.keepStylesClass="undefined"==typeof n.keepStylesClass?"":n.keepStylesClass,a.spriteClassName="undefined"==typeof n.spriteClassName?L:n.spriteClassName,a.spriteClassIdName="undefined"==typeof n.spriteClassIdName?q:n.spriteClassIdName,a.removeStylesClass="undefined"==typeof n.removeStylesClass?R:n.removeStylesClass,a.removeAllStyles="undefined"!=typeof n.removeAllStyles&&n.removeAllStyles,a.fallbackClassName="undefined"==typeof n.fallbackClassName?M:n.fallbackClassName,a.prefixStyleTags="undefined"==typeof n.prefixStyleTags||n.prefixStyleTags,a.spritesheetURL="undefined"!=typeof n.spritesheetURL&&""!==n.spritesheetURL&&n.spritesheetURL,a.prefixFragIdClass=a.spriteClassIdName,a.forceFallbacks="undefined"!=typeof n.forceFallbacks&&n.forceFallbacks,a.forceFallbacks&&(o.hasSvgSupport=!1),x(t.querySelector("html"),"no-svg",o.hasSvgSupport),o.hasSvgSupport&&"undefined"==typeof n.removeStylesClass&&C(a.removeStylesClass)},n.prototype.inject=function(e,t,n){if(void 0!==e.length){var r=0,s=this;I.call(e,function(i){s.injectElement(i,function(s){n&&"function"==typeof n&&n(s),t&&e.length===++r&&t(r)})})}else e?this.injectElement(e,function(r){n&&"function"==typeof n&&n(r),t&&t(1),e=null}):t&&t(0)},G=n.prototype.injectElement=function(e,t){var n,r=e.getAttribute("data-src")||e.getAttribute("src");if(!r){if(!a.spritesheetURL)return;if(n=h(e),""===n)return;r=a.spritesheetURL+"#"+n}e.setAttribute("data-src",r);var i=r.split("#");1===i.length&&i.push("");var l;if(!/\.svg/i.test(r))return void t("Attempted to inject a file with a non-svg extension: "+r);if(!o.hasSvgSupport){var f=e.getAttribute("data-fallback")||e.getAttribute("data-png");return void(f?(e.setAttribute("src",f),t(null)):a.pngFallback?(i.length>1&&i[1]?(l=i[1]+".png",j(a.fallbackClassName)?c(e,i[1],a.fallbackClassName):w(a.fallbackClassName)?a.fallbackClassName(e,i[1]):"string"==typeof a.fallbackClassName?E(e,a.fallbackClassName):e.setAttribute("src",a.pngFallback+"/"+l)):(l=r.split("/").pop().replace(".svg",".png"),e.setAttribute("src",a.pngFallback+"/"+l)),t(null)):t("This browser does not support SVG and no PNG fallback was defined."))}j(a.fallbackClassName)&&u(e,i[1],a.fallbackClassName),s.elements.indexOf(e)===-1&&(s.elements.push(e),A(t,r,e))},n.prototype.getEnv=function(){return o},n.prototype.getConfig=function(){return a},c=function(e,t,n){var r="undefined"==typeof n?M:n.slice(0);I.call(r,function(e,n){r[n]=e.replace("%s",t)}),E(e,r)},u=function(e,t,n){n="undefined"==typeof n?M.slice(0):n.slice(0);var r,s,i=e.getAttribute("class");"undefined"!=typeof i&&null!==i&&(s=i.split(" "),s&&(I.call(n,function(e){e=e.replace("%s",t),r=s.indexOf(e),r>=0&&(s[r]="")}),e.setAttribute("class",N(s.join(" ")))))},p=function(e,t,n,r){var s=0;return e.textContent=e.textContent.replace(/url\(('|")*#.+('|")*(?=\))/g,function(e){return s++,e+"-"+t}),s},f=function(e,t){var n,r,s,i,l,a,o,c,u,f,p,d,g,m,v,h,b=[{def:"linearGradient",attrs:["fill","stroke"]},{def:"radialGradient",attrs:["fill","stroke"]},{def:"clipPath",attrs:["clip-path"]},{def:"mask",attrs:["mask"]},{def:"filter",attrs:["filter"]},{def:"color-profile",attrs:["color-profile"]},{def:"cursor",attrs:["cursor"]},{def:"marker",attrs:["marker","marker-start","marker-mid","marker-end"]}];I.call(b,function(b){for(r=e.querySelectorAll(b.def+"[id]"),i=0,s=r.length;i<s;i++){for(n=r[i].id+"-"+t,c=b.attrs,f=0,u=c.length;f<u;f++)for(l=e.querySelectorAll("["+c[f]+'="url(#'+r[i].id+')"]'),o=0,a=l.length;o<a;o++)l[o].setAttribute(c[f],"url(#"+n+")");for(p=e.querySelectorAll("[*|href]"),m=[],g=0,d=p.length;g<d;g++)p[g].getAttributeNS(O,"href").toString()==="#"+r[i].id&&m.push(p[g]);for(h=0,v=m.length;h<v;h++)m[h].setAttributeNS(O,"href","#"+n);r[i].id=n}})},d=function(e,t,n){var r;"undefined"==typeof n&&(n=["id","viewBox"]);for(var s=0;s<e.attributes.length;s++)r=e.attributes.item(s),n.indexOf(r.name)<0&&t.setAttribute(r.name,r.value)},g=function(e){var n=t.createElementNS(V,"svg");return I.call(e.childNodes,function(e){n.appendChild(e.cloneNode(!0))}),d(e,n),n},m=function(e,t,n){var r,s,i,l,a,o,c=n.getAttribute("data-src").split("#"),u=e.textContent,f="",p=function(e,t,n){n[t]="."+i+" "+e};if(c.length>1)s=c[1],i=s+"-"+t,r=new RegExp("\\."+s+" ","g"),e.textContent=u.replace(r,"."+i+" ");else{for(l=c[0].split("/"),i=l[l.length-1].replace(".svg","")+"-"+t,r=new RegExp("([\\s\\S]*?){([\\s\\S]*?)}","g");null!==(a=r.exec(u));){o=a[1].trim().split(", "),o.forEach(p);var d=o.join(", ")+"{"+a[2]+"}\n";f+=d}e.textContent=f}n.setAttribute("class",n.getAttribute("class")+" "+i)},v=function(e){var t=e.getAttribute("class");return t?t.trim().split(" "):[]},h=function(e){var t=v(e),n="";return I.call(t,function(e){e.indexOf(a.spriteClassIdName)>=0&&(n=e.replace(a.spriteClassIdName,""))}),n},b=function(e,t,n){var r,s,i,l,a,o,c=null,u=!1,f=!1,p=null;if(void 0===n)r=c=t.cloneNode(!0),c.getAttribute("width")||t.getAttribute("width")||(f=!0);else if(r=t.getElementById(n),!r)return;if(i=r.getAttribute("viewBox"),s=i.split(" "),!c){if(r instanceof SVGSymbolElement)c=g(r),f=u=!0;else if(r instanceof SVGViewElement){if(p=null,e.onlyInjectVisiblePart){var d='*[width="'+s[2]+'"][height="'+s[3]+'"]';l={},0===Math.abs(parseInt(s[0]))?d+=":not([x])":(l.x=s[0],d+='[x="'+s[0]+'"]'),0===Math.abs(parseInt(s[1]))?d+=":not([y])":(l.y=s[1],d+='[y="'+s[1]+'"]'),o=t.querySelectorAll(d),o.length>1,p=o[0]}if(p&&p instanceof SVGSVGElement){c=p.cloneNode(!0);for(var m in l)"width"!==m&&"height"!==m&&c.removeAttribute(m)}else if(p&&p instanceof SVGUseElement){var h=t.getElementById(p.getAttributeNS(O,"href").substr(1));c=g(h),i=h.getAttribute("viewBox"),s=i.split(" "),f=u=!0}else f=u=!0,c=t.cloneNode(!0)}a=v(c);var b=e.prefixFragIdClass+n;a.indexOf(b)<0&&(a.push(b),c.setAttribute("class",a.join(" ")))}return u&&c.setAttribute("viewBox",s.join(" ")),f&&(c.setAttribute("width",s[2]+"px"),c.setAttribute("height",s[3]+"px")),c.setAttribute("xmlns",V),c.setAttribute("xmlns:xlink",O),c},y=function(e,t,n,r){i[e]=i[e]||[],i[e].push({callback:n,fragmentId:t,element:r,name:name})},S=function(e){for(var t,n=0,r=i[e].length;n<r;n++)!function(n){setTimeout(function(){t=i[e][n],k(e,t.fragmentId,t.callback,t.element,t.name)},0)}(n)},A=function(t,n,s){var i,l,a,c,u;if(i=n.split("#"),l=i[0],a=2===i.length?i[1]:void 0,"undefined"!=typeof a&&(u=l.split("/"),c=u[u.length-1].replace(".svg","")),void 0!==r[l])r[l]instanceof SVGSVGElement?k(l,a,t,s,c):y(l,a,t,s,c);else{if(!e.XMLHttpRequest)return t("Browser does not support XMLHttpRequest"),!1;r[l]={},y(l,a,t,s,c);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(4===f.readyState){if(404===f.status||null===f.responseXML)return t("Unable to load SVG file: "+l),!1;if(!(200===f.status||o.isLocal&&0===f.status))return t("There was a problem injecting the SVG: "+f.status+" "+f.statusText),!1;if(f.responseXML instanceof Document)r[l]=f.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var e;try{var s=new DOMParser;e=s.parseFromString(f.responseText,"text/xml")}catch(t){e=void 0}if(!e||e.getElementsByTagName("parsererror").length)return t("Unable to parse SVG file: "+n),!1;r[l]=e.documentElement}S(l)}},f.open("GET",l),f.overrideMimeType&&f.overrideMimeType("text/xml"),f.send()}},C=function(e){var n="svg."+e+" {fill: currentColor;}",r=t.head||t.getElementsByTagName("head")[0],s=t.createElement("style");s.type="text/css",s.styleSheet?s.styleSheet.cssText=n:s.appendChild(t.createTextNode(n)),r.appendChild(s)},x=function(e,t,n){n?e.className.replace(t,""):e.className+=" "+t},k=function(t,n,i,o,c){var u,g,h,y,S;if(u=b(a,r[t],n),"undefined"==typeof u||"string"==typeof u)return S=o.getAttribute("data-fallback-svg"),S=!(!S&&!a.svgFallbackDir)&&a.svgFallbackDir+"/"+n+".svg",S?(o.setAttribute("data-src",S),s.elements.splice(s.elements.indexOf(o),1),G(o,i)):i(u),!1;u.setAttribute("role","img"),I.call(u.children||[],function(e){e instanceof SVGDefsElement||e instanceof SVGTitleElement||e instanceof SVGDescElement||e.setAttribute("role","presentation")}),y=o.getAttribute("aria-hidden")||u.getAttribute("aria-hidden"),h=F("desc",u,o,n,c,!y),g=F("title",u,o,n,c,!y),y?u.setAttribute("aria-hidden","true"):u.setAttribute("aria-labelledby",g+" "+h),d(o,u,["class"]);var A=[].concat(u.getAttribute("class")||[],"injected-svg",o.getAttribute("class")||[]).join(" ");u.setAttribute("class",N(A)),f(u,s.count,c),u.removeAttribute("xmlns:a");for(var C,x,k=u.querySelectorAll("script"),w=[],j=0,E=k.length;j<E;j++)x=k[j].getAttribute("type"),x&&"application/ecmascript"!==x&&"application/javascript"!==x||(C=k[j].innerText||k[j].textContent,w.push(C),u.removeChild(k[j]));if(w.length>0&&("always"===a.evalScripts||"once"===a.evalScripts&&!l[t])){for(var T=0,V=w.length;T<V;T++)new Function(w[T])(e);l[t]=!0}var O=u.querySelectorAll("style");I.call(O,function(e){var t=v(u),n=!0;(t.indexOf(a.removeStylesClass)>=0||a.removeAllStyles)&&t.indexOf(a.keepStylesClass)<0?e.parentNode.removeChild(e):(p(e,s.count,u,c)>0&&(n=!1),a.prefixStyleTags&&(m(e,s.count,u,c),n=!1),n&&(e.textContent+=""))}),o.parentNode.replaceChild(u,o),delete s.elements[s.elements.indexOf(o)],s.count++,i(u)},N=function(e){e=e.split(" ");for(var t={},n=e.length,r=[];n--;)t.hasOwnProperty(e[n])||(t[e[n]]=1,r.unshift(e[n]));return r.join(" ")},w=function(e){return!!(e&&e.constructor&&e.call&&e.apply)},j=function(e){return"[object Array]"===Object.prototype.toString.call(e)},E=function(e,t){var n=e.getAttribute("class");n=n?n:"",j(t)&&(t=t.join(" ")),t=n+" "+t,e.setAttribute("class",N(t))},I=Array.prototype.forEach||function(e,t){if(void 0===this||null===this||"function"!=typeof e)throw new TypeError;var n,r=this.length>>>0;for(n=0;n<r;++n)n in this&&e.call(t,this[n],n,this)},F=function(e,t,n,r,i){var l,a=r?r+"-":"";return a+=e+"-"+s.count,l=n.querySelector(e),l?T(e,t,l.textContent,a,t.firstChild):(l=t.querySelector(e),l?l.setAttribute("id",a):i?T(e,t,r,a,t.firstChild):a=""),a},T=function(e,n,r,s,i){var l,a=n.querySelector(e);return l=t.createElementNS(V,e),l.appendChild(t.createTextNode(r)),l.setAttribute("id",s),n.insertBefore(l,i),a&&a.parentNode.removeChild(a),l},n}();"object"==typeof angular?angular.module("svginjector",[]).provider("svgInjectorOptions",function(){var e={};return{set:function(t){e=t},$get:function(){return e}}}).factory("svgInjectorFactory",["svgInjectorOptions",function(e){return new n(e)}]).directive("svg",["svgInjectorFactory",function(e){var t=e.getConfig();return{restrict:"E",link:function(n,r,s){s.class&&s.class.indexOf(t.spriteClassIdName)>=0?s.$observe("class",function(){e.inject(r[0])}):(s.dataSrc||s.src)&&e.inject(r[0])}}}]):"object"==typeof module&&"object"==typeof module.exports?module.exports=n: true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof e&&(e.SVGInjector=n)}(window,document);
	//# sourceMappingURL=./dist/svg-injector.map.js


/***/ }),

/***/ 145:
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),

/***/ 318:
/*!*************************************!*\
  !*** ./~/dropzone/dist/dropzone.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery, module) {
	/*
	 *
	 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
	 *
	 * Copyright (c) 2012, Matias Meno
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 */
	
	(function() {
	  var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,
	    __slice = [].slice,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
	
	  noop = function() {};
	
	  Emitter = (function() {
	    function Emitter() {}
	
	    Emitter.prototype.addEventListener = Emitter.prototype.on;
	
	    Emitter.prototype.on = function(event, fn) {
	      this._callbacks = this._callbacks || {};
	      if (!this._callbacks[event]) {
	        this._callbacks[event] = [];
	      }
	      this._callbacks[event].push(fn);
	      return this;
	    };
	
	    Emitter.prototype.emit = function() {
	      var args, callback, callbacks, event, _i, _len;
	      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      this._callbacks = this._callbacks || {};
	      callbacks = this._callbacks[event];
	      if (callbacks) {
	        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
	          callback = callbacks[_i];
	          callback.apply(this, args);
	        }
	      }
	      return this;
	    };
	
	    Emitter.prototype.removeListener = Emitter.prototype.off;
	
	    Emitter.prototype.removeAllListeners = Emitter.prototype.off;
	
	    Emitter.prototype.removeEventListener = Emitter.prototype.off;
	
	    Emitter.prototype.off = function(event, fn) {
	      var callback, callbacks, i, _i, _len;
	      if (!this._callbacks || arguments.length === 0) {
	        this._callbacks = {};
	        return this;
	      }
	      callbacks = this._callbacks[event];
	      if (!callbacks) {
	        return this;
	      }
	      if (arguments.length === 1) {
	        delete this._callbacks[event];
	        return this;
	      }
	      for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
	        callback = callbacks[i];
	        if (callback === fn) {
	          callbacks.splice(i, 1);
	          break;
	        }
	      }
	      return this;
	    };
	
	    return Emitter;
	
	  })();
	
	  Dropzone = (function(_super) {
	    var extend, resolveOption;
	
	    __extends(Dropzone, _super);
	
	    Dropzone.prototype.Emitter = Emitter;
	
	
	    /*
	    This is a list of all available events you can register on a dropzone object.
	    
	    You can register an event handler like this:
	    
	        dropzone.on("dragEnter", function() { });
	     */
	
	    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];
	
	    Dropzone.prototype.defaultOptions = {
	      url: null,
	      method: "post",
	      withCredentials: false,
	      parallelUploads: 2,
	      uploadMultiple: false,
	      maxFilesize: 256,
	      paramName: "file",
	      createImageThumbnails: true,
	      maxThumbnailFilesize: 10,
	      thumbnailWidth: 120,
	      thumbnailHeight: 120,
	      filesizeBase: 1000,
	      maxFiles: null,
	      params: {},
	      clickable: true,
	      ignoreHiddenFiles: true,
	      acceptedFiles: null,
	      acceptedMimeTypes: null,
	      autoProcessQueue: true,
	      autoQueue: true,
	      addRemoveLinks: false,
	      previewsContainer: null,
	      hiddenInputContainer: "body",
	      capture: null,
	      renameFilename: null,
	      dictDefaultMessage: "Drop files here to upload",
	      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
	      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
	      dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
	      dictInvalidFileType: "You can't upload files of this type.",
	      dictResponseError: "Server responded with {{statusCode}} code.",
	      dictCancelUpload: "Cancel upload",
	      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
	      dictRemoveFile: "Remove file",
	      dictRemoveFileConfirmation: null,
	      dictMaxFilesExceeded: "You can not upload any more files.",
	      accept: function(file, done) {
	        return done();
	      },
	      init: function() {
	        return noop;
	      },
	      forceFallback: false,
	      fallback: function() {
	        var child, messageElement, span, _i, _len, _ref;
	        this.element.className = "" + this.element.className + " dz-browser-not-supported";
	        _ref = this.element.getElementsByTagName("div");
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          child = _ref[_i];
	          if (/(^| )dz-message($| )/.test(child.className)) {
	            messageElement = child;
	            child.className = "dz-message";
	            continue;
	          }
	        }
	        if (!messageElement) {
	          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
	          this.element.appendChild(messageElement);
	        }
	        span = messageElement.getElementsByTagName("span")[0];
	        if (span) {
	          if (span.textContent != null) {
	            span.textContent = this.options.dictFallbackMessage;
	          } else if (span.innerText != null) {
	            span.innerText = this.options.dictFallbackMessage;
	          }
	        }
	        return this.element.appendChild(this.getFallbackForm());
	      },
	      resize: function(file) {
	        var info, srcRatio, trgRatio;
	        info = {
	          srcX: 0,
	          srcY: 0,
	          srcWidth: file.width,
	          srcHeight: file.height
	        };
	        srcRatio = file.width / file.height;
	        info.optWidth = this.options.thumbnailWidth;
	        info.optHeight = this.options.thumbnailHeight;
	        if ((info.optWidth == null) && (info.optHeight == null)) {
	          info.optWidth = info.srcWidth;
	          info.optHeight = info.srcHeight;
	        } else if (info.optWidth == null) {
	          info.optWidth = srcRatio * info.optHeight;
	        } else if (info.optHeight == null) {
	          info.optHeight = (1 / srcRatio) * info.optWidth;
	        }
	        trgRatio = info.optWidth / info.optHeight;
	        if (file.height < info.optHeight || file.width < info.optWidth) {
	          info.trgHeight = info.srcHeight;
	          info.trgWidth = info.srcWidth;
	        } else {
	          if (srcRatio > trgRatio) {
	            info.srcHeight = file.height;
	            info.srcWidth = info.srcHeight * trgRatio;
	          } else {
	            info.srcWidth = file.width;
	            info.srcHeight = info.srcWidth / trgRatio;
	          }
	        }
	        info.srcX = (file.width - info.srcWidth) / 2;
	        info.srcY = (file.height - info.srcHeight) / 2;
	        return info;
	      },
	
	      /*
	      Those functions register themselves to the events on init and handle all
	      the user interface specific stuff. Overwriting them won't break the upload
	      but can break the way it's displayed.
	      You can overwrite them if you don't like the default behavior. If you just
	      want to add an additional event handler, register it on the dropzone object
	      and don't overwrite those options.
	       */
	      drop: function(e) {
	        return this.element.classList.remove("dz-drag-hover");
	      },
	      dragstart: noop,
	      dragend: function(e) {
	        return this.element.classList.remove("dz-drag-hover");
	      },
	      dragenter: function(e) {
	        return this.element.classList.add("dz-drag-hover");
	      },
	      dragover: function(e) {
	        return this.element.classList.add("dz-drag-hover");
	      },
	      dragleave: function(e) {
	        return this.element.classList.remove("dz-drag-hover");
	      },
	      paste: noop,
	      reset: function() {
	        return this.element.classList.remove("dz-started");
	      },
	      addedfile: function(file) {
	        var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
	        if (this.element === this.previewsContainer) {
	          this.element.classList.add("dz-started");
	        }
	        if (this.previewsContainer) {
	          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
	          file.previewTemplate = file.previewElement;
	          this.previewsContainer.appendChild(file.previewElement);
	          _ref = file.previewElement.querySelectorAll("[data-dz-name]");
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            node = _ref[_i];
	            node.textContent = this._renameFilename(file.name);
	          }
	          _ref1 = file.previewElement.querySelectorAll("[data-dz-size]");
	          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	            node = _ref1[_j];
	            node.innerHTML = this.filesize(file.size);
	          }
	          if (this.options.addRemoveLinks) {
	            file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
	            file.previewElement.appendChild(file._removeLink);
	          }
	          removeFileEvent = (function(_this) {
	            return function(e) {
	              e.preventDefault();
	              e.stopPropagation();
	              if (file.status === Dropzone.UPLOADING) {
	                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
	                  return _this.removeFile(file);
	                });
	              } else {
	                if (_this.options.dictRemoveFileConfirmation) {
	                  return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
	                    return _this.removeFile(file);
	                  });
	                } else {
	                  return _this.removeFile(file);
	                }
	              }
	            };
	          })(this);
	          _ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");
	          _results = [];
	          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
	            removeLink = _ref2[_k];
	            _results.push(removeLink.addEventListener("click", removeFileEvent));
	          }
	          return _results;
	        }
	      },
	      removedfile: function(file) {
	        var _ref;
	        if (file.previewElement) {
	          if ((_ref = file.previewElement) != null) {
	            _ref.parentNode.removeChild(file.previewElement);
	          }
	        }
	        return this._updateMaxFilesReachedClass();
	      },
	      thumbnail: function(file, dataUrl) {
	        var thumbnailElement, _i, _len, _ref;
	        if (file.previewElement) {
	          file.previewElement.classList.remove("dz-file-preview");
	          _ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            thumbnailElement = _ref[_i];
	            thumbnailElement.alt = file.name;
	            thumbnailElement.src = dataUrl;
	          }
	          return setTimeout(((function(_this) {
	            return function() {
	              return file.previewElement.classList.add("dz-image-preview");
	            };
	          })(this)), 1);
	        }
	      },
	      error: function(file, message) {
	        var node, _i, _len, _ref, _results;
	        if (file.previewElement) {
	          file.previewElement.classList.add("dz-error");
	          if (typeof message !== "String" && message.error) {
	            message = message.error;
	          }
	          _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
	          _results = [];
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            node = _ref[_i];
	            _results.push(node.textContent = message);
	          }
	          return _results;
	        }
	      },
	      errormultiple: noop,
	      processing: function(file) {
	        if (file.previewElement) {
	          file.previewElement.classList.add("dz-processing");
	          if (file._removeLink) {
	            return file._removeLink.textContent = this.options.dictCancelUpload;
	          }
	        }
	      },
	      processingmultiple: noop,
	      uploadprogress: function(file, progress, bytesSent) {
	        var node, _i, _len, _ref, _results;
	        if (file.previewElement) {
	          _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
	          _results = [];
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            node = _ref[_i];
	            if (node.nodeName === 'PROGRESS') {
	              _results.push(node.value = progress);
	            } else {
	              _results.push(node.style.width = "" + progress + "%");
	            }
	          }
	          return _results;
	        }
	      },
	      totaluploadprogress: noop,
	      sending: noop,
	      sendingmultiple: noop,
	      success: function(file) {
	        if (file.previewElement) {
	          return file.previewElement.classList.add("dz-success");
	        }
	      },
	      successmultiple: noop,
	      canceled: function(file) {
	        return this.emit("error", file, "Upload canceled.");
	      },
	      canceledmultiple: noop,
	      complete: function(file) {
	        if (file._removeLink) {
	          file._removeLink.textContent = this.options.dictRemoveFile;
	        }
	        if (file.previewElement) {
	          return file.previewElement.classList.add("dz-complete");
	        }
	      },
	      completemultiple: noop,
	      maxfilesexceeded: noop,
	      maxfilesreached: noop,
	      queuecomplete: noop,
	      addedfiles: noop,
	      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
	    };
	
	    extend = function() {
	      var key, object, objects, target, val, _i, _len;
	      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      for (_i = 0, _len = objects.length; _i < _len; _i++) {
	        object = objects[_i];
	        for (key in object) {
	          val = object[key];
	          target[key] = val;
	        }
	      }
	      return target;
	    };
	
	    function Dropzone(element, options) {
	      var elementOptions, fallback, _ref;
	      this.element = element;
	      this.version = Dropzone.version;
	      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
	      this.clickableElements = [];
	      this.listeners = [];
	      this.files = [];
	      if (typeof this.element === "string") {
	        this.element = document.querySelector(this.element);
	      }
	      if (!(this.element && (this.element.nodeType != null))) {
	        throw new Error("Invalid dropzone element.");
	      }
	      if (this.element.dropzone) {
	        throw new Error("Dropzone already attached.");
	      }
	      Dropzone.instances.push(this);
	      this.element.dropzone = this;
	      elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};
	      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
	      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
	        return this.options.fallback.call(this);
	      }
	      if (this.options.url == null) {
	        this.options.url = this.element.getAttribute("action");
	      }
	      if (!this.options.url) {
	        throw new Error("No URL provided.");
	      }
	      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
	        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
	      }
	      if (this.options.acceptedMimeTypes) {
	        this.options.acceptedFiles = this.options.acceptedMimeTypes;
	        delete this.options.acceptedMimeTypes;
	      }
	      this.options.method = this.options.method.toUpperCase();
	      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
	        fallback.parentNode.removeChild(fallback);
	      }
	      if (this.options.previewsContainer !== false) {
	        if (this.options.previewsContainer) {
	          this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
	        } else {
	          this.previewsContainer = this.element;
	        }
	      }
	      if (this.options.clickable) {
	        if (this.options.clickable === true) {
	          this.clickableElements = [this.element];
	        } else {
	          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
	        }
	      }
	      this.init();
	    }
	
	    Dropzone.prototype.getAcceptedFiles = function() {
	      var file, _i, _len, _ref, _results;
	      _ref = this.files;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        file = _ref[_i];
	        if (file.accepted) {
	          _results.push(file);
	        }
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.getRejectedFiles = function() {
	      var file, _i, _len, _ref, _results;
	      _ref = this.files;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        file = _ref[_i];
	        if (!file.accepted) {
	          _results.push(file);
	        }
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.getFilesWithStatus = function(status) {
	      var file, _i, _len, _ref, _results;
	      _ref = this.files;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        file = _ref[_i];
	        if (file.status === status) {
	          _results.push(file);
	        }
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.getQueuedFiles = function() {
	      return this.getFilesWithStatus(Dropzone.QUEUED);
	    };
	
	    Dropzone.prototype.getUploadingFiles = function() {
	      return this.getFilesWithStatus(Dropzone.UPLOADING);
	    };
	
	    Dropzone.prototype.getAddedFiles = function() {
	      return this.getFilesWithStatus(Dropzone.ADDED);
	    };
	
	    Dropzone.prototype.getActiveFiles = function() {
	      var file, _i, _len, _ref, _results;
	      _ref = this.files;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        file = _ref[_i];
	        if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {
	          _results.push(file);
	        }
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.init = function() {
	      var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1;
	      if (this.element.tagName === "form") {
	        this.element.setAttribute("enctype", "multipart/form-data");
	      }
	      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
	        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
	      }
	      if (this.clickableElements.length) {
	        setupHiddenFileInput = (function(_this) {
	          return function() {
	            if (_this.hiddenFileInput) {
	              _this.hiddenFileInput.parentNode.removeChild(_this.hiddenFileInput);
	            }
	            _this.hiddenFileInput = document.createElement("input");
	            _this.hiddenFileInput.setAttribute("type", "file");
	            if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
	              _this.hiddenFileInput.setAttribute("multiple", "multiple");
	            }
	            _this.hiddenFileInput.className = "dz-hidden-input";
	            if (_this.options.acceptedFiles != null) {
	              _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
	            }
	            if (_this.options.capture != null) {
	              _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
	            }
	            _this.hiddenFileInput.style.visibility = "hidden";
	            _this.hiddenFileInput.style.position = "absolute";
	            _this.hiddenFileInput.style.top = "0";
	            _this.hiddenFileInput.style.left = "0";
	            _this.hiddenFileInput.style.height = "0";
	            _this.hiddenFileInput.style.width = "0";
	            document.querySelector(_this.options.hiddenInputContainer).appendChild(_this.hiddenFileInput);
	            return _this.hiddenFileInput.addEventListener("change", function() {
	              var file, files, _i, _len;
	              files = _this.hiddenFileInput.files;
	              if (files.length) {
	                for (_i = 0, _len = files.length; _i < _len; _i++) {
	                  file = files[_i];
	                  _this.addFile(file);
	                }
	              }
	              _this.emit("addedfiles", files);
	              return setupHiddenFileInput();
	            });
	          };
	        })(this);
	        setupHiddenFileInput();
	      }
	      this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;
	      _ref1 = this.events;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        eventName = _ref1[_i];
	        this.on(eventName, this.options[eventName]);
	      }
	      this.on("uploadprogress", (function(_this) {
	        return function() {
	          return _this.updateTotalUploadProgress();
	        };
	      })(this));
	      this.on("removedfile", (function(_this) {
	        return function() {
	          return _this.updateTotalUploadProgress();
	        };
	      })(this));
	      this.on("canceled", (function(_this) {
	        return function(file) {
	          return _this.emit("complete", file);
	        };
	      })(this));
	      this.on("complete", (function(_this) {
	        return function(file) {
	          if (_this.getAddedFiles().length === 0 && _this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
	            return setTimeout((function() {
	              return _this.emit("queuecomplete");
	            }), 0);
	          }
	        };
	      })(this));
	      noPropagation = function(e) {
	        e.stopPropagation();
	        if (e.preventDefault) {
	          return e.preventDefault();
	        } else {
	          return e.returnValue = false;
	        }
	      };
	      this.listeners = [
	        {
	          element: this.element,
	          events: {
	            "dragstart": (function(_this) {
	              return function(e) {
	                return _this.emit("dragstart", e);
	              };
	            })(this),
	            "dragenter": (function(_this) {
	              return function(e) {
	                noPropagation(e);
	                return _this.emit("dragenter", e);
	              };
	            })(this),
	            "dragover": (function(_this) {
	              return function(e) {
	                var efct;
	                try {
	                  efct = e.dataTransfer.effectAllowed;
	                } catch (_error) {}
	                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
	                noPropagation(e);
	                return _this.emit("dragover", e);
	              };
	            })(this),
	            "dragleave": (function(_this) {
	              return function(e) {
	                return _this.emit("dragleave", e);
	              };
	            })(this),
	            "drop": (function(_this) {
	              return function(e) {
	                noPropagation(e);
	                return _this.drop(e);
	              };
	            })(this),
	            "dragend": (function(_this) {
	              return function(e) {
	                return _this.emit("dragend", e);
	              };
	            })(this)
	          }
	        }
	      ];
	      this.clickableElements.forEach((function(_this) {
	        return function(clickableElement) {
	          return _this.listeners.push({
	            element: clickableElement,
	            events: {
	              "click": function(evt) {
	                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
	                  _this.hiddenFileInput.click();
	                }
	                return true;
	              }
	            }
	          });
	        };
	      })(this));
	      this.enable();
	      return this.options.init.call(this);
	    };
	
	    Dropzone.prototype.destroy = function() {
	      var _ref;
	      this.disable();
	      this.removeAllFiles(true);
	      if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {
	        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
	        this.hiddenFileInput = null;
	      }
	      delete this.element.dropzone;
	      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
	    };
	
	    Dropzone.prototype.updateTotalUploadProgress = function() {
	      var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
	      totalBytesSent = 0;
	      totalBytes = 0;
	      activeFiles = this.getActiveFiles();
	      if (activeFiles.length) {
	        _ref = this.getActiveFiles();
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          file = _ref[_i];
	          totalBytesSent += file.upload.bytesSent;
	          totalBytes += file.upload.total;
	        }
	        totalUploadProgress = 100 * totalBytesSent / totalBytes;
	      } else {
	        totalUploadProgress = 100;
	      }
	      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
	    };
	
	    Dropzone.prototype._getParamName = function(n) {
	      if (typeof this.options.paramName === "function") {
	        return this.options.paramName(n);
	      } else {
	        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
	      }
	    };
	
	    Dropzone.prototype._renameFilename = function(name) {
	      if (typeof this.options.renameFilename !== "function") {
	        return name;
	      }
	      return this.options.renameFilename(name);
	    };
	
	    Dropzone.prototype.getFallbackForm = function() {
	      var existingFallback, fields, fieldsString, form;
	      if (existingFallback = this.getExistingFallback()) {
	        return existingFallback;
	      }
	      fieldsString = "<div class=\"dz-fallback\">";
	      if (this.options.dictFallbackText) {
	        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
	      }
	      fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
	      fields = Dropzone.createElement(fieldsString);
	      if (this.element.tagName !== "FORM") {
	        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
	        form.appendChild(fields);
	      } else {
	        this.element.setAttribute("enctype", "multipart/form-data");
	        this.element.setAttribute("method", this.options.method);
	      }
	      return form != null ? form : fields;
	    };
	
	    Dropzone.prototype.getExistingFallback = function() {
	      var fallback, getFallback, tagName, _i, _len, _ref;
	      getFallback = function(elements) {
	        var el, _i, _len;
	        for (_i = 0, _len = elements.length; _i < _len; _i++) {
	          el = elements[_i];
	          if (/(^| )fallback($| )/.test(el.className)) {
	            return el;
	          }
	        }
	      };
	      _ref = ["div", "form"];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        tagName = _ref[_i];
	        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
	          return fallback;
	        }
	      }
	    };
	
	    Dropzone.prototype.setupEventListeners = function() {
	      var elementListeners, event, listener, _i, _len, _ref, _results;
	      _ref = this.listeners;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        elementListeners = _ref[_i];
	        _results.push((function() {
	          var _ref1, _results1;
	          _ref1 = elementListeners.events;
	          _results1 = [];
	          for (event in _ref1) {
	            listener = _ref1[event];
	            _results1.push(elementListeners.element.addEventListener(event, listener, false));
	          }
	          return _results1;
	        })());
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.removeEventListeners = function() {
	      var elementListeners, event, listener, _i, _len, _ref, _results;
	      _ref = this.listeners;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        elementListeners = _ref[_i];
	        _results.push((function() {
	          var _ref1, _results1;
	          _ref1 = elementListeners.events;
	          _results1 = [];
	          for (event in _ref1) {
	            listener = _ref1[event];
	            _results1.push(elementListeners.element.removeEventListener(event, listener, false));
	          }
	          return _results1;
	        })());
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.disable = function() {
	      var file, _i, _len, _ref, _results;
	      this.clickableElements.forEach(function(element) {
	        return element.classList.remove("dz-clickable");
	      });
	      this.removeEventListeners();
	      _ref = this.files;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        file = _ref[_i];
	        _results.push(this.cancelUpload(file));
	      }
	      return _results;
	    };
	
	    Dropzone.prototype.enable = function() {
	      this.clickableElements.forEach(function(element) {
	        return element.classList.add("dz-clickable");
	      });
	      return this.setupEventListeners();
	    };
	
	    Dropzone.prototype.filesize = function(size) {
	      var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
	      selectedSize = 0;
	      selectedUnit = "b";
	      if (size > 0) {
	        units = ['TB', 'GB', 'MB', 'KB', 'b'];
	        for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {
	          unit = units[i];
	          cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
	          if (size >= cutoff) {
	            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
	            selectedUnit = unit;
	            break;
	          }
	        }
	        selectedSize = Math.round(10 * selectedSize) / 10;
	      }
	      return "<strong>" + selectedSize + "</strong> " + selectedUnit;
	    };
	
	    Dropzone.prototype._updateMaxFilesReachedClass = function() {
	      if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
	        if (this.getAcceptedFiles().length === this.options.maxFiles) {
	          this.emit('maxfilesreached', this.files);
	        }
	        return this.element.classList.add("dz-max-files-reached");
	      } else {
	        return this.element.classList.remove("dz-max-files-reached");
	      }
	    };
	
	    Dropzone.prototype.drop = function(e) {
	      var files, items;
	      if (!e.dataTransfer) {
	        return;
	      }
	      this.emit("drop", e);
	      files = e.dataTransfer.files;
	      this.emit("addedfiles", files);
	      if (files.length) {
	        items = e.dataTransfer.items;
	        if (items && items.length && (items[0].webkitGetAsEntry != null)) {
	          this._addFilesFromItems(items);
	        } else {
	          this.handleFiles(files);
	        }
	      }
	    };
	
	    Dropzone.prototype.paste = function(e) {
	      var items, _ref;
	      if ((e != null ? (_ref = e.clipboardData) != null ? _ref.items : void 0 : void 0) == null) {
	        return;
	      }
	      this.emit("paste", e);
	      items = e.clipboardData.items;
	      if (items.length) {
	        return this._addFilesFromItems(items);
	      }
	    };
	
	    Dropzone.prototype.handleFiles = function(files) {
	      var file, _i, _len, _results;
	      _results = [];
	      for (_i = 0, _len = files.length; _i < _len; _i++) {
	        file = files[_i];
	        _results.push(this.addFile(file));
	      }
	      return _results;
	    };
	
	    Dropzone.prototype._addFilesFromItems = function(items) {
	      var entry, item, _i, _len, _results;
	      _results = [];
	      for (_i = 0, _len = items.length; _i < _len; _i++) {
	        item = items[_i];
	        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
	          if (entry.isFile) {
	            _results.push(this.addFile(item.getAsFile()));
	          } else if (entry.isDirectory) {
	            _results.push(this._addFilesFromDirectory(entry, entry.name));
	          } else {
	            _results.push(void 0);
	          }
	        } else if (item.getAsFile != null) {
	          if ((item.kind == null) || item.kind === "file") {
	            _results.push(this.addFile(item.getAsFile()));
	          } else {
	            _results.push(void 0);
	          }
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    };
	
	    Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
	      var dirReader, errorHandler, readEntries;
	      dirReader = directory.createReader();
	      errorHandler = function(error) {
	        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
	      };
	      readEntries = (function(_this) {
	        return function() {
	          return dirReader.readEntries(function(entries) {
	            var entry, _i, _len;
	            if (entries.length > 0) {
	              for (_i = 0, _len = entries.length; _i < _len; _i++) {
	                entry = entries[_i];
	                if (entry.isFile) {
	                  entry.file(function(file) {
	                    if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
	                      return;
	                    }
	                    file.fullPath = "" + path + "/" + file.name;
	                    return _this.addFile(file);
	                  });
	                } else if (entry.isDirectory) {
	                  _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);
	                }
	              }
	              readEntries();
	            }
	            return null;
	          }, errorHandler);
	        };
	      })(this);
	      return readEntries();
	    };
	
	    Dropzone.prototype.accept = function(file, done) {
	      if (file.size > this.options.maxFilesize * 1024 * 1024) {
	        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
	      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
	        return done(this.options.dictInvalidFileType);
	      } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
	        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
	        return this.emit("maxfilesexceeded", file);
	      } else {
	        return this.options.accept.call(this, file, done);
	      }
	    };
	
	    Dropzone.prototype.addFile = function(file) {
	      file.upload = {
	        progress: 0,
	        total: file.size,
	        bytesSent: 0
	      };
	      this.files.push(file);
	      file.status = Dropzone.ADDED;
	      this.emit("addedfile", file);
	      this._enqueueThumbnail(file);
	      return this.accept(file, (function(_this) {
	        return function(error) {
	          if (error) {
	            file.accepted = false;
	            _this._errorProcessing([file], error);
	          } else {
	            file.accepted = true;
	            if (_this.options.autoQueue) {
	              _this.enqueueFile(file);
	            }
	          }
	          return _this._updateMaxFilesReachedClass();
	        };
	      })(this));
	    };
	
	    Dropzone.prototype.enqueueFiles = function(files) {
	      var file, _i, _len;
	      for (_i = 0, _len = files.length; _i < _len; _i++) {
	        file = files[_i];
	        this.enqueueFile(file);
	      }
	      return null;
	    };
	
	    Dropzone.prototype.enqueueFile = function(file) {
	      if (file.status === Dropzone.ADDED && file.accepted === true) {
	        file.status = Dropzone.QUEUED;
	        if (this.options.autoProcessQueue) {
	          return setTimeout(((function(_this) {
	            return function() {
	              return _this.processQueue();
	            };
	          })(this)), 0);
	        }
	      } else {
	        throw new Error("This file can't be queued because it has already been processed or was rejected.");
	      }
	    };
	
	    Dropzone.prototype._thumbnailQueue = [];
	
	    Dropzone.prototype._processingThumbnail = false;
	
	    Dropzone.prototype._enqueueThumbnail = function(file) {
	      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
	        this._thumbnailQueue.push(file);
	        return setTimeout(((function(_this) {
	          return function() {
	            return _this._processThumbnailQueue();
	          };
	        })(this)), 0);
	      }
	    };
	
	    Dropzone.prototype._processThumbnailQueue = function() {
	      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
	        return;
	      }
	      this._processingThumbnail = true;
	      return this.createThumbnail(this._thumbnailQueue.shift(), (function(_this) {
	        return function() {
	          _this._processingThumbnail = false;
	          return _this._processThumbnailQueue();
	        };
	      })(this));
	    };
	
	    Dropzone.prototype.removeFile = function(file) {
	      if (file.status === Dropzone.UPLOADING) {
	        this.cancelUpload(file);
	      }
	      this.files = without(this.files, file);
	      this.emit("removedfile", file);
	      if (this.files.length === 0) {
	        return this.emit("reset");
	      }
	    };
	
	    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
	      var file, _i, _len, _ref;
	      if (cancelIfNecessary == null) {
	        cancelIfNecessary = false;
	      }
	      _ref = this.files.slice();
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        file = _ref[_i];
	        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
	          this.removeFile(file);
	        }
	      }
	      return null;
	    };
	
	    Dropzone.prototype.createThumbnail = function(file, callback) {
	      var fileReader;
	      fileReader = new FileReader;
	      fileReader.onload = (function(_this) {
	        return function() {
	          if (file.type === "image/svg+xml") {
	            _this.emit("thumbnail", file, fileReader.result);
	            if (callback != null) {
	              callback();
	            }
	            return;
	          }
	          return _this.createThumbnailFromUrl(file, fileReader.result, callback);
	        };
	      })(this);
	      return fileReader.readAsDataURL(file);
	    };
	
	    Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback, crossOrigin) {
	      var img;
	      img = document.createElement("img");
	      if (crossOrigin) {
	        img.crossOrigin = crossOrigin;
	      }
	      img.onload = (function(_this) {
	        return function() {
	          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
	          file.width = img.width;
	          file.height = img.height;
	          resizeInfo = _this.options.resize.call(_this, file);
	          if (resizeInfo.trgWidth == null) {
	            resizeInfo.trgWidth = resizeInfo.optWidth;
	          }
	          if (resizeInfo.trgHeight == null) {
	            resizeInfo.trgHeight = resizeInfo.optHeight;
	          }
	          canvas = document.createElement("canvas");
	          ctx = canvas.getContext("2d");
	          canvas.width = resizeInfo.trgWidth;
	          canvas.height = resizeInfo.trgHeight;
	          drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
	          thumbnail = canvas.toDataURL("image/png");
	          _this.emit("thumbnail", file, thumbnail);
	          if (callback != null) {
	            return callback();
	          }
	        };
	      })(this);
	      if (callback != null) {
	        img.onerror = callback;
	      }
	      return img.src = imageUrl;
	    };
	
	    Dropzone.prototype.processQueue = function() {
	      var i, parallelUploads, processingLength, queuedFiles;
	      parallelUploads = this.options.parallelUploads;
	      processingLength = this.getUploadingFiles().length;
	      i = processingLength;
	      if (processingLength >= parallelUploads) {
	        return;
	      }
	      queuedFiles = this.getQueuedFiles();
	      if (!(queuedFiles.length > 0)) {
	        return;
	      }
	      if (this.options.uploadMultiple) {
	        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
	      } else {
	        while (i < parallelUploads) {
	          if (!queuedFiles.length) {
	            return;
	          }
	          this.processFile(queuedFiles.shift());
	          i++;
	        }
	      }
	    };
	
	    Dropzone.prototype.processFile = function(file) {
	      return this.processFiles([file]);
	    };
	
	    Dropzone.prototype.processFiles = function(files) {
	      var file, _i, _len;
	      for (_i = 0, _len = files.length; _i < _len; _i++) {
	        file = files[_i];
	        file.processing = true;
	        file.status = Dropzone.UPLOADING;
	        this.emit("processing", file);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("processingmultiple", files);
	      }
	      return this.uploadFiles(files);
	    };
	
	    Dropzone.prototype._getFilesWithXhr = function(xhr) {
	      var file, files;
	      return files = (function() {
	        var _i, _len, _ref, _results;
	        _ref = this.files;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          file = _ref[_i];
	          if (file.xhr === xhr) {
	            _results.push(file);
	          }
	        }
	        return _results;
	      }).call(this);
	    };
	
	    Dropzone.prototype.cancelUpload = function(file) {
	      var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
	      if (file.status === Dropzone.UPLOADING) {
	        groupedFiles = this._getFilesWithXhr(file.xhr);
	        for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
	          groupedFile = groupedFiles[_i];
	          groupedFile.status = Dropzone.CANCELED;
	        }
	        file.xhr.abort();
	        for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
	          groupedFile = groupedFiles[_j];
	          this.emit("canceled", groupedFile);
	        }
	        if (this.options.uploadMultiple) {
	          this.emit("canceledmultiple", groupedFiles);
	        }
	      } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {
	        file.status = Dropzone.CANCELED;
	        this.emit("canceled", file);
	        if (this.options.uploadMultiple) {
	          this.emit("canceledmultiple", [file]);
	        }
	      }
	      if (this.options.autoProcessQueue) {
	        return this.processQueue();
	      }
	    };
	
	    resolveOption = function() {
	      var args, option;
	      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if (typeof option === 'function') {
	        return option.apply(this, args);
	      }
	      return option;
	    };
	
	    Dropzone.prototype.uploadFile = function(file) {
	      return this.uploadFiles([file]);
	    };
	
	    Dropzone.prototype.uploadFiles = function(files) {
	      var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
	      xhr = new XMLHttpRequest();
	      for (_i = 0, _len = files.length; _i < _len; _i++) {
	        file = files[_i];
	        file.xhr = xhr;
	      }
	      method = resolveOption(this.options.method, files);
	      url = resolveOption(this.options.url, files);
	      xhr.open(method, url, true);
	      xhr.withCredentials = !!this.options.withCredentials;
	      response = null;
	      handleError = (function(_this) {
	        return function() {
	          var _j, _len1, _results;
	          _results = [];
	          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
	            file = files[_j];
	            _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
	          }
	          return _results;
	        };
	      })(this);
	      updateProgress = (function(_this) {
	        return function(e) {
	          var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
	          if (e != null) {
	            progress = 100 * e.loaded / e.total;
	            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
	              file = files[_j];
	              file.upload = {
	                progress: progress,
	                total: e.total,
	                bytesSent: e.loaded
	              };
	            }
	          } else {
	            allFilesFinished = true;
	            progress = 100;
	            for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
	              file = files[_k];
	              if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
	                allFilesFinished = false;
	              }
	              file.upload.progress = progress;
	              file.upload.bytesSent = file.upload.total;
	            }
	            if (allFilesFinished) {
	              return;
	            }
	          }
	          _results = [];
	          for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
	            file = files[_l];
	            _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
	          }
	          return _results;
	        };
	      })(this);
	      xhr.onload = (function(_this) {
	        return function(e) {
	          var _ref;
	          if (files[0].status === Dropzone.CANCELED) {
	            return;
	          }
	          if (xhr.readyState !== 4) {
	            return;
	          }
	          response = xhr.responseText;
	          if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
	            try {
	              response = JSON.parse(response);
	            } catch (_error) {
	              e = _error;
	              response = "Invalid JSON response from server.";
	            }
	          }
	          updateProgress();
	          if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
	            return handleError();
	          } else {
	            return _this._finished(files, response, e);
	          }
	        };
	      })(this);
	      xhr.onerror = (function(_this) {
	        return function() {
	          if (files[0].status === Dropzone.CANCELED) {
	            return;
	          }
	          return handleError();
	        };
	      })(this);
	      progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
	      progressObj.onprogress = updateProgress;
	      headers = {
	        "Accept": "application/json",
	        "Cache-Control": "no-cache",
	        "X-Requested-With": "XMLHttpRequest"
	      };
	      if (this.options.headers) {
	        extend(headers, this.options.headers);
	      }
	      for (headerName in headers) {
	        headerValue = headers[headerName];
	        if (headerValue) {
	          xhr.setRequestHeader(headerName, headerValue);
	        }
	      }
	      formData = new FormData();
	      if (this.options.params) {
	        _ref1 = this.options.params;
	        for (key in _ref1) {
	          value = _ref1[key];
	          formData.append(key, value);
	        }
	      }
	      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
	        file = files[_j];
	        this.emit("sending", file, xhr, formData);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("sendingmultiple", files, xhr, formData);
	      }
	      if (this.element.tagName === "FORM") {
	        _ref2 = this.element.querySelectorAll("input, textarea, select, button");
	        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
	          input = _ref2[_k];
	          inputName = input.getAttribute("name");
	          inputType = input.getAttribute("type");
	          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
	            _ref3 = input.options;
	            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
	              option = _ref3[_l];
	              if (option.selected) {
	                formData.append(inputName, option.value);
	              }
	            }
	          } else if (!inputType || ((_ref4 = inputType.toLowerCase()) !== "checkbox" && _ref4 !== "radio") || input.checked) {
	            formData.append(inputName, input.value);
	          }
	        }
	      }
	      for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; i = 0 <= _ref5 ? ++_m : --_m) {
	        formData.append(this._getParamName(i), files[i], this._renameFilename(files[i].name));
	      }
	      return this.submitRequest(xhr, formData, files);
	    };
	
	    Dropzone.prototype.submitRequest = function(xhr, formData, files) {
	      return xhr.send(formData);
	    };
	
	    Dropzone.prototype._finished = function(files, responseText, e) {
	      var file, _i, _len;
	      for (_i = 0, _len = files.length; _i < _len; _i++) {
	        file = files[_i];
	        file.status = Dropzone.SUCCESS;
	        this.emit("success", file, responseText, e);
	        this.emit("complete", file);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("successmultiple", files, responseText, e);
	        this.emit("completemultiple", files);
	      }
	      if (this.options.autoProcessQueue) {
	        return this.processQueue();
	      }
	    };
	
	    Dropzone.prototype._errorProcessing = function(files, message, xhr) {
	      var file, _i, _len;
	      for (_i = 0, _len = files.length; _i < _len; _i++) {
	        file = files[_i];
	        file.status = Dropzone.ERROR;
	        this.emit("error", file, message, xhr);
	        this.emit("complete", file);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("errormultiple", files, message, xhr);
	        this.emit("completemultiple", files);
	      }
	      if (this.options.autoProcessQueue) {
	        return this.processQueue();
	      }
	    };
	
	    return Dropzone;
	
	  })(Emitter);
	
	  Dropzone.version = "4.3.0";
	
	  Dropzone.options = {};
	
	  Dropzone.optionsForElement = function(element) {
	    if (element.getAttribute("id")) {
	      return Dropzone.options[camelize(element.getAttribute("id"))];
	    } else {
	      return void 0;
	    }
	  };
	
	  Dropzone.instances = [];
	
	  Dropzone.forElement = function(element) {
	    if (typeof element === "string") {
	      element = document.querySelector(element);
	    }
	    if ((element != null ? element.dropzone : void 0) == null) {
	      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
	    }
	    return element.dropzone;
	  };
	
	  Dropzone.autoDiscover = true;
	
	  Dropzone.discover = function() {
	    var checkElements, dropzone, dropzones, _i, _len, _results;
	    if (document.querySelectorAll) {
	      dropzones = document.querySelectorAll(".dropzone");
	    } else {
	      dropzones = [];
	      checkElements = function(elements) {
	        var el, _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = elements.length; _i < _len; _i++) {
	          el = elements[_i];
	          if (/(^| )dropzone($| )/.test(el.className)) {
	            _results.push(dropzones.push(el));
	          } else {
	            _results.push(void 0);
	          }
	        }
	        return _results;
	      };
	      checkElements(document.getElementsByTagName("div"));
	      checkElements(document.getElementsByTagName("form"));
	    }
	    _results = [];
	    for (_i = 0, _len = dropzones.length; _i < _len; _i++) {
	      dropzone = dropzones[_i];
	      if (Dropzone.optionsForElement(dropzone) !== false) {
	        _results.push(new Dropzone(dropzone));
	      } else {
	        _results.push(void 0);
	      }
	    }
	    return _results;
	  };
	
	  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];
	
	  Dropzone.isBrowserSupported = function() {
	    var capableBrowser, regex, _i, _len, _ref;
	    capableBrowser = true;
	    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
	      if (!("classList" in document.createElement("a"))) {
	        capableBrowser = false;
	      } else {
	        _ref = Dropzone.blacklistedBrowsers;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          regex = _ref[_i];
	          if (regex.test(navigator.userAgent)) {
	            capableBrowser = false;
	            continue;
	          }
	        }
	      }
	    } else {
	      capableBrowser = false;
	    }
	    return capableBrowser;
	  };
	
	  without = function(list, rejectedItem) {
	    var item, _i, _len, _results;
	    _results = [];
	    for (_i = 0, _len = list.length; _i < _len; _i++) {
	      item = list[_i];
	      if (item !== rejectedItem) {
	        _results.push(item);
	      }
	    }
	    return _results;
	  };
	
	  camelize = function(str) {
	    return str.replace(/[\-_](\w)/g, function(match) {
	      return match.charAt(1).toUpperCase();
	    });
	  };
	
	  Dropzone.createElement = function(string) {
	    var div;
	    div = document.createElement("div");
	    div.innerHTML = string;
	    return div.childNodes[0];
	  };
	
	  Dropzone.elementInside = function(element, container) {
	    if (element === container) {
	      return true;
	    }
	    while (element = element.parentNode) {
	      if (element === container) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  Dropzone.getElement = function(el, name) {
	    var element;
	    if (typeof el === "string") {
	      element = document.querySelector(el);
	    } else if (el.nodeType != null) {
	      element = el;
	    }
	    if (element == null) {
	      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
	    }
	    return element;
	  };
	
	  Dropzone.getElements = function(els, name) {
	    var e, el, elements, _i, _j, _len, _len1, _ref;
	    if (els instanceof Array) {
	      elements = [];
	      try {
	        for (_i = 0, _len = els.length; _i < _len; _i++) {
	          el = els[_i];
	          elements.push(this.getElement(el, name));
	        }
	      } catch (_error) {
	        e = _error;
	        elements = null;
	      }
	    } else if (typeof els === "string") {
	      elements = [];
	      _ref = document.querySelectorAll(els);
	      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
	        el = _ref[_j];
	        elements.push(el);
	      }
	    } else if (els.nodeType != null) {
	      elements = [els];
	    }
	    if (!((elements != null) && elements.length)) {
	      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
	    }
	    return elements;
	  };
	
	  Dropzone.confirm = function(question, accepted, rejected) {
	    if (window.confirm(question)) {
	      return accepted();
	    } else if (rejected != null) {
	      return rejected();
	    }
	  };
	
	  Dropzone.isValidFile = function(file, acceptedFiles) {
	    var baseMimeType, mimeType, validType, _i, _len;
	    if (!acceptedFiles) {
	      return true;
	    }
	    acceptedFiles = acceptedFiles.split(",");
	    mimeType = file.type;
	    baseMimeType = mimeType.replace(/\/.*$/, "");
	    for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
	      validType = acceptedFiles[_i];
	      validType = validType.trim();
	      if (validType.charAt(0) === ".") {
	        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
	          return true;
	        }
	      } else if (/\/\*$/.test(validType)) {
	        if (baseMimeType === validType.replace(/\/.*$/, "")) {
	          return true;
	        }
	      } else {
	        if (mimeType === validType) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };
	
	  if (typeof jQuery !== "undefined" && jQuery !== null) {
	    jQuery.fn.dropzone = function(options) {
	      return this.each(function() {
	        return new Dropzone(this, options);
	      });
	    };
	  }
	
	  if (typeof module !== "undefined" && module !== null) {
	    module.exports = Dropzone;
	  } else {
	    window.Dropzone = Dropzone;
	  }
	
	  Dropzone.ADDED = "added";
	
	  Dropzone.QUEUED = "queued";
	
	  Dropzone.ACCEPTED = Dropzone.QUEUED;
	
	  Dropzone.UPLOADING = "uploading";
	
	  Dropzone.PROCESSING = Dropzone.UPLOADING;
	
	  Dropzone.CANCELED = "canceled";
	
	  Dropzone.ERROR = "error";
	
	  Dropzone.SUCCESS = "success";
	
	
	  /*
	  
	  Bugfix for iOS 6 and 7
	  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
	  based on the work of https://github.com/stomita/ios-imagefile-megapixel
	   */
	
	  detectVerticalSquash = function(img) {
	    var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
	    iw = img.naturalWidth;
	    ih = img.naturalHeight;
	    canvas = document.createElement("canvas");
	    canvas.width = 1;
	    canvas.height = ih;
	    ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);
	    data = ctx.getImageData(0, 0, 1, ih).data;
	    sy = 0;
	    ey = ih;
	    py = ih;
	    while (py > sy) {
	      alpha = data[(py - 1) * 4 + 3];
	      if (alpha === 0) {
	        ey = py;
	      } else {
	        sy = py;
	      }
	      py = (ey + sy) >> 1;
	    }
	    ratio = py / ih;
	    if (ratio === 0) {
	      return 1;
	    } else {
	      return ratio;
	    }
	  };
	
	  drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
	    var vertSquashRatio;
	    vertSquashRatio = detectVerticalSquash(img);
	    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
	  };
	
	
	  /*
	   * contentloaded.js
	   *
	   * Author: Diego Perini (diego.perini at gmail.com)
	   * Summary: cross-browser wrapper for DOMContentLoaded
	   * Updated: 20101020
	   * License: MIT
	   * Version: 1.2
	   *
	   * URL:
	   * http://javascript.nwbox.com/ContentLoaded/
	   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	   */
	
	  contentLoaded = function(win, fn) {
	    var add, doc, done, init, poll, pre, rem, root, top;
	    done = false;
	    top = true;
	    doc = win.document;
	    root = doc.documentElement;
	    add = (doc.addEventListener ? "addEventListener" : "attachEvent");
	    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
	    pre = (doc.addEventListener ? "" : "on");
	    init = function(e) {
	      if (e.type === "readystatechange" && doc.readyState !== "complete") {
	        return;
	      }
	      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
	      if (!done && (done = true)) {
	        return fn.call(win, e.type || e);
	      }
	    };
	    poll = function() {
	      var e;
	      try {
	        root.doScroll("left");
	      } catch (_error) {
	        e = _error;
	        setTimeout(poll, 50);
	        return;
	      }
	      return init("poll");
	    };
	    if (doc.readyState !== "complete") {
	      if (doc.createEventObject && root.doScroll) {
	        try {
	          top = !win.frameElement;
	        } catch (_error) {}
	        if (top) {
	          poll();
	        }
	      }
	      doc[add](pre + "DOMContentLoaded", init, false);
	      doc[add](pre + "readystatechange", init, false);
	      return win[add](pre + "load", init, false);
	    }
	  };
	
	  Dropzone._autoDiscoverFunction = function() {
	    if (Dropzone.autoDiscover) {
	      return Dropzone.discover();
	    }
	  };
	
	  contentLoaded(window, Dropzone._autoDiscoverFunction);
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 15), __webpack_require__(/*! ./../../webpack/buildin/module.js */ 145)(module)))

/***/ }),

/***/ 319:
/*!*****************************************************!*\
  !*** ./saleor/static/dashboard/scss/dashboard.scss ***!
  \*****************************************************/
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 360:
/*!******************************!*\
  !*** ./~/hammerjs/hammer.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {
	  'use strict';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	
	var TYPE_FUNCTION = 'function';
	
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	
	    if (!obj) {
	        return;
	    }
	
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	
	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	
	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	
	    if (properties) {
	        assign(childP, properties);
	    }
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	
	    return results;
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	
	var COMPUTE_INTERVAL = 25;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	
	    this.init();
	
	}
	
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },
	
	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	
	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	
	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	
	    if (isFirst) {
	        manager.session = {};
	    }
	
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    // emit secret event
	    manager.emit('hammer.input', input);
	
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
	
	    computeIntervalInputData(session, input);
	
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;
	
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	
	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	
	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	
	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }
	
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	
	    Input.apply(this, arguments);
	}
	
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	
	        if (!this.started) {
	            return;
	        }
	
	        var touches = normalizeSingleTouches.call(this, ev, type);
	
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	
	    return [all, changed];
	}
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	
	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;
	
	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });
	
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	
	    if (!changedTargetTouches.length) {
	        return;
	    }
	
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	
	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;
	
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	
	    this.primaryTouch = null;
	    this.lastTouches = [];
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }
	
	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}
	
	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];
	
	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}
	
	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}
	
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();
	
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	
	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	
	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },
	
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
	
	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture
	
	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;
	
	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }
	
	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }
	
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	
	    return TOUCH_ACTION_AUTO;
	}
	
	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {
	
	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}
	
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});
	
	    this.id = uniqueId();
	
	    this.manager = null;
	
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	
	    this.state = STATE_POSSIBLE;
	
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },
	
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;
	
	        function emit(event) {
	            self.manager.emit(event, input);
	        }
	
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	
	        emit(self.options.event); // simple 'eventName' events
	
	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }
	
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },
	
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);
	
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        this.state = this.process(inputDataClone);
	
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line
	
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },
	
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};
	
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this.pX = null;
	    this.pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	
	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	
	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	
	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	
	    emit: function(input) {
	
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	
	        var direction = directionStr(input.direction);
	
	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	
	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	
	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;
	
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	
	    process: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	
	        this.reset();
	
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            this._input = input;
	
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';
	
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],
	
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	
	var STOP = 1;
	var FORCED_STOP = 2;
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});
	
	    this.options.inputTarget = this.options.inputTarget || element;
	
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	
	    toggleCssProps(this, true);
	
	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	
	        var recognizer;
	        var recognizers = this.recognizers;
	
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	
	        this.touchAction.update();
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	
	        recognizer = this.get(recognizer);
	
	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);
	
	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }
	
	        return this;
	    },
	
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	        if (handler === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);
	
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	
	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}
	
	})(window, document, 'Hammer');


/***/ }),

/***/ 369:
/*!**************************************************!*\
  !*** ./~/materialize-css/dist/js/materialize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_0__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(jQuery, $, __webpack_provided_window_dot_jQuery, _) {/*!
	 * Materialize v0.97.8 (http://materializecss.com)
	 * Copyright 2014-2015 Materialize
	 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
	 */
	// Check for jQuery.
	if (typeof(jQuery) === 'undefined') {
	  var jQuery;
	  // Check if require is a defined function.
	  if (true) {
	    jQuery = $ = __webpack_require__(/*! jquery */ 15);
	  // Else use the dollar sign alias.
	  } else {
	    jQuery = $;
	  }
	}
	;/*
	 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	 *
	 * Uses the built in easing capabilities added In jQuery 1.1
	 * to offer multiple easing options
	 *
	 * TERMS OF USE - jQuery Easing
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright © 2008 George McGinley Smith
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 * Redistributions of source code must retain the above copyright notice, this list of
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list
	 * of conditions and the following disclaimer in the documentation and/or other materials
	 * provided with the distribution.
	 *
	 * Neither the name of the author nor the names of contributors may be used to endorse
	 * or promote products derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
	 * OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	*/
	
	// t: current time, b: begInnIng value, c: change In value, d: duration
	jQuery.easing['jswing'] = jQuery.easing['swing'];
	
	jQuery.extend( jQuery.easing,
	{
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d) {
			if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	});
	
	/*
	 *
	 * TERMS OF USE - EASING EQUATIONS
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright © 2001 Robert Penner
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 * Redistributions of source code must retain the above copyright notice, this list of
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list
	 * of conditions and the following disclaimer in the documentation and/or other materials
	 * provided with the distribution.
	 *
	 * Neither the name of the author nor the names of contributors may be used to endorse
	 * or promote products derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
	 * OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */;    // Custom Easing
	    jQuery.extend( jQuery.easing,
	    {
	      easeInOutMaterial: function (x, t, b, c, d) {
	        if ((t/=d/2) < 1) return c/2*t*t + b;
	        return c/4*((t-=2)*t*t + 2) + b;
	      }
	    });
	
	;/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
	/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
	/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
	jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(e){function t(e){var t=e.length,a=r.type(e);return"function"===a||r.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===a||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!__webpack_provided_window_dot_jQuery){var r=function(e,t){return new r.fn.init(e,t)};r.isWindow=function(e){return null!=e&&e==e.window},r.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e},r.isArray=Array.isArray||function(e){return"array"===r.type(e)},r.isPlainObject=function(e){var t;if(!e||"object"!==r.type(e)||e.nodeType||r.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}for(t in e);return void 0===t||o.call(e,t)},r.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},r.data=function(e,t,n){if(void 0===n){var o=e[r.expando],i=o&&a[o];if(void 0===t)return i;if(i&&t in i)return i[t]}else if(void 0!==t){var o=e[r.expando]||(e[r.expando]=++r.uuid);return a[o]=a[o]||{},a[o][t]=n,n}},r.removeData=function(e,t){var n=e[r.expando],o=n&&a[n];o&&r.each(t,function(e,t){delete o[t]})},r.extend=function(){var e,t,a,n,o,i,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==r.type(s)&&(s={}),l===u&&(s=this,l--);u>l;l++)if(null!=(o=arguments[l]))for(n in o)e=s[n],a=o[n],s!==a&&(c&&a&&(r.isPlainObject(a)||(t=r.isArray(a)))?(t?(t=!1,i=e&&r.isArray(e)?e:[]):i=e&&r.isPlainObject(e)?e:{},s[n]=r.extend(c,i,a)):void 0!==a&&(s[n]=a));return s},r.queue=function(e,a,n){function o(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){a=(a||"fx")+"queue";var i=r.data(e,a);return n?(!i||r.isArray(n)?i=r.data(e,a,o(n)):i.push(n),i):i||[]}},r.dequeue=function(e,t){r.each(e.nodeType?[e]:e,function(e,a){t=t||"fx";var n=r.queue(a,t),o=n.shift();"inprogress"===o&&(o=n.shift()),o&&("fx"===t&&n.unshift("inprogress"),o.call(a,function(){r.dequeue(a,t)}))})},r.fn=r.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),a=this.offset(),n=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:r(e).offset();return a.top-=parseFloat(t.style.marginTop)||0,a.left-=parseFloat(t.style.marginLeft)||0,e.style&&(n.top+=parseFloat(e.style.borderTopWidth)||0,n.left+=parseFloat(e.style.borderLeftWidth)||0),{top:a.top-n.top,left:a.left-n.left}}};var a={};r.expando="velocity"+(new Date).getTime(),r.uuid=0;for(var n={},o=n.hasOwnProperty,i=n.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)n["[object "+s[l]+"]"]=s[l].toLowerCase();r.fn.init.prototype=r.fn,e.Velocity={Utilities:r}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return m.isWrapped(e)?e=[].slice.call(e):m.isNode(e)&&(e=[e]),e}function i(e){var t=f.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return m.isString(e)?b.Easings[e]||(r=!1):r=m.isArray(e)&&1===e.length?s.apply(null,e):m.isArray(e)&&2===e.length?x.apply(null,e.concat([t])):m.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=b.Easings[b.defaults.easing]?b.defaults.easing:v),r}function c(e){if(e){var t=(new Date).getTime(),r=b.State.calls.length;r>1e4&&(b.State.calls=n(b.State.calls));for(var o=0;r>o;o++)if(b.State.calls[o]){var s=b.State.calls[o],l=s[0],u=s[2],d=s[3],g=!!d,y=null;d||(d=b.State.calls[o][3]=t-16);for(var h=Math.min((t-d)/u.duration,1),v=0,x=l.length;x>v;v++){var P=l[v],V=P.element;if(i(V)){var C=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var T=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];f.each(T,function(e,t){S.setPropertyValue(V,"display",t)})}S.setPropertyValue(V,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&S.setPropertyValue(V,"visibility",u.visibility);for(var k in P)if("element"!==k){var A,F=P[k],j=m.isString(F.easing)?b.Easings[F.easing]:F.easing;if(1===h)A=F.endValue;else{var E=F.endValue-F.startValue;if(A=F.startValue+E*j(h,u,E),!g&&A===F.currentValue)continue}if(F.currentValue=A,"tween"===k)y=A;else{if(S.Hooks.registered[k]){var H=S.Hooks.getRoot(k),N=i(V).rootPropertyValueCache[H];N&&(F.rootPropertyValue=N)}var L=S.setPropertyValue(V,k,F.currentValue+(0===parseFloat(A)?"":F.unitType),F.rootPropertyValue,F.scrollData);S.Hooks.registered[k]&&(i(V).rootPropertyValueCache[H]=S.Normalizations.registered[H]?S.Normalizations.registered[H]("extract",null,L[1]):L[1]),"transform"===L[0]&&(C=!0)}}u.mobileHA&&i(V).transformCache.translate3d===a&&(i(V).transformCache.translate3d="(0px, 0px, 0px)",C=!0),C&&S.flushTransformCache(V)}}u.display!==a&&"none"!==u.display&&(b.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(b.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],h,Math.max(0,d+u.duration-t),d,y),1===h&&p(o)}}b.State.isTicking&&w(c)}function p(e,t){if(!b.State.calls[e])return!1;for(var r=b.State.calls[e][0],n=b.State.calls[e][1],o=b.State.calls[e][2],s=b.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&S.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&S.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&(f.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test(f.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var d=!1;f.each(S.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(d=!0,delete i(p).transformCache[t])}),o.mobileHA&&(d=!0,delete i(p).transformCache.translate3d),d&&S.flushTransformCache(p),S.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(g){setTimeout(function(){throw g},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&(f.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&f.dequeue(p,o.queue)}b.State.calls[e]=!1;for(var m=0,y=b.State.calls.length;y>m;m++)if(b.State.calls[m]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var f,d=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),g=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r,a=(new Date).getTime();return r=Math.max(0,16-(a-e)),e=a+r,setTimeout(function(){t(a+r)},r)}}(),m={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},y=!1;if(e.fn&&e.fn.jquery?(f=e,y=!0):f=t.Velocity.Utilities,8>=d&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=d)return void(jQuery.fn.velocity=jQuery.fn.animate);var h=400,v="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:f,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:h,easing:v,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){f.data(e,"velocity",{isSVG:m.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var x=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o,i,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,p=1e-4,f=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,l.tension=e,l.friction=t,o=null!==n,o?(c=a(e,t),i=c/n*f):i=f;s=r(s||l,i),u.push(1+s.x),c+=16,Math.abs(s.x)>p&&Math.abs(s.v)>p;);return o?function(e){return u[e*(u.length-1)|0]}:c}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},f.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var S=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<S.Lists.colors.length;e++){var t="color"===S.Lists.colors[e]?"0 0 0 1":"255 255 255 1";S.Hooks.templates[S.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(d)for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(S.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),S.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;S.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=S.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return S.RegEx.valueUnwrap.test(t)&&(t=t.match(S.RegEx.valueUnwrap)[1]),S.Values.isCSSNullValue(t)&&(t=S.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=S.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=S.Hooks.cleanRootPropertyValue(a,t),t.toString().match(S.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=S.Hooks.registered[e];if(a){var n,o,i=a[0],s=a[1];return r=S.Hooks.cleanRootPropertyValue(i,r),n=r.toString().match(S.RegEx.valueSplit),n[s]=t,o=n.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(S.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=d)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=d||b.State.isGingerbread||(S.Lists.transformsBase=S.Lists.transformsBase.concat(S.Lists.transforms3D));for(var e=0;e<S.Lists.transformsBase.length;e++)!function(){var t=S.Lists.transformsBase[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":b.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<S.Lists.colors.length;e++)!function(){var t=S.Lists.colors[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(S.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:S.RegEx.isHex.test(n)?i="rgb("+S.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=d||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=d?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=d?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(d||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),m.isString(b.State.prefixElement.style[n]))return b.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(r,function(e,t,r,a){return t+t+r+r+a+a}),t=a.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&S.setPropertyValue(e,"display","none")}var l=0;if(8>=d)l=f.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===S.getPropertyValue(e,"display")&&(u=!0,S.setPropertyValue(e,"display",S.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(S.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(S.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(S.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(S.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var g;g=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===d&&"filter"===r?g.getPropertyValue(r):g[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var m=s(e,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(r))&&(l=f(e).position()[r]+"px")}return l}var l;if(S.Hooks.registered[r]){var u=r,c=S.Hooks.getRoot(u);n===a&&(n=S.getPropertyValue(e,S.Names.prefixCheck(c)[0])),S.Normalizations.registered[c]&&(n=S.Normalizations.registered[c]("extract",e,n)),l=S.Hooks.extractValue(u,n)}else if(S.Normalizations.registered[r]){var p,g;p=S.Normalizations.registered[r]("name",e),"transform"!==p&&(g=s(e,S.Names.prefixCheck(p)[0]),S.Values.isCSSNullValue(g)&&S.Hooks.templates[r]&&(g=S.Hooks.templates[r][1])),l=S.Normalizations.registered[r]("extract",e,g)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(m){l=0}else l=e.getAttribute(r);else l=s(e,S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(S.Normalizations.registered[r]&&"transform"===S.Normalizations.registered[r]("name",e))S.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(S.Hooks.registered[r]){var l=r,u=S.Hooks.getRoot(r);n=n||S.getPropertyValue(e,u),a=S.Hooks.injectValue(l,a,n),r=u}if(S.Normalizations.registered[r]&&(a=S.Normalizations.registered[r]("inject",e,a),r=S.Normalizations.registered[r]("name",e)),s=S.Names.prefixCheck(r)[0],8>=d)try{e.style[s]=a}catch(c){b.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;b.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(S.getPropertyValue(e,t))}var r="";if((d||b.State.isAndroid&&!b.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};f.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;f.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===d&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}S.setPropertyValue(e,"transform",r)}};S.Hooks.register(),S.Normalizations.register(),b.hook=function(e,t,r){var n=a;return e=o(e),f.each(e,function(e,o){if(i(o)===a&&b.init(o),r===a)n===a&&(n=b.CSS.getPropertyValue(o,t));else{var s=b.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&b.CSS.flushTransformCache(o),n=s}}),n};var P=function(){function e(){return s?k.promise||null:l}function n(){function e(e){function p(e,t){var r=a,n=a,i=a;return m.isArray(e)?(r=e[0],!m.isArray(e[1])&&/^[\d-]/.test(e[1])||m.isFunction(e[1])||S.RegEx.isHex.test(e[1])?i=e[1]:(m.isString(e[1])&&!S.RegEx.isHex.test(e[1])||m.isArray(e[1]))&&(n=t?e[1]:u(e[1],s.duration),e[2]!==a&&(i=e[2]))):r=e,t||(n=n||s.easing),m.isFunction(r)&&(r=r.call(o,V,w)),m.isFunction(i)&&(i=i.call(o,V,w)),[r||0,n,i]}function d(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=S.Values.getUnitType(e)),[a,r]}function h(){var e={myParent:o.parentNode||r.body,position:S.getPropertyValue(o,"position"),fontSize:S.getPropertyValue(o,"fontSize")},a=e.position===L.lastPosition&&e.myParent===L.lastParent,n=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(n&&a)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=i(o).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");b.init(u),e.myParent.appendChild(u),f.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(u,t,"hidden")}),b.CSS.setPropertyValue(u,"position",e.position),b.CSS.setPropertyValue(u,"fontSize",e.fontSize),b.CSS.setPropertyValue(u,"boxSizing","content-box"),f.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(u,t,s+"%")}),b.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(S.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(S.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(S.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(S.getPropertyValue(r.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(s.begin&&0===V)try{s.begin.call(g,g)}catch(x){setTimeout(function(){throw x},1)}if("scroll"===A){var P,C,T,F=/^x$/i.test(s.axis)?"Left":"Top",j=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,P=s.container["scroll"+F],T=P+f(o).position()[F.toLowerCase()]+j):s.container=null:(P=b.State.scrollAnchor[b.State["scrollProperty"+F]],C=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===F?"Top":"Left")]],T=f(o).offset()[F.toLowerCase()]+j),l={scroll:{rootPropertyValue:!1,startValue:P,currentValue:P,endValue:T,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:F,alternateValue:C}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===A){if(!i(o).tweensContainer)return void f.dequeue(o,s.queue);"none"===i(o).opts.display&&(i(o).opts.display="auto"),"hidden"===i(o).opts.visibility&&(i(o).opts.visibility="visible"),i(o).opts.loop=!1,i(o).opts.begin=null,i(o).opts.complete=null,v.easing||delete s.easing,v.duration||delete s.duration,s=f.extend({},i(o).opts,s);var E=f.extend(!0,{},i(o).tweensContainer);for(var H in E)if("element"!==H){var N=E[H].startValue;E[H].startValue=E[H].currentValue=E[H].endValue,E[H].endValue=N,m.isEmptyObject(v)||(E[H].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+H+"): "+JSON.stringify(E[H]),o)}l=E}else if("start"===A){var E;i(o).tweensContainer&&i(o).isAnimating===!0&&(E=i(o).tweensContainer),f.each(y,function(e,t){if(RegExp("^"+S.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(S.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=S.Values.hexToRgb(n),u=i?S.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),y[e+s[c]]=f}delete y[e]}}});for(var z in y){var O=p(y[z]),q=O[0],$=O[1],M=O[2];z=S.Names.camelCase(z);var I=S.Hooks.getRoot(z),B=!1;if(i(o).isSVG||"tween"===I||S.Names.prefixCheck(I)[1]!==!1||S.Normalizations.registered[I]!==a){(s.display!==a&&null!==s.display&&"none"!==s.display||s.visibility!==a&&"hidden"!==s.visibility)&&/opacity|filter/.test(z)&&!M&&0!==q&&(M=0),s._cacheValues&&E&&E[z]?(M===a&&(M=E[z].endValue+E[z].unitType),B=i(o).rootPropertyValueCache[I]):S.Hooks.registered[z]?M===a?(B=S.getPropertyValue(o,I),M=S.getPropertyValue(o,z,B)):B=S.Hooks.templates[I][1]:M===a&&(M=S.getPropertyValue(o,z));var W,G,Y,D=!1;if(W=d(z,M),M=W[0],Y=W[1],W=d(z,q),q=W[0].replace(/^([+-\/*])=/,function(e,t){return D=t,""}),G=W[1],M=parseFloat(M)||0,q=parseFloat(q)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(z)?(q/=100,G="em"):/^scale/.test(z)?(q/=100,G=""):/(Red|Green|Blue)$/i.test(z)&&(q=q/100*255,G="")),/[\/*]/.test(D))G=Y;else if(Y!==G&&0!==M)if(0===q)G=Y;else{n=n||h();var Q=/margin|padding|left|right|width|text|word|letter/i.test(z)||/X$/.test(z)||"x"===z?"x":"y";switch(Y){case"%":M*="x"===Q?n.percentToPxWidth:n.percentToPxHeight;break;case"px":break;default:M*=n[Y+"ToPx"]}switch(G){case"%":M*=1/("x"===Q?n.percentToPxWidth:n.percentToPxHeight);break;case"px":break;default:M*=1/n[G+"ToPx"]}}switch(D){case"+":q=M+q;break;case"-":q=M-q;break;case"*":q=M*q;break;case"/":q=M/q}l[z]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:q,unitType:G,easing:$},b.debug&&console.log("tweensContainer ("+z+"): "+JSON.stringify(l[z]),o)}else b.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}l.element=o}l.element&&(S.Values.addClass(o,"velocity-animating"),R.push(l),""===s.queue&&(i(o).tweensContainer=l,i(o).opts=s),i(o).isAnimating=!0,V===w-1?(b.State.calls.push([R,g,s,null,k.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,c())):V++)}var n,o=this,s=f.extend({},b.defaults,v),l={};switch(i(o)===a&&b.init(o),parseFloat(s.delay)&&s.queue!==!1&&f.queue(o,s.queue,function(e){b.velocityQueueEntryFlag=!0,i(o).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=h;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==a&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(o))),s.visibility!==a&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():f.queue(o,s.queue,function(t,r){return r===!0?(k.promise&&k.resolver(g),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===f.queue(o)[0]||f.dequeue(o)}var s,l,d,g,y,v,x=arguments[0]&&(arguments[0].p||f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,d=0,g=this,l=this):(s=!0,d=1,g=x?arguments[0].elements||arguments[0].e:arguments[0]),g=o(g)){x?(y=arguments[0].properties||arguments[0].p,v=arguments[0].options||arguments[0].o):(y=arguments[d],v=arguments[d+1]);var w=g.length,V=0;if(!/^(stop|finish)$/i.test(y)&&!f.isPlainObject(v)){var C=d+1;v={};for(var T=C;T<arguments.length;T++)m.isArray(arguments[T])||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T])?m.isString(arguments[T])||m.isArray(arguments[T])?v.easing=arguments[T]:m.isFunction(arguments[T])&&(v.complete=arguments[T]):v.duration=arguments[T]}var k={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(k.promise=new b.Promise(function(e,t){k.resolver=e,k.rejecter=t}));var A;switch(y){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"finish":case"stop":f.each(g,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var F=[];return f.each(b.State.calls,function(e,t){t&&f.each(t[1],function(r,n){var o=v===a?"":v;return o===!0||t[2].queue===o||v===a&&t[2].queue===!1?void f.each(g,function(r,a){a===n&&((v===!0||m.isString(v))&&(f.each(f.queue(a,m.isString(v)?v:""),function(e,t){
	m.isFunction(t)&&t(null,!0)}),f.queue(a,m.isString(v)?v:"",[])),"stop"===y?(i(a)&&i(a).tweensContainer&&o!==!1&&f.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue}),F.push(e)):"finish"===y&&(t[2].duration=1))}):!0})}),"stop"===y&&(f.each(F,function(e,t){p(t,!0)}),k.promise&&k.resolver(g)),e();default:if(!f.isPlainObject(y)||m.isEmptyObject(y)){if(m.isString(y)&&b.Redirects[y]){var j=f.extend({},v),E=j.duration,H=j.delay||0;return j.backwards===!0&&(g=f.extend(!0,[],g).reverse()),f.each(g,function(e,t){parseFloat(j.stagger)?j.delay=H+parseFloat(j.stagger)*e:m.isFunction(j.stagger)&&(j.delay=H+j.stagger.call(t,e,w)),j.drag&&(j.duration=parseFloat(E)||(/^(callout|transition)/.test(y)?1e3:h),j.duration=Math.max(j.duration*(j.backwards?1-e/w:(e+1)/w),.75*j.duration,200)),b.Redirects[y].call(t,t,j||{},e,w,g,k.promise?k:a)}),e()}var N="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise?k.rejecter(new Error(N)):console.log(N),e()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},R=[];f.each(g,function(e,t){m.isNode(t)&&n.call(t)});var z,j=f.extend({},b.defaults,v);if(j.loop=parseInt(j.loop),z=2*j.loop-1,j.loop)for(var O=0;z>O;O++){var q={delay:j.delay,progress:j.progress};O===z-1&&(q.display=j.display,q.visibility=j.visibility,q.complete=j.complete),P(g,"reverse",q)}return e()}};b=f.extend(P,b),b.animate=P;var w=t.requestAnimationFrame||g;return b.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(w=function(e){return setTimeout(function(){e(!0)},16)},c()):w=t.requestAnimationFrame||g}),e.Velocity=b,e!==t&&(e.fn.velocity=P,e.fn.velocity.defaults=b.defaults),f.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},d={};l.display===a&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){d[r]=e.style[r];var a=b.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}d.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in d)e.style[t]=d[t];c&&c.call(i,i),s&&s.resolver(i)},b(e,p,l)}}),f.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),b(this,u,l)}}),b}(__webpack_provided_window_dot_jQuery||window.Zepto||window,window,document)}));
	;!function(a,b,c,d){"use strict";function k(a,b,c){return setTimeout(q(a,c),b)}function l(a,b,c){return Array.isArray(a)?(m(a,c[b],c),!0):!1}function m(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function n(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function o(a,b){return n(a,b,!0)}function p(a,b,c){var e,d=b.prototype;e=a.prototype=Object.create(d),e.constructor=a,e._super=d,c&&n(e,c)}function q(a,b){return function(){return a.apply(b,arguments)}}function r(a,b){return typeof a==g?a.apply(b?b[0]||d:d,b):a}function s(a,b){return a===d?b:a}function t(a,b,c){m(x(b),function(b){a.addEventListener(b,c,!1)})}function u(a,b,c){m(x(b),function(b){a.removeEventListener(b,c,!1)})}function v(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function w(a,b){return a.indexOf(b)>-1}function x(a){return a.trim().split(/\s+/g)}function y(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function z(a){return Array.prototype.slice.call(a,0)}function A(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];y(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function B(a,b){for(var c,f,g=b[0].toUpperCase()+b.slice(1),h=0;h<e.length;){if(c=e[h],f=c?c+g:b,f in a)return f;h++}return d}function D(){return C++}function E(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function ab(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){r(a.options.enable,[a])&&c.handler(b)},this.init()}function bb(a){var b,c=a.options.inputClass;return b=c?c:H?wb:I?Eb:G?Gb:rb,new b(a,cb)}function cb(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&O&&0===d-e,g=b&(Q|R)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,db(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function db(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=gb(b)),e>1&&!c.firstMultiple?c.firstMultiple=gb(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=hb(d);b.timeStamp=j(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=lb(h,i),b.distance=kb(h,i),eb(c,b),b.offsetDirection=jb(b.deltaX,b.deltaY),b.scale=g?nb(g.pointers,d):1,b.rotation=g?mb(g.pointers,d):0,fb(c,b);var k=a.element;v(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function eb(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===O||f.eventType===Q)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function fb(a,b){var f,g,h,j,c=a.lastInterval||b,e=b.timeStamp-c.timeStamp;if(b.eventType!=R&&(e>N||c.velocity===d)){var k=c.deltaX-b.deltaX,l=c.deltaY-b.deltaY,m=ib(e,k,l);g=m.x,h=m.y,f=i(m.x)>i(m.y)?m.x:m.y,j=jb(k,l),a.lastInterval=b}else f=c.velocity,g=c.velocityX,h=c.velocityY,j=c.direction;b.velocity=f,b.velocityX=g,b.velocityY=h,b.direction=j}function gb(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:h(a.pointers[c].clientX),clientY:h(a.pointers[c].clientY)},c++;return{timeStamp:j(),pointers:b,center:hb(b),deltaX:a.deltaX,deltaY:a.deltaY}}function hb(a){var b=a.length;if(1===b)return{x:h(a[0].clientX),y:h(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:h(c/b),y:h(d/b)}}function ib(a,b,c){return{x:b/a||0,y:c/a||0}}function jb(a,b){return a===b?S:i(a)>=i(b)?a>0?T:U:b>0?V:W}function kb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function lb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function mb(a,b){return lb(b[1],b[0],_)-lb(a[1],a[0],_)}function nb(a,b){return kb(b[0],b[1],_)/kb(a[0],a[1],_)}function rb(){this.evEl=pb,this.evWin=qb,this.allow=!0,this.pressed=!1,ab.apply(this,arguments)}function wb(){this.evEl=ub,this.evWin=vb,ab.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function Ab(){this.evTarget=yb,this.evWin=zb,this.started=!1,ab.apply(this,arguments)}function Bb(a,b){var c=z(a.touches),d=z(a.changedTouches);return b&(Q|R)&&(c=A(c.concat(d),"identifier",!0)),[c,d]}function Eb(){this.evTarget=Db,this.targetIds={},ab.apply(this,arguments)}function Fb(a,b){var c=z(a.touches),d=this.targetIds;if(b&(O|P)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=z(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return v(a.target,i)}),b===O)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Q|R)&&delete d[g[e].identifier],e++;return h.length?[A(f.concat(h),"identifier",!0),h]:void 0}function Gb(){ab.apply(this,arguments);var a=q(this.handler,this);this.touch=new Eb(this.manager,a),this.mouse=new rb(this.manager,a)}function Pb(a,b){this.manager=a,this.set(b)}function Qb(a){if(w(a,Mb))return Mb;var b=w(a,Nb),c=w(a,Ob);return b&&c?Nb+" "+Ob:b||c?b?Nb:Ob:w(a,Lb)?Lb:Kb}function Yb(a){this.id=D(),this.manager=null,this.options=o(a||{},this.defaults),this.options.enable=s(this.options.enable,!0),this.state=Rb,this.simultaneous={},this.requireFail=[]}function Zb(a){return a&Wb?"cancel":a&Ub?"end":a&Tb?"move":a&Sb?"start":""}function $b(a){return a==W?"down":a==V?"up":a==T?"left":a==U?"right":""}function _b(a,b){var c=b.manager;return c?c.get(a):a}function ac(){Yb.apply(this,arguments)}function bc(){ac.apply(this,arguments),this.pX=null,this.pY=null}function cc(){ac.apply(this,arguments)}function dc(){Yb.apply(this,arguments),this._timer=null,this._input=null}function ec(){ac.apply(this,arguments)}function fc(){ac.apply(this,arguments)}function gc(){Yb.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function hc(a,b){return b=b||{},b.recognizers=s(b.recognizers,hc.defaults.preset),new kc(a,b)}function kc(a,b){b=b||{},this.options=o(b,hc.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=bb(this),this.touchAction=new Pb(this,this.options.touchAction),lc(this,!0),m(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function lc(a,b){var c=a.element;m(a.options.cssProps,function(a,d){c.style[B(c.style,d)]=b?a:""})}function mc(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var e=["","webkit","moz","MS","ms","o"],f=b.createElement("div"),g="function",h=Math.round,i=Math.abs,j=Date.now,C=1,F=/mobile|tablet|ip(ad|hone|od)|android/i,G="ontouchstart"in a,H=B(a,"PointerEvent")!==d,I=G&&F.test(navigator.userAgent),J="touch",K="pen",L="mouse",M="kinect",N=25,O=1,P=2,Q=4,R=8,S=1,T=2,U=4,V=8,W=16,X=T|U,Y=V|W,Z=X|Y,$=["x","y"],_=["clientX","clientY"];ab.prototype={handler:function(){},init:function(){this.evEl&&t(this.element,this.evEl,this.domHandler),this.evTarget&&t(this.target,this.evTarget,this.domHandler),this.evWin&&t(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(E(this.element),this.evWin,this.domHandler)}};var ob={mousedown:O,mousemove:P,mouseup:Q},pb="mousedown",qb="mousemove mouseup";p(rb,ab,{handler:function(a){var b=ob[a.type];b&O&&0===a.button&&(this.pressed=!0),b&P&&1!==a.which&&(b=Q),this.pressed&&this.allow&&(b&Q&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:L,srcEvent:a}))}});var sb={pointerdown:O,pointermove:P,pointerup:Q,pointercancel:R,pointerout:R},tb={2:J,3:K,4:L,5:M},ub="pointerdown",vb="pointermove pointerup pointercancel";a.MSPointerEvent&&(ub="MSPointerDown",vb="MSPointerMove MSPointerUp MSPointerCancel"),p(wb,ab,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=sb[d],f=tb[a.pointerType]||a.pointerType,g=f==J,h=y(b,a.pointerId,"pointerId");e&O&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Q|R)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var xb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},yb="touchstart",zb="touchstart touchmove touchend touchcancel";p(Ab,ab,{handler:function(a){var b=xb[a.type];if(b===O&&(this.started=!0),this.started){var c=Bb.call(this,a,b);b&(Q|R)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}});var Cb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},Db="touchstart touchmove touchend touchcancel";p(Eb,ab,{handler:function(a){var b=Cb[a.type],c=Fb.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}),p(Gb,ab,{handler:function(a,b,c){var d=c.pointerType==J,e=c.pointerType==L;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Q|R)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Hb=B(f.style,"touchAction"),Ib=Hb!==d,Jb="compute",Kb="auto",Lb="manipulation",Mb="none",Nb="pan-x",Ob="pan-y";Pb.prototype={set:function(a){a==Jb&&(a=this.compute()),Ib&&(this.manager.element.style[Hb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return m(this.manager.recognizers,function(b){r(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),Qb(a.join(" "))},preventDefaults:function(a){if(!Ib){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return b.preventDefault(),void 0;var d=this.actions,e=w(d,Mb),f=w(d,Ob),g=w(d,Nb);return e||f&&c&X||g&&c&Y?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var Rb=1,Sb=2,Tb=4,Ub=8,Vb=Ub,Wb=16,Xb=32;Yb.prototype={defaults:{},set:function(a){return n(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(l(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_b(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return l(a,"dropRecognizeWith",this)?this:(a=_b(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(l(a,"requireFailure",this))return this;var b=this.requireFail;return a=_b(a,this),-1===y(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(l(a,"dropRequireFailure",this))return this;a=_b(a,this);var b=y(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function d(d){b.manager.emit(b.options.event+(d?Zb(c):""),a)}var b=this,c=this.state;Ub>c&&d(!0),d(),c>=Ub&&d(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):(this.state=Xb,void 0)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(Xb|Rb)))return!1;a++}return!0},recognize:function(a){var b=n({},a);return r(this.options.enable,[this,b])?(this.state&(Vb|Wb|Xb)&&(this.state=Rb),this.state=this.process(b),this.state&(Sb|Tb|Ub|Wb)&&this.tryEmit(b),void 0):(this.reset(),this.state=Xb,void 0)},process:function(){},getTouchAction:function(){},reset:function(){}},p(ac,Yb,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(Sb|Tb),e=this.attrTest(a);return d&&(c&R||!e)?b|Wb:d||e?c&Q?b|Ub:b&Sb?b|Tb:Sb:Xb}}),p(bc,ac,{defaults:{event:"pan",threshold:10,pointers:1,direction:Z},getTouchAction:function(){var a=this.options.direction,b=[];return a&X&&b.push(Ob),a&Y&&b.push(Nb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&X?(e=0===f?S:0>f?T:U,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?S:0>g?V:W,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return ac.prototype.attrTest.call(this,a)&&(this.state&Sb||!(this.state&Sb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),p(cc,ac,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&Sb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),p(dc,Yb,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Kb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Q|R)&&!e)this.reset();else if(a.eventType&O)this.reset(),this._timer=k(function(){this.state=Vb,this.tryEmit()},b.time,this);else if(a.eventType&Q)return Vb;return Xb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===Vb&&(a&&a.eventType&Q?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=j(),this.manager.emit(this.options.event,this._input)))}}),p(ec,ac,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&Sb)}}),p(fc,ac,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:X|Y,pointers:1},getTouchAction:function(){return bc.prototype.getTouchAction.call(this)},attrTest:function(a){var c,b=this.options.direction;return b&(X|Y)?c=a.velocity:b&X?c=a.velocityX:b&Y&&(c=a.velocityY),this._super.attrTest.call(this,a)&&b&a.direction&&a.distance>this.options.threshold&&i(c)>this.options.velocity&&a.eventType&Q},emit:function(a){var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),p(gc,Yb,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Lb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime<b.time;if(this.reset(),a.eventType&O&&0===this.count)return this.failTimeout();if(d&&e&&c){if(a.eventType!=Q)return this.failTimeout();var f=this.pTime?a.timeStamp-this.pTime<b.interval:!0,g=!this.pCenter||kb(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,g&&f?this.count+=1:this.count=1,this._input=a;var h=this.count%b.taps;if(0===h)return this.hasRequireFailures()?(this._timer=k(function(){this.state=Vb,this.tryEmit()},b.interval,this),Sb):Vb}return Xb},failTimeout:function(){return this._timer=k(function(){this.state=Xb},this.options.interval,this),Xb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Vb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),hc.VERSION="2.0.4",hc.defaults={domEvents:!1,touchAction:Jb,enable:!0,inputTarget:null,inputClass:null,preset:[[ec,{enable:!1}],[cc,{enable:!1},["rotate"]],[fc,{direction:X}],[bc,{direction:X},["swipe"]],[gc],[gc,{event:"doubletap",taps:2},["tap"]],[dc]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ic=1,jc=2;kc.prototype={set:function(a){return n(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?jc:ic},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&Vb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===jc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(Sb|Tb|Ub)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Yb)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(l(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(l(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(y(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return m(x(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return m(x(a),function(a){b?c[a].splice(y(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&mc(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&lc(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},n(hc,{INPUT_START:O,INPUT_MOVE:P,INPUT_END:Q,INPUT_CANCEL:R,STATE_POSSIBLE:Rb,STATE_BEGAN:Sb,STATE_CHANGED:Tb,STATE_ENDED:Ub,STATE_RECOGNIZED:Vb,STATE_CANCELLED:Wb,STATE_FAILED:Xb,DIRECTION_NONE:S,DIRECTION_LEFT:T,DIRECTION_RIGHT:U,DIRECTION_UP:V,DIRECTION_DOWN:W,DIRECTION_HORIZONTAL:X,DIRECTION_VERTICAL:Y,DIRECTION_ALL:Z,Manager:kc,Input:ab,TouchAction:Pb,TouchInput:Eb,MouseInput:rb,PointerEventInput:wb,TouchMouseInput:Gb,SingleTouchInput:Ab,Recognizer:Yb,AttrRecognizer:ac,Tap:gc,Pan:bc,Swipe:fc,Pinch:cc,Rotate:ec,Press:dc,on:t,off:u,each:m,merge:o,extend:n,inherit:p,bindFn:q,prefixed:B}),"function"==g&&__webpack_require__(/*! !webpack amd options */ 433)?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return hc}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=hc:a[c]=hc}(window,document,"Hammer");;(function(factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 15), __webpack_require__(/*! hammerjs */ 360)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        factory(require('jquery'), require('hammerjs'));
	    } else {
	        factory(jQuery, Hammer);
	    }
	}(function($, Hammer) {
	    function hammerify(el, options) {
	        var $el = $(el);
	        if(!$el.data("hammer")) {
	            $el.data("hammer", new Hammer($el[0], options));
	        }
	    }
	
	    $.fn.hammer = function(options) {
	        return this.each(function() {
	            hammerify(this, options);
	        });
	    };
	
	    // extend the emit method to also trigger jQuery events
	    Hammer.Manager.prototype.emit = (function(originalEmit) {
	        return function(type, data) {
	            originalEmit.call(this, type, data);
	            $(this.element).trigger({
	                type: type,
	                gesture: data
	            });
	        };
	    })(Hammer.Manager.prototype.emit);
	}));
	;// Required for Meteor package, the use of window prevents export by Meteor
	(function(window){
	  if(window.Package){
	    Materialize = {};
	  } else {
	    window.Materialize = {};
	  }
	})(window);
	
	
	/*
	 * raf.js
	 * https://github.com/ngryman/raf.js
	 *
	 * original requestAnimationFrame polyfill by Erik Möller
	 * inspired from paul_irish gist and post
	 *
	 * Copyright (c) 2013 ngryman
	 * Licensed under the MIT license.
	 */
	(function(window) {
	  var lastTime = 0,
	    vendors = ['webkit', 'moz'],
	    requestAnimationFrame = window.requestAnimationFrame,
	    cancelAnimationFrame = window.cancelAnimationFrame,
	    i = vendors.length;
	
	  // try to un-prefix existing raf
	  while (--i >= 0 && !requestAnimationFrame) {
	    requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
	    cancelAnimationFrame = window[vendors[i] + 'CancelRequestAnimationFrame'];
	  }
	
	  // polyfill with setTimeout fallback
	  // heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
	  if (!requestAnimationFrame || !cancelAnimationFrame) {
	    requestAnimationFrame = function(callback) {
	      var now = +Date.now(),
	        nextTime = Math.max(lastTime + 16, now);
	      return setTimeout(function() {
	        callback(lastTime = nextTime);
	      }, nextTime - now);
	    };
	
	    cancelAnimationFrame = clearTimeout;
	  }
	
	  // export to window
	  window.requestAnimationFrame = requestAnimationFrame;
	  window.cancelAnimationFrame = cancelAnimationFrame;
	}(window));
	
	
	// Unique ID
	Materialize.guid = (function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return function() {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	           s4() + '-' + s4() + s4() + s4();
	  };
	})();
	
	/**
	 * Escapes hash from special characters
	 * @param {string} hash  String returned from this.hash
	 * @returns {string}
	 */
	Materialize.escapeHash = function(hash) {
	  return hash.replace( /(:|\.|\[|\]|,|=)/g, "\\$1" );
	};
	
	Materialize.elementOrParentIsFixed = function(element) {
	    var $element = $(element);
	    var $checkElements = $element.add($element.parents());
	    var isFixed = false;
	    $checkElements.each(function(){
	        if ($(this).css("position") === "fixed") {
	            isFixed = true;
	            return false;
	        }
	    });
	    return isFixed;
	};
	
	// Velocity has conflicts when loaded with jQuery, this will check for it
	// First, check if in noConflict mode
	var Vel;
	if (jQuery) {
	  Vel = jQuery.Velocity;
	} else if ($) {
	  Vel = $.Velocity;
	} else {
	  Vel = Velocity;
	}
	;(function ($) {
	  $.fn.collapsible = function(options) {
	    var defaults = {
	      accordion: undefined,
	      onOpen: undefined,
	      onClose: undefined
	    };
	
	    options = $.extend(defaults, options);
	
	
	    return this.each(function() {
	
	      var $this = $(this);
	
	      var $panel_headers = $(this).find('> li > .collapsible-header');
	
	      var collapsible_type = $this.data("collapsible");
	
	      // Turn off any existing event handlers
	      $this.off('click.collapse', '> li > .collapsible-header');
	      $panel_headers.off('click.collapse');
	
	
	      /****************
	      Helper Functions
	      ****************/
	
	      // Accordion Open
	      function accordionOpen(object) {
	        $panel_headers = $this.find('> li > .collapsible-header');
	        if (object.hasClass('active')) {
	          object.parent().addClass('active');
	        }
	        else {
	          object.parent().removeClass('active');
	        }
	        if (object.parent().hasClass('active')){
	          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
	        }
	        else{
	          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
	        }
	
	        $panel_headers.not(object).removeClass('active').parent().removeClass('active');
	
	        // Close previously open accordion elements.
	        $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).each(function() {
	          if ($(this).is(':visible')) {
	            $(this).slideUp({
	              duration: 350,
	              easing: "easeOutQuart",
	              queue: false,
	              complete:
	                function() {
	                  $(this).css('height', '');
	                  execCallbacks($(this).siblings('.collapsible-header'));
	                }
	            });
	          }
	        });
	      }
	
	      // Expandable Open
	      function expandableOpen(object) {
	        if (object.hasClass('active')) {
	          object.parent().addClass('active');
	        }
	        else {
	          object.parent().removeClass('active');
	        }
	        if (object.parent().hasClass('active')){
	          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
	        }
	        else {
	          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
	        }
	      }
	
	      // Open collapsible. object: .collapsible-header
	      function collapsibleOpen(object) {
	        if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
	          accordionOpen(object);
	        } else { // Handle Expandables
	          expandableOpen(object);
	        }
	
	        execCallbacks(object);
	      }
	
	      // Handle callbacks
	      function execCallbacks(object) {
	        if (object.hasClass('active')) {
	          if (typeof(options.onOpen) === "function") {
	            options.onOpen.call(this, object.parent());
	          }
	        } else {
	          if (typeof(options.onClose) === "function") {
	            options.onClose.call(this, object.parent());
	          }
	        }
	      }
	
	      /**
	       * Check if object is children of panel header
	       * @param  {Object}  object Jquery object
	       * @return {Boolean} true if it is children
	       */
	      function isChildrenOfPanelHeader(object) {
	
	        var panelHeader = getPanelHeader(object);
	
	        return panelHeader.length > 0;
	      }
	
	      /**
	       * Get panel header from a children element
	       * @param  {Object} object Jquery object
	       * @return {Object} panel header object
	       */
	      function getPanelHeader(object) {
	
	        return object.closest('li > .collapsible-header');
	      }
	
	      /*****  End Helper Functions  *****/
	
	
	
	      // Add click handler to only direct collapsible header children
	      $this.on('click.collapse', '> li > .collapsible-header', function(e) {
	        var element = $(e.target);
	
	        if (isChildrenOfPanelHeader(element)) {
	          element = getPanelHeader(element);
	        }
	
	        element.toggleClass('active');
	
	        collapsibleOpen(element);
	      });
	
	
	      // Open first active
	      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
	        collapsibleOpen($panel_headers.filter('.active').first());
	
	      } else { // Handle Expandables
	        $panel_headers.filter('.active').each(function() {
	          collapsibleOpen($(this));
	        });
	      }
	
	    });
	  };
	
	  $(document).ready(function(){
	    $('.collapsible').collapsible();
	  });
	}( jQuery ));;(function ($) {
	
	  // Add posibility to scroll to selected option
	  // usefull for select for example
	  $.fn.scrollTo = function(elem) {
	    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
	    return this;
	  };
	
	  $.fn.dropdown = function (options) {
	    var defaults = {
	      inDuration: 300,
	      outDuration: 225,
	      constrain_width: true, // Constrains width of dropdown to the activator
	      hover: false,
	      gutter: 0, // Spacing from edge
	      belowOrigin: false,
	      alignment: 'left',
	      stopPropagation: false
	    };
	
	    // Open dropdown.
	    if (options === "open") {
	      this.each(function() {
	        $(this).trigger('open');
	      });
	      return false;
	    }
	
	    // Close dropdown.
	    if (options === "close") {
	      this.each(function() {
	        $(this).trigger('close');
	      });
	      return false;
	    }
	
	    this.each(function(){
	      var origin = $(this);
	      var curr_options = $.extend({}, defaults, options);
	      var isFocused = false;
	
	      // Dropdown menu
	      var activates = $("#"+ origin.attr('data-activates'));
	
	      function updateOptions() {
	        if (origin.data('induration') !== undefined)
	          curr_options.inDuration = origin.data('induration');
	        if (origin.data('outduration') !== undefined)
	          curr_options.outDuration = origin.data('outduration');
	        if (origin.data('constrainwidth') !== undefined)
	          curr_options.constrain_width = origin.data('constrainwidth');
	        if (origin.data('hover') !== undefined)
	          curr_options.hover = origin.data('hover');
	        if (origin.data('gutter') !== undefined)
	          curr_options.gutter = origin.data('gutter');
	        if (origin.data('beloworigin') !== undefined)
	          curr_options.belowOrigin = origin.data('beloworigin');
	        if (origin.data('alignment') !== undefined)
	          curr_options.alignment = origin.data('alignment');
	        if (origin.data('stoppropagation') !== undefined)
	          curr_options.stopPropagation = origin.data('stoppropagation');
	      }
	
	      updateOptions();
	
	      // Attach dropdown to its activator
	      origin.after(activates);
	
	      /*
	        Helper function to position and resize dropdown.
	        Used in hover and click handler.
	      */
	      function placeDropdown(eventType) {
	        // Check for simultaneous focus and click events.
	        if (eventType === 'focus') {
	          isFocused = true;
	        }
	
	        // Check html data attributes
	        updateOptions();
	
	        // Set Dropdown state
	        activates.addClass('active');
	        origin.addClass('active');
	
	        // Constrain width
	        if (curr_options.constrain_width === true) {
	          activates.css('width', origin.outerWidth());
	
	        } else {
	          activates.css('white-space', 'nowrap');
	        }
	
	        // Offscreen detection
	        var windowHeight = window.innerHeight;
	        var originHeight = origin.innerHeight();
	        var offsetLeft = origin.offset().left;
	        var offsetTop = origin.offset().top - $(window).scrollTop();
	        var currAlignment = curr_options.alignment;
	        var gutterSpacing = 0;
	        var leftPosition = 0;
	
	        // Below Origin
	        var verticalOffset = 0;
	        if (curr_options.belowOrigin === true) {
	          verticalOffset = originHeight;
	        }
	
	        // Check for scrolling positioned container.
	        var scrollYOffset = 0;
	        var scrollXOffset = 0;
	        var wrapper = origin.parent();
	        if (!wrapper.is('body')) {
	          if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
	            scrollYOffset = wrapper[0].scrollTop;
	          }
	          if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
	            scrollXOffset = wrapper[0].scrollLeft;
	          }
	        }
	
	
	        if (offsetLeft + activates.innerWidth() > $(window).width()) {
	          // Dropdown goes past screen on right, force right alignment
	          currAlignment = 'right';
	
	        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
	          // Dropdown goes past screen on left, force left alignment
	          currAlignment = 'left';
	        }
	        // Vertical bottom offscreen detection
	        if (offsetTop + activates.innerHeight() > windowHeight) {
	          // If going upwards still goes offscreen, just crop height of dropdown.
	          if (offsetTop + originHeight - activates.innerHeight() < 0) {
	            var adjustedHeight = windowHeight - offsetTop - verticalOffset;
	            activates.css('max-height', adjustedHeight);
	          } else {
	            // Flow upwards.
	            if (!verticalOffset) {
	              verticalOffset += originHeight;
	            }
	            verticalOffset -= activates.innerHeight();
	          }
	        }
	
	        // Handle edge alignment
	        if (currAlignment === 'left') {
	          gutterSpacing = curr_options.gutter;
	          leftPosition = origin.position().left + gutterSpacing;
	        }
	        else if (currAlignment === 'right') {
	          var offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
	          gutterSpacing = -curr_options.gutter;
	          leftPosition =  offsetRight + gutterSpacing;
	        }
	
	        // Position dropdown
	        activates.css({
	          position: 'absolute',
	          top: origin.position().top + verticalOffset + scrollYOffset,
	          left: leftPosition + scrollXOffset
	        });
	
	
	        // Show dropdown
	        activates.stop(true, true).css('opacity', 0)
	          .slideDown({
	            queue: false,
	            duration: curr_options.inDuration,
	            easing: 'easeOutCubic',
	            complete: function() {
	              $(this).css('height', '');
	            }
	          })
	          .animate( {opacity: 1}, {queue: false, duration: curr_options.inDuration, easing: 'easeOutSine'});
	      }
	
	      function hideDropdown() {
	        // Check for simultaneous focus and click events.
	        isFocused = false;
	        activates.fadeOut(curr_options.outDuration);
	        activates.removeClass('active');
	        origin.removeClass('active');
	        setTimeout(function() { activates.css('max-height', ''); }, curr_options.outDuration);
	      }
	
	      // Hover
	      if (curr_options.hover) {
	        var open = false;
	        origin.unbind('click.' + origin.attr('id'));
	        // Hover handler to show dropdown
	        origin.on('mouseenter', function(e){ // Mouse over
	          if (open === false) {
	            placeDropdown();
	            open = true;
	          }
	        });
	        origin.on('mouseleave', function(e){
	          // If hover on origin then to something other than dropdown content, then close
	          var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
	          if(!$(toEl).closest('.dropdown-content').is(activates)) {
	            activates.stop(true, true);
	            hideDropdown();
	            open = false;
	          }
	        });
	
	        activates.on('mouseleave', function(e){ // Mouse out
	          var toEl = e.toElement || e.relatedTarget;
	          if(!$(toEl).closest('.dropdown-button').is(origin)) {
	            activates.stop(true, true);
	            hideDropdown();
	            open = false;
	          }
	        });
	
	        // Click
	      } else {
	        // Click handler to show dropdown
	        origin.unbind('click.' + origin.attr('id'));
	        origin.bind('click.'+origin.attr('id'), function(e){
	          if (!isFocused) {
	            if ( origin[0] == e.currentTarget &&
	                 !origin.hasClass('active') &&
	                 ($(e.target).closest('.dropdown-content').length === 0)) {
	              e.preventDefault(); // Prevents button click from moving window
	              if (curr_options.stopPropagation) {
	                e.stopPropagation();
	              }
	              placeDropdown('click');
	            }
	            // If origin is clicked and menu is open, close menu
	            else if (origin.hasClass('active')) {
	              hideDropdown();
	              $(document).unbind('click.'+ activates.attr('id') + ' touchstart.' + activates.attr('id'));
	            }
	            // If menu open, add click close handler to document
	            if (activates.hasClass('active')) {
	              $(document).bind('click.'+ activates.attr('id') + ' touchstart.' + activates.attr('id'), function (e) {
	                if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length) ) {
	                  hideDropdown();
	                  $(document).unbind('click.'+ activates.attr('id') + ' touchstart.' + activates.attr('id'));
	                }
	              });
	            }
	          }
	        });
	
	      } // End else
	
	      // Listen to open and close event - useful for select component
	      origin.on('open', function(e, eventType) {
	        placeDropdown(eventType);
	      });
	      origin.on('close', hideDropdown);
	
	
	    });
	  }; // End dropdown plugin
	
	  $(document).ready(function(){
	    $('.dropdown-button').dropdown();
	  });
	}( jQuery ));
	;(function($) {
	  var _stack = 0,
	  _lastID = 0,
	  _generateID = function() {
	    _lastID++;
	    return 'materialize-modal-overlay-' + _lastID;
	  };
	
	  var methods = {
	    init : function(options) {
	      var defaults = {
	        opacity: 0.5,
	        in_duration: 350,
	        out_duration: 250,
	        ready: undefined,
	        complete: undefined,
	        dismissible: true,
	        starting_top: '4%',
	        ending_top: '10%'
	      };
	
	      // Override defaults
	      options = $.extend(defaults, options);
	
	      return this.each(function() {
	        var $modal = $(this);
	        var modal_id = $(this).attr("id") || '#' + $(this).data('target');
	
	        var closeModal = function() {
	          var overlayID = $modal.data('overlay-id');
	          var $overlay = $('#' + overlayID);
	          $modal.removeClass('open');
	
	          // Enable scrolling
	          $('body').css({
	            overflow: '',
	            width: ''
	          });
	
	          $modal.find('.modal-close').off('click.close');
	          $(document).off('keyup.modal' + overlayID);
	
	          $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});
	
	
	          // Define Bottom Sheet animation
	          var exitVelocityOptions = {
	            duration: options.out_duration,
	            queue: false,
	            ease: "easeOutCubic",
	            // Handle modal ready callback
	            complete: function() {
	              $(this).css({display:"none"});
	
	              // Call complete callback
	              if (typeof(options.complete) === "function") {
	                options.complete.call(this, $modal);
	              }
	              $overlay.remove();
	              _stack--;
	            }
	          };
	          if ($modal.hasClass('bottom-sheet')) {
	            $modal.velocity({bottom: "-100%", opacity: 0}, exitVelocityOptions);
	          }
	          else {
	            $modal.velocity(
	              { top: options.starting_top, opacity: 0, scaleX: 0.7},
	              exitVelocityOptions
	            );
	          }
	        };
	
	        var openModal = function($trigger) {
	          var $body = $('body');
	          var oldWidth = $body.innerWidth();
	          $body.css('overflow', 'hidden');
	          $body.width(oldWidth);
	
	          if ($modal.hasClass('open')) {
	            return;
	          }
	
	          var overlayID = _generateID();
	          var $overlay = $('<div class="modal-overlay"></div>');
	          lStack = (++_stack);
	
	          // Store a reference of the overlay
	          $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
	          $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);
	          $modal.addClass('open');
	
	          $("body").append($overlay);
	
	          if (options.dismissible) {
	            $overlay.click(function() {
	              closeModal();
	            });
	            // Return on ESC
	            $(document).on('keyup.modal' + overlayID, function(e) {
	              if (e.keyCode === 27) {   // ESC key
	                closeModal();
	              }
	            });
	          }
	
	          $modal.find(".modal-close").on('click.close', function(e) {
	            closeModal();
	          });
	
	          $overlay.css({ display : "block", opacity : 0 });
	
	          $modal.css({
	            display : "block",
	            opacity: 0
	          });
	
	          $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
	          $modal.data('associated-overlay', $overlay[0]);
	
	          // Define Bottom Sheet animation
	          var enterVelocityOptions = {
	            duration: options.in_duration,
	            queue: false,
	            ease: "easeOutCubic",
	            // Handle modal ready callback
	            complete: function() {
	              if (typeof(options.ready) === "function") {
	                options.ready.call(this, $modal, $trigger);
	              }
	            }
	          };
	          if ($modal.hasClass('bottom-sheet')) {
	            $modal.velocity({bottom: "0", opacity: 1}, enterVelocityOptions);
	          }
	          else {
	            $.Velocity.hook($modal, "scaleX", 0.7);
	            $modal.css({ top: options.starting_top });
	            $modal.velocity({top: options.ending_top, opacity: 1, scaleX: '1'}, enterVelocityOptions);
	          }
	
	        };
	
	        // Reset handlers
	        $(document).off('click.modalTrigger', 'a[href="#' + modal_id + '"], [data-target="' + modal_id + '"]');
	        $(this).off('openModal');
	        $(this).off('closeModal');
	
	        // Close Handlers
	        $(document).on('click.modalTrigger', 'a[href="#' + modal_id + '"], [data-target="' + modal_id + '"]', function(e) {
	          options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;
	          openModal($(this));
	          e.preventDefault();
	        }); // done set on click
	
	        $(this).on('openModal', function() {
	          var modal_id = $(this).attr("href") || '#' + $(this).data('target');
	          openModal();
	        });
	
	        $(this).on('closeModal', function() {
	          closeModal();
	        });
	      }); // done return
	    },
	    open : function() {
	      $(this).trigger('openModal');
	    },
	    close : function() {
	      $(this).trigger('closeModal');
	    }
	  };
	
	  $.fn.modal = function(methodOrOptions) {
	    if ( methods[methodOrOptions] ) {
	      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	      // Default to "init"
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.modal' );
	    }
	  };
	})(jQuery);
	;(function ($) {
	
	  $.fn.materialbox = function () {
	
	    return this.each(function() {
	
	      if ($(this).hasClass('initialized')) {
	        return;
	      }
	
	      $(this).addClass('initialized');
	
	      var overlayActive = false;
	      var doneAnimating = true;
	      var inDuration = 275;
	      var outDuration = 200;
	      var origin = $(this);
	      var placeholder = $('<div></div>').addClass('material-placeholder');
	      var originalWidth = 0;
	      var originalHeight = 0;
	      var ancestorsChanged;
	      var ancestor;
	      origin.wrap(placeholder);
	
	
	      origin.on('click', function(){
	        var placeholder = origin.parent('.material-placeholder');
	        var windowWidth = window.innerWidth;
	        var windowHeight = window.innerHeight;
	        var originalWidth = origin.width();
	        var originalHeight = origin.height();
	
	
	        // If already modal, return to original
	        if (doneAnimating === false) {
	          returnToOriginal();
	          return false;
	        }
	        else if (overlayActive && doneAnimating===true) {
	          returnToOriginal();
	          return false;
	        }
	
	
	        // Set states
	        doneAnimating = false;
	        origin.addClass('active');
	        overlayActive = true;
	
	        // Set positioning for placeholder
	        placeholder.css({
	          width: placeholder[0].getBoundingClientRect().width,
	          height: placeholder[0].getBoundingClientRect().height,
	          position: 'relative',
	          top: 0,
	          left: 0
	        });
	
	        // Find ancestor with overflow: hidden; and remove it
	        ancestorsChanged = undefined;
	        ancestor = placeholder[0].parentNode;
	        var count = 0;
	        while (ancestor !== null && !$(ancestor).is(document)) {
	          var curr = $(ancestor);
	          if (curr.css('overflow') !== 'visible') {
	            curr.css('overflow', 'visible');
	            if (ancestorsChanged === undefined) {
	              ancestorsChanged = curr;
	            }
	            else {
	              ancestorsChanged = ancestorsChanged.add(curr);
	            }
	          }
	          ancestor = ancestor.parentNode;
	        }
	
	        // Set css on origin
	        origin.css({position: 'absolute', 'z-index': 1000})
	        .data('width', originalWidth)
	        .data('height', originalHeight);
	
	        // Add overlay
	        var overlay = $('<div id="materialbox-overlay"></div>')
	          .css({
	            opacity: 0
	          })
	          .click(function(){
	            if (doneAnimating === true)
	            returnToOriginal();
	          });
	          // Animate Overlay
	          // Put before in origin image to preserve z-index layering.
	          origin.before(overlay);
	          overlay.velocity({opacity: 1},
	                           {duration: inDuration, queue: false, easing: 'easeOutQuad'} );
	
	        // Add and animate caption if it exists
	        if (origin.data('caption') !== "") {
	          var $photo_caption = $('<div class="materialbox-caption"></div>');
	          $photo_caption.text(origin.data('caption'));
	          $('body').append($photo_caption);
	          $photo_caption.css({ "display": "inline" });
	          $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
	        }
	
	        // Resize Image
	        var ratio = 0;
	        var widthPercent = originalWidth / windowWidth;
	        var heightPercent = originalHeight / windowHeight;
	        var newWidth = 0;
	        var newHeight = 0;
	
	        if (widthPercent > heightPercent) {
	          ratio = originalHeight / originalWidth;
	          newWidth = windowWidth * 0.9;
	          newHeight = windowWidth * 0.9 * ratio;
	        }
	        else {
	          ratio = originalWidth / originalHeight;
	          newWidth = (windowHeight * 0.9) * ratio;
	          newHeight = windowHeight * 0.9;
	        }
	
	        // Animate image + set z-index
	        if(origin.hasClass('responsive-img')) {
	          origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
	            complete: function(){
	              origin.css({left: 0, top: 0})
	              .velocity(
	                {
	                  height: newHeight,
	                  width: newWidth,
	                  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
	                  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
	                },
	                {
	                  duration: inDuration,
	                  queue: false,
	                  easing: 'easeOutQuad',
	                  complete: function(){doneAnimating = true;}
	                }
	              );
	            } // End Complete
	          }); // End Velocity
	        }
	        else {
	          origin.css('left', 0)
	          .css('top', 0)
	          .velocity(
	            {
	              height: newHeight,
	              width: newWidth,
	              left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
	              top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
	            },
	            {
	              duration: inDuration,
	              queue: false,
	              easing: 'easeOutQuad',
	              complete: function(){doneAnimating = true;}
	            }
	            ); // End Velocity
	        }
	
	    }); // End origin on click
	
	
	      // Return on scroll
	      $(window).scroll(function() {
	        if (overlayActive) {
	          returnToOriginal();
	        }
	      });
	
	      // Return on ESC
	      $(document).keyup(function(e) {
	
	        if (e.keyCode === 27 && doneAnimating === true) {   // ESC key
	          if (overlayActive) {
	            returnToOriginal();
	          }
	        }
	      });
	
	
	      // This function returns the modaled image to the original spot
	      function returnToOriginal() {
	
	          doneAnimating = false;
	
	          var placeholder = origin.parent('.material-placeholder');
	          var windowWidth = window.innerWidth;
	          var windowHeight = window.innerHeight;
	          var originalWidth = origin.data('width');
	          var originalHeight = origin.data('height');
	
	          origin.velocity("stop", true);
	          $('#materialbox-overlay').velocity("stop", true);
	          $('.materialbox-caption').velocity("stop", true);
	
	
	          $('#materialbox-overlay').velocity({opacity: 0}, {
	            duration: outDuration, // Delay prevents animation overlapping
	            queue: false, easing: 'easeOutQuad',
	            complete: function(){
	              // Remove Overlay
	              overlayActive = false;
	              $(this).remove();
	            }
	          });
	
	          // Resize Image
	          origin.velocity(
	            {
	              width: originalWidth,
	              height: originalHeight,
	              left: 0,
	              top: 0
	            },
	            {
	              duration: outDuration,
	              queue: false, easing: 'easeOutQuad'
	            }
	          );
	
	          // Remove Caption + reset css settings on image
	          $('.materialbox-caption').velocity({opacity: 0}, {
	            duration: outDuration, // Delay prevents animation overlapping
	            queue: false, easing: 'easeOutQuad',
	            complete: function(){
	              placeholder.css({
	                height: '',
	                width: '',
	                position: '',
	                top: '',
	                left: ''
	              });
	
	              origin.css({
	                height: '',
	                top: '',
	                left: '',
	                width: '',
	                'max-width': '',
	                position: '',
	                'z-index': ''
	              });
	
	              // Remove class
	              origin.removeClass('active');
	              doneAnimating = true;
	              $(this).remove();
	
	              // Remove overflow overrides on ancestors
	              if (ancestorsChanged) {
	                ancestorsChanged.css('overflow', '');
	              }
	            }
	          });
	
	        }
	        });
	};
	
	$(document).ready(function(){
	  $('.materialboxed').materialbox();
	});
	
	}( jQuery ));
	;(function ($) {
	
	    $.fn.parallax = function () {
	      var window_width = $(window).width();
	      // Parallax Scripts
	      return this.each(function(i) {
	        var $this = $(this);
	        $this.addClass('parallax');
	
	        function updateParallax(initial) {
	          var container_height;
	          if (window_width < 601) {
	            container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
	          }
	          else {
	            container_height = ($this.height() > 0) ? $this.height() : 500;
	          }
	          var $img = $this.children("img").first();
	          var img_height = $img.height();
	          var parallax_dist = img_height - container_height;
	          var bottom = $this.offset().top + container_height;
	          var top = $this.offset().top;
	          var scrollTop = $(window).scrollTop();
	          var windowHeight = window.innerHeight;
	          var windowBottom = scrollTop + windowHeight;
	          var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
	          var parallax = Math.round((parallax_dist * percentScrolled));
	
	          if (initial) {
	            $img.css('display', 'block');
	          }
	          if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
	            $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
	          }
	
	        }
	
	        // Wait for image load
	        $this.children("img").one("load", function() {
	          updateParallax(true);
	        }).each(function() {
	          if (this.complete) $(this).trigger("load");
	        });
	
	        $(window).scroll(function() {
	          window_width = $(window).width();
	          updateParallax(false);
	        });
	
	        $(window).resize(function() {
	          window_width = $(window).width();
	          updateParallax(false);
	        });
	
	      });
	
	    };
	}( jQuery ));
	;(function ($) {
	
	  var methods = {
	    init : function(options) {
	      var defaults = {
	        onShow: null
	      };
	      options = $.extend(defaults, options);
	
	      return this.each(function() {
	
	      // For each set of tabs, we want to keep track of
	      // which tab is active and its associated content
	      var $this = $(this),
	          window_width = $(window).width();
	
	      var $active, $content, $links = $this.find('li.tab a'),
	          $tabs_width = $this.width(),
	          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
	          $index = 0;
	
	      // Finds right attribute for indicator based on active tab.
	      // el: jQuery Object
	      var calcRightPos = function(el) {
	        return $tabs_width - el.position().left - el.outerWidth() - $this.scrollLeft();
	      };
	
	      // Finds left attribute for indicator based on active tab.
	      // el: jQuery Object
	      var calcLeftPos = function(el) {
	        return el.position().left + $this.scrollLeft();
	      };
	
	      // If the location.hash matches one of the links, use that as the active tab.
	      $active = $($links.filter('[href="'+location.hash+'"]'));
	
	      // If no match is found, use the first link or any with class 'active' as the initial active tab.
	      if ($active.length === 0) {
	        $active = $(this).find('li.tab a.active').first();
	      }
	      if ($active.length === 0) {
	        $active = $(this).find('li.tab a').first();
	      }
	
	      $active.addClass('active');
	      $index = $links.index($active);
	      if ($index < 0) {
	        $index = 0;
	      }
	
	      if ($active[0] !== undefined) {
	        $content = $($active[0].hash);
	      }
	
	      // append indicator then set indicator width to tab width
	      $this.append('<div class="indicator"></div>');
	      var $indicator = $this.find('.indicator');
	      if ($this.is(":visible")) {
	        // $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
	        // $indicator.css({"left": $index * $tab_width});
	        setTimeout(function() {
	          $indicator.css({"right": calcRightPos($active) });
	          $indicator.css({"left": calcLeftPos($active) });
	        }, 0);
	      }
	      $(window).resize(function () {
	        $tabs_width = $this.width();
	        $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
	        if ($index < 0) {
	          $index = 0;
	        }
	        if ($tab_width !== 0 && $tabs_width !== 0) {
	          $indicator.css({"right": calcRightPos($active) });
	          $indicator.css({"left": calcLeftPos($active) });
	        }
	      });
	
	      // Hide the remaining content
	      $links.not($active).each(function () {
	        $(Materialize.escapeHash(this.hash)).hide();
	      });
	
	
	      // Bind the click event handler
	      $this.on('click', 'a', function(e) {
	        if ($(this).parent().hasClass('disabled')) {
	          e.preventDefault();
	          return;
	        }
	
	        // Act as regular link if target attribute is specified.
	        if (!!$(this).attr("target")) {
	          return;
	        }
	
	        $tabs_width = $this.width();
	        $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
	
	        // Make the old tab inactive.
	        $active.removeClass('active');
	        if ($content !== undefined) {
	          $content.hide();
	        }
	
	        // Update the variables with the new link and content
	        $active = $(this);
	        $content = $(Materialize.escapeHash(this.hash));
	        $links = $this.find('li.tab a');
	        var activeRect = $active.position();
	
	        // Make the tab active.
	        $active.addClass('active');
	        var $prev_index = $index;
	        $index = $links.index($(this));
	        if ($index < 0) {
	          $index = 0;
	        }
	        // Change url to current tab
	        // window.location.hash = $active.attr('href');
	
	        if ($content !== undefined) {
	          $content.show();
	          if (typeof(options.onShow) === "function") {
	            options.onShow.call(this, $content);
	          }
	        }
	
	        // Update indicator
	
	        if (($index - $prev_index) >= 0) {
	          $indicator.velocity({"right": calcRightPos($active) }, { duration: 300, queue: false, easing: 'easeOutQuad'});
	          $indicator.velocity({"left": calcLeftPos($active) }, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
	
	        } else {
	          $indicator.velocity({"left": calcLeftPos($active) }, { duration: 300, queue: false, easing: 'easeOutQuad'});
	          $indicator.velocity({"right": calcRightPos($active) }, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
	        }
	
	        // Prevent the anchor's default click action
	        e.preventDefault();
	      });
	    });
	
	    },
	    select_tab : function( id ) {
	      this.find('a[href="#' + id + '"]').trigger('click');
	    }
	  };
	
	  $.fn.tabs = function(methodOrOptions) {
	    if ( methods[methodOrOptions] ) {
	      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	      // Default to "init"
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tabs' );
	    }
	  };
	
	  $(document).ready(function(){
	    $('ul.tabs').tabs();
	  });
	}( jQuery ));
	;(function ($) {
	    $.fn.tooltip = function (options) {
	      var timeout = null,
	      margin = 5;
	
	      // Defaults
	      var defaults = {
	        delay: 350,
	        tooltip: '',
	        position: 'bottom',
	        html: false
	      };
	
	      // Remove tooltip from the activator
	      if (options === "remove") {
	        this.each(function() {
	          $('#' + $(this).attr('data-tooltip-id')).remove();
	          $(this).off('mouseenter.tooltip mouseleave.tooltip');
	        });
	        return false;
	      }
	
	      options = $.extend(defaults, options);
	
	      return this.each(function() {
	        var tooltipId = Materialize.guid();
	        var origin = $(this);
	
	        // Destroy old tooltip
	        if (origin.attr('data-tooltip-id')) {
	          $('#' + origin.attr('data-tooltip-id')).remove();
	        }
	
	        origin.attr('data-tooltip-id', tooltipId);
	
	        // Get attributes.
	        var allowHtml,
	            tooltipDelay,
	            tooltipPosition,
	            tooltipText,
	            tooltipEl,
	            backdrop;
	        var setAttributes = function() {
	          allowHtml = origin.attr('data-html') ? origin.attr('data-html') === 'true' : options.html;
	          tooltipDelay = origin.attr('data-delay');
	          tooltipDelay = (tooltipDelay === undefined || tooltipDelay === '') ?
	              options.delay : tooltipDelay;
	          tooltipPosition = origin.attr('data-position');
	          tooltipPosition = (tooltipPosition === undefined || tooltipPosition === '') ?
	              options.position : tooltipPosition;
	          tooltipText = origin.attr('data-tooltip');
	          tooltipText = (tooltipText === undefined || tooltipText === '') ?
	              options.tooltip : tooltipText;
	        };
	        setAttributes();
	
	        var renderTooltipEl = function() {
	          var tooltip = $('<div class="material-tooltip"></div>');
	
	          // Create Text span
	          if (allowHtml) {
	            tooltipText = $('<span></span>').html(tooltipText);
	          } else{
	            tooltipText = $('<span></span>').text(tooltipText);
	          }
	
	          // Create tooltip
	          tooltip.append(tooltipText)
	            .appendTo($('body'))
	            .attr('id', tooltipId);
	
	          // Create backdrop
	          backdrop = $('<div class="backdrop"></div>');
	          backdrop.appendTo(tooltip);
	          return tooltip;
	        };
	        tooltipEl = renderTooltipEl();
	
	        // Destroy previously binded events
	        origin.off('mouseenter.tooltip mouseleave.tooltip');
	        // Mouse In
	        var started = false, timeoutRef;
	        origin.on({'mouseenter.tooltip': function(e) {
	          var showTooltip = function() {
	            setAttributes();
	            started = true;
	            tooltipEl.velocity('stop');
	            backdrop.velocity('stop');
	            tooltipEl.css({ display: 'block', left: '0px', top: '0px' });
	
	            // Tooltip positioning
	            var originWidth = origin.outerWidth();
	            var originHeight = origin.outerHeight();
	
	            var tooltipHeight = tooltipEl.outerHeight();
	            var tooltipWidth = tooltipEl.outerWidth();
	            var tooltipVerticalMovement = '0px';
	            var tooltipHorizontalMovement = '0px';
	            var scaleXFactor = 8;
	            var scaleYFactor = 8;
	            var targetTop, targetLeft, newCoordinates;
	
	            if (tooltipPosition === "top") {
	              // Top Position
	              targetTop = origin.offset().top - tooltipHeight - margin;
	              targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
	              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
	
	              tooltipVerticalMovement = '-10px';
	              backdrop.css({
	                bottom: 0,
	                left: 0,
	                borderRadius: '14px 14px 0 0',
	                transformOrigin: '50% 100%',
	                marginTop: tooltipHeight,
	                marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
	              });
	            }
	            // Left Position
	            else if (tooltipPosition === "left") {
	              targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
	              targetLeft =  origin.offset().left - tooltipWidth - margin;
	              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
	
	              tooltipHorizontalMovement = '-10px';
	              backdrop.css({
	                top: '-7px',
	                right: 0,
	                width: '14px',
	                height: '14px',
	                borderRadius: '14px 0 0 14px',
	                transformOrigin: '95% 50%',
	                marginTop: tooltipHeight/2,
	                marginLeft: tooltipWidth
	              });
	            }
	            // Right Position
	            else if (tooltipPosition === "right") {
	              targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
	              targetLeft = origin.offset().left + originWidth + margin;
	              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
	
	              tooltipHorizontalMovement = '+10px';
	              backdrop.css({
	                top: '-7px',
	                left: 0,
	                width: '14px',
	                height: '14px',
	                borderRadius: '0 14px 14px 0',
	                transformOrigin: '5% 50%',
	                marginTop: tooltipHeight/2,
	                marginLeft: '0px'
	              });
	            }
	            else {
	              // Bottom Position
	              targetTop = origin.offset().top + origin.outerHeight() + margin;
	              targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
	              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
	              tooltipVerticalMovement = '+10px';
	              backdrop.css({
	                top: 0,
	                left: 0,
	                marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
	              });
	            }
	
	            // Set tooptip css placement
	            tooltipEl.css({
	              top: newCoordinates.y,
	              left: newCoordinates.x
	            });
	
	            // Calculate Scale to fill
	            scaleXFactor = Math.SQRT2 * tooltipWidth / parseInt(backdrop.css('width'));
	            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt(backdrop.css('height'));
	
	            tooltipEl.velocity({ marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, { duration: 350, queue: false })
	              .velocity({opacity: 1}, {duration: 300, delay: 50, queue: false});
	            backdrop.css({ display: 'block' })
	              .velocity({opacity:1},{duration: 55, delay: 0, queue: false})
	              .velocity({scaleX: scaleXFactor, scaleY: scaleYFactor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});
	          };
	
	          timeoutRef = setTimeout(showTooltip, tooltipDelay); // End Interval
	
	        // Mouse Out
	        },
	        'mouseleave.tooltip': function(){
	          // Reset State
	          started = false;
	          clearTimeout(timeoutRef);
	
	          // Animate back
	          setTimeout(function() {
	            if (started !== true) {
	              tooltipEl.velocity({
	                opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false});
	              backdrop.velocity({opacity: 0, scaleX: 1, scaleY: 1}, {
	                duration:225,
	                queue: false,
	                complete: function(){
	                  backdrop.css('display', 'none');
	                  tooltipEl.css('display', 'none');
	                  started = false;}
	              });
	            }
	          },225);
	        }
	        });
	    });
	  };
	
	  var repositionWithinScreen = function(x, y, width, height) {
	    var newX = x;
	    var newY = y;
	
	    if (newX < 0) {
	      newX = 4;
	    } else if (newX + width > window.innerWidth) {
	      newX -= newX + width - window.innerWidth;
	    }
	
	    if (newY < 0) {
	      newY = 4;
	    } else if (newY + height > window.innerHeight + $(window).scrollTop) {
	      newY -= newY + height - window.innerHeight;
	    }
	
	    return {x: newX, y: newY};
	  };
	
	  $(document).ready(function(){
	     $('.tooltipped').tooltip();
	   });
	}( jQuery ));
	;/*!
	 * Waves v0.6.4
	 * http://fian.my.id/Waves
	 *
	 * Copyright 2014 Alfiana E. Sibuea and other contributors
	 * Released under the MIT license
	 * https://github.com/fians/Waves/blob/master/LICENSE
	 */
	
	;(function(window) {
	    'use strict';
	
	    var Waves = Waves || {};
	    var $$ = document.querySelectorAll.bind(document);
	
	    // Find exact position of element
	    function isWindow(obj) {
	        return obj !== null && obj === obj.window;
	    }
	
	    function getWindow(elem) {
	        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	    }
	
	    function offset(elem) {
	        var docElem, win,
	            box = {top: 0, left: 0},
	            doc = elem && elem.ownerDocument;
	
	        docElem = doc.documentElement;
	
	        if (typeof elem.getBoundingClientRect !== typeof undefined) {
	            box = elem.getBoundingClientRect();
	        }
	        win = getWindow(doc);
	        return {
	            top: box.top + win.pageYOffset - docElem.clientTop,
	            left: box.left + win.pageXOffset - docElem.clientLeft
	        };
	    }
	
	    function convertStyle(obj) {
	        var style = '';
	
	        for (var a in obj) {
	            if (obj.hasOwnProperty(a)) {
	                style += (a + ':' + obj[a] + ';');
	            }
	        }
	
	        return style;
	    }
	
	    var Effect = {
	
	        // Effect delay
	        duration: 750,
	
	        show: function(e, element) {
	
	            // Disable right click
	            if (e.button === 2) {
	                return false;
	            }
	
	            var el = element || this;
	
	            // Create ripple
	            var ripple = document.createElement('div');
	            ripple.className = 'waves-ripple';
	            el.appendChild(ripple);
	
	            // Get click coordinate and element witdh
	            var pos         = offset(el);
	            var relativeY   = (e.pageY - pos.top);
	            var relativeX   = (e.pageX - pos.left);
	            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';
	
	            // Support for touch devices
	            if ('touches' in e) {
	              relativeY   = (e.touches[0].pageY - pos.top);
	              relativeX   = (e.touches[0].pageX - pos.left);
	            }
	
	            // Attach data to element
	            ripple.setAttribute('data-hold', Date.now());
	            ripple.setAttribute('data-scale', scale);
	            ripple.setAttribute('data-x', relativeX);
	            ripple.setAttribute('data-y', relativeY);
	
	            // Set ripple position
	            var rippleStyle = {
	                'top': relativeY+'px',
	                'left': relativeX+'px'
	            };
	
	            ripple.className = ripple.className + ' waves-notransition';
	            ripple.setAttribute('style', convertStyle(rippleStyle));
	            ripple.className = ripple.className.replace('waves-notransition', '');
	
	            // Scale the ripple
	            rippleStyle['-webkit-transform'] = scale;
	            rippleStyle['-moz-transform'] = scale;
	            rippleStyle['-ms-transform'] = scale;
	            rippleStyle['-o-transform'] = scale;
	            rippleStyle.transform = scale;
	            rippleStyle.opacity   = '1';
	
	            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
	            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
	            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
	            rippleStyle['transition-duration']         = Effect.duration + 'ms';
	
	            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
	
	            ripple.setAttribute('style', convertStyle(rippleStyle));
	        },
	
	        hide: function(e) {
	            TouchHandler.touchup(e);
	
	            var el = this;
	            var width = el.clientWidth * 1.4;
	
	            // Get first ripple
	            var ripple = null;
	            var ripples = el.getElementsByClassName('waves-ripple');
	            if (ripples.length > 0) {
	                ripple = ripples[ripples.length - 1];
	            } else {
	                return false;
	            }
	
	            var relativeX   = ripple.getAttribute('data-x');
	            var relativeY   = ripple.getAttribute('data-y');
	            var scale       = ripple.getAttribute('data-scale');
	
	            // Get delay beetween mousedown and mouse leave
	            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
	            var delay = 350 - diff;
	
	            if (delay < 0) {
	                delay = 0;
	            }
	
	            // Fade out ripple after delay
	            setTimeout(function() {
	                var style = {
	                    'top': relativeY+'px',
	                    'left': relativeX+'px',
	                    'opacity': '0',
	
	                    // Duration
	                    '-webkit-transition-duration': Effect.duration + 'ms',
	                    '-moz-transition-duration': Effect.duration + 'ms',
	                    '-o-transition-duration': Effect.duration + 'ms',
	                    'transition-duration': Effect.duration + 'ms',
	                    '-webkit-transform': scale,
	                    '-moz-transform': scale,
	                    '-ms-transform': scale,
	                    '-o-transform': scale,
	                    'transform': scale,
	                };
	
	                ripple.setAttribute('style', convertStyle(style));
	
	                setTimeout(function() {
	                    try {
	                        el.removeChild(ripple);
	                    } catch(e) {
	                        return false;
	                    }
	                }, Effect.duration);
	            }, delay);
	        },
	
	        // Little hack to make <input> can perform waves effect
	        wrapInput: function(elements) {
	            for (var a = 0; a < elements.length; a++) {
	                var el = elements[a];
	
	                if (el.tagName.toLowerCase() === 'input') {
	                    var parent = el.parentNode;
	
	                    // If input already have parent just pass through
	                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
	                        continue;
	                    }
	
	                    // Put element class and style to the specified parent
	                    var wrapper = document.createElement('i');
	                    wrapper.className = el.className + ' waves-input-wrapper';
	
	                    var elementStyle = el.getAttribute('style');
	
	                    if (!elementStyle) {
	                        elementStyle = '';
	                    }
	
	                    wrapper.setAttribute('style', elementStyle);
	
	                    el.className = 'waves-button-input';
	                    el.removeAttribute('style');
	
	                    // Put element as child
	                    parent.replaceChild(wrapper, el);
	                    wrapper.appendChild(el);
	                }
	            }
	        }
	    };
	
	
	    /**
	     * Disable mousedown event for 500ms during and after touch
	     */
	    var TouchHandler = {
	        /* uses an integer rather than bool so there's no issues with
	         * needing to clear timeouts if another touch event occurred
	         * within the 500ms. Cannot mouseup between touchstart and
	         * touchend, nor in the 500ms after touchend. */
	        touches: 0,
	        allowEvent: function(e) {
	            var allow = true;
	
	            if (e.type === 'touchstart') {
	                TouchHandler.touches += 1; //push
	            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
	                setTimeout(function() {
	                    if (TouchHandler.touches > 0) {
	                        TouchHandler.touches -= 1; //pop after 500ms
	                    }
	                }, 500);
	            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
	                allow = false;
	            }
	
	            return allow;
	        },
	        touchup: function(e) {
	            TouchHandler.allowEvent(e);
	        }
	    };
	
	
	    /**
	     * Delegated click handler for .waves-effect element.
	     * returns null when .waves-effect element not in "click tree"
	     */
	    function getWavesEffectElement(e) {
	        if (TouchHandler.allowEvent(e) === false) {
	            return null;
	        }
	
	        var element = null;
	        var target = e.target || e.srcElement;
	
	        while (target.parentElement !== null) {
	            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
	                element = target;
	                break;
	            } else if (target.classList.contains('waves-effect')) {
	                element = target;
	                break;
	            }
	            target = target.parentElement;
	        }
	
	        return element;
	    }
	
	    /**
	     * Bubble the click and show effect if .waves-effect elem was found
	     */
	    function showEffect(e) {
	        var element = getWavesEffectElement(e);
	
	        if (element !== null) {
	            Effect.show(e, element);
	
	            if ('ontouchstart' in window) {
	                element.addEventListener('touchend', Effect.hide, false);
	                element.addEventListener('touchcancel', Effect.hide, false);
	            }
	
	            element.addEventListener('mouseup', Effect.hide, false);
	            element.addEventListener('mouseleave', Effect.hide, false);
	        }
	    }
	
	    Waves.displayEffect = function(options) {
	        options = options || {};
	
	        if ('duration' in options) {
	            Effect.duration = options.duration;
	        }
	
	        //Wrap input inside <i> tag
	        Effect.wrapInput($$('.waves-effect'));
	
	        if ('ontouchstart' in window) {
	            document.body.addEventListener('touchstart', showEffect, false);
	        }
	
	        document.body.addEventListener('mousedown', showEffect, false);
	    };
	
	    /**
	     * Attach Waves to an input element (or any element which doesn't
	     * bubble mouseup/mousedown events).
	     *   Intended to be used with dynamically loaded forms/inputs, or
	     * where the user doesn't want a delegated click handler.
	     */
	    Waves.attach = function(element) {
	        //FUTURE: automatically add waves classes and allow users
	        // to specify them with an options param? Eg. light/classic/button
	        if (element.tagName.toLowerCase() === 'input') {
	            Effect.wrapInput([element]);
	            element = element.parentElement;
	        }
	
	        if ('ontouchstart' in window) {
	            element.addEventListener('touchstart', showEffect, false);
	        }
	
	        element.addEventListener('mousedown', showEffect, false);
	    };
	
	    window.Waves = Waves;
	
	    document.addEventListener('DOMContentLoaded', function() {
	        Waves.displayEffect();
	    }, false);
	
	})(window);
	;Materialize.toast = function (message, displayLength, className, completeCallback) {
	    className = className || "";
	
	    var container = document.getElementById('toast-container');
	
	    // Create toast container if it does not exist
	    if (container === null) {
	        // create notification container
	        container = document.createElement('div');
	        container.id = 'toast-container';
	        document.body.appendChild(container);
	    }
	
	    // Select and append toast
	    var newToast = createToast(message);
	
	    // only append toast if message is not undefined
	    if(message){
	        container.appendChild(newToast);
	    }
	
	    newToast.style.top = '35px';
	    newToast.style.opacity = 0;
	
	    // Animate toast in
	    Vel(newToast, { "top" : "0px", opacity: 1 }, {duration: 300,
	      easing: 'easeOutCubic',
	      queue: false});
	
	    // Allows timer to be pause while being panned
	    var timeLeft = displayLength;
	    var counterInterval;
	    if (timeLeft != null)  {
	      counterInterval = setInterval (function(){
	        if (newToast.parentNode === null)
	          window.clearInterval(counterInterval);
	
	        // If toast is not being dragged, decrease its time remaining
	        if (!newToast.classList.contains('panning')) {
	          timeLeft -= 20;
	        }
	
	        if (timeLeft <= 0) {
	          // Animate toast out
	          Vel(newToast, {"opacity": 0, marginTop: '-40px'}, { duration: 375,
	              easing: 'easeOutExpo',
	              queue: false,
	              complete: function(){
	                // Call the optional callback
	                if(typeof(completeCallback) === "function")
	                  completeCallback();
	                // Remove toast after it times out
	                this[0].parentNode.removeChild(this[0]);
	              }
	            });
	          window.clearInterval(counterInterval);
	        }
	      }, 20);
	    }
	
	
	
	    function createToast(html) {
	
	        // Create toast
	        var toast = document.createElement('div');
	        toast.classList.add('toast');
	        if (className) {
	            var classes = className.split(' ');
	
	            for (var i = 0, count = classes.length; i < count; i++) {
	                toast.classList.add(classes[i]);
	            }
	        }
	        // If type of parameter is HTML Element
	        if ( typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName==="string"
	) {
	          toast.appendChild(html);
	        }
	        else if (html instanceof jQuery) {
	          // Check if it is jQuery object
	          toast.appendChild(html[0]);
	        }
	        else {
	          // Insert as text;
	          toast.innerHTML = html;
	        }
	        // Bind hammer
	        var hammerHandler = new Hammer(toast, {prevent_default: false});
	        hammerHandler.on('pan', function(e) {
	          var deltaX = e.deltaX;
	          var activationDistance = 80;
	
	          // Change toast state
	          if (!toast.classList.contains('panning')){
	            toast.classList.add('panning');
	          }
	
	          var opacityPercent = 1-Math.abs(deltaX / activationDistance);
	          if (opacityPercent < 0)
	            opacityPercent = 0;
	
	          Vel(toast, {left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});
	
	        });
	
	        hammerHandler.on('panend', function(e) {
	          var deltaX = e.deltaX;
	          var activationDistance = 80;
	
	          // If toast dragged past activation point
	          if (Math.abs(deltaX) > activationDistance) {
	            Vel(toast, {marginTop: '-40px'}, { duration: 375,
	                easing: 'easeOutExpo',
	                queue: false,
	                complete: function(){
	                  if(typeof(completeCallback) === "function") {
	                    completeCallback();
	                  }
	                  toast.parentNode.removeChild(toast);
	                }
	            });
	
	          } else {
	            toast.classList.remove('panning');
	            // Put toast back into original position
	            Vel(toast, { left: 0, opacity: 1 }, { duration: 300,
	              easing: 'easeOutExpo',
	              queue: false
	            });
	
	          }
	        });
	
	        return toast;
	    }
	};
	;(function ($) {
	
	  var methods = {
	    init : function(options) {
	      var defaults = {
	        menuWidth: 300,
	        edge: 'left',
	        closeOnClick: false,
	        draggable: true
	      };
	      options = $.extend(defaults, options);
	
	      $(this).each(function(){
	        var $this = $(this);
	        var menu_id = $("#"+ $this.attr('data-activates'));
	
	        // Set to width
	        if (options.menuWidth != 300) {
	          menu_id.css('width', options.menuWidth);
	        }
	
	        // Add Touch Area
	        var $dragTarget;
	        if (options.draggable) {
	          $dragTarget = $('<div class="drag-target"></div>').attr('data-sidenav', $this.attr('data-activates'));
	          $('body').append($dragTarget);
	        } else {
	          $dragTarget = $();
	        }
	
	        if (options.edge == 'left') {
	          menu_id.css('transform', 'translateX(-100%)');
	          $dragTarget.css({'left': 0}); // Add Touch Area
	        }
	        else {
	          menu_id.addClass('right-aligned') // Change text-alignment to right
	            .css('transform', 'translateX(100%)');
	          $dragTarget.css({'right': 0}); // Add Touch Area
	        }
	
	        // If fixed sidenav, bring menu out
	        if (menu_id.hasClass('fixed')) {
	            if (window.innerWidth > 992) {
	              menu_id.css('transform', 'translateX(0)');
	            }
	          }
	
	        // Window resize to reset on large screens fixed
	        if (menu_id.hasClass('fixed')) {
	          $(window).resize( function() {
	            if (window.innerWidth > 992) {
	              // Close menu if window is resized bigger than 992 and user has fixed sidenav
	              if ($('#sidenav-overlay').length !== 0 && menuOut) {
	                removeMenu(true);
	              }
	              else {
	                // menu_id.removeAttr('style');
	                menu_id.css('transform', 'translateX(0%)');
	                // menu_id.css('width', options.menuWidth);
	              }
	            }
	            else if (menuOut === false){
	              if (options.edge === 'left') {
	                menu_id.css('transform', 'translateX(-100%)');
	              } else {
	                menu_id.css('transform', 'translateX(100%)');
	              }
	
	            }
	
	          });
	        }
	
	        // if closeOnClick, then add close event for all a tags in side sideNav
	        if (options.closeOnClick === true) {
	          menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){
	            removeMenu();
	          });
	        }
	
	        var removeMenu = function(restoreNav) {
	          panning = false;
	          menuOut = false;
	          // Reenable scrolling
	          $('body').css({
	            overflow: '',
	            width: ''
	          });
	
	          $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200,
	              queue: false, easing: 'easeOutQuad',
	            complete: function() {
	              $(this).remove();
	            } });
	          if (options.edge === 'left') {
	            // Reset phantom div
	            $dragTarget.css({width: '', right: '', left: '0'});
	            menu_id.velocity(
	              {'translateX': '-100%'},
	              { duration: 200,
	                queue: false,
	                easing: 'easeOutCubic',
	                complete: function() {
	                  if (restoreNav === true) {
	                    // Restore Fixed sidenav
	                    menu_id.removeAttr('style');
	                    menu_id.css('width', options.menuWidth);
	                  }
	                }
	
	            });
	          }
	          else {
	            // Reset phantom div
	            $dragTarget.css({width: '', right: '0', left: ''});
	            menu_id.velocity(
	              {'translateX': '100%'},
	              { duration: 200,
	                queue: false,
	                easing: 'easeOutCubic',
	                complete: function() {
	                  if (restoreNav === true) {
	                    // Restore Fixed sidenav
	                    menu_id.removeAttr('style');
	                    menu_id.css('width', options.menuWidth);
	                  }
	                }
	              });
	          }
	        };
	
	
	
	        // Touch Event
	        var panning = false;
	        var menuOut = false;
	
	        if (options.draggable) {
	          $dragTarget.on('click', function(){
	            if (menuOut) {
	              removeMenu();
	            }
	          });
	
	          $dragTarget.hammer({
	            prevent_default: false
	          }).bind('pan', function(e) {
	
	            if (e.gesture.pointerType == "touch") {
	
	              var direction = e.gesture.direction;
	              var x = e.gesture.center.x;
	              var y = e.gesture.center.y;
	              var velocityX = e.gesture.velocityX;
	
	              // Disable Scrolling
	              var $body = $('body');
	              var $overlay = $('#sidenav-overlay');
	              var oldWidth = $body.innerWidth();
	              $body.css('overflow', 'hidden');
	              $body.width(oldWidth);
	
	              // If overlay does not exist, create one and if it is clicked, close menu
	              if ($overlay.length === 0) {
	                $overlay = $('<div id="sidenav-overlay"></div>');
	                $overlay.css('opacity', 0).click( function(){
	                  removeMenu();
	                });
	                $('body').append($overlay);
	              }
	
	              // Keep within boundaries
	              if (options.edge === 'left') {
	                if (x > options.menuWidth) { x = options.menuWidth; }
	                else if (x < 0) { x = 0; }
	              }
	
	              if (options.edge === 'left') {
	                // Left Direction
	                if (x < (options.menuWidth / 2)) { menuOut = false; }
	                // Right Direction
	                else if (x >= (options.menuWidth / 2)) { menuOut = true; }
	                menu_id.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
	              }
	              else {
	                // Left Direction
	                if (x < (window.innerWidth - options.menuWidth / 2)) {
	                  menuOut = true;
	                }
	                // Right Direction
	                else if (x >= (window.innerWidth - options.menuWidth / 2)) {
	                 menuOut = false;
	               }
	                var rightPos = (x - options.menuWidth / 2);
	                if (rightPos < 0) {
	                  rightPos = 0;
	                }
	
	                menu_id.css('transform', 'translateX(' + rightPos + 'px)');
	              }
	
	
	              // Percentage overlay
	              var overlayPerc;
	              if (options.edge === 'left') {
	                overlayPerc = x / options.menuWidth;
	                $overlay.velocity({opacity: overlayPerc }, {duration: 10, queue: false, easing: 'easeOutQuad'});
	              }
	              else {
	                overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
	                $overlay.velocity({opacity: overlayPerc }, {duration: 10, queue: false, easing: 'easeOutQuad'});
	              }
	            }
	
	          }).bind('panend', function(e) {
	
	            if (e.gesture.pointerType == "touch") {
	              var $overlay = $('<div id="sidenav-overlay"></div>');
	              var velocityX = e.gesture.velocityX;
	              var x = e.gesture.center.x;
	              var leftPos = x - options.menuWidth;
	              var rightPos = x - options.menuWidth / 2;
	              if (leftPos > 0 ) {
	                leftPos = 0;
	              }
	              if (rightPos < 0) {
	                rightPos = 0;
	              }
	              panning = false;
	
	              if (options.edge === 'left') {
	                // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
	                if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
	                  // Return menu to open
	                  if (leftPos !== 0) {
	                    menu_id.velocity({'translateX': [0, leftPos]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
	                  }
	
	                  $overlay.velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
	                  $dragTarget.css({width: '50%', right: 0, left: ''});
	                  menuOut = true;
	                }
	                else if (!menuOut || velocityX > 0.3) {
	                  // Enable Scrolling
	                  $('body').css({
	                    overflow: '',
	                    width: ''
	                  });
	                  // Slide menu closed
	                  menu_id.velocity({'translateX': [-1 * options.menuWidth - 10, leftPos]}, {duration: 200, queue: false, easing: 'easeOutQuad'});
	                  $overlay.velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
	                    complete: function () {
	                      $(this).remove();
	                    }});
	                  $dragTarget.css({width: '10px', right: '', left: 0});
	                }
	              }
	              else {
	                if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
	                  // Return menu to open
	                  if (rightPos !== 0) {
	                    menu_id.velocity({'translateX': [0, rightPos]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
	                  }
	
	                  $overlay.velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
	                  $dragTarget.css({width: '50%', right: '', left: 0});
	                  menuOut = true;
	                }
	                else if (!menuOut || velocityX < -0.3) {
	                  // Enable Scrolling
	                  $('body').css({
	                    overflow: '',
	                    width: ''
	                  });
	
	                  // Slide menu closed
	                  menu_id.velocity({'translateX': [options.menuWidth + 10, rightPos]}, {duration: 200, queue: false, easing: 'easeOutQuad'});
	                  $overlay.velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
	                    complete: function () {
	                      $(this).remove();
	                    }});
	                  $dragTarget.css({width: '10px', right: 0, left: ''});
	                }
	              }
	
	            }
	          });
	        }
	
	        $this.click(function() {
	          if (menuOut === true) {
	            menuOut = false;
	            panning = false;
	            removeMenu();
	          }
	          else {
	
	            // Disable Scrolling
	            var $body = $('body');
	            var $overlay = $('<div id="sidenav-overlay"></div>');
	            var oldWidth = $body.innerWidth();
	            $body.css('overflow', 'hidden');
	            $body.width(oldWidth);
	
	            // Push current drag target on top of DOM tree
	            $('body').append($dragTarget);
	
	            if (options.edge === 'left') {
	              $dragTarget.css({width: '50%', right: 0, left: ''});
	              menu_id.velocity({'translateX': [0, -1 * options.menuWidth]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
	            }
	            else {
	              $dragTarget.css({width: '50%', right: '', left: 0});
	              menu_id.velocity({'translateX': [0, options.menuWidth]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
	            }
	
	            $overlay.css('opacity', 0)
	            .click(function(){
	              menuOut = false;
	              panning = false;
	              removeMenu();
	              $overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
	                complete: function() {
	                  $(this).remove();
	                } });
	
	            });
	            $('body').append($overlay);
	            $overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
	              complete: function () {
	                menuOut = true;
	                panning = false;
	              }
	            });
	          }
	
	          return false;
	        });
	      });
	
	
	    },
	    destroy: function () {
	      var $overlay = $('#sidenav-overlay');
	      var $dragTarget = $('.drag-target[data-sidenav="' + $(this).attr('data-activates') + '"]');
	      $overlay.trigger('click');
	      $dragTarget.remove();
	      $(this).off('click');
	      $overlay.remove();
	    },
	    show : function() {
	      this.trigger('click');
	    },
	    hide : function() {
	      $('#sidenav-overlay').trigger('click');
	    }
	  };
	
	
	    $.fn.sideNav = function(methodOrOptions) {
	      if ( methods[methodOrOptions] ) {
	        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	        // Default to "init"
	        return methods.init.apply( this, arguments );
	      } else {
	        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );
	      }
	    }; // Plugin end
	}( jQuery ));
	;/**
	 * Extend jquery with a scrollspy plugin.
	 * This watches the window scroll and fires events when elements are scrolled into viewport.
	 *
	 * throttle() and getTime() taken from Underscore.js
	 * https://github.com/jashkenas/underscore
	 *
	 * @author Copyright 2013 John Smart
	 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
	 * @see https://github.com/thesmart
	 * @version 0.1.2
	 */
	(function($) {
	
		var jWindow = $(window);
		var elements = [];
		var elementsInView = [];
		var isSpying = false;
		var ticks = 0;
		var unique_id = 1;
		var offset = {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0,
		}
	
		/**
		 * Find elements that are within the boundary
		 * @param {number} top
		 * @param {number} right
		 * @param {number} bottom
		 * @param {number} left
		 * @return {jQuery}		A collection of elements
		 */
		function findElements(top, right, bottom, left) {
			var hits = $();
			$.each(elements, function(i, element) {
				if (element.height() > 0) {
					var elTop = element.offset().top,
						elLeft = element.offset().left,
						elRight = elLeft + element.width(),
						elBottom = elTop + element.height();
	
					var isIntersect = !(elLeft > right ||
						elRight < left ||
						elTop > bottom ||
						elBottom < top);
	
					if (isIntersect) {
						hits.push(element);
					}
				}
			});
	
			return hits;
		}
	
	
		/**
		 * Called when the user scrolls the window
		 */
		function onScroll(scrollOffset) {
			// unique tick id
			++ticks;
	
			// viewport rectangle
			var top = jWindow.scrollTop(),
				left = jWindow.scrollLeft(),
				right = left + jWindow.width(),
				bottom = top + jWindow.height();
	
			// determine which elements are in view
			var intersections = findElements(top+offset.top + scrollOffset || 200, right+offset.right, bottom+offset.bottom, left+offset.left);
			$.each(intersections, function(i, element) {
	
				var lastTick = element.data('scrollSpy:ticks');
				if (typeof lastTick != 'number') {
					// entered into view
					element.triggerHandler('scrollSpy:enter');
				}
	
				// update tick id
				element.data('scrollSpy:ticks', ticks);
			});
	
			// determine which elements are no longer in view
			$.each(elementsInView, function(i, element) {
				var lastTick = element.data('scrollSpy:ticks');
				if (typeof lastTick == 'number' && lastTick !== ticks) {
					// exited from view
					element.triggerHandler('scrollSpy:exit');
					element.data('scrollSpy:ticks', null);
				}
			});
	
			// remember elements in view for next tick
			elementsInView = intersections;
		}
	
		/**
		 * Called when window is resized
		*/
		function onWinSize() {
			jWindow.trigger('scrollSpy:winSize');
		}
	
		/**
		 * Get time in ms
	   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
		 * @type {function}
		 * @return {number}
		 */
		var getTime = (Date.now || function () {
			return new Date().getTime();
		});
	
		/**
		 * Returns a function, that, when invoked, will only be triggered at most once
		 * during a given window of time. Normally, the throttled function will run
		 * as much as it can, without ever going more than once per `wait` duration;
		 * but if you'd like to disable the execution on the leading edge, pass
		 * `{leading: false}`. To disable execution on the trailing edge, ditto.
		 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
		 * @param {function} func
		 * @param {number} wait
		 * @param {Object=} options
		 * @returns {Function}
		 */
		function throttle(func, wait, options) {
			var context, args, result;
			var timeout = null;
			var previous = 0;
			options || (options = {});
			var later = function () {
				previous = options.leading === false ? 0 : getTime();
				timeout = null;
				result = func.apply(context, args);
				context = args = null;
			};
			return function () {
				var now = getTime();
				if (!previous && options.leading === false) previous = now;
				var remaining = wait - (now - previous);
				context = this;
				args = arguments;
				if (remaining <= 0) {
					clearTimeout(timeout);
					timeout = null;
					previous = now;
					result = func.apply(context, args);
					context = args = null;
				} else if (!timeout && options.trailing !== false) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
		};
	
		/**
		 * Enables ScrollSpy using a selector
		 * @param {jQuery|string} selector  The elements collection, or a selector
		 * @param {Object=} options	Optional.
	        throttle : number -> scrollspy throttling. Default: 100 ms
	        offsetTop : number -> offset from top. Default: 0
	        offsetRight : number -> offset from right. Default: 0
	        offsetBottom : number -> offset from bottom. Default: 0
	        offsetLeft : number -> offset from left. Default: 0
		 * @returns {jQuery}
		 */
		$.scrollSpy = function(selector, options) {
		  var defaults = {
				throttle: 100,
				scrollOffset: 200 // offset - 200 allows elements near bottom of page to scroll
	    };
	    options = $.extend(defaults, options);
	
			var visible = [];
			selector = $(selector);
			selector.each(function(i, element) {
				elements.push($(element));
				$(element).data("scrollSpy:id", i);
				// Smooth scroll to section
			  $('a[href="#' + $(element).attr('id') + '"]').click(function(e) {
			    e.preventDefault();
			    var offset = $(Materialize.escapeHash(this.hash)).offset().top + 1;
		    	$('html, body').animate({ scrollTop: offset - options.scrollOffset }, {duration: 400, queue: false, easing: 'easeOutCubic'});
			  });
			});
	
			offset.top = options.offsetTop || 0;
			offset.right = options.offsetRight || 0;
			offset.bottom = options.offsetBottom || 0;
			offset.left = options.offsetLeft || 0;
	
			var throttledScroll = throttle(function() {
				onScroll(options.scrollOffset);
			}, options.throttle || 100);
			var readyScroll = function(){
				$(document).ready(throttledScroll);
			};
	
			if (!isSpying) {
				jWindow.on('scroll', readyScroll);
				jWindow.on('resize', readyScroll);
				isSpying = true;
			}
	
			// perform a scan once, after current execution context, and after dom is ready
			setTimeout(readyScroll, 0);
	
	
			selector.on('scrollSpy:enter', function() {
				visible = $.grep(visible, function(value) {
		      return value.height() != 0;
		    });
	
				var $this = $(this);
	
				if (visible[0]) {
					$('a[href="#' + visible[0].attr('id') + '"]').removeClass('active');
					if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
						visible.unshift($(this));
					}
					else {
						visible.push($(this));
					}
				}
				else {
					visible.push($(this));
				}
	
	
				$('a[href="#' + visible[0].attr('id') + '"]').addClass('active');
			});
			selector.on('scrollSpy:exit', function() {
				visible = $.grep(visible, function(value) {
		      return value.height() != 0;
		    });
	
				if (visible[0]) {
					$('a[href="#' + visible[0].attr('id') + '"]').removeClass('active');
					var $this = $(this);
					visible = $.grep(visible, function(value) {
		        return value.attr('id') != $this.attr('id');
		      });
		      if (visible[0]) { // Check if empty
						$('a[href="#' + visible[0].attr('id') + '"]').addClass('active');
		      }
				}
			});
	
			return selector;
		};
	
		/**
		 * Listen for window resize events
		 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
		 * @returns {jQuery}		$(window)
		 */
		$.winSizeSpy = function(options) {
			$.winSizeSpy = function() { return jWindow; }; // lock from multiple calls
			options = options || {
				throttle: 100
			};
			return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));
		};
	
		/**
		 * Enables ScrollSpy on a collection of elements
		 * e.g. $('.scrollSpy').scrollSpy()
		 * @param {Object=} options	Optional.
												throttle : number -> scrollspy throttling. Default: 100 ms
												offsetTop : number -> offset from top. Default: 0
												offsetRight : number -> offset from right. Default: 0
												offsetBottom : number -> offset from bottom. Default: 0
												offsetLeft : number -> offset from left. Default: 0
		 * @returns {jQuery}
		 */
		$.fn.scrollSpy = function(options) {
			return $.scrollSpy($(this), options);
		};
	
	})(jQuery);
	;(function ($) {
	  $(document).ready(function() {
	
	    // Function to update labels of text fields
	    Materialize.updateTextFields = function() {
	      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
	      $(input_selector).each(function(index, element) {
	        if ($(element).val().length > 0 || element.autofocus ||$(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
	          $(this).siblings('label').addClass('active');
	        }
	        else {
	          $(this).siblings('label').removeClass('active');
	        }
	      });
	    };
	
	    // Text based inputs
	    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
	
	    // Add active if form auto complete
	    $(document).on('change', input_selector, function () {
	      if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
	        $(this).siblings('label').addClass('active');
	      }
	      validate_field($(this));
	    });
	
	    // Add active if input element has been pre-populated on document ready
	    $(document).ready(function() {
	      Materialize.updateTextFields();
	    });
	
	    // HTML DOM FORM RESET handling
	    $(document).on('reset', function(e) {
	      var formReset = $(e.target);
	      if (formReset.is('form')) {
	        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
	        formReset.find(input_selector).each(function () {
	          if ($(this).attr('value') === '') {
	            $(this).siblings('label').removeClass('active');
	          }
	        });
	
	        // Reset select
	        formReset.find('select.initialized').each(function () {
	          var reset_text = formReset.find('option[selected]').text();
	          formReset.siblings('input.select-dropdown').val(reset_text);
	        });
	      }
	    });
	
	    // Add active when element has focus
	    $(document).on('focus', input_selector, function () {
	      $(this).siblings('label, .prefix').addClass('active');
	    });
	
	    $(document).on('blur', input_selector, function () {
	      var $inputElement = $(this);
	      var selector = ".prefix";
	
	      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
	        selector += ", label";
	      }
	
	      $inputElement.siblings(selector).removeClass('active');
	
	      validate_field($inputElement);
	    });
	
	    window.validate_field = function(object) {
	      var hasLength = object.attr('length') !== undefined;
	      var lenAttr = parseInt(object.attr('length'));
	      var len = object.val().length;
	
	      if (object.val().length === 0 && object[0].validity.badInput === false) {
	        if (object.hasClass('validate')) {
	          object.removeClass('valid');
	          object.removeClass('invalid');
	        }
	      }
	      else {
	        if (object.hasClass('validate')) {
	          // Check for character counter attributes
	          if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
	            object.removeClass('invalid');
	            object.addClass('valid');
	          }
	          else {
	            object.removeClass('valid');
	            object.addClass('invalid');
	          }
	        }
	      }
	    };
	
	    // Radio and Checkbox focus class
	    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
	    $(document).on('keyup.radio', radio_checkbox, function(e) {
	      // TAB, check if tabbing to radio or checkbox.
	      if (e.which === 9) {
	        $(this).addClass('tabbed');
	        var $this = $(this);
	        $this.one('blur', function(e) {
	
	          $(this).removeClass('tabbed');
	        });
	        return;
	      }
	    });
	
	    // Textarea Auto Resize
	    var hiddenDiv = $('.hiddendiv').first();
	    if (!hiddenDiv.length) {
	      hiddenDiv = $('<div class="hiddendiv common"></div>');
	      $('body').append(hiddenDiv);
	    }
	    var text_area_selector = '.materialize-textarea';
	
	    function textareaAutoResize($textarea) {
	      // Set font properties of hiddenDiv
	
	      var fontFamily = $textarea.css('font-family');
	      var fontSize = $textarea.css('font-size');
	      var lineHeight = $textarea.css('line-height');
	
	      if (fontSize) { hiddenDiv.css('font-size', fontSize); }
	      if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
	      if (lineHeight) { hiddenDiv.css('line-height', lineHeight); }
	
	      if ($textarea.attr('wrap') === "off") {
	        hiddenDiv.css('overflow-wrap', "normal")
	                 .css('white-space', "pre");
	      }
	
	      hiddenDiv.text($textarea.val() + '\n');
	      var content = hiddenDiv.html().replace(/\n/g, '<br>');
	      hiddenDiv.html(content);
	
	
	      // When textarea is hidden, width goes crazy.
	      // Approximate with half of window size
	
	      if ($textarea.is(':visible')) {
	        hiddenDiv.css('width', $textarea.width());
	      }
	      else {
	        hiddenDiv.css('width', $(window).width()/2);
	      }
	
	      $textarea.css('height', hiddenDiv.height());
	    }
	
	    $(text_area_selector).each(function () {
	      var $textarea = $(this);
	      if ($textarea.val().length) {
	        textareaAutoResize($textarea);
	      }
	    });
	
	    $('body').on('keyup keydown autoresize', text_area_selector, function () {
	      textareaAutoResize($(this));
	    });
	
	    // File Input Path
	    $(document).on('change', '.file-field input[type="file"]', function () {
	      var file_field = $(this).closest('.file-field');
	      var path_input = file_field.find('input.file-path');
	      var files      = $(this)[0].files;
	      var file_names = [];
	      for (var i = 0; i < files.length; i++) {
	        file_names.push(files[i].name);
	      }
	      path_input.val(file_names.join(", "));
	      path_input.trigger('change');
	    });
	
	    /****************
	    *  Range Input  *
	    ****************/
	
	    var range_type = 'input[type=range]';
	    var range_mousedown = false;
	    var left;
	
	    $(range_type).each(function () {
	      var thumb = $('<span class="thumb"><span class="value"></span></span>');
	      $(this).after(thumb);
	    });
	
	    var range_wrapper = '.range-field';
	    $(document).on('change', range_type, function(e) {
	      var thumb = $(this).siblings('.thumb');
	      thumb.find('.value').html($(this).val());
	    });
	
	    $(document).on('input mousedown touchstart', range_type, function(e) {
	      var thumb = $(this).siblings('.thumb');
	      var width = $(this).outerWidth();
	
	      // If thumb indicator does not exist yet, create it
	      if (thumb.length <= 0) {
	        thumb = $('<span class="thumb"><span class="value"></span></span>');
	        $(this).after(thumb);
	      }
	
	      // Set indicator value
	      thumb.find('.value').html($(this).val());
	
	      range_mousedown = true;
	      $(this).addClass('active');
	
	      if (!thumb.hasClass('active')) {
	        thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });
	      }
	
	      if (e.type !== 'input') {
	        if(e.pageX === undefined || e.pageX === null){//mobile
	           left = e.originalEvent.touches[0].pageX - $(this).offset().left;
	        }
	        else{ // desktop
	           left = e.pageX - $(this).offset().left;
	        }
	        if (left < 0) {
	          left = 0;
	        }
	        else if (left > width) {
	          left = width;
	        }
	        thumb.addClass('active').css('left', left);
	      }
	
	      thumb.find('.value').html($(this).val());
	    });
	
	    $(document).on('mouseup touchend', range_wrapper, function() {
	      range_mousedown = false;
	      $(this).removeClass('active');
	    });
	
	    $(document).on('mousemove touchmove', range_wrapper, function(e) {
	      var thumb = $(this).children('.thumb');
	      var left;
	      if (range_mousedown) {
	        if (!thumb.hasClass('active')) {
	          thumb.velocity({ height: '30px', width: '30px', top: '-20px', marginLeft: '-15px'}, { duration: 300, easing: 'easeOutExpo' });
	        }
	        if (e.pageX === undefined || e.pageX === null) { //mobile
	          left = e.originalEvent.touches[0].pageX - $(this).offset().left;
	        }
	        else{ // desktop
	          left = e.pageX - $(this).offset().left;
	        }
	        var width = $(this).outerWidth();
	
	        if (left < 0) {
	          left = 0;
	        }
	        else if (left > width) {
	          left = width;
	        }
	        thumb.addClass('active').css('left', left);
	        thumb.find('.value').html(thumb.siblings(range_type).val());
	      }
	    });
	
	    $(document).on('mouseout touchleave', range_wrapper, function() {
	      if (!range_mousedown) {
	
	        var thumb = $(this).children('.thumb');
	
	        if (thumb.hasClass('active')) {
	          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px'}, { duration: 100 });
	        }
	        thumb.removeClass('active');
	      }
	    });
	
	    /**************************
	     * Auto complete plugin  *
	     *************************/
	    $.fn.autocomplete = function (options) {
	      // Defaults
	      var defaults = {
	        data: {}
	      };
	
	      options = $.extend(defaults, options);
	
	      return this.each(function() {
	        var $input = $(this);
	        var data = options.data,
	            $inputDiv = $input.closest('.input-field'); // Div to append on
	
	        // Check if data isn't empty
	        if (!$.isEmptyObject(data)) {
	          // Create autocomplete element
	          var $autocomplete = $('<ul class="autocomplete-content dropdown-content"></ul>');
	
	          // Append autocomplete element
	          if ($inputDiv.length) {
	            $inputDiv.append($autocomplete); // Set ul in body
	          } else {
	            $input.after($autocomplete);
	          }
	
	          var highlight = function(string, $el) {
	            var img = $el.find('img');
	            var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
	                matchEnd = matchStart + string.length - 1,
	                beforeMatch = $el.text().slice(0, matchStart),
	                matchText = $el.text().slice(matchStart, matchEnd + 1),
	                afterMatch = $el.text().slice(matchEnd + 1);
	            $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
	            if (img.length) {
	              $el.prepend(img);
	            }
	          };
	
	          // Perform search
	          $input.on('keyup', function (e) {
	            // Capture Enter
	            if (e.which === 13) {
	              $autocomplete.find('li').first().click();
	              return;
	            }
	
	            var val = $input.val().toLowerCase();
	            $autocomplete.empty();
	
	            // Check if the input isn't empty
	            if (val !== '') {
	              for(var key in data) {
	                if (data.hasOwnProperty(key) &&
	                    key.toLowerCase().indexOf(val) !== -1 &&
	                    key.toLowerCase() !== val) {
	                  var autocompleteOption = $('<li></li>');
	                  if(!!data[key]) {
	                    autocompleteOption.append('<img src="'+ data[key] +'" class="right circle"><span>'+ key +'</span>');
	                  } else {
	                    autocompleteOption.append('<span>'+ key +'</span>');
	                  }
	                  $autocomplete.append(autocompleteOption);
	
	                  highlight(val, autocompleteOption);
	                }
	              }
	            }
	          });
	
	          // Set input value
	          $autocomplete.on('click', 'li', function () {
	            $input.val($(this).text().trim());
	            $input.trigger('change');
	            $autocomplete.empty();
	          });
	        }
	      });
	    };
	
	  }); // End of $(document).ready
	
	  /*******************
	   *  Select Plugin  *
	   ******************/
	  $.fn.material_select = function (callback) {
	    $(this).each(function(){
	      var $select = $(this);
	
	      if ($select.hasClass('browser-default')) {
	        return; // Continue to next (return false breaks out of entire loop)
	      }
	
	      var multiple = $select.attr('multiple') ? true : false,
	          lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt
	
	      if (lastID) {
	        $select.parent().find('span.caret').remove();
	        $select.parent().find('input').remove();
	
	        $select.unwrap();
	        $('ul#select-options-'+lastID).remove();
	      }
	
	      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
	      if(callback === 'destroy') {
	        $select.data('select-id', null).removeClass('initialized');
	        return;
	      }
	
	      var uniqueID = Materialize.guid();
	      $select.data('select-id', uniqueID);
	      var wrapper = $('<div class="select-wrapper"></div>');
	      wrapper.addClass($select.attr('class'));
	      var options = $('<ul id="select-options-' + uniqueID +'" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
	          selectChildren = $select.children('option, optgroup'),
	          valuesSelected = [],
	          optionsHover = false;
	
	      var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";
	
	      // Function that renders and appends the option taking into
	      // account type and possible image icon.
	      var appendOptionWithIcon = function(select, option, type) {
	        // Add disabled attr if disabled
	        var disabledClass = (option.is(':disabled')) ? 'disabled ' : '';
	        var optgroupClass = (type === 'optgroup-option') ? 'optgroup-option ' : '';
	
	        // add icons
	        var icon_url = option.data('icon');
	        var classes = option.attr('class');
	        if (!!icon_url) {
	          var classString = '';
	          if (!!classes) classString = ' class="' + classes + '"';
	
	          // Check for multiple type.
	          if (type === 'multiple') {
	            options.append($('<li class="' + disabledClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
	          } else {
	            options.append($('<li class="' + disabledClass + optgroupClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span>' + option.html() + '</span></li>'));
	          }
	          return true;
	        }
	
	        // Check for multiple type.
	        if (type === 'multiple') {
	          options.append($('<li class="' + disabledClass + '"><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
	        } else {
	          options.append($('<li class="' + disabledClass + optgroupClass + '"><span>' + option.html() + '</span></li>'));
	        }
	      };
	
	      /* Create dropdown structure. */
	      if (selectChildren.length) {
	        selectChildren.each(function() {
	          if ($(this).is('option')) {
	            // Direct descendant option.
	            if (multiple) {
	              appendOptionWithIcon($select, $(this), 'multiple');
	
	            } else {
	              appendOptionWithIcon($select, $(this));
	            }
	          } else if ($(this).is('optgroup')) {
	            // Optgroup.
	            var selectOptions = $(this).children('option');
	            options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));
	
	            selectOptions.each(function() {
	              appendOptionWithIcon($select, $(this), 'optgroup-option');
	            });
	          }
	        });
	      }
	
	      options.find('li:not(.optgroup)').each(function (i) {
	        $(this).click(function (e) {
	          // Check if option element is disabled
	          if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
	            var selected = true;
	
	            if (multiple) {
	              $('input[type="checkbox"]', this).prop('checked', function(i, v) { return !v; });
	              selected = toggleEntryFromArray(valuesSelected, $(this).index(), $select);
	              $newSelect.trigger('focus');
	            } else {
	              options.find('li').removeClass('active');
	              $(this).toggleClass('active');
	              $newSelect.val($(this).text());
	            }
	
	            activateOption(options, $(this));
	            $select.find('option').eq(i).prop('selected', selected);
	            // Trigger onchange() event
	            $select.trigger('change');
	            if (typeof callback !== 'undefined') callback();
	          }
	
	          e.stopPropagation();
	        });
	      });
	
	      // Wrap Elements
	      $select.wrap(wrapper);
	      // Add Select Display Element
	      var dropdownIcon = $('<span class="caret">&#9660;</span>');
	      if ($select.is(':disabled'))
	        dropdownIcon.addClass('disabled');
	
	      // escape double quotes
	      var sanitizedLabelHtml = label.replace(/"/g, '&quot;');
	
	      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ sanitizedLabelHtml +'"/>');
	      $select.before($newSelect);
	      $newSelect.before(dropdownIcon);
	
	      $newSelect.after(options);
	      // Check if section element is disabled
	      if (!$select.is(':disabled')) {
	        $newSelect.dropdown({'hover': false, 'closeOnClick': false});
	      }
	
	      // Copy tabindex
	      if ($select.attr('tabindex')) {
	        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
	      }
	
	      $select.addClass('initialized');
	
	      $newSelect.on({
	        'focus': function (){
	          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
	            $('input.select-dropdown').trigger('close');
	          }
	          if (!options.is(':visible')) {
	            $(this).trigger('open', ['focus']);
	            var label = $(this).val();
	            var selectedOption = options.find('li').filter(function() {
	              return $(this).text().toLowerCase() === label.toLowerCase();
	            })[0];
	            activateOption(options, selectedOption);
	          }
	        },
	        'click': function (e){
	          e.stopPropagation();
	        }
	      });
	
	      $newSelect.on('blur', function() {
	        if (!multiple) {
	          $(this).trigger('close');
	        }
	        options.find('li.selected').removeClass('selected');
	      });
	
	      options.hover(function() {
	        optionsHover = true;
	      }, function () {
	        optionsHover = false;
	      });
	
	      $(window).on({
	        'click': function () {
	          multiple && (optionsHover || $newSelect.trigger('close'));
	        }
	      });
	
	      // Add initial multiple selections.
	      if (multiple) {
	        $select.find("option:selected:not(:disabled)").each(function () {
	          var index = $(this).index();
	
	          toggleEntryFromArray(valuesSelected, index, $select);
	          options.find("li").eq(index).find(":checkbox").prop("checked", true);
	        });
	      }
	
	      // Make option as selected and scroll to selected position
	      var activateOption = function(collection, newOption) {
	        if (newOption) {
	          collection.find('li.selected').removeClass('selected');
	          var option = $(newOption);
	          option.addClass('selected');
	          options.scrollTo(option);
	        }
	      };
	
	      // Allow user to search by typing
	      // this array is cleared after 1 second
	      var filterQuery = [],
	          onKeyDown = function(e){
	            // TAB - switch to another input
	            if(e.which == 9){
	              $newSelect.trigger('close');
	              return;
	            }
	
	            // ARROW DOWN WHEN SELECT IS CLOSED - open select options
	            if(e.which == 40 && !options.is(':visible')){
	              $newSelect.trigger('open');
	              return;
	            }
	
	            // ENTER WHEN SELECT IS CLOSED - submit form
	            if(e.which == 13 && !options.is(':visible')){
	              return;
	            }
	
	            e.preventDefault();
	
	            // CASE WHEN USER TYPE LETTERS
	            var letter = String.fromCharCode(e.which).toLowerCase(),
	                nonLetters = [9,13,27,38,40];
	            if (letter && (nonLetters.indexOf(e.which) === -1)) {
	              filterQuery.push(letter);
	
	              var string = filterQuery.join(''),
	                  newOption = options.find('li').filter(function() {
	                    return $(this).text().toLowerCase().indexOf(string) === 0;
	                  })[0];
	
	              if (newOption) {
	                activateOption(options, newOption);
	              }
	            }
	
	            // ENTER - select option and close when select options are opened
	            if (e.which == 13) {
	              var activeOption = options.find('li.selected:not(.disabled)')[0];
	              if(activeOption){
	                $(activeOption).trigger('click');
	                if (!multiple) {
	                  $newSelect.trigger('close');
	                }
	              }
	            }
	
	            // ARROW DOWN - move to next not disabled option
	            if (e.which == 40) {
	              if (options.find('li.selected').length) {
	                newOption = options.find('li.selected').next('li:not(.disabled)')[0];
	              } else {
	                newOption = options.find('li:not(.disabled)')[0];
	              }
	              activateOption(options, newOption);
	            }
	
	            // ESC - close options
	            if (e.which == 27) {
	              $newSelect.trigger('close');
	            }
	
	            // ARROW UP - move to previous not disabled option
	            if (e.which == 38) {
	              newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
	              if(newOption)
	                activateOption(options, newOption);
	            }
	
	            // Automaticaly clean filter query so user can search again by starting letters
	            setTimeout(function(){ filterQuery = []; }, 1000);
	          };
	
	      $newSelect.on('keydown', onKeyDown);
	    });
	
	    function toggleEntryFromArray(entriesArray, entryIndex, select) {
	      var index = entriesArray.indexOf(entryIndex),
	          notAdded = index === -1;
	
	      if (notAdded) {
	        entriesArray.push(entryIndex);
	      } else {
	        entriesArray.splice(index, 1);
	      }
	
	      select.siblings('ul.dropdown-content').find('li').eq(entryIndex).toggleClass('active');
	
	      // use notAdded instead of true (to detect if the option is selected or not)
	      select.find('option').eq(entryIndex).prop('selected', notAdded);
	      setValueToInput(entriesArray, select);
	
	      return notAdded;
	    }
	
	    function setValueToInput(entriesArray, select) {
	      var value = '';
	
	      for (var i = 0, count = entriesArray.length; i < count; i++) {
	        var text = select.find('option').eq(entriesArray[i]).text();
	
	        i === 0 ? value += text : value += ', ' + text;
	      }
	
	      if (value === '') {
	        value = select.find('option:disabled').eq(0).text();
	      }
	
	      select.siblings('input.select-dropdown').val(value);
	    }
	  };
	
	}( jQuery ));
	;(function ($) {
	
	  var methods = {
	
	    init : function(options) {
	      var defaults = {
	        indicators: true,
	        height: 400,
	        transition: 500,
	        interval: 6000
	      };
	      options = $.extend(defaults, options);
	
	      return this.each(function() {
	
	        // For each slider, we want to keep track of
	        // which slide is active and its associated content
	        var $this = $(this);
	        var $slider = $this.find('ul.slides').first();
	        var $slides = $slider.find('> li');
	        var $active_index = $slider.find('.active').index();
	        var $active, $indicators, $interval;
	        if ($active_index != -1) { $active = $slides.eq($active_index); }
	
	        // Transitions the caption depending on alignment
	        function captionTransition(caption, duration) {
	          if (caption.hasClass("center-align")) {
	            caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
	          }
	          else if (caption.hasClass("right-align")) {
	            caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
	          }
	          else if (caption.hasClass("left-align")) {
	            caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
	          }
	        }
	
	        // This function will transition the slide to any index of the next slide
	        function moveToSlide(index) {
	          // Wrap around indices.
	          if (index >= $slides.length) index = 0;
	          else if (index < 0) index = $slides.length -1;
	
	          $active_index = $slider.find('.active').index();
	
	          // Only do if index changes
	          if ($active_index != index) {
	            $active = $slides.eq($active_index);
	            $caption = $active.find('.caption');
	
	            $active.removeClass('active');
	            $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
	                              complete: function() {
	                                $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
	                              } });
	            captionTransition($caption, options.transition);
	
	
	            // Update indicators
	            if (options.indicators) {
	              $indicators.eq($active_index).removeClass('active');
	            }
	
	            $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
	            $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
	            $slides.eq(index).addClass('active');
	
	
	            // Update indicators
	            if (options.indicators) {
	              $indicators.eq(index).addClass('active');
	            }
	          }
	        }
	
	        // Set height of slider
	        // If fullscreen, do nothing
	        if (!$this.hasClass('fullscreen')) {
	          if (options.indicators) {
	            // Add height if indicators are present
	            $this.height(options.height + 40);
	          }
	          else {
	            $this.height(options.height);
	          }
	          $slider.height(options.height);
	        }
	
	
	        // Set initial positions of captions
	        $slides.find('.caption').each(function () {
	          captionTransition($(this), 0);
	        });
	
	        // Move img src into background-image
	        $slides.find('img').each(function () {
	          var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	          if ($(this).attr('src') !== placeholderBase64) {
	            $(this).css('background-image', 'url(' + $(this).attr('src') + ')' );
	            $(this).attr('src', placeholderBase64);
	          }
	        });
	
	        // dynamically add indicators
	        if (options.indicators) {
	          $indicators = $('<ul class="indicators"></ul>');
	          $slides.each(function( index ) {
	            var $indicator = $('<li class="indicator-item"></li>');
	
	            // Handle clicks on indicators
	            $indicator.click(function () {
	              var $parent = $slider.parent();
	              var curr_index = $parent.find($(this)).index();
	              moveToSlide(curr_index);
	
	              // reset interval
	              clearInterval($interval);
	              $interval = setInterval(
	                function(){
	                  $active_index = $slider.find('.active').index();
	                  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
	                  else $active_index += 1;
	
	                  moveToSlide($active_index);
	
	                }, options.transition + options.interval
	              );
	            });
	            $indicators.append($indicator);
	          });
	          $this.append($indicators);
	          $indicators = $this.find('ul.indicators').find('li.indicator-item');
	        }
	
	        if ($active) {
	          $active.show();
	        }
	        else {
	          $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
	
	          $active_index = 0;
	          $active = $slides.eq($active_index);
	
	          // Update indicators
	          if (options.indicators) {
	            $indicators.eq($active_index).addClass('active');
	          }
	        }
	
	        // Adjust height to current slide
	        $active.find('img').each(function() {
	          $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
	        });
	
	        // auto scroll
	        $interval = setInterval(
	          function(){
	            $active_index = $slider.find('.active').index();
	            moveToSlide($active_index + 1);
	
	          }, options.transition + options.interval
	        );
	
	
	        // HammerJS, Swipe navigation
	
	        // Touch Event
	        var panning = false;
	        var swipeLeft = false;
	        var swipeRight = false;
	
	        $this.hammer({
	            prevent_default: false
	        }).bind('pan', function(e) {
	          if (e.gesture.pointerType === "touch") {
	
	            // reset interval
	            clearInterval($interval);
	
	            var direction = e.gesture.direction;
	            var x = e.gesture.deltaX;
	            var velocityX = e.gesture.velocityX;
	
	            $curr_slide = $slider.find('.active');
	            $curr_slide.velocity({ translateX: x
	                }, {duration: 50, queue: false, easing: 'easeOutQuad'});
	
	            // Swipe Left
	            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
	              swipeRight = true;
	            }
	            // Swipe Right
	            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
	              swipeLeft = true;
	            }
	
	            // Make Slide Behind active slide visible
	            var next_slide;
	            if (swipeLeft) {
	              next_slide = $curr_slide.next();
	              if (next_slide.length === 0) {
	                next_slide = $slides.first();
	              }
	              next_slide.velocity({ opacity: 1
	                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
	            }
	            if (swipeRight) {
	              next_slide = $curr_slide.prev();
	              if (next_slide.length === 0) {
	                next_slide = $slides.last();
	              }
	              next_slide.velocity({ opacity: 1
	                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
	            }
	
	
	          }
	
	        }).bind('panend', function(e) {
	          if (e.gesture.pointerType === "touch") {
	
	            $curr_slide = $slider.find('.active');
	            panning = false;
	            curr_index = $slider.find('.active').index();
	
	            if (!swipeRight && !swipeLeft || $slides.length <=1) {
	              // Return to original spot
	              $curr_slide.velocity({ translateX: 0
	                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
	            }
	            else if (swipeLeft) {
	              moveToSlide(curr_index + 1);
	              $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
	                                    complete: function() {
	                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
	                                    } });
	            }
	            else if (swipeRight) {
	              moveToSlide(curr_index - 1);
	              $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
	                                    complete: function() {
	                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
	                                    } });
	            }
	            swipeLeft = false;
	            swipeRight = false;
	
	            // Restart interval
	            clearInterval($interval);
	            $interval = setInterval(
	              function(){
	                $active_index = $slider.find('.active').index();
	                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
	                else $active_index += 1;
	
	                moveToSlide($active_index);
	
	              }, options.transition + options.interval
	            );
	          }
	        });
	
	        $this.on('sliderPause', function() {
	          clearInterval($interval);
	        });
	
	        $this.on('sliderStart', function() {
	          clearInterval($interval);
	          $interval = setInterval(
	            function(){
	              $active_index = $slider.find('.active').index();
	              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
	              else $active_index += 1;
	
	              moveToSlide($active_index);
	
	            }, options.transition + options.interval
	          );
	        });
	
	        $this.on('sliderNext', function() {
	          $active_index = $slider.find('.active').index();
	          moveToSlide($active_index + 1);
	        });
	
	        $this.on('sliderPrev', function() {
	          $active_index = $slider.find('.active').index();
	          moveToSlide($active_index - 1);
	        });
	
	      });
	
	
	
	    },
	    pause : function() {
	      $(this).trigger('sliderPause');
	    },
	    start : function() {
	      $(this).trigger('sliderStart');
	    },
	    next : function() {
	      $(this).trigger('sliderNext');
	    },
	    prev : function() {
	      $(this).trigger('sliderPrev');
	    }
	  };
	
	
	    $.fn.slider = function(methodOrOptions) {
	      if ( methods[methodOrOptions] ) {
	        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	        // Default to "init"
	        return methods.init.apply( this, arguments );
	      } else {
	        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
	      }
	    }; // Plugin end
	}( jQuery ));
	;(function ($) {
	  $(document).ready(function() {
	
	    $(document).on('click.card', '.card', function (e) {
	      if ($(this).find('> .card-reveal').length) {
	        if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
	          // Make Reveal animate down and display none
	          $(this).find('.card-reveal').velocity(
	            {translateY: 0}, {
	              duration: 225,
	              queue: false,
	              easing: 'easeInOutQuad',
	              complete: function() { $(this).css({ display: 'none'}); }
	            }
	          );
	        }
	        else if ($(e.target).is($('.card .activator')) ||
	                 $(e.target).is($('.card .activator i')) ) {
	          $(e.target).closest('.card').css('overflow', 'hidden');
	          $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
	        }
	      }
	    });
	
	  });
	}( jQuery ));;(function ($) {
	  var chipsHandleEvents = false;
	  var materialChipsDefaults = {
	    data: [],
	    placeholder: '',
	    secondaryPlaceholder: '',
	  };
	
	  $(document).ready(function() {
	    // Handle removal of static chips.
	    $(document).on('click', '.chip .close', function(e){
	      var $chips = $(this).closest('.chips');
	      if ($chips.attr('data-initialized')) {
	        return;
	      }
	      $(this).closest('.chip').remove();
	    });
	  });
	
	  $.fn.material_chip = function (options) {
	    var self = this;
	    this.$el = $(this);
	    this.$document = $(document);
	    this.SELS = {
	      CHIPS: '.chips',
	      CHIP: '.chip',
	      INPUT: 'input',
	      DELETE: '.material-icons',
	      SELECTED_CHIP: '.selected',
	    };
	
	    if ('data' === options) {
	      return this.$el.data('chips');
	    }
	
	    var curr_options = $.extend({}, materialChipsDefaults, options);
	
	
	    // Initialize
	    this.init = function() {
	      var i = 0;
	      var chips;
	      self.$el.each(function(){
	        var $chips = $(this);
	        var chipId = Materialize.guid();
	
	        if (!curr_options.data || !(curr_options.data instanceof Array)) {
	          curr_options.data = [];
	        }
	        $chips.data('chips', curr_options.data);
	        $chips.attr('data-index', i);
	        $chips.attr('data-initialized', true);
	
	        if (!$chips.hasClass(self.SELS.CHIPS)) {
	          $chips.addClass('chips');
	        }
	
	        self.chips($chips, chipId);
	        i++;
	      });
	    };
	
	    this.handleEvents = function(){
	      var SELS = self.SELS;
	
	      self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, function(e){
	        $(e.target).find(SELS.INPUT).focus();
	      });
	
	      self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, function(e){
	        $(SELS.CHIP).removeClass('selected');
	        $(this).toggleClass('selected');
	      });
	
	      self.$document.off('keydown.chips').on('keydown.chips', function(e){
	        if ($(e.target).is('input, textarea')) {
	          return;
	        }
	
	        // delete
	        var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
	        var $chips = $chip.closest(SELS.CHIPS);
	        var length = $chip.siblings(SELS.CHIP).length;
	        var index;
	
	        if (!$chip.length) {
	          return;
	        }
	
	        if (e.which === 8 || e.which === 46) {
	          e.preventDefault();
	
	          index = $chip.index();
	          self.deleteChip(index, $chips);
	
	          var selectIndex = null;
	          if ((index + 1) < length) {
	            selectIndex = index;
	          } else if (index === length || (index + 1) === length) {
	            selectIndex = length - 1;
	          }
	
	          if (selectIndex < 0) selectIndex = null;
	
	          if (null !== selectIndex) {
	            self.selectChip(selectIndex, $chips);
	          }
	          if (!length) $chips.find('input').focus();
	
	        // left
	        } else if (e.which === 37) {
	          index = $chip.index() - 1;
	          if (index < 0) {
	            return;
	          }
	          $(SELS.CHIP).removeClass('selected');
	          self.selectChip(index, $chips);
	
	        // right
	        } else if (e.which === 39) {
	          index = $chip.index() + 1;
	          $(SELS.CHIP).removeClass('selected');
	          if (index > length) {
	            $chips.find('input').focus();
	            return;
	          }
	          self.selectChip(index, $chips);
	        }
	      });
	
	      self.$document.off('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
	        var $currChips = $(e.target).closest(SELS.CHIPS);
	        $currChips.addClass('focus');
	        $currChips.siblings('label, .prefix').addClass('active');
	        $(SELS.CHIP).removeClass('selected');
	      });
	
	      self.$document.off('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
	        var $currChips = $(e.target).closest(SELS.CHIPS);
	        $currChips.removeClass('focus');
	
	        // Remove active if empty
	        if (!$currChips.data('chips').length) {
	          $currChips.siblings('label').removeClass('active');
	        }
	        $currChips.siblings('.prefix').removeClass('active');
	      });
	
	      self.$document.off('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT).on('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
	        var $target = $(e.target);
	        var $chips = $target.closest(SELS.CHIPS);
	        var chipsLength = $chips.children(SELS.CHIP).length;
	
	        // enter
	        if (13 === e.which) {
	          e.preventDefault();
	          self.addChip({tag: $target.val()}, $chips);
	          $target.val('');
	          return;
	        }
	
	        // delete or left
	         if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
	          self.selectChip(chipsLength - 1, $chips);
	          $target.blur();
	          return;
	        }
	      });
	
	      // Click on delete icon in chip.
	      self.$document.off('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE).on('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE, function(e) {
	        var $target = $(e.target);
	        var $chips = $target.closest(SELS.CHIPS);
	        var $chip = $target.closest(SELS.CHIP);
	        e.stopPropagation();
	        self.deleteChip($chip.index(), $chips);
	        $chips.find('input').focus();
	      });
	    };
	
	    this.chips = function($chips, chipId) {
	      var html = '';
	      $chips.data('chips').forEach(function(elem){
	        html += self.renderChip(elem);
	      });
	      html += '<input id="' + chipId +'" class="input" placeholder="">';
	      $chips.html(html);
	      self.setPlaceholder($chips);
	
	      // Set for attribute for label
	      var label = $chips.next('label');
	      if (label.length) {
	        label.attr('for', chipId);
	
	        if ($chips.data('chips').length) {
	          label.addClass('active');
	        }
	      }
	    };
	
	    this.renderChip = function(elem) {
	      if (!elem.tag) return;
	
	      var html = '<div class="chip">' + elem.tag;
	      if (elem.image) {
	        html += ' <img src="' + elem.image + '"> ';
	      }
	      html += '<i class="material-icons close">close</i>';
	      html += '</div>';
	      return html;
	    };
	
	    this.setPlaceholder = function($chips) {
	      if ($chips.data('chips').length && curr_options.placeholder) {
	        $chips.find('input').prop('placeholder', curr_options.placeholder);
	
	      } else if (!$chips.data('chips').length && curr_options.secondaryPlaceholder) {
	        $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
	      }
	    };
	
	    this.isValid = function($chips, elem) {
	      var chips = $chips.data('chips');
	      var exists = false;
	      for (var i=0; i < chips.length; i++) {
	        if (chips[i].tag === elem.tag) {
	            exists = true;
	            return;
	        }
	      }
	      return '' !== elem.tag && !exists;
	    };
	
	    this.addChip = function(elem, $chips) {
	      if (!self.isValid($chips, elem)) {
	        return;
	      }
	      var chipHtml = self.renderChip(elem);
	      var newData = [];
	      var oldData = $chips.data('chips');
	      for (var i = 0; i < oldData.length; i++) {
	        newData.push(oldData[i]);
	      }
	      newData.push(elem);
	
	      $chips.data('chips', newData);
	      $(chipHtml).insertBefore($chips.find('input'));
	      $chips.trigger('chip.add', elem);
	      self.setPlaceholder($chips);
	    };
	
	    this.deleteChip = function(chipIndex, $chips) {
	      var chip = $chips.data('chips')[chipIndex];
	      $chips.find('.chip').eq(chipIndex).remove();
	
	      var newData = [];
	      var oldData = $chips.data('chips');
	      for (var i = 0; i < oldData.length; i++) {
	        if (i !== chipIndex) {
	          newData.push(oldData[i]);
	        }
	      }
	
	      $chips.data('chips', newData);
	      $chips.trigger('chip.delete', chip);
	      self.setPlaceholder($chips);
	    };
	
	    this.selectChip = function(chipIndex, $chips) {
	      var $chip = $chips.find('.chip').eq(chipIndex);
	      if ($chip && false === $chip.hasClass('selected')) {
	        $chip.addClass('selected');
	        $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
	      }
	    };
	
	    this.getChipsElement = function(index, $chips) {
	      return $chips.eq(index);
	    };
	
	    // init
	    this.init();
	
	    if (!chipsHandleEvents) {
	      this.handleEvents();
	      chipsHandleEvents = true;
	    }
	  };
	}( jQuery ));;(function ($) {
	  $.fn.pushpin = function (options) {
	    // Defaults
	    var defaults = {
	      top: 0,
	      bottom: Infinity,
	      offset: 0
	    };
	
	    // Remove pushpin event and classes
	    if (options === "remove") {
	      this.each(function () {
	        if (id = $(this).data('pushpin-id')) {
	          $(window).off('scroll.' + id);
	          $(this).removeData('pushpin-id').removeClass('pin-top pinned pin-bottom').removeAttr('style');
	        }
	      });
	      return false;
	    }
	
	    options = $.extend(defaults, options);
	
	
	    $index = 0;
	    return this.each(function() {
	      var $uniqueId = Materialize.guid(),
	          $this = $(this),
	          $original_offset = $(this).offset().top;
	
	      function removePinClasses(object) {
	        object.removeClass('pin-top');
	        object.removeClass('pinned');
	        object.removeClass('pin-bottom');
	      }
	
	      function updateElements(objects, scrolled) {
	        objects.each(function () {
	          // Add position fixed (because its between top and bottom)
	          if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
	            removePinClasses($(this));
	            $(this).css('top', options.offset);
	            $(this).addClass('pinned');
	          }
	
	          // Add pin-top (when scrolled position is above top)
	          if (scrolled < options.top && !$(this).hasClass('pin-top')) {
	            removePinClasses($(this));
	            $(this).css('top', 0);
	            $(this).addClass('pin-top');
	          }
	
	          // Add pin-bottom (when scrolled position is below bottom)
	          if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
	            removePinClasses($(this));
	            $(this).addClass('pin-bottom');
	            $(this).css('top', options.bottom - $original_offset);
	          }
	        });
	      }
	
	      $(this).data('pushpin-id', $uniqueId);
	      updateElements($this, $(window).scrollTop());
	      $(window).on('scroll.' + $uniqueId, function () {
	        var $scrolled = $(window).scrollTop() + options.offset;
	        updateElements($this, $scrolled);
	      });
	
	    });
	
	  };
	}( jQuery ));;(function ($) {
	  $(document).ready(function() {
	
	    // jQuery reverse
	    $.fn.reverse = [].reverse;
	
	    // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
	    $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function(e) {
	      var $this = $(this);
	      openFABMenu($this);
	    });
	    $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function(e) {
	      var $this = $(this);
	      closeFABMenu($this);
	    });
	
	    // Toggle-on-click behaviour.
	    $(document).on('click.fabClickToggle', '.fixed-action-btn.click-to-toggle > a', function(e) {
	      var $this = $(this);
	      var $menu = $this.parent();
	      if ($menu.hasClass('active')) {
	        closeFABMenu($menu);
	      } else {
	        openFABMenu($menu);
	      }
	    });
	
	    // Toolbar transition behaviour.
	    $(document).on('click.fabToolbar', '.fixed-action-btn.toolbar > a', function(e) {
	      var $this = $(this);
	      var $menu = $this.parent();
	      FABtoToolbar($menu);
	    });
	
	  });
	
	  $.fn.extend({
	    openFAB: function() {
	      openFABMenu($(this));
	    },
	    closeFAB: function() {
	      closeFABMenu($(this));
	    },
	    openToolbar: function() {
	      FABtoToolbar($(this));
	    },
	    closeToolbar: function() {
	      toolbarToFAB($(this));
	    }
	  });
	
	
	  var openFABMenu = function (btn) {
	    var $this = btn;
	    if ($this.hasClass('active') === false) {
	
	      // Get direction option
	      var horizontal = $this.hasClass('horizontal');
	      var offsetY, offsetX;
	
	      if (horizontal === true) {
	        offsetX = 40;
	      } else {
	        offsetY = 40;
	      }
	
	      $this.addClass('active');
	      $this.find('ul .btn-floating').velocity(
	        { scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
	        { duration: 0 });
	
	      var time = 0;
	      $this.find('ul .btn-floating').reverse().each( function () {
	        $(this).velocity(
	          { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
	          { duration: 80, delay: time });
	        time += 40;
	      });
	    }
	  };
	
	  var closeFABMenu = function (btn) {
	    var $this = btn;
	    // Get direction option
	    var horizontal = $this.hasClass('horizontal');
	    var offsetY, offsetX;
	
	    if (horizontal === true) {
	      offsetX = 40;
	    } else {
	      offsetY = 40;
	    }
	
	    $this.removeClass('active');
	    var time = 0;
	    $this.find('ul .btn-floating').velocity("stop", true);
	    $this.find('ul .btn-floating').velocity(
	      { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
	      { duration: 80 }
	    );
	  };
	
	
	  /**
	   * Transform FAB into toolbar
	   * @param  {Object}  object jQuery object
	   */
	  var FABtoToolbar = function(btn) {
	    if (btn.attr('data-open') === "true") {
	      return;
	    }
	
	    var offsetX, offsetY, scaleFactor;
	    var windowWidth = window.innerWidth;
	    var windowHeight = window.innerHeight;
	    var btnRect = btn[0].getBoundingClientRect();
	    var anchor = btn.find('> a').first();
	    var menu = btn.find('> ul').first();
	    var backdrop = $('<div class="fab-backdrop"></div>');
	    var fabColor = anchor.css('background-color');
	    anchor.append(backdrop);
	
	    offsetX = btnRect.left - (windowWidth / 2) + (btnRect.width / 2);
	    offsetY = windowHeight - btnRect.bottom;
	    scaleFactor = windowWidth / backdrop.width();
	    btn.attr('data-origin-bottom', btnRect.bottom);
	    btn.attr('data-origin-left', btnRect.left);
	    btn.attr('data-origin-width', btnRect.width);
	
	    // Set initial state
	    btn.addClass('active');
	    btn.attr('data-open', true);
	    btn.css({
	      'text-align': 'center',
	      width: '100%',
	      bottom: 0,
	      left: 0,
	      transform: 'translateX(' + offsetX + 'px)',
	      transition: 'none'
	    });
	    anchor.css({
	      transform: 'translateY(' + -offsetY + 'px)',
	      transition: 'none'
	    });
	    backdrop.css({
	      'background-color': fabColor
	    });
	
	
	    setTimeout(function() {
	      btn.css({
	        transform: '',
	        transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
	      });
	      anchor.css({
	        overflow: 'visible',
	        transform: '',
	        transition: 'transform .2s'
	      });
	
	      setTimeout(function() {
	        btn.css({
	          overflow: 'hidden',
	          'background-color': fabColor
	        });
	        backdrop.css({
	          transform: 'scale(' + scaleFactor + ')',
	          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
	        });
	        menu.find('> li > a').css({
	          opacity: 1
	        });
	
	        // Scroll to close.
	        $(window).on('scroll.fabToolbarClose', function() {
	          toolbarToFAB(btn);
	          $(window).off('scroll.fabToolbarClose');
	          $(document).off('click.fabToolbarClose');
	        });
	
	        $(document).on('click.fabToolbarClose', function(e) {
	          if (!$(e.target).closest(menu).length) {
	            toolbarToFAB(btn);
	            $(window).off('scroll.fabToolbarClose');
	            $(document).off('click.fabToolbarClose');
	          }
	        });
	      }, 100);
	    }, 0);
	  };
	
	  /**
	   * Transform toolbar back into FAB
	   * @param  {Object}  object jQuery object
	   */
	  var toolbarToFAB = function(btn) {
	    if (btn.attr('data-open') !== "true") {
	      return;
	    }
	
	    var offsetX, offsetY, scaleFactor;
	    var windowWidth = window.innerWidth;
	    var windowHeight = window.innerHeight;
	    var btnWidth = btn.attr('data-origin-width');
	    var btnBottom = btn.attr('data-origin-bottom');
	    var btnLeft = btn.attr('data-origin-left');
	    var anchor = btn.find('> .btn-floating').first();
	    var menu = btn.find('> ul').first();
	    var backdrop = btn.find('.fab-backdrop');
	    var fabColor = anchor.css('background-color');
	
	    offsetX = btnLeft - (windowWidth / 2) + (btnWidth / 2);
	    offsetY = windowHeight - btnBottom;
	    scaleFactor = windowWidth / backdrop.width();
	
	
	    // Hide backdrop
	    btn.removeClass('active');
	    btn.attr('data-open', false);
	    btn.css({
	      'background-color': 'transparent',
	      transition: 'none'
	    });
	    anchor.css({
	      transition: 'none'
	    });
	    backdrop.css({
	      transform: 'scale(0)',
	      'background-color': fabColor
	    });
	    menu.find('> li > a').css({
	      opacity: ''
	    });
	
	    setTimeout(function() {
	      backdrop.remove();
	
	      // Set initial state.
	      btn.css({
	        'text-align': '',
	        width: '',
	        bottom: '',
	        left: '',
	        overflow: '',
	        'background-color': '',
	        transform: 'translate3d(' + -offsetX + 'px,0,0)'
	      });
	      anchor.css({
	        overflow: '',
	        transform: 'translate3d(0,' + offsetY + 'px,0)'
	      });
	
	      setTimeout(function() {
	        btn.css({
	          transform: 'translate3d(0,0,0)',
	          transition: 'transform .2s'
	        });
	        anchor.css({
	          transform: 'translate3d(0,0,0)',
	          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
	        });
	      }, 20);
	    }, 200);
	  };
	
	
	}( jQuery ));
	;(function ($) {
	  // Image transition function
	  Materialize.fadeInImage =  function(selectorOrEl) {
	    var element;
	    if (typeof(selectorOrEl) === 'string') {
	      element = $(selectorOrEl);
	    } else if (typeof(selectorOrEl) === 'object') {
	      element = selectorOrEl;
	    } else {
	      return;
	    }
	    element.css({opacity: 0});
	    $(element).velocity({opacity: 1}, {
	        duration: 650,
	        queue: false,
	        easing: 'easeOutSine'
	      });
	    $(element).velocity({opacity: 1}, {
	          duration: 1300,
	          queue: false,
	          easing: 'swing',
	          step: function(now, fx) {
	              fx.start = 100;
	              var grayscale_setting = now/100;
	              var brightness_setting = 150 - (100 - now)/1.75;
	
	              if (brightness_setting < 100) {
	                brightness_setting = 100;
	              }
	              if (now >= 0) {
	                $(this).css({
	                    "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
	                    "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
	                });
	              }
	          }
	      });
	  };
	
	  // Horizontal staggered list
	  Materialize.showStaggeredList = function(selectorOrEl) {
	    var element;
	    if (typeof(selectorOrEl) === 'string') {
	      element = $(selectorOrEl);
	    } else if (typeof(selectorOrEl) === 'object') {
	      element = selectorOrEl;
	    } else {
	      return;
	    }
	    var time = 0;
	    element.find('li').velocity(
	        { translateX: "-100px"},
	        { duration: 0 });
	
	    element.find('li').each(function() {
	      $(this).velocity(
	        { opacity: "1", translateX: "0"},
	        { duration: 800, delay: time, easing: [60, 10] });
	      time += 120;
	    });
	  };
	
	
	  $(document).ready(function() {
	    // Hardcoded .staggered-list scrollFire
	    // var staggeredListOptions = [];
	    // $('ul.staggered-list').each(function (i) {
	
	    //   var label = 'scrollFire-' + i;
	    //   $(this).addClass(label);
	    //   staggeredListOptions.push(
	    //     {selector: 'ul.staggered-list.' + label,
	    //      offset: 200,
	    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
	    // });
	    // scrollFire(staggeredListOptions);
	
	    // HammerJS, Swipe navigation
	
	    // Touch Event
	    var swipeLeft = false;
	    var swipeRight = false;
	
	
	    // Dismissible Collections
	    $('.dismissable').each(function() {
	      $(this).hammer({
	        prevent_default: false
	      }).bind('pan', function(e) {
	        if (e.gesture.pointerType === "touch") {
	          var $this = $(this);
	          var direction = e.gesture.direction;
	          var x = e.gesture.deltaX;
	          var velocityX = e.gesture.velocityX;
	
	          $this.velocity({ translateX: x
	              }, {duration: 50, queue: false, easing: 'easeOutQuad'});
	
	          // Swipe Left
	          if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
	            swipeLeft = true;
	          }
	
	          // Swipe Right
	          if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
	            swipeRight = true;
	          }
	        }
	      }).bind('panend', function(e) {
	        // Reset if collection is moved back into original position
	        if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
	          swipeRight = false;
	          swipeLeft = false;
	        }
	
	        if (e.gesture.pointerType === "touch") {
	          var $this = $(this);
	          if (swipeLeft || swipeRight) {
	            var fullWidth;
	            if (swipeLeft) { fullWidth = $this.innerWidth(); }
	            else { fullWidth = -1 * $this.innerWidth(); }
	
	            $this.velocity({ translateX: fullWidth,
	              }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:
	              function() {
	                $this.css('border', 'none');
	                $this.velocity({ height: 0, padding: 0,
	                  }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:
	                    function() { $this.remove(); }
	                  });
	              }
	            });
	          }
	          else {
	            $this.velocity({ translateX: 0,
	              }, {duration: 100, queue: false, easing: 'easeOutQuad'});
	          }
	          swipeLeft = false;
	          swipeRight = false;
	        }
	      });
	
	    });
	
	
	    // time = 0
	    // // Vertical Staggered list
	    // $('ul.staggered-list.vertical li').velocity(
	    //     { translateY: "100px"},
	    //     { duration: 0 });
	
	    // $('ul.staggered-list.vertical li').each(function() {
	    //   $(this).velocity(
	    //     { opacity: "1", translateY: "0"},
	    //     { duration: 800, delay: time, easing: [60, 25] });
	    //   time += 120;
	    // });
	
	    // // Fade in and Scale
	    // $('.fade-in.scale').velocity(
	    //     { scaleX: .4, scaleY: .4, translateX: -600},
	    //     { duration: 0});
	    // $('.fade-in').each(function() {
	    //   $(this).velocity(
	    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
	    //     { duration: 800, easing: [60, 10] });
	    // });
	  });
	}( jQuery ));
	;(function($) {
	
	  // Input: Array of JSON objects {selector, offset, callback}
	
	  Materialize.scrollFire = function(options) {
	
	    var didScroll = false;
	
	    window.addEventListener("scroll", function() {
	      didScroll = true;
	    });
	
	    // Rate limit to 100ms
	    setInterval(function() {
	      if(didScroll) {
	          didScroll = false;
	
	          var windowScroll = window.pageYOffset + window.innerHeight;
	
	          for (var i = 0 ; i < options.length; i++) {
	            // Get options from each line
	            var value = options[i];
	            var selector = value.selector,
	                offset = value.offset,
	                callback = value.callback;
	
	            var currentElement = document.querySelector(selector);
	            if ( currentElement !== null) {
	              var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
	
	              if (windowScroll > (elementOffset + offset)) {
	                if (value.done !== true) {
	                  if (typeof(callback) === 'function') {
	                    callback.call(this, currentElement);
	                  } else if (typeof(callback) === 'string') {
	                    var callbackFunc = new Function(callback);
	                    callbackFunc(currentElement);
	                  }
	                  value.done = true;
	                }
	              }
	            }
	          }
	      }
	    }, 100);
	  };
	
	})(jQuery);
	;/*!
	 * pickadate.js v3.5.0, 2014/04/13
	 * By Amsul, http://amsul.ca
	 * Hosted on http://amsul.github.io/pickadate.js
	 * Licensed under MIT
	 */
	
	(function ( factory ) {
	
	    // AMD.
	    if ( true )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_0__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__))
	
	    // Node.js/browserify.
	    else if ( typeof exports == 'object' )
	        module.exports = factory( require('jquery') )
	
	    // Browser globals.
	    else this.Picker = factory( jQuery )
	
	}(function( $ ) {
	
	var $window = $( window )
	var $document = $( document )
	var $html = $( document.documentElement )
	
	
	/**
	 * The picker constructor that creates a blank picker.
	 */
	function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {
	
	    // If there’s no element, return the picker constructor.
	    if ( !ELEMENT ) return PickerConstructor
	
	
	    var
	        IS_DEFAULT_THEME = false,
	
	
	        // The state of the picker.
	        STATE = {
	            id: ELEMENT.id || 'P' + Math.abs( ~~(Math.random() * new Date()) )
	        },
	
	
	        // Merge the defaults and options passed.
	        SETTINGS = COMPONENT ? $.extend( true, {}, COMPONENT.defaults, OPTIONS ) : OPTIONS || {},
	
	
	        // Merge the default classes with the settings classes.
	        CLASSES = $.extend( {}, PickerConstructor.klasses(), SETTINGS.klass ),
	
	
	        // The element node wrapper into a jQuery object.
	        $ELEMENT = $( ELEMENT ),
	
	
	        // Pseudo picker constructor.
	        PickerInstance = function() {
	            return this.start()
	        },
	
	
	        // The picker prototype.
	        P = PickerInstance.prototype = {
	
	            constructor: PickerInstance,
	
	            $node: $ELEMENT,
	
	
	            /**
	             * Initialize everything
	             */
	            start: function() {
	
	                // If it’s already started, do nothing.
	                if ( STATE && STATE.start ) return P
	
	
	                // Update the picker states.
	                STATE.methods = {}
	                STATE.start = true
	                STATE.open = false
	                STATE.type = ELEMENT.type
	
	
	                // Confirm focus state, convert into text input to remove UA stylings,
	                // and set as readonly to prevent keyboard popup.
	                ELEMENT.autofocus = ELEMENT == getActiveElement()
	                ELEMENT.readOnly = !SETTINGS.editable
	                ELEMENT.id = ELEMENT.id || STATE.id
	                if ( ELEMENT.type != 'text' ) {
	                    ELEMENT.type = 'text'
	                }
	
	
	                // Create a new picker component with the settings.
	                P.component = new COMPONENT(P, SETTINGS)
	
	
	                // Create the picker root with a holder and then prepare it.
	                P.$root = $( PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"') )
	                prepareElementRoot()
	
	
	                // If there’s a format for the hidden input element, create the element.
	                if ( SETTINGS.formatSubmit ) {
	                    prepareElementHidden()
	                }
	
	
	                // Prepare the input element.
	                prepareElement()
	
	
	                // Insert the root as specified in the settings.
	                if ( SETTINGS.container ) $( SETTINGS.container ).append( P.$root )
	                else $ELEMENT.after( P.$root )
	
	
	                // Bind the default component and settings events.
	                P.on({
	                    start: P.component.onStart,
	                    render: P.component.onRender,
	                    stop: P.component.onStop,
	                    open: P.component.onOpen,
	                    close: P.component.onClose,
	                    set: P.component.onSet
	                }).on({
	                    start: SETTINGS.onStart,
	                    render: SETTINGS.onRender,
	                    stop: SETTINGS.onStop,
	                    open: SETTINGS.onOpen,
	                    close: SETTINGS.onClose,
	                    set: SETTINGS.onSet
	                })
	
	
	                // Once we’re all set, check the theme in use.
	                IS_DEFAULT_THEME = isUsingDefaultTheme( P.$root.children()[ 0 ] )
	
	
	                // If the element has autofocus, open the picker.
	                if ( ELEMENT.autofocus ) {
	                    P.open()
	                }
	
	
	                // Trigger queued the “start” and “render” events.
	                return P.trigger( 'start' ).trigger( 'render' )
	            }, //start
	
	
	            /**
	             * Render a new picker
	             */
	            render: function( entireComponent ) {
	
	                // Insert a new component holder in the root or box.
	                if ( entireComponent ) P.$root.html( createWrappedComponent() )
	                else P.$root.find( '.' + CLASSES.box ).html( P.component.nodes( STATE.open ) )
	
	                // Trigger the queued “render” events.
	                return P.trigger( 'render' )
	            }, //render
	
	
	            /**
	             * Destroy everything
	             */
	            stop: function() {
	
	                // If it’s already stopped, do nothing.
	                if ( !STATE.start ) return P
	
	                // Then close the picker.
	                P.close()
	
	                // Remove the hidden field.
	                if ( P._hidden ) {
	                    P._hidden.parentNode.removeChild( P._hidden )
	                }
	
	                // Remove the root.
	                P.$root.remove()
	
	                // Remove the input class, remove the stored data, and unbind
	                // the events (after a tick for IE - see `P.close`).
	                $ELEMENT.removeClass( CLASSES.input ).removeData( NAME )
	                setTimeout( function() {
	                    $ELEMENT.off( '.' + STATE.id )
	                }, 0)
	
	                // Restore the element state
	                ELEMENT.type = STATE.type
	                ELEMENT.readOnly = false
	
	                // Trigger the queued “stop” events.
	                P.trigger( 'stop' )
	
	                // Reset the picker states.
	                STATE.methods = {}
	                STATE.start = false
	
	                return P
	            }, //stop
	
	
	            /**
	             * Open up the picker
	             */
	            open: function( dontGiveFocus ) {
	
	                // If it’s already open, do nothing.
	                if ( STATE.open ) return P
	
	                // Add the “active” class.
	                $ELEMENT.addClass( CLASSES.active )
	                aria( ELEMENT, 'expanded', true )
	
	                // * A Firefox bug, when `html` has `overflow:hidden`, results in
	                //   killing transitions :(. So add the “opened” state on the next tick.
	                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
	                setTimeout( function() {
	
	                    // Add the “opened” class to the picker root.
	                    P.$root.addClass( CLASSES.opened )
	                    aria( P.$root[0], 'hidden', false )
	
	                }, 0 )
	
	                // If we have to give focus, bind the element and doc events.
	                if ( dontGiveFocus !== false ) {
	
	                    // Set it as open.
	                    STATE.open = true
	
	                    // Prevent the page from scrolling.
	                    if ( IS_DEFAULT_THEME ) {
	                        $html.
	                            css( 'overflow', 'hidden' ).
	                            css( 'padding-right', '+=' + getScrollbarWidth() )
	                    }
	
	                    // Pass focus to the root element’s jQuery object.
	                    // * Workaround for iOS8 to bring the picker’s root into view.
	                    P.$root.eq(0).focus()
	
	                    // Bind the document events.
	                    $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {
	
	                        var target = event.target
	
	                        // If the target of the event is not the element, close the picker picker.
	                        // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
	                        //   Also, for Firefox, a click on an `option` element bubbles up directly
	                        //   to the doc. So make sure the target wasn't the doc.
	                        // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
	                        //   which causes the picker to unexpectedly close when right-clicking it. So make
	                        //   sure the event wasn’t a right-click.
	                        if ( target != ELEMENT && target != document && event.which != 3 ) {
	
	                            // If the target was the holder that covers the screen,
	                            // keep the element focused to maintain tabindex.
	                            P.close( target === P.$root.children()[0] )
	                        }
	
	                    }).on( 'keydown.' + STATE.id, function( event ) {
	
	                        var
	                            // Get the keycode.
	                            keycode = event.keyCode,
	
	                            // Translate that to a selection change.
	                            keycodeToMove = P.component.key[ keycode ],
	
	                            // Grab the target.
	                            target = event.target
	
	
	                        // On escape, close the picker and give focus.
	                        if ( keycode == 27 ) {
	                            P.close( true )
	                        }
	
	
	                        // Check if there is a key movement or “enter” keypress on the element.
	                        else if ( target == P.$root[0] && ( keycodeToMove || keycode == 13 ) ) {
	
	                            // Prevent the default action to stop page movement.
	                            event.preventDefault()
	
	                            // Trigger the key movement action.
	                            if ( keycodeToMove ) {
	                                PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
	                            }
	
	                            // On “enter”, if the highlighted item isn’t disabled, set the value and close.
	                            else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
	                                P.set( 'select', P.component.item.highlight ).close()
	                            }
	                        }
	
	
	                        // If the target is within the root and “enter” is pressed,
	                        // prevent the default action and trigger a click on the target instead.
	                        else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
	                            event.preventDefault()
	                            target.click()
	                        }
	                    })
	                }
	
	                // Trigger the queued “open” events.
	                return P.trigger( 'open' )
	            }, //open
	
	
	            /**
	             * Close the picker
	             */
	            close: function( giveFocus ) {
	
	                // If we need to give focus, do it before changing states.
	                if ( giveFocus ) {
	                    // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
	                    // The focus is triggered *after* the close has completed - causing it
	                    // to open again. So unbind and rebind the event at the next tick.
	                    P.$root.off( 'focus.toOpen' ).eq(0).focus()
	                    setTimeout( function() {
	                        P.$root.on( 'focus.toOpen', handleFocusToOpenEvent )
	                    }, 0 )
	                }
	
	                // Remove the “active” class.
	                $ELEMENT.removeClass( CLASSES.active )
	                aria( ELEMENT, 'expanded', false )
	
	                // * A Firefox bug, when `html` has `overflow:hidden`, results in
	                //   killing transitions :(. So remove the “opened” state on the next tick.
	                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
	                setTimeout( function() {
	
	                    // Remove the “opened” and “focused” class from the picker root.
	                    P.$root.removeClass( CLASSES.opened + ' ' + CLASSES.focused )
	                    aria( P.$root[0], 'hidden', true )
	
	                }, 0 )
	
	                // If it’s already closed, do nothing more.
	                if ( !STATE.open ) return P
	
	                // Set it as closed.
	                STATE.open = false
	
	                // Allow the page to scroll.
	                if ( IS_DEFAULT_THEME ) {
	                    $html.
	                        css( 'overflow', '' ).
	                        css( 'padding-right', '-=' + getScrollbarWidth() )
	                }
	
	                // Unbind the document events.
	                $document.off( '.' + STATE.id )
	
	                // Trigger the queued “close” events.
	                return P.trigger( 'close' )
	            }, //close
	
	
	            /**
	             * Clear the values
	             */
	            clear: function( options ) {
	                return P.set( 'clear', null, options )
	            }, //clear
	
	
	            /**
	             * Set something
	             */
	            set: function( thing, value, options ) {
	
	                var thingItem, thingValue,
	                    thingIsObject = $.isPlainObject( thing ),
	                    thingObject = thingIsObject ? thing : {}
	
	                // Make sure we have usable options.
	                options = thingIsObject && $.isPlainObject( value ) ? value : options || {}
	
	                if ( thing ) {
	
	                    // If the thing isn’t an object, make it one.
	                    if ( !thingIsObject ) {
	                        thingObject[ thing ] = value
	                    }
	
	                    // Go through the things of items to set.
	                    for ( thingItem in thingObject ) {
	
	                        // Grab the value of the thing.
	                        thingValue = thingObject[ thingItem ]
	
	                        // First, if the item exists and there’s a value, set it.
	                        if ( thingItem in P.component.item ) {
	                            if ( thingValue === undefined ) thingValue = null
	                            P.component.set( thingItem, thingValue, options )
	                        }
	
	                        // Then, check to update the element value and broadcast a change.
	                        if ( thingItem == 'select' || thingItem == 'clear' ) {
	                            $ELEMENT.
	                                val( thingItem == 'clear' ? '' : P.get( thingItem, SETTINGS.format ) ).
	                                trigger( 'change' )
	                        }
	                    }
	
	                    // Render a new picker.
	                    P.render()
	                }
	
	                // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
	                return options.muted ? P : P.trigger( 'set', thingObject )
	            }, //set
	
	
	            /**
	             * Get something
	             */
	            get: function( thing, format ) {
	
	                // Make sure there’s something to get.
	                thing = thing || 'value'
	
	                // If a picker state exists, return that.
	                if ( STATE[ thing ] != null ) {
	                    return STATE[ thing ]
	                }
	
	                // Return the submission value, if that.
	                if ( thing == 'valueSubmit' ) {
	                    if ( P._hidden ) {
	                        return P._hidden.value
	                    }
	                    thing = 'value'
	                }
	
	                // Return the value, if that.
	                if ( thing == 'value' ) {
	                    return ELEMENT.value
	                }
	
	                // Check if a component item exists, return that.
	                if ( thing in P.component.item ) {
	                    if ( typeof format == 'string' ) {
	                        var thingValue = P.component.get( thing )
	                        return thingValue ?
	                            PickerConstructor._.trigger(
	                                P.component.formats.toString,
	                                P.component,
	                                [ format, thingValue ]
	                            ) : ''
	                    }
	                    return P.component.get( thing )
	                }
	            }, //get
	
	
	
	            /**
	             * Bind events on the things.
	             */
	            on: function( thing, method, internal ) {
	
	                var thingName, thingMethod,
	                    thingIsObject = $.isPlainObject( thing ),
	                    thingObject = thingIsObject ? thing : {}
	
	                if ( thing ) {
	
	                    // If the thing isn’t an object, make it one.
	                    if ( !thingIsObject ) {
	                        thingObject[ thing ] = method
	                    }
	
	                    // Go through the things to bind to.
	                    for ( thingName in thingObject ) {
	
	                        // Grab the method of the thing.
	                        thingMethod = thingObject[ thingName ]
	
	                        // If it was an internal binding, prefix it.
	                        if ( internal ) {
	                            thingName = '_' + thingName
	                        }
	
	                        // Make sure the thing methods collection exists.
	                        STATE.methods[ thingName ] = STATE.methods[ thingName ] || []
	
	                        // Add the method to the relative method collection.
	                        STATE.methods[ thingName ].push( thingMethod )
	                    }
	                }
	
	                return P
	            }, //on
	
	
	
	            /**
	             * Unbind events on the things.
	             */
	            off: function() {
	                var i, thingName,
	                    names = arguments;
	                for ( i = 0, namesCount = names.length; i < namesCount; i += 1 ) {
	                    thingName = names[i]
	                    if ( thingName in STATE.methods ) {
	                        delete STATE.methods[thingName]
	                    }
	                }
	                return P
	            },
	
	
	            /**
	             * Fire off method events.
	             */
	            trigger: function( name, data ) {
	                var _trigger = function( name ) {
	                    var methodList = STATE.methods[ name ]
	                    if ( methodList ) {
	                        methodList.map( function( method ) {
	                            PickerConstructor._.trigger( method, P, [ data ] )
	                        })
	                    }
	                }
	                _trigger( '_' + name )
	                _trigger( name )
	                return P
	            } //trigger
	        } //PickerInstance.prototype
	
	
	    /**
	     * Wrap the picker holder components together.
	     */
	    function createWrappedComponent() {
	
	        // Create a picker wrapper holder
	        return PickerConstructor._.node( 'div',
	
	            // Create a picker wrapper node
	            PickerConstructor._.node( 'div',
	
	                // Create a picker frame
	                PickerConstructor._.node( 'div',
	
	                    // Create a picker box node
	                    PickerConstructor._.node( 'div',
	
	                        // Create the components nodes.
	                        P.component.nodes( STATE.open ),
	
	                        // The picker box class
	                        CLASSES.box
	                    ),
	
	                    // Picker wrap class
	                    CLASSES.wrap
	                ),
	
	                // Picker frame class
	                CLASSES.frame
	            ),
	
	            // Picker holder class
	            CLASSES.holder
	        ) //endreturn
	    } //createWrappedComponent
	
	
	
	    /**
	     * Prepare the input element with all bindings.
	     */
	    function prepareElement() {
	
	        $ELEMENT.
	
	            // Store the picker data by component name.
	            data(NAME, P).
	
	            // Add the “input” class name.
	            addClass(CLASSES.input).
	
	            // Remove the tabindex.
	            attr('tabindex', -1).
	
	            // If there’s a `data-value`, update the value of the element.
	            val( $ELEMENT.data('value') ?
	                P.get('select', SETTINGS.format) :
	                ELEMENT.value
	            )
	
	
	        // Only bind keydown events if the element isn’t editable.
	        if ( !SETTINGS.editable ) {
	
	            $ELEMENT.
	
	                // On focus/click, focus onto the root to open it up.
	                on( 'focus.' + STATE.id + ' click.' + STATE.id, function( event ) {
	                    event.preventDefault()
	                    P.$root.eq(0).focus()
	                }).
	
	                // Handle keyboard event based on the picker being opened or not.
	                on( 'keydown.' + STATE.id, handleKeydownEvent )
	        }
	
	
	        // Update the aria attributes.
	        aria(ELEMENT, {
	            haspopup: true,
	            expanded: false,
	            readonly: false,
	            owns: ELEMENT.id + '_root'
	        })
	    }
	
	
	    /**
	     * Prepare the root picker element with all bindings.
	     */
	    function prepareElementRoot() {
	
	        P.$root.
	
	            on({
	
	                // For iOS8.
	                keydown: handleKeydownEvent,
	
	                // When something within the root is focused, stop from bubbling
	                // to the doc and remove the “focused” state from the root.
	                focusin: function( event ) {
	                    P.$root.removeClass( CLASSES.focused )
	                    event.stopPropagation()
	                },
	
	                // When something within the root holder is clicked, stop it
	                // from bubbling to the doc.
	                'mousedown click': function( event ) {
	
	                    var target = event.target
	
	                    // Make sure the target isn’t the root holder so it can bubble up.
	                    if ( target != P.$root.children()[ 0 ] ) {
	
	                        event.stopPropagation()
	
	                        // * For mousedown events, cancel the default action in order to
	                        //   prevent cases where focus is shifted onto external elements
	                        //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
	                        //   Also, for Firefox, don’t prevent action on the `option` element.
	                        if ( event.type == 'mousedown' && !$( target ).is( 'input, select, textarea, button, option' )) {
	
	                            event.preventDefault()
	
	                            // Re-focus onto the root so that users can click away
	                            // from elements focused within the picker.
	                            P.$root.eq(0).focus()
	                        }
	                    }
	                }
	            }).
	
	            // Add/remove the “target” class on focus and blur.
	            on({
	                focus: function() {
	                    $ELEMENT.addClass( CLASSES.target )
	                },
	                blur: function() {
	                    $ELEMENT.removeClass( CLASSES.target )
	                }
	            }).
	
	            // Open the picker and adjust the root “focused” state
	            on( 'focus.toOpen', handleFocusToOpenEvent ).
	
	            // If there’s a click on an actionable element, carry out the actions.
	            on( 'click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {
	
	                var $target = $( this ),
	                    targetData = $target.data(),
	                    targetDisabled = $target.hasClass( CLASSES.navDisabled ) || $target.hasClass( CLASSES.disabled ),
	
	                    // * For IE, non-focusable elements can be active elements as well
	                    //   (http://stackoverflow.com/a/2684561).
	                    activeElement = getActiveElement()
	                    activeElement = activeElement && ( activeElement.type || activeElement.href )
	
	                // If it’s disabled or nothing inside is actively focused, re-focus the element.
	                if ( targetDisabled || activeElement && !$.contains( P.$root[0], activeElement ) ) {
	                    P.$root.eq(0).focus()
	                }
	
	                // If something is superficially changed, update the `highlight` based on the `nav`.
	                if ( !targetDisabled && targetData.nav ) {
	                    P.set( 'highlight', P.component.item.highlight, { nav: targetData.nav } )
	                }
	
	                // If something is picked, set `select` then close with focus.
	                else if ( !targetDisabled && 'pick' in targetData ) {
	                    P.set( 'select', targetData.pick )
	                }
	
	                // If a “clear” button is pressed, empty the values and close with focus.
	                else if ( targetData.clear ) {
	                    P.clear().close( true )
	                }
	
	                else if ( targetData.close ) {
	                    P.close( true )
	                }
	
	            }) //P.$root
	
	        aria( P.$root[0], 'hidden', true )
	    }
	
	
	     /**
	      * Prepare the hidden input element along with all bindings.
	      */
	    function prepareElementHidden() {
	
	        var name
	
	        if ( SETTINGS.hiddenName === true ) {
	            name = ELEMENT.name
	            ELEMENT.name = ''
	        }
	        else {
	            name = [
	                typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
	                typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
	            ]
	            name = name[0] + ELEMENT.name + name[1]
	        }
	
	        P._hidden = $(
	            '<input ' +
	            'type=hidden ' +
	
	            // Create the name using the original input’s with a prefix and suffix.
	            'name="' + name + '"' +
	
	            // If the element has a value, set the hidden value as well.
	            (
	                $ELEMENT.data('value') || ELEMENT.value ?
	                    ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
	                    ''
	            ) +
	            '>'
	        )[0]
	
	        $ELEMENT.
	
	            // If the value changes, update the hidden input with the correct format.
	            on('change.' + STATE.id, function() {
	                P._hidden.value = ELEMENT.value ?
	                    P.get('select', SETTINGS.formatSubmit) :
	                    ''
	            })
	
	
	        // Insert the hidden input as specified in the settings.
	        if ( SETTINGS.container ) $( SETTINGS.container ).append( P._hidden )
	        else $ELEMENT.after( P._hidden )
	    }
	
	
	    // For iOS8.
	    function handleKeydownEvent( event ) {
	
	        var keycode = event.keyCode,
	
	            // Check if one of the delete keys was pressed.
	            isKeycodeDelete = /^(8|46)$/.test(keycode)
	
	        // For some reason IE clears the input value on “escape”.
	        if ( keycode == 27 ) {
	            P.close()
	            return false
	        }
	
	        // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
	        if ( keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode] ) {
	
	            // Prevent it from moving the page and bubbling to doc.
	            event.preventDefault()
	            event.stopPropagation()
	
	            // If `delete` was pressed, clear the values and close the picker.
	            // Otherwise open the picker.
	            if ( isKeycodeDelete ) { P.clear().close() }
	            else { P.open() }
	        }
	    }
	
	
	    // Separated for IE
	    function handleFocusToOpenEvent( event ) {
	
	        // Stop the event from propagating to the doc.
	        event.stopPropagation()
	
	        // If it’s a focus event, add the “focused” class to the root.
	        if ( event.type == 'focus' ) {
	            P.$root.addClass( CLASSES.focused )
	        }
	
	        // And then finally open the picker.
	        P.open()
	    }
	
	
	    // Return a new picker instance.
	    return new PickerInstance()
	} //PickerConstructor
	
	
	
	/**
	 * The default classes and prefix to use for the HTML classes.
	 */
	PickerConstructor.klasses = function( prefix ) {
	    prefix = prefix || 'picker'
	    return {
	
	        picker: prefix,
	        opened: prefix + '--opened',
	        focused: prefix + '--focused',
	
	        input: prefix + '__input',
	        active: prefix + '__input--active',
	        target: prefix + '__input--target',
	
	        holder: prefix + '__holder',
	
	        frame: prefix + '__frame',
	        wrap: prefix + '__wrap',
	
	        box: prefix + '__box'
	    }
	} //PickerConstructor.klasses
	
	
	
	/**
	 * Check if the default theme is being used.
	 */
	function isUsingDefaultTheme( element ) {
	
	    var theme,
	        prop = 'position'
	
	    // For IE.
	    if ( element.currentStyle ) {
	        theme = element.currentStyle[prop]
	    }
	
	    // For normal browsers.
	    else if ( window.getComputedStyle ) {
	        theme = getComputedStyle( element )[prop]
	    }
	
	    return theme == 'fixed'
	}
	
	
	
	/**
	 * Get the width of the browser’s scrollbar.
	 * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
	 */
	function getScrollbarWidth() {
	
	    if ( $html.height() <= $window.height() ) {
	        return 0
	    }
	
	    var $outer = $( '<div style="visibility:hidden;width:100px" />' ).
	        appendTo( 'body' )
	
	    // Get the width without scrollbars.
	    var widthWithoutScroll = $outer[0].offsetWidth
	
	    // Force adding scrollbars.
	    $outer.css( 'overflow', 'scroll' )
	
	    // Add the inner div.
	    var $inner = $( '<div style="width:100%" />' ).appendTo( $outer )
	
	    // Get the width with scrollbars.
	    var widthWithScroll = $inner[0].offsetWidth
	
	    // Remove the divs.
	    $outer.remove()
	
	    // Return the difference between the widths.
	    return widthWithoutScroll - widthWithScroll
	}
	
	
	
	/**
	 * PickerConstructor helper methods.
	 */
	PickerConstructor._ = {
	
	    /**
	     * Create a group of nodes. Expects:
	     * `
	        {
	            min:    {Integer},
	            max:    {Integer},
	            i:      {Integer},
	            node:   {String},
	            item:   {Function}
	        }
	     * `
	     */
	    group: function( groupObject ) {
	
	        var
	            // Scope for the looped object
	            loopObjectScope,
	
	            // Create the nodes list
	            nodesList = '',
	
	            // The counter starts from the `min`
	            counter = PickerConstructor._.trigger( groupObject.min, groupObject )
	
	
	        // Loop from the `min` to `max`, incrementing by `i`
	        for ( ; counter <= PickerConstructor._.trigger( groupObject.max, groupObject, [ counter ] ); counter += groupObject.i ) {
	
	            // Trigger the `item` function within scope of the object
	            loopObjectScope = PickerConstructor._.trigger( groupObject.item, groupObject, [ counter ] )
	
	            // Splice the subgroup and create nodes out of the sub nodes
	            nodesList += PickerConstructor._.node(
	                groupObject.node,
	                loopObjectScope[ 0 ],   // the node
	                loopObjectScope[ 1 ],   // the classes
	                loopObjectScope[ 2 ]    // the attributes
	            )
	        }
	
	        // Return the list of nodes
	        return nodesList
	    }, //group
	
	
	    /**
	     * Create a dom node string
	     */
	    node: function( wrapper, item, klass, attribute ) {
	
	        // If the item is false-y, just return an empty string
	        if ( !item ) return ''
	
	        // If the item is an array, do a join
	        item = $.isArray( item ) ? item.join( '' ) : item
	
	        // Check for the class
	        klass = klass ? ' class="' + klass + '"' : ''
	
	        // Check for any attributes
	        attribute = attribute ? ' ' + attribute : ''
	
	        // Return the wrapped item
	        return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
	    }, //node
	
	
	    /**
	     * Lead numbers below 10 with a zero.
	     */
	    lead: function( number ) {
	        return ( number < 10 ? '0': '' ) + number
	    },
	
	
	    /**
	     * Trigger a function otherwise return the value.
	     */
	    trigger: function( callback, scope, args ) {
	        return typeof callback == 'function' ? callback.apply( scope, args || [] ) : callback
	    },
	
	
	    /**
	     * If the second character is a digit, length is 2 otherwise 1.
	     */
	    digits: function( string ) {
	        return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1
	    },
	
	
	    /**
	     * Tell if something is a date object.
	     */
	    isDate: function( value ) {
	        return {}.toString.call( value ).indexOf( 'Date' ) > -1 && this.isInteger( value.getDate() )
	    },
	
	
	    /**
	     * Tell if something is an integer.
	     */
	    isInteger: function( value ) {
	        return {}.toString.call( value ).indexOf( 'Number' ) > -1 && value % 1 === 0
	    },
	
	
	    /**
	     * Create ARIA attribute strings.
	     */
	    ariaAttr: ariaAttr
	} //PickerConstructor._
	
	
	
	/**
	 * Extend the picker with a component and defaults.
	 */
	PickerConstructor.extend = function( name, Component ) {
	
	    // Extend jQuery.
	    $.fn[ name ] = function( options, action ) {
	
	        // Grab the component data.
	        var componentData = this.data( name )
	
	        // If the picker is requested, return the data object.
	        if ( options == 'picker' ) {
	            return componentData
	        }
	
	        // If the component data exists and `options` is a string, carry out the action.
	        if ( componentData && typeof options == 'string' ) {
	            return PickerConstructor._.trigger( componentData[ options ], componentData, [ action ] )
	        }
	
	        // Otherwise go through each matched element and if the component
	        // doesn’t exist, create a new picker using `this` element
	        // and merging the defaults and options with a deep copy.
	        return this.each( function() {
	            var $this = $( this )
	            if ( !$this.data( name ) ) {
	                new PickerConstructor( this, name, Component, options )
	            }
	        })
	    }
	
	    // Set the defaults.
	    $.fn[ name ].defaults = Component.defaults
	} //PickerConstructor.extend
	
	
	
	function aria(element, attribute, value) {
	    if ( $.isPlainObject(attribute) ) {
	        for ( var key in attribute ) {
	            ariaSet(element, key, attribute[key])
	        }
	    }
	    else {
	        ariaSet(element, attribute, value)
	    }
	}
	function ariaSet(element, attribute, value) {
	    element.setAttribute(
	        (attribute == 'role' ? '' : 'aria-') + attribute,
	        value
	    )
	}
	function ariaAttr(attribute, data) {
	    if ( !$.isPlainObject(attribute) ) {
	        attribute = { attribute: data }
	    }
	    data = ''
	    for ( var key in attribute ) {
	        var attr = (key == 'role' ? '' : 'aria-') + key,
	            attrVal = attribute[key]
	        data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'
	    }
	    return data
	}
	
	// IE8 bug throws an error for activeElements within iframes.
	function getActiveElement() {
	    try {
	        return document.activeElement
	    } catch ( err ) { }
	}
	
	
	
	// Expose the picker constructor.
	return PickerConstructor
	
	
	}));
	
	
	;/*!
	 * Date picker for pickadate.js v3.5.0
	 * http://amsul.github.io/pickadate.js/date.htm
	 */
	
	(function ( factory ) {
	
	    // AMD.
	    if ( true )
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_0__, __webpack_require__(/*! jquery */ 15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	
	    // Node.js/browserify.
	    else if ( typeof exports == 'object' )
	        module.exports = factory( require('./picker.js'), require('jquery') )
	
	    // Browser globals.
	    else factory( Picker, jQuery )
	
	}(function( Picker, $ ) {
	
	
	/**
	 * Globals and constants
	 */
	var DAYS_IN_WEEK = 7,
	    WEEKS_IN_CALENDAR = 6,
	    _ = Picker._
	
	
	
	/**
	 * The date picker constructor
	 */
	function DatePicker( picker, settings ) {
	
	    var calendar = this,
	        element = picker.$node[ 0 ],
	        elementValue = element.value,
	        elementDataValue = picker.$node.data( 'value' ),
	        valueString = elementDataValue || elementValue,
	        formatString = elementDataValue ? settings.formatSubmit : settings.format,
	        isRTL = function() {
	
	            return element.currentStyle ?
	
	                // For IE.
	                element.currentStyle.direction == 'rtl' :
	
	                // For normal browsers.
	                getComputedStyle( picker.$root[0] ).direction == 'rtl'
	        }
	
	    calendar.settings = settings
	    calendar.$node = picker.$node
	
	    // The queue of methods that will be used to build item objects.
	    calendar.queue = {
	        min: 'measure create',
	        max: 'measure create',
	        now: 'now create',
	        select: 'parse create validate',
	        highlight: 'parse navigate create validate',
	        view: 'parse create validate viewset',
	        disable: 'deactivate',
	        enable: 'activate'
	    }
	
	    // The component's item object.
	    calendar.item = {}
	
	    calendar.item.clear = null
	    calendar.item.disable = ( settings.disable || [] ).slice( 0 )
	    calendar.item.enable = -(function( collectionDisabled ) {
	        return collectionDisabled[ 0 ] === true ? collectionDisabled.shift() : -1
	    })( calendar.item.disable )
	
	    calendar.
	        set( 'min', settings.min ).
	        set( 'max', settings.max ).
	        set( 'now' )
	
	    // When there’s a value, set the `select`, which in turn
	    // also sets the `highlight` and `view`.
	    if ( valueString ) {
	        calendar.set( 'select', valueString, { format: formatString })
	    }
	
	    // If there’s no value, default to highlighting “today”.
	    else {
	        calendar.
	            set( 'select', null ).
	            set( 'highlight', calendar.item.now )
	    }
	
	
	    // The keycode to movement mapping.
	    calendar.key = {
	        40: 7, // Down
	        38: -7, // Up
	        39: function() { return isRTL() ? -1 : 1 }, // Right
	        37: function() { return isRTL() ? 1 : -1 }, // Left
	        go: function( timeChange ) {
	            var highlightedObject = calendar.item.highlight,
	                targetDate = new Date( highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange )
	            calendar.set(
	                'highlight',
	                targetDate,
	                { interval: timeChange }
	            )
	            this.render()
	        }
	    }
	
	
	    // Bind some picker events.
	    picker.
	        on( 'render', function() {
	            picker.$root.find( '.' + settings.klass.selectMonth ).on( 'change', function() {
	                var value = this.value
	                if ( value ) {
	                    picker.set( 'highlight', [ picker.get( 'view' ).year, value, picker.get( 'highlight' ).date ] )
	                    picker.$root.find( '.' + settings.klass.selectMonth ).trigger( 'focus' )
	                }
	            })
	            picker.$root.find( '.' + settings.klass.selectYear ).on( 'change', function() {
	                var value = this.value
	                if ( value ) {
	                    picker.set( 'highlight', [ value, picker.get( 'view' ).month, picker.get( 'highlight' ).date ] )
	                    picker.$root.find( '.' + settings.klass.selectYear ).trigger( 'focus' )
	                }
	            })
	        }, 1 ).
	        on( 'open', function() {
	            var includeToday = ''
	            if ( calendar.disabled( calendar.get('now') ) ) {
	                includeToday = ':not(.' + settings.klass.buttonToday + ')'
	            }
	            picker.$root.find( 'button' + includeToday + ', select' ).attr( 'disabled', false )
	        }, 1 ).
	        on( 'close', function() {
	            picker.$root.find( 'button, select' ).attr( 'disabled', true )
	        }, 1 )
	
	} //DatePicker
	
	
	/**
	 * Set a datepicker item object.
	 */
	DatePicker.prototype.set = function( type, value, options ) {
	
	    var calendar = this,
	        calendarItem = calendar.item
	
	    // If the value is `null` just set it immediately.
	    if ( value === null ) {
	        if ( type == 'clear' ) type = 'select'
	        calendarItem[ type ] = value
	        return calendar
	    }
	
	    // Otherwise go through the queue of methods, and invoke the functions.
	    // Update this as the time unit, and set the final value as this item.
	    // * In the case of `enable`, keep the queue but set `disable` instead.
	    //   And in the case of `flip`, keep the queue but set `enable` instead.
	    calendarItem[ ( type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type ) ] = calendar.queue[ type ].split( ' ' ).map( function( method ) {
	        value = calendar[ method ]( type, value, options )
	        return value
	    }).pop()
	
	    // Check if we need to cascade through more updates.
	    if ( type == 'select' ) {
	        calendar.set( 'highlight', calendarItem.select, options )
	    }
	    else if ( type == 'highlight' ) {
	        calendar.set( 'view', calendarItem.highlight, options )
	    }
	    else if ( type.match( /^(flip|min|max|disable|enable)$/ ) ) {
	        if ( calendarItem.select && calendar.disabled( calendarItem.select ) ) {
	            calendar.set( 'select', calendarItem.select, options )
	        }
	        if ( calendarItem.highlight && calendar.disabled( calendarItem.highlight ) ) {
	            calendar.set( 'highlight', calendarItem.highlight, options )
	        }
	    }
	
	    return calendar
	} //DatePicker.prototype.set
	
	
	/**
	 * Get a datepicker item object.
	 */
	DatePicker.prototype.get = function( type ) {
	    return this.item[ type ]
	} //DatePicker.prototype.get
	
	
	/**
	 * Create a picker date object.
	 */
	DatePicker.prototype.create = function( type, value, options ) {
	
	    var isInfiniteValue,
	        calendar = this
	
	    // If there’s no value, use the type as the value.
	    value = value === undefined ? type : value
	
	
	    // If it’s infinity, update the value.
	    if ( value == -Infinity || value == Infinity ) {
	        isInfiniteValue = value
	    }
	
	    // If it’s an object, use the native date object.
	    else if ( $.isPlainObject( value ) && _.isInteger( value.pick ) ) {
	        value = value.obj
	    }
	
	    // If it’s an array, convert it into a date and make sure
	    // that it’s a valid date – otherwise default to today.
	    else if ( $.isArray( value ) ) {
	        value = new Date( value[ 0 ], value[ 1 ], value[ 2 ] )
	        value = _.isDate( value ) ? value : calendar.create().obj
	    }
	
	    // If it’s a number or date object, make a normalized date.
	    else if ( _.isInteger( value ) || _.isDate( value ) ) {
	        value = calendar.normalize( new Date( value ), options )
	    }
	
	    // If it’s a literal true or any other case, set it to now.
	    else /*if ( value === true )*/ {
	        value = calendar.now( type, value, options )
	    }
	
	    // Return the compiled object.
	    return {
	        year: isInfiniteValue || value.getFullYear(),
	        month: isInfiniteValue || value.getMonth(),
	        date: isInfiniteValue || value.getDate(),
	        day: isInfiniteValue || value.getDay(),
	        obj: isInfiniteValue || value,
	        pick: isInfiniteValue || value.getTime()
	    }
	} //DatePicker.prototype.create
	
	
	/**
	 * Create a range limit object using an array, date object,
	 * literal “true”, or integer relative to another time.
	 */
	DatePicker.prototype.createRange = function( from, to ) {
	
	    var calendar = this,
	        createDate = function( date ) {
	            if ( date === true || $.isArray( date ) || _.isDate( date ) ) {
	                return calendar.create( date )
	            }
	            return date
	        }
	
	    // Create objects if possible.
	    if ( !_.isInteger( from ) ) {
	        from = createDate( from )
	    }
	    if ( !_.isInteger( to ) ) {
	        to = createDate( to )
	    }
	
	    // Create relative dates.
	    if ( _.isInteger( from ) && $.isPlainObject( to ) ) {
	        from = [ to.year, to.month, to.date + from ];
	    }
	    else if ( _.isInteger( to ) && $.isPlainObject( from ) ) {
	        to = [ from.year, from.month, from.date + to ];
	    }
	
	    return {
	        from: createDate( from ),
	        to: createDate( to )
	    }
	} //DatePicker.prototype.createRange
	
	
	/**
	 * Check if a date unit falls within a date range object.
	 */
	DatePicker.prototype.withinRange = function( range, dateUnit ) {
	    range = this.createRange(range.from, range.to)
	    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
	}
	
	
	/**
	 * Check if two date range objects overlap.
	 */
	DatePicker.prototype.overlapRanges = function( one, two ) {
	
	    var calendar = this
	
	    // Convert the ranges into comparable dates.
	    one = calendar.createRange( one.from, one.to )
	    two = calendar.createRange( two.from, two.to )
	
	    return calendar.withinRange( one, two.from ) || calendar.withinRange( one, two.to ) ||
	        calendar.withinRange( two, one.from ) || calendar.withinRange( two, one.to )
	}
	
	
	/**
	 * Get the date today.
	 */
	DatePicker.prototype.now = function( type, value, options ) {
	    value = new Date()
	    if ( options && options.rel ) {
	        value.setDate( value.getDate() + options.rel )
	    }
	    return this.normalize( value, options )
	}
	
	
	/**
	 * Navigate to next/prev month.
	 */
	DatePicker.prototype.navigate = function( type, value, options ) {
	
	    var targetDateObject,
	        targetYear,
	        targetMonth,
	        targetDate,
	        isTargetArray = $.isArray( value ),
	        isTargetObject = $.isPlainObject( value ),
	        viewsetObject = this.item.view/*,
	        safety = 100*/
	
	
	    if ( isTargetArray || isTargetObject ) {
	
	        if ( isTargetObject ) {
	            targetYear = value.year
	            targetMonth = value.month
	            targetDate = value.date
	        }
	        else {
	            targetYear = +value[0]
	            targetMonth = +value[1]
	            targetDate = +value[2]
	        }
	
	        // If we’re navigating months but the view is in a different
	        // month, navigate to the view’s year and month.
	        if ( options && options.nav && viewsetObject && viewsetObject.month !== targetMonth ) {
	            targetYear = viewsetObject.year
	            targetMonth = viewsetObject.month
	        }
	
	        // Figure out the expected target year and month.
	        targetDateObject = new Date( targetYear, targetMonth + ( options && options.nav ? options.nav : 0 ), 1 )
	        targetYear = targetDateObject.getFullYear()
	        targetMonth = targetDateObject.getMonth()
	
	        // If the month we’re going to doesn’t have enough days,
	        // keep decreasing the date until we reach the month’s last date.
	        while ( /*safety &&*/ new Date( targetYear, targetMonth, targetDate ).getMonth() !== targetMonth ) {
	            targetDate -= 1
	            /*safety -= 1
	            if ( !safety ) {
	                throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
	            }*/
	        }
	
	        value = [ targetYear, targetMonth, targetDate ]
	    }
	
	    return value
	} //DatePicker.prototype.navigate
	
	
	/**
	 * Normalize a date by setting the hours to midnight.
	 */
	DatePicker.prototype.normalize = function( value/*, options*/ ) {
	    value.setHours( 0, 0, 0, 0 )
	    return value
	}
	
	
	/**
	 * Measure the range of dates.
	 */
	DatePicker.prototype.measure = function( type, value/*, options*/ ) {
	
	    var calendar = this
	
	    // If it’s anything false-y, remove the limits.
	    if ( !value ) {
	        value = type == 'min' ? -Infinity : Infinity
	    }
	
	    // If it’s a string, parse it.
	    else if ( typeof value == 'string' ) {
	        value = calendar.parse( type, value )
	    }
	
	    // If it's an integer, get a date relative to today.
	    else if ( _.isInteger( value ) ) {
	        value = calendar.now( type, value, { rel: value } )
	    }
	
	    return value
	} ///DatePicker.prototype.measure
	
	
	/**
	 * Create a viewset object based on navigation.
	 */
	DatePicker.prototype.viewset = function( type, dateObject/*, options*/ ) {
	    return this.create([ dateObject.year, dateObject.month, 1 ])
	}
	
	
	/**
	 * Validate a date as enabled and shift if needed.
	 */
	DatePicker.prototype.validate = function( type, dateObject, options ) {
	
	    var calendar = this,
	
	        // Keep a reference to the original date.
	        originalDateObject = dateObject,
	
	        // Make sure we have an interval.
	        interval = options && options.interval ? options.interval : 1,
	
	        // Check if the calendar enabled dates are inverted.
	        isFlippedBase = calendar.item.enable === -1,
	
	        // Check if we have any enabled dates after/before now.
	        hasEnabledBeforeTarget, hasEnabledAfterTarget,
	
	        // The min & max limits.
	        minLimitObject = calendar.item.min,
	        maxLimitObject = calendar.item.max,
	
	        // Check if we’ve reached the limit during shifting.
	        reachedMin, reachedMax,
	
	        // Check if the calendar is inverted and at least one weekday is enabled.
	        hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter( function( value ) {
	
	            // If there’s a date, check where it is relative to the target.
	            if ( $.isArray( value ) ) {
	                var dateTime = calendar.create( value ).pick
	                if ( dateTime < dateObject.pick ) hasEnabledBeforeTarget = true
	                else if ( dateTime > dateObject.pick ) hasEnabledAfterTarget = true
	            }
	
	            // Return only integers for enabled weekdays.
	            return _.isInteger( value )
	        }).length/*,
	
	        safety = 100*/
	
	
	
	    // Cases to validate for:
	    // [1] Not inverted and date disabled.
	    // [2] Inverted and some dates enabled.
	    // [3] Not inverted and out of range.
	    //
	    // Cases to **not** validate for:
	    // • Navigating months.
	    // • Not inverted and date enabled.
	    // • Inverted and all dates disabled.
	    // • ..and anything else.
	    if ( !options || !options.nav ) if (
	        /* 1 */ ( !isFlippedBase && calendar.disabled( dateObject ) ) ||
	        /* 2 */ ( isFlippedBase && calendar.disabled( dateObject ) && ( hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget ) ) ||
	        /* 3 */ ( !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick) )
	    ) {
	
	
	        // When inverted, flip the direction if there aren’t any enabled weekdays
	        // and there are no enabled dates in the direction of the interval.
	        if ( isFlippedBase && !hasEnabledWeekdays && ( ( !hasEnabledAfterTarget && interval > 0 ) || ( !hasEnabledBeforeTarget && interval < 0 ) ) ) {
	            interval *= -1
	        }
	
	
	        // Keep looping until we reach an enabled date.
	        while ( /*safety &&*/ calendar.disabled( dateObject ) ) {
	
	            /*safety -= 1
	            if ( !safety ) {
	                throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
	            }*/
	
	
	            // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
	            if ( Math.abs( interval ) > 1 && ( dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month ) ) {
	                dateObject = originalDateObject
	                interval = interval > 0 ? 1 : -1
	            }
	
	
	            // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
	            if ( dateObject.pick <= minLimitObject.pick ) {
	                reachedMin = true
	                interval = 1
	                dateObject = calendar.create([
	                    minLimitObject.year,
	                    minLimitObject.month,
	                    minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
	                ])
	            }
	            else if ( dateObject.pick >= maxLimitObject.pick ) {
	                reachedMax = true
	                interval = -1
	                dateObject = calendar.create([
	                    maxLimitObject.year,
	                    maxLimitObject.month,
	                    maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
	                ])
	            }
	
	
	            // If we’ve reached both limits, just break out of the loop.
	            if ( reachedMin && reachedMax ) {
	                break
	            }
	
	
	            // Finally, create the shifted date using the interval and keep looping.
	            dateObject = calendar.create([ dateObject.year, dateObject.month, dateObject.date + interval ])
	        }
	
	    } //endif
	
	
	    // Return the date object settled on.
	    return dateObject
	} //DatePicker.prototype.validate
	
	
	/**
	 * Check if a date is disabled.
	 */
	DatePicker.prototype.disabled = function( dateToVerify ) {
	
	    var
	        calendar = this,
	
	        // Filter through the disabled dates to check if this is one.
	        isDisabledMatch = calendar.item.disable.filter( function( dateToDisable ) {
	
	            // If the date is a number, match the weekday with 0index and `firstDay` check.
	            if ( _.isInteger( dateToDisable ) ) {
	                return dateToVerify.day === ( calendar.settings.firstDay ? dateToDisable : dateToDisable - 1 ) % 7
	            }
	
	            // If it’s an array or a native JS date, create and match the exact date.
	            if ( $.isArray( dateToDisable ) || _.isDate( dateToDisable ) ) {
	                return dateToVerify.pick === calendar.create( dateToDisable ).pick
	            }
	
	            // If it’s an object, match a date within the “from” and “to” range.
	            if ( $.isPlainObject( dateToDisable ) ) {
	                return calendar.withinRange( dateToDisable, dateToVerify )
	            }
	        })
	
	    // If this date matches a disabled date, confirm it’s not inverted.
	    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function( dateToDisable ) {
	        return $.isArray( dateToDisable ) && dateToDisable[3] == 'inverted' ||
	            $.isPlainObject( dateToDisable ) && dateToDisable.inverted
	    }).length
	
	    // Check the calendar “enabled” flag and respectively flip the
	    // disabled state. Then also check if it’s beyond the min/max limits.
	    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
	        dateToVerify.pick < calendar.item.min.pick ||
	        dateToVerify.pick > calendar.item.max.pick
	
	} //DatePicker.prototype.disabled
	
	
	/**
	 * Parse a string into a usable type.
	 */
	DatePicker.prototype.parse = function( type, value, options ) {
	
	    var calendar = this,
	        parsingObject = {}
	
	    // If it’s already parsed, we’re good.
	    if ( !value || typeof value != 'string' ) {
	        return value
	    }
	
	    // We need a `.format` to parse the value with.
	    if ( !( options && options.format ) ) {
	        options = options || {}
	        options.format = calendar.settings.format
	    }
	
	    // Convert the format into an array and then map through it.
	    calendar.formats.toArray( options.format ).map( function( label ) {
	
	        var
	            // Grab the formatting label.
	            formattingLabel = calendar.formats[ label ],
	
	            // The format length is from the formatting label function or the
	            // label length without the escaping exclamation (!) mark.
	            formatLength = formattingLabel ? _.trigger( formattingLabel, calendar, [ value, parsingObject ] ) : label.replace( /^!/, '' ).length
	
	        // If there's a format label, split the value up to the format length.
	        // Then add it to the parsing object with appropriate label.
	        if ( formattingLabel ) {
	            parsingObject[ label ] = value.substr( 0, formatLength )
	        }
	
	        // Update the value as the substring from format length to end.
	        value = value.substr( formatLength )
	    })
	
	    // Compensate for month 0index.
	    return [
	        parsingObject.yyyy || parsingObject.yy,
	        +( parsingObject.mm || parsingObject.m ) - 1,
	        parsingObject.dd || parsingObject.d
	    ]
	} //DatePicker.prototype.parse
	
	
	/**
	 * Various formats to display the object in.
	 */
	DatePicker.prototype.formats = (function() {
	
	    // Return the length of the first word in a collection.
	    function getWordLengthFromCollection( string, collection, dateObject ) {
	
	        // Grab the first word from the string.
	        var word = string.match( /\w+/ )[ 0 ]
	
	        // If there's no month index, add it to the date object
	        if ( !dateObject.mm && !dateObject.m ) {
	            dateObject.m = collection.indexOf( word ) + 1
	        }
	
	        // Return the length of the word.
	        return word.length
	    }
	
	    // Get the length of the first word in a string.
	    function getFirstWordLength( string ) {
	        return string.match( /\w+/ )[ 0 ].length
	    }
	
	    return {
	
	        d: function( string, dateObject ) {
	
	            // If there's string, then get the digits length.
	            // Otherwise return the selected date.
	            return string ? _.digits( string ) : dateObject.date
	        },
	        dd: function( string, dateObject ) {
	
	            // If there's a string, then the length is always 2.
	            // Otherwise return the selected date with a leading zero.
	            return string ? 2 : _.lead( dateObject.date )
	        },
	        ddd: function( string, dateObject ) {
	
	            // If there's a string, then get the length of the first word.
	            // Otherwise return the short selected weekday.
	            return string ? getFirstWordLength( string ) : this.settings.weekdaysShort[ dateObject.day ]
	        },
	        dddd: function( string, dateObject ) {
	
	            // If there's a string, then get the length of the first word.
	            // Otherwise return the full selected weekday.
	            return string ? getFirstWordLength( string ) : this.settings.weekdaysFull[ dateObject.day ]
	        },
	        m: function( string, dateObject ) {
	
	            // If there's a string, then get the length of the digits
	            // Otherwise return the selected month with 0index compensation.
	            return string ? _.digits( string ) : dateObject.month + 1
	        },
	        mm: function( string, dateObject ) {
	
	            // If there's a string, then the length is always 2.
	            // Otherwise return the selected month with 0index and leading zero.
	            return string ? 2 : _.lead( dateObject.month + 1 )
	        },
	        mmm: function( string, dateObject ) {
	
	            var collection = this.settings.monthsShort
	
	            // If there's a string, get length of the relevant month from the short
	            // months collection. Otherwise return the selected month from that collection.
	            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
	        },
	        mmmm: function( string, dateObject ) {
	
	            var collection = this.settings.monthsFull
	
	            // If there's a string, get length of the relevant month from the full
	            // months collection. Otherwise return the selected month from that collection.
	            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
	        },
	        yy: function( string, dateObject ) {
	
	            // If there's a string, then the length is always 2.
	            // Otherwise return the selected year by slicing out the first 2 digits.
	            return string ? 2 : ( '' + dateObject.year ).slice( 2 )
	        },
	        yyyy: function( string, dateObject ) {
	
	            // If there's a string, then the length is always 4.
	            // Otherwise return the selected year.
	            return string ? 4 : dateObject.year
	        },
	
	        // Create an array by splitting the formatting string passed.
	        toArray: function( formatString ) { return formatString.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g ) },
	
	        // Format an object into a string using the formatting options.
	        toString: function ( formatString, itemObject ) {
	            var calendar = this
	            return calendar.formats.toArray( formatString ).map( function( label ) {
	                return _.trigger( calendar.formats[ label ], calendar, [ 0, itemObject ] ) || label.replace( /^!/, '' )
	            }).join( '' )
	        }
	    }
	})() //DatePicker.prototype.formats
	
	
	
	
	/**
	 * Check if two date units are the exact.
	 */
	DatePicker.prototype.isDateExact = function( one, two ) {
	
	    var calendar = this
	
	    // When we’re working with weekdays, do a direct comparison.
	    if (
	        ( _.isInteger( one ) && _.isInteger( two ) ) ||
	        ( typeof one == 'boolean' && typeof two == 'boolean' )
	     ) {
	        return one === two
	    }
	
	    // When we’re working with date representations, compare the “pick” value.
	    if (
	        ( _.isDate( one ) || $.isArray( one ) ) &&
	        ( _.isDate( two ) || $.isArray( two ) )
	    ) {
	        return calendar.create( one ).pick === calendar.create( two ).pick
	    }
	
	    // When we’re working with range objects, compare the “from” and “to”.
	    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
	        return calendar.isDateExact( one.from, two.from ) && calendar.isDateExact( one.to, two.to )
	    }
	
	    return false
	}
	
	
	/**
	 * Check if two date units overlap.
	 */
	DatePicker.prototype.isDateOverlap = function( one, two ) {
	
	    var calendar = this,
	        firstDay = calendar.settings.firstDay ? 1 : 0
	
	    // When we’re working with a weekday index, compare the days.
	    if ( _.isInteger( one ) && ( _.isDate( two ) || $.isArray( two ) ) ) {
	        one = one % 7 + firstDay
	        return one === calendar.create( two ).day + 1
	    }
	    if ( _.isInteger( two ) && ( _.isDate( one ) || $.isArray( one ) ) ) {
	        two = two % 7 + firstDay
	        return two === calendar.create( one ).day + 1
	    }
	
	    // When we’re working with range objects, check if the ranges overlap.
	    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
	        return calendar.overlapRanges( one, two )
	    }
	
	    return false
	}
	
	
	/**
	 * Flip the “enabled” state.
	 */
	DatePicker.prototype.flipEnable = function(val) {
	    var itemObject = this.item
	    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
	}
	
	
	/**
	 * Mark a collection of dates as “disabled”.
	 */
	DatePicker.prototype.deactivate = function( type, datesToDisable ) {
	
	    var calendar = this,
	        disabledItems = calendar.item.disable.slice(0)
	
	
	    // If we’re flipping, that’s all we need to do.
	    if ( datesToDisable == 'flip' ) {
	        calendar.flipEnable()
	    }
	
	    else if ( datesToDisable === false ) {
	        calendar.flipEnable(1)
	        disabledItems = []
	    }
	
	    else if ( datesToDisable === true ) {
	        calendar.flipEnable(-1)
	        disabledItems = []
	    }
	
	    // Otherwise go through the dates to disable.
	    else {
	
	        datesToDisable.map(function( unitToDisable ) {
	
	            var matchFound
	
	            // When we have disabled items, check for matches.
	            // If something is matched, immediately break out.
	            for ( var index = 0; index < disabledItems.length; index += 1 ) {
	                if ( calendar.isDateExact( unitToDisable, disabledItems[index] ) ) {
	                    matchFound = true
	                    break
	                }
	            }
	
	            // If nothing was found, add the validated unit to the collection.
	            if ( !matchFound ) {
	                if (
	                    _.isInteger( unitToDisable ) ||
	                    _.isDate( unitToDisable ) ||
	                    $.isArray( unitToDisable ) ||
	                    ( $.isPlainObject( unitToDisable ) && unitToDisable.from && unitToDisable.to )
	                ) {
	                    disabledItems.push( unitToDisable )
	                }
	            }
	        })
	    }
	
	    // Return the updated collection.
	    return disabledItems
	} //DatePicker.prototype.deactivate
	
	
	/**
	 * Mark a collection of dates as “enabled”.
	 */
	DatePicker.prototype.activate = function( type, datesToEnable ) {
	
	    var calendar = this,
	        disabledItems = calendar.item.disable,
	        disabledItemsCount = disabledItems.length
	
	    // If we’re flipping, that’s all we need to do.
	    if ( datesToEnable == 'flip' ) {
	        calendar.flipEnable()
	    }
	
	    else if ( datesToEnable === true ) {
	        calendar.flipEnable(1)
	        disabledItems = []
	    }
	
	    else if ( datesToEnable === false ) {
	        calendar.flipEnable(-1)
	        disabledItems = []
	    }
	
	    // Otherwise go through the disabled dates.
	    else {
	
	        datesToEnable.map(function( unitToEnable ) {
	
	            var matchFound,
	                disabledUnit,
	                index,
	                isExactRange
	
	            // Go through the disabled items and try to find a match.
	            for ( index = 0; index < disabledItemsCount; index += 1 ) {
	
	                disabledUnit = disabledItems[index]
	
	                // When an exact match is found, remove it from the collection.
	                if ( calendar.isDateExact( disabledUnit, unitToEnable ) ) {
	                    matchFound = disabledItems[index] = null
	                    isExactRange = true
	                    break
	                }
	
	                // When an overlapped match is found, add the “inverted” state to it.
	                else if ( calendar.isDateOverlap( disabledUnit, unitToEnable ) ) {
	                    if ( $.isPlainObject( unitToEnable ) ) {
	                        unitToEnable.inverted = true
	                        matchFound = unitToEnable
	                    }
	                    else if ( $.isArray( unitToEnable ) ) {
	                        matchFound = unitToEnable
	                        if ( !matchFound[3] ) matchFound.push( 'inverted' )
	                    }
	                    else if ( _.isDate( unitToEnable ) ) {
	                        matchFound = [ unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted' ]
	                    }
	                    break
	                }
	            }
	
	            // If a match was found, remove a previous duplicate entry.
	            if ( matchFound ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
	                if ( calendar.isDateExact( disabledItems[index], unitToEnable ) ) {
	                    disabledItems[index] = null
	                    break
	                }
	            }
	
	            // In the event that we’re dealing with an exact range of dates,
	            // make sure there are no “inverted” dates because of it.
	            if ( isExactRange ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
	                if ( calendar.isDateOverlap( disabledItems[index], unitToEnable ) ) {
	                    disabledItems[index] = null
	                    break
	                }
	            }
	
	            // If something is still matched, add it into the collection.
	            if ( matchFound ) {
	                disabledItems.push( matchFound )
	            }
	        })
	    }
	
	    // Return the updated collection.
	    return disabledItems.filter(function( val ) { return val != null })
	} //DatePicker.prototype.activate
	
	
	/**
	 * Create a string for the nodes in the picker.
	 */
	DatePicker.prototype.nodes = function( isOpen ) {
	
	    var
	        calendar = this,
	        settings = calendar.settings,
	        calendarItem = calendar.item,
	        nowObject = calendarItem.now,
	        selectedObject = calendarItem.select,
	        highlightedObject = calendarItem.highlight,
	        viewsetObject = calendarItem.view,
	        disabledCollection = calendarItem.disable,
	        minLimitObject = calendarItem.min,
	        maxLimitObject = calendarItem.max,
	
	
	        // Create the calendar table head using a copy of weekday labels collection.
	        // * We do a copy so we don't mutate the original array.
	        tableHead = (function( collection, fullCollection ) {
	
	            // If the first day should be Monday, move Sunday to the end.
	            if ( settings.firstDay ) {
	                collection.push( collection.shift() )
	                fullCollection.push( fullCollection.shift() )
	            }
	
	            // Create and return the table head group.
	            return _.node(
	                'thead',
	                _.node(
	                    'tr',
	                    _.group({
	                        min: 0,
	                        max: DAYS_IN_WEEK - 1,
	                        i: 1,
	                        node: 'th',
	                        item: function( counter ) {
	                            return [
	                                collection[ counter ],
	                                settings.klass.weekdays,
	                                'scope=col title="' + fullCollection[ counter ] + '"'
	                            ]
	                        }
	                    })
	                )
	            ) //endreturn
	
	        // Materialize modified
	        })( ( settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter ).slice( 0 ), settings.weekdaysFull.slice( 0 ) ), //tableHead
	
	
	        // Create the nav for next/prev month.
	        createMonthNav = function( next ) {
	
	            // Otherwise, return the created month tag.
	            return _.node(
	                'div',
	                ' ',
	                settings.klass[ 'nav' + ( next ? 'Next' : 'Prev' ) ] + (
	
	                    // If the focused month is outside the range, disabled the button.
	                    ( next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month ) ||
	                    ( !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ) ?
	                    ' ' + settings.klass.navDisabled : ''
	                ),
	                'data-nav=' + ( next || -1 ) + ' ' +
	                _.ariaAttr({
	                    role: 'button',
	                    controls: calendar.$node[0].id + '_table'
	                }) + ' ' +
	                'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev ) + '"'
	            ) //endreturn
	        }, //createMonthNav
	
	
	        // Create the month label.
	        //Materialize modified
	        createMonthLabel = function(override) {
	
	            var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull
	
	             // Materialize modified
	            if (override == "short_months") {
	              monthsCollection = settings.monthsShort;
	            }
	
	            // If there are months to select, add a dropdown menu.
	            if ( settings.selectMonths  && override == undefined) {
	
	                return _.node( 'select',
	                    _.group({
	                        min: 0,
	                        max: 11,
	                        i: 1,
	                        node: 'option',
	                        item: function( loopedMonth ) {
	
	                            return [
	
	                                // The looped month and no classes.
	                                monthsCollection[ loopedMonth ], 0,
	
	                                // Set the value and selected index.
	                                'value=' + loopedMonth +
	                                ( viewsetObject.month == loopedMonth ? ' selected' : '' ) +
	                                (
	                                    (
	                                        ( viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month ) ||
	                                        ( viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month )
	                                    ) ?
	                                    ' disabled' : ''
	                                )
	                            ]
	                        }
	                    }),
	                    settings.klass.selectMonth + ' browser-default',
	                    ( isOpen ? '' : 'disabled' ) + ' ' +
	                    _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
	                    'title="' + settings.labelMonthSelect + '"'
	                )
	            }
	
	            // Materialize modified
	            if (override == "short_months")
	                if (selectedObject != null)
	                return _.node( 'div', monthsCollection[ selectedObject.month ] );
	                else return _.node( 'div', monthsCollection[ viewsetObject.month ] );
	
	            // If there's a need for a month selector
	            return _.node( 'div', monthsCollection[ viewsetObject.month ], settings.klass.month )
	        }, //createMonthLabel
	
	
	        // Create the year label.
	        // Materialize modified
	        createYearLabel = function(override) {
	
	            var focusedYear = viewsetObject.year,
	
	            // If years selector is set to a literal "true", set it to 5. Otherwise
	            // divide in half to get half before and half after focused year.
	            numberYears = settings.selectYears === true ? 5 : ~~( settings.selectYears / 2 )
	
	            // If there are years to select, add a dropdown menu.
	            if ( numberYears ) {
	
	                var
	                    minYear = minLimitObject.year,
	                    maxYear = maxLimitObject.year,
	                    lowestYear = focusedYear - numberYears,
	                    highestYear = focusedYear + numberYears
	
	                // If the min year is greater than the lowest year, increase the highest year
	                // by the difference and set the lowest year to the min year.
	                if ( minYear > lowestYear ) {
	                    highestYear += minYear - lowestYear
	                    lowestYear = minYear
	                }
	
	                // If the max year is less than the highest year, decrease the lowest year
	                // by the lower of the two: available and needed years. Then set the
	                // highest year to the max year.
	                if ( maxYear < highestYear ) {
	
	                    var availableYears = lowestYear - minYear,
	                        neededYears = highestYear - maxYear
	
	                    lowestYear -= availableYears > neededYears ? neededYears : availableYears
	                    highestYear = maxYear
	                }
	
	                if ( settings.selectYears  && override == undefined ) {
	                    return _.node( 'select',
	                        _.group({
	                            min: lowestYear,
	                            max: highestYear,
	                            i: 1,
	                            node: 'option',
	                            item: function( loopedYear ) {
	                                return [
	
	                                    // The looped year and no classes.
	                                    loopedYear, 0,
	
	                                    // Set the value and selected index.
	                                    'value=' + loopedYear + ( focusedYear == loopedYear ? ' selected' : '' )
	                                ]
	                            }
	                        }),
	                        settings.klass.selectYear + ' browser-default',
	                        ( isOpen ? '' : 'disabled' ) + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
	                        'title="' + settings.labelYearSelect + '"'
	                    )
	                }
	            }
	
	            // Materialize modified
	            if (override == "raw")
	                return _.node( 'div', focusedYear )
	
	            // Otherwise just return the year focused
	            return _.node( 'div', focusedYear, settings.klass.year )
	        } //createYearLabel
	
	
	        // Materialize modified
	        createDayLabel = function() {
	                if (selectedObject != null)
	                    return _.node( 'div', selectedObject.date)
	                else return _.node( 'div', nowObject.date)
	            }
	        createWeekdayLabel = function() {
	            var display_day;
	
	            if (selectedObject != null)
	                display_day = selectedObject.day;
	            else
	                display_day = nowObject.day;
	            var weekday = settings.weekdaysFull[ display_day ]
	            return weekday
	        }
	
	
	    // Create and return the entire calendar.
	return _.node(
	        // Date presentation View
	        'div',
	            _.node(
	                'div',
	                createWeekdayLabel(),
	                "picker__weekday-display"
	            )+
	            _.node(
	                // Div for short Month
	                'div',
	                createMonthLabel("short_months"),
	                settings.klass.month_display
	            )+
	            _.node(
	                // Div for Day
	                'div',
	                createDayLabel() ,
	                settings.klass.day_display
	            )+
	            _.node(
	                // Div for Year
	                'div',
	                createYearLabel("raw") ,
	                settings.klass.year_display
	            ),
	        settings.klass.date_display
	    )+
	    // Calendar container
	    _.node('div',
	        _.node('div',
	        ( settings.selectYears ?  createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel() ) +
	        createMonthNav() + createMonthNav( 1 ),
	        settings.klass.header
	    ) + _.node(
	        'table',
	        tableHead +
	        _.node(
	            'tbody',
	            _.group({
	                min: 0,
	                max: WEEKS_IN_CALENDAR - 1,
	                i: 1,
	                node: 'tr',
	                item: function( rowCounter ) {
	
	                    // If Monday is the first day and the month starts on Sunday, shift the date back a week.
	                    var shiftDateBy = settings.firstDay && calendar.create([ viewsetObject.year, viewsetObject.month, 1 ]).day === 0 ? -7 : 0
	
	                    return [
	                        _.group({
	                            min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
	                            max: function() {
	                                return this.min + DAYS_IN_WEEK - 1
	                            },
	                            i: 1,
	                            node: 'td',
	                            item: function( targetDate ) {
	
	                                // Convert the time date from a relative date to a target date.
	                                targetDate = calendar.create([ viewsetObject.year, viewsetObject.month, targetDate + ( settings.firstDay ? 1 : 0 ) ])
	
	                                var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
	                                    isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
	                                    isDisabled = disabledCollection && calendar.disabled( targetDate ) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
	                                    formattedDate = _.trigger( calendar.formats.toString, calendar, [ settings.format, targetDate ] )
	
	                                return [
	                                    _.node(
	                                        'div',
	                                        targetDate.date,
	                                        (function( klasses ) {
	
	                                            // Add the `infocus` or `outfocus` classes based on month in view.
	                                            klasses.push( viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus )
	
	                                            // Add the `today` class if needed.
	                                            if ( nowObject.pick == targetDate.pick ) {
	                                                klasses.push( settings.klass.now )
	                                            }
	
	                                            // Add the `selected` class if something's selected and the time matches.
	                                            if ( isSelected ) {
	                                                klasses.push( settings.klass.selected )
	                                            }
	
	                                            // Add the `highlighted` class if something's highlighted and the time matches.
	                                            if ( isHighlighted ) {
	                                                klasses.push( settings.klass.highlighted )
	                                            }
	
	                                            // Add the `disabled` class if something's disabled and the object matches.
	                                            if ( isDisabled ) {
	                                                klasses.push( settings.klass.disabled )
	                                            }
	
	                                            return klasses.join( ' ' )
	                                        })([ settings.klass.day ]),
	                                        'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
	                                            role: 'gridcell',
	                                            label: formattedDate,
	                                            selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
	                                            activedescendant: isHighlighted ? true : null,
	                                            disabled: isDisabled ? true : null
	                                        })
	                                    ),
	                                    '',
	                                    _.ariaAttr({ role: 'presentation' })
	                                ] //endreturn
	                            }
	                        })
	                    ] //endreturn
	                }
	            })
	        ),
	        settings.klass.table,
	        'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
	            role: 'grid',
	            controls: calendar.$node[0].id,
	            readonly: true
	        })
	    )
	    , settings.klass.calendar_container) // end calendar
	
	     +
	
	    // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
	    _.node(
	        'div',
	        _.node( 'button', settings.today, "btn-flat picker__today",
	            'type=button data-pick=' + nowObject.pick +
	            ( isOpen && !calendar.disabled(nowObject) ? '' : ' disabled' ) + ' ' +
	            _.ariaAttr({ controls: calendar.$node[0].id }) ) +
	        _.node( 'button', settings.clear, "btn-flat picker__clear",
	            'type=button data-clear=1' +
	            ( isOpen ? '' : ' disabled' ) + ' ' +
	            _.ariaAttr({ controls: calendar.$node[0].id }) ) +
	        _.node('button', settings.close, "btn-flat picker__close",
	            'type=button data-close=true ' +
	            ( isOpen ? '' : ' disabled' ) + ' ' +
	            _.ariaAttr({ controls: calendar.$node[0].id }) ),
	        settings.klass.footer
	    ) //endreturn
	} //DatePicker.prototype.nodes
	
	
	
	
	/**
	 * The date picker defaults.
	 */
	DatePicker.defaults = (function( prefix ) {
	
	    return {
	
	        // The title label to use for the month nav buttons
	        labelMonthNext: 'Next month',
	        labelMonthPrev: 'Previous month',
	
	        // The title label to use for the dropdown selectors
	        labelMonthSelect: 'Select a month',
	        labelYearSelect: 'Select a year',
	
	        // Months and weekdays
	        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
	        monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
	        weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
	        weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	
	        // Materialize modified
	        weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
	
	        // Today and clear
	        today: 'Today',
	        clear: 'Clear',
	        close: 'Close',
	
	        // The format to show on the `input` element
	        format: 'd mmmm, yyyy',
	
	        // Classes
	        klass: {
	
	            table: prefix + 'table',
	
	            header: prefix + 'header',
	
	
	            // Materialize Added klasses
	            date_display: prefix + 'date-display',
	            day_display: prefix + 'day-display',
	            month_display: prefix + 'month-display',
	            year_display: prefix + 'year-display',
	            calendar_container: prefix + 'calendar-container',
	            // end
	
	
	
	            navPrev: prefix + 'nav--prev',
	            navNext: prefix + 'nav--next',
	            navDisabled: prefix + 'nav--disabled',
	
	            month: prefix + 'month',
	            year: prefix + 'year',
	
	            selectMonth: prefix + 'select--month',
	            selectYear: prefix + 'select--year',
	
	            weekdays: prefix + 'weekday',
	
	            day: prefix + 'day',
	            disabled: prefix + 'day--disabled',
	            selected: prefix + 'day--selected',
	            highlighted: prefix + 'day--highlighted',
	            now: prefix + 'day--today',
	            infocus: prefix + 'day--infocus',
	            outfocus: prefix + 'day--outfocus',
	
	            footer: prefix + 'footer',
	
	            buttonClear: prefix + 'button--clear',
	            buttonToday: prefix + 'button--today',
	            buttonClose: prefix + 'button--close'
	        }
	    }
	})( Picker.klasses().picker + '__' )
	
	
	
	
	
	/**
	 * Extend the picker to add the date picker.
	 */
	Picker.extend( 'pickadate', DatePicker )
	
	
	}));
	
	
	;(function ($) {
	
	  $.fn.characterCounter = function(){
	    return this.each(function(){
	      var $input = $(this);
	      var $counterElement = $input.parent().find('span[class="character-counter"]');
	
	      // character counter has already been added appended to the parent container
	      if ($counterElement.length) {
	        return;
	      }
	
	      var itHasLengthAttribute = $input.attr('length') !== undefined;
	
	      if(itHasLengthAttribute){
	        $input.on('input', updateCounter);
	        $input.on('focus', updateCounter);
	        $input.on('blur', removeCounterElement);
	
	        addCounterElement($input);
	      }
	
	    });
	  };
	
	  function updateCounter(){
	    var maxLength     = +$(this).attr('length'),
	    actualLength      = +$(this).val().length,
	    isValidLength     = actualLength <= maxLength;
	
	    $(this).parent().find('span[class="character-counter"]')
	                    .html( actualLength + '/' + maxLength);
	
	    addInputStyle(isValidLength, $(this));
	  }
	
	  function addCounterElement($input) {
	    var $counterElement = $input.parent().find('span[class="character-counter"]');
	
	    if ($counterElement.length) {
	      return;
	    }
	
	    $counterElement = $('<span/>')
	                        .addClass('character-counter')
	                        .css('float','right')
	                        .css('font-size','12px')
	                        .css('height', 1);
	
	    $input.parent().append($counterElement);
	  }
	
	  function removeCounterElement(){
	    $(this).parent().find('span[class="character-counter"]').html('');
	  }
	
	  function addInputStyle(isValidLength, $input){
	    var inputHasInvalidClass = $input.hasClass('invalid');
	    if (isValidLength && inputHasInvalidClass) {
	      $input.removeClass('invalid');
	    }
	    else if(!isValidLength && !inputHasInvalidClass){
	      $input.removeClass('valid');
	      $input.addClass('invalid');
	    }
	  }
	
	  $(document).ready(function(){
	    $('input, textarea').characterCounter();
	  });
	
	}( jQuery ));
	;(function ($) {
	
	  var methods = {
	
	    init : function(options) {
	      var defaults = {
	        time_constant: 200, // ms
	        dist: -100, // zoom scale TODO: make this more intuitive as an option
	        shift: 0, // spacing for center image
	        padding: 0, // Padding between non center items
	        full_width: false, // Change to full width styles
	        indicators: false, // Toggle indicators
	        no_wrap: false // Don't wrap around and cycle through items.
	      };
	      options = $.extend(defaults, options);
	
	      return this.each(function() {
	
	        var images, offset, center, pressed, dim, count,
	            reference, referenceY, amplitude, target, velocity,
	            xform, frame, timestamp, ticker, dragged, vertical_dragged;
	        var $indicators = $('<ul class="indicators"></ul>');
	
	
	        // Initialize
	        var view = $(this);
	        var showIndicators = view.attr('data-indicators') || options.indicators;
	
	        // Don't double initialize.
	        if (view.hasClass('initialized')) {
	          // Redraw carousel.
	          $(this).trigger('carouselNext', [0.000001]);
	          return true;
	        }
	
	
	        // Options
	        if (options.full_width) {
	          options.dist = 0;
	          var firstImage = view.find('.carousel-item img').first();
	          if (firstImage.length) {
	            imageHeight = firstImage.on('load', function(){
	              view.css('height', $(this).height());
	            });
	          } else {
	            imageHeight = view.find('.carousel-item').first().height();
	            view.css('height', imageHeight);
	          }
	
	          // Offset fixed items when indicators.
	          if (showIndicators) {
	            view.find('.carousel-fixed-item').addClass('with-indicators');
	          }
	        }
	
	
	        view.addClass('initialized');
	        pressed = false;
	        offset = target = 0;
	        images = [];
	        item_width = view.find('.carousel-item').first().innerWidth();
	        dim = item_width * 2 + options.padding;
	
	        view.find('.carousel-item').each(function (i) {
	          images.push($(this)[0]);
	          if (showIndicators) {
	            var $indicator = $('<li class="indicator-item"></li>');
	
	            // Add active to first by default.
	            if (i === 0) {
	              $indicator.addClass('active');
	            }
	
	            // Handle clicks on indicators.
	            $indicator.click(function () {
	              var index = $(this).index();
	              cycleTo(index);
	            });
	            $indicators.append($indicator);
	          }
	        });
	
	        if (showIndicators) {
	          view.append($indicators);
	        }
	        count = images.length;
	
	
	        function setupEvents() {
	          if (typeof window.ontouchstart !== 'undefined') {
	            view[0].addEventListener('touchstart', tap);
	            view[0].addEventListener('touchmove', drag);
	            view[0].addEventListener('touchend', release);
	          }
	          view[0].addEventListener('mousedown', tap);
	          view[0].addEventListener('mousemove', drag);
	          view[0].addEventListener('mouseup', release);
	          view[0].addEventListener('mouseleave', release);
	          view[0].addEventListener('click', click);
	        }
	
	        function xpos(e) {
	          // touch event
	          if (e.targetTouches && (e.targetTouches.length >= 1)) {
	            return e.targetTouches[0].clientX;
	          }
	
	          // mouse event
	          return e.clientX;
	        }
	
	        function ypos(e) {
	          // touch event
	          if (e.targetTouches && (e.targetTouches.length >= 1)) {
	            return e.targetTouches[0].clientY;
	          }
	
	          // mouse event
	          return e.clientY;
	        }
	
	        function wrap(x) {
	          return (x >= count) ? (x % count) : (x < 0) ? wrap(count + (x % count)) : x;
	        }
	
	        function scroll(x) {
	          var i, half, delta, dir, tween, el, alignment, xTranslation;
	
	          offset = (typeof x === 'number') ? x : offset;
	          center = Math.floor((offset + dim / 2) / dim);
	          delta = offset - center * dim;
	          dir = (delta < 0) ? 1 : -1;
	          tween = -dir * delta * 2 / dim;
	          half = count >> 1;
	
	          if (!options.full_width) {
	            alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
	            alignment += 'translateY(' + (view[0].clientHeight - item_width) / 2 + 'px)';
	          } else {
	            alignment = 'translateX(0)';
	          }
	
	          // Set indicator active
	          if (showIndicators) {
	            var diff = (center % count);
	            var activeIndicator = $indicators.find('.indicator-item.active');
	            if (activeIndicator.index() !== diff) {
	              activeIndicator.removeClass('active');
	              $indicators.find('.indicator-item').eq(diff).addClass('active');
	            }
	          }
	
	          // center
	          // Don't show wrapped items.
	          if (!options.no_wrap || (center >= 0 && center < count)) {
	            el = images[wrap(center)];
	            el.style[xform] = alignment +
	              ' translateX(' + (-delta / 2) + 'px)' +
	              ' translateX(' + (dir * options.shift * tween * i) + 'px)' +
	              ' translateZ(' + (options.dist * tween) + 'px)';
	            el.style.zIndex = 0;
	            if (options.full_width) { tweenedOpacity = 1; }
	            else { tweenedOpacity = 1 - 0.2 * tween; }
	            el.style.opacity = tweenedOpacity;
	            el.style.display = 'block';
	          }
	
	          for (i = 1; i <= half; ++i) {
	            // right side
	            if (options.full_width) {
	              zTranslation = options.dist;
	              tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
	            } else {
	              zTranslation = options.dist * (i * 2 + tween * dir);
	              tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
	            }
	            // Don't show wrapped items.
	            if (!options.no_wrap || center + i < count) {
	              el = images[wrap(center + i)];
	              el.style[xform] = alignment +
	                ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' +
	                ' translateZ(' + zTranslation + 'px)';
	              el.style.zIndex = -i;
	              el.style.opacity = tweenedOpacity;
	              el.style.display = 'block';
	            }
	
	
	            // left side
	            if (options.full_width) {
	              zTranslation = options.dist;
	              tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
	            } else {
	              zTranslation = options.dist * (i * 2 - tween * dir);
	              tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
	            }
	            // Don't show wrapped items.
	            if (!options.no_wrap || center - i >= 0) {
	              el = images[wrap(center - i)];
	              el.style[xform] = alignment +
	                ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' +
	                ' translateZ(' + zTranslation + 'px)';
	              el.style.zIndex = -i;
	              el.style.opacity = tweenedOpacity;
	              el.style.display = 'block';
	            }
	          }
	
	          // center
	          // Don't show wrapped items.
	          if (!options.no_wrap || (center >= 0 && center < count)) {
	            el = images[wrap(center)];
	            el.style[xform] = alignment +
	              ' translateX(' + (-delta / 2) + 'px)' +
	              ' translateX(' + (dir * options.shift * tween) + 'px)' +
	              ' translateZ(' + (options.dist * tween) + 'px)';
	            el.style.zIndex = 0;
	            if (options.full_width) { tweenedOpacity = 1; }
	            else { tweenedOpacity = 1 - 0.2 * tween; }
	            el.style.opacity = tweenedOpacity;
	            el.style.display = 'block';
	          }
	        }
	
	        function track() {
	          var now, elapsed, delta, v;
	
	          now = Date.now();
	          elapsed = now - timestamp;
	          timestamp = now;
	          delta = offset - frame;
	          frame = offset;
	
	          v = 1000 * delta / (1 + elapsed);
	          velocity = 0.8 * v + 0.2 * velocity;
	        }
	
	        function autoScroll() {
	          var elapsed, delta;
	
	          if (amplitude) {
	            elapsed = Date.now() - timestamp;
	            delta = amplitude * Math.exp(-elapsed / options.time_constant);
	            if (delta > 2 || delta < -2) {
	                scroll(target - delta);
	                requestAnimationFrame(autoScroll);
	            } else {
	                scroll(target);
	            }
	          }
	        }
	
	        function click(e) {
	          // Disable clicks if carousel was dragged.
	          if (dragged) {
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	
	          } else if (!options.full_width) {
	            var clickedIndex = $(e.target).closest('.carousel-item').index();
	            var diff = (center % count) - clickedIndex;
	
	            // Disable clicks if carousel was shifted by click
	            if (diff !== 0) {
	              e.preventDefault();
	              e.stopPropagation();
	            }
	            cycleTo(clickedIndex);
	          }
	        }
	
	        function cycleTo(n) {
	          var diff = (center % count) - n;
	
	          // Account for wraparound.
	          if (!options.no_wrap) {
	            if (diff < 0) {
	              if (Math.abs(diff + count) < Math.abs(diff)) { diff += count; }
	
	            } else if (diff > 0) {
	              if (Math.abs(diff - count) < diff) { diff -= count; }
	            }
	          }
	
	          // Call prev or next accordingly.
	          if (diff < 0) {
	            view.trigger('carouselNext', [Math.abs(diff)]);
	
	          } else if (diff > 0) {
	            view.trigger('carouselPrev', [diff]);
	          }
	        }
	
	        function tap(e) {
	          pressed = true;
	          dragged = false;
	          vertical_dragged = false;
	          reference = xpos(e);
	          referenceY = ypos(e);
	
	          velocity = amplitude = 0;
	          frame = offset;
	          timestamp = Date.now();
	          clearInterval(ticker);
	          ticker = setInterval(track, 100);
	
	        }
	
	        function drag(e) {
	          var x, delta, deltaY;
	          if (pressed) {
	            x = xpos(e);
	            y = ypos(e);
	            delta = reference - x;
	            deltaY = Math.abs(referenceY - y);
	            if (deltaY < 30 && !vertical_dragged) {
	              // If vertical scrolling don't allow dragging.
	              if (delta > 2 || delta < -2) {
	                dragged = true;
	                reference = x;
	                scroll(offset + delta);
	              }
	
	            } else if (dragged) {
	              // If dragging don't allow vertical scroll.
	              e.preventDefault();
	              e.stopPropagation();
	              return false;
	
	            } else {
	              // Vertical scrolling.
	              vertical_dragged = true;
	            }
	          }
	
	          if (dragged) {
	            // If dragging don't allow vertical scroll.
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	          }
	        }
	
	        function release(e) {
	          if (pressed) {
	            pressed = false;
	          } else {
	            return;
	          }
	
	          clearInterval(ticker);
	          target = offset;
	          if (velocity > 10 || velocity < -10) {
	            amplitude = 0.9 * velocity;
	            target = offset + amplitude;
	          }
	          target = Math.round(target / dim) * dim;
	
	          // No wrap of items.
	          if (options.no_wrap) {
	            if (target >= dim * (count - 1)) {
	              target = dim * (count - 1);
	            } else if (target < 0) {
	              target = 0;
	            }
	          }
	          amplitude = target - offset;
	          timestamp = Date.now();
	          requestAnimationFrame(autoScroll);
	
	          if (dragged) {
	            e.preventDefault();
	            e.stopPropagation();
	          }
	          return false;
	        }
	
	        xform = 'transform';
	        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
	          var e = prefix + 'Transform';
	          if (typeof document.body.style[e] !== 'undefined') {
	            xform = e;
	            return false;
	          }
	          return true;
	        });
	
	
	
	        window.onresize = scroll;
	
	        setupEvents();
	        scroll(offset);
	
	        $(this).on('carouselNext', function(e, n) {
	          if (n === undefined) {
	            n = 1;
	          }
	          target = offset + dim * n;
	          if (offset !== target) {
	            amplitude = target - offset;
	            timestamp = Date.now();
	            requestAnimationFrame(autoScroll);
	          }
	        });
	
	        $(this).on('carouselPrev', function(e, n) {
	          if (n === undefined) {
	            n = 1;
	          }
	          target = offset - dim * n;
	          if (offset !== target) {
	            amplitude = target - offset;
	            timestamp = Date.now();
	            requestAnimationFrame(autoScroll);
	          }
	        });
	
	        $(this).on('carouselSet', function(e, n) {
	          if (n === undefined) {
	            n = 0;
	          }
	          cycleTo(n);
	        });
	
	      });
	
	
	
	    },
	    next : function(n) {
	      $(this).trigger('carouselNext', [n]);
	    },
	    prev : function(n) {
	      $(this).trigger('carouselPrev', [n]);
	    },
	    set : function(n) {
	      $(this).trigger('carouselSet', [n]);
	    }
	  };
	
	
	    $.fn.carousel = function(methodOrOptions) {
	      if ( methods[methodOrOptions] ) {
	        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	        // Default to "init"
	        return methods.init.apply( this, arguments );
	      } else {
	        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.carousel' );
	      }
	    }; // Plugin end
	}( jQuery ));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 15), __webpack_require__(/*! jquery */ 15), __webpack_require__(/*! jquery */ 15), __webpack_require__(/*! underscore */ 98)))

/***/ }),

/***/ 430:
/*!**************************************!*\
  !*** ./~/select2/dist/js/select2.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/* WEBPACK VAR INJECTION */(function($) {/*!
	 * Select2 4.0.3
	 * https://select2.github.io
	 *
	 * Released under the MIT license
	 * https://github.com/select2/select2/blob/master/LICENSE.md
	 */
	(function (factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node/CommonJS
	    factory(require('jquery'));
	  } else {
	    // Browser globals
	    factory(jQuery);
	  }
	}(function (jQuery) {
	  // This is needed so we can catch the AMD loader configuration and use it
	  // The inner file should be wrapped (by `banner.start.js`) in a function that
	  // returns the AMD loader references.
	  var S2 =
	(function () {
	  // Restore the Select2 AMD loader so it can be used
	  // Needed mostly in the language files, where the loader is not inserted
	  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
	    var S2 = jQuery.fn.select2.amd;
	  }
	var S2;(function () { if (!S2 || !S2.requirejs) {
	if (!S2) { S2 = {}; } else { require = S2; }
	/**
	 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
	 * Available via the MIT or new BSD license.
	 * see: http://github.com/jrburke/almond for details
	 */
	//Going sloppy to avoid 'use strict' string cost, but strict practices should
	//be followed.
	/*jslint sloppy: true */
	/*global setTimeout: false */
	
	var requirejs, require, define;
	(function (undef) {
	    var main, req, makeMap, handlers,
	        defined = {},
	        waiting = {},
	        config = {},
	        defining = {},
	        hasOwn = Object.prototype.hasOwnProperty,
	        aps = [].slice,
	        jsSuffixRegExp = /\.js$/;
	
	    function hasProp(obj, prop) {
	        return hasOwn.call(obj, prop);
	    }
	
	    /**
	     * Given a relative module name, like ./something, normalize it to
	     * a real name that can be mapped to a path.
	     * @param {String} name the relative name
	     * @param {String} baseName a real name that the name arg is relative
	     * to.
	     * @returns {String} normalized name
	     */
	    function normalize(name, baseName) {
	        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
	            foundI, foundStarMap, starI, i, j, part,
	            baseParts = baseName && baseName.split("/"),
	            map = config.map,
	            starMap = (map && map['*']) || {};
	
	        //Adjust any relative paths.
	        if (name && name.charAt(0) === ".") {
	            //If have a base name, try to normalize against it,
	            //otherwise, assume it is a top-level require that will
	            //be relative to baseUrl in the end.
	            if (baseName) {
	                name = name.split('/');
	                lastIndex = name.length - 1;
	
	                // Node .js allowance:
	                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
	                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
	                }
	
	                //Lop off the last part of baseParts, so that . matches the
	                //"directory" and not name of the baseName's module. For instance,
	                //baseName of "one/two/three", maps to "one/two/three.js", but we
	                //want the directory, "one/two" for this normalization.
	                name = baseParts.slice(0, baseParts.length - 1).concat(name);
	
	                //start trimDots
	                for (i = 0; i < name.length; i += 1) {
	                    part = name[i];
	                    if (part === ".") {
	                        name.splice(i, 1);
	                        i -= 1;
	                    } else if (part === "..") {
	                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
	                            //End of the line. Keep at least one non-dot
	                            //path segment at the front so it can be mapped
	                            //correctly to disk. Otherwise, there is likely
	                            //no path mapping for a path starting with '..'.
	                            //This can still fail, but catches the most reasonable
	                            //uses of ..
	                            break;
	                        } else if (i > 0) {
	                            name.splice(i - 1, 2);
	                            i -= 2;
	                        }
	                    }
	                }
	                //end trimDots
	
	                name = name.join("/");
	            } else if (name.indexOf('./') === 0) {
	                // No baseName, so this is ID is resolved relative
	                // to baseUrl, pull off the leading dot.
	                name = name.substring(2);
	            }
	        }
	
	        //Apply map config if available.
	        if ((baseParts || starMap) && map) {
	            nameParts = name.split('/');
	
	            for (i = nameParts.length; i > 0; i -= 1) {
	                nameSegment = nameParts.slice(0, i).join("/");
	
	                if (baseParts) {
	                    //Find the longest baseName segment match in the config.
	                    //So, do joins on the biggest to smallest lengths of baseParts.
	                    for (j = baseParts.length; j > 0; j -= 1) {
	                        mapValue = map[baseParts.slice(0, j).join('/')];
	
	                        //baseName segment has  config, find if it has one for
	                        //this name.
	                        if (mapValue) {
	                            mapValue = mapValue[nameSegment];
	                            if (mapValue) {
	                                //Match, update name to the new value.
	                                foundMap = mapValue;
	                                foundI = i;
	                                break;
	                            }
	                        }
	                    }
	                }
	
	                if (foundMap) {
	                    break;
	                }
	
	                //Check for a star map match, but just hold on to it,
	                //if there is a shorter segment match later in a matching
	                //config, then favor over this star map.
	                if (!foundStarMap && starMap && starMap[nameSegment]) {
	                    foundStarMap = starMap[nameSegment];
	                    starI = i;
	                }
	            }
	
	            if (!foundMap && foundStarMap) {
	                foundMap = foundStarMap;
	                foundI = starI;
	            }
	
	            if (foundMap) {
	                nameParts.splice(0, foundI, foundMap);
	                name = nameParts.join('/');
	            }
	        }
	
	        return name;
	    }
	
	    function makeRequire(relName, forceSync) {
	        return function () {
	            //A version of a require function that passes a moduleName
	            //value for items that may need to
	            //look up paths relative to the moduleName
	            var args = aps.call(arguments, 0);
	
	            //If first arg is not require('string'), and there is only
	            //one arg, it is the array form without a callback. Insert
	            //a null so that the following concat is correct.
	            if (typeof args[0] !== 'string' && args.length === 1) {
	                args.push(null);
	            }
	            return req.apply(undef, args.concat([relName, forceSync]));
	        };
	    }
	
	    function makeNormalize(relName) {
	        return function (name) {
	            return normalize(name, relName);
	        };
	    }
	
	    function makeLoad(depName) {
	        return function (value) {
	            defined[depName] = value;
	        };
	    }
	
	    function callDep(name) {
	        if (hasProp(waiting, name)) {
	            var args = waiting[name];
	            delete waiting[name];
	            defining[name] = true;
	            main.apply(undef, args);
	        }
	
	        if (!hasProp(defined, name) && !hasProp(defining, name)) {
	            throw new Error('No ' + name);
	        }
	        return defined[name];
	    }
	
	    //Turns a plugin!resource to [plugin, resource]
	    //with the plugin being undefined if the name
	    //did not have a plugin prefix.
	    function splitPrefix(name) {
	        var prefix,
	            index = name ? name.indexOf('!') : -1;
	        if (index > -1) {
	            prefix = name.substring(0, index);
	            name = name.substring(index + 1, name.length);
	        }
	        return [prefix, name];
	    }
	
	    /**
	     * Makes a name map, normalizing the name, and using a plugin
	     * for normalization if necessary. Grabs a ref to plugin
	     * too, as an optimization.
	     */
	    makeMap = function (name, relName) {
	        var plugin,
	            parts = splitPrefix(name),
	            prefix = parts[0];
	
	        name = parts[1];
	
	        if (prefix) {
	            prefix = normalize(prefix, relName);
	            plugin = callDep(prefix);
	        }
	
	        //Normalize according
	        if (prefix) {
	            if (plugin && plugin.normalize) {
	                name = plugin.normalize(name, makeNormalize(relName));
	            } else {
	                name = normalize(name, relName);
	            }
	        } else {
	            name = normalize(name, relName);
	            parts = splitPrefix(name);
	            prefix = parts[0];
	            name = parts[1];
	            if (prefix) {
	                plugin = callDep(prefix);
	            }
	        }
	
	        //Using ridiculous property names for space reasons
	        return {
	            f: prefix ? prefix + '!' + name : name, //fullName
	            n: name,
	            pr: prefix,
	            p: plugin
	        };
	    };
	
	    function makeConfig(name) {
	        return function () {
	            return (config && config.config && config.config[name]) || {};
	        };
	    }
	
	    handlers = {
	        require: function (name) {
	            return makeRequire(name);
	        },
	        exports: function (name) {
	            var e = defined[name];
	            if (typeof e !== 'undefined') {
	                return e;
	            } else {
	                return (defined[name] = {});
	            }
	        },
	        module: function (name) {
	            return {
	                id: name,
	                uri: '',
	                exports: defined[name],
	                config: makeConfig(name)
	            };
	        }
	    };
	
	    main = function (name, deps, callback, relName) {
	        var cjsModule, depName, ret, map, i,
	            args = [],
	            callbackType = typeof callback,
	            usingExports;
	
	        //Use name if no relName
	        relName = relName || name;
	
	        //Call the callback to define the module, if necessary.
	        if (callbackType === 'undefined' || callbackType === 'function') {
	            //Pull out the defined dependencies and pass the ordered
	            //values to the callback.
	            //Default to [require, exports, module] if no deps
	            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
	            for (i = 0; i < deps.length; i += 1) {
	                map = makeMap(deps[i], relName);
	                depName = map.f;
	
	                //Fast path CommonJS standard dependencies.
	                if (depName === "require") {
	                    args[i] = handlers.require(name);
	                } else if (depName === "exports") {
	                    //CommonJS module spec 1.1
	                    args[i] = handlers.exports(name);
	                    usingExports = true;
	                } else if (depName === "module") {
	                    //CommonJS module spec 1.1
	                    cjsModule = args[i] = handlers.module(name);
	                } else if (hasProp(defined, depName) ||
	                           hasProp(waiting, depName) ||
	                           hasProp(defining, depName)) {
	                    args[i] = callDep(depName);
	                } else if (map.p) {
	                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
	                    args[i] = defined[depName];
	                } else {
	                    throw new Error(name + ' missing ' + depName);
	                }
	            }
	
	            ret = callback ? callback.apply(defined[name], args) : undefined;
	
	            if (name) {
	                //If setting exports via "module" is in play,
	                //favor that over return value and exports. After that,
	                //favor a non-undefined return value over exports use.
	                if (cjsModule && cjsModule.exports !== undef &&
	                        cjsModule.exports !== defined[name]) {
	                    defined[name] = cjsModule.exports;
	                } else if (ret !== undef || !usingExports) {
	                    //Use the return value from the function.
	                    defined[name] = ret;
	                }
	            }
	        } else if (name) {
	            //May just be an object definition for the module. Only
	            //worry about defining if have a module name.
	            defined[name] = callback;
	        }
	    };
	
	    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
	        if (typeof deps === "string") {
	            if (handlers[deps]) {
	                //callback in this case is really relName
	                return handlers[deps](callback);
	            }
	            //Just return the module wanted. In this scenario, the
	            //deps arg is the module name, and second arg (if passed)
	            //is just the relName.
	            //Normalize module name, if it contains . or ..
	            return callDep(makeMap(deps, callback).f);
	        } else if (!deps.splice) {
	            //deps is a config object, not an array.
	            config = deps;
	            if (config.deps) {
	                req(config.deps, config.callback);
	            }
	            if (!callback) {
	                return;
	            }
	
	            if (callback.splice) {
	                //callback is an array, which means it is a dependency list.
	                //Adjust args if there are dependencies
	                deps = callback;
	                callback = relName;
	                relName = null;
	            } else {
	                deps = undef;
	            }
	        }
	
	        //Support require(['a'])
	        callback = callback || function () {};
	
	        //If relName is a function, it is an errback handler,
	        //so remove it.
	        if (typeof relName === 'function') {
	            relName = forceSync;
	            forceSync = alt;
	        }
	
	        //Simulate async callback;
	        if (forceSync) {
	            main(undef, deps, callback, relName);
	        } else {
	            //Using a non-zero value because of concern for what old browsers
	            //do, and latest browsers "upgrade" to 4 if lower value is used:
	            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
	            //If want a value immediately, use require('id') instead -- something
	            //that works in almond on the global level, but not guaranteed and
	            //unlikely to work in other AMD implementations.
	            setTimeout(function () {
	                main(undef, deps, callback, relName);
	            }, 4);
	        }
	
	        return req;
	    };
	
	    /**
	     * Just drops the config on the floor, but returns req in case
	     * the config return value is used.
	     */
	    req.config = function (cfg) {
	        return req(cfg);
	    };
	
	    /**
	     * Expose module registry for debugging and tooling
	     */
	    requirejs._defined = defined;
	
	    define = function (name, deps, callback) {
	        if (typeof name !== 'string') {
	            throw new Error('See almond README: incorrect module build, no module name');
	        }
	
	        //This module may not have dependencies
	        if (!deps.splice) {
	            //deps is not an array, so probably means
	            //an object literal or factory function for
	            //the value. Adjust args.
	            callback = deps;
	            deps = [];
	        }
	
	        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
	            waiting[name] = [name, deps, callback];
	        }
	    };
	
	    define.amd = {
	        jQuery: true
	    };
	}());
	
	S2.requirejs = requirejs;S2.require = require;S2.define = define;
	}
	}());
	S2.define("almond", function(){});
	
	/* global jQuery:false, $:false */
	S2.define('jquery',[],function () {
	  var _$ = jQuery || $;
	
	  if (_$ == null && console && console.error) {
	    console.error(
	      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
	      'found. Make sure that you are including jQuery before Select2 on your ' +
	      'web page.'
	    );
	  }
	
	  return _$;
	});
	
	S2.define('select2/utils',[
	  'jquery'
	], function ($) {
	  var Utils = {};
	
	  Utils.Extend = function (ChildClass, SuperClass) {
	    var __hasProp = {}.hasOwnProperty;
	
	    function BaseConstructor () {
	      this.constructor = ChildClass;
	    }
	
	    for (var key in SuperClass) {
	      if (__hasProp.call(SuperClass, key)) {
	        ChildClass[key] = SuperClass[key];
	      }
	    }
	
	    BaseConstructor.prototype = SuperClass.prototype;
	    ChildClass.prototype = new BaseConstructor();
	    ChildClass.__super__ = SuperClass.prototype;
	
	    return ChildClass;
	  };
	
	  function getMethods (theClass) {
	    var proto = theClass.prototype;
	
	    var methods = [];
	
	    for (var methodName in proto) {
	      var m = proto[methodName];
	
	      if (typeof m !== 'function') {
	        continue;
	      }
	
	      if (methodName === 'constructor') {
	        continue;
	      }
	
	      methods.push(methodName);
	    }
	
	    return methods;
	  }
	
	  Utils.Decorate = function (SuperClass, DecoratorClass) {
	    var decoratedMethods = getMethods(DecoratorClass);
	    var superMethods = getMethods(SuperClass);
	
	    function DecoratedClass () {
	      var unshift = Array.prototype.unshift;
	
	      var argCount = DecoratorClass.prototype.constructor.length;
	
	      var calledConstructor = SuperClass.prototype.constructor;
	
	      if (argCount > 0) {
	        unshift.call(arguments, SuperClass.prototype.constructor);
	
	        calledConstructor = DecoratorClass.prototype.constructor;
	      }
	
	      calledConstructor.apply(this, arguments);
	    }
	
	    DecoratorClass.displayName = SuperClass.displayName;
	
	    function ctr () {
	      this.constructor = DecoratedClass;
	    }
	
	    DecoratedClass.prototype = new ctr();
	
	    for (var m = 0; m < superMethods.length; m++) {
	        var superMethod = superMethods[m];
	
	        DecoratedClass.prototype[superMethod] =
	          SuperClass.prototype[superMethod];
	    }
	
	    var calledMethod = function (methodName) {
	      // Stub out the original method if it's not decorating an actual method
	      var originalMethod = function () {};
	
	      if (methodName in DecoratedClass.prototype) {
	        originalMethod = DecoratedClass.prototype[methodName];
	      }
	
	      var decoratedMethod = DecoratorClass.prototype[methodName];
	
	      return function () {
	        var unshift = Array.prototype.unshift;
	
	        unshift.call(arguments, originalMethod);
	
	        return decoratedMethod.apply(this, arguments);
	      };
	    };
	
	    for (var d = 0; d < decoratedMethods.length; d++) {
	      var decoratedMethod = decoratedMethods[d];
	
	      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
	    }
	
	    return DecoratedClass;
	  };
	
	  var Observable = function () {
	    this.listeners = {};
	  };
	
	  Observable.prototype.on = function (event, callback) {
	    this.listeners = this.listeners || {};
	
	    if (event in this.listeners) {
	      this.listeners[event].push(callback);
	    } else {
	      this.listeners[event] = [callback];
	    }
	  };
	
	  Observable.prototype.trigger = function (event) {
	    var slice = Array.prototype.slice;
	    var params = slice.call(arguments, 1);
	
	    this.listeners = this.listeners || {};
	
	    // Params should always come in as an array
	    if (params == null) {
	      params = [];
	    }
	
	    // If there are no arguments to the event, use a temporary object
	    if (params.length === 0) {
	      params.push({});
	    }
	
	    // Set the `_type` of the first object to the event
	    params[0]._type = event;
	
	    if (event in this.listeners) {
	      this.invoke(this.listeners[event], slice.call(arguments, 1));
	    }
	
	    if ('*' in this.listeners) {
	      this.invoke(this.listeners['*'], arguments);
	    }
	  };
	
	  Observable.prototype.invoke = function (listeners, params) {
	    for (var i = 0, len = listeners.length; i < len; i++) {
	      listeners[i].apply(this, params);
	    }
	  };
	
	  Utils.Observable = Observable;
	
	  Utils.generateChars = function (length) {
	    var chars = '';
	
	    for (var i = 0; i < length; i++) {
	      var randomChar = Math.floor(Math.random() * 36);
	      chars += randomChar.toString(36);
	    }
	
	    return chars;
	  };
	
	  Utils.bind = function (func, context) {
	    return function () {
	      func.apply(context, arguments);
	    };
	  };
	
	  Utils._convertData = function (data) {
	    for (var originalKey in data) {
	      var keys = originalKey.split('-');
	
	      var dataLevel = data;
	
	      if (keys.length === 1) {
	        continue;
	      }
	
	      for (var k = 0; k < keys.length; k++) {
	        var key = keys[k];
	
	        // Lowercase the first letter
	        // By default, dash-separated becomes camelCase
	        key = key.substring(0, 1).toLowerCase() + key.substring(1);
	
	        if (!(key in dataLevel)) {
	          dataLevel[key] = {};
	        }
	
	        if (k == keys.length - 1) {
	          dataLevel[key] = data[originalKey];
	        }
	
	        dataLevel = dataLevel[key];
	      }
	
	      delete data[originalKey];
	    }
	
	    return data;
	  };
	
	  Utils.hasScroll = function (index, el) {
	    // Adapted from the function created by @ShadowScripter
	    // and adapted by @BillBarry on the Stack Exchange Code Review website.
	    // The original code can be found at
	    // http://codereview.stackexchange.com/q/13338
	    // and was designed to be used with the Sizzle selector engine.
	
	    var $el = $(el);
	    var overflowX = el.style.overflowX;
	    var overflowY = el.style.overflowY;
	
	    //Check both x and y declarations
	    if (overflowX === overflowY &&
	        (overflowY === 'hidden' || overflowY === 'visible')) {
	      return false;
	    }
	
	    if (overflowX === 'scroll' || overflowY === 'scroll') {
	      return true;
	    }
	
	    return ($el.innerHeight() < el.scrollHeight ||
	      $el.innerWidth() < el.scrollWidth);
	  };
	
	  Utils.escapeMarkup = function (markup) {
	    var replaceMap = {
	      '\\': '&#92;',
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      '\'': '&#39;',
	      '/': '&#47;'
	    };
	
	    // Do not try to escape the markup if it's not a string
	    if (typeof markup !== 'string') {
	      return markup;
	    }
	
	    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
	      return replaceMap[match];
	    });
	  };
	
	  // Append an array of jQuery nodes to a given element.
	  Utils.appendMany = function ($element, $nodes) {
	    // jQuery 1.7.x does not support $.fn.append() with an array
	    // Fall back to a jQuery object collection using $.fn.add()
	    if ($.fn.jquery.substr(0, 3) === '1.7') {
	      var $jqNodes = $();
	
	      $.map($nodes, function (node) {
	        $jqNodes = $jqNodes.add(node);
	      });
	
	      $nodes = $jqNodes;
	    }
	
	    $element.append($nodes);
	  };
	
	  return Utils;
	});
	
	S2.define('select2/results',[
	  'jquery',
	  './utils'
	], function ($, Utils) {
	  function Results ($element, options, dataAdapter) {
	    this.$element = $element;
	    this.data = dataAdapter;
	    this.options = options;
	
	    Results.__super__.constructor.call(this);
	  }
	
	  Utils.Extend(Results, Utils.Observable);
	
	  Results.prototype.render = function () {
	    var $results = $(
	      '<ul class="select2-results__options" role="tree"></ul>'
	    );
	
	    if (this.options.get('multiple')) {
	      $results.attr('aria-multiselectable', 'true');
	    }
	
	    this.$results = $results;
	
	    return $results;
	  };
	
	  Results.prototype.clear = function () {
	    this.$results.empty();
	  };
	
	  Results.prototype.displayMessage = function (params) {
	    var escapeMarkup = this.options.get('escapeMarkup');
	
	    this.clear();
	    this.hideLoading();
	
	    var $message = $(
	      '<li role="treeitem" aria-live="assertive"' +
	      ' class="select2-results__option"></li>'
	    );
	
	    var message = this.options.get('translations').get(params.message);
	
	    $message.append(
	      escapeMarkup(
	        message(params.args)
	      )
	    );
	
	    $message[0].className += ' select2-results__message';
	
	    this.$results.append($message);
	  };
	
	  Results.prototype.hideMessages = function () {
	    this.$results.find('.select2-results__message').remove();
	  };
	
	  Results.prototype.append = function (data) {
	    this.hideLoading();
	
	    var $options = [];
	
	    if (data.results == null || data.results.length === 0) {
	      if (this.$results.children().length === 0) {
	        this.trigger('results:message', {
	          message: 'noResults'
	        });
	      }
	
	      return;
	    }
	
	    data.results = this.sort(data.results);
	
	    for (var d = 0; d < data.results.length; d++) {
	      var item = data.results[d];
	
	      var $option = this.option(item);
	
	      $options.push($option);
	    }
	
	    this.$results.append($options);
	  };
	
	  Results.prototype.position = function ($results, $dropdown) {
	    var $resultsContainer = $dropdown.find('.select2-results');
	    $resultsContainer.append($results);
	  };
	
	  Results.prototype.sort = function (data) {
	    var sorter = this.options.get('sorter');
	
	    return sorter(data);
	  };
	
	  Results.prototype.highlightFirstItem = function () {
	    var $options = this.$results
	      .find('.select2-results__option[aria-selected]');
	
	    var $selected = $options.filter('[aria-selected=true]');
	
	    // Check if there are any selected options
	    if ($selected.length > 0) {
	      // If there are selected options, highlight the first
	      $selected.first().trigger('mouseenter');
	    } else {
	      // If there are no selected options, highlight the first option
	      // in the dropdown
	      $options.first().trigger('mouseenter');
	    }
	
	    this.ensureHighlightVisible();
	  };
	
	  Results.prototype.setClasses = function () {
	    var self = this;
	
	    this.data.current(function (selected) {
	      var selectedIds = $.map(selected, function (s) {
	        return s.id.toString();
	      });
	
	      var $options = self.$results
	        .find('.select2-results__option[aria-selected]');
	
	      $options.each(function () {
	        var $option = $(this);
	
	        var item = $.data(this, 'data');
	
	        // id needs to be converted to a string when comparing
	        var id = '' + item.id;
	
	        if ((item.element != null && item.element.selected) ||
	            (item.element == null && $.inArray(id, selectedIds) > -1)) {
	          $option.attr('aria-selected', 'true');
	        } else {
	          $option.attr('aria-selected', 'false');
	        }
	      });
	
	    });
	  };
	
	  Results.prototype.showLoading = function (params) {
	    this.hideLoading();
	
	    var loadingMore = this.options.get('translations').get('searching');
	
	    var loading = {
	      disabled: true,
	      loading: true,
	      text: loadingMore(params)
	    };
	    var $loading = this.option(loading);
	    $loading.className += ' loading-results';
	
	    this.$results.prepend($loading);
	  };
	
	  Results.prototype.hideLoading = function () {
	    this.$results.find('.loading-results').remove();
	  };
	
	  Results.prototype.option = function (data) {
	    var option = document.createElement('li');
	    option.className = 'select2-results__option';
	
	    var attrs = {
	      'role': 'treeitem',
	      'aria-selected': 'false'
	    };
	
	    if (data.disabled) {
	      delete attrs['aria-selected'];
	      attrs['aria-disabled'] = 'true';
	    }
	
	    if (data.id == null) {
	      delete attrs['aria-selected'];
	    }
	
	    if (data._resultId != null) {
	      option.id = data._resultId;
	    }
	
	    if (data.title) {
	      option.title = data.title;
	    }
	
	    if (data.children) {
	      attrs.role = 'group';
	      attrs['aria-label'] = data.text;
	      delete attrs['aria-selected'];
	    }
	
	    for (var attr in attrs) {
	      var val = attrs[attr];
	
	      option.setAttribute(attr, val);
	    }
	
	    if (data.children) {
	      var $option = $(option);
	
	      var label = document.createElement('strong');
	      label.className = 'select2-results__group';
	
	      var $label = $(label);
	      this.template(data, label);
	
	      var $children = [];
	
	      for (var c = 0; c < data.children.length; c++) {
	        var child = data.children[c];
	
	        var $child = this.option(child);
	
	        $children.push($child);
	      }
	
	      var $childrenContainer = $('<ul></ul>', {
	        'class': 'select2-results__options select2-results__options--nested'
	      });
	
	      $childrenContainer.append($children);
	
	      $option.append(label);
	      $option.append($childrenContainer);
	    } else {
	      this.template(data, option);
	    }
	
	    $.data(option, 'data', data);
	
	    return option;
	  };
	
	  Results.prototype.bind = function (container, $container) {
	    var self = this;
	
	    var id = container.id + '-results';
	
	    this.$results.attr('id', id);
	
	    container.on('results:all', function (params) {
	      self.clear();
	      self.append(params.data);
	
	      if (container.isOpen()) {
	        self.setClasses();
	        self.highlightFirstItem();
	      }
	    });
	
	    container.on('results:append', function (params) {
	      self.append(params.data);
	
	      if (container.isOpen()) {
	        self.setClasses();
	      }
	    });
	
	    container.on('query', function (params) {
	      self.hideMessages();
	      self.showLoading(params);
	    });
	
	    container.on('select', function () {
	      if (!container.isOpen()) {
	        return;
	      }
	
	      self.setClasses();
	      self.highlightFirstItem();
	    });
	
	    container.on('unselect', function () {
	      if (!container.isOpen()) {
	        return;
	      }
	
	      self.setClasses();
	      self.highlightFirstItem();
	    });
	
	    container.on('open', function () {
	      // When the dropdown is open, aria-expended="true"
	      self.$results.attr('aria-expanded', 'true');
	      self.$results.attr('aria-hidden', 'false');
	
	      self.setClasses();
	      self.ensureHighlightVisible();
	    });
	
	    container.on('close', function () {
	      // When the dropdown is closed, aria-expended="false"
	      self.$results.attr('aria-expanded', 'false');
	      self.$results.attr('aria-hidden', 'true');
	      self.$results.removeAttr('aria-activedescendant');
	    });
	
	    container.on('results:toggle', function () {
	      var $highlighted = self.getHighlightedResults();
	
	      if ($highlighted.length === 0) {
	        return;
	      }
	
	      $highlighted.trigger('mouseup');
	    });
	
	    container.on('results:select', function () {
	      var $highlighted = self.getHighlightedResults();
	
	      if ($highlighted.length === 0) {
	        return;
	      }
	
	      var data = $highlighted.data('data');
	
	      if ($highlighted.attr('aria-selected') == 'true') {
	        self.trigger('close', {});
	      } else {
	        self.trigger('select', {
	          data: data
	        });
	      }
	    });
	
	    container.on('results:previous', function () {
	      var $highlighted = self.getHighlightedResults();
	
	      var $options = self.$results.find('[aria-selected]');
	
	      var currentIndex = $options.index($highlighted);
	
	      // If we are already at te top, don't move further
	      if (currentIndex === 0) {
	        return;
	      }
	
	      var nextIndex = currentIndex - 1;
	
	      // If none are highlighted, highlight the first
	      if ($highlighted.length === 0) {
	        nextIndex = 0;
	      }
	
	      var $next = $options.eq(nextIndex);
	
	      $next.trigger('mouseenter');
	
	      var currentOffset = self.$results.offset().top;
	      var nextTop = $next.offset().top;
	      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);
	
	      if (nextIndex === 0) {
	        self.$results.scrollTop(0);
	      } else if (nextTop - currentOffset < 0) {
	        self.$results.scrollTop(nextOffset);
	      }
	    });
	
	    container.on('results:next', function () {
	      var $highlighted = self.getHighlightedResults();
	
	      var $options = self.$results.find('[aria-selected]');
	
	      var currentIndex = $options.index($highlighted);
	
	      var nextIndex = currentIndex + 1;
	
	      // If we are at the last option, stay there
	      if (nextIndex >= $options.length) {
	        return;
	      }
	
	      var $next = $options.eq(nextIndex);
	
	      $next.trigger('mouseenter');
	
	      var currentOffset = self.$results.offset().top +
	        self.$results.outerHeight(false);
	      var nextBottom = $next.offset().top + $next.outerHeight(false);
	      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;
	
	      if (nextIndex === 0) {
	        self.$results.scrollTop(0);
	      } else if (nextBottom > currentOffset) {
	        self.$results.scrollTop(nextOffset);
	      }
	    });
	
	    container.on('results:focus', function (params) {
	      params.element.addClass('select2-results__option--highlighted');
	    });
	
	    container.on('results:message', function (params) {
	      self.displayMessage(params);
	    });
	
	    if ($.fn.mousewheel) {
	      this.$results.on('mousewheel', function (e) {
	        var top = self.$results.scrollTop();
	
	        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;
	
	        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
	        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();
	
	        if (isAtTop) {
	          self.$results.scrollTop(0);
	
	          e.preventDefault();
	          e.stopPropagation();
	        } else if (isAtBottom) {
	          self.$results.scrollTop(
	            self.$results.get(0).scrollHeight - self.$results.height()
	          );
	
	          e.preventDefault();
	          e.stopPropagation();
	        }
	      });
	    }
	
	    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
	      function (evt) {
	      var $this = $(this);
	
	      var data = $this.data('data');
	
	      if ($this.attr('aria-selected') === 'true') {
	        if (self.options.get('multiple')) {
	          self.trigger('unselect', {
	            originalEvent: evt,
	            data: data
	          });
	        } else {
	          self.trigger('close', {});
	        }
	
	        return;
	      }
	
	      self.trigger('select', {
	        originalEvent: evt,
	        data: data
	      });
	    });
	
	    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
	      function (evt) {
	      var data = $(this).data('data');
	
	      self.getHighlightedResults()
	          .removeClass('select2-results__option--highlighted');
	
	      self.trigger('results:focus', {
	        data: data,
	        element: $(this)
	      });
	    });
	  };
	
	  Results.prototype.getHighlightedResults = function () {
	    var $highlighted = this.$results
	    .find('.select2-results__option--highlighted');
	
	    return $highlighted;
	  };
	
	  Results.prototype.destroy = function () {
	    this.$results.remove();
	  };
	
	  Results.prototype.ensureHighlightVisible = function () {
	    var $highlighted = this.getHighlightedResults();
	
	    if ($highlighted.length === 0) {
	      return;
	    }
	
	    var $options = this.$results.find('[aria-selected]');
	
	    var currentIndex = $options.index($highlighted);
	
	    var currentOffset = this.$results.offset().top;
	    var nextTop = $highlighted.offset().top;
	    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);
	
	    var offsetDelta = nextTop - currentOffset;
	    nextOffset -= $highlighted.outerHeight(false) * 2;
	
	    if (currentIndex <= 2) {
	      this.$results.scrollTop(0);
	    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
	      this.$results.scrollTop(nextOffset);
	    }
	  };
	
	  Results.prototype.template = function (result, container) {
	    var template = this.options.get('templateResult');
	    var escapeMarkup = this.options.get('escapeMarkup');
	
	    var content = template(result, container);
	
	    if (content == null) {
	      container.style.display = 'none';
	    } else if (typeof content === 'string') {
	      container.innerHTML = escapeMarkup(content);
	    } else {
	      $(container).append(content);
	    }
	  };
	
	  return Results;
	});
	
	S2.define('select2/keys',[
	
	], function () {
	  var KEYS = {
	    BACKSPACE: 8,
	    TAB: 9,
	    ENTER: 13,
	    SHIFT: 16,
	    CTRL: 17,
	    ALT: 18,
	    ESC: 27,
	    SPACE: 32,
	    PAGE_UP: 33,
	    PAGE_DOWN: 34,
	    END: 35,
	    HOME: 36,
	    LEFT: 37,
	    UP: 38,
	    RIGHT: 39,
	    DOWN: 40,
	    DELETE: 46
	  };
	
	  return KEYS;
	});
	
	S2.define('select2/selection/base',[
	  'jquery',
	  '../utils',
	  '../keys'
	], function ($, Utils, KEYS) {
	  function BaseSelection ($element, options) {
	    this.$element = $element;
	    this.options = options;
	
	    BaseSelection.__super__.constructor.call(this);
	  }
	
	  Utils.Extend(BaseSelection, Utils.Observable);
	
	  BaseSelection.prototype.render = function () {
	    var $selection = $(
	      '<span class="select2-selection" role="combobox" ' +
	      ' aria-haspopup="true" aria-expanded="false">' +
	      '</span>'
	    );
	
	    this._tabindex = 0;
	
	    if (this.$element.data('old-tabindex') != null) {
	      this._tabindex = this.$element.data('old-tabindex');
	    } else if (this.$element.attr('tabindex') != null) {
	      this._tabindex = this.$element.attr('tabindex');
	    }
	
	    $selection.attr('title', this.$element.attr('title'));
	    $selection.attr('tabindex', this._tabindex);
	
	    this.$selection = $selection;
	
	    return $selection;
	  };
	
	  BaseSelection.prototype.bind = function (container, $container) {
	    var self = this;
	
	    var id = container.id + '-container';
	    var resultsId = container.id + '-results';
	
	    this.container = container;
	
	    this.$selection.on('focus', function (evt) {
	      self.trigger('focus', evt);
	    });
	
	    this.$selection.on('blur', function (evt) {
	      self._handleBlur(evt);
	    });
	
	    this.$selection.on('keydown', function (evt) {
	      self.trigger('keypress', evt);
	
	      if (evt.which === KEYS.SPACE) {
	        evt.preventDefault();
	      }
	    });
	
	    container.on('results:focus', function (params) {
	      self.$selection.attr('aria-activedescendant', params.data._resultId);
	    });
	
	    container.on('selection:update', function (params) {
	      self.update(params.data);
	    });
	
	    container.on('open', function () {
	      // When the dropdown is open, aria-expanded="true"
	      self.$selection.attr('aria-expanded', 'true');
	      self.$selection.attr('aria-owns', resultsId);
	
	      self._attachCloseHandler(container);
	    });
	
	    container.on('close', function () {
	      // When the dropdown is closed, aria-expanded="false"
	      self.$selection.attr('aria-expanded', 'false');
	      self.$selection.removeAttr('aria-activedescendant');
	      self.$selection.removeAttr('aria-owns');
	
	      self.$selection.focus();
	
	      self._detachCloseHandler(container);
	    });
	
	    container.on('enable', function () {
	      self.$selection.attr('tabindex', self._tabindex);
	    });
	
	    container.on('disable', function () {
	      self.$selection.attr('tabindex', '-1');
	    });
	  };
	
	  BaseSelection.prototype._handleBlur = function (evt) {
	    var self = this;
	
	    // This needs to be delayed as the active element is the body when the tab
	    // key is pressed, possibly along with others.
	    window.setTimeout(function () {
	      // Don't trigger `blur` if the focus is still in the selection
	      if (
	        (document.activeElement == self.$selection[0]) ||
	        ($.contains(self.$selection[0], document.activeElement))
	      ) {
	        return;
	      }
	
	      self.trigger('blur', evt);
	    }, 1);
	  };
	
	  BaseSelection.prototype._attachCloseHandler = function (container) {
	    var self = this;
	
	    $(document.body).on('mousedown.select2.' + container.id, function (e) {
	      var $target = $(e.target);
	
	      var $select = $target.closest('.select2');
	
	      var $all = $('.select2.select2-container--open');
	
	      $all.each(function () {
	        var $this = $(this);
	
	        if (this == $select[0]) {
	          return;
	        }
	
	        var $element = $this.data('element');
	
	        $element.select2('close');
	      });
	    });
	  };
	
	  BaseSelection.prototype._detachCloseHandler = function (container) {
	    $(document.body).off('mousedown.select2.' + container.id);
	  };
	
	  BaseSelection.prototype.position = function ($selection, $container) {
	    var $selectionContainer = $container.find('.selection');
	    $selectionContainer.append($selection);
	  };
	
	  BaseSelection.prototype.destroy = function () {
	    this._detachCloseHandler(this.container);
	  };
	
	  BaseSelection.prototype.update = function (data) {
	    throw new Error('The `update` method must be defined in child classes.');
	  };
	
	  return BaseSelection;
	});
	
	S2.define('select2/selection/single',[
	  'jquery',
	  './base',
	  '../utils',
	  '../keys'
	], function ($, BaseSelection, Utils, KEYS) {
	  function SingleSelection () {
	    SingleSelection.__super__.constructor.apply(this, arguments);
	  }
	
	  Utils.Extend(SingleSelection, BaseSelection);
	
	  SingleSelection.prototype.render = function () {
	    var $selection = SingleSelection.__super__.render.call(this);
	
	    $selection.addClass('select2-selection--single');
	
	    $selection.html(
	      '<span class="select2-selection__rendered"></span>' +
	      '<span class="select2-selection__arrow" role="presentation">' +
	        '<b role="presentation"></b>' +
	      '</span>'
	    );
	
	    return $selection;
	  };
	
	  SingleSelection.prototype.bind = function (container, $container) {
	    var self = this;
	
	    SingleSelection.__super__.bind.apply(this, arguments);
	
	    var id = container.id + '-container';
	
	    this.$selection.find('.select2-selection__rendered').attr('id', id);
	    this.$selection.attr('aria-labelledby', id);
	
	    this.$selection.on('mousedown', function (evt) {
	      // Only respond to left clicks
	      if (evt.which !== 1) {
	        return;
	      }
	
	      self.trigger('toggle', {
	        originalEvent: evt
	      });
	    });
	
	    this.$selection.on('focus', function (evt) {
	      // User focuses on the container
	    });
	
	    this.$selection.on('blur', function (evt) {
	      // User exits the container
	    });
	
	    container.on('focus', function (evt) {
	      if (!container.isOpen()) {
	        self.$selection.focus();
	      }
	    });
	
	    container.on('selection:update', function (params) {
	      self.update(params.data);
	    });
	  };
	
	  SingleSelection.prototype.clear = function () {
	    this.$selection.find('.select2-selection__rendered').empty();
	  };
	
	  SingleSelection.prototype.display = function (data, container) {
	    var template = this.options.get('templateSelection');
	    var escapeMarkup = this.options.get('escapeMarkup');
	
	    return escapeMarkup(template(data, container));
	  };
	
	  SingleSelection.prototype.selectionContainer = function () {
	    return $('<span></span>');
	  };
	
	  SingleSelection.prototype.update = function (data) {
	    if (data.length === 0) {
	      this.clear();
	      return;
	    }
	
	    var selection = data[0];
	
	    var $rendered = this.$selection.find('.select2-selection__rendered');
	    var formatted = this.display(selection, $rendered);
	
	    $rendered.empty().append(formatted);
	    $rendered.prop('title', selection.title || selection.text);
	  };
	
	  return SingleSelection;
	});
	
	S2.define('select2/selection/multiple',[
	  'jquery',
	  './base',
	  '../utils'
	], function ($, BaseSelection, Utils) {
	  function MultipleSelection ($element, options) {
	    MultipleSelection.__super__.constructor.apply(this, arguments);
	  }
	
	  Utils.Extend(MultipleSelection, BaseSelection);
	
	  MultipleSelection.prototype.render = function () {
	    var $selection = MultipleSelection.__super__.render.call(this);
	
	    $selection.addClass('select2-selection--multiple');
	
	    $selection.html(
	      '<ul class="select2-selection__rendered"></ul>'
	    );
	
	    return $selection;
	  };
	
	  MultipleSelection.prototype.bind = function (container, $container) {
	    var self = this;
	
	    MultipleSelection.__super__.bind.apply(this, arguments);
	
	    this.$selection.on('click', function (evt) {
	      self.trigger('toggle', {
	        originalEvent: evt
	      });
	    });
	
	    this.$selection.on(
	      'click',
	      '.select2-selection__choice__remove',
	      function (evt) {
	        // Ignore the event if it is disabled
	        if (self.options.get('disabled')) {
	          return;
	        }
	
	        var $remove = $(this);
	        var $selection = $remove.parent();
	
	        var data = $selection.data('data');
	
	        self.trigger('unselect', {
	          originalEvent: evt,
	          data: data
	        });
	      }
	    );
	  };
	
	  MultipleSelection.prototype.clear = function () {
	    this.$selection.find('.select2-selection__rendered').empty();
	  };
	
	  MultipleSelection.prototype.display = function (data, container) {
	    var template = this.options.get('templateSelection');
	    var escapeMarkup = this.options.get('escapeMarkup');
	
	    return escapeMarkup(template(data, container));
	  };
	
	  MultipleSelection.prototype.selectionContainer = function () {
	    var $container = $(
	      '<li class="select2-selection__choice">' +
	        '<span class="select2-selection__choice__remove" role="presentation">' +
	          '&times;' +
	        '</span>' +
	      '</li>'
	    );
	
	    return $container;
	  };
	
	  MultipleSelection.prototype.update = function (data) {
	    this.clear();
	
	    if (data.length === 0) {
	      return;
	    }
	
	    var $selections = [];
	
	    for (var d = 0; d < data.length; d++) {
	      var selection = data[d];
	
	      var $selection = this.selectionContainer();
	      var formatted = this.display(selection, $selection);
	
	      $selection.append(formatted);
	      $selection.prop('title', selection.title || selection.text);
	
	      $selection.data('data', selection);
	
	      $selections.push($selection);
	    }
	
	    var $rendered = this.$selection.find('.select2-selection__rendered');
	
	    Utils.appendMany($rendered, $selections);
	  };
	
	  return MultipleSelection;
	});
	
	S2.define('select2/selection/placeholder',[
	  '../utils'
	], function (Utils) {
	  function Placeholder (decorated, $element, options) {
	    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
	
	    decorated.call(this, $element, options);
	  }
	
	  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
	    if (typeof placeholder === 'string') {
	      placeholder = {
	        id: '',
	        text: placeholder
	      };
	    }
	
	    return placeholder;
	  };
	
	  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
	    var $placeholder = this.selectionContainer();
	
	    $placeholder.html(this.display(placeholder));
	    $placeholder.addClass('select2-selection__placeholder')
	                .removeClass('select2-selection__choice');
	
	    return $placeholder;
	  };
	
	  Placeholder.prototype.update = function (decorated, data) {
	    var singlePlaceholder = (
	      data.length == 1 && data[0].id != this.placeholder.id
	    );
	    var multipleSelections = data.length > 1;
	
	    if (multipleSelections || singlePlaceholder) {
	      return decorated.call(this, data);
	    }
	
	    this.clear();
	
	    var $placeholder = this.createPlaceholder(this.placeholder);
	
	    this.$selection.find('.select2-selection__rendered').append($placeholder);
	  };
	
	  return Placeholder;
	});
	
	S2.define('select2/selection/allowClear',[
	  'jquery',
	  '../keys'
	], function ($, KEYS) {
	  function AllowClear () { }
	
	  AllowClear.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    decorated.call(this, container, $container);
	
	    if (this.placeholder == null) {
	      if (this.options.get('debug') && window.console && console.error) {
	        console.error(
	          'Select2: The `allowClear` option should be used in combination ' +
	          'with the `placeholder` option.'
	        );
	      }
	    }
	
	    this.$selection.on('mousedown', '.select2-selection__clear',
	      function (evt) {
	        self._handleClear(evt);
	    });
	
	    container.on('keypress', function (evt) {
	      self._handleKeyboardClear(evt, container);
	    });
	  };
	
	  AllowClear.prototype._handleClear = function (_, evt) {
	    // Ignore the event if it is disabled
	    if (this.options.get('disabled')) {
	      return;
	    }
	
	    var $clear = this.$selection.find('.select2-selection__clear');
	
	    // Ignore the event if nothing has been selected
	    if ($clear.length === 0) {
	      return;
	    }
	
	    evt.stopPropagation();
	
	    var data = $clear.data('data');
	
	    for (var d = 0; d < data.length; d++) {
	      var unselectData = {
	        data: data[d]
	      };
	
	      // Trigger the `unselect` event, so people can prevent it from being
	      // cleared.
	      this.trigger('unselect', unselectData);
	
	      // If the event was prevented, don't clear it out.
	      if (unselectData.prevented) {
	        return;
	      }
	    }
	
	    this.$element.val(this.placeholder.id).trigger('change');
	
	    this.trigger('toggle', {});
	  };
	
	  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
	    if (container.isOpen()) {
	      return;
	    }
	
	    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
	      this._handleClear(evt);
	    }
	  };
	
	  AllowClear.prototype.update = function (decorated, data) {
	    decorated.call(this, data);
	
	    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
	        data.length === 0) {
	      return;
	    }
	
	    var $remove = $(
	      '<span class="select2-selection__clear">' +
	        '&times;' +
	      '</span>'
	    );
	    $remove.data('data', data);
	
	    this.$selection.find('.select2-selection__rendered').prepend($remove);
	  };
	
	  return AllowClear;
	});
	
	S2.define('select2/selection/search',[
	  'jquery',
	  '../utils',
	  '../keys'
	], function ($, Utils, KEYS) {
	  function Search (decorated, $element, options) {
	    decorated.call(this, $element, options);
	  }
	
	  Search.prototype.render = function (decorated) {
	    var $search = $(
	      '<li class="select2-search select2-search--inline">' +
	        '<input class="select2-search__field" type="search" tabindex="-1"' +
	        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
	        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
	      '</li>'
	    );
	
	    this.$searchContainer = $search;
	    this.$search = $search.find('input');
	
	    var $rendered = decorated.call(this);
	
	    this._transferTabIndex();
	
	    return $rendered;
	  };
	
	  Search.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    decorated.call(this, container, $container);
	
	    container.on('open', function () {
	      self.$search.trigger('focus');
	    });
	
	    container.on('close', function () {
	      self.$search.val('');
	      self.$search.removeAttr('aria-activedescendant');
	      self.$search.trigger('focus');
	    });
	
	    container.on('enable', function () {
	      self.$search.prop('disabled', false);
	
	      self._transferTabIndex();
	    });
	
	    container.on('disable', function () {
	      self.$search.prop('disabled', true);
	    });
	
	    container.on('focus', function (evt) {
	      self.$search.trigger('focus');
	    });
	
	    container.on('results:focus', function (params) {
	      self.$search.attr('aria-activedescendant', params.id);
	    });
	
	    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
	      self.trigger('focus', evt);
	    });
	
	    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
	      self._handleBlur(evt);
	    });
	
	    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
	      evt.stopPropagation();
	
	      self.trigger('keypress', evt);
	
	      self._keyUpPrevented = evt.isDefaultPrevented();
	
	      var key = evt.which;
	
	      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
	        var $previousChoice = self.$searchContainer
	          .prev('.select2-selection__choice');
	
	        if ($previousChoice.length > 0) {
	          var item = $previousChoice.data('data');
	
	          self.searchRemoveChoice(item);
	
	          evt.preventDefault();
	        }
	      }
	    });
	
	    // Try to detect the IE version should the `documentMode` property that
	    // is stored on the document. This is only implemented in IE and is
	    // slightly cleaner than doing a user agent check.
	    // This property is not available in Edge, but Edge also doesn't have
	    // this bug.
	    var msie = document.documentMode;
	    var disableInputEvents = msie && msie <= 11;
	
	    // Workaround for browsers which do not support the `input` event
	    // This will prevent double-triggering of events for browsers which support
	    // both the `keyup` and `input` events.
	    this.$selection.on(
	      'input.searchcheck',
	      '.select2-search--inline',
	      function (evt) {
	        // IE will trigger the `input` event when a placeholder is used on a
	        // search box. To get around this issue, we are forced to ignore all
	        // `input` events in IE and keep using `keyup`.
	        if (disableInputEvents) {
	          self.$selection.off('input.search input.searchcheck');
	          return;
	        }
	
	        // Unbind the duplicated `keyup` event
	        self.$selection.off('keyup.search');
	      }
	    );
	
	    this.$selection.on(
	      'keyup.search input.search',
	      '.select2-search--inline',
	      function (evt) {
	        // IE will trigger the `input` event when a placeholder is used on a
	        // search box. To get around this issue, we are forced to ignore all
	        // `input` events in IE and keep using `keyup`.
	        if (disableInputEvents && evt.type === 'input') {
	          self.$selection.off('input.search input.searchcheck');
	          return;
	        }
	
	        var key = evt.which;
	
	        // We can freely ignore events from modifier keys
	        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
	          return;
	        }
	
	        // Tabbing will be handled during the `keydown` phase
	        if (key == KEYS.TAB) {
	          return;
	        }
	
	        self.handleSearch(evt);
	      }
	    );
	  };
	
	  /**
	   * This method will transfer the tabindex attribute from the rendered
	   * selection to the search box. This allows for the search box to be used as
	   * the primary focus instead of the selection container.
	   *
	   * @private
	   */
	  Search.prototype._transferTabIndex = function (decorated) {
	    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
	    this.$selection.attr('tabindex', '-1');
	  };
	
	  Search.prototype.createPlaceholder = function (decorated, placeholder) {
	    this.$search.attr('placeholder', placeholder.text);
	  };
	
	  Search.prototype.update = function (decorated, data) {
	    var searchHadFocus = this.$search[0] == document.activeElement;
	
	    this.$search.attr('placeholder', '');
	
	    decorated.call(this, data);
	
	    this.$selection.find('.select2-selection__rendered')
	                   .append(this.$searchContainer);
	
	    this.resizeSearch();
	    if (searchHadFocus) {
	      this.$search.focus();
	    }
	  };
	
	  Search.prototype.handleSearch = function () {
	    this.resizeSearch();
	
	    if (!this._keyUpPrevented) {
	      var input = this.$search.val();
	
	      this.trigger('query', {
	        term: input
	      });
	    }
	
	    this._keyUpPrevented = false;
	  };
	
	  Search.prototype.searchRemoveChoice = function (decorated, item) {
	    this.trigger('unselect', {
	      data: item
	    });
	
	    this.$search.val(item.text);
	    this.handleSearch();
	  };
	
	  Search.prototype.resizeSearch = function () {
	    this.$search.css('width', '25px');
	
	    var width = '';
	
	    if (this.$search.attr('placeholder') !== '') {
	      width = this.$selection.find('.select2-selection__rendered').innerWidth();
	    } else {
	      var minimumWidth = this.$search.val().length + 1;
	
	      width = (minimumWidth * 0.75) + 'em';
	    }
	
	    this.$search.css('width', width);
	  };
	
	  return Search;
	});
	
	S2.define('select2/selection/eventRelay',[
	  'jquery'
	], function ($) {
	  function EventRelay () { }
	
	  EventRelay.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	    var relayEvents = [
	      'open', 'opening',
	      'close', 'closing',
	      'select', 'selecting',
	      'unselect', 'unselecting'
	    ];
	
	    var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];
	
	    decorated.call(this, container, $container);
	
	    container.on('*', function (name, params) {
	      // Ignore events that should not be relayed
	      if ($.inArray(name, relayEvents) === -1) {
	        return;
	      }
	
	      // The parameters should always be an object
	      params = params || {};
	
	      // Generate the jQuery event for the Select2 event
	      var evt = $.Event('select2:' + name, {
	        params: params
	      });
	
	      self.$element.trigger(evt);
	
	      // Only handle preventable events if it was one
	      if ($.inArray(name, preventableEvents) === -1) {
	        return;
	      }
	
	      params.prevented = evt.isDefaultPrevented();
	    });
	  };
	
	  return EventRelay;
	});
	
	S2.define('select2/translation',[
	  'jquery',
	  'require'
	], function ($, require) {
	  function Translation (dict) {
	    this.dict = dict || {};
	  }
	
	  Translation.prototype.all = function () {
	    return this.dict;
	  };
	
	  Translation.prototype.get = function (key) {
	    return this.dict[key];
	  };
	
	  Translation.prototype.extend = function (translation) {
	    this.dict = $.extend({}, translation.all(), this.dict);
	  };
	
	  // Static functions
	
	  Translation._cache = {};
	
	  Translation.loadPath = function (path) {
	    if (!(path in Translation._cache)) {
	      var translations = require(path);
	
	      Translation._cache[path] = translations;
	    }
	
	    return new Translation(Translation._cache[path]);
	  };
	
	  return Translation;
	});
	
	S2.define('select2/diacritics',[
	
	], function () {
	  var diacritics = {
	    '\u24B6': 'A',
	    '\uFF21': 'A',
	    '\u00C0': 'A',
	    '\u00C1': 'A',
	    '\u00C2': 'A',
	    '\u1EA6': 'A',
	    '\u1EA4': 'A',
	    '\u1EAA': 'A',
	    '\u1EA8': 'A',
	    '\u00C3': 'A',
	    '\u0100': 'A',
	    '\u0102': 'A',
	    '\u1EB0': 'A',
	    '\u1EAE': 'A',
	    '\u1EB4': 'A',
	    '\u1EB2': 'A',
	    '\u0226': 'A',
	    '\u01E0': 'A',
	    '\u00C4': 'A',
	    '\u01DE': 'A',
	    '\u1EA2': 'A',
	    '\u00C5': 'A',
	    '\u01FA': 'A',
	    '\u01CD': 'A',
	    '\u0200': 'A',
	    '\u0202': 'A',
	    '\u1EA0': 'A',
	    '\u1EAC': 'A',
	    '\u1EB6': 'A',
	    '\u1E00': 'A',
	    '\u0104': 'A',
	    '\u023A': 'A',
	    '\u2C6F': 'A',
	    '\uA732': 'AA',
	    '\u00C6': 'AE',
	    '\u01FC': 'AE',
	    '\u01E2': 'AE',
	    '\uA734': 'AO',
	    '\uA736': 'AU',
	    '\uA738': 'AV',
	    '\uA73A': 'AV',
	    '\uA73C': 'AY',
	    '\u24B7': 'B',
	    '\uFF22': 'B',
	    '\u1E02': 'B',
	    '\u1E04': 'B',
	    '\u1E06': 'B',
	    '\u0243': 'B',
	    '\u0182': 'B',
	    '\u0181': 'B',
	    '\u24B8': 'C',
	    '\uFF23': 'C',
	    '\u0106': 'C',
	    '\u0108': 'C',
	    '\u010A': 'C',
	    '\u010C': 'C',
	    '\u00C7': 'C',
	    '\u1E08': 'C',
	    '\u0187': 'C',
	    '\u023B': 'C',
	    '\uA73E': 'C',
	    '\u24B9': 'D',
	    '\uFF24': 'D',
	    '\u1E0A': 'D',
	    '\u010E': 'D',
	    '\u1E0C': 'D',
	    '\u1E10': 'D',
	    '\u1E12': 'D',
	    '\u1E0E': 'D',
	    '\u0110': 'D',
	    '\u018B': 'D',
	    '\u018A': 'D',
	    '\u0189': 'D',
	    '\uA779': 'D',
	    '\u01F1': 'DZ',
	    '\u01C4': 'DZ',
	    '\u01F2': 'Dz',
	    '\u01C5': 'Dz',
	    '\u24BA': 'E',
	    '\uFF25': 'E',
	    '\u00C8': 'E',
	    '\u00C9': 'E',
	    '\u00CA': 'E',
	    '\u1EC0': 'E',
	    '\u1EBE': 'E',
	    '\u1EC4': 'E',
	    '\u1EC2': 'E',
	    '\u1EBC': 'E',
	    '\u0112': 'E',
	    '\u1E14': 'E',
	    '\u1E16': 'E',
	    '\u0114': 'E',
	    '\u0116': 'E',
	    '\u00CB': 'E',
	    '\u1EBA': 'E',
	    '\u011A': 'E',
	    '\u0204': 'E',
	    '\u0206': 'E',
	    '\u1EB8': 'E',
	    '\u1EC6': 'E',
	    '\u0228': 'E',
	    '\u1E1C': 'E',
	    '\u0118': 'E',
	    '\u1E18': 'E',
	    '\u1E1A': 'E',
	    '\u0190': 'E',
	    '\u018E': 'E',
	    '\u24BB': 'F',
	    '\uFF26': 'F',
	    '\u1E1E': 'F',
	    '\u0191': 'F',
	    '\uA77B': 'F',
	    '\u24BC': 'G',
	    '\uFF27': 'G',
	    '\u01F4': 'G',
	    '\u011C': 'G',
	    '\u1E20': 'G',
	    '\u011E': 'G',
	    '\u0120': 'G',
	    '\u01E6': 'G',
	    '\u0122': 'G',
	    '\u01E4': 'G',
	    '\u0193': 'G',
	    '\uA7A0': 'G',
	    '\uA77D': 'G',
	    '\uA77E': 'G',
	    '\u24BD': 'H',
	    '\uFF28': 'H',
	    '\u0124': 'H',
	    '\u1E22': 'H',
	    '\u1E26': 'H',
	    '\u021E': 'H',
	    '\u1E24': 'H',
	    '\u1E28': 'H',
	    '\u1E2A': 'H',
	    '\u0126': 'H',
	    '\u2C67': 'H',
	    '\u2C75': 'H',
	    '\uA78D': 'H',
	    '\u24BE': 'I',
	    '\uFF29': 'I',
	    '\u00CC': 'I',
	    '\u00CD': 'I',
	    '\u00CE': 'I',
	    '\u0128': 'I',
	    '\u012A': 'I',
	    '\u012C': 'I',
	    '\u0130': 'I',
	    '\u00CF': 'I',
	    '\u1E2E': 'I',
	    '\u1EC8': 'I',
	    '\u01CF': 'I',
	    '\u0208': 'I',
	    '\u020A': 'I',
	    '\u1ECA': 'I',
	    '\u012E': 'I',
	    '\u1E2C': 'I',
	    '\u0197': 'I',
	    '\u24BF': 'J',
	    '\uFF2A': 'J',
	    '\u0134': 'J',
	    '\u0248': 'J',
	    '\u24C0': 'K',
	    '\uFF2B': 'K',
	    '\u1E30': 'K',
	    '\u01E8': 'K',
	    '\u1E32': 'K',
	    '\u0136': 'K',
	    '\u1E34': 'K',
	    '\u0198': 'K',
	    '\u2C69': 'K',
	    '\uA740': 'K',
	    '\uA742': 'K',
	    '\uA744': 'K',
	    '\uA7A2': 'K',
	    '\u24C1': 'L',
	    '\uFF2C': 'L',
	    '\u013F': 'L',
	    '\u0139': 'L',
	    '\u013D': 'L',
	    '\u1E36': 'L',
	    '\u1E38': 'L',
	    '\u013B': 'L',
	    '\u1E3C': 'L',
	    '\u1E3A': 'L',
	    '\u0141': 'L',
	    '\u023D': 'L',
	    '\u2C62': 'L',
	    '\u2C60': 'L',
	    '\uA748': 'L',
	    '\uA746': 'L',
	    '\uA780': 'L',
	    '\u01C7': 'LJ',
	    '\u01C8': 'Lj',
	    '\u24C2': 'M',
	    '\uFF2D': 'M',
	    '\u1E3E': 'M',
	    '\u1E40': 'M',
	    '\u1E42': 'M',
	    '\u2C6E': 'M',
	    '\u019C': 'M',
	    '\u24C3': 'N',
	    '\uFF2E': 'N',
	    '\u01F8': 'N',
	    '\u0143': 'N',
	    '\u00D1': 'N',
	    '\u1E44': 'N',
	    '\u0147': 'N',
	    '\u1E46': 'N',
	    '\u0145': 'N',
	    '\u1E4A': 'N',
	    '\u1E48': 'N',
	    '\u0220': 'N',
	    '\u019D': 'N',
	    '\uA790': 'N',
	    '\uA7A4': 'N',
	    '\u01CA': 'NJ',
	    '\u01CB': 'Nj',
	    '\u24C4': 'O',
	    '\uFF2F': 'O',
	    '\u00D2': 'O',
	    '\u00D3': 'O',
	    '\u00D4': 'O',
	    '\u1ED2': 'O',
	    '\u1ED0': 'O',
	    '\u1ED6': 'O',
	    '\u1ED4': 'O',
	    '\u00D5': 'O',
	    '\u1E4C': 'O',
	    '\u022C': 'O',
	    '\u1E4E': 'O',
	    '\u014C': 'O',
	    '\u1E50': 'O',
	    '\u1E52': 'O',
	    '\u014E': 'O',
	    '\u022E': 'O',
	    '\u0230': 'O',
	    '\u00D6': 'O',
	    '\u022A': 'O',
	    '\u1ECE': 'O',
	    '\u0150': 'O',
	    '\u01D1': 'O',
	    '\u020C': 'O',
	    '\u020E': 'O',
	    '\u01A0': 'O',
	    '\u1EDC': 'O',
	    '\u1EDA': 'O',
	    '\u1EE0': 'O',
	    '\u1EDE': 'O',
	    '\u1EE2': 'O',
	    '\u1ECC': 'O',
	    '\u1ED8': 'O',
	    '\u01EA': 'O',
	    '\u01EC': 'O',
	    '\u00D8': 'O',
	    '\u01FE': 'O',
	    '\u0186': 'O',
	    '\u019F': 'O',
	    '\uA74A': 'O',
	    '\uA74C': 'O',
	    '\u01A2': 'OI',
	    '\uA74E': 'OO',
	    '\u0222': 'OU',
	    '\u24C5': 'P',
	    '\uFF30': 'P',
	    '\u1E54': 'P',
	    '\u1E56': 'P',
	    '\u01A4': 'P',
	    '\u2C63': 'P',
	    '\uA750': 'P',
	    '\uA752': 'P',
	    '\uA754': 'P',
	    '\u24C6': 'Q',
	    '\uFF31': 'Q',
	    '\uA756': 'Q',
	    '\uA758': 'Q',
	    '\u024A': 'Q',
	    '\u24C7': 'R',
	    '\uFF32': 'R',
	    '\u0154': 'R',
	    '\u1E58': 'R',
	    '\u0158': 'R',
	    '\u0210': 'R',
	    '\u0212': 'R',
	    '\u1E5A': 'R',
	    '\u1E5C': 'R',
	    '\u0156': 'R',
	    '\u1E5E': 'R',
	    '\u024C': 'R',
	    '\u2C64': 'R',
	    '\uA75A': 'R',
	    '\uA7A6': 'R',
	    '\uA782': 'R',
	    '\u24C8': 'S',
	    '\uFF33': 'S',
	    '\u1E9E': 'S',
	    '\u015A': 'S',
	    '\u1E64': 'S',
	    '\u015C': 'S',
	    '\u1E60': 'S',
	    '\u0160': 'S',
	    '\u1E66': 'S',
	    '\u1E62': 'S',
	    '\u1E68': 'S',
	    '\u0218': 'S',
	    '\u015E': 'S',
	    '\u2C7E': 'S',
	    '\uA7A8': 'S',
	    '\uA784': 'S',
	    '\u24C9': 'T',
	    '\uFF34': 'T',
	    '\u1E6A': 'T',
	    '\u0164': 'T',
	    '\u1E6C': 'T',
	    '\u021A': 'T',
	    '\u0162': 'T',
	    '\u1E70': 'T',
	    '\u1E6E': 'T',
	    '\u0166': 'T',
	    '\u01AC': 'T',
	    '\u01AE': 'T',
	    '\u023E': 'T',
	    '\uA786': 'T',
	    '\uA728': 'TZ',
	    '\u24CA': 'U',
	    '\uFF35': 'U',
	    '\u00D9': 'U',
	    '\u00DA': 'U',
	    '\u00DB': 'U',
	    '\u0168': 'U',
	    '\u1E78': 'U',
	    '\u016A': 'U',
	    '\u1E7A': 'U',
	    '\u016C': 'U',
	    '\u00DC': 'U',
	    '\u01DB': 'U',
	    '\u01D7': 'U',
	    '\u01D5': 'U',
	    '\u01D9': 'U',
	    '\u1EE6': 'U',
	    '\u016E': 'U',
	    '\u0170': 'U',
	    '\u01D3': 'U',
	    '\u0214': 'U',
	    '\u0216': 'U',
	    '\u01AF': 'U',
	    '\u1EEA': 'U',
	    '\u1EE8': 'U',
	    '\u1EEE': 'U',
	    '\u1EEC': 'U',
	    '\u1EF0': 'U',
	    '\u1EE4': 'U',
	    '\u1E72': 'U',
	    '\u0172': 'U',
	    '\u1E76': 'U',
	    '\u1E74': 'U',
	    '\u0244': 'U',
	    '\u24CB': 'V',
	    '\uFF36': 'V',
	    '\u1E7C': 'V',
	    '\u1E7E': 'V',
	    '\u01B2': 'V',
	    '\uA75E': 'V',
	    '\u0245': 'V',
	    '\uA760': 'VY',
	    '\u24CC': 'W',
	    '\uFF37': 'W',
	    '\u1E80': 'W',
	    '\u1E82': 'W',
	    '\u0174': 'W',
	    '\u1E86': 'W',
	    '\u1E84': 'W',
	    '\u1E88': 'W',
	    '\u2C72': 'W',
	    '\u24CD': 'X',
	    '\uFF38': 'X',
	    '\u1E8A': 'X',
	    '\u1E8C': 'X',
	    '\u24CE': 'Y',
	    '\uFF39': 'Y',
	    '\u1EF2': 'Y',
	    '\u00DD': 'Y',
	    '\u0176': 'Y',
	    '\u1EF8': 'Y',
	    '\u0232': 'Y',
	    '\u1E8E': 'Y',
	    '\u0178': 'Y',
	    '\u1EF6': 'Y',
	    '\u1EF4': 'Y',
	    '\u01B3': 'Y',
	    '\u024E': 'Y',
	    '\u1EFE': 'Y',
	    '\u24CF': 'Z',
	    '\uFF3A': 'Z',
	    '\u0179': 'Z',
	    '\u1E90': 'Z',
	    '\u017B': 'Z',
	    '\u017D': 'Z',
	    '\u1E92': 'Z',
	    '\u1E94': 'Z',
	    '\u01B5': 'Z',
	    '\u0224': 'Z',
	    '\u2C7F': 'Z',
	    '\u2C6B': 'Z',
	    '\uA762': 'Z',
	    '\u24D0': 'a',
	    '\uFF41': 'a',
	    '\u1E9A': 'a',
	    '\u00E0': 'a',
	    '\u00E1': 'a',
	    '\u00E2': 'a',
	    '\u1EA7': 'a',
	    '\u1EA5': 'a',
	    '\u1EAB': 'a',
	    '\u1EA9': 'a',
	    '\u00E3': 'a',
	    '\u0101': 'a',
	    '\u0103': 'a',
	    '\u1EB1': 'a',
	    '\u1EAF': 'a',
	    '\u1EB5': 'a',
	    '\u1EB3': 'a',
	    '\u0227': 'a',
	    '\u01E1': 'a',
	    '\u00E4': 'a',
	    '\u01DF': 'a',
	    '\u1EA3': 'a',
	    '\u00E5': 'a',
	    '\u01FB': 'a',
	    '\u01CE': 'a',
	    '\u0201': 'a',
	    '\u0203': 'a',
	    '\u1EA1': 'a',
	    '\u1EAD': 'a',
	    '\u1EB7': 'a',
	    '\u1E01': 'a',
	    '\u0105': 'a',
	    '\u2C65': 'a',
	    '\u0250': 'a',
	    '\uA733': 'aa',
	    '\u00E6': 'ae',
	    '\u01FD': 'ae',
	    '\u01E3': 'ae',
	    '\uA735': 'ao',
	    '\uA737': 'au',
	    '\uA739': 'av',
	    '\uA73B': 'av',
	    '\uA73D': 'ay',
	    '\u24D1': 'b',
	    '\uFF42': 'b',
	    '\u1E03': 'b',
	    '\u1E05': 'b',
	    '\u1E07': 'b',
	    '\u0180': 'b',
	    '\u0183': 'b',
	    '\u0253': 'b',
	    '\u24D2': 'c',
	    '\uFF43': 'c',
	    '\u0107': 'c',
	    '\u0109': 'c',
	    '\u010B': 'c',
	    '\u010D': 'c',
	    '\u00E7': 'c',
	    '\u1E09': 'c',
	    '\u0188': 'c',
	    '\u023C': 'c',
	    '\uA73F': 'c',
	    '\u2184': 'c',
	    '\u24D3': 'd',
	    '\uFF44': 'd',
	    '\u1E0B': 'd',
	    '\u010F': 'd',
	    '\u1E0D': 'd',
	    '\u1E11': 'd',
	    '\u1E13': 'd',
	    '\u1E0F': 'd',
	    '\u0111': 'd',
	    '\u018C': 'd',
	    '\u0256': 'd',
	    '\u0257': 'd',
	    '\uA77A': 'd',
	    '\u01F3': 'dz',
	    '\u01C6': 'dz',
	    '\u24D4': 'e',
	    '\uFF45': 'e',
	    '\u00E8': 'e',
	    '\u00E9': 'e',
	    '\u00EA': 'e',
	    '\u1EC1': 'e',
	    '\u1EBF': 'e',
	    '\u1EC5': 'e',
	    '\u1EC3': 'e',
	    '\u1EBD': 'e',
	    '\u0113': 'e',
	    '\u1E15': 'e',
	    '\u1E17': 'e',
	    '\u0115': 'e',
	    '\u0117': 'e',
	    '\u00EB': 'e',
	    '\u1EBB': 'e',
	    '\u011B': 'e',
	    '\u0205': 'e',
	    '\u0207': 'e',
	    '\u1EB9': 'e',
	    '\u1EC7': 'e',
	    '\u0229': 'e',
	    '\u1E1D': 'e',
	    '\u0119': 'e',
	    '\u1E19': 'e',
	    '\u1E1B': 'e',
	    '\u0247': 'e',
	    '\u025B': 'e',
	    '\u01DD': 'e',
	    '\u24D5': 'f',
	    '\uFF46': 'f',
	    '\u1E1F': 'f',
	    '\u0192': 'f',
	    '\uA77C': 'f',
	    '\u24D6': 'g',
	    '\uFF47': 'g',
	    '\u01F5': 'g',
	    '\u011D': 'g',
	    '\u1E21': 'g',
	    '\u011F': 'g',
	    '\u0121': 'g',
	    '\u01E7': 'g',
	    '\u0123': 'g',
	    '\u01E5': 'g',
	    '\u0260': 'g',
	    '\uA7A1': 'g',
	    '\u1D79': 'g',
	    '\uA77F': 'g',
	    '\u24D7': 'h',
	    '\uFF48': 'h',
	    '\u0125': 'h',
	    '\u1E23': 'h',
	    '\u1E27': 'h',
	    '\u021F': 'h',
	    '\u1E25': 'h',
	    '\u1E29': 'h',
	    '\u1E2B': 'h',
	    '\u1E96': 'h',
	    '\u0127': 'h',
	    '\u2C68': 'h',
	    '\u2C76': 'h',
	    '\u0265': 'h',
	    '\u0195': 'hv',
	    '\u24D8': 'i',
	    '\uFF49': 'i',
	    '\u00EC': 'i',
	    '\u00ED': 'i',
	    '\u00EE': 'i',
	    '\u0129': 'i',
	    '\u012B': 'i',
	    '\u012D': 'i',
	    '\u00EF': 'i',
	    '\u1E2F': 'i',
	    '\u1EC9': 'i',
	    '\u01D0': 'i',
	    '\u0209': 'i',
	    '\u020B': 'i',
	    '\u1ECB': 'i',
	    '\u012F': 'i',
	    '\u1E2D': 'i',
	    '\u0268': 'i',
	    '\u0131': 'i',
	    '\u24D9': 'j',
	    '\uFF4A': 'j',
	    '\u0135': 'j',
	    '\u01F0': 'j',
	    '\u0249': 'j',
	    '\u24DA': 'k',
	    '\uFF4B': 'k',
	    '\u1E31': 'k',
	    '\u01E9': 'k',
	    '\u1E33': 'k',
	    '\u0137': 'k',
	    '\u1E35': 'k',
	    '\u0199': 'k',
	    '\u2C6A': 'k',
	    '\uA741': 'k',
	    '\uA743': 'k',
	    '\uA745': 'k',
	    '\uA7A3': 'k',
	    '\u24DB': 'l',
	    '\uFF4C': 'l',
	    '\u0140': 'l',
	    '\u013A': 'l',
	    '\u013E': 'l',
	    '\u1E37': 'l',
	    '\u1E39': 'l',
	    '\u013C': 'l',
	    '\u1E3D': 'l',
	    '\u1E3B': 'l',
	    '\u017F': 'l',
	    '\u0142': 'l',
	    '\u019A': 'l',
	    '\u026B': 'l',
	    '\u2C61': 'l',
	    '\uA749': 'l',
	    '\uA781': 'l',
	    '\uA747': 'l',
	    '\u01C9': 'lj',
	    '\u24DC': 'm',
	    '\uFF4D': 'm',
	    '\u1E3F': 'm',
	    '\u1E41': 'm',
	    '\u1E43': 'm',
	    '\u0271': 'm',
	    '\u026F': 'm',
	    '\u24DD': 'n',
	    '\uFF4E': 'n',
	    '\u01F9': 'n',
	    '\u0144': 'n',
	    '\u00F1': 'n',
	    '\u1E45': 'n',
	    '\u0148': 'n',
	    '\u1E47': 'n',
	    '\u0146': 'n',
	    '\u1E4B': 'n',
	    '\u1E49': 'n',
	    '\u019E': 'n',
	    '\u0272': 'n',
	    '\u0149': 'n',
	    '\uA791': 'n',
	    '\uA7A5': 'n',
	    '\u01CC': 'nj',
	    '\u24DE': 'o',
	    '\uFF4F': 'o',
	    '\u00F2': 'o',
	    '\u00F3': 'o',
	    '\u00F4': 'o',
	    '\u1ED3': 'o',
	    '\u1ED1': 'o',
	    '\u1ED7': 'o',
	    '\u1ED5': 'o',
	    '\u00F5': 'o',
	    '\u1E4D': 'o',
	    '\u022D': 'o',
	    '\u1E4F': 'o',
	    '\u014D': 'o',
	    '\u1E51': 'o',
	    '\u1E53': 'o',
	    '\u014F': 'o',
	    '\u022F': 'o',
	    '\u0231': 'o',
	    '\u00F6': 'o',
	    '\u022B': 'o',
	    '\u1ECF': 'o',
	    '\u0151': 'o',
	    '\u01D2': 'o',
	    '\u020D': 'o',
	    '\u020F': 'o',
	    '\u01A1': 'o',
	    '\u1EDD': 'o',
	    '\u1EDB': 'o',
	    '\u1EE1': 'o',
	    '\u1EDF': 'o',
	    '\u1EE3': 'o',
	    '\u1ECD': 'o',
	    '\u1ED9': 'o',
	    '\u01EB': 'o',
	    '\u01ED': 'o',
	    '\u00F8': 'o',
	    '\u01FF': 'o',
	    '\u0254': 'o',
	    '\uA74B': 'o',
	    '\uA74D': 'o',
	    '\u0275': 'o',
	    '\u01A3': 'oi',
	    '\u0223': 'ou',
	    '\uA74F': 'oo',
	    '\u24DF': 'p',
	    '\uFF50': 'p',
	    '\u1E55': 'p',
	    '\u1E57': 'p',
	    '\u01A5': 'p',
	    '\u1D7D': 'p',
	    '\uA751': 'p',
	    '\uA753': 'p',
	    '\uA755': 'p',
	    '\u24E0': 'q',
	    '\uFF51': 'q',
	    '\u024B': 'q',
	    '\uA757': 'q',
	    '\uA759': 'q',
	    '\u24E1': 'r',
	    '\uFF52': 'r',
	    '\u0155': 'r',
	    '\u1E59': 'r',
	    '\u0159': 'r',
	    '\u0211': 'r',
	    '\u0213': 'r',
	    '\u1E5B': 'r',
	    '\u1E5D': 'r',
	    '\u0157': 'r',
	    '\u1E5F': 'r',
	    '\u024D': 'r',
	    '\u027D': 'r',
	    '\uA75B': 'r',
	    '\uA7A7': 'r',
	    '\uA783': 'r',
	    '\u24E2': 's',
	    '\uFF53': 's',
	    '\u00DF': 's',
	    '\u015B': 's',
	    '\u1E65': 's',
	    '\u015D': 's',
	    '\u1E61': 's',
	    '\u0161': 's',
	    '\u1E67': 's',
	    '\u1E63': 's',
	    '\u1E69': 's',
	    '\u0219': 's',
	    '\u015F': 's',
	    '\u023F': 's',
	    '\uA7A9': 's',
	    '\uA785': 's',
	    '\u1E9B': 's',
	    '\u24E3': 't',
	    '\uFF54': 't',
	    '\u1E6B': 't',
	    '\u1E97': 't',
	    '\u0165': 't',
	    '\u1E6D': 't',
	    '\u021B': 't',
	    '\u0163': 't',
	    '\u1E71': 't',
	    '\u1E6F': 't',
	    '\u0167': 't',
	    '\u01AD': 't',
	    '\u0288': 't',
	    '\u2C66': 't',
	    '\uA787': 't',
	    '\uA729': 'tz',
	    '\u24E4': 'u',
	    '\uFF55': 'u',
	    '\u00F9': 'u',
	    '\u00FA': 'u',
	    '\u00FB': 'u',
	    '\u0169': 'u',
	    '\u1E79': 'u',
	    '\u016B': 'u',
	    '\u1E7B': 'u',
	    '\u016D': 'u',
	    '\u00FC': 'u',
	    '\u01DC': 'u',
	    '\u01D8': 'u',
	    '\u01D6': 'u',
	    '\u01DA': 'u',
	    '\u1EE7': 'u',
	    '\u016F': 'u',
	    '\u0171': 'u',
	    '\u01D4': 'u',
	    '\u0215': 'u',
	    '\u0217': 'u',
	    '\u01B0': 'u',
	    '\u1EEB': 'u',
	    '\u1EE9': 'u',
	    '\u1EEF': 'u',
	    '\u1EED': 'u',
	    '\u1EF1': 'u',
	    '\u1EE5': 'u',
	    '\u1E73': 'u',
	    '\u0173': 'u',
	    '\u1E77': 'u',
	    '\u1E75': 'u',
	    '\u0289': 'u',
	    '\u24E5': 'v',
	    '\uFF56': 'v',
	    '\u1E7D': 'v',
	    '\u1E7F': 'v',
	    '\u028B': 'v',
	    '\uA75F': 'v',
	    '\u028C': 'v',
	    '\uA761': 'vy',
	    '\u24E6': 'w',
	    '\uFF57': 'w',
	    '\u1E81': 'w',
	    '\u1E83': 'w',
	    '\u0175': 'w',
	    '\u1E87': 'w',
	    '\u1E85': 'w',
	    '\u1E98': 'w',
	    '\u1E89': 'w',
	    '\u2C73': 'w',
	    '\u24E7': 'x',
	    '\uFF58': 'x',
	    '\u1E8B': 'x',
	    '\u1E8D': 'x',
	    '\u24E8': 'y',
	    '\uFF59': 'y',
	    '\u1EF3': 'y',
	    '\u00FD': 'y',
	    '\u0177': 'y',
	    '\u1EF9': 'y',
	    '\u0233': 'y',
	    '\u1E8F': 'y',
	    '\u00FF': 'y',
	    '\u1EF7': 'y',
	    '\u1E99': 'y',
	    '\u1EF5': 'y',
	    '\u01B4': 'y',
	    '\u024F': 'y',
	    '\u1EFF': 'y',
	    '\u24E9': 'z',
	    '\uFF5A': 'z',
	    '\u017A': 'z',
	    '\u1E91': 'z',
	    '\u017C': 'z',
	    '\u017E': 'z',
	    '\u1E93': 'z',
	    '\u1E95': 'z',
	    '\u01B6': 'z',
	    '\u0225': 'z',
	    '\u0240': 'z',
	    '\u2C6C': 'z',
	    '\uA763': 'z',
	    '\u0386': '\u0391',
	    '\u0388': '\u0395',
	    '\u0389': '\u0397',
	    '\u038A': '\u0399',
	    '\u03AA': '\u0399',
	    '\u038C': '\u039F',
	    '\u038E': '\u03A5',
	    '\u03AB': '\u03A5',
	    '\u038F': '\u03A9',
	    '\u03AC': '\u03B1',
	    '\u03AD': '\u03B5',
	    '\u03AE': '\u03B7',
	    '\u03AF': '\u03B9',
	    '\u03CA': '\u03B9',
	    '\u0390': '\u03B9',
	    '\u03CC': '\u03BF',
	    '\u03CD': '\u03C5',
	    '\u03CB': '\u03C5',
	    '\u03B0': '\u03C5',
	    '\u03C9': '\u03C9',
	    '\u03C2': '\u03C3'
	  };
	
	  return diacritics;
	});
	
	S2.define('select2/data/base',[
	  '../utils'
	], function (Utils) {
	  function BaseAdapter ($element, options) {
	    BaseAdapter.__super__.constructor.call(this);
	  }
	
	  Utils.Extend(BaseAdapter, Utils.Observable);
	
	  BaseAdapter.prototype.current = function (callback) {
	    throw new Error('The `current` method must be defined in child classes.');
	  };
	
	  BaseAdapter.prototype.query = function (params, callback) {
	    throw new Error('The `query` method must be defined in child classes.');
	  };
	
	  BaseAdapter.prototype.bind = function (container, $container) {
	    // Can be implemented in subclasses
	  };
	
	  BaseAdapter.prototype.destroy = function () {
	    // Can be implemented in subclasses
	  };
	
	  BaseAdapter.prototype.generateResultId = function (container, data) {
	    var id = container.id + '-result-';
	
	    id += Utils.generateChars(4);
	
	    if (data.id != null) {
	      id += '-' + data.id.toString();
	    } else {
	      id += '-' + Utils.generateChars(4);
	    }
	    return id;
	  };
	
	  return BaseAdapter;
	});
	
	S2.define('select2/data/select',[
	  './base',
	  '../utils',
	  'jquery'
	], function (BaseAdapter, Utils, $) {
	  function SelectAdapter ($element, options) {
	    this.$element = $element;
	    this.options = options;
	
	    SelectAdapter.__super__.constructor.call(this);
	  }
	
	  Utils.Extend(SelectAdapter, BaseAdapter);
	
	  SelectAdapter.prototype.current = function (callback) {
	    var data = [];
	    var self = this;
	
	    this.$element.find(':selected').each(function () {
	      var $option = $(this);
	
	      var option = self.item($option);
	
	      data.push(option);
	    });
	
	    callback(data);
	  };
	
	  SelectAdapter.prototype.select = function (data) {
	    var self = this;
	
	    data.selected = true;
	
	    // If data.element is a DOM node, use it instead
	    if ($(data.element).is('option')) {
	      data.element.selected = true;
	
	      this.$element.trigger('change');
	
	      return;
	    }
	
	    if (this.$element.prop('multiple')) {
	      this.current(function (currentData) {
	        var val = [];
	
	        data = [data];
	        data.push.apply(data, currentData);
	
	        for (var d = 0; d < data.length; d++) {
	          var id = data[d].id;
	
	          if ($.inArray(id, val) === -1) {
	            val.push(id);
	          }
	        }
	
	        self.$element.val(val);
	        self.$element.trigger('change');
	      });
	    } else {
	      var val = data.id;
	
	      this.$element.val(val);
	      this.$element.trigger('change');
	    }
	  };
	
	  SelectAdapter.prototype.unselect = function (data) {
	    var self = this;
	
	    if (!this.$element.prop('multiple')) {
	      return;
	    }
	
	    data.selected = false;
	
	    if ($(data.element).is('option')) {
	      data.element.selected = false;
	
	      this.$element.trigger('change');
	
	      return;
	    }
	
	    this.current(function (currentData) {
	      var val = [];
	
	      for (var d = 0; d < currentData.length; d++) {
	        var id = currentData[d].id;
	
	        if (id !== data.id && $.inArray(id, val) === -1) {
	          val.push(id);
	        }
	      }
	
	      self.$element.val(val);
	
	      self.$element.trigger('change');
	    });
	  };
	
	  SelectAdapter.prototype.bind = function (container, $container) {
	    var self = this;
	
	    this.container = container;
	
	    container.on('select', function (params) {
	      self.select(params.data);
	    });
	
	    container.on('unselect', function (params) {
	      self.unselect(params.data);
	    });
	  };
	
	  SelectAdapter.prototype.destroy = function () {
	    // Remove anything added to child elements
	    this.$element.find('*').each(function () {
	      // Remove any custom data set by Select2
	      $.removeData(this, 'data');
	    });
	  };
	
	  SelectAdapter.prototype.query = function (params, callback) {
	    var data = [];
	    var self = this;
	
	    var $options = this.$element.children();
	
	    $options.each(function () {
	      var $option = $(this);
	
	      if (!$option.is('option') && !$option.is('optgroup')) {
	        return;
	      }
	
	      var option = self.item($option);
	
	      var matches = self.matches(params, option);
	
	      if (matches !== null) {
	        data.push(matches);
	      }
	    });
	
	    callback({
	      results: data
	    });
	  };
	
	  SelectAdapter.prototype.addOptions = function ($options) {
	    Utils.appendMany(this.$element, $options);
	  };
	
	  SelectAdapter.prototype.option = function (data) {
	    var option;
	
	    if (data.children) {
	      option = document.createElement('optgroup');
	      option.label = data.text;
	    } else {
	      option = document.createElement('option');
	
	      if (option.textContent !== undefined) {
	        option.textContent = data.text;
	      } else {
	        option.innerText = data.text;
	      }
	    }
	
	    if (data.id) {
	      option.value = data.id;
	    }
	
	    if (data.disabled) {
	      option.disabled = true;
	    }
	
	    if (data.selected) {
	      option.selected = true;
	    }
	
	    if (data.title) {
	      option.title = data.title;
	    }
	
	    var $option = $(option);
	
	    var normalizedData = this._normalizeItem(data);
	    normalizedData.element = option;
	
	    // Override the option's data with the combined data
	    $.data(option, 'data', normalizedData);
	
	    return $option;
	  };
	
	  SelectAdapter.prototype.item = function ($option) {
	    var data = {};
	
	    data = $.data($option[0], 'data');
	
	    if (data != null) {
	      return data;
	    }
	
	    if ($option.is('option')) {
	      data = {
	        id: $option.val(),
	        text: $option.text(),
	        disabled: $option.prop('disabled'),
	        selected: $option.prop('selected'),
	        title: $option.prop('title')
	      };
	    } else if ($option.is('optgroup')) {
	      data = {
	        text: $option.prop('label'),
	        children: [],
	        title: $option.prop('title')
	      };
	
	      var $children = $option.children('option');
	      var children = [];
	
	      for (var c = 0; c < $children.length; c++) {
	        var $child = $($children[c]);
	
	        var child = this.item($child);
	
	        children.push(child);
	      }
	
	      data.children = children;
	    }
	
	    data = this._normalizeItem(data);
	    data.element = $option[0];
	
	    $.data($option[0], 'data', data);
	
	    return data;
	  };
	
	  SelectAdapter.prototype._normalizeItem = function (item) {
	    if (!$.isPlainObject(item)) {
	      item = {
	        id: item,
	        text: item
	      };
	    }
	
	    item = $.extend({}, {
	      text: ''
	    }, item);
	
	    var defaults = {
	      selected: false,
	      disabled: false
	    };
	
	    if (item.id != null) {
	      item.id = item.id.toString();
	    }
	
	    if (item.text != null) {
	      item.text = item.text.toString();
	    }
	
	    if (item._resultId == null && item.id && this.container != null) {
	      item._resultId = this.generateResultId(this.container, item);
	    }
	
	    return $.extend({}, defaults, item);
	  };
	
	  SelectAdapter.prototype.matches = function (params, data) {
	    var matcher = this.options.get('matcher');
	
	    return matcher(params, data);
	  };
	
	  return SelectAdapter;
	});
	
	S2.define('select2/data/array',[
	  './select',
	  '../utils',
	  'jquery'
	], function (SelectAdapter, Utils, $) {
	  function ArrayAdapter ($element, options) {
	    var data = options.get('data') || [];
	
	    ArrayAdapter.__super__.constructor.call(this, $element, options);
	
	    this.addOptions(this.convertToOptions(data));
	  }
	
	  Utils.Extend(ArrayAdapter, SelectAdapter);
	
	  ArrayAdapter.prototype.select = function (data) {
	    var $option = this.$element.find('option').filter(function (i, elm) {
	      return elm.value == data.id.toString();
	    });
	
	    if ($option.length === 0) {
	      $option = this.option(data);
	
	      this.addOptions($option);
	    }
	
	    ArrayAdapter.__super__.select.call(this, data);
	  };
	
	  ArrayAdapter.prototype.convertToOptions = function (data) {
	    var self = this;
	
	    var $existing = this.$element.find('option');
	    var existingIds = $existing.map(function () {
	      return self.item($(this)).id;
	    }).get();
	
	    var $options = [];
	
	    // Filter out all items except for the one passed in the argument
	    function onlyItem (item) {
	      return function () {
	        return $(this).val() == item.id;
	      };
	    }
	
	    for (var d = 0; d < data.length; d++) {
	      var item = this._normalizeItem(data[d]);
	
	      // Skip items which were pre-loaded, only merge the data
	      if ($.inArray(item.id, existingIds) >= 0) {
	        var $existingOption = $existing.filter(onlyItem(item));
	
	        var existingData = this.item($existingOption);
	        var newData = $.extend(true, {}, item, existingData);
	
	        var $newOption = this.option(newData);
	
	        $existingOption.replaceWith($newOption);
	
	        continue;
	      }
	
	      var $option = this.option(item);
	
	      if (item.children) {
	        var $children = this.convertToOptions(item.children);
	
	        Utils.appendMany($option, $children);
	      }
	
	      $options.push($option);
	    }
	
	    return $options;
	  };
	
	  return ArrayAdapter;
	});
	
	S2.define('select2/data/ajax',[
	  './array',
	  '../utils',
	  'jquery'
	], function (ArrayAdapter, Utils, $) {
	  function AjaxAdapter ($element, options) {
	    this.ajaxOptions = this._applyDefaults(options.get('ajax'));
	
	    if (this.ajaxOptions.processResults != null) {
	      this.processResults = this.ajaxOptions.processResults;
	    }
	
	    AjaxAdapter.__super__.constructor.call(this, $element, options);
	  }
	
	  Utils.Extend(AjaxAdapter, ArrayAdapter);
	
	  AjaxAdapter.prototype._applyDefaults = function (options) {
	    var defaults = {
	      data: function (params) {
	        return $.extend({}, params, {
	          q: params.term
	        });
	      },
	      transport: function (params, success, failure) {
	        var $request = $.ajax(params);
	
	        $request.then(success);
	        $request.fail(failure);
	
	        return $request;
	      }
	    };
	
	    return $.extend({}, defaults, options, true);
	  };
	
	  AjaxAdapter.prototype.processResults = function (results) {
	    return results;
	  };
	
	  AjaxAdapter.prototype.query = function (params, callback) {
	    var matches = [];
	    var self = this;
	
	    if (this._request != null) {
	      // JSONP requests cannot always be aborted
	      if ($.isFunction(this._request.abort)) {
	        this._request.abort();
	      }
	
	      this._request = null;
	    }
	
	    var options = $.extend({
	      type: 'GET'
	    }, this.ajaxOptions);
	
	    if (typeof options.url === 'function') {
	      options.url = options.url.call(this.$element, params);
	    }
	
	    if (typeof options.data === 'function') {
	      options.data = options.data.call(this.$element, params);
	    }
	
	    function request () {
	      var $request = options.transport(options, function (data) {
	        var results = self.processResults(data, params);
	
	        if (self.options.get('debug') && window.console && console.error) {
	          // Check to make sure that the response included a `results` key.
	          if (!results || !results.results || !$.isArray(results.results)) {
	            console.error(
	              'Select2: The AJAX results did not return an array in the ' +
	              '`results` key of the response.'
	            );
	          }
	        }
	
	        callback(results);
	      }, function () {
	        // Attempt to detect if a request was aborted
	        // Only works if the transport exposes a status property
	        if ($request.status && $request.status === '0') {
	          return;
	        }
	
	        self.trigger('results:message', {
	          message: 'errorLoading'
	        });
	      });
	
	      self._request = $request;
	    }
	
	    if (this.ajaxOptions.delay && params.term != null) {
	      if (this._queryTimeout) {
	        window.clearTimeout(this._queryTimeout);
	      }
	
	      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
	    } else {
	      request();
	    }
	  };
	
	  return AjaxAdapter;
	});
	
	S2.define('select2/data/tags',[
	  'jquery'
	], function ($) {
	  function Tags (decorated, $element, options) {
	    var tags = options.get('tags');
	
	    var createTag = options.get('createTag');
	
	    if (createTag !== undefined) {
	      this.createTag = createTag;
	    }
	
	    var insertTag = options.get('insertTag');
	
	    if (insertTag !== undefined) {
	        this.insertTag = insertTag;
	    }
	
	    decorated.call(this, $element, options);
	
	    if ($.isArray(tags)) {
	      for (var t = 0; t < tags.length; t++) {
	        var tag = tags[t];
	        var item = this._normalizeItem(tag);
	
	        var $option = this.option(item);
	
	        this.$element.append($option);
	      }
	    }
	  }
	
	  Tags.prototype.query = function (decorated, params, callback) {
	    var self = this;
	
	    this._removeOldTags();
	
	    if (params.term == null || params.page != null) {
	      decorated.call(this, params, callback);
	      return;
	    }
	
	    function wrapper (obj, child) {
	      var data = obj.results;
	
	      for (var i = 0; i < data.length; i++) {
	        var option = data[i];
	
	        var checkChildren = (
	          option.children != null &&
	          !wrapper({
	            results: option.children
	          }, true)
	        );
	
	        var checkText = option.text === params.term;
	
	        if (checkText || checkChildren) {
	          if (child) {
	            return false;
	          }
	
	          obj.data = data;
	          callback(obj);
	
	          return;
	        }
	      }
	
	      if (child) {
	        return true;
	      }
	
	      var tag = self.createTag(params);
	
	      if (tag != null) {
	        var $option = self.option(tag);
	        $option.attr('data-select2-tag', true);
	
	        self.addOptions([$option]);
	
	        self.insertTag(data, tag);
	      }
	
	      obj.results = data;
	
	      callback(obj);
	    }
	
	    decorated.call(this, params, wrapper);
	  };
	
	  Tags.prototype.createTag = function (decorated, params) {
	    var term = $.trim(params.term);
	
	    if (term === '') {
	      return null;
	    }
	
	    return {
	      id: term,
	      text: term
	    };
	  };
	
	  Tags.prototype.insertTag = function (_, data, tag) {
	    data.unshift(tag);
	  };
	
	  Tags.prototype._removeOldTags = function (_) {
	    var tag = this._lastTag;
	
	    var $options = this.$element.find('option[data-select2-tag]');
	
	    $options.each(function () {
	      if (this.selected) {
	        return;
	      }
	
	      $(this).remove();
	    });
	  };
	
	  return Tags;
	});
	
	S2.define('select2/data/tokenizer',[
	  'jquery'
	], function ($) {
	  function Tokenizer (decorated, $element, options) {
	    var tokenizer = options.get('tokenizer');
	
	    if (tokenizer !== undefined) {
	      this.tokenizer = tokenizer;
	    }
	
	    decorated.call(this, $element, options);
	  }
	
	  Tokenizer.prototype.bind = function (decorated, container, $container) {
	    decorated.call(this, container, $container);
	
	    this.$search =  container.dropdown.$search || container.selection.$search ||
	      $container.find('.select2-search__field');
	  };
	
	  Tokenizer.prototype.query = function (decorated, params, callback) {
	    var self = this;
	
	    function createAndSelect (data) {
	      // Normalize the data object so we can use it for checks
	      var item = self._normalizeItem(data);
	
	      // Check if the data object already exists as a tag
	      // Select it if it doesn't
	      var $existingOptions = self.$element.find('option').filter(function () {
	        return $(this).val() === item.id;
	      });
	
	      // If an existing option wasn't found for it, create the option
	      if (!$existingOptions.length) {
	        var $option = self.option(item);
	        $option.attr('data-select2-tag', true);
	
	        self._removeOldTags();
	        self.addOptions([$option]);
	      }
	
	      // Select the item, now that we know there is an option for it
	      select(item);
	    }
	
	    function select (data) {
	      self.trigger('select', {
	        data: data
	      });
	    }
	
	    params.term = params.term || '';
	
	    var tokenData = this.tokenizer(params, this.options, createAndSelect);
	
	    if (tokenData.term !== params.term) {
	      // Replace the search term if we have the search box
	      if (this.$search.length) {
	        this.$search.val(tokenData.term);
	        this.$search.focus();
	      }
	
	      params.term = tokenData.term;
	    }
	
	    decorated.call(this, params, callback);
	  };
	
	  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
	    var separators = options.get('tokenSeparators') || [];
	    var term = params.term;
	    var i = 0;
	
	    var createTag = this.createTag || function (params) {
	      return {
	        id: params.term,
	        text: params.term
	      };
	    };
	
	    while (i < term.length) {
	      var termChar = term[i];
	
	      if ($.inArray(termChar, separators) === -1) {
	        i++;
	
	        continue;
	      }
	
	      var part = term.substr(0, i);
	      var partParams = $.extend({}, params, {
	        term: part
	      });
	
	      var data = createTag(partParams);
	
	      if (data == null) {
	        i++;
	        continue;
	      }
	
	      callback(data);
	
	      // Reset the term to not include the tokenized portion
	      term = term.substr(i + 1) || '';
	      i = 0;
	    }
	
	    return {
	      term: term
	    };
	  };
	
	  return Tokenizer;
	});
	
	S2.define('select2/data/minimumInputLength',[
	
	], function () {
	  function MinimumInputLength (decorated, $e, options) {
	    this.minimumInputLength = options.get('minimumInputLength');
	
	    decorated.call(this, $e, options);
	  }
	
	  MinimumInputLength.prototype.query = function (decorated, params, callback) {
	    params.term = params.term || '';
	
	    if (params.term.length < this.minimumInputLength) {
	      this.trigger('results:message', {
	        message: 'inputTooShort',
	        args: {
	          minimum: this.minimumInputLength,
	          input: params.term,
	          params: params
	        }
	      });
	
	      return;
	    }
	
	    decorated.call(this, params, callback);
	  };
	
	  return MinimumInputLength;
	});
	
	S2.define('select2/data/maximumInputLength',[
	
	], function () {
	  function MaximumInputLength (decorated, $e, options) {
	    this.maximumInputLength = options.get('maximumInputLength');
	
	    decorated.call(this, $e, options);
	  }
	
	  MaximumInputLength.prototype.query = function (decorated, params, callback) {
	    params.term = params.term || '';
	
	    if (this.maximumInputLength > 0 &&
	        params.term.length > this.maximumInputLength) {
	      this.trigger('results:message', {
	        message: 'inputTooLong',
	        args: {
	          maximum: this.maximumInputLength,
	          input: params.term,
	          params: params
	        }
	      });
	
	      return;
	    }
	
	    decorated.call(this, params, callback);
	  };
	
	  return MaximumInputLength;
	});
	
	S2.define('select2/data/maximumSelectionLength',[
	
	], function (){
	  function MaximumSelectionLength (decorated, $e, options) {
	    this.maximumSelectionLength = options.get('maximumSelectionLength');
	
	    decorated.call(this, $e, options);
	  }
	
	  MaximumSelectionLength.prototype.query =
	    function (decorated, params, callback) {
	      var self = this;
	
	      this.current(function (currentData) {
	        var count = currentData != null ? currentData.length : 0;
	        if (self.maximumSelectionLength > 0 &&
	          count >= self.maximumSelectionLength) {
	          self.trigger('results:message', {
	            message: 'maximumSelected',
	            args: {
	              maximum: self.maximumSelectionLength
	            }
	          });
	          return;
	        }
	        decorated.call(self, params, callback);
	      });
	  };
	
	  return MaximumSelectionLength;
	});
	
	S2.define('select2/dropdown',[
	  'jquery',
	  './utils'
	], function ($, Utils) {
	  function Dropdown ($element, options) {
	    this.$element = $element;
	    this.options = options;
	
	    Dropdown.__super__.constructor.call(this);
	  }
	
	  Utils.Extend(Dropdown, Utils.Observable);
	
	  Dropdown.prototype.render = function () {
	    var $dropdown = $(
	      '<span class="select2-dropdown">' +
	        '<span class="select2-results"></span>' +
	      '</span>'
	    );
	
	    $dropdown.attr('dir', this.options.get('dir'));
	
	    this.$dropdown = $dropdown;
	
	    return $dropdown;
	  };
	
	  Dropdown.prototype.bind = function () {
	    // Should be implemented in subclasses
	  };
	
	  Dropdown.prototype.position = function ($dropdown, $container) {
	    // Should be implmented in subclasses
	  };
	
	  Dropdown.prototype.destroy = function () {
	    // Remove the dropdown from the DOM
	    this.$dropdown.remove();
	  };
	
	  return Dropdown;
	});
	
	S2.define('select2/dropdown/search',[
	  'jquery',
	  '../utils'
	], function ($, Utils) {
	  function Search () { }
	
	  Search.prototype.render = function (decorated) {
	    var $rendered = decorated.call(this);
	
	    var $search = $(
	      '<span class="select2-search select2-search--dropdown">' +
	        '<input class="select2-search__field" type="search" tabindex="-1"' +
	        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
	        ' spellcheck="false" role="textbox" />' +
	      '</span>'
	    );
	
	    this.$searchContainer = $search;
	    this.$search = $search.find('input');
	
	    $rendered.prepend($search);
	
	    return $rendered;
	  };
	
	  Search.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    decorated.call(this, container, $container);
	
	    this.$search.on('keydown', function (evt) {
	      self.trigger('keypress', evt);
	
	      self._keyUpPrevented = evt.isDefaultPrevented();
	    });
	
	    // Workaround for browsers which do not support the `input` event
	    // This will prevent double-triggering of events for browsers which support
	    // both the `keyup` and `input` events.
	    this.$search.on('input', function (evt) {
	      // Unbind the duplicated `keyup` event
	      $(this).off('keyup');
	    });
	
	    this.$search.on('keyup input', function (evt) {
	      self.handleSearch(evt);
	    });
	
	    container.on('open', function () {
	      self.$search.attr('tabindex', 0);
	
	      self.$search.focus();
	
	      window.setTimeout(function () {
	        self.$search.focus();
	      }, 0);
	    });
	
	    container.on('close', function () {
	      self.$search.attr('tabindex', -1);
	
	      self.$search.val('');
	    });
	
	    container.on('focus', function () {
	      if (container.isOpen()) {
	        self.$search.focus();
	      }
	    });
	
	    container.on('results:all', function (params) {
	      if (params.query.term == null || params.query.term === '') {
	        var showSearch = self.showSearch(params);
	
	        if (showSearch) {
	          self.$searchContainer.removeClass('select2-search--hide');
	        } else {
	          self.$searchContainer.addClass('select2-search--hide');
	        }
	      }
	    });
	  };
	
	  Search.prototype.handleSearch = function (evt) {
	    if (!this._keyUpPrevented) {
	      var input = this.$search.val();
	
	      this.trigger('query', {
	        term: input
	      });
	    }
	
	    this._keyUpPrevented = false;
	  };
	
	  Search.prototype.showSearch = function (_, params) {
	    return true;
	  };
	
	  return Search;
	});
	
	S2.define('select2/dropdown/hidePlaceholder',[
	
	], function () {
	  function HidePlaceholder (decorated, $element, options, dataAdapter) {
	    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
	
	    decorated.call(this, $element, options, dataAdapter);
	  }
	
	  HidePlaceholder.prototype.append = function (decorated, data) {
	    data.results = this.removePlaceholder(data.results);
	
	    decorated.call(this, data);
	  };
	
	  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
	    if (typeof placeholder === 'string') {
	      placeholder = {
	        id: '',
	        text: placeholder
	      };
	    }
	
	    return placeholder;
	  };
	
	  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
	    var modifiedData = data.slice(0);
	
	    for (var d = data.length - 1; d >= 0; d--) {
	      var item = data[d];
	
	      if (this.placeholder.id === item.id) {
	        modifiedData.splice(d, 1);
	      }
	    }
	
	    return modifiedData;
	  };
	
	  return HidePlaceholder;
	});
	
	S2.define('select2/dropdown/infiniteScroll',[
	  'jquery'
	], function ($) {
	  function InfiniteScroll (decorated, $element, options, dataAdapter) {
	    this.lastParams = {};
	
	    decorated.call(this, $element, options, dataAdapter);
	
	    this.$loadingMore = this.createLoadingMore();
	    this.loading = false;
	  }
	
	  InfiniteScroll.prototype.append = function (decorated, data) {
	    this.$loadingMore.remove();
	    this.loading = false;
	
	    decorated.call(this, data);
	
	    if (this.showLoadingMore(data)) {
	      this.$results.append(this.$loadingMore);
	    }
	  };
	
	  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    decorated.call(this, container, $container);
	
	    container.on('query', function (params) {
	      self.lastParams = params;
	      self.loading = true;
	    });
	
	    container.on('query:append', function (params) {
	      self.lastParams = params;
	      self.loading = true;
	    });
	
	    this.$results.on('scroll', function () {
	      var isLoadMoreVisible = $.contains(
	        document.documentElement,
	        self.$loadingMore[0]
	      );
	
	      if (self.loading || !isLoadMoreVisible) {
	        return;
	      }
	
	      var currentOffset = self.$results.offset().top +
	        self.$results.outerHeight(false);
	      var loadingMoreOffset = self.$loadingMore.offset().top +
	        self.$loadingMore.outerHeight(false);
	
	      if (currentOffset + 50 >= loadingMoreOffset) {
	        self.loadMore();
	      }
	    });
	  };
	
	  InfiniteScroll.prototype.loadMore = function () {
	    this.loading = true;
	
	    var params = $.extend({}, {page: 1}, this.lastParams);
	
	    params.page++;
	
	    this.trigger('query:append', params);
	  };
	
	  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
	    return data.pagination && data.pagination.more;
	  };
	
	  InfiniteScroll.prototype.createLoadingMore = function () {
	    var $option = $(
	      '<li ' +
	      'class="select2-results__option select2-results__option--load-more"' +
	      'role="treeitem" aria-disabled="true"></li>'
	    );
	
	    var message = this.options.get('translations').get('loadingMore');
	
	    $option.html(message(this.lastParams));
	
	    return $option;
	  };
	
	  return InfiniteScroll;
	});
	
	S2.define('select2/dropdown/attachBody',[
	  'jquery',
	  '../utils'
	], function ($, Utils) {
	  function AttachBody (decorated, $element, options) {
	    this.$dropdownParent = options.get('dropdownParent') || $(document.body);
	
	    decorated.call(this, $element, options);
	  }
	
	  AttachBody.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    var setupResultsEvents = false;
	
	    decorated.call(this, container, $container);
	
	    container.on('open', function () {
	      self._showDropdown();
	      self._attachPositioningHandler(container);
	
	      if (!setupResultsEvents) {
	        setupResultsEvents = true;
	
	        container.on('results:all', function () {
	          self._positionDropdown();
	          self._resizeDropdown();
	        });
	
	        container.on('results:append', function () {
	          self._positionDropdown();
	          self._resizeDropdown();
	        });
	      }
	    });
	
	    container.on('close', function () {
	      self._hideDropdown();
	      self._detachPositioningHandler(container);
	    });
	
	    this.$dropdownContainer.on('mousedown', function (evt) {
	      evt.stopPropagation();
	    });
	  };
	
	  AttachBody.prototype.destroy = function (decorated) {
	    decorated.call(this);
	
	    this.$dropdownContainer.remove();
	  };
	
	  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
	    // Clone all of the container classes
	    $dropdown.attr('class', $container.attr('class'));
	
	    $dropdown.removeClass('select2');
	    $dropdown.addClass('select2-container--open');
	
	    $dropdown.css({
	      position: 'absolute',
	      top: -999999
	    });
	
	    this.$container = $container;
	  };
	
	  AttachBody.prototype.render = function (decorated) {
	    var $container = $('<span></span>');
	
	    var $dropdown = decorated.call(this);
	    $container.append($dropdown);
	
	    this.$dropdownContainer = $container;
	
	    return $container;
	  };
	
	  AttachBody.prototype._hideDropdown = function (decorated) {
	    this.$dropdownContainer.detach();
	  };
	
	  AttachBody.prototype._attachPositioningHandler =
	      function (decorated, container) {
	    var self = this;
	
	    var scrollEvent = 'scroll.select2.' + container.id;
	    var resizeEvent = 'resize.select2.' + container.id;
	    var orientationEvent = 'orientationchange.select2.' + container.id;
	
	    var $watchers = this.$container.parents().filter(Utils.hasScroll);
	    $watchers.each(function () {
	      $(this).data('select2-scroll-position', {
	        x: $(this).scrollLeft(),
	        y: $(this).scrollTop()
	      });
	    });
	
	    $watchers.on(scrollEvent, function (ev) {
	      var position = $(this).data('select2-scroll-position');
	      $(this).scrollTop(position.y);
	    });
	
	    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
	      function (e) {
	      self._positionDropdown();
	      self._resizeDropdown();
	    });
	  };
	
	  AttachBody.prototype._detachPositioningHandler =
	      function (decorated, container) {
	    var scrollEvent = 'scroll.select2.' + container.id;
	    var resizeEvent = 'resize.select2.' + container.id;
	    var orientationEvent = 'orientationchange.select2.' + container.id;
	
	    var $watchers = this.$container.parents().filter(Utils.hasScroll);
	    $watchers.off(scrollEvent);
	
	    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
	  };
	
	  AttachBody.prototype._positionDropdown = function () {
	    var $window = $(window);
	
	    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
	    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
	
	    var newDirection = null;
	
	    var offset = this.$container.offset();
	
	    offset.bottom = offset.top + this.$container.outerHeight(false);
	
	    var container = {
	      height: this.$container.outerHeight(false)
	    };
	
	    container.top = offset.top;
	    container.bottom = offset.top + container.height;
	
	    var dropdown = {
	      height: this.$dropdown.outerHeight(false)
	    };
	
	    var viewport = {
	      top: $window.scrollTop(),
	      bottom: $window.scrollTop() + $window.height()
	    };
	
	    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
	    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);
	
	    var css = {
	      left: offset.left,
	      top: container.bottom
	    };
	
	    // Determine what the parent element is to use for calciulating the offset
	    var $offsetParent = this.$dropdownParent;
	
	    // For statically positoned elements, we need to get the element
	    // that is determining the offset
	    if ($offsetParent.css('position') === 'static') {
	      $offsetParent = $offsetParent.offsetParent();
	    }
	
	    var parentOffset = $offsetParent.offset();
	
	    css.top -= parentOffset.top;
	    css.left -= parentOffset.left;
	
	    if (!isCurrentlyAbove && !isCurrentlyBelow) {
	      newDirection = 'below';
	    }
	
	    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
	      newDirection = 'above';
	    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
	      newDirection = 'below';
	    }
	
	    if (newDirection == 'above' ||
	      (isCurrentlyAbove && newDirection !== 'below')) {
	      css.top = container.top - parentOffset.top - dropdown.height;
	    }
	
	    if (newDirection != null) {
	      this.$dropdown
	        .removeClass('select2-dropdown--below select2-dropdown--above')
	        .addClass('select2-dropdown--' + newDirection);
	      this.$container
	        .removeClass('select2-container--below select2-container--above')
	        .addClass('select2-container--' + newDirection);
	    }
	
	    this.$dropdownContainer.css(css);
	  };
	
	  AttachBody.prototype._resizeDropdown = function () {
	    var css = {
	      width: this.$container.outerWidth(false) + 'px'
	    };
	
	    if (this.options.get('dropdownAutoWidth')) {
	      css.minWidth = css.width;
	      css.position = 'relative';
	      css.width = 'auto';
	    }
	
	    this.$dropdown.css(css);
	  };
	
	  AttachBody.prototype._showDropdown = function (decorated) {
	    this.$dropdownContainer.appendTo(this.$dropdownParent);
	
	    this._positionDropdown();
	    this._resizeDropdown();
	  };
	
	  return AttachBody;
	});
	
	S2.define('select2/dropdown/minimumResultsForSearch',[
	
	], function () {
	  function countResults (data) {
	    var count = 0;
	
	    for (var d = 0; d < data.length; d++) {
	      var item = data[d];
	
	      if (item.children) {
	        count += countResults(item.children);
	      } else {
	        count++;
	      }
	    }
	
	    return count;
	  }
	
	  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
	    this.minimumResultsForSearch = options.get('minimumResultsForSearch');
	
	    if (this.minimumResultsForSearch < 0) {
	      this.minimumResultsForSearch = Infinity;
	    }
	
	    decorated.call(this, $element, options, dataAdapter);
	  }
	
	  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
	    if (countResults(params.data.results) < this.minimumResultsForSearch) {
	      return false;
	    }
	
	    return decorated.call(this, params);
	  };
	
	  return MinimumResultsForSearch;
	});
	
	S2.define('select2/dropdown/selectOnClose',[
	
	], function () {
	  function SelectOnClose () { }
	
	  SelectOnClose.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    decorated.call(this, container, $container);
	
	    container.on('close', function (params) {
	      self._handleSelectOnClose(params);
	    });
	  };
	
	  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
	    if (params && params.originalSelect2Event != null) {
	      var event = params.originalSelect2Event;
	
	      // Don't select an item if the close event was triggered from a select or
	      // unselect event
	      if (event._type === 'select' || event._type === 'unselect') {
	        return;
	      }
	    }
	
	    var $highlightedResults = this.getHighlightedResults();
	
	    // Only select highlighted results
	    if ($highlightedResults.length < 1) {
	      return;
	    }
	
	    var data = $highlightedResults.data('data');
	
	    // Don't re-select already selected resulte
	    if (
	      (data.element != null && data.element.selected) ||
	      (data.element == null && data.selected)
	    ) {
	      return;
	    }
	
	    this.trigger('select', {
	        data: data
	    });
	  };
	
	  return SelectOnClose;
	});
	
	S2.define('select2/dropdown/closeOnSelect',[
	
	], function () {
	  function CloseOnSelect () { }
	
	  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	
	    decorated.call(this, container, $container);
	
	    container.on('select', function (evt) {
	      self._selectTriggered(evt);
	    });
	
	    container.on('unselect', function (evt) {
	      self._selectTriggered(evt);
	    });
	  };
	
	  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
	    var originalEvent = evt.originalEvent;
	
	    // Don't close if the control key is being held
	    if (originalEvent && originalEvent.ctrlKey) {
	      return;
	    }
	
	    this.trigger('close', {
	      originalEvent: originalEvent,
	      originalSelect2Event: evt
	    });
	  };
	
	  return CloseOnSelect;
	});
	
	S2.define('select2/i18n/en',[],function () {
	  // English
	  return {
	    errorLoading: function () {
	      return 'The results could not be loaded.';
	    },
	    inputTooLong: function (args) {
	      var overChars = args.input.length - args.maximum;
	
	      var message = 'Please delete ' + overChars + ' character';
	
	      if (overChars != 1) {
	        message += 's';
	      }
	
	      return message;
	    },
	    inputTooShort: function (args) {
	      var remainingChars = args.minimum - args.input.length;
	
	      var message = 'Please enter ' + remainingChars + ' or more characters';
	
	      return message;
	    },
	    loadingMore: function () {
	      return 'Loading more results…';
	    },
	    maximumSelected: function (args) {
	      var message = 'You can only select ' + args.maximum + ' item';
	
	      if (args.maximum != 1) {
	        message += 's';
	      }
	
	      return message;
	    },
	    noResults: function () {
	      return 'No results found';
	    },
	    searching: function () {
	      return 'Searching…';
	    }
	  };
	});
	
	S2.define('select2/defaults',[
	  'jquery',
	  'require',
	
	  './results',
	
	  './selection/single',
	  './selection/multiple',
	  './selection/placeholder',
	  './selection/allowClear',
	  './selection/search',
	  './selection/eventRelay',
	
	  './utils',
	  './translation',
	  './diacritics',
	
	  './data/select',
	  './data/array',
	  './data/ajax',
	  './data/tags',
	  './data/tokenizer',
	  './data/minimumInputLength',
	  './data/maximumInputLength',
	  './data/maximumSelectionLength',
	
	  './dropdown',
	  './dropdown/search',
	  './dropdown/hidePlaceholder',
	  './dropdown/infiniteScroll',
	  './dropdown/attachBody',
	  './dropdown/minimumResultsForSearch',
	  './dropdown/selectOnClose',
	  './dropdown/closeOnSelect',
	
	  './i18n/en'
	], function ($, require,
	
	             ResultsList,
	
	             SingleSelection, MultipleSelection, Placeholder, AllowClear,
	             SelectionSearch, EventRelay,
	
	             Utils, Translation, DIACRITICS,
	
	             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
	             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,
	
	             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
	             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,
	
	             EnglishTranslation) {
	  function Defaults () {
	    this.reset();
	  }
	
	  Defaults.prototype.apply = function (options) {
	    options = $.extend(true, {}, this.defaults, options);
	
	    if (options.dataAdapter == null) {
	      if (options.ajax != null) {
	        options.dataAdapter = AjaxData;
	      } else if (options.data != null) {
	        options.dataAdapter = ArrayData;
	      } else {
	        options.dataAdapter = SelectData;
	      }
	
	      if (options.minimumInputLength > 0) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          MinimumInputLength
	        );
	      }
	
	      if (options.maximumInputLength > 0) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          MaximumInputLength
	        );
	      }
	
	      if (options.maximumSelectionLength > 0) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          MaximumSelectionLength
	        );
	      }
	
	      if (options.tags) {
	        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
	      }
	
	      if (options.tokenSeparators != null || options.tokenizer != null) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          Tokenizer
	        );
	      }
	
	      if (options.query != null) {
	        var Query = require(options.amdBase + 'compat/query');
	
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          Query
	        );
	      }
	
	      if (options.initSelection != null) {
	        var InitSelection = require(options.amdBase + 'compat/initSelection');
	
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          InitSelection
	        );
	      }
	    }
	
	    if (options.resultsAdapter == null) {
	      options.resultsAdapter = ResultsList;
	
	      if (options.ajax != null) {
	        options.resultsAdapter = Utils.Decorate(
	          options.resultsAdapter,
	          InfiniteScroll
	        );
	      }
	
	      if (options.placeholder != null) {
	        options.resultsAdapter = Utils.Decorate(
	          options.resultsAdapter,
	          HidePlaceholder
	        );
	      }
	
	      if (options.selectOnClose) {
	        options.resultsAdapter = Utils.Decorate(
	          options.resultsAdapter,
	          SelectOnClose
	        );
	      }
	    }
	
	    if (options.dropdownAdapter == null) {
	      if (options.multiple) {
	        options.dropdownAdapter = Dropdown;
	      } else {
	        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);
	
	        options.dropdownAdapter = SearchableDropdown;
	      }
	
	      if (options.minimumResultsForSearch !== 0) {
	        options.dropdownAdapter = Utils.Decorate(
	          options.dropdownAdapter,
	          MinimumResultsForSearch
	        );
	      }
	
	      if (options.closeOnSelect) {
	        options.dropdownAdapter = Utils.Decorate(
	          options.dropdownAdapter,
	          CloseOnSelect
	        );
	      }
	
	      if (
	        options.dropdownCssClass != null ||
	        options.dropdownCss != null ||
	        options.adaptDropdownCssClass != null
	      ) {
	        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');
	
	        options.dropdownAdapter = Utils.Decorate(
	          options.dropdownAdapter,
	          DropdownCSS
	        );
	      }
	
	      options.dropdownAdapter = Utils.Decorate(
	        options.dropdownAdapter,
	        AttachBody
	      );
	    }
	
	    if (options.selectionAdapter == null) {
	      if (options.multiple) {
	        options.selectionAdapter = MultipleSelection;
	      } else {
	        options.selectionAdapter = SingleSelection;
	      }
	
	      // Add the placeholder mixin if a placeholder was specified
	      if (options.placeholder != null) {
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          Placeholder
	        );
	      }
	
	      if (options.allowClear) {
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          AllowClear
	        );
	      }
	
	      if (options.multiple) {
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          SelectionSearch
	        );
	      }
	
	      if (
	        options.containerCssClass != null ||
	        options.containerCss != null ||
	        options.adaptContainerCssClass != null
	      ) {
	        var ContainerCSS = require(options.amdBase + 'compat/containerCss');
	
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          ContainerCSS
	        );
	      }
	
	      options.selectionAdapter = Utils.Decorate(
	        options.selectionAdapter,
	        EventRelay
	      );
	    }
	
	    if (typeof options.language === 'string') {
	      // Check if the language is specified with a region
	      if (options.language.indexOf('-') > 0) {
	        // Extract the region information if it is included
	        var languageParts = options.language.split('-');
	        var baseLanguage = languageParts[0];
	
	        options.language = [options.language, baseLanguage];
	      } else {
	        options.language = [options.language];
	      }
	    }
	
	    if ($.isArray(options.language)) {
	      var languages = new Translation();
	      options.language.push('en');
	
	      var languageNames = options.language;
	
	      for (var l = 0; l < languageNames.length; l++) {
	        var name = languageNames[l];
	        var language = {};
	
	        try {
	          // Try to load it with the original name
	          language = Translation.loadPath(name);
	        } catch (e) {
	          try {
	            // If we couldn't load it, check if it wasn't the full path
	            name = this.defaults.amdLanguageBase + name;
	            language = Translation.loadPath(name);
	          } catch (ex) {
	            // The translation could not be loaded at all. Sometimes this is
	            // because of a configuration problem, other times this can be
	            // because of how Select2 helps load all possible translation files.
	            if (options.debug && window.console && console.warn) {
	              console.warn(
	                'Select2: The language file for "' + name + '" could not be ' +
	                'automatically loaded. A fallback will be used instead.'
	              );
	            }
	
	            continue;
	          }
	        }
	
	        languages.extend(language);
	      }
	
	      options.translations = languages;
	    } else {
	      var baseTranslation = Translation.loadPath(
	        this.defaults.amdLanguageBase + 'en'
	      );
	      var customTranslation = new Translation(options.language);
	
	      customTranslation.extend(baseTranslation);
	
	      options.translations = customTranslation;
	    }
	
	    return options;
	  };
	
	  Defaults.prototype.reset = function () {
	    function stripDiacritics (text) {
	      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
	      function match(a) {
	        return DIACRITICS[a] || a;
	      }
	
	      return text.replace(/[^\u0000-\u007E]/g, match);
	    }
	
	    function matcher (params, data) {
	      // Always return the object if there is nothing to compare
	      if ($.trim(params.term) === '') {
	        return data;
	      }
	
	      // Do a recursive check for options with children
	      if (data.children && data.children.length > 0) {
	        // Clone the data object if there are children
	        // This is required as we modify the object to remove any non-matches
	        var match = $.extend(true, {}, data);
	
	        // Check each child of the option
	        for (var c = data.children.length - 1; c >= 0; c--) {
	          var child = data.children[c];
	
	          var matches = matcher(params, child);
	
	          // If there wasn't a match, remove the object in the array
	          if (matches == null) {
	            match.children.splice(c, 1);
	          }
	        }
	
	        // If any children matched, return the new object
	        if (match.children.length > 0) {
	          return match;
	        }
	
	        // If there were no matching children, check just the plain object
	        return matcher(params, match);
	      }
	
	      var original = stripDiacritics(data.text).toUpperCase();
	      var term = stripDiacritics(params.term).toUpperCase();
	
	      // Check if the text contains the term
	      if (original.indexOf(term) > -1) {
	        return data;
	      }
	
	      // If it doesn't contain the term, don't return anything
	      return null;
	    }
	
	    this.defaults = {
	      amdBase: './',
	      amdLanguageBase: './i18n/',
	      closeOnSelect: true,
	      debug: false,
	      dropdownAutoWidth: false,
	      escapeMarkup: Utils.escapeMarkup,
	      language: EnglishTranslation,
	      matcher: matcher,
	      minimumInputLength: 0,
	      maximumInputLength: 0,
	      maximumSelectionLength: 0,
	      minimumResultsForSearch: 0,
	      selectOnClose: false,
	      sorter: function (data) {
	        return data;
	      },
	      templateResult: function (result) {
	        return result.text;
	      },
	      templateSelection: function (selection) {
	        return selection.text;
	      },
	      theme: 'default',
	      width: 'resolve'
	    };
	  };
	
	  Defaults.prototype.set = function (key, value) {
	    var camelKey = $.camelCase(key);
	
	    var data = {};
	    data[camelKey] = value;
	
	    var convertedData = Utils._convertData(data);
	
	    $.extend(this.defaults, convertedData);
	  };
	
	  var defaults = new Defaults();
	
	  return defaults;
	});
	
	S2.define('select2/options',[
	  'require',
	  'jquery',
	  './defaults',
	  './utils'
	], function (require, $, Defaults, Utils) {
	  function Options (options, $element) {
	    this.options = options;
	
	    if ($element != null) {
	      this.fromElement($element);
	    }
	
	    this.options = Defaults.apply(this.options);
	
	    if ($element && $element.is('input')) {
	      var InputCompat = require(this.get('amdBase') + 'compat/inputData');
	
	      this.options.dataAdapter = Utils.Decorate(
	        this.options.dataAdapter,
	        InputCompat
	      );
	    }
	  }
	
	  Options.prototype.fromElement = function ($e) {
	    var excludedData = ['select2'];
	
	    if (this.options.multiple == null) {
	      this.options.multiple = $e.prop('multiple');
	    }
	
	    if (this.options.disabled == null) {
	      this.options.disabled = $e.prop('disabled');
	    }
	
	    if (this.options.language == null) {
	      if ($e.prop('lang')) {
	        this.options.language = $e.prop('lang').toLowerCase();
	      } else if ($e.closest('[lang]').prop('lang')) {
	        this.options.language = $e.closest('[lang]').prop('lang');
	      }
	    }
	
	    if (this.options.dir == null) {
	      if ($e.prop('dir')) {
	        this.options.dir = $e.prop('dir');
	      } else if ($e.closest('[dir]').prop('dir')) {
	        this.options.dir = $e.closest('[dir]').prop('dir');
	      } else {
	        this.options.dir = 'ltr';
	      }
	    }
	
	    $e.prop('disabled', this.options.disabled);
	    $e.prop('multiple', this.options.multiple);
	
	    if ($e.data('select2Tags')) {
	      if (this.options.debug && window.console && console.warn) {
	        console.warn(
	          'Select2: The `data-select2-tags` attribute has been changed to ' +
	          'use the `data-data` and `data-tags="true"` attributes and will be ' +
	          'removed in future versions of Select2.'
	        );
	      }
	
	      $e.data('data', $e.data('select2Tags'));
	      $e.data('tags', true);
	    }
	
	    if ($e.data('ajaxUrl')) {
	      if (this.options.debug && window.console && console.warn) {
	        console.warn(
	          'Select2: The `data-ajax-url` attribute has been changed to ' +
	          '`data-ajax--url` and support for the old attribute will be removed' +
	          ' in future versions of Select2.'
	        );
	      }
	
	      $e.attr('ajax--url', $e.data('ajaxUrl'));
	      $e.data('ajax--url', $e.data('ajaxUrl'));
	    }
	
	    var dataset = {};
	
	    // Prefer the element's `dataset` attribute if it exists
	    // jQuery 1.x does not correctly handle data attributes with multiple dashes
	    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
	      dataset = $.extend(true, {}, $e[0].dataset, $e.data());
	    } else {
	      dataset = $e.data();
	    }
	
	    var data = $.extend(true, {}, dataset);
	
	    data = Utils._convertData(data);
	
	    for (var key in data) {
	      if ($.inArray(key, excludedData) > -1) {
	        continue;
	      }
	
	      if ($.isPlainObject(this.options[key])) {
	        $.extend(this.options[key], data[key]);
	      } else {
	        this.options[key] = data[key];
	      }
	    }
	
	    return this;
	  };
	
	  Options.prototype.get = function (key) {
	    return this.options[key];
	  };
	
	  Options.prototype.set = function (key, val) {
	    this.options[key] = val;
	  };
	
	  return Options;
	});
	
	S2.define('select2/core',[
	  'jquery',
	  './options',
	  './utils',
	  './keys'
	], function ($, Options, Utils, KEYS) {
	  var Select2 = function ($element, options) {
	    if ($element.data('select2') != null) {
	      $element.data('select2').destroy();
	    }
	
	    this.$element = $element;
	
	    this.id = this._generateId($element);
	
	    options = options || {};
	
	    this.options = new Options(options, $element);
	
	    Select2.__super__.constructor.call(this);
	
	    // Set up the tabindex
	
	    var tabindex = $element.attr('tabindex') || 0;
	    $element.data('old-tabindex', tabindex);
	    $element.attr('tabindex', '-1');
	
	    // Set up containers and adapters
	
	    var DataAdapter = this.options.get('dataAdapter');
	    this.dataAdapter = new DataAdapter($element, this.options);
	
	    var $container = this.render();
	
	    this._placeContainer($container);
	
	    var SelectionAdapter = this.options.get('selectionAdapter');
	    this.selection = new SelectionAdapter($element, this.options);
	    this.$selection = this.selection.render();
	
	    this.selection.position(this.$selection, $container);
	
	    var DropdownAdapter = this.options.get('dropdownAdapter');
	    this.dropdown = new DropdownAdapter($element, this.options);
	    this.$dropdown = this.dropdown.render();
	
	    this.dropdown.position(this.$dropdown, $container);
	
	    var ResultsAdapter = this.options.get('resultsAdapter');
	    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
	    this.$results = this.results.render();
	
	    this.results.position(this.$results, this.$dropdown);
	
	    // Bind events
	
	    var self = this;
	
	    // Bind the container to all of the adapters
	    this._bindAdapters();
	
	    // Register any DOM event handlers
	    this._registerDomEvents();
	
	    // Register any internal event handlers
	    this._registerDataEvents();
	    this._registerSelectionEvents();
	    this._registerDropdownEvents();
	    this._registerResultsEvents();
	    this._registerEvents();
	
	    // Set the initial state
	    this.dataAdapter.current(function (initialData) {
	      self.trigger('selection:update', {
	        data: initialData
	      });
	    });
	
	    // Hide the original select
	    $element.addClass('select2-hidden-accessible');
	    $element.attr('aria-hidden', 'true');
	
	    // Synchronize any monitored attributes
	    this._syncAttributes();
	
	    $element.data('select2', this);
	  };
	
	  Utils.Extend(Select2, Utils.Observable);
	
	  Select2.prototype._generateId = function ($element) {
	    var id = '';
	
	    if ($element.attr('id') != null) {
	      id = $element.attr('id');
	    } else if ($element.attr('name') != null) {
	      id = $element.attr('name') + '-' + Utils.generateChars(2);
	    } else {
	      id = Utils.generateChars(4);
	    }
	
	    id = id.replace(/(:|\.|\[|\]|,)/g, '');
	    id = 'select2-' + id;
	
	    return id;
	  };
	
	  Select2.prototype._placeContainer = function ($container) {
	    $container.insertAfter(this.$element);
	
	    var width = this._resolveWidth(this.$element, this.options.get('width'));
	
	    if (width != null) {
	      $container.css('width', width);
	    }
	  };
	
	  Select2.prototype._resolveWidth = function ($element, method) {
	    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
	
	    if (method == 'resolve') {
	      var styleWidth = this._resolveWidth($element, 'style');
	
	      if (styleWidth != null) {
	        return styleWidth;
	      }
	
	      return this._resolveWidth($element, 'element');
	    }
	
	    if (method == 'element') {
	      var elementWidth = $element.outerWidth(false);
	
	      if (elementWidth <= 0) {
	        return 'auto';
	      }
	
	      return elementWidth + 'px';
	    }
	
	    if (method == 'style') {
	      var style = $element.attr('style');
	
	      if (typeof(style) !== 'string') {
	        return null;
	      }
	
	      var attrs = style.split(';');
	
	      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
	        var attr = attrs[i].replace(/\s/g, '');
	        var matches = attr.match(WIDTH);
	
	        if (matches !== null && matches.length >= 1) {
	          return matches[1];
	        }
	      }
	
	      return null;
	    }
	
	    return method;
	  };
	
	  Select2.prototype._bindAdapters = function () {
	    this.dataAdapter.bind(this, this.$container);
	    this.selection.bind(this, this.$container);
	
	    this.dropdown.bind(this, this.$container);
	    this.results.bind(this, this.$container);
	  };
	
	  Select2.prototype._registerDomEvents = function () {
	    var self = this;
	
	    this.$element.on('change.select2', function () {
	      self.dataAdapter.current(function (data) {
	        self.trigger('selection:update', {
	          data: data
	        });
	      });
	    });
	
	    this.$element.on('focus.select2', function (evt) {
	      self.trigger('focus', evt);
	    });
	
	    this._syncA = Utils.bind(this._syncAttributes, this);
	    this._syncS = Utils.bind(this._syncSubtree, this);
	
	    if (this.$element[0].attachEvent) {
	      this.$element[0].attachEvent('onpropertychange', this._syncA);
	    }
	
	    var observer = window.MutationObserver ||
	      window.WebKitMutationObserver ||
	      window.MozMutationObserver
	    ;
	
	    if (observer != null) {
	      this._observer = new observer(function (mutations) {
	        $.each(mutations, self._syncA);
	        $.each(mutations, self._syncS);
	      });
	      this._observer.observe(this.$element[0], {
	        attributes: true,
	        childList: true,
	        subtree: false
	      });
	    } else if (this.$element[0].addEventListener) {
	      this.$element[0].addEventListener(
	        'DOMAttrModified',
	        self._syncA,
	        false
	      );
	      this.$element[0].addEventListener(
	        'DOMNodeInserted',
	        self._syncS,
	        false
	      );
	      this.$element[0].addEventListener(
	        'DOMNodeRemoved',
	        self._syncS,
	        false
	      );
	    }
	  };
	
	  Select2.prototype._registerDataEvents = function () {
	    var self = this;
	
	    this.dataAdapter.on('*', function (name, params) {
	      self.trigger(name, params);
	    });
	  };
	
	  Select2.prototype._registerSelectionEvents = function () {
	    var self = this;
	    var nonRelayEvents = ['toggle', 'focus'];
	
	    this.selection.on('toggle', function () {
	      self.toggleDropdown();
	    });
	
	    this.selection.on('focus', function (params) {
	      self.focus(params);
	    });
	
	    this.selection.on('*', function (name, params) {
	      if ($.inArray(name, nonRelayEvents) !== -1) {
	        return;
	      }
	
	      self.trigger(name, params);
	    });
	  };
	
	  Select2.prototype._registerDropdownEvents = function () {
	    var self = this;
	
	    this.dropdown.on('*', function (name, params) {
	      self.trigger(name, params);
	    });
	  };
	
	  Select2.prototype._registerResultsEvents = function () {
	    var self = this;
	
	    this.results.on('*', function (name, params) {
	      self.trigger(name, params);
	    });
	  };
	
	  Select2.prototype._registerEvents = function () {
	    var self = this;
	
	    this.on('open', function () {
	      self.$container.addClass('select2-container--open');
	    });
	
	    this.on('close', function () {
	      self.$container.removeClass('select2-container--open');
	    });
	
	    this.on('enable', function () {
	      self.$container.removeClass('select2-container--disabled');
	    });
	
	    this.on('disable', function () {
	      self.$container.addClass('select2-container--disabled');
	    });
	
	    this.on('blur', function () {
	      self.$container.removeClass('select2-container--focus');
	    });
	
	    this.on('query', function (params) {
	      if (!self.isOpen()) {
	        self.trigger('open', {});
	      }
	
	      this.dataAdapter.query(params, function (data) {
	        self.trigger('results:all', {
	          data: data,
	          query: params
	        });
	      });
	    });
	
	    this.on('query:append', function (params) {
	      this.dataAdapter.query(params, function (data) {
	        self.trigger('results:append', {
	          data: data,
	          query: params
	        });
	      });
	    });
	
	    this.on('keypress', function (evt) {
	      var key = evt.which;
	
	      if (self.isOpen()) {
	        if (key === KEYS.ESC || key === KEYS.TAB ||
	            (key === KEYS.UP && evt.altKey)) {
	          self.close();
	
	          evt.preventDefault();
	        } else if (key === KEYS.ENTER) {
	          self.trigger('results:select', {});
	
	          evt.preventDefault();
	        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
	          self.trigger('results:toggle', {});
	
	          evt.preventDefault();
	        } else if (key === KEYS.UP) {
	          self.trigger('results:previous', {});
	
	          evt.preventDefault();
	        } else if (key === KEYS.DOWN) {
	          self.trigger('results:next', {});
	
	          evt.preventDefault();
	        }
	      } else {
	        if (key === KEYS.ENTER || key === KEYS.SPACE ||
	            (key === KEYS.DOWN && evt.altKey)) {
	          self.open();
	
	          evt.preventDefault();
	        }
	      }
	    });
	  };
	
	  Select2.prototype._syncAttributes = function () {
	    this.options.set('disabled', this.$element.prop('disabled'));
	
	    if (this.options.get('disabled')) {
	      if (this.isOpen()) {
	        this.close();
	      }
	
	      this.trigger('disable', {});
	    } else {
	      this.trigger('enable', {});
	    }
	  };
	
	  Select2.prototype._syncSubtree = function (evt, mutations) {
	    var changed = false;
	    var self = this;
	
	    // Ignore any mutation events raised for elements that aren't options or
	    // optgroups. This handles the case when the select element is destroyed
	    if (
	      evt && evt.target && (
	        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
	      )
	    ) {
	      return;
	    }
	
	    if (!mutations) {
	      // If mutation events aren't supported, then we can only assume that the
	      // change affected the selections
	      changed = true;
	    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
	      for (var n = 0; n < mutations.addedNodes.length; n++) {
	        var node = mutations.addedNodes[n];
	
	        if (node.selected) {
	          changed = true;
	        }
	      }
	    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
	      changed = true;
	    }
	
	    // Only re-pull the data if we think there is a change
	    if (changed) {
	      this.dataAdapter.current(function (currentData) {
	        self.trigger('selection:update', {
	          data: currentData
	        });
	      });
	    }
	  };
	
	  /**
	   * Override the trigger method to automatically trigger pre-events when
	   * there are events that can be prevented.
	   */
	  Select2.prototype.trigger = function (name, args) {
	    var actualTrigger = Select2.__super__.trigger;
	    var preTriggerMap = {
	      'open': 'opening',
	      'close': 'closing',
	      'select': 'selecting',
	      'unselect': 'unselecting'
	    };
	
	    if (args === undefined) {
	      args = {};
	    }
	
	    if (name in preTriggerMap) {
	      var preTriggerName = preTriggerMap[name];
	      var preTriggerArgs = {
	        prevented: false,
	        name: name,
	        args: args
	      };
	
	      actualTrigger.call(this, preTriggerName, preTriggerArgs);
	
	      if (preTriggerArgs.prevented) {
	        args.prevented = true;
	
	        return;
	      }
	    }
	
	    actualTrigger.call(this, name, args);
	  };
	
	  Select2.prototype.toggleDropdown = function () {
	    if (this.options.get('disabled')) {
	      return;
	    }
	
	    if (this.isOpen()) {
	      this.close();
	    } else {
	      this.open();
	    }
	  };
	
	  Select2.prototype.open = function () {
	    if (this.isOpen()) {
	      return;
	    }
	
	    this.trigger('query', {});
	  };
	
	  Select2.prototype.close = function () {
	    if (!this.isOpen()) {
	      return;
	    }
	
	    this.trigger('close', {});
	  };
	
	  Select2.prototype.isOpen = function () {
	    return this.$container.hasClass('select2-container--open');
	  };
	
	  Select2.prototype.hasFocus = function () {
	    return this.$container.hasClass('select2-container--focus');
	  };
	
	  Select2.prototype.focus = function (data) {
	    // No need to re-trigger focus events if we are already focused
	    if (this.hasFocus()) {
	      return;
	    }
	
	    this.$container.addClass('select2-container--focus');
	    this.trigger('focus', {});
	  };
	
	  Select2.prototype.enable = function (args) {
	    if (this.options.get('debug') && window.console && console.warn) {
	      console.warn(
	        'Select2: The `select2("enable")` method has been deprecated and will' +
	        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
	        ' instead.'
	      );
	    }
	
	    if (args == null || args.length === 0) {
	      args = [true];
	    }
	
	    var disabled = !args[0];
	
	    this.$element.prop('disabled', disabled);
	  };
	
	  Select2.prototype.data = function () {
	    if (this.options.get('debug') &&
	        arguments.length > 0 && window.console && console.warn) {
	      console.warn(
	        'Select2: Data can no longer be set using `select2("data")`. You ' +
	        'should consider setting the value instead using `$element.val()`.'
	      );
	    }
	
	    var data = [];
	
	    this.dataAdapter.current(function (currentData) {
	      data = currentData;
	    });
	
	    return data;
	  };
	
	  Select2.prototype.val = function (args) {
	    if (this.options.get('debug') && window.console && console.warn) {
	      console.warn(
	        'Select2: The `select2("val")` method has been deprecated and will be' +
	        ' removed in later Select2 versions. Use $element.val() instead.'
	      );
	    }
	
	    if (args == null || args.length === 0) {
	      return this.$element.val();
	    }
	
	    var newVal = args[0];
	
	    if ($.isArray(newVal)) {
	      newVal = $.map(newVal, function (obj) {
	        return obj.toString();
	      });
	    }
	
	    this.$element.val(newVal).trigger('change');
	  };
	
	  Select2.prototype.destroy = function () {
	    this.$container.remove();
	
	    if (this.$element[0].detachEvent) {
	      this.$element[0].detachEvent('onpropertychange', this._syncA);
	    }
	
	    if (this._observer != null) {
	      this._observer.disconnect();
	      this._observer = null;
	    } else if (this.$element[0].removeEventListener) {
	      this.$element[0]
	        .removeEventListener('DOMAttrModified', this._syncA, false);
	      this.$element[0]
	        .removeEventListener('DOMNodeInserted', this._syncS, false);
	      this.$element[0]
	        .removeEventListener('DOMNodeRemoved', this._syncS, false);
	    }
	
	    this._syncA = null;
	    this._syncS = null;
	
	    this.$element.off('.select2');
	    this.$element.attr('tabindex', this.$element.data('old-tabindex'));
	
	    this.$element.removeClass('select2-hidden-accessible');
	    this.$element.attr('aria-hidden', 'false');
	    this.$element.removeData('select2');
	
	    this.dataAdapter.destroy();
	    this.selection.destroy();
	    this.dropdown.destroy();
	    this.results.destroy();
	
	    this.dataAdapter = null;
	    this.selection = null;
	    this.dropdown = null;
	    this.results = null;
	  };
	
	  Select2.prototype.render = function () {
	    var $container = $(
	      '<span class="select2 select2-container">' +
	        '<span class="selection"></span>' +
	        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
	      '</span>'
	    );
	
	    $container.attr('dir', this.options.get('dir'));
	
	    this.$container = $container;
	
	    this.$container.addClass('select2-container--' + this.options.get('theme'));
	
	    $container.data('element', this.$element);
	
	    return $container;
	  };
	
	  return Select2;
	});
	
	S2.define('jquery-mousewheel',[
	  'jquery'
	], function ($) {
	  // Used to shim jQuery.mousewheel for non-full builds.
	  return $;
	});
	
	S2.define('jquery.select2',[
	  'jquery',
	  'jquery-mousewheel',
	
	  './select2/core',
	  './select2/defaults'
	], function ($, _, Select2, Defaults) {
	  if ($.fn.select2 == null) {
	    // All methods that should return the element
	    var thisMethods = ['open', 'close', 'destroy'];
	
	    $.fn.select2 = function (options) {
	      options = options || {};
	
	      if (typeof options === 'object') {
	        this.each(function () {
	          var instanceOptions = $.extend(true, {}, options);
	
	          var instance = new Select2($(this), instanceOptions);
	        });
	
	        return this;
	      } else if (typeof options === 'string') {
	        var ret;
	        var args = Array.prototype.slice.call(arguments, 1);
	
	        this.each(function () {
	          var instance = $(this).data('select2');
	
	          if (instance == null && window.console && console.error) {
	            console.error(
	              'The select2(\'' + options + '\') method was called on an ' +
	              'element that is not using Select2.'
	            );
	          }
	
	          ret = instance[options].apply(instance, args);
	        });
	
	        // Check if we should be returning `this`
	        if ($.inArray(options, thisMethods) > -1) {
	          return this;
	        }
	
	        return ret;
	      } else {
	        throw new Error('Invalid arguments for Select2: ' + options);
	      }
	    };
	  }
	
	  if ($.fn.select2.defaults == null) {
	    $.fn.select2.defaults = Defaults;
	  }
	
	  return Select2;
	});
	
	  // Return the AMD loader configuration so it can be used outside of this file
	  return {
	    define: S2.define,
	    require: S2.require
	  };
	}());
	
	  // Autoload the jQuery bindings
	  // We know that all of the modules exist above this, so we're safe
	  var select2 = S2.require('jquery.select2');
	
	  // Hold the AMD module references on the jQuery function that was just loaded
	  // This allows Select2 to use the internal loader outside of this file, such
	  // as in the language files.
	  jQuery.fn.select2.amd = S2;
	
	  // Return the Select2 instance for anyone who is importing it.
	  return select2;
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 15)))

/***/ }),

/***/ 431:
/*!**********************************!*\
  !*** ./~/sortablejs/Sortable.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/**!
	 * Sortable
	 * @author	RubaXa   <trash@rubaxa.org>
	 * @license MIT
	 */
	
	(function sortableModule(factory) {
		"use strict";
	
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else if (typeof module != "undefined" && typeof module.exports != "undefined") {
			module.exports = factory();
		}
		else {
			/* jshint sub:true */
			window["Sortable"] = factory();
		}
	})(function sortableFactory() {
		"use strict";
	
		if (typeof window == "undefined" || !window.document) {
			return function sortableError() {
				throw new Error("Sortable.js requires a window with a document");
			};
		}
	
		var dragEl,
			parentEl,
			ghostEl,
			cloneEl,
			rootEl,
			nextEl,
			lastDownEl,
	
			scrollEl,
			scrollParentEl,
			scrollCustomFn,
	
			lastEl,
			lastCSS,
			lastParentCSS,
	
			oldIndex,
			newIndex,
	
			activeGroup,
			putSortable,
	
			autoScroll = {},
	
			tapEvt,
			touchEvt,
	
			moved,
	
			/** @const */
			R_SPACE = /\s+/g,
			R_FLOAT = /left|right|inline/,
	
			expando = 'Sortable' + (new Date).getTime(),
	
			win = window,
			document = win.document,
			parseInt = win.parseInt,
	
			$ = __webpack_provided_window_dot_jQuery || win.Zepto,
			Polymer = win.Polymer,
	
			captureMode = false,
	
			supportDraggable = !!('draggable' in document.createElement('div')),
			supportCssPointerEvents = (function (el) {
				// false when IE11
				if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
					return false;
				}
				el = document.createElement('x');
				el.style.cssText = 'pointer-events:auto';
				return el.style.pointerEvents === 'auto';
			})(),
	
			_silent = false,
	
			abs = Math.abs,
			min = Math.min,
	
			savedInputChecked = [],
			touchDragOverListeners = [],
	
			_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
				// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
				if (rootEl && options.scroll) {
					var _this = rootEl[expando],
						el,
						rect,
						sens = options.scrollSensitivity,
						speed = options.scrollSpeed,
	
						x = evt.clientX,
						y = evt.clientY,
	
						winWidth = window.innerWidth,
						winHeight = window.innerHeight,
	
						vx,
						vy,
	
						scrollOffsetX,
						scrollOffsetY
					;
	
					// Delect scrollEl
					if (scrollParentEl !== rootEl) {
						scrollEl = options.scroll;
						scrollParentEl = rootEl;
						scrollCustomFn = options.scrollFn;
	
						if (scrollEl === true) {
							scrollEl = rootEl;
	
							do {
								if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
									(scrollEl.offsetHeight < scrollEl.scrollHeight)
								) {
									break;
								}
								/* jshint boss:true */
							} while (scrollEl = scrollEl.parentNode);
						}
					}
	
					if (scrollEl) {
						el = scrollEl;
						rect = scrollEl.getBoundingClientRect();
						vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
						vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
					}
	
	
					if (!(vx || vy)) {
						vx = (winWidth - x <= sens) - (x <= sens);
						vy = (winHeight - y <= sens) - (y <= sens);
	
						/* jshint expr:true */
						(vx || vy) && (el = win);
					}
	
	
					if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
						autoScroll.el = el;
						autoScroll.vx = vx;
						autoScroll.vy = vy;
	
						clearInterval(autoScroll.pid);
	
						if (el) {
							autoScroll.pid = setInterval(function () {
								scrollOffsetY = vy ? vy * speed : 0;
								scrollOffsetX = vx ? vx * speed : 0;
	
								if ('function' === typeof(scrollCustomFn)) {
									return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
								}
	
								if (el === win) {
									win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
								} else {
									el.scrollTop += scrollOffsetY;
									el.scrollLeft += scrollOffsetX;
								}
							}, 24);
						}
					}
				}
			}, 30),
	
			_prepareGroup = function (options) {
				function toFn(value, pull) {
					if (value === void 0 || value === true) {
						value = group.name;
					}
	
					if (typeof value === 'function') {
						return value;
					} else {
						return function (to, from) {
							var fromGroup = from.options.group.name;
	
							return pull
								? value
								: value && (value.join
									? value.indexOf(fromGroup) > -1
									: (fromGroup == value)
								);
						};
					}
				}
	
				var group = {};
				var originalGroup = options.group;
	
				if (!originalGroup || typeof originalGroup != 'object') {
					originalGroup = {name: originalGroup};
				}
	
				group.name = originalGroup.name;
				group.checkPull = toFn(originalGroup.pull, true);
				group.checkPut = toFn(originalGroup.put);
				group.revertClone = originalGroup.revertClone;
	
				options.group = group;
			}
		;
	
	
		/**
		 * @class  Sortable
		 * @param  {HTMLElement}  el
		 * @param  {Object}       [options]
		 */
		function Sortable(el, options) {
			if (!(el && el.nodeType && el.nodeType === 1)) {
				throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
			}
	
			this.el = el; // root element
			this.options = options = _extend({}, options);
	
	
			// Export instance
			el[expando] = this;
	
			// Default options
			var defaults = {
				group: Math.random(),
				sort: true,
				disabled: false,
				store: null,
				handle: null,
				scroll: true,
				scrollSensitivity: 30,
				scrollSpeed: 10,
				draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
				ghostClass: 'sortable-ghost',
				chosenClass: 'sortable-chosen',
				dragClass: 'sortable-drag',
				ignore: 'a, img',
				filter: null,
				preventOnFilter: true,
				animation: 0,
				setData: function (dataTransfer, dragEl) {
					dataTransfer.setData('Text', dragEl.textContent);
				},
				dropBubble: false,
				dragoverBubble: false,
				dataIdAttr: 'data-id',
				delay: 0,
				forceFallback: false,
				fallbackClass: 'sortable-fallback',
				fallbackOnBody: false,
				fallbackTolerance: 0,
				fallbackOffset: {x: 0, y: 0}
			};
	
	
			// Set default options
			for (var name in defaults) {
				!(name in options) && (options[name] = defaults[name]);
			}
	
			_prepareGroup(options);
	
			// Bind all private methods
			for (var fn in this) {
				if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
					this[fn] = this[fn].bind(this);
				}
			}
	
			// Setup drag mode
			this.nativeDraggable = options.forceFallback ? false : supportDraggable;
	
			// Bind events
			_on(el, 'mousedown', this._onTapStart);
			_on(el, 'touchstart', this._onTapStart);
			_on(el, 'pointerdown', this._onTapStart);
	
			if (this.nativeDraggable) {
				_on(el, 'dragover', this);
				_on(el, 'dragenter', this);
			}
	
			touchDragOverListeners.push(this._onDragOver);
	
			// Restore sorting
			options.store && this.sort(options.store.get(this));
		}
	
	
		Sortable.prototype = /** @lends Sortable.prototype */ {
			constructor: Sortable,
	
			_onTapStart: function (/** Event|TouchEvent */evt) {
				var _this = this,
					el = this.el,
					options = this.options,
					preventOnFilter = options.preventOnFilter,
					type = evt.type,
					touch = evt.touches && evt.touches[0],
					target = (touch || evt).target,
					originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
					filter = options.filter,
					startIndex;
	
				_saveInputCheckedState(el);
	
	
				// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
				if (dragEl) {
					return;
				}
	
				if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
					return; // only left button or enabled
				}
	
	
				target = _closest(target, options.draggable, el);
	
				if (!target) {
					return;
				}
	
				if (lastDownEl === target) {
					// Ignoring duplicate `down`
					return;
				}
	
				// Get the index of the dragged element within its parent
				startIndex = _index(target, options.draggable);
	
				// Check filter
				if (typeof filter === 'function') {
					if (filter.call(this, evt, target, this)) {
						_dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
						preventOnFilter && evt.preventDefault();
						return; // cancel dnd
					}
				}
				else if (filter) {
					filter = filter.split(',').some(function (criteria) {
						criteria = _closest(originalTarget, criteria.trim(), el);
	
						if (criteria) {
							_dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
							return true;
						}
					});
	
					if (filter) {
						preventOnFilter && evt.preventDefault();
						return; // cancel dnd
					}
				}
	
				if (options.handle && !_closest(originalTarget, options.handle, el)) {
					return;
				}
	
				// Prepare `dragstart`
				this._prepareDragStart(evt, touch, target, startIndex);
			},
	
			_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
				var _this = this,
					el = _this.el,
					options = _this.options,
					ownerDocument = el.ownerDocument,
					dragStartFn;
	
				if (target && !dragEl && (target.parentNode === el)) {
					tapEvt = evt;
	
					rootEl = el;
					dragEl = target;
					parentEl = dragEl.parentNode;
					nextEl = dragEl.nextSibling;
					lastDownEl = target;
					activeGroup = options.group;
					oldIndex = startIndex;
	
					this._lastX = (touch || evt).clientX;
					this._lastY = (touch || evt).clientY;
	
					dragEl.style['will-change'] = 'transform';
	
					dragStartFn = function () {
						// Delayed drag has been triggered
						// we can re-enable the events: touchmove/mousemove
						_this._disableDelayedDrag();
	
						// Make the element draggable
						dragEl.draggable = _this.nativeDraggable;
	
						// Chosen item
						_toggleClass(dragEl, options.chosenClass, true);
	
						// Bind the events: dragstart/dragend
						_this._triggerDragStart(evt, touch);
	
						// Drag start event
						_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
					};
	
					// Disable "draggable"
					options.ignore.split(',').forEach(function (criteria) {
						_find(dragEl, criteria.trim(), _disableDraggable);
					});
	
					_on(ownerDocument, 'mouseup', _this._onDrop);
					_on(ownerDocument, 'touchend', _this._onDrop);
					_on(ownerDocument, 'touchcancel', _this._onDrop);
					_on(ownerDocument, 'pointercancel', _this._onDrop);
					_on(ownerDocument, 'selectstart', _this);
	
					if (options.delay) {
						// If the user moves the pointer or let go the click or touch
						// before the delay has been reached:
						// disable the delayed drag
						_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
						_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
						_on(ownerDocument, 'pointermove', _this._disableDelayedDrag);
	
						_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
					} else {
						dragStartFn();
					}
	
	
				}
			},
	
			_disableDelayedDrag: function () {
				var ownerDocument = this.el.ownerDocument;
	
				clearTimeout(this._dragStartTimer);
				_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
				_off(ownerDocument, 'touchend', this._disableDelayedDrag);
				_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
				_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
				_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
				_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
			},
	
			_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
				touch = touch || (evt.pointerType == 'touch' ? evt : null);
	
				if (touch) {
					// Touch device support
					tapEvt = {
						target: dragEl,
						clientX: touch.clientX,
						clientY: touch.clientY
					};
	
					this._onDragStart(tapEvt, 'touch');
				}
				else if (!this.nativeDraggable) {
					this._onDragStart(tapEvt, true);
				}
				else {
					_on(dragEl, 'dragend', this);
					_on(rootEl, 'dragstart', this._onDragStart);
				}
	
				try {
					if (document.selection) {
						// Timeout neccessary for IE9
						setTimeout(function () {
							document.selection.empty();
						});
					} else {
						window.getSelection().removeAllRanges();
					}
				} catch (err) {
				}
			},
	
			_dragStarted: function () {
				if (rootEl && dragEl) {
					var options = this.options;
	
					// Apply effect
					_toggleClass(dragEl, options.ghostClass, true);
					_toggleClass(dragEl, options.dragClass, false);
	
					Sortable.active = this;
	
					// Drag start event
					_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
				} else {
					this._nulling();
				}
			},
	
			_emulateDragOver: function () {
				if (touchEvt) {
					if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
						return;
					}
	
					this._lastX = touchEvt.clientX;
					this._lastY = touchEvt.clientY;
	
					if (!supportCssPointerEvents) {
						_css(ghostEl, 'display', 'none');
					}
	
					var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
						parent = target,
						i = touchDragOverListeners.length;
	
					if (parent) {
						do {
							if (parent[expando]) {
								while (i--) {
									touchDragOverListeners[i]({
										clientX: touchEvt.clientX,
										clientY: touchEvt.clientY,
										target: target,
										rootEl: parent
									});
								}
	
								break;
							}
	
							target = parent; // store last element
						}
						/* jshint boss:true */
						while (parent = parent.parentNode);
					}
	
					if (!supportCssPointerEvents) {
						_css(ghostEl, 'display', '');
					}
				}
			},
	
	
			_onTouchMove: function (/**TouchEvent*/evt) {
				if (tapEvt) {
					var	options = this.options,
						fallbackTolerance = options.fallbackTolerance,
						fallbackOffset = options.fallbackOffset,
						touch = evt.touches ? evt.touches[0] : evt,
						dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
						dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
						translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';
	
					// only set the status to dragging, when we are actually dragging
					if (!Sortable.active) {
						if (fallbackTolerance &&
							min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
						) {
							return;
						}
	
						this._dragStarted();
					}
	
					// as well as creating the ghost element on the document body
					this._appendGhost();
	
					moved = true;
					touchEvt = touch;
	
					_css(ghostEl, 'webkitTransform', translate3d);
					_css(ghostEl, 'mozTransform', translate3d);
					_css(ghostEl, 'msTransform', translate3d);
					_css(ghostEl, 'transform', translate3d);
	
					evt.preventDefault();
				}
			},
	
			_appendGhost: function () {
				if (!ghostEl) {
					var rect = dragEl.getBoundingClientRect(),
						css = _css(dragEl),
						options = this.options,
						ghostRect;
	
					ghostEl = dragEl.cloneNode(true);
	
					_toggleClass(ghostEl, options.ghostClass, false);
					_toggleClass(ghostEl, options.fallbackClass, true);
					_toggleClass(ghostEl, options.dragClass, true);
	
					_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
					_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
					_css(ghostEl, 'width', rect.width);
					_css(ghostEl, 'height', rect.height);
					_css(ghostEl, 'opacity', '0.8');
					_css(ghostEl, 'position', 'fixed');
					_css(ghostEl, 'zIndex', '100000');
					_css(ghostEl, 'pointerEvents', 'none');
	
					options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);
	
					// Fixing dimensions.
					ghostRect = ghostEl.getBoundingClientRect();
					_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
					_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
				}
			},
	
			_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
				var dataTransfer = evt.dataTransfer,
					options = this.options;
	
				this._offUpEvents();
	
				if (activeGroup.checkPull(this, this, dragEl, evt)) {
					cloneEl = _clone(dragEl);
	
					cloneEl.draggable = false;
					cloneEl.style['will-change'] = '';
	
					_css(cloneEl, 'display', 'none');
					_toggleClass(cloneEl, this.options.chosenClass, false);
	
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(this, rootEl, 'clone', dragEl);
				}
	
				_toggleClass(dragEl, options.dragClass, true);
	
				if (useFallback) {
					if (useFallback === 'touch') {
						// Bind touch events
						_on(document, 'touchmove', this._onTouchMove);
						_on(document, 'touchend', this._onDrop);
						_on(document, 'touchcancel', this._onDrop);
						_on(document, 'pointermove', this._onTouchMove);
						_on(document, 'pointerup', this._onDrop);
					} else {
						// Old brwoser
						_on(document, 'mousemove', this._onTouchMove);
						_on(document, 'mouseup', this._onDrop);
					}
	
					this._loopId = setInterval(this._emulateDragOver, 50);
				}
				else {
					if (dataTransfer) {
						dataTransfer.effectAllowed = 'move';
						options.setData && options.setData.call(this, dataTransfer, dragEl);
					}
	
					_on(document, 'drop', this);
					setTimeout(this._dragStarted, 0);
				}
			},
	
			_onDragOver: function (/**Event*/evt) {
				var el = this.el,
					target,
					dragRect,
					targetRect,
					revert,
					options = this.options,
					group = options.group,
					activeSortable = Sortable.active,
					isOwner = (activeGroup === group),
					isMovingBetweenSortable = false,
					canSort = options.sort;
	
				if (evt.preventDefault !== void 0) {
					evt.preventDefault();
					!options.dragoverBubble && evt.stopPropagation();
				}
	
				if (dragEl.animated) {
					return;
				}
	
				moved = true;
	
				if (activeSortable && !options.disabled &&
					(isOwner
						? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
						: (
							putSortable === this ||
							(
								(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
								group.checkPut(this, activeSortable, dragEl, evt)
							)
						)
					) &&
					(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
				) {
					// Smart auto-scrolling
					_autoScroll(evt, options, this.el);
	
					if (_silent) {
						return;
					}
	
					target = _closest(evt.target, options.draggable, el);
					dragRect = dragEl.getBoundingClientRect();
	
					if (putSortable !== this) {
						putSortable = this;
						isMovingBetweenSortable = true;
					}
	
					if (revert) {
						_cloneHide(activeSortable, true);
						parentEl = rootEl; // actualization
	
						if (cloneEl || nextEl) {
							rootEl.insertBefore(dragEl, cloneEl || nextEl);
						}
						else if (!canSort) {
							rootEl.appendChild(dragEl);
						}
	
						return;
					}
	
	
					if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
						(el === evt.target) && (_ghostIsLast(el, evt))
					) {
						//assign target only if condition is true
						if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
							target = el.lastElementChild;
						}
	
						if (target) {
							if (target.animated) {
								return;
							}
	
							targetRect = target.getBoundingClientRect();
						}
	
						_cloneHide(activeSortable, isOwner);
	
						if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
							if (!dragEl.contains(el)) {
								el.appendChild(dragEl);
								parentEl = el; // actualization
							}
	
							this._animate(dragRect, dragEl);
							target && this._animate(targetRect, target);
						}
					}
					else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
						if (lastEl !== target) {
							lastEl = target;
							lastCSS = _css(target);
							lastParentCSS = _css(target.parentNode);
						}
	
						targetRect = target.getBoundingClientRect();
	
						var width = targetRect.right - targetRect.left,
							height = targetRect.bottom - targetRect.top,
							floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
								|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
							isWide = (target.offsetWidth > dragEl.offsetWidth),
							isLong = (target.offsetHeight > dragEl.offsetHeight),
							halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
							nextSibling = target.nextElementSibling,
							after = false
						;
	
						if (floating) {
							var elTop = dragEl.offsetTop,
								tgTop = target.offsetTop;
	
							if (elTop === tgTop) {
								after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
							}
							else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
								after = (evt.clientY - targetRect.top) / height > 0.5;
							} else {
								after = tgTop > elTop;
							}
							} else if (!isMovingBetweenSortable) {
							after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
						}
	
						var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
	
						if (moveVector !== false) {
							if (moveVector === 1 || moveVector === -1) {
								after = (moveVector === 1);
							}
	
							_silent = true;
							setTimeout(_unsilent, 30);
	
							_cloneHide(activeSortable, isOwner);
	
							if (!dragEl.contains(el)) {
								if (after && !nextSibling) {
									el.appendChild(dragEl);
								} else {
									target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
								}
							}
	
							parentEl = dragEl.parentNode; // actualization
	
							this._animate(dragRect, dragEl);
							this._animate(targetRect, target);
						}
					}
				}
			},
	
			_animate: function (prevRect, target) {
				var ms = this.options.animation;
	
				if (ms) {
					var currentRect = target.getBoundingClientRect();
	
					if (prevRect.nodeType === 1) {
						prevRect = prevRect.getBoundingClientRect();
					}
	
					_css(target, 'transition', 'none');
					_css(target, 'transform', 'translate3d('
						+ (prevRect.left - currentRect.left) + 'px,'
						+ (prevRect.top - currentRect.top) + 'px,0)'
					);
	
					target.offsetWidth; // repaint
	
					_css(target, 'transition', 'all ' + ms + 'ms');
					_css(target, 'transform', 'translate3d(0,0,0)');
	
					clearTimeout(target.animated);
					target.animated = setTimeout(function () {
						_css(target, 'transition', '');
						_css(target, 'transform', '');
						target.animated = false;
					}, ms);
				}
			},
	
			_offUpEvents: function () {
				var ownerDocument = this.el.ownerDocument;
	
				_off(document, 'touchmove', this._onTouchMove);
				_off(document, 'pointermove', this._onTouchMove);
				_off(ownerDocument, 'mouseup', this._onDrop);
				_off(ownerDocument, 'touchend', this._onDrop);
				_off(ownerDocument, 'pointerup', this._onDrop);
				_off(ownerDocument, 'touchcancel', this._onDrop);
				_off(ownerDocument, 'pointercancel', this._onDrop);
				_off(ownerDocument, 'selectstart', this);
			},
	
			_onDrop: function (/**Event*/evt) {
				var el = this.el,
					options = this.options;
	
				clearInterval(this._loopId);
				clearInterval(autoScroll.pid);
				clearTimeout(this._dragStartTimer);
	
				// Unbind events
				_off(document, 'mousemove', this._onTouchMove);
	
				if (this.nativeDraggable) {
					_off(document, 'drop', this);
					_off(el, 'dragstart', this._onDragStart);
				}
	
				this._offUpEvents();
	
				if (evt) {
					if (moved) {
						evt.preventDefault();
						!options.dropBubble && evt.stopPropagation();
					}
	
					ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
	
					if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
						// Remove clone
						cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
					}
	
					if (dragEl) {
						if (this.nativeDraggable) {
							_off(dragEl, 'dragend', this);
						}
	
						_disableDraggable(dragEl);
						dragEl.style['will-change'] = '';
	
						// Remove class's
						_toggleClass(dragEl, this.options.ghostClass, false);
						_toggleClass(dragEl, this.options.chosenClass, false);
	
						// Drag stop event
						_dispatchEvent(this, rootEl, 'unchoose', dragEl, rootEl, oldIndex);
	
						if (rootEl !== parentEl) {
							newIndex = _index(dragEl, options.draggable);
	
							if (newIndex >= 0) {
								// Add event
								_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);
	
								// Remove event
								_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);
	
								// drag from one list and drop into another
								_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
						else {
							if (dragEl.nextSibling !== nextEl) {
								// Get the index of the dragged element within its parent
								newIndex = _index(dragEl, options.draggable);
	
								if (newIndex >= 0) {
									// drag & drop within the same list
									_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
									_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
								}
							}
						}
	
						if (Sortable.active) {
							/* jshint eqnull:true */
							if (newIndex == null || newIndex === -1) {
								newIndex = oldIndex;
							}
	
							_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);
	
							// Save sorting
							this.save();
						}
					}
	
				}
	
				this._nulling();
			},
	
			_nulling: function() {
				rootEl =
				dragEl =
				parentEl =
				ghostEl =
				nextEl =
				cloneEl =
				lastDownEl =
	
				scrollEl =
				scrollParentEl =
	
				tapEvt =
				touchEvt =
	
				moved =
				newIndex =
	
				lastEl =
				lastCSS =
	
				putSortable =
				activeGroup =
				Sortable.active = null;
	
				savedInputChecked.forEach(function (el) {
					el.checked = true;
				});
				savedInputChecked.length = 0;
			},
	
			handleEvent: function (/**Event*/evt) {
				switch (evt.type) {
					case 'drop':
					case 'dragend':
						this._onDrop(evt);
						break;
	
					case 'dragover':
					case 'dragenter':
						if (dragEl) {
							this._onDragOver(evt);
							_globalDragOver(evt);
						}
						break;
	
					case 'selectstart':
						evt.preventDefault();
						break;
				}
			},
	
	
			/**
			 * Serializes the item into an array of string.
			 * @returns {String[]}
			 */
			toArray: function () {
				var order = [],
					el,
					children = this.el.children,
					i = 0,
					n = children.length,
					options = this.options;
	
				for (; i < n; i++) {
					el = children[i];
					if (_closest(el, options.draggable, this.el)) {
						order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
					}
				}
	
				return order;
			},
	
	
			/**
			 * Sorts the elements according to the array.
			 * @param  {String[]}  order  order of the items
			 */
			sort: function (order) {
				var items = {}, rootEl = this.el;
	
				this.toArray().forEach(function (id, i) {
					var el = rootEl.children[i];
	
					if (_closest(el, this.options.draggable, rootEl)) {
						items[id] = el;
					}
				}, this);
	
				order.forEach(function (id) {
					if (items[id]) {
						rootEl.removeChild(items[id]);
						rootEl.appendChild(items[id]);
					}
				});
			},
	
	
			/**
			 * Save the current sorting
			 */
			save: function () {
				var store = this.options.store;
				store && store.set(this);
			},
	
	
			/**
			 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
			 * @param   {HTMLElement}  el
			 * @param   {String}       [selector]  default: `options.draggable`
			 * @returns {HTMLElement|null}
			 */
			closest: function (el, selector) {
				return _closest(el, selector || this.options.draggable, this.el);
			},
	
	
			/**
			 * Set/get option
			 * @param   {string} name
			 * @param   {*}      [value]
			 * @returns {*}
			 */
			option: function (name, value) {
				var options = this.options;
	
				if (value === void 0) {
					return options[name];
				} else {
					options[name] = value;
	
					if (name === 'group') {
						_prepareGroup(options);
					}
				}
			},
	
	
			/**
			 * Destroy
			 */
			destroy: function () {
				var el = this.el;
	
				el[expando] = null;
	
				_off(el, 'mousedown', this._onTapStart);
				_off(el, 'touchstart', this._onTapStart);
				_off(el, 'pointerdown', this._onTapStart);
	
				if (this.nativeDraggable) {
					_off(el, 'dragover', this);
					_off(el, 'dragenter', this);
				}
	
				// Remove draggable attributes
				Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
					el.removeAttribute('draggable');
				});
	
				touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);
	
				this._onDrop();
	
				this.el = el = null;
			}
		};
	
	
		function _cloneHide(sortable, state) {
			if (sortable.lastPullMode !== 'clone') {
				state = true;
			}
	
			if (cloneEl && (cloneEl.state !== state)) {
				_css(cloneEl, 'display', state ? 'none' : '');
	
				if (!state) {
					if (cloneEl.state) {
						if (sortable.options.group.revertClone) {
							rootEl.insertBefore(cloneEl, nextEl);
							sortable._animate(dragEl, cloneEl);
						} else {
							rootEl.insertBefore(cloneEl, dragEl);
						}
					}
				}
	
				cloneEl.state = state;
			}
		}
	
	
		function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
			if (el) {
				ctx = ctx || document;
	
				do {
					if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
						return el;
					}
					/* jshint boss:true */
				} while (el = _getParentOrHost(el));
			}
	
			return null;
		}
	
	
		function _getParentOrHost(el) {
			var parent = el.host;
	
			return (parent && parent.nodeType) ? parent : el.parentNode;
		}
	
	
		function _globalDragOver(/**Event*/evt) {
			if (evt.dataTransfer) {
				evt.dataTransfer.dropEffect = 'move';
			}
			evt.preventDefault();
		}
	
	
		function _on(el, event, fn) {
			el.addEventListener(event, fn, captureMode);
		}
	
	
		function _off(el, event, fn) {
			el.removeEventListener(event, fn, captureMode);
		}
	
	
		function _toggleClass(el, name, state) {
			if (el) {
				if (el.classList) {
					el.classList[state ? 'add' : 'remove'](name);
				}
				else {
					var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
					el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
				}
			}
		}
	
	
		function _css(el, prop, val) {
			var style = el && el.style;
	
			if (style) {
				if (val === void 0) {
					if (document.defaultView && document.defaultView.getComputedStyle) {
						val = document.defaultView.getComputedStyle(el, '');
					}
					else if (el.currentStyle) {
						val = el.currentStyle;
					}
	
					return prop === void 0 ? val : val[prop];
				}
				else {
					if (!(prop in style)) {
						prop = '-webkit-' + prop;
					}
	
					style[prop] = val + (typeof val === 'string' ? '' : 'px');
				}
			}
		}
	
	
		function _find(ctx, tagName, iterator) {
			if (ctx) {
				var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
	
				if (iterator) {
					for (; i < n; i++) {
						iterator(list[i], i);
					}
				}
	
				return list;
			}
	
			return [];
		}
	
	
	
		function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
			sortable = (sortable || rootEl[expando]);
	
			var evt = document.createEvent('Event'),
				options = sortable.options,
				onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
	
			evt.initEvent(name, true, true);
	
			evt.to = rootEl;
			evt.from = fromEl || rootEl;
			evt.item = targetEl || rootEl;
			evt.clone = cloneEl;
	
			evt.oldIndex = startIndex;
			evt.newIndex = newIndex;
	
			rootEl.dispatchEvent(evt);
	
			if (options[onName]) {
				options[onName].call(sortable, evt);
			}
		}
	
	
		function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
			var evt,
				sortable = fromEl[expando],
				onMoveFn = sortable.options.onMove,
				retVal;
	
			evt = document.createEvent('Event');
			evt.initEvent('move', true, true);
	
			evt.to = toEl;
			evt.from = fromEl;
			evt.dragged = dragEl;
			evt.draggedRect = dragRect;
			evt.related = targetEl || toEl;
			evt.relatedRect = targetRect || toEl.getBoundingClientRect();
			evt.willInsertAfter = willInsertAfter;
	
			fromEl.dispatchEvent(evt);
	
			if (onMoveFn) {
				retVal = onMoveFn.call(sortable, evt, originalEvt);
			}
	
			return retVal;
		}
	
	
		function _disableDraggable(el) {
			el.draggable = false;
		}
	
	
		function _unsilent() {
			_silent = false;
		}
	
	
		/** @returns {HTMLElement|false} */
		function _ghostIsLast(el, evt) {
			var lastEl = el.lastElementChild,
				rect = lastEl.getBoundingClientRect();
	
			// 5 — min delta
			// abs — нельзя добавлять, а то глюки при наведении сверху
			return (evt.clientY - (rect.top + rect.height) > 5) ||
				(evt.clientX - (rect.left + rect.width) > 5);
		}
	
	
		/**
		 * Generate id
		 * @param   {HTMLElement} el
		 * @returns {String}
		 * @private
		 */
		function _generateId(el) {
			var str = el.tagName + el.className + el.src + el.href + el.textContent,
				i = str.length,
				sum = 0;
	
			while (i--) {
				sum += str.charCodeAt(i);
			}
	
			return sum.toString(36);
		}
	
		/**
		 * Returns the index of an element within its parent for a selected set of
		 * elements
		 * @param  {HTMLElement} el
		 * @param  {selector} selector
		 * @return {number}
		 */
		function _index(el, selector) {
			var index = 0;
	
			if (!el || !el.parentNode) {
				return -1;
			}
	
			while (el && (el = el.previousElementSibling)) {
				if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
					index++;
				}
			}
	
			return index;
		}
	
		function _matches(/**HTMLElement*/el, /**String*/selector) {
			if (el) {
				selector = selector.split('.');
	
				var tag = selector.shift().toUpperCase(),
					re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');
	
				return (
					(tag === '' || el.nodeName.toUpperCase() == tag) &&
					(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
				);
			}
	
			return false;
		}
	
		function _throttle(callback, ms) {
			var args, _this;
	
			return function () {
				if (args === void 0) {
					args = arguments;
					_this = this;
	
					setTimeout(function () {
						if (args.length === 1) {
							callback.call(_this, args[0]);
						} else {
							callback.apply(_this, args);
						}
	
						args = void 0;
					}, ms);
				}
			};
		}
	
		function _extend(dst, src) {
			if (dst && src) {
				for (var key in src) {
					if (src.hasOwnProperty(key)) {
						dst[key] = src[key];
					}
				}
			}
	
			return dst;
		}
	
		function _clone(el) {
			return $
				? $(el).clone(true)[0]
				: (Polymer && Polymer.dom
					? Polymer.dom(el).cloneNode(true)
					: el.cloneNode(true)
				);
		}
	
		function _saveInputCheckedState(root) {
			var inputs = root.getElementsByTagName('input');
			var idx = inputs.length;
	
			while (idx--) {
				var el = inputs[idx];
				el.checked && savedInputChecked.push(el);
			}
		}
	
		// Fixed #973: 
		_on(document, 'touchmove', function (evt) {
			if (Sortable.active) {
				evt.preventDefault();
			}
		});
	
		try {
			window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
				get: function () {
					captureMode = {
						capture: false,
						passive: false
					};
				}
			}));
		} catch (err) {}
	
		// Export utils
		Sortable.utils = {
			on: _on,
			off: _off,
			css: _css,
			find: _find,
			is: function (el, selector) {
				return !!_closest(el, selector, el);
			},
			extend: _extend,
			throttle: _throttle,
			closest: _closest,
			toggleClass: _toggleClass,
			clone: _clone,
			index: _index
		};
	
	
		/**
		 * Create sortable instance
		 * @param {HTMLElement}  el
		 * @param {Object}      [options]
		 */
		Sortable.create = function (el, options) {
			return new Sortable(el, options);
		};
	
	
		// Export
		Sortable.version = '1.6.1';
		return Sortable;
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 15)))

/***/ }),

/***/ 433:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })

});
//# sourceMappingURL=dashboard.js.map