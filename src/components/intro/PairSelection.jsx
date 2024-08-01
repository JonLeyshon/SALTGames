import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSoundSelection, setSyllableSelection } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import "../../css/Intro.css";

const PairSelection = () => {
  const [speechSound, setSpeechSound] = useState("");
  const [syllables, setSyllables] = useState(null);

  const dispatch = useDispatch();

  const sounds = ["b", "d", "f", "g", "k", "l", "p", "r", "s", "sh", "t"];

  const handleSoundSelection = (sound) => {
    setSpeechSound(sound);
    dispatch(setSoundSelection(sound));
  };

  const handleSyllableSeletion = (selection) => {
    setSyllables(selection);
    dispatch(setSyllableSelection(selection));
  };

  return (
    <div className="pairSelectionContainer">
      <h1>Welcome to your Minimal Pairs Speech Games</h1>
      <h2>Please select the sound you would like to work on</h2>

      <div className="speechSoundSelection">
        {sounds.map((sound) => (
          <button
            key={sound}
            onClick={() => handleSoundSelection(sound)}
            style={{
              color: speechSound === sound ? "white" : "",
              backgroundColor: speechSound === sound ? "#007bff" : "",
            }}
          >
            {sound}
          </button>
        ))}
      </div>

      <h2> Would you like CVC words or 2 syllables?</h2>
      <div className="speechSoundSelection">
        <button
          onClick={() => {
            handleSyllableSeletion(1);
          }}
          style={{
            color: syllables === 1 ? "white" : "",
            backgroundColor: syllables === 1 ? "#007bff" : "",
          }}
        >
          CVC
        </button>
        <button
          onClick={() => {
            handleSyllableSeletion(2);
          }}
          style={{
            color: syllables === 2 ? "white" : "",
            backgroundColor: syllables === 2 ? "#007bff" : "",
          }}
        >
          2 syllables
        </button>
        <button
          onClick={() => {
            handleSyllableSeletion("");
          }}
          style={{
            color: syllables === "" ? "white" : "",
            backgroundColor: syllables === "" ? "#007bff" : "",
          }}
        >
          Both
        </button>
      </div>

      {speechSound && syllables !== null && (
        <Link to="/players">
          <button className="nextButton">Next</button>
        </Link>
      )}
    </div>
  );
};

export default PairSelection;
