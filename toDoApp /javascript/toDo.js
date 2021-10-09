/////////CREATING LOCAL STORAGE KEY///////////
const LOCAL_STORAGE_KEY='task.list';
const ID_Key='Id.key';

let MainList= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

let SelectedListId=localStorage.getItem(ID_Key)

console.log(MainList)





/// Right Side box grabbing elements////
let rightcontainer=document.querySelector('[data-list-right-conatiner]');
let rightheader=document.querySelector('[data-list-right-header]');
let righttaskbox=document.querySelector('[data-list-task-right-box]');


const taskTemplate = document.getElementById('taskTemplate');



const clearbuttonright = document.querySelector('[data-clear-complete]');
//the unordered list uses data-list as a new form of an id or class//

const unorderedlist=document.querySelector('[data-lists]');
let deletebutton=document.getElementById('deletelist');



deletebutton.addEventListener('click',e=>{
  MainList=MainList.filter(list=>list.id!==SelectedListId)
  SelectedListId = null;
  saveandrender();
})


unorderedlist.addEventListener('click', e=>{
if(e.target.tagName.toLowerCase()==='li')
SelectedListId=e.target.dataset.listid;
saveandrender();


})


righttaskbox.addEventListener('click',e=>{
if(e.target.tagName.toLowerCase()==='input'){
  const selectedlist= MainList.find(list=>list.id===SelectedListId);
  const selectedtask = selectedlist.tasks.find(task=> task.id===e.target.id)
  selectedtask.complete=e.target.checked;
  save()
}



})











//grabbing the form element//and //grabbing the input box left side//
const leftSideForm=document.querySelector('[data-new-list-form]');
const leftSideInput=document.querySelector('[data-new-list-input]')

leftSideForm.addEventListener('submit',e =>{
 
 e.preventDefault();
 
  const newlistinputvalue= leftSideInput.value;
  if(newlistinputvalue===null||newlistinputvalue===''){
    return
  }
  else{
    const leftValueItemCreated= createList(newlistinputvalue);
    MainList.push(leftValueItemCreated);
   saveandrender();
  }

})
///left side ends////


///rght side ///
const rightform = document.querySelector('[data-list-right-form]');
const rightinput =document.querySelector('[data-list-add-right-input]');

rightform.addEventListener('submit',e=>{
  e.preventDefault();
   
  const taskname= rightinput.value;

  
  if(taskname===null || taskname===''){alert('put in value');
}
  else{
    const task = createtask(taskname);
    rightinput.value=null;
  
    const selectedlist= MainList.find(list=> list.id ===SelectedListId)
    selectedlist.tasks.push(task);
    saveandrender();
  }
  
  
})

//end of right side//












/////////
clearbuttonright.addEventListener('click',e=>{
 
const selectedlist= MainList.find(list=>list.id === SelectedListId)




selectedlist.tasks =selectedlist.tasks.filter(task=>!task.complete)
saveandrender();

});






//function that creates the visible html items and appends it . pretty simple///
function createList(name){
  return {id:Date.now().toString(),name:name, tasks:[]}
};



function createtask(name){
  return {id: Date.now().toString(),name: name, complete: false}


}
//
//
//
//


function saveandrender(){
  save();
  render();

}
function save(){
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(MainList));
  localStorage.setItem(ID_Key,SelectedListId);


}














function render(){
/// it will execute the function created below to clear the first child of the element selected///
clearElement(unorderedlist);
renderlist()
const selectedlist=MainList.find(list=>list.id===SelectedListId);
 if(SelectedListId==null){
   rightcontainer.style.display='none';
 }else{
   rightcontainer.style.display='';
   rightheader.innerText= selectedlist.name;
   clearElement(righttaskbox);
   rendertasks(selectedlist);
 }
 

};
function rendertasks(selectedlist){
  selectedlist.tasks.forEach(task=>{
    const taskelement = document.importNode(taskTemplate.content,true);
    const checkbox= taskelement.querySelector('input'); task.id
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label= taskelement.querySelector('label');
    label.htmlFor =  task.id;
    label.append(task.name)
  righttaskbox.appendChild(taskelement);
  })
}





function renderlist(){


  MainList.forEach(lister=>{
    let lileft= document.createElement('li');
    lileft.classList.add('lileft');
    lileft.dataset.listid=lister.id;
   // li has inner text of what is in the array //
    lileft.innerText=lister.name;
   if(lister.id===SelectedListId){
   lileft.classList.add('activeListItem');
   }
    unorderedlist.appendChild(lileft);});
  
}


function clearElement(element){
while(element.firstChild){
  element.removeChild(element.firstChild)}
}





render();

