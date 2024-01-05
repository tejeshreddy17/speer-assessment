Feature: user

  In order to validate notes API
  As a tester
  I want to make sure that everything works as expected

  Scenario: Login of Non registered user
    Given I make a POST request to /api/auth/login
    And I set body to
    """
    {
      "userName": "nonExitingUser",
      "password": "secret"
    }
    """
    When I receive a response
    Then I expect response should have a status 404
  Scenario: Login of the registered user
    Given I make a POST request to /api/auth/login
    And I set body to
    """
    {
      "userName": "johnDoe17",
      "password": "secret"
    }
    """
    When I receive a response
    Then I expect response should have a status 201
  Scenario: Sign up of new user
    Given I make a POST request to /api/auth/signup
    And I set body to
    """
    {
      "userName": "newUser17",
      "password": "P@ssW0rd",
      "firstName":"new",
      "lastName":"user",
      "mailId":"newUser@mailinator.com"

    }
    """
    When I receive a response
    Then I expect response should have a status 201
    And I expect response should have a json like
    """
    { "message": "User Registered successfully" }
    """