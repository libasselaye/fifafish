import { prisma } from '@/lib/prisma';
import { QuotesTable } from '@/components/QuotesTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function QuotesPage() {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestion des Devis</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tous les Devis</CardTitle>
        </CardHeader>
        <CardContent>
          <QuotesTable quotes={quotes} />
        </CardContent>
      </Card>
    </div>
  );
}
