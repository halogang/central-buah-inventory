@extends('excel.reports.layouts.base')

@section('content')

<table>
    <tr>
        <th>Total Modal</th>
        <th>Total Pengeluaran</th>
        <th>Kas Bersih</th>
    </tr>
    <tr>
        <td>{{ $data['summary']['income'] }}</td>
        <td>{{ $data['summary']['expense'] }}</td>
        <td>{{ $data['summary']['net'] }}</td>
    </tr>
</table>

<br>

<table>
    <tr>
        <th>Tanggal</th>
        <th>Keterangan</th>
        <th>Jenis</th>
        <th>Jumlah</th>
    </tr>

    @foreach($data['pettyCash'] as $item)
    <tr>
        <td>{{ $item['tanggal'] }}</td>
        <td>{{ $item['keterangan'] }}</td>
        <td>{{ $item['jenis'] }}</td>
        <td>{{ $item['jumlah'] }}</td>
    </tr>
    @endforeach
</table>

@endsection