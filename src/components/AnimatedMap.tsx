import React, { useEffect, useState } from 'react';
import { Town } from '../App';

interface TownLocation {
  id: Town;
  name: string;
  coordinates: { x: number; y: number };
  households: string;
  active: boolean;
}

interface AnimatedMapProps {
  onTownSelect: (town: Town) => void;
  selectedTown: Town | null;
}

export const AnimatedMap: React.FC<AnimatedMapProps> = ({ onTownSelect, selectedTown }) => {
  const [animatedPins, setAnimatedPins] = useState<Town[]>([]);

  const townLocations: TownLocation[] = [
    { 
      id: 'billerica', 
      name: 'Billerica',
      coordinates: { x: 48, y: 42 },
      households: '15,000+',
      active: true
    },
    { 
      id: 'wilmington', 
      name: 'Wilmington',
      coordinates: { x: 58, y: 28 },
      households: '8,500+',
      active: true
    },
    { 
      id: 'tewksbury', 
      name: 'Tewksbury',
      coordinates: { x: 68, y: 35 },
      households: '10,000+',
      active: true
    },
    { 
      id: 'andover', 
      name: 'Andover',
      coordinates: { x: 78, y: 22 },
      households: '12,500+',
      active: false
    },
    { 
      id: 'northandover', 
      name: 'North Andover',
      coordinates: { x: 88, y: 25 },
      households: '11,000+',
      active: false
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      townLocations.forEach((town, index) => {
        setTimeout(() => {
          setAnimatedPins(prev => [...prev, town.id]);
        }, index * 300);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <div 
        className="absolute inset-0 bg-contain bg-no-repeat bg-center"
        style={{ 
          backgroundImage: 'url("https://raw.githubusercontent.com/BexleyC/SpendLocal/main/banners/northeastern-ma.jpg")',
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
        }}
      />
      
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
      >
        {/* Town markers */}
        {townLocations.map((town) => (
          <g
            key={town.id}
            transform={`translate(${town.coordinates.x}, ${town.coordinates.y})`}
            className={`cursor-pointer transition-transform duration-300 ${
              selectedTown === town.id ? 'scale-110' : 'hover:scale-105'
            }`}
            onClick={() => onTownSelect(town.id)}
          >
            {/* Pin drop animation */}
            <g
              className={`transform origin-bottom transition-all duration-500 ${
                animatedPins.includes(town.id)
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-20 opacity-0'
              }`}
            >
              {/* Pin shadow */}
              <circle
                cx="0"
                cy="0"
                r="2"
                fill="rgba(0,0,0,0.2)"
                className="animate-pulse"
              />
              
              {/* Pin body */}
              <path
                d="M-2,-8 L2,-8 L2,-2 L0,0 L-2,-2 Z"
                fill={town.active ? '#dc2626' : '#64748b'}
                className="transition-colors duration-300"
              />
              
              {/* Pin head */}
              <circle
                cx="0"
                cy="-8"
                r="2"
                fill={town.active ? '#dc2626' : '#64748b'}
                className="transition-colors duration-300"
              />

              {/* Active indicator */}
              {town.active && (
                <circle
                  cx="0"
                  cy="-8"
                  r="4"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="0.5"
                  className="animate-ping"
                  style={{ animationDuration: '2s' }}
                />
              )}
            </g>
            
            {/* Town label */}
            <g
              className={`transition-opacity duration-300 ${
                animatedPins.includes(town.id) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <text
                x="4"
                y="0"
                fontSize="3.5"
                fill={selectedTown === town.id ? '#dc2626' : '#1e293b'}
                className="transition-colors duration-300 font-semibold"
                style={{ fontFamily: 'Inter' }}
              >
                {town.name}
              </text>
              <text
                x="4"
                y="4"
                fontSize="2.5"
                fill="#64748b"
                style={{ fontFamily: 'Inter' }}
              >
                {town.households} households
              </text>
              {town.active && (
                <text
                  x="4"
                  y="7.5"
                  fontSize="2.5"
                  fill="#dc2626"
                  style={{ fontFamily: 'Inter' }}
                  className="font-medium"
                >
                  Now Available
                </text>
              )}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};