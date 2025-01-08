import React from "react";
import AboutImage from "../assets/read-blog.jpg"; // Replace with an appropriate image

function About() {
  return (
    <div className="w-full bg-gray-50 py-44">
      <div className="max-w-7xl mx-auto md:flex items-center justify-between">
        {/* Left Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={"https://static-blog.siteground.com/wp-content/uploads/sites/4/2022/02/what-is-a-blog-1200x600-1.jpeg"}
            alt="About Us"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={500}
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-extrabold mb-6 text-blue-800">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-blue-800">React Blog</span>, your go-to platform for creative expression. 
            We believe everyone has a story to share, an idea to spark, or a voice to amplify. Whether you're an aspiring 
            writer, a seasoned blogger, or a curious reader, our mission is to provide a seamless and inspiring space to explore 
            the art of storytelling.
          </p>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            At React Blog, we celebrate diverse perspectives and aim to connect like-minded individuals through shared experiences, 
            knowledge, and creativity. Let’s build a community where ideas flourish and inspiration knows no bounds!
          </p>
        </div>
		
      </div>
	  
    </div>
  );
}

export default About;