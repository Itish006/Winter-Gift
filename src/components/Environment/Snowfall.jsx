import { useFrame } from '@react-three/fiber'
import { BufferGeometry, BufferAttribute, Points } from 'three'
import { useRef, useMemo } from 'react'

export function Snowfall({ paperRevealed }) {
  const pointsRef = useRef()
  const extraPointsRef = useRef()
  const NUM_SNOWFLAKES = 800
  const EXTRA_FLAKES = 400

  const { geometry, speeds, drifts } = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(NUM_SNOWFLAKES * 3)
    const speeds = new Float32Array(NUM_SNOWFLAKES)
    const drifts = new Float32Array(NUM_SNOWFLAKES)

    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = Math.random() * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      speeds[i] = 0.005 + Math.random() * 0.015
      drifts[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    return { geometry, speeds, drifts }
  }, [])

  const { geometry: extraGeometry, speeds: extraSpeeds, drifts: extraDrifts } = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(EXTRA_FLAKES * 3)
    const speeds = new Float32Array(EXTRA_FLAKES)
    const drifts = new Float32Array(EXTRA_FLAKES)

    for (let i = 0; i < EXTRA_FLAKES; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = Math.random() * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      speeds[i] = 0.008 + Math.random() * 0.02
      drifts[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    return { geometry, speeds, drifts }
  }, [])

  useFrame((state) => {
    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.getElapsedTime()
    const speedMultiplier = paperRevealed ? 1.3 : 1

    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
      positions[i * 3 + 1] -= speeds[i] * speedMultiplier
      positions[i * 3] += Math.sin(time + drifts[i]) * 0.0005

      if (positions[i * 3 + 1] < -1.2) {
        positions[i * 3] = (Math.random() - 0.5) * 30
        positions[i * 3 + 1] = 15
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    if (paperRevealed && extraPointsRef.current) {
      const extraPositions = extraPointsRef.current.geometry.attributes.position.array
      for (let i = 0; i < EXTRA_FLAKES; i++) {
        extraPositions[i * 3 + 1] -= extraSpeeds[i]
        extraPositions[i * 3] += Math.sin(time + extraDrifts[i]) * 0.0007

        if (extraPositions[i * 3 + 1] < -1.2) {
          extraPositions[i * 3] = (Math.random() - 0.5) * 30
          extraPositions[i * 3 + 1] = 15
          extraPositions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
      }
      extraPointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color="#E8F3FF"
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
      {paperRevealed && (
        <points ref={extraPointsRef} geometry={extraGeometry}>
          <pointsMaterial
            color="#E8F3FF"
            size={0.06}
            sizeAttenuation
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  )
}
