import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock products data
const mockProducts: Product[] = [
  { id: '1', name: 'Rice (1kg)', price: 80, quantity: 50, category: 'Groceries', threshold: 10, code: 'R001', description: 'Premium Basmati Rice', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Cooking Oil (1L)', price: 150, quantity: 25, category: 'Groceries', threshold: 5, code: 'O001', description: 'Refined Sunflower Oil', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Sugar (1kg)', price: 45, quantity: 30, category: 'Groceries', threshold: 8, code: 'S001', description: 'White Crystal Sugar', createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'Tea Powder (250g)', price: 120, quantity: 15, category: 'Beverages', threshold: 5, code: 'T001', description: 'Premium Black Tea', createdAt: new Date(), updatedAt: new Date() },
  { id: '5', name: 'Biscuits Pack', price: 25, quantity: 40, category: 'Snacks', threshold: 10, code: 'B001', description: 'Glucose Biscuits', createdAt: new Date(), updatedAt: new Date() },
];

export const POSTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];
    return cats;
  }, []);

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        product,
        quantity: 1,
        subtotal: product.price
      };
      setCart(prev => [...prev, newItem]);
      toast({
        title: "Item added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => prev.map(item => 
      item.product.id === productId
        ? { ...item, quantity: newQuantity, subtotal: item.product.price * newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    // Mock checkout process
    toast({
      title: "Checkout successful!",
      description: `Sale completed for ₹${cartTotal.toFixed(2)}`,
    });
    clearCart();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Point of Sale</h2>
        <Badge variant="outline" className="text-sm">
          Cart: {cart.length} items
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filters */}
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

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.code}</p>
                    </div>
                    <Badge variant={product.quantity <= product.threshold ? "destructive" : "secondary"} className="text-xs">
                      Stock: {product.quantity}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">₹{product.price}</span>
                    <Button size="sm" className="h-8 w-8 p-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                Shopping Cart
                {cart.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">₹{item.product.price} each</p>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-semibold">₹{item.subtotal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold text-primary">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="w-full btn-primary"
                      size="lg"
                    >
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};