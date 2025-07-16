'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';



export default function Header() {
  const router = useRouter();

  const handleScrollToLogin = () => {
    const loginSection = document.getElementById('login');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center justify-between p-6 border-b border-gray-800">
      <Link href="/" className="text-2xl font-bold text-blue-400">
        JobFit AI
      </Link>
      
      <div className="flex items-center gap-6">
        <Link 
          href="/pricing" 
          className="text-gray-300 hover:text-white transition-colors"
        >
          Pricing
        </Link>
        <Button 
          onClick={handleScrollToLogin}
          variant="primary"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
}