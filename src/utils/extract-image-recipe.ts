import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Importação correta para Expo
import * as FileSystem from "expo-file-system"; // Ajustado para os métodos nativos reais
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { STORAGE_KEYS } from "./storage-keys";

export const processSharedImage = async (fileUri: string) => {
  try {
    const savedKey = await SecureStore.getItemAsync(STORAGE_KEYS.gemini_key);

    if (!savedKey) {
      Alert.alert("Erro", "Não há API key salva!");
      return undefined;
    }

    const file = new FileSystem.File(fileUri);
    const base64Data = await file.base64();

    const genAI = new GoogleGenerativeAI(savedKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      Analise esta imagem. Extraia a receita culinária dela e formate EM PORTUGUÊS 
      respondendo ESTRITAMENTE e EXATAMENTE no formato JSON estruturado abaixo. 
      Não adicione saudações, explicações, comentários ou marcações extras antes ou depois:

      {
        "name": "Nome da receita (String com mínimo 3 caracteres)",
        "description": "Descrição breve da receita (String com máximo 100 caracteres)",
        "time": "Tempo de preparo formatado (ex: '30 min', '1 hora') (String)",
        "ingredients": [
          { 
            "name": "Nome do ingrediente (String)", 
            "amount": "Quantidade ou porção do ingrediente (ex: '200 gramas', '1 colher') (String)" 
          }
        ],
        "steps": [
          { "description": "Descrição detalhada do passo de instrução (String)" }
        ]
      }
    `;

    const fotoProntaParaIA = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    const response = await model.generateContent([prompt, fotoProntaParaIA]);

    if (!response || !response.response || !response.response.text) {
      throw new Error("A IA retornou uma resposta vazia.");
    }

    const responseText = response.response.text();

    const cleanJsonString = responseText.replace(/```json|```/g, "").trim();

    const recipeData = JSON.parse(cleanJsonString) as Partial<IRecipeForm>;
    console.log("Dados estruturados com sucesso pela IA:", recipeData);

    return recipeData;
  } catch (error: any) {
    console.error("Erro no processSharedImage:", error?.message || error);
    Alert.alert("Erro", "Não foi possível extrair os dados da foto.");
    return undefined;
  }
};
