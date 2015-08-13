/*
 * GET home page.
 */

var nconf = require('nconf');

var field_base = nconf.get("elastic:field_base");
var path = require('path');

var searchServer = require('eea-searchserver')

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

  searchServer.EEAFacetFramework.renderDetails({
    req:req,
    res:res,
    field_base:field_base,
    options:options
  });
};
