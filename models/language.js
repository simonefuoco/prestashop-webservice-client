const mapper = require('../util/mapper');
const validationMap = require('../validators/language');

function Language() {
    this.id = "";
    this.name = "";
    this.iso_code = "";
    this.locale = "";
    this.language_code = "";
    this.active = "";
    this.is_rtl = "";
    this.date_format_lite = "";
    this.date_format_full = "";
}

Language.prototype.toPrestaShopXML = function() {
    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">`,
            `<language>`,
                `<id>${this.id}</id>`,
                `<name>${this.name}</name>`,
                `<iso_code>${this.iso_code}</iso_code>`,
                `<locale>${this.locale}</locale>`,
                `<language_code>${this.language_code}</language_code>`,
                `<active>${this.active}</active>`,
                `<is_rtl>${this.is_rtl}</is_rtl>`,
                `<date_format_lite>${this.date_format_lite}</date_format_lite>`,
                `<date_format_full>${this.date_format_full}</date_format_full>`,
            `</language>`,
        `</prestashop>`
    ].join('');
};

Language.prototype.toJSON = function() {
    const props = [
        "id",
        "name",
        "iso_code",
        "locale",
        "language_code",
        "active",
        "is_rtl",
        "date_format_lite",
        "date_format_full"
    ];
    return JSON.stringify(this, (key, value) => key && props.includes(key) ? value : undefined);
};

Language.prototype.setXML = function(xml, parser, mapping) {
    const args = {
        origin: parser.parse(xml),
        target: this,
        mapping: mapping,
        validationMap: validationMap
    };
    mapper.fill(args);
};

Language.prototype.setJSON = function(json, mapping) {
    const args = {
        origin: JSON.parse(json),
        target: this,
        mapping: mapping,
        validationMap: validationMap
    };
    mapper.fill(args);
};

Language.prototype.setObject = function(obj, mapping) {
    const args = {
        origin: obj,
        target: this,
        mapping: mapping,
        validationMap: validationMap
    };
    mapper.fill(args);
};

Language.prototype.readOnlyFields = [];

Language.prototype.notFilterableFields = [];

Language.prototype.requiredFields = [
    "name",
    "iso_code",
    "date_format_lite",
    "date_format_full"
];

module.exports = Language;