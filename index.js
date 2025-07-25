

const toggle = document.getElementById('darkToggle');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
});
