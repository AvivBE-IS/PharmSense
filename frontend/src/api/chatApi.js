/**
 * Chat API — wraps the POST /api/v1/chat endpoint.
 *
 * Developer note (Dev 1 — UI team):
 *   Import `sendMessage` from this module. Do not call apiClient directly
 *   from components — keep API calls centralized here.
 */

import apiClient from './authApi'

/**
 * Send a user message to the AI assistant.
 *
 * @param {string} message - The user's input text.
 * @returns {Promise<{ reply: string, sources: SourceInfo[], data_source: string }>}
 *
 * @typedef {{ source: string, snippet: string, relevance_score: number }} SourceInfo
 */
export async function sendMessage(message) {
  const { data } = await apiClient.post('/chat', { message })
  return data
}
