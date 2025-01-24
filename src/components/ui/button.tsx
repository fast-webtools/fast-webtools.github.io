import React from 'react';

const Button: React.FC = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
}

export default Button;
