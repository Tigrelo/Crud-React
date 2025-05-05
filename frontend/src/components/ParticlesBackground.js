import React from 'react';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      options={{
        particles: {
          number: { value: 80 },
          color: { value: '#4d1b3e' },
          shape: {
            type: 'polygon',
            polygon: { nb_sides: 6 },
          },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: { enable: true, speed: 2 },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 200 },
            push: { particles_nb: 4 },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
