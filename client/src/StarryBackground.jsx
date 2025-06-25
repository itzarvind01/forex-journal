// src/StarryBackground.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

const StarryBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: {
            value: "#000000", // stays perfect with your dark UI
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1, // stay behind everything
        },
      }}
    />
  );
};

export default StarryBackground;
