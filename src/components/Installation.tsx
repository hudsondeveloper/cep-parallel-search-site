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
    <div id="installation" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Instalação
          </h2>
          <p className="text-xl text-slate-400">
            Instale via npm e comece a usar em segundos
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-400" style={{ fontFamily: 'Fira Code, monospace' }}>
                Terminal
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group/btn"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 group-hover/btn:text-white" />
                )}
              </button>
            </div>
            <code className="block text-lg sm:text-xl text-blue-300 font-medium" style={{ fontFamily: 'Fira Code, monospace' }}>
              {installCommand}
            </code>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm font-medium text-slate-400 mb-2">Suporte</div>
            <div className="text-lg font-semibold text-white">CommonJS & ES Modules</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm font-medium text-slate-400 mb-2">Node.js</div>
            <div className="text-lg font-semibold text-white">&gt;= 12.0.0</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm font-medium text-slate-400 mb-2">Dependências</div>
            <div className="text-lg font-semibold text-white">Apenas node-fetch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
