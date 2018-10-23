//const parser = require('fast-xml-parser');
const validation = require('../util/validation');
const mapper = require('../util/mapper');

// const parserOptions = {
//     attributeNamePrefix : "@_",
//     attrNodeName: false,
//     textNodeName : "#text",
//     ignoreAttributes : false,
//     ignoreNameSpace : true,
//     trimValues: true
// };

const validationMap = {
    id_parent: validation.isUnsignedInt,
    active: validation.isBool,
    id_shop_default: validation.isUnsignedId,
    is_root_category: isBool,
    position: "",
    date_add: validation.isDate,
    date_upd: validation.isDate,
    name: validation.isCatalogName,
    link_rewrite: validation.isLinkRewrite,
    description: validation.isCleanHtml,
    meta_title: validation.isGenericName,
    meta_description: validation.isGenericName,
    meta_keywords: validation.isGenericName
};

function Category(languages) {

    this.languages = languages;

    this.id = "";
    this.id_parent = "";
    this.level_depth = "";
    this.nb_products_recursive = "";
    this.active = "";
    this.id_shop_default = "";
    this.is_root_category = "";
    this.position = "";
    this.date_add = "";
    this.date_upd = "";
    this.name = [];
    this.link_rewrite = [];
    this.description = [];
    this.meta_title = [];
    this.meta_description = [];
    this.meta_keywords = [];
    this.associations = {categories: [], products: []};
}

Category.prototype.toXML = function() {

    const self = this;

    const setLanguages = function(prop) {
        return self[prop].map((item) => {
            return `<language id="${item.id}">${item.translation}</language>`;
        });
    };

    const setAssociatedCategories = function() {
        return self.associations.categories.map((item) => {
            return `<category><id>${item}</id></category>`;
        });
    };

    const setAssociatedProducts = function() {
        return self.associations.products.map((item) => {
            return `<product><id>${item}</id></product>`;
        });
    };

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">`,
            `<category>`,
                `<id>${this.id}</id>`,
                `<id_parent>${this.id_parent}</id_parent>`,
                `<active>${this.active}</active>`,
                `<id_shop_default>${this.id_shop_default}</id_shop_default>`,
                `<is_root_category>${this.is_root_category}</is_root_category>`,
                `<position>${this.position}</position>`,
                `<date_add>${this.date_add}</date_add>`,
                `<date_upd>${this.date_upd}</date_upd>`,
                `<name>`, ...setLanguages('name'), `</name>`,
                `<link_rewrite>`, ...setLanguages('link_rewrite'), `</link_rewrite>`,
                `<description>`, ...setLanguages('description'), `</description>`,
                `<meta_title>`, ...setLanguages('meta_title'), `</meta_title>`,
                `<meta_description>`, ...setLanguages('meta_description'), `</meta_description>`,
                `<meta_keywords>`, ...setLanguages('meta_keywords'), `</meta_keywords>`,
                `<associations>`,
                    `<categories>`, ...setAssociatedCategories(), `</categories>`,
                    `<products>`, ...setAssociatedProducts(), `</products>`,
                `</associations>`,
            `</category>`,
        `</prestashop>`
    ].join('');
};

Category.prototype.toJSON = function() {
    const props = [
        "id",
        "id_parent",
        "level_depth",
        "nb_products_recursive",
        "active",
        "id_shop_default",
        "is_root_category",
        "position",
        "date_add",
        "date_upd",
        "name",
        "link_rewrite",
        "description",
        "meta_title",
        "meta_description",
        "meta_keywords",
        "associations"
    ];
    return JSON.stringify(this, (key, value) => key && props.includes(key) ? value : undefined);
};

Category.prototype.setXML = function(xml, parser, mapping) {
    mapper.fill(parser.parse(xml), this, mapping, (originPath, targetPath, originValue) => {
        //
    });
};

Category.prototype.setJSON = function(json, mapping) {
    mapper.fill(JSON.parse(json), this, mapping, (originPath, targetPath, originValue) => {
        //
    });
};

Category.prototype.setObject = function(obj, mapping) {
    mapper.fill(obj, this, mapping, (originPath, targetPath, originValue) => {
        //
    });
};

Category.prototype.readOnlyFields = [
    "level_depth",
    "nb_products_recursive"
];

Category.prototype.notFilterableFields = [
    "nb_products_recursive"
];

Category.prototype.requiredFields = [
    "active",
    "name",
    "link_rewrite"
];

module.exports = Category;

