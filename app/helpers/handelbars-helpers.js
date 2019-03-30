const moment = require('moment')
module.exports.init = (hbs) => {
    hbs.registerHelper('select', function (text, options) {
        return options.fn(this).replace(new RegExp('value=\"' + text + '\"'), '$&selected="selected"');
    });

    hbs.registerHelper('formatDate', function (text, format) {
        return moment(text).format(format);
    });
}