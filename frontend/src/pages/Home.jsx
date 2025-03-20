import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioUrl, setAudioUrl] = useState(null);

  // Load Available Voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Function to Speak & Record Audio
  const handleSpeak = () => {
    if (!text) return;

    const speech = new SpeechSynthesisUtterance(text);
    const selected = voices.find((voice) => voice.name === selectedVoice);
    if (selected) {
      speech.voice = selected;
    }

    speech.lang = selected ? selected.lang : "en-US";
    speech.volume = 1;
    speech.rate = speed;
    speech.pitch = pitch;

    speech.onstart = () => {
      setIsSpeaking(true);
      startRecording();
    };
    speech.onend = () => {
      setIsSpeaking(false);
      stopRecording();
    };

    window.speechSynthesis.speak(speech);
  };

  // Start Recording Audio
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.start();
  };

  // Stop Recording & Prepare Download
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };
    }
  };

  // Stop Speech
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    stopRecording();
  };

  // Clear Text
  const handleClear = () => {
    setText("");
    handleStop();
  };

  return (
    <div style={{ backgroundColor: "#1E1E1E", minHeight: "100vh", color: "white" }}>

    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🌍 Multi-Language Text-to-Speech</h1>
      <p className="text-lg text-gray-400 mb-4">Type text, choose a language & listen!</p>

      {/* Language Dropdown */}
      <select
        className="mb-4 p-2 border rounded bg-gray-800 text-white"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      {/* Speed & Pitch Controls */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="text-gray-300">Speed: {speed.toFixed(1)}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
        <div>
          <label className="text-gray-300">Pitch: {pitch.toFixed(1)}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      {/* Text Input */}
      <textarea
        className="w-2/3 p-3 border border-gray-600 rounded-md bg-gray-800 text-white"
        rows="4"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={`px-6 py-2 font-bold rounded-md transition-all ${
            isSpeaking ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-gray-600"
          }`}
        >
          {isSpeaking ? "Speaking..." : "Speak"}
        </button>
        <button
          onClick={handleStop}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md"
        >
          Stop
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md"
        >
          Clear
        </button>
        {audioUrl && (
          <a
            href={audioUrl}
            download="speech.mp3"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
          >
            Download
          </a>
        )}
      </div>
    </div>
     </div>
  );
};

export default Home;
