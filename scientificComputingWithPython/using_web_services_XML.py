# Wire Protocol
# python Serialize  -> data -> De-Serialize java Hashmap


# XML Schema Contract

# Description of the legal format of an document

# XSD The W3C Schema specification for XML.

import xml.etree.ElementTree as ET
# data = '''<person>
#     <name>Hudir</name>
#     <phone type="intl">+ 49 1234567</phone>
#     <email hide="yes"/>
# </person>'''

# tree = ET.fromstring(data)
# print(tree)
# print('Name', tree.find('name').text)
# print('Attr', tree.find('email').get('hide'))

data2 = '''<data2>
<people>
    <person>
        <name>Hudir</name>
        <phone type="intl">+ 49 1234567</phone>
        <email hide="yes"/>
    </person>
    <person>
        <name>Hudir</name>
        <phone type="intl">+ 49 1234567</phone>
        <email hide="yes"/>
    </person>
</people>
</data2>'''

tree2 = ET.fromstring(data2)
lst = tree2.findall('people/person')
for item in lst:
    print('Phone', item.find('phone').text)
    print('Attr', item.find('email').get('hide'))
