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
import { ArrowLeft, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { ImageCropper } from '@/components/ImageCropper';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
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
    image: '',
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
          image: data.image,
          stock: data.stock.toString(),
          featured: data.featured,
        });
        setImagePreview(data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch product:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le produit",
          variant: "destructive"
        });
        setLoading(false);
      });
  }, [id, toast]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Charger l'image pour le cropper
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToCrop(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedFile: File) => {
    setShowCropper(false);
    setUploading(true);

    try {
      // Prévisualiser l'image recadrée
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(croppedFile);

      // Uploader l'image recadrée
      const formData = new FormData();
      formData.append('file', croppedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, image: data.url }));
        toast({
          title: "Succès",
          description: "Image uploadée avec succès",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Erreur",
          description: error.error || "Erreur lors de l'upload de l'image",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de l'image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageToCrop('');
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.nameEn,
          description: formData.descriptionEn,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Le produit a été mis à jour avec succès",
        });
        router.push('/admin/products');
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le produit",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nameEn">Name (English)</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="nameFr">Name (French)</Label>
              <Input
                id="nameFr"
                value={formData.nameFr}
                onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="descriptionEn">Description (English)</Label>
              <Textarea
                id="descriptionEn"
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="descriptionFr">Description (French)</Label>
              <Textarea
                id="descriptionFr"
                value={formData.descriptionFr}
                onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price ($/ton)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Image du produit</Label>

              {imagePreview ? (
                <div className="mt-2 relative">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <label
                      htmlFor="image-upload-edit"
                      className="cursor-pointer"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Changer l'image
                        </span>
                      </Button>
                    </label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                  <Input
                    id="image-upload-edit"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={uploading}
                  />
                </div>
              ) : (
                <div className="mt-2">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP ou GIF (MAX. 5MB)</p>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageSelect}
                      disabled={uploading}
                    />
                  </label>
                  {uploading && (
                    <p className="mt-2 text-sm text-gray-600">Upload en cours...</p>
                  )}
                </div>
              )}

              {/* Champ caché pour l'URL de l'image */}
              <Input
                type="hidden"
                value={formData.image}
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked as boolean })
                }
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link href="/admin/products">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {showCropper && imageToCrop && (
        <ImageCropper
          image={imageToCrop}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={4 / 3}
        />
      )}
    </div>
  );
}
