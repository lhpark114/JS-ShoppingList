const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');
const form = document.querySelector('.new_form');

let myItems = [];
const listKey = 'myItems';

function saveItems() {
  localStorage.setItem(listKey, JSON.stringify(myItems));
}

function loadItems() {
  const savedItems = localStorage.getItem(listKey);
  if (savedItems) {
    myItems = JSON.parse(savedItems);
  
    myItems.forEach(item => {
      const newItem = createItem(item.text, item.id);
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
    const newItem = createItem(item.text, item.id);
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

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  const item = { text, id: Date.now() };
  myItems.push(item);
  saveItems();

  const itemRow = createItem(text, item.id);
  items.appendChild(itemRow);
  itemRow.scrollIntoView({ block: 'center' });
  input.value = '';

  input.focus();
}

function createItem(text, id) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', id || Date.now());
  itemRow.innerHTML = `
    <div class="item">
        <button class="list__done" >
          <i class="fa-sharp fa-regular fa-circle-check"></i>
        </button>
        <span class="item_name">${text}</span>

      <div class="button_container">
            <button class="item_edit">Edit</button>
            <button class="item_delete" >
                <i class="fas fa-trash-alt" data-id=${id || Date.now()}></i>
            </button>
      </div>
    </div>
    <div class="item_divider"></div>`;
  return itemRow;
}

items.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const listItem = clickedElement.closest('.item_row');
  if (!listItem) return;

  const id = parseInt(listItem.dataset.id);
  if (listItem) {
    //  if trash icon clicked, delete the list
    if (clickedElement.classList.contains('fa-trash-can')) {
      myItems = myItems.filter(item => item.id !== id);
      saveItems();
      listItem.remove();
    }
  }

  //  if check-icon clicked, line-through the list
  if (clickedElement.classList.contains('fa-circle-check')) {
    listItem.classList.toggle('checked');
    clickedElement.classList.toggle('clicked');
      const foundItem = myItems.find((item) => item.id === id);
      foundItem.checked = !foundItem.checked;
    saveItems();
  }
});

const itemName = document.querySelector('.item_name');
const editBTN = document.querySelector('.item_edit');
const newItemInput = document.createElement('input');

editBTN.addEventListener('click', (event) => {
  if (event.target.innerText === 'Update') {
    itemName.innerText = newItemInput.value;
    newItemInput.value = '';
    editBTN.innerText = 'Edit';
  } else {
    itemName.innerHTML = '';

    newItemInput.type = 'text';
    newItemInput.className = 'newItemInput';
    itemName.appendChild(newItemInput);
    newItemInput.focus();

    editBTN.innerText = 'Update';
  }

  saveItems();
});
