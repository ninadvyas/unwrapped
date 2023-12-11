import { createImageUsingVercel } from '@/api-helpers/vercel-generator';
import { CardTypes } from '../../../types/cards';
import { DependantsData } from '../../../components/templates/Dependants';
import { GithubReview } from '../../../mocks/github';
import { Username } from '@/components/templates';

export const config = {
  runtime: 'edge'
};

const mockGithubDependants: GithubReview[] = [
  {
    name: 'John Doe',
    userName: 'johndoe',
    avatar: 'https://picsum.photos/id/11/200'
  },
  {
    name: 'Jane Doe',
    userName: 'janedoe',
    avatar: 'https://picsum.photos/id/21/200'
  },
  {
    name: 'John Smith',
    userName: 'johnsmith',
    avatar: 'https://picsum.photos/id/31/200'
  }
];

const mockGithubUser: GithubReview = {
  name: 'eshaan',
  userName: 'eshaan007',
  avatar: 'https://picsum.photos/id/41/200'
};

const data: DependantsData & Username = {
  dependants: mockGithubDependants,
  user: mockGithubUser,
  username: 'jayantbh'
};

const generateUsingVercel = async () => {
  return (
    await createImageUsingVercel(data, CardTypes.IT_TAKES_A_VILLAGE, 'browser')
  ).image;
};

export default generateUsingVercel;
