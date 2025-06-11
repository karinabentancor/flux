const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function generateCalendar(year, month) {
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarHeader = document.getElementById('calendarHeader');
  calendarGrid.innerHTML = '';

  calendarHeader.textContent = months[month] + ' ' + year;

  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day');
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');


    const dateNumber = document.createElement('span');
    dateNumber.classList.add('date-number');
    dateNumber.textContent = day;
    dayCell.appendChild(dateNumber);

    const notes = document.createElement('div');
    notes.classList.add('notes');
    notes.setAttribute('contenteditable', 'true');
    notes.style.textAlign = 'left';
    dayCell.appendChild(notes);

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '🗑';
    trashBtn.addEventListener('click', (e) => {

      e.stopPropagation();
      notes.innerHTML = '';
    });
    dayCell.appendChild(trashBtn);

    calendarGrid.appendChild(dayCell);
  }
}


document.getElementById('monthSelector').addEventListener('change', (e) => {
  const selectedMonth = parseInt(e.target.value);
  const currentYear = new Date().getFullYear();
  generateCalendar(currentYear, selectedMonth);
});

window.addEventListener('load', () => {
  const today = new Date();
  document.getElementById('monthSelector').value = today.getMonth();
  generateCalendar(today.getFullYear(), today.getMonth());
});


const notes = document.querySelectorAll('.note');
const lists = document.querySelectorAll('.list');

let draggedNote = null;

function addDragEvents(note) {
  note.addEventListener('dragstart', () => {
    draggedNote = note;
    setTimeout(() => note.style.display = 'none', 0);
  });

  note.addEventListener('dragend', () => {
    setTimeout(() => {
      note.style.display = 'block';
      draggedNote = null;
    }, 0);
  });
}

lists.forEach(list => {
  list.addEventListener('dragover', (e) => e.preventDefault());

  list.addEventListener('drop', () => {
    if (draggedNote) list.appendChild(draggedNote);
  });
});

const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('ta');

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') return;

  const div = document.createElement('div');
  div.textContent = taskText;
  div.classList.add('note');
  div.draggable = true;
  addDragEvents(div);

  document.getElementById('todo').appendChild(div);
  newTaskInput.value = '';
}

notes.forEach(note => addDragEvents(note));
