@extends('excel.reports.layouts.base',['company' => $company, 'filters' => $filters])

@section('content')

<table>
    <tr>
        <th>Produk</th>
        <th>Terjual</th>
        <th>Avg Beli</th>
        <th>Avg Jual</th>
        <th>Revenue</th>
        <th>Laba</th>
        <th>Margin</th>
    </tr>

    @foreach($data['table'] as $item)
    <tr>
        <td>{{ $item['produk'] }}</td>
        <td>{{ $item['terjual'] }}</td>
        <td>{{ $item['avg_beli'] }}</td>
        <td>{{ $item['avg_jual'] }}</td>
        <td>{{ $item['revenue'] }}</td>
        <td>{{ $item['laba'] }}</td>
        <td>{{ $item['persen'] }}</td>
    </tr>
    @endforeach
</table>

@endsection