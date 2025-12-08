import { useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

/**
 * Valida se um CEP tem formato válido (8 dígitos numéricos)
 * Replica a lógica da biblioteca cep-parallel-search
 */
function isValidCep(cep: string | number): boolean {
  if (cep === null || cep === undefined || cep === '') {
    return false;
  }

  const cepTypeOf = typeof cep;
  if (cepTypeOf !== 'string' && cepTypeOf !== 'number') {
    return false;
  }

  try {
    // Remove caracteres especiais (mantém apenas números)
    const cepClean = cep.toString().replace(/\D+/g, '');
    
    // Verifica se tem exatamente 8 dígitos
    if (cepClean.length === 8) {
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

export default function CepValidator() {
  const [cep, setCep] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    if (cep.trim() === '') {
      setIsValid(null);
      return;
    }
    setIsValid(isValidCep(cep));
  };

  const handleChange = (value: string) => {
    setCep(value);
    if (value.trim() === '') {
      setIsValid(null);
    } else {
      // Validação em tempo real
      setIsValid(isValidCep(value));
    }
  };

  const examples = [
    { cep: '92500000', valid: true, label: 'Válido sem hífen' },
    { cep: '92500-000', valid: true, label: 'Válido com hífen' },
    { cep: '8434850001', valid: false, label: 'Inválido (mais de 8 dígitos)' },
    { cep: '12345', valid: false, label: 'Inválido (menos de 8 dígitos)' },
    { cep: 'abc12345', valid: false, label: 'Inválido (contém letras)' }
  ];

  return (
    <div className="relative py-24 px-6 bg-gradient-to-b from-transparent via-green-950/20 to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Validador de CEP
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Teste a função <code className="text-blue-400">isValidCep</code> em tempo real
          </p>
        </div>

        {/* Input Section */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="space-y-4">
              <label htmlFor="cep-input" className="block text-sm font-medium text-slate-300 mb-2">
                Digite um CEP para validar:
              </label>
              <div className="flex gap-4">
                <input
                  id="cep-input"
                  type="text"
                  value={cep}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Ex: 92500000 ou 92500-000"
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                />
                <button
                  onClick={handleValidate}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                >
                  Validar
                </button>
              </div>

              {/* Result */}
              {isValid !== null && (
                <div className={`mt-4 p-4 rounded-xl border ${
                  isValid 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-3">
                    {isValid ? (
                      <>
                        <Check className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="text-green-400 font-semibold">CEP Válido!</p>
                          <p className="text-sm text-slate-400 mt-1">
                            O CEP tem formato válido (8 dígitos numéricos)
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <X className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="text-red-400 font-semibold">CEP Inválido</p>
                          <p className="text-sm text-slate-400 mt-1">
                            O CEP deve conter exatamente 8 dígitos numéricos
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Info */}
              {cep.trim() === '' && (
                <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-slate-300">
                      <p className="font-medium text-blue-400 mb-1">Como usar:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-400">
                        <li>Aceita CEP com ou sem hífen (ex: 92500-000 ou 92500000)</li>
                        <li>Remove automaticamente espaços e outros caracteres especiais</li>
                        <li>Valida se tem exatamente 8 dígitos numéricos</li>
                        <li>Não faz requisições HTTP (validação apenas de formato)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all cursor-pointer"
              onClick={() => {
                setCep(example.cep);
                setIsValid(example.valid);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <code className="text-blue-400 font-mono text-sm">{example.cep}</code>
                {example.valid ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
              <p className="text-sm text-slate-400">{example.label}</p>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <span className="text-sm font-medium text-slate-300">Exemplo de Código</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm text-slate-300" style={{ fontFamily: 'Fira Code, monospace' }}>
                <code>{`const { isValidCep } = require('cep-parallel-search');

// Validar CEP válido sem hífen
isValidCep('92500000'); // true

// Validar CEP válido com hífen
isValidCep('92500-000'); // true

// Validar CEP válido como número
isValidCep(92500000); // true

// CEPs inválidos
isValidCep('8434850001'); // false (mais de 8 dígitos)
isValidCep('12345'); // false (menos de 8 dígitos)
isValidCep('abc12345'); // false (contém letras)
isValidCep(null); // false
isValidCep(undefined); // false
isValidCep(''); // false

// Aceita CEPs com espaços e outros caracteres especiais
isValidCep('92500 000'); // true (remove espaços e valida)
isValidCep('925.00.000'); // true (remove pontos e valida)`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

