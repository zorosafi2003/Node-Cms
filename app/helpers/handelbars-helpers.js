module.exports.init = (hbs) => {
    hbs.registerHelper('select', function (text, options) {
        return options.fn(this).replace(new RegExp('value=\"' + text + '\"'), '$&selected="selected"');
    });
}