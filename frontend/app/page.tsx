import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  AccessibilityIcon,
  ExternalLinkIcon,
  GlobeIcon,
  VercelLogoIcon
} from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-12">
      <section className="hero-section container relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-blue-700"></div>
          <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
          <div className="relative ml-auto pt-16">
            <div className="mx-auto text-center lg:w-2/3">
              <h1 className="flex flex-col justify-center text-3xl font-bold text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
                Streamline Your Hiring Process with{' '}
                <span className="bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-500 bg-clip-text text-5xl text-transparent dark:text-white md:text-6xl xl:text-7xl">
                  RecruitRocket.
                </span>
              </h1>
              <p className="mt-8 text-gray-700 dark:text-gray-300">
                No more bias. Natural conversation approach. Elevate Your Talent
                Acquisition Efforts to New Heights!
              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
                <Button asChild>
                  <Link href="/upload-cv">
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    Start uploading CVs
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"></div>
          </div>
        </div>
      </section>
      <section className="container mt-4 justify-between border-y border-gray-100 py-8 dark:border-gray-800">
        <div className="mb-4 w-full text-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Based on Top-notch Tools
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Accessibility
              </CardTitle>
              <AccessibilityIcon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Shadcn/ui</div>
              <p className="text-muted-foreground text-xs">
                Beautifully designed components built with Radix UI and Tailwind
                CSS.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Model</CardTitle>
              <GlobeIcon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">OpenAI</div>
              <p className="text-muted-foreground text-xs">
                API platform that offers latest models and guides for safety
                best practices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Powered Hosting
              </CardTitle>
              <VercelLogoIcon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Vercel</div>
              <p className="text-muted-foreground text-xs">
                Securely build, deploy, and scale the best web experiences with
                Vercel.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streamline</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-muted-foreground h-4 w-4"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">LangChain</div>
              <p className="text-muted-foreground text-xs">
                Simplify, streamline, and innovate with our language-driven
                framework.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
