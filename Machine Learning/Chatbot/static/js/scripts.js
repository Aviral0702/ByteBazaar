const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');

function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    // Clear the input field
    userInput.value = '';

    // Send the message to the backend using fetch API
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: message })
    })
    .then(response => response.json())
    .then(data => {
      // Append the chatbot's response to the chat area
      chatArea.innerHTML += `<div class="chatbot-message">${data}</div>`;
      chatArea.scrollTop = chatArea.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
      console.error('Error sending message:', error);
      chatArea.innerHTML += `<div class="error-message">Error: ${error}</div>`;
    });
  }
}