import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function QuickStart() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const basicExample = `const { searchCep } = require('cep-parallel-search');

// Busca básica (usa cache automático de 15 dias)
searchCep('01310100')
  .then(result => {
    console.log(result);
    // {
    //   cep: '01310100',
    //   state: 'SP',
    //   city: 'São Paulo',
    //   street: 'Avenida Paulista',
    //   neighborhood: 'Bela Vista',
    //   service: 'brasilapi'
    // }
  })
  .catch(error => {
    console.error('Erro:', error.message);
  });`;

  const asyncExample = `const { searchCep } = require('cep-parallel-search');

async function buscarCep() {
  try {
    const result = await searchCep('01310100');
    console.log('CEP encontrado:', result);
  } catch (error) {
    if (error.type === 'validation_error') {
      console.error('CEP inválido:', error.message);
    } else if (error.type === 'service_error') {
      console.error('Erro nos serviços:', error.errors);
    }
  }
}`;

  const advancedExample = `const { searchCep } = require('cep-parallel-search');

// Com timeout e providers específicos
const result = await searchCep('01310100', {
  timeout: 5000,        // 5 segundos
  providers: ['brasilapi', 'viacep'],
  useCache: true
});`;

  return (
    <div className="relative py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Início Rápido
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Exemplos práticos para você começar a usar agora
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Example */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="text-sm font-medium text-slate-300">Uso Básico</span>
                <button
                  onClick={() => copyCode(basicExample, 'basic')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {copied === 'basic' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-slate-300" style={{ fontFamily: 'Fira Code, monospace' }}>
                  <code>{basicExample}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Async/Await Example */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="text-sm font-medium text-slate-300">Com Async/Await</span>
                <button
                  onClick={() => copyCode(asyncExample, 'async')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {copied === 'async' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-slate-300" style={{ fontFamily: 'Fira Code, monospace' }}>
                  <code>{asyncExample}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Advanced Example */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="text-sm font-medium text-slate-300">Uso Avançado</span>
                <button
                  onClick={() => copyCode(advancedExample, 'advanced')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {copied === 'advanced' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-slate-300" style={{ fontFamily: 'Fira Code, monospace' }}>
                  <code>{advancedExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
