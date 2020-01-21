const { env } = process;

module.exports = {
  NODE_ENV: env.NODE_ENV || "development",
  NODE_PORT: env.NODE_PORT || 3000,
  DATABASE: env.DATABASE || "mongodb://mongo:27017/default-blizzz",
  MAX_QUERY_LIMIT: Number(env.MAX_QUERY_LIMIT) || 1000,
  JWT_SECRET: env.JWT_SECRET,
  JWT_AUDIENCE: env.JWT_AUDIENCE || 'blizzz',
  JWT_ISSUER: env.JWT_ISSUER || 'blizzz',
  FACEBOOK_CLIENT_ID: env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: env.FACEBOOK_CLIENT_SECRET,
  SENTRY_DSN: env.SENTRY_DSN,
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
  APPLE_KEY_ID: env.APPLE_KEY_ID,
  APPLE_KEY_PATH: env.APPLE_KEY_PATH,
  APPLE_TEAM_ID: env.APPLE_TEAM_ID,
  APPLE_CLIENT_ID: env.APPLE_CLIENT_ID,
  APPLE_REDIRECT_URI: env.APPLE_REDIRECT_URI,
  EMAIL_ENABLE: env.EMAIL_ENABLE === 'true',
  EMAIL_FROM: env.EMAIL_FROM,
  EMAIL_KEY: env.EMAIL_KEY,
  VERIFY_EMAIL_TEMPLATE: env.VERIFY_EMAIL_TEMPLATE,
  VERIFY_EMAIL_ACTION_URL: env.VERIFY_EMAIL_ACTION_URL,
  FORGOT_PASSWORD_ACTION_URL: env.FORGOT_PASSWORD_ACTION_URL,
  FORGOT_PASSWORD_TEMPLATE: env.FORGOT_PASSWORD_TEMPLATE,
  PUSH_USER_AUTH_KEY: env.PUSH_USER_AUTH_KEY,
  PUSH_APP_AUTH_KEY: env.PUSH_APP_AUTH_KEY,
  PUSH_APP_ID: env.PUSH_APP_ID,
};