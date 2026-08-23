import ButtonSection from './components/ButtonSection'
import FooterSection from './components/FooterSection'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import TechLogosSection from './components/TechLogosSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TechLogosSection />
        <ButtonSection />
      </main>
      <FooterSection />
    </>
  )
}
