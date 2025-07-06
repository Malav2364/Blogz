import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import Button from '../components/ui/button';
import AuthLayout from '../components/AuthLayout';
import { Checkbox } from '../components/ui/checkbox';
import Logo from '../components/Logo';
import { Mail, Lock, ArrowRight, Github, Globe, User } from 'lucide-react';

const SignupPage = () => {
  return (
    <AuthLayout imageUrl="https://images.unsplash.com/photo-1585241936939-be4099591252?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
      <div className="w-full max-w-sm mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mt-6">Create Account</h1>
          <p className="text-slate-500 mt-2">Sign up to get started</p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input id="name" type="text" placeholder="Enter your full name" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input id="password" type="password" placeholder="Create a password" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input id="confirm-password" type="password" placeholder="Confirm your password" className="pl-10" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
            Sign Up <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>

        </div>
        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-cyan-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
