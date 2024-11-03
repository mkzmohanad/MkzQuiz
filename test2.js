async function sendQuestion() {
    const question = document.getElementById("question").value;
    const userId = document.getElementById("userId").value;
    const chatHistoryDiv = document.getElementById("chat-history");

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("question", question);
    formData.append("is_image", "false");

    try {
        const response = await fetch("/chat", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Error in request");
        }

        const data = await response.json();
        const assistantResponse = data.response || "No response from assistant";

        chatHistoryDiv.innerHTML += <div class="chat-message"><strong>Assistant:</strong> ${assistantResponse}</div>;
        chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;

        document.getElementById("question").value = "";
    } catch (error) {
        console.error("Error sending question:", error);
        alert("An error occurred. Please try again.");
    }
}
