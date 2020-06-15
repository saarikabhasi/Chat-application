import os 
from flask import Flask,render_template,request,redirect,url_for,jsonify,flash
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def index():
  return render_template ("index.html")

#@app.route("/createchannel/<string:name>",methods=["GET","POST"])
@app.route("/createchannel",methods=["GET","POST"])
def createchannel():
  print("came here")
  name = request.form["name"]
  
  print("name is :" ,f"{name}")
  print(request.method)
  return render_template("channel.html",name=name)

