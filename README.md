# mevsimin.de

Mevsimlik meyve ve sebzeleri keşfetmek için Türkçe bir web uygulaması. Hangi ürünün hangi aylarda tüketilebileceğini, 100 gram başına besin değerlerini, seçim ve saklama ipuçlarını bir araya getirir.

## Özellikler

- Ana sayfada içinde bulunulan ayın ürünleri ve mevsimlere genel bakış.
- Ay, mevsim ve meyve/sebze kategorisine göre birlikte kullanılabilen filtreler.
- Ürün detaylarında tüketim takvimi, besin değerleri, faydalar, seçim ve saklama ipuçları, ilgili ürünler.
- Beslenme ve mevsim rehberleri içeren blog; yazılarda içindekiler ve ilgili yazılar.
- Mobil ve masaüstü ekranlara uyumlu arayüz.
- Sayfa meta verileri, Open Graph, yapılandırılmış veri, sitemap ve robots dosyası.
- `next-intl` ile dil bazlı yönlendirme; şu anda yalnızca Türkçe (`tr`) etkin.

## Teknolojiler

- Next.js **16.1.6** — App Router
- React **19.2.3** ve TypeScript
- Tailwind CSS **4** ve Typography eklentisi
- next-intl **4**
- Framer Motion ve Lucide React

İçerikler TypeScript dosyalarında tutulur. Mevcut uygulama için veritabanı, harici içerik servisi, API anahtarı veya `.env` dosyası gerekmez.

## Gereksinimler

- Git
- Node.js **22** (`.nvmrc` ile belirtilir)
- npm
- İlk bağımlılık kurulumu ve Google Fonts indirmesi için internet erişimi

Kurulumu doğrulayın:

```bash
node --version
npm --version
```

`nvm` kullanıyorsanız proje klasöründe `nvm install` ve `nvm use` komutlarıyla doğru Node sürümünü seçebilirsiniz.

### macOS: Homebrew ile Node.js 22

Homebrew kuruluysa:

```bash
brew install node@22
export PATH="$(brew --prefix node@22)/bin:$PATH"
```

Bu `export` yalnızca mevcut terminal oturumunu etkiler. Kalıcı kullanım için aynı satırı shell başlangıç dosyanıza (zsh için `~/.zshrc`) ekleyin.

## Yerel kurulum

```bash
mkdir -p "$HOME/Desktop/workspace"
git clone https://github.com/koksalmis/mevsiminde.git "$HOME/Desktop/workspace/mevsiminde"
cd "$HOME/Desktop/workspace/mevsiminde"
npm ci
npm run dev
```

Repo zaten klonlanmışsa `git clone` adımını atlayın. `npm ci`, `package-lock.json` içindeki sürümleri kullanarak bağımlılıkları kurar.

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın. Varsayılan dil yönlendirmesiyle Türkçe ana sayfa `/tr` altında görüntülenir. Sunucuyu durdurmak için terminalde `Ctrl+C` kullanın.

## Pazar yardımcısı

- Ana sayfa Türkiye saatine göre güncel ayın ürünlerini, mevsime yeni girenleri ve takvimde son ayındaki ürünleri gösterir.
- `/tr/mevsim?ay=10` bir ayı, `?mevsim=autumn` bir mevsimi açar. `kategori=fruit|vegetable` ve `q` arama parametreleri paylaşılabilir.
- Ay ve mevsim alternatif takvim seçimleridir; birini seçmek diğerini temizler.
- Kartlardaki ve detay sayfasındaki “Listeme ekle” düğmesi alışveriş listesini tarayıcının yerel depolamasında saklar. Üyelik ve sunucuya veri gönderimi gerekmez.
- `?liste=1` kayıtlı ürünleri gösterir. Liste cihazlar arasında eşitlenmez; “Listeyi kopyala” ile metin olarak taşınabilir.
- Hasat takvimi genel bir rehberdir; bölge ve hava koşulları farklılık yaratabilir.

## Komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır; değişiklikler otomatik yenilenir.
- `npm run lint`: ESLint ile kodu kontrol eder.
- `npm run build`: Üretim derlemesini oluşturur.
- `npm start`: Daha önce oluşturulmuş üretim derlemesini sunar.
- `npx tsc --noEmit`: Dosya üretmeden TypeScript kontrolü yapar. İlk Next.js çalıştırması veya derlemesi üretilen tip dosyalarını hazırlar.

Üretim modunu yerelde denemek için:

```bash
npm run build
npm start
```

Projede henüz ayrı bir otomatik test komutu tanımlı değildir.

## Sayfalar

- `/tr`: Ana sayfa.
- `/tr/mevsim`: Filtrelenebilir ürün listesi.
- `/tr/mevsim/cilek`: Örnek ürün detay sayfası; son bölüm ürünün `slug` alanıdır.
- `/tr/blog`: Blog listesi.
- `/tr/blog/mevsiminde-beslenmenin-5-faydasi`: Örnek blog yazısı.
- `/sitemap.xml` ve `/robots.txt`: Arama motorları için üretilen dosyalar.

## Proje yapısı

```text
messages/
  tr.json                  # Arayüz çevirileri
public/                    # Statik dosyalar
src/
  app/
    [locale]/
      page.tsx             # Ana sayfa
      mevsim/              # Ürün listesi ve [slug] detayları
      blog/                # Blog listesi ve [slug] yazıları
    globals.css            # Genel stiller ve tasarım değişkenleri
    sitemap.ts
    robots.ts
  components/
    home/                  # Ana sayfa bölümleri
    mevsim/                # Ürün filtreleri ve liste
    detail/                # Ürün detay bileşenleri
    blog/                  # Blog bileşenleri
    layout/                # Navigasyon ve footer
    ui/                    # Ortak arayüz bileşenleri
  data/
    foods/base.ts          # Dilden bağımsız ürün verileri
    foods/tr.ts            # Türkçe ürün adları ve açıklamaları
    blog-posts/tr.ts       # Türkçe blog yazıları
  i18n/                    # Dil ayarları ve yönlendirme yardımcıları
  lib/                     # İçerik sorgulama, sabitler ve yardımcılar
  types/index.ts           # İçerik ve dil tipleri
  middleware.ts            # Dil yönlendirmesi
```

## İçerik ekleme

### Yeni ürün

1. `src/data/foods/base.ts` dosyasına benzersiz bir `id`, kategori, mevsimler, aylar, görsel yolu ve besin değerleri ekleyin. Aylar `1–12` arası sayılarla tutulur.
2. Aynı `id` anahtarını kullanarak `src/data/foods/tr.ts` dosyasına Türkçe içerik ekleyin: `slug`, ad, açıklama, faydalar, seçim ve saklama ipuçları.
3. `slug` değerini benzersiz tutun; detay sayfasının adresi bu değerden oluşur.

Ürünler bu iki veri kaynağının `id` üzerinden birleştirilmesiyle görüntülenir. Türkçe karşılığı olmayan temel kayıtlar listelenmez.

### Yeni blog yazısı

`src/data/blog-posts/tr.ts` dizisine `BlogPost` tipine uygun bir kayıt ekleyin. Benzersiz bir `slug`, `locale`, başlık, özet, kategori, kapak görseli yolu, yazar, `YYYY-MM-DD` biçiminde yayın tarihi, dakika cinsinden okuma süresi ve `content` alanı sağlayın.

İçerik mevcut sayfada basit bir Markdown dönüştürücüsüyle işlenir; tam bir MDX altyapısı kullanılmaz. Başlıklar, kalın metin ve madde listeleri desteklenir. Yeni bir kategori eklerseniz `messages/tr.json` içindeki kategori çevirilerini de güncelleyin.

### Yeni dil

1. `src/i18n/routing.ts` içindeki `locales` listesini ve `src/types/index.ts` içindeki `Locale` tipini genişletin.
2. `messages/{locale}.json`, `src/data/foods/{locale}.ts` ve `src/data/blog-posts/{locale}.ts` dosyalarını oluşturun.
3. `src/lib/foods.ts` ve `src/lib/blog.ts` içindeki dil eşlemelerine yeni verileri bağlayın.
4. Sayfalarda sabit `tr` kullanan içerik sorgularını, statik parametreleri, tarih biçimlendirmesini ve dil tipi dönüşümlerini yeni dile uygun hale getirin.
5. Sitemap, meta veriler ve doğrudan Türkçe yazılmış arayüz metinlerini kontrol edin.

Mevcut sürümde içerik sorgularının bir kısmı doğrudan Türkçe veriyi kullanır; ek bir dili etkinleştirmeden önce bu bağlantıları tamamlayın.

## Geliştirme notları

- Ürün ve blog görselleri veri alanlarında tanımlı olsa da ilgili `public/images/` dosyaları henüz repoda yoktur. Mevcut kartlar ve kahraman alanları emoji yer tutucuları kullanır.
- Inter ve Playfair Display, `next/font/google` ile yüklenir. İlk çalıştırmada veya derlemede font indirme hatası alırsanız internet bağlantısını kontrol edin.
- Sitemap ve robots dosyalarında site adresi `https://mevsimin.de` olarak sabittir. Başka bir alan adına yayınlarken `src/app/sitemap.ts` ve `src/app/robots.ts` dosyalarını güncelleyin.
- Bağımlılık değişikliklerinde `package.json` ile `package-lock.json` dosyalarını birlikte güncelleyin.

## Sorun giderme

- **`node` veya `npm` bulunamıyor:** Node.js 22 kurulumunu ve terminalin `PATH` ayarını kontrol edin.
- **3000 portu dolu:** `npm run dev -- --port 3001` ile başka bir port seçin.
- **`npm ci` hata veriyor:** Komutu `package-lock.json` bulunan proje klasöründe çalıştırdığınızdan emin olun. Node sürümünü, npm kayıt sunucusuna erişimi ve kilit dosyasının `package.json` ile eşleştiğini kontrol edin.
- **`npm start` derleme bulamıyor:** Önce `npm run build` çalıştırın.
