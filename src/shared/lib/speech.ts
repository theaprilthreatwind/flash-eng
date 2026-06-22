export function speak(text: string, lang = "en-US") {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("Speech synthesis is not supported in this environment.");
    return;
  }

  // Cancel any ongoing speech synthesis to immediately play the new one
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  // Try to find a high-quality English voice
  const voices = window.speechSynthesis.getVoices();
  const englishVoice =
    voices.find(
      (voice) => voice.lang.toLowerCase().replace("_", "-") === lang.toLowerCase()
    ) || voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
}
