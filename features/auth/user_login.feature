Feature: User Authentication
  As a registered user
  I want to log in to the system
  So that I can access my account and manage my profile

  Background:
    Given the application is running
    And I am on the login page

  Scenario: Successful login with valid credentials
    When I enter "valid@example.com" in the email field
    And I enter "correctpassword" in the password field
    And I click the login button
    Then I should be redirected to the profile section
    And I should see a welcome message "Welcome back, John Doe!"

  Scenario: Failed login with incorrect password
    When I enter "valid@example.com" in the email field
    And I enter "wrongpassword" in the password field
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page

  Scenario: Failed login with non-existent user
    When I enter "nonexistent@example.com" in the email field
    And I enter "anypassword" in the password field
    And I click the login button
    Then I should see an error message "User not found"
    And I should remain on the login page

  Scenario: Login form validation for empty fields
    When I click the login button without entering any credentials
    Then I should see an error message "Please fill in all fields"
    And I should remain on the login page

  Scenario: Successful login with second valid user
    When I enter "jane@example.com" in the email field
    And I enter "mypassword123" in the password field
    And I click the login button
    Then I should be redirected to the profile section
    And I should see a welcome message "Welcome back, Jane Smith!"
