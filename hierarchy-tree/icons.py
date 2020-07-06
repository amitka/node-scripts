import os
import json

all_data = []
output_file = "icons.json"
basepath = '\\\\Icons'
for root, subdirs, files in os.walk(basepath):
    for filename in files:
        filepath = os.path.join(root, filename)
        ext = os.path.splitext(filepath)[-1].lower()
        if (ext=='.svg'):
            data = {}
            data['key'] = filepath[len(basepath):] # remove basepath from full path
            data['name'] = filename[:-4] # remove 4 last digits '.svg' from the filename
            with open(filepath, 'r') as f:
                f_content = f.read()
                data['svg'] = f_content
            #print(filepath)
            all_data.append(data)

with open(output_file, 'w') as json_file:
    json.dump(all_data, json_file, indent=4)

print("{} svg icons stored in {}.".format(len(all_data), output_file))