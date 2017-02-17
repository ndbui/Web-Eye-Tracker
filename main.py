from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

#setx FLASK_APP script.py
#close out of bash
#reopen bash and naviage to where the python script is located
#flask run
#I have no clue how to change the IP or port or anything else, we'll do tomorrow?
