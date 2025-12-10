import { Zap, Shield, Database, Clock, Code, Check, RefreshCw, Gauge } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Busca Paralela',
    description: 'Consulta múltiplos serviços simultaneamente e retorna a resposta mais rápida'
  },
  {
    icon: RefreshCw,
    title: 'Cancelamento Automático',
    description: 'Cancela requisições pendentes quando uma resolve primeiro'
  },
  {
    icon: Database,
    title: 'Cache Automático',
    description: 'Cache de 15 dias para funcionamento offline e maior velocidade'
  },
  {
    icon: Shield,
    title: 'Alta Disponibilidade',
    description: 'Usa vários serviços como fallback automático'
  },
  {
    icon: Clock,
    title: 'Timeout Configurável',
    description: 'Controle individual de timeout por requisição'
  },
  {
    icon: Code,
    title: 'TypeScript',
    description: 'Suporte completo com definições de tipos'
  },
  {
    icon: Check,
    title: 'Validação Inteligente',
    description: 'Valida CEP e providers automaticamente'
  },
  {
    icon: Gauge,
    title: '100% Testado',
    description: 'Cobertura completa de testes'
  }
];

export default function Features() {
  return (
    <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Características
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Tudo que você precisa para busca de CEP rápida e confiável
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-500/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
