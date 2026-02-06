'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  productName: string | null;
  quantity: number | null;
  status: string;
  createdAt: Date;
}

export function QuotesTable({ quotes }: { quotes: Quote[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast({
          title: 'Statut mis à jour',
          description: 'Le statut du devis a été mis à jour avec succès.',
        });
        router.refresh();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut.',
        variant: 'destructive',
      });
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Devis supprimé',
          description: 'Le devis a été supprimé avec succès.',
        });
        router.refresh();
      } else {
        throw new Error('Failed to delete quote');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le devis.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'processing':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'completed':
        return 'bg-green-500 hover:bg-green-600';
      case 'rejected':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En cours';
      case 'completed':
        return 'Complété';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell className="font-medium">{quote.name}</TableCell>
              <TableCell>{quote.email}</TableCell>
              <TableCell>{quote.company || 'N/A'}</TableCell>
              <TableCell>{quote.productName || 'General inquiry'}</TableCell>
              <TableCell>
                <Select
                  value={quote.status}
                  onValueChange={(value) => updateStatus(quote.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      <Badge className={getStatusColor(quote.status)}>
                        {getStatusLabel(quote.status)}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <Badge className="bg-yellow-500">En attente</Badge>
                    </SelectItem>
                    <SelectItem value="processing">
                      <Badge className="bg-blue-500">En cours</Badge>
                    </SelectItem>
                    <SelectItem value="completed">
                      <Badge className="bg-green-500">Complété</Badge>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <Badge className="bg-red-500">Rejeté</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* View Details Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedQuote(quote)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Détails du Devis</DialogTitle>
                        <DialogDescription>
                          Informations complètes sur la demande de devis
                        </DialogDescription>
                      </DialogHeader>
                      {selectedQuote && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Nom</p>
                              <p className="text-base">{selectedQuote.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-base">{selectedQuote.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Téléphone</p>
                              <p className="text-base">{selectedQuote.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Entreprise</p>
                              <p className="text-base">{selectedQuote.company || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Produit</p>
                              <p className="text-base">{selectedQuote.productName || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Quantité</p>
                              <p className="text-base">
                                {selectedQuote.quantity ? `${selectedQuote.quantity} tonnes` : 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
                            <p className="text-base p-4 bg-gray-50 rounded-lg">
                              {selectedQuote.message}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date de création</p>
                            <p className="text-base">
                              {new Date(selectedQuote.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* Delete Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer ce devis ? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteQuote(quote.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {quotes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun devis pour le moment</p>
        </div>
      )}
    </div>
  );
}
