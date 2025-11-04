import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Student Verified',
    description: 'All users verified with .edu emails for a safe community',
    gradient: 'bg-brand'
  },
  {
    icon: CheckCircle,
    title: 'In-App Messaging',
    description: 'Secure communication with buyers and sellers',
    gradient: 'bg-brand'
  },
  {
    icon: CheckCircle,
    title: 'Smart Pricing',
    description: 'AI-powered price suggestions based on market data',
    gradient: 'bg-brand'
  },
  {
    icon: CheckCircle,
    title: 'Community',
    description: 'Connect with students from your university',
    gradient: 'bg-brand'
  }
];

export function FeatureCardsCTA() {
  return (
    <>
      <section className="hidden  sm:block py-16 bg-brand-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SleekRoad? </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for local college students. SleekRoad gives you a modern, safe, and beautiful way
              to buy and sell nearby in the campus with best price.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                  <div className={`inline-flex p-4 rounded-2xl ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-foreground" />
                    <h3 className="font-semibold ml-2 text-white">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-soft">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Ride with SleekRoad?</h2>
            <p className="hidden sm:block text-xl mb-8 opacity-90">
              Start buying and selling in campus with a clean, curated experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="black" className="gap-2 px-6 h-12">
                  <CheckCircle className="w-5 h-5 text-white" />
                  Sign Up Now
                </Button>
              </Link>
              
            </div>

          </div>
        </div>
      </section>
    </>
  );
}