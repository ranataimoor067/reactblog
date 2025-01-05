import React from "react";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";

function Footer() {
  return (
    <footer className="bg-green-900 text-white p-6 mt-8 w-full">
      <div className="container flex justify-between flex-wrap w-full">
        <div className="w-full md:w-1/3 mb-4">
          <h3 className="font-bold text-lg">React Blog</h3>
          <p className="text-sm">
            Share your story, inspire the world. A platform for bloggers and
            readers.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-4">
          <h3 className="font-bold text-lg">Quick Links</h3>
          <ul className="text-sm">
            <li className="mt-2">
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li className="mt-2">
              <a href="/about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li className="mt-2">
              <a href="/article-list" className="hover:text-gray-300">
                Articles
              </a>
            </li>
            <li className="mt-2">
              <a href="/faq" className="hover:text-gray-300">
                FAQ's
              </a>
            </li>
            <li className="mt-2">
              <a
                href="https://github.com/OkenHaha/react-blog/graphs/contributors"
                className="hover:text-gray-300"
              >
                Contributors
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-4">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div className="flex mt-2 space-x-4">
            <a href="https://www.facebook.com/">
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://x.com/">
              <img src={twitter} alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-sm">
        © 2025 React Blog. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
