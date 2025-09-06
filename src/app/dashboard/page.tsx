/**
 * 用户仪表板 - 管理 Landing Pages 和订阅
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink,
  Settings,
  BarChart3
} from 'lucide-react';

interface LandingPageStats {
  slug: string;
  title: string;
  isPublished: boolean;
  views: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  activeSubscriptions: number;
  createdAt: string;
}

interface UserSubscription {
  id: string;
  pageSlug: string;
  pageTitle: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due';
  amount: number;
  currency: string;
  isAnnual: boolean;
  currentPeriodEnd: string;
  daysLeft: number;
}

export default function UserDashboard() {
  const [landingPages, setLandingPages] = useState<LandingPageStats[]>([]);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // 模拟数据加载
      // 实际实现中应该调用 API
      const mockLandingPages: LandingPageStats[] = [
        {
          slug: 'saas-product-launch',
          title: 'SaaS 产品发布页',
          isPublished: true,
          views: 1250,
          conversions: 45,
          revenue: 4455,
          conversionRate: 3.6,
          activeSubscriptions: 42,
          createdAt: '2024-01-15'
        },
        {
          slug: 'mobile-app-landing',
          title: '移动应用推广页',
          isPublished: true,
          views: 890,
          conversions: 23,
          revenue: 2299,
          conversionRate: 2.6,
          activeSubscriptions: 20,
          createdAt: '2024-02-01'
        },
        {
          slug: 'course-sales-page',
          title: '在线课程销售页',
          isPublished: false,
          views: 0,
          conversions: 0,
          revenue: 0,
          conversionRate: 0,
          activeSubscriptions: 0,
          createdAt: '2024-02-10'
        }
      ];

      const mockSubscriptions: UserSubscription[] = [
        {
          id: 'sub_1',
          pageSlug: 'saas-product-launch',
          pageTitle: 'SaaS 产品发布页',
          planName: '专业版',
          status: 'active',
          amount: 99,
          currency: 'USD',
          isAnnual: false,
          currentPeriodEnd: '2024-03-15',
          daysLeft: 15
        }
      ];

      setLandingPages(mockLandingPages);
      setSubscriptions(mockSubscriptions);
    } catch (error) {
      console.error('加载仪表板数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: '活跃', variant: 'default' as const },
      canceled: { label: '已取消', variant: 'secondary' as const },
      past_due: { label: '逾期', variant: 'destructive' as const },
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const totalStats = {
    totalViews: landingPages.reduce((sum, page) => sum + page.views, 0),
    totalConversions: landingPages.reduce((sum, page) => sum + page.conversions, 0),
    totalRevenue: landingPages.reduce((sum, page) => sum + page.revenue, 0),
    totalActiveSubscriptions: landingPages.reduce((sum, page) => sum + page.activeSubscriptions, 0),
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">我的仪表板</h1>
          <p className="text-muted-foreground">管理您的 Landing Pages 和订阅</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          创建新页面
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总访问量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              来自所有页面的访问量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总转化数</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalConversions}</div>
            <p className="text-xs text-muted-foreground">
              平均转化率 {((totalStats.totalConversions / totalStats.totalViews) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalStats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              来自所有页面的收入
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃订阅</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalActiveSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              当前活跃的订阅数量
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容 */}
      <Tabs defaultValue="landing-pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="landing-pages">Landing Pages</TabsTrigger>
          <TabsTrigger value="subscriptions">我的订阅</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
        </TabsList>

        {/* Landing Pages 标签页 */}
        <TabsContent value="landing-pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>我的 Landing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {landingPages.map((page) => (
                  <div
                    key={page.slug}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{page.title}</h3>
                        {page.isPublished ? (
                          <Badge variant="default">已发布</Badge>
                        ) : (
                          <Badge variant="secondary">草稿</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>访问量: {page.views.toLocaleString()}</div>
                        <div>转化数: {page.conversions}</div>
                        <div>收入: {formatCurrency(page.revenue)}</div>
                        <div>转化率: {page.conversionRate}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        分析
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        编辑
                      </Button>
                      {page.isPublished && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          访问
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        设置
                      </Button>
                    </div>
                  </div>
                ))}
                
                {landingPages.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>您还没有创建任何 Landing Page</p>
                    <Button className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      创建第一个页面
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 订阅标签页 */}
        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>我的订阅</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{subscription.pageTitle}</h3>
                        {getStatusBadge(subscription.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>套餐: {subscription.planName}</div>
                        <div>
                          金额: {formatCurrency(subscription.amount, subscription.currency)}
                          {subscription.isAnnual ? '/年' : '/月'}
                        </div>
                        <div>下次续费: {subscription.currentPeriodEnd}</div>
                        <div>剩余天数: {subscription.daysLeft} 天</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        管理订阅
                      </Button>
                      <Button variant="outline" size="sm">
                        下载发票
                      </Button>
                    </div>
                  </div>
                ))}
                
                {subscriptions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>您当前没有任何订阅</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据分析标签页 */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>收入趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>收入趋势图表（待实现）</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>转化漏斗</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>转化漏斗图表（待实现）</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
