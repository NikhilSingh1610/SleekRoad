import React from 'react';
import { Card } from '../components/ui/card';

export default function CareersPage({ onBack }: { onBack?: () => void }) {
  const roles = [
    { 
      title: 'Senior Frontend Engineer', 
      type: 'Full-Time Remote', 
      status: 'Open',
      description: 'Build beautiful, performant UI with React, TypeScript, and Tailwind.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'API Integration']
    },
    { 
      title: 'Product Designer', 
      type: 'Full-Time Remote', 
      status: 'Open',
      description: 'Craft intuitive, delightful user experiences and polish every pixel.',
      skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design']
    },
    { 
      title: 'Community Manager', 
      type: 'Part-Time Remote', 
      status: 'Open',
      description: 'Engage users, moderate content, and build a safe community.',
      skills: ['Communication', 'Moderation', 'Customer Support']
    },
    { 
      title: 'Backend Engineer', 
      type: 'Full-Time Remote', 
      status: 'Upcoming',
      description: 'Build scalable APIs and real-time features with Firebase and Node.',
      skills: ['Node.js', 'Firebase', 'REST APIs']
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-black">Careers at SleekRoad</h1>
            {onBack && (
              <button onClick={onBack} className="text-beige-700 hover:underline">Back</button>
            )}
          </div>

          <Card className="p-6 border-beige-200 bg-white">
            <div className="space-y-6">
              {/* Join Us */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">Join Us</h2>
                <p className="text-beige-700">
                  We're on a mission to reimagine local, peer-to-peer commerce—where trust, craft, and community come first. SleekRoad isn't just another marketplace; it's a carefully crafted platform built by a small, passionate team that believes in quality over speed, safety over shortcuts, and real human connections.
                </p>
              </section>

              {/* Why SleekRoad */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">Why SleekRoad?</h2>
                <ul className="list-disc list-inside space-y-2 text-beige-700">
                  <li><strong>Meaningful Work:</strong> Build features that keep real people safe and help communities thrive.</li>
                  <li><strong>Small Team, Big Impact:</strong> Your work matters. No red tape, no endless meetings—just ship.</li>
                  <li><strong>Remote-First:</strong> Work from anywhere. Flexible hours. Trust and autonomy.</li>
                  <li><strong>Product Excellence:</strong> We care deeply about craft—clean code, beautiful design, delightful UX.</li>
                  <li><strong>Values-Driven:</strong> We put people over profits. No dark patterns. No exploitation. No compromises.</li>
                  <li><strong>Growth & Learning:</strong> Work with smart, kind people who challenge you and support your growth.</li>
                </ul>
              </section>

              {/* What We Offer */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">What We Offer</h2>
                <ul className="list-disc list-inside space-y-2 text-beige-700">
                  <li>💰 Competitive salary and equity</li>
                  <li>🏠 Fully remote—work from anywhere</li>
                  <li>⏰ Flexible hours and unlimited PTO</li>
                  <li>🩺 Health, dental, and vision insurance</li>
                  <li>📚 Learning budget for books, courses, conferences</li>
                  <li>💻 Top-tier equipment and tools</li>
                  <li>🌱 Mental health support and wellness stipend</li>
                  <li>🤝 Inclusive, supportive, drama-free culture</li>
                </ul>
              </section>

              {/* Our Values */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">Our Values</h2>
                <div className="space-y-4 text-beige-700">
                  <div>
                    <h3 className="font-semibold text-black">🛡️ Trust & Safety First</h3>
                    <p>We build features that protect users from scams, fraud, and harm. Safety isn't negotiable.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">🎨 Craft & Quality</h3>
                    <p>We care about the details. Clean code, beautiful design, delightful interactions—every pixel matters.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">🤝 Community First</h3>
                    <p>We listen to our users. We ship features that help real people solve real problems.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">🌱 Sustainability & Ethics</h3>
                    <p>We support local, sustainable commerce. No dark patterns. No exploitation. No compromises.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">⚡ Move Fast, But Thoughtfully</h3>
                    <p>We ship quickly, but not recklessly. Speed matters, but not at the cost of quality or safety.</p>
                  </div>
                </div>
              </section>

              {/* Open Roles */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">Open Roles</h2>
                <div className="space-y-3">
                  {roles.map((r, idx) => (
                    <div key={idx} className="p-4 bg-cream-50 rounded-lg border border-beige-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-black">{r.title}</h3>
                          <p className="text-sm text-beige-600">{r.type}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm rounded whitespace-nowrap ${r.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {r.status}
                        </span>
                      </div>
                      <p className="text-beige-700 text-sm mb-2">{r.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {r.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-1 text-xs bg-white border border-beige-200 rounded text-beige-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* How to Apply */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">How to Apply</h2>
                <ol className="list-decimal list-inside space-y-2 text-beige-700">
                  <li>Email us at <a href="mailto:careers@sleekroad.com" className="text-black underline">careers@sleekroad.com</a> with the role you're interested in.</li>
                  <li>Include your resume, portfolio, or GitHub (whatever best showcases your work).</li>
                  <li>Tell us why you're excited about SleekRoad and what you'd bring to the team.</li>
                  <li>We'll review your application within 3-5 business days.</li>
                  <li>If it's a fit, we'll schedule a casual chat to learn more about each other.</li>
                </ol>
              </section>

              {/* Don't See a Fit? */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">Don't See a Fit?</h2>
                <p className="text-beige-700">
                  We're always looking for talented, mission-aligned people. If you think you'd be a great addition to the team, reach out anyway! Send us your info at <a href="mailto:hotdrop.tech@gmail.com" className="text-black underline">hotdrop.tech@gmail.com</a> and tell us what you'd love to work on.
                </p>
              </section>

              {/* Equal Opportunity */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-black">Equal Opportunity</h2>
                <p className="text-beige-700">
                  SleekRoad is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We do not discriminate based on race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability, or any other protected status.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
