// Analyzers to be used for different object properties
var analyzers = {
    "none" : {
      "type" : "keyword"
    },
    "coma" : {
      "type" : "pattern",
      "lowercase" : false,
      "pattern" : ", "
    },
    "semicolon" : {
      "type" : "pattern",
      "lowercase" : false,
      "pattern" : "; "
    }
};

// Proprety mappings for pamdata
// Describe how properties get indexed into ElasticSearch
var pamdataMappings = {
    "Country" : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Name_of_PaM"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "Single_or_group_of_PAMs"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "Type_of_policy_instrument"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Status_of_implementation"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Policy_impacting_EU_ETS_or_ESD"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Sectors_affected"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "GHG_emissions_reductions_2020_total_ktCO2"  : {
        "type" : "double"
    },
    "GHG_emissions_reductions_2030_total_kt_CO2"  : {
        "type" : "double"
    },
    "Objectives"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Type_of_responsible_Entity"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Implementation_start_year"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Related_Union_policy"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "GHG_afected"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Projection_scenario_in_which_PaM_is_included"  : {
        "type" : "string",
        "analyzer" : "coma"
    }
};

var mappings = {
    'settings': {
        'analysis': {
            'analyzer': analyzers
        }
    },
    'mappings': {
        'resources': {
            'properties': pamdataMappings
        }
    }
};

module.exports = { 'mappings': mappings };
