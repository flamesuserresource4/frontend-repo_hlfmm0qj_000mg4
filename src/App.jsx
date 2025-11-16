import Layout from './components/Layout'
import Hero from './components/Hero'
import FluidBackground from './components/FluidBackground'

function App() {
  return (
    <Layout>
      <div className="relative">
        <FluidBackground />
        <Hero />
      </div>
      <section id="framework" className="min-h-[120vh] bg-[#111] text-[#FAFAFA] relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-2xl text-[#9AA5A1]">The Framework</h2>
          <p className="mt-6 text-[#CFCFCF] max-w-2xl">
            This section intentionally left succinct to let the hero establish the emotional tone.
            Scroll interactions reduce cognitive load while building anticipation for method clarity.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default App
