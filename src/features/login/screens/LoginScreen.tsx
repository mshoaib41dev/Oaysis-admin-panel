"use client";
import { Button } from "@/features/common/components/atoms/button";
import { Input } from "@/features/common/components/atoms/input";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
// import { LogoCover } from "@/assets/images";
import { loginSchema } from "@/features/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/common/components/atoms/form";
import { login } from "../actions/login-actions";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    const payload = {
      email: data.username,
      password: data.password,
    };
    // setLoading(true);
    try {
      const result = await login(payload);
      if (result.success) {
        toast({
          title: "Congratulations",
          description: "User Logged In Successfully",
        });

        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: result.message,
        });
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      // toast({
      //   variant: 'destructive',
      //   title: 'Login Failed',
      //   description: errorMessage,
      // });
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white">
      {/* Left side with illustration */}
      {/* <div className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/assets/images/login.png"
              alt="Login illustration"
              className="dark:invert"
              width={400}
              height={500}
            />
          </div>
        </div> */}

      <div className="w-full max-w-md mx-auto space-y-6 -mt-20">
        <div className="space-y-2 text-center mb-5">
          <Image
            src="/assets/Images/logo.png"
            alt="Login illustration"
            width={50}
            height={50}
            className="w-[150px] h-[100px] ml-[13vw]"
          />

          <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email / User Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email / user name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full h-14 !mt-10 !bg-gradient-to-r from-[#0290BE]  to-[#0DBF91] text-white hover:bg-emerald-600"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
