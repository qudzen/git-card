import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function user(req: VercelRequest, res: VercelResponse){
    const { username } = req.query

    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })

    const data = await response.json()
    res.json(data)
}