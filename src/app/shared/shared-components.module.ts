import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideHelpContentComponent, HelpContentComponent } from './help-content/help-content.component';
import { FilterByTerm } from './search-term.pipe';
import { AnchorDirective } from './dynamic-loader-anchor-components/anchor.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        HelpContentComponent,
        AsideHelpContentComponent,
        AnchorDirective,
        FilterByTerm
    ],
    exports: [
        HelpContentComponent,
        AsideHelpContentComponent,
        AnchorDirective,
        FilterByTerm
    ]
})
export class SharedComponentsModule {}
