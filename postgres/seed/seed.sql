BEGIN TRANSACTION;

INSERT INTO users (name, email, pet, age, entries, joined) VALUES ('John Doe', 'john@doe.com', 52, "dog", 10, '2021-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$Iwvi.Lbc4OxggfGrLMLROO8Uf15wu1nNcBLMHtgRBjf9/xhKT2z0S', 'john@doe.com');

COMMIT;