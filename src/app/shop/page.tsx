/**
 * Grama Groceries - Shop Page
 * Product browsing with categories, filters, and search
 */

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All Products', count: 523 },
  { id: 'vegetables', name: 'Vegetables', count: 150 },
  { id: 'fruits', name: 'Fruits', count: 89 },
  { id: 'dairy', name: 'Dairy', count: 45 },
  { id: 'grains', name: 'Grains & Rice', count: 67 },
  { id: 'spices', name: 'Spices', count: 123 },
  { id: 'organic', name: 'Organic', count: 49 }
];

const products = [
  {
    id: 1,
    name: 'Fresh Red Tomatoes',
    price: 45,
    originalPrice: 60,
    unit: 'kg',
    farmer: 'Rajesh Kumar',
    location: 'Village Rampur, UP',
    rating: 4.8,
    reviews: 124,
    category: 'vegetables',
    organic: false,
    image: 'https://placehold.co/300x300?text=Fresh+red+ripe+tomatoes+from+Indian+village+farm+organic+produce'
  },
  {
    id: 2,
    name: 'Organic Basmati Rice',
    price: 120,
    originalPrice: 150,
    unit: 'kg',
    farmer: 'Sunita Devi',
    location: 'Village Haryana',
    rating: 4.9,
    reviews: 89,
    category: 'grains',
    organic: true,
    image: 'https://placehold.co/300x300?text=Premium+organic+basmati+rice+grains+from+Haryana+farms'
  },
  {
    id: 3,
    name: 'Farm Fresh Spinach',
    price: 25,
    originalPrice: 35,
    unit: 'bunch',
    farmer: 'Amit Sharma',
    location: 'Village Punjab',
    rating: 4.7,
    reviews: 67,
    category: 'vegetables',
    organic: true,
    image: 'https://placehold.co/300x300?text=Fresh+green+spinach+leaves+organic+vegetable+from+Punjab+farm'
  },
  {
    id: 4,
    name: 'Pure Village Honey',
    price: 280,
    originalPrice: 320,
    unit: '500g jar',
    farmer: 'Mohan Singh',
    location: 'Village Himachal',
    rating: 4.9,
    reviews: 156,
    category: 'organic',
    organic: true,
    image: 'https://placehold.co/300x300?text=Pure+golden+honey+in+glass+jar+from+Himachal+mountain+beekeepers'
  },
  {
    id: 5,
    name: 'Fresh Mangoes',
    price: 120,
    originalPrice: 140,
    unit: 'dozen',
    farmer: 'Priya Patel',
    location: 'Village Gujarat',
    rating: 4.6,
    reviews: 203,
    category: 'fruits',
    organic: false,
    image: 'https://placehold.co/300x300?text=Sweet+yellow+mangoes+fresh+from+Gujarat+orchards+summer+fruit'
  },
  {
    id: 6,
    name: 'Organic Turmeric Powder',
    price: 85,
    originalPrice: 100,
    unit: '200g pack',
    farmer: 'Lakshmi Bai',
    location: 'Village Karnataka',
    rating: 4.8,
    reviews: 91,
    category: 'spices',
    organic: true,
    image: 'https://placehold.co/300x300?text=Organic+turmeric+powder+golden+yellow+spice+from+Karnataka+farms'
  }
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showOrganic, setShowOrganic] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesOrganic = !showOrganic || product.organic;
    
    return matchesSearch && matchesCategory && matchesOrganic;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // popularity
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                🌾
              </div>
              <span className="font-bold text-gray-900">Grama Groceries</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" size="sm">🛒 Cart (3)</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fresh Groceries from Local Farmers
          </h1>
          <p className="text-gray-600">
            Supporting village communities • {filteredProducts.length} products available
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Input
                  placeholder="Search for vegetables, fruits, farmers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showOrganic ? "default" : "outline"}
                onClick={() => setShowOrganic(!showOrganic)}
                className="whitespace-nowrap"
              >
                🌱 Organic Only
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Categories Sidebar */}
          <aside className="w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} orientation="vertical">
                  <TabsList className="flex-col h-auto space-y-1">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="w-full justify-between"
                      >
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-500">{category.count}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowOrganic(false);
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/300x300?text=' + encodeURIComponent(product.name);
                        }}
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.organic && (
                          <Badge className="bg-green-500 text-white text-xs">
                            🌱 Organic
                          </Badge>
                        )}
                        <Badge className="bg-orange-500 text-white text-xs">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          ❤️
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        <span className="text-sm text-gray-600">/ {product.unit}</span>
                      </div>

                      <div className="text-xs text-gray-600 mb-3 space-y-1">
                        <div className="flex items-center gap-1">
                          <span>👨‍🌾</span>
                          <span>{product.farmer}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{product.rating} ({product.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                          Add to Cart
                        </Button>
                        <Link href={`/products/${product.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}