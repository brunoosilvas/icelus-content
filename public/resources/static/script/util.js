const STR_EMPTY = '';

var highlight = function(element, errorClass, validClass) {
   $(element).removeClass(validClass);
   $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}

var unhighlight = function(element, errorClass, validClass) {
   $(element).removeClass(this.settings.errorElementClass).removeClass(errorClass);
   $(element).addClass(validClass);
}

var unhighlightNone = function(element, errorClass, validClass) {
   $(element).removeClass(this.settings.errorElementClass).removeClass(errorClass);
   $(element).addClass('form-control');
}
