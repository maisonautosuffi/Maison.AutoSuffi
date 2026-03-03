"use client";

import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Check, Navigation, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CameraCaptureProps {
    onCapture: (file: File) => void;
    label?: string;
    description?: string;
}

export function CameraCapture({ onCapture, label = "Preuve Visuelle", description = "Prenez une photo claire de l'élément à valider." }: CameraCaptureProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock geolocation & timestamp for the watermark
    const [location, setLocation] = useState("Dakar, Sénégal (14.6937, -17.4441)");
    const timestamp = new Date().toLocaleString('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const triggerUpload = () => {
        setIsCapturing(true);
        // Timeout to simulate UI interaction before native camera opens
        setTimeout(() => {
            fileInputRef.current?.click();
            setIsCapturing(false);
        }, 100);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a preview URL
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            onCapture(file);
        }
    };

    const clearPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-text-accent/20 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-text-accent/10 bg-bg-alt/50">
                <h3 className="font-serif font-semibold text-brand-confidence text-lg">{label}</h3>
                <p className="text-xs font-sans text-text-secondary mt-1">{description}</p>
            </div>

            <div className="p-4">
                {/* Hidden File Input configured to force/prefer environment camera */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {!previewUrl ? (
                    <div
                        onClick={triggerUpload}
                        className="w-full aspect-[4/3] bg-bg-alt border-2 border-dashed border-brand-accent/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-brand-confidence/5 hover:border-brand-accent transition-all group"
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                            <Camera className="w-8 h-8 text-brand-accent" />
                        </div>
                        <p className="font-sans font-bold text-brand-confidence">Prendre une photo in-app</p>
                        <p className="text-xs text-text-secondary mt-2 text-center px-4">
                            L'horodatage et la géolocalisation seront appliqués automatiquement.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Preview with mock watermark overlay */}
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-text-accent/20 bg-black">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={previewUrl}
                                alt="Preuve capturée"
                                className="w-full h-full object-cover"
                            />

                            {/* SVG Watermark Overlay */}
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-[10px] font-mono leading-tight">
                                <div className="flex items-center gap-1.5 mb-1.5 opacity-90">
                                    <Clock className="w-3 h-3 text-red-500" />
                                    <span>CERTIFIED: {timestamp}</span>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-90 text-brand-accent">
                                    <Navigation className="w-3 h-3" />
                                    <span>GPS: {location}</span>
                                </div>
                                <div className="mt-1.5 opacity-50 text-[8px] uppercase tracking-widest">
                                    Maison.AutoSuffi - Proof Engine V1
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={clearPreview}
                                className="flex-1 py-6 border-red-500/20 text-red-600 hover:bg-red-50 h-auto"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                REPRENDRE
                            </Button>
                            <Button
                                className="flex-[2] py-6 bg-green-600 hover:bg-green-700 text-white h-auto"
                            >
                                <Check className="w-5 h-5 mr-2" />
                                VALIDER LA PREUVE
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
