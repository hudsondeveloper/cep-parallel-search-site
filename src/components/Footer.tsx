import { Github, Book, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              CEP Parallel Search
            </h3>
            <p className="text-slate-400 mb-6 max-w-md">
              Biblioteca Node.js profissional para busca de CEP com múltiplas consultas em paralelo, cache automático e alta disponibilidade.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/hudsondeveloper/cep-parallel-search"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Github className="w-5 h-5 text-slate-400" />
              </a>
              <a
                href="https://www.npmjs.com/package/cep-parallel-search"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Book className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Recursos
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/hudsondeveloper/cep-parallel-search#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  Documentação
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/cep-parallel-search"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  NPM Package
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hudsondeveloper/cep-parallel-search/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  Issues
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Serviços
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://brasilapi.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  BrasilAPI
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://viacep.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  ViaCEP
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://apicep.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  WideNet
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2025 CEP Parallel Search. Licença MIT.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300">
              100% Testado
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
              TypeScript
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
              Node.js 12+
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
