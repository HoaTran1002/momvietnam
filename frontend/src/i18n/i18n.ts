import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import menuEn from "@/locales/en/menu.json"
import menuVi from "@/locales/vi/menu.json"
import homeEn from "@/locales/en/home.json"
import homeVi from "@/locales/vi/home.json"
import layoutEn from "@/locales/en/layouts.json"
import layoutVi from "@/locales/vi/layouts.json"
import lessonEn from "@/locales/En/lesson.json"
import lessonVi from "@/locales/vi/lesson.json"
import coursesEn from "@/locales/En/courses.json"
import coursesVi from "@/locales/Vi/courses.json"
import newsEn from "@/locales/En/news.json"
import newsVi from "@/locales/Vi/news.json"
import contactEn from "@/locales/En/contact.json"
import contactVi from "@/locales/Vi/contact.json"
import faqEn from "@/locales/En/faq.json"
import faqVi from "@/locales/Vi/faq.json"
import LocalStorage from "@/utils/localStorage";


// =====================================================
export const locales = {
    en: "English",
    vi: "Tiếng việt"
} as const


export const resources = {
    en: {
        menu: menuEn,
        home: homeEn,
        layout: layoutEn,
        lesson: lessonEn,
        courses: coursesEn,
        news: newsEn,
        contact:contactEn,
        faq:faqEn
    },
    vi: {
        menu: menuVi,
        home: homeVi,
        layout: layoutVi,
        lesson: lessonVi,
        courses: coursesVi,
        news: newsVi,
        contact:contactVi,
        faq:faqVi
    }
} as const


export const defaultNS = "menu"
const lang = LocalStorage.getItem<number>("lang")
i18n.use(initReactI18next).init({
    resources,
    lng: lang === 0 ? "vi" : "en",
    ns: ['menu', 'home', 'layout', 'lesson', 'courses', 'news','contact','faq'],
    defaultNS,
    fallbackLng: lang === 0 ? "vi" : "en",
    interpolation: {
        escapeValue: false
    }
});