//References
//Setting Up DB - Vetrivel Ravi
//https://www.youtube.com/watch?v=RAWHXRTKTHw&lc=UgxEnIRQ8_IHilmgWnd4AaABAg
//Accessing Data - The Coding Train
//https://www.youtube.com/watch?v=NcewaPfFR6Y
//Working Example - Muhammd (?)
//https://codepen.io/muhamm-d-sh-hz-i-ra/pen/dyYyvXj

const firebaseConfig = {
    apiKey: "AIzaSyDn9EVeF0wcIGV43BovsZG4Vc_YrDv-LiQ",
    authDomain: "tester2-af890.firebaseapp.com",
    databaseURL: "https://tester2-af890-default-rtdb.firebaseio.com",
    projectId: "tester2-af890",
    storageBucket: "tester2-af890.appspot.com",
    messagingSenderId: "259927215704",
    appId: "1:259927215704:web:c449149a15b325ea17c42d",
    measurementId: "G-JFR7BRE2MJ"
  };

//initialize Firebase
firebase.initializeApp(firebaseConfig);


//Database References
//entire db
var dbRef = firebase.database().ref();
//child named strInput
var inputRef = dbRef.child('strInput');
//ref to the counter child in db
var counterRef = firebase.database().ref("counter/counter");


//Better submit button occurrence
$('#submitInputButton').click(function(){
  //Makes sure the user can't submit an empty field (that would be depressing)
  if ($('#stringField').val()==""){
     //Reprimands the user
     console.log("Actually input something, dummy. Don't be THAT lazy.");
     //Returns so nothing else happens
     return;
  };
  //Gets the value of the counter and passes it to the gotData function
  $('#submitInputButton').toggle();
  $('#stringField').toggle();
  $('#submitConfirmation').toggleClass('noDisplay');
  $('#submitConfirmation').toggleClass('submitConfirmationDisplayFlex');
  setTimeout(function(){$('.messageButtonHolder').eq(0).toggle();}, 5000);
  counterRef.once("value", gotData);
});


//Adds one to the counter and adds the user data to the db
function gotData(data){
  //Adds one to counter
  firebase.database().ref("counter/").set({counter:data.val()+1});
  
  //Stores the num used above for easy access for other functions, the most important
  //use of it was above
  var otherCounterNum = data.val() +1;

  //Adds user input to db with the correctly counted name
  firebase.database().ref("strInput/answer"+otherCounterNum).set($('#stringField').val());

  //Calls function to update the three paragraphs and passes the otherCounterNum as an arg
  //changeMessages(otherCounterNum);
};


//Serves as the index for snatchData because you can't pass the for loop index to it, lol
var grossIndex= 0;

//Swaps the total num of different messages to random ones
function changeMessages(maxNum){
  //Repeats code for however many elements with the class message on the page
  for (var i = 0; i < $('.message').length; i++){
     //Generates a random keyname to use
     keyName = 'answer' + Math.ceil(Math.random() * (maxNum));
     //Creates a ref to the key in the db
     tempKeyRef = firebase.database().ref('strInput/'+keyName);
     //Takes a snapshot of the data and calls snatchData to make it do something
     tempKeyRef.once('value', snatchData);
  };
}

//Uses the value in the corresponding key to change the innerHTML of the paragraph of
//the gross index.
function snatchData(data){
   //Saves the value of the key in a variable
   var replaceString = data.val();
   //Changes the innerHTML of the .message element at the grossIndex to a paragraph
   //with the val of replaceString inside of it.
   $('.message').eq(grossIndex).html("<p>"+replaceString+"</p>");
   //Increases grossIndex to change the next paragraph. Don't know how else to do this,
   //lol
   grossIndex +=1;
   if (grossIndex >= $('.message').length){
      grossIndex = 0;
   }
}

var attributeList = [
   'Fates',
   'Dreams',
   'Passions',
   'Roaming Thoughts',
   'Idiots',
   'Hopes',
   'Regrets',
   'Maybes',
   'Loves'
]

//Switches the messages on the banners when the button is clicked without changing
//the db. Changes occur offscreen. Simply adds a class to each message, signaling that
//they need to swap messages.
$('.swapMessages').eq(0).click(function(){
   $('.message').addClass('changeMyMessage');
});

//Gets info to pass to the changeMessages function
function swapData(data){
   //Saves the current counter val in a var
   var switchCounterNum = data.val();
   //Calls function to update the three paragraphs and passes the switchCounterNum as an arg
   changeMessages(switchCounterNum);
}


//Inits a global var that will hold the unique ID for one message at a time
//Needs to be here to swap the data in one message only and not all.
var messageUniqueID;

//Generates a reference to a random key in the database and calls snatchSingleData to do something
//with it
function swapSingleData(data){
   var switchCounterNum = data.val();
   //Generates a random keyname to use
   keyName = 'answer' + Math.ceil(Math.random() * (switchCounterNum));
   //Creates a ref to the key in the db
   tempKeyRef = firebase.database().ref('strInput/'+keyName);
   //Takes a snapshot of the data and calls snatchData to make it do something
   tempKeyRef.once('value', snatchSingleData);
}

//Replaces the string in the specified message with a new message at the ref'd key
function snatchSingleData(data){
   //Saves the value of the key in a variable
   var replaceString = data.val();
   $('#'+messageUniqueID+'').html("<p>"+replaceString+"</p>");
}


var theme = "planebg";

//changes the bg image of the planes
//Takes the entire planebox and the passed string theme as args
function changeTheme(cPlanebox, theme){
   var cPlane = cPlanebox.children('.plane');
   if(theme == "planebg"){
      cPlane.addClass('planebg');
      cPlane.removeClass('shipbg');
      cPlane.removeClass('ufobg');
      cPlane.removeClass('ufospecialbg');
   } else if(theme == "shipbg"){
      cPlane.addClass('shipbg');
      cPlane.removeClass('planebg');
      cPlane.removeClass('ufobg');
      cPlane.removeClass('ufospecialbg');
   } else {
      if(Math.ceil(Math.random()*100) < 3){
      cPlane.addClass('ufospecialbg');
      cPlane.removeClass('shipbg');
      cPlane.removeClass('planebg');
      } else {
         cPlane.addClass('ufobg');
         cPlane.removeClass('shipbg');
         cPlane.removeClass('planebg');
         cPlane.removeClass('ufospecialbg');
      };
   };
}

//Toggles the plane theme on
$(".planeThemeButton").eq(0).click(function(){
   $(".planeThemeButton").eq(0).addClass('selected');
   $(".shipThemeButton").eq(0).removeClass('selected');
   $(".ufoThemeButton").eq(0).removeClass('selected');
   //Edits global variable theme to be supplied to the changeTheme function
   theme = "planebg";
   $('#backgroundDiv').addClass('planebgColor');
   $('#backgroundDiv').removeClass('shipbgColor');
   $('#backgroundDiv').removeClass('ufobgColor');
});

//Toggles the ship theme on
$(".shipThemeButton").eq(0).click(function(){
   $(".shipThemeButton").eq(0).addClass('selected');
   $(".planeThemeButton").eq(0).removeClass('selected');
   $(".ufoThemeButton").eq(0).removeClass('selected');
   //Edits global variable theme to be supplied to the changeTheme function
   theme = "shipbg";
   $('#backgroundDiv').addClass('shipbgColor');
   $('#backgroundDiv').removeClass('planebgColor');
   $('#backgroundDiv').removeClass('ufobgColor');
});

//Toggles the ufo theme
$(".ufoThemeButton").eq(0).click(function(){
   $(".ufoThemeButton").eq(0).addClass('selected');
   $(".shipThemeButton").eq(0).removeClass('selected');
   $(".planeThemeButton").eq(0).removeClass('selected');
   //Edits global variable theme to be supplied to the changeTheme function
   theme = "ufobg";
   $('#backgroundDiv').addClass('ufobgColor');
   $('#backgroundDiv').removeClass('shipbgColor');
   $('#backgroundDiv').removeClass('planebgColor');
});

//Pushes button in and brings up correct popup
$('.missionDivButton').click(function(){
   //Changes the color of the button when clicked, too bad you don't get to see it, lol
   $('.missionDivButton').toggleClass('popupButtonSelected');
   //Toggles display of missionPopUp
   $('.missionPopup').eq(0).toggle();
});

//Pushes button in and brings up correct popup
$('.teamDivButton').click(function(){
   //Changes the color of the button when clicked, too bad you don't get to see it, lol
   $('.teamDivButton').toggleClass('popupButtonSelected');
   //Toggles display of teamPopUp
   $('.teamPopup').eq(0).toggle();
});

//Closes the mission popup when you click the button
$('#closeMissionPopup').click(function(){
   //Toggles the display of the mission popup
   $('.missionPopup').eq(0).toggle();
   //Changes the color of the button when clicked, too bad you don't get to see it, lol
   $('.missionDivButton').toggleClass('popupButtonSelected');
});

//Closes the team popup when you click the button
$('#closeTeamPopup').click(function(){
   //Toggles the display of the mission popup
   $('.teamPopup').eq(0).toggle();
   //Changes the color of the button when clicked, too bad you don't get to see it, lol
   $('.teamDivButton').toggleClass('popupButtonSelected');
});



//Position Changes
// .offset() --> relative to document
// .position() --> position of ele's margin box relative to the offset parent

//Create and append Plane Box
//Takes the number of carriers you want to make and the theme they should use
function makePlanebox(num, bg){
   //repeats as many times as specified in the num arg.
   for (var i = 1; i <= num; i++){
      //Creates a unique ID for each planebox by concatenating the string "planeboxNum"
      //with a number one more than the current number of planeboxes on the page
      tempPlaneboxID = "planeboxNum" + ($('.planebox').length + 1);
      newPlaneBoxEl = $('<div class= "planebox" id="'+tempPlaneboxID+'"></div>');
      newPlaneEl = $('<div class="plane '+bg+'"></div>');
      //Adds unique id to each message. It is messageNum concatenated with the amount
      //(including itself) of messages on screen
      tempMessageID = "messageNum" + ($('.message').length + 1);
      newMessageEl = $('<div class = "message" id= "'+tempMessageID +'"></div>');
      newPlaneBoxEl.append(newPlaneEl, newMessageEl);
      //Adding the planebox and content so it is visible to the user
      $('body').append(newPlaneBoxEl);
   };
   //Takes a snapshot of the database and calls the swapData function
   //to give every plane a message
   counterRef.once("value", swapData);
}

//Checks size of each plane and adjusts the positions of every plane 
//to be off screen to the right
function adjustAllPositions(){
   //Width of message carrier is always 300px
   //height of planebox and content is always 100px. 
   //Smallest (default) width of message is 230px.
   //Width of message varies, so must account for that
   //loops over each planebox
   for (var i = 0; i < $('.planebox').length; i++){
      //Gets the number of pixels to move each planebox vertically
      //The num of pixels is chosen randomly from 0 to the window height minus the height of 
      //the planebox, which is always 100px
      var topPosition = Math.floor(Math.random() * (window.innerHeight-100));
      //Changing the top attribute (the vertical position)
      $('.planebox').eq(i).css("top", topPosition);
      //From this we see that the planebox div is the width of the window rather than the width 
      //of the content. Must rely on message width <-- It just acts weird
      //Moves the planebox offscreen to the right by manipulating its left position.
      //Accounts for length of message, plane, browser window, and a litte extra
      $('.planebox').eq(i).css("left", (50+$('.message').eq(i).outerWidth(true))+window.innerWidth);
   };
}

function resetPlanebox(currentPlanebox){
   //Changes the planebox's position to its original position offscreen to the right
   //Gets the number of pixels to move each planebox vertically
   //The num of pixels is chosen randomly from 0 to the window height minus the height of 
   //the planebox, which is always 100px
   var topPosition = Math.floor(Math.random() * (window.innerHeight-100));
   //Changing the top attribute (the vertical position)
   currentPlanebox.css("top", topPosition);
   currentPlanebox.css("left", (50+$('.message').eq(0).outerWidth(true))+window.innerWidth);
}


//Call this function to move a planebox across the screen
//It takes a string of a unique planebox ID as an arg
function movePlanebox(planeboxID){
   //Adds a hashtag to the passed ID so it can be used with jQuery
   coolPlaneboxID = "#" + planeboxID;
   //Makes a JS reference to the planebox that we want to change for ease of use
   currentPlanebox = $(coolPlaneboxID);
   //Also creates an easy ref to the planebox's message div
   currentMessage = currentPlanebox.children(".message");
   //Calls the changeCoords function and passes the refs to the message and planebox
   changeCoords(currentMessage, currentPlanebox);
}

//This was hellish
//This function changes the coords of the planebox passed to it over time
//It takes a reference to a message div its parent planebox div
function changeCoords(cMessage, cPlanebox){
   //creates an interval and assigns its ID to a variable
   //The interval is passed an anonymous function
   var intervalID= setInterval(function(){
      //checks to see if the planebox's left position is less than
      //The planebox's width plus a little extra (in pixels)
      if(cPlanebox.css("left").split('px')[0] <= (-cMessage.outerWidth(true)-350)){
         //Stops repeating this if true
         //Passes resetPlanebox the current planebox obj
         //Moves planes offscreen again to the right
         resetPlanebox(cPlanebox);
         //Passes the current planebox obj and the value of the global theme var
         //to changeTheme. Only changes the bg image of the planes if they are
         //offscreen
         changeTheme(cPlanebox, theme);
         //if(cMessage.hasClass('changeMyMessage')){
            //cMessage.removeClass('changeMyMessage');
            //messageUniqueID = cMessage.attr('id');
            //counterRef.once('value', swapSingleData);
         //};
         messageUniqueID = cMessage.attr('id');
         counterRef.once('value', swapSingleData);
         //Passes the current planebox's id to movePlanebox to make it go across the screen again.
         movePlanebox(cPlanebox.attr("id"));
         //Stops previous interval.
         clearInterval(intervalID);
      } else{
         //Changes the position by -1 if false
         changeLeft = (cPlanebox.css("left").split('px')[0] - 1)+"px";
         cPlanebox.css("left", changeLeft);
      };
   //Changes after 5 miliseconds/seconds (?)
   }, 5);
}

//Makes changes on startup
//Adds a number of planeboxes between 4 and 6 w/ the planebg as their theme
for(var i = 0; i < Math.floor(Math.random() *3 +4); i++){
   makePlanebox(1, "planebg");
};
//Moves all the planeboxes to their starting positions
adjustAllPositions();
//Loops through each planebox and makes it move across the screen
for(var i = 1; i <= $('.planebox').length; i++ ){
   tempPlaneboxID = "planeboxNum" + i;
   movePlanebox(tempPlaneboxID);
};
