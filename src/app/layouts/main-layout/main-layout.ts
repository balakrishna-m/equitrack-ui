import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
