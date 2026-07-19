import { RecipeForm } from "@/validations/recipe-schema";
import { File } from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

const getLocalImageAsBase64 = async (
  fileUri: string,
): Promise<string | null> => {
  try {
    // Certifica-se de que o caminho é uma URL de arquivo local válida
    if (!fileUri.startsWith("file://") && !fileUri.startsWith("/")) {
      return null;
    }

    // Lê o arquivo local e o transforma em uma string Base64
    const file = new File(fileUri);
    const base64Data = await file.base64();

    // Descobre a extensão do arquivo para definir o MIME type correto (jpg, png, etc)
    const fileExtension = fileUri.split(".").pop()?.toLowerCase() || "jpeg";
    const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";

    // Retorna no formato que a tag <img> do HTML compreende
    return `data:${mimeType};base64,${base64Data}`;
  } catch (error) {
    console.error("Erro ao ler imagem local:", error);
    return null;
  }
};

export const generateRecipePDF = async (recipe: RecipeForm) => {
  try {
    const recipeImageBase64 = await getLocalImageAsBase64(
      recipe.image as string,
    );
    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
              padding: 24px; 
              color: #222; 
              background-color: #fff;
            }
            .recipe-card {
              max-width: 600px;
              margin: 0 auto;
            }
            h1 { 
              font-size: 28px; 
              font-weight: 700;
              color: #111;
              margin: 0 0 16px 0;
            }
            .recipe-image {
              width: 100%;
              height: auto;
              max-height: 350px;
              object-fit: cover;
              border-radius: 16px;
              margin-bottom: 16px;
            }
            .description { 
              color: #444; 
              font-size: 16px; 
              line-height: 24px; 
              margin: 0 0 24px 0;
            }
            h3 { 
              color: #111; 
              font-size: 22px; 
              font-weight: 700;
              margin: 24px 0 16px 0;
            }
            .ingredients-list {
              padding: 0;
              margin: 0 0 24px 0;
              list-style: none;
            }
            .ingredient-item { 
              display: flex; 
              justify-content: space-between; 
              align-items: center;
              padding: 14px 0;
              border-bottom: 1px solid #eee;
              font-size: 16px;
            }
            .ingredient-name {
              color: #333;
            }
            .quantity { 
              color: #888; 
            }
            .steps-list {
              padding: 0;
              margin: 0;
              list-style: none;
            }
            .step-item {
              display: flex;
              align-items: flex-start;
              margin-bottom: 14px;
              font-size: 15px;
              line-height: 22px;
              color: #555;
            }
            .step-number {
              background-color: #fca311;
              color: #fff;
              font-weight: 700;
              font-size: 12px;
              width: 20px;
              height: 20px;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 12px;
              flex-shrink: 0;
              margin-top: 1px;
            }
          </style>
        </head>
        <body>
          <div class="recipe-card">
            <h1>${recipe.name}</h1>
            
            <img 
              class="recipe-image" 
              src="${recipeImageBase64}" 
              alt="${recipe.name}" 
            />
            
            <p class="description">${recipe.description}</p>
            
            <h3>Ingredientes</h3>
            <ul class="ingredients-list">
              ${recipe.ingredients
                ?.map(
                  (ing) => `
                <li class="ingredient-item">
                  <span class="ingredient-name">${ing.name}</span>
                  <span class="quantity">${ing.quantity}</span>
                </li>`,
                )
                .join("")}
            </ul>

            <h3>Preparo</h3>
            <ul class="steps-list">
              ${recipe.steps
                ?.map(
                  (step, index) => `
                <li class="step-item">
                  <span class="step-number">${index + 1}</span>
                  <span>${step.description}</span>
                </li>`,
                )
                .join("")}
            </ul>
          </div>
        </body>
      </html>
    `;

    const { uri: tempUri } = await Print.printToFileAsync({
      html: htmlContent,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(tempUri, {
        mimeType: "application/pdf",
        dialogTitle: "Enviar PDF da Receita",
        UTI: "com.adobe.pdf",
      });
    } else {
      Alert.alert(
        "Erro",
        "O recurso de compartilhamento não está disponível neste dispositivo.",
      );
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Não foi possível processar ou enviar o arquivo PDF.");
  }
};
