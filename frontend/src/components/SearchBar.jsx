import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  const [input, setInput] = useState(value || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(input);
    }, 300);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [input]);

  useEffect(() => {
    setInput(value || '');
  }, [value]);

  return (
    <input
      className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
      type="text"
      placeholder={placeholder}
      value={input}
      onChange={e => setInput(e.target.value)}
    />
  );
} 