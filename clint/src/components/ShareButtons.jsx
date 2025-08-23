import React, { useState } from "react";
import { assets } from "../assets/assets";

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,

    twitter: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <p className="font-semibold text-gray-700">Share</p>

      {/* LinkedIn Share Button */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
      >
        <svg
          className="w-6 h-6 text-gray-600 hover:text-blue-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* X (Twitter) Share Button */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
      >
        <svg
          className="w-6 h-6 text-gray-600 hover:text-black"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Others (Copy URL) Button */}
      <button onClick={handleCopy} title="Copy link">
        {copied ? (
          <span className="text-green-600 font-semibold">Copied!</span>
        ) : (
          <svg
            className="w-6 h-6 text-gray-600 hover:text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
