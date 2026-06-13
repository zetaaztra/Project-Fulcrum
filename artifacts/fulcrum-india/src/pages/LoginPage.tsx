import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Smartphone, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleLogin = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return;
    
    setLoading(true);
    setError("");
    try {
      await login(phone, fullOtp);
      // Wait for state to sync and redirect based on role is handled in AuthContext or App routing
      // If we are still here, we can manually push to journey
      setLocation("/journey");
    } catch (err: any) {
      setError("Invalid OTP. For demo, use 123456.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
      <div className="absolute inset-0 bg-grid-overlay opacity-30"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/80 backdrop-blur-2xl border border-border rounded-2xl p-10 shadow-2xl shadow-black/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2 tracking-tight">
              Fulcrum<span className="text-primary">-India</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              {step === 1 ? "Enter your phone number to continue" : `Enter 6-digit code sent to +91 ${phone}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handlePhoneSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="bg-background border border-border rounded-lg px-4 py-3 flex items-center justify-center text-muted-foreground font-mono text-sm">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="flex-1 bg-background border border-border focus:border-primary rounded-lg px-4 py-3 outline-none transition-colors font-mono text-lg"
                      placeholder="98765 43210"
                      autoFocus
                    />
                  </div>
                  {error && <p className="text-destructive text-xs mt-2">{error}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary hover:scale-[1.02] transition-all glow-primary"
                  disabled={loading || phone.length < 10}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send OTP"}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase font-semibold">Or</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <Button type="button" variant="outline" className="w-full h-12 text-sm font-semibold bg-background hover:bg-card-hover border-border hover:border-primary/50 transition-colors">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Continue with DigiLocker
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 bg-background border border-border focus:border-primary rounded-lg text-center text-2xl font-black outline-none transition-colors"
                    />
                  ))}
                </div>
                
                {error && <p className="text-destructive text-xs text-center">{error}</p>}

                <Button 
                  onClick={handleLogin}
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary hover:scale-[1.02] transition-all glow-primary"
                  disabled={loading || otp.join("").length < 6}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Continue"}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Didn't receive code? <button className="text-primary font-semibold hover:underline">Resend OTP (45s)</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo Hint */}
          <div className="mt-10 p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs">
            <p className="font-semibold text-primary mb-2 uppercase tracking-wider text-[10px]">Demo Credentials (OTP: 123456)</p>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground font-mono">
              <div>9876543210 <span className="text-[10px] ml-1">Entrepreneur</span></div>
              <div>9876543211 <span className="text-[10px] ml-1">Builder</span></div>
              <div>9876543213 <span className="text-[10px] ml-1">Admin</span></div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <button className="px-3 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/30">English</button>
            <button className="px-3 py-1 rounded-md text-xs font-semibold bg-background hover:bg-card border border-border text-muted-foreground transition-colors">தமிழ்</button>
            <button className="px-3 py-1 rounded-md text-xs font-semibold bg-background hover:bg-card border border-border text-muted-foreground transition-colors">हिंदी</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
