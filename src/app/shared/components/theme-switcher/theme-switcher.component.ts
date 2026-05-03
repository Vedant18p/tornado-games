import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  isDark = false;
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize with current theme
    this.isDark = this.themeService.getCurrentTheme() === 'dark';

    // Keep in sync if theme changes elsewhere
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.isDark = theme === 'dark';
      });
  }

  toggleTheme(): void {
    const newTheme = this.isDark ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
    this.isDark = newTheme === 'dark';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
