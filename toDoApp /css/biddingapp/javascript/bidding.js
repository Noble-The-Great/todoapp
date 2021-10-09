
// let textbox1= document.getElementById('textbox1').value;
// let textbox2= document.getElementById('textbox2');
// let bigwhiteboxul= document.getElementById('bigwhitebox-ul')
// let pagebreak = document.createElement('br');
// let listitem = document.createElement('li');
// let textnode= document.createTextNode(textbox1);

let bidder1array=[];
let bidder2array=[];



function addList(){
  let textbox1= document.getElementById('textbox1').value;
  let bigwhiteboxul= document.getElementById('bigwhitebox-ul');
  let listitem = document.createElement('li');
  let textnode1= document.createTextNode(textbox1);
  let bids1 =listitem.appendChild(textnode1);
 
 if(!isNaN (textbox1)){
  
 
 
 bigwhiteboxul.appendChild(listitem).style.color='red';
 bidder1array.push(parseInt(textbox1));
 
 whosebetter();
 
 }
};











function addlist2(){
  
  let textbox2= document.getElementById('textbox2').value;
  let bigwhiteboxul= document.getElementById('bigwhitebox-ul');
  let listitem = document.createElement('li');
  let textnode2= document.createTextNode(textbox2);
  let bids2= listitem.appendChild(textnode2); 
  
  
  if(!isNaN(textbox2)){
  bigwhiteboxul.appendChild(listitem).style.color='green';
  bidder2array.push(parseInt(textbox2));
 
  whosebetter();

  }
  
}

function whosebetter(){

let compbox= document.getElementById('currentwinner');

  const max1 = Math.max(...bidder1array);
  console.log(max1);


  const max2 = Math.max(...bidder2array);
  console.log(bidder2array);

if(max1 > max2){
compbox.style.backgroundColor='red';
compbox.innerHTML='bidder 1 Leads!'
}
else if (max1<max2){
  compbox.style.backgroundColor='green';
  compbox.innerHTML='bidder 2 leads !';
}
else if(max1===max2){
  compbox.style.backgroundColor='gray';
  compbox.innerHTML='Its a Tie! Hurry Bid Higher!!!'
}

}

const startingseconds= 1;
let time = startingseconds * 60;
let timer = document.getElementById('countdown');

function setup(){
  setInterval(setup,1000)
  const minutes = Math.floor(time/60)
let seconds = time % 60; 

seconds = seconds < 10 ? '0' + seconds: seconds


timer.innerHTML=`${minutes}:${seconds}`
time --;
}