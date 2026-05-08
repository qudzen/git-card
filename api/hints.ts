import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function hints(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { username } = req.query

    const response = await fetch(`https://api.github.com/search/users?q=${username}&per_page=5`, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })

    const data = await response.json()
    res.json(data)
}