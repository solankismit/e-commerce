import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialProvider from "next-auth/providers/credentials";
import { NextResponse } from 'next/server';


// Helper function to make the API call
const signIn = async (email: string, password: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure this env variable is set
    console.log("signIn",email,password)
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }
  try {
      
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return res;
    } catch (error) {
      console.error('Error during sign-in:', error);
      return NextResponse.json({ message: 'An error occurred during sign-in' }, { status: 500 });
    }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        console.log(credentials,"::::")
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await signIn(credentials.email, credentials.password);
        console.log(res)
        const data = await res.json();
        if (res.ok) {
          const user = data;

           if (user.token) {
            user.accessToken = user.token;
          }
          return user;
        } else {
          if (typeof data?.message === 'string') {
            throw new Error(data.message.replace(/"/g, ''));
          } else {
            throw new Error('An error occurred during sign-in');
          }
          
        }

      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id
        console.log(user)
        token.email = user?.email
        token.name = user?.name
        token.picture = user.image
        if ('accessToken' in user) {
            token.accessToken = user.accessToken;
        }

      }
      
      console.log(token)
      return token
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
