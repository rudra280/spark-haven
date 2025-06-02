import React, { useEffect, useRef, useState } from "react";

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
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (follower) {
        follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target;
      // Check if target is an HTMLElement and has the matches method
      if (
        target &&
        typeof target === "object" &&
        "matches" in target &&
        typeof (target as HTMLElement).matches === "function"
      ) {
        const element = target as HTMLElement;
        if (
          element.matches('button, a, [role="button"], input, textarea, select')
        ) {
          setIsPointer(true);
        }
      }
    };
    const handleMouseLeave = () => {
      setIsPointer(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
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
        className={`fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ${
          isClicking ? "scale-75" : isPointer ? "scale-50" : "scale-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-gradient-to-r from-orange-500 via-pink-500 to-violet-500 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isPointer
            ? "scale-200 border-opacity-100"
            : "scale-100 border-opacity-50"
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
export function MagneticButton({
  children,
  className = "",
  asChild,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  [key: string]: any;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = "translate(0px, 0px)";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Filter out non-DOM props
  const { asChild: _, ...domProps } = props;

  // If asChild is true, clone the child element and add our props
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: buttonRef,
      className: `magnetic-button transition-transform duration-300 ${className} ${children.props.className || ""}`,
      ...domProps,
    });
  }

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button transition-transform duration-300 ${className}`}
      {...domProps}
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

      text.style.transform = `translateY(${rate}px)`;
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay * 1000);
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
    <div
      ref={elementRef}
      className={`reveal-animation transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      } ${className}`}
    >
      {children}
    </div>
  );
}
