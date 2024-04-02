import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import appIds from '../gameAppIds/appIds.json';
import axios from 'axios';
import { config } from '../config';
import { NewsCard } from './NewsCard';
import { useThemeContext } from '../context/ThemeContext';

export const NewsPanel = () => {
  const { theme } = useThemeContext();
  const [selectedNewsId, setSelectedNewsId] = useState<number>(0);
  const [news, setNews] = useState<any>([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        paddingTop: 3,
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={1}>
        {appIds.games.map((game, index) => (
          <Grid item xs={6} sm={5} md={2} lg={2} key={index}>
            <Button
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: '200px',
                '&:hover': {
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  borderColor: theme.palette.info.main,
                },
                color: theme.palette.text.primary,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: theme.palette.info.main,
                borderRadius: '8px',
                marginBottom: 1,
                marginTop: 1,
                textAlign: 'center',
                fontSize: isSmallScreen
                  ? '0.4rem'
                  : isMediumScreen
                  ? '0.5rem'
                  : '0.6rem', // Adjusted font size
                padding: isSmallScreen
                  ? '0.2rem'
                  : isMediumScreen
                  ? '0.4rem'
                  : '0.7rem', // Adjusted padding
                // Adjusted padding
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
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          marginTop: '50px',
          alignItems: 'center',
        }}
      >
        {news.length === 0 ? (
          <Typography
            sx={{
              color: theme.palette.text.primary,
              textAlign: 'center',
              fontSize: '1.5rem',
            }}
          >
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
