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
      try {
        if (cursor) {
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
        if (follower) {
          follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      } catch (error) {
        // Silently handle cursor movement errors
      }
    };

    const handleMouseEnter = (e: Event) => {
      try {
        const target = e.target;
        // More robust checking for HTMLElement with matches method
        if (
          target &&
          target instanceof Element &&
          typeof target.matches === "function"
        ) {
          if (
            target.matches(
              'button, a, [role="button"], input, textarea, select, [data-magnetic]',
            )
          ) {
            setIsPointer(true);
          }
        }
      } catch (error) {
        // Silently handle mouse enter errors
      }
    };

    const handleMouseLeave = (e: Event) => {
      try {
        const target = e.target;
        if (
          target &&
          target instanceof Element &&
          typeof target.matches === "function"
        ) {
          if (
            target.matches(
              'button, a, [role="button"], input, textarea, select, [data-magnetic]',
            )
          ) {
            setIsPointer(false);
          }
        }
      } catch (error) {
        // Silently handle mouse leave errors
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Use more specific event listeners to avoid conflicts
    document.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, {
      capture: true,
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      capture: true,
      passive: true,
    });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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

// Magnetic Button Effect Component with proper prop handling
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
      try {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      } catch (error) {
        // Silently handle magnetic effect errors
      }
    };

    const handleMouseLeave = () => {
      try {
        button.style.transform = "translate(0px, 0px)";
      } catch (error) {
        // Silently handle reset errors
      }
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Filter out React-specific props that shouldn't be passed to DOM
  const {
    asChild: _asChild,
    children: _children,
    className: _className,
    ...domProps
  } = props;

  // If asChild is true, clone the child element and add our props
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: buttonRef,
      className: `magnetic-button transition-transform duration-300 ${className} ${children.props.className || ""}`,
      "data-magnetic": "true",
      ...domProps,
    });
  }

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button transition-transform duration-300 ${className}`}
      data-magnetic="true"
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
      try {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;

        text.style.transform = `translateY(${rate}px)`;
      } catch (error) {
        // Silently handle parallax errors
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
