export type BrandSlug =
  | 'break'
  | 'americana'
  | 'so-fresh'
  | 'chicka'
  | '22-avenue';

export type GalleryItem = {
  src: string;
  /** Aspect for layout. "wide" spans 2 cols, "tall" is 1 col tall, "square" default */
  layout?: 'wide' | 'tall' | 'square';
};

export type Brand = {
  slug: BrandSlug;
  client: string;
  clientAr: string;
  tagEn: string;
  tagAr: string;
  hero: string;

  /** Disciplines applied to this project. Renders as chips. */
  scopeEn: string[];
  scopeAr: string[];

  /** Two short paragraphs forming the case study body */
  overviewEn: string[];
  overviewAr: string[];

  /** Pull quote that appears between sections, big condensed type */
  taglineEn: string;
  taglineAr: string;

  /** Gallery, displayed after the overview */
  gallery: GalleryItem[];
};

export const BRANDS: Brand[] = [
  {
    slug: '22-avenue',
    client: '22 Avenue',
    clientAr: '22 أفينيو',
    tagEn: 'Promenade · Identity & signage',
    tagAr: 'ممشى · هويّة تجاريّة ولافتات',
    hero: '/work/22-avenue/hero.png',
    scopeEn: ['Brand strategy', 'Identity design', 'Signage system', 'Engineering & install'],
    scopeAr: ['استراتيجيّة العلامة', 'تصميم الهويّة', 'نظام اللافتات', 'هندسة وتركيب'],
    overviewEn: [
      'At Everybear, branding is more than just visuals. It is a full-circle journey that starts with strategy and ends with impact. For 22 Avenue, our team crafted a powerful identity rooted in research, storytelling, and spatial relevance.',
      'From the unique striped "22" logo to the full signage system, every detail was developed to position 22 Avenue as a vibrant promenade for both families and professionals. Beyond design, we engineered and installed the massive 26th of July Corridor sign ourselves, ensuring the brand stands tall, literally and figuratively.',
    ],
    overviewAr: [
      'الهويّة عند إيفري بير ليست مجرّد بصريّات. إنّها رحلة كاملة تبدأ بالاستراتيجيّة وتنتهي بالأثر. لـ 22 أفينيو، صمّم فريقنا هويّةً قويّة متجذّرة في البحث والسرد والملاءمة المكانيّة.',
      'من شعار "22" المُخطّط الفريد إلى نظام اللافتات الكامل، طُوّر كلّ تفصيل ليُموضع 22 أفينيو ممشًى نابضًا للعائلات والمهنيّين. وبعيدًا عن التصميم، هندسنا وركّبنا اللافتة الضخمة على محور 26 يوليو بأيدينا، لتبقى العلامة شامخةً، حرفيًّا ومجازيًّا.',
    ],
    taglineEn: 'Designed with purpose. Built to be seen.',
    taglineAr: 'صُمِّمت بهدف. وبُنيت لتُرى.',
    gallery: [
      { src: '/work/22-avenue/logo-colour.png', layout: 'square' },
      { src: '/work/22-avenue/logo-sketch.png', layout: 'square' },
      { src: '/work/22-avenue/campaign-the-place-you-wanna-go.png', layout: 'wide' },
      { src: '/work/22-avenue/acrylic-trophy.png', layout: 'tall' },
      { src: '/work/22-avenue/banner-designed-with-purpose.png', layout: 'square' },
      { src: '/work/22-avenue/signage-storefront.png', layout: 'wide' },
    ],
  },

  {
    slug: 'break',
    client: 'Break',
    clientAr: 'بريك',
    tagEn: 'Snack brand · Packaging & campaign',
    tagAr: 'منتج وجبات · تغليف وحملة إعلانيّة',
    hero: '/work/break/hero.png',
    scopeEn: ['Packaging system', 'Print production', 'Outdoor campaign', 'Art direction'],
    scopeAr: ['نظام تغليف', 'إنتاج طباعي', 'حملة خارجيّة', 'إخراج فنّي'],
    overviewEn: [
      'At Everybear, packaging is not just a wrapper. It is the first handshake between a product and the world. From bold chips like Break to refined product lines, we design packaging that speaks before the product is even tasted.',
      'For the Break Sunchips line, we started with hand-drawn concepts that captured the flavour and energy of the brand, then transformed them into bold, vibrant designs with custom graphics and clear flavour cues. Every detail, from layout to print, was handled in-house, ensuring quality, consistency, and impact in every pack.',
    ],
    overviewAr: [
      'التغليف عند إيفري بير ليس مجرّد غلاف. إنّه أوّل مصافحة بين المنتج والعالم. من الرقائق الجريئة كـ"بريك" إلى خطوط المنتجات الراقية، نصمّم تغليفًا يتحدّث قبل أن يُتذوَّق المنتج.',
      'لخطّ بريك صن‌تشيبس، بدأنا برسومات يدويّة تلتقط نكهة العلامة وطاقتها، ثم حوّلناها إلى تصاميم نابضة بإشارات نكهة واضحة. كلّ تفصيل، من التخطيط إلى الطباعة، أُنجز داخل الاستوديو، ضمانًا للجودة والاتساق والأثر في كلّ علبة.',
    ],
    taglineEn: 'Break expectations. Make shelves stop.',
    taglineAr: 'كسّر التوقّعات. أوقف الرفوف.',
    gallery: [
      { src: '/work/break/pack-original-cool-fresh.png', layout: 'wide' },
      { src: '/work/break/pack-original-hot-zesty.png', layout: 'wide' },
      { src: '/work/break/pack-sunchips-squeezy.png', layout: 'wide' },
      { src: '/work/break/billboard-original.png', layout: 'wide' },
      { src: '/work/break/billboard-senyorita-insite.png', layout: 'square' },
      { src: '/work/break/campaign-kid-purple.png', layout: 'tall' },
    ],
  },

  {
    slug: 'americana',
    client: 'Americana',
    clientAr: 'أمريكانا',
    tagEn: 'Frozen & canned · Packaging system',
    tagAr: 'منتجات معلّبة ومجمّدة · نظام التغليف',
    hero: '/work/americana/hero.png',
    scopeEn: ['Packaging system', 'Classification design', 'Saudi line', 'Event production'],
    scopeAr: ['نظام تغليف', 'تصنيف بصري', 'الخطّ السعودي', 'إنتاج فعاليّات'],
    overviewEn: [
      'A creative partnership with Americana Dubai, delivering a packaging system that blends versatility with visual clarity. From sketched concepts to full product ranges, the designs reflect Americana\'s trusted quality while appealing to modern consumers.',
      'We later developed a Saudi line that blends authentic local flavours with modern design sensibilities, and orchestrated the Americana "Ten Years" celebration. Full-scale event production that merged cultural flair with immersive brand storytelling.',
    ],
    overviewAr: [
      'شراكة إبداعيّة مع أمريكانا دبي، نتجت عنها منظومة تغليف تجمع بين المرونة والوضوح البصري. من الرسومات الأوليّة إلى مجموعات المنتجات الكاملة، تعكس التصاميم جودة أمريكانا الموثوقة وتُخاطب المستهلك العصري.',
      'طوّرنا لاحقًا خطًّا سعوديًّا يمزج النكهات المحليّة الأصيلة بحسٍّ تصميمي حديث، وأدرنا احتفاليّة "عشرة سنين". إنتاج فعاليّات متكامل دمج اللمسة الثقافيّة بسردٍ بصريٍّ غامر للعلامة.',
    ],
    taglineEn: 'Taking the Americana smile to a whole new level.',
    taglineAr: 'نأخذ ابتسامة أمريكانا إلى مستوى جديد كليًّا.',
    gallery: [
      { src: '/work/americana/lineup-4pack-frozen.png', layout: 'wide' },
      { src: '/work/americana/packaging-styles-nuggets-burger.png', layout: 'square' },
      { src: '/work/americana/can-sweet-corn.png', layout: 'tall' },
      { src: '/work/americana/can-tuna.png', layout: 'square' },
      { src: '/work/americana/beef-burger-sketch.png', layout: 'tall' },
      { src: '/work/americana/french-fries-sketch.png', layout: 'square' },
      { src: '/work/americana/classification-system.png', layout: 'wide' },
      { src: '/work/americana/lineup-4pack-green.png', layout: 'wide' },
      { src: '/work/americana/branded-entrance.png', layout: 'square' },
      { src: '/work/americana/branded-truck.png', layout: 'wide' },
      { src: '/work/americana/group-photo-stage.png', layout: 'wide' },
      { src: '/work/americana/saxophone-performer.png', layout: 'tall' },
    ],
  },

  {
    slug: 'so-fresh',
    client: 'So Fresh',
    clientAr: 'سو فريش',
    tagEn: 'Fresh produce · Packaging & retail',
    tagAr: 'منتجات طازجة · تغليف وتسويق',
    hero: '/work/so-fresh/hero.png',
    scopeEn: ['Brand identity', 'Packaging system', 'Print supervision', 'Material selection'],
    scopeAr: ['هويّة العلامة', 'نظام تغليف', 'إشراف طباعي', 'اختيار المواد'],
    overviewEn: [
      'For Americana\'s fresh produce line, So Fresh, we crafted a full packaging and labelling system that communicates quality, cleanliness, and a sense of farm-to-table freshness.',
      'From concept to production, our team handled every stage, from logo development and brand styling to packaging mockups, printing supervision, and material selection. The result is a cohesive, vibrant system that enhances shelf visibility and builds trust through clear branding, appealing visuals, and packaging that meets international standards.',
    ],
    overviewAr: [
      'لخطّ المنتجات الطازجة من أمريكانا "سو فريش"، صمّمنا منظومة تغليف وعلامات كاملة تُعبّر عن الجودة والنظافة والإحساس بالطزاجة من المزرعة إلى المائدة.',
      'من الفكرة إلى الإنتاج، تولّى فريقنا كلّ مرحلة، من تطوير الشعار وتنسيق الهويّة إلى نماذج التغليف والإشراف الطباعي واختيار المواد. والنتيجة منظومة متّسقة تُعزّز ظهور الرفّ وتبني الثقة من خلال هويّة واضحة وبصريّات جاذبة وتغليف بمواصفات دوليّة.',
    ],
    taglineEn: 'Designed to taste like it looks.',
    taglineAr: 'صُمِّم ليكون مذاقه كمنظره.',
    gallery: [
      { src: '/work/so-fresh/strawberries-clamshell.png', layout: 'wide' },
      { src: '/work/so-fresh/strawberries-sketch.png', layout: 'wide' },
    ],
  },

  {
    slug: 'chicka',
    client: 'Chicka',
    clientAr: 'شيكا',
    tagEn: 'Baked snack · Brand & packaging',
    tagAr: 'وجبات مخبوزة · تغليف وعلامة تجاريّة',
    hero: '/work/chicka/hero.png',
    scopeEn: ['Brand identity', 'Mascot design', 'Packaging system', 'Range extension'],
    scopeAr: ['هويّة العلامة', 'تصميم شخصيّة', 'نظام تغليف', 'توسيع المجموعة'],
    overviewEn: [
      'For Chicka, we crafted a bold packaging line that balances fun and flavour, blending vibrant visuals with a fierce brand mascot that speaks directly to a younger, snack-loving audience.',
      'From spicy heat to creamy cheese, each pack tells a story through colour, character, and crave-worthy composition. All baked into a standout shelf presence.',
    ],
    overviewAr: [
      'لـ"شيكا"، صمّمنا خطّ تغليف جريء يوازن بين المتعة والنكهة، يمزج بصريّات نابضة بشخصيّةٍ شرسة تُخاطب جمهورًا أصغر سنًّا يعشق الوجبات الخفيفة.',
      'من اللذع الحارّ إلى الجبن الكريمي، كلّ علبة تروي حكايتها عبر اللون والشخصيّة والتركيب الشهي. حضورٌ مميّز على الرفّ في كلّ تفصيل.',
    ],
    taglineEn: 'We do not just design packaging. We design first impressions.',
    taglineAr: 'لا نصمّم التغليف وحسب. نصمّم الانطباع الأوّل.',
    gallery: [
      { src: '/work/chicka/mascot-sketch.png', layout: 'square' },
      { src: '/work/chicka/pack-baked-burger.png', layout: 'tall' },
      { src: '/work/chicka/collection-4up.png', layout: 'square' },
      { src: '/work/chicka/lineup-3pack.png', layout: 'wide' },
    ],
  },
];

export function findBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function nextBrand(slug: string): Brand {
  const i = BRANDS.findIndex((b) => b.slug === slug);
  return BRANDS[(i + 1) % BRANDS.length];
}
