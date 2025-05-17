import React, { useEffect } from 'react';
import './App.css';
import Login from './login';
import Signup from './Signup';
import Home from './Home';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Progress bar component that shows scroll progress
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 z-50 origin-left"
      style={{ scaleX }}
    />
  );
}

// Auth wrapper component with animations
function AuthWrapper({ children }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full pt-10 pb-20 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: "2s" }}></div>
      
      <motion.h1 
        className="font-display text-6xl md:text-8xl text-gradient font-bold mb-8 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        Puzzlex
      </motion.h1>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </motion.div>
  );
}

// Animation wrapper for page transitions
function AnimatedRoutes() {
  const location = useLocation();
  
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    out: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="w-full"
          >
            <Home />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div 
            className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex justify-center"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
          >
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          </motion.div>
        } />
        <Route path="/signup" element={
          <motion.div 
            className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex justify-center"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
          >
            <AuthWrapper>
              <Signup />
            </AuthWrapper>
          </motion.div>
        } />
        {/* Add more routes as needed */}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ProgressBar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;