var globalAcentos = {
   a: /[\xE0-\xE6]/g,
   A: /[\xC0-\xC6]/g,
   e: /[\xE8-\xEB]/g,
   E: /[\xC8-\xCB]/g,
   i: /[\xEC-\xEF]/g,
   I: /[\xCC-\xCF]/g,
   o: /[\xF2-\xF6]/g,
   O: /[\xD2-\xD6]/g,
   u: /[\xF9-\xFC]/g,
   U: /[\xD9-\xDC]/g,
   c: /\xE7/g,
   C: /\xC7/g,
   n: /\xF1/g,
   N: /\xD1/g
};

function highlight(element, errorClass, validClass) {
   $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}

function unhighlight(element, errorClass, validClass) {
   $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}


$.fn.extend({
   textFromUrn: function() {
      var normalize = $(this).val();

      if (!normalize) {
         return '';
      }


      console.log(this);
      normalize = $(this).textNotAccents(normalize);
      normalize = normalize.trim();
      normalize = normalize.replace(/\s\s+/g, ' ');
      normalize = normalize.split(' ').join('-').toLowerCase();

      return normalize;
   },
   textNotAccents: function(text) {
      var normalize = text;
      var regex = null;
      for (var char in globalAcentos) {
         regex = globalAcentos[char];
         normalize = normalize.replace(regex, char);
      }
      return normalize;
   }
});
