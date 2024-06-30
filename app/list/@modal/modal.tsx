"use client";

import { useRouter } from "next/navigation";

import { ScrollArea } from "~~/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~~/components/ui/sheet";

export function Modal({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  function onDismiss() {
    router.back();
  }

  return (
    <Sheet open={true} onOpenChange={onDismiss}>
      <SheetContent side="bottom" className="h-full">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            <ScrollArea className="h-[70vh]">{children}</ScrollArea>
            <div className="mt-2 h-[20vh] ">
              <p>এখানে কোন বিজ্ঞাপন দেখানো হবে</p>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
