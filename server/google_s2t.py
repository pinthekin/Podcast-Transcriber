import io
import os
from google.cloud import speech_v1p1beta1 as speech

# Set your Google Cloud API credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/path/to/your/credentials.json"

# Define the audio file to be transcribed
audio_file = "example-voice/meonLcN7LD4.wav"

# Create a Speech-to-Text client
client = speech.SpeechClient()

# Configure the audio file for transcription
with io.open(audio_file, "rb") as audio:
    content = audio.read()
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WAV,
        sample_rate_hertz=44100,
        language_code="en-US",
        enable_word_time_offsets=True,
    )

# Perform the transcription
response = client.recognize(config=config, audio=audio)

# Print the transcription results
for result in response.results:
    for word in result.alternatives[0].words:
        print(
            f"Word: {word.word}, "
            f"Start Time: {word.start_time.seconds + word.start_time.nanos * 1e-9}, "
            f"End Time: {word.end_time.seconds + word.end_time.nanos * 1e-9}"
        )
