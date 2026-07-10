# UX GUIDELINES

Version: 1.0

Status: ACTIVE

---

# Purpose

This document defines the official User Experience guidelines of Health Weight Pro.

Every new feature must respect these principles.

Whenever implementation decisions are unclear, this document takes precedence.

---

# Product Philosophy

Health Weight Pro exists to reduce user effort.

The application performs the work.

The user provides only the minimum amount of information necessary.

---

# Design Philosophy

The application must feel like:

• calm

• elegant

• premium

• trustworthy

Avoid interfaces that feel playful, childish or overloaded.

---

# User Effort

Prefer:

One tap

over

Typing.

Prefer:

Selection

over

Manual input.

Prefer:

Automation

over

Configuration.

---

# Speed

Common actions should require less than five seconds.

Examples

Register water

Register sleep

Register weight

Register meal

Medication application

Every frequently used feature should be reachable in one or two taps.

---

# Dashboard

The Dashboard is the application's most important screen.

It should immediately answer:

How am I doing today?

The Dashboard should motivate rather than overwhelm.

---

# Goal Presentation

Metrics that can still improve during the day display:

Current

Goal

Remaining

Examples

Water

Protein

Calories

Steps

Metrics representing completed activities display:

Current

Goal

Status

Examples

Sleep

Weight

Medication

---

# Feedback

Every important action should provide feedback.

Prefer:

Toast

Micro Animation

Progress Indicator

Avoid:

Alert()

Confirm()

Prompt()

Blocking dialogs.

---

# Success Toasts

Success Toasts are the application's official positive feedback mechanism.

Rules

• Automatic.

• Non-blocking.

• Approximately 3–4 seconds.

• Smooth fade.

• Animated progress indicator.

• One notification per goal per day.

---

# Gamification

Gamification must remain subtle.

The application is not a game.

Reward healthy habits without distracting the user.

Allowed

✓ Goal achieved.

✓ Daily completion.

✓ Gentle celebrations.

Avoid

✗ XP

✗ Coins

✗ Levels

✗ Daily streak pressure

✗ Competitive mechanics

---

# Animations

Animations must communicate state changes.

Never animate for decoration only.

Preferred

Fade

Scale

Progress

Slide

Avoid excessive movement.

---

# Mobile First

Every feature must be comfortable on smartphones.

Touch targets should always be generous.

No horizontal scrolling.

---

# Forms

Minimize typing.

Use:

Selectors

Dropdowns

Buttons

Quick Actions

Whenever possible.

---

# Empty States

Every empty screen must explain:

What this section does.

Why it is empty.

What the user should do next.

---

# Colors

Colors communicate status.

Green

Goal achieved.

Blue

Normal.

Orange

Attention.

Red

Critical.

Do not use color as the only communication mechanism.

Always include text and icons.

---

# Accessibility

Support:

Keyboard navigation.

Screen readers.

High contrast.

Scalable text.

Visible focus indicators.

---

# Localization

Every user-facing string must use the localization system.

Never hardcode text inside components.

---

# Premium Experience

Every interaction should leave the impression that:

"This application was carefully crafted."

Small details matter.

Consistency matters.

Simplicity matters.

---

# Golden Rule

Whenever a design decision is uncertain, ask:

"How can this task require fewer taps while remaining intuitive?"

The answer should guide the implementation.

---

End of Document