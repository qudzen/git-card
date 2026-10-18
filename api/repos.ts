import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function repos(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { username } = req.query

    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=stars&direction=desc`, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })

    const data = await response.json()
    res.json(data)
}