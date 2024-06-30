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
  title?: string;
}) {
  const router = useRouter();
  function onDismiss() {
    router.back();
  }

  return (
    <Sheet open={true} onOpenChange={onDismiss}>
      <SheetContent side="right">
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          <SheetDescription>
            <ScrollArea className="h-[85vh]">{children}</ScrollArea>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
