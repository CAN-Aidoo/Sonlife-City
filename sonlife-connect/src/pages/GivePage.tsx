import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Globe, Home, Gift, ChevronRight, CheckCircle, Landmark, CreditCard, Smartphone, Building, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { initializePayment, generateTransactionReference } from "@/lib/paystack";
import { donationsService } from "@/services/donations";
import type { Donation } from "@/lib/supabase";

const donationFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens and apostrophes." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must not exceed 255 characters." }),
  amount: z.string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number."
    })
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0."
    })
    .refine((val) => Number(val) <= 1000000, {
      message: "Amount must not exceed 1,000,000."
    }),
  givingType: z.enum(["tithe", "missions", "building", "outreach"], {
    required_error: "Please select a giving type."
  }),
  frequency: z.enum(["one-time", "weekly", "monthly"], {
    required_error: "Please select a giving frequency."
  }),
  currency: z.enum(["GHS", "USD"], {
    required_error: "Please select a currency."
  })
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

// Different amounts based on currency
const predefinedAmounts = {
  GHS: ["20", "50", "100", "200", "500", "1000"],
  USD: ["5", "10", "20", "50", "100", "200"]
};

const currencySymbols = {
  GHS: "₵",
  USD: "$"
};

const GivePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<"GHS" | "USD">("GHS");
  
  useEffect(() => {
    document.title = "Give - Sonlife City Church HQ";
  }, []);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      givingType: "tithe",
      frequency: "one-time",
      currency: "GHS"
    }
  });

  // Watch the currency field to update predefined amounts
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "currency" && value.currency) {
        setCurrentCurrency(value.currency as "GHS" | "USD");
        // Reset amount when currency changes
        form.setValue("amount", "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: DonationFormValues) => {
    setIsLoading(true);
    const reference = generateTransactionReference();
    const amount = Number(parseFloat(values.amount).toFixed(2));

    try {
      await initializePayment({
        email: values.email.trim(),
        amount,
        ref: reference,
        currency: values.currency,
        metadata: {
          name: values.name.trim(),
          giving_type: values.givingType,
          frequency: values.frequency,
          currency: values.currency,
        },
        onSuccess: async () => {
          try {
            await donationsService.createDonation({
              email: values.email.trim(),
              amount,
              reference,
              giving_type: values.givingType,
              frequency: values.frequency,
              status: "completed",
              currency: values.currency,
              name: values.name.trim(),
            });
            form.reset();
            setIsLoading(false);
            window.location.href = `/donation/success?reference=${reference}`;
          } catch (error) {
            toast({
              title: "Database Error",
              description: "Donation was successful but could not be saved. Please contact support.",
              variant: "destructive",
            });
            setIsLoading(false);
          }
        },
        onCancel: () => {
          toast({
            title: "Payment Cancelled",
            description: "You can try the donation process again when you're ready.",
            variant: "default",
          });
          setIsLoading(false);
        },
      });
    } catch (error) {
      let errorMessage = "An error occurred while processing your donation. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('Failed to load Paystack script')) {
          errorMessage = "Payment error: Failed to load Paystack script. Please check your internet connection or disable any ad blockers, then try again.";
        } else if (error.message.includes('Missing Paystack public key')) {
          errorMessage = "Payment error: Paystack public key is missing. Please contact support.";
        } else {
          errorMessage = error.message;
        }
      }
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const renderGivingTypeIcon = (type: Donation['giving_type']) => {
    switch (type) {
      case "tithe": return <Heart className="h-5 w-5 text-yellow-banana" />;
      case "missions": return <Globe className="h-5 w-5 text-yellow-banana" />;
      case "building": return <Home className="h-5 w-5 text-yellow-banana" />;
      case "outreach": return <Gift className="h-5 w-5 text-yellow-banana" />;
    }
  };

  const handleAmountClick = (value: string) => {
    form.setValue("amount", value);
  };

  const currencySymbol = currencySymbols[currentCurrency];

  return (
    <PageLayout>
      {/* Fixed Background Image with gradient overlay - same as Index page */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(12, 28, 68, 0.6), rgba(22, 78, 142, 0.4)), url('/lovable-uploads/a78d0457-40c8-4f1f-997d-b60af9316471.png')"
        }}
      />
      {/* Floating Elements with improved visibility - same as Index page */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute h-5 w-5 rounded-full bg-sonlife-gold/90 top-1/4 left-1/5 animate-float" />
        <div className="absolute h-8 w-8 rounded-full bg-picton-blue/80 bottom-1/3 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute h-4 w-4 rounded-full bg-morning-blue/90 top-1/2 right-1/5 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute h-6 w-6 rounded-full bg-sonlife-gold/80 bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 space-y-12 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-persian-blue/15 text-persian-blue rounded-full shadow-sm">
              Give with a Grateful Heart
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-serif font-bold text-persian-blue">
              Kingdom <span className="text-gradient-gold">Giving</span>
            </h1>
            <p className="mt-5 text-college-blue/90 text-lg font-medium">
              "Giving remains a major kingdom key to the manifestation and multiplication of God's blessings in the lives of His people." - Rev Francis Adjapong
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-8 text-persian-blue">Why We Give</h2>
              <div className="prose prose-lg">
                <p className="italic text-college-blue/90 mb-6 text-lg">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                </p>
                <p className="italic text-college-blue/90 mb-6 text-lg">
                  "Honor the Lord with your wealth and with the best part of everything you produce." - Proverbs 3:9
                </p>
                <p className="italic text-college-blue/90 text-lg">
                  "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you." - Luke 6:38
                </p>
              </div>

              <div className="mt-10 space-y-6">
                <div className="glass p-6 rounded-xl border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-persian-blue/15 rounded-xl flex items-center justify-center mr-4 shrink-0">
                      <Heart className="h-6 w-6 text-persian-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-persian-blue">Tithes & Offerings</h3>
                      <p className="text-college-blue/90">
                        Support the ongoing work and ministry of Sonlife City Church through your faithful giving.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-accent p-6 rounded-xl border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-picton-blue/15 rounded-xl flex items-center justify-center mr-4 shrink-0">
                      <Globe className="h-6 w-6 text-picton-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-persian-blue">Missions Support</h3>
                      <p className="text-college-blue/90">
                        Help spread the Gospel globally by contributing to our international mission work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-persian-blue/15 rounded-xl flex items-center justify-center mr-4 shrink-0">
                      <Home className="h-6 w-6 text-persian-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-persian-blue">Building Fund</h3>
                      <p className="text-college-blue/90">
                        Contribute to the expansion and maintenance of our church facilities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-accent p-6 rounded-xl border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-banana/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                      <Gift className="h-6 w-6 text-sonlife-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-persian-blue">Outreach Programs</h3>
                      <p className="text-college-blue/90">
                        Support our community initiatives to help those in need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card className="shadow-lg bg-morning-blue/95 backdrop-blur-md border border-middle-blue/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-persian-blue">Make a Donation</CardTitle>
                  <CardDescription className="text-college-blue/90">Fill the form below to complete your donation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-persian-blue font-medium">Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} className="bg-morning-blue/80 border-middle-blue/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-persian-blue font-medium">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field} className="bg-morning-blue/80 border-middle-blue/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-persian-blue font-medium">Select Currency</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full bg-morning-blue/80 border-middle-blue/50">
                                    <SelectValue placeholder="Select Currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-morning-blue border-middle-blue/50">
                                  <SelectItem value="GHS">Ghana Cedis (GHS)</SelectItem>
                                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-persian-blue font-medium">Select Amount ({currencySymbol})</FormLabel>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
                              {predefinedAmounts[currentCurrency].map((value) => (
                                <Button
                                  key={value}
                                  type="button"
                                  variant={field.value === value ? "default" : "outline"}
                                  className={`${
                                    field.value === value
                                      ? "bg-persian-blue hover:bg-persian-blue/90 text-morning-blue"
                                      : "border-persian-blue text-persian-blue bg-morning-blue/50"
                                  }`}
                                  onClick={() => handleAmountClick(value)}
                                >
                                  {currencySymbol}{value}
                                </Button>
                              ))}
                            </div>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                                <Input 
                                  placeholder="Enter custom amount" 
                                  className="pl-8 bg-morning-blue/80 border-middle-blue/50" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="givingType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-persian-blue font-medium">Give To</FormLabel>
                              <FormControl>
                                <RadioGroup 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  {[
                                    { value: "tithe", label: "Tithes & Offerings" },
                                    { value: "missions", label: "Missions Support" },
                                    { value: "building", label: "Building Fund" },
                                    { value: "outreach", label: "Community Outreach" }
                                  ].map((item) => (
                                    <div key={item.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-middle-blue/30">
                                      <RadioGroupItem value={item.value} id={item.value} />
                                      <FormLabel htmlFor={item.value} className="flex items-center gap-2 cursor-pointer font-normal text-college-blue">
                                        {renderGivingTypeIcon(item.value as Donation['giving_type'])}
                                        {item.label}
                                      </FormLabel>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="frequency"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-persian-blue font-medium">Frequency</FormLabel>
                              <FormControl>
                                <RadioGroup 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  {[
                                    { value: "one-time", label: "One-Time Gift" },
                                    { value: "weekly", label: "Weekly" },
                                    { value: "monthly", label: "Monthly" }
                                  ].map((item) => (
                                    <div key={item.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-middle-blue/30">
                                      <RadioGroupItem value={item.value} id={item.value} />
                                      <FormLabel htmlFor={item.value} className="cursor-pointer font-normal text-college-blue">
                                        {item.label}
                                      </FormLabel>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button 
                        type="submit"
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-2 h-12 text-base"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing Donation...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>Proceed to Payment</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pt-0">
                  <div className="flex items-center text-sm text-college-blue/90 justify-center gap-2 mt-4">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All donations are secure and encrypted</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <img src="/paystack-badge.png" alt="Secured by Paystack" className="h-8" />
                    <img src="/pci-dss-badge.png" alt="PCI DSS Compliant" className="h-8" />
                  </div>
                </CardFooter>
              </Card>

              <div className="mt-8">
                <Card className="bg-morning-blue/95 backdrop-blur-md border border-middle-blue/40 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-persian-blue">Other Ways to Give</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-morning-blue/80 rounded-lg border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <h3 className="text-lg font-bold mb-3 text-persian-blue">In Person</h3>
                        <p className="text-college-blue/90">
                          You can give during our Sunday services by placing your gift in the offering basket.
                        </p>
                      </div>
                      <div className="text-center p-6 bg-morning-blue/80 rounded-lg border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <h3 className="text-lg font-bold mb-3 text-persian-blue">By Mail</h3>
                        <p className="text-college-blue/90">
                          Send a check to: Sonlife City Church<br />
                          123 Church Street, City, State 12345
                        </p>
                      </div>
                      <div className="text-center p-6 bg-morning-blue/80 rounded-lg border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <h3 className="text-lg font-bold mb-3 text-persian-blue">Bank Transfer</h3>
                        <p className="text-college-blue/90">
                          Set up recurring giving through your bank's bill pay or direct deposit system.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-middle-blue/50" />

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-4 text-persian-blue">
              Your Giving Makes a <span className="text-gradient-gold">Difference</span>
            </h2>
            <p className="text-college-blue/90 text-lg">
              Thank you for your generosity and support of Sonlife City Church. 
              Your financial contributions help us fulfill our mission to serve 
              our community and spread the Gospel of Jesus Christ.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GivePage;
