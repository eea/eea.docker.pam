#!/usr/bin/env python
import sys
import csv
import xml.etree.ElementTree as ET


def main(csv_input, csv_output):
    reader = csv.DictReader(csv_input)
    rows = [row for row in reader]
    for row in rows:
        soi = row.get('Status_of_implementation', '')
        ips = row.get('Implementation_period_start', '')
        psi = row.get('Projection_scenario_in_which_the_policy_or_measure_is_included', '')
        ipr = row.get('Is_the_policy_or_measure_related_to_a_Union policy_', '') or row.get('Is_the_policy_or_measure_related_to_a_Union_policy_', '')
        upl = row.get('Union_policy_lookup_only4facets', '') or row.get('Union_policies_lookup_only4facets', '')

        soi_clean = "No information"
        ips_clean = "No information"
        psi_clean = "No information"
        ipr_clean = "No information"
        upl_clean = "No information"

        if len(soi) > 0:
          soi_clean = soi[:1].upper() + soi[1:]

        if len(ips) > 0:
          ips_clean = ips

        if len(psi) > 0:
          psi_clean = psi
          if psi_clean == 'NIP':
              psi_clean = 'Not included in a projection scenario'

        if len(ipr) > 0:
            ipr_clean = ipr

        if len(upl) > 0:
            upl_clean = upl

        row['Status_of_implementation_clean'] = soi_clean
        row['Implementation_period_start_clean'] = ips_clean
        row['Projection_scenario_in_which_the_policy_or_measure_is_included_clean'] = psi_clean
        row['Is_the_policy_or_measure_related_to_a_Union_policy__clean'] = ipr_clean
        row['Union_policy_lookup_only4facets_clean'] = upl_clean

    fieldnames = reader.fieldnames
    fieldnames.append('Status_of_implementation_clean')
    fieldnames.append('Implementation_period_start_clean')
    fieldnames.append('Projection_scenario_in_which_the_policy_or_measure_is_included_clean')
    fieldnames.append('Is_the_policy_or_measure_related_to_a_Union_policy__clean')
    fieldnames.append('Union_policy_lookup_only4facets_clean')

    if 1:
        writer = csv.DictWriter(csv_output, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Clean columns')
    parser.add_argument('-i', '--input-csv', help='CSV input file', type=argparse.FileType('rU'),
                        default=sys.stdin)
    parser.add_argument('-o', '--output-csv', help='CSV output file', type=argparse.FileType('wb'),
                        default=sys.stdout)
    args = parser.parse_args(sys.argv[1:])
    main(
        csv_input=args.input_csv,
        csv_output=args.output_csv
    )
