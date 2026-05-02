<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <style>
            body {
                font-family: DejaVu Sans;
                font-size: 12px;
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
            }

            /* INFO */
            .info-table {
                width: 100%;
                margin-bottom: 15px;
            }

            .info-table td {
                border: none;
            }

            /* TABLE ITEMS */
            .items {
                width: 100%;
                border-collapse: collapse;
            }

            .items th {
                border: 1px solid #ccc;
                background: #f3f3f3;
                padding: 6px;
                text-align: center;
            }

            .items td {
                border: 1px solid #ddd;
                padding: 6px;
            }

            /* SIGNATURE */
            .signature {
                width: 100%;
                margin-top: 60px;
            }

            .signature td {
                border: none;
                text-align: center;
            }

            .sign-line {
                margin-top: 40px;
                border-top: 1px solid #000;
                width: 150px;
                margin-left: auto;
                margin-right: auto;
            }
        </style>

    </head>
    <body>

        <!-- HEADER -->
        <table class="header-table">
            <tr>

                <td width="60">
                    <img src="{{ public_path('small_logo.jpg') }}" height="50">
                </td>

                <td>
                    <div class="company-name">{{ $websiteInfo->nama_usaha ?? 'Central Buah Sutomo' }}</div>
                    <div class="company-info">
                        {{ $websiteInfo->alamat ?? '-' }}<br>
                        Telp. {{ $websiteInfo->kontak ?? '-' }}
                    </div>
                </td>

            </tr>
        </table>

        <!-- TITLE -->
        <div class="title">
            SURAT JALAN
            {{ $deliveryOrder->type == 'in' ? 'MASUK' : 'KELUAR' }}
        </div>

        <!-- INFO -->
        <table class="info-table">
            <tr>

                <td width="50%">
                    <strong>No:</strong>
                    {{ $deliveryOrder->do_number }}<br>
                    <strong>Tanggal:</strong>
                    {{ $deliveryOrder->date }}
                </td>

                <td width="50%" align="right">
                    @if($deliveryOrder->type == 'in')
                    <strong>Supplier:</strong>
                    {{ $deliveryOrder->supplier->name ?? '-' }}<br>
                    <strong>Kontak:</strong>
                    {{ $deliveryOrder->supplier->phone ?? '-' }}
                    @else
                    <strong>Customer:</strong>
                    {{ $deliveryOrder->customer->name ?? '-' }}<br>
                    <strong>Kontak:</strong>
                    {{ $deliveryOrder->customer->phone ?? '-' }}
                    @endif
                </td>

            </tr>
        </table>

        <!-- ITEMS -->
        <table class="items">
            <thead>
                <tr>
                    <th width="40">No</th>
                    <th>Barang</th>
                    <th width="120">Keranjang</th>
                    <th width="80">Qty</th>
                    <th width="60">Bad</th>
                    <th width="80">Net</th>
                </tr>
            </thead>

            <tbody>

                @foreach($deliveryOrder->items as $i => $item)

                <tr>
                    <td align="center">{{ $i+1 }}</td>

                    <td>{{ $item->item->name ?? '-' }}</td>

                    <td>
                        <div>
                            {{ $item->cart->name ?? '-' }}
                            <br>
                            <small>
                                jumlah: {{ $item->cart_qty ?? 0 }}<br>
                                berat: {{ $item->cart_weight ?? 0 }} {{ $item->item->unit->unit_code ?? '' }}
                            </small>
                        </div>
                    </td>

                    <td align="center">
                        {{ $item->quantity }}
                        {{ $item->item->unit->unit_code ?? '' }}
                    </td>
                    
                    <td align="center">
                        {{ $item->bad_stock }}
                        {{ $item->item->unit->unit_code ?? '' }}
                    </td>

                    <td align="center">
                        {{ $item->quantity - $item->bad_stock }}
                        {{ $item->item->unit->unit_code ?? '' }}
                    </td>

                </tr>

                @endforeach

            </tbody>
        </table>

        @php
            $totalItemWeight = $deliveryOrder->items->sum('quantity');

            $totalCartWeight = $deliveryOrder->items->sum(function($item) {
                return ($item->cart_qty ?? 0) * ($item->cart_weight ?? 0);
            });

            $totalWeight = $totalItemWeight + $totalCartWeight;
            $cartUnit = $deliveryOrder->items->firstWhere('cart_id', '!=', null)?->item?->unit?->unit_code ?? '-';
            $totalWeightDisplay = $totalWeight . ' ' . $cartUnit;
        @endphp

        <table style="width:100%; margin-top:10px;">
            <tr>
                <td align="right">
                    <strong>Total Berat: {{ $totalWeightDisplay }}</strong>
                </td>
            </tr>
        </table>

        <!-- SIGNATURE -->
        <table class="signature">
            <tr>

                <td width="50%">
                    Pengirim
                    <br><br>

                    @if($deliveryOrder->sender_signature)
                    <img src="{{ $deliveryOrder->sender_signature_url }}" alt="{{ $deliveryOrder->sender_signature_url }}" height="60">
                    @endif

                    <div class="sign-line"></div>
                    {{ $deliveryOrder->sender_name }}
                </td>

                <td width="50%">
                    Penerima
                    <br><br>

                    @if($deliveryOrder->receiver_signature)
                    <img src="{{ $deliveryOrder->receiver_signature_url }}" alt="{{ $deliveryOrder->receiver_signature_url }}" height="60">
                    @endif

                    <div class="sign-line"></div>
                    {{ $deliveryOrder->receiver_name }}
                </td>

            </tr>
        </table>

    </body>
</html>