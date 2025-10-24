import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Database, ExternalLink, Copy, CheckCircle2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface DatabaseSetupAlertProps {
  show: boolean;
  onDismiss?: () => void;
}

export function DatabaseSetupAlert({ show, onDismiss }: DatabaseSetupAlertProps) {
  const [copied, setCopied] = useState(false);

  const sqlSetupPath = '/QUICK_DATABASE_SETUP.sql';
  const supabaseUrl = 'https://supabase.com';

  const handleCopyPath = () => {
    navigator.clipboard.writeText(sqlSetupPath);
    setCopied(true);
    toast.success('File path copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      number: 1,
      title: 'Open Supabase Dashboard',
      description: 'Login to your Supabase project',
      action: 'Visit Supabase',
      link: supabaseUrl
    },
    {
      number: 2,
      title: 'Open SQL Editor',
      description: 'Find "SQL Editor" in the left sidebar',
      action: null
    },
    {
      number: 3,
      title: 'Run Setup Script',
      description: 'Copy contents of /QUICK_DATABASE_SETUP.sql and run it',
      action: 'Copy Path',
      onClick: handleCopyPath
    },
    {
      number: 4,
      title: 'Refresh Website',
      description: 'Reload this page to verify setup',
      action: null
    }
  ];

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl"
        >
          <Card className="border-2 border-primary/20">
            <CardHeader className="border-b border-border bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      Database Setup Required
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create database tables to enable dynamic content
                    </p>
                  </div>
                </div>
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDismiss}
                    className="rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Alert className="mb-6 bg-orange-500/10 border-orange-500/20">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <AlertTitle>Tables Not Found</AlertTitle>
                <AlertDescription>
                  The website is trying to fetch data from database tables that don't exist yet.
                  Follow the steps below to create them (takes ~2 minutes).
                </AlertDescription>
              </Alert>

              <div className="space-y-4 mb-6">
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.number * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      {step.action && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={step.onClick}
                          asChild={!!step.link}
                          className="mt-2"
                        >
                          {step.link ? (
                            <a href={step.link} target="_blank" rel="noopener noreferrer">
                              {step.action}
                              <ExternalLink className="ml-2 w-3 h-3" />
                            </a>
                          ) : (
                            <>
                              {step.action}
                              {step.onClick === handleCopyPath && (
                                copied ? (
                                  <CheckCircle2 className="ml-2 w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="ml-2 w-3 h-3" />
                                )
                              )}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                <h4 className="mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  What Gets Created?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">testimonials_b9482a76</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">team_members_b9482a76</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">projects_b9482a76</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">client_logos_b9482a76</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">clients_b9482a76</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">contact_forms_b9482a76</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">newsletter_subscribers_b9482a76</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Need help? Check <code className="bg-secondary px-2 py-1 rounded">/SETUP_REQUIRED.md</code>
                </p>
                <div className="flex gap-2">
                  {onDismiss && (
                    <Button variant="outline" onClick={onDismiss}>
                      Dismiss
                    </Button>
                  )}
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href={supabaseUrl} target="_blank" rel="noopener noreferrer">
                      Open Supabase
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
