import { BackSide, BufferGeometry, BufferAttribute, Color, Shape, ShapeGeometry, Vector3 } from 'three'
import { useMemo } from 'react'
import { Snowfall } from './Snowfall.jsx'

const TREE_LAYOUT = Array.from({ length: 22 }, (_, index) => ({
  x: -12 + index * 1.15,
  height: 1.1 + ((index * 37) % 10) * 0.13,
  scale: 0.72 + ((index * 13) % 8) * 0.05,
}))

function NightSky() {
  const material = useMemo(
    () => ({
      uniforms: {
        topColor: { value: new Color('#020615') },
        horizonColor: { value: new Color('#1A315A') },
        bottomColor: { value: new Color('#506E9A') },
      },
      vertexShader: `varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y * 0.5 + 0.5;
          vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.52, h));
          color = mix(color, topColor, smoothstep(0.48, 1.0, h));
          gl_FragColor = vec4(color, 1.0);
        }`,
    }),
    [],
  )

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[42, 36, 20]} />
      <shaderMaterial side={BackSide} depthWrite={false} {...material} />
    </mesh>
  )
}

function StarField() {
  const geometry = useMemo(() => {
    const positions = new Float32Array(360 * 3)
    for (let index = 0; index < 360; index += 1) {
      const seed = index * 19.37
      const theta = (seed % 360) * (Math.PI / 180)
      const phi = 0.25 + ((seed * 0.713) % 1) * 1.05
      const radius = 34 + ((seed * 0.17) % 1) * 4
      positions[index * 3] = Math.sin(phi) * Math.cos(theta) * radius
      positions[index * 3 + 1] = Math.cos(phi) * radius + 4
      positions[index * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius
    }
    const buffer = new BufferGeometry()
    buffer.setAttribute('position', new BufferAttribute(positions, 3))
    return buffer
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#DDEBFF" size={0.075} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  )
}

function MountainRange() {
  const geometry = useMemo(() => {
    const shape = new Shape()
    shape.moveTo(-20, -2)
    shape.lineTo(-20, 0)
    shape.lineTo(-14, 2.6)
    shape.lineTo(-9.5, 0.8)
    shape.lineTo(-3.5, 4.4)
    shape.lineTo(1, 1.35)
    shape.lineTo(7.5, 3.2)
    shape.lineTo(13, 1.1)
    shape.lineTo(20, 3.8)
    shape.lineTo(20, -2)
    shape.closePath()
    return new ShapeGeometry(shape)
  }, [])

  return (
    <group position={[0, -0.78, -15]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#112346" transparent opacity={0.9} />
      </mesh>
      <mesh geometry={geometry} position={[0, -0.15, -1]} scale={[0.82, 0.62, 1]}>
        <meshBasicMaterial color="#0B1830" transparent opacity={0.82} />
      </mesh>
    </group>
  )
}

function SnowyPines() {
  return (
    <group position={[0, -0.8, -9.8]}>
      {TREE_LAYOUT.map(({ x, height, scale }, index) => (
        <group key={x} position={[x, 0, -Math.abs(x % 3) * 0.24]} scale={scale}>
          <mesh position={[0, height * 0.48, 0]}>
            <coneGeometry args={[height * 0.29, height, 8]} />
            <meshBasicMaterial color="#102B39" />
          </mesh>
          <mesh position={[0, height * 0.71, 0.025]} scale={[0.82, 0.38, 0.84]}>
            <coneGeometry args={[height * 0.29, height, 8]} />
            <meshBasicMaterial color="#7B9DB8" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function AtmosphericHaze() {
  return (
    <group position={[0, 0.8, -10]}>
      <mesh scale={[16, 2.6, 1]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshBasicMaterial color="#8EA9D4" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[2, -0.75, 1]} scale={[13, 1.2, 1]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshBasicMaterial color="#B5CBE4" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  )
}

function FloatingDust() {
  const geometry = useMemo(() => {
    const positions = new Float32Array(70 * 3)
    for (let index = 0; index < 70; index += 1) {
      positions[index * 3] = ((index * 0.73) % 1) * 6 - 3
      positions[index * 3 + 1] = ((index * 0.41) % 1) * 2.6 - 0.45
      positions[index * 3 + 2] = ((index * 0.29) % 1) * 4 - 2
    }
    const buffer = new BufferGeometry()
    buffer.setAttribute('position', new BufferAttribute(positions, 3))
    return buffer
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#C7D9FF" size={0.025} sizeAttenuation transparent opacity={0.34} depthWrite={false} />
    </points>
  )
}

function Fireflies() {
  const positions = [
    new Vector3(-1.65, -0.1, 0.8), new Vector3(-1.05, 0.45, 1.15), new Vector3(-0.45, 0.15, 1.35),
    new Vector3(0.7, 0.2, 1.15), new Vector3(1.55, 0.5, 0.75), new Vector3(2.1, -0.1, 0.42),
  ]

  return (
    <group>
      {positions.map((position) => (
        <mesh key={position.toArray().join('-')} position={position}>
          <sphereGeometry args={[0.028, 12, 10]} />
          <meshStandardMaterial color="#FFF0B0" emissive="#FFC84E" emissiveIntensity={3.2} />
        </mesh>
      ))}
    </group>
  )
}

export function WinterEnvironment({ paperRevealed }) {
  return (
    <group>
      <NightSky />
      <StarField />
      <MountainRange />
      <SnowyPines />
      <AtmosphericHaze />
      <FloatingDust />
      <Fireflies />
      <Snowfall paperRevealed={paperRevealed} />
    </group>
  )
}
