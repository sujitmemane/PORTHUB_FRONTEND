import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterImg from "@/assets/register.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ApiClient from "@/lib/axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(20),
});

export default function Register() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await ApiClient.post("/auth/sign-up", {
        name: data?.name,
        email: data?.email,
        password: data?.email,
      });

      if (response?.data?.success) {
        sessionStorage.setItem(
          "accessToken",
          response?.data?.data?.accessToken
        );
        toast(response?.data?.message);
        navigate("/onboarding/");
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
          src={RegisterImg}
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
              Create an account… and get noticed 😏
            </h1> */}
            <p className="text-gray-300">
              Enter your details to sign up and show off your skills.
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
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      {/* Label */}
                      <FormLabel className="text-[#FFCC00] text-sm font-semibold mb-1 uppercase tracking-wide">
                        Name
                      </FormLabel>

                      {/* Input */}
                      <FormControl>
                        <Input
                          placeholder="Sunny Leone"
                          type="text"
                          {...field}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
                        />
                      </FormControl>

                      {/* Error / message */}
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      {/* Label */}
                      <FormLabel className="text-[#FFCC00] text-sm font-semibold mb-1 uppercase tracking-wide">
                        Email
                      </FormLabel>

                      {/* Input */}
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
                        />
                      </FormControl>

                      {/* Error / message */}
                      <FormMessage className="text-xs text-red-500 mt-1" />
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
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
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
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>

          {/* Footer / Sign up link */}
          <div className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              className="font-medium text-[#FFCC00] hover:underline"
            >
              Sign In 😉
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
