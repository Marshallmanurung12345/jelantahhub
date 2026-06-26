import { useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FooterSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [ref, visible] = useScrollAnimation();

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      // Dynamically import to avoid SSR issues and keep bundle slim
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPos = margin;

      // --- Cover Page ---
      pdf.setFillColor(10, 15, 13);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      pdf.setTextColor(245, 158, 11); // gold
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('JelantahHub', pageWidth / 2, 40, { align: 'center' });

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Laporan Sirkularitas Minyak Jelantah (UCO)', pageWidth / 2, 55, { align: 'center' });
      pdf.text('Corporate Sustainability Intelligence Report', pageWidth / 2, 65, { align: 'center' });

      pdf.setTextColor(16, 185, 129); // green
      pdf.setFontSize(10);
      pdf.text(`Digenerate: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, 80, { align: 'center' });

      // Divider
      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(0.5);
      pdf.line(margin, 90, pageWidth - margin, 90);

      // Key metrics
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('RINGKASAN EKSEKUTIF — DATA NASIONAL', margin, 105);

      const metrics = [
        ['Total Potensi UCO Indonesia (2025)', '3.600.000 Ton/Tahun'],
        ['Potensi Produksi Biodiesel (85% yield)', '3.060.000.000 Liter/Tahun'],
        ['Estimasi Carbon Offset Nasional', '6.976.800.000 kg CO₂/Tahun'],
        ['Potensi Energi Terbarukan', '28.764.000 MWh/Tahun'],
        ['Rata-rata Pencemaran Air Dicegah', '3.600.000.000 Liter/Tahun'],
        ['Jumlah Provinsi Terpetakan', '38 Provinsi'],
        ['Sumber Regulasi Biodiesel', 'RED II EU (2018/2001)'],
        ['Standar Teknis', 'SNI 04-7182-2015 · ESDM'],
      ];

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      metrics.forEach(([label, value], i) => {
        const rowY = 115 + i * 12;
        if (i % 2 === 0) {
          pdf.setFillColor(20, 35, 20);
          pdf.rect(margin, rowY - 4, pageWidth - margin * 2, 10, 'F');
        }
        pdf.setTextColor(180, 180, 180);
        pdf.text(label, margin + 3, rowY + 2);
        pdf.setTextColor(16, 185, 129);
        pdf.setFont('helvetica', 'bold');
        pdf.text(value, pageWidth - margin - 3, rowY + 2, { align: 'right' });
        pdf.setFont('helvetica', 'normal');
      });

      // Formula section
      pdf.setDrawColor(16, 185, 129);
      pdf.line(margin, 213, pageWidth - margin, 213);
      pdf.setTextColor(245, 158, 11);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('METODOLOGI & FORMULA', margin, 222);

      pdf.setTextColor(200, 200, 200);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const formulas = [
        'UCO Potensial = (Populasi / 3.5 jiwa/RT) × 0.9 L/bulan × 12 / 1000 (ton/tahun)',
        'Produksi Biodiesel = Volume UCO (L) × 0.85',
        'Carbon Offset (kg CO₂) = Volume Biodiesel (L) × 2.28',
        'Proyeksi Populasi = Populasi₂₀₂₅ × (1 + 0.011)ᵗ',
        'Jumlah Hub Ideal = Luas Wilayah (km²) / (π × Radius²)',
      ];
      formulas.forEach((f, i) => {
        pdf.text(`• ${f}`, margin + 2, 232 + i * 9);
      });

      // Footer
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(7);
      pdf.text('Sumber Data: Susenas BPS 2025 · RED II EU Directive (2018/2001) · Standar Kementerian ESDM · WHO Environmental Guidelines', pageWidth / 2, pageHeight - 10, { align: 'center' });
      pdf.text('© JelantahHub 2025 — Platform Sirkularitas UCO Indonesia', pageWidth / 2, pageHeight - 5, { align: 'center' });

      // --- Page 2: Dashboard Snapshot ---
      const dashboardEl = document.getElementById('dashboard');
      if (dashboardEl) {
        try {
          const canvas = await html2canvas(dashboardEl, {
            scale: 1.2,
            useCORS: true,
            backgroundColor: '#0A0F0D',
            logging: false,
          });
          pdf.addPage();
          pdf.setFillColor(10, 15, 13);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          pdf.setTextColor(245, 158, 11);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('VISUALISASI DASHBOARD GEOSPASIAL', pageWidth / 2, 15, { align: 'center' });

          const imgData = canvas.toDataURL('image/jpeg', 0.85);
          const imgWidth = pageWidth - margin * 2;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const maxImgHeight = pageHeight - 30;
          const finalHeight = Math.min(imgHeight, maxImgHeight);
          pdf.addImage(imgData, 'JPEG', margin, 22, imgWidth, finalHeight);
        } catch (e) {
          console.warn('Could not capture dashboard screenshot:', e);
        }
      }

      // --- Page 3: Leaderboard ---
      const lbEl = document.getElementById('leaderboard-table');
      if (lbEl) {
        try {
          const canvas = await html2canvas(lbEl, { scale: 1.2, backgroundColor: '#0A0F0D', logging: false });
          pdf.addPage();
          pdf.setFillColor(10, 15, 13);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          pdf.setTextColor(245, 158, 11);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('NATIONAL GREEN RANK — PERINGKAT NASIONAL', pageWidth / 2, 15, { align: 'center' });

          const imgData = canvas.toDataURL('image/jpeg', 0.85);
          const imgWidth = pageWidth - margin * 2;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const maxHeight = pageHeight - 30;
          pdf.addImage(imgData, 'JPEG', margin, 22, imgWidth, Math.min(imgHeight, maxHeight));
        } catch (e) {
          console.warn('Could not capture leaderboard screenshot:', e);
        }
      }

      pdf.save('JelantahHub_Corporate_Sustainability_Report.pdf');
      setGenerated(true);
      setTimeout(() => setGenerated(false), 4000);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Gagal membuat PDF. Pastikan browser mendukung html2canvas.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <footer className="footer-section" id="export">
      <div className="section-container">
        <div
          ref={ref}
          className={`footer-content ${visible ? 'fade-in-up' : 'fade-hidden'}`}
        >
          {/* Decorative icon */}
          <div className="footer-icon">📋</div>

          <span className="section-label">📄 Corporate Sustainability Report</span>
          <h2 className="footer-headline">
            Integrasikan Data Ini Untuk<br />
            <span className="text-gradient-green">Bukti Dampak Lingkungan Perusahaan Anda.</span>
          </h2>
          <p className="footer-desc">
            Sistem kami menangkap semua metrik dari dashboard interaktif di atas —
            volume UCO, proyeksi biodiesel, carbon offset, dan peringkat daerah —
            lalu menyusunnya menjadi PDF berformat profesional, siap untuk laporan
            ESG dan sustainability disclosure perusahaan Anda.
          </p>

          {/* PDF Features */}
          <div className="footer-features">
            {[
              { icon: '🗺️', label: 'Snapshot Peta Geospasial' },
              { icon: '📊', label: 'Metrik Carbon Offset' },
              { icon: '🏆', label: 'National Green Rank' },
              { icon: '📐', label: 'Formula & Metodologi' },
            ].map((f, i) => (
              <div key={i} className="footer-feature">
                <span className="footer-feature__icon">{f.icon}</span>
                <span className="footer-feature__label">{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA PDF Button */}
          <button
            className={`btn btn--pdf ${isGenerating ? 'btn--loading' : ''} ${generated ? 'btn--success' : ''}`}
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            id="generate-pdf-btn"
          >
            {isGenerating ? (
              <><span className="spinner" /> Menyusun Laporan...</>
            ) : generated ? (
              <> ✅ PDF Berhasil Diunduh!</>
            ) : (
              <> 📥 Generate Laporan PDF Sekarang</>
            )}
          </button>

          <p className="footer-hint">
            File PDF akan terunduh langsung ke perangkat Anda. Tidak ada data yang dikirim ke server.
          </p>
        </div>

        {/* Source of Truth */}
        <div className="footer-sources">
          <p className="footer-sources__title">📚 Source of Truth & Akurasi Metrik</p>
          <div className="footer-sources__grid">
            <div className="footer-source-item">
              <strong>Susenas BPS 2025</strong>
              <span>Data konsumsi rumah tangga & populasi nasional</span>
            </div>
            <div className="footer-source-item">
              <strong>RED II EU (2018/2001)</strong>
              <span>Standar reduksi emisi GRK biodiesel UCO 85%</span>
            </div>
            <div className="footer-source-item">
              <strong>Kementerian ESDM RI</strong>
              <span>Standar teknis biodiesel B20/B35 & FAME</span>
            </div>
            <div className="footer-source-item">
              <strong>WHO Environmental Std.</strong>
              <span>Dampak pencemaran minyak terhadap air bersih</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <span>🫙</span>
            <span>JelantahHub</span>
          </div>
          <p className="footer-copyright">
            © 2025 JelantahHub · Platform Sirkularitas UCO Indonesia<br />
            <span className="footer-tagline">Dari Limbah Mengancam Bumi, Menjadi Energi Menghidupi Negeri.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
