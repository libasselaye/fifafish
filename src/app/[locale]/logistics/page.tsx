import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Snowflake, MapPin, Truck, Globe2, Clock, Sparkles } from 'lucide-react';

export default async function LogisticsPage() {
  const t = await getTranslations('logistics');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 font-medium mb-4">
              <Truck className="h-4 w-4" />
              Logistique Mondiale
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Network Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 animate-fade-in animation-delay-200">
            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-900 flex items-center justify-center">
                <div className="text-center">
                  <Globe2 className="h-32 w-32 text-white/30 mx-auto mb-4 group-hover:rotate-180 transition-transform duration-1000" />
                  <p className="text-white text-3xl font-semibold">Réseau Logistique Global</p>
                  <p className="text-indigo-200 mt-2">Distribution rapide et fiable partout dans le monde</p>
                </div>
              </div>
              {/* Animated grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Services Premium
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Une Chaîne Logistique Optimisée
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-blue-50/50 backdrop-blur animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Plane className="h-16 w-16 mx-auto text-blue-600 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('shipping')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('shippingDesc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur animate-fade-in animation-delay-200">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <Snowflake className="h-16 w-16 mx-auto text-indigo-600 relative z-10 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('coldChain')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('coldChainDesc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none bg-gradient-to-br from-white to-purple-50/50 backdrop-blur animate-fade-in animation-delay-400">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                  <MapPin className="h-16 w-16 mx-auto text-purple-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{t('tracking')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('trackingDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Processus de Livraison
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un suivi transparent de bout en bout
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center animate-fade-in">
              <div className="relative mx-auto w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Commande</h3>
              <p className="text-sm text-gray-600">Confirmation immédiate</p>
            </div>

            <div className="text-center animate-fade-in animation-delay-200">
              <div className="relative mx-auto w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Préparation</h3>
              <p className="text-sm text-gray-600">Contrôle qualité strict</p>
            </div>

            <div className="text-center animate-fade-in animation-delay-400">
              <div className="relative mx-auto w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Expédition</h3>
              <p className="text-sm text-gray-600">Transport réfrigéré</p>
            </div>

            <div className="text-center animate-fade-in animation-delay-600">
              <div className="relative mx-auto w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  4
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison</h3>
              <p className="text-sm text-gray-600">À votre porte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                24h
              </div>
              <p className="text-gray-600 font-medium">Délai Moyen</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-200">
              <Globe2 className="h-12 w-12 mx-auto text-indigo-600 mb-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-gray-600 font-medium">Pays Desservis</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-400">
              <Truck className="h-12 w-12 mx-auto text-purple-600 mb-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-600 font-medium">Livraisons Réussies</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-600">
              <Snowflake className="h-12 w-12 mx-auto text-blue-400 mb-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                -18°C
              </div>
              <p className="text-gray-600 font-medium">Température Contrôlée</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
