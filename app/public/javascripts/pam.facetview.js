function fixHeights(){
    $.each($("#facetview_results tbody tr td"), function (idx, elem){
        var newelem = $("<div class='eea-pam-element' title='"+$(elem).text()+"'>").append($(elem).html());
        $(elem).html("");
        $(elem).append(newelem);
    })
    return;
    $.each($(".eea-pam-element"), function(idx, elem){
        var full_text = $(elem).text();
        var min_length = 0;
        var max_length = $(elem).text().length;
        var middle = max_length;
        while (true){
            var visibleWidth = $(elem).width();
            var visibleHeight = $(elem).height();
            var scrollWidth = $(elem)[0].scrollWdith;
            var scrollHeight = $(elem)[0].scrollHeight;

            if ((scrollHeight > visibleHeight) || (scrollWidth > visibleWidth)){
                max_length = middle;
                middle = Math.floor((max_length + min_length) / 2);
                $(elem).text(full_text.substr(0, middle) + "...");
            }
            else {
                min_length = middle;
                if ($(elem).text().length === max_length){
                    break;
                }
                if (max_length - min_length < 3){
                    break;
                }
                middle = Math.floor((max_length + middle) / 2);
                $(elem).text(full_text.substr(0, middle) + "...");
            }
        }
    });
}

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

function removeMissingDetails(){
    $.each($(".details_link"), function(idx, link){
        href = $(link).attr("href");
        if ((href === undefined) || (href === "")){
            var tmp_text = $(link).text();
            var container = $(link).parent()
            $(container).text(tmp_text);
            $(link).remove();
        } else {
            $(link).attr("href", href.replace(/ /g, '_'));
        }
    });
}

function viewReady(){
    addHeaders("#facetview_results");
    replaceNumbers();
    fixDataTitles();
    removeMissingDetails();
    fixHeights();
}

jQuery(document).ready(function($) {
    var default_sort = [{}, {}];
    default_sort[0][field_base + 'Country'] = {"order": 'asc'};
    default_sort[1][field_base + 'ID_of_policy_or_measure'] = {"order": 'asc'};
    eea_facetview('.facet-view-simple',
        {
            default_sort: default_sort,
            search_url: './api',
            search_index: 'elasticsearch',
            datatype: 'json',
            initial_search: false,
            enable_rangeselect: true,
            enable_geoselect: true,
            post_init_callback: function() {
              add_EEA_settings();
            },
            post_search_callback: function() {
              add_EEA_settings();
              viewReady();
            },
            paging: {
                from: 0,
                size: 10
            }
        });
    replaceNumbers();
});
