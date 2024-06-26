"use client";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuroraBackground } from "~~/components/ui/aurora-background";
import { Button } from "~~/components/ui/button";
import { PlaceholdersAndVanishInput } from "~~/components/ui/placeholders-and-vanish-input";
import { toast } from "~~/components/ui/use-toast";

const placeholders = [
  `https://www.onlineshop.com/products/electronics/smartphones/samsung-galaxy-s21?utm_source=homepage&utm_campaign=spring_sale
`,
  "Enter your long URL here",
];

const urlValidationRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export default function Home() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [hostUrl, setHostUrl] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    if (!urlValidationRegex.test(input)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      setInput("");
      return;
    }
    const response = await fetch("/api/urls/create", {
      method: "POST",
      body: JSON.stringify({ url: input }),
    });
    const data = await response.json();
    setShortUrl(data.id);
    setInput("");
  };

  useEffect(() => {
    setHostUrl(window.location.origin);
  }, []);

  return (
    <AuroraBackground className="min-h-screen w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            MINI URI SHORTENER
          </h1>

          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Shorten your links quickly and easily. Because Shorter is{" "}
            <span className="bg-primary rounded-full text-white px-2 py-0.5">
              Better
            </span>
          </p>

          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={onSubmit}
            inputValue={input}
          />
          <Link href="/list?page=1">
            <p className="text-primary max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              See what users have shorted
              <span className="ms-2">↗</span>
            </p>
          </Link>
        </div>
        {shortUrl && (
          <div className="max-w-2xl mx-auto p-4 mt-4 ">
            <h2 className="text-lg text-center font-semibold">Minified URL</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs truncate w-full">{`${hostUrl}/${shortUrl}`}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard
                    .writeText(`${hostUrl}/${shortUrl}`)
                    .then(() => {
                      toast({
                        title: "Copied!",
                        description:
                          "The URL has been copied to your clipboard.",
                        variant: "default",
                      });
                    })
                    .catch(() => {
                      toast({
                        title: "Failed to copy",
                        description: "Please try again.",
                        variant: "destructive",
                      });
                    });
                }}
              >
                <span className="bg-primary rounded-full text-white px-2 py-0.5 flex items-center gap-1 z-10">
                  <small> Copy</small>
                  <ClipboardCopyIcon className="size-3" />
                </span>
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  );
}
