import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Admin } from '../../models/user.model';
import { AdminService } from '../../services/admin.service';
import { AdminDialogComponent } from './admin-dialog.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminDialogComponent],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  admins$: Observable<Admin[]>;
  filteredAdmins$!: Observable<Admin[]>;
  searchForm: FormGroup;
  isDialogOpen = false;
  selectedAdmin: Admin | null = null;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.admins$ = this.adminService.getAdmins();
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.filteredAdmins$ = combineLatest([
      this.admins$,
      this.searchForm.get('search')!.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([admins, search]) => {
        if (!search) return admins;
        return admins.filter(admin =>
          admin.name.toLowerCase().includes(search.toLowerCase()) ||
          admin.email.toLowerCase().includes(search.toLowerCase()) ||
          admin.role.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }

  openAddDialog(): void {
    this.selectedAdmin = null;
    this.isDialogOpen = true;
  }

  openEditDialog(admin: Admin): void {
    this.selectedAdmin = admin;
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedAdmin = null;
  }

  onAdminSaved(): void {
    this.closeDialog();
  }

  deleteAdmin(id: number): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.deleteAdmin(id);
    }
  }

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'super admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'moderator': return 'bg-yellow-100 text-yellow-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
