/**
 * Grama Groceries - Main Landing Page
 * Welcome screen with app introduction and authentication
 */

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    title: "Fresh Farm Produce",
    description: "Direct from local farmers to your doorstep",
    icon: "🌱"
  },
  {
    title: "Support Local Farmers", 
    description: "Empower village communities and agriculture",
    icon: "👨‍🌾"
  },
  {
    title: "Quick Delivery",
    description: "Fresh groceries delivered within hours",
    icon: "🚚"
  },
  {
    title: "Fair Prices",
    description: "No middlemen, better prices for everyone",
    icon: "💰"
  }
];

const stats = [
  { label: "Happy Customers", value: "50,000+" },
  { label: "Partner Farmers", value: "2,500+" },
  { label: "Villages Served", value: "150+" },
  { label: "Fresh Products", value: "10,000+" }
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            🌾
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Grama Groceries</h1>
            <p className="text-sm text-gray-600">Farm to Family</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link href="/vendor">
            <Button variant="ghost" size="sm">
              For Farmers
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-green-500 hover:bg-green-600">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200">
            🚀 Now serving 150+ villages across India
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Fresh Groceries from
            <span className="text-green-500 block">Village to Your Home</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Supporting local farmers and bringing you the freshest produce, handmade spices, 
            and authentic village products with quick delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/shop">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
                🛒 Start Shopping
              </Button>
            </Link>
            <Link href="/vendor/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                👨‍🌾 Join as Farmer
              </Button>
            </Link>
          </div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-8 shadow-2xl">
              <img
                src="https://placehold.co/800x500?text=Happy+Indian+farmers+with+fresh+vegetables+and+fruits+in+rural+village+setting+with+traditional+farming+background"
                alt="Happy Indian farmers with fresh vegetables and fruits in rural village setting"
                className="w-full h-auto rounded-xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-green-500/10 rounded-2xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <Card className="text-center border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Grama Groceries?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're more than just a grocery delivery app - we're building a sustainable ecosystem 
            that benefits farmers, customers, and communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 1.0 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-0">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Fresh Groceries?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of families who trust Grama Groceries for their daily needs 
              while supporting local farming communities.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Start Shopping Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-sm font-bold">
                  🌾
                </div>
                <span className="font-bold">Grama Groceries</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting villages with cities through fresh, sustainable groceries.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/shop" className="hover:text-white">Browse Products</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/offers" className="hover:text-white">Offers</Link></li>
                <li><Link href="/help" className="hover:text-white">Help & Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Farmers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/vendor/register" className="hover:text-white">Join as Seller</Link></li>
                <li><Link href="/vendor/guide" className="hover:text-white">Seller Guide</Link></li>
                <li><Link href="/vendor/support" className="hover:text-white">Seller Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Grama Groceries. Built with love for Indian farming communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}