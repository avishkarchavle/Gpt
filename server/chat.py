# # import vertexai
# # from vertexai.preview.generative_models import GenerativeModel

# # project_id ='active-tangent-428009-a6'
# # location='us-central1'

# # vertexai.init(project=project_id,location=location)

# # model = GenerativeModel('gemini-pro')
# # response = model.generate_content('Aeroplane')

# # print(response.text)
# import sys
# import vertexai
# from vertexai.preview.generative_models import GenerativeModel

# project_id = 'active-tangent-428009-a6'
# location = 'us-central1'

# vertexai.init(project=project_id, location=location)

# model = GenerativeModel('gemini-pro')
# user_input = sys.argv[1]  # Get the input from the command line argument
# prompt="Consider yourself as Avishkar, Explain the theory of relativity in simple terms."

# response = model.generate_content(prompt+user_input)

# print(response.text)
import os
import sys
import vertexai
from vertexai.preview.generative_models import GenerativeModel
from google.oauth2 import service_account
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def main():
    # Retrieve the path to the service account key from environment variables
    credentials_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')

    # Create a Credentials object from the service account key
    credentials = service_account.Credentials.from_service_account_file(credentials_path)

    # Initialize Vertex AI with the created credentials object
    vertexai.init(credentials=credentials)

    # Specify the Generative Model you want to use (replace 'gemini-pro' with your model name)
    model_name = 'gemini-pro'
    model = GenerativeModel(model_name)

    # Example prompt (you can modify this based on your needs)
    prompt = "Consider yourself as Avishkar, give the detailed answer "
    # Fetch user input from command line argument
    if len(sys.argv) > 1:
        user_input = sys.argv[1]
    else:
        user_input = ""

    # Generate content based on prompt + user input
    response = model.generate_content(prompt + user_input)

    # Print the generated response
    print(response.text)

if __name__ == "__main__":
    main()
