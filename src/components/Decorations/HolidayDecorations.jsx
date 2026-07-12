import { CatmullRomCurve3, TubeGeometry, Vector3 } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useMemo } from 'react'

const bearMaterial = {
  color: '#8B5A3C',
  roughness: 0.62,
  metalness: 0.02,
  clearcoat: 0.08,
}

function TeddyBear({ position, rotation = 0, scale = 1 }) {
  return (
    <group position={position} rotation-y={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.3, 24, 18]} />
        <meshPhysicalMaterial {...bearMaterial} />
      </mesh>
      <mesh castShadow position={[0, 0.73, 0.015]}>
        <sphereGeometry args={[0.31, 28, 20]} />
        <meshPhysicalMaterial {...bearMaterial} />
      </mesh>
      {[-0.2, 0.2].map((x) => (
        <mesh castShadow key={x} position={[x, 0.98, 0.01]}>
          <sphereGeometry args={[0.115, 18, 14]} />
          <meshPhysicalMaterial {...bearMaterial} />
        </mesh>
      ))}
      {[-0.12, 0.12].map((x) => (
        <mesh key={x} position={[x, 0.79, 0.292]}>
          <sphereGeometry args={[0.03, 12, 10]} />
          <meshPhysicalMaterial color="#1B1513" roughness={0.28} metalness={0.12} />
        </mesh>
      ))}
      <mesh position={[0, 0.66, 0.285]} scale={[1.1, 0.76, 0.55]}>
        <sphereGeometry args={[0.1, 18, 14]} />
        <meshPhysicalMaterial color="#E6B58E" roughness={0.68} metalness={0.01} />
      </mesh>
      <mesh position={[0, 0.69, 0.344]}>
        <sphereGeometry args={[0.032, 12, 10]} />
        <meshPhysicalMaterial color="#261815" roughness={0.25} metalness={0.08} />
      </mesh>
      {[-0.24, 0.24].map((x) => (
        <mesh castShadow key={x} position={[x, 0.08, 0.08]} scale={[1.15, 0.58, 0.8]}>
          <sphereGeometry args={[0.16, 18, 12]} />
          <meshPhysicalMaterial {...bearMaterial} />
        </mesh>
      ))}
    </group>
  )
}

function PineSprig({ position, rotation = 0, scale = 1 }) {
  const needles = [-0.58, -0.35, -0.12, 0.12, 0.35, 0.58]

  return (
    <group position={position} rotation-y={rotation} scale={scale}>
      <mesh castShadow rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.028, 0.04, 1.5, 10]} />
        <meshPhysicalMaterial color="#4B2E1F" roughness={0.82} />
      </mesh>
      {needles.flatMap((x) => [-1, 1].map((direction) => ({ x, direction }))).map(({ x, direction }) => (
        <mesh
          castShadow
          key={`${x}-${direction}`}
          position={[x, 0.12, direction * 0.13]}
          rotation={[direction * 0.78, 0, -direction * 0.95]}
        >
          <coneGeometry args={[0.1, 0.55, 8]} />
          <meshPhysicalMaterial color="#123B2C" roughness={0.68} metalness={0.04} clearcoat={0.12} />
        </mesh>
      ))}
    </group>
  )
}

function PineCone({ position, rotation = 0, scale = 1 }) {
  return (
    <group position={position} rotation-y={rotation} scale={scale}>
      {[0, 0.12, 0.24, 0.36].map((y, index) => (
        <mesh castShadow key={y} position={[0, y, 0]} rotation-y={index * 0.78}>
          <coneGeometry args={[0.22 - index * 0.026, 0.2, 10]} />
          <meshPhysicalMaterial color="#704028" roughness={0.76} metalness={0.05} clearcoat={0.08} />
        </mesh>
      ))}
    </group>
  )
}

function Ornament({ position, color, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.16, 24, 18]} />
        <meshPhysicalMaterial color={color} roughness={0.12} metalness={0.72} clearcoat={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.052, 0.052, 0.07, 12]} />
        <meshPhysicalMaterial color="#D7B768" roughness={0.18} metalness={0.82} />
      </mesh>
    </group>
  )
}

function CandyCane({ position, rotation = 0, scale = 1 }) {
  const geometry = useMemo(
    () =>
      new TubeGeometry(
        new CatmullRomCurve3(
          [
            new Vector3(0, 0, 0),
            new Vector3(0, 0.48, 0),
            new Vector3(0, 0.82, 0),
            new Vector3(0.18, 0.97, 0),
            new Vector3(0.38, 0.87, 0),
            new Vector3(0.35, 0.66, 0),
          ],
          false,
          'centripetal',
        ),
        48,
        0.055,
        10,
        false,
      ),
    [],
  )

  return (
    <group position={position} rotation-y={rotation} scale={scale}>
      <mesh castShadow geometry={geometry}>
        <meshPhysicalMaterial color="#FFF4CF" roughness={0.18} metalness={0.12} clearcoat={0.64} />
      </mesh>
      {[0.16, 0.34, 0.52].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.058, 0.015, 8, 16]} />
          <meshPhysicalMaterial color="#B91D3A" roughness={0.2} metalness={0.2} clearcoat={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function MiniPresent({ position, color, scale = 1 }) {
  const geometry = useMemo(() => new RoundedBoxGeometry(0.56, 0.46, 0.56, 6, 0.06), [])

  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow geometry={geometry}>
        <meshPhysicalMaterial color={color} roughness={0.28} metalness={0.22} clearcoat={0.48} />
      </mesh>
      <mesh castShadow position={[0, 0.24, 0]}>
        <boxGeometry args={[0.1, 0.035, 0.62]} />
        <meshPhysicalMaterial color="#D7B768" roughness={0.14} metalness={0.8} clearcoat={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.26, 0]}>
        <boxGeometry args={[0.62, 0.035, 0.1]} />
        <meshPhysicalMaterial color="#D7B768" roughness={0.14} metalness={0.8} clearcoat={0.4} />
      </mesh>
    </group>
  )
}

const lightPositions = [
  [-2.3, -0.71, 0.95], [-1.75, -0.7, 1.35], [-1.1, -0.72, 1.25], [-0.45, -0.71, 1.38],
  [0.25, -0.7, 1.35], [0.95, -0.72, 1.25], [1.65, -0.7, 1.2], [2.3, -0.71, 0.85],
]

function FairyLights() {
  return (
    <group>
      {lightPositions.map((position, index) => (
        <mesh key={position.join('-')} position={position}>
          <sphereGeometry args={[0.045, 14, 10]} />
          <meshStandardMaterial color={index % 2 ? '#FFE1A1' : '#F4BA67'} emissive={index % 2 ? '#FFB64A' : '#F06F3C'} emissiveIntensity={2.4} />
        </mesh>
      ))}
      <pointLight color="#FFB45D" intensity={1.7} distance={4.2} decay={2} position={[-1.25, -0.25, 1.1]} />
      <pointLight color="#FFDDA1" intensity={1.4} distance={4} decay={2} position={[1.35, -0.2, 1.05]} />
    </group>
  )
}

function GroundStars() {
  const stars = [[-2.15, -0.74, -0.35], [-1.45, -0.73, -1.1], [1.65, -0.74, -0.7], [2.1, -0.73, 0.15]]

  return (
    <group>
      {stars.map((position) => (
        <mesh key={position.join('-')} position={position} rotation={[0.35, 0.6, 0]}>
          <octahedronGeometry args={[0.075, 1]} />
          <meshStandardMaterial color="#E8F3FF" emissive="#A8C8FF" emissiveIntensity={2.8} />
        </mesh>
      ))}
    </group>
  )
}

export function HolidayDecorations() {
  return (
    <group>
      <PineSprig position={[-2.1, -0.72, -0.9]} rotation={0.45} scale={0.95} />
      <PineSprig position={[1.75, -0.72, -1.1]} rotation={-0.35} scale={0.8} />
      <PineCone position={[-2.05, -0.78, -0.3]} rotation={0.6} />
      <PineCone position={[2.05, -0.78, -0.55]} rotation={-0.35} scale={0.85} />
      <TeddyBear position={[-1.55, -0.79, 0.55]} rotation={0.45} scale={0.82} />
      <TeddyBear position={[1.55, -0.79, 0.5]} rotation={-0.5} scale={0.76} />
      <CandyCane position={[-2.3, -0.77, 0.15]} rotation={0.42} scale={0.82} />
      <CandyCane position={[2.3, -0.77, 0.04]} rotation={-0.48} scale={0.82} />
      <Ornament position={[-2.3, -0.61, -0.55]} color="#D59A2A" />
      <Ornament position={[2.25, -0.62, -0.15]} color="#285D72" scale={0.92} />
      <MiniPresent position={[-2.3, -0.57, 0.95]} color="#254B6B" scale={0.78} />
      <MiniPresent position={[2.2, -0.59, 0.88]} color="#8B1B38" scale={0.72} />
      <FairyLights />
      <GroundStars />
    </group>
  )
}
