import json
data = '''{
"name": "Hudir",
"phone": {
  "type": "int1",
  "number": "+ 123 456 77"
}
}'''

info = json.loads(data)
print('Name:', info["name"])
print(info["phone"]["number"])