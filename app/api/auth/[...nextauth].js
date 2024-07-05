// import NextAuth from "next-auth";
// import { CredentialsProvider } from "next-auth/providers";
// import bcrypt from "bcrypt"
// import dbConnect from "@/config/dbConnect";
// export const authOptions = {
//   session:{
//     strategy:"jwt"
//   },
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials, req){
//         dbConnect();
//         const {email, password} = credentials;
//         const user = await user.findOne({email})
//         if(!user){
//           throw new Error("Invalid Email or Password")
//         }
//         const isPasswordMatched = await bcrypt.compare(password, user.password)
//         if(!isPasswordMatched){
//           throw new Error("Invalid Email or Password")
//         }
//         return user;
//       }
//     }),
//     // ...add more providers here
//   ],
//   pages:{
//     signIn:'/login',
//   },
//   secret:process.env.NEXTAUTH_SECRET,
// }
// export default NextAuth(authOptions)