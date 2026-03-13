<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <style>
            body {
                font-family: DejaVu Sans;
                font-size: 12px;
            }

            .header {
                text-align: center;
                margin-bottom: 20px;
            }

            .header img {
                height: 60px;
                margin-bottom: 5px;
            }

            .company-name {
                font-size: 22px;
                font-weight: bold;
            }

            .company-address {
                color: #555;
            }

            .title {
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0;
            }

            .info-table {
                width: 100%;
                margin-bottom: 20px;
            }

            .info-table td {
                border: none;
                vertical-align: top;
            }

            .items {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 15px;
            }

            .items th {
                border: 1px solid #ccc;
                background: #f3f3f3;
                padding: 6px;
            }

            .items td {
                border: 1px solid #ddd;
                padding: 6px;
            }

            .total {
                width: 100%;
                margin-top: 10px;
            }

            .total td {
                border: none;
                padding: 4px;
            }

            .total .label {
                text-align: right;
            }

            .total .value {
                text-align: right;
                width: 150px;
            }

            .remaining {
                color: #1a8f3a;
                font-weight: bold;
            }

            .payment-history {
                margin-top: 30px;
            }

            .payment-history table {
                width: 100%;
                border-collapse: collapse;
            }

            .payment-history th {
                border: 1px solid #ccc;
                background: #f3f3f3;
                padding: 6px;
            }

            .payment-history td {
                border: 1px solid #ddd;
                padding: 6px;
            }
        </style>

    </head>
    <body>

        <div class="header">

            <img src="{{ public_path('logo.png') }}">

            <div class="company-name">
                {{ $websiteInfo->nama_usaha ?? 'Central Buah Sutomo' }}
            </div>

            <div class="company-address">
                {{ $websiteInfo->alamat ?? '' }}
            </div>

        </div>

        <div class="title">INVOICE</div>

        <table class="info-table">

            <tr>

                <td width="60%">

                    <strong>No:</strong>
                    {{ $invoice->invoice_number }}
                    <br>

                    @if($invoice->deliveryOrder)
                    <strong>Ref SJ:</strong>
                    {{ $invoice->deliveryOrder->do_number }}
                    <br>
                    @endif

                    <strong>Tanggal:</strong>
                    {{ $invoice->date }}

                </td>

                <td width="40%" align="right">

                    
                    @if($invoice->type == 'out')
                    <strong>Kepada:</strong>
                    <br>
                    {{ $invoice->customer->name ?? '-' }}
                    <br>
                    {{ $invoice->customer->phone ?? '-' }}
                    @else
                    <strong>Dari:</strong>
                    <br>
                    {{ $invoice->supplier->name ?? '-' }}
                    <br>
                    {{ $invoice->supplier->phone ?? '-' }}
                    @endif

                </td>

            </tr>

        </table>

        <table class="items">

            <thead>
                <tr>
                    <th width="40">No</th>
                    <th>Barang</th>
                    <th width="80">Qty</th>
                    <th width="120">Harga</th>
                    <th width="150">Subtotal</th>
                </tr>
            </thead>

            <tbody>

                @foreach($invoice->items as $i => $item)

                <tr>

                    <td align="center">{{ $i+1 }}</td>

                    <td>
                        {{ $item->item->name ?? '-' }}
                    </td>

                    <td align="center">
                        {{ $item->quantity }}
                        {{ $item->item->unit->unit_code ?? '' }}
                    </td>

                    <td align="right">
                        Rp
                        {{ number_format($item->price,0,',','.') }}
                    </td>

                    <td align="right">
                        Rp
                        {{ number_format($item->total,0,',','.') }}
                    </td>

                </tr>

                @endforeach

            </tbody>

        </table>

        <table class="total">

            <tr>
                <td class="label">
                    <strong>Total:</strong>
                </td>
                <td class="value">
                    <strong>Rp
                        {{ number_format($invoice->total,0,',','.') }}</strong>
                </td>
            </tr>

            <tr>
                <td class="label">Terbayar:</td>
                <td class="value">Rp
                    {{ number_format($invoice->paid,0,',','.') }}</td>
            </tr>

            <tr>
                <td class="label remaining">Sisa:</td>
                <td class="value remaining">Rp
                    {{ number_format($invoice->remaining,0,',','.') }}</td>
            </tr>

        </table>

        <div class="payment-history">

            <strong>Riwayat Pembayaran</strong>

            <table>

                <thead>
                    <tr>
                        <th width="150">Tanggal</th>
                        <th>Metode</th>
                        <th width="200">Jumlah</th>
                    </tr>
                </thead>

                <tbody>

                    @foreach($invoice->payments as $payment)

                    <tr>

                        <td>
                            {{ $payment->date }}
                        </td>

                        <td>
                            {{ $payment->paymentMethod->name }}
                        </td>

                        <td align="right">
                            Rp
                            {{ number_format($payment->amount,0,',','.') }}
                        </td>

                    </tr>

                    @endforeach

                </tbody>

            </table>

        </div>

    </body>
</html>