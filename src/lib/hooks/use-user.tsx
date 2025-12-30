'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const getAgeGroup = (dob: Date | null): AgeGroup | null => {
  if (!dob) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age <= 18) return 'School students';
  if (age <= 24) return 'College students';
  return 'Working professionals';
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [publicMode, setPublicMode] = useState(false);

  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const ageGroup = useMemo(() => getAgeGroup(user?.dob), [user?.dob]);

  return (
    <UserContext.Provider
      value={{ user, setUser, ageGroup, publicMode, setPublicMode }}
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
