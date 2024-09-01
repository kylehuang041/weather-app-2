/**
 * @brief This component is the wrapper or the container
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */


import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component for the main content
 * @param children
 * @param className
 * @constructor
 */
const Wrapper: React.FC<WrapperProps> = ({ children, className = '' }) => {
  return <div className={`h-full ${className}`}>{children}</div>;
};

export default Wrapper;