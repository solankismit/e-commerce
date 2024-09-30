"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const OAuthSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | String>(null);

  const handleSubmit = async (values: loginPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      console.log("RESULT ", result);
      if (result?.error) {
        // Handle error

        setError(result.error);
      } else if (result?.ok) {
        // Successful login
        console.log("Login successful");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  type loginPayload = z.infer<typeof loginSchema>;

  const form = useForm<loginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      {" "}
      {/* Wrap the form with Radix UI's Form component */}
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} required />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Display error message */}
      </form>
    </Form>
  );
};

export default OAuthSignIn;
