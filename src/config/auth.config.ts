import { ENV } from "../env";

type AuthConfig = {
    jwt: {
        secret: string,
        expiresIn: string,
    }
}

export const authConfig: AuthConfig = {
    jwt: {
        secret: ENV.SECRET_KEY,
        expiresIn: '7d',
    }
}