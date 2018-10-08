const request = require('request');
const xml2js = require('xml2js');
const httpBuildQuery = require('http-build-query');

const parser = new xml2js.Parser({
    trim: true,
    normalize: true,
    normalizeTags: true,
    async: true
});

const builder = new xml2js.Builder({
    cdata: true
});

const parseStringAsync = async (xml) => {
    return new Promise((resolve) => {
        parser.parseString(xml, (err, result) => {
            resolve({err, result});
        });
    });
};
const params = ['filter', 'display', 'sort', 'limit', 'output_format', 'schema', 'id_shop', 'id_group_shop'];

const req = (opt) => {
    return new Promise((resolve) => {
        request(opt, (err, res, body) => {
            resolve({
                err: err,
                res: res,
                body: body
            });
        });
    });
};

const exec = async (opt) => {
    let {err, res, body} = await req(opt);
    if(err) return {status_code: 500, response: null, headers: null}
    return {
        status_code: res.statusCode,
        response: body,
        headers: res.headers
    };
};

const buildQuery = (opt) => {
    let url_params = {};
    let query = '';
    for(let param of params) {
        for(let [key, value] of Object.entries(opt)) {
            if(key === param || key.includes(param)) {
                url_params[key] = opt[key];
            }
        }
    }
    if(Object.entries(url_params).length > 0) {
        query = `?${httpBuildQuery(url_params)}`;
    }
    return query;
};

const buildRoute = (url_with_key, opt) => {
    let route = `${url_with_key}/api/${opt['resource']}`;
    if(opt['id']) route = `${route}/${opt['id']}`;
    return route;
};

const buildUrl = (url_with_key, opt) => {
    let route = buildRoute(url_with_key, opt);
    let query = buildQuery(opt);
    url = `${route}${query}`;
    return url;
};

const deleteWrongOption = (opt) => {
    delete opt['output_format'];
};

const deleteReadOnlyField = (resourceSynopsis, resourceValue) => {
    resource = JSON.parse(JSON.stringify(resourceValue));
    for (const [key, value] of Object.entries(resourceSynopsis[0])) {
        if (value && value[0] && value[0]['$'] && (value[0]['$']['read_only'] || value[0]['$']['readOnly'])) {
            delete resource[0][key];
        }
    }
    return JSON.parse(JSON.stringify(resource));
};

module.exports = function(url_with_key) {
    this.post = async (opt) => {
        deleteWrongOption(opt);
        let url = buildUrl(url_with_key, opt);
        let xml = opt['postXml'];
        xml = builder.buildObject(xml);
        let req = await exec({
            url: url,
            method: 'POST',
            headers: {
                Expect: '100-continue',
                'Content-Type': 'application/xml'
            },
            body: xml
        });
        let {err, result} = await parseStringAsync(req['response']);
        return {
            status_code: req.status_code,
            response: result,
            headers: req.headers
        };
    };
    this.get = async (opt) => {
        let url = buildUrl(url_with_key, opt);
        let req = await exec({
            url: url,
            method: 'GET',
            headers: {
                Expect: '100-continue'
            }
        });
        let obj = null;
        if(opt['output_format'] === 'JSON')
        {
            obj = JSON.parse(req['response']);
        }
        else 
        {
            let {err, result} = await parseStringAsync(req['response']);
            obj = result;
        }
        return {
            status_code: req.status_code,
            response: obj,
            headers: req.headers
        };
    };
    this.getPostSchema = async(opt) => {
        deleteWrongOption(opt);
        opt.schema = 'blank';
        return this.get(opt);
    };
    this.getPutSchema = async(opt) => {
        deleteWrongOption(opt);
        opt.schema = 'synopsis';
        const id = opt.id;
        delete opt.id;
        var {status_code, response, headers} = await this.get(opt);
        let synopsis = response;
        delete opt.schema;
        opt.id = id;
        var {status_code, response, headers} = await this.get(opt);
        response.prestashop.category = deleteReadOnlyField(synopsis.prestashop.category, response.prestashop.category);
        return {
            status_code: status_code,
            response: response,
            headers: headers
        };
    };
    this.head = async (opt) => {
        deleteWrongOption(opt);
        let url = buildUrl(url_with_key, opt);
        let req = await exec({
            url: url,
            method: 'HEAD',
            headers: {
                Expect: '100-continue'
            }
        });
        return {
            status_code: req.status_code,
            response: req.response,
            headers: req.headers
        };
    };
    this.put = async (opt) => {
        deleteWrongOption(opt);
        let url = buildUrl(url_with_key, opt);
        let xml = opt['putXml'];
        xml = builder.buildObject(xml);
        let req = await exec({
            url: url,
            method: 'PUT',
            headers: {
                Expect: '100-continue',
                'Content-Type': 'application/xml'
            },
            body: xml
        });
        let {err, result} = await parseStringAsync(req['response']);
        return {
            status_code: req.status_code,
            response: result,
            headers: req.headers
        };
    };
    this.delete = async (opt) => {
        deleteWrongOption(opt);
        let url = buildUrl(url_with_key, opt);
        let req = await exec({
            url: url,
            method: 'DELETE',
            headers: {
                Expect: '100-continue'
            }
        });
        return {
            status_code: req.status_code,
            response: req.response,
            headers: req.headers
        };
    };
}