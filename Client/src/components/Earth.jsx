import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// CORS proxy URL
const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Or any other CORS proxy you want to use

const Earth = () => {
  // External image URLs (replace these with your own URLs)
  const imageUrlDay = "https://blenderartists.org/uploads/default/59c3bfbbf9177d22bcd15adde5d2fb770cdd0f7d";
  const imageUrlNight = "https://i.natgeofe.com/k/3c3643d7-53e9-4de2-86ba-2037e8836b0d/5-reasons-why-you-should-love-earth-textimage_0_2x1.jpg";

  // Apply the CORS proxy to the URLs
  const proxiedUrlDay = proxyUrl + imageUrlDay;
  const proxiedUrlNight = proxyUrl + imageUrlNight;

  // Use the texture loader
  const [dayTexture, nightTexture] = useLoader(THREE.TextureLoader, [proxiedUrlDay, proxiedUrlNight]);

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial>
        <primitive object={dayTexture} attach="map" />
        <primitive object={nightTexture} attach="bumpMap" />
      </meshStandardMaterial>
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
      <Earth />
    </Canvas>
  );
};

export default Scene;
