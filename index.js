var json_file;
var word
var value;
var file_length;
var hash_table;
var second_key;

function hashTableBuild(){
  hash_table = new Array(file_length);
  second_key = new Array(file_length);
  var a,b;
  a = 1+ Math.floor((Math.random()*Math.pow(10,8))%610699);
  b = Math.floor((Math.random()*Math.pow(10,12))%610699);
  for(var i=0;i<file_length;i++){
    hash_table[i]=[];
    second_key[i]= null;
  }
  for(var i=0;i<file_length;i++){
    var english_word = word[i].en.toLowerCase();
    var word_length = english_word.length;
    var count = 0;
    for(var i=0;i<word_length;i++){
      count+= ((Math.pow(26, word_length)%(Math.pow(10,12)+1))*(english_word.charCodeAt(i)-97))%(Math.pow(10,12)+1);
    }
    var hash_value = (((a * count)+b)%610699)%16912;
    if(!hash_table[hash_value]){
      hash_table[hash_value].push(i);
    }
  }
}
window.onload = function load(){
  json_file = fetch("https://raw.githubusercontent.com/MinhasKamal/BengaliDictionary/master/BengaliDictionary.json")
  .then(response =>{
    return response.json()
  })
  .then(json =>{
    word = json;
    file_length = Object.keys(word).length;
    console.log(file_length);
  })
  .then(response =>{
    hashTableBuild();
  })
}



$(document).ready(function(){




  $("button").click(function(){
    value =$("#word").val();
    var x = value.toLowerCase();
    var y = hash_table[x];
    $("#word").val("");
    $("#result").text(value + " " + y.bn);
  });
});
