## GenAI Bootcamp

A hands-on collection of small projects and demos exploring agents, MCP servers/clients, Streamlit chat apps, image generation, and RAG using a local ChromaDB. This README gives you a clean setup path, how to run each demo, and clear anchors to revise or extend later.

### Contents
- **Day1**: lightweight agents, LangChain/Graph demos, MCP servers/clients
- **Day2**: Streamlit chat apps, image generation, and a simple RAG app
- **chroma_genai**: local ChromaDB data directory for the RAG demo

### Prerequisites
- Python 3.11 (already present in this repo’s `venv`)
- macOS (darwin 25+ per your environment)
- Recommended: Homebrew for system packages

### Quick Start
1) Activate the virtual environment

```bash
source venv/bin/activate
```

2) Install Python dependencies (if you add/change packages, update `requirements.txt`)

```bash
pip install -r requirements.txt
```

3) (Optional) Set environment variables (API keys, model endpoints)

```bash
export OPENAI_API_KEY=...           # if any OpenAI examples are added
export GOOGLE_API_KEY=...           # if using Gemini APIs
export HUGGINGFACEHUB_API_TOKEN=... # for HF models if needed
```

## Running the Demos

### Day1
Location: `Day1/`

- Agents (LangGraph / simple agents)

```bash
python Day1/agents.py
python Day1/langgraph_chatbot.py
```

- LangChain LLM example

```bash
python Day1/langchain_llm.py
```

- Structured response demo

```bash
python Day1/structured_response.py
```

- MCP (Model Context Protocol) servers/clients
  - File server (custom)

```bash
python Day1/custom_mcp/fileServer.py
```

  - Example MCP main

```bash
python Day1/custom_mcp/main.py
```

  - Math server

```bash
python Day1/math_server.py
```

  - Clients

```bash
python Day1/github_mcp_client.py
python Day1/multi_mcp_client.py
```

Notes:
- Some clients may expect specific server addresses/ports or environment variables. Check each script’s top-level constants and adjust as needed.

### Day2
Location: `Day2/`

- Streamlit apps

```bash
streamlit run Day2/1_streamlit_app.py
streamlit run Day2/2_streamlit_chatbot.py
```

- Image generation

```bash
python Day2/3_multimodel_image_gen.py
streamlit run Day2/4_streamlit_image_gen.py
```

- RAG demo (ChromaDB-backed)

```bash
python Day2/5_RAG.py
```

If you see missing packages for Chroma or embeddings, ensure `requirements.txt` is up to date and re-run the install step.

## Data and Vector Store

- ChromaDB directory: `chroma_genai/`
  - Contains `chroma.sqlite3` and HNSW files under the generated collection id subfolder
  - The RAG script `Day2/5_RAG.py` expects to read/write here by default

To reset your local vector store, you can remove `chroma_genai/` (this deletes your local index):

```bash
rm -rf chroma_genai
```

Then re-run the RAG script to rebuild.

## Project Structure (High-Level)

```
genai-bootcamp/
  Day1/
    agents.py
    langgraph_chatbot.py
    langchain_llm.py
    structured_response.py
    custom_mcp/
      fileServer.py
      main.py
    math_server.py
    github_mcp_client.py
    multi_mcp_client.py
  Day2/
    1_streamlit_app.py
    2_streamlit_chatbot.py
    3_multimodel_image_gen.py
    4_streamlit_image_gen.py
    5_RAG.py
  chroma_genai/
    chroma.sqlite3
    <collection-id>/
  requirements.txt
  venv/
```

## Common Issues & Tips

- Virtualenv not active: If `python` resolves to the system Python, run `source venv/bin/activate` again.
- Streamlit caching: If UI doesn’t refresh, use the “Rerun” button or stop/restart the command.
- API rate limits: For cloud models, add retry/backoff or reduce request frequency.
- SSL or network issues: Confirm proxies/VPNs and test a basic `curl` to model endpoints.

## How to Extend

- Add new demos under `Day1/` or `Day2/` with clear filenames and a short docstring at the top explaining purpose and required env vars.
- If you introduce new dependencies, pin versions and update `requirements.txt`.
- For new RAG datasets, script a small ingestion utility that writes to `chroma_genai/` and include a brief section here on how to run it.
- Prefer small, focused scripts with function entry points so they can be imported and reused.

## Maintenance Checklist (for your next revision)

- [ ] Audit and prune unused dependencies in `requirements.txt`
- [ ] Confirm each script’s top-of-file comments list any required env vars
- [ ] Add minimal tests or smoke scripts for the most used demos
- [ ] Add screenshots/GIFs of Streamlit apps to `docs/` and link them here
- [ ] Consider `.env` support (e.g., `python-dotenv`) for local keys

## License

Add your preferred license here (e.g., MIT). If private, specify usage constraints.


