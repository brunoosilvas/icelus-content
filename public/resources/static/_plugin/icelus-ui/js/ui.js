icelus = {
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
      ListContent: function(el, options) {
         return new $.ListContent(el, options);
      },
      NavBar: function (el, options) {
         return new $.NavBar(el, options);
      },
      Select: function (el, options) {
         return new $.Select(el, options);
      }
   }
};
