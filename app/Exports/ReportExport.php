<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
// use Maatwebsite\Excel\Concerns\{
//     FromView,
//     ShouldAutoSize,
//     WithStyles,
//     WithEvents,
//     WithColumnWidths
// };
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Events\AfterSheet;

class ReportExport implements 
    FromView, 
    ShouldAutoSize, 
    WithStyles, 
    WithEvents,
    WithColumnWidths
{
    protected $tab;
    protected $data;
    protected $filters;
    protected $company;

    public function __construct($tab, $data, $filters, $company)
    {
        $this->tab = $tab;
        $this->data = $data;
        $this->filters = $filters;
        $this->company = $company;
    }

    public function view(): View
    {
        
        return view("excel.reports.{$this->tab}", [
            'data' => $this->data,
            'filters' => $this->filters,
            'company' => $this->company,
        ]);
    }

    // 📏 Custom width (optional)
    public function columnWidths(): array
    {
        return [];
    }

    // 🎨 Styling basic
    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 14]], // company
            4 => ['font' => ['bold' => true]], // header table
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $sheet = $event->sheet->getDelegate();

                // =========================
                // 🔥 1. HEADER / TITLE
                // =========================

                $sheet->setCellValue('A1', $this->company->name ?? 'Central Buah Sutomo');

                $title = match ($this->tab) {
                    'keuangan' => 'Laporan Keuangan',
                    'stok' => 'Laporan Stok',
                    'penjualan' => 'Laporan Penjualan',
                    'pengeluaran' => 'Laporan Pengeluaran',
                    'laba-rugi' => 'Laporan Laba Rugi',
                };

                $sheet->setCellValue('A2', $title);
                $sheet->setCellValue('A3', 'Periode: ' . ($this->filters['period'] ?? '-'));

                // OPTIONAL: styling header biar cakep
                $sheet->getStyle('A1')->applyFromArray([
                    'font' => ['bold' => true, 'size' => 14],
                ]);

                $sheet->getStyle('A2')->applyFromArray([
                    'font' => ['bold' => true, 'size' => 12],
                ]);

                // =========================
                // 🔥 2. HITUNG POSISI SUMMARY
                // =========================

                $highestColumn = $sheet->getHighestColumn();
                $lastColIndex = Coordinate::columnIndexFromString($highestColumn);

                $summaryStart = $lastColIndex + 2;

                $colLabel = Coordinate::stringFromColumnIndex($summaryStart);
                $colValue = Coordinate::stringFromColumnIndex($summaryStart + 1);

                // =========================
                // 🔥 3. RENDER SUMMARY
                // =========================

                match ($this->tab) {
                    'keuangan' => $this->styleKeuangan($sheet, $colLabel, $colValue),
                    'stok' => $this->styleStok($sheet, $colLabel, $colValue),
                    'penjualan' => $this->stylePenjualan($sheet, $colLabel, $colValue),
                    'pengeluaran' => $this->stylePengeluaran($sheet, $colLabel, $colValue),
                    'laba-rugi' => $this->styleLabaRugi($sheet, $colLabel, $colValue),
                };

                // =========================
                // 🔥 4. STYLE TABLE
                // =========================
                $this->styleTable($sheet);

                // =========================
                // 🔥 5. AUTO WIDTH (FIX ERROR)
                // =========================

                $highestColumn = $sheet->getHighestColumn();
                $highestColumnIndex = Coordinate::columnIndexFromString($highestColumn);

                for ($col = 1; $col <= $highestColumnIndex; $col++) {
                    $columnLetter = Coordinate::stringFromColumnIndex($col);
                    $sheet->getColumnDimension($columnLetter)->setAutoSize(true);
                }
            },
        ];
    }

    private function styleTable($sheet)
    {
        $startRow = 6;

        // detect last column dari header
        $highestColumn = $sheet->getHighestColumn();
        $highestRow = $sheet->getHighestRow();

        // HEADER STYLE
        $sheet->getStyle("A{$startRow}:{$highestColumn}{$startRow}")
            ->applyFromArray([
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => 'solid',
                    'startColor' => ['argb' => 'FFEFEFEF'],
                ],
            ]);

        // BORDER TABLE
        $sheet->getStyle("A{$startRow}:{$highestColumn}{$highestRow}")
            ->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => 'thin',
                    ],
                ],
            ]);

        $this->formatColumns($sheet);

        // ALIGN RIGHT (kolom angka)
        foreach (range('B', $highestColumn) as $col) {
            $sheet->getStyle("{$col}" . ($startRow + 1) . ":{$col}{$highestRow}")
                ->getAlignment()
                ->setHorizontal('right');
        }
    }

    private function formatColumns($sheet)
    {
        $highestRow = $sheet->getHighestRow();

        // Rp columns (C sampai Z asumsi angka)
        foreach (range('C', 'Z') as $col) {
            $sheet->getStyle("{$col}7:{$col}{$highestRow}")
                ->getNumberFormat()
                ->setFormatCode('#,##0');
        }
    }

    private function styleKeuangan($sheet, $colLabel, $colValue)
    {
        $row = 6;

        $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
        $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");

        $row++;
        $sheet->setCellValue("{$colLabel}{$row}", 'Total Modal');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['income']);

        $row++;
        $sheet->setCellValue("{$colLabel}{$row}", 'Total Pengeluaran');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['expense']);

        $row++;
        $sheet->setCellValue("{$colLabel}{$row}", 'Kas Bersih');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['net']);

        // Format
        $sheet->getStyle("{$colValue}7:{$colValue}{$row}")
            ->getNumberFormat()
            ->setFormatCode('"Rp" #,##0');

        // Border
        $sheet->getStyle("{$colLabel}6:{$colValue}{$row}")
            ->applyFromArray([
                'borders' => [
                    'allBorders' => ['borderStyle' => 'thin'],
                ],
            ]);

        // HEADER STYLE
        $sheet->getStyle("{$colLabel}6:{$colValue}6")->applyFromArray([
            'font' => ['bold' => true],
            'fill' => [
                'fillType' => 'solid',
                'startColor' => ['argb' => 'FFEFEFEF'],
            ],
        ]);

        // BORDER
        $sheet->getStyle("{$colLabel}6:{$colValue}{$row}")
            ->applyFromArray([
                'borders' => [
                    'allBorders' => ['borderStyle' => 'thin'],
                ],
            ]);
    }

    private function styleStok($sheet, $colLabel, $colValue)
    {
        $row = 6;

        $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
        $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");

        $sheet->setCellValue("{$colLabel}".++$row, 'Total SKU');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['totalSku']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Total Stock');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['totalStock']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Stock Value');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['stockValue']);

        // HEADER STYLE
        $sheet->getStyle("{$colLabel}6:{$colValue}6")->applyFromArray([
            'font' => ['bold' => true],
            'fill' => [
                'fillType' => 'solid',
                'startColor' => ['argb' => 'FFEFEFEF'],
            ],
        ]);

        // BORDER
        $sheet->getStyle("{$colLabel}6:{$colValue}{$row}")
            ->applyFromArray([
                'borders' => [
                    'allBorders' => ['borderStyle' => 'thin'],
                ],
            ]);
    }

    private function stylePenjualan($sheet, $colLabel, $colValue)
    {
        $row = 6;
        $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
        $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");

        $sheet->setCellValue("{$colLabel}".++$row, 'Total Terjual');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['totalTerjual']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Total Revenue');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['revenue']);
    }

    private function stylePengeluaran($sheet, $colLabel, $colValue)
    {
        $row = 6;
        
        $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
        $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");

        $sheet->setCellValue("{$colLabel}".++$row, 'Total');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['total']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Stok');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['stok']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Operasional');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['operasional']);
    }

    private function styleLabaRugi($sheet, $colLabel, $colValue)
    {
        $row = 6;

        $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
        $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");

        $sheet->setCellValue("{$colLabel}".++$row, 'Pendapatan');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['pendapatan']);

        $sheet->setCellValue("{$colLabel}".++$row, 'HPP');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['hpp']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Beban');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['bebanOps']);

        $sheet->setCellValue("{$colLabel}".++$row, 'Laba Bersih');
        $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['labaBersih']);
    }

    // 🚀 Advanced styling
    // public function registerEvents(): array
    // {
    //     return [
    //         AfterSheet::class => function (AfterSheet $event) {

    //         $sheet = $event->sheet->getDelegate();

    //         $dataCount = count($this->data['pettyCash']);
    //         $startRow = 6; // header posisi

    //         // 👉 posisi summary di kanan (kolom F)
    //         $colLabel = 'F';
    //         $colValue = 'G';

    //         $row = $startRow;

    //         $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
    //         $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");
    //         $sheet->getStyle("{$colLabel}{$row}")->applyFromArray([
    //             'font' => ['bold' => true],
    //             'fill' => [
    //                 'fillType' => 'solid',
    //                 'startColor' => ['argb' => 'FFEFEFEF'],
    //             ],
    //             'borders' => [
    //                 'allBorders' => ['borderStyle' => 'thin'],
    //             ],
    //         ]);

    //         $row++;

    //         $sheet->setCellValue("{$colLabel}{$row}", 'Total Modal');
    //         $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['income']);

    //         $row++;

    //         $sheet->setCellValue("{$colLabel}{$row}", 'Total Pengeluaran');
    //         $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['expense']);

    //         $row++;

    //         $sheet->setCellValue("{$colLabel}{$row}", 'Kas Bersih');
    //         $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['net']);

    //         // 💅 Styling
    //         $sheet->getStyle("{$colLabel}" . ($startRow+1) . ":{$colValue}{$row}")
    //             ->applyFromArray([
    //                 'borders' => [
    //                     'allBorders' => ['borderStyle' => 'thin'],
    //                 ],
    //             ]);

    //         $sheet->getStyle("{$colValue}" . ($startRow+1) . ":{$colValue}{$row}")
    //             ->getNumberFormat()
    //             ->setFormatCode('"Rp" #,##0');

    //         $sheet->getStyle('A6:D6')->applyFromArray([
    //             'font' => ['bold' => true],
    //             'fill' => [
    //                 'fillType' => 'solid',
    //                 'startColor' => ['argb' => 'FFEFEFEF'],
    //             ],
    //         ]);

    //         $sheet->getStyle('F6:G6')->applyFromArray([
    //             'font' => ['bold' => true],
    //             'borders' => [
    //                 'allBorders' => ['borderStyle' => 'thin'],
    //             ],
    //         ]);

    //         $lastRow = 6 + count($this->data['pettyCash']);

    //         $sheet->getStyle("A6:D{$lastRow}")
    //             ->applyFromArray([
    //                 'borders' => [
    //                     'allBorders' => ['borderStyle' => 'thin'],
    //                 ],
    //             ]);
    //     },
    //     ];
    // }
}