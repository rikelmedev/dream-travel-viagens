import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, BookOpen, Image, Settings, LogOut, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';

/**
 * AdminDashboard Component
 * Painel de administração completo para gerenciar conteúdo
 * Design: Minimalismo Contemporâneo
 */

interface AdminPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  highlight: string;
  image: string;
}

interface AdminBlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  date: string;
}

interface AdminSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'packages' | 'blog' | 'settings'>('packages');
  const [packages, setPackages] = useState<AdminPackage[]>([
    {
      id: '1',
      name: 'Lua de Mel Paradisíaca',
      description: 'Viva momentos inesquecíveis em um paraíso tropical',
      duration: '7 dias',
      highlight: 'Oferta Especial',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    },
  ]);
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    siteName: 'Dream Travel Viagens',
    siteDescription: 'Agência de viagens de luxo',
    contactEmail: 'contato@dreamtravel.com.br',
    contactPhone: '17 3000-0000',
    whatsappNumber: '55 17 99607-7150',
  });

  const [editingPackage, setEditingPackage] = useState<AdminPackage | null>(null);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);

  // Package Management
  const handleAddPackage = () => {
    const newPackage: AdminPackage = {
      id: Date.now().toString(),
      name: 'Novo Pacote',
      description: 'Descrição do pacote',
      duration: '7 dias',
      highlight: 'Novo',
      image: '',
    };
    setPackages([...packages, newPackage]);
    setEditingPackage(newPackage);
  };

  const publicarJournal = () => {
    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage.id ? editingPackage : p));
      setEditingPackage(null);
      toast.success('Pacote salvo com sucesso!');
    }
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter(p => p.id !== id));
    toast.success('Pacote removido!');
  };

  // Blog Management
  const handleAddPost = () => {
    const newPost: AdminBlogPost = {
      id: Date.now().toString(),
      title: 'Novo Post',
      category: 'Viagens',
      content: 'Conteúdo do post',
      image: '',
      date: new Date().toISOString().split('T')[0],
    };
    setBlogPosts([...blogPosts, newPost]);
    setEditingPost(newPost);
  };

  const handleSavePost = () => {
    if (editingPost) {
      setBlogPosts(blogPosts.map(p => p.id === editingPost.id ? editingPost : p));
      setEditingPost(null);
      toast.success('Post salvo com sucesso!');
    }
  };

  const handleDeletePost = (id: string) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id));
    toast.success('Post removido!');
  };

  // Settings Management
  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-secondary/5">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground font-serif">
            Painel de Administração
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem('adminAuth');
              window.location.reload();
            }}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border">
        <div className="container flex gap-8">
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'packages'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Pacotes
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'blog'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Blog
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Configurações
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <AnimatePresence mode="wait">
          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Gerenciar Pacotes</h2>
                <Button
                  onClick={handleAddPackage}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novo Pacote
                </Button>
              </div>

              {editingPackage ? (
                <motion.div
                  className="bg-white rounded-lg p-6 border border-border mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-bold mb-4">Editar Pacote</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome</label>
                      <input
                        type="text"
                        value={editingPackage.name}
                        onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Descrição</label>
                      <textarea
                        value={editingPackage.description}
                        onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2 h-24"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Duração</label>
                        <input
                          type="text"
                          value={editingPackage.duration}
                          onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Destaque</label>
                        <input
                          type="text"
                          value={editingPackage.highlight}
                          onChange={(e) => setEditingPackage({ ...editingPackage, highlight: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    <ImageUpload
                      label="Imagem do Pacote"
                      currentImage={editingPackage.image}
                      onImageSelect={(imageData) => setEditingPackage({ ...editingPackage, image: imageData })}
                      onRemoveImage={() => setEditingPackage({ ...editingPackage, image: '' })}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={publicarJournal}
                        className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Salvar
                      </Button>
                      <Button
                        onClick={() => setEditingPackage(null)}
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null}

              <div className="grid gap-4">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    className="bg-white rounded-lg p-4 border border-border flex items-center justify-between"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingPackage(pkg)}
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-destructive hover:text-destructive flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Deletar
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Gerenciar Blog</h2>
                <Button
                  onClick={handleAddPost}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novo Post
                </Button>
              </div>

              {editingPost ? (
                <motion.div
                  className="bg-white rounded-lg p-6 border border-border mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-bold mb-4">Editar Post</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Título</label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Categoria</label>
                        <input
                          type="text"
                          value={editingPost.category}
                          onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Data</label>
                        <input
                          type="date"
                          value={editingPost.date}
                          onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Conteúdo</label>
                      <textarea
                        value={editingPost.content}
                        onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2 h-32"
                      />
                    </div>
                    <ImageUpload
                      label="Imagem do Post"
                      currentImage={editingPost.image}
                      onImageSelect={(imageData) => setEditingPost({ ...editingPost, image: imageData })}
                      onRemoveImage={() => setEditingPost({ ...editingPost, image: '' })}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSavePost}
                        className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Salvar
                      </Button>
                      <Button
                        onClick={() => setEditingPost(null)}
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null}

              <div className="grid gap-4">
                {blogPosts.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center border border-border">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Nenhum post criado ainda</p>
                  </div>
                ) : (
                  blogPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      className="bg-white rounded-lg p-4 border border-border flex items-center justify-between"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.category} • {post.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingPost(post)}
                          className="flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-destructive hover:text-destructive flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Configurações do Site</h2>

              <div className="bg-white rounded-lg p-6 border border-border space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Site</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2 h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email de Contato</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2"
                  />
                </div>

                <Button
                  onClick={handleSaveSettings}
                  className="bg-primary hover:bg-primary/90 text-white w-full flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Configurações
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
