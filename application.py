import os 
from flask import Flask,session,render_template,request,redirect,url_for,jsonify,flash
from flask_socketio import SocketIO, emit,send
from flask_session import Session

app = Flask(__name__)
# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = "my secret key"
#socketio = SocketIO(app)
socketio = SocketIO(app,engineio_logger=True)

channels=[]

channelmessages = dict()
@app.route("/")
def index():
  if 'name' in session:
     if session['name']:
       message = session['name']
       print("All channels index",channels)
       return render_template ("index.html",allchannels=channels,account = message)
  else:
    return redirect(url_for('displayname'))

@app.route("/displayname",methods=["GET","POST"])
def displayname():
  if 'name' in session:
     if session['name']:
       print("Displayname log1")
       message = session['name']
       return render_template ("index.html",account = message)

  print(" Displayname Request method",request.method)

  if request.method == 'POST':
    try:
      name = request.form["name"]
    except ValueError:
      return render_template("login.html",err_msg="Display name is required to begin chat")

    if len(name) == 0:
      return render_template("login.html",err_msg="Display name is required to begin chat")
    else:
      session['name']= name 
      print(" Displayname created name" ,f"{name}")
      return redirect(url_for('index'))  
  else:
    return render_template("login.html")



@app.route("/createchannel",methods=["GET","POST"])
def createchannel():
  if 'name' in session:
     if session['name']:
       message =session['name']
      
  error_msg=""
  print("in createchannel")
  #name = request.args['name']
  # print("name is:",name)
  print("createchannel",request.method)
  if request.method == "POST":
    print("here")
    
    channelname = request.form['cname']
    print("createchannel, create new channel")
    print("createchannel ,all channels",channels)
    channelname = channelname.lower()
    if channelname in channels:
      error_msg="channel name is already taken"
    else:
      channels.append(channelname)
      
      print("createchannel, all channels after appending",channels)
    return render_template("index.html", error_msg=error_msg, account = message,allchannels=channels)
  else:
    return render_template("index.html", account = message,allchannels=channels)

@app.route("/search",methods=["GET","POST"])
def search():
  if session['name']:
      message = session['name']
  else:
      return render_template("login.html",account="you are not logged in")

  if request.method == 'POST':     
    query = request.form["search"]
    
    #empty query
    if query == "":
      No_Results ="No results"
      return render_template("index.html",search_error = No_Results, account=message)

    else:
      query=query.strip()
      searchquery = query.lower()

      if searchquery in channels:
        return render_template("index.html",searchresults = searchquery,allchannels=channels,account=message )
      else:
        No_Results ='No channels found'
        return render_template("index.html", search_error = No_Results,searchresults = searchquery,account=message )
  else:
    return redirect(url_for('index'))
  
@app.route("/channel/<string:channelname>",methods=["GET","POST"])
def channel(channelname):
  if session['name']:
      message = session['name']
  else:
      return render_template("login.html",account="you are not logged in")


  session['currentchannel'] = channelname
  print("channelname ", channelmessages)
  return render_template("channel.html",channelname = channelname,channelmessages =channelmessages , account=message)
@app.route("/logout",methods=["GET","POST"])
def logout():
  session.pop('name',None)
  return redirect(url_for('index'))

@socketio.on('send message')
def chat(message,timestamp):
  username = session['name']
  channelname = session['currentchannel']
  print("in chat")
  print("message is :",message)
  print("time is:",timestamp)
  messagedetail = [username,message,timestamp]
 
  print("list is :",messagedetail)
  if channelname not in channelmessages:
      channelmessages[channelname]=list()
   

  channelmessages[channelname].append(messagedetail)
  

  print(" channel messages:",channelmessages)
  emit('announce message', {"username":username,"message": message,"timestamp":timestamp}, broadcast=True)

# {
#  "general": [
#             {
#               "A": ["00:01","hi"],
#               "B": ["00:03","hello"],
#                "A": ["00:3","good"]
#           }
#           ]
# }
