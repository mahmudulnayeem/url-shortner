"use client";

import { useRouter } from "next/navigation";

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
          {title && (
            <SheetTitle title={title} className="truncate ">
              {title}
            </SheetTitle>
          )}
          <SheetDescription>{children}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
