import { useRef, useMemo, useState, useEffect } from 'react'
import { BufferGeometry, BufferAttribute, PointsMaterial, AdditiveBlending, CanvasTexture } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'

const CREAM_COLOR = '#F8F1E4'
const GOLD_COLOR = '#FFD700'

export function GiftLetter({ progress, floatProgress, finalProgress, setPaperRevealed }) {
  const groupRef = useRef()
  const particlesRef = useRef()
  const glowRef = useRef()
  const [revealed, setRevealed] = useState(false)
  const [bounceDone, setBounceDone] = useState(false)

  // Create canvas texture for the premium greeting card
  const cardTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 3584
    const ctx = canvas.getContext('2d')

    // Warm cream background
    ctx.fillStyle = CREAM_COLOR
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle paper texture
    ctx.globalAlpha = 0.18
    for (let i = 0; i < 400; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = '#E1D7C7'
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // Draw premium greeting card text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Kiss emoji (centered)
    ctx.font = 'bold 300px "Brush Script MT", cursive'
    ctx.fillText('🦭', canvas.width / 2, 500)

    // Main text
    ctx.font = 'bold 220px "SF Pro Display", Arial, sans-serif'
    ctx.fillStyle = '#3B2416' // Dark brown

    const lines = ['MATHA', 'THEEK', 'HOJA']
    const lineHeight = 400
    const startY = 1100

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight)
    })

    // Bright red heart
    ctx.font = 'bold 280px "Brush Script MT", cursive'
    ctx.fillStyle = '#FF2400'
    ctx.fillText('❤️', canvas.width / 2, startY + 2.9 * lineHeight)

    const texture = new CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Create golden sparkles around the card
  const particlesGeometry = useMemo(() => {
    const count = 50
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 1.8
      positions[i3 + 1] = -0.15 + Math.random() * 1.2
      positions[i3 + 2] = (Math.random() - 0.5) * 1.0
      sizes[i] = 0.03 + Math.random() * 0.04
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(positions, 3))
    geo.setAttribute('size', new BufferAttribute(sizes, 1))
    return geo
  }, [])

  const particlesMaterial = useMemo(() => {
    return new PointsMaterial({
      color: GOLD_COLOR,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      blending: AdditiveBlending,
      depthWrite: false
    })
  }, [])

  // Greeting card: larger, thicker rounded box
  const cardGeometry = useMemo(() => {
    return new RoundedBoxGeometry(2.1, 0.025, 1.5, 16, 0.12)
  }, [])

  // Animation progress: start after progress ~0.15, take rest of time to rise
  const cardAnimProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.85))

  // Trigger reveal and particles, then tiny bounce
  useEffect(() => {
    if (cardAnimProgress >= 1 && !revealed) {
      setRevealed(true)
      if (setPaperRevealed) setPaperRevealed(true)
      gsap.to(particlesMaterial, {
        opacity: 0.95,
        duration: 1.3,
        ease: 'power2.out'
      })

      // Tiny bounce animation
      gsap.to(groupRef.current.position, {
        y: 1.38,
        duration: 0.25,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(groupRef.current.position, {
            y: 1.25,
            duration: 0.2,
            ease: 'power1.out',
            onComplete: () => {
              setBounceDone(true)
            }
          })
        }
      }, 1.8) // Wait a tiny bit after reaching top
    }
  }, [cardAnimProgress, revealed, particlesMaterial, setPaperRevealed])

  useFrame((state) => {
    if (!bounceDone) {
      // Initial rise and tilt before bounce
      groupRef.current.position.y = -0.5 + 1.75 * cardAnimProgress
      groupRef.current.rotation.x = -Math.PI * 0.33 * cardAnimProgress // ~20 degrees
    } else {
      // Slow floating forever
      groupRef.current.position.y = 1.25 + 0.12 * Math.sin(state.clock.elapsedTime * 1.0)
      groupRef.current.rotation.x = -Math.PI * 0.33
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Warm golden glow from inside the box */}
      <pointLight
        ref={glowRef}
        color="#FFD700"
        intensity={cardAnimProgress * 3.5}
        distance={5}
        decay={2}
        position={[0, 0.2, -0.3]}
      />
      {/* Premium greeting card */}
      <mesh
        castShadow
        receiveShadow
        geometry={cardGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          map={cardTexture}
          roughness={0.85}
          metalness={0}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
          side={2} // Double-sided
        />
      </mesh>
      {/* Golden sparkles */}
      <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
    </group>
  )
}
