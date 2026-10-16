/**
 * Isolated Registration Service
 * 
 * Replace or connect this module when integrating with:
 * - A college backend REST/GraphQL API
 * - Google Apps Script / Sheets webhook
 * - Supabase or Firebase Auth/DB
 */

export const submitRegistrationData = async (_formData) => {
  // Simulating async validation delay without false server claims
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    callsign: `CREW-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};
