Feature: User Profile Management
  As a logged-in user
  I want to manage my profile information
  So that I can keep my account details up to date

  Background:
    Given the application is running
    And I am logged in as "valid@example.com" with password "correctpassword"
    And I am on the profile management page

  Scenario: View current profile information
    Then I should see my name "John Doe" in the profile form
    And I should see my email "valid@example.com" in the profile form
    And I should see my phone "+1-555-0123" in the profile form
    And I should see my bio "Software developer and BDD enthusiast." in the profile form

  Scenario: Successfully update profile information
    When I change my name to "John Smith"
    And I change my phone to "+1-555-9999"
    And I change my bio to "Senior software developer with expertise in testing."
    And I click the "Update Profile" button
    Then I should see a success message "Profile updated successfully!"
    And my profile should be updated with the new information

  Scenario: Update profile with invalid name
    When I clear the name field
    And I click the "Update Profile" button
    Then I should see an alert "Name is required"
    And my profile should not be updated

  Scenario: Change password successfully
    When I enter "correctpassword" in the current password field
    And I enter "newpassword123" in the new password field
    And I enter "newpassword123" in the confirm password field
    And I click the "Change Password" button
    Then I should see a success message "Password changed successfully!"
    And the password form should be cleared

  Scenario: Change password with incorrect current password
    When I enter "wrongpassword" in the current password field
    And I enter "newpassword123" in the new password field
    And I enter "newpassword123" in the confirm password field
    And I click the "Change Password" button
    Then I should see an error message "Current password is incorrect"
    And my password should not be changed

  Scenario: Change password with weak new password
    When I enter "correctpassword" in the current password field
    And I enter "123" in the new password field
    And I enter "123" in the confirm password field
    And I click the "Change Password" button
    Then I should see an error message "New password must be at least 6 characters long"
    And my password should not be changed

  Scenario: Change password with mismatched confirmation
    When I enter "correctpassword" in the current password field
    And I enter "newpassword123" in the new password field
    And I enter "differentpassword" in the confirm password field
    And I click the "Change Password" button
    Then I should see an error message "New passwords do not match"
    And my password should not be changed

  Scenario: Logout from profile page
    When I click the "Logout" button
    Then I should be redirected to the login page
    And I should no longer be logged in
    And all forms should be cleared
