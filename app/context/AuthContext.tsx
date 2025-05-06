"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User, onIdTokenChanged, getIdToken } from "firebase/auth";

import nookies from "nookies";
import { auth } from "../lib/firebaseClient";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setToken(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        setUser(firebaseUser);
        const freshToken = await getIdToken(firebaseUser, true);
        setToken(freshToken);
        nookies.set(undefined, "token", freshToken, { path: "/" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
