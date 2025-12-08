import { useState } from 'react';
import { Search, Loader2, CheckCircle, XCircle, MapPin, Clock, Zap } from 'lucide-react';
/**
 * Componente de busca de CEP
 * 
 * Replica a lógica da biblioteca cep-parallel-search para funcionar no browser.
 * A biblioteca original usa node-fetch e fs (Node.js), então adaptamos para usar:
 * - fetch nativo do browser
 * - localStorage para cache (em vez de arquivo)
 * 
 * Mantém a mesma interface e comportamento da biblioteca:
 * - Busca paralela em múltiplos serviços
 * - Cache automático de 15 dias
 * - Validação de formato
 * - Tratamento de erros
 */

interface CepResult {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  service: string;
}

interface SearchState {
  loading: boolean;
  result: CepResult | null;
  error: string | null;
  fromCache: boolean;
  responseTime: number | null;
}

/**
 * Valida CEP usando a mesma lógica da biblioteca cep-parallel-search
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
    const cepClean = cep.toString().replace(/\D+/g, '');
    return cepClean.length === 8;
  } catch (error) {
    return false;
  }
}

/**
 * Normaliza CEP removendo caracteres especiais
 */
function normalizeCep(cep: string): string {
  return cep.replace(/\D+/g, '').padStart(8, '0');
}

/**
 * Busca CEP usando a mesma lógica da biblioteca cep-parallel-search
 * Replica o comportamento: busca paralela, cache, etc.
 */
async function searchCep(cep: string): Promise<{ result: CepResult; fromCache: boolean; responseTime: number }> {
  const normalizedCep = normalizeCep(cep);
  const cacheKey = `cep_cache_${normalizedCep}`;
  const cacheExpiry = 15 * 24 * 60 * 60 * 1000; // 15 dias

  // Verifica cache (mesma lógica da biblioteca)
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheExpiry) {
      const startTime = performance.now();
      await new Promise(resolve => setTimeout(resolve, 1));
      const responseTime = performance.now() - startTime;
      return { result: data, fromCache: true, responseTime: Math.round(responseTime) };
    }
  }

  // Busca paralela (mesma lógica da biblioteca)
  const startTime = performance.now();
  
  const promises = [
    fetch(`https://brasilapi.com.br/api/cep/v1/${normalizedCep}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => data ? {
        cep: normalizedCep,
        state: data.state,
        city: data.city,
        street: data.street || data.address || '',
        neighborhood: data.neighborhood || data.district || '',
        service: 'brasilapi'
      } : null)
      .catch(() => null),
    
    fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data || data.erro) return null;
        return {
          cep: normalizedCep,
          state: data.uf,
          city: data.localidade,
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          service: 'viacep'
        };
      })
      .catch(() => null)
  ];

  // Busca paralela - retorna o primeiro resultado válido (mesma lógica da biblioteca)
  const results = await Promise.allSettled(promises);
  const validResult = results.find(r => r.status === 'fulfilled' && r.value !== null) as PromiseFulfilledResult<CepResult> | undefined;
  
  if (!validResult || !validResult.value) {
    throw new Error('CEP não encontrado em nenhum serviço');
  }

  const responseTime = performance.now() - startTime;

  // Salva no cache (mesma lógica da biblioteca)
  localStorage.setItem(cacheKey, JSON.stringify({
    data: validResult.value,
    timestamp: Date.now()
  }));

  return {
    result: validResult.value,
    fromCache: false,
    responseTime: Math.round(responseTime)
  };
}

export default function CepSearch() {
  const [cep, setCep] = useState('');
  const [searchState, setSearchState] = useState<SearchState>({
    loading: false,
    result: null,
    error: null,
    fromCache: false,
    responseTime: null
  });

  const handleSearch = async () => {
    // Valida formato (mesma lógica da biblioteca)
    if (!isValidCep(cep)) {
      setSearchState({
        loading: false,
        result: null,
        error: 'CEP inválido. Digite um CEP com 8 dígitos.',
        fromCache: false,
        responseTime: null
      });
      return;
    }

    setSearchState({
      loading: true,
      result: null,
      error: null,
      fromCache: false,
      responseTime: null
    });

    try {
      const { result, fromCache, responseTime } = await searchCep(cep);
      setSearchState({
        loading: false,
        result,
        error: null,
        fromCache,
        responseTime
      });
    } catch (error: any) {
      setSearchState({
        loading: false,
        result: null,
        error: error?.message || 'Erro ao buscar CEP',
        fromCache: false,
        responseTime: null
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exampleCeps = ['01310100', '20040020', '30130100', '01001000'];

  return (
    <div className="relative py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Input Section */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Busque um CEP
              </h3>
              <p className="text-slate-400">
                Teste a velocidade e facilidade da biblioteca em tempo real
              </p>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite o CEP (ex: 01310100 ou 01310-100)"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={searchState.loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2"
              >
                {searchState.loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Buscar</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Examples */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-slate-400">Exemplos:</span>
              {exampleCeps.map((exampleCep) => (
                <button
                  key={exampleCep}
                  onClick={async () => {
                    setCep(exampleCep);
                    // Pequeno delay para garantir que o estado foi atualizado
                    await new Promise(resolve => setTimeout(resolve, 100));
                    handleSearch();
                  }}
                  className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-slate-300 hover:text-white transition-all"
                >
                  {exampleCep}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        {searchState.result && (
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <h4 className="text-xl font-bold text-white">CEP Encontrado!</h4>
                    <p className="text-sm text-slate-400">Resultado da busca</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {searchState.fromCache && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <Zap className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">Cache</span>
                    </div>
                  )}
                  {searchState.responseTime !== null && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-400 font-medium">
                        {searchState.responseTime}ms
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 mb-1">CEP</p>
                      <p className="text-white font-semibold">{searchState.result.cep}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 mb-1">Estado</p>
                      <p className="text-white font-semibold">{searchState.result.state}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 mb-1">Cidade</p>
                      <p className="text-white font-semibold">{searchState.result.city}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 mb-1">Logradouro</p>
                      <p className="text-white font-semibold">
                        {searchState.result.street || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 mb-1">Bairro</p>
                      <p className="text-white font-semibold">
                        {searchState.result.neighborhood || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 mb-1">Serviço</p>
                      <p className="text-white font-semibold capitalize">{searchState.result.service}</p>
                    </div>
                  </div>
                </div>
              </div>

              {searchState.fromCache && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <p className="text-sm text-green-400">
                      <strong>Resultado do cache!</strong> Esta busca foi instantânea porque o CEP já estava em cache.
                      Tente buscar o mesmo CEP novamente para ver a velocidade.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Section */}
        {searchState.error && (
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-400" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Erro na Busca</h4>
                  <p className="text-red-400">{searchState.error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

