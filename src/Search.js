import React from 'react';

export default ({
  value, onChange, onSubmit, children,
}) => (
  <form onSubmit={onSubmit}>
    <input type="text" onChange={onChange} value={value} />
    <button type="submit">{children}</button>
  </form>
);
