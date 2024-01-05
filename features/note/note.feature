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
    Given I login as user user3
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
  Scenario: create a note 
    Given I make a POST request to /api/notes
    And I set the accessToken in authorization header
    And I set body to
    """
    {
      "content": "New Note"
    }
    """
    When I receive a response
    Then I expect response should have a status 201
    And I expect response should have a json like
    """
    {
      "content": "New Note"
    }
    """
  Scenario: Delete a note 
    Given I make a DELETE request to /api/notes/4
    And I set the accessToken in authorization header
    When I receive a response
    Then I expect response should have a status 200
    And I expect response should have a json like
    """
    { "message": "Note Deleted successfully" }
    """
  Scenario: Search a note based on key word
    Given I make a get request to /api/notes/search
    And I set the accessToken in authorization header
    And I set query param q to note
    When I receive a response
    Then I expect response should have a status 200
    And I expect response should have a json like
    """
    [
      {    
        "content": "New seach note"
      }
    ]
    """
  Scenario: share a note by its id to another user
    Given I make a POST request to /api/notes/1/share/2
    And I set the accessToken in authorization header
    When I receive a response
    Then I expect response should have a status 201
    And I expect response should have a json like
    """
    {
      "message": "Note shared with user having id 2"
    }
    """