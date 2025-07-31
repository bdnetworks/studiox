"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare, Building } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send an email or save to a database.
    console.log("Form submitted:", formData);
    toast({
      title: "বার্তা পাঠানো হয়েছে!",
      description: "আমরা আপনার বার্তা পেয়েছি। খুব শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline text-primary">যোগাযোগ</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>যোগাযোগের তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:contact@okkhorsadhona.com" className="text-muted-foreground hover:text-primary">
                  contact@okkhorsadhona.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                 <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  হোয়াটসঅ্যাপে যোগাযোগ করুন
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Building className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">
                  বাড়ি #১০, রোড #৫, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ
                </span>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>আমাদের সামাজিক মাধ্যম</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
                    <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                    <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
                </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>আপনার বার্তা পাঠান</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">আপনার নাম</Label>
                <Input
                  id="name"
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">আপনার ইমেইল</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">আপনার বার্তা</Label>
                <Textarea
                  id="message"
                  placeholder="আপনার বার্তা এখানে লিখুন"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                বার্তা পাঠান
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
