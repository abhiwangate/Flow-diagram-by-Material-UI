import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ItemList } from './components/ItemList';
import { ItemFlow } from './components/ItemFlow';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    background: {
      default: '#F0FDF4',
      paper: '#FFFFFF',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center relative py-6">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-purple-400/20 to-emerald-400/20 blur-xl"
              style={{ transform: 'skewY(-3deg)' }}
            />
            <div className="relative">
              <h1 
                className="text-5xl font-bold mb-2 relative"
                style={{ 
                  fontFamily: "'Permanent Marker', cursive",
                  background: 'linear-gradient(to right, #10B981, #8B5CF6, #10B981)',
                  backgroundSize: '200% auto',
                  color: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  animation: 'gradient 3s linear infinite',
                }}
              >
                Item Flow Manager
                <span className="absolute -inset-1 bg-white/50 blur-sm -z-10"></span>
              </h1>
              <style>
                {`
                  @keyframes gradient {
                    to {
                      backgroundPosition: 200% center;
                    }
                  }
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                  }
                `}
              </style>
              <div className="relative inline-block mt-2">
                <p 
                  className="text-base relative inline-block"
                  style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    background: 'linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: 'float 3s ease-in-out infinite',
                    letterSpacing: '2px',
                  }}
                >
                  by Abhishek Wangate ✨
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ItemList />
            <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Flow Diagram</h2>
              <ItemFlow />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;