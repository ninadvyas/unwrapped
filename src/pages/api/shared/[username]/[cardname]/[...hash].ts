import chalk from 'chalk';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSavedCard } from '@/api-helpers/persistance';
import { bcryptGen } from '@/utils/stringHelpers';

const fetchAndDownloadImageBuffer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let username = req.query.username as string;
  let cardName = req.query.cardname as string;

  const generatedHash = bcryptGen(username + cardName);
  const linkHash = (req.query.hash as string[]).join('/') as string;

  if (generatedHash !== linkHash) {
    return res.status(400).json({
      message: 'Invalid parameters, must pass valid hash.'
    });
  }

  if (!username) {
    return res.status(400).json({
      message: 'Invalid parameters, must pass valid username.'
    });
  }

  try {
    const cachedCardBuffer = await fetchSavedCard(username, cardName);

    if (!cachedCardBuffer) {
      return res.status(404).json({
        message: `Card not found for user ${username} and card name ${cardName}`
      });
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', cachedCardBuffer.data.length);
    res.send(cachedCardBuffer.data);

    console.info(chalk.green('Successfully sent buffer to client'));
  } catch (error: any) {
    console.info(chalk.red('Error fetching or sending buffer:'), error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default fetchAndDownloadImageBuffer;
