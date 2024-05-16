import React from "react";
import { Search } from "lucide-react";
import { format, addHours, addDays, nextSaturday } from "date-fns";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function MailDisplay({ mail }) {
  const today = new Date();

  return (
    
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <Separator />
      </div>

      {mail ? (
        <div className="flex flex-1 flex-col ">
          <div className="flex items-start p-4 ">
            <div className="flex items-start gap-4  text-xl">
              <Avatar>
                <AvatarImage alt={mail.clamer_name} />
                {/* <AvatarFallback>
                  {mail.clamer_name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback> */}
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.clamer_name}</div>
                <div className="line-clamp-1 text-sm">{mail.phone}</div>
                <div className="line-clamp-1 text-sm">
                  <span className="font-medium">Reply-To:</span> {mail.email}
                </div>
              </div>
            </div>
            {mail.updated_at && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.updated_at), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-md">
            {mail.description}
          </div>
          <Separator className="mt-auto" />

        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}

export default MailDisplay;
