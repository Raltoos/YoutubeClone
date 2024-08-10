const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

app.use(express.json());

// Helper Functions
const fetchFromYouTubeAPI = async (endpoint, params) => {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/${endpoint}`, {
      params: { ...params, key: YOUTUBE_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from YouTube ${endpoint}:`, error.message);
    return null;
  }
};

const timeSince = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

const convertToInternationalCurrencySystem = (labelValue) => {
  const num = Math.abs(Number(labelValue));
  if (num >= 1.0e+9) return (num / 1.0e+9).toFixed(2) + "B";
  if (num >= 1.0e+6) return (num / 1.0e+6).toFixed(2) + "M";
  if (num >= 1.0e+3) return (num / 1.0e+3).toFixed(2) + "K";
  return num.toString();
};

// Route Handlers
app.get('/', (req, res) => {
  res.send('Hello from the server');
});

app.get('/search', async (req, res) => {
  const { q: query, no: number } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  try {
    const searchResponse = await fetchFromYouTubeAPI('search', {
      part: 'snippet',
      q: query,
      type: 'video, channel',
      maxResults: number,
    });

    const videoIds = searchResponse.items.map(video => video.id.videoId).join(',');

    const videoResponse = await fetchFromYouTubeAPI('videos', {
      part: 'snippet,contentDetails,statistics',
      id: videoIds,
    });

    const data = videoResponse.items.map((video, key) => ({
      thumbnailUrl: video.snippet.thumbnails.high.url,
      videoTitle: video.snippet.title,
      videoDate: timeSince(video.snippet.publishedAt),
      viewCount: convertToInternationalCurrencySystem(video.statistics.viewCount),
      channelName: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      videoID: searchResponse.items[key].id.videoId,
      description: searchResponse.items[key].snippet.description,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/searchbar', async (req, res) => {
  const { q: query, no: number } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  const maxResults = parseInt(number, 10);
  if (isNaN(maxResults) || maxResults <= 0) {
    return res.status(400).json({ error: 'Parameter "no" must be a positive integer.' });
  }

  try {
    const searchResponse = await fetchFromYouTubeAPI('search', {
      part: 'snippet',
      q: query,
      type: 'video,channel',
      maxResults: maxResults,
    });

    if (!searchResponse || !searchResponse.items) {
      throw new Error('Invalid response from YouTube search API.');
    }

    const videoIds = searchResponse.items
      .filter(item => item.id.kind === 'youtube#video')
      .map(video => video.id.videoId)
      .join(',');

    const channelIds = searchResponse.items
      .filter(item => item.id.kind === 'youtube#channel')
      .map(channel => channel.id.channelId)
      .join(',');

    const videoResponse = videoIds
      ? await fetchFromYouTubeAPI('videos', {
          part: 'snippet,contentDetails,statistics',
          id: videoIds,
        })
      : { items: [] };

    const channelResponse = channelIds
      ? await fetchFromYouTubeAPI('channels', {
          part: 'snippet,contentDetails,statistics',
          id: channelIds,
        })
      : { items: [] };

    const data = searchResponse.items.map(item => {
      if (item.id.kind === 'youtube#video') {
        const video = videoResponse.items.find(v => v.id === item.id.videoId);
        return {
          type: 'video',
          thumbnailUrl: item.snippet.thumbnails.high.url,
          videoTitle: item.snippet.title,
          videoDate: timeSince(item.snippet.publishedAt),
          viewCount: video ? convertToInternationalCurrencySystem(video.statistics.viewCount) : 'N/A',
          channelName: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
          videoID: item.id.videoId,
          description: item.snippet.description,
        };
      } else if (item.id.kind === 'youtube#channel') {
        const channel = channelResponse.items.find(c => c.id === item.id.channelId);
        return {
          type: 'channel',
          thumbnailUrl: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.title,
          description: item.snippet.description,
          channelId: item.id.channelId,
          videoNumber: channel ? convertToInternationalCurrencySystem(channel.statistics.videoCount) : "Hidden",
          subscriberCount: channel ? convertToInternationalCurrencySystem(channel.statistics.subscriberCount) : 'Hidden',
        };
      }
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/video/:videoId/channel/:channelId', async (req, res) => {
  const { videoId, channelId } = req.params;

  try {
    const [commentsResponse, channelResponse, videoResponse] = await Promise.all([
      fetchFromYouTubeAPI('commentThreads', {
        part: 'snippet',
        videoId: videoId,
        maxResults: 20,
      }),
      fetchFromYouTubeAPI('channels', {
        part: 'snippet,statistics',
        id: channelId,
      }),
      fetchFromYouTubeAPI('videos', {
        part: 'snippet,statistics',
        id: videoId,
      }),
    ]);

    const comments = commentsResponse.items.map(item => ({
      authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
      authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
      likeCount: item.snippet.topLevelComment.snippet.likeCount,
      publishedAt: timeSince(item.snippet.topLevelComment.snippet.publishedAt),
    }));

    const channelDetails = channelResponse.items[0];
    const channelInfo = {
      title: channelDetails.snippet.title,
      thumbnailUrl: channelDetails.snippet.thumbnails.default.url,
      subscriberCount: convertToInternationalCurrencySystem(channelDetails.statistics.subscriberCount),
    };

    const videoDetails = videoResponse.items[0];
    const videoInfo = {
      title: videoDetails.snippet.title,
      description: videoDetails.snippet.description,
      views: convertToInternationalCurrencySystem(videoDetails.statistics.viewCount),
      likes: convertToInternationalCurrencySystem(videoDetails.statistics.likeCount)
    };

    res.json({ comments, channelInfo, videoInfo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});