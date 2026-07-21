import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenAI, Type } from "@google/genai";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { STORAGE_KEYS } from "./storage-keys";

export const processSharedLink = async (videoUrl: string) => {
  try {
    const savedKey = await SecureStore.getItemAsync(STORAGE_KEYS.gemini_key);

    if (!savedKey) {
      Alert.alert("Erro", "Não há API key salva!");
      return undefined;
    }

    const ai = new GoogleGenAI({ apiKey: savedKey });

    const prompt = `
      Você é um assistente culinário avançado. 
      Analise o conteúdo, metadados e transcrições publicamente disponíveis deste link de vídeo: ${videoUrl}.
      
      Se o vídeo for de uma receita culinária, extraia as informações e formate EM PORTUGUÊS 
      seguindo estritamente a estrutura de chaves definida no esquema JSON fornecido.
      
      Se o vídeo NÃO for de culinária ou se você não conseguir acessar o conteúdo por bloqueios, 
      gere uma receita genérica criativa baseada no título/tema do link para não deixar o formulário em branco.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "Nome da receita extraída do vídeo",
            },
            description: {
              type: Type.STRING,
              description: "Resumo breve da receita descrita no vídeo",
            },
            time: {
              type: Type.STRING,
              description:
                "Tempo estimado de preparo citado no vídeo (ex: '45 min')",
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING },
                },
                required: ["name", "amount"],
              },
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                },
                required: ["description"],
              },
            },
          },
          required: ["name", "ingredients", "steps"],
        },
      },
    });

    if (!response.text) {
      throw new Error("Resposta vazia da IA.");
    }

    const recipeData = JSON.parse(response.text) as Partial<IRecipeForm>;
    return recipeData;
  } catch (error) {
    console.error("Erro no processSharedLink:", error);
    Alert.alert("Erro", "Não foi possível analisar o link enviado.");
    return undefined;
  }
};
