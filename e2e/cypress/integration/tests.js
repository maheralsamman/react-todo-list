const assert = require("assert");

const title = "A demo title for a todo";
const title1 = "A demo title 1 for a todo";
const title2 = "A demo title 2 for a todo";
const title3 = "A demo title 3 for a todo";

const TodoPage = {
  titleInput: () => cy.get('input[id="txtTodoItemToAdd"]'),
  addButton: () => cy.get('[id="btnAddTodo"]'),
  todoList: () => cy.get('[id="todoList"]'),
  todoListItems: () => TodoPage.todoList().children(),
  visit: () => cy.visit('http://localhost:3000'),
  clear: () => cy.clearLocalStorage(),
  createTodo: (title) => {
    TodoPage.titleInput().type(title);
    TodoPage.addButton().click();
    return title;
  },
  firstTodoItem: () => TodoPage.todoListItems().first(),
  toggleCompletedFirstTodo: () => cy.get('.todo--toggle-completed').click(),
  firstRemoveButton: () => cy.get('.todo__button--remove'),
};

describe('todo functional tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:3000');
  });
  afterEach(() => { cy.clearLocalStorage(); });


  it('page loads properly', () => {
    // act
    cy.visit('http://localhost:3000');
  });

  it('creates a new todo', () => {
    // act
    cy.get('input[id="txtTodoItemToAdd"]').type(title);
    cy.get('[id="btnAddTodo"]').click()

    // assert
    cy.get('[id="todoList"]').should('have.length', 1);
    cy.get('[id="todoList"]').contains(title);
  });

  
  it('unable to create empty todo', () => {
    // act
    TodoPage.addButton().click();
    // assert
    TodoPage.todoListItems().should('have.length', 0);
  });

  it('creates four todos', () => {
    // act
    TodoPage.createTodo(title);
    TodoPage.createTodo(title1);
    TodoPage.createTodo(title2);
    TodoPage.createTodo(title3);
    // assert
    TodoPage.todoListItems().should('have.length', 4);
  });

  it('completes a todo', () => {
    const title1 = "A demo title 1 for a todo";
    // arrange
    TodoPage.createTodo(title1);

    // act
    TodoPage.firstTodoItem().should('not.have.class', 'todo--completed');

    TodoPage.toggleCompletedFirstTodo();
    TodoPage.firstTodoItem().should('have.class', 'todo--completed');
  });

  it('uncompletes a todo', () => {
    // arrange
    TodoPage.createTodo(title);

    // act
    TodoPage.toggleCompletedFirstTodo();
    TodoPage.toggleCompletedFirstTodo();
    TodoPage.firstTodoItem().should('not.have.class', 'todo--completed');
  });

  it('removes the right todo', () => {
    // arrange
    TodoPage.createTodo(title1);
    const titleToRemove = TodoPage.createTodo('The one we want to remove');
    TodoPage.createTodo(title2);

    const el = TodoPage.todoListItems().contains(titleToRemove);
    el.click();
    el.get('.todo__button--remove').click();
  });

  it('remove todo removes the todo from the list', () => {
    // arrange
    TodoPage.createTodo(title);

    TodoPage.todoListItems().should('have.length', 1);

    TodoPage.toggleCompletedFirstTodo();
    TodoPage.firstRemoveButton().click();
    TodoPage.todoListItems().should('have.length', 0);
  });

  it('completed items has remove button', () => {
    // arrange
    TodoPage.createTodo(title);

    TodoPage.firstRemoveButton().should('not.exist');
    TodoPage.toggleCompletedFirstTodo();
    TodoPage.firstRemoveButton().should('exist');
  });
});
