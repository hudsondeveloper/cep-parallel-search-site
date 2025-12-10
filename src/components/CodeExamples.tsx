import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CodeExamples() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const cacheExample = `// Primeira consulta - faz requisição HTTP
const result1 = await searchCep('01310100'); // ~200-500ms

// Segunda consulta (mesmo CEP) - retorna do cache
const result2 = await searchCep('01310100'); // ~1ms (instantâneo!)`;

  const errorExample = `const { searchCep, ValidationError, ServiceError } = require('cep-parallel-search');

try {
  const result = await searchCep('01310100');
  console.log('Sucesso:', result);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('CEP inválido:', error.message);
  } else if (error instanceof ServiceError) {
    console.error('Serviços indisponíveis:', error.message);
  }
}`;

  const multipleExample = `const { searchCep } = require('cep-parallel-search');

async function buscarMultiplosCeps(ceps) {
  const promises = ceps.map(cep => 
    searchCep(cep).catch(error => ({
      cep,
      sucesso: false,
      erro: error.message
    }))
  );

  return await Promise.all(promises);
}

const ceps = ['01310100', '20040020', '30130100'];
const resultados = await buscarMultiplosCeps(ceps);`;

  const typescriptExample = `import { searchCep, CepResult, SearchCepOptions } from 'cep-parallel-search';

async function buscar(cep: string): Promise<CepResult | null> {
  try {
    const options: SearchCepOptions = {
      timeout: 5000,
      providers: ['brasilapi', 'viacep'],
      useCache: true
    };
    
    const result: CepResult = await searchCep(cep, options);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}`;

  const validationExample = `const { isValidCep, searchCep } = require('cep-parallel-search');

// Validação rápida de formato (sem requisição HTTP)
function validarFormatoCep(cep) {
  return isValidCep(cep);
}

// Validação completa (formato + existência)
async function validarCepCompleto(cep) {
  // Primeiro valida o formato
  if (!isValidCep(cep)) {
    return {
      valido: false,
      motivo: 'Formato inválido',
      erro: 'CEP deve conter exatamente 8 dígitos numéricos'
    };
  }
  
  // Depois verifica se existe
  try {
    const result = await searchCep(cep);
    return {
      valido: true,
      existe: true,
      dados: result
    };
  } catch (error) {
    return {
      valido: true, // Formato válido
      existe: false, // Mas não existe na base de dados
      motivo: 'CEP não encontrado'
    };
  }
}`;

  const examples = [
    {
      id: 'cache',
      title: 'Cache Automático',
      description: 'Consultas instantâneas após a primeira busca',
      code: cacheExample,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'error',
      title: 'Tratamento de Erros',
      description: 'Classes de erro específicas para cada situação',
      code: errorExample,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'validation',
      title: 'Validação de CEP',
      description: 'Valida formato e existência de CEP',
      code: validationExample,
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      id: 'multiple',
      title: 'Múltiplos CEPs',
      description: 'Busca vários CEPs em paralelo',
      code: multipleExample,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Suporte completo com tipos',
      code: typescriptExample,
      gradient: 'from-blue-600 to-cyan-600'
    }
  ];

  return (
    <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Mais Exemplos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Explore casos de uso avançados e padrões de implementação
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {examples.map((example) => (
            <div key={example.id} className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${example.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`} />
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col">
                <div className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                      {example.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {example.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyCode(example.code, example.id)}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 flex-shrink-0"
                  >
                    {copied === example.id ? (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    )}
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-x-auto flex-1">
                  <pre className="text-xs sm:text-sm text-slate-300" style={{ fontFamily: 'Fira Code, monospace' }}>
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 text-center px-4">
          <a
            href="https://github.com/hudsondeveloper/cep-parallel-search#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
          >
            <span>Ver Documentação Completa</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
