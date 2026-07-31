import ClosingSection from './components/ClosingSection'
import FooterSection from './components/FooterSection'
import HeroSection from './components/HeroSection'
import McpSection from './components/McpSection'
import Navbar from './components/Navbar'
import ShowcaseSection from './components/ShowcaseSection'
import TechLogosSection from './components/TechLogosSection'
import TokenParitySection from './components/TokenParitySection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ShowcaseSection />
        <TechLogosSection />
        <TokenParitySection />
        <McpSection />
        <ClosingSection />
      </main>
      <FooterSection />
    </>
  )
}
