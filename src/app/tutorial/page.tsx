import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function TutorialPage() {
  const steps = [
    {
      title: "ভাষা নির্বাচন করুন",
      description: "প্রথমে, 'বাংলা' অথবা 'English' ভাষা নির্বাচন করুন। আপনার পছন্দের ভাষায় টাইপিং অনুশীলন করতে পারবেন।",
    },
    {
      title: "অনুচ্ছেদ বাছাই করুন",
      description: "এরপর, ড্রপডাউন মেনু থেকে আপনার পছন্দের গল্প বা কবিতা বাছাই করুন। প্রতিটি অনুচ্ছেদের একটি শিরোনাম রয়েছে।",
    },
    {
      title: "সময় নির্ধারণ করুন",
      description: "আপনার অনুশীলনের জন্য সময়সীমা (যেমন ৩০ সেকেন্ড, ১ মিনিট, ২ মিনিট) নির্ধারণ করুন।",
    },
    {
      title: "টাইপিং শুরু করুন",
      description: "'Start typing here...' লেখা বক্সে ক্লিক করে টাইপ করা শুরু করুন। টাইপ করার সাথে সাথে টাইমার চালু হয়ে যাবে।",
    },
    {
      title: "ফলাফল দেখুন",
      description: "সময় শেষ হলে অথবা অনুচ্ছেদটি সম্পূর্ণ টাইপ করা হয়ে গেলে, আপনি আপনার টাইপিং স্পিড (WPM), নির্ভুলতা (Accuracy) এবং ভুলের সংখ্যা দেখতে পাবেন।",
    },
    {
      title: "পুনরায় চেষ্টা করুন",
      description: "'Reset' বা 'Try Again' বোতামে ক্লিক করে আপনি যেকোনো সময় অনুশীলনটি পুনরায় শুরু করতে পারবেন।",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-4xl font-headline text-primary mb-8 text-center">
        কিভাবে ব্যবহার করবেন?
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">ব্যবহার নির্দেশিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Ôkkhor Sadhona অ্যাপটি ব্যবহার করা খুবই সহজ। দ্রুত এবং নির্ভুলভাবে টাইপিং শিখতে নিচের ধাপগুলো অনুসরণ করুন।
          </p>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
