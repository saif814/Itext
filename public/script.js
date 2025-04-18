document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('translateButton').addEventListener('click', async () => {
        const text = document.getElementById('inputText').value.trim();
        const targetLang = document.getElementById('targetLanguage').value;

        if (!text) {
            document.getElementById('outputText').innerText = 'Please enter text to translate.';
            return;
        }

        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, targetLang })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('outputText').innerText = data.translatedText;
        } else {
            document.getElementById('outputText').innerText = `Error: ${data.error}`;
        }
    });

    document.getElementById('extractAudioButton').addEventListener('click', async () => {
        const videoFile = document.getElementById('videoUpload').files[0];
        
        if (!videoFile) {
            document.getElementById('audioOutputText').innerText = 'Please upload a video file.';
            return;
        }

        const formData = new FormData();
        formData.append('video', videoFile);

        const response = await fetch('/extract-audio', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('audioOutputText').innerText = data.extractedText;
        } else {
            document.getElementById('audioOutputText').innerText = `Error: ${data.error}`;
        }
    });

    document.getElementById('speakButton').addEventListener('click', async () => {
        const text = document.getElementById('speakTextArea').value.trim();
        const targetLang = document.getElementById('speakLanguage').value;

        if (!text) {
            alert('Please enter text to speak.');
            return;
        }

        const response = await fetch('/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, targetLang })
        });

        const data = await response.json();

        if (response.ok) {
            const audioUrl = data.audioUrl;
            const audio = new Audio(audioUrl);
            audio.play().catch(err => {
                console.error('Error playing audio:', err);
                alert('Could not play audio.');
            });
        } else {
            alert(`Error: ${data.error}`);
        }
    });
});
