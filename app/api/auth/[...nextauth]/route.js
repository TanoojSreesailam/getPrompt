import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  debug: true, // Enable debugging during development
  callbacks: {
    async signIn({ profile }) {
      try {
        console.log("Sign-in attempt for:", profile?.email);

        // Connect to the database
        await connectToDB();
        console.log("Connected to DB");

        // Check if the user exists
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          // Create a new user
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(), // Ensure unique usernames
            image: profile.picture,
          });
          console.log("New user created:", profile.email);
        } else {
          console.log("User already exists:", profile.email);
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Reject sign-in
      }
    },

    async session({ session }) {
      try {
        await connectToDB();

        // Find the user and attach their ID to the session
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
