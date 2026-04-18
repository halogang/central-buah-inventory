@extends('excel.reports.layouts.base', ['company' => $company, 'filters' => $filters])

@section('content')

<table>
    <tr>
        <th>{{ isset($data['table'][0]['tanggal']) ? 'Tanggal' : 'Periode' }}</th>
        <th>Pendapatan</th>
        <th>HPP</th>
        <th>Beban Ops</th>
        <th>Laba Bersih</th>
        <th>Margin</th>
    </tr>

    @foreach($data['table'] as $item)
    <tr>
        <td>{{ $item['tanggal'] ?? $item['bulan'] }}</td>
        <td>{{ $item['pendapatan'] }}</td>
        <td>{{ $item['hpp'] }}</td>
        <td>{{ $item['bebanOps'] }}</td>
        <td>{{ $item['labaBersih'] }}</td>
        <td>{{ $item['margin'] }}</td>
    </tr>
    @endforeach
</table>

@endsection