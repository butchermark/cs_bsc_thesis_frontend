import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import appIds from '../gameApiIds/appIds.json';
import axios from 'axios';
import { config } from '../config';
import { NewsCard } from './NewsCard';
import { useThemeContext } from '../context/ThemeContext';
import { hover } from '@testing-library/user-event/dist/hover';

export const NewsPanel = () => {
  const { theme } = useThemeContext();
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
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        borderRadius: '20px',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={2}>
        {appIds.games.map((game, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Button
              sx={{
                width: '100%',
                height: '100%',
                '&:hover': {
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  borderColor: theme.palette.info.main,
                },
                color: theme.palette.text.secondary,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: theme.palette.info.main,
                borderRadius: '10px',
                marginBottom: 1,
                marginTop: 1,
                textAlign: 'center',
                fontSize: '10px',
                padding: '1px',
              }}
              onClick={() => setSelectedNewsId(game.appid)}
            >
              {game.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          width: '60%',
        }}
      >
        {news.length === 0 ? (
          <Typography sx={{ color: theme.palette.text.primary }}>
            No news available
          </Typography>
        ) : (
          news.map((newsItem: any, index: any) => (
            <NewsCard key={index} news={newsItem} />
          ))
        )}
      </Box>
    </Box>
  );
};
