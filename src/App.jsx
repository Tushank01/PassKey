"use client";

import React, { useState, useEffect } from "react";
import { TextScramble } from "./components/text-scramble";

const generatePassword = (length, options) => {
  const { includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

  let validChars = "";
  if (includeUppercase) validChars += uppercase;
  if (includeLowercase) validChars += lowercase;
  if (includeNumbers) validChars += numbers;
  if (includeSymbols) validChars += symbols;

  if (!validChars) return "Please select at least one character type.";

  let password = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * validChars.length);
    password += validChars[index];
  }

  return password;
};

export default function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  const options = { includeUppercase, includeLowercase, includeNumbers, includeSymbols };

  const handleGenerate = () => {
    const pwd = generatePassword(length, options);
    setPassword(pwd);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (password && !password.includes("Please select")) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy password');
      }
    }
  };

  useEffect(() => {
    // Trigger scramble on first render
    setScrambleTrigger(true);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800 leading-tight text-center break-words">
            Instantly generate a secure, random{" "}
            <TextScramble
              className="bg-yellow-300 px-2 py-1 mt-2 rounded-md text-black inline-block"
              speed={0.07}
              duration={0.6}
              trigger={scrambleTrigger}
              onScrambleComplete={() => setScrambleTrigger(false)}
            >
              password
            </TextScramble>{" "}
            with us
          </h1>

          <p className="text-lg text-gray-600">
            Use our online password generator tool to instantly create a secure, random password.
          </p>
        </div>

        {/* Customization Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <h2 className="text-2xl font-normal text-gray-800 mb-6">Customize your password</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-base text-gray-700 font-medium">Password Length</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value) || 4)}
                    className="w-20 h-12 border-2 border-gray-300 rounded text-center text-lg font-medium focus:border-red-500 focus:outline-none"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="4"
                      max="64"
                      value={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="passwordType"
                    className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">All characters</span>
                  <div className="relative group inline-block">
  <span className="text-white text-xs bg-gray-400 rounded-full px-1 cursor-default">i</span>

  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white text-black text-sm rounded-md p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
    Any character combinations like <strong>!, 7, h, K,</strong> and <strong>| 1</strong>
  </div>
</div>

                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {[
                { key: 'includeUppercase', label: 'Uppercase', state: includeUppercase, setter: setIncludeUppercase },
                { key: 'includeLowercase', label: 'Lowercase', state: includeLowercase, setter: setIncludeLowercase },
                { key: 'includeNumbers', label: 'Numbers', state: includeNumbers, setter: setIncludeNumbers },
                { key: 'includeSymbols', label: 'Symbols', state: includeSymbols, setter: setIncludeSymbols }
              ].map(({ key, label, state, setter }) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={() => setter(!state)}
                    className="w-5 h-5 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-700 text-base">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleGenerate}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Generate Password
            </button>
          </div>
        </div>

        {/* Generated Password Display */}
        {password && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-4">
              <div className="flex-1">
                <div className="font-mono text-xl text-gray-800 break-all">
                  {password}
                </div>
                {!password.includes("Please select") && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={handleGenerate}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Generate new password"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
            
            {copied && (
              <div className="text-center text-green-600 font-medium mt-3">
                ✓ Password copied to clipboard!
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider {
          background: linear-gradient(to right, #dc2626 0%, #dc2626 ${((length - 4) / (64 - 4)) * 100}%, #d1d5db ${((length - 4) / (64 - 4)) * 100}%, #d1d5db 100%);
        }
      `}</style>
    </div>
  );
}
