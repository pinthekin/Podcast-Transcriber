import yt_dlp
from dotenv import load_dotenv
import os
import openai
import redis
import re
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from pathlib import Path

load_dotenv()
openai.api_key = os.environ.get("OPENAI_TOKEN")

# Connect to Redis database
r = redis.Redis(host="localhost", port=6379, db=0)

app = Flask(__name__)
app.config["SECRET_KEY"] = "mysecretkey"


# Function to download audio from YouTube using youtube-dl
def download_audio(youtube_id):
    audio_file = f"{youtube_id}.wav"

    # Don't download the audio again if it already exists
    if Path(audio_file).is_file():
        return audio_file

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": "%(id)s.%(ext)s",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "wav",
                "preferredquality": "192",
            }
        ],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(f"https://www.youtube.com/watch?v={youtube_id}", download=True)
        downloaded_file = ydl.prepare_filename(info_dict)

    os.rename(downloaded_file, audio_file)
    return audio_file

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return make_response(jsonify({"msg": "Missing username parameter"}), 400)
    if not password:
        return make_response(jsonify({"msg": "Missing password parameter"}), 400)

    # TODO Add your authentication code here to check if the user's credentials are valid
    if username != "user" or password != "password":
        return make_response(jsonify({"msg": "Invalid username or password"}), 401)

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

# Function to transcribe audio using OpenAI's Whisper model
def transcribe_audio(audio_file, prompt=None):
    # Check if the transcription is already in Redis
    transcription = r.get(audio_file)
    if transcription is not None:
        return transcription.decode("utf-8")

    # Open the audio file
    with open(audio_file, "rb") as audio_file_handle:
        # Set up the options for the Whisper API request
        options = {
            "model": "whisper-1",
            "audio": audio_file_handle
        }

        # If a prompt is provided, add it to the options
        if prompt is not None:
            options["prompt"] = prompt

        # Call the Whisper API to transcribe the audio
        response = openai.Audio.transcribe(**options)

    # Get the transcript from the API response
    transcript = response["data"]["transcript"]

    # Save the transcription in Redis
    r.set(audio_file, transcript)

    return transcript


# Function to search through transcripts using a fuzzy text-search algorithm
def search_transcript(transcription, search_query):
    # Get the transcript from Redis database
    transcript = r.get(transcription)

    # Convert the transcript from bytes to string
    transcript = transcript.decode("utf-8")

    # Split the transcript into lines
    lines = transcript.split("\n")

    # Search through each line using a fuzzy text-search algorithm
    results = []
    for line_num, line in enumerate(lines):
        match = re.search(search_query, line, re.IGNORECASE)
        if match:
            # If there's a match, add the timestamp to the results list
            minutes, seconds = divmod(line_num * 5, 60)
            results.append(f"{minutes:02d}:{seconds:02d}")
    return results


# Define a WTForms form to take input from the user
class SearchForm(FlaskForm):
    search_query = StringField("Search Query")
    submit = SubmitField("Search")


# Create a route for the home page and render a template to display the form
@app.route("/", methods=["GET", "POST"])
def home():
    form = SearchForm()
    if form.validate_on_submit():
        search_query = form.search_query.data
        youtube_url = form.youtube_url.data
        video_id = extract_video_id(youtube_url)
        if video_id is not None:
            return redirect(url_for("search", search_query=search_query, video_id=video_id))
        else:
            flash("Invalid YouTube URL. Please enter a valid URL.")
    return render_template("home.html", form=form)


# Function to extract the YouTube video ID from the provided URL
def extract_video_id(url):
    match = re.match(r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([-\w]+)", url)
    if match:
        return match.group(1)
    return None


# Create a route for the search page, and call the functions to download the audio, transcribe it, and search through the transcript
@app.route("/search/<search_query>/<video_id>")
def search(search_query, video_id):
    try:
        audio = download_audio(video_id)
        transcription = transcribe_audio(audio)
        results = search_transcript(audio, search_query)
    except Exception as e:
        return render_template("error.html", error_message=str(e))
    return render_template("search.html", search_query=search_query, results=results, video_id=video_id)


if __name__ == "__main__":
    app.run(debug=True)
