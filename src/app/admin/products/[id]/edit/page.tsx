'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageCropper } from '@/components/ImageCropper';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ url: string; preview: string }[]>([]);
  const [imageToCrop, setImageToCrop] = useState<string>('');
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    nameFr: '',
    descriptionEn: '',
    descriptionFr: '',
    category: '',
    price: '',
    stock: '',
    featured: false,
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          nameEn: data.nameEn,
          nameFr: data.nameFr,
          descriptionEn: data.descriptionEn,
          descriptionFr: data.descriptionFr,
          category: data.category,
          price: data.price.toString(),
          stock: data.stock.toString(),
          featured: data.featured,
        });
        const productImages = data.images || [];
        setImages(productImages.map((url: string) => ({ url, preview: url })));
        setLoading(false);
      })
      .catch(() => {
        toast({ title: "Erreur", description: "Impossible de charger le produit", variant: "destructive" });
        setLoading(false);
      });
  }, [id, toast]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToCrop(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (croppedFile: File) => {
    setShowCropper(false);
    setUploading(true);

    try {
      const previewReader = new FileReader();
      const previewPromise = new Promise<string>((resolve) => {
        previewReader.onloadend = () => resolve(previewReader.result as string);
        previewReader.readAsDataURL(croppedFile);
      });

      const uploadForm = new FormData();
      uploadForm.append('file', croppedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadForm,
      });

      if (response.ok) {
        const data = await response.json();
        const preview = await previewPromise;
        setImages((prev) => [...prev, { url: data.url, preview }]);
        toast({ title: "Succès", description: "Image uploadée avec succès" });
      } else {
        const error = await response.json();
        toast({ title: "Erreur", description: error.error || "Erreur lors de l'upload", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Erreur lors de l'upload de l'image", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageToCrop('');
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const newImages = [...images];
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast({ title: "Erreur", description: "Veuillez ajouter au moins une image", variant: "destructive" });
      return;
    }
    setSaving(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.nameEn,
          description: formData.descriptionEn,
          images: images.map((img) => img.url),
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (response.ok) {
        toast({ title: "Succès", description: "Le produit a été mis à jour avec succès" });
        router.push('/admin/products');
      } else {
        toast({ title: "Erreur", description: "Impossible de mettre à jour le produit", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux produits
      </Link>

      <h1 className="text-3xl font-bold mb-8">Modifier le produit</h1>

      <Card>
        <CardHeader>
          <CardTitle>Détails du produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nameEn">Nom (Anglais)</Label>
              <Input id="nameEn" value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} required />
            </div>

            <div>
              <Label htmlFor="nameFr">Nom (Français)</Label>
              <Input id="nameFr" value={formData.nameFr} onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })} required />
            </div>

            <div>
              <Label htmlFor="descriptionEn">Description (Anglais)</Label>
              <Textarea id="descriptionEn" value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} rows={4} required />
            </div>

            <div>
              <Label htmlFor="descriptionFr">Description (Français)</Label>
              <Textarea id="descriptionFr" value={formData.descriptionFr} onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })} rows={4} required />
            </div>

            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
            </div>

            <div>
              <Label htmlFor="price">Prix ($/tonne)</Label>
              <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            </div>

            <div>
              <Label>Images du produit</Label>

              {images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-40">
                        <img src={img.preview} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      {index === 0 && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                          Principale
                        </span>
                      )}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button type="button" variant="destructive" size="icon" className="h-7 w-7" onClick={() => removeImage(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {index > 0 && (
                            <Button type="button" variant="secondary" size="icon" className="h-7 w-7" onClick={() => moveImage(index, 'left')}>
                              <ChevronLeft className="h-3 w-3" />
                            </Button>
                          )}
                          {index < images.length - 1 && (
                            <Button type="button" variant="secondary" size="icon" className="h-7 w-7" onClick={() => moveImage(index, 'right')}>
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-1 text-sm text-gray-500">
                      <span className="font-semibold">Cliquez pour ajouter une image</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP ou GIF (MAX. 5MB)</p>
                    {images.length > 0 && (
                      <p className="text-xs text-blue-600 mt-1">{images.length} image(s) ajoutée(s)</p>
                    )}
                  </div>
                  <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageSelect} disabled={uploading} />
                </label>
                {uploading && <p className="mt-2 text-sm text-gray-600">Upload en cours...</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })} />
              <Label htmlFor="featured">Produit vedette</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </Button>
              <Link href="/admin/products">
                <Button type="button" variant="outline">Annuler</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {showCropper && imageToCrop && (
        <ImageCropper image={imageToCrop} onCropComplete={handleCropComplete} onCancel={handleCropCancel} aspectRatio={4 / 3} />
      )}
    </div>
  );
}
