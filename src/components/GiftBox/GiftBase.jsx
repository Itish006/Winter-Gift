import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useMemo } from 'react'
import { EmbossedPattern } from './EmbossedPattern.jsx'

const GIFT_COLOR = '#A2142F'

export function GiftBase() {
  const geometry = useMemo(() => new RoundedBoxGeometry(2.1, 1.3, 2.1, 10, 0.12), [])

  return (
    <group>
      <mesh castShadow receiveShadow geometry={geometry} position={[0, -0.15, 0]}>
        <meshPhysicalMaterial
          color={GIFT_COLOR}
          roughness={0.23}
          metalness={0.34}
          clearcoat={0.62}
          clearcoatRoughness={0.12}
          iridescence={0.06}
          iridescenceIOR={1.35}
        />
      </mesh>
      <EmbossedPattern />
    </group>
  )
}
