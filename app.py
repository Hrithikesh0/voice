from flask import *
from zipfile import ZipFile
import mysql.connector

app = Flask(__name__)

conn = mysql.connector.connect(host="localhost", user ="root", password = "Chinnu09", database = "talend" )
cur = conn.cursor()

import os
from os.path import basename
# Zip the files from given directory that matches the filter
def zipFilesInDir(dirName, zipFileName):
   # create a ZipFile object
   with ZipFile(zipFileName, 'w') as zipObj:
       # Iterate over all the files in directory
       for folderName, subfolders, filenames in os.walk(dirName):
           for filename in filenames:
                
                # create complete filepath of file in directory
                try:
                    filePath = os.path.join(folderName, subfolders[0],  filename)
                    zipObj.write(filePath, basename(filePath))

                except:
                    
                    filePath = os.path.join(folderName,   filename)
                    zipObj.write(filePath, basename(filePath))

                

                # Add file to zip


@app.route("/", methods=['GET', 'POST'])
def home():

    if request.method == "POST":
                
        f = open("project/Main.js")
        temp = []
        s = False
        for line in f:
            if "<dynamic data>" in line:
                s = True

            if s:
                temp.append(line)

        f.close()

        file = request.files['file']
        file.save("data.csv")
        fr = open("data.csv")
        number_of_rows = request.form["row"]
        number_of_columns =[int(x) for x in  request.form["columns"].split(",")]
        print(number_of_rows,number_of_columns)

        cols = fr.readline().replace("\n", "")
        

        data = [("," + line.replace("\n", "")).split(",") for line in fr]

        fr.close()

        fw = open("project/Main.js", "w")

        #fw.write("window.onload = function(){")
        fw.write(f"""
            var data_cols = {("," + cols).split(",")}
            var wedlock_data = {data}
            var PageLength = { number_of_rows }
            var Menu = {number_of_columns}
            
            """)


        for line in temp:
            fw.write(line)
        fw.close()

        zipFilesInDir("project/", "static/project.zip")

        return render_template("index.html", File = True )
    return render_template("index.html", File = False)

@app.route("/mssql", methods=["GET","POST"])
def mssql():
    cur.execute("select * from users;")
    data = cur.fetchall()
     

    return render_template("datatable.html", data = data)

if __name__ == "__main__":
    app.run(debug=True)