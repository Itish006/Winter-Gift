import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene/Scene.jsx'

export default function App() {
  return (
    <main className="app-shell">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 38, near: 0.1, far: 100, position: [5.6, 2.7, 7.4] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        shadows="soft"
      >
        <Scene />
      </Canvas>
    </main>
  )
}
