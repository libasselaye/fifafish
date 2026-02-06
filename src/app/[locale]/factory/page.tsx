import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Zap, Package, Factory as FactoryIcon, Users, Shield, Sparkles } from 'lucide-react';

export default async function FactoryPage() {
  const t = await getTranslations('factory');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium mb-4">
              <FactoryIcon className="h-4 w-4" />
              Excellence Industrielle
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Factory Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 animate-fade-in animation-delay-200">
            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                  <FactoryIcon className="h-32 w-32 text-white/30 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-white text-3xl font-semibold">Notre Usine Moderne</p>
                  <p className="text-blue-200 mt-2">Installation de pointe pour la transformation du poisson</p>
                </div>
              </div>
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Nos Atouts
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Des Standards d'Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-blue-50/50 backdrop-blur animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Award className="h-16 w-16 mx-auto text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('certifications')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('certificationsDesc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur animate-fade-in animation-delay-200">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Package className="h-16 w-16 mx-auto text-indigo-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('capacity')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('capacityDesc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-purple-50/50 backdrop-blur animate-fade-in animation-delay-400">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Zap className="h-16 w-16 mx-auto text-purple-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('technology')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('technologyDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <p className="text-gray-600 font-medium">Années d'Expérience</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-200">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <p className="text-gray-600 font-medium">Tonnes/Mois</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-400">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-600 font-medium">Certifié</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-600">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-gray-600 font-medium">Employés</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
