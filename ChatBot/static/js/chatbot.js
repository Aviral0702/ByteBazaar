document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");

    sendBtn.addEventListener("click", () => {
        const query = userInput.value;
        if (query.trim()) {
            appendMessage(query, "user");
            fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    appendMessage(data.error, "bytebot");
                } else {
                    const product = data.most_similar_product;
                    const reply = `Product: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}\nDescription: ${product.description}\nDiscount: ${product.discount}`;
                    appendMessage(reply, "bytebot");
                }
            })
            .catch(error => {
                appendMessage("An error occurred. Please try again.", "bytebot");
            });
        }
        userInput.value = "";
    });

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });

    function appendMessage(text, sender) {
        const message = document.createElement("div");
        message.classList.add("message", sender);

        const messageText = document.createElement("div");
        messageText.classList.add("text");
        messageText.innerText = text;

        message.appendChild(messageText);
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
