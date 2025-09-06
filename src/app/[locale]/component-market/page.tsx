import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  componentCategories, 
  componentMarket, 
  getComponentsByCategory,
  getPopularComponents,
  getNewComponents 
} from '@/config/component-market';
import { Eye, Download, Star, Sparkles } from 'lucide-react';

export default function ComponentMarketPage() {
  const t = useTranslations('component-market');
  const popularComponents = getPopularComponents();
  const newComponents = getNewComponents();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            🎨 组件市场
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Landing Page 组件市场</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            选择你喜欢的组件，快速构建专业的 Landing Page
          </p>
        </div>

        {/* 热门组件 */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold">热门组件</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularComponents.map((component) => (
              <Card key={component.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                    <Badge variant="secondary">热门</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {component.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">v{component.version}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        预览
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        使用
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 新组件 */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Sparkles className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold">最新组件</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newComponents.map((component) => (
              <Card key={component.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                    <Badge variant="default">新</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {component.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">v{component.version}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        预览
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        使用
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 组件分类 */}
        <section>
          <h2 className="text-2xl font-bold mb-8">按分类浏览</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentCategories.map((category) => {
              const categoryComponents = getComponentsByCategory(category.id);
              const Icon = category.icon;
              
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 mr-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {categoryComponents.length} 个组件
                      </span>
                      <Button size="sm" variant="outline">
                        查看全部
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}