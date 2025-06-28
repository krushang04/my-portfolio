"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RainbowButton } from "@/components/ui/rainbowbutton";
import { Mail, Phone, MapPin } from "lucide-react";
import { Profile } from "@/lib/api";
import ContentContainer from "@/components/layout/ContentContainer";

interface ContactProps {
  profile?: Profile | null;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    // In a real application, you would send the form data to your backend or a form service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitResult({
        success: true,
        message: "Your message has been sent successfully! I'll get back to you soon."
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitResult({
        success: false,
        message: "Sorry, there was an error sending your message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Get In Touch
        </h2>
        
        <ContentContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Let&apos;s Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Feel free to reach out for collaboration, job opportunities, or just to say hello. I&apos;m always open to discussing new projects and ideas.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-black dark:bg-black rounded-full p-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {profile?.email || "hello@yourname.com"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-black dark:bg-black rounded-full p-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+1 (123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-black dark:bg-black rounded-full p-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {profile?.location || "San Francisco, CA"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-50/20 dark:bg-black/10 backdrop-blur-sm p-8 rounded-lg shadow-md border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Send Me a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <div>
                <RainbowButton
                  type="submit"
                  variant="default"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </RainbowButton>
              </div>
              
              {submitResult && (
                <div className={`mt-4 p-3 rounded text-sm ${
                  submitResult.success ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {submitResult.message}
                </div>
              )}
            </form>
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};

export default Contact; 