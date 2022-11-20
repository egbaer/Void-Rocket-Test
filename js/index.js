//References
//Setting Up DB - Vetrivel Ravi
//https://www.youtube.com/watch?v=RAWHXRTKTHw&lc=UgxEnIRQ8_IHilmgWnd4AaABAg
//Accessing Data - The Coding Train
//https://www.youtube.com/watch?v=NcewaPfFR6Y
//Working Example - Muhammåd Shàhzàiß Raø
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
   $('body').addClass('planebgColor');
   $('body').removeClass('shipbgColor');
   $('body').removeClass('ufobgColor');
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
   $('body').addClass('shipbgColor');
   $('body').removeClass('planebgColor');
   $('body').removeClass('ufobgColor');
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
   $('body').addClass('ufobgColor');
   $('body').removeClass('shipbgColor');
   $('body').removeClass('planebgColor');
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
