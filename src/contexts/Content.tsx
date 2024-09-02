/**
 * @brief Context for weather data
 * @author Kyle Huang
 * @date 9/1/2024
 * @version 0.1
 */


import { createContext, useState, useContext } from "react";

const ContentContext = createContext<any>({});

/**
 * @brief Wrapper for weather content
 * @param children {React.ReactNode} - Child components
 * @param className {string} - Optional CSS class for styling
 * @returns 
 */
export function ContentWrapper({ children, className }: { children: React.ReactNode; className?: string; }) {
  const [data, setData] = useState<any>({});

  return (
    <ContentContext.Provider value={{data, setData}}>
      <div className={className}>
        {children}
      </div>
    </ContentContext.Provider>
  );
};

export function useContentContext() {
  return useContext(ContentContext);
}