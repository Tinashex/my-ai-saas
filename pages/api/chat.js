import { openai } from "../../lib/openai";

export default async function handler(req, res) {
  const { message } = req.body;

  const systemPrompt = `
You are a business AI assistant.

Business:
- Name: My AI Services
- Location: Harare
- Services: websites, chatbots, apps
- Always respond professionally
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });

  res.json({
    reply: completion.choices[0].message.content
  });
}
