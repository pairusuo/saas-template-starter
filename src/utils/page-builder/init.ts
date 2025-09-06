import { componentRegistry } from './component-registry';
import { allComponentConfigs } from './component-configs';

/**
 * 初始化页面构建器
 * 注册所有可用的组件
 */
export function initializePageBuilder() {
  try {
    // 清空现有注册
    componentRegistry.clear();
    
    // 批量注册组件
    componentRegistry.registerMany(allComponentConfigs);
    
    // 只在开发环境输出日志
    if (process.env.NODE_ENV === 'development') {
      console.log('页面构建器初始化完成');
      console.log(`已注册 ${allComponentConfigs.length} 个组件`);
    }
    
    return true;
  } catch (error) {
    console.error('页面构建器初始化失败:', error);
    return false;
  }
}

/**
 * 获取组件注册统计信息
 */
export function getRegistryStats() {
  return componentRegistry.getStats();
}

/**
 * 检查组件是否已注册
 */
export function isComponentRegistered(type: string): boolean {
  return componentRegistry.get(type) !== undefined;
}

/**
 * 获取所有已注册的组件类型
 */
export function getRegisteredComponentTypes(): string[] {
  return componentRegistry.getAll().map(schema => schema.type);
}