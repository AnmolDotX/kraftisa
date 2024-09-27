"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

const Particle = ({ index }: { index: number }) => (
  <motion.div
    key={index}
    className="absolute rounded-full bg-blue-500 opacity-20"
    style={{
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
    }}
    animate={{
      x: Math.random() * window?.innerWidth,
      y: Math.random() * window?.innerHeight,
    }}
    transition={{
      duration: Math.random() * 10 + 20,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Bana raha hoon bhai! 😀 COMING SOON!";

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= fullText.length; i++) {
        setTypedText(fullText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };
    typeText();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Kraftisa AI
      </motion.h1>

      <motion.div
        className="text-2xl md:text-4xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {typedText}
      </motion.div>

      <AnimatePresence>
        {!isSubmitted ? (
          <motion.form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              type="email"
              placeholder="Enter your email for updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-64 md:w-80 bg-gray-800 text-white border-gray-700"
            />
            <Button
              type="submit"
              className="w-64 md:w-80 bg-blue-600 hover:bg-blue-700"
            >
              Stay Updated
            </Button>
          </motion.form>
        ) : (
          <motion.div
            className="text-xl text-green-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Thank you for subscribing!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
