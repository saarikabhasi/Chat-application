import os 
from collections import deque
from flask import Flask,session,render_template,request,redirect,url_for,jsonify,flash
from flask_socketio import SocketIO, emit,send
from flask_session import Session


app = Flask(__name__)
# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = "my secret key"
socketio = SocketIO(app)
# socketio = SocketIO(app,engineio_logger=True)

channels=[]

channelmessages = dict()

@app.route("/")
def index():
  if 'name' in session:
     if session['name']:
       message = session['name']
       return render_template ("index.html",allchannels=channels,account = message)
  else:
    return redirect(url_for('displayname'))

#get display name
@app.route("/displayname",methods=["GET","POST"])
def displayname():

  #making sure if user has logged in
  if 'name' in session:
     if session['name']:
       message = session['name']
       return render_template ("index.html",account = message)

  if request.method == 'POST':
    try:
      name = request.form["name"]
    except ValueError:
      return render_template("login.html",err_msg="Display name is required to begin chat")

    #if name length is zero
    if len(name) == 0:
      return render_template("login.html",err_msg="Display name is required to begin chat")

    else:

      #set display name
      session['name']= name 
      return redirect(url_for('index'))  
  else:
    return render_template("login.html")


#create a channel
@app.route("/createchannel",methods=["GET","POST"])
def createchannel():

  #making sure if user has logged in
  if 'name' in session:
     if session['name']:
       message =session['name']
      
  error_msg=""

  if request.method == "POST":

    #create
    channelname = request.form['cname']
    channelname = channelname.lower()

    # making sure new channelname is not already taken
    if channelname in channels:
      error_msg="channel name is already taken"
    else:
      channels.append(channelname)
      
    return render_template("index.html", error_msg=error_msg, account = message,allchannels=channels)

  else:
    return render_template("index.html", account = message,allchannels=channels)

#search
@app.route("/search",methods=["GET","POST"])
def search():

  #make sure if user has logged in
  if session['name']:
      message = session['name']
  else:
      return render_template("login.html",account="you are not logged in")

  if request.method == 'POST':   

    #search for channel 
    query = request.form["search"]
    
    #empty query
    if query == "":
      No_Results ="No results"
      return render_template("index.html",search_error = No_Results, allchannels=channels,account=message)

    else:
      #strip white space
      query=query.strip()

      #transform to lower case as channel names are stored in lower case
      searchquery = query.lower()

      if searchquery in channels:
        #send results if found

        return render_template("index.html",searchresults = searchquery,allchannels=channels,account=message )
      
      else:
        #send 'no channels found' if not found

        No_Results ='No channels found'
        return render_template("index.html", search_error = No_Results,searchresults = searchquery,allchannels=channels,account=message )
  else:
    return redirect(url_for('index'))


#current channel  
@app.route("/channel/<string:channelname>",methods=["GET","POST"])
def channel(channelname):

  #make sure if user has logged in
  if session['name']:
      message = session['name']
  else:
      return render_template("login.html",account="you are not logged in")

  #setting currentchannel
  session['currentchannel'] = channelname


  return render_template("channel.html",channelname = channelname,channelmessages =channelmessages , account=message)

#logout
@app.route("/logout",methods=["GET","POST"])
def logout():
  session.pop('name',None)
  return redirect(url_for('index'))

#send message
@socketio.on('send message')
def chat(message,time,date,attachimg,attachdoc):

  #retreive information from socket emit. 
  
  username = session['name']
  channelname = session['currentchannel']
  attachment = [attachimg,attachdoc]
  messagedetail = [username,message,time,date,attachment]
 
  #store channel messages
  if channelname not in channelmessages:
      channelmessages[channelname] = deque()

  # if channel message more than 100, remove old message
  if len(channelmessages[channelname]) >=100:
    channelmessages[channelname].popleft()

  #append new message
  channelmessages[channelname].append(messagedetail)
  
  
  emit('announce message', {"username":username,"message": message,"time":time, "date":date,"currentchannel":channelname,"attachment":[attachimg, attachdoc]}, broadcast=True)

