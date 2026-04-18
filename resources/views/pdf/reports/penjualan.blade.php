@extends('pdf.reports.layouts.base')

@section('content')

<h3>Ringkasan Penjualan</h3>
<div class="summary-box">
    <div>Total Terjual: {{ $data['summary']['totalTerjual'] }}</div>
    <div>Revenue: Rp {{ number_format($data['summary']['revenue']) }}</div>
    <div>Bad Stock: {{ $data['summary']['badStock'] }}</div>
    <div>Rata-rata Order: Rp {{ number_format($data['summary']['avgOrder']) }}</div>
</div>

<h3>Detail Penjualan per Produk</h3>
<table>
    <tr>
        <th>Produk</th>
        <th class="text-right">Terjual</th>
        <th class="text-right">Avg Beli</th>
        <th class="text-right">Avg Jual</th>
        <th class="text-right">Revenue</th>
        <th class="text-right">Laba</th>
        <th class="text-right">Margin</th>
    </tr>

    @foreach($data['table'] as $item)
    <tr>
        <td>{{ $item['produk'] }}</td>
        <td class="text-right">{{ $item['terjual'] }}</td>
        <td class="text-right">Rp {{ number_format($item['avg_beli']) }}</td>
        <td class="text-right">Rp {{ number_format($item['avg_jual']) }}</td>
        <td class="text-right">Rp {{ number_format($item['revenue']) }}</td>
        <td class="text-right">Rp {{ number_format($item['laba']) }}</td>
        <td class="text-right">{{ $item['persen'] }}%</td>
    </tr>
    @endforeach
</table>

@endsection