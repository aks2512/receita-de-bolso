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
      model: "gemini-3.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
  Atue como um digitalizador estruturado de receitas.
  Analise esta imagem, extraia os dados culinários em português e monte EXATAMENTE o objeto JSON abaixo.
  Não adicione nenhuma palavra, comentário, explicação ou marcação markdown (\`\`\`json) antes ou depois do JSON:

  {
    "name": "Nome claro da receita",
    "description": "Resumo em uma frase do prato (máximo 100 caracteres)",
    "time": "Total de minutos apenas como número inteiro, sem letras ou textos (ex: se for 1 hora coloque 60, se for 30 minutos coloque 30)",
    "ingredients": [
      { 
        "name": "Nome do ingrediente", 
        "amount": "Apenas a quantidade e unidade (ex: '200g', '1 colher de sopa')" 
      }
    ],
    "steps": [
      { "description": "Texto descrevendo a instrução deste passo sequencial" }
    ]
  }

  Se a imagem não contiver uma receita clara ou estiver borrada, use as palavras visíveis para gerar uma receita criativa plausível, garantindo que o JSON nunca venha vazio.
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
