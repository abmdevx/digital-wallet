import React from "react";
import { 
  Twitter, 
  Github, 
  Shield, 
  Heart,
  Sparkles,
  ExternalLink,
  Linkedin,
  Code,
  Globe,
  Copy,
  CopyrightIcon
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/your-username",
      icon: Twitter,
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn", 
      url: "https://linkedin.com/in/your-username",
      icon: Linkedin,
      color: "hover:text-blue-600"
    }
  ];

  const projectLinks = [
    {
      name: "View Source Code",
      url: "https://github.com/your-username/project-name",
      icon: Github,
      color: "hover:text-gray-300"
    },
    {
      name: "My Portfolio",
      url: "https://your-portfolio.com",
      icon: Globe,
      color: "hover:text-indigo-400"
    }
  ];

  return (
    <footer className="relative">
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-slide-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-fade-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2s infinite;
        }
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
        .bounce-gentle:hover {
          animation: bounceGentle 0.6s ease-in-out;
        }
        @keyframes bounceGentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Brand Section - Animated from left */}
          <div className="flex flex-col items-center md:items-start space-y-4 animate-slide-left">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover-glow relative overflow-hidden shimmer">
                <Code className="w-6 h-6 text-gray-900 relative z-10" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Built by Abdullah
              </h3>
              <p className="text-sm text-gray-400 mt-1 transform hover:scale-105 transition-transform duration-300">
                Crafting digital experiences
              </p>
            </div>
          </div>

          {/* Social Links - Animated from bottom */}
          <div className="flex flex-col items-center space-y-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
              Connect With Me
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 ${social.color} transition-all duration-500 hover:scale-110 hover:shadow-lg border border-gray-700 hover:border-gray-600 bounce-gentle relative overflow-hidden`}
                  style={{animationDelay: `${0.4 + index * 0.1}s`}}
                  title={social.name}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <social.icon className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="font-medium relative z-10">{social.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Project Links - Animated from right */}
          <div className="flex flex-col items-center md:items-end space-y-4 animate-slide-right" style={{animationDelay: '0.3s'}}>
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Github className="w-5 h-5 text-gray-300 hover:rotate-12 transition-transform duration-300" />
              Explore More
            </h4>
            <div className="flex flex-col gap-3">
              {projectLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center space-x-3 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 ${link.color} transition-all duration-500 hover:scale-105 hover:shadow-lg border border-gray-700 hover:border-gray-600 bounce-gentle relative overflow-hidden`}
                  style={{animationDelay: `${0.5 + index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-700"></div>
                  <link.icon className="w-5 h-5 transform group-hover:rotate-6 transition-transform duration-300 relative z-10" />
                  <span className="font-medium relative z-10">{link.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 relative z-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Decorative Divider */}
        <div className="mt-12 mb-8 animate-fade-scale" style={{animationDelay: '0.6s'}}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gray-900 px-4 rounded-2xl">
                <div className="flex items-center space-x-2 mt-0.5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Animated */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 animate-slide-up" style={{animationDelay: '0.8s'}}>
          
          {/* Copyright & Love */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-gray-400 flex items-center gap-2 text-sm transform hover:scale-105 transition-transform duration-300">
              <CopyrightIcon className="w-4 h-4" />
               {currentYear} All rights reserved by Abdullah
            </p>
            <div className="flex items-center gap-2 text-sm group">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse group-hover:scale-125 group-hover:text-red-300 transition-all duration-300" />
              <span className="text-gray-400">for amazing projects</span>
            </div>
          </div>

          {/* Platform Info - Animated badges */}
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-700/50 hover:bg-green-900/50 hover:border-green-600/70 transition-all duration-300 transform hover:scale-105 group">
              <Shield className="w-3 h-3 text-green-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-green-300 font-medium">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 hover:bg-blue-900/50 hover:border-blue-600/70 transition-all duration-300 transform hover:scale-105 group">
              <Sparkles className="w-3 h-3 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-blue-300 font-medium">Version 1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </footer>
  );
}

export default Footer;