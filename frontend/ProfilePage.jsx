import React from 'react';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center">
      <LoginForm />
    </div>
  );
}