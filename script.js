const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');
const form = document.querySelector('.new_form');

// <!-- Local Storage -->
let myItems = [];
const listKey = 'myItems';

function saveItems() {
  localStorage.setItem(listKey, JSON.stringify(myItems));
}

function loadItems() {
  const savedItems = localStorage.getItem(listKey);
  if (savedItems) {
    myItems = JSON.parse(savedItems);

    myItems.forEach((item) => {
      const newItem = createItem(item.postId, item.text);
      if (item.checked) {
        newItem.classList.add('checked');
        newItem.querySelector('.fa-circle-check').classList.add('clicked');
      }
    });
    renderItems();
  }
}

function renderItems() {
  items.innerHTML = '';
  myItems.forEach((item) => {
    const newItem = createItem(item.postId, item.text);
    if (item.checked) {
      newItem.classList.add('checked');
      newItem.querySelector('.fa-circle-check').classList.add('clicked');
    }
    items.appendChild(newItem);
  });
}

loadItems();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

const postBox = document.querySelector('.post_box');
const editInput = document.createElement('input');
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

  let postId = 'item-' + uuidv4();
function onAdd() {
  const text = input.value;
  // let postId = 'item-' + uuidv4();
  if (text === '') {
    input.focus();
    return;
  }
  const item = { postId, text };
  myItems.push(item);
  saveItems();

  const itemRow = createItem(postId, text);
  items.appendChild(itemRow);
  itemRow.scrollIntoView({ block: 'center' });
  input.value = '';

  input.focus();
}

function createItem(postId, text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('id', postId);
  itemRow.innerHTML = `
    <div class="item">
        <button class="list__done" >
          <i class="fa-sharp fa-regular fa-circle-check"></i>
        </button>
        <span class="item_name">${text}</span>

      <div class="button_container">
            <button class="item_edit"}>Edit</button>
            <button class="item_delete" >
                <i class="fas fa-trash-alt"}></i>
            </button>
      </div>
    </div>
    <div class="item_divider"></div>`;

  const editButton = itemRow.querySelector('.item_edit');
  editButton.addEventListener('click', (e) => editUpdate(e, postId, text));

  saveItems();
  return itemRow;
}

items.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const listItem = clickedElement.closest('.item_row');
  if (!listItem) return;

  const id = parseInt(listItem.dataset.id);
  if (listItem) {
    if (clickedElement.classList.contains('fa-trash-alt')) {
      myItems = myItems.filter((item) => item.id !== id);
      
      listItem.remove();
      saveItems();
    }
  }

  if (clickedElement.classList.contains('fa-circle-check')) {
    listItem.classList.toggle('checked');
    clickedElement.classList.toggle('clicked');
    const foundItem = myItems.find((item) => item.id === id);
    foundItem.checked != foundItem.checked;
    saveItems();
  }
});

function editUpdate(event, postId, text) {
  const itemName = document.querySelector(`#${postId} .item_name`);
  const editBtn = document.querySelector(`#${postId} .item_edit`);

  if (event.target.innerText === 'Update') {
    itemName.innerText = editInput.value;
    editInput.value = '';
    editBtn.innerText = 'Edit';
  } else {
    itemName.innerHTML = '';

    editInput.type = 'text';
    editInput.className = 'editInput';
    itemName.appendChild(editInput);
    editInput.focus();
    editBtn.innerText = 'Update';
  }

  saveItems();
}
