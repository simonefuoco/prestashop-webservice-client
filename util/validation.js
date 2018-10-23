/**
 * Validation module.
 * @module util/validation
 * @see module:util/validation
 */

/**
 * Check if arg is boolean.
 * @alias module:util/validation.isBool
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isBool = (arg) => {
    return (typeof arg === "string" && arg.match(/^(0|1)$/).length > 0) ||
        (typeof arg === "number" && arg.toString().match(/^(0|1)$/).length > 0);
};

/**
 * Check if arg is a floating-point value (between -3.4 × 10^38 and +3.4 × 10^38).
 * @alias module:util/validation.isFloat
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isFloat = (arg) => {
    return typeof arg === "number" && arg % 1 !== 0 && arg > -3.4e38 && arg < +3.4e38;
};

/**
 * Check if arg is a floating-point value (between 0 (included) and +3.4 × 10^38).
 * @alias module:util/validation.isUnsignedFloat
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isUnsignedFloat = (arg) => {
    return typeof arg === "number" && arg % 1 !== 0 && arg >= 0;
};

/**
 * Check if arg is integer between -2,147,483,648 and 2,147,483,647.
 * @alias module:util/validation.isInt
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isInt = (arg) => {
    return typeof arg === "number" && Number.isInteger(arg) && arg > -2147483648 && arg < 2147483647;
};

/**
 * Check if arg is unsigned integer between 0 (included) and 4,294,967,296
 * @alias module:util/validation.isUnsignedInt
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isUnsignedInt = (arg) => {
    return typeof arg === "number" && Number.isInteger(arg) && arg < 4294967296 && arg >= 0;
};

/**
 * Alias for isUnsignedInt
 * @alias module:util/validation.isUnsignedId
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isUnsignedId = (arg) => {
    return module.exports.isUnsignedInt(arg);
};

/**
 * Alias for isUnsignedId but accept null and undefined value.
 * @alias module:util/validation.isNullOrUnsignedId
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isNullOrUnsignedId = (arg) => {
    return module.exports.isUnsignedId(arg) || arg === null || arg === undefined;
};

/**
 * Check if arg is a valid product reference (/^[^<>;={}]*$/u).
 * @alias module:util/validation.isReference
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isReference = (arg, maxSize) => {
    return typeof arg === "string" && arg.match(/^[^<>;={}]*$/u).length > 0 && (maxSize ? [...arg].length <= maxSize : true);
};

/**
 * Check if arg is a valid product or category name. (/^[^<>;=#{}]*$/u)
 * @alias module:util/validation.isCatalogName
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isCatalogName = (arg, maxSize) => {
    return typeof arg === "string" && arg.match(/^[^<>;=#{}]*$/u).length > 0 && (maxSize ? [...arg].length <= maxSize : true);
};

/**
 * Check if arg is a valid standard name. (/^[^<>;=#{}]*$/u)
 * @alias module:util/validation.isGenericName
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isGenericName = (arg, maxSize) => {
    return typeof arg === "string" && arg.match(/^[^<>;=#{}]*$/u).length > 0 && (maxSize ? [...arg].length <= maxSize : true);
};

/**
 * Check if arg is a valid EAN13 barcode (/^[0-9]{0,13}$/).
 * @alias module:util/validation.isEan13
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isEan13 = (arg, maxSize) => {
    return (typeof arg === "string"  && arg.match(/^[0-9]{0,13}$/).length > 0 && (maxSize ? [...arg].length <= maxSize : true))
        || (typeof arg === "number" && arg.toString().match(/^[0-9]{0,13}$/).length > 0 && (maxSize ? [...arg.toString()].length <= maxSize : true));
};

/**
 * Check if arg is a valid ISBN.
 * @alias module:util/validation.isIsbn
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isIsbn = (arg, maxSize) => {
    return (typeof arg === "string"  && arg.match(/^[0-9-]{0,32}$/).length > 0 && (maxSize ? [...arg].length <= maxSize : true))
    || (typeof arg === "number" && arg.toString().match(/^[0-9-]{0,32}$/).length > 0 && (maxSize ? [...arg.toString()].length <= maxSize : true));
};

/**
 * Check if arg is a valid friendly URL. (/^[_a-zA-Z0-9\-]+$/)
 * @alias module:util/validation.isLinkRewrite
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isLinkRewrite = (arg, maxSize) => {
    return typeof arg === "string" && arg.match(/^[_a-zA-Z0-9\-]+$/).length > 0 && (maxSize ? [...arg].length <= maxSize : true);
};

/**
 * Check if arg is a valid UPC barcode (/^[0-9]{0,12}$/).
 * @alias module:util/validation.isUpc
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isUpc = (arg) => {
    return (typeof arg === "string"  && arg.match(/^[0-9]{0,12}$/).length > 0 && (maxSize ? [...arg].length <= maxSize : true))
    || (typeof arg === "number" && arg.toString().match(/^[0-9]{0,12}$/).length > 0 && (maxSize ? [...arg.toString()].length <= maxSize : true));
}

/**
 * Check if arg is a clean HTML and should not contain invalid HTML tags, nor XSS.
 * @alias module:util/validation.isCleanHtml
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isCleanHtml = (arg) => {
    let events = [
        'onmousedown',
        'onmousemove',
        'onmmouseup',
        'onmouseover',
        'onmouseout',
        'onload',
        'onunload',
        'onfocus',
        'onblur',
        'onchange',
        'onsubmit',
        'ondblclick',
        'onclick',
        'onkeydown',
        'onkeyup',
        'onkeypress',
        'onmouseenter',
        'onmouseleave',
        'onerror',
        'onselect',
        'onreset',
        'onabort',
        'ondragdrop',
        'onresize',
        'onactivate',
        'onafterprint',
        'onmoveend',
        'onafterupdate',
        'onbeforeactivate',
        'onbeforecopy',
        'onbeforecut',
        'onbeforedeactivate',
        'onbeforeeditfocus',
        'onbeforepaste',
        'onbeforeprint',
        'onbeforeunload',
        'onbeforeupdate',
        'onmove',
        'onbounce',
        'oncellchange',
        'oncontextmenu',
        'oncontrolselect',
        'oncopy',
        'oncut',
        'ondataavailable',
        'ondatasetchanged',
        'ondatasetcomplete',
        'ondeactivate',
        'ondrag',
        'ondragend',
        'ondragenter',
        'onmousewheel',
        'ondragleave',
        'ondragover',
        'ondragstart',
        'ondrop',
        'onerrorupdate',
        'onfilterchange',
        'onfinish',
        'onfocusin',
        'onfocusout',
        'onhashchange',
        'onhelp',
        'oninput',
        'onlosecapture',
        'onmessage',
        'onmouseup',
        'onmovestart',
        'onoffline',
        'ononline',
        'onpaste',
        'onpropertychange',
        'onreadystatechange',
        'onresizeend',
        'onresizestart',
        'onrowenter',
        'onrowexit',
        'onrowsdelete',
        'onrowsinserted',
        'onscroll',
        'onsearch',
        'onselectionchange',
        'onselectstart',
        'onstart',
        'onstop'
    ];
    return typeof arg === "string" &&
        (arg.match(/<[\s]*script/ims).length === null &&
        arg.match(/('.$events.')[\s]*=/ims).length === null &&
        arg.match(/.*script\:/ims).length === null && 
        arg.match(/<[\s]*(i?frame|form|input|embed|object)/ims).length === null);
};

/**
 * Check for product visibility.
 * @alias module:util/validation.isProductVisibility
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isProductVisibility = (arg) => {
    return typeof arg === "string" && arg.match(/^both|catalog|search|none$/i).length > 0;
};

/**
 * Check if arg is a string.
 * @alias module:util/validation.isString
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isString = (arg) => {
    return typeof arg === "string";
};

/**
 * Check if arg is a valid price.
 * @alias module:util/validation.isPrice
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isPrice = (arg) => {
    return (typeof arg === "string" && arg.match(/^[0-9]{1,10}(\.[0-9]{1,9})?$/).length > 0) ||
        (typeof arg === "number" && arg.toString.match(/^[0-9]{1,10}(\.[0-9]{1,9})?$/).length > 0);
};

/**
 * Check for date format.
 * @alias module:util/validation.isDateFormat
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isDateFormat = (arg) => {
    return typeof arg === "string" && arg.match(/^([0-9]{4})-((0?[0-9])|(1[0-2]))-((0?[0-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/).length > 0;
};

/**
 * Check for date validity.
 * @alias module:util/validation.isDate
 * @param {*} arg - The argument to check.
 * @return {boolean} Check value.
 */
module.exports.isDate = (arg) => {
    return typeof arg === "string" && arg.match(/^([0-9]{4})-((?:0?[0-9])|(?:1[0-2]))-((?:0?[0-9])|(?:[1-2][0-9])|(?:3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/).length > 0;
};

module.exports.isImageTypeName = (arg) => {};
module.exports.isName = (arg) => {};
module.exports.isTplName = (arg) => {};
module.exports.isAddress = (arg) => {};
module.exports.isCityName = (arg) => {};
module.exports.isCoordinate = (arg) => {};
module.exports.isMessage = (arg) => {};
module.exports.isPhoneNumber = (arg) => {};
module.exports.isPostCode = (arg) => {};
module.exports.isStateIsoCode = (arg) => {};
module.exports.isZipCodeFormat = (arg) => {};
module.exports.isAbsoluteUrl = (arg) => {};
module.exports.isDniLite = (arg) => {};
module.exports.isCarrierName = (arg) => {};
module.exports.isConfigName = (arg) => {};
module.exports.isUrl = (arg) => {};
module.exports.isSerializedArray = (arg) => {};

module.exports.isBirthDate = (arg) => {};

module.exports.isColor = (arg) => {};
module.exports.isEmail = (arg) => {};
module.exports.isImageSize = (arg) => {};
module.exports.isLanguageCode = (arg) => {};
module.exports.isLanguageIsoCode = (arg) => {};
module.exports.isMd5 = (arg) => {};
module.exports.isNumericIsoCode = (arg) => {};
module.exports.isPasswd = (arg) => {};
module.exports.isPasswdAdmin = (arg) => {};
module.exports.isPhpDateFormat = (arg) => {};
module.exports.isPriceDisplayMethod = (arg) => {};