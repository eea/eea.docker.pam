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
    "Single_policy_or_measure__or_group_of_measures"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "Type_of_policy_instrument"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Status_of_implementation"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "Impact_of_policy_or_measure___EU_ETS__outside_the_ETS__ESD__or_LULUCF_" : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Sector_s__affected"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Objective_s_"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Total_GHG_emissions_reductions_in_2020__kt_CO2_equivalent_per_year_"  : {
        "type" : "double"
    },
    "Total_GHG_emissions_reductions_in_2030__kt_CO2_equivalent_per_year_"  : {
        "type" : "double"
    },
    "Entities_responsible_for_implementing_the_policy__type_"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Implementation_period_start"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "Is_the_policy_or_measure_related_to_a_Union_policy_"  : {
        "type" : "string",
        "analyzer" : "none"
    },
    "Union_policy_which_resulted_in_the_implementation_of_the_policy_or_measure" : {
        "type" : "string",
        "analyzer" : "none"
    },
    "GHG_s__affected"  : {
        "type" : "string",
        "analyzer" : "coma"
    },
    "Projection_scenario_in_which_the_policy_or_measure_is_included"  : {
        "type" : "string",
        "analyzer" : "none"
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
