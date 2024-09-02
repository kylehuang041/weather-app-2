import { createContext, useState, useContext } from "react";

const ContentContext = createContext<any>({});

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