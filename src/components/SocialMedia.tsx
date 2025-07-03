import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="fixed bottom-10 right-6 flex flex-col space-y-4 z-20">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="text-black hover:text-blue-400 text-3xl transition duration-300 hover:scale-110" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="text-black hover:text-red-300 text-3xl transition duration-300 hover:scale-110" />
      </a>
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="text-black hover:text-red-500 text-3xl transition duration-300 hover:scale-110" />
      </a>
    </div>
  );
};
export default SocialMedia;
