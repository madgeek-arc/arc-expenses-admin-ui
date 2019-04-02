import { Component, OnInit } from '@angular/core';
import { Project } from '../../domain/operation';
import { ManageProjectService } from '../../services/manage-project.service';
import { SearchResults } from '../../domain/extraClasses';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'arc-projects-list',
    templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {
    errorMessage: string;
    showSpinner: boolean;
    searchResults: SearchResults<Project>;
    projects: Project[] = [];

    itemsPerPage: number;
    currentPage: number;
    totalPages = 0;

    constructor(private projectService: ManageProjectService,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit() {
        this.route.queryParamMap.subscribe(
          params => {
            this.itemsPerPage = 10;
            this.currentPage = 0;
            if (params.has('page')) {
              this.currentPage = +params.get('page') - 1;
            }
            if (params.has('itemsPerPage')) {
              this.itemsPerPage = +params.get('itemsPerPage');
            }
            this.getProjects();
          }
        );
    }

    getProjects() {
        this.projects = [];
        this.errorMessage = '';
        this.showSpinner = true;
        const currentOffset = this.currentPage * this.itemsPerPage;
        this.projectService.getAllProjects(currentOffset, this.itemsPerPage).subscribe(
            projs => {
                this.searchResults = projs;
                if (projs.results) {
                    this.projects = projs.results;
                    this.totalPages = Math.ceil(this.searchResults.total / this.itemsPerPage);
                }
                this.errorMessage = '';
                this.showSpinner = false;
            },
            er => {
                this.errorMessage = 'Παρουσιάστηκε πρόβλημα με την ανάκτηση των απαραίτητων πληροφοριών.';
                this.showSpinner = false;
                console.log(er);
            }
        );
    }

    goToPreviousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            // this.getProjects();
            this.createSearchUrl();
        }
    }

    goToNextPage() {
        if ( (this.currentPage + 1) < this.totalPages) {
            this.currentPage++;
            // this.getProjects();
            this.createSearchUrl();
        }
    }

    getItemsPerPage(event: any) {
        this.itemsPerPage = event.target.value;
        this.currentPage = 0;
        // this.getProjects();
        this.createSearchUrl();
    }

    createSearchUrl() {
      const url = new URLSearchParams();
      url.set('page', (this.currentPage + 1).toString());
      url.set('itemsPerPage', this.itemsPerPage.toString());

      this.router.navigateByUrl(`/resources/projects?${url.toString()}`);
    }

}
