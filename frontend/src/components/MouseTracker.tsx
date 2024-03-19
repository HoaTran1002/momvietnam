import React, { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

const MouseTracker: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition(() => ({
      x: e.clientX + 16,
      y: e.clientY + 16,
    }));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="cursors"
      className={`fixed z-50 h-2 w-2 bg-white rounded-full pointer-events-none mix-blend-difference translate-x-2/4 translate-y-2/4 max-sm:hidden`}
      style={{
        left: position.x + "px",
        top: position.y + "px",
      }}
    ></div>
  );
};

export default MouseTracker;
