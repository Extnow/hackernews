import React from 'react';

export default ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" onChange={onChange} value={value} />
  </form>
);
