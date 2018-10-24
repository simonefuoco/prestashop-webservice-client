const request = require('request');
const httpBuildQuery = require('http-build-query');

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

module.exports = function(url_with_key) {
    this.post = async (opt) => {
        let url = buildUrl(url_with_key, opt);
        let body = opt['body'];
        let req = await exec({
            url: url,
            method: 'POST',
            headers: {
                Expect: '100-continue',
                'Content-Type': 'application/xml'
            },
            body: opt['output_format'] === 'JSON' ? JSON.stringify(body) : body
        });
        let {err, result} = opt['output_format'] === 'JSON' ? JSON.parse(req['response']) : req['response'];
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
            obj = req['response'];
        }
        return {
            status_code: req.status_code,
            response: obj,
            headers: req.headers
        };
    };
    this.head = async (opt) => {
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
        let url = buildUrl(url_with_key, opt);
        let xml = opt['body'];
        let req = await exec({
            url: url,
            method: 'PUT',
            headers: {
                Expect: '100-continue',
                'Content-Type': 'application/xml'
            },
            body: opt['output_format'] === 'JSON' ? JSON.stringify(body) : body
        });
        let {err, result} = opt['output_format'] === 'JSON' ? JSON.parse(req['response']) : req['response'];
        return {
            status_code: req.status_code,
            response: result,
            headers: req.headers
        };
    };
    this.delete = async (opt) => {
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