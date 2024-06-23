"use client";

import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "~~/lib/utils";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const CopyButton = ({ url }: { url: string }) => {
  const [showTick, setShowTick] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "The URL has been copied to your clipboard.",
        variant: "default",
      });
      setShowTick(true);

      setTimeout(() => {
        setShowTick(false);
      }, 1500);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      onClick={copyToClipboard}
      variant="default"
      className="flex gap-2 items-center"
    >
      <p className="font-medium">{showTick ? "Copied!" : "Copy"}</p>
      <ClipboardCopyIcon
        className={cn("cursor-pointer size-4", showTick && "hidden")}
      />
      <CheckIcon className={cn("size-4 hidden", showTick && "block")} />
    </Button>
  );
};

export default CopyButton;
