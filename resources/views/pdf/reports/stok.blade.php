@extends('pdf.reports.layouts.base')

@section('content')

<h3>Ringkasan Stok</h3>
<div class="summary-box">
    <div>Total SKU: {{ $data['summary']['totalSku'] }}</div>
    <div>Stok Rendah: {{ $data['summary']['lowStock'] }}</div>
    <div>Total Stok: {{ $data['summary']['totalStock'] }} Unit</div>
    <div>Nilai Stok: Rp {{ number_format($data['summary']['stockValue']) }}</div>
    <div>Nilai Bad Stock: Rp {{ number_format($data['summary']['badStockValue']) }}</div>
</div>

<h3>Detail Stok Barang</h3>
<table>
    <tr>
        <th>Barang</th>
        <th class="text-right">Stok</th>
        <th class="text-right">Masuk</th>
        <th class="text-right">Keluar</th>
        <th class="text-right">Sisa</th>
        <th>Status</th>
    </tr>

    @foreach($data['table'] as $item)
    <tr>
        <td>{{ $item['barang'] }}</td>
        <td class="text-right">{{ $item['stok'] }}</td>
        <td class="text-right">{{ $item['masuk'] }}</td>
        <td class="text-right">{{ $item['keluar'] }}</td>
        <td class="text-right">{{ $item['sisa'] }}</td>
        <td>
            <span class="badge {{ $item['status'] === 'Aman' ? 'badge-success' : 'badge-danger' }}">
                {{ $item['status'] }}
            </span>
        </td>
    </tr>
    @endforeach
</table>

@endsection