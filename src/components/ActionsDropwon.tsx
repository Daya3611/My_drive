"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, EllipsisVertical, MenuIcon } from "lucide-react";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "../../constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { renameFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { set } from "zod";

const ActionsDropwon = ({ files }: { files: Models.Document }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [actions, setActions] = useState<ActionType | null>(null);
  const [name, setName] = useState(files.name);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();

  const closeBtn = () => {
    setisModalOpen(false);
    setIsDropDownOpen(false);
    setActions(null);
    setName(files.name);
  };

  const handelAction = async () => {
    if (!actions) return;
    setIsLoading(true);
    let success = false;
    const actionHandlers = {
      rename: () =>
        renameFile({
          fileId: files.$id,
          name,
          extension: files.extension,
          path,
        }),
      share: () => {
        alert("share");
      },
      delete: () => {
        alert("delete");
      },
    };

    success = await actionHandlers[actions.value as keyof typeof actionHandlers]();
    if (success) {
      closeBtn();

      setIsLoading(false);
    }
  };

  const renderDialog = () => {
    if (!actions) return null;

    const { value, label } = actions;

    return (
      <DialogContent>
        <DialogContent className="shad-dialog button">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="text-center text-light-100">
              {label}
            </DialogTitle>
            {value === "rename" && (
              <Input
                type="text"
                placeholder="Enter new name"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </DialogHeader>
          {["rename", "delete", "share"].includes(value) && (
            <DialogFooter className="flex flex-col gap-3 md:flex-row">
              <Button onClick={closeBtn} className="modal-cancel-button">Cancel</Button>
              <Button onClick={handelAction} className="modal-submit-button">
                <p className="capitalize">{value}</p>
                {isLoading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="loading"
                    width={24}
                    height={24}
                    className="anumate-spin"
                  />
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogContent>
    );
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger className="shad-no-focus">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="max-w-[200px] truncate">
              {files.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {actionsDropdownItems.map((item) => (
              <DropdownMenuItem
                key={item.value}
                className="shad-dropdown-item"
                onClick={() => {
                  setActions(item);

                  if (
                    [
                      "rename",
                      "details",
                      "share",
                      "download",
                      "delete",
                    ].includes(item.value)
                  ) {
                    setisModalOpen(true);
                  }
                }}
              >
                {item.value === "download" ? (
                  <Link
                    href={constructDownloadUrl(files.bucketFileId)}
                    download={files.name}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                    />

                    {item.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                    />

                    {item.label}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {renderDialog()}
      </Dialog>
    </div>
  );
};

export default ActionsDropwon;
