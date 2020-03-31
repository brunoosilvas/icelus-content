

function highlight(element, errorClass, validClass) {
    $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}

function unhighlight(element, errorClass, validClass) {
    $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}