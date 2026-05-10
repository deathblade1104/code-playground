from dotenv import load_dotenv
load_dotenv()
import asyncio
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

async def run_agent():
    client = MultiServerMCPClient(
        {
            "customFileSystem": {
                "command": "python",
                "args": ["./fileServer.py"],
                "transport": "stdio"
            }
        }
    )

    try:
        tools = await client.get_tools()
        agent = create_react_agent(
            "groq:llama-3.1-8b-instant",  # Try different model
            tools,
            checkpointer=None
        )

        # Single message with clear instructions
        message = """Please help me create a file structure:
1. Create a folder named 'files'
2. Create a file 'xyz.json' inside the 'files' folder
3. Write this JSON content to the file: {"id": 42, "name": "test", "active": false}

Use the appropriate tools to complete this task."""

        response = await agent.ainvoke({"messages": message})
        print(response["messages"][-1].content)

    except Exception as e:
        print(f"Error occurred: {e}")
        print("Available tools:")
        for tool in tools:
            print(f"- {tool.name}: {tool.description}")

if __name__ == "__main__":
    asyncio.run(run_agent())