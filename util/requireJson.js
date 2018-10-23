const util = require('util');
const fs = require('fs');

module.exports = async (path) => {
    let data = await util.promisify(fs.readFile)(require.resolve(path));
    data = JSON.parse(data);
    return data;
};
