Feature: notes

  In order to validate notes API
  As a tester
  I want to make sure that everything works as expected

  Scenario: Get a list of notes
    Given I make a GET request to /api/notes
    And I set the accessToken in authorization header
    When I receive a response
    Then I expect response should have a status 200
    And I expect response should have a json like
    """
   [
          {
            "content": "Content for Id 1",
            "userId": 1
          },
        {
            "content": "Content for Id 2",
            "userId": 1
          }
    ]
    """
  Scenario: Get a note by its id
    Given I make a GET request to /api/notes/1
    And I set the accessToken in authorization header
    When I receive a response
    Then I expect response should have a status 200
    And I expect response should have a json like
    """
    {
      "content": "Content for Id 1"
    }
    """
  Scenario: update a note by its id
    Given I make a PUT request to /api/notes/4
    And I set the accessToken in authorization header
    And I set body to
    """
    {
      "content": "Updated the note content"
    }
    """
    When I receive a response
    Then I expect response should have a status 200
    And I expect response should have a json like
    """
    {
      "content": "Updated the note content"
    }
    """
  Scenario: update a note by its id for un-authenticated user
    Given I make a PUT request to /api/notes/3
    And I set the accessToken in authorization header
    And I set body to
    """
    {
      "content": "Updated the note content"
    }
    """
    When I receive a response
    Then I expect response should have a status 401
  Scenario: update a note by its id by a other user
    Given I make a PUT request to /api/notes/3
    And I set the accessToken in authorization header
    And I set body to
    """
    {
      "content": "Updated the note content"
    }
    """
    When I receive a response
    Then I expect response should have a status 400