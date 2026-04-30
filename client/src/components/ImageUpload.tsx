import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

/**
 * ImageUpload Component
 * Componente reutilizável para upload de imagens
 * Suporta pré-visualização e conversão para Base64
 */

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  currentImage?: string;
  onRemoveImage?: () => void;
  label?: string;
  maxSize?: number; // em MB
}

export default function ImageUpload({
  onImageSelect,
  currentImage,
  onRemoveImage,
  label = 'Imagem',
  maxSize = 5,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`A imagem não pode exceder ${maxSize}MB`);
      return;
    }

    setIsLoading(true);

    // Converter para Base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setPreview(base64String);
      onImageSelect(base64String);
      toast.success('Imagem carregada com sucesso!');
      setIsLoading(false);
    };
    reader.onerror = () => {
      toast.error('Erro ao carregar a imagem');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemoveImage?.();
    toast.success('Imagem removida');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>

      {preview ? (
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Upload className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium text-foreground mb-1">
            Clique para fazer upload
          </p>
          <p className="text-xs text-muted-foreground">
            ou arraste uma imagem aqui
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Máximo {maxSize}MB
          </p>
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isLoading}
        className="hidden"
      />

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Carregando imagem...
        </div>
      )}
    </div>
  );
}
