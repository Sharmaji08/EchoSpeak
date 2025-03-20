import { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");

  const speakText = () => {
    if (!text.trim()) return;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Text to Speech Converter</h1>
      <textarea
        className="w-full max-w-lg h-40 p-3 text-black rounded-md"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={speakText}
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
      >
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
