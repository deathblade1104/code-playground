from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import base64
from dotenv import load_dotenv


load_dotenv()
client = genai.Client()

contents = ('Hi, can you create a 3d rendered image of a grasshopper'
            'with horns and wings and a tail curling that looks goofy and happy'
            'futuristic farm like with lots of greenery?'
            'Can you also Shawn the sheep type animation')

response = client.models.generate_content(
    model="gemini-2.0-flash-preview-image-generation",
    contents=contents,
    config=types.GenerateContentConfig(
      response_modalities=['TEXT', 'IMAGE']
    )
)

for part in response.candidates[0].content.parts:
  if part.text is not None:
    print(part.text)
  elif part.inline_data is not None:
    image = Image.open(BytesIO((part.inline_data.data)))
    image.save('gemini-native-image.png')
    image.show()