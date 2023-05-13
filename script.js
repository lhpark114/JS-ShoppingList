const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');
const form = document.querySelector('.new_form');
const itemName = document.querySelector('.item_name');

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

let id = 0; // UUID
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <input type="checkbox" id="item_name_check" value="1"/>
      <label for="item_name_check">
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

const editBTN = document.querySelector('.item_edit');
const newItemInput = document.createElement('input');
editBTN.addEventListener('click', (event) => {
  console.log('dfdfdfdf');
  itemName.innerHTML = '';
  
  newItemInput.type = 'text';
  newItemInput.className = 'newItemInput';
  itemName.appendChild(newItemInput);
  newItemInput.focus();
  
  editBTN.innerText='Update';
  
  updateItem();
});

function updateItem() {
  const updatedItem = newItemInput.value;
  editBTN.addEventListener('click', () => {
  const newSpan = document.createElement('span');
  itemName.appendChild(newSpan);})
  

};