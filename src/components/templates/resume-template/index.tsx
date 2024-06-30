"use client"

// Import statements
import React, { useState } from "react"
import ReactMarkDown from "react-markdown"
import Link from "next/link"
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

function ResumeTemplate() {
  const [coverLetter, setCoverLetter] = useState<string>("")
  const [resume, setResume] = useState<string>("")

  // Add copilotkit custom hooks
  useCopilotReadable({
    description: "The user's cover letter",
    value: coverLetter,
  })

  useCopilotReadable({
    description: "The user's resume",
    value: resume,
  })

  useCopilotAction(
    {
      // Define the name of the action
      name: "createCoverLetterAndResume",
      // Provide description
      description: "Create a cover letter and resume for a job application.",
      // Define parameters
      parameters: [
        {
          name: "coverLetterMarkDown",
          type: "string",
          description: "Markdown text for a cover letter to introduce yourself",
          required: true,
        },
        {
          name: "resumeMarkDown",
          type: "string",
          description:
            "Markdown text for a resume that displays your professional background",
          required: true,
        },
      ],
      // Define the handler function to be executed
      handler: async ({ coverLetterMarkDown, resumeMarkDown }) => {
        // Update the state with provided cover letter markdownt text
        setCoverLetter(coverLetterMarkDown)
        // Update the state with provided resume markdown test
        setResume(resumeMarkDown)
      },
    },
    // Empty dependency array, indicating this effect does not depend
    []
  )

  return (
    // Main container with flex layout,
    <section className='flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-800'>
      {/* header section with a fixed-height, padding, and border at the bottom */}
      <header className='flex h-16 shrink-0 items-center border-b bg-white px-4 md:px-6 dark:bg-gray-900'>
        {/* Link component for navigation with custom styles */}
        <Link
          href='#'
          prefetch={false}
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <span className='sr-only text-gray-500'>Resume Dashboard</span>
          <h1>Resume & cover letter generator</h1>
        </Link>
      </header>
      {/* Main content area with padding */}
      <main className='flex-1 p-4 md:p-8 lg:p-10'>
        {/* Container with content */}
        <div className='mx-auto grid max-w-4xl gap-8'>
          {/* Section for displaying the resume */}
          <section>
            <div className='rounded-lg bg-white shadow-sm dark:bg-gray-900'>
              <div className='p-6 md:p-8'>
                <h2 className='text-lg font-bold'>Resume</h2>
                <div className='my-6' />
                <div className='grid gap-6'>
                  {/* Conditional rendering of resume content */}
                  {resume ? (
                    <ReactMarkDown>{resume}</ReactMarkDown>
                  ) : (
                    <div>no resume to display</div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* Section for displaying the cover letter */}
          <section>
            <div className='rounded-lg bg-white shadow-sm dark:bg-gray-900'>
              <div className='p-6 md:p-8'>
                <h2 className='text-lg font-bold'>Cover letter</h2>
                <div className='my-6' />
                <div className='grid gap-4'>
                  {/* Conditional rendering of cover letter content */}
                  {coverLetter ? (
                    <ReactMarkDown>{coverLetter}</ReactMarkDown>
                  ) : (
                    <div>no cover letter to display</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </section>
  )
}

export default ResumeTemplate
