import csv
import xml.etree.ElementTree as ET

csvfile = open('PAM_2015_v8_merged_with_reportid.csv', 'r')
reader = csv.DictReader( csvfile)

rows = [row for row in reader]


for row in rows:

#    import pdb; pdb.set_trace()
    soi = row['Status of implementation']
    ips = row['Implementation period start']
    psi = row['Projection scenario in which the policy or measure is included']
    ipr = row['Is the policy or measure related to a Union policy_']
    upl = row['Union_policy_lookup_only4facets']

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
    csvfile_out = open('PAM_2015_v8_merged_with_reportid_cleaned_step1.csv', 'wb')
    writer = csv.DictWriter(csvfile_out, fieldnames = fieldnames)
    writer.writeheader()
    writer.writerows(rows)
