'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { User, Mail, Phone, Building2, Package, Hash, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  company: z.string().optional(),
  message: z.string().min(10),
  productName: z.string().optional(),
  quantity: z.number().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function RequestQuotePage() {
  const t = useTranslations('quote');
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      productName: searchParams.get('product') || '',
      quantity: undefined,
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setLoading(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: t('success'),
          description: t('success'),
        });
        form.reset();
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 mb-6 shadow-lg">
            <Send className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  Pourquoi nous choisir ?
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <span>Réponse sous 24h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <span>Devis personnalisé gratuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <span>Expert dédié à votre projet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <span>Prix compétitifs garantis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Besoin d'aide ?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Notre équipe est là pour vous accompagner
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    +221 XX XXX XX XX
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    contact@fifafish.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Informations personnelles
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">{t('name')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input className="pl-10 border-gray-200 focus:border-blue-500 transition-colors" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">{t('email')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input type="email" className="pl-10 border-gray-200 focus:border-blue-500 transition-colors" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">{t('phone')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input className="pl-10 border-gray-200 focus:border-blue-500 transition-colors" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">{t('company')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input className="pl-10 border-gray-200 focus:border-blue-500 transition-colors" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <Package className="h-5 w-5 text-blue-600" />
                        Détails de la demande
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="productName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">{t('productName')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input className="pl-10 border-gray-200 focus:border-blue-500 transition-colors" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">{t('quantity')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input
                                    type="number"
                                    className="pl-10 border-gray-200 focus:border-blue-500 transition-colors"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="border-t border-gray-100 pt-6">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                              {t('message')}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={5}
                                className="border-gray-200 focus:border-blue-500 transition-colors resize-none"
                                placeholder="Décrivez votre besoin en détail..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          {t('submit')}
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
