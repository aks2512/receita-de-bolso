import { GoogleGenAI } from "@google/genai";
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
      Analise o conteúdo, metadados e transcrições publicamente disponíveis deste link de vídeo: https://www.youtube.com/shorts/eydMbeMvEe8.
      Extraia os dados culinários e preencha as chaves conforme as regras do sistema.
    `;

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: prompt,
    //   config: {
    //     responseMimeType: "application/json",
    //     systemInstruction: `
    //       Você é um assistente culinário avançado. Sua única tarefa é ler o link recebido e estruturar uma receita.
    //       Você deve responder EXATAMENTE no formato JSON abaixo, sem textos extras antes ou depois:

    //       {
    //         "name": "Nome da receita extraída do vídeo e entre parentes o link do video (String)",
    //         "description": "Resumo breve da receita descrita no vídeo (String)",
    //         "time": "Tempo estimado de preparo citado (ex: '45 min') (String)",
    //         "ingredients": [
    //           { "name": "Nome do ingrediente", "amount": "Quantidade" }
    //         ],
    //         "steps": [
    //           { "description": "Descrição detalhada do passo a passo" }
    //         ]
    //       }

    //       Se o vídeo não for de receita ou estiver bloqueado, invente uma receita criativa baseada nas palavras-chave do link para que o formulário nunca fique vazio.
    //     `,
    //   },
    // });

    // if (!response.text) {
    //   throw new Error("Resposta vazia da IA.");
    // }

    // const cleanJsonString = response.text.replace(/```json|```/g, "").trim();

    // const recipeData = JSON.parse(cleanJsonString) as Partial<IRecipeForm>;
    // console.log("Receita extraída com sucesso do link:", recipeData);

    // return recipeData;
    return undefined;
  } catch (error) {
    console.error("Erro detalhado no processSharedLink:", error);
    Alert.alert("Erro", "Não foi possível analisar o link enviado.");
    return undefined;
  }
};
