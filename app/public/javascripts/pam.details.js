jQuery(document).ready(function($) {
    var table={
        cols: ["Year", "Total emissions", "ETS sectors", "Non-ETS sectors"],
        rows: [
            {head: "2015", values:["2015_total_kt_CO2_equivalent_per_year", "2015_EU_ETS_kt_CO2", "2015_non_ETS_kt_CO2"]},
            {head: "2020", values:["2020_total_kt_CO2", "2020_EU_ETS_kt_CO2", "2020_non_ETS_kt_CO2"]},
            {head: "2025", values:["2025_total_kt_CO2", "2025_EU_ETS_kt_CO2", "2025_non_ETS_kt_CO2"]},
            {head: "2030", values:["2030_total_kt_CO2", "2030_EU_ETS_kt_CO2", "2030_non_ETS_kt_CO2"]}

        ]
    }
    jQuery("<p>").text("Annual savings [kt CO sub 2 equivalent per year]").insertAfter(jQuery(".section5_container h2"));
    jQuery("<p>").text("Annual savings [kt CO sub 2 equivalent per year]").insertAfter(jQuery(".section6_container h2"));
    jQuery(".section5_container table")
        .addClass("toremove");
    jQuery("<table>")
        .addClass("projected-table item_detail_table datatable")
        .insertAfter(".section5_container table");
    jQuery("<colgroup>")
        .appendTo(".projected-table");
    jQuery("<tbody>")
        .appendTo(".projected-table");
    jQuery("<tr>")
        .appendTo(".projected-table tbody");

    for (var idx = 0; idx < table.cols.length; idx++){
        jQuery("<th>")
            .text(table.cols[idx])
            .appendTo(".projected-table tbody tr");
        jQuery("<col>")
            .css("width", "25%")
            .appendTo(".projected-table colgroup");
    }
    for (var rowidx = 0; rowidx < table.rows.length; rowidx++){
        jQuery("<tr>")
            .addClass(table.rows[rowidx].head)
            .appendTo(".projected-table tbody");
        jQuery("<th>")
            .text(table.rows[rowidx].head)
            .appendTo("tr."+table.rows[rowidx].head);
        for (validx = 0; validx < table.rows[rowidx].values.length; validx++){
            jQuery("<td>")
                .text(jQuery(".section5_container table.toremove tr." + table.rows[rowidx].values[validx] + " td span.simple-value").text())
                .appendTo("tr."+table.rows[rowidx].head);
        }
    }
    jQuery(".toremove").remove();
});
