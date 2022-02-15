require('dotenv').config()
const domain = process.env.AUTH0_DOMAIN
const clientId = process.env.AUTH0_CLIENT_ID
const audience = process.env.AUTH0_AUDIENCE

export function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.
  const audience2 =
  audience && audience !== "YOUR_API_IDENTIFIER"
      ? audience
      : null;

  return {
    domain: domain,
    clientId: clientId,
    ...(audience2 ? { audience2 } : null),
  };
}
