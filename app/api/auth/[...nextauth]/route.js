import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ],
    
    callbacks: {
      async session({session}){
        //store user id from mongodb to the session
        const sessionUser = await User.findOne({email: session.user.email})
        session.user.id = sessionUser._id.toString();
        return session;
      },

      async signIn({account, profile, user, credentials}) {
        try {
          await connectToDB();

          //check user exists
          const userExists = await User.findOne({email: profile.email});
          //if user does not exist create a new user
          if(!userExists){
              await User.create({
                email: profile.email,
                username: profile.name,
                image: profile.picture
              });
          }
          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", error.message)
          return false;
        }
      }
    },

});

export {handler as GET, handler as POST};
