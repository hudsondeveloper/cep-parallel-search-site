import { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Installation from '../components/Installation';
import QuickStart from '../components/QuickStart';
import CepValidator from '../components/CepValidator';
import Services from '../components/Services';
import CodeExamples from '../components/CodeExamples';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Hero />
      <Features />
      <Installation />
      <QuickStart />
      <CepValidator />
      <Services />
      <CodeExamples />
      <Footer />
    </div>
  );
}
