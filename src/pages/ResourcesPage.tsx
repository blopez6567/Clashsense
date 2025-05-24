import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, BookOpen, Trophy, FileCheck2, Video, Newspaper, HelpCircle, Download, Book } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface ResourceSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const ResourcesPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>(['documentation']);

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) 
        ? prev.filter(section => section !== id)
        : [...prev, id]
    );
  };

  const resources: ResourceSection[] = [
    {
      id: 'documentation',
      title: 'Product Documentation',
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">User Guides & Manuals</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li>Getting Started with Clash Detection</li>
              <li>AI-Powered Resolution Guide</li>
              <li>Revit/Navisworks Integration Setup</li>
              <li>Advanced Clash Analysis Features</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">API Documentation</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Comprehensive API reference for BIM workflow integration.
              <Button variant="ghost" className="ml-2 text-blue-600 dark:text-blue-400">
                View API Docs →
              </Button>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: <Trophy className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Hospital Complex Coordination",
              savings: "45% time saved",
              description: "Reduced coordination meetings by 60% using AI clash detection"
            },
            {
              title: "High-Rise Office Development",
              savings: "$2.5M cost savings",
              description: "Prevented major MEP conflicts before construction"
            }
          ].map((study, index) => (
            <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="font-medium text-slate-900 dark:text-white">{study.title}</h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">{study.savings}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{study.description}</p>
              <Button variant="ghost" className="mt-2 text-blue-600 dark:text-blue-400">
                Read More →
              </Button>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'white-papers',
      title: 'White Papers & Technical Briefs',
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          {[
            {
              title: "AI in BIM Coordination: The Future of Clash Detection",
              pages: "24 pages",
              description: "Deep dive into how AI is transforming BIM coordination workflows"
            },
            {
              title: "Benchmarking Manual vs AI-Powered Clash Resolution",
              pages: "18 pages",
              description: "Comparative analysis of traditional and AI-driven approaches"
            },
            {
              title: "How Machine Learning Improves Construction Accuracy",
              pages: "32 pages",
              description: "Technical exploration of ML applications in construction"
            }
          ].map((paper, index) => (
            <div key={index} className="flex items-start space-x-4">
              <FileCheck2 className="h-5 w-5 text-slate-400 mt-1" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{paper.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{paper.pages}</p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{paper.description}</p>
                <Button variant="ghost" className="mt-2 text-blue-600 dark:text-blue-400">
                  Download PDF →
                </Button>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'webinars',
      title: 'Webinars & Video Tutorials',
      icon: <Video className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Getting Started with AI Clash Detection",
              duration: "45 min",
              type: "Tutorial",
              thumbnail: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
            },
            {
              title: "Advanced BIM Coordination Techniques",
              duration: "60 min",
              type: "Webinar",
              thumbnail: "https://images.pexels.com/photos/7688332/pexels-photo-7688332.jpeg"
            }
          ].map((video, index) => (
            <div key={index} className="group relative">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-slate-900 dark:text-white">{video.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{video.duration}</span>
                  <span>•</span>
                  <span>{video.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'blog',
      title: 'Blog / Industry Insights',
      icon: <Newspaper className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-6">
          {[
            {
              title: "Top 5 Causes of BIM Clashes — And How AI Fixes Them",
              date: "March 15, 2024",
              readTime: "8 min read",
              excerpt: "Learn about the most common BIM clash causes and how artificial intelligence can prevent them."
            },
            {
              title: "What GC's Should Know About AI-Driven BIM Workflows",
              date: "March 10, 2024",
              readTime: "6 min read",
              excerpt: "A comprehensive guide for General Contractors on implementing AI in their BIM processes."
            }
          ].map((post, index) => (
            <div key={index} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-0">
              <h3 className="font-medium text-slate-900 dark:text-white">{post.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{post.excerpt}</p>
              <Button variant="ghost" className="mt-2 text-blue-600 dark:text-blue-400">
                Read Article →
              </Button>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'faq',
      title: 'FAQs',
      icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-6">
          {[
            {
              question: "How does the AI learn to resolve clashes?",
              answer: "Our AI model is trained on millions of real-world clash resolution scenarios, learning patterns and best practices from successful projects."
            },
            {
              question: "What BIM file formats are supported?",
              answer: "We support all major BIM formats including .rvt (Revit), .nwd/.nwf (Navisworks), and IFC files."
            },
            {
              question: "Can I review AI decisions manually?",
              answer: "Yes, all AI-suggested resolutions can be reviewed and modified through our intuitive interface before implementation."
            }
          ].map((faq, index) => (
            <div key={index}>
              <h3 className="font-medium text-slate-900 dark:text-white">{faq.question}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'downloads',
      title: 'Downloads',
      icon: <Download className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Product Overview",
              type: "PDF",
              size: "2.4 MB"
            },
            {
              title: "Integration Guide",
              type: "PDF",
              size: "3.1 MB"
            },
            {
              title: "Sample BIM Model",
              type: "RVT",
              size: "45 MB"
            },
            {
              title: "Technical Specifications",
              type: "PDF",
              size: "1.8 MB"
            }
          ].map((download, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{download.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{download.type} • {download.size}</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'glossary',
      title: 'Glossary',
      icon: <Book className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-6">
          {[
            {
              term: "Clash Detection vs Clash Resolution",
              definition: "Clash detection identifies conflicts between building components, while clash resolution is the process of solving these conflicts."
            },
            {
              term: "Rule-based vs AI-based Detection",
              definition: "Rule-based detection uses predefined rules to identify clashes, while AI-based detection learns from historical data to identify and predict potential conflicts."
            },
            {
              term: "Federated Models",
              definition: "A combined BIM model that integrates multiple discipline-specific models (architectural, structural, MEP) into a single coordinated model."
            },
            {
              term: "Geometric vs Semantic Clashes",
              definition: "Geometric clashes involve physical interference between components, while semantic clashes involve logical conflicts in building systems."
            }
          ].map((item, index) => (
            <div key={index}>
              <h3 className="font-medium text-slate-900 dark:text-white">{item.term}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{item.definition}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Resources</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about Clashsense and BIM coordination
          </p>
        </div>

        <div className="space-y-6">
          {resources.map((section) => (
            <Card key={section.id}>
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                {openSections.includes(section.id) ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>
              {openSections.includes(section.id) && (
                <CardContent className="border-t border-slate-200 dark:border-slate-700">
                  {section.content}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;