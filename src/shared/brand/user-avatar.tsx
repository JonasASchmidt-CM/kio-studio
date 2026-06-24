import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/utils'

import portraitUrl from './user-portrait.jpg'

/**
 * User portrait. A **bundled** photo (privacy by design — shipped with the app,
 * no external/runtime image request, works offline and on-prem). Fills its
 * container; place inside a `rounded-full overflow-hidden` box. Decorative by
 * default (empty alt) — the surrounding control names the user.
 *
 * Photo: Tim Mossholder via Unsplash (free Unsplash License). Replace with the
 * real signed-in user's avatar when auth/profile data is wired up.
 */
export function UserAvatar({ className, alt = '', ...props }: ComponentProps<'img'>) {
  return <img src={portraitUrl} alt={alt} className={cn('object-cover', className)} {...props} />
}
