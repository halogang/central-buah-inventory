@extends('excel.reports.layouts.base',['company' => $company, 'filters' => $filters])

@section('content')

<table>
    <tr>
        <th>Kategori</th>
        <th>Jumlah</th>
        <th>Persentase</th>
    </tr>

    @foreach($data['breakdown'] as $item)
    <tr>
        <td>{{ $item['category'] }}</td>
        <td>{{ $item['amount'] }}</td>
        <td>{{ $item['persen'] }}</td>
    </tr>
    @endforeach
</table>

@endsection