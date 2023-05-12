const todoBox = document.querySelector('.todo-box');
const inputText = document.querySelector('.inputText');
const addBTN = document.querySelector('.addBTN');
const incompleteTasksHolder = document.querySelector('.incomplete-tasks');
const completeTasksHolder = document.querySelector('.complete-tasks');

function onAdd() {
  // Input New Text
  const text = inputText.value;
  console.log(text);
  // Create 'New Text' (Text + Delete)
  const item = createItem(text);

  // Add 'Next Text' in the container
  const listItem = document.createElement('li');
  listItem.setAttribute('class', 'listItem');
  incompleteTasksHolder.appendChild(listItem);
  // Reset 'Input'
  inputText.value = '';
  inputText.focus();
}

function createItem(taskString) {
  //Create List Item
  const listItem = document.createElement('li');
  listItem.setAttribute('class', 'listItem');

  const checkBox = document.createElement("input");
  listItem.setAttribute('id', 'todo-item');

  const label = document.createElement("label");
  listItem.setAttribute('class', 'item-name');
  
 const editInput = document.createElement("input");
listItem.setAttribute('class', 'editInput');
  
 const editButton = document.createElement("button");
    listItem.setAttribute('button', 'edit');
  const deleteButton = document.createElement("button");
listItem.setAttribute('button', 'trash');
  //Each element needs modifying
  
checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;
   

  //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


addBTN.addEventListener('click', () => {
  onAdd();
})