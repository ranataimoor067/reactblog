import React from "react";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-indigo-500 text-white p-6 mt-8 w-full">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* About Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="font-bold text-lg">React Blog</h3>
          <p className="text-sm mt-2">
            Share your story, inspire the world. A platform for bloggers and
            readers.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="font-bold text-lg">Quick Links</h3>
          <ul className="text-sm mt-2">
            <li className="mt-2">
              <a href="/" className="hover:underline hover:text-gray-300">
                Home
              </a>
            </li>
            <li className="mt-2">
              <a href="/about" className="hover:underline hover:text-gray-300">
                About
              </a>
            </li>
            <li className="mt-2">
              <a
                href="/article-list"
                className="hover:underline hover:text-gray-300"
              >
                Articles
              </a>
            </li>
            <li className="mt-2">
              <a href="/faq" className="hover:underline hover:text-gray-300">
                FAQ's
              </a>
            </li>
            <li className="mt-2">
              <Link to="/contributors"
                className="hover:underline hover:text-gray-300"
              >
                Contributors
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div className="flex mt-4 space-x-4">
            <a
              href="https://www.facebook.com/"
              aria-label="Follow us on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/"
              aria-label="Follow us on Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/"
              aria-label="Follow us on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6 text-sm border-t border-indigo-500 pt-4">
        © 2025 React Blog. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
