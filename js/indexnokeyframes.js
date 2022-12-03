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
  changeMessages(otherCounterNum);
};


//Serves as the index for snatchData because you can't pass the for loop index to it, lol
var grossIndex= 0;

//Swaps the total num of different messages to random ones
function changeMessages(maxNum){
  //Repeats code for however many elements with the class message on the page
  for (var i = 0; i < $('.message').length; i++){
     //Generates a random keyname to use
     keyName = 'answer' + Math.ceil(Math.random() * (maxNum));
     console.log("The key we are referencing: "+ keyName);
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
   console.log("The string to place in the message: "+replaceString);
   console.log('Current position message that will be changed: '+grossIndex);
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
//the db
$('.swapMessages').eq(0).click(function(){
   //Gets the value of the counter and passes it to the swapData function
   counterRef.once("value", swapData);
   //Changes the text in the swap button to a random item in the attributeList
   $('.swapMessages').eq(0).html('Swap '+ attributeList[Math.floor(Math.random() * attributeList.length)] +'?');
});

//Gets info to pass to the changeMessages function
function swapData(data){
   //Saves the current counter val in a var
   var switchCounterNum = data.val();
   //Calls function to update the three paragraphs and passes the switchCounterNum as an arg
   changeMessages(switchCounterNum);
}

//Inits a global var that will hold the unique class for one message at a time
//Needs to be here to swap the data in one message only and not all.
var messageUniqueID

//Generates a reference to a random key in the database and calls snatchSingleData to do something
//with it
function swapSingleData(data){
   var switchCounterNum = data.val();
   //Generates a random keyname to use
   keyName = 'answer' + Math.ceil(Math.random() * (switchCounterNum));
   console.log("The key we are referencing: "+ keyName);
   //Creates a ref to the key in the db
   tempKeyRef = firebase.database().ref('strInput/'+keyName);
   //Takes a snapshot of the data and calls snatchData to make it do something
   tempKeyRef.once('value', snatchSingleData);
}

//Replaces the string in the specified message with a new message at the ref'd key
function snatchSingleData(data){
   //Saves the value of the key in a variable
   var replaceString = data.val();
   console.log("The string to place in the message: "+replaceString);
   $('#'+messageUniqueID+'').html("<p>"+replaceString+"</p>");
}


//Fills in the messages on startup
counterRef.once("value", swapData);

//Toggles the plane theme on
$(".planeThemeButton").eq(0).click(function(){
   $(".planeThemeButton").eq(0).addClass('selected');
   $(".shipThemeButton").eq(0).removeClass('selected');
   $(".ufoThemeButton").eq(0).removeClass('selected');
   for (var i = 0; i < $('.plane').length; i++){
      $('.plane').eq(i).addClass('planebg');
      $('.plane').eq(i).removeClass('shipbg');
      $('.plane').eq(i).removeClass('ufobg');
   };
   $('#backgroundDiv').addClass('planebgColor');
   $('#backgroundDiv').removeClass('shipbgColor');
   $('#backgroundDiv').removeClass('ufobgColor');
});

//Toggles the ship theme on
$(".shipThemeButton").eq(0).click(function(){
   $(".shipThemeButton").eq(0).addClass('selected');
   $(".planeThemeButton").eq(0).removeClass('selected');
   $(".ufoThemeButton").eq(0).removeClass('selected');
   for (var i = 0; i < $('.plane').length; i++){
      $('.plane').eq(i).addClass('shipbg');
      $('.plane').eq(i).removeClass('planebg');
      $('.plane').eq(i).removeClass('ufobg');
   };
   $('#backgroundDiv').addClass('shipbgColor');
   $('#backgroundDiv').removeClass('planebgColor');
   $('#backgroundDiv').removeClass('ufobgColor');
});

//Toggles the ufo theme
$(".ufoThemeButton").eq(0).click(function(){
   $(".ufoThemeButton").eq(0).addClass('selected');
   $(".shipThemeButton").eq(0).removeClass('selected');
   $(".planeThemeButton").eq(0).removeClass('selected');
   for (var i = 0; i < $('.plane').length; i++){
      $('.plane').eq(i).addClass('ufobg');
      $('.plane').eq(i).removeClass('shipbg');
      $('.plane').eq(i).removeClass('planebg');
   };
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
      //Gets the number of pixels to move each planebox vertically
      //The num of pixels is chosen randomly from 0 to the window height minus the height of 
      //the planebox, which is always 100px
      var topPosition = Math.floor(Math.random() * (window.innerHeight-100));
      //Changing the top attribute (the vertical position)
      newPlaneBoxEl.css("top", topPosition);
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
      //From this we see that the planebox div is the width of the window rather than the width 
      //of the content. Must rely on message width <-- It just acts weird
      //Moves the planebox offscreen to the right by manipulating its left position.
      //Accounts for length of message, plane, browser window, and a litte extra
      $('.planebox').eq(i).css("left", (350+$('.message').eq(i).outerWidth(true))+window.outerWidth);
   };
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
