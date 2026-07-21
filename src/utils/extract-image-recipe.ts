import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenAI, Type } from "@google/genai";
import { File } from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { STORAGE_KEYS } from "./storage-keys";

export const processSharedImage = async (fileUri: string) => {
  try {
    const savedKey = await SecureStore.getItemAsync(STORAGE_KEYS.gemini_key);
    if (savedKey) {
      const ai = new GoogleGenAI({
        apiKey: savedKey,
      });

      const base64Data = await new File(fileUri).base64();

      const prompt = `
          Analise esta imagem. Extraia a receita culinária dela e formate EM PORTUGUÊS exatamente neste formato JSON:
          {
            "name": "Nome da receita",
            "description": "Descrição",
            "time": "20 min",
            "ingredients": [{name: "Ingrediente 1", quantity: "200 gramas"}],
            "steps": [{description: "Passo 1"}]
          }
          Retorne as listas de ingredientes e modo de preparo separadas por quebras de linha (\\n) para facilitar o preenchimento de caixas de texto longas.
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
                  amount: { type: Type.STRING },
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
        },
      });

      const recipeData = JSON.parse(
        response.text as string,
      ) as Partial<IRecipeForm>;
      console.log(recipeData);

      return recipeData;
    } else {
      Alert.alert("Erro", "Não há API key salva!");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Não foi possível extrair os dados da foto.");
  }
};
