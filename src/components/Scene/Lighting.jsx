export function Lighting() {
  return (
    <>
      <hemisphereLight color="#7696D6" groundColor="#101A30" intensity={0.28} />
      <directionalLight
        castShadow
        color="#dce8ff"
        intensity={3.35}
        position={[4.5, 7, 4]}
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-radius={4}
        shadow-normalBias={0.025}
      />
      <directionalLight color="#F0B274" intensity={1.45} position={[-4, 3, 4]} />
      <directionalLight color="#83A8F4" intensity={1.4} position={[-8, 9, -7]} />
    </>
  )
}
