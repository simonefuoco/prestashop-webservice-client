const _ = require('lodash');

module.exports.fill = (args) => {

    let _mapping = null;
    if (typeof args.mapping === "string") {
        _mapping = JSON.parse(args.mapping);
    } else {
        _mapping = args.mapping;
    }

    args.customizerMap = args.customizerMap ? args.customizerMap : {};

    for (const originPath in _mapping) {
        if (_mapping.hasOwnProperty(originPath)) {

            let originValue = _.cloneDeepWith(_.get(args.origin, originPath));

            let customizerArgs = {
                originValue: originValue,
                ..._.cloneDeepWith(args.customizerArgs)
            };

            originValue = args.customizerMap[originPath] ? args.customizerMap[originPath](customizerArgs) : originValue;

            let validationArgs = {
                originPath: _.cloneDeepWith(originPath),
                originValue: originValue,
                ..._.cloneDeepWith(args.validationArgs)
            };
            
            if (args.validationMap && args.validationMap[originPath]) {
                if(args.validationMap[originPath](validationArgs)) {
                    _.setWith(target, _mapping[originPath], originValue);
                } else {
                    throw new Error("Mapper validation error");
                }
            } else {
                _.setWith(target, _mapping[originPath], originValue);
            }
        }
    }
};