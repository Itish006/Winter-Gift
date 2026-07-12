import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Ground } from './Ground.jsx'
import { Lighting } from './Lighting.jsx'
import { GiftBox } from '../GiftBox/index.jsx'
import { HolidayDecorations } from '../Decorations/HolidayDecorations.jsx'
import { WinterEnvironment } from '../Environment/WinterEnvironment.jsx'

const NIGHT_SKY = '#050816'

function CameraControls({ 
  hasOpened, 
  progress, 
  finalProgress,
  paperRevealed
}) {
  const controls = useRef()
  const camera = useThree((state) => state.camera)
  const cameraTl = useRef(null)
  const initialCamPos = useRef([5.6, 2.7, 7.4])
  const initialTarget = useRef([-2.2, -0.02, 0])

  // Init camera
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      camera.position.set(...initialCamPos.current)
      controls.current.target.set(...initialTarget.current)
      controls.current.update()
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [camera])

  // Animate camera when hasOpened changes
  useEffect(() => {
    if (hasOpened && !cameraTl.current) {
      controls.current.enabled = false
      const tl = gsap.timeline({
        onComplete: () => {
          controls.current.enabled = true
        }
      })

      // 1. After gift opens (progress ~1 at 1.8s), move closer over 2.5s
      tl.to(camera.position, {
        x: 4.4,
        y: 2.1,
        z: 6.2,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => controls.current.update()
      }, 1.8)

      // 2. After envelope rises (progress done, after 1.8 + 0.3 = 2.1s), tilt slightly down
      tl.to(controls.current.target, {
        y: 0.3,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => controls.current.update()
      }, 2.1)

      // 3. When paper comes out (after flap is open), close up
      tl.to(camera.position, {
        x: 3.6,
        y: 1.9,
        z: 5.3,
        duration: 2.0,
        ease: 'power2.out',
        onUpdate: () => controls.current.update()
      }, 4.0) // Approx when paper slides

      cameraTl.current = tl
    }
  }, [hasOpened, camera, controls])

  // Camera breathing effect
  useThree((state) => {
    if (paperRevealed) {
      const t = state.clock.elapsedTime
      const breathingAmount = 0.015
      camera.position.y = 1.9 + Math.sin(t * 0.8) * breathingAmount
      camera.position.x = 3.6 + Math.sin(t * 0.6) * breathingAmount * 0.5
      controls.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={3}
      maxDistance={18}
      minPolarAngle={Math.PI * 0.14}
      maxPolarAngle={Math.PI * 0.49}
    />
  )
}

function CinematicEffects({ paperRevealed }) {
  const camera = useThree((state) => state.camera)
  const bloomIntensity = paperRevealed ? 0.7 : 0.48

  return (
    <EffectComposer camera={camera} multisampling={0} enableNormalPass={false}>
      <Bloom intensity={bloomIntensity} luminanceThreshold={0.85} luminanceSmoothing={0.22} mipmapBlur />
    </EffectComposer>
  )
}

export function Scene() {
  const [hasOpened, setHasOpened] = useState(false)
  const [progress, setProgress] = useState(0)
  const [floatProgress, setFloatProgress] = useState(0)
  const [finalProgress, setFinalProgress] = useState(0)
  const [rotationX, setRotationX] = useState(0)
  const [paperRevealed, setPaperRevealed] = useState(false)

  return (
    <>
      <color attach="background" args={[NIGHT_SKY]} />
      <fogExp2 attach="fog" args={['#243658', 0.038]} />
      <WinterEnvironment paperRevealed={paperRevealed} />
      <Lighting />
      <Ground />
      <group position={[-2.2, 0, 0]}>
        <GiftBox 
          hasOpened={hasOpened}
          setHasOpened={setHasOpened}
          progress={progress}
          setProgress={setProgress}
          floatProgress={floatProgress}
          setFloatProgress={setFloatProgress}
          finalProgress={finalProgress}
          setFinalProgress={setFinalProgress}
          rotationX={rotationX}
          setRotationX={setRotationX}
          setPaperRevealed={setPaperRevealed}
        />
        <HolidayDecorations />
      </group>
      <CameraControls 
        hasOpened={hasOpened}
        progress={progress}
        finalProgress={finalProgress}
        paperRevealed={paperRevealed}
      />
      <CinematicEffects paperRevealed={paperRevealed} />
    </>
  )
}
