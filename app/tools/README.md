# Steps to be executed before importing csv in semantic#

1. Open the xls file in excel/opneoffice and rename all columns to not contain special characters. Replace the special characters with _, and save it as csv
2. Execute the mergecsvwithxml.py python script to update the "Name of policy or measure" column with values from the xml file (in the xls file only the first 255 characters are appearing)
3. Execute the addreportid.py script, to build the reportid column based on the "Link to national report" column
4. Execute the simplecleancolumns.py script for normalizing some values, and to exclude some specific values from facets.