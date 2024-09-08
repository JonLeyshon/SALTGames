import "../../css/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <p>Jon Leyshon Code</p>
      <p>&copy; Copyright 2024</p>

      <div className="contactButtons">
        <a href="https://www.jonleyshoncodes.co.uk" target="_blank">
          <button>
            <FontAwesomeIcon icon={faGlobe} />
          </button>
        </a>

        <a href="https://github.com/JonLeyshon" target="_blank">
          <button>
            <FontAwesomeIcon icon={faGithub} />
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/jon-leyshon-338534a9/"
          target="_blank"
        >
          <button>
            <FontAwesomeIcon icon={faLinkedin} />
          </button>
        </a>
      </div>
      <div className="attributionLinks">
        <a
          href="https://www.flaticon.com/free-icons/water-melon"
          title="Water melon icons"
        >
          Water melon icons created by Iconriver - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/banana-juice"
          title="banana juice icons"
        >
          Banana juice icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/monkey"
          title="monkey icons"
        >
          Monkey icons created by smalllikeart - Flaticon
        </a>
      </div>
    </>
  );
};

export default Footer;
