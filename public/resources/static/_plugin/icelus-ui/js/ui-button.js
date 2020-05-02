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
