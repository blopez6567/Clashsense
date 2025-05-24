import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Origin has completely transformed how I manage my finances. The smart savings feature helped me save an extra $5,000 this year without even noticing it!",
    author: "Emma Thompson",
    role: "Marketing Director",
    avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    content: "I've tried numerous finance apps, but none compare to Origin. The investment recommendations are spot-on, and the interface is incredibly intuitive.",
    author: "Michael Chen",
    role: "Software Engineer",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    content: "As someone who knew nothing about investing, Origin made it easy to get started. I've already seen a 12% return on my portfolio in just six months!",
    author: "Sarah Johnson",
    role: "Healthcare Professional",
    avatarUrl: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            What our customers are saying
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 dark:text-slate-300 mx-auto">
            Don't just take our word for it — hear from some of our amazing customers
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={testimonial.avatarUrl}
                  alt={testimonial.author}
                />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">{testimonial.author}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;