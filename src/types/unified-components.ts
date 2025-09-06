/**
 * 统一的Landing Page组件架构
 * 
 * 目标：
 * 1. 统一项目自身Landing Page和可视化构建器的组件
 * 2. 支持国际化和多语言
 * 3. 支持可视化构建结果一键应用到项目
 */

// 1. 统一组件接口
export interface UnifiedComponentProps {
  // 所有组件的通用属性
  className?: string;
  id?: string;
  
  // 国际化支持
  locale?: string;
  translations?: Record<string, any>;
  
  // 可视化构建器支持
  isBuilder?: boolean;
  builderData?: any;
  
  // 自定义内容支持（覆盖默认翻译）
  customContent?: Record<string, any>;
}

// 可编辑属性定义
export interface EditableProp {
  key: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'image';
  label: string;
  description?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
}

// 2. 组件注册系统
export interface ComponentRegistry {
  // 组件基本信息
  id: string;
  name: string;
  category: string;
  description: string;
  
  // 可视化构建器配置
  builderConfig: {
    icon: string;
    thumbnail: string;
    editableProps: EditableProp[];
    defaultProps: Record<string, any>;
  };
  
  // 国际化配置
  i18nConfig: {
    namespace: string;
    defaultKeys: string[];
  };
  
  // 组件实现
  component: React.ComponentType<any>;
}

// 3. 页面数据结构
export interface PageData {
  id: string;
  name: string;
  locale: string;
  components: ComponentInstance[];
  settings: {
    seo?: {
      title: string;
      description: string;
    };
    theme?: any;
  };
}

export interface ComponentInstance {
  id: string;
  type: string; // 对应ComponentRegistry.id
  position: number;
  props: Record<string, any>;
  customContent?: Record<string, any>; // 用户自定义的内容，覆盖默认翻译
}

// 4. 使用场景
/**
 * 场景1: 项目自身的Landing Page
 * - 使用统一组件 + 默认翻译
 * - 路径: /[locale]/page.tsx
 * 
 * 场景2: 可视化构建器
 * - 使用统一组件 + 构建器配置
 * - 路径: /[locale]/page-builder
 * 
 * 场景3: 构建结果预览
 * - 使用统一组件 + 自定义内容
 * - 路径: /[locale]/page-builder/preview
 * 
 * 场景4: 一键应用
 * - 将构建结果的PageData应用到项目主页
 * - 覆盖默认的主页组件配置
 */