import { IRecipeForm } from "@/validations/recipe-schema";
import { GoogleGenAI } from "@google/genai";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { STORAGE_KEYS } from "./storage-keys";

export const processSharedText = async (text: string) => {
  try {
    const savedKey = await SecureStore.getItemAsync(STORAGE_KEYS.gemini_key);

    if (!savedKey) {
      Alert.alert("Erro", "Não há API key salva!");
      return undefined;
    }

    const ai = new GoogleGenAI({ apiKey: savedKey });

    const prompt = `
      Você é um extrator especializado em transformar textos de receitas culinárias em JSON estruturado.

      ENTRADA
      Você receberá um texto livre contendo uma receita (pode estar bem formatada, em formato de post, mensagem informal, lista solta de ingredientes e modo de preparo, ou até um texto corrido misturando tudo).

      TAREFA
      Analise todo o texto fornecido e produza uma receita estruturada, mesmo que as informações estejam incompletas, desorganizadas, informais ou implícitas.

      REGRAS DE SAÍDA (OBRIGATÓRIAS)
      - Responda APENAS com um objeto JSON válido, em português do Brasil.
      - Não inclua nenhum texto antes ou depois do JSON.
      - Não use marcação markdown.
      - Não inclua comentários, explicações ou notas.
      - O JSON deve ser válido: aspas duplas, sem vírgulas sobrando, sem valores nulos.
      - Nenhum campo pode ficar vazio, nulo ou ausente.

      ESTRUTURA EXATA A SER GERADA
      {
        "name": string,
        "description": string,
        "time": integer,
        "ingredients": [ { "description": string } ],
        "steps": [ { "description": string } ]
      }

      ESPECIFICAÇÃO DOS CAMPOS
      - "name": nome curto e claro da receita (máx. 60 caracteres), sem emojis.
        - Se o texto não tiver um título explícito, infira um nome adequado a partir dos ingredientes/preparo.
      - "description": resumo do prato em uma frase (máx. 100 caracteres).
      - "time": tempo total estimado em minutos, número inteiro puro (sem "min", "h" ou texto).
        - Se o texto mencionar tempo de preparo + cozimento, some tudo.
        - Se não houver tempo explícito, estime um valor plausível com base no tipo de prato e na complexidade do preparo descrito.
      - "ingredients": lista com pelo menos 3 itens.
        - Extraia quantidade + unidade + nome do ingrediente (ex: "200g de açúcar", "2 colheres de sopa de sal", "1 unidade de cebola picada").
        - Se a quantidade não estiver explícita no texto, estime uma quantidade razoável em vez de omitir o ingrediente.
        - Normalize abreviações e formatos (ex: "c.s." → "colher de sopa", "1kg" → "1kg").
      - "steps": lista com pelo menos 3 itens, em ordem sequencial lógica.
        - Se o texto já tiver passos numerados, apenas reorganize/limpe a redação.
        - Se o texto estiver corrido (sem passos claros), divida o preparo em etapas lógicas.
        - Cada passo deve começar com um verbo de ação (ex: "Misture...", "Asse...", "Corte...").
        - Textos curtos e diretos (máx. 1-2 frases por passo).

      REGRA PARA TEXTOS SEM RECEITA CLARA
      Se o texto fornecido não descrever uma receita de forma alguma (ex: for um assunto totalmente diferente), crie uma receita fictícia plausível e coerente, inspirada em qualquer palavra-chave relacionada a comida presente no texto, ou em um prato genérico caso nenhuma palavra-chave exista. Nunca retorne o JSON vazio, incompleto ou com campos genéricos como "N/A".

      VALIDAÇÃO FINAL (antes de responder)
      Confira mentalmente que:
      1. O JSON é sintaticamente válido.
      2. Todos os campos estão preenchidos com dados reais (não vazios).
      3. Não há texto fora do JSON.

      TEXTO DA RECEITA:
      """
      {{recipe_text}}
      """
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        {
          text: text,
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
      `Não foi possível analisar o texto enviado.\n${error?.message ?? ""}`,
    );
    return undefined;
  }
};
