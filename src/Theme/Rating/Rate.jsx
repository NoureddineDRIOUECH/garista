/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Mj5KOqUIvF3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

export default function Rate() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
     
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Share Your Feedback</h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">Overall Experience</span>
              <div className="flex items-center gap-2 ml-auto">
                <SmileIcon className="w-6 h-6 text-primary-500" />
                <SmileIcon className="w-6 h-6 text-primary-500" />
                <SmileIcon className="w-6 h-6 text-primary-500" />
                <SmileIcon className="w-6 h-6 text-gray-400" />
                <SmileIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="food-quality">Food Quality</Label>
              <Slider
                className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full"
                defaultValue={[80]}
                id="food-quality"
                max={100}
                min={0}
                thumbClassName="w-5 h-5 bg-primary-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-quality">Service Quality</Label>
              <Slider
                className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full"
                defaultValue={[90]}
                id="service-quality"
                max={100}
                min={0}
                thumbClassName="w-5 h-5 bg-primary-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ambiance">Ambiance</Label>
              <Slider
                className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full"
                defaultValue={[75]}
                id="ambiance"
                max={100}
                min={0}
                thumbClassName="w-5 h-5 bg-primary-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                id="comments"
                placeholder="Share your thoughts..."
              />
            </div>
            <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white" type="submit">
              Submit Feedback
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}