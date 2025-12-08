import { Zap, Github, Book } from 'lucide-react';
import CepSearch from './CepSearch';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Busca em paralelo ultrarrápida</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            CEP Parallel Search
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Biblioteca Node.js profissional para busca de CEP com múltiplas consultas em paralelo, cache automático e alta disponibilidade
          </p>

          {/* CEP Search Component */}
          <div className="mb-16">
            <CepSearch />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#installation" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2">
              <span>Começar Agora</span>
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>

            <a 
              href="https://github.com/hudsondeveloper/cep-parallel-search" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>

            <a 
              href="https://www.npmjs.com/package/cep-parallel-search" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <Book className="w-5 h-5" />
              <span>NPM</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-slate-400">Cobertura de Testes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">~1ms</div>
              <div className="text-sm text-slate-400">Com Cache</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">15</div>
              <div className="text-sm text-slate-400">Dias de Cache</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">TypeScript</div>
              <div className="text-sm text-slate-400">Suporte Completo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
