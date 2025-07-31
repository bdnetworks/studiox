import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, PenTool } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto max-w-5xl py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-headline text-primary">আমাদের সম্পর্কে</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ôkkhor Sadhona-তে আপনাকে স্বাগতম!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img src="https://placehold.co/600x400.png" alt="Team working" className="rounded-lg shadow-lg" data-ai-hint="team collaboration" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline">আমাদের পথচলা</h2>
            <p className="text-muted-foreground">
              'Ôkkhor Sadhona' একটি ডিজিটাল প্ল্যাটফর্ম, যার লক্ষ্য বাংলা এবং ইংরেজি ভাষায় টাইপিং দক্ষতা বৃদ্ধি করা। আমরা বিশ্বাস করি, শুদ্ধ এবং দ্রুত টাইপিং বর্তমান ডিজিটাল যুগে একটি অপরিহার্য দক্ষতা। আমাদের এই উদ্যোগটি সকল বাংলা ভাষাভাষী মানুষের জন্য, যারা নিজেদের ডিজিটাল স্বাক্ষরতা বাড়াতে চান।
            </p>
            <p className="text-muted-foreground">
              আমরা আধুনিক প্রযুক্তি এবং কৃত্রিম বুদ্ধিমত্তার সমন্বয়ে একটি সহজ এবং কার্যকর টাইপিং অনুশীলনের পরিবেশ তৈরি করেছি।
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                   <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">আমাদের লক্ষ্য</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  বাংলা টাইপিংকে সহজ, আনন্দদায়ক এবং সকলের জন্য উন্মুক্ত করা, যাতে যে কেউ যেকোনো জায়গা থেকে অনুশীলন করতে পারে।
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                   <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">কাদের জন্য?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  শিক্ষার্থী, পেশাজীবী, লেখক এবং যে কেউ—যারা কম্পিউটারে বাংলা লেখার গতি ও নির্ভুলতা বাড়াতে আগ্রহী।
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                   <PenTool className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">আমাদের প্রযুক্তি</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ব্যবহারকারীদের অনুশীলনের সুবিধার্থে আমরা AI-ভিত্তিক টুলস এবং আধুনিক ওয়েব টেকনোলজি ব্যবহার করি।
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
