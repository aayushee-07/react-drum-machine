import React, { useState, useEffect } from "react";
import "./App.css";

const bankOne = [
  { keyCode: 81, keyTrigger: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { keyCode: 87, keyTrigger: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { keyCode: 69, keyTrigger: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { keyCode: 65, keyTrigger: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { keyCode: 83, keyTrigger: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { keyCode: 68, keyTrigger: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { keyCode: 90, keyTrigger: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { keyCode: 88, keyTrigger: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { keyCode: 67, keyTrigger: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

const bankTwo = [
  { keyCode: 81, keyTrigger: "Q", id: "Chord-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
  { keyCode: 87, keyTrigger: "W", id: "Chord-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
  { keyCode: 69, keyTrigger: "E", id: "Chord-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
  { keyCode: 65, keyTrigger: "A", id: "Shaker", url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
  { keyCode: 83, keyTrigger: "S", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
  { keyCode: 68, keyTrigger: "D", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
  { keyCode: 90, keyTrigger: "Z", id: "Punchy-Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
  { keyCode: 88, keyTrigger: "X", id: "Side-Stick", url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
  { keyCode: 67, keyTrigger: "C", id: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }
];

function App() {
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(true);
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const clips = bank ? bankOne : bankTwo;

  const playSound = (keyTrigger, id, url) => {
    if (!power) return;
    const audio = document.getElementById(keyTrigger);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setDisplay(id);
  };

  const handleKeyPress = (e) => {
    const clip = clips.find(c => c.keyCode === e.keyCode);
    if (clip) playSound(clip.keyTrigger, clip.id, clip.url);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div id="drum-machine">
      <div className="pad-bank">
        {clips.map(clip => (
          <div
            className="drum-pad"
            id={clip.id}
            key={clip.keyTrigger}
            onClick={() => playSound(clip.keyTrigger, clip.id, clip.url)}
          >
            {clip.keyTrigger}
            <audio className="clip" id={clip.keyTrigger} src={clip.url}></audio>
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="control">
          <p>Power</p>
          <div className="toggle" onClick={() => setPower(!power)}>
            <div className={`inner ${power ? "on" : "off"}`}></div>
          </div>
        </div>
        <div id="display">{display || "----"}</div>
        <div className="control">
          <input
            type="range"
            step="0.01"
            min="0"
            max="1"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value);
              setDisplay(`Volume: ${Math.round(e.target.value * 100)}`);
              setTimeout(() => setDisplay(""), 1000);
            }}
          />
        </div>
        <div className="control">
          <p>Bank</p>
          <div className="toggle" onClick={() => setBank(!bank)}>
            <div className={`inner ${bank ? "on" : "off"}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;