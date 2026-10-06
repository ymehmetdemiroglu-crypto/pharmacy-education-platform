---
id: "pharm-node-02"
course: "pharmacology"
title: "Kütle Hareketi Kanunu, Kd Ayrışma Sabiti ve Afinite Dengesi"
slides: [9, 10, 11, 12, 13]
keywords: ["Kd", "afinite", "kütle hareketi", "bağlanma sabiti", "fraksiyonel doluluk", "Langmuir"]
summary: "İlaç-reseptör bağlanma kinetiği, Kd ayrışma sabiti ve reseptör doluluğunun matematiksel ifadesi."
---

# Kütle Hareketi Kanunu ve Bağlanma Dengesi

İlaç ($D$) ile serbest reseptör ($R$) arasındaki reversibl reaksiyon kütle hareketi kanununa uyar (Slayt 9-11):

$$[D] + [R] \underset{k_{off}}{\overset{k_{on}}{\rightleftharpoons}} [DR]$$

Burada $k_{on}$ birleşme hız sabiti, $k_{off}$ ayrışma hız sabitidir.

Denge anında ($k_{on}[D][R] = k_{off}[DR]$) **Denge Ayrışma Sabiti ($K_d$)** tanımlanır:

$$K_d = \frac{k_{off}}{k_{on}} = \frac{[D][R]}{[DR]}$$

---

## Afinite ve Kd İlişkisi

* **Afinite**: İlacın reseptöre bağlanma eğilimidir ve $K_d$'nin tersi ile orantılıdır: $\text{Afinite} \propto \frac{1}{K_d}$.
* **Küçük $K_d$**: Çok düşük ilaç konsantrasyonunda bile bağlanma gerçekleşir $\to$ **YÜKSEK AFİNİTE**.
* **Büyük $K_d$**: Bağlanma için yüksek ilaç konsantrasyonu gerekir $\to$ **DÜŞÜK AFİNİTE**.

---

## Hill-Langmuir Reseptör Doluluk Denklemi

Toplam reseptör havuzunun fraksiyonel doluluğu ($\theta$ veya $f_{occ}$):

$$f_{occ} = \frac{[DR]}{[R_{toplam}]} = \frac{[D]}{[D] + K_d}$$

> **Kritik Sınav Kuralı:** İlaç konsantrasyonu $[D] = K_d$ olduğunda:  
> $f_{occ} = \frac{K_d}{K_d + K_d} = \frac{1}{2} = \%50$.  
> **$K_d$, toplam reseptörlerin tam olarak %50'sini doyuran serbest ilaç konsantrasyonudur (Slayt 12).**
