from fastapi import FastAPI, HTTPException
import speech_recognition as sr


app = FastAPI()


@app.get("/record-audio/")
def record_audio():
    """
    Trigger a voice command, record the user's speech, and return the transcribed text.
    """
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            # Notify the user that recording has started
            print("Recording... Please speak.")
            
            # Listen to the user's speech
            audio_data = recognizer.listen(source, timeout=8)
            
            # Transcribe speech to text
            transcribed_text = recognizer.recognize_google(audio_data)
            
            # Return the transcribed text
            return {"message": "Speech recorded successfully", "transcription": transcribed_text}
        except sr.UnknownValueError:
            raise HTTPException(status_code=400, detail="Could not understand the audio. Please try again.")
        except sr.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Speech recognition service failed: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


