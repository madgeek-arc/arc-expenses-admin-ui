import { Component, OnInit, ViewChild } from '@angular/core';
import { AnchorItem } from '../shared/dynamic-loader-anchor-components/anchor-item';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsListComponent } from './resources-lists/projects-list.component';
import { InstitutesListComponent } from './resources-lists/institutes-list.component';
import { OrganizationsListComponent } from './resources-lists/organizations-list.component';
import { ResourcesLoaderComponent } from './resources-dynamic-load/resources-loader.component';

@Component({
    selector: 'arc-admin-page',
    templateUrl: './admin-page.component.html'
})
export class AdminPageComponent implements OnInit {
    errorMessage: string;
    showSpinner: boolean;

    title = 'Εγγραφές';
    addNewButtonLabel = 'Προσθήκη εγγραφής';
    resourceType: string;
    resource: any;

    @ViewChild('resourceListComponent') resourceListComponent: ResourcesLoaderComponent;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        if (params.has('type')) {
          this.resourceType = params.get('type');
          this.showResourceListComponent();
        }
      });
        /*if (this.route.snapshot.paramMap.has('type')) {
            this.resourceType = this.route.snapshot.paramMap.get('type');
            this.showResourceListComponent();
        }*/
    }

    showResourceListComponent() {
        if (this.resourceType === 'projects') {
            this.title = 'Έργα';
            this.addNewButtonLabel = 'Προσθήκη έργου';
            this.resource = new AnchorItem(ProjectsListComponent);
        } else if (this.resourceType === 'institutes') {
            this.title = 'Ινστιτούτα/Μονάδες';
            this.addNewButtonLabel = 'Προσθήκη ινστιτούτου/μονάδας';
            this.resource = new AnchorItem(InstitutesListComponent);
        } else if (this.resourceType === 'organizations') {
            this.title = 'Οργανισμοί';
            this.addNewButtonLabel = 'Προσθήκη οργανισμού';
            this.resource = new AnchorItem(OrganizationsListComponent);
        } else {
            this.router.navigate(['/home']);
        }
    }

}
