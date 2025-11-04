"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig';

type AuthContextValue = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log('Auth state changed:', u);
      setUser(u);
    });
    return unsub;
  }, []);

  const signUp = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log('signUp result', res);
    return res;
  };

  const signIn = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log('signIn result', res);
    return res;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google sign-in failed', err);
      // Common cause during local development: the origin is not listed in Firebase Auth -> Authorized domains
      if (err?.code === 'auth/configuration-not-found' || err?.code === 'auth/unauthorized-domain') {
        // Try redirect fallback (some environments require redirect flows) then surface a helpful message
        try {
          // lazy import redirect helper to avoid unused import when not needed
          const { signInWithRedirect } = await import('firebase/auth');
          await signInWithRedirect(auth, provider);
          return;
        } catch (redirectErr) {
          console.error('Redirect fallback failed', redirectErr);
        }

        // Provide actionable guidance for the developer in the console
        const origin = typeof window !== 'undefined' ? window.location.origin : 'your app origin';
        const help = `Firebase auth configuration not found for origin ${origin}.\n` +
          `Open the Firebase Console -> Authentication -> Settings -> Authorized domains and add ${origin}.\n` +
          `Also verify your firebaseConfig.authDomain matches the value in your Firebase project settings.`;
        // Surface a visible message during development
        if (typeof window !== 'undefined') alert(help);
        throw new Error(help);
      }

      // Re-throw other errors so callers can handle them
      throw err;
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
