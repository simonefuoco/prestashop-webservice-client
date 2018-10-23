const customizeTranslations = (customizerArgs) => {
    if (typeof customizerArgs.translations === "string") {
        return [{id: "", value: customizerArgs.originValue}];
    }
    return customizerArgs.originValue;
};

const customizeAssociationsWithOnlyId = (customizerArgs) => {
    if (!customizerArgs.originValue) {
        return [];
    }
    return customizerArgs.originValue.map((item) => item.id);
};

module.exports['delivery_in_stock'] = customizeTranslations;
module.exports['delivery_out_stock'] = customizeTranslations;
module.exports['meta_description'] = customizeTranslations;
module.exports['meta_keywords'] = customizeTranslations;
module.exports['meta_title'] = customizeTranslations;
module.exports['link_rewrite'] = customizeTranslations;
module.exports['name'] = customizeTranslations;
module.exports['description'] = customizeTranslations;
module.exports['description_short'] = customizeTranslations;
module.exports['available_now'] = customizeTranslations;
module.exports['available_later'] = customizeTranslations;

module.exports['associations.categories'] = customizeAssociationsWithOnlyId;
module.exports['associations.images'] = customizeAssociationsWithOnlyId;
module.exports['associations.combinations'] = customizeAssociationsWithOnlyId;
module.exports['associations.product_option_values'] = customizeAssociationsWithOnlyId;

module.exports['associations.product_features'] = (customizerArgs) => {
    if (!customizerArgs.originValue) {
        return [];
    }
    return customizerArgs.originValue.map((item) => {
        return {id: item.id, id_feature_value: item.id_feature_value};
    });
};

module.exports['associations.tags'] = customizeAssociationsWithOnlyId;

module.exports['associations.stock_availables'] = (customizerArgs) => {
    if (!customizerArgs.originValue) {
        return [];
    }
    return customizerArgs.originValue.map((item) => {
        return {id: item.id, id_product_attribute: item.id_product_attribute};
    });
};

module.exports['associations.accessories'] = customizeAssociationsWithOnlyId;

module.exports['associations.product_bundle'] = (customizeArgs) => {
    if (!customizerArgs.originValue) {
        return [];
    }
    return customizerArgs.originValue.map((item) => {
        return {id: item.id, quantity: item.quantity};
    });
};