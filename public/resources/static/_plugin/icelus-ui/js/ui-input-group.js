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
