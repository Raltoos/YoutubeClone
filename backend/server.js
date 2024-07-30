/* eslint-disable no-undef */
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.get('/search', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required.' });
    }

    try {
        const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                key: YOUTUBE_API_KEY,
                type: 'video',
                maxResults: 12,
            },
        });

        const videoIds = searchResponse.data.items.map(video => video.id.videoId).join(',');

        const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoIds,
                key: YOUTUBE_API_KEY,
            },
        });

        if (videoResponse.data.items.length > 0) {
            const data = videoResponse.data.items.map((video, key) => {
                const thumbnailUrl = video.snippet.thumbnails.high.url
                const videoTitle = video.snippet.title
                const videoDate = timeSince(video.snippet.publishedAt)
                const viewCount = convertToInternationalCurrencySystem(video.statistics.viewCount)
                const channelName = video.snippet.channelTitle
                const videoID = searchResponse.data.items[key].id.videoId

                return {
                    thumbnailUrl,
                    videoTitle,
                    videoDate,
                    viewCount,
                    channelName,
                    videoID
                }
            });
            res.json(data);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error fetching data from YouTube:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching data from YouTube.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


function timeSince(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = now - then;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate month length
    const years = Math.floor(days / 365); // Approximate year length

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}

function convertToInternationalCurrencySystem(labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

                : Math.abs(Number(labelValue));

}