import type { ComponentType } from 'react'

import type { IconProps } from '@/shared/icons'
import { ChatBubbleIcon, SettingsIcon, ShieldIcon } from '@/shared/icons'

/**
 * Shared model for the KIO Studio app-layout framework (Confluence "App Layout
 * Framework & Interaction Hypothesis"). Data-only module (no React components)
 * so it can be imported by both the layout and workspace slices.
 */

export type ViewId = 'content' | 'experiment' | 'settings' | 'governance'

/** A concrete UI surfaced into the main working area. */
export interface SurfacedView {
  id: ViewId
  title: string
  /** How it was opened — by a nav interaction or conversationally by KIO. */
  source: 'nav' | 'chat'
}

/** One turn in the chat protocol. */
export interface ChatMessage {
  id: string
  role: 'user' | 'kio'
  text: string
  /** If KIO surfaced a UI, the transcript keeps a link back to it. */
  artifactViewId?: ViewId
}

export type ContextKind = 'artifact' | 'context' | 'setting'

/** An entry in the right contextual sidebar — things the conversation produced. */
export interface ContextItem {
  id: string
  kind: ContextKind
  label: string
  viewId?: ViewId
}

export interface NavItem {
  id: string
  label: string
  icon: ComponentType<IconProps>
  /** Selecting surfaces this view; omit for "Chat" (returns chat to centre). */
  viewId?: ViewId
}

export interface RecentItem {
  id: string
  title: string
  meta: string
  viewId: ViewId
}

export const VIEW_TITLES: Record<ViewId, string> = {
  content: 'Content preview',
  experiment: 'A/B experiment',
  settings: 'Personalization settings',
  governance: 'Compliance & governance',
}

export const PRIMARY_NAV: NavItem[] = [
  { id: 'chat', label: 'Chat', icon: ChatBubbleIcon },
  // Content (Folder) and Experiments (Insights/stats) are temporarily hidden by
  // request. Their views can still be surfaced conversationally; restore the
  // entries here (with FolderIcon / InsightsIcon) to bring the nav items back.
  { id: 'compliance', label: 'Compliance', icon: ShieldIcon, viewId: 'governance' },
]

export const SECONDARY_NAV: NavItem[] = [
  { id: 'settings', label: 'Settings', icon: SettingsIcon, viewId: 'settings' },
]

export const RECENTS: RecentItem[] = [
  { id: 'r1', title: 'Spring campaign — hero variants', meta: 'A/B experiment · edited 2h ago', viewId: 'experiment' },
  { id: 'r2', title: 'Homepage — EN / DE locale', meta: 'Content · edited yesterday', viewId: 'content' },
  { id: 'r3', title: 'Audience personalization rules', meta: 'Settings · edited 3d ago', viewId: 'settings' },
]

/**
 * Mocked CMS page-editing conversation. The prompt box plays through these KIO
 * replies (it does not change the surfaced page — opening a page is done from
 * the contextual sidebar). Clamped to the last line once exhausted.
 */
export const CMS_EDIT_SCRIPT: string[] = [
  "I've opened the Homepage for CoreMedia.com (EN-US). It has a hero banner, an intro paragraph, and a three-card teaser row. What would you like to change?",
  'Updated the hero headline to “Spring is here.” The change is staged on the working version — want me to swap the hero image too?',
  "Done — I swapped in spring-hero.jpg and tightened the intro copy to two sentences. I've added the page to your activity on the right; open it there to review the canvas.",
  "Published the Homepage to CoreMedia.com (EN-US) and logged the change. Anything else you'd like to edit?",
]

let seq = 0
/** Monotonic id for transient client-side records (messages, context items). */
export function uid(prefix = 'id'): string {
  seq += 1
  return `${prefix}-${seq}`
}
