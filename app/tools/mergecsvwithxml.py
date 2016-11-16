#!/usr/bin/env python
import sys
import csv
from xml.etree import ElementTree as ET



def main(csv_input, xml_input, csv_output):
    reader = csv.DictReader(csv_input, dialect=csv.excel_tab)

    parser = ET.XMLParser(encoding="utf-8")
    tree = ET.parse(xml_input, parser)
    root = tree.getroot()

    rows = [row for row in reader]

    descriptions_simple = []
    descriptions_multi = []
    descriptions_missing = []

    rowcount = 0
    for row in rows:
        sd = row['Description']
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

        rowcount += 1

    rowcount = 0
    for row in rows:
        for description_row in descriptions_simple:
            if rowcount == description_row['csv_row_id']:
                if len(description_row['fromxml']) != 0:
                  row['Description'] = description_row['fromxml'][0]
        rowcount += 1
    writer = csv.DictWriter(csv_output, fieldnames=reader.fieldnames)
    writer.writeheader()
    writer.writerows(rows)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Merge XML and CSV files')
    parser.add_argument('-i', '--input-xml', help='XML input file', type=argparse.FileType('rU'))
    parser.add_argument('-I', '--input-csv', help='CSV input file', type=argparse.FileType('rU'))
    parser.add_argument('-o', '--output-csv', help='CSV output file', type=argparse.FileType('wb'),
                        default=sys.stdout)
    args = parser.parse_args(sys.argv[1:])
    main(args.input_xml, args.input_csv, args.output_csv)
