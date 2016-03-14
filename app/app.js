#!/usr/bin/env node

/**
 * Module dependencies.
 */

var path = require('path');
var searchServer = require('eea-searchserver');
var builtinRoutes = require('./routes/pam');
var managementCommands = searchServer.builtinCommands;

options = {
  app_dir: __dirname,
  views: __dirname + '/views',
  settingsFile: __dirname + '/config/settings.json',
  routes: {
    routes: builtinRoutes,
    detailsIdName: 'pamid'
  },
  indexing:{
    managementCommands: managementCommands,
    indexingFilterQuery: null,
    indexingQuery: 'config/query.sparql',
    extraAnalyzers: 'config/analyzers.json',
    dataMapping: 'config/dataMapping.json',
    endpoint: 'http://semantic.eea.europa.eu/sparql',
  }
}
searchServer.Helpers.SimpleStart(options)

exports.fieldsMapping = function(next){
    next(require(path.join(__dirname, "/config/mapping.json")));
}
