import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img src={assets.folyo} alt="logo" className="w-32 mb-4" />
            <p className="text-sm leading-relaxed">
              Folyo is a modern platform for writers and readers to connect,
              share ideas, and discover new perspectives.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footer_data.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">
                  {section.title == "Social" ? `Stay connected` : section.title}
                </h4>

                {/* Check if the title is "Social" to render icons instead of text links */}
                {section.title === "Social" ? (
                  <div className="flex gap-4">
                    {section.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={link.icon}
                          alt={link.name}
                          className="w-8 h-8"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-sm hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr className="my-8 border-gray-700" />
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Folyo. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
