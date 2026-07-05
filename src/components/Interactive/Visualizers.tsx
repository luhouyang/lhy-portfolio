import { useEffect, useRef, useState, useMemo } from "react";
import mermaid from "mermaid";
import Plot from "react-plotly.js";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { InlineMath } from "react-katex";

// ==========================================
// 1. MERMAID DIAGRAMS
// ==========================================
mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#fdfbf7",
    primaryTextColor: "#292524",
    primaryBorderColor: "#c2410c",
    lineColor: "#78716c",
    secondaryColor: "#f5f5f4",
    tertiaryColor: "#1c1917",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  securityLevel: "loose",
});

export const Mermaid = ({ chart }: { chart: string }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  useEffect(() => {
    if (!chart) return;
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    mermaid
      .render(id, chart)
      .then(({ svg }) => setSvgContent(svg))
      .catch((err) =>
        setSvgContent(
          `<pre style="color: #c2410c; padding: 1rem; background: #f5f5f4; border-radius: 0.5rem;">Mermaid Error: ${err.message}</pre>`,
        ),
      );
  }, [chart]);

  return (
    <div
      className="my-10 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

// High-DPI canvas setup helper
function setupHiDpiCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// ==========================================
// 2. 3D MATH SURFACE (Plotly.js)
// ==========================================
export const MathSurfacePlotter = ({ initialEpsilon = 0.2 }: any) => {
  const [epsilon, setEpsilon] = useState(initialEpsilon);

  const data = useMemo(() => {
    const size = 50;
    const x = Array.from({ length: size }, (_, i) => -5 + (10 * i / size));
    const y = Array.from({ length: size }, (_, i) => -5 + (10 * i / size));
    const z = x.map(xi => y.map(yi => {
      const base = 0.5 * (xi * xi + yi * yi);
      const ripple = epsilon * 3 * Math.sin(xi * 2) * Math.cos(yi * 2);
      return base + ripple;
    }));
    return [{
      type: 'surface',
      x, y, z,
      colorscale: [['0.0', '#f5f5f4'], ['0.5', '#fdba74'], ['1.0', '#c2410c']],
      showscale: false,
      contours: { z: { show: true, usecolormap: true, project: { z: true } } }
    }];
  }, [epsilon]);

  return (
    // Removed card border, padding, and background
    <div className="my-10">
      <Plot 
        data={data as any} 
        layout={{
          autosize: true, 
          height: 450, 
          // Flush margins so the 3D space uses the full width
          margin: { l: 0, r: 0, b: 0, t: 0 },
          paper_bgcolor: 'rgba(0,0,0,0)', 
          plot_bgcolor: 'rgba(0,0,0,0)',
          scene: { 
            xaxis: { showgrid: false, zeroline: false, visible: false }, 
            yaxis: { showgrid: false, zeroline: false, visible: false }, 
            zaxis: { showgrid: false, zeroline: false, visible: false }, 
            bgcolor: 'rgba(0,0,0,0)', 
            camera: { eye: { x: 1.2, y: 1.2, z: 0.8 } } 
          }
        }} 
        config={{ displaylogo: false, responsive: true }}
        style={{ width: '100%' }}
      />
      <label className="block font-mono text-sm text-[#57534e] dark:text-[#a8a29e] mt-4">
        <span className="flex items-center gap-2">
          Clipping Parameter (<InlineMath math="\epsilon" />): 
          <span className="text-[#c2410c] font-bold">{epsilon.toFixed(2)}</span>
        </span>
        <input type="range" min="0" max="1" step="0.05" value={epsilon} onChange={(e) => setEpsilon(parseFloat(e.target.value))} className="w-full mt-2 accent-[#c2410c]" />
      </label>
    </div>
  );
};

// ==========================================
// 3. STRANGE ATTRACTOR (React-Three-Fiber)
// ==========================================
function generateLorenzPoints(steps = 10000, dt = 0.01, sigma = 10, rho = 28, beta = 2.667) {
  const points: [number, number, number][] = [];
  let x = 0.1,
    y = 0,
    z = 0;
  for (let i = 0; i < steps; i++) {
    const dx = sigma * (y - x) * dt;
    const dy = (x * (rho - z) - y) * dt;
    const dz = (x * y - beta * z) * dt;
    x += dx;
    y += dy;
    z += dz;
    points.push([x, y, z]);
  }
  return points;
}

function LorenzSystem({ rho }: any) {
  const points = useMemo(() => generateLorenzPoints(10000, 0.01, 10, rho, 2.667), [rho]);
  return (
    <Line
      points={points}
      color="#c2410c"
      lineWidth={1.5}
    />
  );
}

export const ChaosCanvas = ({ initialRho = 28 }: any) => {
  const [rho, setRho] = useState(initialRho);

  return (
    <div className="my-10 p-4 bg-[#fdfbf7]/80 dark:bg-[#1c1917]/80 border border-[#e7e5e4] dark:border-[#44403c] rounded-lg">
      <div className="w-full h-[400px] bg-[#f5f5f4] dark:bg-[#0c0a09] rounded border border-[#e7e5e4] dark:border-[#44403c]">
        <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
          <LorenzSystem rho={rho} />
          <OrbitControls
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>
      </div>
      <label className="block font-mono text-sm text-[#57534e] dark:text-[#a8a29e] mt-4">
        <span className="flex items-center gap-2">
          Rayleigh Number (<InlineMath math="\rho" />
          ):
          <span className="text-[#c2410c] font-bold">{rho.toFixed(1)}</span>
        </span>
        <input
          type="range"
          min="0"
          max="50"
          step="0.5"
          value={rho}
          onChange={(e) => setRho(parseFloat(e.target.value))}
          className="w-full mt-2 accent-[#c2410c]"
        />
      </label>
    </div>
  );
};

// ==========================================
// 4. FORWARD DIFFUSION (Custom GLSL Shaders)
// ==========================================
const vertexShader = `
  uniform float uTime;
  attribute vec3 targetShape;
  
  void main() {
    float t = smoothstep(0.0, 1.0, uTime);
    vec3 currentPos = mix(position, targetShape, t);
    
    float turbulence = sin(uTime * 3.14159) * 2.5; 
    currentPos += vec3(
      sin(position.x * 1.5 + uTime * 4.0),
      cos(position.y * 1.5 + uTime * 4.0),
      sin(position.z * 1.5 + uTime * 4.0)
    ) * turbulence;

    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_PointSize = 1.5 * (100.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Smooth circular falloff for soft edges
    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
    
    // Deep, rich terracotta color
    gl_FragColor = vec4(0.65, 0.22, 0.05, alpha * 0.85); 
  }
`;

function DiffusionParticles({ timestep }: any) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const PARTICLE_COUNT = 1000000; // 1 MILLION PARTICLES

  const { positions, targets } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const tar = new Float32Array(PARTICLE_COUNT * 3);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // INITIAL STATE: Sphere
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 8;
      pos[i * 3] = r1 * Math.sin(phi1) * Math.cos(theta1);
      pos[i * 3 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      pos[i * 3 + 2] = r1 * Math.cos(phi1);

      // TARGET STATE: Torus
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI * 2;
      const R = 12; 
      const r = 4;  
      tar[i * 3]     = (R + r * Math.cos(theta2)) * Math.cos(phi2);
      tar[i * 3 + 1] = (R + r * Math.cos(theta2)) * Math.sin(phi2);
      tar[i * 3 + 2] = r * Math.sin(theta2);
    }
    return { positions: pos, targets: tar };
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0.0 } }), []);

  useFrame(() => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = timestep;
  });

  return (
    <>
      <mesh>
        <torusGeometry args={[12, 4, 16, 100]} />
        <meshBasicMaterial color="#c2410c" wireframe transparent opacity={0.15} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={1000000} array={positions} itemSize={3} args={[positions, 3]} />
          <bufferAttribute attach="attributes-targetShape" count={1000000} array={targets} itemSize={3} args={[targets, 3]} />
        </bufferGeometry>
        <shaderMaterial 
          ref={materialRef} 
          vertexShader={vertexShader} 
          fragmentShader={fragmentShader}
          uniforms={uniforms} 
          transparent={true} 
          depthWrite={false}
          blending={THREE.NormalBlending} 
        />
      </points>
    </>
  );
}

export const DiffusionCanvas = ({ initialTimestep = 0 }: any) => {
  const [timestep, setTimestep] = useState(initialTimestep);

  return (
    <div className="my-10 p-4 bg-[#fdfbf7]/80 dark:bg-[#1c1917]/80 border border-[#e7e5e4] dark:border-[#44403c] rounded-lg">
      <div className="w-full h-[400px] bg-[#0c0a09] rounded border border-[#e7e5e4] dark:border-[#44403c] overflow-hidden">
        <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
          <DiffusionParticles timestep={timestep} />
          <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <label className="block font-mono text-sm text-[#57534e] dark:text-[#a8a29e] mt-4">
        <span className="flex items-center gap-2">
          Diffusion Timestep (<InlineMath math="t" />): 
          <span className="text-[#c2410c] font-bold">{timestep.toFixed(2)}</span>
          <span className="ml-auto text-xs text-[#78716c]">Rendering 1,000,000 Particles via WebGL</span>
        </span>
        <input type="range" min="0" max="1" step="0.01" value={timestep} onChange={(e) => setTimestep(parseFloat(e.target.value))} className="w-full mt-2 accent-[#c2410c]" />
      </label>
    </div>
  );
};

// ==========================================
// 5. ROPE & SWARM
// ==========================================
export const RoPEVisualizer = ({ dimCount = 4 }: { dimCount?: number }) => {
  const [position, setPosition] = useState(1);
  const base = 10000;
  return (
    <div className="my-10 p-6 bg-[#fdfbf7]/80 dark:bg-[#1c1917]/80 border border-[#e7e5e4] dark:border-[#44403c] rounded-lg">
      <label className="block font-mono text-sm text-[#57534e] dark:text-[#a8a29e] mb-4">
        <span className="flex items-center gap-2">
          Token Position (<InlineMath math="m" />
          ):
          <span className="text-[#c2410c] font-bold">{position}</span>
        </span>
        <input
          type="range"
          min="0"
          max="50"
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
          className="w-full mt-2 accent-[#c2410c]"
        />
      </label>
      <div className="flex justify-around gap-4 flex-wrap">
        {Array.from({ length: dimCount }).map((_, i) => {
          const theta = Math.pow(base, -((2 * i) / (dimCount * 2)));
          const angle = position * theta;
          return (
            <div
              key={i}
              className="flex flex-col items-center"
            >
              <svg
                width="80"
                height="80"
                viewBox="-40 -40 80 80"
                className="bg-[#f5f5f4] dark:bg-[#292524] rounded-full border border-[#e7e5e4] dark:border-[#44403c]"
              >
                <circle
                  cx="0"
                  cy="0"
                  r="35"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="0"
                  x2={Math.cos(angle) * 35}
                  y2={Math.sin(angle) * 35}
                  stroke="#c2410c"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs text-[#78716c] mt-2 font-mono">Dim {i * 2}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SwarmCanvas = () => {
  const [cohesionWeight, setCohesionWeight] = useState(1.0);
  const [separationWeight, setSeparationWeight] = useState(1.5);
  const [alignmentWeight, setAlignmentWeight] = useState(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentsRef = useRef(
    Array.from({ length: 120 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    })),
  );
  const loopRef = useRef<number>();
  const paramsRef = useRef({ cohesion: cohesionWeight, separation: separationWeight, alignment: alignmentWeight });

  useEffect(() => {
    paramsRef.current = { cohesion: cohesionWeight, separation: separationWeight, alignment: alignmentWeight };
  }, [cohesionWeight, separationWeight, alignmentWeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width,
      height = canvas.height;

    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "#1c1917" : "#fdfbf7";
      ctx.fillRect(0, 0, width, height);
      const agents = agentsRef.current;
      const { cohesion, separation, alignment } = paramsRef.current;

      for (let i = 0; i < agents.length; i++) {
        const a = agents[i];
        let avgVx = 0,
          avgVy = 0,
          avgX = 0,
          avgY = 0,
          sepX = 0,
          sepY = 0,
          neighbors = 0;
        for (let j = 0; j < agents.length; j++) {
          if (i === j) continue;
          const b = agents[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            avgVx += b.vx;
            avgVy += b.vy;
            avgX += b.x;
            avgY += b.y;
            neighbors++;
            if (dist < 25) {
              sepX += dx / dist;
              sepY += dy / dist;
            }
          }
        }
        if (neighbors > 0) {
          a.vx += (avgVx / neighbors - a.vx) * 0.05 * alignment;
          a.vy += (avgVy / neighbors - a.vy) * 0.05 * alignment;
          a.vx += (avgX / neighbors - a.x) * 0.003 * cohesion;
          a.vy += (avgY / neighbors - a.y) * 0.003 * cohesion;
        }
        a.vx += sepX * 0.5 * separation;
        a.vy += sepY * 0.5 * separation;
        const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
        if (speed > 4) {
          a.vx = (a.vx / speed) * 4;
          a.vy = (a.vy / speed) * 4;
        }
        if (speed < 1.5 && speed > 0) {
          a.vx = (a.vx / speed) * 1.5;
          a.vy = (a.vy / speed) * 1.5;
        }
        if (a.x < 60) a.vx += 0.3;
        if (a.x > width - 60) a.vx -= 0.3;
        if (a.y < 60) a.vy += 0.3;
        if (a.y > height - 60) a.vy -= 0.3;
        a.x += a.vx;
        a.y += a.vy;

        const angle = Math.atan2(a.vy, a.vx);
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(angle);
        ctx.fillStyle = "#c2410c";
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-5, 4);
        ctx.lineTo(-5, -4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      loopRef.current = requestAnimationFrame(draw);
    };
    loopRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(loopRef.current!);
  }, []);

  return (
    <div className="my-10 p-6 bg-[#fdfbf7]/80 dark:bg-[#1c1917]/80 border border-[#e7e5e4] dark:border-[#44403c] rounded-lg">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full rounded border border-[#e7e5e4] dark:border-[#44403c] mb-4 bg-[#fdfbf7] dark:bg-[#1c1917]"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm text-[#57534e] dark:text-[#a8a29e]">
        <label className="flex flex-col gap-1">
          Cohesion: <span className="text-[#c2410c] font-bold">{cohesionWeight.toFixed(1)}</span>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={cohesionWeight}
            onChange={(e) => setCohesionWeight(parseFloat(e.target.value))}
            className="w-full accent-[#c2410c]"
          />
        </label>
        <label className="flex flex-col gap-1">
          Separation: <span className="text-[#c2410c] font-bold">{separationWeight.toFixed(1)}</span>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={separationWeight}
            onChange={(e) => setSeparationWeight(parseFloat(e.target.value))}
            className="w-full accent-[#c2410c]"
          />
        </label>
        <label className="flex flex-col gap-1">
          Alignment: <span className="text-[#c2410c] font-bold">{alignmentWeight.toFixed(1)}</span>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={alignmentWeight}
            onChange={(e) => setAlignmentWeight(parseFloat(e.target.value))}
            className="w-full accent-[#c2410c]"
          />
        </label>
      </div>
    </div>
  );
};
