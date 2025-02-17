/**
 * The file that pre-processes and then runs the passed parameters with Nicescroll.
 *
 * @link              https://wordpress.org/plugins/nicescrollr/
 * @since             0.1.0
 * @package           nicescrollr
 * @subpackage        nicescrollr/shared
 * Author:            Demis Patti <wp@demispatti.ch>
 * Author URI:        https://demispatti.ch
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

"use strict";
jQuery(function ($) {

	function Nicescrollr () {
		this.nsr_options = Nsr_Options;
		this.document = $(document);
		this.window = $(window);
		this.html = $('html');
		this.body = $('body');
		this.adminbar = $('#wpadminbar');
		this.editorContainer = $('#wp-content-editor-container');
	}

	Nicescrollr.prototype = {
		init: function () {
			// this.addEvents();
			this.runNicescroll();
			this.listenForDocumentChanges();
		},
		addEvents: function(){
			this.document.on('mousedown', {context: this}, this.mouseWheelScrollHepler);
			this.document.on('mousedown', {context: this}, this.autoscrollHelper);
		},
		runNicescroll: function () {
			this.body.niceScroll(this.getNicescrollConfiguration());
			/*if(this.body.hasClass('wp-admin')){
				this.runBackendIframeHelper();
			}*/
		},
		getNicescrollConfiguration: function () {
			return ({
				cursorcolor: this.nsr_options.cursorcolor,
				cursoropacitymin: this.nsr_options.cursoropacitymin,
				cursoropacitymax: this.nsr_options.cursoropacitymax,
				cursorwidth: this.nsr_options.cursorwidth,
				cursorborder: this.retrieveCursorBorder(),
				cursorborderradius: this.nsr_options.cursorborderradius,
				zindex: this.nsr_options.zindex,
				scrollspeed: this.nsr_options.scrollspeed,
				mousescrollstep: this.nsr_options.mousescrollstep,
				emulatetouch: this.nsr_options.emulatetouch,
				hwacceleration: this.nsr_options.hwacceleration,
				boxzoom: this.nsr_options.boxzoom,
				dblclickzoom: this.nsr_options.dblclickzoom,
				gesturezoom: this.nsr_options.gesturezoom,
				grabcursorenabled: this.nsr_options.grabcursorenabled,
				autohidemode: this.retrieveAutohideMode(),
				background: this.nsr_options.background,
				iframeautoresize: this.nsr_options.iframeautoresize,
				cursorminheight: this.nsr_options.cursorminheight,
				preservenativescrolling: this.nsr_options.preservenativescrolling,
				railoffset: this.retrieveRailOffset(),
				bouncescroll: this.nsr_options.bouncescroll,
				spacebarenabled: this.nsr_options.spacebarenabled,
				railpadding: this.retrieveRailPadding(),
				disableoutline: this.nsr_options.disableoutline,
				horizrailenabled: this.nsr_options.horizrailenabled,
				railalign: this.nsr_options.railalign,
				railvalign: this.nsr_options.railvalign,
				enabletranslate3d: this.nsr_options.enabletranslate3d,
				enablemousewheel: this.nsr_options.enablemousewheel,
				enablekeyboard: this.nsr_options.enablekeyboard,
				smoothscroll: this.nsr_options.smoothscroll,
				sensitiverail: this.nsr_options.sensitiverail,
				enablemouselockapi: this.nsr_options.enablemouselockapi,
				cursorfixedheight: this.retrieveCursorFixedHeight(),
				hidecursordelay: this.nsr_options.hidecursordelay,
				directionlockdeadzone: this.nsr_options.directionlockdeadzone,
				nativeparentscrolling: this.nsr_options.nativeparentscrolling,
				enablescrollonselection: this.nsr_options.enablescrollonselection,
				cursordragspeed: this.nsr_options.cursordragspeed,
				rtlmode: this.nsr_options.rtlmode,
				cursordragontouch: this.nsr_options.cursordragontouch,
				oneaxismousemode: this.nsr_options.oneaxismousemode,
				preventmultitouchscrolling: this.nsr_options.preventmultitouchscrolling,
				disablemutationobserver: this.nsr_options.disablemutationobserver,
				enableobserver: this.nsr_options.enableobserver,
				scrollbarid: this.nsr_options.scrollbarid
			});
		},

		runFrontendIframeHelper: function () {
			let ua = window.navigator.userAgent;
			let oldIe = ua.indexOf('Trident/');
			let newIe = ua.indexOf('Edge');

			if ((oldIe > - 1) || (newIe > - 1)) {
				if (oldIe > - 1) {
					this.addMsieIframeHelper();
				}
				else {
					this.addEdgeIframeHelper();
				}
			}
			else if (navigator.userAgent.search("Firefox") >= 0) {
				this.addMozIframeHelper();
			}
			else if (navigator.userAgent.search("Chrome") >= 0) {
				this.addWebkitIframeHelper();
			}
		},
		runBackendIframeHelper: function() {
			let ua = window.navigator.userAgent;
			let oldIe = ua.indexOf('Trident/');
			let newIe = ua.indexOf('Edge');

			if((oldIe > - 1) || (newIe > - 1)){

				if(oldIe > - 1){
					this.addMsieIframeHelper();
				} else {
					this.addEdgeIframeHelper();
				}
			}
			else if (navigator.userAgent.search("Firefox") >= 0) {
				this.addMozIframeHelper();
			}
			else if (navigator.userAgent.search("Chrome") >= 0) {
				this.addWebkitIframeHelper();
			}
		},

		retrieveCursorBorder: function () {
			return this.nsr_options.cursorborderwidth + ' ' +
				this.nsr_options.cursorborderstate + ' ' +
				this.nsr_options.cursorbordercolor;
		},
		retrieveRailPadding: function () {
			return {
				top: this.nsr_options.railpaddingtop,
				right: this.nsr_options.railpaddingright,
				bottom: this.nsr_options.railpaddingleft,
				left: this.nsr_options.railpaddingleft
			};
		},
		retrieveAutohideMode: function () {
			let autohidemode = this.nsr_options.autohidemode;
			if ('enabled' === autohidemode || 'true' === autohidemode) {
				autohidemode = true;
			}
			if ('disabled' === autohidemode || 'false' === autohidemode) {
				autohidemode = false;
			}
			return autohidemode;
		},
		retrieveRailOffset: function () {
			let railoffset = this.nsr_options.railoffset;
			if ('false' === railoffset) {
				railoffset = false;
			}
			return railoffset;
		},
		retrieveCursorFixedHeight: function () {
			let cursorfixedheight = this.nsr_options.cursorfixedheight;
			if ('false' === cursorfixedheight) {
				cursorfixedheight = false;
			}
			return cursorfixedheight;
		},

		listenForDocumentChanges: function () {
			let nicescrollr = this;
			MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
			let observer = new MutationObserver(function () {
				// fired when a mutation occurs
				nicescrollr.triggerResize();
			});
			// define what element should be observed by the observer
			// and what types of mutations trigger the callback
			observer.observe(document, {
				subtree: true,
				attributes: true,
				childList: true
			});
		},

		addWebkitIframeHelper: function() {
			this.html.addClass('nsr-is-webkit');
			let nicescrollr = this;
			this.editorContainer.on({
				mouseenter: function(){
					nicescrollr.body.attr('style', 'overflow-y: initial');
				},
				mouseleave: function () {
					nicescrollr.body.attr('style', 'overflow-y: hidden');
				}
			});
		},
		addMozIframeHelper: function () {
			this.html.addClass('nsr-is-moz');
			let nicescrollr = this;
			let mozBody = this.html;
			this.editorContainer.on({
				mouseenter: function () {
					mozBody.attr('style', 'scrollbar-width: none');
					nicescrollr.body.attr('style', 'overflow-y: initial');
				},
				mouseleave: function () {
					mozBody.attr('style', 'scrollbar-width: none');
					nicescrollr.body.attr('style', 'overflow-y: hidden');
				}
			});
		},
		addMsieIframeHelper: function () {
			this.html.addClass('nsr-is-msie');
			let nicescrollr = this;
			this.editorContainer.on({
				mouseenter: function () {
					nicescrollr.body.attr('style', '-ms-overflow-style: none');
					nicescrollr.html.attr('style', '-ms-overflow-y: initial');
				},
				mouseleave: function () {
					nicescrollr.body.attr('style', '-ms-overflow-style: none');
					nicescrollr.html.attr('style', '-ms-overflow-y: initial');
				}
			});
		},
		addEdgeIframeHelper: function () {
			this.html.addClass('nsr-is-edge');
			let nicescrollr = this;
			this.editorContainer.on({
				mouseenter: function () {
					nicescrollr.body.attr('style', '-ms-overflow-style: none');
					nicescrollr.body.attr('style', '-ms-overflow-y: initial');
				},
				mouseleave: function () {
					nicescrollr.body.attr('style', '-ms-overflow-style: none');
					nicescrollr.body.attr('style', '-ms-overflow-y: initial');
				}
			});
		},

		triggerResize: function () {
			let nicescrollr = this;
			setTimeout(function () {
				nicescrollr.body.getNiceScroll().resize();
			}, 300);
		}

		/*mouseWheelScrollHepler: function(event){
			var $this = event.data.context;
			$this.document.one("mouseup", function (e2) {
				if (el.button == 2 || e1.which == 2 && e1.target == e2.target) {
					var e3 = $.event.fix(e2);
					e3.type = "middleclick";
					$(e2.target).trigger(e3)
				}
			});
		},autoscrollHelper: function(event) {
			var $this = event.data.context;
			$this.window.scrollBy(0, 1);
			scrolldelay = setTimeout($this.pageScroll, 10);
		}*/
	};

	$(function () {
		if (Nsr_Options.enabled === '1') {
			new Nicescrollr().init()
		}
	});

});
