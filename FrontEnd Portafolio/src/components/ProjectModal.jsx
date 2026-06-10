import { Badge } from './ui/Cards';
import * as Icon from './Icons';
import { useTranslation } from 'react-i18next';

export default function ProjectModal({ project, onClose, onOpenDemo }) {
    const { t } = useTranslation();
    if (!project) return null;

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-surface border border-blue-500/20 rounded-card-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de Cierre */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-muted hover:text-text transition-colors"
                    aria-label={t('projectModal.close')}
                >
                    <Icon.X className="w-5 h-5" />
                </button>

                {/* Cabecera del Proyecto */}
                <div className="flex flex-wrap items-center gap-3 mb-6 dynamic-header">
                    <Badge variant={project.variant}>{project.badge}</Badge>
                    {project.metrics && (
                        <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/10">
                            {project.metrics}
                        </span>
                    )}
                </div>

                <h2 className="text-3xl font-medium tracking-tight text-text mb-4">
                    {project.title}
                </h2>

                {/* Layout Dividido (Split UI) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">

                    {/* Columna Izquierda y Central: La Historia y el Impacto (Oro para el reclutador) */}
                    <div className="md:col-cols-1 md:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-xs font-medium uppercase tracking-wider text-blue-400 mb-2">
                                {t('projectModal.generalDesc')}
                            </h3>
                            <p className="text-sm font-normal text-muted leading-relaxed">
                                {project.detail || project.desc}
                            </p>
                        </div>

                        {/* Simulación Visual de la Topología de la Arquitectura */}
                        <div className="border border-blue-500/15 rounded-card bg-bg p-4 space-y-3">
                            <h4 className="text-xs font-medium text-text flex items-center gap-2">
                                <Icon.Cpu className="w-3.5 h-3.5 text-blue-400" /> {t('projectModal.infraView')}
                            </h4>
                            <div className="flex items-center justify-between text-[11px] font-mono text-muted bg-card p-2.5 rounded border border-subtle">
                                <span className="text-blue-400">Client (PWA)</span>
                                <Icon.ChevronRight className="w-3 h-3 text-muted/40" />
                                <span className="text-emerald-400">FastAPI Gateway</span>
                                <Icon.ChevronRight className="w-3 h-3 text-muted/40" />
                                <span className="text-amber-400">PostgreSQL (Core)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {/* Tarjeta del Problema */}
                            <div className="p-4 rounded-card border border-red-500/30 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.05)] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                                <h4 className="text-xs font-medium text-red-400 mb-1 uppercase tracking-wider">
                                    {t('projectModal.problem')}
                                </h4>
                                <p className="text-sm font-normal text-text leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>

                            {/* Tarjeta de la Solución (Resaltada visualmente) */}
                            <div className="p-4 rounded-card border border-blue-500/30 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.05)] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                                <h4 className="text-xs font-medium text-blue-400 mb-1 uppercase tracking-wider">
                                    {t('projectModal.solution')}
                                </h4>
                                <p className="text-sm font-normal text-text leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Stack y Acciones Tácticas */}
                    <div className="space-y-6 md:border-l md:border-blue-500/10 md:pl-6">
                        <div>
                            <h3 className="text-xs font-medium uppercase tracking-wider text-blue-400 mb-3">
                                {t('projectModal.techStack')}
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-normal px-2.5 py-1 rounded bg-card text-text border border-subtle hover:border-blue-500/30 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
              {project.isDemo ? (
                <button
                  onClick={() => onOpenDemo(project.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-blue-500 text-text text-xs font-medium hover:bg-blue-600 active:scale-95 transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 flex items-center gap-2">{t('projectModal.viewDemo')} <Icon.ArrowUpRight className="w-3 h-3" /></span>
                </button>
              ) : project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-surface border border-blue-500/30 text-text text-xs font-medium hover:bg-blue-500/10 active:scale-95 transition-all"
                >
                  {t('projectModal.openLive')} <Icon.ArrowUpRight className="w-3 h-3" />
                </a>
              ) : (
                <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                  {t('projectModal.comingSoon')}
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card border border-blue-500/20 bg-bg text-muted text-xs font-normal hover:text-text hover:border-blue-500/40 transition-all"
              >
                {t('projectModal.back')}
              </button>
            </div>
                    </div>

                </div>
            </div>
        </div>
    );
}