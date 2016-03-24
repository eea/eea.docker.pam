/*
 * GET home page.
 */

var searchServer = require('eea-searchserver')
var nconf = require('nconf');
var _ = require('underscore');
var field_base = nconf.get("elastic:field_base");
var layout_vars = nconf.get("layout_vars");

if (typeof layout_vars === 'undefined') {
  layout_vars = {}
}

exports.index = function(req, res){
  var options = {title: 'PAM',
                field_base: field_base};

  options = _.extend(options, layout_vars);

  searchServer.EEAFacetFramework.render(req, res, 'index', options);
};

exports.details = function(req, res, id_name){
  if (req.query[id_name] === undefined){
      res.send(id_name + ' is missing');
      return;
  }

  var query = '{"query":{"bool":{"must":[{"term":{"'+field_base + 'PAMID":"'+req.query[id_name]+'"}}]}}}';
  query = encodeURIComponent(query);

  var host = "http://localhost:" + nconf.get('http:port');

  var options = {
    host: host + "/api",
    path: "?source="+ query,
    layout_vars: layout_vars
  };

  searchServer.EEAFacetFramework.renderDetails({
    req:req,
    res:res,
    field_base:field_base,
    options:options,
    error_fallback:function(tmp_options){
        tmp_options[id_name] = req.query[id_name];
        return(tmp_options);
    }
  });
};
