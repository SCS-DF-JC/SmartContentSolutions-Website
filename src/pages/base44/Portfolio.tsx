import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  TrendingUp,
  Clock,
  FileText,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Rocket,
  FileSearch,
} from "lucide-react";

export default function Portfolio() {
  const caseStudy = {
    title: "Real Business Results",
    industry: "Service-Based Businesses",
    challenge:
      "Like many business owners, our clients struggle to maintain a consistent online presence while managing daily operations. No time for content creation, inconsistent posting, and low search visibility meant missed opportunities and lost revenue.",
    solution:
      "We implemented our automated content systems with AI-driven blog writing, social media scheduling, and email newsletters. Our approach focuses on maintaining brand voice while delivering consistent, high-quality content.",
    results: [
      { metric: "5+ hours", label: "Saved per week", icon: Clock },
      { metric: "40%", label: "Increase in content output", icon: TrendingUp },
      { metric: "3x", label: "More website traffic", icon: Users },
      { metric: "60%", label: "Boost in enquiries", icon: BarChart3 },
    ],
    testimonial: {
      quote:
        "Smart Content Solutions transformed how we handle our marketing. We went from posting once a month to having consistent, high-quality content across all our channels. The results speak for themselves.",
      author: "Dominik & Jason",
      company: "Smart Content Solutions",
    },
  };

  const comingSoonFeatures = [
    {
      icon: BarChart3,
      title: "AI Analytics Dashboard",
      description:
        "Real-time content performance tracking with intelligent insights and optimization recommendations",
    },
    {
      icon: Target,
      title: "Content Performance Tracking",
      description:
        "Detailed metrics on engagement, reach, and conversion across all your content channels",
    },
    {
      icon: Rocket,
      title: "End-to-End Automation",
      description:
        "Complete workflow automation from ideation to publishing and performance analysis",
    },
  ];

  const contentExamples = [
    {
      type: "Blog Posts",
      count: "8+ per month",
      topics: [
        "Industry insights & trends",
        "How-to guides & tutorials",
        "Case studies & success stories",
        "SEO-optimized content",
      ],
    },
    {
      type: "Social Media",
      count: "20+ posts per month",
      topics: [
        "Engaging visual content",
        "Industry tips & advice",
        "Behind-the-scenes content",
        "Client testimonials",
      ],
    },
    {
      type: "Email Newsletters",
      count: "2-4 per month",
      topics: [
        "Value-packed updates",
        "Special offers & promotions",
        "New services & features",
        "Expert advice & insights",
      ],
    },
  ];

  const timeline = [
    {
      week: "Week 1",
      title: "Discovery & Setup",
      description:
        "Initial consultation, brand voice training, content strategy development",
    },
    {
      week: "Week 2",
      title: "Content Launch",
      description:
        "First batch of automated content published, social media scheduling begins",
    },
    {
      week: "Week 4",
      title: "Optimization",
      description:
        "Performance review, content refinement based on engagement data",
    },
    {
      week: "Week 8",
      title: "Results",
      description:
        "Measurable increase in traffic, enquiries, and brand visibility",
    },
  ];

  const capabilities = [
    {
      icon: FileText,
      title: "Content Creation",
      description:
        "AI-powered content that maintains your unique brand voice and engages your audience",
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description:
        "Data-driven content strategies tailored to your business goals and target audience",
    },
    {
      icon: TrendingUp,
      title: "Growth & Analytics",
      description:
        "Continuous optimization based on performance metrics and industry trends",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Proven Success
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Real Results</span>
              <br />
              from Content Automation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses are saving time and growing their online
              presence with our AI-powered content automation systems
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.results.map((result, i) => (
              <Card
                key={i}
                className="text-center hover:shadow-xl transition-all"
              >
                <CardContent className="p-6">
                  <result.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {result.metric}
                  </div>
                  <div className="text-sm text-gray-600">{result.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES COMING SOON */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-green-50">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSearch className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Detailed Case Studies Coming Soon
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                We're documenting real-world results. Soon you’ll see detailed
                strategies, implementation steps, and measurable outcomes.
              </p>

              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white" size="lg">
                  Be Our Next Success Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* COMING SOON FEATURES */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-blue-600" />
              Innovation Pipeline
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Exciting Features Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're constantly innovating to bring you advanced automation
              tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {comingSoonFeatures.map((feature, i) => (
              <Card
                key={i}
                className="hover:shadow-xl transition-all relative"
              >
                <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs rounded-full">
                  Coming Soon
                </span>

                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* BETA ACCESS */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Want early access to new features? Join our beta program
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-2">
                Request Beta Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Deliver
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive content solutions built for growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {capabilities.map((cap, i) => (
              <Card key={i} className="hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <cap.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-gray-600">{cap.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CHALLENGE + SOLUTION */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-red-600" />
                </div>

                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-gray-600 mb-6">{caseStudy.challenge}</p>

                <ul className="space-y-3 text-gray-700">
                  <li>No time for content creation</li>
                  <li>Inconsistent posting schedule</li>
                  <li>Low visibility & SEO issues</li>
                  <li>Competitors dominating online</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-green-50">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>

                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                <p className="text-gray-700 mb-6">{caseStudy.solution}</p>

                <ul className="space-y-3 text-gray-700">
                  <li>AI-powered content with brand voice</li>
                  <li>Multi-platform scheduling</li>
                  <li>Email newsletter automation</li>
                  <li>Zero manual effort required</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTENT EXAMPLES */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Content We Create</h2>
            <p className="text-xl text-gray-600">
              Comprehensive content across all channels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contentExamples.map((ex, i) => (
              <Card key={i} className="hover:shadow-xl transition">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {ex.type}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{ex.count}</p>

                  <ul className="space-y-2 text-sm text-gray-700">
                    {ex.topics.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Implementation Timeline</h2>
            <p className="text-xl text-gray-600">
              From setup to measurable results in 8 weeks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold gradient-text mb-3">
                    {phase.week}
                  </div>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-6xl opacity-20 mb-4">"</p>

          <p className="text-2xl mb-8">{caseStudy.testimonial.quote}</p>

          <p className="font-semibold text-lg">
            {caseStudy.testimonial.author}
          </p>
          <p className="text-blue-100">{caseStudy.testimonial.company}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Similar Results?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how content automation can transform your business
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-6"
              >
                View Our Packages
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 group"
              >
                Get Your Custom Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
