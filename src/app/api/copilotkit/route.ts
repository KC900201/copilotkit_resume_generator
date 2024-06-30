// Import necessary modules and functions
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend"
import { Action } from "@copilotkit/shared"
import { scrape } from "./tavily"

// Define a scraping action with its name, description, parameters and handlers
const scrapingAction: Action<any> = {
  name: "scrapeContent",
  description: "call this function to scrape content from url in a query.",
  parameters: [
    {
      name: "query",
      type: "string",
      description: "The query for scraping content. 5 characters or longer. Might be multiple words",
    }
  ],
  handler: async ({ query }) => {
    // log query to console
    console.log("scraping query: ", query)
    // call scrape function with query and await result
    const result = await scrape(query)
    // log result to console
    console.log("Scraping result: ", result)
    return result
  }
}


// Define an asynchronous POST function to handle POST requests
export async function POST(req: Request): Promise<Response> {
  const actions: Action<any>[] = []

  // Check if TAVILY_API_KEY env var is set
  if(process.env["TAVILY_API_KEY"]) {
    actions.push(scrapingAction)
  }

  // Create a new instance of CoPilotRuntime with defined actions
  const copilotKit = new CopilotRuntime({
    actions: actions
  })

  const openaiModel = process.env["OPENAI_MODEL"]

  return copilotKit.response(req, new OpenAIAdapter({ model: openaiModel }))
}