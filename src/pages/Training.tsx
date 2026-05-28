/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlayCircle, 
  BookOpen, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Search, 
  Video,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Training: React.FC = () => {
  const { lessons, products, showNotification } = useApp();

  // Selected active lesson index
  const [activeLessonId, setActiveLessonId] = useState<string>(lessons[0]?.id || '');

  // Search filters
  const [selectedProductId, setSelectedProductId] = useState<string>('all');

  // Interactive lessons watch tracker
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // Get current active lesson details
  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  const handleToggleComplete = (lessonId: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    if (!isCompleted) {
      setCompletedLessonIds(prev => [...prev, lessonId]);
      showNotification('success', '✓ Aula marcada como concluída! Parabéns pelo seu progresso! 🚀');
    } else {
      setCompletedLessonIds(prev => prev.filter(id => id !== lessonId));
    }
  };

  // Filter lists based on selected product filter
  const filteredLessons = selectedProductId === 'all'
    ? lessons
    : lessons.filter(l => l.product_id === selectedProductId);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Search selection tab */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-vusk-card/40 border border-vusk-border p-4 rounded-xl glass-effect">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-vusk-purple animate-pulse" />
          <h3 className="text-sm font-stretch tracking-wider text-[#F8F7FF] uppercase">Playbooks Acadêmicos de Tráfego</h3>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] text-[#9c94b0] font-mono uppercase">Filtrar por Especialidade:</span>
          <select
            id="training-product-filter"
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
              // Automap to first filtered lesson to avoid white previews
              const match = lessons.find(l => e.target.value === 'all' || l.product_id === e.target.value);
              if (match) setActiveLessonId(match.id);
            }}
            className="h-10 px-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs font-mono text-vusk-secondary focus:border-vusk-purple focus:outline-none"
          >
            <option value="all">TODAS AS AULAS</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {activeLesson ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 items-start">
          
          {/* Main Cinematographic Cinema Stage player (Left 3 Span) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="rounded-2xl border border-vusk-border overflow-hidden bg-black/90 aspect-video relative group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {/* Responsive Iframe embed */}
              <iframe
                id="main-video-embed"
                width="100%"
                height="100%"
                src={activeLesson.video_url}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stage Footer Lesson specifications */}
            <div className="p-5.5 rounded-xl border border-vusk-border bg-vusk-card/30 glass-effect space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#241E30] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-vusk-purple uppercase tracking-widest block font-bold">
                    Módulo de Conversão do Afiliado // Seq {activeLesson.sequence_order}
                  </span>
                  <h2 className="text-base font-semibold text-[#F8F7FF]">
                    {activeLesson.title}
                  </h2>
                </div>

                <button
                  id={`toggle-complete-stage-btn-${activeLesson.id}`}
                  onClick={() => handleToggleComplete(activeLesson.id)}
                  className={`px-4 h-9 font-mono font-bold text-xs rounded-lg border transition-all flex items-center gap-2 ${
                    completedLessonIds.includes(activeLesson.id)
                      ? 'bg-emerald-500/15 text-[#10b981] border-[#10b981]/40'
                      : 'bg-[#14101B] hover:bg-vusk-purple text-vusk-secondary border-vusk-border hover:border-vusk-purple hover:text-white'
                  }`}
                >
                  {completedLessonIds.includes(activeLesson.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Conclído ✓</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Concluir Aula</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="text-[11px] font-mono tracking-wider text-vusk-secondary uppercase">Explicação da Estratégia</h5>
                <p className="text-xs text-[#9c94b0] leading-relaxed">
                  {activeLesson.description}
                </p>
              </div>
            </div>
          </div>

          {/* Staggered sidebar lesson selectors lists (Right 2 Span) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#9c94b0] uppercase tracking-wider pl-1">
              Fila de Aulas Disponíveis ({filteredLessons.length})
            </h4>

            {filteredLessons.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-vusk-border bg-vusk-card/10 text-xs text-[#9c94b0]">
                Nenhuma aula disponível para os parâmetros informados.
              </div>
            ) : (
              <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                {filteredLessons.map((lesson) => {
                  const isActive = activeLessonId === lesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const relatedProduct = products.find(p => p.id === lesson.product_id);

                  return (
                    <button
                      id={`lesson-selector-btn-${lesson.id}`}
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 relative group overflow-hidden ${
                        isActive
                          ? 'border-vusk-purple bg-gradient-to-r from-vusk-card/50 to-purple-950/15 text-vusk-secondary'
                          : 'border-vusk-border bg-vusk-card/15 text-vusk-text-secondary hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Active line accent */}
                      {isActive && (
                        <span className="absolute left-0 top-3 bottom-3 w-1 bg-vusk-purple rounded-r-md" />
                      )}

                      <div className="relative shrink-0 mt-0.5">
                        <PlayCircle className={`w-6 h-6 ${isActive ? 'text-vusk-purple' : 'text-[#9c94b0] group-hover:text-vusk-purple'} transition-colors`} />
                        {isCompleted && (
                          <div className="absolute -bottom-1 -right-1 bg-[#0B080F] rounded-full p-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[9px] font-mono uppercase">
                          <span className={`${isActive ? 'text-white/90' : 'text-[#9c94b0]'}`}>
                            {relatedProduct?.name || 'VUSK CLUB'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-vusk-purple" />
                            {lesson.duration_minutes} min
                          </span>
                        </div>

                        <h5 className="text-xs font-semibold text-[#F8F7FF] truncate group-hover:text-vusk-secondary transition-colors">
                          {lesson.title}
                        </h5>
                        <p className="text-[10px] text-[#9c94b0] line-clamp-2 leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className="p-12 border border-vusk-border bg-vusk-card/10 rounded-2xl text-center">
          <Clock className="w-10 h-10 text-vusk-purple animate-pulse mx-auto mb-3" />
          <p className="text-xs text-[#9c94b0]">Aguardando conexão com a academia de cursos...</p>
        </div>
      )}
    </div>
  );
};
