import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { MailDisplay } from "./Mail-display";
import { MailList } from "./Clams_list";
import { useMail } from "../use-mail";
import MailDisplay from "./Mail-display";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function Mail({
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [mail] = useMail();

  return (
    <TooltipProvider>
      <div className="h-full max-h-[800px] grid grid-cols-2">
        <div>
          {/* <div>
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div> */}
          <Tabs defaultValue="all">
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </div>
      </div>
    </TooltipProvider>

  );
}

export default Mail;
