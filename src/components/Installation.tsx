import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Installation() {
  const [copied, setCopied] = useState(false);
  const installCommand = 'npm install cep-parallel-search';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="installation" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Instalação
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400">
            Instale via npm e comece a usar em segundos
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-slate-400" style={{ fontFamily: 'Fira Code, monospace' }}>
                Terminal
              </span>
              <button
                onClick={copyToClipboard}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group/btn"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover/btn:text-white" />
                )}
              </button>
            </div>
            <code className="block text-sm sm:text-base md:text-lg lg:text-xl text-blue-300 font-medium break-all sm:break-normal" style={{ fontFamily: 'Fira Code, monospace' }}>
              {installCommand}
            </code>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs sm:text-sm font-medium text-slate-400 mb-1.5 sm:mb-2">Suporte</div>
            <div className="text-sm sm:text-base md:text-lg font-semibold text-white">CommonJS & ES Modules</div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs sm:text-sm font-medium text-slate-400 mb-1.5 sm:mb-2">Node.js</div>
            <div className="text-sm sm:text-base md:text-lg font-semibold text-white">&gt;= 12.0.0</div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs sm:text-sm font-medium text-slate-400 mb-1.5 sm:mb-2">Dependências</div>
            <div className="text-sm sm:text-base md:text-lg font-semibold text-white">Apenas node-fetch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
