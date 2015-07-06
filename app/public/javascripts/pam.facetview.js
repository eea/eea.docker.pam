function replaceNumbers(){
    var possibleContainers = ['a', 'td', 'th'];
    var chemsMapping = {'CH4':'CH<sub>4</sub>',
                        'CO2':'CO<sub>2</sub>',
                        'N2O':'N<sub>2</sub>O',
                        'SF6':'SF<sub>6</sub>'};
    jQuery.each(possibleContainers, function(idx, container){
        var elems = jQuery(container);
        jQuery.each(elems, function(idx, elem){
            if ((jQuery(elem).children().length === 0) || (container === 'a')){
                var shouldReplace = false;
                var replacedText = jQuery(elem).html();
                jQuery.each(chemsMapping, function(key, value){
                    if (replacedText.indexOf(key) !== -1){
                        replacedText = replacedText.replace(key, value);
                        shouldReplace = true;
                    }
                });
                if (shouldReplace){
                    jQuery(elem).html(replacedText);
                }
            }
        });
    });
}

function addHeaders(){
    $("#facetview_results").append("<thead><tr><th>Country</th><th>Link to EU Emissions Trading Scheme (ETS)</th><th>Targeted sectors</th><th>Name</th><th>Status</th><th>Projection scenario in which the PAM is included</th><th>Total GHG savings by 2020 (in kt CO2 equivalent)</th></tr></thead>");
}

function fixDataTitles(){
    var th_list = [];
    $("#facetview_results thead th").each(function(idx, th){
        th_list.push($(th).text());

    })
    $("#facetview_results tr").each(function(tr_idx, tr){
        $(tr).find("td").each(function(td_idx, td){
            $(td).attr("data-title", th_list[td_idx]);
        });
    });
}

function viewReady(){
    replaceNumbers();
    addHeaders();
    fixDataTitles();
}

jQuery(document).ready(function($) {
    $('.facet-view-simple').facetview({
        search_url: './api',
        search_index: 'elasticsearch',
        datatype: 'json',
        initial_search: false,
        enable_rangeselect: true,
        pushstate : true,
        rangefacets: [field_base + '2020_total_kt_CO2'],
        post_init_callback: function() {
          add_EEA_settings();
        },
        post_search_callback: function() {
          add_EEA_settings();
          viewReady();
        },

        facets: [
            {'field':field_base + 'Country', 'display': 'Country', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Link_to_EU_Emissions_Trading_Scheme_ETS', 'display': 'Link to EU Emissions Trading Scheme (ETS)', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Targeted_sectors', 'display': 'Targeted sectors', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Affected_GHG', 'display': 'Affected GHG', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Status', 'display': 'Status', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Projection_scenario_in_which_the_PAM_is_included', 'display': 'Projection scenario in which the PAM is included', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Type_of_instrument', 'display': 'Type of instrument', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Related_EU_policies', 'display': 'Related EU Policies', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + 'Type_of_implementing_entities', 'display': 'Type of implementing entities', 'size':'50', 'order': 'term','facet_display_options': ['sort', 'checkbox']},
            {'field':field_base + '2020_total_kt_CO2', 'display': 'Total GHG savings by 2020 (in kt CO2 equivalent)', 'size':'1600', 'order': 'term','facet_display_options': ['sort', 'checkbox']}
        ],


        result_display: [
            [
                {
                    'field': field_base + "Country",
                    'post': '</td>'
                },
                {
                    'pre': '<td>',
                    'field': field_base + "Link_to_EU_Emissions_Trading_Scheme_ETS",
                    'post': '</td>'
                },
                {
                    'pre': '<td>',
                    'field': field_base + "Targeted_sectors",
                    'post': '</td>'
                },
                {
                    'pre': '<td><a href="./details?pamid=',
                    'field':field_base + 'PAMID',
                    'post': '">'
                },

                {
                    'field': field_base + "Name",
                    'post': '</a></td>'
                },
                {
                    'pre': '<td>',
                    'field':field_base + 'Status',
                    'post': '</td>'
                },

                {
                    'pre': '<td>',
                    'field': field_base + "Projection_scenario_in_which_the_PAM_is_included",
                    'post': '</td>'
                },
                {
                    'pre': '<td>',
                    'field':field_base + '2020_total_kt_CO2'
                }
            ]
        ],

        paging: {
            from: 0,
            size: 10
        },
        linkify: false,
        pager_on_top: true


    });
    replaceNumbers();

/*    $('[id="' + field_base + '2020_total_kt_CO2"]').closest(".facetview_filter").addClass("facet_range_only");

    $(".facet_range_only").delegate(".facetview_showtree", "click", function(event){
        var tmp_facet = $(event.target).closest(".facetview_filter");
        tmp_facet.find("a.facetview_facetrange").click();
    });*/
});
