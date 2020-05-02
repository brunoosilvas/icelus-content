(function ($) {

   $.fn.extend({
      textFromUrn: function () {
         var text = $(this).val();

         return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
            .replace(/\-\-+/g, '-')	// Substitui multiplos hífens por um único hífen
            .replace(/(^-+|-+$)/, '') // Remove hífens extras do final ou do inicio da string
            .toLowerCase();
      }
   });

   $.isNullOrEmpty = function(val) {
      if (typeof(val) === 'undefined' || val === null) {
         return true;
      } else if (typeof(val) === 'string') {
         return !val.trim();
      } else if ($.isArray(val)) {
         return val.length <= 0;
      } else if ($.isPlainObject(val)) {
         return $.isEmptyObject(val);
      }

      return true;
   }

   $.evalScript = function (val, format) {
      let display = '';

      console.log(val);

      format.forEach((d) => {

         let split = d.split('.');
         let script = 'val';

         split.forEach((splitValue) => {
            if (splitValue.length > 0) {
               script += `['${splitValue}']`;
            }
         });

         display += typeof (eval(script)) === 'undefined' ? d : eval(script);
      });

      return display;
   }

   $.evalObject = function (val, format) {
      format = format.normalize('NFD').replace(/\.\.+/g, '.');

      let split = format.split('.');

      if (split.length > 0) {

         let object = {};
         let script = '';
         let scriptObject = ' = { }';

         split.forEach((v, i) => {

            if (i == (split.length - 1)) {
               script += `['${v}']`;
               eval('object' + script + `= '${val}'`);
            } else {
               script += `['${v}']`;
               eval('object' + script + scriptObject);
            }

         });

         return object;
      }

      return {
         [format]: val
      };
   }

   /**
    * plugin NavBar
    */

   $.NavBar = function (el, options) {
      var plugin = this;

      var defaults = {
         selected: ''
      };

      plugin.settings = {};

      var createWidget = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

            const linkArrow = '.link-arrow';

            // class to hide the list
            const listHidden = '.list-hidden';

            // toggle sidebar menu
            $('#sidebar-toggle').on('click', function () {
               $('#wrapper').toggleClass('sidebar-toggle');
            });

            // list init
            $('.list-item').each(function () {

               const context = $(this);

               const parent = context.parent();

               // current link class
               const current = parent.find('.link-current');

               // class active link with icon
               const active = current.addClass('active down');

               // change up arrow icon
               parent.find(linkArrow).addClass('up');

               // view the list above the current link
               if (current.length > 0) {
                  active.next(listHidden).show();
               }
            });

            // list open hidden
            $('.list-link').on('click', function () {

               const context = $(this);

               // switch the class on the current link
               context.parent().find(linkArrow).toggleClass('active');

               // view a hidden list
               context.next(listHidden).slideToggle('fast');

            });

            // list transition arrow
            $('.link-arrow').on('click', function () {

               const context = $(this);

               // adding rotation effect to arrows icons
               context.addClass('transition').toggleClass('rotate');

               // rotate the direction of rotation of the arrow
               if (context.parent().find(linkArrow).hasClass('down')) {
                  context.toggleClass('rotate-revert');
               }
            });

         });
      }

      createWidget();
   }

   /**
    * plugin Select
    */

   $.Select = function (el, options) {
      var plugin = this;

      var defaults = {
         data: [],
         key: 'id',
         display: [],
         displayEmpty: 'Selecione...',
         onSelect: function () { }
      };

      plugin.settings = {};

      var createWidget = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

            if ($.isFunction(plugin.settings.onSelect)) {
               el.on('change', function () {
                  let item = plugin.val(el.val(), plugin.settings.key);
                  plugin.settings.onSelect.call(el, item);
               });
            }

         });
      }

      var set = function (val) {
         $('option', el).remove();

         el.append(`<option selected>${plugin.settings.displayEmpty}</option>`);

         val.forEach((v) => {
            let key = v[plugin.settings.key];
            let display = $.evalScript(v, plugin.settings.display);
            let html = `<option value="${key}">${display}</option>`;

            el.append(html);
         });
      }

      var get = function (val, key) {
         var value = null;
         plugin.settings.data.forEach((v, i) => {
            if (v[key] === val) {
               value = v;
            }
         });
         return value;
      }

      plugin.val = function (val, key) {
         if (typeof (val) === 'undefined') {
            return null;
         } else if (typeof (val) !== 'undefined' && typeof (key) !== 'undefined') {
            return get(val, key);
         } else {

            if (typeof (val) === 'object') {

               set(val);

               plugin.settings.data = val;

            }
         }
      }

      createWidget();
   }

   /**
    * Plugin ListContent
    */

   $.ListContent = function (el, options) {
      var plugin = this;

      var defaults = {
         data: [],
         selected: null,
         key: 'id',
         display: [],
         displaySub: [],
         fncDisplaySub: function() { },
         onSelect: function () { },
         onDelete: function () { }
      };

      plugin.settings = {};

      var createWidget = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

         });

      }

      var set = function (val) {

         $('.list-group', el).empty();

         val.forEach((v, i) => {
            let key = v[plugin.settings.key];
            let active = el.data('key-last') === key ? ' active' : '';
            let display = $.evalScript(v, plugin.settings.display);
            let displaySub = $.evalScript(v, plugin.settings.displaySub);
            let displayBadge = plugin.settings.fncDisplaySub(v);


            let html = `
            <a class="list-group-item list-group-item-action${active}" data-toggle="list" data-key="${key}" href="#list-${key}">
               <div class="d-flex w-100 justify-content-between align-items-center">
                  <h6 class="mb-1">${display}</h6>
                  <span><i class="fa fa-close" aria-hidden="true"></i></span>
               </div>
               <small>${displaySub}</small>
               <span class="badge badge-pill badge-light">${displayBadge}</span>
            </a>
            `;

            $('.list-group', el).append(html);

         });

         $('.list-group a', el).each(function (i, context) {
            $(context).on('click', function (e) {

               let key = $(context).data('key');

               if ($(e.target).hasClass('fa fa-close')) {

                  callDelete(key);

               } else {
                  effectHide();

                  callClick(key);
               }
            })
         });

      }

      var get = function (key) {
         var value = null;
         plugin.settings.data.forEach((v) => {
            if (v[plugin.settings.key] === key) {
               value = v;
            }
         });
         if (value) {
            plugin.settings.selected = value;
         }
         return value;
      }

      var callClick = function (key) {

         el.data('key-last', key);

         setTimeout(function () {
            effectShow();
         }, 250);

         let item = plugin.val(undefined, key);
         plugin.settings.onSelect.call(el, item);
      }

      var callDelete = function(key) {
         let item = plugin.val(undefined, key);
         plugin.settings.onDelete.call(el, item);
      }

      var effectShow = function () {
         $('.tab-pane', el).removeClass('hide');
         $('.tab-pane', el).addClass('show');
      }

      var effectHide = function () {
         $('.tab-pane', el).removeClass('show');
         $('.tab-pane', el).addClass('hide');
      }

      //plugin.

      plugin.val = function (val, key) {
         if (typeof (val) === 'undefined' && typeof (key) === 'undefined') {
            return plugin.settings.data;
         } else if (typeof (val) === 'undefined' && typeof (key) !== 'undefined') {
            return get(key);
         } else {

            if ($.isArray(val)) {

               set(val);

               plugin.settings.data = val;
               plugin.settings.selected = null;
            }
         }
      }

      plugin.selected = function() {
         return plugin.settings.selected || null;
      }

      plugin.remove = function(key) {
         let data = plugin.settings.data.filter(item => item[plugin.settings.key] !== key);

         plugin.val(data);
      }

      createWidget();
   }

   /**
    * InputGroup
    */

   $.InputGroup = function (el, options) {
      var plugin = this;

      var defaults = {
         text: function () { },
         onChange: function () { }
      };

      plugin.settings = {};

      var createWidget = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

            plugin.settings.displayText = $('span', el).text();

            $('input', el).on('change', function () {
               change();
            });
         });

      }

      var change = function () {

         if ($.isFunction(plugin.settings.text)) {
            let text = plugin.settings.text();
            if (text.length > 0) {
               $('span', el).text(text);
            } else {
               $('span', el).text(plugin.settings.displayText);
            }
         }

         plugin.settings.onChange.call(el, plugin.val());
      }

      var set = function (val) {

      }

      var get = function () {
         let keyInput = $('input', el).data('key');
         let keyText = $('span', el).data('key');

         let val = $('input', el).val();
         let input = null;
         let text = null;

         if (!$.isNullOrEmpty(val)) {
            input = $.evalObject($('input', el).val(), keyInput);
            text = $.evalObject($('span', el).text(), keyText);
         }

         let value = Object.assign({}, input, text);

         return value;
      }

      plugin.val = function (val) {
         if (typeof (val) === 'undefined') {
            return get();
         } else {
            if ($.isPlainObject(val)) {
               set(val);
            }
         }
      }

      createWidget();
   }

   /**
    * Badge
    */

   $.Badge = function (el, options) {
      var plugin = this;

      var defaults = {
         data: [],
         key: 'id',
         display: [],
         onSelect: function () { }
      };

      plugin.settings = {};

      var createWidget = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

         });

      }

      var callClick = function (key) {
         let item = plugin.val(undefined, key);
         plugin.settings.onSelect.call(el, item);
      }

      var set = function(val) {

         el.empty();

         if ($.isArray(val)) {

            val.forEach((v) => {

               let key = v[plugin.settings.key];
               let display = $.evalScript(v, plugin.settings.display);

               let html =
               `<div class="mr-2 mb-2">
                  <a href="#" data-key="${key}" class="badge badge-light p-3">
                     ${display} <i class="fa fa-close ml-2" aria-hidden="true"></i>
                  </a>
               </div>`;

               el.append(html);

            });

            $('a', el).each(function (i, context) {
               $(context).on('click', function (e) {

                  let key = $(context).data('key');
                  callClick(key);

               })
            });

         } else if ($.isPlainObject(val)) {

         }
      }

      var get = function (key) {
         var value = null;
         plugin.settings.data.forEach((v) => {
            if (v[plugin.settings.key] === key) {
               value = v;
            }
         });
         if (value) {
            plugin.settings.selected = value;
         }
         return value;
      }

      plugin.val = function (val, key) {
         if (typeof (val) === 'undefined') {
            //return get();
         } else {
            set(val);
         }
      }

      plugin.remove = function(key) {
         let data = plugin.settings.data.filter(item => item[plugin.settings.key] !== key);

         plugin.val(data);
      }

      createWidget();
   }

   /**
    * Button
    */

   $.Button = function (el, options) {
      var plugin = this;

      var defaults = {
         onClick: function () { }
      };

      plugin.settings = {};

      var createWidget = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {
            if ($.isFunction(plugin.settings.onClick)) {
               el.on('click', function () {
                  plugin.settings.onClick.call(el);
               });
            }
         });

      }

      createWidget();
   }

   Icelus = {
      ui: {
         Button: function (el, options) {
            return new $.Button(el, options);
         },
         Badge: function (el, options) {
            return new $.Badge(el, options);
         },
         InputGroup: function (el, options) {
            return new $.InputGroup(el, options);
         },
         NavBar: function (el, options) {
            return new $.NavBar(el, options);
         }
      }
   };

}(jQuery));
