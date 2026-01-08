// Smart Local AI - No API key needed, instant responses!
// Uses pattern matching and templates to generate contextual answers

const animationKnowledge = {
  "fade|opacity": {
    keywords: ["fade", "opacity", "transparent"],
    response: `For a fade-in animation, use CSS transitions or keyframes:

**Option 1: CSS Transitions**
\`\`\`css
.element {
  opacity: 0;
  transition: opacity 1s ease-in;
}
.element.show {
  opacity: 1;
}
\`\`\`

**Option 2: CSS Animations**
\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.element {
  animation: fadeIn 1s ease-in;
}\`\`\`

Opacity changes are performant because they don't trigger layout recalculation! 🚀`
  },
  
  "timing|easing|duration": {
    keywords: ["timing", "easing", "duration", "speed", "fast", "slow"],
    response: `**Common CSS Timing Functions:**

- **ease** (default) - Slow start and end
- **linear** - Constant speed throughout
- **ease-in** - Slow start, accelerates at end
- **ease-out** - Fast start, decelerates at end  
- **ease-in-out** - Slow start and end
- **cubic-bezier()** - Custom timing curves

**For Bouncy Effects:**
\`\`\`css
transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
\`\`\`

**Animation Duration Tips:**
- UI elements: 200-400ms
- Page transitions: 400-600ms
- Complex animations: 600-1000ms`
  },
  
  "transform|rotate|scale|translate": {
    keywords: ["transform", "rotate", "scale", "translate", "skew", "perspective"],
    response: `**CSS Transforms - Super Powerful & Fast:**

\`\`\`css
/* Individual transforms */
transform: rotate(45deg);
transform: scale(1.5);
transform: translateX(100px);
transform: skewY(10deg);

/* Multiple transforms (apply left to right) */
transform: rotate(45deg) scale(1.5) translateX(100px);
\`\`\`

**Pro Tip:** Transforms DON'T trigger layout recalculation, making them extremely performant! Use these instead of changing width/height/position.

**With Animation:**
\`\`\`css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 2s linear infinite;
}\`\`\``
  },
  
  "hover|interactive|button": {
    keywords: ["hover", "interactive", "button", "click", "mouse"],
    response: `**Create Interactive Hover Effects:**

\`\`\`css
.button {
  background: #646cff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background: #7b85ff;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.button:active {
  transform: scale(0.95);
}
\`\`\`

**For more complex hover effects, add JavaScript:**
\`\`\`javascript
button.addEventListener('mouseenter', () => {
  button.style.transform = 'scale(1.1)';
});
\`\`\``
  },
  
  "animation|keyframe|sequence": {
    keywords: ["animation", "keyframe", "sequence", "chain", "multiple"],
    response: `**CSS Keyframe Animations:**

\`\`\`css
@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

.ball {
  animation: bounce 0.6s ease-in-out infinite;
}\`\`\`

**Chaining Animations (Sequential):**
\`\`\`css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: slideIn 0.5s ease-out, fadeIn 0.5s ease-out;
}\`\`\`

**Properties:**
- \`animation-duration\` - How long it takes
- \`animation-delay\` - Wait before starting
- \`animation-iteration-count\` - How many times (use \`infinite\`)
- \`animation-direction\` - \`normal\`, \`reverse\`, \`alternate\``
  },
  
  "performance|optimize|fps|smooth": {
    keywords: ["performance", "optimize", "fps", "lag", "smooth", "jank"],
    response: `**Animation Performance Tips:**

✅ **What's FAST (Use These):**
- Transforms (translate, scale, rotate)
- Opacity changes
- CSS animations/transitions
- GPU-accelerated properties

❌ **What's SLOW (Avoid These):**
- Changing width/height during animation
- Animating left/top/position
- Changing box-shadow in animation
- DOM manipulation in requestAnimationFrame

**Performance Checklist:**
\`\`\`css
/* Good - GPU accelerated */
transform: translateX(100px);
opacity: 0.5;

/* Bad - Causes reflow */
left: 100px;
width: 200px;
\`\`\`

**Pro Tip:** Use \`will-change\` to hint to browser:
\`\`\`css
.animated-element {
  will-change: transform, opacity;
}\`\`\``
  },
  
  "transition|smooth|flow": {
    keywords: ["transition", "smooth", "flow", "change"],
    response: `**CSS Transitions - Smooth Property Changes:**

\`\`\`css
.element {
  background: blue;
  /* Smooth changes over 0.3s with ease timing */
  transition: all 0.3s ease;
}

.element:hover {
  background: darkblue;
  transform: scale(1.1);
}\`\`\`

**Syntax:**
\`\`\`css
transition: [property] [duration] [timing-function] [delay];
\`\`\`

**Examples:**
\`\`\`css
transition: background 0.3s ease;
transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
transition: all 0.3s ease; /* All properties */
\`\`\`

**When to Use:**
- Simple state changes (hover, focus, active)
- Smooth interpolation between values
- Responsive to user interaction

**Vs. Animations:**
- Transitions: User interaction triggered
- Animations: Can run on their own`
  }
};

// Extract keywords and find matching knowledge
const findMatchingKnowledge = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [key, data] of Object.entries(animationKnowledge)) {
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        return data.response;
      }
    }
  }
  
  return null;
};

// Generate contextual responses for general questions
const generateGeneralResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("what") && lowerMessage.includes("animation")) {
    return `**What are Web Animations?**

Web animations bring your website to life! They can:
- Catch user attention
- Guide interaction flow
- Make transitions smooth
- Create engaging experiences

**Main Methods:**
1. **CSS Animations** - Pure CSS, performant
2. **CSS Transitions** - Smooth property changes
3. **JavaScript (requestAnimationFrame)** - Complex interactions
4. **SVG Animations** - Animate vector graphics
5. **Canvas** - Pixel-level control

What aspect interests you most? Ask about timing, transforms, hover effects, or performance!`;
  }
  
  if (lowerMessage.includes("how") && lowerMessage.includes("create")) {
    return `**How to Create Animations in Flowie:**

1. **In CSS:**
   - Define @keyframes with start/end states
   - Apply animation property to element
   - Customize duration, timing, delay

2. **With Transitions:**
   - Use transition property
   - Trigger with CSS states (hover, active)
   - Smooth automatic interpolation

3. **Common Patterns:**
   - Fade in/out (opacity)
   - Slide/move (transform: translate)
   - Scale/grow (transform: scale)
   - Rotate (transform: rotate)

Ask about a specific effect you want to create! 🎨`;
  }
  
  if (lowerMessage.includes("best practice") || lowerMessage.includes("should i")) {
    return `**Best Practices for Web Animations:**

✅ **DO:**
- Use transforms and opacity
- Keep animations under 500ms for UI
- Provide focus states for accessibility
- Test on real devices
- Use animations to guide, not distract

❌ **DON'T:**
- Animate every property
- Make animations too long
- Use animations just for fun
- Forget about mobile performance
- Block user interaction

**Performance Rule:** Aim for 60 FPS by using GPU-accelerated properties like transform and opacity! 🚀`;
  }
  
  if (lowerMessage.includes("example") || lowerMessage.includes("code") || lowerMessage.includes("show me")) {
    return `**Here's a Quick Animation Example:**

\`\`\`css
/* Define animation */
@keyframes slideInFade {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Apply to element */
.card {
  animation: slideInFade 0.5s ease-out forwards;
}
\`\`\`

**With JavaScript:**
\`\`\`javascript
const card = document.querySelector('.card');
card.addEventListener('click', () => {
  card.style.animation = 'slideInFade 0.5s ease-out forwards';
});
\`\`\`

Ask me about a specific animation type! I can help with fading, sliding, rotating, bouncing, and more! 🎬`;
  }
  
  return null;
};

export const getAIResponse = async (userMessage, context = "") => {
  try {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    // Check if API key is valid (not placeholder or empty)
    const hasValidApiKey = apiKey && 
      apiKey !== 'sk-ant-your-actual-api-key-here' && 
      apiKey.startsWith('sk-ant-') &&
      apiKey.length > 20;

    if (hasValidApiKey) {
      // Use Anthropic Claude API
      // Simulate thinking delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const systemPrompt = `You are Flowie AI, a friendly and expert web animation assistant for the Flowie - Web Animation Builder. 
You help users create beautiful animations, transitions, and hover effects.
${context ? `Context: ${context}` : ""}

Provide clear, practical advice with code examples when relevant.
Be concise but helpful. Use markdown formatting for code blocks.
Specialize in CSS animations, transforms, transitions, and timing functions.
Help with performance optimization and best practices.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-opus-20250219",
          max_tokens: 800,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const text = data.content[0].text;
      return text;
    } else {
      // Fallback to local knowledge base
      console.log("Using local AI knowledge base (no valid Anthropic API key detected)");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Try to find matching knowledge
      const matchedResponse = findMatchingKnowledge(userMessage);
      if (matchedResponse) {
        console.log("✓ Found matching animation knowledge");
        return matchedResponse;
      }
      
      // Try to generate contextual response
      const generalResponse = generateGeneralResponse(userMessage);
      if (generalResponse) {
        console.log("✓ Generated contextual response");
        return generalResponse;
      }
      
      // Fallback for anything else
      return `That's an interesting question! While I'm specialized in web animations and design, I can help with:

**Topics I Excel At:**
- CSS animations and transitions
- Transform effects (rotate, scale, translate)
- Hover and interactive effects
- Animation timing and easing
- Performance optimization
- Code examples and best practices

**Try asking me about:**
- "How do I create a fade animation?"
- "What timing functions exist?"
- "Show me a hover effect example"
- "How do I optimize animation performance?"
- "What transforms can I use?"

📝 **Note:** For more advanced AI responses, add your Anthropic Claude API key to the .env file!`;
    }
  } catch (error) {
    console.error('Error getting AI response:', error);
    // Fallback to local knowledge base on error
    await new Promise(resolve => setTimeout(resolve, 800));
    const matchedResponse = findMatchingKnowledge(userMessage);
    if (matchedResponse) {
      return matchedResponse;
    }
    const generalResponse = generateGeneralResponse(userMessage);
    if (generalResponse) {
      return generalResponse;
    }
    return 'Something went wrong! Try asking about animations - fade effects, transforms, hover states, timing functions, or performance tips!';
  }
};

export const getAnimationSuggestions = async (animationType, currentProperties = "") => {
  try {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    // Check if API key is valid
    const hasValidApiKey = apiKey && 
      apiKey !== 'sk-ant-your-actual-api-key-here' && 
      apiKey.startsWith('sk-ant-') &&
      apiKey.length > 20;

    if (hasValidApiKey) {
      const prompt = `You are an expert web animation developer. 
User wants to create a ${animationType} animation${currentProperties ? ` with these properties: ${currentProperties}` : ""}.
Provide:
1. A brief explanation of how this animation works
2. Key CSS/JavaScript properties to consider
3. One simple code example
Keep it concise and practical.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-opus-20250219",
          max_tokens: 500,
          system: "You are an expert web animation developer helping users create beautiful animations.",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Anthropic Claude API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const text = data.content[0].text;
      return text;
    } else {
      // Fallback response when no API key
      return `**${animationType} Animation Guide**

This animation type helps create engaging visual effects. Here are some key considerations:

**CSS Properties:**
- Use \`animation\` or \`transition\` properties
- Consider \`transform\` for performance
- Adjust \`duration\`, \`timing-function\`, and \`delay\`

**Basic Example:**
\`\`\`css
@keyframes ${animationType}Animation {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.element {
  animation: ${animationType}Animation 0.6s ease-out;
}
\`\`\`

For more advanced suggestions, add your Anthropic Claude API key to the .env file!`;
    }
  } catch (error) {
    console.error("AI Animation Suggestion Error:", error);
    return "Sorry, I couldn't generate animation suggestions. Please try again.";
  }
};
