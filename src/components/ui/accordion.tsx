import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b not-last:border-neutral-200", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between py-5 text-left font-heading text-[17px] font-bold outline-none focus-visible:ring-3 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {children}
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-200/60">
          <CaretDownIcon
            data-slot="accordion-trigger-icon"
            className="size-4 group-aria-expanded/accordion-trigger:hidden"
          />
          <CaretUpIcon
            data-slot="accordion-trigger-icon"
            className="hidden size-4 group-aria-expanded/accordion-trigger:inline"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-[15px] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-5 data-ending-style:h-0 data-starting-style:h-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
