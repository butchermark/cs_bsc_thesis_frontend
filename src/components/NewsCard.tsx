import { Box, Button, Avatar, Typography } from '@mui/material'; // Import necessary components from Material-UI

export const NewsCard = ({ news }: { news: any }) => {
  const IMG_REPLACEMENTS = 'https://clan.akamai.steamstatic.com/images/';

  // Remove the "{STEAM_CLAN_IMAGE}/..." pattern from the news content
  const cleanedContent = news.contents.replace(
    /\{STEAM_CLAN_IMAGE\}\/[^'"\s]+/,
    '',
  );

  // Extracting the image URL from the contents
  const imageUrlMatch = news.contents.match(/\{STEAM_CLAN_IMAGE\}\/([^'"\s]+)/);
  console.log(imageUrlMatch);
  const imageUrl = imageUrlMatch
    ? `${IMG_REPLACEMENTS}${imageUrlMatch[1]}`
    : null;

  const handleButtonClick = () => {
    // Handle button click action if needed
  };
  console.log(imageUrl);

  // Function to parse HTML content safely
  const createMarkup = (content: string) => ({ __html: content });

  return (
    <Box>
      <Button sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography>{news.feedlabel}</Typography>
        <Typography>{news.title}</Typography>
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
          <Typography dangerouslySetInnerHTML={createMarkup(cleanedContent)} />
        </Box>
      </Button>
    </Box>
  );
};
