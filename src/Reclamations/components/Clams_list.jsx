import { ComponentProps } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/registry/new-york/ui/separator"
// import { Mail } from "@/app/(app)/examples/mail/data"
import { useMail } from "../use-mail"

function calculateTimeDifference(updatedAtTimestamp) {
  // Convert the updatedAtTimestamp string to a Date object
  const updatedAt = new Date(updatedAtTimestamp);

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now - updatedAt;

  // Convert milliseconds to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Convert seconds to minutes
  const minutesDifference = Math.floor(secondsDifference / 60);

  // Convert minutes to hours
  const hoursDifference = Math.floor(minutesDifference / 60);

  // Convert hours to days
  const daysDifference = Math.floor(hoursDifference / 24);

  // Convert days to months
  const monthsDifference = Math.floor(daysDifference / 30);

  // Convert days to years
  const yearsDifference = Math.floor(daysDifference / 365);

  // Check the difference and return the appropriate string
  if (yearsDifference > 0) {
      return yearsDifference === 1 ? "1 year ago" : yearsDifference + " years ago";
  } else if (monthsDifference > 0) {
      return monthsDifference === 1 ? "1 month ago" : monthsDifference + " months ago";
  } else if (daysDifference > 0) {
      if (daysDifference === 1) {
          return "yesterday";
      } else if (daysDifference === 2) {
          return "2 days ago";
      } else {
          return daysDifference + " days ago";
      }
  } else if (hoursDifference > 0) {
      return hoursDifference === 1 ? "1 hour ago" : hoursDifference + " hours ago";
  } else if (minutesDifference > 0) {
      return minutesDifference === 1 ? "1 minute ago" : minutesDifference + " minutes ago";
  } else {
      return "just now";
  }
}

export function MailList({ items }) {
  const [mail, setMail] = useMail()

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex justify-between"style={{justifyContent:"space-between"}}>
                <div className="flex items-center gap-2 ">


                  <Avatar>
      <AvatarImage src="https://th.bing.com/th/id/OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa?rs=1&pid=ImgDetMain" alt="@shadcn" className="h-8 w-8"/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="font-semibold">{item.clamer_name}</div>
                  {!item.resto_id && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}

                </div>

                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {/* {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })} */}
                  <div className="text-neutral-500">{calculateTimeDifference(item.updated_at)}</div>
                </div>
              </div>
              {/* <div className="text-xs font-medium">{item.subject}</div> */}
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description.substring(0, 300)}
            </div>
            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} >
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

// function getBadgeVariantFromLabel(
//   label
// ) {
//   if (["work"].includes(label.toLowerCase())) {
//     return "default"
//   }

//   if (["personal"].includes(label.toLowerCase())) {
//     return "outline"
//   }

//   return "secondary"
// }
