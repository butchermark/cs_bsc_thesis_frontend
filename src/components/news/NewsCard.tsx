import { Box, Button, Avatar, Typography, useMediaQuery } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

export const NewsCard = ({ news }: { news: any }) => {
  const IMG_REPLACEMENTS = 'https://clan.akamai.steamstatic.com/images/';
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const cleanedContent = news.contents.replace(
    /\{STEAM_CLAN_IMAGE\}\/[^'"\s]+/,
    '',
  );

  const parseAndModifyHTML = (content: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const links = tempDiv.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute('target', '_blank');
    }
    return tempDiv.innerHTML;
  };

  const parsedContent = parseAndModifyHTML(cleanedContent);

  const imageUrlMatch = news.contents.match(/\{STEAM_CLAN_IMAGE\}\/([^'"\s]+)/);
  const imageUrl = imageUrlMatch
    ? `${IMG_REPLACEMENTS}${imageUrlMatch[1]}`
    : null;

  const handleButtonClick = () => {
    window.open(news.url, '_blank');
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        border: '1px solid white',
        borderRadius: '10px',
        marginTop: '50px',
        '&:hover': {
          backgroundColor: theme.palette.info.main,
          color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
          borderColor: theme.palette.info.main,
        },
        width: '100%',
        maxWidth: '600px',
        padding: 2,
        height: '100%',
      }}
    >
      <Button
        onClick={handleButtonClick}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: isSmallScreen
              ? '0.4rem'
              : isMediumScreen
              ? '0.5rem'
              : '0.6rem',
          }}
        >
          {news.feedlabel}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: isSmallScreen
              ? '0.4rem'
              : isMediumScreen
              ? '0.5rem'
              : '0.6rem',
          }}
        >
          {news.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingTop: 1,
            paddingBottom: 1,
            justifyContent: 'space-between',
          }}
        >
          {imageUrl && (
            <Avatar
              sx={{ width: '40%', height: '20%', borderRadius: 10 }}
              src={imageUrl}
              alt="News Image"
            />
          )}{' '}
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontSize: isSmallScreen
                ? '0.4rem'
                : isMediumScreen
                ? '0.5rem'
                : '0.6rem',
            }}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </Box>
      </Button>
    </Box>
  );
};
