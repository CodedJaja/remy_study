import { useState } from 'react';
import { Clock, TrendingUp, Target, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AuthModal } from './AuthModal';
import logo from 'figma:asset/373827bffc79e0c967df11d60fdb703830b25278.png';

interface LandingPageProps {
  onAuthSuccess: () => void;
}

export function LandingPage({ onAuthSuccess }: LandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const features = [
    {
      icon: Clock,
      title: 'Smart Time Tracking',
      description: 'Track your focus sessions with an intuitive timer and visual progress indicators.',
    },
    {
      icon: TrendingUp,
      title: 'Weekly Analytics',
      description: 'Understand your productivity patterns with detailed charts and insights.',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set daily focus goals and track your progress toward achieving them.',
    },
    {
      icon: Zap,
      title: 'Streak Tracking',
      description: 'Build consistency with daily streaks and achievement badges.',
    },
  ];

  const benefits = [
    'No credit card required',
    'Start tracking in seconds',
    'Free forever',
    'Data privacy guaranteed',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="REMY" className="h-8 w-8" />
              <span className="text-gray-900">REMY</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
            <Zap className="h-4 w-4" />
            <span>Build better focus habits</span>
          </div>
          
          <h1 className="text-gray-900 mb-6">
            Track Your Focus,<br />Transform Your Productivity
          </h1>
          
          <p className="text-gray-600 text-xl mb-8">
            A beautiful, distraction-free time tracker designed to help you build deep focus habits and understand your attention patterns.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
              Start Tracking Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none"></div>
          <Card className="overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
                <div className="text-6xl mb-2">25:00</div>
                <div className="text-white/80">Your focus session awaits</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Everything you need to stay focused</h2>
          <p className="text-gray-600 text-lg">
            Powerful features to help you build lasting focus habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-center text-white">
          <h2 className="text-white mb-4">Ready to improve your focus?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with Focus Tracker.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="REMY" className="h-6 w-6" />
              <span className="text-gray-600 text-sm">© 2025 REMY</span>
            </div>
            <div className="text-gray-600 text-sm">
              Built with focus in mind
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={onAuthSuccess}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}