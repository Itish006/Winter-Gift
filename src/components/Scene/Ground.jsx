import { PlaneGeometry } from 'three'
import { useMemo } from 'react'

export function Ground() {
  const geometry = useMemo(() => {
    const plane = new PlaneGeometry(80, 80, 80, 80)
    const positions = plane.attributes.position

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index)
      const y = positions.getY(index)
      const variation = Math.sin(x * 0.34) * Math.cos(y * 0.28) * 0.045
      const fineVariation = Math.sin((x + y) * 0.95) * 0.012
      positions.setZ(index, variation + fineVariation)
    }

    positions.needsUpdate = true
    plane.computeVertexNormals()
    return plane
  }, [])

  return (
    <mesh receiveShadow geometry={geometry} rotation-x={-Math.PI / 2} position={[0, -0.81, 0]}>
      <meshPhysicalMaterial
        color="#6D8BA8"
        roughness={0.36}
        metalness={0.08}
        clearcoat={0.28}
        clearcoatRoughness={0.24}
        reflectivity={0.42}
      />
    </mesh>
  )
}
