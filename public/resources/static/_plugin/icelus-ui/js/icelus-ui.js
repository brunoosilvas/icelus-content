
(function ($) {


   $.fn.evalScript = function (value, format) {
      let display = '';

      format.forEach((d) => {

         let split = d.split('.');
         let script = 'value';

         split.forEach((splitValue) => {
            if (splitValue.length > 0) {
               script += `['${splitValue}']`;
            }
         });

         display += typeof (eval(script)) === 'undefined' ? d : eval(script);
      });

      return display;
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

      var create = function () {

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

      create();
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

      var create = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

            if ($.isFunction(plugin.settings.onSelect)) {
               el.on('change', function () {
                  var item = plugin.val(el.val(), plugin.settings.key);
                  plugin.settings.onSelect.call(el, item);
               });
            }

         });
      }

      plugin.val = function (value, key) {
         if (typeof (value) === 'undefined') {
            return {};
         } else {

            if (typeof (value) === 'object') {

               $('option', el).remove();

               el.append(`<option selected>${plugin.settings.displayEmpty}</option>`);

               value.forEach((v) => {
                  let display = $().evalScript(v, plugin.settings.display);
                  el.append(`<option value="${v[plugin.settings.key]}">${display}</option>`);
               });

               plugin.settings.data = value;

            } else {
               var newValue = {};
               plugin.settings.data.forEach((v, i) => {
                  if (v[key] === value) {
                     newValue = v;
                  }
               });
               return newValue;
            }
         }
      }

      create();
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
         displayEmpty: 'Selecione...',
         onSelect: function () { }
      };

      plugin.settings = {};

      var create = function () {

         plugin.settings = $.extend({}, defaults, options);
         plugin.el = el;

         el.each(function () {

         });

      }

      var click = function (key) {

         setTimeout(function() {
            effectShow();
         }, 250);

         let item = plugin.val(undefined, key);
         plugin.settings.onSelect.call(el, item);
      }

      var effectShow = function() {
         $('.tab-pane', el).removeClass('hide');
         $('.tab-pane', el).addClass('show');
      }

      var effectHide = function() {
         $('.tab-pane', el).removeClass('show');
         $('.tab-pane', el).addClass('hide');
      }

      plugin.val = function (val, key) {
         if (typeof (val) === 'undefined' && typeof (key) === 'undefined') {
            return plugin.settings.selected || null;
         } else if (typeof (val) === 'undefined' && typeof (key) !== 'undefined') {
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
         } else {

            if (typeof (val) === 'object') {

               $('.list-group a', el).remove();

               val.forEach((v) => {
                  let display = $().evalScript(v, plugin.settings.display);

                  $('.list-group', el)
                     .append(
                        `<a class="list-group-item list-group-item-action" data-toggle="list" data-key="${v[plugin.settings.key]}" href="#list-${v[plugin.settings.key]}">
                           ${display}
                        </a>`
                     );
               });

               $('.list-group a', el).each(function(i, elem) {
                  $(elem).on('click', function() {

                     effectHide();

                     click($(elem).data('key'));
                  })
               });

               plugin.settings.data = val;
            }
         }
      }

      create();
   }


   /*$.fn.SelectMenu = function (options) {

      var defaults = {
         data: [],
         onSelect: function () { }
      };

      var settings = $.extend({}, defaults, options);

      this.each(function () {
         $("option", this).remove();

         if ($.isFunction(settings.onSelect)) {
            $(this).on('change', function () {
               settings.onSelect.call(this, $(this).val());
            });
         }

      });

      return {
         val: function (value) {
            console.log(value);
            return value;
         }
      };
   }*/

}(jQuery));
