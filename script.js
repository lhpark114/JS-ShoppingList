import { v4 as uuidv4 } from 'uuid';

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
  input.focus();
}

let id = 0;
let myuuid = uuidv4();
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', id);
  itemRow.setAttribute('myuuid', myuuid);
  itemRow.innerHTML = `
    <div class="item">
      <input type="checkbox" myuuid=${myuuid} id="row_check" value="1"/>
      <label for="row_check">
        <span class="item_name">${text}</span>
      </label>
      <div class="button_container">
            <button class="item_edit">Edit</button>
            <button class="item_delete" >
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
      </div>
    </div>
    <div class="item_divider"></div>`;
  id++;
  return itemRow;
}

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
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
