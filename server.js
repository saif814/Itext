const express = require('express');
const axios = require('axios');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Translation endpoint
app.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;

    try {
        const trimmedText = text.trim();
        const response = await axios.post('https://api.sarvam.ai/translate', {
            input: trimmedText,
            source_language_code: 'en-IN',
            target_language_code: targetLang,
            speaker_gender: 'Female',
            mode: 'formal',
            model: 'mayura:v1',
            enable_preprocessing: true
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-subscription-key': '948512be-47ef-43fe-8a85-86c2a20d6da5' 
            }
        });

        res.json({ translatedText: response.data.translated_text });
    } catch (error) {
        console.error('Translation error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data.error : 'Translation error' });
    }
});

// Audio extraction endpoint
app.post('/extract-audio', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded.' });
    }

    const videoPath = req.file.path;
    const audioPath = `uploads/${req.file.filename}.wav`; 

    exec(`ffmpeg -i "${videoPath}" -vn -acodec pcm_s16le -ar 44100 -ac 2 "${audioPath}"`, async (error) => {
        if (error) {
            console.error('Error extracting audio:', error);
            return res.status(500).json({ error: 'Audio extraction failed' });
        }

        const formData = new FormData();
        formData.append('file', fs.createReadStream(audioPath));
        formData.append('prompt', 'Your prompt here'); 
        formData.append('model', 'saaras:v1'); 

        try {
            const audioResponse = await axios.post('https://api.sarvam.ai/speech-to-text-translate', formData, {
                headers: {
                    ...formData.getHeaders(),
                    'api-subscription-key': '14fb0168-3263-4037-a40f-7887c4440b79' 
                }
            });

            res.json({ extractedText: audioResponse.data.transcript });
        } catch (audioError) {
            console.error('Error converting audio to text:', audioError.response ? audioError.response.data : audioError.message);
            res.status(500).json({ error: 'Audio to text conversion failed' });
        }
    });
});

// Text-to-speech endpoint
app.post('/text-to-speech', async (req, res) => {
    const { text, targetLang } = req.body;

    try {
        const response = await axios.post('https://api.sarvam.ai/text-to-speech', {
            inputs: [text],
            target_language_code: targetLang,
            speaker: 'meera',
            pitch: 0,
            pace: 1.65,
            loudness: 1.5,
            speech_sample_rate: 8000,
            enable_preprocessing: true,
            model: 'bulbul:v1'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-subscription-key': '14fb0168-3263-4037-a40f-7887c4440b79' 
            }
        });

        const audioBase64 = response.data.audios[0];
        const audioBuffer = Buffer.from(audioBase64, 'base64');
        const audioFileName = `audio_${Date.now()}.wav`;
        fs.writeFileSync(`./public/${audioFileName}`, audioBuffer);

        res.json({ audioUrl: `/${audioFileName}` });
    } catch (error) {
        console.error('Text to speech error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Text to speech conversion failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
