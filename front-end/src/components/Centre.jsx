import React from "react";
import Home from "../assets/blog.png";
import Create from "../assets/write-blog.jpg"; 
import Read from "../assets/read-blog.jpg"; 
import mission from "../assets/mission.jpg" ; 
import values from "../assets/values.avif";
import vision from "../assets/vision.avif";


function Centre() {
  return (
    <div id="container" className="w-full flex flex-col items-center text-3xl">
      
      <div className="max-w-7xl mx-auto md:flex items-center justify-between mb-16">
        
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-blue-800">
            Welcome to <span className="text-yellow-500">React Blog</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Share your story, <span className="text-green-900 font-semibold">inspire the world! </span>
            Dive into exciting content and unleash your creativity with us. Join the journey of storytelling, innovation, and ideas.
          </p>
          <button className="px-8 py-3 bg-blue-800 text-white text-lg rounded-lg shadow-lg ">
            Read • Write • Repeat
          </button>
        </div>

        <div className="md:w-1/2 flex mt-16 justify-center">
          <img
            src={Home}
            alt="Blogging Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={550}
          />
        </div>
      </div>

      
      <div className="w-full bg-gray-100 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Explore & Share</h2>
        <p className="text-lg text-gray-600 mt-4">
          Your creativity deserves the perfect platform. Let's dive into the next steps.
        </p>
      </div>

      <div className="max-w-7xl mx-auto md:flex items-center justify-between mb-16">
       
        <div className="md:w-1/3 flex justify-center mt-10 mb-10 md:mb-0">
          <img
            src={Create}
            alt="Create Blog Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={500}
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Create Blog</h2>
          <p className="text-lg text-gray-700">
            Start your journey by creating blogs that matter. Share your voice with the world, inspire others, and build your personal brand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:flex items-center justify-between mb-16">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Read Blogs</h2>
          <p className="text-lg text-gray-700">
            Dive into a world of creativity and knowledge. Explore blogs from diverse topics and find the inspiration you've been searching for.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src={Read}
            alt="Read Blog Illustration"
            className="rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            width={550}
          />
        </div>
      </div>
      <section id="mission-vision-values" class="py-12">
  <div class="max-w-screen-xl mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold mb-6 text-blue-800">Our Mission, Vision & Values</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 border-2 border-gray-800 rounded-lg">
        <img src={mission} alt="Our Mission" class="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 class="text-2xl font-semibold text-blue-800 mb-2">Our Mission</h3>
        <p class="text-lg text-gray-700 text-center max-w-96">Our mission is to empower developers by providing high-quality content on React and front-end technologies. We foster a collaborative community where developers of all experience levels share ideas, solve problems, and stay up-to-date with the latest trends in the React ecosystem and web development.</p>
      </div>

      <div class="bg-white p-6 border-2 border-gray-800 rounded-lg">
        <img src={vision} alt="Our Vision" class="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 class="text-2xl font-semibold text-blue-800 mb-2">Our Vision</h3>
        <p class="text-lg text-gray-700 text-center max-w-96">Our vision is to become the leading platform for React developers, providing accessible tutorials, in-depth guides, and expert insights. We aim to cultivate a community where developers of all skill levels innovate, grow, and contribute to the advancement of React and modern web development practices.</p>
      </div>

      <div class="bg-white p-6 border-2 border-gray-800 rounded-lg">
        <img src={values} alt="Our Values" class="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 class="text-2xl font-semibold text-blue-800 mb-2">Our Values</h3>
        <p class="text-lg text-gray-700 text-center max-w-96">We value knowledge sharing, continuous learning, and community-driven development. Integrity, inclusivity, and innovation guide us. We prioritize creating content that is both informative and engaging while fostering an open, supportive environment where all voices are heard and respected by our community.</p>
      </div>

    </div>
  </div>
</section>

    </div>
   
  );
}

export default Centre;
