import { GoogleGenerativeAI } from "@google/generative-ai"; // Importação correta para Expo
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

    const genAI = new GoogleGenerativeAI(savedKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      Você é um assistente culinário avançado.
      Analise o conteúdo, metadados e transcrições disponíveis deste link de vídeo do YouTube: ${videoUrl}.
      
      Extraia os dados culinários e preencha as chaves EXATAMENTE no formato JSON abaixo, sem blocos de texto decorativos ou comentários antes ou depois:

      {
        "name": "Nome da receita extraída do vídeo",
        "description": "Resumo breve da receita",
        "time": "Tempo estimado de preparo",
        "ingredients": [
          { "name": "Nome do ingrediente", "amount": "Quantidade" }
        ],
        "steps": [
          { "description": "Descrição detalhada do passo" }
        ]
      }
    `;

    const response = await model.generateContent(prompt);

    const responseText = response.response.text();

    const cleanJsonString = responseText.replace(/```json|```/g, "").trim();

    const recipeData = JSON.parse(cleanJsonString);
    console.log("Sucesso ao gerar dados:", recipeData);

    return recipeData;
  } catch (error: any) {
    console.error(
      "Erro real na chamada nativa do Gemini:",
      error?.message || error,
    );
    Alert.alert("Erro", "Não foi possível analisar o link enviado.");
    return undefined;
  }
};
