/**
 * 组件类型定义
 */

export interface PropertyDefinition {
  key: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'image';
  label: string;
  description?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  editableProps: PropertyDefinition[];
  i18nNamespace?: string;
  tags: string[];
  isPro?: boolean;
  previewSize?: 'small' | 'medium' | 'large';
}

export interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color?: string;
  components: ComponentDefinition[];
}

export interface DraggedComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  position?: { x: number; y: number };
}

export interface CanvasComponent extends DraggedComponent {
  instanceId: string;
  children?: CanvasComponent[];
}
