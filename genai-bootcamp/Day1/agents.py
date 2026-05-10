from dotenv import load_dotenv
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import InMemorySaver
from pydantic import BaseModel

load_dotenv()
checkpointer = InMemorySaver()
config = {"configurable": {"thread_id": "1"}}



def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"


agent = create_react_agent(
    model="groq:llama-3.3-70b-versatile",
    tools=[get_weather],
    prompt="You are a helpful assistant.",
    checkpointer=checkpointer,
)


# Run the agent
response = agent.invoke(
    {"messages": [{"role": "user", "content": "Who is ModiJi?"}]},
    config
)

print(response["messages"][-1].content);


response = agent.invoke(
    {"messages": [{"role": "user", "content": "When was he born?"}]},
    config
)

print(response["messages"][-1].content);


try:
   img = agent.get_graph().draw_mermaid_png()
   with open("agent_graph.png", "wb") as f:
       f.write(img)
except Exception:
   pass

