import { NextRequest, NextResponse } from 'next/server';
import { translationManager } from '@/utils/page-builder/translation-manager';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { componentType, componentId, props, currentLocale = 'zh' } = body;
    if (!componentType || !componentId || !props) {
      return NextResponse.json({ error: '缺少必要参数：componentType, componentId, props' }, { status: 400 });
    }
    const result = await translationManager.updateComponentTranslation(componentType, componentId, props, currentLocale);
    if (result.success) return NextResponse.json({ success: true, data: { updatedFiles: result.updatedFiles, translationKeys: result.translationKeys } });
    return NextResponse.json({ error: '翻译更新失败' }, { status: 500 });
  } catch (error) {
    console.error('Translation update error:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { components, currentLocale = 'zh' } = body;
    if (!components || !Array.isArray(components)) {
      return NextResponse.json({ error: '缺少必要参数：components (数组)' }, { status: 400 });
    }
    const result = await translationManager.updateMultipleComponentTranslations(components, currentLocale);
    if (result.success) return NextResponse.json({ success: true, data: { updatedFiles: result.updatedFiles, translationKeys: result.translationKeys, componentCount: components.length } });
    return NextResponse.json({ error: '批量翻译更新失败' }, { status: 500 });
  } catch (error) {
    console.error('Batch translation update error:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { activeComponents, currentLocale = 'zh' } = body;
    if (!activeComponents || !Array.isArray(activeComponents)) {
      return NextResponse.json({ error: '缺少必要参数：activeComponents (数组)' }, { status: 400 });
    }
    await translationManager.cleanupUnusedTranslations(activeComponents, currentLocale);
    return NextResponse.json({ success: true, message: '成功清理未使用的翻译键' });
  } catch (error) {
    console.error('Translation cleanup error:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

