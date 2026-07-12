const patternPositions = [
  [-0.48, -0.16, 1.058],
  [0, -0.16, 1.058],
  [0.48, -0.16, 1.058],
  [1.058, -0.16, -0.48],
  [1.058, -0.16, 0],
  [1.058, -0.16, 0.48],
]

export function EmbossedPattern() {
  return (
    <group>
      {patternPositions.map(([x, y, z], index) => (
        <mesh
          castShadow
          key={`${x}-${z}`}
          position={[x, y, z]}
          rotation={index > 2 ? [0, Math.PI / 2, 0] : [0, 0, 0]}
          scale={[1, 0.62, 1]}
        >
          <torusGeometry args={[0.135, 0.012, 8, 24]} />
          <meshPhysicalMaterial
            color="#D23951"
            roughness={0.25}
            metalness={0.32}
            clearcoat={0.58}
            clearcoatRoughness={0.16}
          />
        </mesh>
      ))}
    </group>
  )
}
