
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getCityGuideResponse = async (userPrompt: string) => {
  if (!API_KEY) return "AI servisi şu an kullanılamıyor (API Key eksik).";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Sen 'Gebzem' uygulamasının akıllı şehir asistanısın. 
        Kullanıcılara Gebze (Kocaeli) hakkında bilgi veriyorsun. 
        Gebze'nin sanayi kenti olmasının yanı sıra Eskihisar, Ballıkayalar, Osman Hamdi Bey Müzesi, 
        Gebze Teknik Üniversitesi ve Çoban Mustafa Paşa Külliyesi gibi önemli yerlerini biliyorsun.
        Cevaplarını her zaman samimi, yardımsever ve Türkçe ver. 
        Eğer bir yer öneriyorsan nedenini de kısaca açıkla.`,
        temperature: 0.7,
      },
    });

    return response.text || "Üzgünüm, şu an cevap veremiyorum.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bir hata oluştu, lütfen daha sonra tekrar dene.";
  }
};
