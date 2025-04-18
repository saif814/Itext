IText – Multilingual Text & Speech Converter

IText: A Smart Language Conversion Tool for Text, Speech, and Audio Extraction

🎯 Objective:

    The aim of this project is to build a web-based application that allows users to:

    Translate typed text into various Indian languages.

    Convert text into natural-sounding speech (Text-to-Speech).

    Extract and convert speech from uploaded videos to readable text (Speech-to-Text).

    This tool is especially helpful for multilingual communication, language learners, content creators, and accessibility users.


🛠️ Technologies Used:

    Node.js – Backend runtime

    Express.js – Web server framework

    HTML/CSS/JavaScript – Frontend

    Axios – For handling API calls

    Multer – For file uploads

    FFmpeg – For extracting audio from video

    Sarvam AI APIs – For translation, speech-to-text, and text-to-speech features

🧩 Features:

    Text Translation
    Users can input English text and translate it into multiple Indian languages such as Hindi, Bengali, Kannada, etc.

    Text-to-Speech
    Users can input any text and convert it into audio using a selected language and voice style.

    Speech-to-Text (via Video Upload)
    Users can upload a video file, and the app will extract audio, convert the speech to text, and show it on screen.


🖼️ System Architecture:

    Frontend (public/index.html)
    ↓
    Server (server.js - Node.js + Express)
    ↓
    Sarvam AI API (Translation, Speech)
    ↓
    Output (Translated Text, Audio, or Transcribed Speech)


🗂️ Folder Structure:

    itext-project/
    ├── server.js              # Backend logic
    ├── index.html             # Web UI
    ├── package.json           # Project metadata and dependencies
    ├── README.md              # (This file)
    |
    ├── public/                # Frontend assets
    │   ├── script.js          # Frontend logic (buttons, fetch, etc.)
    │   └── style.css          # UI styling
    │
    ├── uploads/               # Temporary storage for uploaded videos/audio
    └── node_modules/          # Auto-generated after installing packages


🔄 How It Works:

    Start the server

    node server.js
    Runs a local server at http://localhost:3000

    Translate Text

    User inputs text.

    Selects language.

    Clicks Translate → API returns translated text.

    Text-to-Speech

    User inputs text.

    Clicks Speak → Server sends it to API → Audio file is returned and stored.

    Speech-to-Text (Video Upload)

    User uploads a video.

    Server extracts audio using FFmpeg.

    Sends to API → Transcribed text is returned.


🔚 Conclusion:

    IText provides an all-in-one multilingual experience combining translation, text-to-speech, and speech recognition features. The project demonstrates practical usage of APIs, file handling, and full-stack development.


🙋 Made by:

    SaifSidd
    CSE @ 2028