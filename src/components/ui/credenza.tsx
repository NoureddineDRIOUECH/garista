import * as React from "react"
import { cn } from "@/lib/utils"
// import { useMediaQuery } from "../../hooks/useMediaQuery"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/Theme/hooks/useMediaQuery"

interface BaseProps {
  children: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
}

const desktop = "(min-width: 768px)"

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const CredenzaComponent = isDesktop ? Dialog : Drawer

  return <CredenzaComponent {...props}>{children}</CredenzaComponent>
}

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const TriggerComponent = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <TriggerComponent className={className} {...props}>
      {children}
    </TriggerComponent>
  )
}

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const CloseComponent = isDesktop ? DialogClose : DrawerClose

  return (
    <CloseComponent className={className} {...props}>
      {children}
    </CloseComponent>
  )
}

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ContentComponent = isDesktop ? DialogContent : DrawerContent;

  return (
    <ContentComponent className={cn("grid grid-cols-1 md:grid-cols-2 ", className)} {...props}>
      {children}
    </ContentComponent>
  );
};


const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DescriptionComponent = isDesktop ? DialogDescription : DrawerDescription

  return (
    <DescriptionComponent className={className} {...props}>
      {children}
    </DescriptionComponent>
  )
}

const CredenzaHeader = ({ className, children, photo, ...props }: CredenzaProps & { photo: string }) => {
  const isDesktop = useMediaQuery(desktop)
  const HeaderComponent = isDesktop ? DialogHeader : DrawerHeader

  return (
    <HeaderComponent className={className} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <img src={photo} alt="Header Photo" className="w-full  md:h-auto"   style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', height:'22rem'}}/>
        {children}
      </div>
    </HeaderComponent>
  )
}

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const TitleComponent = isDesktop ? DialogTitle : DrawerTitle

  return (
    <TitleComponent className={className} {...props}>
      {children}
    </TitleComponent>
  )
}

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0 pb-0", className)} {...props}>
      {children}
    </div>
  )
}

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const FooterComponent = isDesktop ? DialogFooter : DrawerFooter

  return (
    <FooterComponent className={className} {...props}>
      {children}
    </FooterComponent>
  )
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
}
