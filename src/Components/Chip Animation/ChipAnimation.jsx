import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Function to animate sphere geometry
function Sphere() {
  const [color, setColor] = useState("#84bdae")

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth <= 768) {
        setColor("#ffffff")
      }
      else {
        setColor("#84bdae")
      }
    };
    handleResize();
  },[]);


  // window.addEventListener()
  useFrame((state) => {
    const mesh = state.scene.getObjectByName("sphere");
    if (mesh) {
      const geometry = mesh.geometry;
      const positions = geometry.attributes.position;

      if (!positions) return;

      const time = state.clock.getElapsedTime();
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        const wave = Math.sin(time * 2 + (x + y + z) * 0.5) * 0.02;
        const radius = 1.5 + wave;
        const normalized = new THREE.Vector3(x, y, z).normalize();

        positions.setXYZ(i, normalized.x * radius, normalized.y * radius, normalized.z * radius);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh name="sphere" scale={[2, 2, 2]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshPhongMaterial color={color} wireframe={true} opacity={0.5} transparent={true}/>
    </mesh>
  );
}

export default function Object() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log("WebGL context lost. Attempting to recover...");
      // Add recovery logic if needed here
    };

    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
      }
    };
  }, []);

  return (
    <div className="phs:h-[330px] lg:max-h-[280px] lg:max-w-[300px] h-[400px] w-full">
      <Canvas
        gl={{ antialias: true, preserveDrawingBuffer: true }} // Using better WebGL options
        camera={{ position: [0, 0, 6] }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Sphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}