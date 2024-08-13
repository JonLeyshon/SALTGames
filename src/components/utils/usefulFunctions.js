import axios from "axios";
import { url } from "../../config";

export const handleCardRetrieval = async (speech_sound, syllables) => {
  try {
    let results;

    if (syllables) {
      results = await axios.get(
        `${url}/getImages?speech_sound=${speech_sound}&syllables=${syllables}`
      );
    } else {
      results = await axios.get(
        `${url}/getImages?speech_sound=${speech_sound}`
      );
    }

    if (results.data.length) {
      const newCardImages = results.data.map((result) => ({
        src: result.image_path,
        matched: false,
        word: result.word,
      }));

      return newCardImages;
    } else {
      console.error("Retrieval failed");
    }
  } catch (error) {
    console.error("Retrieval failed:", error);
  }
};
