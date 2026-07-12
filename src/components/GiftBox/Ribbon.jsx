import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useMemo } from 'react'

const RIBBON_COLOR = '#FFF4CF'

const lidRibbonParts = [
  { size: [0.25, 0.065, 2.25], position: [0, 0, 0] },
  { size: [2.25, 0.065, 0.25], position: [0, 0, 0] },
]

const baseRibbonParts = [
  { size: [0.25, 1.55, 0.06], position: [0, 0, 1.08] },
  { size: [0.25, 1.55, 0.06], position: [0, 0, -1.08] },
  { size: [0.06, 1.55, 0.25], position: [1.08, 0, 0] },
  { size: [0.06, 1.55, 0.25], position: [-1.08, 0, 0] },
]

export function LidRibbon({ rotationX = 0 }) {
  const geometries = useMemo(
    () => lidRibbonParts.map(({ size }) => new RoundedBoxGeometry(...size, 6, 0.024)),
    [],
  )

  return (
    <group position={[0, 0.65, -1.05]} rotation-x={rotationX}>
      {lidRibbonParts.map(({ position }, index) => (
        <mesh castShadow geometry={geometries[index]} key={index} position={[0, 0.165, 1.05]}>
          <meshPhysicalMaterial
            color={RIBBON_COLOR}
            roughness={0.1}
            metalness={0.82}
            clearcoat={0.56}
            clearcoatRoughness={0.08}
          />
        </mesh>
      ))}
    </group>
  )
}

export function BaseRibbon() {
  const geometries = useMemo(
    () => baseRibbonParts.map(({ size }) => new RoundedBoxGeometry(...size, 6, 0.024)),
    [],
  )

  return (
    <group>
      {baseRibbonParts.map(({ position }, index) => (
        <mesh castShadow geometry={geometries[index]} key={index} position={position}>
          <meshPhysicalMaterial
            color={RIBBON_COLOR}
            roughness={0.1}
            metalness={0.82}
            clearcoat={0.56}
            clearcoatRoughness={0.08}
          />
        </mesh>
      ))}
    </group>
  )
}

