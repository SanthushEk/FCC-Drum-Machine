import React from 'react'
import './App.css'

// Define an array of audio clips with properties for each clip
const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];



function App() {
  // Define state variables for volume, recording, and speed
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.5);

  // Function to play the recorded sound sequence
  const playRecording = () => {
    let index = 0;
    const recordArray = recording.split("");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]) as HTMLAudioElement;
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1);
  };
  return (

    // Drum Pad
    <div className="container" id="drum-machine">
      <h2>Drum Machine</h2>
      <div className='drum-pad'>
        {audioClips.map((clip) => (
          <Pad
            key={clip.id}
            clip={clip}
            volume={volume}
            setRecording={setRecording}
          />
        ))}
        <div id='display'></div>
      </div>
      <p className='signature'>Design By SanthushEK</p>
      <br />
      <h4>Volume</h4>
      <input
        type="range"
        step="0.01"
        value={volume}
        max="1"
        min="0"
        className="range"
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />


      <h3 id='display'>{recording}</h3>
      {recording && (
        <>
          <button onClick={playRecording} className="btn-play">
            Play
          </button>
          <button onClick={() => setRecording("")} className="btn-close">
            Clear
          </button>
          <br />
          <h4>Speed</h4>
          <input
            type="range"
            step="0.01"
            value={speed}
            max="1.2"
            min="0.1"
            className="range"
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />

        </>
      )}

    </div>
  );
}

function Pad({ clip, volume, setRecording }) {
  const [active, setActive] = React.useState(false);

  // Add an event listener for key presses to trigger the playSound function
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  // Function to handle key presses and play the corresponding audio
  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  // Function to play the audio clip and update the recording
  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + String(clip.keyTrigger));
  };

  return (
    <div
      onClick={playSound}
      className={`btn btn-secondary p-4 m-3 ${active ? "btn-warning" : ""}`}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
      
    </div>
  );
}


export default App
