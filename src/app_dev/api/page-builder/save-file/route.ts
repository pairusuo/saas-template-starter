export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { fileName, content, directory, metadata } = await request.json();

    if (!fileName || !content) {
      return NextResponse.json(
        { error: '文件名和内容不能为空' },
        { status: 400 }
      );
    }

    const saveDirectory = directory || 'public/generated-pages';
    const fullPath = join(process.cwd(), saveDirectory);

    if (!existsSync(fullPath)) {
      await mkdir(fullPath, { recursive: true });
    }

    const filePath = join(fullPath, fileName);
    const relativePath = join(saveDirectory, fileName);

    await writeFile(filePath, content, 'utf8');

    if (metadata) {
      const metadataFileName = fileName.replace('.tsx', '.meta.json');
      const metadataPath = join(fullPath, metadataFileName);
      await writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
    }

    return NextResponse.json({ success: true, filePath: relativePath, fullPath: filePath });
  } catch (error) {
    console.error('保存文件时出错:', error);
    return NextResponse.json({ error: '保存文件失败' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { readdir, stat, readFile } = await import('fs/promises');
    const saveDirectory = 'public/generated-pages';
    const fullPath = join(process.cwd(), saveDirectory);

    if (!existsSync(fullPath)) return NextResponse.json({ files: [] });

    const files = await readdir(fullPath);
    const tsxFiles = files.filter((f) => f.endsWith('.tsx'));

    const fileList = await Promise.all(
      tsxFiles.map(async (file) => {
        const filePath = join(fullPath, file);
        const stats = await stat(filePath);
        const metadataFile = file.replace('.tsx', '.meta.json');
        const metadataPath = join(fullPath, metadataFile);
        let metadata: any = null;
        try {
          if (existsSync(metadataPath)) metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
        } catch {}
        return {
          fileName: file,
          filePath: join(saveDirectory, file),
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
          metadata,
        };
      })
    );
    return NextResponse.json({ files: fileList.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime()) });
  } catch (error) {
    console.error('获取文件列表时出错:', error);
    return NextResponse.json({ error: '获取文件列表失败' }, { status: 500 });
  }
}

