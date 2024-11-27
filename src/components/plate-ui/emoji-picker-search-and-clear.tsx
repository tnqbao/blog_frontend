'use client';

import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';

import { cn } from '@udecode/cn';

import { Button } from './button';
import { emojiSearchIcons } from './emoji-icons';

export type EmojiPickerSearchAndClearProps = Pick<
  UseEmojiPickerType,
  'clearSearch' | 'i18n' | 'searchValue'
>;

export function EmojiPickerSearchAndClear({
  clearSearch,
  i18n,
  searchValue,
}: EmojiPickerSearchAndClearProps) {
  return (
    <div className='flex items-center text-neutral-950 dark:text-neutral-50'>
      <div
        className={cn(
          'absolute left-2.5 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-neutral-950 dark:text-neutral-50'
        )}
      >
        {emojiSearchIcons.loupe}
      </div>
      {searchValue && (
        <Button
          size='icon'
          variant='ghost'
          className={cn(
            'absolute right-0.5 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-neutral-950 hover:bg-transparent dark:text-neutral-50'
          )}
          onClick={clearSearch}
          title={i18n.clear}
          aria-label='Clear'
          type='button'
        >
          {emojiSearchIcons.delete}
        </Button>
      )}
    </div>
  );
}
