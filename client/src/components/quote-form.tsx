import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email"),
  date: z.string().min(1, "Please select a date"),
  productRequirement: z.string().min(1, "Please select a product category"),
  numberOfProducts: z.number().min(1, "Number of products must be at least 1"),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function QuoteForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      date: "",
      productRequirement: "",
      numberOfProducts: 1,
      message: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const response = await apiRequest('POST', '/api/quotes', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Submitted Successfully!",
        description: "We will contact you soon with a detailed quote.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    submitQuoteMutation.mutate(data);
  };

  return (
    <section id="quote" className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get Quote</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Quick Quote via WhatsApp</h3>
              <p className="text-light-gray mb-6">Get instant quotes and personalized recommendations directly through WhatsApp</p>
              <a 
                href="https://wa.me/916366239811?text=Hi, I'm interested in car accessories. Please send me a quote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all btn-interactive magnetic-hover text-lg font-semibold"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                </svg>
                Get Quote on WhatsApp
              </a>
            </div>
          </div>
          
          <Card className="product-card rounded-2xl p-8">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your Name"
                              className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your Phone"
                              className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                            />
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
                          <FormLabel className="text-white">Email id</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Your Email"
                              className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="productRequirement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Product Requirement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange">
                              <SelectValue placeholder="Select Product Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="audio-system">Audio System</SelectItem>
                            <SelectItem value="led-headlights">LED Headlights</SelectItem>
                            <SelectItem value="dash-camera">Dash Camera</SelectItem>
                            <SelectItem value="seat-covers">Seat Covers</SelectItem>
                            <SelectItem value="sun-film">Sun Film</SelectItem>
                            <SelectItem value="other-accessories">Other Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="numberOfProducts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">No. Of Products Required</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Quantity"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Additional details about your requirements"
                            rows={4}
                            className="bg-secondary-dark border-gray-600 text-white focus:border-accent-orange resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={submitQuoteMutation.isPending}
                    className="w-full bg-accent-orange text-white py-3 rounded-lg hover:bg-accent-orange-light transition-colors font-medium"
                  >
                    {submitQuoteMutation.isPending ? "Submitting..." : "Get Quote"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
