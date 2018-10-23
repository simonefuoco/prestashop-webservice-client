const mapper = require('../util/mapper');
const validationMap = require('../validators/product');
const customizerMap = require('../customizers/product');

function Product(languages) {

    this.languages = languages;

    this.id = "";
    this.id_manufacturer = "";
    this.id_supplier = "";
    this.id_category_default = "";
    this.new = "";
    this.cache_default_attribute = "";
    this.id_default_image = "";
    this.id_default_combination = "";
    this.id_tax_rules_group = "";
    this.position_in_category = "";
    this.manufacturer_name = "";
    this.quantity = "";
    this.type = "";
    this.id_shop_default = "";
    this.reference = "";
    this.supplier_reference = "";
    this.location = "";
    this.width = "";
    this.height = "";
    this.depth = "";
    this.weight = "";
    this.quantity_discount = "";
    this.ean13 = "";
    this.isbn = "";
    this.upc = "";
    this.cache_is_pack = "";
    this.cache_has_attachments = "";
    this.is_virtual = "";
    this.state = "";
    this.additional_delivery_times = "";
    this.delivery_in_stock = [];
    this.delivery_out_stock = [];
    this.on_sale = "";
    this.online_only = "";
    this.ecotax = "";
    this.minimal_quantity = "";
    this.low_stock_threshold = "";
    this.low_stock_alert = "";
    this.price = "";
    this.wholesale_price = "";
    this.unity = "";
    this.unit_price_ratio = "";
    this.additional_shipping_cost = "";
    this.customizable = "";
    this.text_fields = "";
    this.uploadable_files = "";
    this.active = "";
    this.redirect_type = "";
    this.id_type_redirected = "";
    this.available_for_order = "";
    this.available_date = "";
    this.show_condition = "";
    this.condition = "";
    this.show_price = "";
    this.indexed = "";
    this.visibility = "";
    this.advanced_stock_management = "";
    this.date_add = "";
    this.date_upd = "";
    this.pack_stock_type = "";
    this.meta_description = [];
    this.meta_keywords = [];
    this.meta_title = [];
    this.link_rewrite = [];
    this.name = [];
    this.description = [];
    this.description_short = [];
    this.available_now = [];
    this.available_later = [];

    this.associations = {
        categories: [],
        images: [],
        combinations: [],
        product_option_values: [],
        product_features: [],
        tags: [],
        stock_availables: [],
        accessories: [],
        product_bundle: []
    };
}

Product.prototype.toPrestaShopXML = function() {

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

    const setAssociatedImages = function() {
        return self.associations.images.map((item) => {
            return `<image><id>${item}</id></image>`;
        });
    };

    const setAssociatedCombinations = function() {
        return self.associations.combinations.map((item) => {
            return `<combination><id>${item}</id></combination>`;
        });
    };

    const setAssociatedProductOptionValues = function() {
        return self.associations.product_option_value.map((item) => {
            return `<product_option_value><id>${item}</id></product_option_value>`;
        });
    };

    const setAssociatedProductFeatures = function() {
        return self.associations.product_features.map((item) => {
            return `<product_feature><id>${item.id}</id><id_feature_value>${item.id_feature_value}</id_feature_value></product_feature>`;
        });
    };

    const setAssociatedTags = function() {
        return self.associations.tags.map((item) => {
            return `<tag><id>${item}</id></tag>`;
        });
    };

    const setAssociatedStockAvailables = function() {
        return self.associations.stock_availables.map((item) => {
            return `<stock_available><id>${item.id}</id><id_product_attribute>${item.id_product_attribute}</id_product_attribute></stock_available>`;
        });
    };

    const setAssociatedAccessories = function() {
        return self.associations.accessories.map((item) => {
            return `<product><id>${item}</id></product>`;
        });
    };

    const setAssociatedProductBundle = function() {
        return self.associations.product_bundle.map((item) => {
            return `<product><id>${item.id}</id><quantity>${item.quantity}</quantity></product>`;
        });
    };

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">`,
        `<product>`,
            `<id>${this.id}</id>`,
            `<id_manufacturer>${this.id_manufacturer}</id_manufacturer>`,,
            `<id_supplier>${this.id_supplier}</id_supplier>`,
            `<id_category_default>${this.id_category_default}</id_category_default>`,
            `<new>${this.new}</new>`,
            `<cache_default_attribute>${this.cache_default_attribute}</cache_default_attribute>`,
            `<id_default_image>${this.id_default_image}</id_default_image>`,
            `<id_default_combination>${this.id_default_combination}</id_default_combination>`,
            `<id_tax_rules_group>${this.id_tax_rules_group}</id_tax_rules_group>`,
            `<position_in_category>${this.position_in_category}</position_in_category>`,
            `<type>${this.type}</type>`,
            `<id_shop_default>${this.id_shop_default}</id_shop_default>`,
            `<reference>${this.reference}</reference>`,
            `<supplier_reference>${this.supplier_reference}</supplier_reference>`,
            `<location>${this.location}</location>`,
            `<width>${this.width}</width>`,
            `<height>${this.height}</height>`,
            `<depth>${this.depth}</depth>`,
            `<weight>${this.weight}</weight>`,
            `<quantity_discount>${this.quantity_discount}</quantity_discount>`,
            `<ean13>${this.ean13}</ean13>`,
            `<isbn>${this.isbn}</isbn>`,
            `<upc>${this.upc}</upc>`,
            `<cache_is_pack>${this.cache_is_pack}</cache_is_pack>`,
            `<cache_has_attachments>${this.cache_has_attachments}</cache_has_attachments>`,
            `<is_virtual>${this.is_virtual}</is_virtual>`,
            `<state>${this.state}</state>`,
            `<additional_delivery_times>${this.additional_delivery_times}</additional_delivery_times>`,
            `<delivery_in_stock>`, ...setLanguages('delivery_in_stock'), `</delivery_in_stock>`,
            `<delivery_out_stock>`, ...setLanguages('delivery_out_stock'), `</delivery_out_stock>`,
            `<on_sale>${this.on_sale}</on_sale>`,
            `<online_only>${this.online_only}</online_only>`,
            `<ecotax>${this.ecotax}</ecotax>`,
            `<minimal_quantity>${this.minimal_quantity}</minimal_quantity>`,
            `<low_stock_threshold>${this.low_stock_threshold}</low_stock_threshold>`,
            `<low_stock_alert>${this.low_stock_alert}</low_stock_alert>`,
            `<price>${this.price}</price>`,
            `<wholesale_price>${this.wholesale_price}</wholesale_price>`,
            `<unity>${this.unity}</unity>`,
            `<unit_price_ratio>${this.unit_price_ratio}</unit_price_ratio>`,
            `<additional_shipping_cost>${this.additional_shipping_cost}</additional_shipping_cost>`,
            `<customizable>${this.customizable}</customizable>`,
            `<text_fields>${this.text_fields}</text_fields>`,
            `<uploadable_files>${this.uploadable_files}</uploadable_files>`,
            `<active>${this.active}</active>`,
            `<redirect_type>${this.redirect_type}</redirect_type>`,
            `<id_type_redirected>${this.id_type_redirected}</id_type_redirected>`,
            `<available_for_order>${this.available_for_order}</available_for_order>`,
            `<available_date>${this.available_date}</available_date>`,
            `<show_condition>${this.show_condition}</show_condition>`,
            `<condition>${this.condition}</condition>`,
            `<show_price>${this.show_price}</show_price>`,
            `<indexed>${this.indexed}</indexed>`,
            `<visibility>${this.visibility}</visibility>`,
            `<advanced_stock_management>${this.advanced_stock_management}</advanced_stock_management>`,
            `<date_add>${this.date_add}</date_add>`,
            `<date_upd>${this.date_upd}</date_upd>`,
            `<pack_stock_type>${this.pack_stock_type}</pack_stock_type>`,
            `<meta_description>`, ...setLanguages('meta-description'), `</meta_description>`,
            `<meta_keywords>`, ...setLanguages('meta-keywords'), `</meta_keywords>`,
            `<meta_title>`, ...setLanguages('meta-title'), `</meta_title>`,
            `<link_rewrite>`, ...setLanguages('link-rewrite'), `</link_rewrite>`,
            `<name>`, ...setLanguages('name'), `</name>`,
            `<description>`, ...setLanguages('description'), `</description>`,
            `<description_short>`, ...setLanguages('description_short'), `</description_short>`,
            `<available_now>`, ...setLanguages('available_now'), `</available_now>`,
            `<available_later>`, ...setLanguages('available_later'), `</available_later>`,
            `<associations>`
                `<categories>`, ...setAssociatedCategories(), `</categories>`,
                `<images>`, ...setAssociatedImages(), `</images>`,
                `<combinations>`, ...setAssociatedCombinations(), `</combinations>`,
                `<product_option_values>`, ...setAssociatedProductOptionValues(), `</product_option_values>`,
                `<product_features>`, ...setAssociatedProductFeatures(), `</product_features>`,
                `<tags>`, ...setAssociatedTags(), `</tags>`,
                `<stock_availables>`, ...setAssociatedStockAvailables(), `</stock_availables>`,
                `<accessories>`, ...setAssociatedAccessories(), `</accessories>`,
                `<product_bundle>`, ...setAssociatedProductBundle(), `</product_bundle>`,
            `</associations>`
        `</product>`,
    `</prestashop>`
    ].join('');
};

Product.prototype.toJSON = function() {
    const props = [
        "id",
        "id_manufacturer",
        "id_supplier",
        "id_category_default",
        "new",
        "cache_default_attribute",
        "id_default_image",
        "id_default_combination",
        "id_tax_rules_group",
        "position_in_category",
        "manufacturer_name",
        "quantity",
        "type",
        "id_shop_default",
        "reference",
        "supplier_reference",
        "location",
        "width",
        "height",
        "depth",
        "weight",
        "quantity_discount",
        "ean13",
        "isbn",
        "upc",
        "cache_is_pack",
        "cache_has_attachments",
        "is_virtual",
        "state",
        "additional_delivery_times",
        "delivery_in_stock",
        "delivery_out_stock",
        "on_sale",
        "online_only",
        "ecotax",
        "minimal_quantity",
        "low_stock_threshold",
        "low_stock_alert",
        "price",
        "wholesale_price",
        "unity",
        "unit_price_ratio",
        "additional_shipping_cost",
        "customizable",
        "text_fields",
        "uploadable_files",
        "active",
        "redirect_type",
        "id_type_redirected",
        "available_for_order",
        "available_date",
        "show_condition",
        "condition",
        "show_price",
        "indexed",
        "visibility",
        "advanced_stock_management",
        "date_add",
        "date_upd",
        "pack_stock_type",
        "meta_description",
        "meta_keywords",
        "meta_title",
        "link_rewrite",
        "name",
        "description",
        "description_short",
        "available_now",
        "available_later",
        "associations"
    ];
    return JSON.stringify(this, (key, value) => key && props.includes(key) ? value : undefined);
};

Product.prototype.setXML = function(xml, parser, mapping) {
    const args = {
        origin: parser.parse(xml),
        target: this,
        mapping: mapping,
        validationMap: validationMap,
        customizerMap: customizerMap
    };
    mapper.fill(args);
};

Product.prototype.setJSON = function(json, mapping) {
    const args = {
        origin: JSON.parse(json),
        target: this,
        mapping: mapping,
        validationMap: validationMap,
        customizerMap: customizerMap
    };
    mapper.fill(args);
};

Product.prototype.setObject = function(obj, mapping) {
    const args = {
        origin: obj,
        target: this,
        mapping: mapping,
        validationMap: validationMap,
        customizerMap: customizerMap
    };
    mapper.fill(args);
};

Product.prototype.readOnlyFields = [
    "manufacturer_name",
    "quantity"
];

Product.prototype.notFilterableFields = [
    "id_default_image",
    "id_default_combination",
    "position_in_category",
    "manufacturer_name",
    "quantity",
    "type"
];

Product.prototype.requiredFields = [
    "price"
];

module.exports = Product;