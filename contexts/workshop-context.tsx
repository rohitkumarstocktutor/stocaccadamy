"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WorkshopData, fetchWorkshopData, getTeacherNameFromCourseKey } from '@/lib/workshop-service';

interface WorkshopContextType {
  workshopData: WorkshopData | null;
  isLoading: boolean;
  error: string | null;
  fetchWorkshopDataForCourse: (courseKey: string) => Promise<void>;
  clearWorkshopData: () => void;
}

const WorkshopContext = createContext<WorkshopContextType | undefined>(undefined);

interface WorkshopProviderProps {
  children: ReactNode;
}

export function WorkshopProvider({ children }: WorkshopProviderProps) {
  const [workshopData, setWorkshopData] = useState<WorkshopData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCourseKey, setCurrentCourseKey] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchWorkshopDataForCourse = async (courseKey: string) => {
    // Prevent duplicate calls for the same course
    if (isFetching || (currentCourseKey === courseKey && workshopData)) {
      return;
    }

    setIsFetching(true);
    setIsLoading(true);
    setError(null);
    setCurrentCourseKey(courseKey);
    
    try {
      const teacherName = getTeacherNameFromCourseKey(courseKey);
      const data = await fetchWorkshopData(teacherName);
      
      if (data && data.wAurl) {
        setWorkshopData(data);
      } else {
        setError('No WhatsApp URL found for this course');
        setWorkshopData(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch workshop data';
      setError(errorMessage);
      setWorkshopData(null);
      console.error('Failed to load workshop data:', err);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const clearWorkshopData = () => {
    setWorkshopData(null);
    setError(null);
    setIsLoading(false);
    setCurrentCourseKey(null);
    setIsFetching(false);
  };

  const value: WorkshopContextType = {
    workshopData,
    isLoading,
    error,
    fetchWorkshopDataForCourse,
    clearWorkshopData,
  };

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  );
}

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (context === undefined) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
}
