import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', paddingTop: '110px' }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
