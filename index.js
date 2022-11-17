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

//reference your database
var fieldInputsDB = firebase.database().ref('fieldInputs');

$('#submitInputButton').click(function(){
  var firstString = document.getElementById('stringField').value;
  var otherString = document.getElementById('otherStringField').value;
  console.log('Here is the first user input: '+firstString+" Here is the second user input: " + otherString);

  saveInput(firstString, otherString);
  console.log("hopefully sent?");
});


//

const saveInput = (firstString, otherString) => {
  var newUserInputs = fieldInputsDB.push();
  newUserInputs.set({
    //The key controls what is the key in the database
    'firstString' : firstString,
    'otherString' : otherString
  });
};
