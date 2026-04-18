@extends('pdf.reports.layouts.base')

@section('content')

<h3>Ringkasan Laba Rugi</h3>
<div class="summary-box">
    <div>Pendapatan: Rp {{ number_format($data['summary']['pendapatan']) }}</div>
    <div>HPP: Rp {{ number_format($data['summary']['hpp']) }}</div>
    <div>Beban Operasional: Rp {{ number_format($data['summary']['bebanOps']) }}</div>
    <div><strong>Laba Bersih: Rp {{ number_format($data['summary']['labaBersih']) }}</strong></div>
    <div>Margin: {{ $data['summary']['margin'] }}%</div>
</div>

<h3>Detail Laba Rugi</h3>
<table>
    <tr>
        <th>{{ isset($data['table'][0]['tanggal']) ? 'Tanggal' : 'Periode' }}</th>
        <th class="text-right">Pendapatan</th>
        <th class="text-right">HPP</th>
        <th class="text-right">Beban Ops</th>
        <th class="text-right">Laba Bersih</th>
        <th class="text-right">Margin</th>
    </tr>

    @foreach($data['table'] as $item)
    <tr>
        <td>{{ $item['tanggal'] ?? $item['bulan'] }}</td>
        <td class="text-right">Rp {{ number_format($item['pendapatan']) }}</td>
        <td class="text-right">Rp {{ number_format($item['hpp']) }}</td>
        <td class="text-right">Rp {{ number_format($item['bebanOps']) }}</td>
        <td class="text-right"><strong>Rp {{ number_format($item['labaBersih']) }}</strong></td>
        <td class="text-right">{{ $item['margin'] }}%</td>
    </tr>
    @endforeach
</table>

@endsection