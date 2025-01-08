import asyncio
from googletrans import Translator, LANGUAGES
from gtts import gTTS
import os
import platform

async def translate_and_speak(text, dest_language):
    try:
        # Initialize the translator
        translator = Translator()

        # Check if the language code is supported
        if dest_language not in LANGUAGES:
            print(f"Error: Language code '{dest_language}' is not supported.")
            return

        # Translate the text
        translation = await translator.translate(text, dest=dest_language)

        # Print the translated text
        print("Translated text:", translation.text)

        # Convert the translated text to speech
        tts = gTTS(text=translation.text, lang=dest_language)

        # Save the audio file
        audio_file = "translated_speech.mp3"
        tts.save(audio_file)

        # Play the audio file based on the OS
        system_platform = platform.system()
        if system_platform == "Windows":
            os.system(f"start {audio_file}")
        elif system_platform == "Darwin":  # macOS
            os.system(f"afplay {audio_file}")
        elif system_platform == "Linux":
            os.system(f"xdg-open {audio_file}")
        else:
            print("Error: Unsupported operating system.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Example input
    text_to_translate = "Hello, how are you?"
    # Specify the desired African language code (e.g., 'sw' for Swahili, 'zu' for Zulu)
    language_code = 'sw'  # Change this to the desired language code
    
    # Run the async function
    asyncio.run(translate_and_speak(text_to_translate, language_code))