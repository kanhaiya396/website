import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "./AuthLayout";

const ResetPassword = () => {
  const [done, setDone] = useState(false);

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before"
      footer={
        <Link to="/login" className="text-primary font-medium hover:underline">
          Back to sign in
        </Link>
      }
    >
      {done ? (
        <div className="text-center text-sm text-muted-foreground py-4">
          Password updated. You can now sign in with your new password.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="At least 8 characters" className="pl-10" required minLength={8} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirm" type="password" placeholder="Repeat password" className="pl-10" required minLength={8} />
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Update password
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
