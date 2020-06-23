# CS50 Web Programming with Python and JavaScript

Webpage link: https://courses.edx.org/courses/course-v1:HarvardX+CS50W+Web/course/

# Project 2: Flack

### Description:

Development of chat application - **'Flack'** 

The Flack application allows its user to communicate with each other through channels. 

#### Features:
  
  * Create a new channel
  * Join existing channel
  * See previous messages (upto 100 messages)
  * Shows each message's message, time, date and attachments (if any).
  
    **Personal touch:**
  
    
  * search for a channel
  * send attachments : Image (jpg) and Document(doc,docx,pdf)
 

### File Specific and Feature details:

    1. application.py:
    
       * Server side program : Developed in Python and Flask
       * Handles socket transactions using flask_socketio
       * Stores channel chat messages in a dictionary. If channel messages exceeds 100 messages, pops out first message from the dictionary. 
       * Chat application routing, error handling and user session information .

  #### File path: templates/:
  
     2. index.html:
     
        * Displaying all channels ( hyperlink for same )
        
        * create channel ( displayed in a modal )
          * A new channel is created only if the new channel name does not already exists.
          
        * Search for existing channels
          * Shows result if found a match ( hyperlink for same )
          
        * Javascript code :
          * Setting background color of body
          * Display create channel modal again, if channel name already exists.
          
   **Remembering Channel** 
   
          * If the user was communicating on a channel and closes the window, and when the user open the application again, it displays previous channel.
            
     3. channel.html:
     
        * Display selected channel information and previous messages ( shows upto 100 messages )
        * Displays message on right if send by current user and left if send by other user
        * show each message's time, date and attachments.
        * Write message input box where user can type message, attach image or documents and send button.
        
        
     4. login.html:
     
        * Gets user display name
        * stores name in local storage and in flask session
        
     5. layout.html:
     
        * Base layout for all the above html files.
        
        * Navigation bar
          * Logo
          * All channnels (redirects to index.html and shows all channels)
          * Shows current user's display name
          * Logout button
        
        * Javascript code : 
          * when user clicks logout button, removes display name and last channel information from local storage.
          
   #### File path: static/: 
   
      6. login.js:
      
         * Set background color for body
         
         * Checks in local storage for display name
            * if already set then redirects to server with previous display name. 
            * if not already set then gets display name from user.
            
        7. Channel.js:
         
         * On DOMContentLoaded:
           * Disables send message button if message is empty. Send message button is active only if there is a message or any attachements.  
           * Establish Socket connection between server and client.
           * Send message: Socket emit with user message , date, time and attachments (if any) to server. 
           * Announce message: Socket announce by creating new divs for the new messages for client side .
           
         8. main.css:
         
          * CSS Styling for entire application.
          
         9. requirements.txt:
         
          * Information about the Python packages that are used by the website.
           
         
### Built with:
--------------------

  1. [Bootstrap (version: 4.5)](https://getbootstrap.com/)

  2. [Microsoft Visual code (version:1.44)](https://code.visualstudio.com/)

  3. [Flask (version: 1.1.2)](https://flask.palletsprojects.com/en/1.1.x/)

  4. [Flask-Session(version: 0.3.2)](https://flask.palletsprojects.com/en/1.1.x/)
  
  5. [Jinja2 (version: 2.11.2)](https://jinja.palletsprojects.com/en/2.11.x/)
  
  6. [Python(version 3.7.3)](https://www.python.org/)

  7. HTML5

  8. Cascading Style Sheets (CSS)
  
### Author:
------------
NAIR SAARIKA BHASI
# saarikabhasi
   
  
