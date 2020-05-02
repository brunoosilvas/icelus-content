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
