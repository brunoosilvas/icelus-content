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

   var template = function(key, display, displaySub, displayBadge) {
      return `
         <a class="list-group-item list-group-item-action" data-toggle="list" data-key="${key}" href="#list-${key}">
            <div class="d-flex w-100 justify-content-between align-items-center">
               <h6 class="mb-1">${display}</h6>
               <span><i class="fa fa-close" aria-hidden="true"></i></span>
            </div>
            <small>${displaySub}</small>
            <span class="badge badge-pill badge-light">${displayBadge}</span>
         </a>
      `;
   }

   var set = function (val) {

      $('.list-group a', el).remove();

      val.forEach((v, i) => {
         let key = v[plugin.settings.key];
         let display = $.evalScript(v, plugin.settings.display);
         let displaySub = $.evalScript(v, plugin.settings.displaySub);
         let displayBadge = plugin.settings.fncDisplaySub(v);

         let html = template(key, display, displaySub, displayBadge);

         $('.list-group', el).append(html);

      });

      effectHide();

      evtClick();
   }

   var evtClick = function() {
      $('.list-group a', el).unbind('click');
      $('.list-group a', el).each(function (i, context) {
         $(context).on('click', function (e) {

            let key = $(context).data('key');

            if ($(e.target).hasClass('fa fa-close')) {

               callDelete(key);

            } else {
               if (!$(context).hasClass('active')) {
                  effectHide();

                  callClick(key);
               }
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

   plugin.add = function(val) {

      let key = val[plugin.settings.key];
      let display = $.evalScript(val, plugin.settings.display);
      let displaySub = $.evalScript(val, plugin.settings.displaySub);
      let displayBadge = plugin.settings.fncDisplaySub(val);

      let html = template(key, display, displaySub, displayBadge);
      $('.list-group', el).append(html);

      plugin.settings.data = plugin.settings.data || [];
      plugin.settings.selected = null;

      plugin.settings.data.push(val);

      evtClick();
   }

   plugin.selected = function() {
      return plugin.settings.selected || null;
   }

   plugin.refresh = function(val) {
      let data = [];
      plugin.settings.data.forEach((v) => {
         if (v[plugin.settings.key] === val[plugin.settings.key]) {
            data.push(val);
         } else {
            data.push(v);
         }
      });

      plugin.settings.data = data;
   }

   plugin.remove = function(key) {
      let data = plugin.settings.data.filter(item => item[plugin.settings.key] !== key);

      plugin.val(data);
   }

   createWidget();
}
