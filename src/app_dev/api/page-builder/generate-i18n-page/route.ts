import { NextRequest, NextResponse } from 'next/server';
import { smartPageGenerator } from '@/utils/page-builder/smart-page-generator';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { layout, replaceHomePage = false, currentLocale = 'zh' } = body;

    if (!layout) {
      return NextResponse.json({ error: '缺少必要参数：layout' }, { status: 400 });
    }

    const result = await smartPageGenerator.generatePageFile(layout, currentLocale);

    if (result.success) {
      let fileName = '';
      let backupPath = '';

      if (replaceHomePage) {
        const pageFilePath = path.join(process.cwd(), 'src/app/[locale]/page.tsx');
        if (fs.existsSync(pageFilePath)) {
          const backupDir = path.join(process.cwd(), 'backups/pages');
          if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          backupPath = path.join(backupDir, `page_${timestamp}.tsx`);
          fs.copyFileSync(pageFilePath, backupPath);
        }
        fs.writeFileSync(pageFilePath, result.pageContent, 'utf-8');
        fileName = 'src/app/[locale]/page.tsx';
      } else {
        const timestamp = Date.now();
        fileName = `generated-page-${timestamp}.tsx`;
        const outputPath = path.join(process.cwd(), 'generated', fileName);
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputPath, result.pageContent, 'utf-8');
      }

      return NextResponse.json({ success: true, data: { fileName, backupPath: backupPath || undefined }, generatedCode: result.pageContent });
    } else {
      return NextResponse.json({ error: result.error || '生成国际化页面失败' }, { status: 500 });
    }
  } catch (error) {
    console.error('Generate i18n page error:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

