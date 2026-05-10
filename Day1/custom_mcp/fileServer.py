from mcp.server.fastmcp import FastMCP
import os

mcp = FastMCP("CustomFileSystem")

@mcp.tool()
def addFile(filename: str):
   """Create a new file in current directory"""
   if not os.path.exists(filename):
       with open(filename, "w") as f:
           pass
       print(f"File '{filename}' created.")
   else:
       print(f"File '{filename}' already exists.")


@mcp.tool()
def addFolder(directory_name: str):
   """Create a new Directory in current directory"""
   # Debug: Print current directory and target directory
   print(f"Current directory: {os.getcwd()}")
   print(f"Target directory: {os.path.abspath(directory_name)}")

   if not os.path.exists(directory_name):
       try:
           os.mkdir(directory_name)
           print(f"Directory '{directory_name}' created successfully.")

           # Debug: Check if directory actually exists
           if os.path.exists(directory_name):
               print(f"Directory exists: {os.path.abspath(directory_name)}")
           else:
               print(f"Directory does not exist: {os.path.abspath(directory_name)}")
       except Exception as e:
           print(f"Error creating directory: {e}")
   else:
       print(f"Directory '{directory_name}' already exists.")


@mcp.tool()
def writeFile(filename: str, content: str):
   """Write content to a file"""
   try:
       # Ensure directory exists
       os.makedirs(os.path.dirname(filename), exist_ok=True)

       # Debug: Print current directory and file path
       print(f"Current directory: {os.getcwd()}")
       print(f"Writing to file: {os.path.abspath(filename)}")

       with open(filename, "w") as f:
           f.write(content)
       print(f"Content written to '{filename}' successfully.")

       # Debug: Check if file exists after writing
       if os.path.exists(filename):
           print(f"File exists: {os.path.abspath(filename)}")
       else:
           print(f"File does not exist: {os.path.abspath(filename)}")

   except Exception as e:
       print(f"Error writing to file: {e}")

if __name__ == "__main__":
   mcp.run(transport="stdio")