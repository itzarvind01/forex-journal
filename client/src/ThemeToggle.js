import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
