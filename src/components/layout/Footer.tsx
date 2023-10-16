'use client'

import { HeartIcon } from '@heroicons/react/solid'

export const Footer = () => {
  return (
    <footer>
      <hr className="my-10 h-px border-0 bg-gray-900" />
      <div className="my-5 flex flex-col justify-between gap-5 text-sm text-white sm:flex-row">
        <div className="flex items-center">
          <span className="mr-2">
            Made with <HeartIcon className="inline h-6 w-6 text-red-600" /> in The Netherlands
          </span>
        </div>

        <ul className="flex gap-5">
          <li className="my-2">© 2023</li>
          <li className="my-2">Privacy</li>
          <li className="my-2">Terms</li>
        </ul>
      </div>
    </footer>
  )
}
