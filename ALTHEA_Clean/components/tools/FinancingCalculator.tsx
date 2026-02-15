'use client';

import { useState } from 'react';
import styles from './FinancingCalculator.module.css';

interface FinancingResult {
    totalCost: number;
    downPayment: number;
    loanAmount: number;
    monthlyPayment: number;
    duration: number;
    interestRate: number;
    totalInterest: number;
    totalRepayment: number;
}

interface FinancingCalculatorProps {
    projectCost: number;
    onClose?: () => void;
}

const FinancingCalculator = ({ projectCost, onClose }: FinancingCalculatorProps) => {
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [duration, setDuration] = useState(20);
    const [interestRate, setInterestRate] = useState(7);

    const calculateFinancing = (): FinancingResult => {
        const downPayment = (projectCost * downPaymentPercent) / 100;
        const loanAmount = projectCost - downPayment;

        // Monthly interest rate
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = duration * 12;

        // Monthly payment calculation using amortization formula
        const monthlyPayment = loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalRepayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalRepayment - loanAmount;

        return {
            totalCost: projectCost,
            downPayment,
            loanAmount,
            monthlyPayment,
            duration,
            interestRate,
            totalInterest,
            totalRepayment
        };
    };

    const result = calculateFinancing();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount) + ' FCFA';
    };

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.container}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <h2 className={styles.title}>Simulateur de Financement</h2>
                <p className={styles.subtitle}>
                    Calculez vos mensualités et planifiez votre investissement
                </p>

                <div className={styles.content}>
                    {/* Project Cost */}
                    <div className={styles.costSection}>
                        <div className={styles.costLabel}>Coût total du projet</div>
                        <div className={styles.costValue}>{formatCurrency(projectCost)}</div>
                    </div>

                    {/* Sliders */}
                    <div className={styles.sliders}>
                        <div className={styles.sliderGroup}>
                            <label className={styles.sliderLabel}>
                                Apport initial : <strong>{downPaymentPercent}%</strong>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="50"
                                step="5"
                                value={downPaymentPercent}
                                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div className={styles.sliderValue}>{formatCurrency(result.downPayment)}</div>
                        </div>

                        <div className={styles.sliderGroup}>
                            <label className={styles.sliderLabel}>
                                Durée du prêt : <strong>{duration} ans</strong>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="25"
                                step="5"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>

                        <div className={styles.sliderGroup}>
                            <label className={styles.sliderLabel}>
                                Taux d'intérêt : <strong>{interestRate}%</strong>
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="10"
                                step="0.5"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className={styles.results}>
                        <div className={styles.resultCard}>
                            <div className={styles.resultLabel}>Mensualité</div>
                            <div className={styles.resultValue}>{formatCurrency(result.monthlyPayment)}</div>
                            <div className={styles.resultSubtext}>pendant {duration} ans</div>
                        </div>

                        <div className={styles.resultCard}>
                            <div className={styles.resultLabel}>Montant emprunté</div>
                            <div className={styles.resultValue}>{formatCurrency(result.loanAmount)}</div>
                        </div>

                        <div className={styles.resultCard}>
                            <div className={styles.resultLabel}>Intérêts totaux</div>
                            <div className={styles.resultValue}>{formatCurrency(result.totalInterest)}</div>
                        </div>
                    </div>

                    {/* Banks */}
                    <div className={styles.banks}>
                        <div className={styles.banksTitle}>Nos partenaires bancaires</div>
                        <div className={styles.banksList}>
                            <div className={styles.bank}>CBAO Attijariwafa Bank</div>
                            <div className={styles.bank}>BOA Sénégal</div>
                            <div className={styles.bank}>Ecobank</div>
                            <div className={styles.bank}>Banque Atlantique</div>
                        </div>
                        <p className={styles.banksNote}>
                            * Simulation indicative. Taux et conditions sous réserve d'acceptation par la banque.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className={styles.cta}>
                        <button className={styles.ctaButton}>
                            Demander un financement
                        </button>
                        <button className={styles.secondaryButton} onClick={onClose}>
                            Continuer sans financement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancingCalculator;
