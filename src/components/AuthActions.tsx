import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { track } from '@/constants/events';

/**
 * DISABLE_PUBLIC_ONLY_CONTRIBUTIONS
 * Because this isn't implemented yet
 */
const DISABLE_PUBLIC_ONLY_CONTRIBUTIONS = true;

export const AuthActions = () => {
  const { status } = useSession();
  const router = useRouter();
  const [showPrivate, setShowPrivate] = useState(true);

  return (
    <div className="w-fit flex flex-col gap-2">
      {status === 'authenticated' ? (
        <div className="w-fit flex flex-col gap-1">
          <button
            className="bg-indigo-800 text-white px-6 py-3 rounded-md text-lg"
            onClick={() => {
              track('UNWRAP_YOUR_YEAR_CLICKED');
              router.replace('/stats-unwrapped');
            }}
          >
            Unwrap your year, lets go! {'->'}
          </button>
          <button
            className="bg-gray-400 bg-opacity-10 text-white px-4 py-1 rounded-md text-xs"
            onClick={() => {
              track('SIGN_OUT_CLICKED');
              signOut({ redirect: false });
            }}
          >
            Sign out
          </button>
        </div>
      ) : showPrivate ? (
        <button
          className="bg-indigo-800 text-white px-4 py-2 rounded-md"
          onClick={() => {
            signIn('github', { callbackUrl: '/stats-unwrapped' });
          }}
        >
          Login with Github to start {'->'}
        </button>
      ) : (
        <div className="w-fit">
          <form
            className="flex gap-1"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight text-center focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="GH Username"
            />
            <button
              className="bg-indigo-800 text-white px-4 py-2 rounded-md shrink-0"
              onClick={() => {
                // console.log('public');
              }}
            >
              {'->'}
            </button>
          </form>
        </div>
      )}
      {!DISABLE_PUBLIC_ONLY_CONTRIBUTIONS && (
        <div>
          <div className="flex items-center">
            <input
              id="private-contribs"
              type="checkbox"
              checked={showPrivate}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => setShowPrivate(!showPrivate)}
              disabled={DISABLE_PUBLIC_ONLY_CONTRIBUTIONS}
            />
            <label
              htmlFor="private-contribs"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Include my private contributions?
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
