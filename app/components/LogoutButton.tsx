'use client';

import { signOut } from 'firebase/auth';

import { auth } from '../lib/firebaseClient';

export const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };
