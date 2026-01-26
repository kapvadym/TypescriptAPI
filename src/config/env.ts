const getEnv = (key: string): string => {
  const value = process.env[key];
  if(!value){
    throw new Error(`Environment variable ${key} is missing`)
  }

  return value
}

export const env = {
  PORT: Number(process.env.PORT) || 8080,
  MONGO_URL: getEnv('MONGO_URL'),
}