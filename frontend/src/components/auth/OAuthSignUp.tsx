"use client";

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
import useApiRequest from "@/hooks/useApiRequest";
import { API_URL } from "@/lib/constants";

const OAuthSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const {
    makeRequest,
    data,
    isLoading: apiLoading,
    error: apiError,
  } = useApiRequest<{ message: string; errors: { [key: string]: string } }>();

  const handleSubmit = async (values: registerPayload) => {
    setIsLoading(true);
    setErrors(null);

    try {
      const response = await makeRequest({
        method: "POST",
        url: `${API_URL}/auth/register`,
        data: values,
      });
      console.log(response, data);
      if (data?.message) {
        console.log("Registration successful");
      }
    } catch (error: any) {
      console.error("An unexpected error occurred:", error);

      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Failed to extract error details:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    phone: z.string().optional(),
    password: z.string().min(6),
    street: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    isAdmin: z.boolean().optional(),
  });

  type registerPayload = z.infer<typeof registerSchema>;

  const form = useForm<registerPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      street: "",
      apartment: "",
      city: "",
      zip: "",
      country: "",
      isAdmin: false,
    },
  });

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} required />
              </FormControl>
              <FormMessage>
                {apiError?.email && (
                  <span style={{ color: "red" }}>{apiError.email}</span>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
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
        <FormField
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Street" {...field} />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <FormField
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment</FormLabel>
              <FormControl>
                <Input placeholder="Apartment" {...field} />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <FormField
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <FormField
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip</FormLabel>
              <FormControl>
                <Input placeholder="Zip" {...field} />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <FormField
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />{" "}
              {/* Add FormMessage for potential error display */}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || apiLoading}>
          {isLoading || apiLoading ? "Signing up..." : "Sign Up"}
        </Button>
        {/* {apiError && <p style={{ color: "red" }}>{apiError}</p>} */}
        {/* Display error message */}
      </form>
    </Form>
  );
};

export default OAuthSignUp;
