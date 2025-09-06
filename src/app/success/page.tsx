/**
 * 支付成功处理页面
 * 用户完成支付后跳转到这个页面
 */

import { Suspense } from 'react';
export const runtime = 'edge';
import { notFound } from 'next/navigation';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PaymentSuccessPageProps {
  searchParams: {
    session_id?: string;
    page_slug?: string;
  };
}

export default function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const { session_id, page_slug } = searchParams;

  if (!session_id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={<PaymentSuccessLoader />}>
          <PaymentSuccessContent sessionId={session_id} pageSlug={page_slug} />
        </Suspense>
      </div>
    </div>
  );
}

async function PaymentSuccessContent({ 
  sessionId, 
  pageSlug 
}: { 
  sessionId: string; 
  pageSlug?: string; 
}) {
  // 获取支付详情
  const paymentDetails = await getPaymentDetails(sessionId);
  
  if (!paymentDetails) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* 成功图标 */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* 标题 */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        支付成功！
      </h1>
      
      <p className="text-xl text-gray-600 mb-8">
        感谢您的购买！您的订阅已激活，可以立即开始使用。
      </p>

      {/* 支付详情卡片 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            订阅详情
            <Badge variant="secondary">已激活</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">套餐名称</p>
              <p className="font-medium">{paymentDetails.planName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">计费周期</p>
              <p className="font-medium">
                {paymentDetails.isAnnual ? '年付' : '月付'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">金额</p>
              <p className="font-medium">${paymentDetails.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">下次续费</p>
              <p className="font-medium">
                {new Date(paymentDetails.nextBilling).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>

          {/* 发票信息 */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">发票</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">#{paymentDetails.invoiceNumber}</span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                下载发票
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 后续步骤 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>接下来该做什么？</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 text-left">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">检查邮箱</h3>
                <p className="text-sm text-gray-600">
                  我们已向您发送了登录凭据和详细说明
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">创建账户</h3>
                <p className="text-sm text-gray-600">
                  使用您的邮箱创建账户并设置密码
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">开始使用</h3>
                <p className="text-sm text-gray-600">
                  登录后即可享受所有订阅功能
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 行动按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          打开邮箱
        </Button>
        
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          立即登录
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* 支持信息 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600 mb-4">
          需要帮助？我们随时为您服务
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <a href="/support" className="text-blue-600 hover:underline">
            访问帮助中心
          </a>
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
            发送邮件
          </a>
          <a href="/contact" className="text-blue-600 hover:underline">
            联系客服
          </a>
        </div>
      </div>
    </div>
  );
}

function PaymentSuccessLoader() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="animate-pulse">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-8"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-8"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// 获取支付详情的模拟函数
async function getPaymentDetails(sessionId: string) {
  // 实际实现中，这里应该：
  // 1. 调用 Stripe/Paddle API 获取支付会话详情
  // 2. 从数据库获取订阅信息
  // 3. 验证支付状态

  // 模拟数据
  return {
    planName: '专业版',
    isAnnual: false,
    amount: 99,
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
    invoiceNumber: 'INV-2024-001',
    customerEmail: 'user@example.com'
  };
}
