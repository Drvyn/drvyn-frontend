// src/components/SocialShareButtons.tsx

"use client";

import { useState, useEffect } from 'react';

// Define the props the component will accept
interface SocialShareButtonsProps {
  title: string;
}

export default function SocialShareButtons({ title }: SocialShareButtonsProps) {
  const [postUrl, setPostUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setPostUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };
  
  const handlePrint = () => {
    window.print();
  };

  if (!postUrl) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Share this post</h3>
      <div className="flex flex-wrap items-center gap-4">
        
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="p-2 bg-[#25D366] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2.02c-5.52 0-9.99 4.47-9.99 9.99 0 1.77.46 3.45 1.28 4.95L2 22l5.25-1.38c1.45.77 3.06 1.21 4.79 1.21 5.52 0 9.99-4.47 9.99-9.99S17.56 2.02 12.04 2.02zM12.04 20.12c-1.5 0-2.92-.39-4.18-1.09l-.3-.18-3.12.82.83-3.04-.2-.32c-.8-1.32-1.23-2.84-1.23-4.41 0-4.48 3.65-8.13 8.13-8.13 4.48 0 8.13 3.65 8.13 8.13s-3.65 8.13-8.13 8.13zm4.43-6.23c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.93-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2s-1.4-1.85-1.57-2.15c-.17-.3-.02-.46.1-.6.11-.14.24-.35.37-.52.12-.17.16-.28.24-.47.08-.18.04-.34-.02-.46-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.55-.42-.14 0-.3 0-.46 0-.16 0-.42.06-.64.3s-.87.85-1.06 2.05c-.2 1.2.87 2.38 1 2.54s1.75 2.67 4.24 3.73c.59.25 1.05.4 1.41.51.58.18 1.11.16 1.52.1.47-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
          </svg>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="p-2 bg-[#1877F2] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="p-2 bg-[#000000] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          className="p-2 bg-[#24A1DE] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.31 11.95c-.74-.24-.74-.72.13-1.02l16.22-6.29c.63-.24 1.15.15.96.88L20.24 18c-.19.82-.69.99-1.32.65l-4.57-3.35-2.21 2.12c-.24.24-.44.43-.79.43z"/>
          </svg>
        </a>

        {/* Pinterest - NEW */}
        <a
          href={`https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Pinterest"
          className="p-2 bg-[#E60023] text-white rounded-md hover:opacity-90 transition-opacity"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
        </a>
        
        {/* Mail */}
        <a
          href={`mailto:?subject=${encodedTitle}&body=Check%20out%20this%20post:%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share via Email"
          className="p-2 bg-[#777777] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="p-2 bg-[#0A66C2] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        
        {/* Copy Link & Print (Utility Buttons) */}
        <button
          onClick={handleCopyLink}
          aria-label="Copy link to clipboard"
          className="p-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        
        <button
          onClick={handlePrint}
          aria-label="Print this page"
          className="p-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}