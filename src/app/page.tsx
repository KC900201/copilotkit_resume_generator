import { CopilotKit } from "@copilotkit/react-core"
import { CopilotSidebar } from "@copilotkit/react-ui"
import "@copilotkit/react-ui/styles.css"

import ResumeTemplate from "@/components/templates/resume-template"

export default function Home() {
  return (
    <CopilotKit runtimeUrl='/api/copilotkit'>
      <CopilotSidebar
        instructions='Help the user to create a cover letter and resume'
        labels={{
          initial:
            "Welcome to the cover letter app! Add your LinkedIn, X, or Github links",
        }}
        defaultOpen={true}
        clickOutsideToClose={false}
      >
        <ResumeTemplate />
      </CopilotSidebar>
    </CopilotKit>
  )
}
