import { NextRequest, NextResponse } from 'next/server';
import { translationManager } from '@/utils/page-builder/translation-manager';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { components, targetLang = 'en', sourceLang = 'zh' } = body;
    if (!components || !Array.isArray(components)) {
      return NextResponse.json({ error: '缺少必要参数：components (数组)' }, { status: 400 });
    }
    if (!['en', 'zh'].includes(targetLang)) {
      return NextResponse.json({ error: '不支持的目标语言，仅支持 en 和 zh' }, { status: 400 });
    }
    const serviceStatus = translationManager.getServiceStatus();
    if (!serviceStatus.isConfigured) {
      return NextResponse.json({ error: '翻译服务未配置，请检查环境变量中的 API 密钥' }, { status: 503 });
    }
    const translatedComponents = await translationManager.translatePageLayout(components, targetLang, sourceLang);
    return NextResponse.json({ success: true, data: { translatedComponents, targetLang, sourceLang, provider: serviceStatus.provider } });
  } catch (error) {
    console.error('Page layout translation error:', error);
    return NextResponse.json({ error: '页面布局翻译失败' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const serviceStatus = translationManager.getServiceStatus();
    return NextResponse.json({ success: true, data: { ...serviceStatus, availableProviders: ['google','deepl','azure','openai'], supportedLanguages: ['zh','en'] } });
  } catch (error) {
    console.error('Translation service status error:', error);
    return NextResponse.json({ error: '获取翻译服务状态失败' }, { status: 500 });
  }
}

