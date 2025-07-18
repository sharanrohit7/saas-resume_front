// // components/LoginCard.tsx
// "use client";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../lib/firebaseClient";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { signInUser, User } from "../api/auth,";

// export default function LoginCard() {
//     const router = useRouter();
//   const handleLogin = async () => {
//     try {
//       const { user } = await signInWithPopup(auth, provider);
//       console.log("✅ Login successful", {
//        user
//       });
//       const firebaseIdToken = await user.getIdToken();
//       const signInData : User ={
//         email: user.email || "",
//         firebaseUID: user.uid,
//         photoURL: user.photoURL || "",
//         authProvider: "GOOGLE",
//         country: "IN",
//       }
//       console.log("SignIn Data:", signInData);
      
//       await signInUser(signInData)
//       console.log("Firebase ID Token:", firebaseIdToken);
//       router.push("/dashboard");
//     } catch (error) {
//       console.error("❌ Login failed:",error);
//     }
//   };

//   return (
//     <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
//       <h2 className="text-3xl font-bold mb-8 text-center text-white">Get Started</h2>
//       <div className="space-y-4">
//         <button
//           className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
//           onClick={handleLogin}
//         >
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
//           </svg>
//           Continue with Google
//         </button>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-600"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
//           </div>
//         </div>

//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-300">Email</label>
//             <input
//               type="email"
//               className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-3 focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-300">Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-3 focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>

//       <p className="mt-6 text-center text-sm text-gray-400">
//         Already have an account?{" "}
//         <Link href="#" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }


"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebaseClient";
import { useRouter } from "next/navigation";
import { signInUser, User } from "../api/auth";
import { useState } from "react";

export default function LoginCard() {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      // const firebaseIdToken = await user.getIdToken();
      console.log(user)
      const signInData: User = {
        email: user.email || "",
        firebaseUID: user.uid,
        photoURL: user.photoURL || "",
        authProvider: "GOOGLE",
        country: "IN",
      };

      await signInUser(signInData);
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Google Login failed:", error);
      setError("Google login failed. Please try again.");
    }
  };

  

  return (
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Get Started</h2>
      <div className="space-y-4">
        <button
          className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
          </svg>
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          {/* <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
          </div> */}
        </div>

        {/* <form className="space-y-4" onSubmit={handleEmailSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-3 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-3 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Sign Up with Email
          </button>
        </form> */}

        {error && (
          <div className="text-red-400 text-sm mt-2 text-center">{error}</div>
        )}
      </div>

      {/* <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="#login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
          Log in
        </Link>
      </p> */}
    </div>
  );
}
