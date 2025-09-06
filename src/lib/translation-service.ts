/**
 * 专业翻译服务
 * 支持多种翻译API提供商：Google Translate、DeepL、Azure Translator
 */

export interface TranslationProvider {
  name: string;
  translate(text: string, targetLang: string, sourceLang?: string): Promise<string>;
  translateBatch(texts: string[], targetLang: string, sourceLang?: string): Promise<string[]>;
  getSupportedLanguages(): string[];
}

export interface TranslationConfig {
  provider: 'google' | 'deepl' | 'azure' | 'openai';
  apiKey: string;
  region?: string; // For Azure
  model?: string; // For OpenAI
}

/**
 * Google Translate API 提供商
 */
export class GoogleTranslateProvider implements TranslationProvider {
  name = 'Google Translate';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translate(text: string, targetLang: string, sourceLang: string = 'auto'): Promise<string> {
    const url = 'https://translation.googleapis.com/language/translate/v2';
    
    try {
      const response = await fetch(`${url}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: sourceLang === 'auto' ? undefined : sourceLang,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Google Translate API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Google Translate error:', error);
      throw error;
    }
  }

  async translateBatch(texts: string[], targetLang: string, sourceLang: string = 'auto'): Promise<string[]> {
    const url = 'https://translation.googleapis.com/language/translate/v2';
    
    try {
      const response = await fetch(`${url}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: texts,
          target: targetLang,
          source: sourceLang === 'auto' ? undefined : sourceLang,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Google Translate API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.translations.map((t: any) => t.translatedText);
    } catch (error) {
      console.error('Google Translate batch error:', error);
      throw error;
    }
  }

  getSupportedLanguages(): string[] {
    return ['zh', 'zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'ru', 'ar'];
  }
}

/**
 * DeepL API 提供商
 */
export class DeepLProvider implements TranslationProvider {
  name = 'DeepL';
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, isPro: boolean = false) {
    this.apiKey = apiKey;
    this.baseUrl = isPro 
      ? 'https://api.deepl.com/v2' 
      : 'https://api-free.deepl.com/v2';
  }

  async translate(text: string, targetLang: string, sourceLang?: string): Promise<string> {
    const url = `${this.baseUrl}/translate`;
    
    try {
      const body = new URLSearchParams({
        text,
        target_lang: this.mapLanguageCode(targetLang),
        auth_key: this.apiKey,
        preserve_formatting: '1'
      });

      if (sourceLang && sourceLang !== 'auto') {
        body.append('source_lang', this.mapLanguageCode(sourceLang));
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.translations[0].text;
    } catch (error) {
      console.error('DeepL translate error:', error);
      throw error;
    }
  }

  async translateBatch(texts: string[], targetLang: string, sourceLang?: string): Promise<string[]> {
    const url = `${this.baseUrl}/translate`;
    
    try {
      const body = new URLSearchParams({
        target_lang: this.mapLanguageCode(targetLang),
        auth_key: this.apiKey,
        preserve_formatting: '1'
      });

      texts.forEach(text => body.append('text', text));

      if (sourceLang && sourceLang !== 'auto') {
        body.append('source_lang', this.mapLanguageCode(sourceLang));
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.translations.map((t: any) => t.text);
    } catch (error) {
      console.error('DeepL batch translate error:', error);
      throw error;
    }
  }

  private mapLanguageCode(lang: string): string {
    const mappings: Record<string, string> = {
      'zh': 'ZH',
      'zh-CN': 'ZH',
      'zh-TW': 'ZH',
      'en': 'EN',
      'ja': 'JA',
      'ko': 'KO',
      'fr': 'FR',
      'de': 'DE',
      'es': 'ES',
      'pt': 'PT',
      'ru': 'RU'
    };
    return mappings[lang] || lang.toUpperCase();
  }

  getSupportedLanguages(): string[] {
    return ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'ru'];
  }
}

/**
 * OpenAI GPT 翻译提供商
 */
export class OpenAIProvider implements TranslationProvider {
  name = 'OpenAI GPT';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-3.5-turbo') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async translate(text: string, targetLang: string, sourceLang?: string): Promise<string> {
    const targetLanguage = this.getLanguageName(targetLang);
    const sourceLanguage = sourceLang ? this.getLanguageName(sourceLang) : 'auto-detected language';
    
    const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Only return the translated text, no explanations or additional content:

${text}`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a professional translator. Translate accurately and naturally while preserving the original meaning and tone.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.1,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI translate error:', error);
      throw error;
    }
  }

  async translateBatch(texts: string[], targetLang: string, sourceLang?: string): Promise<string[]> {
    // For batch translation, we'll translate them one by one to avoid token limits
    const results: string[] = [];
    
    for (const text of texts) {
      try {
        const translated = await this.translate(text, targetLang, sourceLang);
        results.push(translated);
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to translate text: ${text}`, error);
        results.push(text); // Fallback to original text
      }
    }
    
    return results;
  }

  private getLanguageName(code: string): string {
    const languageNames: Record<string, string> = {
      'zh': 'Chinese',
      'zh-CN': 'Simplified Chinese',
      'zh-TW': 'Traditional Chinese',
      'en': 'English',
      'ja': 'Japanese',
      'ko': 'Korean',
      'fr': 'French',
      'de': 'German',
      'es': 'Spanish',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ar': 'Arabic'
    };
    return languageNames[code] || code;
  }

  getSupportedLanguages(): string[] {
    return ['zh', 'zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'ru', 'ar'];
  }
}

/**
 * 翻译服务管理器
 */
export class TranslationService {
  private provider: TranslationProvider;
  private cache: Map<string, string> = new Map();
  private cacheEnabled: boolean = true;

  constructor(config: TranslationConfig) {
    this.provider = this.createProvider(config);
  }

  private createProvider(config: TranslationConfig): TranslationProvider {
    switch (config.provider) {
      case 'google':
        return new GoogleTranslateProvider(config.apiKey);
      case 'deepl':
        return new DeepLProvider(config.apiKey);
      case 'openai':
        return new OpenAIProvider(config.apiKey, config.model);
      default:
        throw new Error(`Unsupported translation provider: ${config.provider}`);
    }
  }

  /**
   * 翻译单个文本
   */
  async translate(text: string, targetLang: string, sourceLang?: string): Promise<string> {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return text;
    }

    // 检查是否需要翻译
    if (!this.needsTranslation(text)) {
      return text;
    }

    // 检查缓存
    const cacheKey = `${text}:${sourceLang || 'auto'}:${targetLang}`;
    if (this.cacheEnabled && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const translated = await this.provider.translate(text, targetLang, sourceLang);
      
      // 缓存结果
      if (this.cacheEnabled) {
        this.cache.set(cacheKey, translated);
      }
      
      return translated;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // 翻译失败时返回原文
    }
  }

  /**
   * 批量翻译
   */
  async translateBatch(texts: string[], targetLang: string, sourceLang?: string): Promise<string[]> {
    const textsToTranslate: string[] = [];
    const results: string[] = [];
    const indexMap: number[] = [];

    // 过滤需要翻译的文本
    texts.forEach((text, index) => {
      if (this.needsTranslation(text)) {
        const cacheKey = `${text}:${sourceLang || 'auto'}:${targetLang}`;
        if (this.cacheEnabled && this.cache.has(cacheKey)) {
          results[index] = this.cache.get(cacheKey)!;
        } else {
          textsToTranslate.push(text);
          indexMap.push(index);
        }
      } else {
        results[index] = text;
      }
    });

    // 批量翻译剩余文本
    if (textsToTranslate.length > 0) {
      try {
        const translations = await this.provider.translateBatch(textsToTranslate, targetLang, sourceLang);
        
        translations.forEach((translation, i) => {
          const originalIndex = indexMap[i];
          results[originalIndex] = translation;
          
          // 缓存结果
          if (this.cacheEnabled) {
            const cacheKey = `${textsToTranslate[i]}:${sourceLang || 'auto'}:${targetLang}`;
            this.cache.set(cacheKey, translation);
          }
        });
      } catch (error) {
        console.error('Batch translation failed:', error);
        // 翻译失败时使用原文
        textsToTranslate.forEach((text, i) => {
          const originalIndex = indexMap[i];
          results[originalIndex] = text;
        });
      }
    }

    return results;
  }

  /**
   * 递归翻译对象
   */
  async translateObject(obj: any, targetLang: string, sourceLang?: string): Promise<any> {
    if (typeof obj === 'string') {
      return await this.translate(obj, targetLang, sourceLang);
    }
    
    if (Array.isArray(obj)) {
      const promises = obj.map(item => this.translateObject(item, targetLang, sourceLang));
      return await Promise.all(promises);
    }
    
    if (obj && typeof obj === 'object') {
      const result: any = {};
      const promises = Object.entries(obj).map(async ([key, value]) => {
        result[key] = await this.translateObject(value, targetLang, sourceLang);
      });
      await Promise.all(promises);
      return result;
    }
    
    return obj;
  }

  /**
   * 检测文本是否需要翻译
   */
  private needsTranslation(text: string): boolean {
    if (!text || typeof text !== 'string') return false;
    
    // 排除技术内容和特殊格式
    const technicalPatterns = [
      /^https?:\/\//, // URL
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 邮箱
      /^[a-zA-Z-_]+$/, // CSS类名或ID
      /^\d+$/, // 纯数字
      /^[#@$%^&*()_+=\[\]{}|\\:";'<>?,./]/, // 特殊符号开头
      /^[a-zA-Z0-9\s\-_]{0,3}$/, // 过短的英文内容
    ];
    
    return !technicalPatterns.some(pattern => pattern.test(text.trim()));
  }

  /**
   * 获取支持的语言列表
   */
  getSupportedLanguages(): string[] {
    return this.provider.getSupportedLanguages();
  }

  /**
   * 获取提供商信息
   */
  getProviderInfo(): string {
    return this.provider.name;
  }

  /**
   * 启用/禁用缓存
   */
  setCacheEnabled(enabled: boolean): void {
    this.cacheEnabled = enabled;
  }

  /**
   * 清空缓存
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

/**
 * 创建翻译服务实例
 */
export function createTranslationService(config: TranslationConfig): TranslationService {
  return new TranslationService(config);
}