import React, { useState } from "react";
import { Textarea } from "../ui/textarea";

const About = () => {
  const [aboutText, setAboutText] = useState("");

  return (
    <div className="p-2 my-8">
      <h1 className="text-lg font-bold mb-4 text-white">About Me</h1>

      {/* Outer box */}
      <div className="relative w-full bg-[#1A1A1A] border border-gray-700 rounded-xl p-4">
        <Textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Write something about yourself..."
          maxLength={500}
          className="
            w-full
            bg-[#111111]
            text-white
            placeholder-gray-400
            border border-gray-700
            rounded-lg
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
            transition-all
            min-h-[120px]
            resize-none
            p-3
          "
        />
        {/* Counter inside textarea */}
        <span className="absolute bottom-6 right-6 text-xs text-gray-400 pointer-events-none">
          {aboutText.length}/500
        </span>
      </div>
    </div>
  );
};

export default About;
