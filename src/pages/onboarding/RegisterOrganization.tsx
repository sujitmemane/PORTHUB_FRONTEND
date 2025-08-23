import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrgImg from "@/assets/org.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ApiClient from "@/lib/axios";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters long",
  }),

  contactEmail: z
    .string()
    .email({ message: "Please enter a valid contact email address" }),

  contactPhone: z
    .string()
    .min(10, { message: "Contact phone must be at least 10 digits" })
    .optional()
    .or(z.literal("")),

  principalName: z.string().min(2, { message: "Principal's name is required" }),

  website: z.string().url({
    message: "Please enter a valid website URL starting with https://",
  }),

  street: z.string().min(1, { message: "Street address is required" }),

  city: z.string().min(1, { message: "City name is required" }),

  state: z.string().min(1, { message: "State is required" }),

  postalCode: z
    .string()
    .min(4, { message: "Postal code is required and must be valid" }),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterOrganization() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactEmail: "",
      contactPhone: "",
      principalName: "",
      website: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await ApiClient.post("/organizations", {
        name: data?.name,
        address: {
          street: data?.street,
          city: data?.city,
          state: data?.city,
          postalCode: data?.postalCode,
        },
        contactEmail: data?.contactEmail,
        contactPhone: data?.contactPhone,
        principalName: data?.principalName,
      });

      if (response?.data?.success) {
        toast(response?.data?.message);
        navigate("/dashboard");
      } else {
        toast(response?.data?.message);
      }
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      {/* Left Image */}
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        <img
          src={OrgImg}
          alt="Register Organization Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[500px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register Organization</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter organization details to register.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Organization Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My School" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Email */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contact@school.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Phone */}
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+91-9876543210"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Principal's Name */}
              <FormField
                control={form.control}
                name="principalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. A.P.J. Abdul Kalam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://myschool.edu.in"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Fields in 2-column Grid */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Bangalore" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Karnataka" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="560001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Register Organization
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
