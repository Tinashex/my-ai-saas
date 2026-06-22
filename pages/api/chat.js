import { openai } from "../../lib/openai";

export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message received" });
  }

  const systemPrompt = `
You are My AI Business Assistant.

Business:
- Name: My AI Services
- Location: Zimbabwe
- Services: websites, chatbots, apps

You are professional, helpful, and friendly.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      reply: "AI error. Try again later."
    });
  }
}
