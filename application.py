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
@app.route("/createname",methods=["GET","POST"])
def createname():
  
  name = request.form["name"]
  print("created name" ,f"{name}")
  print("Method",request.method)
  #return redirect(url_for('createchannel',name=name))  
  return render_template("channel.html",name=name)

allchannels=[]
@app.route("/createchannel",methods=["GET","POST"])
def createchannel():
  error_msg=""
  print("in createchannel")
  #name = request.args['name']
  # print("name is:",name)
  print(request.method)
  if request.method == "POST":
    print("here")
    
    channelname = request.form['cname']
    print("create new channel")
    print("all channels",allchannels)
    if channelname in allchannels:
      error_msg="channel name is already taken"
    else:
      allchannels.append(channelname)
      print("all channels after appending",allchannels)
    return render_template("channel.html", error_msg=error_msg, allchannels=allchannels)
  else:
    return render_template("channel.html", allchannels=allchannels)


  #@app.route("/chat/<string:channel>",methods=["GET","POST"])
  @app.route("/chat",methods=["GET","POST"])
  def chat():

    return render_template("chat.html")

