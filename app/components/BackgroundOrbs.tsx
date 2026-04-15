"use client";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main glow orbs */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: "600px",
          height: "600px",
          top: "-200px",
          left: "-150px",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-100px",
          right: "-100px",
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: "400px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle horizontal lines */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(124, 58, 237, 0.03) 3px,
            rgba(124, 58, 237, 0.03) 4px
          )`,
        }}
      />
    </div>
  );
}
