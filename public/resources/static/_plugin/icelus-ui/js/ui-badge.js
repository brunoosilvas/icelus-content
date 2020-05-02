/**
 * Badge
 */

$.Badge = function (el, options) {
   var plugin = this;

   var defaults = {
      data: [],
      key: 'id',
      display: [],
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

   var callClick = function (key) {
      let item = plugin.val(undefined, key);
      plugin.settings.onSelect.call(el, item);
   }

   var callDelete = function(key) {
      let item = plugin.val(undefined, key);
      console.log(item);
      console.log(plugin.settings.data);
      plugin.settings.onDelete.call(el, item);
   }

   var set = function (val) {

      $('div', el).remove();

      if ($.isArray(val)) {

         val.forEach((v) => {

            let key = v[plugin.settings.key];
            let display = $.evalScript(v, plugin.settings.display);

            let html = `
               <div class="mr-2 mb-2">
                  <a href="#" data-key="${key}" class="badge badge-light p-2">
                     ${display} <i class="fa fa-close ml-2" aria-hidden="true"></i>
                  </a>
               </div>
            `;

            el.append(html);
         });

         $('a', el).each(function (i, context) {
            $(context).on('click', function (e) {

               let key = $(context).data('key');

               if ($(e.target).hasClass('fa fa-close')) {
                  callDelete(key);
               } else {
                  callClick(key);
               }

            })
         });
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
         return get(key);
      } else {
         set(val);

         plugin.settings.data = val;
         plugin.settings.selected = null;
      }
   }

   plugin.remove = function (key) {
      let data = plugin.settings.data.filter(item => item[plugin.settings.key] !== key);

      plugin.val(data);
   }

   createWidget();
}
