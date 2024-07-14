async function analyzeSentiment() {
    const review = document.getElementById("review").value;
    const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review: review })
    });

    const result = await response.json();
    document.getElementById("result").innerText = `Sentiment: ${result[0].label}, Score: ${result[0].score}`;
}
