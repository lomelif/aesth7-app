import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { Address, Order, User } from '../../../../models/user.interface';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent { 
  user: User | null = null
  orders: Order[] = []
  addresses: Address[] = []
  activeTab = "orders"
  isEditing = false
  isDropdownOpen = false
  profileForm: FormGroup
  passwordForm: FormGroup

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    })

    this.passwordForm = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        });
        this.user = user;
        this.cdr.markForCheck();
      }
    });

    this.userService.getAddresses().subscribe((addresses) => {
      this.addresses = addresses
    })

    const email = localStorage.getItem('email');
    if (email) {
      this.userService.fetchOrdersByEmail(email).subscribe({
        next: orders => {
          this.orders = orders;
          this.orders = orders.map(order => {
            const totalPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
            return { ...order, total: totalPrice/100, totalItems: totalItems };
          });
          this.cdr.markForCheck();
        },
        error: (err) => {
          if (err.status === 404) {
            this.orders = [];
          }
        }
      });
    }
    
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing
    if (!this.isEditing && this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email
      })
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.user) {
      const updatedUser: User = {
        ...this.user,
        ...this.profileForm.value,
      }
      //this.userService.updateUser(updatedUser)
      this.isEditing = false
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      this.passwordForm.reset()
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800"
      case "En tránsito":
        return "bg-blue-100 text-blue-800"
      case "Procesando":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
}
