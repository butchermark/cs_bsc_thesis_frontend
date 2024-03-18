import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import appIds from '../gameApiIds/appIds.json';
import axios from 'axios';
import { config } from '../config';
import { NewsCard } from './NewsCard';

export const NewsPanel = () => {
  const [selectedNewsId, setSelectedNewsId] = useState<number>(0);
  const [news, setNews] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, [selectedNewsId]);

  const fetchData = async () => {
    try {
      if (selectedNewsId === 0) return;
      const res = await axios.get(`${config.baseUrl}/news`, {
        params: {
          appId: selectedNewsId,
        },
      });
      setNews(res.data.appnews.newsitems);
      console.log(res.data.appnews.newsitems);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Box>
        {appIds.games.map((game, index) => (
          <Button key={index} onClick={() => setSelectedNewsId(game.appid)}>
            {game.name}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          width: '60%',
        }}
      >
        {news.length === 0 ? (
          <Typography>No news available</Typography>
        ) : (
          news.map((newsItem: any, index: any) => (
            <NewsCard key={index} news={newsItem} />
          ))
        )}
      </Box>
    </Box>
  );
};
