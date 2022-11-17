

//retrieving stored data
var messages;
var cache_id = "messages"
messages = JSON.parse(localStorage.getItem(cache_id));

//...

//finds a random number between two other numbers and returns it as a rounded int type
function randomRange(min, max) {
  return ~~(Math.round(Math.random() * (max - min) + min));
}


//initializing the item in the cache as a list

function initialize(obj){

  //ensuring the type is as expected
  console.assert((obj == undefined) || (typeof obj) == "object");

  if (obj == undefined){
    console.log("Initialized as empty object!");
    return []
    
  }
  else
  {
    console.log("Initialized as stored data!");
    return obj
  }

 
}

//replaces the old list with the new list in the cache
function storeMes(_input,_list, cache){

  //adding the element to the list and then replacing the old stored list with the new one
  _list.push(_input);
  localStorage.setItem(cache, JSON.stringify(_list));
  

}

function displayMes(cache) {

  //retrieves stored data and generates a random element to display
  var cached_messages = JSON.parse(localStorage.getItem(cache));
  var messageRange = cached_messages.length;
  console.log("Stored data: " + cached_messages);
  var displayedEle = randomRange(0, messageRange);
  console.log("Generated message: " + cached_messages[displayedEle]);
}






$('#submitInputButton').click(function(){
  var firstString = document.getElementById('stringField').value;
  var otherString = document.getElementById('otherStringField').value;
  console.log('Here is the first user input: '+firstString);

  messages = initialize(messages);
  storeMes(firstString, messages, cache_id);
  displayMes(cache_id);



  console.log("hopefully sent?");


});


