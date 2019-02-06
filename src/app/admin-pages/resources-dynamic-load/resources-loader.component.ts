import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AnchorInterfaceComponent } from '../../shared/dynamic-loader-anchor-components/anchor-interface.component';
import { AnchorDirective } from '../../shared/dynamic-loader-anchor-components/anchor.directive';
import { AnchorItem } from '../../shared/dynamic-loader-anchor-components/anchor-item';


/* in order for the component to work correctly, the injected component should have an id and a data input,
 * as well as an exportFormValue() function [if the getComponentFormValue() function will be used] */

@Component({
    selector: 'arc-resource-loader',
    template: `<ng-template anchor-host></ng-template>`
})
export class ResourcesLoaderComponent implements OnInit, OnChanges {
    @Input() id: string;
    @Input() resource: AnchorItem;
    private _resource: AnchorItem;
    componentInstance: any;

    @ViewChild(AnchorDirective) resourceHost: AnchorDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.loadComponent();
    }

    ngOnChanges(changes: SimpleChanges): void {
      const changedVar = changes.resource;
      if (changedVar.previousValue !== changes.currentValue) {
        this.loadComponent();
      }
    }

  loadComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.resource.component);
        const viewContainerRef = this.resourceHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = componentRef.instance;

        if (this.resource.data !== undefined) {
            (<AnchorInterfaceComponent>componentRef.instance).data = this.resource.data;
            this.componentInstance.id = this.id;
        }
    }

    removeLoadedComponent() {
      const viewContainerRef = this.resourceHost.viewContainerRef;
      viewContainerRef.clear();
      // viewContainerRef.remove(0);
    }

    getComponentFormValue() {
        return this.componentInstance.exportFormValue();
    }

}
