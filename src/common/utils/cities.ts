const cities = [
  {
    name: "اسکو",
    slug: "اسکو",
    province_id: 1,
  },
  {
    name: "اهر",
    slug: "اهر",
    province_id: 1,
  },
  {
    name: "ایلخچی",
    slug: "ایلخچی",
    province_id: 1,
  },
  {
    name: "آبش احمد",
    slug: "آبش-احمد",
    province_id: 1,
  },
  {
    name: "آذرشهر",
    slug: "آذرشهر",
    province_id: 1,
  },
  {
    name: "آقکند",
    slug: "آقکند",
    province_id: 1,
  },
  {
    name: "باسمنج",
    slug: "باسمنج",
    province_id: 1,
  },
  {
    name: "بخشایش",
    slug: "بخشایش",
    province_id: 1,
  },
  {
    name: "بستان آباد",
    slug: "بستان-آباد",
    province_id: 1,
  },
  {
    name: "بناب",
    slug: "بناب",
    province_id: 1,
  },
  {
    name: "بناب جدید",
    slug: "بناب-جدید",
    province_id: 1,
  },
  {
    name: "تبریز",
    slug: "تبریز",
    province_id: 1,
  },
  {
    name: "ترک",
    slug: "ترک",
    province_id: 1,
  },
  {
    name: "ترکمانچای",
    slug: "ترکمانچای",
    province_id: 1,
  },
  {
    name: "تسوج",
    slug: "تسوج",
    province_id: 1,
  },
  {
    name: "تیکمه داش",
    slug: "تیکمه-داش",
    province_id: 1,
  },
  {
    name: "جلفا",
    slug: "جلفا",
    province_id: 1,
  },
  {
    name: "خاروانا",
    slug: "خاروانا",
    province_id: 1,
  },
  {
    name: "خامنه",
    slug: "خامنه",
    province_id: 1,
  },
  {
    name: "خراجو",
    slug: "خراجو",
    province_id: 1,
  },
  {
    name: "خسروشهر",
    slug: "خسروشهر",
    province_id: 1,
  },
  {
    name: "خضرلو",
    slug: "خضرلو",
    province_id: 1,
  },
  {
    name: "خمارلو",
    slug: "خمارلو",
    province_id: 1,
  },
  {
    name: "خواجه",
    slug: "خواجه",
    province_id: 1,
  },
  {
    name: "دوزدوزان",
    slug: "دوزدوزان",
    province_id: 1,
  },
  {
    name: "زرنق",
    slug: "زرنق",
    province_id: 1,
  },
  {
    name: "زنوز",
    slug: "زنوز",
    province_id: 1,
  },
  {
    name: "سراب",
    slug: "سراب",
    province_id: 1,
  },
  {
    name: "سردرود",
    slug: "سردرود",
    province_id: 1,
  },
  {
    name: "سهند",
    slug: "سهند",
    province_id: 1,
  },
  {
    name: "سیس",
    slug: "سیس",
    province_id: 1,
  },
  {
    name: "سیه رود",
    slug: "سیه-رود",
    province_id: 1,
  },
  {
    name: "شبستر",
    slug: "شبستر",
    province_id: 1,
  },
  {
    name: "شربیان",
    slug: "شربیان",
    province_id: 1,
  },
  {
    name: "شرفخانه",
    slug: "شرفخانه",
    province_id: 1,
  },
  {
    name: "شندآباد",
    slug: "شندآباد",
    province_id: 1,
  },
  {
    name: "صوفیان",
    slug: "صوفیان",
    province_id: 1,
  },
  {
    name: "عجب شیر",
    slug: "عجب-شیر",
    province_id: 1,
  },
  {
    name: "قره آغاج",
    slug: "قره-آغاج",
    province_id: 1,
  },
  {
    name: "کشکسرای",
    slug: "کشکسرای",
    province_id: 1,
  },
  {
    name: "کلوانق",
    slug: "کلوانق",
    province_id: 1,
  },
  {
    name: "کلیبر",
    slug: "کلیبر",
    province_id: 1,
  },
  {
    name: "کوزه کنان",
    slug: "کوزه-کنان",
    province_id: 1,
  },
  {
    name: "گوگان",
    slug: "گوگان",
    province_id: 1,
  },
  {
    name: "لیلان",
    slug: "لیلان",
    province_id: 1,
  },
  {
    name: "مراغه",
    slug: "مراغه",
    province_id: 1,
  },
  {
    name: "مرند",
    slug: "مرند",
    province_id: 1,
  },
  {
    name: "ملکان",
    slug: "ملکان",
    province_id: 1,
  },
  {
    name: "ملک کیان",
    slug: "ملک-کیان",
    province_id: 1,
  },
  {
    name: "ممقان",
    slug: "ممقان",
    province_id: 1,
  },
  {
    name: "مهربان",
    slug: "مهربان",
    province_id: 1,
  },
  {
    name: "میانه",
    slug: "میانه",
    province_id: 1,
  },
  {
    name: "نظرکهریزی",
    slug: "نظرکهریزی",
    province_id: 1,
  },
  {
    name: "هادی شهر",
    slug: "هادی-شهر",
    province_id: 1,
  },
  {
    name: "هرگلان",
    slug: "هرگلان",
    province_id: 1,
  },
  {
    name: "هریس",
    slug: "هریس",
    province_id: 1,
  },
  {
    name: "هشترود",
    slug: "هشترود",
    province_id: 1,
  },
  {
    name: "هوراند",
    slug: "هوراند",
    province_id: 1,
  },
  {
    name: "وایقان",
    slug: "وایقان",
    province_id: 1,
  },
  {
    name: "ورزقان",
    slug: "ورزقان",
    province_id: 1,
  },
  {
    name: "یامچی",
    slug: "یامچی",
    province_id: 1,
  },
  {
    name: "ارومیه",
    slug: "ارومیه",
    province_id: 2,
  },
  {
    name: "اشنویه",
    slug: "اشنویه",
    province_id: 2,
  },
  {
    name: "ایواوغلی",
    slug: "ایواوغلی",
    province_id: 2,
  },
  {
    name: "آواجیق",
    slug: "آواجیق",
    province_id: 2,
  },
  {
    name: "باروق",
    slug: "باروق",
    province_id: 2,
  },
  {
    name: "بازرگان",
    slug: "بازرگان",
    province_id: 2,
  },
  {
    name: "بوکان",
    slug: "بوکان",
    province_id: 2,
  },
  {
    name: "پلدشت",
    slug: "پلدشت",
    province_id: 2,
  },
  {
    name: "پیرانشهر",
    slug: "پیرانشهر",
    province_id: 2,
  },
  {
    name: "تازه شهر",
    slug: "تازه-شهر",
    province_id: 2,
  },
  {
    name: "تکاب",
    slug: "تکاب",
    province_id: 2,
  },
  {
    name: "چهاربرج",
    slug: "چهاربرج",
    province_id: 2,
  },
  {
    name: "خوی",
    slug: "خوی",
    province_id: 2,
  },
  {
    name: "دیزج دیز",
    slug: "دیزج-دیز",
    province_id: 2,
  },
  {
    name: "ربط",
    slug: "ربط",
    province_id: 2,
  },
  {
    name: "سردشت",
    slug: "آذربایجان-غربی-سردشت",
    province_id: 2,
  },
  {
    name: "سرو",
    slug: "سرو",
    province_id: 2,
  },
  {
    name: "سلماس",
    slug: "سلماس",
    province_id: 2,
  },
  {
    name: "سیلوانه",
    slug: "سیلوانه",
    province_id: 2,
  },
  {
    name: "سیمینه",
    slug: "سیمینه",
    province_id: 2,
  },
  {
    name: "سیه چشمه",
    slug: "سیه-چشمه",
    province_id: 2,
  },
  {
    name: "شاهین دژ",
    slug: "شاهین-دژ",
    province_id: 2,
  },
  {
    name: "شوط",
    slug: "شوط",
    province_id: 2,
  },
  {
    name: "فیرورق",
    slug: "فیرورق",
    province_id: 2,
  },
  {
    name: "قره ضیاءالدین",
    slug: "قره-ضیاءالدین",
    province_id: 2,
  },
  {
    name: "قطور",
    slug: "قطور",
    province_id: 2,
  },
  {
    name: "قوشچی",
    slug: "قوشچی",
    province_id: 2,
  },
  {
    name: "کشاورز",
    slug: "کشاورز",
    province_id: 2,
  },
  {
    name: "گردکشانه",
    slug: "گردکشانه",
    province_id: 2,
  },
  {
    name: "ماکو",
    slug: "ماکو",
    province_id: 2,
  },
  {
    name: "محمدیار",
    slug: "محمدیار",
    province_id: 2,
  },
  {
    name: "محمودآباد",
    slug: "آذربایجان-غربی-محمودآباد",
    province_id: 2,
  },
  {
    name: "مهاباد",
    slug: "آذربایجان-غربی-مهاباد",
    province_id: 2,
  },
  {
    name: "میاندوآب",
    slug: "میاندوآب",
    province_id: 2,
  },
  {
    name: "میرآباد",
    slug: "میرآباد",
    province_id: 2,
  },
  {
    name: "نالوس",
    slug: "نالوس",
    province_id: 2,
  },
  {
    name: "نقده",
    slug: "نقده",
    province_id: 2,
  },
  {
    name: "نوشین",
    slug: "نوشین",
    province_id: 2,
  },
  {
    name: "اردبیل",
    slug: "اردبیل",
    province_id: 3,
  },
  {
    name: "اصلاندوز",
    slug: "اصلاندوز",
    province_id: 3,
  },
  {
    name: "آبی بیگلو",
    slug: "آبی-بیگلو",
    province_id: 3,
  },
  {
    name: "بیله سوار",
    slug: "بیله-سوار",
    province_id: 3,
  },
  {
    name: "پارس آباد",
    slug: "پارس-آباد",
    province_id: 3,
  },
  {
    name: "تازه کند",
    slug: "تازه-کند",
    province_id: 3,
  },
  {
    name: "تازه کندانگوت",
    slug: "تازه-کندانگوت",
    province_id: 3,
  },
  {
    name: "جعفرآباد",
    slug: "جعفرآباد",
    province_id: 3,
  },
  {
    name: "خلخال",
    slug: "خلخال",
    province_id: 3,
  },
  {
    name: "رضی",
    slug: "رضی",
    province_id: 3,
  },
  {
    name: "سرعین",
    slug: "سرعین",
    province_id: 3,
  },
  {
    name: "عنبران",
    slug: "عنبران",
    province_id: 3,
  },
  {
    name: "فخرآباد",
    slug: "فخرآباد",
    province_id: 3,
  },
  {
    name: "کلور",
    slug: "کلور",
    province_id: 3,
  },
  {
    name: "کوراییم",
    slug: "کوراییم",
    province_id: 3,
  },
  {
    name: "گرمی",
    slug: "گرمی",
    province_id: 3,
  },
  {
    name: "گیوی",
    slug: "گیوی",
    province_id: 3,
  },
  {
    name: "لاهرود",
    slug: "لاهرود",
    province_id: 3,
  },
  {
    name: "مشگین شهر",
    slug: "مشگین-شهر",
    province_id: 3,
  },
  {
    name: "نمین",
    slug: "نمین",
    province_id: 3,
  },
  {
    name: "نیر",
    slug: "اردبیل-نیر",
    province_id: 3,
  },
  {
    name: "هشتجین",
    slug: "هشتجین",
    province_id: 3,
  },
  {
    name: "هیر",
    slug: "هیر",
    province_id: 3,
  },
  {
    name: "ابریشم",
    slug: "ابریشم",
    province_id: 4,
  },
  {
    name: "ابوزیدآباد",
    slug: "ابوزیدآباد",
    province_id: 4,
  },
  {
    name: "اردستان",
    slug: "اردستان",
    province_id: 4,
  },
  {
    name: "اژیه",
    slug: "اژیه",
    province_id: 4,
  },
  {
    name: "اصفهان",
    slug: "اصفهان",
    province_id: 4,
  },
  {
    name: "افوس",
    slug: "افوس",
    province_id: 4,
  },
  {
    name: "انارک",
    slug: "انارک",
    province_id: 4,
  },
  {
    name: "ایمانشهر",
    slug: "ایمانشهر",
    province_id: 4,
  },
  {
    name: "آران وبیدگل",
    slug: "آران-وبیدگل",
    province_id: 4,
  },
  {
    name: "بادرود",
    slug: "بادرود",
    province_id: 4,
  },
  {
    name: "باغ بهادران",
    slug: "باغ-بهادران",
    province_id: 4,
  },
  {
    name: "بافران",
    slug: "بافران",
    province_id: 4,
  },
  {
    name: "برزک",
    slug: "برزک",
    province_id: 4,
  },
  {
    name: "برف انبار",
    slug: "برف-انبار",
    province_id: 4,
  },
  {
    name: "بهاران شهر",
    slug: "بهاران-شهر",
    province_id: 4,
  },
  {
    name: "بهارستان",
    slug: "بهارستان",
    province_id: 4,
  },
  {
    name: "بوئین و میاندشت",
    slug: "بوئین-میاندشت",
    province_id: 4,
  },
  {
    name: "پیربکران",
    slug: "پیربکران",
    province_id: 4,
  },
  {
    name: "تودشک",
    slug: "تودشک",
    province_id: 4,
  },
  {
    name: "تیران",
    slug: "تیران",
    province_id: 4,
  },
  {
    name: "جندق",
    slug: "جندق",
    province_id: 4,
  },
  {
    name: "جوزدان",
    slug: "جوزدان",
    province_id: 4,
  },
  {
    name: "جوشقان و کامو",
    slug: "جوشقان-کامو",
    province_id: 4,
  },
  {
    name: "چادگان",
    slug: "چادگان",
    province_id: 4,
  },
  {
    name: "چرمهین",
    slug: "چرمهین",
    province_id: 4,
  },
  {
    name: "چمگردان",
    slug: "چمگردان",
    province_id: 4,
  },
  {
    name: "حبیب آباد",
    slug: "حبیب-آباد",
    province_id: 4,
  },
  {
    name: "حسن آباد",
    slug: "اصفهان-حسن-آباد",
    province_id: 4,
  },
  {
    name: "حنا",
    slug: "حنا",
    province_id: 4,
  },
  {
    name: "خالدآباد",
    slug: "خالدآباد",
    province_id: 4,
  },
  {
    name: "خمینی شهر",
    slug: "خمینی-شهر",
    province_id: 4,
  },
  {
    name: "خوانسار",
    slug: "خوانسار",
    province_id: 4,
  },
  {
    name: "خور",
    slug: "اصفهان-خور",
    province_id: 4,
  },
  {
    name: "خورزوق",
    slug: "خورزوق",
    province_id: 4,
  },
  {
    name: "داران",
    slug: "داران",
    province_id: 4,
  },
  {
    name: "دامنه",
    slug: "دامنه",
    province_id: 4,
  },
  {
    name: "درچه",
    slug: "درچه",
    province_id: 4,
  },
  {
    name: "دستگرد",
    slug: "دستگرد",
    province_id: 4,
  },
  {
    name: "دهاقان",
    slug: "دهاقان",
    province_id: 4,
  },
  {
    name: "دهق",
    slug: "دهق",
    province_id: 4,
  },
  {
    name: "دولت آباد",
    slug: "اصفهان-دولت-آباد",
    province_id: 4,
  },
  {
    name: "دیزیچه",
    slug: "دیزیچه",
    province_id: 4,
  },
  {
    name: "رزوه",
    slug: "رزوه",
    province_id: 4,
  },
  {
    name: "رضوانشهر",
    slug: "اصفهان-رضوانشهر",
    province_id: 4,
  },
  {
    name: "زاینده رود",
    slug: "زاینده-رود",
    province_id: 4,
  },
  {
    name: "زرین شهر",
    slug: "زرین-شهر",
    province_id: 4,
  },
  {
    name: "زواره",
    slug: "زواره",
    province_id: 4,
  },
  {
    name: "زیباشهر",
    slug: "زیباشهر",
    province_id: 4,
  },
  {
    name: "سده لنجان",
    slug: "سده-لنجان",
    province_id: 4,
  },
  {
    name: "سفیدشهر",
    slug: "سفیدشهر",
    province_id: 4,
  },
  {
    name: "سگزی",
    slug: "سگزی",
    province_id: 4,
  },
  {
    name: "سمیرم",
    slug: "سمیرم",
    province_id: 4,
  },
  {
    name: "شاهین شهر",
    slug: "شاهین-شهر",
    province_id: 4,
  },
  {
    name: "شهرضا",
    slug: "شهرضا",
    province_id: 4,
  },
  {
    name: "طالخونچه",
    slug: "طالخونچه",
    province_id: 4,
  },
  {
    name: "عسگران",
    slug: "عسگران",
    province_id: 4,
  },
  {
    name: "علویجه",
    slug: "علویجه",
    province_id: 4,
  },
  {
    name: "فرخی",
    slug: "فرخی",
    province_id: 4,
  },
  {
    name: "فریدونشهر",
    slug: "فریدونشهر",
    province_id: 4,
  },
  {
    name: "فلاورجان",
    slug: "فلاورجان",
    province_id: 4,
  },
  {
    name: "فولادشهر",
    slug: "فولادشهر",
    province_id: 4,
  },
  {
    name: "قمصر",
    slug: "قمصر",
    province_id: 4,
  },
  {
    name: "قهجاورستان",
    slug: "قهجاورستان",
    province_id: 4,
  },
  {
    name: "قهدریجان",
    slug: "قهدریجان",
    province_id: 4,
  },
  {
    name: "کاشان",
    slug: "کاشان",
    province_id: 4,
  },
  {
    name: "کرکوند",
    slug: "کرکوند",
    province_id: 4,
  },
  {
    name: "کلیشاد و سودرجان",
    slug: "کلیشاد-سودرجان",
    province_id: 4,
  },
  {
    name: "کمشچه",
    slug: "کمشچه",
    province_id: 4,
  },
  {
    name: "کمه",
    slug: "کمه",
    province_id: 4,
  },
  {
    name: "کهریزسنگ",
    slug: "کهریزسنگ",
    province_id: 4,
  },
  {
    name: "کوشک",
    slug: "کوشک",
    province_id: 4,
  },
  {
    name: "کوهپایه",
    slug: "کوهپایه",
    province_id: 4,
  },
  {
    name: "گرگاب",
    slug: "گرگاب",
    province_id: 4,
  },
  {
    name: "گزبرخوار",
    slug: "گزبرخوار",
    province_id: 4,
  },
  {
    name: "گلپایگان",
    slug: "گلپایگان",
    province_id: 4,
  },
  {
    name: "گلدشت",
    slug: "گلدشت",
    province_id: 4,
  },
  {
    name: "گلشهر",
    slug: "گلشهر",
    province_id: 4,
  },
  {
    name: "گوگد",
    slug: "گوگد",
    province_id: 4,
  },
  {
    name: "لای بید",
    slug: "لای-بید",
    province_id: 4,
  },
  {
    name: "مبارکه",
    slug: "مبارکه",
    province_id: 4,
  },
  {
    name: "مجلسی",
    slug: "مجلسی",
    province_id: 4,
  },
  {
    name: "محمدآباد",
    slug: "اصفهان-محمدآباد",
    province_id: 4,
  },
  {
    name: "مشکات",
    slug: "مشکات",
    province_id: 4,
  },
  {
    name: "منظریه",
    slug: "منظریه",
    province_id: 4,
  },
  {
    name: "مهاباد",
    slug: "اصفهان-مهاباد",
    province_id: 4,
  },
  {
    name: "میمه",
    slug: "اصفهان-میمه",
    province_id: 4,
  },
  {
    name: "نائین",
    slug: "نائین",
    province_id: 4,
  },
  {
    name: "نجف آباد",
    slug: "نجف-آباد",
    province_id: 4,
  },
  {
    name: "نصرآباد",
    slug: "اصفهان-نصرآباد",
    province_id: 4,
  },
  {
    name: "نطنز",
    slug: "نطنز",
    province_id: 4,
  },
  {
    name: "نوش آباد",
    slug: "نوش-آباد",
    province_id: 4,
  },
  {
    name: "نیاسر",
    slug: "نیاسر",
    province_id: 4,
  },
  {
    name: "نیک آباد",
    slug: "نیک-آباد",
    province_id: 4,
  },
  {
    name: "هرند",
    slug: "هرند",
    province_id: 4,
  },
  {
    name: "ورزنه",
    slug: "ورزنه",
    province_id: 4,
  },
  {
    name: "ورنامخواست",
    slug: "ورنامخواست",
    province_id: 4,
  },
  {
    name: "وزوان",
    slug: "وزوان",
    province_id: 4,
  },
  {
    name: "ونک",
    slug: "ونک",
    province_id: 4,
  },
  {
    name: "اسارا",
    slug: "اسارا",
    province_id: 5,
  },
  {
    name: "اشتهارد",
    slug: "اشتهارد",
    province_id: 5,
  },
  {
    name: "تنکمان",
    slug: "تنکمان",
    province_id: 5,
  },
  {
    name: "چهارباغ",
    slug: "چهارباغ",
    province_id: 5,
  },
  {
    name: "سعید آباد",
    slug: "سعید-آباد",
    province_id: 5,
  },
  {
    name: "شهر جدید هشتگرد",
    slug: "شهر-جدید-هشتگرد",
    province_id: 5,
  },
  {
    name: "طالقان",
    slug: "طالقان",
    province_id: 5,
  },
  {
    name: "کرج",
    slug: "کرج",
    province_id: 5,
  },
  {
    name: "کمال شهر",
    slug: "کمال-شهر",
    province_id: 5,
  },
  {
    name: "کوهسار",
    slug: "کوهسار",
    province_id: 5,
  },
  {
    name: "گرمدره",
    slug: "گرمدره",
    province_id: 5,
  },
  {
    name: "ماهدشت",
    slug: "ماهدشت",
    province_id: 5,
  },
  {
    name: "محمدشهر",
    slug: "البرز-محمدشهر",
    province_id: 5,
  },
  {
    name: "مشکین دشت",
    slug: "مشکین-دشت",
    province_id: 5,
  },
  {
    name: "نظرآباد",
    slug: "نظرآباد",
    province_id: 5,
  },
  {
    name: "هشتگرد",
    slug: "هشتگرد",
    province_id: 5,
  },
  {
    name: "ارکواز",
    slug: "ارکواز",
    province_id: 6,
  },
  {
    name: "ایلام",
    slug: "ایلام",
    province_id: 6,
  },
  {
    name: "ایوان",
    slug: "ایوان",
    province_id: 6,
  },
  {
    name: "آبدانان",
    slug: "آبدانان",
    province_id: 6,
  },
  {
    name: "آسمان آباد",
    slug: "آسمان-آباد",
    province_id: 6,
  },
  {
    name: "بدره",
    slug: "بدره",
    province_id: 6,
  },
  {
    name: "پهله",
    slug: "پهله",
    province_id: 6,
  },
  {
    name: "توحید",
    slug: "توحید",
    province_id: 6,
  },
  {
    name: "چوار",
    slug: "چوار",
    province_id: 6,
  },
  {
    name: "دره شهر",
    slug: "دره-شهر",
    province_id: 6,
  },
  {
    name: "دلگشا",
    slug: "دلگشا",
    province_id: 6,
  },
  {
    name: "دهلران",
    slug: "دهلران",
    province_id: 6,
  },
  {
    name: "زرنه",
    slug: "زرنه",
    province_id: 6,
  },
  {
    name: "سراب باغ",
    slug: "سراب-باغ",
    province_id: 6,
  },
  {
    name: "سرابله",
    slug: "سرابله",
    province_id: 6,
  },
  {
    name: "صالح آباد",
    slug: "ایلام-صالح-آباد",
    province_id: 6,
  },
  {
    name: "لومار",
    slug: "لومار",
    province_id: 6,
  },
  {
    name: "مهران",
    slug: "مهران",
    province_id: 6,
  },
  {
    name: "مورموری",
    slug: "مورموری",
    province_id: 6,
  },
  {
    name: "موسیان",
    slug: "موسیان",
    province_id: 6,
  },
  {
    name: "میمه",
    slug: "ایلام-میمه",
    province_id: 6,
  },
  {
    name: "امام حسن",
    slug: "امام-حسن",
    province_id: 7,
  },
  {
    name: "انارستان",
    slug: "انارستان",
    province_id: 7,
  },
  {
    name: "اهرم",
    slug: "اهرم",
    province_id: 7,
  },
  {
    name: "آب پخش",
    slug: "آب-پخش",
    province_id: 7,
  },
  {
    name: "آبدان",
    slug: "آبدان",
    province_id: 7,
  },
  {
    name: "برازجان",
    slug: "برازجان",
    province_id: 7,
  },
  {
    name: "بردخون",
    slug: "بردخون",
    province_id: 7,
  },
  {
    name: "بندردیر",
    slug: "بندردیر",
    province_id: 7,
  },
  {
    name: "بندردیلم",
    slug: "بندردیلم",
    province_id: 7,
  },
  {
    name: "بندرریگ",
    slug: "بندرریگ",
    province_id: 7,
  },
  {
    name: "بندرکنگان",
    slug: "بندرکنگان",
    province_id: 7,
  },
  {
    name: "بندرگناوه",
    slug: "بندرگناوه",
    province_id: 7,
  },
  {
    name: "بنک",
    slug: "بنک",
    province_id: 7,
  },
  {
    name: "بوشهر",
    slug: "بوشهر",
    province_id: 7,
  },
  {
    name: "تنگ ارم",
    slug: "تنگ-ارم",
    province_id: 7,
  },
  {
    name: "جم",
    slug: "جم",
    province_id: 7,
  },
  {
    name: "چغادک",
    slug: "چغادک",
    province_id: 7,
  },
  {
    name: "خارک",
    slug: "خارک",
    province_id: 7,
  },
  {
    name: "خورموج",
    slug: "خورموج",
    province_id: 7,
  },
  {
    name: "دالکی",
    slug: "دالکی",
    province_id: 7,
  },
  {
    name: "دلوار",
    slug: "دلوار",
    province_id: 7,
  },
  {
    name: "ریز",
    slug: "ریز",
    province_id: 7,
  },
  {
    name: "سعدآباد",
    slug: "سعدآباد",
    province_id: 7,
  },
  {
    name: "سیراف",
    slug: "سیراف",
    province_id: 7,
  },
  {
    name: "شبانکاره",
    slug: "شبانکاره",
    province_id: 7,
  },
  {
    name: "شنبه",
    slug: "شنبه",
    province_id: 7,
  },
  {
    name: "عسلویه",
    slug: "عسلویه",
    province_id: 7,
  },
  {
    name: "کاکی",
    slug: "کاکی",
    province_id: 7,
  },
  {
    name: "کلمه",
    slug: "کلمه",
    province_id: 7,
  },
  {
    name: "نخل تقی",
    slug: "نخل-تقی",
    province_id: 7,
  },
  {
    name: "وحدتیه",
    slug: "وحدتیه",
    province_id: 7,
  },
  {
    name: "ارجمند",
    slug: "ارجمند",
    province_id: 8,
  },
  {
    name: "اسلامشهر",
    slug: "اسلامشهر",
    province_id: 8,
  },
  {
    name: "اندیشه",
    slug: "اندیشه",
    province_id: 8,
  },
  {
    name: "آبسرد",
    slug: "آبسرد",
    province_id: 8,
  },
  {
    name: "آبعلی",
    slug: "آبعلی",
    province_id: 8,
  },
  {
    name: "باغستان",
    slug: "باغستان",
    province_id: 8,
  },
  {
    name: "باقرشهر",
    slug: "باقرشهر",
    province_id: 8,
  },
  {
    name: "بومهن",
    slug: "بومهن",
    province_id: 8,
  },
  {
    name: "پاکدشت",
    slug: "پاکدشت",
    province_id: 8,
  },
  {
    name: "پردیس",
    slug: "پردیس",
    province_id: 8,
  },
  {
    name: "پیشوا",
    slug: "پیشوا",
    province_id: 8,
  },
  {
    name: "تهران",
    slug: "تهران",
    province_id: 8,
  },
  {
    name: "جوادآباد",
    slug: "جوادآباد",
    province_id: 8,
  },
  {
    name: "چهاردانگه",
    slug: "چهاردانگه",
    province_id: 8,
  },
  {
    name: "حسن آباد",
    slug: "تهران-حسن-آباد",
    province_id: 8,
  },
  {
    name: "دماوند",
    slug: "دماوند",
    province_id: 8,
  },
  {
    name: "دیزین",
    slug: "دیزین",
    province_id: 8,
  },
  {
    name: "شهر ری",
    slug: "شهر-ری",
    province_id: 8,
  },
  {
    name: "رباط کریم",
    slug: "رباط-کریم",
    province_id: 8,
  },
  {
    name: "رودهن",
    slug: "رودهن",
    province_id: 8,
  },
  {
    name: "شاهدشهر",
    slug: "شاهدشهر",
    province_id: 8,
  },
  {
    name: "شریف آباد",
    slug: "شریف-آباد",
    province_id: 8,
  },
  {
    name: "شمشک",
    slug: "شمشک",
    province_id: 8,
  },
  {
    name: "شهریار",
    slug: "شهریار",
    province_id: 8,
  },
  {
    name: "صالح آباد",
    slug: "تهران-صالح-آباد",
    province_id: 8,
  },
  {
    name: "صباشهر",
    slug: "صباشهر",
    province_id: 8,
  },
  {
    name: "صفادشت",
    slug: "صفادشت",
    province_id: 8,
  },
  {
    name: "فردوسیه",
    slug: "فردوسیه",
    province_id: 8,
  },
  {
    name: "فشم",
    slug: "فشم",
    province_id: 8,
  },
  {
    name: "فیروزکوه",
    slug: "فیروزکوه",
    province_id: 8,
  },
  {
    name: "قدس",
    slug: "قدس",
    province_id: 8,
  },
  {
    name: "قرچک",
    slug: "قرچک",
    province_id: 8,
  },
  {
    name: "کهریزک",
    slug: "کهریزک",
    province_id: 8,
  },
  {
    name: "کیلان",
    slug: "کیلان",
    province_id: 8,
  },
  {
    name: "گلستان",
    slug: "شهر-گلستان",
    province_id: 8,
  },
  {
    name: "لواسان",
    slug: "لواسان",
    province_id: 8,
  },
  {
    name: "ملارد",
    slug: "ملارد",
    province_id: 8,
  },
  {
    name: "میگون",
    slug: "میگون",
    province_id: 8,
  },
  {
    name: "نسیم شهر",
    slug: "نسیم-شهر",
    province_id: 8,
  },
  {
    name: "نصیرآباد",
    slug: "نصیرآباد",
    province_id: 8,
  },
  {
    name: "وحیدیه",
    slug: "وحیدیه",
    province_id: 8,
  },
  {
    name: "ورامین",
    slug: "ورامین",
    province_id: 8,
  },
  {
    name: "اردل",
    slug: "اردل",
    province_id: 9,
  },
  {
    name: "آلونی",
    slug: "آلونی",
    province_id: 9,
  },
  {
    name: "باباحیدر",
    slug: "باباحیدر",
    province_id: 9,
  },
  {
    name: "بروجن",
    slug: "بروجن",
    province_id: 9,
  },
  {
    name: "بلداجی",
    slug: "بلداجی",
    province_id: 9,
  },
  {
    name: "بن",
    slug: "بن",
    province_id: 9,
  },
  {
    name: "جونقان",
    slug: "جونقان",
    province_id: 9,
  },
  {
    name: "چلگرد",
    slug: "چلگرد",
    province_id: 9,
  },
  {
    name: "سامان",
    slug: "سامان",
    province_id: 9,
  },
  {
    name: "سفیددشت",
    slug: "سفیددشت",
    province_id: 9,
  },
  {
    name: "سودجان",
    slug: "سودجان",
    province_id: 9,
  },
  {
    name: "سورشجان",
    slug: "سورشجان",
    province_id: 9,
  },
  {
    name: "شلمزار",
    slug: "شلمزار",
    province_id: 9,
  },
  {
    name: "شهرکرد",
    slug: "شهرکرد",
    province_id: 9,
  },
  {
    name: "طاقانک",
    slug: "طاقانک",
    province_id: 9,
  },
  {
    name: "فارسان",
    slug: "فارسان",
    province_id: 9,
  },
  {
    name: "فرادنبه",
    slug: "فرادبنه",
    province_id: 9,
  },
  {
    name: "فرخ شهر",
    slug: "فرخ-شهر",
    province_id: 9,
  },
  {
    name: "کیان",
    slug: "کیان",
    province_id: 9,
  },
  {
    name: "گندمان",
    slug: "گندمان",
    province_id: 9,
  },
  {
    name: "گهرو",
    slug: "گهرو",
    province_id: 9,
  },
  {
    name: "لردگان",
    slug: "لردگان",
    province_id: 9,
  },
  {
    name: "مال خلیفه",
    slug: "مال-خلیفه",
    province_id: 9,
  },
  {
    name: "ناغان",
    slug: "ناغان",
    province_id: 9,
  },
  {
    name: "نافچ",
    slug: "نافچ",
    province_id: 9,
  },
  {
    name: "نقنه",
    slug: "نقنه",
    province_id: 9,
  },
  {
    name: "هفشجان",
    slug: "هفشجان",
    province_id: 9,
  },
  {
    name: "ارسک",
    slug: "ارسک",
    province_id: 10,
  },
  {
    name: "اسدیه",
    slug: "اسدیه",
    province_id: 10,
  },
  {
    name: "اسفدن",
    slug: "اسفدن",
    province_id: 10,
  },
  {
    name: "اسلامیه",
    slug: "اسلامیه",
    province_id: 10,
  },
  {
    name: "آرین شهر",
    slug: "آرین-شهر",
    province_id: 10,
  },
  {
    name: "آیسک",
    slug: "آیسک",
    province_id: 10,
  },
  {
    name: "بشرویه",
    slug: "بشرویه",
    province_id: 10,
  },
  {
    name: "بیرجند",
    slug: "بیرجند",
    province_id: 10,
  },
  {
    name: "حاجی آباد",
    slug: "خراسان-جنوبی-حاجی-آباد",
    province_id: 10,
  },
  {
    name: "خضری دشت بیاض",
    slug: "خضری-دشت-بیاض",
    province_id: 10,
  },
  {
    name: "خوسف",
    slug: "خوسف",
    province_id: 10,
  },
  {
    name: "زهان",
    slug: "زهان",
    province_id: 10,
  },
  {
    name: "سرایان",
    slug: "سرایان",
    province_id: 10,
  },
  {
    name: "سربیشه",
    slug: "سربیشه",
    province_id: 10,
  },
  {
    name: "سه قلعه",
    slug: "سه-قلعه",
    province_id: 10,
  },
  {
    name: "شوسف",
    slug: "شوسف",
    province_id: 10,
  },
  {
    name: "طبس ",
    slug: "خراسان-جنوبی-طبس-",
    province_id: 10,
  },
  {
    name: "فردوس",
    slug: "فردوس",
    province_id: 10,
  },
  {
    name: "قاین",
    slug: "قاین",
    province_id: 10,
  },
  {
    name: "قهستان",
    slug: "قهستان",
    province_id: 10,
  },
  {
    name: "محمدشهر",
    slug: "خراسان-جنوبی-محمدشهر",
    province_id: 10,
  },
  {
    name: "مود",
    slug: "مود",
    province_id: 10,
  },
  {
    name: "نهبندان",
    slug: "نهبندان",
    province_id: 10,
  },
  {
    name: "نیمبلوک",
    slug: "نیمبلوک",
    province_id: 10,
  },
  {
    name: "احمدآباد صولت",
    slug: "احمدآباد-صولت",
    province_id: 11,
  },
  {
    name: "انابد",
    slug: "انابد",
    province_id: 11,
  },
  {
    name: "باجگیران",
    slug: "باجگیران",
    province_id: 11,
  },
  {
    name: "باخرز",
    slug: "باخرز",
    province_id: 11,
  },
  {
    name: "بار",
    slug: "بار",
    province_id: 11,
  },
  {
    name: "بایگ",
    slug: "بایگ",
    province_id: 11,
  },
  {
    name: "بجستان",
    slug: "بجستان",
    province_id: 11,
  },
  {
    name: "بردسکن",
    slug: "بردسکن",
    province_id: 11,
  },
  {
    name: "بیدخت",
    slug: "بیدخت",
    province_id: 11,
  },
  {
    name: "تایباد",
    slug: "تایباد",
    province_id: 11,
  },
  {
    name: "تربت جام",
    slug: "تربت-جام",
    province_id: 11,
  },
  {
    name: "تربت حیدریه",
    slug: "تربت-حیدریه",
    province_id: 11,
  },
  {
    name: "جغتای",
    slug: "جغتای",
    province_id: 11,
  },
  {
    name: "جنگل",
    slug: "جنگل",
    province_id: 11,
  },
  {
    name: "چاپشلو",
    slug: "چاپشلو",
    province_id: 11,
  },
  {
    name: "چکنه",
    slug: "چکنه",
    province_id: 11,
  },
  {
    name: "چناران",
    slug: "چناران",
    province_id: 11,
  },
  {
    name: "خرو",
    slug: "خرو",
    province_id: 11,
  },
  {
    name: "خلیل آباد",
    slug: "خلیل-آباد",
    province_id: 11,
  },
  {
    name: "خواف",
    slug: "خواف",
    province_id: 11,
  },
  {
    name: "داورزن",
    slug: "داورزن",
    province_id: 11,
  },
  {
    name: "درگز",
    slug: "درگز",
    province_id: 11,
  },
  {
    name: "در رود",
    slug: "در-رود",
    province_id: 11,
  },
  {
    name: "دولت آباد",
    slug: "خراسان-رضوی-دولت-آباد",
    province_id: 11,
  },
  {
    name: "رباط سنگ",
    slug: "رباط-سنگ",
    province_id: 11,
  },
  {
    name: "رشتخوار",
    slug: "رشتخوار",
    province_id: 11,
  },
  {
    name: "رضویه",
    slug: "رضویه",
    province_id: 11,
  },
  {
    name: "روداب",
    slug: "روداب",
    province_id: 11,
  },
  {
    name: "ریوش",
    slug: "ریوش",
    province_id: 11,
  },
  {
    name: "سبزوار",
    slug: "سبزوار",
    province_id: 11,
  },
  {
    name: "سرخس",
    slug: "سرخس",
    province_id: 11,
  },
  {
    name: "سفیدسنگ",
    slug: "سفیدسنگ",
    province_id: 11,
  },
  {
    name: "سلامی",
    slug: "سلامی",
    province_id: 11,
  },
  {
    name: "سلطان آباد",
    slug: "سلطان-آباد",
    province_id: 11,
  },
  {
    name: "سنگان",
    slug: "سنگان",
    province_id: 11,
  },
  {
    name: "شادمهر",
    slug: "شادمهر",
    province_id: 11,
  },
  {
    name: "شاندیز",
    slug: "شاندیز",
    province_id: 11,
  },
  {
    name: "ششتمد",
    slug: "ششتمد",
    province_id: 11,
  },
  {
    name: "شهرآباد",
    slug: "شهرآباد",
    province_id: 11,
  },
  {
    name: "شهرزو",
    slug: "شهرزو",
    province_id: 11,
  },
  {
    name: "صالح آباد",
    slug: "خراسان-رضوی-صالح-آباد",
    province_id: 11,
  },
  {
    name: "طرقبه",
    slug: "طرقبه",
    province_id: 11,
  },
  {
    name: "عشق آباد",
    slug: "خراسان-رضوی-عشق-آباد",
    province_id: 11,
  },
  {
    name: "فرهادگرد",
    slug: "فرهادگرد",
    province_id: 11,
  },
  {
    name: "فریمان",
    slug: "فریمان",
    province_id: 11,
  },
  {
    name: "فیروزه",
    slug: "فیروزه",
    province_id: 11,
  },
  {
    name: "فیض آباد",
    slug: "فیض-آباد",
    province_id: 11,
  },
  {
    name: "قاسم آباد",
    slug: "قاسم-آباد",
    province_id: 11,
  },
  {
    name: "قدمگاه",
    slug: "قدمگاه",
    province_id: 11,
  },
  {
    name: "قلندرآباد",
    slug: "قلندرآباد",
    province_id: 11,
  },
  {
    name: "قوچان",
    slug: "قوچان",
    province_id: 11,
  },
  {
    name: "کاخک",
    slug: "کاخک",
    province_id: 11,
  },
  {
    name: "کاریز",
    slug: "کاریز",
    province_id: 11,
  },
  {
    name: "کاشمر",
    slug: "کاشمر",
    province_id: 11,
  },
  {
    name: "کدکن",
    slug: "کدکن",
    province_id: 11,
  },
  {
    name: "کلات",
    slug: "کلات",
    province_id: 11,
  },
  {
    name: "کندر",
    slug: "کندر",
    province_id: 11,
  },
  {
    name: "گلمکان",
    slug: "گلمکان",
    province_id: 11,
  },
  {
    name: "گناباد",
    slug: "گناباد",
    province_id: 11,
  },
  {
    name: "لطف آباد",
    slug: "لطف-آباد",
    province_id: 11,
  },
  {
    name: "مزدآوند",
    slug: "مزدآوند",
    province_id: 11,
  },
  {
    name: "مشهد",
    slug: "مشهد",
    province_id: 11,
  },
  {
    name: "ملک آباد",
    slug: "ملک-آباد",
    province_id: 11,
  },
  {
    name: "نشتیفان",
    slug: "نشتیفان",
    province_id: 11,
  },
  {
    name: "نصرآباد",
    slug: "خراسان-رضوی-نصرآباد",
    province_id: 11,
  },
  {
    name: "نقاب",
    slug: "نقاب",
    province_id: 11,
  },
  {
    name: "نوخندان",
    slug: "نوخندان",
    province_id: 11,
  },
  {
    name: "نیشابور",
    slug: "نیشابور",
    province_id: 11,
  },
  {
    name: "نیل شهر",
    slug: "نیل-شهر",
    province_id: 11,
  },
  {
    name: "همت آباد",
    slug: "همت-آباد",
    province_id: 11,
  },
  {
    name: "یونسی",
    slug: "یونسی",
    province_id: 11,
  },
  {
    name: "اسفراین",
    slug: "اسفراین",
    province_id: 12,
  },
  {
    name: "ایور",
    slug: "ایور",
    province_id: 12,
  },
  {
    name: "آشخانه",
    slug: "آشخانه",
    province_id: 12,
  },
  {
    name: "بجنورد",
    slug: "بجنورد",
    province_id: 12,
  },
  {
    name: "پیش قلعه",
    slug: "پیش-قلعه",
    province_id: 12,
  },
  {
    name: "تیتکانلو",
    slug: "تیتکانلو",
    province_id: 12,
  },
  {
    name: "جاجرم",
    slug: "جاجرم",
    province_id: 12,
  },
  {
    name: "حصارگرمخان",
    slug: "حصارگرمخان",
    province_id: 12,
  },
  {
    name: "درق",
    slug: "درق",
    province_id: 12,
  },
  {
    name: "راز",
    slug: "راز",
    province_id: 12,
  },
  {
    name: "سنخواست",
    slug: "سنخواست",
    province_id: 12,
  },
  {
    name: "شوقان",
    slug: "شوقان",
    province_id: 12,
  },
  {
    name: "شیروان",
    slug: "شیروان",
    province_id: 12,
  },
  {
    name: "صفی آباد",
    slug: "خراسان-شمالی-صفی-آباد",
    province_id: 12,
  },
  {
    name: "فاروج",
    slug: "فاروج",
    province_id: 12,
  },
  {
    name: "قاضی",
    slug: "قاضی",
    province_id: 12,
  },
  {
    name: "گرمه",
    slug: "گرمه",
    province_id: 12,
  },
  {
    name: "لوجلی",
    slug: "لوجلی",
    province_id: 12,
  },
  {
    name: "اروندکنار",
    slug: "اروندکنار",
    province_id: 13,
  },
  {
    name: "الوان",
    slug: "الوان",
    province_id: 13,
  },
  {
    name: "امیدیه",
    slug: "امیدیه",
    province_id: 13,
  },
  {
    name: "اندیمشک",
    slug: "اندیمشک",
    province_id: 13,
  },
  {
    name: "اهواز",
    slug: "اهواز",
    province_id: 13,
  },
  {
    name: "ایذه",
    slug: "ایذه",
    province_id: 13,
  },
  {
    name: "آبادان",
    slug: "آبادان",
    province_id: 13,
  },
  {
    name: "آغاجاری",
    slug: "آغاجاری",
    province_id: 13,
  },
  {
    name: "باغ ملک",
    slug: "باغ-ملک",
    province_id: 13,
  },
  {
    name: "بستان",
    slug: "بستان",
    province_id: 13,
  },
  {
    name: "بندرامام خمینی",
    slug: "بندرامام-خمینی",
    province_id: 13,
  },
  {
    name: "بندرماهشهر",
    slug: "بندرماهشهر",
    province_id: 13,
  },
  {
    name: "بهبهان",
    slug: "بهبهان",
    province_id: 13,
  },
  {
    name: "ترکالکی",
    slug: "ترکالکی",
    province_id: 13,
  },
  {
    name: "جایزان",
    slug: "جایزان",
    province_id: 13,
  },
  {
    name: "چمران",
    slug: "چمران",
    province_id: 13,
  },
  {
    name: "چویبده",
    slug: "چویبده",
    province_id: 13,
  },
  {
    name: "حر",
    slug: "حر",
    province_id: 13,
  },
  {
    name: "حسینیه",
    slug: "حسینیه",
    province_id: 13,
  },
  {
    name: "حمزه",
    slug: "حمزه",
    province_id: 13,
  },
  {
    name: "حمیدیه",
    slug: "حمیدیه",
    province_id: 13,
  },
  {
    name: "خرمشهر",
    slug: "خرمشهر",
    province_id: 13,
  },
  {
    name: "دارخوین",
    slug: "دارخوین",
    province_id: 13,
  },
  {
    name: "دزآب",
    slug: "دزآب",
    province_id: 13,
  },
  {
    name: "دزفول",
    slug: "دزفول",
    province_id: 13,
  },
  {
    name: "دهدز",
    slug: "دهدز",
    province_id: 13,
  },
  {
    name: "رامشیر",
    slug: "رامشیر",
    province_id: 13,
  },
  {
    name: "رامهرمز",
    slug: "رامهرمز",
    province_id: 13,
  },
  {
    name: "رفیع",
    slug: "رفیع",
    province_id: 13,
  },
  {
    name: "زهره",
    slug: "زهره",
    province_id: 13,
  },
  {
    name: "سالند",
    slug: "سالند",
    province_id: 13,
  },
  {
    name: "سردشت",
    slug: "خوزستان-سردشت",
    province_id: 13,
  },
  {
    name: "سوسنگرد",
    slug: "سوسنگرد",
    province_id: 13,
  },
  {
    name: "شادگان",
    slug: "شادگان",
    province_id: 13,
  },
  {
    name: "شاوور",
    slug: "شاوور",
    province_id: 13,
  },
  {
    name: "شرافت",
    slug: "شرافت",
    province_id: 13,
  },
  {
    name: "شوش",
    slug: "شوش",
    province_id: 13,
  },
  {
    name: "شوشتر",
    slug: "شوشتر",
    province_id: 13,
  },
  {
    name: "شیبان",
    slug: "شیبان",
    province_id: 13,
  },
  {
    name: "صالح شهر",
    slug: "صالح-شهر",
    province_id: 13,
  },
  {
    name: "صفی آباد",
    slug: "خوزستان-صفی-آباد",
    province_id: 13,
  },
  {
    name: "صیدون",
    slug: "صیدون",
    province_id: 13,
  },
  {
    name: "قلعه تل",
    slug: "قلعه-تل",
    province_id: 13,
  },
  {
    name: "قلعه خواجه",
    slug: "قلعه-خواجه",
    province_id: 13,
  },
  {
    name: "گتوند",
    slug: "گتوند",
    province_id: 13,
  },
  {
    name: "لالی",
    slug: "لالی",
    province_id: 13,
  },
  {
    name: "مسجدسلیمان",
    slug: "مسجدسلیمان",
    province_id: 13,
  },
  {
    name: "ملاثانی",
    slug: "ملاثانی",
    province_id: 13,
  },
  {
    name: "میانرود",
    slug: "میانرود",
    province_id: 13,
  },
  {
    name: "مینوشهر",
    slug: "مینوشهر",
    province_id: 13,
  },
  {
    name: "هفتگل",
    slug: "هفتگل",
    province_id: 13,
  },
  {
    name: "هندیجان",
    slug: "هندیجان",
    province_id: 13,
  },
  {
    name: "هویزه",
    slug: "هویزه",
    province_id: 13,
  },
  {
    name: "ویس",
    slug: "ویس",
    province_id: 13,
  },
  {
    name: "ابهر",
    slug: "ابهر",
    province_id: 14,
  },
  {
    name: "ارمغان خانه",
    slug: "ارمغان-خانه",
    province_id: 14,
  },
  {
    name: "آب بر",
    slug: "آب-بر",
    province_id: 14,
  },
  {
    name: "چورزق",
    slug: "چورزق",
    province_id: 14,
  },
  {
    name: "حلب",
    slug: "حلب",
    province_id: 14,
  },
  {
    name: "خرمدره",
    slug: "خرمدره",
    province_id: 14,
  },
  {
    name: "دندی",
    slug: "دندی",
    province_id: 14,
  },
  {
    name: "زرین آباد",
    slug: "زرین-آباد",
    province_id: 14,
  },
  {
    name: "زرین رود",
    slug: "زرین-رود",
    province_id: 14,
  },
  {
    name: "زنجان",
    slug: "زنجان",
    province_id: 14,
  },
  {
    name: "سجاس",
    slug: "سجاس",
    province_id: 14,
  },
  {
    name: "سلطانیه",
    slug: "سلطانیه",
    province_id: 14,
  },
  {
    name: "سهرورد",
    slug: "سهرورد",
    province_id: 14,
  },
  {
    name: "صائین قلعه",
    slug: "صائین-قلعه",
    province_id: 14,
  },
  {
    name: "قیدار",
    slug: "قیدار",
    province_id: 14,
  },
  {
    name: "گرماب",
    slug: "گرماب",
    province_id: 14,
  },
  {
    name: "ماه نشان",
    slug: "ماه-نشان",
    province_id: 14,
  },
  {
    name: "هیدج",
    slug: "هیدج",
    province_id: 14,
  },
  {
    name: "امیریه",
    slug: "امیریه",
    province_id: 15,
  },
  {
    name: "ایوانکی",
    slug: "ایوانکی",
    province_id: 15,
  },
  {
    name: "آرادان",
    slug: "آرادان",
    province_id: 15,
  },
  {
    name: "بسطام",
    slug: "بسطام",
    province_id: 15,
  },
  {
    name: "بیارجمند",
    slug: "بیارجمند",
    province_id: 15,
  },
  {
    name: "دامغان",
    slug: "دامغان",
    province_id: 15,
  },
  {
    name: "درجزین",
    slug: "درجزین",
    province_id: 15,
  },
  {
    name: "دیباج",
    slug: "دیباج",
    province_id: 15,
  },
  {
    name: "سرخه",
    slug: "سرخه",
    province_id: 15,
  },
  {
    name: "سمنان",
    slug: "سمنان",
    province_id: 15,
  },
  {
    name: "شاهرود",
    slug: "شاهرود",
    province_id: 15,
  },
  {
    name: "شهمیرزاد",
    slug: "شهمیرزاد",
    province_id: 15,
  },
  {
    name: "کلاته خیج",
    slug: "کلاته-خیج",
    province_id: 15,
  },
  {
    name: "گرمسار",
    slug: "گرمسار",
    province_id: 15,
  },
  {
    name: "مجن",
    slug: "مجن",
    province_id: 15,
  },
  {
    name: "مهدی شهر",
    slug: "مهدی-شهر",
    province_id: 15,
  },
  {
    name: "میامی",
    slug: "میامی",
    province_id: 15,
  },
  {
    name: "ادیمی",
    slug: "ادیمی",
    province_id: 16,
  },
  {
    name: "اسپکه",
    slug: "اسپکه",
    province_id: 16,
  },
  {
    name: "ایرانشهر",
    slug: "ایرانشهر",
    province_id: 16,
  },
  {
    name: "بزمان",
    slug: "بزمان",
    province_id: 16,
  },
  {
    name: "بمپور",
    slug: "بمپور",
    province_id: 16,
  },
  {
    name: "بنت",
    slug: "بنت",
    province_id: 16,
  },
  {
    name: "بنجار",
    slug: "بنجار",
    province_id: 16,
  },
  {
    name: "پیشین",
    slug: "پیشین",
    province_id: 16,
  },
  {
    name: "جالق",
    slug: "جالق",
    province_id: 16,
  },
  {
    name: "چابهار",
    slug: "چابهار",
    province_id: 16,
  },
  {
    name: "خاش",
    slug: "خاش",
    province_id: 16,
  },
  {
    name: "دوست محمد",
    slug: "دوست-محمد",
    province_id: 16,
  },
  {
    name: "راسک",
    slug: "راسک",
    province_id: 16,
  },
  {
    name: "زابل",
    slug: "زابل",
    province_id: 16,
  },
  {
    name: "زابلی",
    slug: "زابلی",
    province_id: 16,
  },
  {
    name: "زاهدان",
    slug: "زاهدان",
    province_id: 16,
  },
  {
    name: "زهک",
    slug: "زهک",
    province_id: 16,
  },
  {
    name: "سراوان",
    slug: "سراوان",
    province_id: 16,
  },
  {
    name: "سرباز",
    slug: "سرباز",
    province_id: 16,
  },
  {
    name: "سوران",
    slug: "سوران",
    province_id: 16,
  },
  {
    name: "سیرکان",
    slug: "سیرکان",
    province_id: 16,
  },
  {
    name: "علی اکبر",
    slug: "علی-اکبر",
    province_id: 16,
  },
  {
    name: "فنوج",
    slug: "فنوج",
    province_id: 16,
  },
  {
    name: "قصرقند",
    slug: "قصرقند",
    province_id: 16,
  },
  {
    name: "کنارک",
    slug: "کنارک",
    province_id: 16,
  },
  {
    name: "گشت",
    slug: "گشت",
    province_id: 16,
  },
  {
    name: "گلمورتی",
    slug: "گلمورتی",
    province_id: 16,
  },
  {
    name: "محمدان",
    slug: "محمدان",
    province_id: 16,
  },
  {
    name: "محمدآباد",
    slug: "سیستان-و-بلوچستان-محمدآباد",
    province_id: 16,
  },
  {
    name: "محمدی",
    slug: "محمدی",
    province_id: 16,
  },
  {
    name: "میرجاوه",
    slug: "میرجاوه",
    province_id: 16,
  },
  {
    name: "نصرت آباد",
    slug: "نصرت-آباد",
    province_id: 16,
  },
  {
    name: "نگور",
    slug: "نگور",
    province_id: 16,
  },
  {
    name: "نوک آباد",
    slug: "نوک-آباد",
    province_id: 16,
  },
  {
    name: "نیک شهر",
    slug: "نیک-شهر",
    province_id: 16,
  },
  {
    name: "هیدوچ",
    slug: "هیدوچ",
    province_id: 16,
  },
  {
    name: "اردکان",
    slug: "فارس-اردکان",
    province_id: 17,
  },
  {
    name: "ارسنجان",
    slug: "ارسنجان",
    province_id: 17,
  },
  {
    name: "استهبان",
    slug: "استهبان",
    province_id: 17,
  },
  {
    name: "اشکنان",
    slug: "اشکنان",
    province_id: 17,
  },
  {
    name: "افزر",
    slug: "افزر",
    province_id: 17,
  },
  {
    name: "اقلید",
    slug: "اقلید",
    province_id: 17,
  },
  {
    name: "امام شهر",
    slug: "امام-شهر",
    province_id: 17,
  },
  {
    name: "اهل",
    slug: "اهل",
    province_id: 17,
  },
  {
    name: "اوز",
    slug: "اوز",
    province_id: 17,
  },
  {
    name: "ایج",
    slug: "ایج",
    province_id: 17,
  },
  {
    name: "ایزدخواست",
    slug: "ایزدخواست",
    province_id: 17,
  },
  {
    name: "آباده",
    slug: "آباده",
    province_id: 17,
  },
  {
    name: "آباده طشک",
    slug: "آباده-طشک",
    province_id: 17,
  },
  {
    name: "باب انار",
    slug: "باب-انار",
    province_id: 17,
  },
  {
    name: "بالاده",
    slug: "فارس-بالاده",
    province_id: 17,
  },
  {
    name: "بنارویه",
    slug: "بنارویه",
    province_id: 17,
  },
  {
    name: "بهمن",
    slug: "بهمن",
    province_id: 17,
  },
  {
    name: "بوانات",
    slug: "بوانات",
    province_id: 17,
  },
  {
    name: "بیرم",
    slug: "بیرم",
    province_id: 17,
  },
  {
    name: "بیضا",
    slug: "بیضا",
    province_id: 17,
  },
  {
    name: "جنت شهر",
    slug: "جنت-شهر",
    province_id: 17,
  },
  {
    name: "جهرم",
    slug: "جهرم",
    province_id: 17,
  },
  {
    name: "جویم",
    slug: "جویم",
    province_id: 17,
  },
  {
    name: "زرین دشت",
    slug: "زرین-دشت",
    province_id: 17,
  },
  {
    name: "حسن آباد",
    slug: "فارس-حسن-آباد",
    province_id: 17,
  },
  {
    name: "خان زنیان",
    slug: "خان-زنیان",
    province_id: 17,
  },
  {
    name: "خاوران",
    slug: "خاوران",
    province_id: 17,
  },
  {
    name: "خرامه",
    slug: "خرامه",
    province_id: 17,
  },
  {
    name: "خشت",
    slug: "خشت",
    province_id: 17,
  },
  {
    name: "خنج",
    slug: "خنج",
    province_id: 17,
  },
  {
    name: "خور",
    slug: "فارس-خور",
    province_id: 17,
  },
  {
    name: "داراب",
    slug: "داراب",
    province_id: 17,
  },
  {
    name: "داریان",
    slug: "داریان",
    province_id: 17,
  },
  {
    name: "دبیران",
    slug: "دبیران",
    province_id: 17,
  },
  {
    name: "دژکرد",
    slug: "دژکرد",
    province_id: 17,
  },
  {
    name: "دهرم",
    slug: "دهرم",
    province_id: 17,
  },
  {
    name: "دوبرجی",
    slug: "دوبرجی",
    province_id: 17,
  },
  {
    name: "رامجرد",
    slug: "رامجرد",
    province_id: 17,
  },
  {
    name: "رونیز",
    slug: "رونیز",
    province_id: 17,
  },
  {
    name: "زاهدشهر",
    slug: "زاهدشهر",
    province_id: 17,
  },
  {
    name: "زرقان",
    slug: "زرقان",
    province_id: 17,
  },
  {
    name: "سده",
    slug: "سده",
    province_id: 17,
  },
  {
    name: "سروستان",
    slug: "سروستان",
    province_id: 17,
  },
  {
    name: "سعادت شهر",
    slug: "سعادت-شهر",
    province_id: 17,
  },
  {
    name: "سورمق",
    slug: "سورمق",
    province_id: 17,
  },
  {
    name: "سیدان",
    slug: "سیدان",
    province_id: 17,
  },
  {
    name: "ششده",
    slug: "ششده",
    province_id: 17,
  },
  {
    name: "شهرپیر",
    slug: "شهرپیر",
    province_id: 17,
  },
  {
    name: "شهرصدرا",
    slug: "شهرصدرا",
    province_id: 17,
  },
  {
    name: "شیراز",
    slug: "شیراز",
    province_id: 17,
  },
  {
    name: "صغاد",
    slug: "صغاد",
    province_id: 17,
  },
  {
    name: "صفاشهر",
    slug: "صفاشهر",
    province_id: 17,
  },
  {
    name: "علامرودشت",
    slug: "علامرودشت",
    province_id: 17,
  },
  {
    name: "فدامی",
    slug: "فدامی",
    province_id: 17,
  },
  {
    name: "فراشبند",
    slug: "فراشبند",
    province_id: 17,
  },
  {
    name: "فسا",
    slug: "فسا",
    province_id: 17,
  },
  {
    name: "فیروزآباد",
    slug: "فارس-فیروزآباد",
    province_id: 17,
  },
  {
    name: "قائمیه",
    slug: "قائمیه",
    province_id: 17,
  },
  {
    name: "قادرآباد",
    slug: "قادرآباد",
    province_id: 17,
  },
  {
    name: "قطب آباد",
    slug: "قطب-آباد",
    province_id: 17,
  },
  {
    name: "قطرویه",
    slug: "قطرویه",
    province_id: 17,
  },
  {
    name: "قیر",
    slug: "قیر",
    province_id: 17,
  },
  {
    name: "کارزین (فتح آباد)",
    slug: "کارزین-فتح-آباد",
    province_id: 17,
  },
  {
    name: "کازرون",
    slug: "کازرون",
    province_id: 17,
  },
  {
    name: "کامفیروز",
    slug: "کامفیروز",
    province_id: 17,
  },
  {
    name: "کره ای",
    slug: "کره-ای",
    province_id: 17,
  },
  {
    name: "کنارتخته",
    slug: "کنارتخته",
    province_id: 17,
  },
  {
    name: "کوار",
    slug: "کوار",
    province_id: 17,
  },
  {
    name: "گراش",
    slug: "گراش",
    province_id: 17,
  },
  {
    name: "گله دار",
    slug: "گله-دار",
    province_id: 17,
  },
  {
    name: "لار",
    slug: "لار",
    province_id: 17,
  },
  {
    name: "لامرد",
    slug: "لامرد",
    province_id: 17,
  },
  {
    name: "لپویی",
    slug: "لپویی",
    province_id: 17,
  },
  {
    name: "لطیفی",
    slug: "لطیفی",
    province_id: 17,
  },
  {
    name: "مبارک آباددیز",
    slug: "مبارک-آباددیز",
    province_id: 17,
  },
  {
    name: "مرودشت",
    slug: "مرودشت",
    province_id: 17,
  },
  {
    name: "مشکان",
    slug: "مشکان",
    province_id: 17,
  },
  {
    name: "مصیری",
    slug: "مصیری",
    province_id: 17,
  },
  {
    name: "مهر",
    slug: "مهر",
    province_id: 17,
  },
  {
    name: "میمند",
    slug: "میمند",
    province_id: 17,
  },
  {
    name: "نوبندگان",
    slug: "نوبندگان",
    province_id: 17,
  },
  {
    name: "نوجین",
    slug: "نوجین",
    province_id: 17,
  },
  {
    name: "نودان",
    slug: "نودان",
    province_id: 17,
  },
  {
    name: "نورآباد",
    slug: "فارس-نورآباد",
    province_id: 17,
  },
  {
    name: "نی ریز",
    slug: "نی-ریز",
    province_id: 17,
  },
  {
    name: "وراوی",
    slug: "وراوی",
    province_id: 17,
  },
  {
    name: "ارداق",
    slug: "ارداق",
    province_id: 18,
  },
  {
    name: "اسفرورین",
    slug: "اسفرورین",
    province_id: 18,
  },
  {
    name: "اقبالیه",
    slug: "اقبالیه",
    province_id: 18,
  },
  {
    name: "الوند",
    slug: "الوند",
    province_id: 18,
  },
  {
    name: "آبگرم",
    slug: "آبگرم",
    province_id: 18,
  },
  {
    name: "آبیک",
    slug: "آبیک",
    province_id: 18,
  },
  {
    name: "آوج",
    slug: "آوج",
    province_id: 18,
  },
  {
    name: "بوئین زهرا",
    slug: "بوئین-زهرا",
    province_id: 18,
  },
  {
    name: "بیدستان",
    slug: "بیدستان",
    province_id: 18,
  },
  {
    name: "تاکستان",
    slug: "تاکستان",
    province_id: 18,
  },
  {
    name: "خاکعلی",
    slug: "خاکعلی",
    province_id: 18,
  },
  {
    name: "خرمدشت",
    slug: "خرمدشت",
    province_id: 18,
  },
  {
    name: "دانسفهان",
    slug: "دانسفهان",
    province_id: 18,
  },
  {
    name: "رازمیان",
    slug: "رازمیان",
    province_id: 18,
  },
  {
    name: "سگزآباد",
    slug: "سگزآباد",
    province_id: 18,
  },
  {
    name: "سیردان",
    slug: "سیردان",
    province_id: 18,
  },
  {
    name: "شال",
    slug: "شال",
    province_id: 18,
  },
  {
    name: "شریفیه",
    slug: "شریفیه",
    province_id: 18,
  },
  {
    name: "ضیاآباد",
    slug: "ضیاآباد",
    province_id: 18,
  },
  {
    name: "قزوین",
    slug: "قزوین",
    province_id: 18,
  },
  {
    name: "کوهین",
    slug: "کوهین",
    province_id: 18,
  },
  {
    name: "محمدیه",
    slug: "محمدیه",
    province_id: 18,
  },
  {
    name: "محمودآباد نمونه",
    slug: "محمودآباد-نمونه",
    province_id: 18,
  },
  {
    name: "معلم کلایه",
    slug: "معلم-کلایه",
    province_id: 18,
  },
  {
    name: "نرجه",
    slug: "نرجه",
    province_id: 18,
  },
  {
    name: "جعفریه",
    slug: "جعفریه",
    province_id: 19,
  },
  {
    name: "دستجرد",
    slug: "دستجرد",
    province_id: 19,
  },
  {
    name: "سلفچگان",
    slug: "سلفچگان",
    province_id: 19,
  },
  {
    name: "قم",
    slug: "قم",
    province_id: 19,
  },
  {
    name: "قنوات",
    slug: "قنوات",
    province_id: 19,
  },
  {
    name: "کهک",
    slug: "کهک",
    province_id: 19,
  },
  {
    name: "آرمرده",
    slug: "آرمرده",
    province_id: 20,
  },
  {
    name: "بابارشانی",
    slug: "بابارشانی",
    province_id: 20,
  },
  {
    name: "بانه",
    slug: "بانه",
    province_id: 20,
  },
  {
    name: "بلبان آباد",
    slug: "بلبان-آباد",
    province_id: 20,
  },
  {
    name: "بوئین سفلی",
    slug: "بوئین-سفلی",
    province_id: 20,
  },
  {
    name: "بیجار",
    slug: "بیجار",
    province_id: 20,
  },
  {
    name: "چناره",
    slug: "چناره",
    province_id: 20,
  },
  {
    name: "دزج",
    slug: "دزج",
    province_id: 20,
  },
  {
    name: "دلبران",
    slug: "دلبران",
    province_id: 20,
  },
  {
    name: "دهگلان",
    slug: "دهگلان",
    province_id: 20,
  },
  {
    name: "دیواندره",
    slug: "دیواندره",
    province_id: 20,
  },
  {
    name: "زرینه",
    slug: "زرینه",
    province_id: 20,
  },
  {
    name: "سروآباد",
    slug: "سروآباد",
    province_id: 20,
  },
  {
    name: "سریش آباد",
    slug: "سریش-آباد",
    province_id: 20,
  },
  {
    name: "سقز",
    slug: "سقز",
    province_id: 20,
  },
  {
    name: "سنندج",
    slug: "سنندج",
    province_id: 20,
  },
  {
    name: "شویشه",
    slug: "شویشه",
    province_id: 20,
  },
  {
    name: "صاحب",
    slug: "صاحب",
    province_id: 20,
  },
  {
    name: "قروه",
    slug: "قروه",
    province_id: 20,
  },
  {
    name: "کامیاران",
    slug: "کامیاران",
    province_id: 20,
  },
  {
    name: "کانی دینار",
    slug: "کانی-دینار",
    province_id: 20,
  },
  {
    name: "کانی سور",
    slug: "کانی-سور",
    province_id: 20,
  },
  {
    name: "مریوان",
    slug: "مریوان",
    province_id: 20,
  },
  {
    name: "موچش",
    slug: "موچش",
    province_id: 20,
  },
  {
    name: "یاسوکند",
    slug: "یاسوکند",
    province_id: 20,
  },
  {
    name: "اختیارآباد",
    slug: "اختیارآباد",
    province_id: 21,
  },
  {
    name: "ارزوئیه",
    slug: "ارزوئیه",
    province_id: 21,
  },
  {
    name: "امین شهر",
    slug: "امین-شهر",
    province_id: 21,
  },
  {
    name: "انار",
    slug: "انار",
    province_id: 21,
  },
  {
    name: "اندوهجرد",
    slug: "اندوهجرد",
    province_id: 21,
  },
  {
    name: "باغین",
    slug: "باغین",
    province_id: 21,
  },
  {
    name: "بافت",
    slug: "بافت",
    province_id: 21,
  },
  {
    name: "بردسیر",
    slug: "بردسیر",
    province_id: 21,
  },
  {
    name: "بروات",
    slug: "بروات",
    province_id: 21,
  },
  {
    name: "بزنجان",
    slug: "بزنجان",
    province_id: 21,
  },
  {
    name: "بم",
    slug: "بم",
    province_id: 21,
  },
  {
    name: "بهرمان",
    slug: "بهرمان",
    province_id: 21,
  },
  {
    name: "پاریز",
    slug: "پاریز",
    province_id: 21,
  },
  {
    name: "جبالبارز",
    slug: "جبالبارز",
    province_id: 21,
  },
  {
    name: "جوپار",
    slug: "جوپار",
    province_id: 21,
  },
  {
    name: "جوزم",
    slug: "جوزم",
    province_id: 21,
  },
  {
    name: "جیرفت",
    slug: "جیرفت",
    province_id: 21,
  },
  {
    name: "چترود",
    slug: "چترود",
    province_id: 21,
  },
  {
    name: "خاتون آباد",
    slug: "خاتون-آباد",
    province_id: 21,
  },
  {
    name: "خانوک",
    slug: "خانوک",
    province_id: 21,
  },
  {
    name: "خورسند",
    slug: "خورسند",
    province_id: 21,
  },
  {
    name: "درب بهشت",
    slug: "درب-بهشت",
    province_id: 21,
  },
  {
    name: "دهج",
    slug: "دهج",
    province_id: 21,
  },
  {
    name: "رابر",
    slug: "رابر",
    province_id: 21,
  },
  {
    name: "راور",
    slug: "راور",
    province_id: 21,
  },
  {
    name: "راین",
    slug: "راین",
    province_id: 21,
  },
  {
    name: "رفسنجان",
    slug: "رفسنجان",
    province_id: 21,
  },
  {
    name: "رودبار",
    slug: "کرمان-رودبار",
    province_id: 21,
  },
  {
    name: "ریحان شهر",
    slug: "ریحان-شهر",
    province_id: 21,
  },
  {
    name: "زرند",
    slug: "زرند",
    province_id: 21,
  },
  {
    name: "زنگی آباد",
    slug: "زنگی-آباد",
    province_id: 21,
  },
  {
    name: "زیدآباد",
    slug: "زیدآباد",
    province_id: 21,
  },
  {
    name: "سیرجان",
    slug: "سیرجان",
    province_id: 21,
  },
  {
    name: "شهداد",
    slug: "شهداد",
    province_id: 21,
  },
  {
    name: "شهربابک",
    slug: "شهربابک",
    province_id: 21,
  },
  {
    name: "صفائیه",
    slug: "صفائیه",
    province_id: 21,
  },
  {
    name: "عنبرآباد",
    slug: "عنبرآباد",
    province_id: 21,
  },
  {
    name: "فاریاب",
    slug: "فاریاب",
    province_id: 21,
  },
  {
    name: "فهرج",
    slug: "فهرج",
    province_id: 21,
  },
  {
    name: "قلعه گنج",
    slug: "قلعه-گنج",
    province_id: 21,
  },
  {
    name: "کاظم آباد",
    slug: "کاظم-آباد",
    province_id: 21,
  },
  {
    name: "کرمان",
    slug: "کرمان",
    province_id: 21,
  },
  {
    name: "کشکوئیه",
    slug: "کشکوئیه",
    province_id: 21,
  },
  {
    name: "کهنوج",
    slug: "کهنوج",
    province_id: 21,
  },
  {
    name: "کوهبنان",
    slug: "کوهبنان",
    province_id: 21,
  },
  {
    name: "کیانشهر",
    slug: "کیانشهر",
    province_id: 21,
  },
  {
    name: "گلباف",
    slug: "گلباف",
    province_id: 21,
  },
  {
    name: "گلزار",
    slug: "گلزار",
    province_id: 21,
  },
  {
    name: "لاله زار",
    slug: "لاله-زار",
    province_id: 21,
  },
  {
    name: "ماهان",
    slug: "ماهان",
    province_id: 21,
  },
  {
    name: "محمدآباد",
    slug: "کرمان-محمدآباد",
    province_id: 21,
  },
  {
    name: "محی آباد",
    slug: "محی-آباد",
    province_id: 21,
  },
  {
    name: "مردهک",
    slug: "مردهک",
    province_id: 21,
  },
  {
    name: "مس سرچشمه",
    slug: "مس-سرچشمه",
    province_id: 21,
  },
  {
    name: "منوجان",
    slug: "منوجان",
    province_id: 21,
  },
  {
    name: "نجف شهر",
    slug: "نجف-شهر",
    province_id: 21,
  },
  {
    name: "نرماشیر",
    slug: "نرماشیر",
    province_id: 21,
  },
  {
    name: "نظام شهر",
    slug: "نظام-شهر",
    province_id: 21,
  },
  {
    name: "نگار",
    slug: "نگار",
    province_id: 21,
  },
  {
    name: "نودژ",
    slug: "نودژ",
    province_id: 21,
  },
  {
    name: "هجدک",
    slug: "هجدک",
    province_id: 21,
  },
  {
    name: "یزدان شهر",
    slug: "یزدان-شهر",
    province_id: 21,
  },
  {
    name: "ازگله",
    slug: "ازگله",
    province_id: 22,
  },
  {
    name: "اسلام آباد غرب",
    slug: "اسلام-آباد-غرب",
    province_id: 22,
  },
  {
    name: "باینگان",
    slug: "باینگان",
    province_id: 22,
  },
  {
    name: "بیستون",
    slug: "بیستون",
    province_id: 22,
  },
  {
    name: "پاوه",
    slug: "پاوه",
    province_id: 22,
  },
  {
    name: "تازه آباد",
    slug: "تازه-آباد",
    province_id: 22,
  },
  {
    name: "جوان رود",
    slug: "جوان-رود",
    province_id: 22,
  },
  {
    name: "حمیل",
    slug: "حمیل",
    province_id: 22,
  },
  {
    name: "ماهیدشت",
    slug: "ماهیدشت",
    province_id: 22,
  },
  {
    name: "روانسر",
    slug: "روانسر",
    province_id: 22,
  },
  {
    name: "سرپل ذهاب",
    slug: "سرپل-ذهاب",
    province_id: 22,
  },
  {
    name: "سرمست",
    slug: "سرمست",
    province_id: 22,
  },
  {
    name: "سطر",
    slug: "سطر",
    province_id: 22,
  },
  {
    name: "سنقر",
    slug: "سنقر",
    province_id: 22,
  },
  {
    name: "سومار",
    slug: "سومار",
    province_id: 22,
  },
  {
    name: "شاهو",
    slug: "شاهو",
    province_id: 22,
  },
  {
    name: "صحنه",
    slug: "صحنه",
    province_id: 22,
  },
  {
    name: "قصرشیرین",
    slug: "قصرشیرین",
    province_id: 22,
  },
  {
    name: "کرمانشاه",
    slug: "کرمانشاه",
    province_id: 22,
  },
  {
    name: "کرندغرب",
    slug: "کرندغرب",
    province_id: 22,
  },
  {
    name: "کنگاور",
    slug: "کنگاور",
    province_id: 22,
  },
  {
    name: "کوزران",
    slug: "کوزران",
    province_id: 22,
  },
  {
    name: "گهواره",
    slug: "گهواره",
    province_id: 22,
  },
  {
    name: "گیلانغرب",
    slug: "گیلانغرب",
    province_id: 22,
  },
  {
    name: "میان راهان",
    slug: "میان-راهان",
    province_id: 22,
  },
  {
    name: "نودشه",
    slug: "نودشه",
    province_id: 22,
  },
  {
    name: "نوسود",
    slug: "نوسود",
    province_id: 22,
  },
  {
    name: "هرسین",
    slug: "هرسین",
    province_id: 22,
  },
  {
    name: "هلشی",
    slug: "هلشی",
    province_id: 22,
  },
  {
    name: "باشت",
    slug: "باشت",
    province_id: 23,
  },
  {
    name: "پاتاوه",
    slug: "پاتاوه",
    province_id: 23,
  },
  {
    name: "چرام",
    slug: "چرام",
    province_id: 23,
  },
  {
    name: "چیتاب",
    slug: "چیتاب",
    province_id: 23,
  },
  {
    name: "دهدشت",
    slug: "دهدشت",
    province_id: 23,
  },
  {
    name: "دوگنبدان",
    slug: "دوگنبدان",
    province_id: 23,
  },
  {
    name: "دیشموک",
    slug: "دیشموک",
    province_id: 23,
  },
  {
    name: "سوق",
    slug: "سوق",
    province_id: 23,
  },
  {
    name: "سی سخت",
    slug: "سی-سخت",
    province_id: 23,
  },
  {
    name: "قلعه رئیسی",
    slug: "قلعه-رئیسی",
    province_id: 23,
  },
  {
    name: "گراب سفلی",
    slug: "گراب-سفلی",
    province_id: 23,
  },
  {
    name: "لنده",
    slug: "لنده",
    province_id: 23,
  },
  {
    name: "لیکک",
    slug: "لیکک",
    province_id: 23,
  },
  {
    name: "مادوان",
    slug: "مادوان",
    province_id: 23,
  },
  {
    name: "مارگون",
    slug: "مارگون",
    province_id: 23,
  },
  {
    name: "یاسوج",
    slug: "یاسوج",
    province_id: 23,
  },
  {
    name: "انبارآلوم",
    slug: "انبارآلوم",
    province_id: 24,
  },
  {
    name: "اینچه برون",
    slug: "اینچه-برون",
    province_id: 24,
  },
  {
    name: "آزادشهر",
    slug: "آزادشهر",
    province_id: 24,
  },
  {
    name: "آق قلا",
    slug: "آق-قلا",
    province_id: 24,
  },
  {
    name: "بندرترکمن",
    slug: "بندرترکمن",
    province_id: 24,
  },
  {
    name: "بندرگز",
    slug: "بندرگز",
    province_id: 24,
  },
  {
    name: "جلین",
    slug: "جلین",
    province_id: 24,
  },
  {
    name: "خان ببین",
    slug: "خان-ببین",
    province_id: 24,
  },
  {
    name: "دلند",
    slug: "دلند",
    province_id: 24,
  },
  {
    name: "رامیان",
    slug: "رامیان",
    province_id: 24,
  },
  {
    name: "سرخنکلاته",
    slug: "سرخنکلاته",
    province_id: 24,
  },
  {
    name: "سیمین شهر",
    slug: "سیمین-شهر",
    province_id: 24,
  },
  {
    name: "علی آباد کتول",
    slug: "علی-آباد-کتول",
    province_id: 24,
  },
  {
    name: "فاضل آباد",
    slug: "فاضل-آباد",
    province_id: 24,
  },
  {
    name: "کردکوی",
    slug: "کردکوی",
    province_id: 24,
  },
  {
    name: "کلاله",
    slug: "کلاله",
    province_id: 24,
  },
  {
    name: "گالیکش",
    slug: "گالیکش",
    province_id: 24,
  },
  {
    name: "گرگان",
    slug: "گرگان",
    province_id: 24,
  },
  {
    name: "گمیش تپه",
    slug: "گمیش-تپه",
    province_id: 24,
  },
  {
    name: "گنبدکاووس",
    slug: "گنبدکاووس",
    province_id: 24,
  },
  {
    name: "مراوه",
    slug: "مراوه",
    province_id: 24,
  },
  {
    name: "مینودشت",
    slug: "مینودشت",
    province_id: 24,
  },
  {
    name: "نگین شهر",
    slug: "نگین-شهر",
    province_id: 24,
  },
  {
    name: "نوده خاندوز",
    slug: "نوده-خاندوز",
    province_id: 24,
  },
  {
    name: "نوکنده",
    slug: "نوکنده",
    province_id: 24,
  },
  {
    name: "ازنا",
    slug: "ازنا",
    province_id: 25,
  },
  {
    name: "اشترینان",
    slug: "اشترینان",
    province_id: 25,
  },
  {
    name: "الشتر",
    slug: "الشتر",
    province_id: 25,
  },
  {
    name: "الیگودرز",
    slug: "الیگودرز",
    province_id: 25,
  },
  {
    name: "بروجرد",
    slug: "بروجرد",
    province_id: 25,
  },
  {
    name: "پلدختر",
    slug: "پلدختر",
    province_id: 25,
  },
  {
    name: "چالانچولان",
    slug: "چالانچولان",
    province_id: 25,
  },
  {
    name: "چغلوندی",
    slug: "چغلوندی",
    province_id: 25,
  },
  {
    name: "چقابل",
    slug: "چقابل",
    province_id: 25,
  },
  {
    name: "خرم آباد",
    slug: "لرستان-خرم-آباد",
    province_id: 25,
  },
  {
    name: "درب گنبد",
    slug: "درب-گنبد",
    province_id: 25,
  },
  {
    name: "دورود",
    slug: "دورود",
    province_id: 25,
  },
  {
    name: "زاغه",
    slug: "زاغه",
    province_id: 25,
  },
  {
    name: "سپیددشت",
    slug: "سپیددشت",
    province_id: 25,
  },
  {
    name: "سراب دوره",
    slug: "سراب-دوره",
    province_id: 25,
  },
  {
    name: "فیروزآباد",
    slug: "لرستان-فیروزآباد",
    province_id: 25,
  },
  {
    name: "کونانی",
    slug: "کونانی",
    province_id: 25,
  },
  {
    name: "کوهدشت",
    slug: "کوهدشت",
    province_id: 25,
  },
  {
    name: "گراب",
    slug: "گراب",
    province_id: 25,
  },
  {
    name: "معمولان",
    slug: "معمولان",
    province_id: 25,
  },
  {
    name: "مومن آباد",
    slug: "مومن-آباد",
    province_id: 25,
  },
  {
    name: "نورآباد",
    slug: "لرستان-نورآباد",
    province_id: 25,
  },
  {
    name: "ویسیان",
    slug: "ویسیان",
    province_id: 25,
  },
  {
    name: "احمدسرگوراب",
    slug: "احمدسرگوراب",
    province_id: 26,
  },
  {
    name: "اسالم",
    slug: "اسالم",
    province_id: 26,
  },
  {
    name: "اطاقور",
    slug: "اطاقور",
    province_id: 26,
  },
  {
    name: "املش",
    slug: "املش",
    province_id: 26,
  },
  {
    name: "آستارا",
    slug: "آستارا",
    province_id: 26,
  },
  {
    name: "آستانه اشرفیه",
    slug: "آستانه-اشرفیه",
    province_id: 26,
  },
  {
    name: "بازار جمعه",
    slug: "بازار-جمعه",
    province_id: 26,
  },
  {
    name: "بره سر",
    slug: "بره-سر",
    province_id: 26,
  },
  {
    name: "بندرانزلی",
    slug: "بندرانزلی",
    province_id: 26,
  },
  {
    name: "پره سر",
    slug: "پره-سر",
    province_id: 26,
  },
  {
    name: "تالش",
    slug: "تالش",
    province_id: 26,
  },
  {
    name: "توتکابن",
    slug: "توتکابن",
    province_id: 26,
  },
  {
    name: "جیرنده",
    slug: "جیرنده",
    province_id: 26,
  },
  {
    name: "چابکسر",
    slug: "چابکسر",
    province_id: 26,
  },
  {
    name: "چاف و چمخاله",
    slug: "چاف-و-چمخاله",
    province_id: 26,
  },
  {
    name: "چوبر",
    slug: "چوبر",
    province_id: 26,
  },
  {
    name: "حویق",
    slug: "حویق",
    province_id: 26,
  },
  {
    name: "خشکبیجار",
    slug: "خشکبیجار",
    province_id: 26,
  },
  {
    name: "خمام",
    slug: "خمام",
    province_id: 26,
  },
  {
    name: "دیلمان",
    slug: "دیلمان",
    province_id: 26,
  },
  {
    name: "رانکوه",
    slug: "رانکوه",
    province_id: 26,
  },
  {
    name: "رحیم آباد",
    slug: "رحیم-آباد",
    province_id: 26,
  },
  {
    name: "رستم آباد",
    slug: "رستم-آباد",
    province_id: 26,
  },
  {
    name: "رشت",
    slug: "رشت",
    province_id: 26,
  },
  {
    name: "رضوانشهر",
    slug: "گیلان-رضوانشهر",
    province_id: 26,
  },
  {
    name: "رودبار",
    slug: "گیلان-رودبار",
    province_id: 26,
  },
  {
    name: "رودبنه",
    slug: "رودبنه",
    province_id: 26,
  },
  {
    name: "رودسر",
    slug: "رودسر",
    province_id: 26,
  },
  {
    name: "سنگر",
    slug: "سنگر",
    province_id: 26,
  },
  {
    name: "سیاهکل",
    slug: "سیاهکل",
    province_id: 26,
  },
  {
    name: "شفت",
    slug: "شفت",
    province_id: 26,
  },
  {
    name: "شلمان",
    slug: "شلمان",
    province_id: 26,
  },
  {
    name: "صومعه سرا",
    slug: "صومعه-سرا",
    province_id: 26,
  },
  {
    name: "فومن",
    slug: "فومن",
    province_id: 26,
  },
  {
    name: "کلاچای",
    slug: "کلاچای",
    province_id: 26,
  },
  {
    name: "کوچصفهان",
    slug: "کوچصفهان",
    province_id: 26,
  },
  {
    name: "کومله",
    slug: "کومله",
    province_id: 26,
  },
  {
    name: "کیاشهر",
    slug: "کیاشهر",
    province_id: 26,
  },
  {
    name: "گوراب زرمیخ",
    slug: "گوراب-زرمیخ",
    province_id: 26,
  },
  {
    name: "لاهیجان",
    slug: "لاهیجان",
    province_id: 26,
  },
  {
    name: "لشت نشا",
    slug: "لشت-نشا",
    province_id: 26,
  },
  {
    name: "لنگرود",
    slug: "لنگرود",
    province_id: 26,
  },
  {
    name: "لوشان",
    slug: "لوشان",
    province_id: 26,
  },
  {
    name: "لولمان",
    slug: "لولمان",
    province_id: 26,
  },
  {
    name: "لوندویل",
    slug: "لوندویل",
    province_id: 26,
  },
  {
    name: "لیسار",
    slug: "لیسار",
    province_id: 26,
  },
  {
    name: "ماسال",
    slug: "ماسال",
    province_id: 26,
  },
  {
    name: "ماسوله",
    slug: "ماسوله",
    province_id: 26,
  },
  {
    name: "مرجقل",
    slug: "مرجقل",
    province_id: 26,
  },
  {
    name: "منجیل",
    slug: "منجیل",
    province_id: 26,
  },
  {
    name: "واجارگاه",
    slug: "واجارگاه",
    province_id: 26,
  },
  {
    name: "امیرکلا",
    slug: "امیرکلا",
    province_id: 27,
  },
  {
    name: "ایزدشهر",
    slug: "ایزدشهر",
    province_id: 27,
  },
  {
    name: "آلاشت",
    slug: "آلاشت",
    province_id: 27,
  },
  {
    name: "آمل",
    slug: "آمل",
    province_id: 27,
  },
  {
    name: "بابل",
    slug: "بابل",
    province_id: 27,
  },
  {
    name: "بابلسر",
    slug: "بابلسر",
    province_id: 27,
  },
  {
    name: "بلده",
    slug: "مازندران-بلده",
    province_id: 27,
  },
  {
    name: "بهشهر",
    slug: "بهشهر",
    province_id: 27,
  },
  {
    name: "بهنمیر",
    slug: "بهنمیر",
    province_id: 27,
  },
  {
    name: "پل سفید",
    slug: "پل-سفید",
    province_id: 27,
  },
  {
    name: "تنکابن",
    slug: "تنکابن",
    province_id: 27,
  },
  {
    name: "جویبار",
    slug: "جویبار",
    province_id: 27,
  },
  {
    name: "چالوس",
    slug: "چالوس",
    province_id: 27,
  },
  {
    name: "چمستان",
    slug: "چمستان",
    province_id: 27,
  },
  {
    name: "خرم آباد",
    slug: "مازندران-خرم-آباد",
    province_id: 27,
  },
  {
    name: "خلیل شهر",
    slug: "خلیل-شهر",
    province_id: 27,
  },
  {
    name: "خوش رودپی",
    slug: "خوش-رودپی",
    province_id: 27,
  },
  {
    name: "دابودشت",
    slug: "دابودشت",
    province_id: 27,
  },
  {
    name: "رامسر",
    slug: "رامسر",
    province_id: 27,
  },
  {
    name: "رستمکلا",
    slug: "رستمکلا",
    province_id: 27,
  },
  {
    name: "رویان",
    slug: "رویان",
    province_id: 27,
  },
  {
    name: "رینه",
    slug: "رینه",
    province_id: 27,
  },
  {
    name: "زرگرمحله",
    slug: "زرگرمحله",
    province_id: 27,
  },
  {
    name: "زیرآب",
    slug: "زیرآب",
    province_id: 27,
  },
  {
    name: "ساری",
    slug: "ساری",
    province_id: 27,
  },
  {
    name: "سرخرود",
    slug: "سرخرود",
    province_id: 27,
  },
  {
    name: "سلمان شهر",
    slug: "سلمان-شهر",
    province_id: 27,
  },
  {
    name: "سورک",
    slug: "سورک",
    province_id: 27,
  },
  {
    name: "شیرگاه",
    slug: "شیرگاه",
    province_id: 27,
  },
  {
    name: "شیرود",
    slug: "شیرود",
    province_id: 27,
  },
  {
    name: "عباس آباد",
    slug: "عباس-آباد",
    province_id: 27,
  },
  {
    name: "فریدونکنار",
    slug: "فریدونکنار",
    province_id: 27,
  },
  {
    name: "فریم",
    slug: "فریم",
    province_id: 27,
  },
  {
    name: "قائم شهر",
    slug: "قائم-شهر",
    province_id: 27,
  },
  {
    name: "کتالم",
    slug: "کتالم",
    province_id: 27,
  },
  {
    name: "کلارآباد",
    slug: "کلارآباد",
    province_id: 27,
  },
  {
    name: "کلاردشت",
    slug: "کلاردشت",
    province_id: 27,
  },
  {
    name: "کله بست",
    slug: "کله-بست",
    province_id: 27,
  },
  {
    name: "کوهی خیل",
    slug: "کوهی-خیل",
    province_id: 27,
  },
  {
    name: "کیاسر",
    slug: "کیاسر",
    province_id: 27,
  },
  {
    name: "کیاکلا",
    slug: "کیاکلا",
    province_id: 27,
  },
  {
    name: "گتاب",
    slug: "گتاب",
    province_id: 27,
  },
  {
    name: "گزنک",
    slug: "گزنک",
    province_id: 27,
  },
  {
    name: "گلوگاه",
    slug: "گلوگاه",
    province_id: 27,
  },
  {
    name: "محمودآباد",
    slug: "مازندران-محمودآباد",
    province_id: 27,
  },
  {
    name: "مرزن آباد",
    slug: "مرزن-آباد",
    province_id: 27,
  },
  {
    name: "مرزیکلا",
    slug: "مرزیکلا",
    province_id: 27,
  },
  {
    name: "نشتارود",
    slug: "نشتارود",
    province_id: 27,
  },
  {
    name: "نکا",
    slug: "نکا",
    province_id: 27,
  },
  {
    name: "نور",
    slug: "نور",
    province_id: 27,
  },
  {
    name: "نوشهر",
    slug: "نوشهر",
    province_id: 27,
  },
  {
    name: "اراک",
    slug: "اراک",
    province_id: 28,
  },
  {
    name: "آستانه",
    slug: "آستانه",
    province_id: 28,
  },
  {
    name: "آشتیان",
    slug: "آشتیان",
    province_id: 28,
  },
  {
    name: "پرندک",
    slug: "پرندک",
    province_id: 28,
  },
  {
    name: "تفرش",
    slug: "تفرش",
    province_id: 28,
  },
  {
    name: "توره",
    slug: "توره",
    province_id: 28,
  },
  {
    name: "جاورسیان",
    slug: "جاورسیان",
    province_id: 28,
  },
  {
    name: "خشکرود",
    slug: "خشکرود",
    province_id: 28,
  },
  {
    name: "خمین",
    slug: "خمین",
    province_id: 28,
  },
  {
    name: "خنداب",
    slug: "خنداب",
    province_id: 28,
  },
  {
    name: "داودآباد",
    slug: "داودآباد",
    province_id: 28,
  },
  {
    name: "دلیجان",
    slug: "دلیجان",
    province_id: 28,
  },
  {
    name: "رازقان",
    slug: "رازقان",
    province_id: 28,
  },
  {
    name: "زاویه",
    slug: "زاویه",
    province_id: 28,
  },
  {
    name: "ساروق",
    slug: "ساروق",
    province_id: 28,
  },
  {
    name: "ساوه",
    slug: "ساوه",
    province_id: 28,
  },
  {
    name: "سنجان",
    slug: "سنجان",
    province_id: 28,
  },
  {
    name: "شازند",
    slug: "شازند",
    province_id: 28,
  },
  {
    name: "غرق آباد",
    slug: "غرق-آباد",
    province_id: 28,
  },
  {
    name: "فرمهین",
    slug: "فرمهین",
    province_id: 28,
  },
  {
    name: "قورچی باشی",
    slug: "قورچی-باشی",
    province_id: 28,
  },
  {
    name: "کرهرود",
    slug: "کرهرود",
    province_id: 28,
  },
  {
    name: "کمیجان",
    slug: "کمیجان",
    province_id: 28,
  },
  {
    name: "مامونیه",
    slug: "مامونیه",
    province_id: 28,
  },
  {
    name: "محلات",
    slug: "محلات",
    province_id: 28,
  },
  {
    name: "مهاجران",
    slug: "مهاجران",
    province_id: 28,
  },
  {
    name: "میلاجرد",
    slug: "میلاجرد",
    province_id: 28,
  },
  {
    name: "نراق",
    slug: "نراق",
    province_id: 28,
  },
  {
    name: "نوبران",
    slug: "نوبران",
    province_id: 28,
  },
  {
    name: "نیمور",
    slug: "نیمور",
    province_id: 28,
  },
  {
    name: "هندودر",
    slug: "هندودر",
    province_id: 28,
  },
  {
    name: "ابوموسی",
    slug: "ابوموسی",
    province_id: 29,
  },
  {
    name: "بستک",
    slug: "بستک",
    province_id: 29,
  },
  {
    name: "بندرجاسک",
    slug: "بندرجاسک",
    province_id: 29,
  },
  {
    name: "بندرچارک",
    slug: "بندرچارک",
    province_id: 29,
  },
  {
    name: "بندرخمیر",
    slug: "بندرخمیر",
    province_id: 29,
  },
  {
    name: "بندرعباس",
    slug: "بندرعباس",
    province_id: 29,
  },
  {
    name: "بندرلنگه",
    slug: "بندرلنگه",
    province_id: 29,
  },
  {
    name: "بیکا",
    slug: "بیکا",
    province_id: 29,
  },
  {
    name: "پارسیان",
    slug: "پارسیان",
    province_id: 29,
  },
  {
    name: "تخت",
    slug: "تخت",
    province_id: 29,
  },
  {
    name: "جناح",
    slug: "جناح",
    province_id: 29,
  },
  {
    name: "حاجی آباد",
    slug: "هرمزگان-حاجی-آباد",
    province_id: 29,
  },
  {
    name: "درگهان",
    slug: "درگهان",
    province_id: 29,
  },
  {
    name: "دهبارز",
    slug: "دهبارز",
    province_id: 29,
  },
  {
    name: "رویدر",
    slug: "رویدر",
    province_id: 29,
  },
  {
    name: "زیارتعلی",
    slug: "زیارتعلی",
    province_id: 29,
  },
  {
    name: "سردشت",
    slug: "هرمزگان-سردشت",
    province_id: 29,
  },
  {
    name: "سندرک",
    slug: "سندرک",
    province_id: 29,
  },
  {
    name: "سوزا",
    slug: "سوزا",
    province_id: 29,
  },
  {
    name: "سیریک",
    slug: "سیریک",
    province_id: 29,
  },
  {
    name: "فارغان",
    slug: "فارغان",
    province_id: 29,
  },
  {
    name: "فین",
    slug: "فین",
    province_id: 29,
  },
  {
    name: "قشم",
    slug: "قشم",
    province_id: 29,
  },
  {
    name: "قلعه قاضی",
    slug: "قلعه-قاضی",
    province_id: 29,
  },
  {
    name: "کنگ",
    slug: "کنگ",
    province_id: 29,
  },
  {
    name: "کوشکنار",
    slug: "کوشکنار",
    province_id: 29,
  },
  {
    name: "کیش",
    slug: "کیش",
    province_id: 29,
  },
  {
    name: "گوهران",
    slug: "گوهران",
    province_id: 29,
  },
  {
    name: "میناب",
    slug: "میناب",
    province_id: 29,
  },
  {
    name: "هرمز",
    slug: "هرمز",
    province_id: 29,
  },
  {
    name: "هشتبندی",
    slug: "هشتبندی",
    province_id: 29,
  },
  {
    name: "ازندریان",
    slug: "ازندریان",
    province_id: 30,
  },
  {
    name: "اسدآباد",
    slug: "اسدآباد",
    province_id: 30,
  },
  {
    name: "برزول",
    slug: "برزول",
    province_id: 30,
  },
  {
    name: "بهار",
    slug: "بهار",
    province_id: 30,
  },
  {
    name: "تویسرکان",
    slug: "تویسرکان",
    province_id: 30,
  },
  {
    name: "جورقان",
    slug: "جورقان",
    province_id: 30,
  },
  {
    name: "جوکار",
    slug: "جوکار",
    province_id: 30,
  },
  {
    name: "دمق",
    slug: "دمق",
    province_id: 30,
  },
  {
    name: "رزن",
    slug: "رزن",
    province_id: 30,
  },
  {
    name: "زنگنه",
    slug: "زنگنه",
    province_id: 30,
  },
  {
    name: "سامن",
    slug: "سامن",
    province_id: 30,
  },
  {
    name: "سرکان",
    slug: "سرکان",
    province_id: 30,
  },
  {
    name: "شیرین سو",
    slug: "شیرین-سو",
    province_id: 30,
  },
  {
    name: "صالح آباد",
    slug: "همدان-صالح-آباد",
    province_id: 30,
  },
  {
    name: "فامنین",
    slug: "فامنین",
    province_id: 30,
  },
  {
    name: "فرسفج",
    slug: "فرسفج",
    province_id: 30,
  },
  {
    name: "فیروزان",
    slug: "فیروزان",
    province_id: 30,
  },
  {
    name: "قروه درجزین",
    slug: "قروه-درجزین",
    province_id: 30,
  },
  {
    name: "قهاوند",
    slug: "قهاوند",
    province_id: 30,
  },
  {
    name: "کبودر آهنگ",
    slug: "کبودر-آهنگ",
    province_id: 30,
  },
  {
    name: "گل تپه",
    slug: "گل-تپه",
    province_id: 30,
  },
  {
    name: "گیان",
    slug: "گیان",
    province_id: 30,
  },
  {
    name: "لالجین",
    slug: "لالجین",
    province_id: 30,
  },
  {
    name: "مریانج",
    slug: "مریانج",
    province_id: 30,
  },
  {
    name: "ملایر",
    slug: "ملایر",
    province_id: 30,
  },
  {
    name: "نهاوند",
    slug: "نهاوند",
    province_id: 30,
  },
  {
    name: "همدان",
    slug: "همدان",
    province_id: 30,
  },
  {
    name: "ابرکوه",
    slug: "ابرکوه",
    province_id: 31,
  },
  {
    name: "احمدآباد",
    slug: "احمدآباد",
    province_id: 31,
  },
  {
    name: "اردکان",
    slug: "یزد-اردکان",
    province_id: 31,
  },
  {
    name: "اشکذر",
    slug: "اشکذر",
    province_id: 31,
  },
  {
    name: "بافق",
    slug: "بافق",
    province_id: 31,
  },
  {
    name: "بفروئیه",
    slug: "بفروئیه",
    province_id: 31,
  },
  {
    name: "بهاباد",
    slug: "بهاباد",
    province_id: 31,
  },
  {
    name: "تفت",
    slug: "تفت",
    province_id: 31,
  },
  {
    name: "حمیدیا",
    slug: "حمیدیا",
    province_id: 31,
  },
  {
    name: "خضرآباد",
    slug: "خضرآباد",
    province_id: 31,
  },
  {
    name: "دیهوک",
    slug: "دیهوک",
    province_id: 31,
  },
  {
    name: "زارچ",
    slug: "زارچ",
    province_id: 31,
  },
  {
    name: "شاهدیه",
    slug: "شاهدیه",
    province_id: 31,
  },
  {
    name: "طبس",
    slug: "یزد-طبس",
    province_id: 31,
  },
  {
    name: "عقدا",
    slug: "عقدا",
    province_id: 31,
  },
  {
    name: "مروست",
    slug: "مروست",
    province_id: 31,
  },
  {
    name: "مهردشت",
    slug: "مهردشت",
    province_id: 31,
  },
  {
    name: "مهریز",
    slug: "مهریز",
    province_id: 31,
  },
  {
    name: "میبد",
    slug: "میبد",
    province_id: 31,
  },
  {
    name: "ندوشن",
    slug: "ندوشن",
    province_id: 31,
  },
  {
    name: "نیر",
    slug: "یزد-نیر",
    province_id: 31,
  },
  {
    name: "هرات",
    slug: "هرات",
    province_id: 31,
  },
  {
    name: "یزد",
    slug: "یزد",
    province_id: 31,
  },
  {
    name: "پرند",
    slug: "پرند",
    province_id: 8,
  },
  {
    name: "فردیس",
    slug: "فردیس",
    province_id: 5,
  },
  {
    name: "مارلیک",
    slug: "مارلیک",
    province_id: 5,
  },
  {
    name: "سادات شهر",
    slug: "سادات-شهر",
    province_id: 27,
  },
  {
    name: "زیباکنار",
    slug: "زیباکنار",
    province_id: 26,
  },
  {
    name: "کردان",
    slug: "کردان",
    province_id: 5,
  },
  {
    name: "ساوجبلاغ",
    slug: "ساوجبلاغ",
    province_id: 5,
  },
  {
    name: "تهران دشت",
    slug: "تهران-دشت",
    province_id: 5,
  },
  {
    name: "گلبهار",
    slug: "گلبهار",
    province_id: 11,
  },
  {
    name: "قیامدشت",
    slug: "قیامدشت",
    province_id: 8,
  },
  {
    name: "بینالود",
    slug: "بینالود",
    province_id: 11,
  },
  {
    name: "پیربازار",
    slug: "پیربازار",
    province_id: 26,
  },
  {
    name: "رضوانشهر",
    slug: "رضوانشهر",
    province_id: 31,
  },
];

export default cities;
