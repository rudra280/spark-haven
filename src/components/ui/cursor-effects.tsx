import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CursorEffectsProps {
  children: React.ReactNode;
}

export function CursorEffects({ children }: CursorEffectsProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.matches('button, a, [role="button"], input, textarea, select')
      ) {
        setIsPointer(true);
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to(follower, {
          scale: 2,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      setIsPointer(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(cursor, {
        scale: isPointer ? 0.5 : 1,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        scale: isPointer ? 2 : 1,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPointer]);

  return (
    <div className="cursor-container">
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 ${
          isClicking ? "animate-pulse" : ""
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 ${
          isPointer ? "border-opacity-100" : "border-opacity-50"
        }`}
        style={{
          willChange: "transform",
          borderImage: "linear-gradient(45deg, #f97316, #ec4899, #8b5cf6) 1",
        }}
      />

      {children}
    </div>
  );
}

// Magnetic Button Effect Component
export function MagneticButton({ children, className = "", ...props }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Parallax Text Component
export function ParallaxText({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      gsap.set(text, {
        y: rate,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={textRef} className={`parallax-text ${className}`}>
      {children}
    </div>
  );
}

// Reveal Animation Component
export function RevealAnimation({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, {
      y: 100,
      opacity: 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 1,
              delay,
              ease: "power3.out",
            });
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elementRef} className={`reveal-animation ${className}`}>
      {children}
    </div>
  );
}
