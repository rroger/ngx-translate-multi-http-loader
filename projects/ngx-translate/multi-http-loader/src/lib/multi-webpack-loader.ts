import { TranslateLoader } from "@ngx-translate/core";
import { Observable, forkJoin,  from as fromPromise } from "rxjs";
import { map } from "rxjs/operators";
import merge from 'deepmerge';


export interface ITranslationResource {
  prefix: string;
  suffix: string;
}

export class MultiTranslateWebpackLoader implements TranslateLoader {
  constructor(
    private resources: ITranslationResource[],
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const translationFiles = this.resources.map(resource => {
      return fromPromise(import(`${resource.prefix}${lang}${resource.suffix}`))
    });
    return forkJoin(translationFiles).pipe(map(traslationFile => merge.all(traslationFile)));
  }
}
