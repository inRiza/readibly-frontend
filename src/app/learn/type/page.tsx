'use client';

import { useState, useEffect, Suspense } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Play, Pause, Settings, X, Minus, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

interface Template {
  id: number;
  title: string;
  category: string;
  content: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: "The Little Red Riding Hood",
    category: "fairytale",
    content: "Once upon a time, there was a little girl who lived in a village near the forest. She was known to everyone as Little Red Riding Hood because of the red cloak she always wore. One day, her mother asked her to take some food to her grandmother who was sick and lived in a house in the forest. Little Red Riding Hood was happy to help and set off on her journey."
  },
  {
    id: 2,
    title: "The Three Little Pigs",
    category: "fairytale",
    content: "There were three little pigs who lived with their mother. One day, their mother told them they were old enough to go out into the world and make their own way. The first pig built his house out of straw, the second pig built his house out of sticks, and the third pig built his house out of bricks."
  },
  {
    id: 3,
    title: "Solar System Facts",
    category: "facts",
    content: "The solar system consists of the Sun and the objects that orbit around it. The Sun is a star at the center of our solar system. There are eight planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Earth is the only planet known to support life."
  }
];

function TypeLearnPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [letterSpacing, setLetterSpacing] = useState(0.1);
  const [fontSizeInput, setFontSizeInput] = useState('18');
  const [letterSpacingInput, setLetterSpacingInput] = useState('0.1');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errors, setErrors] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === parseInt(templateId));
      if (template) {
        setSelectedTemplate(template);
      } else {
        router.push('/learn/templates-type');
      }
    } else {
      router.push('/learn/templates-type');
    }
  }, [templateId, router]);

  useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [autoPlayInterval]);

  const speakText = async (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.includes('en') && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.includes('en')) || voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!typingStarted) {
      setTypingStarted(true);
      setStartTime(Date.now());
    }

    const input = e.target.value;
    setUserInput(input);

    // Check for errors
    const newErrors = [...errors];
    if (input.length > 0) {
      const currentChar = input[input.length - 1];
      const correctChar = selectedTemplate?.content[currentIndex];
      
      if (currentChar !== correctChar) {
        newErrors.push(currentIndex);
      } else {
        const index = newErrors.indexOf(currentIndex);
        if (index > -1) {
          newErrors.splice(index, 1);
        }
      }
    }
    setErrors(newErrors);
    setCurrentIndex(input.length);

    // Check if typing is complete
    if (input.length === selectedTemplate?.content.length) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - (startTime || endTime)) / 60000;
      const totalWords = selectedTemplate.content.split(' ').length;
      const finalWpm = Math.round(totalWords / timeInMinutes);
      const accuracy = Math.round(((selectedTemplate.content.length - newErrors.length) / selectedTemplate.content.length) * 100);
      
      setWpm(finalWpm);
      setAccuracy(accuracy);
      setTypingStarted(false);
      setIsComplete(true);
    }
  };

  const reloadTyping = () => {
    setUserInput('');
    setCurrentIndex(0);
    setErrors([]);
    setIsComplete(false);
    setTypingStarted(false);
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
  };

  const calculateWordAccuracy = (typed: string, correct: string) => {
    let correctChars = 0;
    const maxLength = Math.max(typed.length, correct.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (typed[i] === correct[i]) {
        correctChars++;
      }
    }
    
    return (correctChars / maxLength) * 100;
  };

  const handleFontSizeInput = (value: string) => {
    setFontSizeInput(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 14 && numValue <= 40) {
      setFontSize(numValue);
    }
  };

  const handleLetterSpacingInput = (value: string) => {
    setLetterSpacingInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 0.5) {
      setLetterSpacing(numValue);
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(14, Math.min(40, fontSize + delta));
    setFontSize(newSize);
    setFontSizeInput(newSize.toString());
  };

  const adjustLetterSpacing = (delta: number) => {
    const newSpacing = Math.max(0, Math.min(0.5, letterSpacing + delta * 0.1));
    setLetterSpacing(newSpacing);
    setLetterSpacingInput(newSpacing.toFixed(2));
  };

  if (!selectedTemplate) {
    return null;
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center"
        >
          <div>
            <Link href="/learn/templates-type" className="flex items-center text-gray-600 hover:text-gray-900 mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Link>
            <h1 className="text-3xl font-bold">Typing Practice</h1>
            <p className="text-gray-600 mt-2">Practice typing with the selected template</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{selectedTemplate.title}</h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => speakText(selectedTemplate.content)}
                  className={`flex items-center space-x-2 ${
                    isSpeaking 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-purple-50 text-[#2e31ce] hover:bg-purple-100'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isSpeaking ? 'Stop Reading' : 'Read Word'}</span>
                </Button>
                <Button
                  onClick={reloadTyping}
                  className="bg-purple-50 text-[#2e31ce] hover:bg-purple-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  className="bg-purple-50 text-[#2e31ce] hover:bg-purple-100"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-gray-800 leading-relaxed text-lg mb-8">
                <div 
                  className="font-['OpenDyslexic'] whitespace-pre-wrap"
                  style={{ 
                    fontSize: `${fontSize}px`,
                    letterSpacing: `${letterSpacing}em`
                  }}
                >
                  {selectedTemplate.content.split('').map((char, index) => (
                    <span
                      key={index}
                      className={`
                        ${index === currentIndex ? 'bg-yellow-100' : ''}
                        ${errors.includes(index) ? 'text-red-500' : ''}
                        ${index < currentIndex ? 'text-gray-400' : ''}
                      `}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e31ce] focus:border-transparent ${
                    errors.length > 0 ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Start typing..."
                  autoFocus
                  disabled={isComplete}
                />
              </div>

              {wpm !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 p-6 rounded-lg mt-6"
                >
                  <h3 className="text-lg font-semibold mb-4">Results</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Typing Speed</p>
                      <p className="text-2xl font-bold text-[#2e31ce]">{wpm} WPM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className="text-2xl font-bold text-[#2e31ce]">{accuracy}%</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 right-4 bg-white rounded-lg shadow-lg p-4 w-72 border border-gray-200 z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Typing Settings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Font Size</h3>
                    <span className="text-xs text-gray-500">14px - 40px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustFontSize(-2)}
                      className="border-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      value={fontSizeInput}
                      onChange={(e) => handleFontSizeInput(e.target.value)}
                      className="w-16 text-center border border-gray-200 rounded-md px-2 py-1 text-sm"
                      min="14"
                      max="40"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustFontSize(2)}
                      className="border-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Letter Spacing</h3>
                    <span className="text-xs text-gray-500">0em - 0.5em</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustLetterSpacing(-0.1)}
                      className="border-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      value={letterSpacingInput}
                      onChange={(e) => handleLetterSpacingInput(e.target.value)}
                      step="0.01"
                      className="w-16 text-center border border-gray-200 rounded-md px-2 py-1 text-sm"
                      min="0"
                      max="0.5"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustLetterSpacing(0.1)}
                      className="border-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}

export default function TypeLearnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TypeLearnPageContent />
    </Suspense>
  );
} 