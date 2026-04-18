@extends('excel.reports.layouts.base',['company' => $company, 'filters' => $filters])

@section('content')

<table>
    <tr>
        <th>Barang</th>
        <th>Stok</th>
        <th>Masuk</th>
        <th>Keluar</th>
        <th>Sisa</th>
        <th>Status</th>
    </tr>

    @foreach($data['table'] as $item)
    <tr>
        <td>{{ $item['barang'] }}</td>
        <td>{{ $item['stok'] }}</td>
        <td>{{ $item['masuk'] }}</td>
        <td>{{ $item['keluar'] }}</td>
        <td>{{ $item['sisa'] }}</td>
        <td>{{ $item['status'] }}</td>
    </tr>
    @endforeach
</table>

@endsection