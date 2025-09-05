/**
 * Grama Groceries - Vendor Dashboard
 * Farmer/vendor management interface for products, orders, and analytics
 */

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const vendorStats = {
  totalSales: 45280,
  ordersToday: 23,
  productsListed: 47,
  rating: 4.8,
  totalOrders: 1247,
  completionRate: 98.5
};

const recentOrders = [
  {
    id: '#12456',
    customer: 'Priya Sharma',
    items: 3,
    amount: 450,
    status: 'pending',
    time: '10 mins ago'
  },
  {
    id: '#12455',
    customer: 'Rajesh Kumar',
    items: 5,
    amount: 780,
    status: 'confirmed',
    time: '25 mins ago'
  },
  {
    id: '#12454',
    customer: 'Anita Patel',
    items: 2,
    amount: 320,
    status: 'packed',
    time: '1 hour ago'
  },
  {
    id: '#12453',
    customer: 'Suresh Singh',
    items: 7,
    amount: 960,
    status: 'delivered',
    time: '2 hours ago'
  }
];

const topProducts = [
  {
    id: 1,
    name: 'Fresh Red Tomatoes',
    sales: 156,
    revenue: 7020,
    stock: 45,
    image: 'https://placehold.co/80x80?text=Tomatoes'
  },
  {
    id: 2,
    name: 'Organic Basmati Rice',
    sales: 89,
    revenue: 10680,
    stock: 23,
    image: 'https://placehold.co/80x80?text=Rice'
  },
  {
    id: 3,
    name: 'Farm Fresh Spinach',
    sales: 134,
    revenue: 3350,
    stock: 67,
    image: 'https://placehold.co/80x80?text=Spinach'
  }
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'packed': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  🌾
                </div>
                <span className="font-bold text-gray-900">Grama Groceries</span>
              </Link>
              
              <Badge className="bg-green-100 text-green-700">
                Vendor Dashboard
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                📞 Support
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://placehold.co/32x32?text=V" />
                <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                  RK
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Vendor Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://placehold.co/80x80?text=Farmer" />
              <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                RK
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Rajesh Kumar Farm
                  </h1>
                  <p className="text-gray-600 mb-2">
                    📍 Village Rampur, Uttar Pradesh • Member since 2023
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>⭐ {vendorStats.rating} rating</span>
                    <span>📦 {vendorStats.totalOrders} orders completed</span>
                    <span>✅ {vendorStats.completionRate}% completion rate</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-green-600">₹{vendorStats.totalSales.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  💰
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Orders Today</p>
                  <p className="text-2xl font-bold text-blue-600">{vendorStats.ordersToday}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  📦
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Products Listed</p>
                  <p className="text-2xl font-bold text-purple-600">{vendorStats.productsListed}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  🛍️
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{vendorStats.rating} ⭐</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  🏆
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders from customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            👤
                          </div>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-gray-600">
                              {order.id} • {order.items} items • {order.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">₹{order.amount}</div>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Your best performing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-bold">
                            #{index + 1}
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://placehold.co/48x48?text=' + encodeURIComponent(product.name.split(' ')[0]);
                            }}
                          />
                          <div>
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-gray-600">
                              {product.sales} sold • Stock: {product.stock}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-green-600">₹{product.revenue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Manage Products
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <span className="text-2xl">📦</span>
                    <span>New Product</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <span className="text-2xl">📊</span>
                    <span>View Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <span className="text-2xl">💳</span>
                    <span>Payments</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <span className="text-2xl">🏪</span>
                    <span>Shop Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Order management interface will be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Add, edit, and manage your products</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Product management interface will be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Track your business performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Analytics dashboard will be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}