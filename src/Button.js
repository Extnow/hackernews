import React from 'react';

export default ({ onClick, className = '', children }) => (
  <button onClick={onClick} className={className} type="button">{children}</button>
);
