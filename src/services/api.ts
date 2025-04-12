const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://readibly-backend-production.up.railway.app' 
    : 'http://localhost:8000');

export interface PDFResponse {
  status: string;
  text: string;
  words: string[];
  pageCount: number;
}

export interface GazeData {
  timestamp: number;
  gaze_direction: number[];
}

export interface TextData {
  text: string[];
  positions: { x: number; y: number }[];
}

export const api = {
  // PDF Upload and Parsing
  uploadPDF: async (file: File): Promise<PDFResponse> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/upload-pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload PDF');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Text to Speech
  textToSpeech: async (text: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to convert text to speech');
      }

      const data = await response.json();
      return data.audio_path;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Speech to Text
  speechToText: async (audio: Blob): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('audio', audio, 'audio.webm');

      const response = await fetch(`${API_BASE_URL}/api/speech-to-text`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to convert speech to text');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Eye Tracking
  async startEyeTracking(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/start-eye-tracking`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to start eye tracking');
    }
  },

  async stopEyeTracking(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/stop-eye-tracking`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to stop eye tracking');
    }
  },

  async getGazeData(): Promise<GazeData[]> {
    const response = await fetch(`${API_BASE_URL}/api/gaze-data`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get gaze data');
    }

    return response.json();
  },

  async getTextData(): Promise<TextData> {
    const response = await fetch(`${API_BASE_URL}/api/text-data`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get text data');
    }

    return response.json();
  }
};