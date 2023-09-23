'use client'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4">
      <a className="mr-6 flex items-center space-x-2" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className="h-6 w-6"
        >
          <rect width="256" height="256" fill="none"></rect>
          <line
            x1="208"
            y1="128"
            x2="128"
            y2="208"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></line>
          <line
            x1="192"
            y1="40"
            x2="40"
            y2="192"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></line>
        </svg>
        <span className="hidden font-bold sm:inline-block">RecruitRocket</span>
      </a>
      <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
        <Link
          href="/upload-cv"
          className="text-md font-medium transition-colors hover:text-primary"
        >
          Upload CV
        </Link>
        <Link
          href="/chat"
          className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Chat
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
