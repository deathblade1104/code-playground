from dotenv import load_dotenv
load_dotenv()
import asyncio
import os
from pathlib import Path
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent


GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")


async def run_agent():
    # Create random directory if it doesn't exist
    random_dir = Path("/Users/shahbaz.raja/Desktop/Personal/genai-bootcamp/random")
    random_dir.mkdir(exist_ok=True)

    client = MultiServerMCPClient(
        {
            "github": {
                "command": "npx",
                "args": [
                    "-y",
                    "@modelcontextprotocol/server-github"
                ],
                "env": {
                    "GITHUB_PERSONAL_ACCESS_TOKEN": GITHUB_TOKEN
                },
                "transport": "stdio"
            },
            "filesystem": {
                "command": "npx",
                "args": [
                    "-y",
                    "@modelcontextprotocol/server-filesystem",
                    "/Users/shahbaz.raja/Desktop/Personal/genai-bootcamp"
                ],
                "transport": "stdio"
            }
        }
    )

    try:
        tools = await client.get_tools()
        agent = create_react_agent("groq:llama-3.3-70b-versatile", tools)

        # Clearer instruction for the agent
        message = "Create a new empty file with the xyz.json in the directory '/Users/shahbaz.raja/Desktop/Personal/genai-bootcamp/random. Can you fill it with random valid json data, given that char limit < 50."

        response = await agent.ainvoke({"messages": message})
        print(response["messages"][-1].content)

    except Exception as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(run_agent())