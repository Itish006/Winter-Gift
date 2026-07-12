import { Bow } from './Bow.jsx'
import { GiftBase } from './GiftBase.jsx'
import { GiftLid } from './GiftLid.jsx'
import { LidRibbon, BaseRibbon } from './Ribbon.jsx'
import { GiftInterior } from './GiftInterior.jsx'
import { useRef } from 'react'
import { gsap } from 'gsap'

export function GiftBox({
  hasOpened,
  setHasOpened,
  progress,
  setProgress,
  floatProgress,
  setFloatProgress,
  finalProgress,
  setFinalProgress,
  rotationX,
  setRotationX,
  setPaperRevealed
}) {
  const tlRef = useRef(null)

  const handleClick = () => {
    if (hasOpened) return
    setHasOpened(true)

    const tl = gsap.timeline({
      onUpdate: () => {
        setRotationX(tl.progress() * (-122 * Math.PI / 180))
        setProgress(tl.progress())
      },
      ease: 'power2.inOut',
    })

    tl.to({}, { duration: 1.8 }) // Total animation duration
      .call(() => setFloatProgress(1), null, 1.8)
      .to({}, {
        duration: 0.6,
        ease: 'power1.inOut',
        onUpdate: function () {
          setFinalProgress(this.progress())
        }
      }, 1.8)

    tlRef.current = tl
  }

  return (
    <group onClick={handleClick}>
      <GiftBase />
      <GiftInterior progress={progress} floatProgress={floatProgress} finalProgress={finalProgress} setPaperRevealed={setPaperRevealed} />
      <GiftLid rotationX={rotationX} />
      <BaseRibbon />
      <LidRibbon rotationX={rotationX} />
      <group position={[0, 0.87, 0]} rotation={[0, Math.PI * 0.12, 0]}>
        <group position={[0, 0.65, -1.05]} rotation-x={rotationX}>
          <group position={[0, 0, 1.05]}>
            <Bow />
          </group>
        </group>
      </group>
    </group>
  )
}

