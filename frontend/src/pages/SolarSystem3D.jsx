// import { useState } from 'react';

// const planetData = {
//   sun: {
//     name: 'Sun',
//     type: 'Star',
//     image: '/images/sun.png',
//     diameter: '1,392,700 km',
//     mass: '1.989 × 10^30 kg',
//     distance: '0 AU (Center)',
//     orbitalPeriod: 'N/A',
//     moons: '0',
//     composition: 'Hydrogen (73%), Helium (25%)',
//     temperature: '5,500°C (surface), 15,000,000°C (core)',
//     funFact: "The Sun contains 99.86% of the solar system's mass!"
//   },
//   mercury: {
//     name: 'Mercury',
//     type: 'Terrestrial Planet',
//     image: '/images/mercury.png',
//     diameter: '4,879 km',
//     mass: '3.285 × 10^23 kg',
//     distance: '0.39 AU',
//     orbitalPeriod: '88 Earth days',
//     moons: '0',
//     composition: 'Rocky surface, iron core',
//     temperature: '-180°C to 430°C',
//     funFact: 'Mercury is the smallest planet and closest to the Sun!'
//   },
//   venus: {
//     name: 'Venus',
//     type: 'Terrestrial Planet',
//     image: '/images/venus.png',
//     diameter: '12,104 km',
//     mass: '4.867 × 10^24 kg',
//     distance: '0.72 AU',
//     orbitalPeriod: '225 Earth days',
//     moons: '0',
//     composition: 'Rocky surface, thick atmosphere',
//     temperature: '462°C (average)',
//     funFact: 'Venus rotates backwards compared to most planets!'
//   },
//   earth: {
//     name: 'Earth',
//     type: 'Terrestrial Planet',
//     image: '/images/earth.png',
//     diameter: '12,742 km',
//     mass: '5.972 × 10^24 kg',
//     distance: '1 AU',
//     orbitalPeriod: '365.25 days',
//     moons: '1 (The Moon)',
//     composition: 'Rocky surface, water, atmosphere',
//     temperature: '-88°C to 58°C',
//     funFact: 'Earth is the only known planet with life!'
//   },
//   moon: {
//     name: 'Moon',
//     type: 'Natural Satellite',
//     image: '/images/moon.png',
//     diameter: '3,474 km',
//     mass: '7.342 × 10^22 kg',
//     distance: '384,400 km from Earth',
//     orbitalPeriod: '27.3 days',
//     moons: '0',
//     composition: 'Rocky surface, no atmosphere',
//     temperature: '-233°C to 123°C',
//     funFact: 'The Moon is slowly moving away from Earth!'
//   },
//   mars: {
//     name: 'Mars',
//     type: 'Terrestrial Planet',
//     image: '/images/mars.png',
//     diameter: '6,779 km',
//     mass: '6.39 × 10^23 kg',
//     distance: '1.52 AU',
//     orbitalPeriod: '687 Earth days',
//     moons: '2 (Phobos & Deimos)',
//     composition: 'Rocky surface, thin atmosphere',
//     temperature: '-140°C to 20°C',
//     funFact: 'Mars has the largest volcano in the solar system - Olympus Mons!'
//   },
//   jupiter: {
//     name: 'Jupiter',
//     type: 'Gas Giant',
//     image: '/images/jupiter.png',
//     diameter: '139,820 km',
//     mass: '1.898 × 10^27 kg',
//     distance: '5.20 AU',
//     orbitalPeriod: '12 Earth years',
//     moons: '95+',
//     composition: 'Hydrogen, helium, gases',
//     temperature: '-110°C (cloud tops)',
//     funFact: 
//       "Jupiter's Great Red Spot is a storm that's been raging for over 300 years!"
//   },
//   saturn: {
//     name: 'Saturn',
//     type: 'Gas Giant',
//     image: '/images/saturn.png',
//     diameter: '116,460 km',
//     mass: '5.683 × 10^26 kg',
//     distance: '9.58 AU',
//     orbitalPeriod: '29 Earth years',
//     moons: '146+',
//     composition: 'Hydrogen, helium, gases',
//     temperature: '-140°C (cloud tops)',
//     funFact: "Saturn's rings are made of ice and rock particles!"
//   },
//   uranus: {
//     name: 'Uranus',
//     type: 'Ice Giant',
//     image: '/images/uranus.png',
//     diameter: '50,724 km',
//     mass: '8.681 × 10^25 kg',
//     distance: '19.18 AU',
//     orbitalPeriod: '84 Earth years',
//     moons: '27',
//     composition: 'Hydrogen, helium, methane',
//     temperature: '-224°C (average)',
//     funFact: 'Uranus rotates on its side - its axis is tilted 98 degrees!'
//   },
//   neptune: {
//     name: 'Neptune',
//     type: 'Ice Giant',
//     image: '/images/neptune.png',
//     diameter: '49,244 km',
//     mass: '1.024 × 10^26 kg',
//     distance: '30.07 AU',
//     orbitalPeriod: '165 Earth years',
//     moons: '16',
//     composition: 'Hydrogen, helium, methane',
//     temperature: '-218°C (average)',
//     funFact: 'Neptune has the strongest winds in the solar system - up to 2,100 km/h!'
//   },
//   pluto: {
//     name: 'Pluto',
//     type: 'Dwarf Planet',
//     image: '/images/pluto.png',
//     diameter: '2,377 km',
//     mass: '1.309 × 10^22 kg',
//     distance: '39.48 AU',
//     orbitalPeriod: '248 Earth years',
//     moons: '5',
//     composition: 'Ice and rock',
//     temperature: '-240°C to -218°C',
//     funFact: 'Pluto was reclassified as a dwarf planet in 2006!'
//   },
// };

// export default function SolarSystem3D() {
//   const [modalPlanet, setModalPlanet] = useState(null);

//   return (
//     <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
//       {/* Solar System Title and Explore Button */}
//       <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-12 z-20">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-300 drop-shadow-lg mb-2 tracking-wide flex items-center gap-2">
//           Solar System by <span className="text-fuchsia-400">GalactIQ</span>
//         </h1>
//         <p className="text-lg text-white/80 mb-6">Embark on a journey through our cosmic neighborhood.</p>
//       </div>
//       {/* Solar System Planets */}
//       <div className="relative w-full h-[80vh] flex items-center justify-center">
//         {/* Sun */}
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer" onClick={() => setModalPlanet('sun')}>
//           <img src={planetData.sun.image} alt="Sun" className="w-32 h-32 md:w-48 md:h-48 animate-pulse" />
//           <span className="block text-center text-yellow-300 font-bold mt-2">Sun</span>
//         </div>
//         {/* Planets (simplified, will animate orbits later) */}
//         <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
//           {/* Mercury */}
//           <div className="absolute" style={{ left: '8em', top: '0' }} onClick={() => setModalPlanet('mercury')}>
//             <img src={planetData.mercury.image} alt="Mercury" className="w-8 h-8 md:w-12 md:h-12 hover:scale-110 transition" />
//             <span className="block text-center text-gray-300 text-xs">Mercury</span>
//           </div>
//           {/* Venus */}
//           <div className="absolute" style={{ left: '12em', top: '2em' }} onClick={() => setModalPlanet('venus')}>
//             <img src={planetData.venus.image} alt="Venus" className="w-10 h-10 md:w-14 md:h-14 hover:scale-110 transition" />
//             <span className="block text-center text-gray-300 text-xs">Venus</span>
//           </div>
//           {/* Earth & Moon */}
//           <div className="absolute" style={{ left: '16em', top: '4em' }}>
//             <div className="relative" onClick={() => setModalPlanet('earth')}>
//               <img src={planetData.earth.image} alt="Earth" className="w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition" />
//               <span className="block text-center text-blue-300 text-xs">Earth</span>
//             </div>
//             <div className="absolute left-12 top-2" onClick={() => setModalPlanet('moon')}>
//               <img src={planetData.moon.image} alt="Moon" className="w-5 h-5 md:w-7 md:h-7 hover:scale-110 transition" />
//               <span className="block text-center text-gray-400 text-xs">Moon</span>
//             </div>
//           </div>
//           {/* Mars */}
//           <div className="absolute" style={{ left: '22em', top: '6em' }} onClick={() => setModalPlanet('mars')}>
//             <img src={planetData.mars.image} alt="Mars" className="w-10 h-10 md:w-14 md:h-14 hover:scale-110 transition" />
//             <span className="block text-center text-red-300 text-xs">Mars</span>
//           </div>
//           {/* Jupiter */}
//           <div className="absolute" style={{ left: '30em', top: '10em' }} onClick={() => setModalPlanet('jupiter')}>
//             <img src={planetData.jupiter.image} alt="Jupiter" className="w-16 h-16 md:w-24 md:h-24 hover:scale-110 transition" />
//             <span className="block text-center text-yellow-200 text-xs">Jupiter</span>
//           </div>
//           {/* Saturn */}
//           <div className="absolute" style={{ left: '40em', top: '14em' }} onClick={() => setModalPlanet('saturn')}>
//             <img src={planetData.saturn.image} alt="Saturn" className="w-14 h-14 md:w-20 md:h-20 hover:scale-110 transition" />
//             <span className="block text-center text-yellow-300 text-xs">Saturn</span>
//           </div>
//           {/* Uranus */}
//           <div className="absolute" style={{ left: '50em', top: '18em' }} onClick={() => setModalPlanet('uranus')}>
//             <img src={planetData.uranus.image} alt="Uranus" className="w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition" />
//             <span className="block text-center text-cyan-200 text-xs">Uranus</span>
//           </div>
//           {/* Neptune */}
//           <div className="absolute" style={{ left: '60em', top: '22em' }} onClick={() => setModalPlanet('neptune')}>
//             <img src={planetData.neptune.image} alt="Neptune" className="w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition" />
//             <span className="block text-center text-blue-200 text-xs">Neptune</span>
//           </div>
//           {/* Pluto */}
//           <div className="absolute" style={{ left: '70em', top: '26em' }} onClick={() => setModalPlanet('pluto')}>
//             <img src={planetData.pluto.image} alt="Pluto" className="w-8 h-8 md:w-12 md:h-12 hover:scale-110 transition" />
//             <span className="block text-center text-gray-400 text-xs">Pluto</span>
//           </div>
//         </div>
//       </div>
//       {/* Modal for planet info (to be implemented) */}
//       {modalPlanet && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative">
//             <button className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500" onClick={() => setModalPlanet(null)}>&times;</button>
//             <h2 className="text-3xl font-bold mb-2 text-center text-purple-600">{planetData[modalPlanet].name}</h2>
//             <p className="text-center text-gray-600 mb-4">{planetData[modalPlanet].type}</p>
//             <img src={planetData[modalPlanet].image} alt={planetData[modalPlanet].name} className="mx-auto mb-4 w-32 h-32 object-contain" />
//             <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
//               <div><span className="font-semibold">Diameter:</span> {planetData[modalPlanet].diameter}</div>
//               <div><span className="font-semibold">Mass:</span> {planetData[modalPlanet].mass}</div>
//               <div><span className="font-semibold">Distance from Sun:</span> {planetData[modalPlanet].distance}</div>
//               <div><span className="font-semibold">Orbital Period:</span> {planetData[modalPlanet].orbitalPeriod}</div>
//               <div><span className="font-semibold">Number of Moons:</span> {planetData[modalPlanet].moons}</div>
//               <div><span className="font-semibold">Composition:</span> {planetData[modalPlanet].composition}</div>
//               <div><span className="font-semibold">Temperature:</span> {planetData[modalPlanet].temperature}</div>
//             </div>
//             <div className="bg-blue-50 rounded-xl p-4 text-blue-800 text-center">
//               <span className="font-bold">Fun Fact:</span> {planetData[modalPlanet].funFact}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// } 



import { useState, useEffect, useRef } from 'react';

const planetData = {
  sun: {
    name: 'Sun',
    type: 'Star',
    image: '/images/sun.png',
    diameter: '1,392,700 km',
    mass: '1.989 × 10^30 kg',
    distance: '0 AU (Center)',
    orbitalPeriod: 'N/A',
    moons: '0',
    composition: 'Hydrogen (73%), Helium (25%)',
    temperature: '5,500°C (surface), 15,000,000°C (core)',
    funFact: "The Sun contains 99.86% of the solar system's mass!",
    orbitRadius: 0,
    orbitSpeed: '0s',
    spinSpeed: '25s',
    size: 80,
    glowColor: 'bg-yellow-400/60',
    ringColor: 'border-yellow-400/30',
    color: 'text-yellow-300',
  },
  mercury: {
    name: 'Mercury',
    type: 'Terrestrial Planet',
    image: '/images/mercury.png',
    diameter: '4,879 km',
    mass: '3.285 × 10^23 kg',
    distance: '0.39 AU',
    orbitalPeriod: '88 Earth days',
    moons: '0',
    composition: 'Rocky surface, iron core',
    temperature: '-180°C to 430°C',
    funFact: 'Mercury is the smallest planet and closest to the Sun!',
    orbitRadius: 60,
    orbitSpeed: '64s',
    spinSpeed: '59s',
    size: 12,
    glowColor: 'bg-orange-400/40',
    ringColor: 'border-orange-400/25',
    color: 'text-orange-300',
  },
  venus: {
    name: 'Venus',
    type: 'Terrestrial Planet',
    image: '/images/venus.png',
    diameter: '12,104 km',
    mass: '4.867 × 10^24 kg',
    distance: '0.72 AU',
    orbitalPeriod: '225 Earth days',
    moons: '0',
    composition: 'Rocky surface, thick atmosphere',
    temperature: '462°C (average)',
    funFact: 'Venus rotates backwards compared to most planets!',
    orbitRadius: 90,
    orbitSpeed: '96s',
    spinSpeed: '243s',
    size: 18,
    glowColor: 'bg-yellow-300/40',
    ringColor: 'border-yellow-300/25',
    color: 'text-yellow-200',
  },
  earth: {
    name: 'Earth',
    type: 'Terrestrial Planet',
    image: '/images/earth.png',
    diameter: '12,742 km',
    mass: '5.972 × 10^24 kg',
    distance: '1 AU',
    orbitalPeriod: '365.25 days',
    moons: '1 (The Moon)',
    composition: 'Rocky surface, water, atmosphere',
    temperature: '-88°C to 58°C',
    funFact: 'Earth is the only known planet with life!',
    orbitRadius: 120,
    orbitSpeed: '128s',
    spinSpeed: '24s',
    size: 20,
    glowColor: 'bg-blue-400/40',
    ringColor: 'border-blue-400/25',
    color: 'text-blue-300',
  },
  moon: {
    name: 'Moon',
    type: 'Natural Satellite',
    image: '/images/moon.png',
    diameter: '3,474 km',
    mass: '7.342 × 10^22 kg',
    distance: '384,400 km from Earth',
    orbitalPeriod: '27.3 days',
    moons: '0',
    composition: 'Rocky surface, no atmosphere',
    temperature: '-233°C to 123°C',
    funFact: 'The Moon is slowly moving away from Earth!',
    orbitRadius: 20,
    orbitSpeed: '32s',
    spinSpeed: '27s',
    size: 6,
    glowColor: 'bg-gray-300/30',
    ringColor: 'border-gray-300/20',
    color: 'text-gray-200',
  },
  mars: {
    name: 'Mars',
    type: 'Terrestrial Planet',
    image: '/images/mars.png',
    diameter: '6,779 km',
    mass: '6.39 × 10^23 kg',
    distance: '1.52 AU',
    orbitalPeriod: '687 Earth days',
    moons: '2 (Phobos & Deimos)',
    composition: 'Rocky surface, thin atmosphere',
    temperature: '-140°C to 20°C',
    funFact: 'Mars has the largest volcano in the solar system - Olympus Mons!',
    orbitRadius: 150,
    orbitSpeed: '176s',
    spinSpeed: '24.6s',
    size: 16,
    glowColor: 'bg-red-400/40',
    ringColor: 'border-red-400/25',
    color: 'text-red-300',
  },
  jupiter: {
    name: 'Jupiter',
    type: 'Gas Giant',
    image: '/images/jupiter.png',
    diameter: '139,820 km',
    mass: '1.898 × 10^27 kg',
    distance: '5.20 AU',
    orbitalPeriod: '12 Earth years',
    moons: '95+',
    composition: 'Hydrogen, helium, gases',
    temperature: '-110°C (cloud tops)',
    funFact: "Jupiter's Great Red Spot is a storm that's been raging for over 300 years!",
    orbitRadius: 200,
    orbitSpeed: '240s',
    spinSpeed: '9.9s',
    size: 36,
    glowColor: 'bg-orange-300/40',
    ringColor: 'border-orange-300/25',
    color: 'text-orange-200',
  },
  saturn: {
    name: 'Saturn',
    type: 'Gas Giant',
    image: '/images/saturn.png',
    diameter: '116,460 km',
    mass: '5.683 × 10^26 kg',
    distance: '9.58 AU',
    orbitalPeriod: '29 Earth years',
    moons: '146+',
    composition: 'Hydrogen, helium, gases',
    temperature: '-140°C (cloud tops)',
    funFact: "Saturn's rings are made of ice and rock particles!",
    orbitRadius: 250,
    orbitSpeed: '320s',
    spinSpeed: '10.7s',
    size: 30,
    glowColor: 'bg-yellow-200/40',
    ringColor: 'border-yellow-200/25',
    color: 'text-yellow-100',
  },
  uranus: {
    name: 'Uranus',
    type: 'Ice Giant',
    image: '/images/uranus.png',
    diameter: '50,724 km',
    mass: '8.681 × 10^25 kg',
    distance: '19.18 AU',
    orbitalPeriod: '84 Earth years',
    moons: '27',
    composition: 'Hydrogen, helium, methane',
    temperature: '-224°C (average)',
    funFact: 'Uranus rotates on its side - its axis is tilted 98 degrees!',
    orbitRadius: 300,
    orbitSpeed: '400s',
    spinSpeed: '17.2s',
    size: 24,
    glowColor: 'bg-cyan-300/40',
    ringColor: 'border-cyan-300/25',
    color: 'text-cyan-200',
  },
  neptune: {
    name: 'Neptune',
    type: 'Ice Giant',
    image: '/images/neptune.png',
    diameter: '49,244 km',
    mass: '1.024 × 10^26 kg',
    distance: '30.07 AU',
    orbitalPeriod: '165 Earth years',
    moons: '16',
    composition: 'Hydrogen, helium, methane',
    temperature: '-218°C (average)',
    funFact: 'Neptune has the strongest winds in the solar system - up to 2,100 km/h!',
    orbitRadius: 350,
    orbitSpeed: '480s',
    spinSpeed: '16.1s',
    size: 22,
    glowColor: 'bg-blue-500/40',
    ringColor: 'border-blue-500/25',
    color: 'text-blue-300',
  },
  pluto: {
    name: 'Pluto',
    type: 'Dwarf Planet',
    image: '/images/pluto.png',
    diameter: '2,377 km',
    mass: '1.309 × 10^22 kg',
    distance: '39.48 AU',
    orbitalPeriod: '248 Earth years',
    moons: '5',
    composition: 'Ice and rock',
    temperature: '-240°C to -218°C',
    funFact: 'Pluto was reclassified as a dwarf planet in 2006!',
    orbitRadius: 400,
    orbitSpeed: '560s',
    spinSpeed: '6.4s',
    size: 10,
    glowColor: 'bg-purple-300/40',
    ringColor: 'border-purple-300/25',
    color: 'text-purple-200',
  },
};

export default function EnhancedSolarSystem3D() {
  const [modalPlanet, setModalPlanet] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [viewMode, setViewMode] = useState('overview');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(0.75);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showControlPanel, setShowControlPanel] = useState(true);
  const solarSystemRef = useRef(null);

  useEffect(() => {
    const starContainer = document.createElement('div');
    starContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden z-0';

    for (let layer = 0; layer < 4; layer++) {
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        const size = Math.random() * (4 - layer) + 0.5;
        const opacity = 0.2 + Math.random() * 0.8;
        const twinkleSpeed = 0.5 + Math.random() * 4;
        const hue = Math.random() * 60 + 200;

        star.className = `absolute rounded-full animate-pulse`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = opacity;
        star.style.background = `hsl(${hue}, 70%, 90%)`;
        star.style.animationDuration = `${twinkleSpeed}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.boxShadow = `0 0 ${size * 2}px hsla(${hue}, 70%, 90%, 0.5)`;
        star.style.zIndex = layer;

        starContainer.appendChild(star);
      }
    }

    for (let i = 0; i < 5; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'absolute w-0.5 h-0.5 bg-white rounded-full';
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.boxShadow = '0 0 6px #fff, 0 0 10px #fff, 0 0 15px #0ff';
      shootingStar.style.animation = `shootingStar ${3 + Math.random() * 4}s linear infinite`;
      shootingStar.style.animationDelay = `${Math.random() * 10}s`;
      starContainer.appendChild(shootingStar);
    }

    for (let i = 0; i < 3; i++) {
      const nebula = document.createElement('div');
      nebula.className = 'absolute rounded-full opacity-20 animate-pulse';
      nebula.style.width = `${200 + Math.random() * 300}px`;
      nebula.style.height = `${200 + Math.random() * 300}px`;
      nebula.style.left = `${Math.random() * 100}%`;
      nebula.style.top = `${Math.random() * 100}%`;
      nebula.style.background = `radial-gradient(circle, hsla(${240 + Math.random() * 60}, 70%, 50%, 0.1), transparent)`;
      nebula.style.filter = 'blur(30px)';
      nebula.style.animationDuration = `${8 + Math.random() * 6}s`;
      starContainer.appendChild(nebula);
    }

    const container = document.querySelector('.solar-system-container');
    if (container) {
      container.appendChild(starContainer);
    }

    return () => {
      if (starContainer && container && container.contains(starContainer)) {
        container.removeChild(starContainer);
      }
    };
  }, []);

  const handlePlanetClick = (planetKey) => {
    setModalPlanet(planetKey);
    setSelectedPlanet(planetKey);
    setViewMode('focused');
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    document.documentElement.style.setProperty('--animation-speed', speed.toString());
  };

  const handleZoomChange = (zoom) => {
    setZoomLevel(zoom);
    document.documentElement.style.setProperty('--zoom-scale', zoom.toString());
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const closeModal = () => {
    setModalPlanet(null);
    setSelectedPlanet(null);
    setViewMode('overview');
  };

  const toggleOrbits = () => {
    setShowOrbits(!showOrbits);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 via-slate-900 to-black overflow-hidden solar-system-container">
      <style jsx global>{`
        :root {
          --animation-speed: ${animationSpeed};
          --zoom-scale: ${zoomLevel};
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(calc(var(--orbit-radius) * var(--zoom-scale))) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(calc(var(--orbit-radius) * var(--zoom-scale))) rotate(-360deg);
          }
        }

        .orbit {
          animation: orbit calc(var(--orbit-speed) / var(--animation-speed)) linear infinite;
          animation-play-state: ${isPlaying ? 'running' : 'paused'};
          transform-origin: center;
        }

        .orbit-path {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px dashed rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: calc(var(--orbit-radius) * 2 * var(--zoom-scale));
          height: calc(var(--orbit-radius) * 2 * var(--zoom-scale));
          transform-origin: center;
          opacity: ${showOrbits ? 0.5 : 0};
          transition: opacity 0.3s ease;
        }

        /* Custom Scrollbar */
        .solar-system-container::-webkit-scrollbar {
          width: 6px;
        }

        .solar-system-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }

        .solar-system-container::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00ffff, #0080ff);
          border-radius: 3px;
          box-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
        }

        .solar-system-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #00ccff, #0066cc);
          box-shadow: 0 0 8px rgba(0, 255, 255, 0.7);
        }

        /* Firefox scrollbar */
        .solar-system-container {
          scrollbar-width: thin;
          scrollbar-color: #00ffff rgba(0, 0, 0, 0.3);
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(-200px) translateY(-200px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateX(-150px) translateY(-150px) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) scale(0);
            opacity: 0;
          }
        }

        @keyframes sunPulse {
          0%,
          100% {
            box-shadow: 0 0 30px rgba(255, 193, 7, 0.9), 0 0 60px rgba(255, 193, 7, 0.7),
              0 0 90px rgba(255, 193, 7, 0.5), 0 0 120px rgba(255, 165, 0, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 193, 7, 1), 0 0 80px rgba(255, 193, 7, 0.9),
              0 0 120px rgba(255, 193, 7, 0.7), 0 0 160px rgba(255, 165, 0, 0.5);
            transform: scale(1.05);
          }
        }

        @keyframes planetGlow {
          0%,
          100% {
            filter: brightness(1) drop-shadow(0 0 10px currentColor);
          }
          50% {
            filter: brightness(1.2) drop-shadow(0 0 20px currentColor);
          }
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes orbitPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.01);
          }
        }

        .planet-spin {
          animation: spin calc(var(--spin-speed) / var(--animation-speed)) linear infinite;
          animation-play-state: ${isPlaying ? 'running' : 'paused'};
        }

        .sun-pulse {
          animation: sunPulse 4s ease-in-out infinite;
        }

        .planet-glow:hover {
          animation: planetGlow 2s ease-in-out infinite;
        }

        .modal-slide {
          animation: modalSlide 0.4s ease-out;
        }

        .saturn-rings::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 150%;
          border: 2px solid rgba(255, 215, 0, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(75deg);
          pointer-events: none;
        }

        .saturn-rings::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          border: 1px solid rgba(255, 215, 0, 0.6);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(75deg);
          pointer-events: none;
        }

        .asteroid-belt {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 350px;
          border-radius: 50%;
          z-index: 5;
        }

        .asteroid {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #8B7355;
          border-radius: 50%;
          animation: orbit 180s linear infinite;
          animation-play-state: ${isPlaying ? 'running' : 'paused'};
        }

        .solar-system-container > div {
          transition: transform 0.3s ease;
        }

        .planet-label {
          transition: all 0.3s ease;
        }

        .planet-info-card {
          transition: all 0.3s ease;
          transform-origin: bottom center;
        }

        .control-panel {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .modal-content {
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        }
      `}</style>

      {/* Collapsible Mission Control Panel */}
      <div className={`absolute top-4 right-4 z-30 transition-all duration-500 ease-in-out ${showControlPanel ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/40 shadow-2xl control-panel">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-center text-cyan-300 font-bold text-lg">Mission Control</div>
              <button
                onClick={() => setShowControlPanel(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Hide Mission Control"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <button
              onClick={toggleAnimation}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center gap-2"
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pause Orbits
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Resume Orbits
                </>
              )}
            </button>

            <div className="bg-white/10 rounded-xl p-4">
              <label className="text-cyan-300 text-sm font-semibold mb-2 block">Animation Speed</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="text-xs text-gray-300 mt-1 flex justify-between">
                <span>0.1x</span>
                <span className="font-bold">{animationSpeed.toFixed(1)}x</span>
                <span>3.0x</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <label className="text-cyan-300 text-sm font-semibold mb-2 block">Zoom Level</label>
              <div className="flex gap-2">
                <button
                  onClick={zoomOut}
                  className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg font-semibold flex items-center gap-1"
                  disabled={zoomLevel <= 0.5}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                  Zoom Out
                </button>
                <button
                  onClick={zoomIn}
                  className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg font-semibold flex items-center gap-1"
                  disabled={zoomLevel >= 2}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Zoom In
                </button>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 mt-2"
              />
              <div className="text-xs text-gray-300 mt-1 flex justify-between">
                <span>0.5x</span>
                <span className="font-bold">{zoomLevel.toFixed(1)}x</span>
                <span>2.0x</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center gap-2"
              >
                {showInfo ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Hide Info
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Show Info
                  </>
                )}
              </button>

              <button
                onClick={toggleOrbits}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center gap-2"
              >
                {showOrbits ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Hide Orbits
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Show Orbits
                  </>
                )}
              </button>
            </div>

                      <button
            onClick={() => window.location.href = '/home'}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home Base
          </button>
          </div>
        </div>
      </div>

      {/* Toggle button to show Mission Control when hidden */}
      {!showControlPanel && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setShowControlPanel(true)}
            className="bg-black/70 backdrop-blur-xl rounded-full p-3 border border-cyan-500/40 shadow-2xl hover:bg-black/80 transition-all duration-300 transform hover:scale-110"
            aria-label="Show Mission Control"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      )}

      {showInfo && (
        <div className="absolute top-4 left-4 z-30 bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/40 shadow-2xl max-w-sm">
          <h3 className="text-emerald-300 font-bold text-lg mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Solar System Facts
          </h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-yellow-300">🌟</span>
              <span><strong>Age:</strong> ~4.6 billion years</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-300">📏</span>
              <span><strong>Diameter:</strong> ~287 billion km</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-300">🪐</span>
              <span><strong>Planets:</strong> 8 major planets</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-300"></span>
              <span><strong>Moons:</strong> 200+ natural satellites</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-300">☄️</span>
              <span><strong>Asteroids:</strong> Millions in the belt</span>
            </p>
          </div>
        </div>
      )}

      <div
        ref={solarSystemRef}
        className="absolute inset-0 flex items-center justify-center perspective-1000 transition-transform duration-500"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          className={`absolute cursor-pointer group transition-all duration-500 ${selectedPlanet === 'sun' ? 'z-50' : 'z-40'}`}
          onClick={() => handlePlanetClick('sun')}
          style={{
            width: `${planetData.sun.size * (selectedPlanet === 'sun' && viewMode === 'focused' ? 1.5 : 1)}px`,
            height: `${planetData.sun.size * (selectedPlanet === 'sun' && viewMode === 'focused' ? 1.5 : 1)}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          tabIndex={0}
          role="button"
          aria-label="Sun"
        >
          <div className="relative w-full h-full">
            <img
              src={planetData.sun.image}
              alt="Sun"
              className="w-full h-full object-contain planet-spin sun-pulse rounded-full"
              style={{ '--spin-speed': planetData.sun.spinSpeed }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-300/20 via-orange-400/30 to-red-500/20 blur-xl scale-150 -z-10 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-400/40 via-orange-500/20 to-transparent blur-2xl scale-200 -z-20"></div>
          </div>
          <span className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 ${planetData.sun.color} font-bold text-lg drop-shadow-2xl transition-all duration-300 ${selectedPlanet === 'sun' ? 'scale-110 opacity-100' : 'opacity-90 group-hover:scale-110 group-hover:opacity-100'}`}>
            Sun
          </span>
        </div>

        <div className="asteroid-belt">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="asteroid"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 7.2}deg) translateX(175px) translateY(${(Math.random() - 0.5) * 15}px)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${180 + Math.random() * 60}s`,
              }}
            />
          ))}
        </div>

        {Object.keys(planetData)
          .filter((key) => key !== 'sun' && key !== 'moon')
          .map((key, idx) => (
            <div key={key} style={{ position: 'absolute', left: '50%', top: '50%' }}>
              <div
                className="orbit-path"
                style={{
                  '--orbit-radius': `${planetData[key].orbitRadius}px`,
                  width: `${planetData[key].orbitRadius * 2}px`,
                  height: `${planetData[key].orbitRadius * 2}px`,
                }}
              ></div>

              <div
                className="absolute orbit"
                style={{
                  '--orbit-radius': `${planetData[key].orbitRadius}px`,
                  '--orbit-speed': planetData[key].orbitSpeed,
                  left: '0',
                  top: '0',
                  transform: `translate(-50%, -50%)`,
                  zIndex: 10 + idx,
                }}
              >
                <div
                  className={`relative cursor-pointer group transition-all duration-500 planet-glow ${key === 'saturn' ? 'saturn-rings' : ''} ${selectedPlanet === key ? 'z-50' : 'z-40'}`}
                  onClick={() => handlePlanetClick(key)}
                  style={{
                    width: `${planetData[key].size * (selectedPlanet === key && viewMode === 'focused' ? 1.5 : 1)}px`,
                    height: `${planetData[key].size * (selectedPlanet === key && viewMode === 'focused' ? 1.5 : 1)}px`,
                    transform: `translate(-50%, -50%)`,
                    zIndex: 100 + idx,
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={planetData[key].name}
                >
                  <img
                    src={planetData[key].image}
                    alt={planetData[key].name}
                    className="w-full h-full object-contain planet-spin rounded-full"
                    style={{ '--spin-speed': planetData[key].spinSpeed }}
                  />
                  <div className={`absolute inset-0 rounded-full ${planetData[key].glowColor} blur-lg -z-10 group-hover:blur-xl transition-all duration-300`}></div>

                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${selectedPlanet === key ? 'scale-110 opacity-100' : 'opacity-90 group-hover:scale-110 group-hover:opacity-100'}`}>
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                      <span className={`${planetData[key].color} text-sm font-semibold drop-shadow-lg whitespace-nowrap`}>
                        {planetData[key].name}
                      </span>
                    </div>
                  </div>

                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-black/90 backdrop-blur-md rounded-lg px-3 py-2 border border-cyan-500/40 text-xs text-white whitespace-nowrap planet-info-card">
                      <div className="font-semibold text-cyan-300 mb-1">{planetData[key].type}</div>
                      <div>Diameter: {planetData[key].diameter}</div>
                      <div>Distance: {planetData[key].distance}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {planetData.earth && planetData.moon && (
          <div
            className="absolute orbit"
            style={{
              '--orbit-radius': `${planetData.earth.orbitRadius}px`,
              '--orbit-speed': planetData.earth.orbitSpeed,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%)`,
              zIndex: 150,
            }}
          >
            <div
              className="orbit-path"
              style={{
                '--orbit-radius': `${planetData.moon.orbitRadius}px`,
                width: `${planetData.moon.orbitRadius * 2}px`,
                height: `${planetData.moon.orbitRadius * 2}px`,
              }}
            ></div>
            <div
              className="absolute orbit"
              style={{
                '--orbit-radius': `${planetData.moon.orbitRadius}px`,
                '--orbit-speed': planetData.moon.orbitSpeed,
                left: '0',
                top: '0',
                transform: `translate(-50%, -50%)`,
                zIndex: 180,
              }}
            >
              <div
                className={`relative cursor-pointer group transition-all duration-500 ${selectedPlanet === 'moon' ? 'z-50' : 'z-40'}`}
                onClick={() => handlePlanetClick('moon')}
                style={{
                  width: `${planetData.moon.size * (selectedPlanet === 'moon' && viewMode === 'focused' ? 1.5 : 1)}px`,
                  height: `${planetData.moon.size * (selectedPlanet === 'moon' && viewMode === 'focused' ? 1.5 : 1)}px`,
                  transform: `translate(-50%, -50%)`,
                  zIndex: 200,
                }}
                tabIndex={0}
                role="button"
                aria-label="Moon"
              >
                <img
                  src={planetData.moon.image}
                  alt="Moon"
                  className="w-full h-full object-contain planet-spin rounded-full"
                  style={{ '--spin-speed': planetData.moon.spinSpeed }}
                />
                <div className={`absolute inset-0 rounded-full ${planetData.moon.glowColor} blur-sm -z-10`}></div>
                <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${selectedPlanet === 'moon' ? 'scale-110 opacity-100' : 'opacity-90 group-hover:scale-110 group-hover:opacity-100'}`}>
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/20">
                    <span className="text-gray-300 text-xs font-medium drop-shadow-lg">Moon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalPlanet && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full border border-cyan-500/40 shadow-2xl modal-slide modal-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3">
                <span className={planetData[modalPlanet].color}>{modalPlanet === 'sun' ? '' : modalPlanet === 'moon' ? '🌙' : '🪐'}</span>
                {planetData[modalPlanet].name}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-300 hover:text-white text-2xl transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-48 h-48">
                <img
                  src={planetData[modalPlanet].image}
                  alt={planetData[modalPlanet].name}
                  className="w-full h-full object-contain planet-spin rounded-full"
                  style={{ '--spin-speed': planetData[modalPlanet].spinSpeed }}
                />
                <div className={`absolute inset-0 rounded-full ${planetData[modalPlanet].glowColor} blur-xl -z-10`}></div>
              </div>
              <div className="w-full text-gray-200 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">Type</p>
                    <p className="font-medium">{planetData[modalPlanet].type}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">Diameter</p>
                    <p className="font-medium">{planetData[modalPlanet].diameter}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">Mass</p>
                    <p className="font-medium">{planetData[modalPlanet].mass}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">Distance</p>
                    <p className="font-medium">{planetData[modalPlanet].distance}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">Orbital Period</p>
                    <p className="font-medium">{planetData[modalPlanet].orbitalPeriod}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">Moons</p>
                    <p className="font-medium">{planetData[modalPlanet].moons}</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-400">Composition</p>
                  <p className="font-medium">{planetData[modalPlanet].composition}</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-400">Temperature</p>
                  <p className="font-medium">{planetData[modalPlanet].temperature}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 rounded-lg border border-purple-500/30">
                  <p className="text-xs text-purple-300">Fun Fact</p>
                  <p className="font-medium">{planetData[modalPlanet].funFact}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Solar System
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}