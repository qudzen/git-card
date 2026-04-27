import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/contributions', async (req, res) => {
    const { username } = req.query

    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
    `

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables: { username } })
    })

    const data = await response.json()
    res.json(data)
})

app.get('/repos', async (req, res) => {
    const { username } = req.query

    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=7&sort=stars&direction=desc`, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })

    const data = await response.json()
    res.json(data)
})

app.get('/user', async (req, res) => {
    const { username } = req.query

    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })

    const data = await response.json()
    res.json(data)
})

app.get('/hints', async (req, res) => {
    const { username } = req.query

    const response = await fetch(`https://api.github.com/search/users?q=${username}&per_page=5`, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
    })

    const data = await response.json()
    res.json(data)
})
app.listen(3001, () => console.log('Shared running on port 3001'))
