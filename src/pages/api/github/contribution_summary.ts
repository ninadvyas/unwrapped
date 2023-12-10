import {
  fetchUser,
  fetchUserContributionSummaryMetrics
} from '@/exapi_sdk/github';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.ghct;

  if (!token) {
    return res.status(403).json({
      message: 'GitHub Access token not found.'
    });
  }

  try {
    const user = await fetchUser(token);

    const contributionSummary = await fetchUserContributionSummaryMetrics(
      user.login,
      token
    );

    res.status(200).json({
      contributionSummary
    });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}