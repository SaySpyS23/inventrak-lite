import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus, Search, AlertTriangle, Package } from 'lucide-react';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock products data - in real app this would come from API/database
const mockProducts: Product[] = [
  { id: '1', name: 'Rice (1kg)', price: 80, quantity: 50, category: 'Groceries', threshold: 10, code: 'R001', description: 'Premium Basmati Rice', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Cooking Oil (1L)', price: 150, quantity: 25, category: 'Groceries', threshold: 5, code: 'O001', description: 'Refined Sunflower Oil', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Sugar (1kg)', price: 45, quantity: 30, category: 'Groceries', threshold: 8, code: 'S001', description: 'White Crystal Sugar', createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'Tea Powder (250g)', price: 120, quantity: 3, category: 'Beverages', threshold: 5, code: 'T001', description: 'Premium Black Tea', createdAt: new Date(), updatedAt: new Date() },
  { id: '5', name: 'Biscuits Pack', price: 25, quantity: 40, category: 'Snacks', threshold: 10, code: 'B001', description: 'Glucose Biscuits', createdAt: new Date(), updatedAt: new Date() },
  { id: '6', name: 'Shampoo (200ml)', price: 180, quantity: 2, category: 'Personal Care', threshold: 5, code: 'SH001', description: 'Anti-dandruff Shampoo', createdAt: new Date(), updatedAt: new Date() },
];

export const InventoryTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Get low stock products
  const lowStockProducts = products.filter(p => p.quantity <= p.threshold);

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "Product has been removed from inventory.",
    });
  };

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Edit Product",
      description: "Edit functionality would open a modal here.",
    });
  };

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Add product modal would open here.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-muted-foreground">Manage your product inventory and stock levels</p>
        </div>
        <Button onClick={handleAddProduct} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning">{lowStockProducts.length}</p>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₹{products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString()}</p>
              </div>
              <div className="p-2 bg-success/10 rounded-lg">
                <span className="text-lg font-bold text-success">₹</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <div className="p-2 bg-accent rounded-lg">
                <span className="text-lg font-bold text-accent-foreground">#</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-input rounded-lg bg-background"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-warning flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {lowStockProducts.length} product(s) are running low on stock:
            </p>
            <div className="flex flex-wrap gap-2">
              {lowStockProducts.map(product => (
                <Badge key={product.id} variant="destructive" className="text-xs">
                  {product.name} ({product.quantity} left)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">₹{product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.quantity}</span>
                        <span className="text-xs text-muted-foreground">units</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.quantity <= product.threshold ? "destructive" : 
                                product.quantity <= product.threshold * 2 ? "secondary" : "default"}
                      >
                        {product.quantity <= product.threshold ? 'Low Stock' :
                         product.quantity <= product.threshold * 2 ? 'Medium' : 'In Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};