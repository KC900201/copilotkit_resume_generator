"use client"

// Import statements
import React, { useState } from "react"
import ReactMarkDown from "react-markdown"
import Link from "next/link"

function ResumeTemplate() {
  const [coverLetter, setCoverLetter] = useState<string>("")
  const [resume, setResume] = useState<string>("")

  return (
    // Main container with flex layout,
    <section>
      {/* header section */}
      <header>
        <Link href="#" prefetch={false}>
          <span>Resume Dashboard</span>
          <h1>Resume & cover letter generator</h1>
        </Link>
      </header>
      {/* Main content area with padding */}
      <main>
        {/* Container with content */}
        <div>
          {/* Section for displaying the resume */}
          <section>

          </section>
          {/* Section for displaying the cover letter */}
        </div>
      </main>
    </section>
  )
}

export default ResumeTemplate
