import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy',
});

export async function POST(req: Request) {
  // If no API key is set, return mock data to prevent errors during demo/dev without key
  if (!process.env.OPENAI_API_KEY) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({ suggestions: [
          "Take a deep breath and count to ten",
          "Stretch your arms above your head",
          "Drink a glass of cold water",
          "Look out the window for 2 minutes",
          "High five yourself in the mirror"
      ]});
  }

  try {
    const { category, preferences, existingItems } = await req.json();

    const prompt = `
      You are a helpful chef assistant for a 'Dopamenu' app for ADHD/neurodivergent users.
      Suggest 5 specific, simple, and appealing activities for the '${category}' category.
      
      User Preferences:
      - Location: ${preferences.indoor ? 'Indoor' : 'Outdoor'}
      - Sensory: ${preferences.sensory}
      
      Existing items (avoid duplicates): ${existingItems.join(', ')}
      
      Format the output as a JSON array of strings (just the activity names).
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a creative assistant." }, { role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }, 
    });
    
    // Parse response
    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content || '{"suggestions": []}');
    
    // Handle if the model returns object with key 'activities' or 'suggestions'
    const suggestions = parsed.suggestions || parsed.activities || [];
    
    return NextResponse.json({ suggestions });

  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}
