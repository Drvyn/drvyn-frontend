const SocialMedia = () => {
  return (
    <div className="fixed bottom-10 right-6 flex flex-col space-y-4 z-20">
    <a
      href="https://wa.me/9840277116?text=Hi,%20I%E2%80%99d%20like%20to%20book%20a%20car%20repair%20service.%20Please%20let%20me%20know%20the%20available%20times.%20Thanks!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Smaller floating chat bubble */}
        <div className="absolute -top-16 right-0 bg-white p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-gray-700">Hey there! 👋</p>
          <div className="absolute -bottom-1.5 right-3 w-3 h-3 bg-white transform rotate-45"></div>
        </div>

        {/* Compact WhatsApp button */}
        <div className="relative w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-[0_0_10px_#25D366] group-hover:rotate-[8deg] overflow-hidden">
          {/* Diagonal stripes */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_8px)]"></div>
          
          {/* WhatsApp icon */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 relative z-10">
            <path fill="#fff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          
          {/* Ring animation */}
          <span className="absolute inset-0 rounded-xl border border-white opacity-0 group-hover:opacity-100 group-hover:animate-[ping_1.5s_ease-in-out_infinite]"></span>
        </div>
        
      
      </div>
    </a>

    </div>
  );
};
export default SocialMedia;



{/*
  <a
        href="https://www.facebook.com/caragecarcare/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="text-black hover:text-blue-400 text-3xl transition duration-300 hover:scale-110" />
      </a>
      <a
        href="https://www.instagram.com/caragecarcare/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="text-black hover:text-red-300 text-3xl transition duration-300 hover:scale-110" />
      </a>
      <a
        href="https://www.youtube.com/@caragecarcare"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="text-black hover:text-red-500 text-3xl transition duration-300 hover:scale-110" />
      </a>
  
  */}