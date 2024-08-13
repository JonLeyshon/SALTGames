import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { sounds } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSoundSelection,
  selectSyllableSelection,
  setSoundSelection,
  setSyllableSelection,
} from "../../redux/userSlice";
import { setImages } from "../../redux/imagesSlice";
import { handleCardRetrieval } from "../utils/usefulFunctions";

const Header = () => {
  const [showSoundsMenu, setShowSoundsMenu] = useState(false);
  const dispatch = useDispatch();
  const selectedSound = useSelector(selectSoundSelection);
  const selectedSyllables = useSelector(selectSyllableSelection);
  const dropdownRef = useRef(null);

  const toggleSoundsMenu = () => {
    setShowSoundsMenu((prev) => !prev);
  };

  const handleSoundSelection = (sound) => {
    dispatch(setSoundSelection(sound));
  };

  const handleSyllableSelection = (option) => {
    dispatch(setSyllableSelection(option));
  };

  const handleNextButton = async () => {
    const data = await handleCardRetrieval(selectedSound, selectedSyllables);
    dispatch(setImages(data));
    setShowSoundsMenu(false);
  };

  const closeMenus = () => {
    setShowSoundsMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Link to="/">
        {/* <p>SALT Games</p> */}
        <img src="/img/logo.png" alt="SALT Games" />
      </Link>
      <div className="menu">
        <p onClick={toggleSoundsMenu} className="headerText">
          Sounds
        </p>
        <div
          className={`dropdown ${showSoundsMenu ? "show" : ""}`}
          ref={dropdownRef}
        >
          <button className="closeButton" onClick={closeMenus}>
            &times;
          </button>
          <div className="soundsContainer">
            <h2> Choose which sound you'd like to switch to?</h2>
            <div className="sounds">
              {sounds.map((sound, index) => (
                <button
                  key={index}
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
          </div>
          <div className="syllablesContainer">
            <h2> Would you like CVC words or 2 syllables?</h2>
            <div className="syllables">
              <button
                className="syllableButton"
                onClick={() => handleSyllableSelection(1)}
                style={{
                  color: selectedSyllables === 1 ? "white" : "",
                  backgroundColor: selectedSyllables === 1 ? "#007bff" : "",
                }}
              >
                CVC
              </button>
              <button
                className="syllableButton"
                onClick={() => handleSyllableSelection(2)}
                style={{
                  color: selectedSyllables === 2 ? "white" : "",
                  backgroundColor: selectedSyllables === 2 ? "#007bff" : "",
                }}
              >
                2 Syllables
              </button>
              <button
                className="syllableButton"
                onClick={() => handleSyllableSelection("")}
                style={{
                  color: selectedSyllables === "" ? "white" : "",
                  backgroundColor: selectedSyllables === "" ? "#007bff" : "",
                }}
              >
                Both
              </button>
            </div>
          </div>
          {selectedSound && selectedSyllables !== null && (
            <button className="nextButton" onClick={() => handleNextButton()}>
              Done
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
