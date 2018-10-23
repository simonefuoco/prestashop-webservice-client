(async () => {
const requireJson = require('../util/requireJson');
const validatorsMap = await requireJson('../validators_mapping/language.json');

const validate = (validationArgs) => {
    validatorsMap[validationArgs.originPath].format(validationArgs.originValue, validatorsMap[validationArgs.originPath].maxSize);
};

module.exports["name"] = validate;
module.exports["iso_code"] = validate;
module.exports["locale"] = validate;
module.exports["language_code"] = validate;
module.exports["active"] = validate;
module.exports["is_rtl"] = validate;
module.exports["date_format_lite"] = validate;
module.exports["date_format_full"] = validate;

})();