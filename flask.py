from asyncio import tasks
from flask import Flask, jsonify, request
app = Flask(__name__)

contact = { 
    'id': tasks[-1]['id']+1,
 'Name': request.json['Name'],
  'contact': request.json['contact',""],
   'done': False },
     
      
@app.route("/")
def hello_world():
    return "hello_world_myslf_vishwa"


@app.route("/add-data", methods=["POST"])
def add_task():
    if not request.json: 
        return jsonify({ 
            "status":"error", 
            "message": 
        "Please provide the data!" 
        },400) 
        task = { 'id': tasks[-1]['id'] + 1, 
    'id': tasks[-1]['id']+1,
 'Name': request.json['Name'],
  'contact': request.json['contact',""],
   'done': False },
        return jsonify({ "status":"success", "message": "Task added succesfully!" })

@app.route("/get-data") 
def get_task(): 
    return jsonify({ "data" : tasks })
if (__name__=="__main__"):
    app.run(debug=True)