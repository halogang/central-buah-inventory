<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 12px;
            color: #111;
        }

        /* HEADER */
        .header-table {
            width: 100%;
            border-bottom: 2px solid #333;
            margin-bottom: 5px;
        }

        .header-table td {
            border: none;
        }

        .company-name {
            font-size: 18px;
            font-weight: bold;
        }

        .company-info {
            font-size: 12px;
            color: #444;
        }

        /* TITLE */
        .title {
            text-align: center;
            font-weight: bold;
            margin: 10px 0;
            border-top: 2px solid #333;
            border-bottom: 2px solid #333;
            padding: 6px 0;
            font-size: 14px;
        }

        /* INFO */
        .info {
            margin-bottom: 10px;
            font-size: 12px;
        }

        /* TABLE */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 6px;
        }

        th {
            background: #f3f3f3;
        }

        .text-right {
            text-align: right;
        }

        /* BADGE */
        .badge {
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
        }

        .badge-success {
            background: #e6f9f0;
            color: #059669;
        }

        .badge-danger {
            background: #fee2e2;
            color: #dc2626;
        }

        /* SUMMARY BOX */
        .summary-box {
            border: 1px solid #ddd;
            padding: 8px;
            margin-bottom: 10px;
        }

    </style>
</head>
<body>

<!-- HEADER -->
<table class="header-table">
    <tr>
        <td width="60">
            <img src="{{ public_path('logo.webp') }}" height="50">
        </td>

        <td>
            <div class="company-name">
                {{ $company['name'] ?? 'Central Buah Sutomo' }}
            </div>
            <div class="company-info">
                {{ $company['address'] ?? '-' }} <br>
                Telp: {{ $company['phone'] ?? '-' }}
            </div>
        </td>
    </tr>
</table>

<!-- TITLE -->
<div class="title">
    {{ strtoupper($title ?? 'LAPORAN') }}
</div>

<!-- INFO -->
<div class="info">
    Periode: {{ $filters['period'] ?? '-' }}
</div>

@yield('content')

</body>
</html>