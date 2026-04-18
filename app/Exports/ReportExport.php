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
        return [
            'A' => 20,
            'B' => 30,
            'C' => 20,
            'D' => 20,
            'E' => 5,   // spacer
            'F' => 25,  // label summary
            'G' => 25,  // value (IMPORTANT 🔥)
        ];
    }

    // 🎨 Styling basic
    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 14]], // company
            4 => ['font' => ['bold' => true]], // header table
        ];
    }

    // 🚀 Advanced styling
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

            $sheet = $event->sheet->getDelegate();

            $dataCount = count($this->data['pettyCash']);
            $startRow = 6; // header posisi

            // 👉 posisi summary di kanan (kolom F)
            $colLabel = 'F';
            $colValue = 'G';

            $row = $startRow;

            $sheet->setCellValue("{$colLabel}{$row}", 'Summary');
            $sheet->mergeCells("{$colLabel}{$row}:{$colValue}{$row}");
            $sheet->getStyle("{$colLabel}{$row}")->applyFromArray([
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => 'solid',
                    'startColor' => ['argb' => 'FFEFEFEF'],
                ],
                'borders' => [
                    'allBorders' => ['borderStyle' => 'thin'],
                ],
            ]);

            $row++;

            $sheet->setCellValue("{$colLabel}{$row}", 'Total Modal');
            $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['income']);

            $row++;

            $sheet->setCellValue("{$colLabel}{$row}", 'Total Pengeluaran');
            $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['expense']);

            $row++;

            $sheet->setCellValue("{$colLabel}{$row}", 'Kas Bersih');
            $sheet->setCellValue("{$colValue}{$row}", $this->data['summary']['net']);

            // 💅 Styling
            $sheet->getStyle("{$colLabel}" . ($startRow+1) . ":{$colValue}{$row}")
                ->applyFromArray([
                    'borders' => [
                        'allBorders' => ['borderStyle' => 'thin'],
                    ],
                ]);

            $sheet->getStyle("{$colValue}" . ($startRow+1) . ":{$colValue}{$row}")
                ->getNumberFormat()
                ->setFormatCode('"Rp" #,##0');

            $sheet->getStyle('A6:D6')->applyFromArray([
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => 'solid',
                    'startColor' => ['argb' => 'FFEFEFEF'],
                ],
            ]);

            $sheet->getStyle('F6:G6')->applyFromArray([
                'font' => ['bold' => true],
                'borders' => [
                    'allBorders' => ['borderStyle' => 'thin'],
                ],
            ]);

            $lastRow = 6 + count($this->data['pettyCash']);

            $sheet->getStyle("A6:D{$lastRow}")
                ->applyFromArray([
                    'borders' => [
                        'allBorders' => ['borderStyle' => 'thin'],
                    ],
                ]);
        },
        ];
    }
}