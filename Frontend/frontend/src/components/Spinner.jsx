import React, { useState, useEffect } from 'react';
import { SpringLoader } from 'dubsui';

function Spinner() {
  const settings = [
    {
      rebound: {
        tension: 16,
        friction: 5,
      },
      spinner: {
        id: 'spinner1',
        radius: 200,
        sides: 3,
        depth: 4,
        colors: {
          background: 'red',
          stroke: 'white',
          base: null,
          child: 'yellow',
        },
        alwaysForward: true,
        restAt: 0.5,
        renderBase: false,
      },
    },
    {
      rebound: {
        tension: 14,
        friction: 10,
      },
      spinner: {
        id: 'spinner2',
        radius: 100,
        sides: 5,
        depth: 8,
        colors: {
          background: '#00272C',
          stroke: null,
          base: null,
          child: '#02C39A',
        },
        alwaysForward: true,
        restAt: null,
        renderBase: false,
      },
    },
    {
      rebound: {
        tension: 10,
        friction: 7,
      },
      spinner: {
        id: 'spinner3',
        radius: 160,
        sides: 8,
        depth: 6,
        colors: {
          background: '#181818',
          stroke: '#D23232',
          base: null,
          child: '#181818',
        },
        alwaysForward: true,
        restAt: null,
        renderBase: false,
      },
    },
    {
      rebound: {
        tension: 1,
        friction: 3,
      },
      spinner: {
        id: 'spinner4',
        radius: 100,
        sides: 5,
        depth: 4,
        colors: {
          background: '#91A7D0',
          stroke: null,
          base: null,
          child: '#F6CAC9',
        },
        alwaysForward: true,
        restAt: 0.8,
        renderBase: true,
      },
    },
    {
      rebound: {
        tension: 2,
        friction: 7,
      },
      spinner: {
        id: 'spinner5',
        radius: 200,
        sides: 3,
        depth: 9,
        colors: {
          background: '#f0f0f0',
          stroke: null,
          base: '#222',
          child: '#f0f0f0',
        },
        alwaysForward: true,
        restAt: null,
        renderBase: true,
      },
    },
  ];

  const [complete, setComplete] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % settings.length);
      setComplete((prevComplete) => !prevComplete);
    }, 300000); // Change the setting every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <div className='toggleButton' onClick={() => {
        console.log('click: ', complete);
        setComplete(!complete);
      }}>Toggle</div>

      <SpringLoader settings={settings[index]} timeout={30000000} complete={complete} />
    </div>
  );
}

export default Spinner;
