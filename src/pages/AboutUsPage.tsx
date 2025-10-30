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

          <Card className="p-6 border-beige-200 bg-white space-y-6">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Our Story</h2>
              <p className="text-beige-800 leading-relaxed">
                SleekRoad was born from a simple observation: local marketplaces had become cluttered, unsafe, and
                frustrating. Students struggled to find trusted buyers for textbooks. Neighbors couldn't easily discover
                great furniture down the street. And too often, users faced scams, spam, and poor experiences.
              </p>
              <p className="text-beige-800 leading-relaxed">
                We set out to build something different—a marketplace that feels clean, modern, and safe. A place where
                communities can buy, sell, and connect without the noise. Where trust is built into every interaction,
                and the experience is delightful from start to finish.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Our Mission</h2>
              <p className="text-beige-800 leading-relaxed">
                <strong>To create the world's most trusted and beautiful local marketplace.</strong> We believe buying and
                selling locally should be simple, safe, and joyful. We're building tools that empower communities—from
                college campuses to neighborhoods—to discover value, reduce waste, and connect with people nearby.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">What Makes Us Different</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>
                  <strong>Safety First:</strong> Verified accounts, secure messaging, and proactive moderation to keep
                  scammers and bad actors out.
                </li>
                <li>
                  <strong>Community Focused:</strong> Designed for campuses, neighborhoods, and tight-knit groups where
                  trust and proximity matter.
                </li>
                <li>
                  <strong>Beautiful & Simple:</strong> A minimal, polished interface that respects your time and makes
                  discovery effortless.
                </li>
                <li>
                  <strong>Smart Features:</strong> AI-powered price suggestions, instant messaging, favorites, and
                  notifications that actually help.
                </li>
                <li>
                  <strong>Sustainable:</strong> Encouraging reuse and local exchange to reduce waste and support circular
                  economies.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Our Values</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-black">🛡️ Trust & Safety</h3>
                  <p className="text-beige-800 text-sm">
                    Every feature is designed with safety in mind. We verify users, moderate content, and provide tools
                    to report concerns quickly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">🎨 Craft & Quality</h3>
                  <p className="text-beige-800 text-sm">
                    We obsess over details. Every pixel, every interaction, every word is carefully considered to create
                    a product we're proud of.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">🤝 Community First</h3>
                  <p className="text-beige-800 text-sm">
                    We listen to our users, support local groups, and build features that strengthen connections between
                    neighbors and classmates.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">🌱 Sustainability</h3>
                  <p className="text-beige-800 text-sm">
                    By making it easy to buy and sell locally, we reduce waste, lower carbon footprints, and help items
                    find new life.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">⚡ Speed & Simplicity</h3>
                  <p className="text-beige-800 text-sm">
                    We respect your time. Our platform is fast, intuitive, and free of clutter so you can get what you
                    need and move on.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Who We Serve</h2>
              <ul className="list-disc pl-6 text-beige-800 space-y-2">
                <li>
                  <strong>Students:</strong> Buy textbooks, sell dorm furniture, find tutors, and discover campus deals.
                </li>
                <li>
                  <strong>Neighbors:</strong> Declutter your home, find local gems, and support people in your community.
                </li>
                <li>
                  <strong>Small Sellers:</strong> Artists, makers, and side hustlers who want a clean platform to reach
                  local buyers.
                </li>
                <li>
                  <strong>Service Providers:</strong> Tutors, photographers, repair pros, and freelancers connecting with
                  clients nearby.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Our Commitment</h2>
              <p className="text-beige-800 leading-relaxed">
                We're committed to building a platform that's free, fair, and focused on users—not ads or data exploitation.
                We don't sell your information. We don't spam you with notifications. We simply provide the best tools for
                local exchange and let the community thrive.
              </p>
              <p className="text-beige-800 leading-relaxed">
                As we grow, we promise to stay true to our roots: a marketplace that's safe, beautiful, and built for real
                people. Thank you for being part of the SleekRoad community.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-black">Join the Journey</h2>
              <p className="text-beige-800 leading-relaxed">
                We're just getting started. Whether you're buying your first item, listing something to sell, or exploring
                what's nearby, we're excited to have you here. Have ideas? Feedback? We'd love to hear from you—reach out
                via the Contact Us page.
              </p>
              <p className="text-beige-800 leading-relaxed">
                Interested in joining our team? Check out the Careers page to see open roles.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-beige-200">
              <p className="text-sm text-beige-700">
                <strong>Founded:</strong> 2024
              </p>
              <p className="text-sm text-beige-700">
                <strong>Headquarters:</strong> Built for communities everywhere
              </p>
              <p className="text-sm text-beige-700">
                <strong>Contact:</strong> Use the Contact Us page or email hello@sleekroad.app
              </p>
            </section>
          </Card>
        </div>
      </div>
    </div>
  );
}
