'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MousePointer2, Sparkles } from 'lucide-react';

interface EmptyCanvasProps {
  isOver?: boolean;
}

export function EmptyCanvas({ isOver }: EmptyCanvasProps) {
  const t = useTranslations('page-builder');
  return (
    <div className={`
      h-full flex items-center justify-center
      ${isOver ? 'bg-primary/5 border-primary/20' : 'bg-muted/20'}
      border-2 border-dashed transition-colors
    `}>
      <div className="text-center max-w-md mx-auto p-8">
        {isOver ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              {t('canvas.dropToAdd')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('canvas.dropDescription')}
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <MousePointer2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t('canvas.empty.title')}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('canvas.empty.description')}
            </p>
            
            <p className="text-xs text-muted-foreground">
              {t('canvas.empty.hint')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}