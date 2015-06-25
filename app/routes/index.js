/*
 * GET home page.
 */

var nconf = require('nconf');

var field_base = nconf.get("elastic:field_base");
var path = require('path');

var searchServer = require('eea-searchserver')

var mapping = require("../mapping.json");
var fieldsMapping = mapping.details_mapping;

exports.index = function(req, res){
  var options = {title: 'PAM',
                field_base: field_base};

  searchServer.EEAFacetFramework.render(req, res, 'index', options);
};

exports.details = function(req, res){

  if (req.query.pamid === undefined){
      res.send('pamid is missing');
      return;
  }

  var request = require('request');

  var query = '{"query":{"bool":{"must":[{"term":{"'+field_base + 'PAMID":"'+req.query.pamid+'"}}]}}}';
  query = encodeURIComponent(query);

  var host = "http://localhost:" + nconf.get('http:port');

  var options = {
    host: host + "/api",
    path: "?source="+ query
  };
  request(options.host + options.path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        try{
            var data = JSON.parse(body);
            tmp_resultobj = {};
            tmp_resultobj["records"] = [];

            for ( var item = 0; item < data.hits.hits.length; item++ ) {
                tmp_resultobj["records"].push(data.hits.hits[item]._source);
                tmp_resultobj["records"][tmp_resultobj["records"].length - 1]._id = data.hits.hits[item]._id;
            }
            resultobj = {};
            for (var idx = 0; idx < fieldsMapping.length; idx++) {
                resultobj[fieldsMapping[idx]['name']] = {'label':fieldsMapping[idx]['title'],
                                                    'value':tmp_resultobj["records"][0][field_base + fieldsMapping[idx]['field']]};
            }
            var options = {data: resultobj,
                    field_base: field_base};
            searchServer.EEAFacetFramework.render(req, res, 'details', options);
        }
        catch(err){
            var options = {data:'',
                    field_base: field_base,
                    pamid: req.query.pamid};
            searchServer.EEAFacetFramework.render(req, res, 'details', options);
        }

    }
    else {
        if (!error && response.statusCode !== 200){
            console.log(response.statusCode);
        }
        else {
            console.log(error);
        }
    }
  });

};
