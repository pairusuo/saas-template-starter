'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface ContactFormBuilderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  showContactInfo?: boolean;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  formFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    required?: boolean;
    placeholder?: string;
  }>;
  variant?: 'simple' | 'split' | 'centered';
  className?: string;
}

export function ContactFormBuilder({
  title,
  subtitle,
  badge,
  showContactInfo = true,
  contactInfo = {},
  formFields,
  variant = 'split',
  className
}: ContactFormBuilderProps) {
  // Use a distinct namespace for page-builder contact to avoid clashing
  const t = useTranslations('pb-contact');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('ContactFormBuilder - Current locale:', locale);

  // Default form fields
  const defaultFields = [
    {
      name: 'name',
      label: t('form.name'),
      type: 'text' as const,
      required: true,
      placeholder: t('form.namePlaceholder')
    },
    {
      name: 'email',
      label: t('form.email'),
      type: 'email' as const,
      required: true,
      placeholder: t('form.emailPlaceholder')
    },
    {
      name: 'subject',
      label: t('form.subject'),
      type: 'text' as const,
      required: false,
      placeholder: t('form.subjectPlaceholder')
    },
    {
      name: 'message',
      label: t('form.message'),
      type: 'textarea' as const,
      required: true,
      placeholder: t('form.messagePlaceholder')
    }
  ];

  const fields = formFields || defaultFields;

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setFormData({});
  };

  const defaultContactInfo = {
    email: contactInfo.email || t('info.email'),
    phone: contactInfo.phone || t('info.phone'),
    address: contactInfo.address || t('info.address')
  };

  if (variant === 'centered') {
    return (
      <section className={cn('py-24 bg-background', className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              {badge && (
                <Badge variant="outline" className="px-4 py-2 mb-4">
                  {badge}
                </Badge>
              )}
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {title || t('title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {subtitle || t('subtitle')}
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          rows={4}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-24 bg-gradient-to-b from-background to-muted/30', className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          {badge && (
            <Badge variant="outline" className="px-4 py-2 mb-4">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {title || t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle || t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                {t('form.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows={4}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          {showContactInfo && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('info.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{t('info.emailLabel')}</div>
                      <div className="text-muted-foreground">{defaultContactInfo.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{t('info.phoneLabel')}</div>
                      <div className="text-muted-foreground">{defaultContactInfo.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{t('info.addressLabel')}</div>
                      <div className="text-muted-foreground">{defaultContactInfo.address}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">{t('responseTime.title')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('responseTime.description')}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <div>• {t('responseTime.email')}</div>
                    <div>• {t('responseTime.phone')}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
