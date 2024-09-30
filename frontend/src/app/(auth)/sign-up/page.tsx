import Link from "next/link";
import OAuthSignIn from "@/components/auth/OAuthSignIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import OAuthSignUp from "@/components/auth/OAuthSignUp";

export default async function SignUpPage() {
  return (
    <div className="mx-auto">
      <Card className="w-[90vw] max-h-[80vh] overflow-y-scroll md:max-h-[90vh] xl:w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1">
          <OAuthSignUp />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 inline-block">Already have an account?</span>
            <Link
              aria-label="Sign in"
              href="/sign-in"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
