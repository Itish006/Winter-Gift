import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { BufferGeometry, BufferAttribute, Points } from 'three'
import { GiftLetter } from './GiftLetter'

const bearMaterial = {
    color: '#8B5A3C',
    roughness: 0.62,
    metalness: 0.02,
    clearcoat: 0.08,
}

function GoldenSparkles({ active }) {
    const pointsRef = useRef()
    const NUM_SPARKLES = 25

    const { geometry, initialY, offsets } = useMemo(() => {
        const geometry = new BufferGeometry()
        const positions = new Float32Array(NUM_SPARKLES * 3)
        const initialY = new Float32Array(NUM_SPARKLES)
        const offsets = new Float32Array(NUM_SPARKLES)

        for (let i = 0; i < NUM_SPARKLES; i++) {
            const radius = Math.random() * 0.6
            const angle = Math.random() * Math.PI * 2
            positions[i * 3] = Math.cos(angle) * radius
            positions[i * 3 + 1] = -0.1 + Math.random() * 0.6
            positions[i * 3 + 2] = Math.sin(angle) * radius
            initialY[i] = positions[i * 3 + 1]
            offsets[i] = Math.random() * Math.PI * 2
        }

        geometry.setAttribute('position', new BufferAttribute(positions, 3))
        return { geometry, initialY, offsets }
    }, [])

    useFrame((state) => {
        if (!active) return

        const positions = pointsRef.current.geometry.attributes.position.array
        const time = state.clock.getElapsedTime()

        for (let i = 0; i < NUM_SPARKLES; i++) {
            const y = initialY[i] + ((time + offsets[i]) % 2) * 0.4
            positions[i * 3 + 1] = y
            positions[i * 3] += Math.sin(time + offsets[i]) * 0.0008
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={pointsRef} geometry={geometry} visible={active}>
            <pointsMaterial
                color="#FFD78A"
                size={0.04}
                sizeAttenuation
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={2}
            />
        </points>
    )
}

function InteriorTeddy({ progress, floatProgress, finalProgress }) {
    const groupRef = useRef()

    useFrame(() => {
        if (floatProgress === 1) {
            groupRef.current.position.y = 0.1 * Math.sin(Date.now() * 0.0015)
        }
    })

    return (
        <group
            ref={groupRef}
            position={[0.4, -0.15 + 0.2 * progress, 0.1]}
            scale={[0.5, 0.5, 0.5]}
        >
            <mesh position={[0, 0.32, 0]} scale={[1.3, 1.3, 1.3]}>
                <sphereGeometry args={[0.3, 24, 18]} />
                <meshBasicMaterial
                    color="#FFD38C"
                    transparent
                    opacity={0.15 * finalProgress}
                    depthWrite={false}
                />
            </mesh>
            <mesh castShadow position={[0, 0.32, 0]}>
                <sphereGeometry args={[0.3, 24, 18]} />
                <meshPhysicalMaterial {...bearMaterial} opacity={progress} transparent />
            </mesh>
            <mesh castShadow position={[0, 0.73, 0.015]}>
                <sphereGeometry args={[0.31, 28, 20]} />
                <meshPhysicalMaterial {...bearMaterial} opacity={progress} transparent />
            </mesh>
            {[-0.2, 0.2].map((x) => (
                <mesh castShadow key={x} position={[x, 0.98, 0.01]}>
                    <sphereGeometry args={[0.115, 18, 14]} />
                    <meshPhysicalMaterial {...bearMaterial} opacity={progress} transparent />
                </mesh>
            ))}
            {[-0.12, 0.12].map((x) => (
                <mesh key={x} position={[x, 0.79, 0.292]}>
                    <sphereGeometry args={[0.03, 12, 10]} />
                    <meshPhysicalMaterial color="#1B1513" roughness={0.28} metalness={0.12} opacity={progress} transparent />
                </mesh>
            ))}
            <mesh position={[0, 0.66, 0.285]} scale={[1.1, 0.76, 0.55]}>
                <sphereGeometry args={[0.1, 18, 14]} />
                <meshPhysicalMaterial color="#E6B58E" roughness={0.68} metalness={0.01} opacity={progress} transparent />
            </mesh>
            <mesh position={[0, 0.69, 0.344]}>
                <sphereGeometry args={[0.032, 12, 10]} />
                <meshPhysicalMaterial color="#261815" roughness={0.25} metalness={0.08} opacity={progress} transparent />
            </mesh>
            {[-0.24, 0.24].map((x) => (
                <mesh castShadow key={x} position={[x, 0.08, 0.08]} scale={[1.15, 0.58, 0.8]}>
                    <sphereGeometry args={[0.16, 18, 12]} />
                    <meshPhysicalMaterial {...bearMaterial} opacity={progress} transparent />
                </mesh>
            ))}
        </group>
    )
}

export function GiftInterior({ progress, floatProgress, finalProgress, setPaperRevealed }) {
    const lightIntensity = 3.2 * progress + 1.2 * finalProgress

    return (
        <group position={[0, -0.15, 0]}>
            <pointLight
                color="#FFD38C"
                intensity={lightIntensity}
                distance={4}
                decay={2}
                position={[0, 0.4, 0]}
            />
            <InteriorTeddy progress={progress} floatProgress={floatProgress} finalProgress={finalProgress} />
            <GiftLetter progress={progress} floatProgress={floatProgress} finalProgress={finalProgress} setPaperRevealed={setPaperRevealed} />
            <GoldenSparkles active={finalProgress > 0} />
        </group>
    )
}
