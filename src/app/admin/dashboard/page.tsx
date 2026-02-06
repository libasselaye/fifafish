import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { FileText, Package, Clock, AlertCircle, Plus } from 'lucide-react';

export default async function DashboardPage() {
  const [totalQuotes, pendingQuotes, totalProducts, lowStockProducts] = await Promise.all([
    prisma.quote.count(),
    prisma.quote.count({ where: { status: 'pending' } }),
    prisma.product.count(),
    prisma.product.findMany({ where: { stock: { lt: 10 } }, select: { id: true, name: true, stock: true } }),
  ]);

  const recentQuotes = await prisma.quote.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <div className="flex gap-2">
          <Link href="/admin/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Produit
            </Button>
          </Link>
          <Link href="/admin/quotes">
            <Button variant="outline">Voir les Devis</Button>
          </Link>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>{lowStockProducts.length} produit(s)</strong> avec stock faible (moins de 10 unités)
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Devis</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">Demandes de devis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis en Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{pendingQuotes}</div>
            <p className="text-xs text-gray-500 mt-1">En attente de traitement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">Produits disponibles</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Devis Récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuotes.map((quote) => {
              const getStatusLabel = (status: string) => {
                switch (status) {
                  case 'pending': return 'En attente';
                  case 'processing': return 'En cours';
                  case 'completed': return 'Complété';
                  case 'rejected': return 'Rejeté';
                  default: return status;
                }
              };

              return (
                <div key={quote.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{quote.name}</p>
                    <p className="text-sm text-gray-500">{quote.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        quote.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quote.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {getStatusLabel(quote.status)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
