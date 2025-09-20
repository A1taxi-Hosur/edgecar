import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import type { Product } from "@shared/schema";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  image: z.string().url("Please enter a valid image URL"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      setLocation('/admin');
    }
  }, [setLocation]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "audio",
      description: "",
      image: "",
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const response = await apiRequest('POST', '/api/products', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: "Product has been added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      form.reset();
      setShowAddForm(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProductFormData }) => {
      const response = await apiRequest('PUT', `/api/products/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      form.reset();
      setEditingProduct(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/products/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setValue('name', product.name);
    form.setValue('category', product.category);
    form.setValue('description', product.description || '');
    form.setValue('image', product.image || '');
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setLocation('/admin');
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    form.reset();
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Products</h2>
              <Button
                onClick={handleAddNew}
                className="bg-accent-orange text-white hover:bg-accent-orange-light"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {products.map((product: Product) => (
                <Card key={product.id} className="product-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image || ''}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{product.name}</h3>
                        <p className="text-sm text-light-gray capitalize">{product.category}</p>
                        <p className="text-xs text-light-gray">{product.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEdit(product)}
                          size="sm"
                          variant="outline"
                          className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {(showAddForm || editingProduct) && (
            <div>
              <Card className="product-card">
                <CardHeader>
                  <CardTitle className="text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Product Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter product name"
                                className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="audio">Audio</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="motors">Motors</SelectItem>
                                <SelectItem value="dash-camera">Dash Camera</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Image URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter image URL"
                                className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Enter product description"
                                rows={3}
                                className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-4">
                        <Button
                          type="submit"
                          disabled={createProductMutation.isPending || updateProductMutation.isPending}
                          className="flex-1 bg-accent-orange text-white hover:bg-accent-orange-light"
                        >
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </Button>
                        <Button
                          type="button"
                          onClick={handleCancel}
                          variant="outline"
                          className="border-gray-600 text-light-gray hover:bg-gray-600"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}