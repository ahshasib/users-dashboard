import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 shadow-lg sticky top-0 z-50 border-t border-gray-700">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        
        {/* Left side */}
        <div className="flex items-center gap-2 mb-4 md:mb-0 text-gray-100">
          <FaGlobe className="text-purple-400 text-lg" />
          <span className="opacity-80">
            JSONPlaceholder Users Dashboard • Built with{" "}
            <span className="font-medium">Next.js</span>,{" "}
            <span className="font-medium">Tailwind</span> &{" "}
            <span className="font-medium">DaisyUI</span>
          </span>
        </div>

        {/* Right side - Social Links */}
        <div className="flex gap-4 text-xl ">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaGithub className="text-purple-400 text-xl" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaLinkedin className="text-purple-400 text-xl" />
          </a>
        </div>
      </div>
    </footer>
  )
}
