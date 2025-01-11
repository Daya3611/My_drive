"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const ActionsDropwon = ({ files }: { files: Models.Document }) => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger className="shad-no-focus">
            <EllipsisVertical/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </div>
  );
};

export default ActionsDropwon;
