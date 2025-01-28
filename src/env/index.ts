import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    SECRET_KEY: z.string(),
})

export const ENV = envSchema.parse(process.env)