export type DishType = "Kahvaltı" | "Çorba" | "Ana yemek" | "Zeytinyağlı" | "Salata" | "Tatlı";

export interface Dish {
  id: string;
  name: string;
  type: DishType;
  description: string;
  /** Sitedeki ürün id'leri (src/data/foods/base.ts). Yalnızca yemeğin asıl mevsim malzemeleri. */
  foods: string[];
}

export const dishesTr: Dish[] = [
  { id: "menemen", name: "Menemen", type: "Kahvaltı", description: "Tereyağında biber, üstüne domates ve yumurta. Yaz kahvaltısının yıldızı.", foods: ["tomato", "pepper"] },
  { id: "coban-salatasi", name: "Çoban salatası", type: "Salata", description: "Küp domates, biber, soğan ve maydanoz; zeytinyağı ve limonla.", foods: ["tomato", "pepper"] },
  { id: "gavurdagi", name: "Gavurdağı salatası", type: "Salata", description: "İnce kıyılmış domates, biber ve ceviz; üstüne nar ekşisi ve nar taneleri.", foods: ["tomato", "pepper", "pomegranate"] },
  { id: "biber-dolmasi", name: "Zeytinyağlı biber dolması", type: "Zeytinyağlı", description: "Baharatlı pirinçle doldurulan biberler, domates kapakla pişer.", foods: ["pepper", "tomato"] },
  { id: "turlu", name: "Türlü", type: "Ana yemek", description: "Kabak, biber ve domatesin bir arada piştiği yaz tenceresi.", foods: ["zucchini", "pepper", "tomato"] },
  { id: "mucver", name: "Kabak mücver", type: "Ana yemek", description: "Rendelenmiş kabak, yumurta, dereotu ve beyaz peynirle tavada kızarır.", foods: ["zucchini"] },
  { id: "domates-corbasi", name: "Domates çorbası", type: "Çorba", description: "Olgun yaz domatesiyle, üstüne rendelenmiş kaşar.", foods: ["tomato"] },
  { id: "karpuz-peynir", name: "Karpuz ve beyaz peynir", type: "Salata", description: "Soğuk karpuz, tuzlu beyaz peynir ve taze nane. Yaz akşamlarının klasiği.", foods: ["watermelon"] },
  { id: "kiraz-kompostosu", name: "Kiraz kompostosu", type: "Tatlı", description: "Az şekerle kaynatılıp soğutulan, serinletici bir yaz tatlısı.", foods: ["cherry"] },
  { id: "cilek-receli", name: "Çilek reçeli", type: "Kahvaltı", description: "Mevsimin en tatlı çilekleriyle, kış kahvaltılarına saklamak için.", foods: ["strawberry"] },
  { id: "cilekli-muhallebi", name: "Çilekli muhallebi", type: "Tatlı", description: "Sütlü muhallebinin üstünde taze çilek dilimleri.", foods: ["strawberry"] },
  { id: "zeytinyagli-enginar", name: "Zeytinyağlı enginar", type: "Zeytinyağlı", description: "Bezelye, havuç ve dereotuyla limonlu zeytinyağında pişer.", foods: ["artichoke"] },
  { id: "narli-ispanak-salatasi", name: "Narlı ıspanak salatası", type: "Salata", description: "Taze ıspanak yaprakları, nar taneleri ve nar ekşili sos.", foods: ["spinach", "pomegranate"] },
  { id: "ispanak-yemegi", name: "Ispanak yemeği", type: "Ana yemek", description: "Soğan ve pirinçle pişen ıspanak, yanında sarımsaklı yoğurt.", foods: ["spinach"] },
  { id: "ispanakli-borek", name: "Ispanaklı börek", type: "Kahvaltı", description: "Yufka arasında ıspanak ve beyaz peynir; fırında kızarır.", foods: ["spinach"] },
  { id: "zeytinyagli-pirasa", name: "Zeytinyağlı pırasa", type: "Zeytinyağlı", description: "Havuç ve pirinçle pişen, limonla soğuk servis edilen kış yemeği.", foods: ["leek"] },
  { id: "pirasa-corbasi", name: "Pırasa çorbası", type: "Çorba", description: "Patatesle pişip ezilen, kadifemsi bir kış çorbası.", foods: ["leek"] },
  { id: "brokoli-corbasi", name: "Brokoli çorbası", type: "Çorba", description: "Brokoli, patates ve biraz sütle; blenderdan geçirilip sıcak servis edilir.", foods: ["broccoli"] },
  { id: "firinda-brokoli", name: "Fırında peynirli brokoli", type: "Ana yemek", description: "Haşlanmış brokoli, beşamel ve kaşarla fırında gratine.", foods: ["broccoli"] },
  { id: "firinda-elma", name: "Fırında tarçınlı elma", type: "Tatlı", description: "Çekirdeği oyulan elma ceviz, tarçın ve biraz balla fırınlanır.", foods: ["apple"] },
  { id: "elmali-kurabiye", name: "Elmalı kurabiye", type: "Tatlı", description: "Rendelenmiş elma, tarçın ve cevizli iç harçla, çayın yanına.", foods: ["apple"] },
  { id: "armut-tatlisi", name: "Armut tatlısı", type: "Tatlı", description: "Şerbette pişen armut, ceviz ve kaymakla servis edilir.", foods: ["pear"] },
  { id: "kis-hosafi", name: "Elma-armut hoşafı", type: "Tatlı", description: "Tarçın ve karanfille kaynatılan, kış sofralarının hoşafı.", foods: ["apple", "pear"] },
  { id: "portakalli-kek", name: "Portakallı kek", type: "Tatlı", description: "Taze sıkılmış portakal suyu ve rendelenmiş kabukla, mis kokulu.", foods: ["orange"] },
  { id: "mandalina-receli", name: "Mandalina reçeli", type: "Kahvaltı", description: "Kabuğuyla birlikte pişen, hafif buruk ve ferah bir kış reçeli.", foods: ["tangerine"] },
  { id: "kis-meyve-salatasi", name: "Kış meyve salatası", type: "Tatlı", description: "Dilimlenmiş portakal ve mandalina, nar taneleri ve taze nane.", foods: ["orange", "tangerine", "pomegranate"] },
];
