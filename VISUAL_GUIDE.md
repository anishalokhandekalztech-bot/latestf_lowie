# AI Builder Panel - Visual Features Guide

## 🎨 Panel Layout

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃        AI Builder             ┃  ← Heading (Uppercase, 14px)
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                               ┃
┃  Your Question        [BLUE]  ┃  
┃  with shadow glow    CSS     ┃  
┃                               ┃  
┃  AI Response          [DARK]  ┃  
┃  with subtle border   #1a1a1a ┃  
┃                               ┃  ← Chat Area
┃  Your Next Q...       [BLUE]  ┃  Scrollable
┃                               ┃  Auto-scrolls
┃  ⟳ Thinking...        [GRAY]  ┃  to bottom
┃                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  [Type here...]  [→ Send Btn] ┃  ← Input Area
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 💬 Message Styling

### User Messages (Right-aligned)
```
Properties:
  Position: Right (flex-end)
  Background: #646cff (Primary Blue)
  Width: 85% max
  Padding: 10px 14px
  Border Radius: 12px
  Box Shadow: 0 2px 8px rgba(100, 108, 255, 0.3)
  Font Size: 13px
  Line Height: 1.5
  Text Color: White
```

### AI Responses (Left-aligned)
```
Properties:
  Position: Left (flex-start)
  Background: #1a1a1a (Dark)
  Border: 1px solid #333
  Width: 85% max
  Padding: 10px 14px
  Border Radius: 12px
  Box Shadow: 0 2px 8px rgba(255, 255, 255, 0.1)
  Font Size: 13px
  Line Height: 1.5
  Text Color: White
```

### Loading State
```
Properties:
  Icon: ⟳ (spinning)
  Background: #1a1a1a
  Text: "Thinking..."
  Color: #999 (muted)
  Animation: Continuous rotation
```

---

## ⌨️ Interactive Elements

### Textarea Input
```
States:
  ┌─ Normal
  │   Background: #1a1a1a
  │   Border: #333 (unfocused) → #646cff (focused)
  │   Height: 36px-80px (expandable)
  │   Placeholder: "Ask anything..."
  │
  ├─ Focused
  │   Border Color: #646cff (Highlight)
  │   Outline: None
  │
  └─ Disabled (while loading)
      Opacity: 0.6
      Cursor: default
      Color: #666
```

### Send Button
```
States:
  ┌─ Default (Has Text)
  │   Background: #646cff
  │   Size: 40x40px
  │   Icon: Triangle (▶)
  │   Cursor: pointer
  │
  ├─ Hover
  │   Background: #7b85ff (Brighter)
  │   Transform: scale(1.05)
  │   Transition: 0.2s ease
  │
  ├─ Disabled (No Text/Loading)
  │   Background: #444
  │   Opacity: 0.6
  │   Cursor: not-allowed
  │   Icon: ⟳ (Spinner when loading)
  │
  └─ Active (Send Icon)
      Icon: ▶ (Chevron right)
      Color: White
```

---

## 🎬 Animations

### Send Button Hover
```css
on hover:
  transform: scale(1.05);
  background: #7b85ff;
  transition: all 0.2s ease;

on leave:
  transform: scale(1);
  background: #646cff;
```

### Loading Spinner
```css
animation: spin {
  from: rotate(0deg);
  to: rotate(360deg);
  duration: 0.6s;
  timing: linear;
  iteration: infinite;
}
```

### Auto-scroll
```
Triggered: When new message added
Behavior: Smoothly scrolls to bottom
Method: refs with DOM manipulation
```

---

## 🎨 Color Scheme

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| User Message | Blue | #646cff | Highlight user input |
| Button Hover | Bright Blue | #7b85ff | Interactive feedback |
| AI Response | Dark | #1a1a1a | Distinguishes AI |
| Borders | Gray | #333 | Container outline |
| Text | White | #fff | Primary text |
| Muted Text | Gray | #999 | Loading state |
| Loading | Gray | #999 | Reduced visibility |
| Placeholder | Gray | #999 | Input hint |

---

## 📐 Layout Dimensions

```
Panel Total: Flex Layout
├─ Header: 14px font, 0-6px margin, flex-shrink: 0
├─ Chat Area: Flex: 1 (takes remaining space)
│   ├─ Padding: 12px
│   ├─ Border Radius: 8px
│   ├─ Gap: 12px between messages
│   └─ Max Height: ~400px (scrollable)
├─ Divider: None (implicit from borders)
└─ Input: 
    ├─ Height: 44px (flex-end aligned)
    ├─ Textarea: Flex 1
    │   ├─ Min Height: 36px
    │   ├─ Max Height: 80px
    │   ├─ Padding: 8px 10px
    │   └─ Border Radius: 6px
    └─ Button: 40x40px
        └─ Border Radius: 6px
```

---

## 🔄 User Flow

```
1. User clicks AI Icon
   ↓
2. Panel opens with empty state
   ↓ (Displays: "No chats yet. Ask me anything!")
   ↓
3. User types message
   ↓
4. Send button highlights
   ↓
5. User presses Enter or clicks Send
   ↓
6. Input disabled, spinner shows
   ↓
7. User message appears (blue, right)
   ↓
8. Input clears, focus stays
   ↓
9. API processes (1-3 seconds)
   ↓
10. AI Response appears (dark, left)
    ↓
11. Input re-enabled, auto-scroll to bottom
    ↓
12. User can continue conversation
```

---

## 💡 UX Enhancements

✅ **Immediate Feedback**: Button changes color on hover
✅ **Visual Loading**: Spinner shows while thinking
✅ **Auto-scroll**: Always shows latest message
✅ **Clear Distinction**: User (blue) vs AI (dark) messages
✅ **Keyboard Efficiency**: Enter to send, Shift+Enter for newline
✅ **Error Resilience**: Gracefully handles failed requests
✅ **Visual Hierarchy**: Clear heading, scrollable area, input row
✅ **Accessibility**: Disabled states prevent accidental actions
✅ **Responsive**: Works at various panel widths
✅ **Performance**: Efficient state updates with React hooks

---

## 📱 Responsive Behavior

```
Small Width (200px+)
├─ Messages: Reduced to 75% width
├─ Padding: Reduced to 8px
└─ Font: Stays 13px minimum

Medium Width (300px+)
├─ Messages: 85% width (default)
├─ Padding: 12px
└─ Full UI features

Large Width (500px+)
├─ Messages: Still 85% width
├─ Max width respected
└─ Same behavior, more space
```

---

This documentation provides complete visual reference for the AI Builder panel implementation!
