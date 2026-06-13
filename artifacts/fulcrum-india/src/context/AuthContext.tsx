import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthSession, AuthSessionRole } from "@workspace/api-client-react";

// Extend AuthSessionRole based on the API spec
type ExtendedAuthRole = AuthSessionRole | "coordinator" | "admin" | "superadmin";

interface AuthContextType {
  session: AuthSession | null;
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: ExtendedAuthRole) => void;
  isLoading: boolean;
}

const mockSessions: Record<string, AuthSession> = {
  "9876543210": {
    userId: 1,
    phone: "9876543210",
    role: "entrepreneur" as AuthSessionRole,
    name: "Lakshmi Devi",
    district: "Madurai",
    language: "ta",
    authenticated: true
  },
  "9876543211": {
    userId: 2,
    phone: "9876543211",
    role: "builder" as AuthSessionRole,
    name: "Murugan S.",
    district: "Madurai",
    language: "ta",
    authenticated: true
  },
  "9876543212": {
    userId: 3,
    phone: "9876543212",
    role: "coordinator" as AuthSessionRole,
    name: "Priya Coordinator",
    district: "Tamil Nadu",
    language: "en",
    authenticated: true
  },
  "9876543213": {
    userId: 4,
    phone: "9876543213",
    role: "admin" as AuthSessionRole,
    name: "Admin User",
    district: "India",
    language: "en",
    authenticated: true
  },
  "9876543214": {
    userId: 5,
    phone: "9876543214",
    role: "superadmin" as AuthSessionRole,
    name: "Super Admin",
    district: "India",
    language: "en",
    authenticated: true
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const stored = localStorage.getItem("fulcrum_session");
    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, otp: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (otp === "123456" && mockSessions[phone]) {
          const userSession = mockSessions[phone];
          setSession(userSession);
          localStorage.setItem("fulcrum_session", JSON.stringify(userSession));
          resolve();
        } else {
          reject(new Error("Invalid phone or OTP"));
        }
      }, 800);
    });
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("fulcrum_session");
    window.location.href = "/";
  };

  const switchRole = (role: ExtendedAuthRole) => {
    // Find a mock session with this role
    const newSessionEntry = Object.entries(mockSessions).find(([_, s]) => s.role === role);
    if (newSessionEntry) {
      const userSession = newSessionEntry[1];
      setSession(userSession);
      localStorage.setItem("fulcrum_session", JSON.stringify(userSession));
      
      // Redirect based on role
      if (role === "admin" || role === "superadmin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/journey";
      }
    }
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
