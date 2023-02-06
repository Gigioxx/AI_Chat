import bot from './assets/bot.svg';
import user from './assets/user.svg';

// query selector for the form or input field
const form = document.querySelector('form');

// query selector for the chat container and messages
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// Function that will be called when the form is submitted
// Displays dots while the AI is processing the answer
function loader(element) {
  element.textContent = '';

  // When AI is processing the answer, will put a dot every 300ms up to 3 dots
  loadInterval = setInterval(() => {
    element.textContent += '.';

    // If there are 3 dots, clear the dots
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

// Function that writes the answer letter by letter
// It has a delay of 20ms between each letter
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// Generate unique id for each message
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// function that displays the message on the screen
function chatStripe(isAi, value, uniqueId) {
  return `
        <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
            <div class="profile">
              <img
                src="${isAi ? bot : user}"
                alt="${isAi ? 'bot' : 'user'}"
              />
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
          </div>
        </div>
      `;
}

// Function that will be called when the form is submitted
// It will display the user's message and the bot's answer
// It will also call the loader function
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chat
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // bot's chat
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  // Fetch data from server

  const response = await fetch('https://ai-chat-server.vercel.app/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = ' ';

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = 'Something went wrong';
    alert(err);
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSubmit(e);
});
