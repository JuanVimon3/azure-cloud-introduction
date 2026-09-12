const chapters = [
  'Introduction to the cloud',
  'Introduction to Microsoft Azure',
  'Essential management and development tools',
  'Essential Azure components',
  'Applications and web pages in Azure'
];

const chapterButtons = document.querySelectorAll('.chapter-link');
const lessonCards = document.querySelectorAll('.lesson-card');
const progressBar = document.querySelector('#progress-bar');
const progressLabel = document.querySelector('#progress-label');
const continueButton = document.querySelector('#continue-button');
const toast = document.querySelector('#toast');
let activeChapter = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function selectChapter(index) {
  activeChapter = index;
  chapterButtons.forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === index);
    button.querySelector('.status-dot').classList.toggle('current', buttonIndex === index);
  });
  lessonCards.forEach((card, cardIndex) => card.classList.toggle('selected', cardIndex === index));
  const percent = Math.round(((index + 1) / chapters.length) * 100);
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `${percent}%`;
  document.querySelector('.hero-art').setAttribute('aria-label', `Chapter ${index + 1}: ${chapters[index]}`);
  if (index > 0) showToast(`${chapters[index]} selected.`);
}

chapterButtons.forEach((button, index) => button.addEventListener('click', () => selectChapter(index)));
lessonCards.forEach((card, index) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;
    selectChapter(index);
  });
  card.querySelector('.lesson-arrow').addEventListener('click', () => {
    selectChapter(index);
    showToast(`${chapters[index]} is ready to begin.`);
  });
});

continueButton.addEventListener('click', () => {
  showToast(`Opening lesson 01.02 in ${chapters[activeChapter]}.`);
});
