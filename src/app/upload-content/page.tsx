'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Steps, STEPS, StepStore } from "./store/steps.store"
import { cn, getEnumIndex } from "@/lib/utils"

function UploadContentRequest() {
  const { step: stepStore } = StepStore()
  return (
    <div className='container mx-auto py-12'>
      <br />
      <Tabs value={stepStore} className="w-full overflow-hidden">
        <TabsList className="w-full overflow-hidden hidden md:flex">
          {STEPS
            .sort((a, b) => a.position - b.position)
            .map((step, idx) => (
              <TabsTrigger
                key={step.value + idx + 'content'}
                value={step.value}
                className={cn(
                  idx < getEnumIndex(Steps, stepStore) ? 'border-b-2 border-green-500 rounded-none' : '',
                )}
              >
                {step.position}. {step.label}
              </TabsTrigger>
            ))}
        </TabsList>
        {STEPS
          .sort((a, b) => a.position - b.position)
          .map((step, idx) => (
            <TabsContent key={step.value + idx + 'content'} value={step.value}>
              {step.component}
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

export default UploadContentRequest