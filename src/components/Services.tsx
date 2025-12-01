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
    <div className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Serviços Disponíveis
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Consulta múltiplos serviços em paralelo para máxima disponibilidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-500/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-400">
                    {service.description}
                  </p>
                </div>
                {service.status === 'available' ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-green-300">Disponível</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                    <Construction className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-medium text-orange-300">Em Breve</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                  {service.link}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-sm">
          <p className="text-center text-slate-300">
            <span className="font-semibold text-blue-400">Por padrão</span>, todos os serviços disponíveis são consultados simultaneamente. 
            Você pode especificar quais usar através das opções.
          </p>
        </div>
      </div>
    </div>
  );
}
