import { Check, Construction } from 'lucide-react';

const services = [
  {
    name: 'BrasilAPI',
    description: 'API pública brasileira',
    status: 'available',
    link: 'https://brasilapi.com.br/'
  },
  {
    name: 'ViaCEP',
    description: 'Serviço gratuito',
    status: 'available',
    link: 'https://viacep.com.br/'
  },
  {
    name: 'WideNet',
    description: 'CDN de CEPs',
    status: 'development',
    link: 'https://apicep.com/'
  },
  {
    name: 'Correios',
    description: 'Serviço oficial (SOAP)',
    status: 'development',
    link: 'https://www.correios.com.br/'
  }
];

export default function Services() {
  return (
    <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Serviços Disponíveis
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Consulta múltiplos serviços em paralelo para máxima disponibilidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-500/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400">
                    {service.description}
                  </p>
                </div>
                {service.status === 'available' ? (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-xs font-medium text-green-300">Disponível</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 flex-shrink-0">
                    <Construction className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                    <span className="text-xs font-medium text-orange-300">Em Breve</span>
                  </div>
                )}
              </div>

              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <span className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-400 transition-colors break-all">
                  {service.link}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-sm">
          <p className="text-center text-sm sm:text-base text-slate-300 px-2">
            <span className="font-semibold text-blue-400">Por padrão</span>, todos os serviços disponíveis são consultados simultaneamente. 
            Você pode especificar quais usar através das opções.
          </p>
        </div>
      </div>
    </div>
  );
}
