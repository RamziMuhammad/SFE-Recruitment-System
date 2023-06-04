import sys
import os
import time

import moviepy.editor as mp
import speech_recognition as sr

directoryPath = sys.argv[1]
video_file_path = sys.argv[2]
video_name = os.path.splitext(os.path.basename(video_file_path))[0]

audio_file_path = f"{directoryPath}/analysis/{video_name}.wav"
text_file_path = f"{directoryPath}/analysis/{video_name}.txt"

clip = mp.VideoFileClip(video_file_path)
clip.audio.write_audiofile(audio_file_path)

start_time = time.time()

r = sr.Recognizer()
audio = sr.AudioFile(audio_file_path)

with audio as source:
    audio_file = r.record(source)

result = r.recognize_google(audio_file)

with open(text_file_path, mode='w') as file:
    file.write(result)

end_time = time.time()
time_difference = end_time - start_time
print("Preprocessing time:", time_difference, "seconds")
