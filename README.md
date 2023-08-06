# Podcast Transcriber
In recent years, podcasts have gained massive popularity. However, most podcasts don’t offer clean transcripts of episodes. Further, podcast listeners have no way of navigating to specific parts of episodes by text-search. Podcast Transcriber is a web-app that transcribes and indexes inputted podcasts, allowing users to view transcripts and search for specific phrases within episodes.

# Functionality
- Users can input a YouTube link to a podcast
- Users can view whole transcripts of episodes
- Users can input phrases to search within transcripts
- If search results in a match, users can scrub to location within podcast audio where text matched


# Technical Architecture

The project uses a modern web application architecture, consisting of a frontend and backend that communicate with each other through an API. The frontend is built using React, a popular JavaScript library for building user interfaces, while the backend is built using Flask, a lightweight web framework for Python.

The frontend is responsible for handling user input, displaying search results, and providing a seamless user experience. It consists of several components, including a search form, a search results component, and a login component. These components are built using React and styled using CSS frameworks such as Tailwind and Material UI. The components are organized using a modular structure to allow for easy maintenance and scalability.

The search form component allows users to enter a YouTube video URL and a search query. When the user submits the form, the frontend sends a request to the backend API, passing the YouTube video ID and search query as parameters. The search results component then displays the search results returned by the API. 

The login component was implemented as an extra feature. This allows users to authenticate themselves with the backend API. When a user enters their username and password, the frontend sends a request to the backend API, which checks the user's credentials against a database of registered users. If the credentials are valid, the API returns a JSON Web Token (JWT), which is stored in the user's browser. The JWT is then sent with each subsequent API request to authenticate the user. 

The backend is responsible for handling API requests, processing data, and communicating with external services. It consists of several components, including a Redis database for storing transcripts and metadata, a YouTube Data API client for downloading audio from YouTube videos, and an OpenAI API client for transcribing the audio. 

When the backend receives an API request from the frontend, it first checks the user's JWT to ensure that the user is authorized to access the requested resource. If the user is authorized, the backend then downloads the audio from the specified YouTube video using the YouTube Data API client. Once the audio is downloaded, the backend passes it to the OpenAI API client for transcription. The resulting transcript and metadata, including the video ID and search query, are then stored in the Redis database.

To search through the transcripts, the backend uses a fuzzy text search algorithm to match search queries with transcript text. When the backend receives a search request from the frontend, it first checks the user's JWT to ensure that the user is authorized to access the requested resource. If the user is authorized, the backend searches the Redis database for transcripts that match the specified video ID and search query. The matching transcripts are then returned to the frontend as API responses. 

The technical architecture of the project was designed with scalability, maintainability, and security in mind. The modular structure of the frontend and backend components allows for easy expansion and modification of the application. The use of popular libraries and frameworks ensures compatibility with future updates and reduces development time. The use of a JWT-based authentication system provides a secure method for authenticating users and prevents unauthorized access to the API. 

# Installation instructions:

Here are the steps to download and run the application:

Clone the repository:

`git clone https://github.com/yourusername/yourproject.git`

Install the dependencies:

```
cd yourproject
pip install -r requirements.txt
npm install
```
Start the Redis server:

redis-server

Run the Flask backend:

`export FLASK_APP=app.py
export FLASK_ENV=development
flask run`
In a separate terminal, start the React frontend:

`npm start`
Open your web browser and go to http://localhost:3000 to view the application.

Note: Make sure to replace yourusername and yourproject with your actual GitHub username and project name, respectively.

