import React from 'react';
import { Card } from '../components/ui/card';

export default function AboutUsPage({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-black">About SleekRoad</h1>
            {onBack && (
              <button onClick={onBack} className="text-beige-700 hover:underline">Back</button>
            )}
          </div>

          <Card className="p-6 border-beige-200 bg-white">
            <p className="text-beige-800 leading-relaxed">
              SleekRoad is a modern local marketplace built to help communities buy and sell safely and easily.
              Our mission is to create a clean, trusted, and delightful experience for people to discover great
              items nearby—without the noise and clutter.
            </p>
            <p className="text-beige-800 leading-relaxed mt-4">
              We focus on simplicity, safety, and community. Whether you’re selling furniture, finding textbooks,
              or offering services, SleekRoad gives you the tools you need with a beautiful, minimal interface.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
