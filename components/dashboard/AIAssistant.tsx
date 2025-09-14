
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { getAIResponse } from '../../services/geminiService';
import { SendIcon, SparklesIcon } from '../icons';

const AIAssistant: React.FC = () => {
  const { patients } = useData();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');
    setError('');
    
    try {
      const aiResponse = await getAIResponse(query, patients);
      setResponse(aiResponse);
    } catch (err) {
      setError('Failed to get response from AI assistant.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md mt-8">
      <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
        <SparklesIcon className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold text-gray-800">AI Assistant</h3>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">
          Ask questions about patient data. For example: "How many patients are currently admitted?" or "List all patients diagnosed with Pneumonia".
        </p>
        <form onSubmit={handleQuery}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-400 transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <SendIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
        { (isLoading || response || error) && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
            {isLoading && <p className="text-gray-500">Thinking...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {response && <pre className="text-gray-800 whitespace-pre-wrap text-sm font-sans">{response}</pre>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
