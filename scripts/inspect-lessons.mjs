import { allClientLessons } from '../apps/web/src/data/curriculum.client.ts';
for (const [k, v] of Object.entries(allClientLessons)) {
  if (k.startsWith('mc') || k.startsWith('medchem') || !isNaN(Number(k))) {
    console.log(k, '-> id:', v.id, 'order:', v.order, 'access:', v.access);
  }
}
