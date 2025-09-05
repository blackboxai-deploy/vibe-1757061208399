/**
 * Grama Groceries - Customer Dashboard
 * Main customer interface with categories, featured products, and quick actions
 */

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Fresh Vegetables', icon: '🥬', count: 150 },
  { id: 2, name: 'Fruits', icon: '🍎', count: 89 },
  { id: 3, name: 'Dairy Products', icon: '🥛', count: 45 },
  { id: 4, name: 'Grains & Rice', icon: '🌾', count: 67 },
  { id: 5, name: 'Spices', icon: '🌶️', count: 123 },
  { id: 6, name: 'Organic Products', icon: '🌱', count: 78 }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Farm Fresh Tomatoes',
    price: 45,
    originalPrice: 60,
    unit: 'kg',
    farmer: 'Rajesh Kumar',
    location: 'Village Rampur',
    rating: 4.8,
    image: 'https://placehold.co/300x200?text=Fresh+red+tomatoes+from+Indian+village+farm'
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
    image: 'https://placehold.co/300x200?text=Premium+organic+basmati+rice+grains'
  },
  {
    id: 3,
    name: 'Pure Honey',
    price: 280,
    originalPrice: 320,
    unit: 'bottle',
    farmer: 'Mohan Singh',
    location: 'Village Punjab',
    rating: 4.7,
    image: 'https://placehold.co/300x200?text=Pure+golden+honey+in+glass+jar+from+Indian+beekeeper'
  },
  {
    id: 4,
    name: 'Mixed Vegetables',
    price: 85,
    originalPrice: 100,
    unit: 'kg',
    farmer: 'Lakshmi Bai',
    location: 'Village Maharashtra',
    rating: 4.6,
    image: 'https://placehold.co/300x200?text=Fresh+mixed+vegetables+basket+from+village+farm'
  }
];

const quickActions = [
  { label: 'Reorder Last', icon: '🔄', color: 'bg-blue-500' },
  { label: 'Track Order', icon: '📦', color: 'bg-orange-500' },
  { label: 'Offers', icon: '🎁', color: 'bg-purple-500' },
  { label: 'Help', icon: '💬', color: 'bg-green-500' }
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = 3;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                🌾
              </div>
              <span className="font-bold text-gray-900">Grama Groceries</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input
                  placeholder="Search for fresh vegetables, fruits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="outline" size="sm" className="relative">
                  🛒 Cart
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Good Morning! 👋
              </h1>
              <p className="text-gray-600">
                Fresh groceries from local farmers, delivered to your doorstep
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Delivering to</div>
              <div className="font-medium text-gray-900">📍 Your Location</div>
              <Link href="/addresses" className="text-sm text-green-500 hover:underline">
                Change location
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                    {action.icon}
                  </div>
                  <div className="text-sm font-medium">{action.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories" className="text-green-500 hover:underline text-sm">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-600">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Fresh from Farms</h2>
            <Link href="/products" className="text-green-500 hover:underline text-sm">
              View all →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/300x200?text=' + encodeURIComponent(product.name);
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-green-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="text-sm text-gray-600">/ {product.unit}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-3">
                    <div>👨‍🌾 {product.farmer}</div>
                    <div>📍 {product.location}</div>
                    <div>⭐ {product.rating} rating</div>
                  </div>
                  
                  <Button size="sm" className="w-full bg-green-500 hover:bg-green-600">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Special Offers Banner */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Special Weekend Offer!</h3>
                  <p className="mb-4">Free delivery on orders above ₹299. Valid till Sunday!</p>
                  <Button variant="secondary" size="sm">
                    Shop Now
                  </Button>
                </div>
                <div className="text-6xl">🎉</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Orders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Recent Orders</h2>
            <Link href="/orders" className="text-green-500 hover:underline text-sm">
              View all →
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    📦
                  </div>
                  <div>
                    <h3 className="font-medium">Order #12345</h3>
                    <p className="text-sm text-gray-600">5 items • ₹850 • Delivered yesterday</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm">
                    Rate Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}