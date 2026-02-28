import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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
                                    <div className="pt-3 border-t border-text-accent/10 flex justify-between items-center mt-2">
                                        <p className="text-[10px] text-text-secondary">Par {report.inspector?.fullName || 'Inconnu'} le {new Date(report.createdAt).toLocaleDateString()}</p>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {report.pdfUrl && (
                                                <Button variant="outline" size="sm" className="text-[10px] py-1 h-auto">PDF</Button>
                                            )}
                                            <Button size="sm" className="text-[10px] py-1 h-auto">CONTRÔLER</Button>
                                        </div>
                                    </div>
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
                                <Card key={delivery.id} className="p-5 border-l-4 border-l-red-500 bg-red-500/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-sans font-bold text-text-primary text-sm">{delivery.project.name}</p>
                                        <span className="text-[10px] text-text-secondary">{new Date(delivery.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs font-medium text-text-primary mb-1">Matériel: {delivery.material} ({delivery.quantity} {delivery.unit})</p>
                                    <p className="text-xs text-red-600 mt-2 p-2 bg-white/50 rounded">{delivery.anomalyDetails || "Non spécifié"}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-[10px] text-text-secondary">Réceptionné par {delivery.receivedBy.fullName}</p>
                                        <Button variant="outline" size="sm" className="text-[10px] h-auto py-1 border-red-500/30 text-red-600 hover:bg-red-500 hover:text-white">
                                            TRAITER
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
