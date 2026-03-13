'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CompareContextType {
    compareList: string[]; // phone IDs
    addToCompare: (id: string) => void;
    removeFromCompare: (id: string) => void;
    toggleCompare: (id: string) => void;
    isInCompare: (id: string) => boolean;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<string[]>([]);

    const addToCompare = useCallback((id: string) => {
        setCompareList(prev => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    }, []);

    const removeFromCompare = useCallback((id: string) => {
        setCompareList(prev => prev.filter(item => item !== id));
    }, []);

    const toggleCompare = useCallback((id: string) => {
        setCompareList(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }
            return [...prev, id];
        });
    }, []);

    const isInCompare = useCallback((id: string) => {
        return compareList.includes(id);
    }, [compareList]);

    const clearCompare = useCallback(() => {
        setCompareList([]);
    }, []);

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, toggleCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}
