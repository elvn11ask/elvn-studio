# Optional AI provider architecture

## Principle

Bring Your Own AI is an optional assistance boundary. RevenueOS must remain fully operational when every AI capability is disabled.

## Target providers

The architecture is designed to accommodate OpenAI, Anthropic, Google Gemini, Azure OpenAI, DeepSeek, Mistral, OpenRouter, AWS Bedrock, local Ollama, vLLM, and private OpenAI-compatible endpoints. This is not a claim that every provider adapter is currently production validated.

## Permitted capability classes

- summarization and management briefing;
- classification, urgency, missing-data, and risk suggestions;
- duplicate and product/MPN candidate suggestions;
- supplier and next-action suggestions;
- quote, response, and multilingual correspondence drafts;
- follow-up reminders and lost-reason suggestions.

## Non-delegable controls

- AI is not the system of record.
- Exact MPN identity remains deterministic.
- AI cannot silently change price, cost, margin, supplier choice, compliance state, quote terms, or customer communication.
- Commercial actions with material effect require an explicit workflow and human authority.
- Customer data is not sent without configured provider, purpose, data class, retention position, and consent or lawful basis as applicable.
- Customers can disable AI globally or per capability.
- Provider usage is paid by the customer unless managed AI is contracted.
- Unlimited managed AI is not offered.

## Request boundary

1. A deterministic commercial record creates a reviewable AI task.
2. Policy selects the permitted fields and redacts excluded data.
3. The provider adapter receives a bounded request with model and timeout.
4. Output is stored as a suggestion with provider, model, time, policy version, and review state.
5. A human accepts, edits, or rejects the suggestion.
6. The final deterministic action is recorded separately from model output.

## Secrets and operations

BYO keys must be encrypted at rest, scoped where providers permit, isolated by customer, absent from frontend bundles, and redacted from logs and error messages. Provider failures cannot block the core RFQ workflow. Cost and token limits are customer configurable.
