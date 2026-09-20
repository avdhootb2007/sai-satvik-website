import React, { useState, useEffect } from 'react';

export default function AnimatedTypewriter({ words, speed = 80, delay = 1800, className = '', style = {} }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullWord = words[currentWordIndex % words.length];

    if (isDeleting) {
      // Deleting characters
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      // Typing characters
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }, speed);
    }

    // Finished typing current word
    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      <span>{currentText}</span>
      <span className="typing-cursor" />
    </span>
  );
}
