// ### Navigation Helper
// `{{navigation}}`
// Outputs navigation menu of static urls

var _               = require('lodash'),
    errors          = require('../errors'),
    template        = require('./template'),
    navigation;

navigation = function (options) {
    /*jshint unused:false*/
    if (!_.isObject(this.nav) || _.isFunction(this.nav)) {
        return errors.logAndThrowError('navigation data is not an object or is a function');
    }

    if (this.nav.filter(function(e){
            return (_.isUndefined(e.label) || _.isUndefined(e.url));
        }).length > 0) {
        return errors.logAndThrowError('All values must be defined for label, url and current');
    }

    // check for non-null string values
    if (this.nav.filter(function(e){
        return ((!_.isNull(e.label) && !_.isString(e.label)) ||
        (!_.isNull(e.url) && !_.isString(e.url)));
    }).length > 0){
        return errors.logAndThrowError('Invalid value, Url and Label must be strings');
    }

    function _slugify(label) {
        return label.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    }

    var nav = this.nav.map(function(e){
        var out = {};
        out.labelSlug = _slugify(e.label);
        out.navUrl = e.url;
        out.label = e.label;
        return out
    })

    // TODO(marcos): check if nav.current needs to be defined/boolean, does it come from elsewhere?

    var context = _.merge({}, {"nav": nav});

    return template.execute('navigation', context);
};

module.exports = navigation;
