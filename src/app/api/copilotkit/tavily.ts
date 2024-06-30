// Import libraries - OpenAPI
import OpenAI from "openai"

// Define an asynchronous function naamed `scrape` that takes a search query string as argument
export async function scrape(query: string) {
  // Send a POST request to the specified API endpoint with the search query
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: "basic",
      include_answer: true,
      include_images: false,
      include_raw_content: false,
      max_results: 20,
    })
  })

  // Parse the JSON response from API
  const responseJson = await response.json()

  // Instantiate OpenAI class
  const openAi = new OpenAI()

  // Use the OpenAI API to create a completion based on the JSON response
  const completion = await openAi.chat.completions.create({
    messages: [
      {
        role: "system",
        // Summarize the JSON response
        content: `Summarize the following JSON to answer the research query \`"${query}"\` : ${JSON.stringify(
          responseJson)} in plain English`,
      }
    ],
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo"
  })

  // Return the content of the first message choice from the completion response
  return completion.choices[0].message.content
}