import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ReleaseFundsButton } from '@/components/dashboard/ReleaseFundsButton'
import { DisputeModal } from '@/components/dashboard/DisputeModal'

export default async function AdminInspectionsPage() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: { getAll() { return cookieStore.getAll() } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Fetch the latest inspection reports
    const { data: inspections } = await supabase
        .from('inspection_report')
        .select(`
            *,
            inspector:profiles!inspectorId ( * ),
            milestone (
                *,
                project ( * )
            )
        `)
        .order('createdAt', { ascending: false })
        .limit(20)

    // Fetch deliveries with anomalies
    const { data: anomalousDeliveries } = await supabase
        .from('delivery')
        .select(`
            *,
            project ( * ),
            receivedBy:profiles!receivedById ( * )
        `)
        .eq('status', 'ANOMALY')
        .order('createdAt', { ascending: false })

    const mappedInspections = (inspections || []).map((rep: any) => {
        const milestoneObj = Array.isArray(rep.milestone) ? rep.milestone[0] : rep.milestone;
        return {
            ...rep,
            inspector: Array.isArray(rep.inspector) ? rep.inspector[0] : rep.inspector,
            milestone: milestoneObj ? {
                ...milestoneObj,
                project: Array.isArray(milestoneObj.project) ? milestoneObj.project[0] : milestoneObj.project
            } : null
        }
    })

    const mappedDeliveries = (anomalousDeliveries || []).map((del: any) => ({
        ...del,
        project: Array.isArray(del.project) ? del.project[0] : del.project,
        receivedBy: Array.isArray(del.receivedBy) ? del.receivedBy[0] : del.receivedBy
    }))

    // Inyect Mock Data if DB is empty for demonstration purposes
    if (mappedInspections.length === 0) {
        mappedInspections.push({
            id: 'mock-report-1',
            conclusion: 'OK',
            notes: 'Inspection parfaite, aucun défaut majeur constaté sur les fondations.',
            createdAt: new Date().toISOString(),
            milestone: {
                label: 'Jalon : Coulage Fondation',
                project: { name: 'Villa Dakar - Almadies' }
            },
            inspector: {
                fullName: 'M. L\'Inspecteur'
            },
            checklist: [
                { point: 'Profondeur des fouilles (> 80cm)', isConform: true, proofLabel: '📷 Voir la preuve (Mesure au mètre)' },
                { point: 'Diamètre du ferraillage (12mm)', isConform: true, proofLabel: '📷 Voir la preuve' },
                { point: 'Propreté du béton de propreté', isConform: false }
            ]
        });
        mappedInspections.push({
            id: 'mock-report-2',
            conclusion: 'OK_WITH_RESERVES',
            notes: 'Quelques fissures mineures sur le mur nord, à surveiller. Jalon validé mais réserve émise.',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            milestone: {
                label: 'Jalon : Élévation des murs',
                project: { name: 'Maison Individuelle Thiès' }
            },
            inspector: {
                fullName: 'M. L\'Inspecteur'
            }
        });
        mappedInspections.push({
            id: 'mock-report-3',
            conclusion: 'OK_PAID',
            notes: 'Dalle coulée conformément au DTU. Paiement déjà libéré.',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            milestone: {
                label: 'Jalon : Coulage Dalle',
                project: { name: 'Résidence Saly Portudal' }
            },
            inspector: {
                fullName: 'M. L\'Inspecteur'
            }
        });
        mappedInspections.push({
            id: 'mock-report-4',
            conclusion: 'KO',
            notes: 'Alerte : Ferraillage non conforme aux plans d\'ingénierie. Risque d\'effondrement.',
            createdAt: new Date().toISOString(),
            milestone: {
                label: 'Jalon : Ferraillage de la dalle',
                project: { name: 'Résidence Cocody - Abidjan' }
            },
            inspector: {
                fullName: 'M. L\'Inspecteur'
            }
        });
    }

    // Inject Mock Data for Deliveries if empty
    if (mappedDeliveries.length === 0) {
        mappedDeliveries.push({
            id: 'mock-delivery-1',
            project: { name: 'Litige actif : Résidence Cocody' },
            material: 'En attente de correction par le constructeur',
            quantity: 1,
            unit: 'lot',
            anomalyDetails: 'Ferraillage dangereux signalé lors de l\'inspection.',
            createdAt: new Date().toISOString(),
            receivedBy: { fullName: 'M. L\'Inspecteur' }
        });
    }

    return (
        <div className="space-y-8 reveal-text">
            <div>
                <h1 className="text-3xl font-serif text-text-primary mb-1">Inspections & Livraisons</h1>
                <p className="text-text-secondary font-sans text-sm">
                    Validez les rapports terrain et gérez les anomalies de réception.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal-text reveal-delay-1">

                {/* Inspections Validation */}
                <div className="space-y-4">
                    <h2 className="text-xl font-serif text-text-primary border-b border-text-accent/10 pb-2">Derniers Rapports d'Inspection</h2>

                    {mappedInspections.length === 0 ? (
                        <Card className="p-8 text-center text-text-secondary">
                            Aucune inspection récente.
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {mappedInspections.map((report: any) => (
                                <Card key={report.id} className="p-5 flex flex-col gap-3 group hover:border-text-accent/30 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-sans font-bold text-text-primary text-sm">{report.milestone?.project?.name || 'Projet Inconnu'}</p>
                                            <p className="text-xs text-text-secondary mt-1">Jalon: <span className="text-text-primary font-medium">{report.milestone?.label || 'Inconnu'}</span></p>
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm ${report.conclusion === 'OK' ? 'bg-green-500/10 text-green-600' :
                                            report.conclusion === 'OK_WITH_RESERVES' ? 'bg-gold/10 text-gold' :
                                                'bg-red-500/10 text-red-600'
                                            }`}>
                                            {report.conclusion}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary line-clamp-2">{report.notes || 'Aucun commentaire.'}</p>

                                    {/* Checklist UI */}
                                    {report.checklist && report.checklist.length > 0 && (
                                        <div className="mt-2 p-3 bg-bg-primary rounded-md border border-text-accent/10">
                                            <p className="text-xs font-serif font-bold text-text-primary mb-2 border-b border-text-accent/10 pb-1">
                                                Points de contrôle ({report.milestone?.label})
                                            </p>
                                            <ul className="space-y-2">
                                                {report.checklist.map((item: any, idx: number) => (
                                                    <li key={idx} className="flex flex-wrap items-start md:items-center justify-between gap-2 text-xs">
                                                        <span className="text-text-secondary flex-1">{item.point}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${item.isConform ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                                                {item.isConform ? 'Conforme' : 'Non Conforme'}
                                                            </span>
                                                            {item.proofLabel && (
                                                                <button className="text-[10px] text-text-accent hover:text-brand-primary transition-colors hover:underline">
                                                                    {item.proofLabel}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="pt-3 border-t border-text-accent/10 flex justify-between items-center mt-2">
                                        <p className="text-[10px] text-text-secondary">Par {report.inspector?.fullName || 'Inconnu'} le {new Date(report.createdAt).toLocaleDateString()}</p>
                                        <div className="flex gap-2">
                                            {report.pdfUrl && (
                                                <Button variant="outline" size="sm" className="text-[10px] py-1 h-auto">PDF</Button>
                                            )}
                                        </div>
                                    </div>
                                    {(report.conclusion === 'OK' || report.conclusion === 'OK_WITH_RESERVES') && (
                                        <div className="flex flex-col xl:flex-row gap-3 mt-4 pt-4 border-t border-gray-100">
                                            <div className="w-full xl:w-1/2">
                                                <ReleaseFundsButton reportId={report.id} conclusion={report.conclusion} />
                                            </div>
                                            <div className="w-full xl:w-1/2">
                                                <DisputeModal reportId={report.id} />
                                            </div>
                                        </div>
                                    )}
                                    {report.conclusion === 'KO' && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-red-600 font-bold text-xs text-center mb-2">Fonds bloqués par sécurité</p>
                                            <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-500 hover:text-white">
                                                Gérer le litige
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delivery Anomalies */}
                <div className="space-y-4">
                    <h2 className="text-xl font-serif text-red-500 border-b border-red-500/10 pb-2 flex items-center gap-2">
                        Anomalies de Livraison
                        {mappedDeliveries.length > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{mappedDeliveries.length}</span>
                        )}
                    </h2>

                    {mappedDeliveries.length === 0 ? (
                        <Card className="p-8 text-center text-text-secondary bg-bg-card/50">
                            Aucune anomalie signalée.
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {mappedDeliveries.map((delivery: any) => (
                                <Card key={delivery.id} className="p-5 border-l-4 border-l-red-500 bg-red-50 border-red-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-sans font-bold text-red-900 text-sm">{delivery.project.name}</p>
                                        <span className="text-[10px] text-red-700 font-medium">{new Date(delivery.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs font-medium text-red-800 mb-1">Matériel: {delivery.material} ({delivery.quantity} {delivery.unit})</p>
                                    <p className="text-xs text-red-900 font-medium mt-2 p-2 bg-white/60 rounded border border-red-100">{delivery.anomalyDetails || "Non spécifié"}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-[10px] text-red-600 font-medium">Réceptionné par {delivery.receivedBy.fullName}</p>
                                        <Button variant="outline" size="sm" className="text-[10px] h-auto py-1 border-red-300 bg-white text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600">
                                            Contacter le constructeur
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
