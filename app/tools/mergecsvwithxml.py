import csv
import xml.etree.ElementTree as ET

csvfile = open('PAM_2015_v5.csv', 'r')
reader = csv.DictReader( csvfile)

tree = ET.parse('1-PAMs-Viewer-Flat-file.xml')
root = tree.getroot()

rows = [row for row in reader]

descriptions_simple = []
descriptions_multi = []
descriptions_missing = []

rowcount = 0
for row in rows:
    sd = row['Short description']
    if len(sd) > 254:
        sd = ''.join(sd.split("_x000D_"))
        description = {}
        description['csv_row_id'] = rowcount
        description['fromcsv'] = sd
        description['fromxml'] = []
        count = 0;
        for xmlelem in root:
            newdesc = ''
            title = ''
            for elem in xmlelem.getchildren():
                if elem.tag == "Description":
                    newdesc = elem.text.encode('UTF-8')

                if elem.tag == "Title":
                    title = elem.text.encode('UTF-8')

            csv_title = row['Name of policy or measure']
            if csv_title == title:
                try:
                    if newdesc.index(sd) == 0:
                        if newdesc not in (description['fromxml']):
                            description['fromxml'].append(newdesc)
                            count += 1
                except:
                    pass

        if count == 1:
            descriptions_simple.append(description)
        if count > 1:
            descriptions_multi.append(description)

        if count == 0:
            for xmlelem in root:
                newdesc = ''
                title = ''
                for elem in xmlelem.getchildren():
                    if elem.tag == "Description":
                        newdesc = elem.text.encode('UTF-8')

                    if elem.tag == "Title":
                        title = elem.text.encode('UTF-8')

                csv_title = row['Name of policy or measure']
                if csv_title in title and title.index(csv_title) == 0:
                    try:
                        if newdesc.index(sd) == 0:
                            if newdesc not in (description['fromxml']):
                                description['fromxml'].append(newdesc)
                                count += 1
                    except:
                        pass

            descriptions_simple.append(description)

    rowcount+=1

rowcount = 0
for row in rows:
    for description_row in descriptions_simple:
        if rowcount == description_row['csv_row_id']:
            row['Short description'] = description_row['fromxml'][0]
    rowcount += 1

csvfile_out = open('PAM_2015_v5_merged.csv', 'wb')
writer = csv.DictWriter(csvfile_out, fieldnames=reader.fieldnames)
writer.writeheader()
writer.writerows(rows)

