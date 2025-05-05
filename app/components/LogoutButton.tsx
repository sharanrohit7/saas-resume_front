'use client';

import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebaseClient';

export const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };
