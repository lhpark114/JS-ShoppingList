'useStrict'

function todaysDate() {
  let date = new Date();
  let options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    day: '2-digit',
    year: 'numeric',
  };
  let formattedDate = date.toLocaleDateString(undefined, options);
  const header = document.querySelector('.header__date');
  header.innerHTML = ` ${formattedDate}
  
  `;
  return header;
}
todaysDate();