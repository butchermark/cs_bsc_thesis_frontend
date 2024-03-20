import { Box, Button, Avatar, Typography } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

export const NewsCard = ({ news }: { news: any }) => {
  const IMG_REPLACEMENTS = 'https://clan.akamai.steamstatic.com/images/';
  const { theme } = useThemeContext();

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
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Button
        onClick={handleButtonClick}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography sx={{ color: theme.palette.text.primary }}>
          {news.feedlabel}
        </Typography>
        <Typography sx={{ color: theme.palette.text.primary }}>
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
            sx={{ color: theme.palette.text.primary }}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </Box>
      </Button>
    </Box>
  );
};
