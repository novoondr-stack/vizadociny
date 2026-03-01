'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function WireGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.06
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * -0.05
    }
  })

  // Latitude lines
  const latLines = useMemo(() => {
    const lines = []
    const latAngles = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75]
    latAngles.forEach((lat, i) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const radius = Math.sin(phi)
      const y = Math.cos(phi)
      const points = []
      for (let j = 0; j <= 128; j++) {
        const theta = (j / 128) * Math.PI * 2
        points.push(new THREE.Vector3(
          radius * Math.cos(theta),
          y,
          radius * Math.sin(theta)
        ))
      }
      lines.push({ points, key: `lat-${i}` })
    })
    return lines
  }, [])

  // Longitude lines
  const lonLines = useMemo(() => {
    const lines = []
    const count = 18
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const points = []
      for (let j = 0; j <= 128; j++) {
        const phi = (j / 128) * Math.PI
        points.push(new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        ))
      }
      lines.push({ points, key: `lon-${i}` })
    }
    return lines
  }, [])

  // Floating orbit ring
  const orbitRing = useMemo(() => {
    const points = []
    for (let i = 0; i <= 256; i++) {
      const theta = (i / 256) * Math.PI * 2
      points.push(new THREE.Vector3(
        1.38 * Math.cos(theta),
        0,
        1.38 * Math.sin(theta)
      ))
    }
    return points
  }, [])

  // Tilted orbit ring
  const tiltedOrbit = useMemo(() => {
    const points = []
    for (let i = 0; i <= 256; i++) {
      const theta = (i / 256) * Math.PI * 2
      const x = 1.45 * Math.cos(theta)
      const y = 1.45 * Math.sin(theta) * Math.sin(0.6)
      const z = 1.45 * Math.sin(theta) * Math.cos(0.6)
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }, [])

  // Floating particles around globe
  const particles = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 0.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return positions
  }, [])

  const wireColor = new THREE.Color('#0055A4')
  const orbitColor = new THREE.Color('#1A6EBB')
  const accentColor = new THREE.Color('#4A90D9')

  return (
    <group ref={groupRef}>
      {/* Latitude lines */}
      {latLines.map(({ points, key }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={key} geometry={geometry}>
            <lineBasicMaterial color={wireColor} opacity={0.25} transparent />
          </line>
        )
      })}

      {/* Longitude lines */}
      {lonLines.map(({ points, key }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={key} geometry={geometry}>
            <lineBasicMaterial color={wireColor} opacity={0.2} transparent />
          </line>
        )
      })}

      {/* Equator highlight */}
      {(() => {
        const pts = []
        for (let i = 0; i <= 256; i++) {
          const t = (i / 256) * Math.PI * 2
          pts.push(new THREE.Vector3(Math.cos(t), 0, Math.sin(t)))
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return (
          <line geometry={geo}>
            <lineBasicMaterial color={orbitColor} opacity={0.5} transparent />
          </line>
        )
      })()}

      {/* Orbit rings */}
      {(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(orbitRing)
        return (
          <line geometry={geo}>
            <lineBasicMaterial color={accentColor} opacity={0.35} transparent />
          </line>
        )
      })()}

      {(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(tiltedOrbit)
        return (
          <line geometry={geo}>
            <lineBasicMaterial color={accentColor} opacity={0.25} transparent />
          </line>
        )
      })()}

      {/* Transparent sphere for depth */}
      <mesh>
        <sphereGeometry args={[0.998, 32, 32]} />
        <meshBasicMaterial color="#EEF4FF" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.55 + Math.random() * 0.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * -0.04
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02
    }
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(particles, 3))
    return g
  }, [particles])

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#4A90D9" size={0.014} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function Globe3D() {
  return (
    <div className="w-full h-full" style={{ minHeight: '500px' }}>
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#0055A4" />
        <WireGlobe />
        <FloatingParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableRotate
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  )
}
