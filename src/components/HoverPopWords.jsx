import React from 'react';

export default function HoverPopWords({ text, className = '', style = {} }) {
  if (typeof text !== 'string') return <span className={className} style={style}>{text}</span>;

  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {words.map((word, index) => (
        <span key={index} className="hover-pop-word">
          {word}{index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}
