const taskInput = document.querySelector('.task-input input'),
      taskBox = document.querySelector('.task-box'),
      filters  = document.querySelectorAll('.filters span'),
      ClearBtn = document.querySelector('.clear-btn');

      let editId;
      let isEditId = false;

      let todo = JSON.parse(localStorage.getItem('todo-list'));

filters.forEach((btn) =>{
  btn.addEventListener('click',()=>{
document.querySelector('span.active').classList.remove('active');
btn.classList.add('active');
showTodo(btn.id);
  });
})


function showTodo (filters){
  let li = '';
  if(todo){
    todo.forEach((todo,id) =>{
      let isCompleted = todo.status =='completed'? 'checked':'';
if(filters == todo.status || filters  == 'all'){
  li += `<li class="task">
  <label for="${id}">
      <input onclick="updateStatus(this)" type="checkbox" id="${id}"
      ${isCompleted}>
      <p class="${isCompleted}">${todo.name}</p>
  </label>
  <div class="settings">
      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
      <ul class="task-menu">
          <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
          <li onclick='deleteTask(${id})'><i class="uil uil-trash"></i>Delete</li>
      </ul>
  </div>
  </li>`;
}
     
    });
  }
taskBox.innerHTML = li || `<span>There's nothing here....</span>`;
}
showTodo('all');

function showMenu(selected){
let taskMenu = selected.parentElement.lastElementChild;
taskMenu.classList.add('show');
document.addEventListener('click',(e)=>{
if(e.target.tagName !="I" || e.target != selected){
  taskMenu.classList.remove('show');
}
});
}

function deleteTask(delTask){
todo.splice(delTask,1);
localStorage.setItem('todo-list',JSON.stringify(todo));
showTodo('all');
}

function editTask(idTask,nameTask ){
  editId = idTask;
  isEditId = true;
  taskInput.value = nameTask;
}

ClearBtn.addEventListener('click',()=>{
  todo.splice(0,todo.length);
  localStorage.setItem('todo-list',JSON.stringify(todo));
  showTodo('all');
});

function updateStatus(selected){
let statusName = selected.parentElement.lastElementChild;
if(selected.checked){
  statusName.classList.add('checked');
  todo[selected.id].status = 'completed';
}else{
  statusName.classList.remove('checked');
  todo[selected.id].status = 'pending';
 
}
localStorage.setItem('todo-list',JSON.stringify(todo));
}


taskInput.addEventListener('keyup', (e)=>{
let taskName = taskInput.value.trim();
if(e.key == 'Enter' && taskName){
  if(!isEditId){
    if(!todo){
      todo = [];
    }
    let userName = { name:taskName,status:"pending"};
    todo.push(userName);
    
    }else{
      isEditId = false;
      todo[editId].name = taskName;
    }
      taskInput.value = "";
    localStorage.setItem('todo-list',JSON.stringify(todo));
    showTodo('all');
  }

});