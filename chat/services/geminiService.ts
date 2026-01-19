
import { GoogleGenAI, Type } from "@google/genai";
import { Message, GroundingSource } from "../types";
import { Language } from "./translations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Sovereign Query with Search, Maps, Thinking, and Bolt (Flash Lite)
 */
export const sovereignQuery = async (
  prompt: string, 
  tools: { search?: boolean, maps?: boolean } = {}, 
  useThinking: boolean = false,
  language: Language = 'en'
) => {
  const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Model Selection Logic
  let modelName = 'gemini-3-flash-preview'; 
  if (useThinking) modelName = 'gemini-3-pro-preview';

  const systemInstructions: Record<Language, string> = {
    ar: "أنت نظام TEOS السيادي المصري المتطور. إجاباتك سريعة ودقيقة وموثقة باللغة العربية.",
    en: "You are the advanced TEOS Sovereign System. Your answers are fast, accurate, and documented in English.",
    fr: "Vous êtes le système souverain TEOS avancé. Vos réponses sont rapides, précises et documentées en Français.",
    es: "Usted es el avanzado Sistema Soberano TEOS. Sus respuestas son rápidas, precisas y documentadas en Español.",
    de: "Sie sind das fortschrittliche TEOS Sovereign System. Ihre Antworten sind schnell, genau und in Deutsch dokumentiert.",
    zh: "您是先进的 TEOS 主权系统。您的回答快速、准确且记录在案（中文）。",
    ja: "あなたは高度な TEOS 主権システムです。あなたの回答は迅速で正確であり、日本語で文書化されています。",
    ru: "Вы — передовая суверенная система TEOS. Ваши ответы быстры, точны и документированы на русском языке.",
    hi: "आप उन्नत TEOS संप्रभु प्रणाली हैं। आपके उत्तर तेज़, सटीक और हिंदी में प्रलेखित हैं।",
    ko: "귀하는 고급 TEOS 주권 시스템입니다. 귀하의 답변은 빠르고 정확하며 한국어로 문서화되어 있습니다."
  };

  const config: any = {
    systemInstruction: systemInstructions[language] || systemInstructions.en,
  };

  const enabledTools: any[] = [];
  if (tools.search) enabledTools.push({ googleSearch: {} });
  if (tools.maps) enabledTools.push({ googleMaps: {} });
  
  if (enabledTools.length > 0) config.tools = enabledTools;

  if (useThinking) {
    config.thinkingConfig = { thinkingBudget: 8000 };
  }

  try {
    const response = await aiInstance.models.generateContent({
      model: modelName,
      contents: prompt,
      config: config
    });

    const text = response.text;
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) sources.push({ title: chunk.web.title, uri: chunk.web.uri });
        else if (chunk.maps) sources.push({ title: chunk.maps.title, uri: chunk.maps.uri });
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Query Error:", error);
    return { text: "Error processing sovereign request.", sources: [] };
  }
};

/**
 * High-Quality Image Generation (Nano Banana Pro)
 */
export const generateImagePro = async (prompt: string) => {
  if (!(window as any).aistudio?.hasSelectedApiKey()) {
    await (window as any).aistudio?.openSelectKey();
  }

  const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

/**
 * Document Analysis (Scanner)
 */
export const analyzeDocument = async (base64Image: string, prompt: string = "Analyze this document accurately.") => {
  const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: "image/png" } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Doc Analysis Error:", error);
    return "Analysis currently unavailable.";
  }
};

export const summarizePolicy = async (policyText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize: ${policyText}`,
    });
    return response.text;
  } catch (error) { return "Summary unavailable."; }
};

export const editImageWithGemini = async (base64Image: string, prompt: string) => {
  const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: "image/png" } },
          { text: prompt }
        ]
      }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("No edited image");
  } catch (error) { throw error; }
};

export const animateImageWithVeo = async (base64Image: string, prompt: string) => {
  if (!(window as any).aistudio?.hasSelectedApiKey()) await (window as any).aistudio?.openSelectKey();
  const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    let operation = await aiInstance.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Cinematic animation',
      image: { imageBytes: base64Image.split(',')[1], mimeType: 'image/png' },
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(r => setTimeout(r, 5000));
      operation = await aiInstance.operations.getVideosOperation({ operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) { throw error; }
};
