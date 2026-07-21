import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenAI } from "@google/genai";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { STORAGE_KEYS } from "./storage-keys";

export const processSharedLink = async (videoUrl: string) => {
  try {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = videoUrl.match(urlRegex);
    const cleanUrl = match ? match[0] : videoUrl;

    const savedKey = await SecureStore.getItemAsync(STORAGE_KEYS.gemini_key);

    if (!savedKey) {
      Alert.alert("Erro", "Não há API key salva!");
      return undefined;
    }

    const ai = new GoogleGenAI({ apiKey: savedKey });

    const prompt = `
      Atue como um extrator de receitas estruturadas.
      Analise a transcrição, descrição e metadados deste vídeo do YouTube.

      Gere EXATAMENTE o objeto JSON abaixo em português. 
      Não adicione nenhuma palavra, comentário ou marcação markdown (\`\`\`json) antes ou depois do JSON:

      {
        "name": "Nome curto e claro da receita",
        "description": "Resumo em uma frase do prato (máximo 100 caracteres)",
        "time": "Total de minutos apenas como número inteiro, sem letras ou textos (ex: se for 1 hora coloque 60, se for 30 minutos coloque 30)",
        "ingredients": [
          { 
            "name": "Nome do ingrediente", 
            "amount": "Apenas a quantidade e unidade de medida (ex: '200g', '2 colheres')" 
          }
        ],
        "steps": [
          { "description": "Texto curto descrevendo a instrução deste passo sequencial" }
        ]
      }

      Se o vídeo não for de culinária, use o título do link para criar uma receita criativa plausível, garantindo que o JSON nunca venha vazio.
  `;

    // A URL do vídeo é enviada como fileData, uma part separada do texto.
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        {
          fileData: {
            fileUri: cleanUrl,
            mimeType: "video/*",
          },
        },
        { text: prompt },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    // No novo SDK, response.text já vem pronto (propriedade, não função)
    const responseText = response.text;

    if (!responseText || responseText.trim() === "") {
      throw new Error("A IA retornou um texto completamente vazio.");
    }

    const cleanJsonString = responseText.replace(/```json|```/g, "").trim();

    const recipeData = JSON.parse(cleanJsonString);
    Alert.alert("Sucesso", "Dados gerados com sucesso!");

    return recipeData as Partial<IRecipeForm>;
  } catch (error: any) {
    console.error(
      "Erro real na chamada nativa do Gemini:",
      error?.message || error,
    );
    Alert.alert(
      "Erro",
      `Não foi possível analisar o link enviado.\n${error?.message ?? ""}`,
    );
    return undefined;
  }
};
