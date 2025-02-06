import {decodeJwt, jwtVerify} from "jose";

const secretKey = process.env.JWT_SECRET_KEY
const algorithm = process.env.JWT_ALGORITHM;
const encodedKey = new TextEncoder().encode(secretKey)

export async function decrypt(session: string | undefined = '') {
    try {
        // const { payload } = await jwtVerify(session, encodedKey, {
        //     algorithms: [algorithm],
        // })
        const payload = decodeJwt(session);
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}
