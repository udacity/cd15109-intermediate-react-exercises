import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="min-h-dvh">
      {/* TODO: Add page container with max width and padding */}

      {/* TODO: Header section */}
      {/* - Title */}
      {/* - Subtitle */}
      {/* - Dark mode toggle button */}

      {/* TODO: Main grid layout */}
      {/* - 1 column on mobile */}
      {/* - 2 columns on md+ */}

      {/* TODO: Profile Card */}
      {/* - Display name input */}
      {/* - Email input */}
      {/* - Save button */}

      {/* TODO: Danger Zone Card */}
      {/* - Delete workspace button */}
      {/* - Confirmation Dialog */}
      {/* - Confirm disabled until user types DELETE */}
    </div>
  );
}
