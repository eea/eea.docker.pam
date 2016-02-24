import csv
import xml.etree.ElementTree as ET
base_URL = 'http://cdr.eionet.europa.eu/Converters/run_conversion?file='
conversion_ID = '524'
source = 'remote'

csvfile = open('PAM_2015_v7_merged.csv', 'r')
reader = csv.DictReader( csvfile)

rows = [row for row in reader]


rows2 = []


for row in rows:

#    import pdb; pdb.set_trace()
    link = row['Link to national report']
    if link:
        pam_ID = row['ID of policy or measure']
        xml_PATH = link.split('http://cdr.eionet.europa.eu')[1].split("#")[0]
        reportID = "%s%s&conv=%s&source=%s#pam%s" %(base_URL, xml_PATH, conversion_ID, source, pam_ID)
        row['ReportID'] = reportID

fieldnames = reader.fieldnames
fieldnames.append('ReportID')

if 1:
    csvfile_out = open('PAM_2015_v7_merged_with_reportid.csv', 'wb')
    writer = csv.DictWriter(csvfile_out, fieldnames = fieldnames)
    writer.writeheader()
    writer.writerows(rows)
