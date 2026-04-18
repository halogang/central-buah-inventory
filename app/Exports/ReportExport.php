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
            'E' => 20,
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

                // Header bold + center
                $sheet->getStyle('A1:E1')->applyFromArray([
                    'font' => ['bold' => true],
                ]);

                // Table header
                $sheet->getStyle('A6:E6')->applyFromArray([
                    'font' => ['bold' => true],
                    'fill' => [
                        'fillType' => 'solid',
                        'startColor' => ['argb' => 'FFEFEFEF'],
                    ],
                ]);

                // Border all
                $sheet->getStyle('A6:E100')->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => 'thin',
                        ],
                    ],
                ]);

                $sheet->getStyle('D7:D100')
                    ->getNumberFormat()
                    ->setFormatCode('"Rp" #,##0');

                // Align right for numbers
                $sheet->getStyle('D:E')->getAlignment()->setHorizontal('right');
            },
        ];
    }
}