"use client";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { FeedEditForm } from "@/components/feed/FeedEditForm";
import { FeedType } from "@/lib/feed/feedTypes";

interface FeedEditDrawerProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  data: FeedType | undefined;
}
export const FeedEditDrawer = ({
  isOpen,
  setOpen,
  data,
}: FeedEditDrawerProps) => {
  return (
    <>
      <Drawer open={isOpen} onOpenChange={setOpen}>
        <DrawerContent
          aria-describedby={undefined}
          className="mx-auto w-full md:w-[600px] lg:w-[680px] h-[80vh] bg-white z-50
          px-4 py-2"
        >
          <DrawerTitle className="hidden"></DrawerTitle>
          <div className="h-full overflow-y-scroll">
            <FeedEditForm data={data} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
