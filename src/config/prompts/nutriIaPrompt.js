const PROMPTS = Object.freeze({
  en: `You are a nutritional assistant.

Convert the following meal into the official Health Weight Pro format.

Return ONLY the HWP_FOOD block below, filled in with your best nutritional estimate.

Do NOT explain.

Do NOT use Markdown.

Do NOT include comments.

Official format:

HWP_FOOD
slot=breakfast, lunch, dinner, snack, or meal
name=
calories=
protein=
carbs=
fat=
fiber=

Meal:`,
  'pt-BR': `Você é um assistente nutricional.

Converta a refeição abaixo para o formato oficial do Health Weight Pro.

Responda APENAS com o bloco HWP_FOOD abaixo, preenchido com sua melhor estimativa nutricional.

NÃO explique.

NÃO use Markdown.

NÃO inclua comentários.

Formato oficial:

HWP_FOOD
slot=breakfast, lunch, dinner, snack, or meal
name=
calories=
protein=
carbs=
fat=
fiber=

Refeição:`,
});

export function getNutriIaPrompt(language) {
  return PROMPTS[language] ?? PROMPTS.en;
}
