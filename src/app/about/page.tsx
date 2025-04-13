'use client';

import { motion } from 'framer-motion';
import { BookOpen, Headphones, Brain, Users, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e31ce]/5 to-purple-500/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Making Reading Accessible for Everyone
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're on a mission to break down barriers in reading and learning for people with dyslexia worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <Target className="h-12 w-12 text-[#2e31ce]" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-8">
              The Challenge We're Addressing
            </h2>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <p className="text-gray-600 mb-4">
                Dyslexia affects approximately 10% of the world's population, making traditional reading methods a significant challenge. 
                This learning difference can impact education, career opportunities, and overall quality of life.
              </p>
              <p className="text-gray-600">
                Many individuals with dyslexia face barriers in accessing information, learning new skills, and participating fully in academic 
                and professional environments. Traditional reading tools often don't accommodate their unique learning needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <Lightbulb className="h-12 w-12 text-[#2e31ce]" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Innovative Solution
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#2e31ce]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">PDF Reader</h3>
                <p className="text-gray-600 text-center">
                  Advanced PDF reading tools with customizable text display and reading assistance features.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <Headphones className="h-8 w-8 text-[#2e31ce]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Speech to Text</h3>
                <p className="text-gray-600 text-center">
                  Real-time speech-to-text conversion with natural language processing capabilities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-[#2e31ce]" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Learning Center</h3>
                <p className="text-gray-600 text-center">
                  Interactive learning tools and templates designed for different learning styles.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <Users className="h-12 w-12 text-[#2e31ce]" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Profile Picture</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Stefany Josefina Santoso</h3>
                <p className="text-[#2e31ce] font-medium">Business Analyst</p>
                <p className="text-gray-600 mt-2">
                  Driving business strategy and user experience optimization
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Profile Picture</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Muhammad Rizain Firdaus</h3>
                <p className="text-[#2e31ce] font-medium">Full Stack & UI/UX Developer</p>
                <p className="text-gray-600 mt-2">
                  Crafting seamless user experiences and robust technical solutions
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Profile Picture</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Muhammad Fadhlan Karimuddin</h3>
                <p className="text-[#2e31ce] font-medium">Backend Developer</p>
                <p className="text-gray-600 mt-2">
                  Building scalable and efficient backend systems
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}