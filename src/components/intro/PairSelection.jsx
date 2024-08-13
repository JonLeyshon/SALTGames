import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSoundSelection,
  selectSyllableSelection,
  setSoundSelection,
  setSyllableSelection,
} from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Intro.css";
import { handleCardRetrieval } from "../utils/usefulFunctions";
import { setImages } from "../../redux/imagesSlice";
import { sounds } from "../utils/constants";

const PairSelection = () => {
  const [speechSound, setSpeechSound] = useState("");
  const [syllables, setSyllables] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSound = useSelector(selectSoundSelection);
  const selectedSyllable = useSelector(selectSyllableSelection);

  const handleSoundSelection = (sound) => {
    setSpeechSound(sound);
    dispatch(setSoundSelection(sound));
  };

  const handleSyllableSeletion = (selection) => {
    setSyllables(selection);
    dispatch(setSyllableSelection(selection));
  };

  const handleNextButton = async () => {
    const data = await handleCardRetrieval(selectedSound, selectedSyllable);
    dispatch(setImages(data));
    navigate("/players");
  };

  return (
    <div className="pairSelectionContainer">
      <h1>Welcome to your Speech Games</h1>
      <h2>Please select the sound you would like to work on</h2>

      <div className="speechSoundSelection">
        {sounds.map((sound) => (
          <button
            key={sound}
            onClick={() => handleSoundSelection(sound)}
            style={{
              color: selectedSound === sound ? "white" : "",
              backgroundColor: selectedSound === sound ? "#007bff" : "",
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
            color: selectedSyllable === 1 ? "white" : "",
            backgroundColor: selectedSyllable === 1 ? "#007bff" : "",
          }}
        >
          CVC
        </button>
        <button
          onClick={() => {
            handleSyllableSeletion(2);
          }}
          style={{
            color: selectedSyllable === 2 ? "white" : "",
            backgroundColor: selectedSyllable === 2 ? "#007bff" : "",
          }}
        >
          2 syllables
        </button>
        <button
          onClick={() => {
            handleSyllableSeletion("");
          }}
          style={{
            color: selectedSyllable === "" ? "white" : "",
            backgroundColor: selectedSyllable === "" ? "#007bff" : "",
          }}
        >
          Both
        </button>
      </div>

      {selectedSound && selectedSyllable !== null && (
        <button className="nextButton" onClick={() => handleNextButton()}>
          Next
        </button>
      )}
    </div>
  );
};

export default PairSelection;
