## Business context

ARMSENS Academy teaches electronics through guided, interactive material. The experience has to make technical concepts approachable without flattening them, and it has to remain usable across supported languages and devices.

## Challenge

Traditional lesson pages separate explanation from action. Adding interaction can improve learning, but it also introduces navigation, accessibility, motion, and localization risks.

## Solution

I built the interface around compact missions, clear teaching controls, responsive lesson stages, and deterministic preview behavior. The hierarchy keeps the learning objective visible while technical detail remains available when it is useful.

## Engineering decisions

Keyboard focus, reduced motion, and small-screen controls were designed with the core experience. Tutor-facing architecture remains provider-independent, and the public description carefully distinguishes a prepared integration path from a verified live AI service.

## Validation

The learning flow is checked across responsive breakpoints, locale changes, keyboard navigation, and automated tests. Claims are limited to behavior visible in the product or supported by the implementation.

## Current state

The Academy is presented as an interactive multilingual education product. It is not marketed here as a live AI tutor.
