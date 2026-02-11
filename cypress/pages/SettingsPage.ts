import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  private selectors = {
    imageInput: 'input[placeholder="URL of profile picture"]',
    usernameInput: 'input[placeholder="Your Name"]',
    bioInput: 'textarea[placeholder="Short bio about you"]',
    emailInput: 'input[placeholder="Email"]',
    passwordInput: 'input[placeholder="New Password"]',
    updateButton: 'button:contains("Update Settings")',
    logoutButton: 'button:contains("Or click here to logout.")',
  };

  goto(): void {
    this.visit('/settings');
  }

  updateUsername(username: string): void {
    this.typeText(this.selectors.usernameInput, username);
  }

  updateBio(bio: string): void {
    this.typeText(this.selectors.bioInput, bio);
  }

  updateEmail(email: string): void {
    this.typeText(this.selectors.emailInput, email);
  }

  updatePassword(password: string): void {
    this.typeText(this.selectors.passwordInput, password);
  }

  clickUpdate(): void {
    cy.get('button').contains('Update Settings').click();
  }

  logout(): void {
    cy.get('button').contains('Or click here to logout.').click();
  }

  verifySettingsPageLoaded(): void {
    this.shouldBeVisible(this.selectors.usernameInput);
    this.shouldBeVisible(this.selectors.emailInput);
  }
}
