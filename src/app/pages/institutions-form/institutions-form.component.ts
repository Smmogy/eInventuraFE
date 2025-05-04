import { Component, OnInit } from '@angular/core';
import { InstitutionService } from '../../services/institution/institution.service';
import { Institution } from '../../models/institution';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-institutions-form',
  templateUrl: './institutions-form.component.html',
  styleUrls: ['./institutions-form.component.css'],
})
export class InstitutionsFormComponent implements OnInit {
  institutions: Institution[] = [];
  filteredInstitutions: Institution[] = [];
  searchQuery: string = '';
  display: boolean = false;
  institutionIdToDelete: number | null = null;

  constructor(
    private institutionService: InstitutionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService
      .getInstitutions()
      .subscribe((data: Institution[]) => {
        this.institutions = data;
        this.filteredInstitutions = data;
      });
  }

  filterInstitutions(): void {
    if (this.searchQuery) {
      this.filteredInstitutions = this.institutions.filter((institution) =>
        institution.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredInstitutions = this.institutions;
    }
  }

  deleteInstitution(id: number): void {
    this.institutionIdToDelete = id;
    this.display = true;
  }

  closeDialog(): void {
    this.display = false;
    this.institutionIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.institutionIdToDelete !== null) {
      this.institutionService
        .deleteInstitution(this.institutionIdToDelete)
        .subscribe(
          () => {
            this.institutions = this.institutions.filter(
              (institution) =>
                institution.idInstitution !== this.institutionIdToDelete
            );
            this.filterInstitutions();
            this.closeDialog();
          },
          (error) => {
            console.error('Failed to delete institution:', error);
            this.closeDialog();
            this.messageService.add({
              severity: 'error',
              summary: 'Greška',
              detail:
                'Nije moguće obrisati instituciju koja se koristi u inventuri.',
            });
          }
        );
    }
  }
}
