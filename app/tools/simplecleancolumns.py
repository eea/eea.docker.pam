import csv
import xml.etree.ElementTree as ET

csvfile = open('PAM_2015_v5_merged_with_reportid.csv', 'r')
reader = csv.DictReader( csvfile)

rows = [row for row in reader]


for row in rows:

#    import pdb; pdb.set_trace()
    soi = row['Status of implementation']
    ips = row['Implementation period start']
    psi = row['Projection scenario in which the policy or measure is included']

    soi_clean = ""
    ips_clean = ""
    psi_clean = ""
    try:
        soi.index('See')
    except:
        soi_clean = soi[:1].upper() + soi[1:]

    try:
        ips.index('See')
    except:
        ips_clean = ips

    try:
        psi.index('See')
    except:
        psi_clean = psi
        if psi_clean == 'NIP':
            psi_clean = 'Not included in a projection scenario'

    row['Status_of_implementation_clean'] = soi_clean
    row['Implementation_period_start_clean'] = ips_clean
    row['Projection_scenario_in_which_the_policy_or_measure_is_included_clean'] = psi_clean

fieldnames = reader.fieldnames
fieldnames.append('Status_of_implementation_clean')
fieldnames.append('Implementation_period_start_clean')
fieldnames.append('Projection_scenario_in_which_the_policy_or_measure_is_included_clean')

if 1:
    csvfile_out = open('PAM_2015_v5_merged_with_reportid_cleaned_step1.csv', 'wb')
    writer = csv.DictWriter(csvfile_out, fieldnames = fieldnames)
    writer.writeheader()
    writer.writerows(rows)
