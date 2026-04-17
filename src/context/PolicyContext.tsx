import { createContext, useContext, useState, ReactNode } from 'react';
import { DLPPolicy, INITIAL_POLICY } from '../types/policy';

interface PolicyContextType {
  policy: DLPPolicy;
  updatePolicy: (updates: Partial<DLPPolicy>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const PolicyContext = createContext<PolicyContextType | null>(null);

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [policy, setPolicy] = useState<DLPPolicy>(INITIAL_POLICY);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;

  const updatePolicy = (updates: Partial<DLPPolicy>) => {
    setPolicy((prev) => ({ ...prev, ...updates }));
  };

  return (
    <PolicyContext.Provider value={{ policy, updatePolicy, currentStep, setCurrentStep, totalSteps }}>
      {children}
    </PolicyContext.Provider>
  );
}

export function usePolicy() {
  const context = useContext(PolicyContext);
  if (!context) throw new Error('usePolicy must be used within PolicyProvider');
  return context;
}
