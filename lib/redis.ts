import Redis from "ioredis"

const client = new Redis("rediss://default:AWqtAAIjcDEyYzE2NTNkMzIzOWE0MTAxODBkY2MxZjE0OGQ4OTEwN3AxMA@active-opossum-27309.upstash.io:6379");
export async function getCache<T>(key: string): Promise<T | null> {
    const cached = await client.get(key);
    return cached ? JSON.parse(cached) : null;
}

export async function setCache<T>(key: string, value: T, ttl = 60): Promise<void> {
    await client.set(key, JSON.stringify(value), "EX", ttl); // ttl dalam detik (misalnya 60 = 1 menit)
}

// export const invalidateCacheByPrefix = async (prefix: string) => {
//     try {
//       const keys = await client.keys(`${prefix}*`);
//       if (keys.length > 0) {
//         await client.del(...keys);
//       }
//     } catch (error) {

//     }
//   };
export default client