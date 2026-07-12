import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useMemo } from 'react'

const GIFT_COLOR = '#A2142F'

export function GiftLid({ rotationX = 0 }) {
  const geometry = useMemo(() => new RoundedBoxGeometry(2.2, 0.3, 2.2, 10, 0.11), [])

  return (
    <group position={[0, 0.65, -1.05]} rotation-x={rotationX}>
      <mesh castShadow receiveShadow geometry={geometry} position={[0, 0, 1.05]}>
        <meshPhysicalMaterial
          color={GIFT_COLOR}
          roughness={0.21}
          metalness={0.34}
          clearcoat={0.68}
          clearcoatRoughness={0.1}
          iridescence={0.06}
          iridescenceIOR={1.35}
        />
      </mesh>
    </group>
  )
}
