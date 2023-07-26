const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');
const form = document.querySelector('.new_form');

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
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  saveItems();
  input.focus();
}

function createItem(text, id) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', id || Date.now());
  itemRow.innerHTML = `
    <div class="item">
      <input type="checkbox" value="1"/>
      <label>
        <span class="item_name">${text}</span>
      </label>
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
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(
      `.item_row[data-id="${id || Date.now()}"]`
    );
    toBeDeleted.remove();
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
});

const myItems = [];
function saveItems() {
  localStorage.setItem('items', JSON.stringify(myItems));
}

const savedItems = localStorage.getItem();
