import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenAI } from "@google/genai";
import { File } from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { STORAGE_KEYS } from "./storage-keys";

const getMimeType = (fileUri: string): string => {
  const extension = fileUri.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
    case "heif":
      return "image/heic";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
};

export const processSharedImage = async (fileUri: string) => {
  try {
    const savedKey = await SecureStore.getItemAsync(STORAGE_KEYS.gemini_key);

    if (!savedKey) {
      Alert.alert("Erro", "Não há API key salva!");
      return undefined;
    }

    const file = new File(fileUri);
    const base64Data = await file.base64();

    if (!base64Data) {
      throw new Error("Não foi possível ler os dados da imagem.");
    }

    const ai = new GoogleGenAI({ apiKey: savedKey });

    const prompt = `
      Você é um digitalizador estruturado de receitas culinárias.

      TAREFA:
      Analise a imagem fornecida e extraia (ou, se necessário, infira) os dados da receita em português do Brasil. Retorne APENAS um objeto JSON válido, seguindo exatamente o schema abaixo.

      SCHEMA (respeite tipos e chaves exatamente):
      {
        "name": string,              // Nome claro e específico da receita
        "description": string,       // Resumo em 1 frase, máx. 100 caracteres
        "time": integer,             // Tempo total em minutos, número inteiro puro (ex: 60, 30). Nunca string, nunca unidade de texto.
        "ingredients": [
          { "description": string }  // Ex: "200g de açúcar", "2 colheres de sopa de sal"
        ],
        "steps": [
          { "description": string }  // Uma instrução por passo, em ordem sequencial
        ]
      }

      REGRAS DE FORMATAÇÃO:
      1. Responda SOMENTE com o JSON puro — sem texto antes ou depois, sem markdown, sem json, sem comentários.
      2. O JSON deve ser válido (aspas duplas, sem vírgulas sobrando, sem campos extras, sem campos ausentes).
      3. "time" deve ser sempre um número inteiro (int), nunca texto.
      4. "ingredients" e "steps" nunca podem vir vazios — devem ter pelo menos 1 item cada.

      REGRA PARA IMAGENS AMBÍGUAS OU BORRADAS:
      Se a imagem não mostrar uma receita clara (estiver borrada, incompleta ou ilegível), use quaisquer palavras, ingredientes ou pistas visuais identificáveis para criar uma receita plausível e coerente com esses elementos. Nunca retorne o JSON vazio, incompleto ou com aviso de erro — sempre entregue uma receita completa e plausível.

      Retorne agora apenas o objeto JSON.
    `;

    const fotoProntaParaIA = {
      inlineData: {
        data: base64Data,
        mimeType: getMimeType(fileUri),
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [{ text: prompt }, fotoProntaParaIA],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;

    if (!responseText || responseText.trim() === "") {
      throw new Error("A IA retornou uma resposta vazia.");
    }

    const cleanJsonString = responseText.replace(/```json|```/g, "").trim();

    const recipeData = JSON.parse(cleanJsonString) as Partial<IRecipeForm>;
    console.log("Dados estruturados com sucesso pela IA:", recipeData);

    return recipeData;
  } catch (error: any) {
    console.error("Erro no processSharedImage:", error?.message || error);
    Alert.alert(
      "Erro",
      `Não foi possível extrair os dados da foto.\n${error?.message ?? ""}`,
    );
    return undefined;
  }
};
