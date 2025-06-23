// components/Navbar.jsx
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-transparent backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section: Nav links */}
        <div className="flex space-x-8 text-sm font-medium text-black">
          <div className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <span>Features</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="cursor-pointer hover:opacity-80">Products</span>
          <span className="cursor-pointer hover:opacity-80">Resources</span>
          <span className="cursor-pointer hover:opacity-80">Contact</span>
        </div>

        {/* Right section: Buttons */}
        <div className="flex space-x-4">
          <button className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
            Sign in
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
            Start for free
          </button>
        </div>
      </div>
    </nav>
  );
}
