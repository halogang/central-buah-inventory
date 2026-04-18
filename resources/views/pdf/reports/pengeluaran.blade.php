@extends('pdf.reports.layouts.base')

@section('content')

<h3>Ringkasan Pengeluaran</h3>
<div class="summary-box">
    <div>Total Pengeluaran: Rp {{ number_format($data['summary']['total']) }}</div>
    <div>Pembelian Stok: Rp {{ number_format($data['summary']['stok']) }}</div>
    <div>Beban Operasional: Rp {{ number_format($data['summary']['operasional']) }}</div>
</div>

<h3>Breakdown Pengeluaran</h3>
<table>
    <tr>
        <th>Kategori</th>
        <th class="text-right">Jumlah</th>
        <th class="text-right">Persentase</th>
    </tr>

    @foreach($data['breakdown'] as $item)
    <tr>
        <td>{{ $item['category'] }}</td>
        <td class="text-right">Rp {{ number_format($item['amount']) }}</td>
        <td class="text-right">{{ $item['persen'] }}%</td>
    </tr>
    @endforeach
</table>

@endsection