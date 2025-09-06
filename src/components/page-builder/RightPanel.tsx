'use client';

import React, { useState } from 'react';
import { PropertyPanel } from './PropertyPanel';
import { I18nPanel } from './I18nPanel';
import { Settings, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type PanelTab = 'properties' | 'i18n';

interface RightPanelProps {
  className?: string;
}

export function RightPanel({ className }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('properties');
  const t = useTranslations('page-builder');

  const tabs = [
    {
      id: 'properties' as const,
      label: t('propertyPanel.title'),
      icon: Settings,
      component: PropertyPanel
    },
    {
      id: 'i18n' as const,
      label: t('i18n.title'),
      icon: Globe,
      component: I18nPanel
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PropertyPanel;

  return (
    <div className={cn("w-96 border-l bg-card flex flex-col", className)}>
      {/* 面板切换标签 */}
      <div className="flex border-b bg-muted/30">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 px-3 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                "hover:bg-background/80",
                activeTab === tab.id 
                  ? "bg-background text-foreground border-b-2 border-primary" 
                  : "text-muted-foreground",
                index < tabs.length - 1 && "border-r"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* 面板内容 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}