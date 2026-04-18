@extends('pdf.reports.layouts.base')

@section('content')

<h3>Ringkasan</h3>
<div class="summary-box">
    <div>Total Modal: Rp {{ number_format($data['summary']['income']) }}</div>
    <div>Total Pengeluaran: Rp {{ number_format($data['summary']['expense']) }}</div>
    <div><strong>Kas Bersih: Rp {{ number_format($data['summary']['net']) }}</strong></div>
</div>

<h3>Detail Petty Cash</h3>
<table>
    <tr>
        <th width="90">Tanggal</th>
        <th>Keterangan</th>
        <th width="80">Jenis</th>
        <th width="120" class="text-right">Jumlah</th>
    </tr>
    @foreach($data['pettyCash'] as $item)
        <tr>
            <td>{{ $item['tanggal'] }}</td>
            <td>{{ $item['keterangan'] }}</td>
            <td>
                <span class="badge {{ $item['jenis'] === 'Modal' ? 'badge-success' : 'badge-danger' }}">
                    {{ $item['jenis'] }}
                </span>
            </td>
            <td class="text-right">Rp {{ number_format($item['jumlah']) }}</td>
        </tr>
    @endforeach
</table>

<h3>Arus Kas Harian</h3>
<table>
    <tr>
        <th width="90">Tanggal</th>
        <th class="text-right">Modal</th>
        <th class="text-right">Pengeluaran</th>
        <th class="text-right">Saldo</th>
    </tr>
    @foreach($data['dailyCash'] as $item)
        <tr>
            <td>{{ $item['tanggal'] }}</td>
            <td class="text-right">Rp {{ number_format($item['modal'] ?? 0) }}</td>
            <td class="text-right">Rp {{ number_format($item['pengeluaran'] ?? 0) }}</td>
            <td class="text-right"><strong>Rp {{ number_format($item['saldo']) }}</strong></td>
        </tr>
    @endforeach
</table>

@endsection