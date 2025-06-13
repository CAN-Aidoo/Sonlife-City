import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AccountPage = () => {
  useEffect(() => {
    document.title = "Account - Sonlife City Church HQ";
  }, []);

  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      toast({
        title: "Sign in successful",
        description: "Welcome back to Sonlife City Church",
      });
    } else {
      toast({
        title: "Registration successful",
        description: "Welcome to Sonlife City Church! Please check your email to verify your account.",
      });
    }
  };

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-sonlife-blue to-blue-700 py-24 mt-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Account</h1>
            <p className="text-xl text-white/90">Sign in to your account or create a new one.</p>
          </div>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto glass p-8 rounded-xl shadow-xl">
            <Tabs defaultValue="login" onValueChange={(value) => setIsLogin(value === "login")}> 
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-sonlife-blue hover:underline">Forgot Password?</a>
                    </div>
                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full bg-sonlife-blue hover:bg-sonlife-blue/90 text-white">Sign In</Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long.</p>
                  </div>
                  <Button type="submit" className="w-full bg-sonlife-blue hover:bg-sonlife-blue/90 text-white">Create Account</Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-700">
              <p>
                By signing in or creating an account, you agree to our{" "}
                <a href="#" className="text-sonlife-blue hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-sonlife-blue hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AccountPage;
