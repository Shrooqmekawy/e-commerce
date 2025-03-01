import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly render2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private id: object
  ) {
    if (isPlatformBrowser(this.id)) {
      this.translate.setDefaultLang('en');
      const lang = localStorage.getItem('lang');
      if (lang) {
        this.translate.use(lang);
      }
    }
    this.changeDirectionLanguage();
  }

  changeDirectionLanguage(): void {
    if (localStorage.getItem('lang') === 'en') {
      this.render2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.render2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      this.render2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.render2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changeLanguageTranslation(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.changeDirectionLanguage();
  }
}
