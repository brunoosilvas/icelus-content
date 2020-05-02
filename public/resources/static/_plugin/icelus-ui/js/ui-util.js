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
