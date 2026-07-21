import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenAI, Type } from "@google/genai";
import * as FileSystem from "expo-file-system"; // Ajustado para usar o FileSystem padrão
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

    const ai = new GoogleGenAI({
      apiKey: savedKey,
    });

    // CORREÇÃO: Método nativo e correto para obter o Base64 no Expo
    const file = new FileSystem.File(fileUri);
    const base64Data = await file.base64();

    const prompt = `
      Analise esta imagem. Extraia a receita culinária dela e formate EM PORTUGUÊS 
      seguindo estritamente a estrutura de chaves definida no esquema JSON fornecido.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg",
          },
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "Nome da receita (mínimo 3 caracteres)",
            },
            description: {
              type: Type.STRING,
              description: "Descrição breve da receita (máximo 100 caracteres)",
            },
            time: {
              type: Type.STRING,
              description:
                "Tempo de preparo formatado (ex: '30 min', '1 hora')",
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: {
                    type: Type.STRING,
                    description:
                      "Quantidade ou porção do ingrediente (ex: '200 gramas', '1 colher')",
                  },
                },
                required: ["name", "amount"],
              },
              description: "Lista com no mínimo 1 ingrediente",
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
              description: "Lista com no mínimo 1 passo de instrução",
            },
          },
          required: ["name", "ingredients", "steps"],
        },
      },
    });

    if (!response.text) {
      throw new Error("A IA retornou uma resposta vazia.");
    }

    const recipeData = JSON.parse(response.text) as Partial<IRecipeForm>;
    console.log("Dados estruturados pela IA:", recipeData);

    return recipeData;
  } catch (error) {
    console.error("Erro no processSharedImage:", error);
    Alert.alert("Erro", "Não foi possível extrair os dados da foto.");
    return undefined;
  }
};
