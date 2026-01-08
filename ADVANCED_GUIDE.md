# Advanced Usage & Troubleshooting Guide

## 🔧 Troubleshooting

### Problem: "I can't send messages"
**Cause**: Input might be disabled or message is empty
**Solution**:
1. Make sure your message isn't empty
2. Wait for previous AI response to finish
3. Check browser console for errors (F12 → Console)
4. Refresh the page if stuck

---

### Problem: "AI not responding"
**Cause**: API might be rate limited or experiencing issues
**Solution**:
1. Wait 2-3 seconds (API is thinking)
2. Try asking a shorter, simpler question
3. Check internet connection
4. Verify API key in `.env` is valid
5. Reload page and try again

**Note**: Free tier allows 15 requests per minute

---

### Problem: "Error message appeared"
**Cause**: API error or network issue
**Solution**:
1. Read the exact error message
2. Try a different question
3. Wait a few minutes before retrying
4. Check `.env` file for correct API key
5. Ensure you have internet connection

---

### Problem: "Panel not opening"
**Cause**: Component not rendering or event not firing
**Solution**:
1. Refresh the page (F5)
2. Check browser console for errors
3. Make sure you're clicking the correct icon
4. Try clicking other sidebar items first
5. Restart dev server if needed

---

### Problem: "Spinner won't stop"
**Cause**: Request hung or API timeout
**Solution**:
1. Refresh the page
2. Wait up to 10 seconds
3. If still stuck, stop dev server and restart
4. Check `.env` file for valid API key

---

## 🎓 Advanced Prompt Engineering

### Get Better Answers with Context

#### Good Prompt:
```
"I'm creating a fade-in animation for a button when the page loads.
I want it to take 1 second with an ease-out timing function.
What CSS should I use?"
```

#### Better Prompt:
```
"I'm using React and framer-motion for animations in my Flowie app.
I need to fade in multiple buttons sequentially when a page loads.
Each button takes 0.5s with 0.2s delay between them.
Should I use CSS animations, framer-motion, or React Transition Group?"
```

---

### Types of Questions to Ask

#### 1. Concept Questions
```
"Explain how CSS transforms affect performance compared to opacity changes"
"What's the difference between ease-in and cubic-bezier(0.42, 0, 0.58, 1)?"
"When should I use animations vs transitions?"
```

#### 2. Implementation Questions
```
"How do I create a wave effect with SVG animation?"
"Show me code for a parallax scrolling effect"
"What's the best way to chain animations in React?"
```

#### 3. Troubleshooting Questions
```
"My animation is janky/stuttering, how can I fix it?"
"Why isn't my animation starting?"
"How do I debug animation performance issues?"
```

#### 4. Best Practice Questions
```
"What are the performance implications of using 10+ simultaneous animations?"
"Should I use GPU acceleration for mobile animations?"
"What's best practice for animation timing in web apps?"
```

---

## 🚀 Performance Tips

### For Faster Responses:
1. **Be specific**: Clear questions get faster answers
2. **Keep it concise**: Shorter messages process faster
3. **Use proper terms**: "CSS transform" vs "movement effect"
4. **One question at a time**: Don't ask 5 things at once

### For Better Animations:
1. Ask the AI about performance optimization
2. Get recommendations for frame rates
3. Learn about hardware acceleration
4. Understand paint/reflow implications

---

## 📊 API Usage Monitoring

### Free Tier Limits:
```
Requests per minute: 15
Monthly requests: ~20,000
Response time: ~1-3 seconds
Model: Gemini 1.5
Token limit: ~100 tokens per request
```

### How to Check Usage:
1. Visit: https://console.cloud.google.com
2. Go to "APIs & Services" → "Usage & quota"
3. Look for "Generative AI API"
4. View detailed usage statistics

---

## 🔑 API Key Management

### Using Default Key:
```
✅ Works immediately
✅ Great for testing
⚠️ Shared rate limit
⚠️ Public key (not secure)
```

### Using Personal API Key:

**Step 1**: Get your key
```
Visit: https://makersuite.google.com/app/apikey
Click: "Create API Key"
Copy: The generated key
```

**Step 2**: Add to `.env`
```
VITE_GOOGLE_AI_API_KEY=your-api-key-here
```

**Step 3**: Restart dev server
```
Stop current server (Ctrl+C)
Run: npm run dev
```

**Step 4**: Test
```
Open: http://localhost:5173
Click: AI Builder icon
Send: Test message
```

---

## 🌐 Multi-Language Support

The AI can help in multiple languages! Try:

```
English:
"How do I create a smooth transition?"

Spanish:
"¿Cómo hago una transición suave?"

French:
"Comment créer une transition fluide?"

German:
"Wie erstelle ich einen sanften Übergang?"

Japanese:
"スムーズなトランジションを作成するにはどうすればよいですか?"
```

---

## 💾 Saving Conversations

### Current Behavior:
- Chats persist during current session
- Clears when page is refreshed
- No backend storage

### To Add Persistence:

Edit `src/services/aiService.js` to add:
```javascript
// Save to localStorage
export const saveChat = (chats) => {
  localStorage.setItem('flowie_chat_history', JSON.stringify(chats));
};

// Load from localStorage
export const loadChat = () => {
  const saved = localStorage.getItem('flowie_chat_history');
  return saved ? JSON.parse(saved) : [];
};
```

Then in Sidebar.jsx:
```javascript
// On mount
useEffect(() => {
  const saved = loadChat();
  if (saved.length > 0) setChats(saved);
}, []);

// On change
useEffect(() => {
  saveChat(chats);
}, [chats]);
```

---

## 🎨 Customization Ideas

### Change Colors:
In `Sidebar.jsx`, search for `#646cff` and replace with your color

### Change AI Voice:
Modify the `systemPrompt` in `aiService.js` to change personality

### Add Streaming:
Replace `generateContent()` with `generateContentStream()`

### Add History Sidebar:
Create new component to display past conversations

### Add Export:
Add button to export chat as JSON/markdown

---

## 🐛 Debug Mode

### Enable Detailed Logging:

Edit `src/services/aiService.js`:
```javascript
const DEBUG = true; // Set to true for logging

export const getAIResponse = async (userMessage, context = "") => {
  if (DEBUG) console.log('Sending:', userMessage);
  try {
    // ... existing code ...
    if (DEBUG) console.log('Response:', text);
    return text;
  } catch (error) {
    if (DEBUG) console.error('Full Error:', error);
    return "Sorry, I encountered an error.";
  }
};
```

### Monitor API Calls:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter for API calls
4. Look for `generativelanguage.googleapis.com`
5. Check request/response details

---

## 📝 Example Use Cases

### Use Case 1: Learning Animations
```
User: "I'm new to CSS animations. Where should I start?"
AI: Gets explained with beginner-friendly examples
Follow-up: "Can you show me a real example?"
AI: Provides code snippets to copy
```

### Use Case 2: Troubleshooting
```
User: "My animation stutters on mobile. Why?"
AI: Identifies potential causes
Follow-up: "How do I optimize it?"
AI: Provides performance tips
```

### Use Case 3: Code Review
```
User: "Is this the best way to animate text? [code]"
AI: Reviews approach and suggests improvements
Follow-up: "Any other optimizations?"
AI: Provides additional recommendations
```

### Use Case 4: Inspiration
```
User: "What interesting animations can I create?"
AI: Lists creative animation ideas
Follow-up: "How do I build that?"
AI: Provides implementation guide
```

---

## 🔗 Useful Resources

### Official Docs:
- [CSS Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [CSS Transitions MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
- [Google Generative AI API](https://ai.google.dev/)

### Related Tools:
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [Keyframes.app](https://keyframes.app/)
- [Can I Use](https://caniuse.com/)

### Learning Resources:
- [CSS Tricks Animations](https://css-tricks.com/category/animation/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Performance](https://web.dev/animations-guide/)

---

## ✅ Common Best Practices

### DO ✅
```
✓ Use semantic question structure
✓ Provide context when asking
✓ Ask follow-up questions for clarification
✓ Try different wording if not understood
✓ Use animation tools alongside AI
```

### DON'T ❌
```
✗ Don't ask same question repeatedly
✗ Don't provide code that won't work
✗ Don't expect perfect solutions every time
✗ Don't use rate limits excessively
✗ Don't share personal information
```

---

Happy animating! 🚀✨
