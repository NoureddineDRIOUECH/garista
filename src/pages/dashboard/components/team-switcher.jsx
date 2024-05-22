import React, { useEffect, useState } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../components/ui/command";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const TeamSwitcher = ({ className }) => {
    const [open, setOpen] = useState(false);
    const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState({ label: "", value: "" });
    const [value, setValue] = useState("")

    const groups = [
      {
        label: "Personal Account",
        teams: [
          {
            label: "Alicia Koch",
            value: "personal",
          },
        ],
      },
      {
        label: "Teams",
        teams: [
          {
            label: "Acme Inc.",
            value: "acme-inc",
          },
          {
            label: "Monsters Inc.",
            value: "monsters",
          }
        ]
      }
    ];

    const frameworks = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
      ]

      useEffect(() => {
       const fetchFrame = () => {
        frameworks.forEach((item) => {
            console.log("The Label => ", item.label , "The Values => ", item.value);
        })
       }

       fetchFrame();
      }, [])

      console.log("The FrameWorks => ", frameworks);
    return (
      <>
        {/* <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a team"
                className={cn("w-[200px] justify-between", className)}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                    alt={selectedTeam.label}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {selectedTeam.label}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search team..." />
                  <CommandEmpty>No team found.</CommandEmpty>
                  {groups.map((group) => (
                    <CommandGroup key={group.label} heading={group.label}>
                      {group.teams.map((team) => (
                        <CommandItem
                          key={team.value}
                          onSelect={() => {
                            setSelectedTeam(team);
                            setOpen(false);
                          }}
                          className="text-sm flex items-center px-2 py-1.5 cursor-pointer hover:bg-gray-100"
                        >
                          <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${team.value}.png`}
                              alt={team.label}
                              className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{team.label}</span>
                          {selectedTeam.value === team.value && (
                            <CheckIcon className="ml-auto h-4 w-4 text-primary" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <DialogTrigger asChild>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                          setShowNewTeamDialog(true);
                        }}
                        className="text-sm flex items-center px-2 py-1.5 cursor-pointer hover:bg-gray-100"
                      >
                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                        <span className="truncate">Create Team</span>
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </Dialog> */}
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between !text-black"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
              <h1>{framework.label}</h1>

               <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}


          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
      </>
    );
  }
export default TeamSwitcher;
