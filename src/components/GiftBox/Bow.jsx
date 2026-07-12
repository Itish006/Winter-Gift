import { CatmullRomCurve3, TubeGeometry, Vector3 } from 'three'
import { useMemo } from 'react'

const RIBBON_COLOR = '#FFF4CF'

function createLoopCurve(direction) {
  return new CatmullRomCurve3(
    [
      new Vector3(0, 0, 0),
      new Vector3(direction * 0.42, 0.17, 0.1),
      new Vector3(direction * 0.85, 0.08, 0.06),
      new Vector3(direction * 0.95, 0.29, 0),
      new Vector3(direction * 0.75, 0.5, 0),
      new Vector3(direction * 0.3, 0.43, 0.04),
      new Vector3(0, 0, 0),
    ],
    true,
    'centripetal',
  )
}

export function Bow() {
  const [leftLoop, rightLoop] = useMemo(
    () => [
      new TubeGeometry(createLoopCurve(-1), 64, 0.075, 12, false),
      new TubeGeometry(createLoopCurve(1), 64, 0.075, 12, false),
    ],
    [],
  )

  return (
    <group position={[0, 0.87, 0]} rotation={[0, Math.PI * 0.12, 0]}>
      <mesh castShadow geometry={leftLoop}>
        <meshPhysicalMaterial color={RIBBON_COLOR} roughness={0.1} metalness={0.82} clearcoat={0.56} />
      </mesh>
      <mesh castShadow geometry={rightLoop}>
        <meshPhysicalMaterial color={RIBBON_COLOR} roughness={0.1} metalness={0.82} clearcoat={0.56} />
      </mesh>
      <mesh castShadow position={[0, 0.11, 0]} scale={[1, 0.74, 1]}>
        <sphereGeometry args={[0.19, 28, 20]} />
        <meshPhysicalMaterial
          color={RIBBON_COLOR}
          roughness={0.1}
          metalness={0.82}
          clearcoat={0.56}
          clearcoatRoughness={0.08}
        />
      </mesh>
    </group>
  )
}
