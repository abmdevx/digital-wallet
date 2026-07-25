import React, { useState, useEffect, useRef } from 'react';

// Floating Particles with Connections
const DarkParticlesBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particleCount = 80;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            (particle.x - otherParticle.x) ** 2 + 
            (particle.y - otherParticle.y) ** 2
          );

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.2;
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-gray-900"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
    />
  );
};

// CSS-Only Dark Particles (Lighter Alternative)
const CSSParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 10,
      direction: Math.random() > 0.5 ? 1 : -1
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s linear infinite ${particle.delay}s`,
            animationDirection: particle.direction > 0 ? 'normal' : 'reverse'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0% { 
            transform: translate3d(-20px, -20px, 0) scale(0.8);
            opacity: 0.2;
          }
          25% { 
            transform: translate3d(20px, -40px, 0) scale(1.1);
            opacity: 0.4;
          }
          50% { 
            transform: translate3d(40px, 20px, 0) scale(0.9);
            opacity: 0.6;
          }
          75% { 
            transform: translate3d(-10px, 40px, 0) scale(1.2);
            opacity: 0.3;
          }
          100% { 
            transform: translate3d(-20px, -20px, 0) scale(0.8);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

// Matrix Rain Effect
const MatrixRain = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 5) + Math.random() * 5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
      chars: '01'.repeat(20).split('')
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute top-0 text-blue-400/30 font-mono text-sm leading-tight whitespace-pre"
          style={{
            left: `${drop.x}%`,
            animation: `matrixFall ${drop.duration}s linear infinite ${drop.delay}s`
          }}
        >
          {drop.chars.join('\n')}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes matrixFall {
          0% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Geometric Dark Particles
const GeometricParticles = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const newShapes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      size: Math.random() * 20 + 10,
      type: Math.floor(Math.random() * 3), // 0: square, 1: triangle, 2: circle
      delay: Math.random() * 8,
      duration: Math.random() * 15 + 10
    }));
    setShapes(newShapes);
  }, []);

  const getShapeClass = (type) => {
    switch(type) {
      case 0: return 'bg-blue-500/20 rotate-45'; // square
      case 1: return 'border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-purple-500/20 bg-transparent'; // triangle
      case 2: return 'bg-indigo-500/20 rounded-full'; // circle
      default: return 'bg-blue-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 overflow-hidden">
      {shapes.map(shape => (
        <div
          key={shape.id}
          className={`absolute ${getShapeClass(shape.type)} backdrop-blur-sm`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.type === 1 ? '0' : `${shape.size}px`,
            height: shape.type === 1 ? '0' : `${shape.size}px`,
            transform: `rotate(${shape.rotation}deg)`,
            animation: `geometricFloat ${shape.duration}s ease-in-out infinite ${shape.delay}s`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes geometricFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          33% { 
            transform: translateY(-30px) rotate(120deg) scale(1.1);
            opacity: 0.6;
          }
          66% { 
            transform: translateY(15px) rotate(240deg) scale(0.9);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

// Demo Component with Switcher
const DarkParticlesDemo = ({ backgroundOnly }) => {

  return (
    <div className="relative min-h-screen">
        <MatrixRain/>
    </div>
  );
};

export default DarkParticlesDemo;