import { useEffect, useState } from 'react'

const items = [
  'Currently accepting 3 clients this quarter',
  '127% average conversion lift',
  '50+ brands transformed',
]

export default function DataTicker() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length)
        setVisible(true)
      }, 250)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`text-[14px] leading-none text-[#2C5F4D] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ fontFamily: 'Space Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
      aria-live="polite"
    >
      {items[index]}
    </div>
  )
}
