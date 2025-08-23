import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginImg from "@/assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import ApiClient from "@/lib/axios";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
});

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await ApiClient.post("/auth/sign-in", {
        email: values?.email,
        password: values.email,
      });

      if (response?.data?.success) {
        sessionStorage.setItem(
          "accessToken",
          response?.data?.data?.accessToken
        );

        if (
          response?.data?.data?.role === "ADMIN" &&
          !response?.data?.data?.isOrganizationConfigured
        ) {
          toast("You are admin and organization is not configured yet");
          navigate("/onboarding/organization");
        } else {
          toast(response?.data?.message);
          navigate("/dashboard/students");
        }

        setUser({
          name: response?.data?.data?.name,
          email: response?.data?.data?.email,
          role: response?.data?.data?.role,
          organization: response?.data?.data?.organization,
        });
      } else {
        toast(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "Network error");
    }
  }
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2 ">
      {/* Left-side illustration */}
      <div className="hidden lg:block">
        <img
          src={LoginImg}
          alt="Login Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>

      {/* Right-side login form */}
      <div className="flex flex-col items-center justify-center p-6 lg:p-10 bg-[#121212]">
        <div className="mx-auto w-full max-w-lg space-y-6">
          {/* Porthub Logo */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl font-extrabold text-[#FFCC00]">Port</span>
            <span className="bg-[#FFCC00] text-black text-4xl font-extrabold px-3 py-1 rounded-sm">
              hub
            </span>
          </div>

          {/* Tagline / Header */}
          <div className="space-y-2 text-center">
            {/* <h1 className="text-3xl font-bold text-[#FFCC00]">
              Let’s get you logged in… fast 😏
            </h1> */}
            <p className="text-gray-300">
              Enter your email and password to show off your portfolio.
            </p>
          </div>

          {/* Form Card */}
          <div className="p-8 rounded-2xl shadow-xl space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FFCC00]">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                          className="
            w-full
            bg-white
            border border-gray-300

            px-4 py-3
            text-gray-900
            placeholder-gray-400
            focus:outline-none
            focus:border-[#FFCC00]
            focus:ring-2
            focus:ring-[#FFCC00]/50
            transition-all
            duration-300
            ease-in-out
          "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FFCC00]">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                          className="
            w-full
            bg-white
            border border-gray-300

            px-4 py-3
            text-gray-900
            placeholder-gray-400
            focus:outline-none
            focus:border-[#FFCC00]
            focus:ring-2
            focus:ring-[#FFCC00]/50
            transition-all
            duration-300
            ease-in-out
          "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#FFCC00] text-black font-bold hover:bg-[#FFD633] transition-all transform hover:scale-105"
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </div>

          {/* Footer / Sign up link */}
          <div className="text-center text-sm text-gray-300">
            First time here?{" "}
            <Link
              to="/auth/sign-up"
              className="font-medium text-[#FFCC00] hover:underline"
            >
              Get your work noticed 😉
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
