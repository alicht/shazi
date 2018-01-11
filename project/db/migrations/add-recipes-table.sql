CREATE TABLE IF NOT EXISTS recipes (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  recipe VARCHAR(255),
  category VARCHAR(255),
  area VARCHAR(255),
  instructions TEXT,
  ingredients TEXT,
  measurement TEXT,
  img TEXT,
  tag TEXT
)
