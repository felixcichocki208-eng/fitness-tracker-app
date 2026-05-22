import { useState, useEffect, useRef } from 'react'

export function useStepCounter() {
  const [steps, setSteps] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const lastYRef = useRef(0)
  const stepCountRef = useRef(0)
  const thresholdRef = useRef(50)

  useEffect(() => {
    const handleMotion = (event) => {
      if (!isActive) return

      const acceleration = event.acceleration
      if (!acceleration) return

      const y = Math.abs(acceleration.y)
      
      // Detect peak
      if (y > thresholdRef.current && lastYRef.current < thresholdRef.current) {
        stepCountRef.current++
        setSteps(stepCountRef.current)
      }

      lastYRef.current = y
    }

    if (isActive) {
      window.addEventListener('devicemotion', handleMotion)
      return () => window.removeEventListener('devicemotion', handleMotion)
    }
  }, [isActive])

  const startCounting = () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            setIsActive(true)
          }
        })
        .catch(console.error)
    } else {
      setIsActive(true)
    }
  }

  const stopCounting = () => {
    setIsActive(false)
  }

  const resetSteps = () => {
    stepCountRef.current = 0
    setSteps(0)
  }

  return {
    steps,
    isActive,
    startCounting,
    stopCounting,
    resetSteps,
  }
}
