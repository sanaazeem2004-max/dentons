import { MotionConfig } from 'framer-motion'
import Capabilities from './components/Capabilities'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import GlobalPresence from './components/GlobalPresence'
import Hero from './components/Hero'
import Insights from './components/Insights'
import LatestNews from './components/LatestNews'
import Navbar from './components/Navbar'
import OurPeople from './components/OurPeople'
import PracticeAreas from './components/PracticeAreas'
import { ScrollProgress } from './components/ui'

export default function App() {
  return (
    // reducedMotion="user" disables transform/layout animations for users who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Capabilities />
        <PracticeAreas />
        <GlobalPresence />
        <Insights />
        <LatestNews />
        <OurPeople />
        <ContactCTA />
      </main>
      <Footer />
    </MotionConfig>
  )
}
