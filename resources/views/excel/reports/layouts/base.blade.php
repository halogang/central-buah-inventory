<table>
    <tr>
        <td colspan="6"><strong>{{ $company->name ?? 'Central Buah Sutomo' }}</strong></td>
    </tr>
    <tr>
        <td colspan="6">{{ $company->address ?? '-' }}</td>
    </tr>
    <tr>
        <td colspan="6">Periode: {{ $filters['period'] }}</td>
    </tr>
</table>

<br>

@yield('content')