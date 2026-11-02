import charmsData from '../data/charms.json';
import productsData from '../data/products.json';
import { formatRupiah } from '../lib/format-rupiah';
import { GIFT_BOX_PRICE, type Build, type CartState, type Charm } from '../types';

export const STORE_PHONE_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') || '6281234567890';

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

function generateOrderCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'LNK-';
  for (let i = 0; i < 4; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function itemizeBuildSlots(build: Build): { attached: number; lines: string[] } {
  const charms = charmsData as Charm[];
  const lines: string[] = [];
  let attached = 0;

  build.slots.forEach((charmId, idx) => {
    if (!charmId) return;
    attached += 1;
    const charm = charms.find((c) => c.id === charmId);
    const slotNum = String(idx + 1).padStart(2, '0');
    const name = charm?.name ?? 'Charm';
    const price = charm ? formatRupiah(charm.addPrice) : '';
    lines.push(` Slot ${slotNum}: [${charmId}] ${name}${price ? ` - ${price}` : ''}`);
  });

  return { attached, lines };
}

export function buildWhatsAppCartPayload(
  cart: CartState,
  customer: CustomerOrderInfo,
  totalPrice: number
): { text: string; url: string; orderCode: string } {
  const orderCode = generateOrderCode();
  const lines: string[] = [
    '*LINKED! — ORDER PAYLOAD (18-SLOT SYSTEM)*',
    `Order Ref: ${orderCode}`,
    '-------------------------------------------',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Alamat: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : '',
    '',
  ];

  cart.items.forEach((item, index) => {
    if (item.kind === 'product') {
      const product = productsData.find((p) => p.id === item.productId);
      const prodName = product ? product.name : 'Produk LINKED!';
      const prodPrice = product ? product.price * item.qty : 0;
      lines.push(`${index + 1}. ${prodName}`);
      lines.push(`   Jumlah ${item.qty}, ${formatRupiah(prodPrice)}`);
      lines.push('');
      return;
    }

    const { attached, lines: slotLines } = itemizeBuildSlots(item.build);
    lines.push(`${index + 1}. Gelang Custom, ukuran ${item.build.size} (${item.build.slots.length} slot)`);
    lines.push(`Base Bracelet: ${item.build.slots.length}x 316L Plain Links`);
    lines.push(`Custom Charms Attached: ${attached}/${item.build.slots.length}`);
    if (slotLines.length > 0) {
      lines.push('*CHARM BREAKDOWN:*');
      lines.push(...slotLines);
    }
    lines.push(`   Jumlah ${item.qty}, ${formatRupiah(item.unitPrice * item.qty)}`);
    lines.push('');
  });

  lines.push(
    `Kemasan: ${cart.packaging === 'gift' ? `Signature Gift Box Set (+${formatRupiah(GIFT_BOX_PRICE)})` : 'Standard Canvas Pouch (Gratis)'}`
  );
  if (cart.packaging === 'gift' && cart.giftNote) {
    lines.push(`Pesan Kartu Ucapan: "${cart.giftNote}"`);
  }
  lines.push(`*TOTAL ESTIMATE:* ${formatRupiah(totalPrice)}`);
  lines.push('-------------------------------------------');
  lines.push('Mohon konfirmasi ketersediaan stok untuk pesanan ini. Terima kasih!');

  const text = lines.filter((line, idx) => line !== '' || lines[idx - 1] !== '').join('\n');
  const url = `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  return { text, url, orderCode };
}
