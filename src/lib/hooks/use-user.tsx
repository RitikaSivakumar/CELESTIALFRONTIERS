'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

export type AgeGroup =
  | 'School students'
  | 'College students'
  | 'Working professionals';

type User = {
  name: string;
  dob: Date | null;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  ageGroup: AgeGroup | null;
  publicMode: boolean;
  setPublicMode: (mode: boolean) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const getAgeGroup = (dob: Date | null): AgeGroup | null => {
  if (!dob) return null;
  const today = new Date();
  let age = today.getFullYear() - new Date(dob).getFullYear();
  const m = today.getMonth() - new Date(dob).getMonth();
  if (m < 0 || (m === 0 && today.getDate() < new Date(dob).getDate())) {
    age--;
  }

  if (age <= 18) return 'School students';
  if (age <= 24) return 'College students';
  return 'Working professionals';
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [publicMode, setPublicModeState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('wellguard-user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Dates need to be re-hydrated into Date objects
        if (parsedUser.dob) {
          parsedUser.dob = new Date(parsedUser.dob);
        }
        setUserState(parsedUser);
      }
      const storedPublicMode = localStorage.getItem('wellguard-public-mode');
      if (storedPublicMode) {
        setPublicModeState(JSON.parse(storedPublicMode));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
    setLoading(false);
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('wellguard-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wellguard-user');
      localStorage.removeItem('wellguard-public-mode');
    }
  };

  const setPublicMode = (mode: boolean) => {
    setPublicModeState(mode);
    localStorage.setItem('wellguard-public-mode', JSON.stringify(mode));
  }

  const ageGroup = useMemo(() => getAgeGroup(user?.dob), [user?.dob]);

  return (
    <UserContext.Provider
      value={{ user, setUser, ageGroup, publicMode, setPublicMode, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
