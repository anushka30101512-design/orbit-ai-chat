import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, MessageCircle, Mail, BarChart3, Users, Zap, Shield, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Autonyze</span>
          </div>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          <Zap className="w-3 h-3 mr-1" />
          AI-Powered Communication Platform
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Automate Your Customer Communications
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Transform your business with AI assistants that handle calls, SMS, and emails. 
          Built for dental practices, pharmacies, real estate, and insurance agencies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="btn-hero" asChild>
            <Link to="/login">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Calls Automated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Multi-Channel AI Communication</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Engage your customers across all channels with intelligent AI assistants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="stat-card text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="mb-2">AI Voice Calls</CardTitle>
              <CardDescription>
                Natural conversations with human-like AI assistants for appointments, reminders, and follow-ups
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="stat-card text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="mb-2">Smart SMS</CardTitle>
              <CardDescription>
                Automated text messaging campaigns with personalization and two-way conversations
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="stat-card text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="mb-2">Email Automation</CardTitle>
              <CardDescription>
                Personalized email campaigns with templates optimized for your industry
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Industry Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-hover transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Dental Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Appointment reminders</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Insurance verification</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Follow-up care</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Pharmacies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Prescription ready alerts</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Refill reminders</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Health consultations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Real Estate</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Lead qualification</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Property notifications</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Market updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Policy renewals</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Claim follow-ups</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Customer service</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Autonyze?</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Increase Efficiency</h3>
                  <p className="text-muted-foreground">Automate routine communications and free up your team for high-value tasks</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Improve Customer Experience</h3>
                  <p className="text-muted-foreground">Provide instant, 24/7 support and never miss an important communication</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">HIPAA Compliant</h3>
                  <p className="text-muted-foreground">Enterprise-grade security and compliance for healthcare and sensitive data</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-card rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Join hundreds of businesses already using Autonyze to automate their communications
            </p>
            <Button size="lg" className="btn-hero w-full" asChild>
              <Link to="/login">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Autonyze</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Autonyze. All rights reserved. Built for modern businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}