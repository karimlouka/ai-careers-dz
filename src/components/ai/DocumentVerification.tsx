import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Upload, FileCheck, FileX, Loader2, Shield, AlertTriangle } from 'lucide-react';

type VerificationStatus = 'idle' | 'uploading' | 'processing' | 'verified' | 'failed';

interface DocumentVerificationProps {
  onVerificationComplete?: (status: 'verified' | 'failed', details?: any) => void;
}

export function DocumentVerification({ onVerificationComplete }: DocumentVerificationProps) {
  const { t, dir } = useLanguage();
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('idle');
    }
  };

  const handleVerify = async () => {
    if (!file) return;

    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 40) {
          clearInterval(uploadInterval);
          return 40;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    await new Promise(resolve => setTimeout(resolve, 1000));
    clearInterval(uploadInterval);
    setProgress(50);
    setStatus('processing');

    // Simulate AI processing
    const processInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(processInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    await new Promise(resolve => setTimeout(resolve, 2000));
    clearInterval(processInterval);
    setProgress(100);

    // Simulate random result (in real app, this would come from AI/OCR API)
    const isVerified = Math.random() > 0.3;
    setStatus(isVerified ? 'verified' : 'failed');
    onVerificationComplete?.(isVerified ? 'verified' : 'failed');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-8 h-8 animate-spin text-primary" />;
      case 'verified':
        return <FileCheck className="w-8 h-8 text-green-500" />;
      case 'failed':
        return <FileX className="w-8 h-8 text-red-500" />;
      default:
        return <Shield className="w-8 h-8 text-primary" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return t('common.loading');
      case 'processing':
        return t('ai.verification.pending');
      case 'verified':
        return t('ai.verification.verified');
      case 'failed':
        return t('ai.verification.failed');
      default:
        return t('ai.verification.upload');
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/10 border-green-500/30';
      case 'failed':
        return 'bg-red-500/10 border-red-500/30';
      case 'uploading':
      case 'processing':
        return 'bg-primary/10 border-primary/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{t('ai.verification.title')}</h3>
          <p className="text-sm text-muted-foreground">{t('ai.verification.subtitle')}</p>
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${getStatusBg()}`}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={status === 'uploading' || status === 'processing'}
        />
        
        <div className="flex flex-col items-center gap-4">
          {getStatusIcon()}
          
          <div>
            <p className="font-semibold text-foreground">{getStatusText()}</p>
            {file && status === 'idle' && (
              <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
            )}
          </div>

          {/* Progress Bar */}
          {(status === 'uploading' || status === 'processing') && (
            <div className="w-full max-w-xs">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
            </div>
          )}

          {/* Result Messages */}
          {status === 'verified' && (
            <div className="flex items-center gap-2 text-green-500">
              <FileCheck className="w-5 h-5" />
              <span className="font-medium">{t('ai.verification.verified')}</span>
            </div>
          )}

          {status === 'failed' && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">{t('ai.verification.failed')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Verify Button */}
      {file && status === 'idle' && (
        <Button onClick={handleVerify} className="w-full mt-4" size="lg">
          <Upload className="w-4 h-4 mr-2" />
          {t('common.submit')}
        </Button>
      )}

      {/* Reset Button */}
      {(status === 'verified' || status === 'failed') && (
        <Button 
          onClick={() => { setStatus('idle'); setFile(null); setProgress(0); }} 
          variant="outline" 
          className="w-full mt-4"
        >
          {t('common.back')}
        </Button>
      )}
    </div>
  );
}
