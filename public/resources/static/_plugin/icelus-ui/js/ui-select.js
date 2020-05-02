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
