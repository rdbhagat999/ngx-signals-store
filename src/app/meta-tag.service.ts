import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaTagService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private title = 'Angular SSR';
  private description = 'Default description for the application.';

  constructor() {}

  initTags() {
    this.titleService.setTitle(this.title);
    this.metaService.addTag({
      name: 'description',
      content: this.description,
    });
    this.metaService.addTag({
      name: 'keywords',
      content: 'angular, default, tags',
    });
    this.metaService.addTag({
      name: 'author',
      content: 'Ramandeep Bhagat',
    });
    this.metaService.addTag({
      name: 'robots',
      content: 'index, follow',
    });
    this.metaService.addTag({
      name: 'theme-color',
      content: '#ffffff',
    });
  }
  updateTitle(title: string) {
    if (title?.trim()) {
      this.titleService.setTitle(this.title + ` | ${title}`);
    }
  }
  updateMetaTag(name: string, value: string) {
    if (name?.trim() && value?.trim()) {
      this.metaService.updateTag({
        name: name,
        content: value,
      });
    }
  }
}
